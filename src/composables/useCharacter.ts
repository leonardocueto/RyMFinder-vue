import { computed, ref } from 'vue'

import { axios } from '@/utils/axios'

import { characterStore } from '@/store/characterStore'

export default function () {
  const nextPage = ref<string | null>('/character')
  const loading = ref(false)

  const getCharacters = async () => {
    if (loading.value || !nextPage.value) return

    try {
      loading.value = true
      const { data } = await axios.get(nextPage.value)
      characterStore.characters = [...characterStore.characters, ...data.results]
      nextPage.value = data.info.next
    } catch (error) {
      throw new Error((error as Error).message || 'Error to get characters')
    } finally {
      loading.value = false
    }
  }

  const filterCharacter = async (paramsData: number[] | string) => {
    const { data } = await axios.get(`/character/${paramsData}`)
    return data
  }

  const listCharacters = computed(() => characterStore.characters)

  return {
    getCharacters,
    listCharacters,
    filterCharacter,
    loading,
  }
}
