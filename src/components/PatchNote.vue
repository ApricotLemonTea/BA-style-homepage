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
           modal-animation-name="no-slide-zoom-modal"
  >
    <div class="patch-note-container">
      <div>
        <h2>2024-11-01　β版公開</h2>
        <a-divider :size="3"/>
      </div>
    </div>
  </a-modal>
</template>

<style>
.patch-note-container {
  height: 60vh;
  width: 70vw;
  color: #003153;
}
</style>