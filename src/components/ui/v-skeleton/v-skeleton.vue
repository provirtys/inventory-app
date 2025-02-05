<template>
  <transition name="fade" mode="out-in">
    <div class="v-skeleton" :style="styles" />
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { defaultProps, type IProps } from '@ui/v-skeleton/types';

const props = withDefaults(defineProps<IProps>(), defaultProps);

const styles = computed(() => ({
  width: `${props.width}`,
  height: `${props.height}`,
  maxWidth: `${props.maxWidth}`
}))

</script>

<style lang="scss" scoped src="./v-skeleton.scss" />
