<template>
  <router-link
    :to="{ name: props.link }"
    class="flex justify-center items-center bg-red-400 rounded-xl text-white px-2 w-full shadow-md shadow-red-400 hover:shadow-none cursor-pointer transition-all ease-in duration-300 hover:bg-red-500 md:text-2xl"
  >
    <p class="m-4 md:m-7">{{ props.text }}</p>
  </router-link>
</template>
<script lang="ts" setup>
const props = defineProps<{
  text: string
  link: string
}>()
</script>
