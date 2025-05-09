<script setup>
import { reactive, ref, watch, computed, h } from 'vue'
import { useUserStore } from '@/store/userStore'
import gsap from 'gsap'
import { getFormattedDate, numberWithCommas, openUrl } from '@/utils/commonFunctions'
import { useI18n } from "vue-i18n"
import i18n from '@/locale'
import { Message, Modal } from '@arco-design/web-vue'

const emit = defineEmits(['switch'])
const props = defineProps(['l2dOnly'])
const userStore = useUserStore()
const { t } = useI18n()

const apTooltipVisible = computed(() => {
  return userStore.apTooltipVisible
})
const increasePyroxeneDialogVisible = ref(false)
const exceedPyroxeneDialogVisible = ref(false)
const increaseApDialogVisible = ref(false)
const exceedApDialogVisible = ref(false)
const aboutDialogVisible = ref(false)

// AP
const ap = computed(() => {
  return userStore.ap
})
const tweenedAp = reactive({
  number: userStore.ap
})
watch(ap, (n) => {
  gsap.to(tweenedAp, { duration: 0.5, number: Number(n) || 0 })
})

// 信用点
const credit = computed(() => {
  return userStore.credit
})
const tweenedCredit = reactive({
  number: userStore.credit
})
watch(credit, (n) => {
  gsap.to(tweenedCredit, { duration: 0.5, number: Number(n) || 0 })
})

// 青辉石
const pyroxene = computed(() => {
  return userStore.pyroxene
})
const tweenedPyroxene = reactive({
  number: userStore.pyroxene
})
watch(pyroxene, (n) => {
  gsap.to(tweenedPyroxene, { duration: 0.5, number: Number(n) || 0 })
})

const img = ref('/img/max.png')
const showMin = ref(false)
const hover = ref(window.matchMedia('(hover: none)').matches)

