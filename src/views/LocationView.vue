<template>
  <base-view-component title="Location" :data="locations" :loading="loading" type="location" />
</template>
<script lang="ts" setup>
import { computed, onMounted, onUnmounted } from 'vue'

import BaseViewComponent from '@/components/BaseViewComponent.vue'
import useLocation from '@/composables/useLocation'

const { getLocation, listLocations, loading } = useLocation()

const locations = computed(() => listLocations.value)

const handleScroll = async () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement

  if (scrollTop + clientHeight >= scrollHeight - 150 && !loading.value) {
    await getLocation()
  }
}

onMounted(async () => {
  await getLocation()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
