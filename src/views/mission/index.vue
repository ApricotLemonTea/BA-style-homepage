<script setup>
import TopBar from '@/components/TopBar.vue'
import { ref } from 'vue'

const tabList = ref(["aaa", "bbb", "ccc"])
const selectedIndex = ref(0)

const firstTabStyle = {
  'margin-left' : 0,
  'border-top-left-radius': '15px'
}
const endTabStyle = {
  'border-top-right-radius': '15px'
}
</script>

<template>
  <div>
    <TopBar></TopBar>

    <div class="mission-container">
      <div class="mission-tab-block">
        <div v-for="(item, index) in tabList" :key="index"
             @click="() => { selectedIndex = index }"
             :class="selectedIndex == index ? 'mission-tab-item selected' : 'mission-tab-item'"
             :style="index == 0 ? firstTabStyle
                                : index == tabList.length - 1 ? endTabStyle : ''"
        >
          {{ item }}
        </div>
      </div>

      <div class="mission-item-container">
        <div class="mission-item"></div>
        <div class="mission-item"></div>
      </div>
    </div>

    <div class="login-bonus-block">
      <div class="login-text">デイリーログイン（0 / 1）</div>
      <a-progress
        :percent="0.7"
        :show-text="false"
        :stroke-width="15"
        track-color="#343c42ff"
        color="#00bfffff"
        class="progress-bar"
      />
    </div>
  </div>
</template>

<style scoped>
.mission-container {
  width: 60vw;
  height: 72vh;
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
      border-radius: 5px;
    }
    .selected {
      background-color: #2f4766ff;
      color: #fada0aff;
    }
  }

  .mission-item-container {
    background-color: #75757525;
    border-radius: 5px 5px 15px 15px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    .mission-item {
      background-color: #ffffff;
      width: 97%;
      height: 25%;
      border-radius: 12px;
      margin-top: 2%;
    }
  }
}

.login-bonus-block {
  background-color: #ffffff;
  width: 60vw;
  height: 10vh;
  position: fixed;
  bottom: 4vh;
  right: 6vw;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  .login-text {
    font-size: 25px;
    margin: 1.5% 0 0 5%;
  }
}

.progress-bar {
  height: 2vh;
  width: 70%;
  margin: 1% 0 0 3%;
}
</style>