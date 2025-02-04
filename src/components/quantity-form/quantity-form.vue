<template>
  <v-card class="quantity-form">
    <form @submit.prevent="$emit('submit')" class="quantity-form__form">
      <v-input class="quantity-form__input" type="number" v-model="quantity" placeholder="Введите количество" />
      <div class="quantity-form__actions">
        <v-button @click="$emit('cancel')">Отмена</v-button>
        <v-button color="red">Подтвердить</v-button>
      </div>
    </form>
  </v-card>
</template>

<script setup lang="ts">
import VInput from '@ui/v-input/v-input.vue';
import VCard from '@ui/v-card/v-card.vue';
import VButton from '@ui/v-button/v-button.vue';
import type { IEmits } from './types';

defineEmits<IEmits>()

const quantity = defineModel()
</script>

<style lang="scss" scoped src="./quantity-form.scss" />