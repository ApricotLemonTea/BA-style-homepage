import { createI18n } from 'vue-i18n'
import ja from './ja.json'
import zh from './zh.json'
import en from './en.json'

const i18n = createI18n({
  allowComposition: true,
  locale: localStorage.getItem('locale') ? localStorage.getItem('locale') : 'ja',
  fallbackLocale: 'ja',
  messages: {
    ja,
    zh,
    en
  }
})

export default i18n
