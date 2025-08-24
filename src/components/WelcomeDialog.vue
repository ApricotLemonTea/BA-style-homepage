<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const welcomeDialogVisible = ref(false)
const dontShowWelcomeDialogCheckBox = ref(false)

onMounted(() => {
  // 弹出欢迎信息
  const dontShowWelcomeDialogFlag = localStorage.getItem("dontShowWelcomeDialogFlag")
  if (!dontShowWelcomeDialogFlag) {
    welcomeDialogVisible.value = true
  }
})

/*
  记录用户选择是否显示欢迎信息弹窗
 */
const setDontShowWelcomeDialogFlag = () => {
  if (dontShowWelcomeDialogCheckBox.value) {
    localStorage.setItem("dontShowWelcomeDialogFlag", true)
  }
}
</script>

<template>
  <!--第一次访问本站的弹窗-->
  <a-modal v-model:visible="welcomeDialogVisible"
           @close="setDontShowWelcomeDialogFlag"
           modal-animation-name="no-slide-zoom-modal"
           :mask-closable="false"
           :footer="false"
  >
    <template #title>
      Welcome
    </template>
    <div class="blue-text-color">
      <p>{{ t("welcome.いらっしゃいませ(｀・ω・´)") }}</p>
      <br />
      <p>
        {{ t("welcome.当サイトは") }}
        <a href="https://x.com/ApricotLemonTea" target="_blank" style="color: #3987ff; font-weight: bold">{{ t("杏仁レモンティー")}}</a>
        {{ t("welcome.が開発・運営する個人ホームページです。") }}
      </p>
      <p>{{ t("toolbox.about.ブルーアーカイブのロビー仕様に作っています。") }}</p>
      <p>{{ t("welcome.ブルアカ公式とは一切関係ありません、ご注意ください。") }}</p>
      <br />
      <p>{{ t("welcome.当サイトの各種機能は画面左の「ガイド」ボタンから紹介いたします。") }}</p>
      <br />
      <a-checkbox v-model="dontShowWelcomeDialogCheckBox" style="margin-right: 5%">
        <p class="blue-text-color">{{ t("welcome.次回から表示しない") }}</p>
      </a-checkbox>
    </div>
  </a-modal>
</template>

<style scoped>

</style>