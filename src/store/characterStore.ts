import type { ICharacter } from '@/interface/character.interface'
import { reactive } from 'vue'

export const characterStore = reactive({
  characters: [] as ICharacter[],
})
