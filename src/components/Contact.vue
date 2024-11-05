<script setup>
// import { Icon } from '@arco-design/web-vue'
// import config from '/_config.json'
import { ref } from 'vue'
import PatchNote from '@/components/PatchNote.vue'
import Mission from '@/components/Mission.vue'
import Announce from '@/components/Announce.vue'

// const IconFont = Icon.addFromIconFontCn({
//   src: config.iconfont
// })

const patchNoteRef = ref()
const missionRef = ref()
const announceRef = ref()

defineEmits(["start-guide"])

/**
 * 打开patch note页面
 */
const openPatchNote = () => {
  patchNoteRef.value.open()
}

/**
 * 打开mission页面
 */
const openMission = () => {
  missionRef.value.open()
}

/**
 * 打开announce页面
 */
const openAnnounce = () => {
  announceRef.value.open()
}
</script>

<template>
  <div class="contact-box">
    <a-popover position="top">
      <div class="contact css-cursor-hover-enabled"
           @click="$emit('start-guide')">
        <img src="/img/guide.png" alt="" />
        <span style="white-space: nowrap;">ガイド</span>
      </div>
      <template #title>
        <h3 class="blue-text-color">ガイド</h3>
      </template>
      <template #content>
        <p class="blue-text-color">このサイトの紹介を始めます</p>
      </template>
    </a-popover>

    <a-popover position="top">
      <div class="contact css-cursor-hover-enabled"
           @click="openAnnounce">
        <img src="/img/announce.png" alt="" />
        <span style="white-space: nowrap;">お知らせ</span>
      </div>
      <template #title>
        <h3 class="blue-text-color">お知らせ</h3>
      </template>
      <template #content>
        <p class="blue-text-color">重要な情報はここに書きます</p>
      </template>
    </a-popover>

    <a-popover position="bottom">
      <div class="contact css-cursor-hover-enabled"
           @click="openPatchNote">
        <img src="/img/patchNote.png" alt="" />
        <span style="white-space: nowrap;">パッチノート</span>
      </div>
      <template #title>
        <h3 class="blue-text-color">パッチノート</h3>
      </template>
      <template #content>
        <p class="blue-text-color">サイトの更新履歴です</p>
      </template>
    </a-popover>

    <a-popover title="ミッション" position="bottom">
      <div class="contact css-cursor-hover-enabled"
           @click="openMission">
        <img src="/img/mission.png" alt="" />
        <span style="white-space: nowrap;">ミッション</span>
      </div>
      <template #title>
        <h3 class="blue-text-color">ミッション</h3>
      </template>
      <template #content>
        <div class="blue-text-color">
          <p>今後実装したい機能です</p>
          <p>（実装日時は未定）</p>
          <p>（実装できるかどうかも未定）</p>
          <p>（期待しないでください）</p>
        </div>
      </template>
    </a-popover>
  </div>

  <PatchNote ref="patchNoteRef"></PatchNote>
  <Mission ref="missionRef"></Mission>
  <Announce ref="announceRef"></Announce>
</template>

<style scoped>
.contact-box {
  position: absolute;
  left: 20px;
  top: 186px;
  display: grid;
  grid-template-columns: repeat(2, 130px);
  grid-gap: 20px;
  height: auto;
  justify-items: center;
}

.contact {
  height: max-content;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  bottom: 15px;
  margin: 0 20px;
  transition: transform 0.05s;
}

.contact span {
  margin: 5px 0 0;
  font-size: 20px;
  color: #003153;
  font-weight: 800;
}

.contact span {
  text-shadow:
    #fff 1px 0 0,
    #fff 0 1px 0,
    #fff -1px 0 0,
    #fff 0 -1px 0,
    #fff 2px 0 0,
    #fff 0 2px 0,
    #fff -2px 0 0,
    #fff 0 -2px 0;
}

.arco-icon {
  font-size: 48px;
  filter: drop-shadow(0px 0px 4px #fff6);
}

.contact img {
  height: 48px;
  filter: drop-shadow(0px 0px 4px #fff6);
}

.contact:active {
  transform: scale(0.9);
}
</style>
