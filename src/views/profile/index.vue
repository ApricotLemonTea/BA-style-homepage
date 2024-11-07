<script setup>
import { ref } from "vue"

const tabIndex = ref("profile")
const switchTab = (index) => {
  tabIndex.value = index
}

const ocImgSrc = ref("/profile/aio.png?t=" + new Date().getTime().toString())
</script>

<template>
  <div class="profile-container">
    <div class="id-card" v-show="tabIndex === 'profile'">
      <img src="" alt="" class="id-card-img">
    </div>
    <div class="id-card" v-show="tabIndex === 'OC'">
      <img :src="ocImgSrc" alt="" class="id-card-img">
    </div>

    <div class="button-block blue-text-color">
      <div :class="tabIndex === 'profile' ? 'button wider-border' : 'button'"
           @click="switchTab('profile')">
        <p class="button-text">プロフィール</p>
      </div>
      <div :class="tabIndex === 'OC' ? 'button wider-border' : 'button'"
           @click="switchTab('OC')">
        <p class="button-text">オリキャラ</p>
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

  .id-card {
    background-color: white;
    width: 60vw;
    height: 70vh;
    margin-left: 7vw;
    display: flex;

    .id-card-img {
      height: 100%;
      aspect-ratio: auto;
      margin: 0 auto;
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
      }
    }
    .button:active {
      transform: scale(0.95);
    }
    .wider-border {
      border: 3px solid #718b9e;
    }
  }

}
</style>