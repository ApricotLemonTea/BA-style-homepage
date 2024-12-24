<script setup>
import TopBar from '@/components/TopBar.vue'
import { ref } from 'vue'
import { getFormattedDate } from '@/utils/commonFunctions'
import { useUserStore } from '@/store/userStore'
import ProgressBar from '@/views/mission/components/ProgressBar.vue'

const userStore = useUserStore()

const tabList = ref(["aaa", "bbb", "ccc"])
const selectedIndex = ref(0)

const firstTabStyle = {
  'margin-left' : 0,
  'border-top-left-radius': '15px'
}
const endTabStyle = {
  'border-top-right-radius': '15px'
}
const missionTagColors = {
  "実績": {
    "background-color": "#e08700ff",
  }
}

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
</script>

<template>
  <div>
    <TopBar></TopBar>

    <div class="mission-container blue-text-color">
      <div class="mission-tab-block">
        <div v-for="(item, index) in tabList" :key="index"
             @click="() => { selectedIndex = index }"
             :class="selectedIndex == index ? 'mission-tab-item selected' : 'mission-tab-item'"
             :style="index == 0 ? firstTabStyle
                                : index == tabList.length - 1 ? endTabStyle : ''"
        >
          {{ item }}
        </div>
      </div>

      <div class="mission-item-container">
        <div class="mission-item">
          <div class="mission-item-title-block">
            <div class="mission-tag" :style="missionTagColors['実績']">実績</div>
            <div class="mission-title">titleaaa</div>
          </div>
          <div class="mission-times-block">
            <div class="mission-times">
              <span>次数：0 / 1</span>
              <ProgressBar :percent="0.7"/>
            </div>
          </div>
        </div>
        <div class="mission-item"></div>
      </div>
    </div>

    <div class="login-bonus-block">
      <div class="login-text">デイリーログイン（{{ loginDate == nowDate ? 1 : 0 }} / 1）</div>
      <ProgressBar :percent="loginDate == nowDate ? 1 : 0" />
    </div>

    <div :class="loginDate == nowDate ? 'yellow-button disabled' : 'yellow-button'"
         @click="increasePyroxene">受取</div>
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
    height: 12%;
    display: flex;
    overflow: hidden;

    .mission-tab-item {
      background-color: white;
      height: 100%;
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2vw;
      margin-left: 0.3%;
      border-radius: 5px;
    }
    .selected {
      background-color: #2f4766ff;
      color: #fada0aff;
    }
  }

  .mission-item-container {
    background-color: #75757525;
    border-radius: 5px 5px 15px 15px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    .mission-item {
      background-color: #ffffff;
      width: 97%;
      height: 25%;
      border-radius: 12px;
      margin-top: 2%;
      display: flex;
      flex-direction: column;

      .mission-item-title-block {
        width: 95%;
        height: 40%;
        margin: 0.3vh auto 0;
        display: flex;
        align-items: center;
        border-bottom: 0.2vh solid #bfc4c7ff;

        .mission-tag {
          width: 10%;
          height: 70%;
          border-radius: 5px;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.3vw;
        }
        .mission-title {
          font-size: 1.5vw;
          margin-left: 3%;
        }
      }

      .mission-times-block {
        flex-grow: 1;
        display: flex;

        .mission-times {
          width: 60%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: start;
        }
        .mission-times span {
          margin: 0 5% 1.2%;
          font-size: 1.2vw;
        }
      }
    }
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

.progress-bar {
  width: 92.5%;
  margin: 0 3% 0 3%;
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