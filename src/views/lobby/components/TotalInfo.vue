<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import i18n from '@/locale'
import { loadExcelData } from '@/utils/loadExcelData'
import EChart from '@/components/EChart.vue'
import { useUserStore } from '@/store/userStore'
import * as echarts from 'echarts'

const { t } = useI18n()
const userStore = useUserStore()

const announcementJa = ref()
const announcementZh = ref()
const announcementEn = ref()

const patchNoteJa = ref()
const patchNoteZh = ref()
const patchNoteEn = ref()

onMounted(async () => {
  const announcementData = await loadExcelData("/data/announcement.xlsx")
  announcementJa.value = announcementData["日本語"]
  for (let item of announcementJa.value) {
    item.contents = item.contents.split("\r\n")
  }
  announcementZh.value = announcementData["中文"]
  for (let item of announcementZh.value) {
    item.contents = item.contents.split("\r\n")
  }
  announcementEn.value = announcementData["English"]
  for (let item of announcementEn.value) {
    item.contents = item.contents.split("\r\n")
  }

  const patchNoteData = await loadExcelData("/data/patchNote.xlsx")
  patchNoteJa.value = patchNoteData["日本語"]
  for (let item of patchNoteJa.value) {
    item.contents = item.contents.split("\r\n")
  }
  patchNoteZh.value = patchNoteData["中文"]
  for (let item of patchNoteZh.value) {
    item.contents = item.contents.split("\r\n")
  }
  patchNoteEn.value = patchNoteData["English"]
  for (let item of patchNoteEn.value) {
    item.contents = item.contents.split("\r\n")
  }
})

const announcement = computed(() => {
  switch (i18n.global.locale){
    case "ja":
      return announcementJa.value
    case "zh":
      return announcementZh.value
    case "en":
      return announcementEn.value

    default:
      return announcementJa.value
  }
})

const patchNote = computed(() => {
  switch (i18n.global.locale){
    case "ja":
      return patchNoteJa.value
    case "zh":
      return patchNoteZh.value
    case "en":
      return patchNoteEn.value

    default:
      return patchNoteJa.value
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
  return [
    t("totalInfo.お知らせ"),
    t("totalInfo.パッチノート"),
    t("totalInfo.訪問者数グラフ")
  ]
})

/** 网站访问量折线图图表用的配置 **/
const zoomStart = (Math.max(userStore.accessDataList.length - 30, 0) / userStore.accessDataList.length) * 100 // 默认显示最近30天的数据
const chartOption = {
  dataset: {
    source: userStore.accessDataList
  },
  tooltip: {
    trigger: 'axis',
    position: function (pt) {
      return [pt[0], '10%']
    }
  },
  grid: {
    left: '10%',
    right: '10%'
  },
  toolbox: {
    feature: {
      restore: {}
    },
    bottom: '2%',
    right: '5%'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
  },
  yAxis: [
    {
      type: 'value',
      boundaryGap: [0, '10%'],
      position: 'left',
      alignTicks: true
    },
    {
      type: 'value',
      boundaryGap: [0, '30%'],
      position: 'right',
      alignTicks: true
    }
  ],
  dataZoom: [
    {
      type: 'inside',
      start: zoomStart,
      end: 100
    },
    {
      start: zoomStart,
      end: 100
    }
  ],
  series: [
    {
      name: t("graph.訪問者数"),
      type: 'line',
      sampling: 'lttb',
      yAxisIndex: 0,
      symbol: 'none',
      itemStyle: {
        color: 'rgb(255,49,73)'
      }
    },
    {
      name: t("graph.リクエスト数"),
      type: 'line',
      sampling: 'lttb',
      yAxisIndex: 1,
      symbol: 'none',
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(68,211,255)'
          },
          {
            offset: 1,
            color: 'rgb(70,184,255)'
          }
        ])
      },
      emphasis: {
        disabled: true
      }
    }
  ]
}
</script>

<template>
  <el-dialog v-model="dialogVisible"
             class="total-info-dialog"
             :show-close="false"
  >
    <template #title>
      <div class="total-info-header-block">
        <p class="title-text">ApricotLemonTea News</p>
        <IconClose @click="() => { dialogVisible = false }"
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
                 @click="() => { selectedTabIndex = index; selectedTitleIndex = 0 }"
            >
              {{ item }}
            </div>
          </div>

          <!--お知らせ-->
          <div v-show="tabList[selectedTabIndex] === t('totalInfo.お知らせ')"
               class="total-info-content-block"
          >
            <!--左侧标题栏-->
            <div class="total-info-content-title-block">
              <div v-for="(item, index) in announcement" :key="index"
                   :class="['total-info-content-title', selectedTitleIndex === index ? ' title-selected' : '']"
                   @click="() => { selectedTitleIndex = index }"
              >
                {{ item.title }}
              </div>
            </div>
            <!--正文内容-->
            <div v-for="(item, index) in announcement"  :key="index"
                 v-show="selectedTitleIndex === index"
                 class="total-info-content"
            >
              <h3 style="text-align: center">
                {{ item.title }}
              </h3>
              <a-divider :size="3"></a-divider>
              <br>
              <div v-for="contentItem in item.contents" :key="contentItem"
                 v-html="contentItem"
                 style="margin-bottom: 3vh"
              >
              </div>
              <br>
              <p style="text-align: right;">{{ item.time }}</p>
            </div>
          </div>

          <!--パッチノート-->
          <div v-show="tabList[selectedTabIndex] === t('totalInfo.パッチノート')"
               class="total-info-content-block"
          >
            <!--左侧标题栏-->
            <div class="total-info-content-title-block">
              <div v-for="(item, index) in patchNote" :key="index"
                   :class="['total-info-content-title', selectedTitleIndex === index ? ' title-selected' : '']"
                   @click="() => { selectedTitleIndex = index }"
              >
                {{ item.title }}
              </div>
            </div>
            <!--正文内容-->
            <div v-for="(item, index) in patchNote"  :key="index"
                 v-show="selectedTitleIndex === index"
                 class="total-info-content"
            >
              <h3 style="text-align: center">
                {{ item.title }}
              </h3>
              <a-divider :size="3"></a-divider>
              <br>
              <ul style="margin: 0 30px">
                <li v-for="contentItem in item.contents" :key="contentItem"
                    v-html="contentItem"
                    style="margin-bottom: 3vh"></li>
              </ul>
            </div>
          </div>

          <!--网站访问数折线图-->
          <div v-if="tabList[selectedTabIndex] === t('totalInfo.訪問者数グラフ')"
               class="total-info-content-block"
          >
            <EChart :option="chartOption"></EChart>
          </div>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<style>
.total-info-dialog {
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
      font-weight: bold;
      margin-left: 1vw;
      transform: skewx(-10deg)
    }
    .close-button {
      color: white;
      margin: 0 0.8vw 0 auto;
    }
  }

  .total-info-container {
    height: 58vh;

    .total-info-inner-container {
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
          width: 50%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2.5vh;
          font-weight: bold;
        }
        .tab-selected {
          background-color: #40708b;
          color: white;
        }
      }

      .total-info-content-block {
        height: 49vh;
        display: flex;

        .total-info-content-title-block {
          background-color: #f5f7f9;
          height: 100%;
          overflow-y: auto;
          width: 30%;
          margin-left: 1px;

          .total-info-content-title {
            background-color: #f5f7f9;
            height: 15%;
            display: flex;
            align-items: center;
            font-size: 2.3vh;
            font-weight: bold;
            padding-left: 1vw;
          }
          .title-selected {
            background-color: #dbe6eb;
          }
        }
        .total-info-content {
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