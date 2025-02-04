<template>
  <div class="loader" :style="loaderStyles"></div>
</template>

<script lang="ts" setup>
import { type IProps, defaultProps } from './types';
import { computed } from 'vue';

const props = withDefaults(defineProps<IProps>(), defaultProps);

const loaderStyles = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`
}))

</script>

<style scoped lang="scss" src="./loader.scss" />