<template>
  <div class="flex flex-col gap-10">
    <h1 class="font-bold text-xl md:text-2xl">
      {{ title }}
    </h1>
    <search-component />
    <category-component>
      <category-option-component
        v-for="category of categories"
        :key="category.link"
        :text="category.text"
        :link="category.link"
      />
    </category-component>
    <list-cards-component>
      <card-component
        v-for="character of characters"
        :key="character.title"
        :title="character.name"
        :status="character.status"
        :gender="character.gender"
        :image="character.image"
        :loading="loading"
      />
    </list-cards-component>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import SearchComponent from '@/components/SearchComponent.vue'
import CategoryComponent from '@/components/CategoryComponent.vue'
import ListCardsComponent from '@/components/ListCardsComponent.vue'
import CardComponent from '@/components/CardComponent.vue'
import CategoryOptionComponent from '@/components/CategoryOptionComponent.vue'

import useCharacters from '@/composables/useCharacter'

const title = "What Rick and Morty character's are you looking for?"
const categories = [
  {
    text: 'Characters',
    link: 'character',
  },
  { text: 'Locations', link: 'location' },
  { text: 'Episodes', link: 'episode' },
]

const { filterCharacter } = useCharacters()

const characters = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    loading.value = true
    characters.value = await filterCharacter([1, 2, 3, 4, 5, 6])
  } catch (error) {
    throw new Error((error as Error).message || 'Error to get characters home')
  } finally {
    loading.value = false
  }
})
</script>
