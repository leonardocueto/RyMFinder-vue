<template>
  <header class="flex items-center justify-start">
    <router-link to="/" class="p-2 cursor-pointer hover:bg-gray-200 rounded-full">
      <icon-component icon="IconArrowLeft" size="medium" />
    </router-link>
    <h1 class="font-bold text-xl md:text-2xl text-center">{{ title }}</h1>
  </header>
  <main>
    <list-cards-component>
      <card-component
        v-for="character of props.data"
        :key="character.title"
        :title="character.name"
        :status="character.status"
        :gender="character.gender"
        :image="character.image"
        :loading="props.loading"
      />
    </list-cards-component>
  </main>
</template>
<script lang="ts" setup>
import ListCardsComponent from '@/components/ListCardsComponent.vue'
import CardComponent from '@/components/CardComponent.vue'
import IconComponent from '@/components/IconComponent.vue'

const props = withDefaults(
  defineProps<{
    title: string
    data: object
    loading: boolean
  }>(),
  {
    title: '',
    loading: false,
    data: () => ({}),
  },
)
</script>
