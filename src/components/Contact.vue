<script setup>
import { Icon } from '@arco-design/web-vue'
import config from '/_config.json'
import { ref } from 'vue'
import PatchNote from '@/components/PatchNote.vue'

const IconFont = Icon.addFromIconFontCn({
  src: config.iconfont
})

const patchNoteRef = ref()

/**
 * 打开patch note页面
 */
const openPatchNote = () => {
  patchNoteRef.value.open()
}
</script>

<template>
  <div class="contact-box">
    <a v-for="contact in config.contact" :key="contact"
      :href="contact.href"
      class="contact css-cursor-hover-enabled"
    >
      <img v-if="contact.imgSrc" :src="contact.imgSrc" alt="" />
      <icon-font v-if="contact.iconfont" :type="contact.iconfont" />
      <span>{{ contact.name }}</span>
    </a>

    <!--パッチノート-->
    <div class="contact css-cursor-hover-enabled"
         @click="openPatchNote">
      <img src="" alt="" />
      <span style="white-space: nowrap;">パッチノート</span>
    </div>

  </div>

  <!--パッチノート的弹窗-->
  <PatchNote ref="patchNoteRef"></PatchNote>
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
    #fff 0 -1px 0;
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
