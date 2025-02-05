<template>
  <v-card class="inventory-grid" rounded>
    <div class="inventory-grid__cells">
      <div class="inventory-grid__cell" v-for="(item) in items" @mouseup="onDragEnd" @touchend="onDragEnd">
        <inventory-item v-if="item" :item="item" :active="selectedItem?.id === item.id" @click="onItemClick(item)"
          @mousedown="onStart($event, item)" @touchstart="onStart($event, item)" />
      </div>
    </div>
    <transition name="fade-side">
      <inventory-modal v-if="isModalOpen" v-model="isModalOpen" @close-modal="onCloseModal" />
    </transition>
  </v-card>
  <div v-show="isDragging" ref="dragImage" class="drag-image" draggable="true">
    <img :src="getImageUrl(imagePath)" alt="">
  </div>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import { storeToRefs } from 'pinia';
import { useInventoryStore } from '@/store/inventory/inventory';
import type { IInventoryItem } from '@/store/inventory/types';
import { getImageUrl } from '@/helpers/image';
import VCard from '@ui/v-card/v-card.vue';
import InventoryItem from '@components/inventory/inventory-item/inventory-item.vue';
import InventoryModal from '@components/inventory/inventory-modal/inventory-modal.vue';
import { useModal } from '@/composables/useModal';
import { useDrag } from "@composables/useDrag";

const inventoryStore = useInventoryStore();
const { items, selectedItem } = storeToRefs(inventoryStore);

const { isOpen: isModalOpen, openModal, closeModal } = useModal();

const draggedIndex = ref<number | null>(null);
const dragImage = ref<HTMLImageElement | null>(null);
const imagePath = ref('')

const { isDragging, dropTarget, isMoving, onDragStart, onDragEnd } = useDrag(dragImage)

const onItemClick = (item: IInventoryItem) => {
  if (isMoving.value) return
  selectedItem.value = item
  openModal()
}

const onCloseModal = () => {
  selectedItem.value = null
  closeModal()
}

function changeItemPosition(positionId: number) {
  if (draggedIndex.value === null || positionId < 0 || positionId >= items.value.length) return;

  const itemIndex = items.value.findIndex(item => item?.id === draggedIndex.value);
  const itemToMove = items.value[itemIndex];
  const itemOnTarget = items.value.find(item => item?.position === positionId + 1);

  if (itemOnTarget) {
    itemOnTarget.position = itemToMove!.position
    items.value.splice(itemIndex, 1, itemOnTarget);
  }
  else {
    items.value.splice(itemIndex, 1, null);
  }

  itemToMove!.position = positionId + 1;
  items.value.splice(positionId, 1, itemToMove);
}

const onStart = (event: Event, item: IInventoryItem) => {
  imagePath.value = item.previewImg!
  draggedIndex.value = item.id;
  onDragStart(event)
}

watch(dropTarget, (el) => {
  if (el) {
    const targetCell = el.closest('.inventory-grid__cell');
    if (targetCell) {
      const targetIdx = Array.from(targetCell.parentNode!.children).indexOf(targetCell);

      if (targetIdx !== -1) {
        changeItemPosition(targetIdx)
      }
    }
  }
  draggedIndex.value = null;
})

watchEffect(() => {
  if (!selectedItem.value) {
    closeModal()
  }
})
</script>

<style lang="scss" scoped src="./inventory-grid.scss" />