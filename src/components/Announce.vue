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
           title="お知らせ"
           ok-text="閉じる"
           hide-cancel
           modal-animation-name="no-slide-zoom-modal"
  >
    <div class="announce-container">
      <div class="announce-text-block">
        <p class="announce-text">
          何もありません
        </p>
      </div>
    </div>

  </a-modal>
</template>

<style>
.announce-container {
  height: 30vh;
  width: auto;
  min-width: 40vw;
  color: #003153;
}

.announce-text-block {
  text-align: center;
  padding: 0 7vw;
}

.announce-text {
  font-size: 20px;
}
</style>