<template>
  <header class="flex items-center justify-between">
    <router-link to="/" class="p-2 cursor-pointer hover:bg-gray-200 rounded-full">
      <icon-component icon="IconArrowLeft" size="medium" />
    </router-link>
    <h1 class="font-bold text-xl md:text-2xl text-center">Location</h1>
  </header>
  <list-cards-component> </list-cards-component>
</template>
<script lang="ts" setup>
import IconComponent from '@/components/IconComponent.vue'
import ListCardsComponent from '@/components/ListCardsComponent.vue'
</script>
