import { createI18n } from 'vue-i18n'
import ja from './ja.json'
import zh from './zh.json'
import en from './en.json'

const getBrowserLocale = () => {
  if (typeof navigator === 'undefined') return 'ja'

  const language = navigator.language || navigator.userLanguage || 'ja'
  const lang = language.toLowerCase()

  if (lang.startsWith('zh')) return 'zh'
  if (lang.startsWith('en')) return 'en'
  if (lang.startsWith('ja')) return 'ja'

  return 'ja'
}

const savedLocale = localStorage.getItem('locale')
const defaultLocale = savedLocale || getBrowserLocale()

const i18n = createI18n({
  allowComposition: true,
  locale: defaultLocale,
  fallbackLocale: 'ja',
  messages: {
    ja,
    zh,
    en
  }
})

export default i18n
