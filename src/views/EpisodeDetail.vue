<template>
  <header class="flex items-center justify-start py-4">
    <router-link
      to="#"
      @click.prevent="goBack"
      class="p-2 cursor-pointer hover:bg-gray-200 rounded-full transition-colors duration-200"
    >
      <icon-component icon="IconX" size="medium" />
    </router-link>
    <h1
      class="font-bold text-2xl md:text-4xl text-center absolute left-1/2 transform -translate-x-1/2"
    >
      {{ episode?.name || 'Cargando...' }}
    </h1>
  </header>
  <section>
    <div v-if="isLoading" class="animate-spin w-5">
      <icon-component icon="IconLoader2" size="small" />
    </div>
    <div v-else class="flex flex-col md:flex-row items-start justify-center h-full gap-6">
      <div class="flex gap-4 items-center justify-between">
        <icon-component icon="IconCalendarDue" size="large" />
        <div class="flex flex-col items-start">
          <h1 class="font-bold text-lg">Air date</h1>
          <h2>{{ episode?.air_date }}</h2>
        </div>
      </div>
      <div class="flex gap-4 items-center justify-between">
        <icon-component icon="IconCardboards" size="large" />
        <div class="flex flex-col items-start">
          <h1 class="font-bold text-lg">Episode</h1>
          <h2>{{ episode?.episode }}</h2>
        </div>
      </div>

      <div class="flex gap-4 items-center justify-between">
        <icon-component icon="IconUser" size="large" />
        <div class="flex flex-col items-start">
          <h1 class="font-bold text-lg">Characters</h1>
          <h2>{{ episode?.characters.length }}</h2>
        </div>
      </div>

      <div class="flex gap-4 items-center justify-between">
        <icon-component icon="IconCalendar" size="large" />
        <div class="flex flex-col items-start">
          <h1 class="font-bold text-lg">Created</h1>
          <h2>{{ formattedDate }}</h2>
        </div>
      </div>
    </div>
  </section>
  <list-cards-component>
    <card-component
      v-for="character of charactersCard"
      :key="character.id"
      :title="character.name"
      :status="character.status"
      :gender="character.gender"
      :image="character.image"
      :id="character.id"
      :loading="isLoading"
      type="character"
    />
  </list-cards-component>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { IEpisode } from '@/interface/episode.interface'
import type { ICharacter } from '@/interface/character.interface'

import IconComponent from '@/components/IconComponent.vue'
import ListCardsComponent from '@/components/ListCardsComponent.vue'
import CardComponent from '@/components/CardComponent.vue'

import useEpisode from '@/composables/useEpisode'
import useCharacter from '@/composables/useCharacter'
const route = useRoute()
const router = useRouter()

const { filterCharacter } = useCharacter()
const { filterEpisode } = useEpisode()
const id = route.params.id
const isLoading = ref(true)

const episode = ref<IEpisode | null>(null)
const charactersCard = ref<ICharacter[]>([])

const formattedDate = computed(() => {
  if (!episode.value?.created) return ''
  return new Date(episode.value.created).toLocaleDateString()
})

const goBack = () => {
  if (window.history.length > 1) {
    window.history.back()
  } else {
    router.push('/')
  }
}

async function cardResidents() {
  if (!episode.value?.characters || episode.value.characters.length === 0) {
    return
  }

  const total = episode.value?.characters.length
  let character = episode.value?.characters.map((r) => r.split('/').pop())

  if (total > 6) {
    character = character.slice(0, 6)
    charactersCard.value = await filterCharacter(
      character.filter((c): c is string => c !== undefined),
    )
  } else if (total === 1) {
    return
  }
}

onMounted(async () => {
  try {
    isLoading.value = true
    episode.value = await filterEpisode(id.toString())
    await cardResidents()
  } catch (error) {
    throw new Error((error as Error).message || 'Error to get characters home')
  } finally {
    isLoading.value = false
  }
})
</script>
