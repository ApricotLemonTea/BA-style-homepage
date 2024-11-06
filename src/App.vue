<script setup>
import Cursor from '@/components/Cursor.vue'
</script>

<template>
  <main>
    <RouterView name="topBar"></RouterView>
    <RouterView name="main"></RouterView>
  </main>
  <Cursor></Cursor>
</template>

<style scoped>
</style>
