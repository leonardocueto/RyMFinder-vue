<template>
  <component :is="iconComponent" :key="iconComponent" :size="size" :color="color" />
</template>
<script setup lang="ts">
import TablerIcons from '@/assets/icons'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    icon: string
    size?: 'small' | 'medium' | 'large'
    color?: string
  }>(),
  {
    icon: '',
    size: 'medium',
    color: 'gray',
  },
)

const iconComponent = computed(() => TablerIcons[props.icon as keyof typeof TablerIcons])

const size = computed(() => {
  switch (props.size) {
    case 'small':
      return 20
    case 'medium':
      return 25
    case 'large':
      return 40
    default:
      return 30
  }
})
</script>
