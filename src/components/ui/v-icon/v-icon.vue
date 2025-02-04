<template>
  <svg :height="height ?? size" :width="width ?? size" aria-hidden="true" class="icon">
    <use :xlink:href="`#${name}`" />
  </svg>
</template>

<script lang="ts" setup>
import type { IProps } from './types';
import { defaultProps } from './types';

withDefaults(defineProps<IProps>(), defaultProps);
</script>

<style lang="scss" scoped src="./v-icon.scss" />
