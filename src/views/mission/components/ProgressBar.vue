<script setup>
import { computed } from 'vue'

const props = defineProps(['percent', 'width']) // percent取值范围 0 ~ 1
const progressBarWidth = computed(() => {
  return Math.min(props.percent * 100, 100)
})
</script>

<template>
  <div class="progress-bar-container">
    <div class="progress-bar-background" :style="[{ width: props.width }]">
      <div
        class="progress-bar"
        :style="[
          { width: progressBarWidth + '%' },
          props.percent > 1 ? { 'background-color': '#fada0aff' } : ''
        ]"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.progress-bar-container {
  width: 92.5%;
  max-width: 100%;
  margin: 0.5vh 1.2vw 0.5vh;
  text-align: center;
  transform: skew(-10deg);
}

.progress-bar-background {
  width: 100%;
  height: 1.2vh;
  background-color: #343c42ff;
  border-radius: 0.3vh;
  overflow: hidden;
  padding: 0.2vh;
}

.progress-bar {
  height: 100%;
  background-color: #00bfffff;
  border-radius: 0;
  transition: width 0.5s ease;
}
</style>
