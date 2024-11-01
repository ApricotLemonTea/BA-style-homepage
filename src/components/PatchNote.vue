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
.patch-note-modal .patch-note-modal-enter-from,
.patch-note-modal .patch-note-modal-appear-from{
  transform: scale(0.5) translateY(0) !important;
  opacity: 1 !important;
}
.patch-note-modal .patch-note-modal-enter-active,
.patch-note-modal .patch-note-modal-appear-active {
  transition: opacity .4s cubic-bezier(.3,1.3,.3,1),transform .4s cubic-bezier(.3,1,.3,1) !important;
}
</style>