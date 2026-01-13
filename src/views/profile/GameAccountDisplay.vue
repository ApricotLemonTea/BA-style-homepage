<script setup>
import { gameAccountList } from './gameAccountList'
import { ref } from 'vue'

const accountListLength = gameAccountList.length
const accountIndex = ref(0)
const slideDirection = ref('slide-right')

const changeIndex = (dir) => {
  slideDirection.value = dir === 'left' ? 'slide-left' : 'slide-right'

  switch (dir) {
    case 'left':
      accountIndex.value = (accountIndex.value - 1 + accountListLength) % accountListLength
      break
    case 'right':
      accountIndex.value = (accountIndex.value + 1) % accountListLength
      break
  }
}

const today = new Date().toISOString().slice(0, 10)
</script>

<template>
  <div class="game-account-display-container">
    <!--左切换箭头-->
    <div class="switch-arrow-block">
      <img src="/l2d/arrow.png" class="left-arrow" @click="changeIndex('left')" />
    </div>

    <!--图片展示区域-->
    <div class="main-block">
      <div class="account-image-block">
        <transition :name="slideDirection">
          <img
            :key="accountIndex"
            :src="`${gameAccountList[accountIndex].imgUrl}?date=${today}`"
            class="account-image"
          />
        </transition>
      </div>
      <div class="account-info blue-text-color">
        <p>{{ gameAccountList[accountIndex].server }}</p>
        <p>{{ gameAccountList[accountIndex].characterName }}</p>
        <p>{{ gameAccountList[accountIndex].time }}</p>
      </div>
    </div>

    <!--右切换箭头-->
    <div class="switch-arrow-block">
      <img src="/l2d/arrow.png" class="right-arrow" @click="changeIndex('right')" />
    </div>
  </div>
</template>

<style scoped>
.game-account-display-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  .switch-arrow-block {
    height: 90%;
    width: 5%;
    display: flex;
    justify-content: center;
    align-items: center;

    .left-arrow {
      width: 70%;
    }

    .left-arrow:active {
      transform: scale(0.9);
    }

    .right-arrow {
      width: 70%;
      transform: rotate(180deg);
    }

    .right-arrow:active {
      transform: rotate(180deg) scale(0.9);
    }
  }

  .main-block {
    height: 100%;
    width: 90%;

    .account-image-block {
      width: 100%;
      height: 90%;
      display: flex;
      justify-content: center;

      img {
        width: 100%;
        aspect-ratio: 1;
      }
    }

    .account-info {
      margin-top: 1vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 2vh;
      gap: 0.5vh;
    }
  }
}

.account-image {
  z-index: -1;
  position: absolute;
  width: 62%;
  height: 62%;
  object-fit: contain;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.4s ease;
}

.slide-right-enter {
  transform: translateX(100%);
}

.slide-right-leave-to {
  transform: translateX(-100%);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.4s ease;
}

.slide-left-enter {
  transform: translateX(-100%);
}

.slide-left-leave-to {
  transform: translateX(100%);
}
</style>
