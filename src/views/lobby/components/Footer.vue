<script setup>
import { ref } from 'vue'
import { openUrl } from '@/utils/commonFunctions'
// import config from '/_config.json'
// import { Icon } from '@arco-design/web-vue'
import { Message } from '@arco-design/web-vue'
import useClipboard from 'vue-clipboard3'
const { toClipboard } = useClipboard()
import { useI18n } from "vue-i18n"
const { t } = useI18n()
// const IconFont = Icon.addFromIconFontCn({
//   src: config.iconfont
// })
const time = ref(new Date().getHours() + ':' + new Date().getMinutes())

const addZero = (time) => {
  return time < 10 ? '0' + time : time
}

setInterval(() => {
  time.value = addZero(new Date().getHours()) + ':' + addZero(new Date().getMinutes())
}, 1000)

/**
 * 复制邮件地址到剪贴板
 */
const copyMailAddress = async () => {
  try {
    await toClipboard("apricotlemontea@gmail.com")
    Message.success({
      content: t("footer.メールアドレスをコピーしました"),
      position: "bottom"
    })
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div class="footer">
    <div class="project-box">
      <a-popover>
        <div class="project css-cursor-hover-enabled"
             @click="openUrl('https://twitter.com/ApricotLemonTea')"
        >
          <img src="/img/twitter.png" alt="" />
          <span>SNSs</span>
        </div>
        <template #title>
          <h3 class="blue-text-color">SNSs</h3>
        </template>
        <template #content>
          <div class="button-list">
            <div class="button-item css-cursor-hover-enabled" style="margin-left: 0">
              <img src="/img/twitter.png" alt=""
                   @click="openUrl('https://twitter.com/ApricotLemonTea')"
              />
              <span>Twitter</span>
            </div>
            <!--<div class="button-item css-cursor-hover-enabled">-->
            <!--  <img src="/img/x.png" alt=""-->
            <!--       @click="openUrl('https://twitter.com/A_LemonTea')"-->
            <!--  />-->
            <!--  <span>X (R18)</span>-->
            <!--</div>-->
            <div class="button-item css-cursor-hover-enabled">
              <img src="/img/misskey.png" alt=""
                   @click="openUrl('https://misskey.io/@ApricotLemonTea')"
              />
              <span>Misskey</span>
            </div>
            <div class="button-item css-cursor-hover-enabled">
              <img src="/img/pixiv.png" alt=""
                   @click="openUrl('https://www.pixiv.net/users/13926723')"
              />
              <span>pixiv</span>
            </div>
            <div class="button-item css-cursor-hover-enabled">
              <img src="/img/bluesky.png" alt=""
                   @click="openUrl('https://bsky.app/profile/apricotlemontea.com')"
              />
              <span style="text-decoration: line-through">Bluesky</span>
            </div>
            <div class="button-item css-cursor-hover-enabled">
              <img src="/img/weibo.png" alt=""
                   @click="openUrl('https://m.weibo.cn/profile/7850690980')"
              />
              <span style="text-decoration: line-through">微博</span>
            </div>
          </div>
        </template>
      </a-popover>

      <a-popover>
        <div class="project css-cursor-hover-enabled"
             @click="openUrl('https://apricotlemontea.booth.pm')"
        >
          <img src="/img/booth.png" alt="" />
          <span>Shops</span>
        </div>
        <template #title>
          <h3 class="blue-text-color">Online Shops</h3>
        </template>
        <template #content>
          <div class="button-list">
            <div class="button-item css-cursor-hover-enabled" style="margin-left: 0">
              <img src="/img/booth.png" alt=""
                   @click="openUrl('https://apricotlemontea.booth.pm')"
              />
              <span>BOOTH</span>
            </div>
            <div class="button-item css-cursor-hover-enabled">
              <img src="/img/melonbooks.png" alt=""
                   style="width: auto"
                   @click="openUrl('https://www.melonbooks.co.jp/circle/index.php?circle_id=129456')"
              />
              <span>Melonbooks</span>
            </div>
          </div>
        </template>
      </a-popover>

      <a-popover>
        <div class="project css-cursor-hover-enabled"
             @click="openUrl('https://skeb.jp/@ApricotLemonTea')"
        >
          <img src="/img/skeb.png" alt="" />
          <span>Skeb</span>
        </div>
        <template #title>
          <h3 class="blue-text-color">Skeb</h3>
        </template>
        <template #content>
          <p class="blue-text-color">{{ t("footer.依頼募集中") }}</p>
        </template>
      </a-popover>

      <a-popover>
        <div class="project css-cursor-hover-enabled"
             @click="openUrl('https://apricotlemontea.fanbox.cc/')"
        >
          <img src="/img/fanbox.png" alt="" />
          <span>FANBOX</span>
        </div>
        <template #title>
          <h3 class="blue-text-color">pixivFANBOX</h3>
        </template>
        <template #content>
          <p class="blue-text-color">{{ t("footer.気が向いたら記事も書きます") }}</p>
        </template>
      </a-popover>

      <a-popover>
        <div class="project css-cursor-hover-enabled"
             @click="openUrl('https://github.com/ApricotLemonTea/BA-style-homepage')"
        >
          <img src="/img/github.png" alt="" />
          <span>GitHub</span>
        </div>
        <template #title>
          <h3 class="blue-text-color">GitHub</h3>
        </template>
        <template #content>
          <p  class="blue-text-color">{{ t("footer.パブリックのレポジトリです") }}</p>
        </template>
      </a-popover>

      <a-popover>
        <div class="project css-cursor-hover-enabled"
             @click="copyMailAddress"
        >
          <img src="/img/mail.png" alt="" />
          <span>Mail</span>
        </div>
        <template #title>
          <h3 class="blue-text-color">Mail</h3>
        </template>
        <template #content>
          <div class="blue-text-color">
            <p style="font-size: 18px">apricotlemontea@gmail.com</p>
            <p>{{ t("footer.(クリックでコピーできます)") }}</p>
          </div>
        </template>
      </a-popover>

      <a-popover>
        <div class="project css-cursor-hover-enabled"
          @click="openUrl('https://wavebox.me/wave/5n2bu0domp1j2fq9')"
        >
          <img src="/img/wavebox.png" alt="" />
          <span>Wavebox</span>
        </div>
        <template #title>
          <h3 class="blue-text-color">Wavebox</h3>
        </template>
        <template #content>
          <p class="blue-text-color">{{ t("footer.ご要望、ご感想などはこちらに") }}</p>
        </template>
      </a-popover>
    </div>

    <div class="time">
      <p>△×+○</p>
      <span>{{ time }}</span>
    </div>
  </div>
</template>

<style scoped>
.footer {
  width: calc(100% - 80px);
  height: 60px;
  background: #e8f3ffee;
  position: absolute;
  bottom: 25px;
  transform: skew(-20deg);
  align-self: center;
  border-radius: 8px;
  display: inline-flex;
  justify-content: center;
  filter: drop-shadow(0px 0px 6px #0003);
  transition: all 0.3s;
  align-items: flex-end;
}

.footer::after {
  content: '';
  width: calc(100% - 360px);
  height: 60px;
  background: #ffffffdd;
  position: absolute;
  transform: skew(50deg);
  border-radius: 4px;
  z-index: -1;
  transition: all 0.3s;
}

.project-box {
  width: calc(100% - 120px);
  height: calc(100% + 20px + 24px);
  transform: skew(20deg);
  position: absolute;
  left: 20px;
  display: inline-flex;
  align-items: flex-end;
  overflow: auto;
}

.project-box::-webkit-scrollbar {
  display: none;
}

.time {
  transform: skew(20deg);
  position: absolute;
  right: 40px;
  bottom: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  font-size: 18px;
  flex-direction: column;
}

.time p {
  color: #abb3c4;
}

.time span {
  color: #525f72;
}

.project {
  height: max-content;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  bottom: 15px;
  margin: 0 0 0 5%;
  transition: transform 0.05s;
}

.project img:active {
  transform: scale(0.9);
}

.project span {
  margin: 5px 0 0;
  color: #003153;
  font-size: 16px;
  word-break: keep-all;
}

.arco-icon {
  font-size: 64px;
}

.project img {
  width: 64px;
  height: 64px;
  border-radius: 22%;
}

.button-list {
  display: flex;

  .button-item {
    display: flex;
    flex-direction: column;
    margin-left: 30px;
  }
  .button-item:hover {
    opacity: 0.7;
  }

  .button-item img {
    width: 50px;
    height: 50px;
    border-radius: 22%;
  }
  .button-item img:active {
    transform: scale(0.9);
  }
  .button-item span {
    display: flex;
    justify-content: center;
  }
}

@media screen and (max-width: 830px) {
  .project-box {
    width: 100%;
    justify-content: space-evenly;
    left: 0;
  }

  .time {
    display: none;
  }

  .project {
    margin: 0;
  }

  .project span {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  .project img {
    width: 48px;
    height: 48px;
  }

  .footer::after {
    width: calc(100% - 120px);
  }
}

@media screen and (max-width: 495px) {
  .project {
    bottom: 0;
  }

  .project-box {
    transform: skew(0deg);
    align-items: center;
  }

  .footer {
    transform: skew(0deg);
    width: calc(100% - 40px);
    height: 80px;
    align-items: center;
  }

  .footer::after {
    transform: skew(0deg);
    display: none;
  }
}
</style>
