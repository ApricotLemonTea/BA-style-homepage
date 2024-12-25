<script setup>
import TopBar from '@/components/TopBar.vue'
import { computed, ref } from 'vue'
import { getFormattedDate } from '@/utils/commonFunctions'
import { useUserStore } from '@/store/userStore'
import ProgressBar from '@/views/mission/components/ProgressBar.vue'
import MissionItem from '@/views/mission/components/MissionItem.vue'
import { useI18n } from 'vue-i18n'
import missionJa from '/src/notes/mission/missionJa.json'
import missionZh from '/src/notes/mission/missionZh.json'
import missionEn from '/src/notes/mission/missionEn.json'
import i18n from '@/locale'

const { t } = useI18n()

const userStore = useUserStore()

const mission = computed(() => {
  switch (i18n.global.locale){
    case "ja":
      return missionJa
    case "zh":
      return missionZh
    case "en":
      return missionEn

    default:
      return missionJa
  }
})

const tabList = ref([
  t("mission.missionTag.すべて"),
  t("mission.missionTag.イベント"),
  t("mission.missionTag.実績"),
  "TODO"
])
const tabSelectedStyle = ref([
  {
    "background-color": "#2f4766ff",
    "color": "#fada0aff"
  },
  {
    "background-color": "#eb5792ff",
    "color": "#ffffff"
  },
  {
    "background-color": "#e08700ff",
    "color": "#ffffff"
  },
  {
    "background-color": "#389fe8ff",
    "color": "#ffffff"
  }
])
const selectedIndex = ref(0)

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

    <div class="mission-container blue-text-color">
      <!--tab切换-->
      <div class="mission-tab-block">
        <div v-for="(item, index) in tabList" :key="index"
             @click="() => { selectedIndex = index }"
             :class="[
               'mission-tab-item',
               index == 0 ? 'first-tab' : '',
               index == tabList.length - 1 ? 'end-tab' : ''
             ]"
             :style="index == selectedIndex ? tabSelectedStyle[selectedIndex] : ''"
        >
          {{ item }}
        </div>
      </div>

      <!--mission内容-->
      <div class="mission-item-container">
        <template v-for="item in mission.missionList" :key="item">
          <MissionItem v-show="selectedIndex == 0 ? true : item.tagIndex == selectedIndex"
                       :tagIndex="item.tagIndex" :title="item.title" :times="item.times"
          />
        </template>

        <!--<MissionItem v-for="item in mission.missionList" :key="item"-->
        <!--  :tagIndex="item.tagIndex" :title="item.title" :times="item.times"-->
        <!--/>-->
      </div>
    </div>

    <div class="login-bonus-block">
      <div class="login-text">{{ t("mission.デイリーログイン")}}（{{ loginDate == nowDate ? 1 : 0 }} / 1）</div>
      <ProgressBar :percent="loginDate == nowDate ? 1 : 0" />
    </div>

    <div :class="loginDate == nowDate ? 'yellow-button disabled' : 'yellow-button'"
         @click="increasePyroxene">
      {{ t("mission.受取") }}
    </div>
  </div>
</template>

<style scoped>
.mission-container {
  width: 60vw;
  height: 72vh;
  position: fixed;
  top: 10vh;
  right: 6vw;
  display: flex;
  flex-direction: column;

  .mission-tab-block {
    width: 100%;
    height: 10%;
    display: flex;
    overflow: hidden;

    .mission-tab-item {
      background-color: white;
      height: 100%;
      width: 25%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.7vw;
      margin-left: 0.3%;
      border-radius: 5px;
    }
    .selected {
      background-color: #2f4766ff;
      color: #fada0aff;
    }
    .first-tab {
      margin-left: 0;
      border-top-left-radius: 15px;
    }
    .end-tab {
      border-top-right-radius: 15px;
    }
  }

  .mission-item-container {
    background-color: #75757525;
    border-radius: 5px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 1%;
    overflow-y: auto;
  }
}

.login-bonus-block {
  background-color: #ffffff;
  width: 45vw;
  height: 10vh;
  position: fixed;
  bottom: 4vh;
  right: 20.5vw;
  border-radius: 10px;
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
  border-radius: 10px;
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
</style>