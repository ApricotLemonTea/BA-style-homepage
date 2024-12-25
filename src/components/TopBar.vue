<script setup>
import { useUserStore } from '@/store/userStore'
import { computed, reactive, watch } from 'vue'
import { numberWithCommas } from '@/utils/commonFunctions'
import router from '@/router'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'

const { t } = useI18n()
const userStore = useUserStore()
const route = useRoute()

const ap = computed(() => {
  return userStore.ap
})
const maxAp = computed(() => {
  return userStore.maxAp
})

const credit = computed(() => {
  return userStore.credit
})

const pyroxene = computed(() => {
  return userStore.pyroxene
})
const tweenedPyroxene = reactive({
  number: userStore.pyroxene
})
watch(pyroxene, (n) => {
  gsap.to(tweenedPyroxene, { duration: 0.5, number: Number(n) || 0 })
})

/**
 * 回到上一步或回到大厅
 * @param { string } routerCase 需要如何切换路由: <br>
 *  "-1":回到上一步, "lobby": 回到大厅
 */
const routerNavigate = (routerCase) => {
  switch (routerCase){
    case "-1":
      router.go(-1)
      break
    case "lobby":
      router.push("/")
      break
  }
}
</script>

<template>
  <div class="top-bar blue-text-color">
    <div class="back-button" @click="routerNavigate('-1')">
      <img src="/img/back.png" alt="" style="height: 100%; margin: 0 auto">
    </div>

    <div class="page-title">
      <p>{{ t("topBarTitle." + route.meta.topBarTitle) }}</p>
    </div>

    <div class="status-block" style="margin-left: auto">
      <img src="/img/ap.png" alt="" />
      <p style="white-space: nowrap">{{ ap }} / {{ maxAp }}</p>
      <a-divider direction="vertical" :size="2" class="divider"></a-divider>
    </div>

    <div class="status-block">
      <img src="/img/gold.png" alt="" />
      <p>{{ numberWithCommas(credit) }}</p>
      <a-divider direction="vertical" :size="2" class="divider"></a-divider>
    </div>

    <div class="status-block">
      <img src="/img/pyroxene.png" alt="" />
      <p>{{ numberWithCommas(tweenedPyroxene.number.toFixed(0)) }}</p>
      <a-divider direction="vertical" :size="2" class="divider"></a-divider>
    </div>

    <div class="other-button" @click="routerNavigate('lobby')">
      <img src="/img/home.png" alt="" style="height: 100%; margin: 0 auto">
    </div>
  </div>
</template>

<style scoped>
.top-bar {
  z-index: 99;
  width: 90vw;
  height: 5vh;
  margin: 0 auto;
  padding: 0 30px;
  background-color: white;
  border-radius: 0 0 10px 10px;
  display: flex;

  .back-button {
    height: 166%;
    aspect-ratio: 1;
  }
  .back-button img {
    border-radius: 50%;
    box-shadow: 3px 3px 7px rgba(49, 123, 146, 0.2);
  }
  .back-button:active {
    transform: scale(0.9);
  }

  .page-title {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1vw 0 1.5vw;
    font-size: 3vh;
    font-weight: bold;
    border-bottom: 0.52vh solid #ffed6f;
  }
  .status-block {
    width: 12%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 1%;
    font-size: 2.7vh;

    .divider {
      height: 60%;
      transform: rotate(15deg);
      margin-left: 10%;
    }
  }

  .other-button {
    height: 80%;
    aspect-ratio: 1;
    margin-top: 0.5vh;
  }
  .other-button:active {
    transform: scale(0.9);
  }
}
.top-bar img {
  height: 70%;
  margin: 0 5% 0 10%;
}
</style>