<script setup>
import { Modal } from '@arco-design/web-vue'
import { h, reactive, ref, watch } from 'vue'
import config from '/_config.json'
import gsap from 'gsap'

const emit = defineEmits(['switch'])
const props = defineProps(['l2dOnly'])

const getDialogVisible = ref(false)
const exceedDialogVisible = ref(false)
const aboutDialogVisible = ref(false)

const max_ap = 60 + config.level * 2
const ap = ref(
  max_ap -
    Math.trunc(
      max_ap *
        ((new Date().getTime() -
          new Date(
            `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()} 00:00:00`
          )) /
          86400000)
    )
)
const credit = ref(Math.floor(Math.random() * 99999999)) // 信用点
const tweenedCredit = reactive({
  number: credit.value
})
const pyroxene = ref(24000) // 青辉石
const tweenedPyroxene = reactive({
  number: pyroxene.value
})
const pyroxeneTimes = ref(1) // 记录青辉石的领取次数

const img = ref('/img/max.png')
const showMin = ref(false)
const hover = ref(window.matchMedia('(hover: none)').matches)

watch(pyroxene, (n) => {
  gsap.to(tweenedPyroxene, { duration: 0.5, number: Number(n) || 0 })
})
watch(credit, (n) => {
  gsap.to(tweenedCredit, { duration: 0.5, number: Number(n) || 0 })
})

const about = () => {
  aboutDialogVisible.value = true
}

const change = () => {
  img.value = img.value === '/img/min.png' ? '/img/max.png' : '/img/min.png'
  emit('switch')
}

document.body.addEventListener('click', () => {
  if (props.l2dOnly && hover.value) {
    showMin.value = !showMin.value
  } else {
    showMin.value = true
  }
})

window.matchMedia('(hover: none)').addListener((e) => {
  hover.value = e.matches
})

setInterval(() => {
  ap.value++
}, 10000)

/**
 * 点击青辉石打开弹窗
 */
const handleClickPyroxene = () => {
  if (pyroxeneTimes.value <= 20){
    getDialogVisible.value = true
  } else {
    // 超过一井后不能再拿
    exceedDialogVisible.value = true
  }
}
/**
 * 青辉石+1200
 */
const increasePyroxene = () => {
  pyroxene.value += 1200
  pyroxeneTimes.value += 1
}

/**
 * 生成随机的八位数信用点
 */
const generateCredit = () => {
  credit.value = Math.floor(Math.random() * 99999999)
}

/**
 * 数字增加千位分隔符
 */
const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
</script>

