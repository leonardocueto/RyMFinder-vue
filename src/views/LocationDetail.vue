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
      {{ location?.name || 'Cargando...' }}
    </h1>
  </header>
  <section>
    <div v-if="isLoading" class="animate-spin w-5">
      <icon-component icon="IconLoader2" size="small" />
    </div>
    <div v-else class="flex flex-col md:flex-row items-start justify-center h-full gap-6">
      <div class="flex gap-4 items-center justify-between">
        <icon-component icon="IconPlanet" size="large" />
        <div class="flex flex-col items-start">
          <h1 class="font-bold text-lg">Type</h1>
          <h2>{{ location?.type }}</h2>
        </div>
      </div>
      <div class="flex gap-4 items-center justify-between">
        <icon-component icon="IconUniverse" size="large" />
        <div class="flex flex-col items-start">
          <h1 class="font-bold text-lg">Dimension</h1>
          <h2>{{ location?.dimension }}</h2>
        </div>
      </div>

      <div class="flex gap-4 items-center justify-between">
        <icon-component icon="IconUser" size="large" />
        <div class="flex flex-col items-start">
          <h1 class="font-bold text-lg">Residents</h1>
          <h2>{{ location?.residents.length }}</h2>
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
      v-for="character of characters"
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

import type { ILocation } from '@/interface/location.interface'
import type { ICharacter } from '@/interface/character.interface'

import IconComponent from '@/components/IconComponent.vue'
import ListCardsComponent from '@/components/ListCardsComponent.vue'
import CardComponent from '@/components/CardComponent.vue'
import useLocation from '@/composables/useLocation'
import useCharacter from '@/composables/useCharacter'

const route = useRoute()
const router = useRouter()
const { filterLocation } = useLocation()
const { filterCharacter } = useCharacter()
const id = route.params.id

const isLoading = ref(true)
const location = ref<ILocation | null>(null)
const characters = ref<ICharacter[]>([])

const formattedDate = computed(() => {
  if (!location.value?.created) return ''
  return new Date(location.value.created).toLocaleDateString()
})

async function cardResidents() {
  if (!location.value?.residents || location.value.residents.length === 0) {
    return
  }
  const total = location.value?.residents.length
  let character = location.value?.residents.map((r) => r.split('/').pop())
  if (total > 6) {
    character = character.slice(0, 6)
    characters.value = await filterCharacter(character.filter((c): c is string => c !== undefined))
  } else if (total === 1) {
    return
  }
}

const goBack = () => {
  if (window.history.length > 1) {
    window.history.back()
  } else {
    router.push('/')
  }
}

onMounted(async () => {
  try {
    isLoading.value = true
    location.value = await filterLocation(id.toString())
    await cardResidents()
  } catch (error) {
    throw new Error((error as Error).message || 'Error to get characters home')
  } finally {
    isLoading.value = false
  }
})
</script>
