<template>
  <component :is="iconComponent" :key="iconComponent" :class="iconSizeClass" :color="color" />
</template>

<script setup lang="ts">
import TablerIcons from '@/assets/icons'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    icon: string
    size?: 'xxs' | 'small' | 'medium' | 'large'
    color?: string
  }>(),
  {
    icon: '',
    size: 'medium',
    color: 'gray',
  },
)

const iconComponent = computed(() => TablerIcons[props.icon as keyof typeof TablerIcons])

// Clases de tamaño responsivo
const iconSizeClass = computed(() => {
  switch (props.size) {
    case 'xxs':
      return 'w-2.5 h-2.5 sm:w-4 sm:h-4' // xxs en móvil, small en pantallas más grandes
    case 'small':
      return 'w-4 h-4 sm:w-5 sm:h-5'
    case 'medium':
      return 'w-5 h-5 sm:w-6 sm:h-6'
    case 'large':
      return 'w-6 h-6 sm:w-8 sm:h-8'
    default:
      return 'w-5 h-5 sm:w-6 sm:h-6'
  }
})
</script>
