import { ref, computed } from 'vue'

import { axios } from '@/utils/axios'

import { locationStore } from '../store/locationStore'

export default function () {
  const nextPage = ref<string | null>('/location')
  const loading = ref(false)

  const getLocation = async () => {
    if (loading.value || !nextPage.value) return
    try {
      loading.value = true
      const { data } = await axios.get(nextPage.value)
      locationStore.locations = [...locationStore.locations, ...data.results]
      nextPage.value = data.info.next
    } catch (error) {
      throw new Error((error as Error).message || 'Error to get locations')
    } finally {
      loading.value = false
    }
  }
  const filterLocation = async (paramsData: number[] | string) => {
    const { data } = await axios.get(`/location/${paramsData}`)
    return data
  }

  const listLocations = computed(() => locationStore.locations)

  return {
    getLocation,
    listLocations,
    filterLocation,
    loading,
  }
}
