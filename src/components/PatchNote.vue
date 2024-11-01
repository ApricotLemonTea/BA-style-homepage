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
    <div class="patch-note-content">
      123456789022345678901234567890223456789012345678902234567890
    </div>
  </a-modal>
</template>

<style>
.patch-note-modal{

  .patch-note-content{

  }
}
</style>