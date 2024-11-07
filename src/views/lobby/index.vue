<script setup>
import { ref } from 'vue'

import Cursor from '@/components/Cursor.vue'
import Footer from '@/views/lobby/components/Footer.vue'
import Level from '@/views/lobby/components/Level.vue'
import Toolbox from '@/views/lobby/components/Toolbox.vue'
import Contact from '@/views/lobby/components/Contact.vue'
import Task from '@/views/lobby/components/Task.vue'
import Loading from '@/views/lobby/components/Loading.vue'
// import Background from '@/components/Background.vue'

const loading = ref(false)
const percent = ref(1)
const l2dOnly = ref(false)
const showBackground = import.meta.env.VITE_SHOW_BACKGROUND

import NProgress from 'nprogress'

import { useUserStore } from '@/store/userStore'
const userStore = useUserStore()

// 只在第一次打开网站时显示加载动画
if (userStore.isFirstOpen){
  NProgress.start()
  loading.value = true

  const load = setInterval(() => {
    percent.value = NProgress.status

    if (document.readyState === 'complete' && window.l2d_complete === true) {
      NProgress.done()
      percent.value = 1
      setTimeout(() => {
        loading.value = false
        userStore.isFirstOpen = false
      }, 2000)
      clearInterval(load)
    }
  }, 1)
}

const switchL2D = () => {
  l2dOnly.value = !l2dOnly.value
}

const imgSrc = ref("/l2d/hp_bg.png?t=" + new Date().toString())

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
  <main v-if="!loading">
    <!--<Background :l2dOnly="l2dOnly"></Background>-->
    <img v-if="showBackground === 'true'" :src="imgSrc" class="background-img" alt="メモロビイラスト">

    <div id="level-ref"></div>
    <transition name="up">
      <Level v-if="!l2dOnly"></Level>
    </transition>

    <div id="ap-ref"></div>
    <div id="credit-ref"></div>
    <div id="pyroxene-ref"></div>
    <Toolbox :l2dOnly="l2dOnly" @switch="switchL2D"></Toolbox>

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
        <span class="blue-text-color">{{ current + 1 }} / {{ total }}</span>
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
          <p class="blue-text-color mt-md-ml-10">当サイトをもっと知ることができます。</p>
        </template>
      </el-tour-step>

      <el-tour-step target="#ap-ref">
        <template #header>
          <h3 class="blue-text-color">AP</h3>
        </template>
        <template #default>
          <p class="blue-text-color mt-md-ml-10">10秒ごとに1AP自動回復します、チャージもできます。</p>
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
          <p class="blue-text-color mt-md-ml-10">青輝石無料配布中、しかし上限があります。</p>
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
  left: 20px;
  width: 280px;
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
</style>
