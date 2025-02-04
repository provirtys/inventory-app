<template>
  <div :class="classes">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { type IProps, defaultProps } from './types';

const props = withDefaults(defineProps<IProps>(), defaultProps);

const classes = computed(() => [
  'card',
  {
    'card--rounded': props.rounded
  }
])
</script>
<style scoped lang="scss" src="./v-card.scss" />