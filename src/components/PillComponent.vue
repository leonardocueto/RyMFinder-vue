<template>
  <div :class="['flex justify-center items-center text-center rounded-full p-1', bg]">
    <icon-component :icon="icon" size="small" color="white" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import IconComponent from '@/components/IconComponent.vue'

const icon = ref('')
const props = withDefaults(
  defineProps<{
    text: string
    bg: string
  }>(),
  {
    text: '',
    bg: '',
  },
)

switch (props.text) {
  case 'Alive':
    icon.value = 'IconHeart'
    break
  case 'Dead':
    icon.value = 'IconSkull'
    break
  case 'Male':
    icon.value = 'IconGenderMale'
    break
  case 'Female':
    icon.value = 'IconGenderFemale'
    break
  default:
    icon.value = 'IconQuestionMark'
    break
}
</script>
