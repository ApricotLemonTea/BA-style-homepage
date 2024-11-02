<script setup>
import { inject, ref } from 'vue'
import config from '/_config.json'
import { Icon } from '@arco-design/web-vue'
import { Notification } from '@arco-design/web-vue'
import useClipboard from 'vue-clipboard3'
const { toClipboard } = useClipboard()

const IconFont = Icon.addFromIconFontCn({
  src: config.iconfont
})
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
    Notification.success({
      title: "メールアドレスをコピーしました",
    })
  } catch (e) {
    console.log(e)
  }
}

/**
 * App.vue提供的打开url的方法
 * @type {function}
 */
const openUrl = inject("openUrl")
</script>

<template>
  <div class="footer">
    <div class="project-box">
      <a-popover title="Twitter">
        <div class="project css-cursor-hover-enabled"
             @click="openUrl('https://twitter.com/ApricotLemonTea')">
          <img src="/img/twitter.png" alt="" />
          <span>Twitter</span>
        </div>
        <template #content>
          <p>主にここで喋ってます</p>
        </template>
      </a-popover>

      <a-popover title="Misskey">
        <div class="project css-cursor-hover-enabled"
             @click="openUrl('https://misskey.io/@ApricotLemonTea')">
          <img src="/img/misskey.png" alt="" />
          <span>Misskey</span>
        </div>
        <template #content>
          <p>たまに見てます</p>
        </template>
      </a-popover>

      <a-popover title="GitHub">
        <div class="project css-cursor-hover-enabled"
             @click="openUrl('https://github.com/ApricotLemonTea/BA-style-homepage')">
          <img src="/img/github.png" alt="" />
          <span>GitHub</span>
        </div>
        <template #content>
          パブリックのレポジトリです
        </template>
      </a-popover>

      <a-popover title="Mail">
        <div class="project css-cursor-hover-enabled"
             @click="copyMailAddress">
          <img src="/img/mail.png" alt="" />
          <span>Mail</span>
        </div>
        <template #content>
          <p>apricotlemontea@gmail.com</p>
          <p>(クリックでコピーできます)</p>
        </template>
      </a-popover>

      <a-popover title="Wavebox">
        <div class="project css-cursor-hover-enabled"
          @click="openUrl('https://wavebox.me/wave/5n2bu0domp1j2fq9')">
          <img src="/img/wavebox.png" alt="" />
          <span>Wavebox</span>
        </div>
        <template #content>
          <p>ご要望、ご感想などはこちらにどうぞ</p>
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

.project:active {
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
