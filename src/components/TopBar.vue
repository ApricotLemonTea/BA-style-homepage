<script setup>
import { useUserStore } from '@/store/userStore'

const userStore = useUserStore()
</script>

<template>
  <p>ap: {{ userStore.ap }} / {{ userStore.maxAp }}</p>
  <p>credit: {{ userStore.credit }}</p>
  <p>pyroxene: {{ userStore.pyroxene }}</p>
</template>

<style scoped>

</style>