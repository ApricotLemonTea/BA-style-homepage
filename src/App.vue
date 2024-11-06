<script setup>
import { onMounted } from 'vue'
import { useUserStore } from './store/userStore'
import Cursor from '@/components/Cursor.vue'

const userStore = useUserStore()

onMounted(() => {
  console.log("aaa")
  // 开启自动回复AP的倒计时
  userStore.startApInterval()
})
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
