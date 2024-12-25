<script setup>
  const props = defineProps(["percent"])
</script>

<template>
  <a-progress
    :percent="props.percent"
    :show-text="false"
    :stroke-width="15"
    track-color="#343c42ff"
    color="#00bfffff"
    class="progress-bar"
  />
</template>

<style scoped>
.progress-bar {
  width: 92.5%;
  margin: 0 3% 0 3%;
}
</style>