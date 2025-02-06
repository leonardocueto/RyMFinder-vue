<template>
  <base-view-component title="Characters" :data="characters" :loading="loading" type="character" />
</template>
<script lang="ts" setup>
import { computed, onMounted, onUnmounted } from 'vue'

import BaseViewComponent from '@/components/BaseViewComponent.vue'
import useCharacters from '@/composables/useCharacter'

const { loading, listCharacters, getCharacters } = useCharacters()

const characters = computed(() => listCharacters.value)

const handleScroll = async () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement
  if (scrollTop + clientHeight >= scrollHeight - 150 && !loading.value) {
    await getCharacters()
  }
}

onMounted(async () => {
  await getCharacters()
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
