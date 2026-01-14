<script setup>
// import { Icon } from '@arco-design/web-vue'
// import config from '/_config.json'
import { ref, onMounted } from 'vue'
import TotalInfo from '@/views/lobby/components/TotalInfo.vue'
import { useI18n } from 'vue-i18n'
import { openUrl } from '@/utils/commonFunctions'
import i18n from '@/locale'
import router from '@/router'
import { loadExcelData } from '@/utils/loadExcelData'

// const IconFont = Icon.addFromIconFontCn({
//   src: config.iconfont
// })

const { t } = useI18n()
const totalInfoRef = ref()

defineEmits(['start-guide'])

const announcement = ref()
const recentAnnounceDate = ref()
const viewedAnnounceDate = ref()
const hasNewAnnounce = ref()

onMounted(async () => {
  const announcementData = await loadExcelData('/data/announcement.xlsx')
  announcement.value = announcementData['日本語']
  recentAnnounceDate.value = announcement.value[0].time
  viewedAnnounceDate.value = localStorage.getItem('viewed-announce-date')
  hasNewAnnounce.value = viewedAnnounceDate.value === recentAnnounceDate.value ? 0 : 1
})

/**
 * 打开mission页面
 */
const openMission = () => {
  router.push('/mission')
}

/**
 * 打开announce页面
 */
const openAnnounce = () => {
  localStorage.setItem('viewed-announce-date', recentAnnounceDate.value)
  hasNewAnnounce.value = 0
  totalInfoRef.value.open()
}
</script>

<template>
  <div class="contact-box">
    <a-badge
      :count="hasNewAnnounce"
      :offset="[-25, -10]"
      dot
      :dot-style="{ width: '13px', height: '13px' }"
    >
      <a-popover position="top">
        <div class="contact css-cursor-hover-enabled" @click="openAnnounce">
          <img src="/img/announce.png" alt="" />
          <span style="white-space: nowrap; margin-top: 9px">{{ t('contact.お知らせ') }}</span>
        </div>
        <template #title>
          <h3 class="blue-text-color">{{ t('contact.お知らせとパッチノート') }}</h3>
        </template>
        <template #content>
          <p class="blue-text-color">
            {{ t('contact.重要な情報とサイトの更新履歴はここに書きます') }}
          </p>
          <p class="blue-text-color">{{ t('contact.当サイトの日別訪問者数のグラフもあります') }}</p>
        </template>
      </a-popover>
    </a-badge>

    <a-popover position="top">
      <div
        class="contact css-cursor-hover-enabled"
        @click="openUrl('https://u1805.github.io/momotalk/')"
      >
        <img src="/img/momotalk.png" alt="" />
        <span style="white-space: nowrap">{{ t('contact.モモトーク') }}</span>
      </div>
      <template #title>
        <h3 class="blue-text-color">{{ t('contact.モモトークエディター') }}</h3>
      </template>
      <template #content>
        <div class="blue-text-color">
          <p>{{ t('contact.モモトーク風のチャット作成ツールです。') }}</p>
          <!--日语使用说明-->
          <p v-show="i18n.global.locale === 'ja'">
            使い方は
            <span
              @click="openUrl('https://github.com/U1805/momotalk/blob/main/docs/How-to-use-jp.md')"
              class="css-cursor-hover-enabled link"
              style="color: #3987ff"
            >
              こちら
            </span>
          </p>
          <!--中文使用说明-->
          <p v-show="i18n.global.locale === 'zh'">
            <span
              @click="
                openUrl('https://github.com/U1805/momotalk/blob/main/docs/How-to-use-zh_cn.md')
              "
              class="css-cursor-hover-enabled link"
              style="color: #3987ff"
            >
              点击这里
            </span>
            查看食用说明
          </p>
          <!--英语使用说明-->
          <p v-show="i18n.global.locale === 'en'">
            <span
              @click="openUrl('https://github.com/U1805/momotalk/blob/main/docs/How-to-use.md')"
              class="css-cursor-hover-enabled link"
              style="color: #3987ff"
            >
              Click here
            </span>
            to learn how to use
          </p>
          <br />
          <p>
            Made by
            <span
              @click="openUrl('https://github.com/U1805')"
              class="css-cursor-hover-enabled link"
              style="color: #3987ff"
            >
              U1805
            </span>
          </p>
        </div>
      </template>
    </a-popover>

    <a-popover position="bottom">
      <div class="contact css-cursor-hover-enabled" @click="openMission">
        <img src="/img/mission.png" alt="" />
        <span style="white-space: nowrap">{{ t('contact.ミッション') }}</span>
      </div>
      <template #title>
        <h3 class="blue-text-color">{{ t('contact.ミッション') }}</h3>
      </template>
      <template #content>
        <div class="blue-text-color">
          <p>{{ t('contact.やることやったこといろいろ') }}</p>
        </div>
      </template>
    </a-popover>

    <a-popover position="bottom">
      <div class="contact css-cursor-hover-enabled" @click="$emit('start-guide')">
        <img src="/img/guide.png" alt="" />
        <span style="white-space: nowrap">{{ t('contact.ガイド') }}</span>
      </div>
      <template #title>
        <h3 class="blue-text-color">{{ t('contact.ガイド') }}</h3>
      </template>
      <template #content>
        <p class="blue-text-color">{{ t('contact.当サイトの紹介を始めます') }}</p>
      </template>
    </a-popover>

    <TotalInfo ref="totalInfoRef"></TotalInfo>
  </div>
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
  margin: 7px 0 0;
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
