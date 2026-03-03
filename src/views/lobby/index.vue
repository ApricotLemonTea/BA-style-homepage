<script setup>
import { ref, onMounted, computed } from 'vue'
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

onMounted(() => {
  // 删除旧的是否显示欢迎信息弹窗的标记
  localStorage.removeItem('hasVisited')
})

// 只在第一次打开网站时显示加载动画
if (userStore.isFirstOpen) {
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

const backgrounds = ['/l2d/hp_bg.png', '/l2d/hp_bg2.png']
const currentBgIndex = ref(0)
const isSwitchingBg = ref(false)
const bgDirection = ref('right')
const prevBgSrc = ref('')
const nextBgSrc = ref('')
const nextBgIndex = ref(0)

const getBgSrc = (index) => backgrounds[index]

const currentBgSrc = computed(() => getBgSrc(currentBgIndex.value))

const switchBg = (step = 1) => {
  if (isSwitchingBg.value) return
  const len = backgrounds.length
  const targetIndex = (currentBgIndex.value + step + len) % len

  bgDirection.value = step > 0 ? 'right' : 'left'
  prevBgSrc.value = getBgSrc(currentBgIndex.value)
  nextBgSrc.value = getBgSrc(targetIndex)
  nextBgIndex.value = targetIndex
  isSwitchingBg.value = true
}

const handleBgAnimationEnd = () => {
  currentBgIndex.value = nextBgIndex.value
  isSwitchingBg.value = false
}

const showGuide = ref(false)
</script>

<template>
  <transition name="loading">
    <Loading v-if="loading" :percent="percent"></Loading>
  </transition>
  <main v-if="!loading">
    <!--<Background :l2dOnly="l2dOnly"></Background>-->
    <div v-if="envShowBackground === 'true'" class="background-wrapper">
      <img
        v-if="!isSwitchingBg"
        :src="currentBgSrc"
        class="background-img"
        alt=""
      />
      <template v-else>
        <img
          :src="prevBgSrc"
          :class="[
            'background-img',
            bgDirection === 'right' ? 'bg-slide-out-left' : 'bg-slide-out-right'
          ]"
          alt=""
          @animationend="handleBgAnimationEnd"
        />
        <img
          :src="nextBgSrc"
          :class="[
            'background-img',
            bgDirection === 'right' ? 'bg-slide-in-right' : 'bg-slide-in-left'
          ]"
          alt=""
        />
      </template>
    </div>
    <button
      v-if="envShowBackground === 'true'"
      class="bg-arrow bg-arrow-left"
      type="button"
      @click="switchBg(-1)"
    >
      <img src="/l2d/arrow.png" alt="prev" />
    </button>
    <button
      v-if="envShowBackground === 'true'"
      class="bg-arrow bg-arrow-right"
      type="button"
      @click="switchBg(1)"
    >
      <img src="/l2d/arrow.png" alt="next" />
    </button>

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
      <Contact
        v-if="!l2dOnly"
        @start-guide="
          () => {
            showGuide = true
          }
        "
      ></Contact>
    </transition>

    <div id="task-ref"></div>
    <Task :l2dOnly="l2dOnly"></Task>

    <div id="footer-ref"></div>
    <transition name="down">
      <Footer v-if="!l2dOnly"></Footer>
    </transition>

    <div id="curtain"></div>

    <!--漫游引导-->
    <el-tour v-model="showGuide" :target-area-clickable="false">
      <template #indicators="{ current, total }">
        <span class="blue-text-color">{{ current + 1 }} / {{ total }}</span>
      </template>

      <el-tour-step target="#level-ref">
        <template #header>
          <h3 class="blue-text-color">{{ t('guide.プロフィールと経験値とレベル') }}</h3>
        </template>
        <template #default>
          <p class="blue-text-color mt-md-ml-10">
            {{ t('guide.クリックするとプロフィール画面に移動します。') }}
          </p>
          <p class="blue-text-color mt-md-ml-10">
            {{ t('guide.サイトの訪問数が増えると経験値が上がって、レベルもアップします。') }}
          </p>
        </template>
      </el-tour-step>

      <el-tour-step target="#contact-ref">
        <template #header>
          <h3 class="blue-text-color">{{ t('guide.ゲーム内機能のコーナー') }}</h3>
        </template>
        <template #default>
          <p class="blue-text-color mt-md-ml-10">
            {{ t('guide.ゲーム内の機能を再現しようとするコーナーです。') }}
          </p>
          <p class="blue-text-color mt-md-ml-10">
            {{ t('guide.もちろん実際の内容はゲームと異なります。') }}
          </p>
        </template>
      </el-tour-step>

      <el-tour-step target="#ap-ref">
        <template #header>
          <h3 class="blue-text-color">{{ t('guide.AP') }}</h3>
        </template>
        <template #default>
          <p class="blue-text-color mt-md-ml-10">
            {{ t('guide.10秒ごとに1AP自動回復します、チャージもできます。') }}
          </p>
        </template>
      </el-tour-step>

      <el-tour-step target="#credit-ref">
        <template #header>
          <h3 class="blue-text-color">{{ t('guide.クレジット') }}</h3>
        </template>
        <template #default>
          <p class="blue-text-color mt-md-ml-10">
            {{ t('guide.クリックすることでギャンブル(?)できます。') }}
          </p>
          <p class="blue-text-color mt-md-ml-10">{{ t('guide.一回10APを消費します。') }}</p>
        </template>
      </el-tour-step>

      <el-tour-step target="#pyroxene-ref">
        <template #header>
          <h3 class="blue-text-color">{{ t('guide.青輝石') }}</h3>
        </template>
        <template #default>
          <p class="blue-text-color mt-md-ml-10">
            {{ t('guide.青輝石一日一回無料配布。（ログインボーナス！）') }}
          </p>
        </template>
      </el-tour-step>

      <el-tour-step target="#locale-ref">
        <template #header>
          <h3 class="blue-text-color">{{ t('guide.言語切替') }}</h3>
        </template>
        <template #default>
          <p class="blue-text-color mt-md-ml-10">{{ t('guide.他の言語に切り替えられます。') }}</p>
        </template>
      </el-tour-step>

      <el-tour-step target="#task-ref" placement="top-end">
        <template #header>
          <h3 class="blue-text-color">{{ t('guide.外部リンク') }}</h3>
        </template>
        <template #default>
          <p class="blue-text-color mt-md-ml-10">
            {{
              t(
                'guide.Xfolioのサイトに移動します、杏仁レモンティーのポートフォリオみたいなものです。'
              )
            }}
          </p>
        </template>
      </el-tour-step>

      <el-tour-step target="#footer-ref" placement="top">
        <template #header>
          <h3 class="blue-text-color">{{ t('guide.外部リンクその他') }}</h3>
        </template>
        <template #default>
          <p class="blue-text-color mt-md-ml-10">
            {{ t('guide.杏仁レモンティーのSNSなどの外部リンクです。') }}
          </p>
        </template>
      </el-tour-step>
    </el-tour>
  </main>
  <Cursor></Cursor>
</template>

<style scoped>
.background-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.background-img {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}

@keyframes bg-slide-out-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes bg-slide-out-right {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}

.background-img.bg-slide-out-left {
  animation: bg-slide-out-left 0.4s ease-in-out forwards;
}

.background-img.bg-slide-out-right {
  animation: bg-slide-out-right 0.4s ease-in-out forwards;
}

@keyframes bg-slide-in-right {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes bg-slide-in-left {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

.background-img.bg-slide-in-right {
  animation: bg-slide-in-right 0.4s ease-in-out forwards;
}

.background-img.bg-slide-in-left {
  animation: bg-slide-in-left 0.4s ease-in-out forwards;
}

.bg-arrow {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.bg-arrow:active {
  transform: translateY(-50%) scale(0.9);
}

.bg-arrow-left {
  left: 16px;
}

.bg-arrow-right {
  right: 16px;
}

.bg-arrow img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.bg-arrow-right img {
  transform: scaleX(-1);
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
  bottom: 160px;
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
