<template>
  <div :class="componentClasses">
    <input v-model="modelValue" class="input-wrapper__input" v-bind="inputAttributes" @focusin="inputFocused = true"
      @focusout="inputFocused = false" @input="onInput" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { type IProps, type IEmits, defaultProps } from './types';

const props = withDefaults(defineProps<IProps>(), defaultProps);

const modelValue = defineModel();

const emit = defineEmits<IEmits>();

const inputFocused = ref<Boolean>(false);

const componentClasses = computed(() => [
  'input-wrapper',
  {
    'input-wrapper--focused': inputFocused.value
  }
]);

const inputAttributes = computed(() => ({
  type: props.type,
  placeholder: props.placeholder,
}));

const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit('update:modelValue', value.replace(/\D/g, ''));
}

</script>

<style lang="scss" scoped src="./v-input.scss" />
