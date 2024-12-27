<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

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
const envShowBackground = import.meta.env.VITE_SHOW_BACKGROUND

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
</script>

<template>
  <transition name="loading">
    <Loading v-if="loading" :percent="percent"></Loading>
  </transition>
  <main v-if="!loading">
    <!--<Background :l2dOnly="l2dOnly"></Background>-->
    <img v-if="envShowBackground === 'true'" :src="imgSrc" class="background-img" alt="">

    <div id="level-ref"></div>
    <transition name="left">
      <Level v-if="!l2dOnly"></Level>
    </transition>

    <div id="ap-ref"></div>
    <div id="credit-ref"></div>
    <div id="pyroxene-ref"></div>
    <div id="locale-ref"></div>
    <Toolbox :l2dOnly="l2dOnly" @switch="switchL2D"></Toolbox>

    <div id="contact-ref"></div>
    <transition name="left">
      <Contact v-if="!l2dOnly" @start-guide="()=>{ showGuide = true }"></Contact>
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
          <h3 class="blue-text-color">{{ t("guide.プロフィールと経験値とレベル") }}</h3>
        </template>
        <template #default>
          <p class="blue-text-color mt-md-ml-10">{{ t("guide.クリックするとプロフィール画面に移動します。") }}</p>
          <p class="blue-text-color mt-md-ml-10">{{ t("guide.サイトの訪問数が増えると経験値が上がって、レベルもアップします。") }}</p>
        </template>
      </el-tour-step>

      <el-tour-step target="#contact-ref">
        <template #header>
          <h3 class="blue-text-color">{{ t("guide.ゲーム内機能のコーナー") }}</h3>
        </template>
        <template #default>
          <p class="blue-text-color mt-md-ml-10">{{ t("guide.ゲーム内の機能を再現しようとするコーナーです。") }}</p>
          <p class="blue-text-color mt-md-ml-10">{{ t("guide.もちろん実際の内容はゲームと異なります。") }}</p>
        </template>
      </el-tour-step>

      <el-tour-step target="#ap-ref">
        <template #header>
          <h3 class="blue-text-color">{{ t("guide.AP") }}</h3>
        </template>
        <template #default>
          <p class="blue-text-color mt-md-ml-10">{{ t("guide.10秒ごとに1AP自動回復します、チャージもできます。") }}</p>
        </template>
      </el-tour-step>

      <el-tour-step target="#credit-ref">
        <template #header>
          <h3 class="blue-text-color">{{ t("guide.クレジット") }}</h3>
        </template>
        <template #default>
          <p class="blue-text-color mt-md-ml-10">{{ t("guide.クリックすることでギャンブル(?)できます。") }}</p>
          <p class="blue-text-color mt-md-ml-10">{{ t("guide.一回10APを消費します。") }}</p>
        </template>
      </el-tour-step>

      <el-tour-step target="#pyroxene-ref">
        <template #header>
          <h3 class="blue-text-color">{{ t("guide.青輝石") }}</h3>
        </template>
        <template #default>
          <p class="blue-text-color mt-md-ml-10">{{ t("guide.青輝石一日一回無料配布。（ログインボーナス！）") }}</p>
        </template>
      </el-tour-step>

      <el-tour-step target="#locale-ref">
        <template #header>
          <h3 class="blue-text-color">{{ t("guide.言語切替") }}</h3>
        </template>
        <template #default>
          <p class="blue-text-color mt-md-ml-10">{{ t("guide.他の言語に切り替えられます。") }}</p>
        </template>
      </el-tour-step>

      <el-tour-step target="#task-ref" placement="top-end">
        <template #header>
          <h3 class="blue-text-color">{{ t("guide.外部リンク") }}</h3>
        </template>
        <template #default>
          <p class="blue-text-color mt-md-ml-10">{{ t("guide.Xfolioのサイトに移動します、杏仁レモンティーのポートフォリオみたいなものです。") }}</p>
        </template>
      </el-tour-step>

      <el-tour-step target="#footer-ref" placement="top">
        <template #header>
          <h3 class="blue-text-color">{{ t("guide.外部リンクその他") }}</h3>
        </template>
        <template #default>
          <p class="blue-text-color mt-md-ml-10">{{ t("guide.杏仁レモンティーのSNSなどの外部リンクです。") }}</p>
        </template>
      </el-tour-step>
    </el-tour>
  </main>
  <Cursor></Cursor>
</template>

<style scoped>
.background-img {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}
#level-ref {
  position: fixed;
  top: 30px;
  left: 0;
  width: 380px;
  height: 120px;
}
#contact-ref {
  position: fixed;
  top: 160px;
  left: 20px;
  width: 280px;
  height: 190px;
}
#ap-ref {
  position: fixed;
  top: 20px;
  right: 700px;
  width: 240px;
  height: 90px;
}
#credit-ref {
  position: fixed;
  top: 20px;
  right: 460px;
  width: 240px;
  height: 90px;
}
#pyroxene-ref {
  position: fixed;
  top: 20px;
  right: 220px;
  width: 240px;
  height: 90px;
}
#locale-ref {
  position: fixed;
  top: 20px;
  right: 120px;
  width: 100px;
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
