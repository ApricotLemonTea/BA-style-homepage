<script setup>
import { useUserStore } from '@/store/userStore'
import { computed } from 'vue'
import { numberWithCommas } from '@/utils/commonFunctions'
import router from '@/router'

const userStore = useUserStore()

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

/**
 * 播放curtain过场动画随后切换路由
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
      <p>プロフィール</p>
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
      <p>{{ numberWithCommas(pyroxene) }}</p>
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
  height: 50px;
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
    padding: 0 10px 0 20px;
    font-size: 25px;
    border-bottom: 5px solid #ffed6f;
  }
  .status-block {
    width: 200px;
    display: flex;
    align-items: center;
    padding-right: 10px;
    font-size: 25px;

    .plus-icon {
      height: 70%;
    }

    .divider {
      height: 60%;
      transform: rotate(15deg);
      margin-left: auto;
    }
  }

  .other-button {
    height: 38px;
    aspect-ratio: 1;
    margin-top: 7px;
  }
  .other-button:active {
    transform: scale(0.9);
  }
}
.top-bar img {
  height: 70%;
  margin: 0 8px 0 10px;
}
</style>