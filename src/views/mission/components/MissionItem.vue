<script setup>
import ProgressBar from '@/views/mission/components/ProgressBar.vue'

const missionTagColors = {
  "実績": {
    "background-color": "#e08700ff",
  }
}
</script>

<template>
  <div class="mission-item">
    <div class="mission-item-title-block">
      <div class="mission-tag" :style="missionTagColors['実績']">実績</div>
      <div class="mission-title">titleaaa</div>
    </div>
    <div class="mission-times-block">
      <div class="mission-times">
        <span>次数：0 / 1</span>
        <ProgressBar :percent="0.7"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mission-item {
  background-color: #ffffff;
  width: 97%;
  height: 25%;
  border-radius: 12px;
  margin-top: 2%;
  display: flex;
  flex-direction: column;

  .mission-item-title-block {
    width: 95%;
    height: 40%;
    margin: 0.3vh auto 0;
    display: flex;
    align-items: center;
    border-bottom: 0.2vh solid #bfc4c7ff;

    .mission-tag {
      min-width: 10%;
      height: 70%;
      border-radius: 5px;
      padding: 0 1%;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.3vw;
    }
    .mission-title {
      font-size: 1.5vw;
      margin-left: 3%;
    }
  }

  .mission-times-block {
    flex-grow: 1;
    display: flex;

    .mission-times {
      width: 60%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
    }
    .mission-times span {
      margin: 0 5% 1.2%;
      font-size: 1.2vw;
    }
  }
}
</style>