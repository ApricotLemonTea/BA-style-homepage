<script setup>
import ProgressBar from '@/views/mission/components/ProgressBar.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps(["tagIndex", "title", "times", "completeDate"])

const missionTags = [
  {},
  {
    label: t("mission.missionTag.イベント"),
    style: {
      "background-color": "#eb5792ff"
    }
  },
  {
    label: t("mission.missionTag.実績"),
    style: {
      "background-color": "#e08700ff"
    }
  },
  {
    label: "TODO",
    style: {
      "background-color": "#389fe8ff"
    }
  }
]
</script>

<template>
  <div class="mission-item">
    <div class="mission-item-title-block">
      <div class="mission-tag"
           :style="missionTags[props.tagIndex] != null ? missionTags[props.tagIndex].style : ''">
        {{ missionTags[props.tagIndex].label }}
      </div>
      <div class="mission-title">{{ props.title }}</div>
    </div>
    <div class="mission-times-block">
      <div class="mission-times">
        <span>{{ t("mission.回数") }}：{{ props.times }} / 1</span>
        <ProgressBar :percent="props.times"/>
      </div>
      <div class="mission-complete-date">{{ props.completeDate }}</div>
    </div>
  </div>
</template>

<style scoped>
.mission-item {
  background-color: #ffffff;
  width: 97%;
  min-height: 25%;
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
      background-color: #389fe8ff;
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
    .mission-complete-date {
      flex-grow: 1;
      display: flex;
      justify-content: end;
      align-items: end;
      font-size: 1.2vw;
      padding: 0 2vw 1.5vh 0;
    }
  }
}
</style>