import { createI18n } from "vue-i18n"

const i18n = createI18n({
  locale: 'ja',
  fallbackLocale: 'ja',
  messages: {
    ja: () => import("./ja.js")
  }
})

export default i18n