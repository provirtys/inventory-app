<template>
  <button :class="btnClasses" :disabled="disabled" @click="emits('click')">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type IProps, type IEmits } from './types';
import { defaultProps } from './types';

const props = withDefaults(defineProps<IProps>(), defaultProps)

const emits = defineEmits<IEmits>()

const btnClasses = computed(() => [
  'button',
  {
    [`button--${props.color}`]: props.color,
    'button--rounded': props.rounded
  }
])
</script>

<style scoped lang="scss" src="./v-button.scss" />