<script setup>
import { onMounted } from 'vue'
import { useUserStore } from './store/userStore'
import Cursor from '@/components/Cursor.vue'
import getAccessAnalytics from './utils/cloudflareAnalytics'
import { Modal } from '@arco-design/web-vue'

const userStore = useUserStore()

/**
 * 判断浏览器的宽度，不适配时弹出提示
 */
const checkWindowSize = () => {
  // 只在第一次打开网站时弹出提示
  if (window.innerWidth < 1200 && userStore.isFirstOpen){
    Modal.open({
      title: "メッセージ",
      content: "PCでの閲覧を推奨します、スマホは今後対応します。",
      okText: "はい",
      hideCancel: true
    })
  }
}

onMounted(async () => {
  // 控制台打印颜文字
  for (let i = 1; i <= 5; i++) {
    console.warn("(｀・ω・´)b")
    console.error("(｀・ω・´)b")
  }

  // 判断浏览器宽度是否适合显示
  checkWindowSize()

  // 统计页面page view总和并存储到store中
  userStore.totalVisitor = await getAccessAnalytics()
  // 初始化当前ap
  userStore.initAp()
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
