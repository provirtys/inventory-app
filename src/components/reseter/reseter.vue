<template>
  <v-button class="reseter" @click="resetItems">
    Сбросить инвентарь
  </v-button>
</template>

<script setup lang="ts">
import VButton from '@ui/v-button/v-button.vue';
import { useInventoryStore } from '@/store/inventory/inventory';

const { resetItems } = useInventoryStore()

</script>

<style lang="scss" scoped src="./reseter.scss" />