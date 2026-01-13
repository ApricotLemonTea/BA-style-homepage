<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../store/userStore'

const route = useRoute()
const userStore = useUserStore()

const isShowPlayer = computed(() => {
  return route.path === '/' && userStore.showSpotifyPlayerFlag === true
})
</script>

<template>
  <transition name="left">
    <div class="spotify-player" v-show="isShowPlayer">
      <iframe
        style="border-radius: 12px"
        src="https://open.spotify.com/embed/playlist/4wjMH1kXpeNcIWY76tbIoh?utm_source=generator"
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  </transition>
</template>

<style scoped>
.spotify-player {
  position: fixed;
  left: 2vw;
  bottom: 10vh;
  width: 370px;
  opacity: 0.9;
  padding-bottom: 70px;
}

.left-leave-to,
.left-enter-from {
  transform: translateX(-300px);
}

.left-leave-from,
.left-enter-to {
  transform: translateX(0);
}

.left-enter-active {
  transition: transform 0.3s ease-out;
}

.left-leave-active {
  transition: transform 0.3s ease-in;
}
</style>
