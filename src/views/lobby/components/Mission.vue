<script setup>
import { ref, computed } from 'vue'
import { useI18n } from "vue-i18n"
import i18n from "@/locale"
import missionJa from '/src/notes/mission/missionJa.json'
import missionZh from '/src/notes/mission/missionZh.json'

const { t } = useI18n()
const dialogVisible = ref(false)

const mission = computed(() => {
  switch (i18n.global.locale){
    case "ja":
      return missionJa
    case "zh":
      return missionZh

    default:
      return missionJa
  }
})

const open = () => {
  dialogVisible.value = true
}
defineExpose({ open })
</script>

<template>
  <a-modal v-model:visible="dialogVisible"
           width="auto"
           :title="t('mission.ミッション')"
           :ok-text="t('閉じる')"
           hide-cancel
           modal-animation-name="no-slide-zoom-modal"
  >
    <div class="mission-container">
      <div class="mission-text-block">
        <p v-for="item in mission.missionList" :key="item"
           class="mission-text">
          ・{{item}}
        </p>
      </div>
    </div>

  </a-modal>
</template>

<style>
.mission-container {
  height: 30vh;
  width: auto;
  min-width: 40vw;
  color: #003153;
}

.mission-text-block {
  text-align: left;
  padding: 0 7vw;
}

.mission-text {
  font-size: 20px;
}
</style>