const change = () => {
  userStore.switchSpotifyPlayerFlag()

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

// ********************体力********************
/* 自动回复AP的倒计时 */
const apRecoverCountdown = computed(() => {
  return userStore.apRecoverCountdown
})

/**
 * 点击体力按钮的事件<br/>
 * 显示体力回复的倒计时tooltip 3s，<br/>
 */
const handleClickAp = () => {
  // 防止重复点击及重复显示
  if (apTooltipVisible.value || increaseApDialogVisible.value || exceedApDialogVisible.value) {
    return
  }
  userStore.apTooltipVisible = true
  userStore.apTooltipCountdown = 3
}

/**
 * 点击体力加号的事件
 */
const handleClickApIncrease = () => {
  if (userStore.ap < 999){
    increaseApDialogVisible.value = true
  } else {
    exceedApDialogVisible.value = true
  }
}
/**
 * 体力增加到999
 */
const increaseAp = () => {
  userStore.ap = 999
}
// ****************************************

// ********************信用点********************
/**
 * 点击信用点的事件：
 * 随机生成信用点数量，同时AP -10
 */
const handleClickCredit = () => {
  if (userStore.credit === 0){
    // 打开弹窗询问是否要花费青辉石购买信用点
    openPurchaseCreditDialog()

    return
  }
  if (userStore.ap <= 0){
    Message.error({
      content: h("h3", {}, t("toolbox.APが足りません")),
      position: "top"
    })
    return
  }

  userStore.randomCredit()
  userStore.ap = userStore.ap - 10 >= 0 ? userStore.ap - 10 : 0
}

/**
 * 打开弹窗询问是否要花费青辉石购买信用点
 */
const openPurchaseCreditDialog = () => {
  Modal.open({
    title: t("toolbox.お金がない！"),
    content: () => [
      h("div", { class: "blue-text-color", style: { "font-size": "20px" } }, t("toolbox.もうお財布空っぽですよ")),
      h("div", { class: "blue-text-color", style: { "font-size": "20px" } }, t("toolbox.1200青輝石でクレジットを購入しますか？")),
    ],
    okText: t("はい"),
    cancelText: t("いいえ"),
    maskClosable: false,
    onBeforeOk: () => {
      if (userStore.pyroxene < 1200){
        Message.error({
          content: h("h3", {}, t("toolbox.青輝石もない！")),
          position: "top"
        })
        return false
      } else {
        return true
      }
    },
    onOk: () => {
      userStore.pyroxene -= 1200
      userStore.credit = 50000000
    }
  })
}
// ****************************************

// ********************青辉石********************
const loginDate = computed(() => {
  return localStorage.getItem("login-date")
})
const nowDate = ref(getFormattedDate(new Date()))
/**
 * 点击青辉石打开弹窗
 */
const handleClickPyroxene = () => {
  if (loginDate.value !== nowDate.value){
    increasePyroxeneDialogVisible.value = true
  } else {
    // 每天只能拿一次
    exceedPyroxeneDialogVisible.value = true
  }
}
/**
 * 青辉石+1200
 */
const increasePyroxene = () => {
  userStore.pyroxene += 1200
  // 将领取日期（今天）存储到storage
  localStorage.setItem("login-date", nowDate.value)
}
// ****************************************

// ********************修改语言********************
const changeLocale = () => {
  switch (i18n.global.locale) {
    case "ja":
      i18n.global.locale = "zh"
      break
    case "zh":
      i18n.global.locale = "en"
      break
    case "en":
      i18n.global.locale = "ja"
      break
  }
}

/**
 * 变更语言后将选择的语言存储到storage中
 */
watch(() => i18n.global.locale, (newLanguage) => {
  localStorage.setItem("locale", newLanguage)
})
// ****************************************
</script>

<template>
  <div class="toolbox-box">
    <!--体力-->
    <a-tooltip position="bottom" background-color="#254268"
               :popup-visible="apTooltipVisible"
               @click="handleClickAp"
    >
      <div
        class="toolbox"
        :style="{
          transform: (!props.l2dOnly ? 'translateY(0)' : 'translateY(-300px)') + ' skew(-10deg)',
          transition: 'transform 0.3s ' + (!props.l2dOnly ? 'ease-out' : 'ease-in')
        }"
      >
        <img src="/img/ap.png" alt="" />
        <span>{{ tweenedAp.number.toFixed(0) + ' / ' + userStore.maxAp }}</span>
        <img @click="handleClickApIncrease" src="/img/plus.png" alt="" class="plus-icon" />
      </div>
      <template #content>
        <p v-if="userStore.ap < userStore.maxAp">{{ t("toolbox.次の回復まであと") }} <span style="color: #60c7ff">{{ apRecoverCountdown }}</span> {{ t("toolbox.秒。") }}</p>
        <p v-else>{{ t("toolbox.自動回復の上限に到達しました。") }}</p>
      </template>
    </a-tooltip>

    <!--信用点-->
    <div @click="handleClickCredit"
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

    <!--切换语言的按钮-->
    <a
      @click="changeLocale"
      class="about toolbox"
      :style="{
          transform: (!props.l2dOnly ? 'translateY(0)' : 'translateY(-300px)') + ' skew(-10deg)',
          transition: 'transform 0.3s ' + (!props.l2dOnly ? 'ease-out' : 'ease-in')
        }"
    >
      <icon-language class="css-cursor-hover-enabled" />
    </a>

    <!--打开about的按钮-->
    <a
      class="about toolbox"
      @click="() => { aboutDialogVisible = true }"
      :style="{
        transform: (!props.l2dOnly ? 'translateY(0)' : 'translateY(-300px)') + ' skew(-10deg)',
        transition: 'transform 0.3s ' + (!props.l2dOnly ? 'ease-out' : 'ease-in')
      }"
    >
      <icon-info-circle class="css-cursor-hover-enabled" />
    </a>

    <!--打开或关闭ui的按钮-->
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

  <a-modal v-model:visible="increasePyroxeneDialogVisible" @ok="increasePyroxene"
           :ok-text="t('toolbox.いいね！')" :cancel-text="t('toolbox.いらない')"
  >
    <template #title>
      {{ t("toolbox.青輝石購入？") }}
    </template>
    <div style="margin: 0 20px">
      <div class="modal-text">{{ t("toolbox.青輝石1200個") }}</div>
      <div class="modal-text">{{ t("toolbox.一日一回無料！") }}</div>
    </div>
  </a-modal>
  <a-modal v-model:visible="exceedPyroxeneDialogVisible"
           :ok-text="t('toolbox.わかった')" hide-cancel
  >
    <template #title>
      {{ t("toolbox.青輝石購入？") }}
    </template>
    <div>
      <div class="modal-text">{{ t("toolbox.今日の分はもらったよ") }}</div>
      <div class="modal-text">{{ t("toolbox.また今度来てね") }}</div>
    </div>
  </a-modal>

  <a-modal v-model:visible="increaseApDialogVisible" @ok="increaseAp"
           :ok-text="t('toolbox.いいね！')" :cancel-text="t('toolbox.いらない')"
  >
    <template #title>
      {{ t("toolbox.AP購入？") }}
    </template>
    <div style="margin: 0 20px">
      <div class="modal-text">{{ t("toolbox.AP最大まで回復") }}</div>
      <div class="modal-text">{{ t("toolbox.しかも無料！") }}</div>
    </div>
  </a-modal>
  <a-modal v-model:visible="exceedApDialogVisible"
           :ok-text="t('toolbox.わかった')" hide-cancel>
    <template #title>
      {{ t("toolbox.AP購入？") }}
    </template>
    <div>
      <div class="modal-text">{{ t("toolbox.もうAP最大だよ") }}</div>
      <div class="modal-text">{{ t("toolbox.また今度来てね") }}</div>
    </div>
  </a-modal>

  <a-modal v-model:visible="aboutDialogVisible"
           modal-animation-name="no-slide-zoom-modal"
           :footer="false"
  >
    <template #title>
      About
    </template>
    <div style="color: #003153">
      <p>
        {{ t("welcome.当サイトは") }}
        <a href="https://x.com/ApricotLemonTea" target="_blank" style="color: #3987ff; font-weight: bold">{{ t("杏仁レモンティー")}}</a>
        {{ t("welcome.が開発・運営する個人ホームページです。") }}
      </p>
      <p>{{ t("toolbox.about.ブルーアーカイブのロビー仕様に作っています。") }}</p>
      <p>{{ t("toolbox.about.（当サイトはブルアカ公式とは一切関係ありません）") }}</p>
      <br />
      <p>Copyright © 2024 <span>{{ t("杏仁レモンティー") }}</span> All Rights Reserved.</p>
      <br />
      <p>Originally made by
        <span @click="openUrl('https://github.com/sf-yuzifu')"
              class="css-cursor-hover-enabled link"
              style="color: #3987ff">小鱼yuzifu</span>
      </p>
      <!--<p>Font using-->
      <!--  <span @click="openUrl('https://booth.pm/ja/items/4525676')"-->
      <!--        class="css-cursor-hover-enabled"-->
      <!--        style="color: #3987ff">夏蝉丸ゴシック</span>-->
      <!--</p>-->
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
