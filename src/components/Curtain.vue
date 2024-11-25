<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/userStore'

const userStore = useUserStore()

const curtain = ref(false)
const bg = ref(false)

const skip = (action) => {
  // 切换背景图
  userStore.changeBackground()

  bg.value = true
  setTimeout(() => {
    curtain.value = true
    setTimeout(() => {
      action()
    }, 1000)
    setTimeout(
      () => {
        curtain.value = false
        bg.value = false
      },
      Math.floor(Math.random() * 2 + 4) * 500
    )
  }, 1000)
}
defineExpose({ skip })
</script>

<template>
  <transition name="curtain">
    <video v-if="bg" autoplay src="/transfrom.webm" class="bg"></video>
  </transition>

  <transition name="curtain">
    <div v-if="curtain" class="curtain" :style="userStore.curtainStyle">
      <img src="/shitim/Tran_Shitim_Icon.png" alt="" />
    </div>
  </transition>
</template>

<style scoped>
.bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
}

.curtain {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}
.curtain img {
  width: 500px;
  height: auto;
}

.curtain-enter-from {
  opacity: 0;
}

.curtain-enter-to {
  opacity: 1;
}

.curtain-leave-to {
  transform: scaleY(0%);
}

.curtain-leave-from {
  transform: scaleY(100%);
}

.curtain-leave-active,
.curtain-enter-active {
  transition:
    opacity 0.1s ease-in-out,
    transform 0.25s ease-in-out;
}
</style>