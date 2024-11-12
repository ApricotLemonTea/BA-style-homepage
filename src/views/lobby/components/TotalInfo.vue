<script setup>
import { ref } from 'vue'
import patchNote from '@/notes/patch-note.json'

const dialogVisible = ref(false)
const open = () => {
  dialogVisible.value = true
}
defineExpose({ open })

const selectedTabIndex = ref(0)
const selectedTitleIndex = ref(0)
</script>

<template>
  <el-dialog v-model="dialogVisible"
             class="total-info-dialog"
             :show-close="false"
  >
    <template #title>
      <div class="total-info-header-block">
        <p class="title-text">ApricotLemonTea News</p>
        <IconClose class="close-button" size="4vh"/>
      </div>
    </template>

    <template #default>
      <div class="total-info-container">
        <div class="total-info-inner-container">
          <!--顶部的tab bar-->
          <div class="total-info-tab-bar">
            <div class="total-info-tab-button">
              お知らせ
            </div>
            <div class="total-info-tab-button" style="background-color: #9ec6e8">
              パッチノート
            </div>
            <div class="total-info-tab-button">
              その他
            </div>
          </div>

          <div class="total-info-content-block">
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
          background-color: #40708b;
          width: 33.33333%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2.5vh;
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
          height: 100%;
          width: 70%;
          font-size: 2.5vh;
          padding: 4vh 2vw 2vh;
        }
      }
    }
  }
}
</style>