<template>
  <v-button class="theme-switcher" rounded @click="toggleTheme">
    <v-icon name="theme" size="40" />
  </v-button>
</template>

<script setup lang="ts">
import VButton from '@ui/v-button/v-button.vue';
import VIcon from '@ui/v-icon/v-icon.vue';
import { ref, onMounted } from 'vue';

const isLight = ref(localStorage.getItem('theme') === 'light');

const toggleTheme = () => {
  isLight.value = !isLight.value;
  document.documentElement.classList.toggle('light', isLight.value);
  localStorage.setItem('theme', isLight.value ? 'light' : 'dark');
};

onMounted(() => {
  document.documentElement.classList.toggle('light', isLight.value);
});
</script>

<style lang="scss" scoped src="./theme-switcher.scss"/>