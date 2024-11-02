<script setup>
import { ref } from 'vue'
import patchNote from '/_patch_note.json'

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
      <div v-for="note in patchNote.patchNoteList">
        <h1>{{note.title}}</h1>
        <div class="patch-note-text-block">
          <p v-for="item in note.contents" class="patch-note-text">
            ・{{item}}
          </p>
        </div>
        <a-divider :size="3" :margin="50"/>
      </div>
    </div>

  </a-modal>
</template>

<style>
.patch-note-container {
  height: 60vh;
  width: auto;
  min-width: 50vw;
  color: #003153;
}

.patch-note-text-block {
  text-align: left;
  padding: 0 7vw;
}

.patch-note-text {
  font-size: 20px;
}
</style>