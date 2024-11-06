import { defineStore } from 'pinia'
import calculateLevelAndNextExp from '@/utils/calculateLevelAndNextExp'

export const useUserStore = defineStore("userStore", {
  state: () => ({
    total: 0,
    ap: 0,
    credit: Math.floor(Math.random() * 99999999),
    pyroxene: 24000,
  }),
  getters: {
    exp: (total) => calculateLevelAndNextExp(total).exp,
    level: (total) => calculateLevelAndNextExp(total).level,
    nextExp: (total) => calculateLevelAndNextExp(total).nextExp,
    maxAp: (level) => 60 + level * 2,
  }
})