<script setup>
import { ref } from 'vue'
import config from '/_config.json'
import Curtain from '@/components/Curtain.vue'

const props = defineProps(['l2dOnly'])

const curtainRef = ref()

const openPortfolio = () => {
  curtainRef.value.skip(() => {
    window.open(config.task.href)
  })
}
</script>

<template>
  <transition name="down2">
    <a-popover title="Xfolio" content="ポートフォリオです">
      <div
        v-if="!props.l2dOnly"
        :name="config.task.name"
        class="task css-cursor-hover-enabled"
        @click="openPortfolio"
      ></div>
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
