<script setup>
import TopBar from '@/components/TopBar.vue'
import { computed, ref, onMounted } from 'vue'
import { getFormattedDate } from '@/utils/commonFunctions'
import { useUserStore } from '@/store/userStore'
import ProgressBar from '@/views/mission/components/ProgressBar.vue'
import MissionItem from '@/views/mission/components/MissionItem.vue'
import { useI18n } from 'vue-i18n'
import i18n from '@/locale'
import { useTagList } from '@/views/mission/tagList'
import { loadExcelData } from '@/utils/loadExcelData'

const { t } = useI18n()

const userStore = useUserStore()

const missionJa = ref()
const missionZh = ref()
const missionEn = ref()

const mission = computed(() => {
  switch (i18n.global.locale){
    case "ja":
      return missionJa.value
    case "zh":
      return missionZh.value
    case "en":
      return missionEn.value

    default:
      return missionJa.value
  }
})

const tagList = useTagList(t)
const selectedIndex = ref(0)

onMounted(async () => {
  missionJa.value = await loadExcelData("/data/mission.xlsx", 0)
  missionZh.value = await loadExcelData("/data/mission.xlsx", 1)
  missionEn.value = await loadExcelData("/data/mission.xlsx", 2)
})

// *********************************
// 每日登录逻辑（复制自Toolbox.vue）
const loginDate = ref(localStorage.getItem("login-date"))
const nowDate = ref(getFormattedDate(new Date()))

const increasePyroxene = () => {
  console.log(loginDate.value, nowDate.value)

  if (loginDate.value === nowDate.value){
    return
  }

  userStore.pyroxene += 1200
  // 将领取日期（今天）存储到storage
  localStorage.setItem("login-date", nowDate.value)
  // 将增加后的青辉石存储到storage
  localStorage.setItem("pyroxene", userStore.pyroxene)

  // 更新loginDate
  loginDate.value = localStorage.getItem("login-date")
}
// *********************************
</script>

<template>
  <div>
    <TopBar></TopBar>

    <!--任务内容区域-->
    <div class="mission-container blue-text-color">
      <!--tab切换-->
      <div class="mission-tab-block">
        <div v-for="(item, index) in tagList" :key="index"
             @click="() => { selectedIndex = index }"
             :class="[
               'mission-tab-item',
               index == 0 ? 'first-tab' : '',
               index == tagList.length - 1 ? 'end-tab' : ''
             ]"
             :style="index == selectedIndex ? item.style : ''"
        >
          {{ item.label }}
        </div>
      </div>
      <!--所有mission项目-->
      <div class="mission-item-container">
        <template v-for="item in mission" :key="item">
          <MissionItem v-show="selectedIndex == 0 ? true
                                                  : item.tagIndex == selectedIndex"
                       :tagIndex="item.tagIndex"
                       :title="item.title"
                       :times="item.times"
                       :maxTimes="item.maxTimes"
                       :detailUrl="item.detailUrl"
                       :completeDate="item.completeDate"
          />
        </template>
      </div>
    </div>

    <!--底部每日登录区域-->
    <div class="login-bonus-block">
      <div class="login-text">{{ t("mission.デイリーログイン")}}（{{ loginDate == nowDate ? 1 : 0 }} / 1）</div>
      <ProgressBar :percent="loginDate == nowDate ? 1 : 0" />
    </div>
    <div @click="increasePyroxene"
         :class="[
           'yellow-button',
           loginDate == nowDate ? 'disabled' : ''
         ]"
    >
      {{ t("mission.受取") }}
    </div>

    <!--说明文字区域-->
    <div class="info-message-block blue-text-color">
      <span>{{ t("mission.「開発」タグ以外のミッションはクリックすると詳細情報を確認できます") }}</span>
    </div>
  </div>
</template>

<style scoped>
.mission-container {
  width: 55vw;
  height: 72vh;
  position: fixed;
  top: 10vh;
  right: 6vw;
  display: flex;
  flex-direction: column;

  .mission-tab-block {
    width: 100%;
    min-height: 10%;
    display: flex;
    overflow: hidden;

    .mission-tab-item {
      background-color: white;
      height: 100%;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.7vw;
      margin-left: 0.3%;
      border-radius: 0.6vh;
    }
    .selected {
      background-color: #2f4766ff;
      color: #fada0aff;
    }
    .first-tab {
      margin-left: 0;
      border-top-left-radius: 1.7vh;
    }
    .end-tab {
      border-top-right-radius: 1.7vh;
    }
  }

  .mission-item-container {
    background-color: #75757525;
    border-radius: 0.7vh;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 1%;
    overflow-y: scroll;
  }
}

.login-bonus-block {
  background-color: #ffffff;
  width: 40vw;
  height: 10vh;
  position: fixed;
  bottom: 4vh;
  right: 20.5vw;
  border-radius: 1.5vh;
  box-shadow: 2px 2px 5px #bec9d8;
  display: flex;
  flex-direction: column;

  .login-text {
    font-size: 1.3vw;
    margin: 2% 5% 1% 5%;
  }
}

.yellow-button {
  background-color: #fdf16c;
  width: 11vw;
  height: 8vh;
  position: fixed;
  bottom: 5vh;
  right: 7.5vw;
  transform: skew(-10deg);
  border-radius: 1.2vh;
  box-shadow: 5px 5px 5px #bec9d8;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5vw;
}
.yellow-button:active {
  transform: scale(0.93) skew(-10deg);
}
.disabled {
  background-color: #dedee0ff;
  color: #9c9c9cff;
}
.disabled:active {
  transform: scale(1) skew(-10deg);
}

.info-message-block {
  background-color: rgba(250, 252, 255, 0.89);
  width: 30vw;
  height: 10vh;
  position: fixed;
  left: 4vw;
  bottom: 13vh;
  border-radius: 3vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.info-message-block span {
  margin: 0 10%;
  font-size: 1.2vw;
}
</style>