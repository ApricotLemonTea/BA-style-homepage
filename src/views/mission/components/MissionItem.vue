<script setup>
import { computed } from 'vue'
import ProgressBar from '@/views/mission/components/ProgressBar.vue'
import { useI18n } from 'vue-i18n'
import { useTagList } from '@/views/mission/tagList'
import { openUrl } from '@/utils/commonFunctions'

const { t } = useI18n()
const props = defineProps([
  "tagIndex",
  "title",
  "times",
  "maxTimes",
  "completeDate",
  "detailUrl"
])
const tagList = useTagList()
const isFeatureTag = computed(() => {
  return props.tagIndex === 2
})

/**
 * 跳转到该任务的详细信息链接
 */
const goToDetail = () => {
  if (isFeatureTag.value) {
    return
  }
  openUrl(props.detailUrl)
}
</script>

<template>
  <div @click="goToDetail"
       :class="[
          'mission-item',
          !isFeatureTag ? 'actionable' : ''
       ]"
  >
    <div class="mission-item-title-block">
      <div class="mission-tag"
           :style="tagList[props.tagIndex] != null ? tagList[props.tagIndex].style : ''"
      >
        {{ tagList[props.tagIndex].label }}
      </div>
      <div class="mission-title">{{ props.title }}</div>
    </div>
    <div class="mission-times-block">
      <div class="mission-times">
        <span>{{ props.times }} / {{ props.maxTimes }}</span>
        <ProgressBar :percent="props.times / props.maxTimes"/>
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
  border-radius: 1.1vh;
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
      border-radius: 0.7vh;
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
.actionable:active {
  transform: scale(0.97);
}
</style>