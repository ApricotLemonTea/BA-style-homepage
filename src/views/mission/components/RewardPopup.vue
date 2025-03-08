<script setup>
import { ref } from "vue"
import "animate.css"
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const visible = ref(false)

const showPopup = () => {
  visible.value = true

  setTimeout(() => {
    visible.value = false
  }, 2500)
}
defineExpose({ showPopup })
</script>

<template>
  <Transition
    enter-active-class="animate__animated animate__zoomIn"
    leave-active-class="animate__animated animate__zoomOut"
  >
    <div v-if="visible" class="reward-container">
      <img src="/img/pyroxene.png" alt="">
      <p>{{ t("guide.青輝石") }} x1200</p>
    </div>
  </Transition>
</template>

<style scoped>
.reward-container {
  background-color: #00000070;
  width: 100vw;
  height: 26vh;
  position: fixed;
  top: 37vh;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    height: 13vh;
  }
  p {
    color: white;
    font-size: 3vh;
    margin-top: 2vh;
  }
}

.animate__animated.animate__zoomIn,
.animate__animated.animate__zoomOut {
  --animate-duration: 0.3s;
}
</style>