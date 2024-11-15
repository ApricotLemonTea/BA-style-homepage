<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Curtain from '@/components/Curtain.vue'

const { t } = useI18n()
const props = defineProps(['l2dOnly'])

const curtainRef = ref()

const openPortfolio = () => {
  curtainRef.value.skip(() => {
    window.open("https://xfolio.jp/portfolio/ApricotLemonTea")
  })
}
</script>

<template>
  <transition name="down2">
    <a-popover>
      <div
        v-if="!props.l2dOnly"
        :name="t('task.イラスト')"
        class="task css-cursor-hover-enabled"
        @click="openPortfolio"
      ></div>
      <template #title>
        <h3 class="blue-text-color">Xfolio</h3>
      </template>
      <template #content>
        <p class="blue-text-color">{{ t("task.ポートフォリオです") }}</p>
      </template>
    </a-popover>
  </transition>

  <Curtain ref="curtainRef"></Curtain>
</template>

<style scoped>
.task {
  position: absolute;
  bottom: 140px;
  right: 60px;
  width: 150px;
  height: 150px;
  background: url('/task.png') center;
  background-size: cover;
  transition: transform 0.1s;
}

.task:before {
  content: '';
  position: absolute;
  left: 10px;
  bottom: 0;
  height: 50px;
  width: calc(100% + 10px);
  border-radius: 8px;
  background: #003153;
  transform: skewX(-10deg);
}

.task:after {
  content: attr(name);
  position: absolute;
  left: 10px;
  bottom: 0;
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 26px;
  font-weight: 800;
}

.task:active {
  transform: scale(0.9);
}

@media screen and (max-width: 495px) {
  .task {
    right: 40px;
  }
}

.down2-leave-to,
.down2-enter-from {
  transform: translateY(300px);
}

.down2-leave-from,
.down2-enter-to {
  transform: translateY(0);
}

.down2-leave-active {
  transition: transform 0.3s ease-in;
}

.down2-enter-active {
  transition: transform 0.3s ease-out;
}
</style>
