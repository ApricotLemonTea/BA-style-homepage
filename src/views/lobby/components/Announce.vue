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
          □■□■□■□■□■□■□■□■□■□■□■□■□■
        </p>
        <br/>
        <p class="announce-text">
          ◎貴方のサークル「杏仁茶館」は、
        </p>
        <p class="announce-text">
          日曜日 東地区 “Ｊ”ブロック－51a
        </p>
        <p class="announce-text">
          に配置されました。
        </p>
        <br/>
        <p class="announce-text">
          □■□■□■□■□■□■□■□■□■□■□■□■□■
        </p>
      </div>
    </div>
  </a-modal>
</template>

<style>
.announce-container {
  height: 30vh;
  width: 40vw;
  color: #003153;
  display: flex;
}

.announce-text-block {
  text-align: center;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.announce-text {
  font-size: 20px;
}
</style>