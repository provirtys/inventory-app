<template>
  <v-card class="side-info" rounded>
    <div class="side-info__image">
      <img src="@/assets/images/side-info.png" alt="">
    </div>
    <div class="side-info__main">
      <h2 class="side-info__title">
        <v-skeleton height="26px" />
      </h2>
      <div class="side-info__content">
        <v-skeleton height="10px" max-width="155px" />
        <v-skeleton height="10px" max-width="190px" />
        <v-skeleton height="10px" max-width="170px" />
        <v-skeleton height="10px" max-width="160px" />
        <v-skeleton height="10px" max-width="140px" />
      </div>
      <div class="side-info__additional">
        <v-skeleton height="10px" max-width="80px" />
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import VSkeleton from '@ui/v-skeleton/v-skeleton.vue';
import VCard from '@ui/v-card/v-card.vue';

</script>

<style lang="scss" scoped src="./side-info.scss" />