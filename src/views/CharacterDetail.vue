<template>
  <header class="flex items-center justify-start pb-4">
    <router-link
      to="#"
      @click.prevent="goBack"
      class="p-2 cursor-pointer hover:bg-gray-200 rounded-full transition-colors duration-200"
    >
      <icon-component icon="IconX" size="medium" />
    </router-link>
    <h1
      class="font-bold text-xl md:text-3xl text-center absolute left-1/2 transform -translate-x-1/2"
    >
      {{ character?.name || 'Cargando...' }}
    </h1>
  </header>

  <div v-if="isLoading" class="animate-spin w-5">
    <icon-component icon="IconLoader2" size="small" />
  </div>

  <div v-else class="flex flex-col items-center justify-center h-full p-4">
    <div class="flex flex-col items-center justify-center gap-4 w-full max-w-4xl">
      <img
        class="aspect-square w-md rounded-2xl"
        :src="character?.image"
        :alt="`img-${character?.name}`"
        :title="`Imagen de ${character?.name}`"
      />
      <section class="grid grid-cols-1 gap-4 md:grid-cols-2 w-full">
        <div class="border border-gray-400 rounded-md p-4 flex items-center gap-2">
          <icon-component icon="IconPaw" size="small" />
          <p><strong>Specie:</strong> {{ character?.species }}</p>
        </div>

        <div class="border border-gray-400 rounded-md p-4 flex items-center gap-2">
          <icon-component :icon="genderIcon" size="small" />
          <p><strong>Gender:</strong> {{ character?.gender }}</p>
        </div>

        <div class="border border-gray-400 rounded-md p-4 flex items-center gap-2">
          <icon-component :icon="statusIcon" size="small" />
          <p><strong>Status:</strong> {{ character?.status }}</p>
        </div>

        <div class="border border-gray-400 rounded-md p-4 flex items-center gap-2">
          <icon-component icon="IconPlanet" size="small" />
          <p><strong>Origin:</strong> {{ character?.origin.name }}</p>
        </div>

        <div class="border border-gray-400 rounded-md p-4 flex items-center gap-2">
          <icon-component icon="IconMapPin" size="small" />
          <p><strong>Location:</strong> {{ character?.location.name }}</p>
        </div>

        <div class="border border-gray-400 rounded-md p-4 flex items-center gap-2">
          <icon-component icon="IconCalendar" size="small" />
          <p><strong>Created:</strong> {{ formattedDate }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import IconComponent from '@/components/IconComponent.vue'
import useCharacter from '@/composables/useCharacter'
import type { ICharacter } from '@/interface/character.interface'

const route = useRoute()
const router = useRouter()
const id = route.params.id
const isLoading = ref(true)
const character = ref<ICharacter | null>(null)
const { filterCharacter } = useCharacter()

const statusIcon = computed(() => {
  switch (character.value?.status) {
    case 'Alive':
      return 'IconHeart'
    case 'Dead':
      return 'IconSkull'
    default:
      return 'IconQuestionMark'
  }
})

const genderIcon = computed(() => {
  switch (character.value?.gender) {
    case 'Male':
      return 'IconGenderMale'
    case 'Female':
      return 'IconGenderFemale'
    default:
      return 'IconQuestionMark'
  }
})

const formattedDate = computed(() => {
  if (!character.value?.created) return ''
  return new Date(character.value.created).toLocaleDateString()
})

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
    character.value = await filterCharacter(id.toString())
  } catch (error) {
    console.error('Error al cargar el personaje:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
header {
  border-bottom: 1px solid #e5e7eb;
}
</style>
