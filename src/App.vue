<script setup>
import { h, onMounted, watch, computed } from 'vue'
import { useUserStore } from './store/userStore'
import Cursor from '@/components/Cursor.vue'
import getAccessAnalytics from './utils/cloudflareAnalytics'
import { Modal } from '@arco-design/web-vue'
import { openUrl } from './utils/commonFunctions'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const userStore = useUserStore()

/**
 * 判断浏览器的宽度，不适配时弹出提示
 */
const checkWindowSize = () => {
  // 只在第一次打开网站时弹出提示
  if (window.innerWidth < 1200 && userStore.isFirstOpen){
    Modal.open({
      title: t("notice.メッセージ"),
      content: () => [
        h("p", { class: "blue-text-color" }, t("notice.PCでの閲覧を推奨します、スマホは今後対応します。")),
        h("p", { class: "blue-text-color" }, t("notice.このまま進むとレイアウトが正しく表示できない場合があります。")),
        h("br", {}, ""),
        h("p", { class: "blue-text-color" }, t("notice.旧リンクまとめサイトのLit Linkに移動しますか？")),
      ],
      okText: t("はい"),
      cancelText: t("いいえ"),
      onOk: () => { openUrl("https://lit.link/ApricotLemonTea", "_self") }
    })
  }
}

onMounted(async () => {
  // 控制台打印(｀・ω・´)b
  for (let i = 1; i <= 5; i++) {
    console.warn("(｀・ω・´)b")
    console.error("(｀・ω・´)b")
  }

  // 切换背景图
  userStore.changeBackground()

  // 判断浏览器宽度是否适合显示
  checkWindowSize()

  // 统计页面访问量总和并存储到store中
  userStore.totalAccess = await getAccessAnalytics()
  // 初始化当前ap
  userStore.initAp()
  // 开启自动回复AP的倒计时
  userStore.startGlobalInterval()
})

/**
 * 全局监听信用点数量变化，并存储到storage中
 */
const credit = computed(() => {
  return userStore.credit
})
watch(credit, (newCredit) => {
  localStorage.setItem("credit", (newCredit || 0).toString())
})

/**
 * 全局监听青辉石数量变化
 */
const pyroxene = computed(() => {
  return userStore.pyroxene
})
watch(pyroxene, (newPyroxene) => {
  localStorage.setItem("pyroxene", (newPyroxene || 0).toString())
})
</script>

<template>
  <div id="background" :style="userStore.curtainStyle"></div>
  <main>
    <transition name="view-animation" mode="out-in">
      <RouterView />
    </transition>
  </main>
  <Cursor></Cursor>
</template>

<style scoped>
#background {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* 淡入淡出的动画 */
.view-animation-enter-from,
.view-animation-leave-to{
  opacity: 0;
}
.view-animation-enter-to,
.view-animation-leave-from{
  opacity: 1;
}
.view-animation-enter-active,
.view-animation-leave-active{
  transition: 0.5s;
}
</style>
