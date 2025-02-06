<template>
  <div>1</div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import { useRoute } from 'vue-router'

import useEpisode from '@/composables/useEpisode'

const route = useRoute()
const id = route.params.id
const isLoading = ref(true)

const { filterEpisode } = useEpisode()

onMounted(async () => {
  isLoading.value = true
  const result = await filterEpisode(id.toString())
  console.log(result)
  isLoading.value = false
})
</script>
