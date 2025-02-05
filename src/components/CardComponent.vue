<template>
  <article
    class="bg-blue-200 size-full rounded-xl p-2 md:p-4 shadow-lg cursor-pointer hover:scale-110 transition-all group-hover:grayscale hover:!blur-none hover:!grayscale-0 ease-in"
  >
    <div v-if="loading" class="animate-spin w-5">
      <icon-component icon="IconLoader2" size="small" />
    </div>

    <div v-else class="flex gap-2 justify-between items-start h-full">
      <header class="flex flex-col justify-between text-white flex-1 min-w-0 min-h-full gap-2">
        <h1 class="font-semibold md:font-bold text-xs md:text-xl line-clamp-2 break-words">
          {{ props.title }}
        </h1>

        <div class="flex flex-col max-w-16 gap-1">
          <pill-component :text="props.status" />
          <pill-component :text="props.gender" />
        </div>
      </header>

      <div class="size-20 md:w-38 md:h-38 flex-shrink-0 aspect-square">
        <img
          class="size-full rounded-2xl"
          :src="props.image"
          :alt="`img-${props.title}`"
          :title="`Imagen de ${props.title}`"
        />
      </div>
    </div>
  </article>
</template>
<script lang="ts" setup>
import IconComponent from '@/components/IconComponent.vue'
import PillComponent from '@/components/PillComponent.vue'
const props = withDefaults(
  defineProps<{
    title: string
    status: string
    gender: string
    image: string
    loading: boolean
  }>(),
  {
    title: 'Rick Sanchez',
    status: 'Alive',
    gender: 'Male',
  },
)
</script>
