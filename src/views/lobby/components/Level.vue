<script setup>
import config from '/_config.json'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/userStore'
import Curtain from '@/components/Curtain.vue'

const router = useRouter()
const userStore = useUserStore()

const isLevelMax = computed(() => {
  return userStore.total >= 294784
})

const curtainRef = ref()
/**
 * 跳转到个人信息页面
 */
const openProfile = () => {
  userStore.apTooltipVisible = false
  curtainRef.value.skip(() => {
    router.push({ name: "Profile" })
  })
}
</script>

<template>
  <div class="level-box" @click="openProfile">
    <div class="container">
      <div class="level css-cursor-hover-enabled">
        <span>Lv.</span>
        <p>{{ userStore.level }}</p>
      </div>
      <div class="right">
        <span class="name">{{ config.author }}</span>
        <div>
          <a-progress
            :percent="userStore.exp / userStore.nextExp"
            :show-text="false"
            :color="isLevelMax ? '#ffe433' : '#89d5fd'"
            trackColor="#535E67"
          >
          </a-progress>
          <p :style="{ color: isLevelMax ? '#ffe433' : '#66E0FE' }">
            {{ isLevelMax ? userStore.exp + ' / ' + 'MAX'
                          : userStore.exp + ' / ' + userStore.nextExp }}
            <span style="margin-left: 20px">（{{userStore.totalVisitor}}）</span>
          </p>
        </div>
      </div>
    </div>
  </div>
  <Curtain ref="curtainRef"></Curtain>
</template>

<style scoped>
.level-box {
  width: 300px;
  height: 96px;
  background: linear-gradient(120deg, #003153, #2265bb 15%, #003153 70%, #003153);
  position: absolute;
  left: 0;
  top: 40px;
  border-radius: 0 8px 8px 0;
  filter: drop-shadow(0 3px 3px black);
  display: flex;
}

.level-box:before {
  content: '';
  position: absolute;
  top: 0;
  right: -20px;
  bottom: 0;
  width: 60px;
  border-radius: 8px;
  background: #003153;
  transform: skewX(-10deg);
  z-index: -1;
}

.level-box .container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: auto 0 auto 26px;
  width: 100%;
  height: calc(100% - 26px);
}

.level {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.1s;
}

.level-box:active .level {
  transform: scale(0.85);
}

.container .level p {
  color: #fff;
  font-size: 42px;
  font-weight: 600;
  transform: skewX(-10deg);
}

.container .name {
  color: #fff;
  font-size: 22px;
  font-weight: 600;
}

.container .level span {
  color: #ffe433;
  font-size: 24px;
  font-weight: 600;
  transform: skewX(-10deg);
}

.right {
  align-self: flex-start;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  height: 100%;
}

.right p {
  font-size: 20px;
  font-weight: 600;
}

@media screen and (max-width: 495px) {
  .right {
    display: none;
  }

  .name {
    word-break: keep-all;
  }

  .level-box:hover {
    width: calc(100% - 60px);
  }

  .level-box:hover .right {
    display: flex;
  }

  .level-box {
    width: 100px;
    transition: all 0.3s;
    z-index: 10;
    left: 30px;
    transform: skewX(-10deg);
    border-radius: 8px;
  }

  .level-box:before {
    display: none;
  }

  .level-box .container {
    transform: skewX(10deg);
    margin: auto 26px;
  }
}
</style>
