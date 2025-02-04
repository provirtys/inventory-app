<template>
  <div class="inventory-modal" @close-modal="emit('closeModal')">
    <div class="inventory-modal__content">
      <div v-if="selectedItem!.detailImg" class="inventory-modal__image-container">
        <img class="inventory-modal__image" :src="getImageUrl(selectedItem!.detailImg)" alt="">
        <hr class="inventory-modal__divider">
      </div>
      </hr>
      <div class="inventory-modal__item-info">
        <h2 class="inventory-modal__item-title">
          <v-skeleton height="30px" />
        </h2>
        <div class="inventory-modal__item-details">
          <v-skeleton height="10px" />
          <v-skeleton height="10px" />
          <v-skeleton height="10px" />
          <v-skeleton height="10px" max-width="180px" />
          <v-skeleton height="10px" max-width="80px" />
        </div>
        <hr class="inventory-modal__divider">
      </div>
      <v-button class="inventory-modal__delete-button" color="red" :style="deleteButtonStyle" @click="openQuantityPopup">Удалить предмет</v-button>
      <transition name="fade-vertical">
        <quantity-form v-if="isQuantityPopupOpen" v-model="quantity" @cancel="onQuantityCancel" @submit="onQuantitySubmit"/>
      </transition>
    </div>
    <button class="inventory-modal__close" @click="emit('closeModal')">
      <v-icon name="close" size="12" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { IEmits } from './types';
import { getImageUrl } from '@helpers/image';
import VSkeleton from '@ui/v-skeleton/v-skeleton.vue';
import VButton from '@ui/v-button/v-button.vue';
import { useModal } from '@/composables/useModal';
import { storeToRefs } from 'pinia';
import { useInventoryStore } from '@/store/inventory/inventory';
import VIcon from '@ui/v-icon/v-icon.vue';
import QuantityForm from '@components/quantity-form/quantity-form.vue';

const emit = defineEmits<IEmits>();

const inventoryStore = useInventoryStore();
const {decreaseItemQuantity} = inventoryStore
const { selectedItem } = storeToRefs(inventoryStore);

const { isOpen: isQuantityPopupOpen, openModal: openQuantityPopup, closeModal: closeQuantityPopup } = useModal();

const quantity = ref('')

const deleteButtonStyle = computed(() => ({
  filter: isQuantityPopupOpen.value ? 'blur(4px)' : 'none'
}))

const onQuantityCancel = () => {
  quantity.value = '';
  closeQuantityPopup();
}

const onQuantitySubmit = () => {
  decreaseItemQuantity(selectedItem.value!.id, Number(quantity.value));
  quantity.value = '';
  closeQuantityPopup();
}

</script>

<style lang="scss" scoped src="./inventory-modal.scss" />