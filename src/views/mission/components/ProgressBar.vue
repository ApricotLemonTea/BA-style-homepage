<script setup>
import { computed } from 'vue'

const props = defineProps(["percent"]) // percent取值范围 0 ~ 1
const progressBarWidth = computed(() => {
  return Math.min(props.percent * 100, 100)
})
</script>

<template>
  <div class="progress-bar-container">
    <div class="progress-bar-background">
      <div class="progress-bar"
           :style="[
             { width: progressBarWidth + '%' },
             props.percent > 1 ? { 'background-color': '#fada0aff' } : ''
           ]"
      >
      </div>
    </div>
  </div>
</template>

<style scoped>
.progress-bar-container {
  width: 92.5%;
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
  transform: skew(-10deg);
}

.progress-bar-background {
  width: 100%;
  height: 2vh;
  background-color: #343c42ff;
  border-radius: 0.5vh;
  overflow: hidden;
  padding: 0.2vh;
}

.progress-bar {
  height: 100%;
  background-color: #00bfffff;
  border-radius: 0.3vh;
  transition: width 0.5s ease;
}
</style>