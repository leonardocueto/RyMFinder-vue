<template>
  <base-view-component title="Episode" :data="episodes" :loading="loading" type="episode" />
</template>
<script lang="ts" setup>
import { computed, onMounted, onUnmounted } from 'vue'

import BaseViewComponent from '@/components/BaseViewComponent.vue'
import useEpisode from '@/composables/useEpisode'

const { getEpisode, listEpisodes, loading } = useEpisode()

const episodes = computed(() => listEpisodes.value)

const handleScroll = async () => {
  const { scrollHeight, clientHeight, scrollTop } = document.documentElement
  if (scrollTop + clientHeight >= scrollHeight - 150 && !loading.value) {
    await getEpisode()
  }
}

onMounted(async () => {
  await getEpisode()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(async () => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
