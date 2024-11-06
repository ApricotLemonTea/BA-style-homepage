<script setup>
import { ref } from 'vue'

const curtain = ref(false)
const bg = ref(false)

const skip = (action) => {
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
    <div v-if="curtain" class="curtain">
      <img src="/shitim/Tran_Shitim_Icon.png" alt="" />
    </div>
  </transition>
</template>

<style scoped>

</style>