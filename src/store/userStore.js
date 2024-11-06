import { defineStore } from 'pinia'
import calculateLevelAndNextExp from '@/utils/calculateLevelAndNextExp'

export const useUserStore = defineStore("userStore", {
  state: () => ({
    isFirstOpen: true,
    total: 0,
    ap: 0,
    credit: Math.floor(Math.random() * 99999999),
    pyroxene: 24000,
  }),
  getters: {
    exp(state) {
      return calculateLevelAndNextExp(state.total).exp
    },
    level(state) {
      return calculateLevelAndNextExp(state.total).level
    },
    nextExp(state) {
      return calculateLevelAndNextExp(state.total).nextExp
    },
    maxAp() {
      return 60 + this.level * 2
    },
  },
  actions: {
    /**
     * 生成随机的八位数以内的信用点
     */
    randomCredit() {
      this.credit = Math.floor(Math.random() * 99999999)
    }
  }
})