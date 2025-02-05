<template>
  <form @submit.prevent="handleSubmit" class="relative">
    <input-component
      v-model="text"
      :disabled="loading"
      placeholder="Search Character, location, episode, etc."
    />
    <button-component :loading="loading" :disabled="loading">
      <icon-component icon="IconSearch" size="medium" />
    </button-component>
  </form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import InputComponent from '@/components/ImputComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import IconComponent from '@/components/IconComponent.vue'
const text = ref('')
const loading = ref(false)
const handleSubmit = () => {
  if (text.value.length > 0) {
    loading.value = true
    setTimeout(() => {
      console.log(text.value.trim())

      text.value = ''
      loading.value = false
    }, 1000)
  }
}
</script>
