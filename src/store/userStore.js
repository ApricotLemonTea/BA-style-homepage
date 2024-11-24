import { defineStore } from 'pinia'
import calculateLevelAndNextExp from '@/utils/calculateLevelAndNextExp'

export const useUserStore = defineStore("userStore", {
  state: () => ({
    isFirstOpen: true,
    totalAccess: 0,

    curtainStyle: {
      backgroundImage: `url('/shitim/Event_Main_Stage_Bg.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    },

    ap: 0,
    credit: 50000000,
    pyroxene:  localStorage.getItem("pyroxene") ? Number(localStorage.getItem("pyroxene")) : 24000,

    apRecoverCountdown: 9,
    apTooltipCountdown: 0,

    apTooltipVisible: false
  }),
  getters: {
    exp(state) {
      return calculateLevelAndNextExp(state.totalAccess).exp
    },
    level(state) {
      return calculateLevelAndNextExp(state.totalAccess).level
    },
    nextExp(state) {
      return calculateLevelAndNextExp(state.totalAccess).nextExp
    },
    maxAp() {
      return 60 + this.level * 2
    }
  },
  actions: {
    /**
     * 切换背景图（蓝 / 紫）
     */
    changeBackground() {
      const images = [
        '/shitim/Event_Main_Stage_Bg_Purple.png',
        '/shitim/Event_Main_Stage_Bg.png'
      ]
      const randomImage = images[Math.floor(Math.random() * images.length)];
      this.curtainStyle.backgroundImage = `url(${randomImage})`;
    },

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
     * 生成随机的信用点<br/>
     * 有赢有输<br/>
     * 赌到最后只会越来越少
     */
    randomCredit() {
      this.credit = Math.min(
        Math.floor(Math.random() * Math.min(this.credit * 2, 99999999)),
        99999998
      )
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