<template>
  <div class="toolbox-box">
    <!--体力-->
    <div
      class="toolbox"
      :style="{
        transform: (!props.l2dOnly ? 'translateY(0)' : 'translateY(-300px)') + ' skew(-10deg)',
        transition: 'transform 0.3s ' + (!props.l2dOnly ? 'ease-out' : 'ease-in')
      }"
    >
      <img src="/img/ap.png" alt="" />
      <span>{{ ap + '/' + max_ap }}</span>
    </div>

    <!--信用点-->
    <div @click="generateCredit"
      class="toolbox"
      :style="{
        transform: (!props.l2dOnly ? 'translateY(0)' : 'translateY(-300px)') + ' skew(-10deg)',
        transition: 'transform 0.3s ' + (!props.l2dOnly ? 'ease-out' : 'ease-in')
      }"
    >
      <img src="/img/gold.png" alt="" />
      <span> {{ numberWithCommas(tweenedCredit.number.toFixed(0)) }} </span>
    </div>

    <!--青辉石-->
    <div @click="handleClickPyroxene"
      class="toolbox"
      :style="{
        transform: (!props.l2dOnly ? 'translateY(0)' : 'translateY(-300px)') + ' skew(-10deg)',
        transition: 'transform 0.3s ' + (!props.l2dOnly ? 'ease-out' : 'ease-in')
      }"
    >
      <img src="/img/pyroxene.png" alt="" />
      <span>{{ numberWithCommas(tweenedPyroxene.number.toFixed(0)) }}</span>
      <img src="/img/plus.png" alt="" class="plus-icon" />
    </div>

    <!--打开about-->
    <a
      class="about toolbox"
      @click="about"
      :style="{
        transform: (!props.l2dOnly ? 'translateY(0)' : 'translateY(-300px)') + ' skew(-10deg)',
        transition: 'transform 0.3s ' + (!props.l2dOnly ? 'ease-out' : 'ease-in')
      }"
    >
      <icon-info-circle class="css-cursor-hover-enabled" />
    </a>

    <!--打开或关闭ui-->
    <a
      class="l2d toolbox"
      :class="{ canHover: !hover }"
      @click="change"
      :style="{
        transform: (!props.l2dOnly ? 'translateY(0)' : 'translateY(-76px)') + ' skew(-10deg)',
        transition: 'transform 0.3s ' + (!props.l2dOnly ? 'ease-out' : 'ease-in') + ',opacity 0.6s',
        opacity: !props.l2dOnly || (showMin && hover) ? 1 : 0
      }"
    >
      <img alt="" :src="img" />
    </a>
  </div>

  <a-modal v-model:visible="getDialogVisible" @ok="increasePyroxene"
           ok-text="いいね！" cancel-text="いらない">
    <template #title>
      青輝石購入？
    </template>
    <div style="margin: 0 20px">
      <div class="modal-text">青輝石1200個、</div>
      <div class="modal-text">無料でもらえる！</div>
    </div>
  </a-modal>
  <a-modal v-model:visible="exceedDialogVisible"
           ok-text="わかった" hide-cancel>
    <template #title>
      青輝石購入？
    </template>
    <div>
      <div class="modal-text">もう一天井分もらったよ、</div>
      <div class="modal-text">また今度来てね</div>
    </div>
  </a-modal>

  <a-modal v-model:visible="aboutDialogVisible"
           :footer="false">
    <template #title>
      About
    </template>
    <div style="color: #003153">
      <p>© 2024 杏仁レモンティー</p>
      <br />
      <p>Originally made by 小鱼yuzifu</p>
    </div>
  </a-modal>
</template>

<style scoped>
.toolbox-box {
  position: absolute;
  right: 20px;
  top: 40px;
  display: inline-flex;
}

.toolbox-box .toolbox {
  width: 220px;
  height: 56px;
  background: #fffd;
  color: #003153;
  margin: 0 10px;
  transform: skew(-10deg);
  border-radius: 6px;
  filter: drop-shadow(0px 0px 3px #0003);
  transition:
    background-color 0.3s,
    transform 0.1s;
  display: flex;
  align-items: center;
}

.toolbox img {
  height: 70%;
  transform: skew(10deg);
  margin: 0 8px 0 10px;
}
.toolbox span {
  font-size: 26px;
  transform: skew(10deg);
}

.toolbox-box .toolbox.about,
.toolbox-box .toolbox.l2d {
  width: 80px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.toolbox-box .toolbox.l2d {
  position: absolute;
  right: 0;
  top: 76px;
  overflow: hidden;
}

.toolbox.l2d img {
  filter: drop-shadow(-100vw 0px 0px #003153);
  transform: translateX(100vw);
  height: 32px;
}

.toolbox-box .toolbox:hover {
  background: #fffe;
}

.toolbox-box .toolbox.about:active,
.toolbox-box .toolbox.l2d:active {
  transform: skew(-10deg) scale(0.9);
}

.arco-icon {
  font-size: 32px;
  transform: skew(10deg);
}

.plus-icon {
  position: absolute;
  right: 0;
}

.modal-text {
  font-size: 20px;
  color: #003153;
}

@media screen and (max-width: 1199px) {
  .toolbox:not(.about) {
    display: none;
  }
}

.toolbox-box .toolbox.l2d.canHover:hover {
  opacity: 1 !important;
}
</style>
