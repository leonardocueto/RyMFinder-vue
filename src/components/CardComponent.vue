<template>
  <router-link
    :to="params"
    :class="[
      'size-full rounded-xl p-2 md:p-4 shadow-lg cursor-pointer hover:scale-110 transition-all group-hover:grayscale hover:!blur-none hover:!grayscale-0 ease-in hover:z-10',

      gender === 'Female'
        ? 'bg-custom-soft-purple'
        : gender === 'Male'
          ? 'bg-custom-turquoise'
          : 'bg-custom-lime',
      type === 'episode' ? 'bg-custom-soft-yellow' : '',
    ]"
  >
    <div v-if="loading" class="animate-spin w-5">
      <icon-component icon="IconLoader2" size="small" />
    </div>

    <div v-else class="flex gap-2 justify-between items-center h-full">
      <slot v-if="type === 'character'">
        <header :class="['flex flex-col justify-between flex-1 min-w-0 min-h-full gap-2']">
          <h1
            :class="[
              'font-semibold md:font-bold text-xs md:text-xl line-clamp-2 break-words',
              color,
            ]"
          >
            {{ title }}
          </h1>

          <div class="flex flex-col md:flex-row w-8 md:max-w-12 gap-1">
            <pill-component :text="status" :bg="bg" />
            <pill-component :text="gender" :bg="bg" />
          </div>
        </header>

        <div class="size-20 md:w-38 md:h-38 flex-shrink-0 aspect-square">
          <img
            class="size-full rounded-2xl"
            :src="image"
            :alt="`img-${title}`"
            :title="`Imagen de ${title}`"
          />
        </div>
      </slot>
      <slot v-else-if="type === 'location' || type === 'episode'">
        <div
          class="flex items-center justify-center text-center size-20 md:size-38 min-w-full min-h-full"
        >
          <h1
            :class="[
              'font-semibold md:font-bold text-xs md:text-3xl line-clamp-2 break-words ',
              type === 'location' ? color : 'text-custom-brown',
            ]"
          >
            {{ title }}
          </h1>
        </div>
      </slot>
    </div>
  </router-link>
</template>
<script lang="ts" setup>
import IconComponent from '@/components/IconComponent.vue'
import PillComponent from '@/components/PillComponent.vue'
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    title: string
    status?: string
    gender?: string
    image?: string
    loading: boolean
    type: string
    id?: number
  }>(),
  {
    title: 'Unknown',
    status: '',
    gender: '',
    image: '',
    type: '',
    id: 0,
  },
)

const color = ref('')
const bg = ref('')
const params = `${props.type}/${props.id}`

if (props.gender === 'Male') {
  color.value = 'text-custom-turquoise-black'
  bg.value = 'bg-custom-turquoise-black'
} else {
  color.value = 'text-custom-purple'
  bg.value = 'bg-custom-purple'
}
</script>
