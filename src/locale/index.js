import { createI18n } from "vue-i18n"
import ja from './ja'

const i18n = createI18n({
  locale: 'ja',
  fallbackLocale: 'ja',
  messages: {
    ja
  }
})

export default i18n