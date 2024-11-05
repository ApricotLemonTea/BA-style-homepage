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

    <div id="level-ref"></div>
    <transition name="up">
      <Level v-if="!l2dOnly" :exp="exp" :level="level" :next-exp="nextExp" :total="sumPV"></Level>
    </transition>

    <div id="ap-ref"></div>
    <div id="credit-ref"></div>
    <div id="pyroxene-ref"></div>
    <Toolbox :l2dOnly="l2dOnly" @switch="switchL2D" :level="level"></Toolbox>

    <div id="contact-ref"></div>
    <transition name="left">
      <Contact v-if="!l2dOnly" @start-guide="startTourGuide"></Contact>
    </transition>

    <div id="task-ref"></div>
    <Task :l2dOnly="l2dOnly"></Task>

    <div id="footer-ref"></div>
    <transition name="down">
      <Footer v-if="!l2dOnly"></Footer>
    </transition>

    <div id="curtain"></div>

    <el-tour v-model="showGuide" :target-area-clickable="false">
      <template #indicators="{ current, total }">
        <span>{{ current + 1 }} / {{ total }}</span>
      </template>

      <el-tour-step target="#level-ref">
        <template #header>
          <h3 class="blue-text-color">経験値とレベル</h3>
        </template>
        <template #default>
          <p class="blue-text-color mt-md-ml-10">サイトの訪問数が増えると経験値が上がって、レベルもアップします。</p>
        </template>
      </el-tour-step>

      <el-tour-step target="#contact-ref">
        <template #header>
          <h3 class="blue-text-color">サイト内リンク</h3>
        </template>
        <template #default>
          <p class="blue-text-color mt-md-ml-10">このサイトについてもっと知ることができます。</p>
        </template>
      </el-tour-step>

      <el-tour-step target="#ap-ref">
        <template #header>
          <h3 class="blue-text-color">AP</h3>
        </template>
        <template #default>
          <p class="blue-text-color mt-md-ml-10">10sごとに1AP自動回復します、チャージもできます。</p>
        </template>
      </el-tour-step>

      <el-tour-step target="#credit-ref">
        <template #header>
          <h3 class="blue-text-color">クレジット</h3>
        </template>
        <template #default>
          <p class="blue-text-color mt-md-ml-10">クリックすることでギャンブル(?)できます。</p>
        </template>
      </el-tour-step>

      <el-tour-step target="#pyroxene-ref">
        <template #header>
          <h3 class="blue-text-color">青輝石</h3>
        </template>
        <template #default>
          <p class="blue-text-color mt-md-ml-10">青輝石無料配布中、しかし上限はあります。</p>
        </template>
      </el-tour-step>

      <el-tour-step target="#task-ref" placement="top-end">
        <template #header>
          <h3 class="blue-text-color">外部リンク</h3>
        </template>
        <template #default>
          <p class="blue-text-color mt-md-ml-10">Xfolioのサイトに移動します、杏仁レモンティーのポートフォリオみたいなものです。</p>
        </template>
      </el-tour-step>

      <el-tour-step target="#footer-ref" placement="top">
        <template #header>
          <h3 class="blue-text-color">外部リンクその他</h3>
        </template>
        <template #default>
          <p class="blue-text-color mt-md-ml-10">杏仁レモンティーのSNSなどの外部リンクです。</p>
        </template>
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
#level-ref {
  position: fixed;
  top: 30px;
  left: 0;
  width: 330px;
  height: 120px;
}
#contact-ref {
  position: fixed;
  top: 150px;
  left: 15px;
  width: 285px;
  height: 200px;
}
#ap-ref {
  position: fixed;
  top: 20px;
  right: 605px;
  width: 230px;
  height: 90px;
}
#credit-ref {
  position: fixed;
  top: 20px;
  right: 366px;
  width: 230px;
  height: 90px;
}
#pyroxene-ref {
  position: fixed;
  top: 20px;
  right: 127px;
  width: 230px;
  height: 90px;
}
#task-ref {
  position: fixed;
  bottom: 130px;
  right: 30px;
  width: 200px;
  height: 160px;
}
#footer-ref {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 140px;
}

.mt-md-ml-10 {
  margin: 10px 0 10px 10px;
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
