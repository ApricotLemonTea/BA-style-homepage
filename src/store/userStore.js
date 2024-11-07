import { defineStore } from 'pinia'
import calculateLevelAndNextExp from '@/utils/calculateLevelAndNextExp'

export const useUserStore = defineStore("userStore", {
  state: () => ({
    isFirstOpen: true,
    totalVisitor: 0,

    ap: 0,
    credit: Math.floor(Math.random() * 99999999),
    pyroxene: 24000,

    apRecoverCountdown: 9,
    apTooltipCountdown: 0,

    apTooltipVisible: false
  }),
  getters: {
    exp(state) {
      return calculateLevelAndNextExp(state.totalVisitor).exp
    },
    level(state) {
      return calculateLevelAndNextExp(state.totalVisitor).level
    },
    nextExp(state) {
      return calculateLevelAndNextExp(state.totalVisitor).nextExp
    },
    maxAp() {
      return 60 + this.level * 2
    },
  },
  actions: {
    /**
     * 初始化AP <br/>
     * ap初始值根据今天经过的时间减少
     */
    initAp() {
      this.ap = this.maxAp - Math.trunc(
        this.maxAp * ((new Date().getTime() - new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`)) / 86400000)
      )
    },

    /**
     * 生成随机的八位数以内的信用点
     */
    randomCredit() {
      this.credit = Math.floor(Math.random() * 99999999)
    },

    /**
     * 启动全局的每秒倒计时 <br/>
     *
     * 1. 每10s恢复一点体力
     * 2. AP恢复的提示气泡文字显示3s后关闭
     */
    startGlobalInterval() {
      setInterval(() => {
        // 倒计时
        if (this.ap < this.maxAp) {
          this.apRecoverCountdown -= 1
        }
        if (this.apTooltipCountdown >= 0){
          this.apTooltipCountdown -= 1
        }

        // 时间到了之后的重置
        if (this.apRecoverCountdown < 0){
          this.ap += 1
          this.apRecoverCountdown = 9
        }
        if (this.apTooltipCountdown < 0){
          this.apTooltipVisible = false
        }
      }, 1000)
    }
  }
})