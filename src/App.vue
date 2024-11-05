<script setup>
import { onMounted, provide, ref } from 'vue'

import Cursor from '@/components/Cursor.vue'
import Footer from '@/components/Footer.vue'
import Level from '@/components/Level.vue'
import Toolbox from '@/components/Toolbox.vue'
import Contact from '@/components/Contact.vue'
import Task from '@/components/Task.vue'
import Loading from '@/components/Loading.vue'
// import Background from '@/components/Background.vue'

const loading = ref(true)
const percent = ref(1)
const l2dOnly = ref(false)

import NProgress from 'nprogress'

import getAccessAnalytics from '@/utils/cloudflareAnalytics'
import calculateLevelAndNextExp from '@/utils/calculateLevelAndNextExp'

NProgress.start()

const load = setInterval(() => {
  percent.value = NProgress.status
  if (document.readyState === 'complete' && window.l2d_complete === true) {
    NProgress.done()
    percent.value = 1
    setTimeout(() => {
      loading.value = false
    }, 2000)
    clearInterval(load)
  }
}, 1)

const switchL2D = () => {
  l2dOnly.value = !l2dOnly.value
}

const imgSrc = ref("/l2d/hp_bg.png?t=" + new Date().toString())

/**
 * 打开url
 * @param {String} url 要打开的目标地址
 */
const openUrl = (url) => {
  window.open(url, "_blank")
}
provide("openUrl", openUrl)

const sumPV = ref(0)
const exp = ref(0)
const level = ref(0)
const nextExp = ref(0)

onMounted(async () => {
  for (let i = 1; i <= 5; i++){
    console.warn("(｀・ω・´)b")
    console.error("(｀・ω・´)b")
  }

  // 统计页面page view总和
  sumPV.value = await getAccessAnalytics()

  // 计算当前等级和下一级所需经验
  exp.value = calculateLevelAndNextExp(sumPV.value).exp
  level.value = calculateLevelAndNextExp(sumPV.value).level
  nextExp.value = calculateLevelAndNextExp(sumPV.value).nextExp
})

const showGuide = ref(false)

/**
 * 开始漫游引导
 */
const startTourGuide = () => {
  showGuide.value = true
}
</script>

<template>
  <transition name="loading">
    <Loading v-if="loading" :percent="percent"></Loading>
  </transition>
  <div id="background"></div>
  <main v-if="!loading">
    <!--<Background :l2dOnly="l2dOnly"></Background>-->
    <!--<img :src="imgSrc" class="background-img" alt="メモロビイラスト">-->

    <transition name="up">
      <Level v-if="!l2dOnly" :exp="exp" :level="level" :next-exp="nextExp" :total="sumPV"></Level>
    </transition>

    <div id="toolbox-ref" class="toolbox-ref"></div>
    <Toolbox :l2dOnly="l2dOnly" @switch="switchL2D" :level="level"></Toolbox>

    <transition name="left">
      <Contact v-if="!l2dOnly" @start-guide="startTourGuide"></Contact>
    </transition>

    <Task :l2dOnly="l2dOnly"></Task>

    <transition name="down">
      <Footer v-if="!l2dOnly"></Footer>
    </transition>

    <div id="curtain"></div>

    <el-tour v-model="showGuide">
      <el-tour-step :target="levelRef?.$el" title="経験値とレベル">

      </el-tour-step>
      <el-tour-step :target="contactRef?.$el" title="サイト内リンク">

      </el-tour-step>
      <el-tour-step target="#toolbox-ref" title="AP、クレジットと青輝石">

      </el-tour-step>
      <el-tour-step :target="footerRef?.$el" title="外部リンク">

      </el-tour-step>
      <el-tour-step :target="taskRef?.$el" title="外部リンクその2">

      </el-tour-step>
    </el-tour>
  </main>
  <Cursor></Cursor>
</template>

<style scoped>
.background-img {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}

.toolbox-ref{
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 200px;
}

main {
  display: flex;
  flex-direction: column;
}

.loading-leave-to {
  opacity: 0;
}

.loading-leave-from {
  opacity: 1;
}

.loading-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.up-leave-to,
.up-enter-from {
  transform: translateY(-300px);
}

.up-leave-from,
.up-enter-to {
  transform: translateY(0);
}

.down-leave-to,
.down-enter-from {
  transform: translateY(300px) skew(-20deg);
}

.down-leave-from,
.down-enter-to {
  transform: translateY(0) skew(-20deg);
}

@media screen and (max-width: 495px) {
  .down-leave-to,
  .down-enter-from {
    transform: translateY(300px);
  }

  .down-leave-from,
  .down-enter-to {
    transform: translateY(0);
  }

  .up-leave-to,
  .up-enter-from {
    transform: translateY(-300px) skew(-10deg);
  }

  .up-leave-from,
  .up-enter-to {
    transform: translateY(0) skew(-10deg);
  }
}

.left-leave-to,
.left-enter-from {
  transform: translateX(-300px);
}

.left-leave-from,
.left-enter-to {
  transform: translateX(0);
}

.up-leave-active,
.down-leave-active,
.left-leave-active {
  transition: transform 0.3s ease-in;
}

.up-enter-active,
.down-enter-active,
.left-enter-active {
  transition: transform 0.3s ease-out;
}

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
</style>
