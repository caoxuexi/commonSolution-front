<template>
  <div class="w-full">
    <m-search v-model="inputValue">
      <template #dropdown>
        <div class="dark:text-white">dropdown</div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')
</script>