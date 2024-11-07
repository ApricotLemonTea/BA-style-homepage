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
    <RouterView name="topBar" v-slot="{ Component }">
      <transition name="up">
        <component :is="Component"></component>
      </transition>
    </RouterView>

    <RouterView v-slot="{ Component }">
      <transition name="fold">
        <component :is="Component" />
      </transition>
    </RouterView>
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

/* 离开动画（从上下合拢） */
.fold-leave-from {
  transform: scaleY(1); /* 展开状态 */
}
.fold-leave-to {
  transform: scaleY(0); /* 合拢状态 */
}
.fold-leave-active {
  transition: transform 0.25s ease-in-out; /* 动画持续时间 */
  transform-origin: center; /* 从中心展开或收缩 */
}
/* 从页面下方进入的动画 */
.fold-enter-from {
  transform: translateY(300px); /* 展开状态 */
}
.fold-enter-to {
  transform: translateY(0); /* 合拢状态 */
}
.fold-enter-active {
  transition: transform 0.25s; /* 动画持续时间 */
  transform-origin: bottom; /* 从中心展开或收缩 */
}

.up-leave-to,
.up-enter-from {
  transform: translateY(300px);
}
.up-leave-from,
.up-enter-to {
  transform: translateY(0);
}
.up-enter-active, .up-leave-active {
  transition: transform 5s ease-in-out; /* 动画持续时间 */
  transform-origin: top;
}
</style>
