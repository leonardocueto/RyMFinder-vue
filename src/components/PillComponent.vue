<template>
  <p
    class="text-[10px] md:text-base font-semibold bg-blue-300 text-center rounded-full px-2 py-1 w-12 h-5 md:w-18 md:h-8"
  >
    {{ props.text }}
  </p>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    text: string
  }>(),
  {
    text: '',
  },
)
</script>
