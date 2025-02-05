<template>
  <input
    type="text"
    class="w-full py-2 pl-15 bg-gray-100 rounded-3xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
    :value="modelValue"
    @input="updateValue"
    :disabled="props.disabled"
    :placeholder="props.placeholder"
  />
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: string
    disabled: boolean
    placeholder: string
  }>(),
  {
    modelValue: '',
    disabled: false,
    placeholder: '',
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()
function updateValue(event: Event) {
  const input = event.target as HTMLInputElement
  emit('update:modelValue', input.value)
}
</script>
