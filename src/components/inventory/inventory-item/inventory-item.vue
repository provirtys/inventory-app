<template>
  <div :class="itemClasses">
    <div class="inventory-item__content">
      <div v-if="item.previewImg" class="inventory-item__image-container">
        <img class="inventory-item__image" :src="getImageUrl(item.previewImg)" alt="">
      </div>
      <div v-if="item.quantity" class="inventory-item__quantity">
        {{ item.quantity }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getImageUrl } from '@helpers/image';
import { type IProps, defaultProps } from './types';

const props = withDefaults(defineProps<IProps>(), defaultProps);

const itemClasses = computed(() => [
  'inventory-item',
  {
    'inventory-item--active': props.active
  }
])

</script>

<style lang="scss" scoped src="./inventory-item.scss" />