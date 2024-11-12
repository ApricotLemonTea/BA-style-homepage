<script setup>
import { ref } from 'vue'

const dialogVisible = ref(false)
const open = () => {
  dialogVisible.value = true
}
defineExpose({ open })
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
            <div class="total-info-content-title-block">
              <div class="total-info-content-title">
                お知らせタイトル
              </div>
            </div>
            <div class="total-info-content">
              aaabbbccc
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
      border: #7b9eb5 solid 1px;
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
          background-color: #e1f5f8;
          height: 100%;
          width: 30%;

          .total-info-content-title {
            background-color: #d5dfdb;
            height: 15%;
            display: flex;
            align-items: center;
            font-size: 2.3vh;
          }
        }
        .total-info-content {
          //background-color: #c18cff;
          height: 100%;
          width: 70%;
          font-size: 3vh;
        }
      }
    }
  }
}
</style>