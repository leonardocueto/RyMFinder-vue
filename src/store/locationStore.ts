import type { ILocation } from '@/interface/location.interface'
import { reactive } from 'vue'

export const locationStore = reactive({
  locations: [] as ILocation[],
})
