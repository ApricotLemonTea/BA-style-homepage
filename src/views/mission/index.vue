<script setup>
import TopBar from '@/components/TopBar.vue'
</script>

<template>
  <div>
    <TopBar></TopBar>

    <div class="mission-container">
      <div class="mission-tab"></div>

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
  background-color: #9ec6e8;
  width: 60vw;
  height: 70vh;
  position: fixed;
  top: 14vh;
  right: 6vw;
  display: flex;
  flex-direction: column;

  .mission-tab {
    background-color: #7db9b4;
    width: 100%;
    height: 12%;
  }
  .mission-item-container {
    background-color: #b8f1c9;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    .mission-item {
      background-color: pink;
      width: 90%;
      height: 25%;
      border-radius: 12px;
      margin-top: 15px;
    }
  }
}

.login-bonus-block {
  background-color: #9ec6e8;
  width: 60vw;
  height: 10vh;
  position: fixed;
  bottom: 2vh;
  right: 6vw;
  display: flex;
  flex-direction: column;
}
</style>