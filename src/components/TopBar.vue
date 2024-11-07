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
</script>

<template>
  <div class="top-bar blue-text-color">
    <div class="back-button"></div>

    <div class="page-title">
      <p>プロフィール</p>
    </div>

    <div class="status-block" style="margin-left: auto">
      <img src="/img/ap.png" alt="" />
      <p style="white-space: nowrap">{{ ap }} / {{ maxAp }}</p>
      <img src="/img/plus.png" alt="" class="plus-icon" />
      <a-divider direction="vertical" :size="2" class="divider"></a-divider>
    </div>

    <div class="status-block" style="padding-left: 10px">
      <img src="/img/gold.png" alt="" />
      <p>{{ numberWithCommas(credit) }}</p>
      <a-divider direction="vertical" :size="2" class="divider"></a-divider>
    </div>

    <div class="status-block">
      <img src="/img/pyroxene.png" alt="" />
      <p>{{ numberWithCommas(pyroxene) }}</p>
      <img src="/img/plus.png" alt="" class="plus-icon" />
      <a-divider direction="vertical" :size="2" class="divider"></a-divider>
    </div>

    <div class="other-button" @click="()=>{router.push('/')}"></div>
  </div>
</template>

<style scoped>
.top-bar {
  width: 90vw;
  height: 50px;
  margin: 0 auto;
  padding: 0 30px;
  background-color: white;
  border-radius: 0 0 10px 10px;
  display: flex;

  .back-button {
    background-color: #ffd8c3;
    height: 166%;
    aspect-ratio: 1;
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
    justify-content: end;
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
    background-color: pink;
    height: 100%;
    aspect-ratio: 1;
  }
}
.top-bar img {
  height: 70%;
  margin: 0 8px 0 10px;
}
</style>