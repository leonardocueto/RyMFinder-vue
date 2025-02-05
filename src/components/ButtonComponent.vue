<template>
  <button
    type="submit"
    class="absolute left-0 text-black p-2 rounded-l-full hover:bg-gray-200 cursor-pointer"
    :disabled="props.disabled"
  >
    <div v-if="loading" class="animate-spin w-5">
      <icon-component icon="IconLoader2" size="small" />
    </div>
    <slot v-else />
  </button>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    loading?: boolean
    disabled?: boolean
  }>(),
  {
    loading: false,
    disabled: false,
  },
)

import IconComponent from '@/components/IconComponent.vue'
</script>
