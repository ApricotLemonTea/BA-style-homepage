<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import patchNoteJa from '@/notes/patchNote/patchNoteJa.json'
import patchNoteZh from '@/notes/patchNote/patchNoteZh.json'
import patchNoteEn from '@/notes/patchNote/patchNoteEn.json'
import announcementJa from '@/notes/announcement/announcementJa.json'
import announcementZh from '@/notes/announcement/announcementZh.json'
import announcementEn from '@/notes/announcement/announcementEn.json'
import i18n from '@/locale'

const { t } = useI18n()

const announcement = computed(() => {
  switch (i18n.global.locale){
    case "ja":
      return announcementJa
    case "zh":
      return announcementZh
    case "en":
      return announcementEn

    default:
      return announcementJa
  }
})

const patchNote = computed(() => {
  switch (i18n.global.locale){
    case "ja":
      return patchNoteJa
    case "zh":
      return patchNoteZh
    case "en":
      return patchNoteEn

    default:
      return patchNoteJa
  }
})

const dialogVisible = ref(false)
const open = () => {
  selectedTabIndex.value = 0
  selectedTitleIndex.value = 0
  dialogVisible.value = true
}
defineExpose({ open })

const selectedTabIndex = ref(0)
const selectedTitleIndex = ref(0)

const tabList = computed(() => {
  return [t("totalInfo.お知らせ"), t("totalInfo.パッチノート"), t("totalInfo.その他")]
})
</script>

<template>
  <el-dialog v-model="dialogVisible"
             class="total-info-dialog"
             :show-close="false"
  >
    <template #title>
      <div class="total-info-header-block">
        <p class="title-text">ApricotLemonTea News</p>
        <IconClose @click="()=>{ dialogVisible = false }"
                   class="close-button" size="4vh"/>
      </div>
    </template>

    <template #default>
      <div class="total-info-container">
        <div class="total-info-inner-container">
          <!--顶部的tab bar-->
          <div class="total-info-tab-bar">
            <div v-for="(item, index) in tabList" :key="index"
                 :class="selectedTabIndex === index ? 'total-info-tab-button tab-selected' : 'total-info-tab-button'"
                 @click="()=>{ selectedTabIndex = index; selectedTitleIndex = 0 }"
            >
              {{ item }}
            </div>
          </div>

          <!--お知らせ-->
          <div v-show="tabList[selectedTabIndex] === t('totalInfo.お知らせ')"
               class="total-info-content-block">
            <!--左侧标题栏-->
            <div class="total-info-content-title-block">
              <div v-for="(item, index) in announcement.announcementList" :key="index"
                   :class="selectedTitleIndex === index ? 'total-info-content-title title-selected' : 'total-info-content-title'"
                   @click="()=>{selectedTitleIndex = index}"
              >
                {{ item.title }}
              </div>
            </div>
            <!--正文内容-->
            <div v-for="(item, index) in announcement.announcementList"  :key="index"
                 v-show="selectedTitleIndex === index"
                 class="total-info-content">
              <p v-for="contentItem in item.contents" :key="contentItem" style="margin-bottom: 3vh">
                {{ contentItem }}
              </p>
              <br>
              <p style="text-align: right;">{{ item.time }}</p>
            </div>
          </div>

          <!--パッチノート-->
          <div v-show="tabList[selectedTabIndex] === t('totalInfo.パッチノート')"
               class="total-info-content-block">
            <!--左侧标题栏-->
            <div class="total-info-content-title-block">
              <div v-for="(item, index) in patchNote.patchNoteList" :key="index"
                   :class="selectedTitleIndex === index ? 'total-info-content-title title-selected' : 'total-info-content-title'"
                   @click="()=>{selectedTitleIndex = index}"
              >
                {{ item.title }}
              </div>
            </div>
            <!--正文内容-->
            <div v-for="(item, index) in patchNote.patchNoteList"  :key="index"
                 v-show="selectedTitleIndex === index"
                 class="total-info-content">
              <p v-for="contentItem in item.contents" :key="contentItem" style="margin-bottom: 3vh">
                ・{{ contentItem }}
              </p>
            </div>
          </div>

          <!--その他-->
          <div v-show="tabList[selectedTabIndex] === t('totalInfo.その他')"
               class="total-info-content-block">
            <p style="font-size: 2.5vh; margin: 10vh auto">{{ t("totalInfo.予備用のタブです、まだ何もありません。") }}</p>
          </div>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<style>
.total-info-dialog {
  //border-radius: 0.7vw;
  padding: 0;
  width: 60vw;

  .total-info-header-block {
    background-color: #2b95f7;
    border-radius: 4px 4px 0 0;
    height: 7vh;
    display: flex;
    align-items: center;

    .title-text {
      color: white;
      font-size: 4vh;
      margin-left: 1vw;
      transform: skewx(-10deg)
    }
    .close-button {
      color: white;
      margin: 0 0.8vw 0 auto;
    }
  }

  .total-info-container {
    //background-color: #ff60ba;
    height: 58vh;

    .total-info-inner-container {
      //background-color: #86a071;
      border-bottom: #7b9eb5 solid 1px;
      box-shadow: inset -1px 0 0 #7b9eb5, inset 1px 0 0 #7b9eb5;
      z-index: 50;
      margin: 0 1vw 1vw 1vw;
      height: 55vh;

      .total-info-tab-bar {
        background-color: #525f72;
        height: 6vh;
        display: flex;

        .total-info-tab-button {
          background-color: #677890;
          color: #c1cce1;
          width: 33.33333%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2.5vh;
        }
        .tab-selected {
          background-color: #40708b;
          color: white;
        }
      }

      .total-info-content-block {
        //background-color: #d8d897;
        height: 49vh;
        display: flex;

        .total-info-content-title-block {
          background-color: #f5f7f9;
          height: 100%;
          overflow-y: auto;
          width: 30%;
          margin-left: 1px;

          .total-info-content-title {
            //background-color: #dbe6eb;
            background-color: #f5f7f9;
            height: 15%;
            display: flex;
            align-items: center;
            font-size: 2.3vh;
            padding-left: 1vw;
          }
          .title-selected {
            background-color: #dbe6eb;
          }
        }
        .total-info-content {
          //background-color: #c18cff;
          max-height: 100%;
          width: 70%;
          font-size: 2.5vh;
          padding: 4vh 2vw 2vh;
          overflow-y: auto;
        }
      }
    }
  }
}
</style>