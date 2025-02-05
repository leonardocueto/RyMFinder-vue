import { reactive } from 'vue'
import type { IEpisode } from '@/interface/episode.interface'

export const episodeStore = reactive({
  episodes: [] as IEpisode[],
})
