<template>
  <v-card class="description-card" rounded>
    <v-skeleton height="36px" width="90%" />
    <v-icon class="description-card__close" name="close" size=12 />
  </v-card>
</template>

<script setup lang="ts">
import VSkeleton from '@ui/v-skeleton/v-skeleton.vue';
import VCard from '@ui/v-card/v-card.vue';
import VIcon from '@ui/v-icon/v-icon.vue';

</script>

<style lang="scss" scoped src="./description-card.scss" />