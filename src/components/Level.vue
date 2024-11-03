<script setup>
import { onMounted, ref } from 'vue'
import { Notification } from '@arco-design/web-vue'
import config from '/_config.json'

const props = defineProps(["sumPV"])

const exp = ref(props.sumPV)
const nextExp = ref(0)
const level = ref(0)

/**
 * 计算当前等级和下一级所需经验 <br/>
 * ・每升一级的所需经验是前一级的1.123324倍 <br/>
 * ・满级99级，总经验99,999 <br/>
 * ・(1.123324 ^ 99 ≈ 99,999)
 *
 * @param exp 当前经验（页面的page view总和）
 */
const countLevelAndNextExp = (exp) => {
  const base = 1.123324
  level.value = Math.ceil(Math.log(exp) / Math.log(base))
  nextExp.value = Math.floor(Math.pow(base, level.value + 1))
}

const openProfile = () => {
  // TODO 新增一个个人信息页面
  Notification.warning({
    id: "id",
    title: "工事中",
    content: "プロフィールのページを追加する予定",
    position: "topLeft",
    closable: true
  })
}

onMounted(() => {
  countLevelAndNextExp(exp.value)
})
</script>

<template>
  <div class="level-box" @click="openProfile">
    <div class="container">
      <div class="level css-cursor-hover-enabled">
        <span>Lv.</span>
        <p>{{ level }}</p>
      </div>
      <div class="right">
        <span class="name">{{ config.author }}</span>
        <div>
          <a-progress
            :percent="exp / nextExp"
            :show-text="false"
            :color="exp >= nextExp ? '#ffe433' : '#89d5fd'"
            trackColor="#535E67"
          >
          </a-progress>
          <p :style="{ color: exp >= nextExp ? '#ffe433' : '#66E0FE' }">
            {{ exp >= nextExp ? 'MAX' : exp + '/' + nextExp }}
          </p>
        </div>
      </div>
    </div>
  </div>
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
