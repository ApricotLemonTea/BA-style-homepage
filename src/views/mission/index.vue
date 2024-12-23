<script setup>
import TopBar from '@/components/TopBar.vue'
import { ref } from 'vue'

const tabList = ref(["実装予定機能", "実績", "aaa"])
</script>

<template>
  <div>
    <TopBar></TopBar>

    <div class="mission-container">
      <div class="mission-tab-block">
        <div v-for="(item, index) in tabList" :key="index"
             class="mission-tab-item"
             :style="index == 0 ? { 'margin-left' : 0 } : ''"
        >
          {{ item }}
        </div>
      </div>

      <div class="mission-item-container">
        <div class="mission-item"></div>
        <div class="mission-item" style="background-color: #f3e8ba"></div>
      </div>
    </div>

    <div class="login-bonus-block"></div>
  </div>
</template>

<style scoped>
.mission-container {
  //background-color: #9ec6e8;
  width: 60vw;
  height: 70vh;
  position: fixed;
  top: 10vh;
  right: 6vw;
  display: flex;
  flex-direction: column;

  .mission-tab-block {
    width: 100%;
    height: 12%;
    display: flex;
    overflow: hidden;

    .mission-tab-item {
      background-color: white;
      height: 100%;
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
      margin-left: 0.3%;
      border-radius: 6px;
    }
  }

  .mission-item-container {
    //background-color: #757575;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    .mission-item {
      background-color: pink;
      width: 97%;
      height: 25%;
      border-radius: 12px;
      margin-top: 2%;
    }
  }
}

.login-bonus-block {
  background-color: #9ec6e8;
  width: 60vw;
  height: 10vh;
  position: fixed;
  bottom: 4vh;
  right: 6vw;
  display: flex;
  flex-direction: column;
}
</style>