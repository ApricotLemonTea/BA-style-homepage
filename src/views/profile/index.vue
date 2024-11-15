<script setup>
import { ref } from "vue"
import TopBar from '../../components/TopBar.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const tabIndex = ref("profile")
const switchTab = (index) => {
  tabIndex.value = index
}

const envShowBackground = import.meta.env.VITE_SHOW_BACKGROUND

const bgImgSrc = ref("/profile/pf-bg.png?t=" + new Date().getTime().toString())
const ocImgSrc = ref("/profile/aio.png?t=" + new Date().getTime().toString())
const signImgSrc = ref("/profile/sign.png?t=" + new Date().getTime().toString())
</script>

<template>
  <div>
    <TopBar></TopBar>

    <div class="profile-container">
      <div v-show="tabIndex === 'profile'"
           class="id-card"
           :style="envShowBackground === 'true' ? { backgroundImage: `url(${bgImgSrc})` } : ''"
      >
        <div class="name-block blue-text-color">
          <p>{{ t("杏仁レモンティー") }}</p>
        </div>
        <div class="sign-block">
          <img v-if="envShowBackground === 'true'" :src="signImgSrc" alt="" class="sign-img">
        </div>
        <div class="detail-block blue-text-color">
          <p>{{ t("profile.絵が少し描ける一般人です。") }}</p>
          <p>{{ t("profile.好きなものなんでもやります。") }}</p>
          <p>中文 / 日本語 / English OK。</p>
        </div>
      </div>

      <div v-show="tabIndex === 'OC'" class="oc-card" >
        <img v-if="envShowBackground === 'true'" :src="ocImgSrc" alt="" class="oc-card-img">
      </div>

      <div class="button-block blue-text-color">
        <div :class="tabIndex === 'profile' ? 'button wider-border' : 'button'"
             @click="switchTab('profile')">
          <p class="button-text">{{ t("profile.プロフィール") }}</p>
        </div>
        <div :class="tabIndex === 'OC' ? 'button wider-border' : 'button'"
             @click="switchTab('OC')">
          <p class="button-text">{{ t("profile.オリキャラ設定画") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;

  .oc-card {
    background-color: white;
    width: 60vw;
    height: 70vh;
    margin-left: 7vw;
    display: flex;

    .oc-card-img {
      height: 100%;
      aspect-ratio: auto;
      margin: 0 auto;
    }
  }

  .id-card {
    background-color: white;
    width: 60vw;
    height: 70vh;
    margin-left: 7vw;
    display: flex;
    flex-direction: column;
    //background-image: url("/profile/pf-bg.png");
    background-image: v-bind("bgImgSrc.value");
    background-size: cover;

    .name-block {
      width: 25vw;
      height: 10vh;
      margin: 7vh 5vw 0 auto;
      display: flex;
      border-bottom: 5px solid #ffed6f;
    }
    .name-block p {
      margin: auto;
      font-size: 4.5vh;
      font-weight: bold;
    }

    .sign-block {
      width: 25vw;
      height: 20vh;
      margin: 3vh 5vw 0 auto;
      display: flex;

      .sign-img {
        height: 100%;
        aspect-ratio: auto;
        margin: 0 auto;
      }
    }

    .detail-block {
      width: 25vw;
      height: 30vh;
      margin: 13vh 4.5vw 0 auto;
      display: flex;
      flex-direction: column;
    }
    .detail-block p {
      margin-top: 12px;
      padding: 0 0 0 4vw;
      font-size: 2.5vh;
    }
  }

  .button-block {
    height: 70vh;
    margin-left: 5vw;

    .button {
      background-color: white;
      width: 20vw;
      height: 8vh;
      margin-top: 3vh;
      border-radius: 10px;
      display: flex;
      justify-content: start;
      align-items: center;
      font-size: 3.5vh;
      box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.2);
      border: 1px solid #9ec6e8;

      .button-text {
        margin-left: 20px;
        font-weight: bold;
      }
    }
    .button:active {
      transform: scale(0.95);
    }
    .wider-border {
      border: 3px solid #003153;
    }
  }
}
</style>