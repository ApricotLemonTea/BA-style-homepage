<script setup>
import { useUserStore } from '@/store/userStore'

const userStore = useUserStore()
</script>

<template>
  <div class="top-bar">
    <div class="back-button"></div>
    <div class="page-title blue-text-color">
      <p>プロフィール</p>
    </div>
    <div class="ap-block">
      <p>ap: {{ userStore.ap }} / {{ userStore.maxAp }}</p>
    </div>
    <div class="credit-block">
      <p>credit: {{ userStore.credit }}</p>
    </div>
    <div class="pyroxene-block">
      <p>pyroxene: {{ userStore.pyroxene }}</p>
    </div>
    <div class="other-button"></div>
  </div>
</template>

<style scoped>
.top-bar {
  width: 90vw;
  height: 50px;
  margin: 0 auto;
  background-color: white;
  border-radius: 0 0 10px 10px;
  display: flex;

  .back-button {
    background-color: #ffd8c3;
    width: 80px;
    height: 80px;
    margin-left: 30px;
  }
  .page-title {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 5px 0 20px;
    font-size: 28px;
    border-bottom: 5px solid #ffed6f;
  }
  .ap-block {
    margin-left: auto;
    width: 200px;
    background-color: #c3ebff;
  }
  .credit-block {
    width: 200px;
    background-color: #c3ffdf;
  }
  .pyroxene-block {
    width: 200px;
    background-color: #fffec3;
  }
  .other-button {
    width: 80px;
    background-color: #c3ebff;
  }
}
</style>