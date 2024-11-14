import { createI18n } from "vue-i18n"
import ja from './ja.json'
import zh from './zh.json'

const i18n = createI18n({
  locale: 'ja',
  fallbackLocale: 'ja',
  messages: {
    ja,
    zh
  }
})

export default i18n