<template>
  <header class="flex items-center justify-start">
    <router-link to="/" class="p-2 cursor-pointer hover:bg-gray-200 rounded-full">
      <icon-component icon="IconArrowLeft" size="medium" />
    </router-link>
    <h1
      class="font-bold text-xl md:text-3xl text-center absolute left-1/2 transform -translate-x-1/2"
    >
      {{ title }}
    </h1>
  </header>
  <main>
    <list-cards-component>
      <card-component
        v-for="character of props.data"
        :key="character.id"
        :id="character.id"
        :title="character.name"
        :status="character.status"
        :gender="character.gender"
        :image="character.image"
        :loading="props.loading"
        :type="type"
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
    data: any[]
    loading: boolean
    type: string
  }>(),
  {
    title: '',
    loading: false,
    data: () => [],
    type: '',
  },
)
</script>
