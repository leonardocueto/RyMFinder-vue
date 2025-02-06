<template>
  <div>1</div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import { useRoute } from 'vue-router'

import useLocation from '@/composables/useLocation'

const route = useRoute()
const id = route.params.id
const isLoading = ref(true)

const { filterLocation } = useLocation()

onMounted(async () => {
  isLoading.value = true
  const result = await filterLocation(id.toString())
  console.log(result)
  isLoading.value = false
})
</script>
