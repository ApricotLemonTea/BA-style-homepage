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
  userStore.startGlobalInterval()
})
</script>

<template>
  <div id="background"></div>
  <main>
    <transition name="view-animation" mode="out-in">
      <RouterView />
    </transition>
  </main>
  <Cursor></Cursor>
</template>

<style scoped>
#background {
  background-image: url('/shitim/Event_Main_Stage_Bg.png');
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* 从页面下方进入的动画 */
.view-animation-enter-from {
  opacity: 0; /* 初始状态：完全透明 */
}
.view-animation-enter-to {
  opacity: 1; /* 最终状态：完全不透明 */
}
.view-animation-enter-active {
  transition: opacity 0.5s; /* 淡入 */
}

/* 离开动画 */
.view-animation-leave-from {
  opacity: 1; /* 初始状态：完全不透明 */
  transform: translateY(0); /* 初始位置：正常位置 */
}
.view-animation-leave-to {
  opacity: 0; /* 最终状态：完全透明 */
  transform: translateY(-1000px); /* 最终位置：向上偏移 */
}
.view-animation-leave-active {
  transition: opacity 0.25s, transform 0.25s ease-in-out; /* 淡出并同时做位置过渡 */
  transform-origin: bottom;
}

</style>
