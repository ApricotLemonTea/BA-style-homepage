<script setup>
import { ref } from 'vue'

const dialogVisible = ref(false)

const open = () => {
  dialogVisible.value = true
}
defineExpose({ open })
</script>

<template>
  <a-modal v-model:visible="dialogVisible"
           width="auto"
           title="パッチノート"
           ok-text="閉じる"
           hide-cancel
           class="patch-note-modal"
           modal-animation-name="re-zoom-modal"
  >
    <div class="patch-note-container">
      123456789022345678901234567890223456789012345678902234567890
    </div>
  </a-modal>
</template>

<style>
.patch-note-modal{

  .patch-note-container{
    height: 60vh;
    width: 70vw;
  }
}

.re-zoom-modal-enter-from,.re-zoom-modal-appear-from {
  transform: scale(0.5) translateY(0);
  opacity: 0
}
.re-zoom-modal-enter-to,.re-zoom-modal-appear-to {
  transform: scale(1) translateY(0);
  opacity: 1
}
.re-zoom-modal-enter-active,.re-zoom-modal-appear-active {
  transition: opacity .4s cubic-bezier(.3,1.3,.3,1),transform .4s cubic-bezier(.3,1,.3,1) !important;
}

.re-zoom-modal-leave-from {
  transform: scale(1) translateY(0); /* 从正常大小和位置开始 */
  opacity: 1; /* 完全不透明 */
}
.re-zoom-modal-leave-to {
  transform: scale(0.5) translateY(0); /* 缩小 */
  opacity: 0; /* 变得透明 */
}
.re-zoom-modal-leave-active {
  transition: opacity .4s cubic-bezier(.3, 1.3, .3, 1), transform .4s cubic-bezier(.3, 1, .3, 1) !important; /* 应用过渡效果 */
}
</style>