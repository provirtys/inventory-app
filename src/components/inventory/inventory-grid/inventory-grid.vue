<template>
  <v-card class="inventory-grid" rounded>
    <div class="inventory-grid__cells">
      <div class="inventory-grid__cell" v-for="(item, idx) in items" @dragover.prevent @drop="onDrop(idx)" @dragenter.prevent>
        <inventory-item v-if="item" :class="{ dragging: draggedIndex === item.id }" :item="item"
          :active="selectedItem?.id === item.id" @click="onItemClick(item)" draggable="true"
          @dragstart="onDragStart($event, item)" @drag="onDrag" @dragend="onDragEnd" />
      </div>
    </div>
    <transition name="fade-side">
      <div v-if="isModalOpen" class="test">
      </div>
    </transition>
    <transition name="fade-side">
      <inventory-modal v-if="isModalOpen" v-model="isModalOpen" @close-modal="onCloseModal" />
    </transition>
  </v-card>
  <div v-show="draggedIndex" ref="realDragImage" class="real-drag" draggable="true">
    <img :src="getImageUrl(imagePath)" alt="">
  </div>
  <div ref="fakeDragImage" class="fake-drag" />
  <div v-if="draggedIndex" class="custom-cursor" :style="cursorStyle"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useInventoryStore } from '@/store/inventory/inventory';
import type { IInventoryItem } from '@/store/inventory/types';
import { getImageUrl } from '@/helpers/image';
import InventoryItem from '@components/inventory/inventory-item/inventory-item.vue';
import InventoryModal from '@components/inventory/inventory-modal/inventory-modal.vue';
import { useModal } from '@/composables/useModal';
import VCard from '@ui/v-card/v-card.vue';

const inventoryStore = useInventoryStore();
const { items, selectedItem } = storeToRefs(inventoryStore);

const { isOpen: isModalOpen, openModal, closeModal } = useModal();

const draggedIndex = ref<number | null>(null);
const realDragImage = ref<HTMLImageElement | null>(null);
const fakeDragImage = ref<HTMLImageElement | null>(null);
const imagePath = ref('')
const offsetX = ref(0);
const offsetY = ref(0);
const cursorStyle = ref({ top: '0px', left: '0px' });

const onItemClick = (item: IInventoryItem) => {
  selectedItem.value = item
  openModal()
}

const onCloseModal = () => {
  selectedItem.value = null
  closeModal()
}

const onDragStart = (event: DragEvent, item: IInventoryItem) => {
  draggedIndex.value = item.id;

  if (!item.previewImg) return;

  const target = event.target as HTMLElement;
  const rect = target.getBoundingClientRect();

  offsetX.value = event.clientX - rect.left;
  offsetY.value = event.clientY - rect.top;

  imagePath.value = item.previewImg

  document.body.classList.add('dragging');

  if (realDragImage.value) document.getElementById('app')!.append(realDragImage.value)

  if (fakeDragImage.value) event.dataTransfer?.setDragImage(fakeDragImage.value, 0, 0);
};

const onDrop = (targetIndex: number) => {
  if (draggedIndex.value === null || targetIndex < 0 || targetIndex >= items.value.length) return;

  const itemIndex = items.value.findIndex(item => item?.id === draggedIndex.value);
  const itemToMove = items.value[itemIndex];
  const itemOnTarget = items.value.find(item => item?.position === targetIndex + 1);

  if (itemOnTarget) {
    itemOnTarget.position = itemToMove!.position
    items.value.splice(itemIndex, 1, itemOnTarget);
  }
  else {
    items.value.splice(itemIndex, 1, null);
  }

  itemToMove!.position = targetIndex + 1;
  items.value.splice(targetIndex, 1, itemToMove);
  draggedIndex.value = null;
};

const onDrag = (event: DragEvent) => {
  if (!event.pageX && !event.pageY) return;
  realDragImage.value!.style.left = event.clientX - offsetX.value + 'px';
  realDragImage.value!.style.top = event.clientY - offsetY.value + 'px';
  
  cursorStyle.value = {
    top: `${event.clientY}px`,
    left: `${event.clientX}px`,
  };
};

const onDragEnd = () => {
  draggedIndex.value = null;
  document.body.classList.remove('dragging');
};
</script>

<style lang="scss" scoped src="./inventory-grid.scss" />