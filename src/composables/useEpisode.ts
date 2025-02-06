import { computed, ref } from 'vue'

import { axios } from '@/utils/axios'

import { episodeStore } from '@/store/episodeStore'

export default function () {
  const nextPage = ref<string | null>('episode')
  const loading = ref(false)

  const getEpisode = async () => {
    if (loading.value || !nextPage.value) return
    try {
      loading.value = true
      const { data } = await axios.get(nextPage.value)
      episodeStore.episodes = [...episodeStore.episodes, ...data.results]
      nextPage.value = data.info.next
    } catch (error) {
      throw new Error((error as Error).message || 'Error to get information')
    } finally {
      loading.value = false
    }
  }

  const filterEpisode = async (ParamsData: number[] | string) => {
    const { data } = await axios.get(`/episode/${ParamsData}`)
    return data
  }

  const listEpisodes = computed(() => episodeStore.episodes)

  return {
    getEpisode,
    listEpisodes,
    filterEpisode,
    loading,
  }
}
