<script setup>
import { ref } from 'vue'
import 'animate.css'
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
    enter-active-class="animate__animated zoomIn"
    leave-active-class="animate__animated zoomOut"
  >
    <div v-if="visible" class="reward-container">
      <img src="/img/pyroxene.png" alt="" />
      <p>{{ t('guide.青輝石') }} x1200</p>
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

.animate__animated {
  --animate-duration: 0.3s;
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale3d(1, 0.3, 0.3);
  }

  50% {
    opacity: 1;
  }
}

.zoomIn {
  animation-name: zoomIn;
}

@keyframes zoomOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    transform: scale3d(1, 0.3, 0.3);
  }

  to {
    opacity: 0;
  }
}

.zoomOut {
  animation-name: zoomOut;
}
</style>
