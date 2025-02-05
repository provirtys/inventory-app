<template>
  <div class="page">
    <div class="page-container">
      <div class="main-content">
        <side-info />
        <inventory-grid />
      </div>
      <div class="bottom-content">
        <description-card />
      </div>
    </div>
  </div>
  <theme-switcher />
  <reseter/>
</template>

<script setup lang="ts">
import DescriptionCard from '@components/description-card/description-card.vue';
import InventoryGrid from '@components/inventory/inventory-grid/inventory-grid.vue';
import SideInfo from '@components/side-info/side-info.vue';
import ThemeSwitcher from '@components/theme-switcher/theme-switcher.vue';
import Reseter from '@components/reseter/reseter.vue';
</script>
