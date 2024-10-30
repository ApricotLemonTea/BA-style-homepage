<script setup>
import { Spine } from 'pixi-spine'
import * as PIXI from 'pixi.js'
import { studentsL2D, bgmName } from '@/main'
import { sound } from '@pixi/sound'

const props = defineProps(['l2dOnly'])

let animation, id = 0

const l2d = new PIXI.Application({
  width: 2560,
  height: 1440,
  backgroundAlpha: 0
})

document.querySelector('#background').appendChild(l2d.view)

const setL2D = (num) => {
  sound.stopAll()
  l2d.stage.removeChild(animation)
  switch (num) {
    case '-':
      id = id === 0 ? studentsL2D.length - 1 : id - 1
      break
    case '+':
      id = id === studentsL2D.length - 1 ? 0 : id + 1
      break
    default:
      id = num
  }
  animation = new Spine(studentsL2D[id].spineData)
  l2d.stage.addChild(animation)
  if (animation.state.hasAnimation('Idle_01')) {
    animation.scale.set(.85)
    animation.state.setAnimation(0, 'Idle_01', true)
    animation.state.timeScale = 1
    animation.autoUpdate = true
    animation.y = 1440
    animation.x = 2560 / 2
  }
  sound.play(bgmName[id])
}

setL2D(id)
</script>

<template>
  <div id="change" v-if="!props.l2dOnly">
    <img class="css-cursor-hover-enabled" @click="setL2D('-')" src="/l2d/arrow.png" alt="" />
    <img class="css-cursor-hover-enabled" @click="setL2D('+')" src="/l2d/arrow.png" alt="" />
  </div>
</template>

<style scoped>
#change {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

img {
  width: 32px;
  height: auto;
  animation: move 2s ease-in-out infinite;
  z-index: 9;
}

img:last-child {
  transform: rotate(180deg);
  animation: moveReverse 2s ease-in-out infinite;
}

@keyframes move {
  0% {
    transform: translateX(10px);
  }
  50% {
    transform: translateX(30px);
  }
  100% {
    transform: translateX(10px);
  }
}

@keyframes moveReverse {
  0% {
    transform: rotate(180deg) translateX(10px);
  }
  50% {
    transform: rotate(180deg) translateX(30px);
  }
  100% {
    transform: rotate(180deg) translateX(10px);
  }
}
</style>
