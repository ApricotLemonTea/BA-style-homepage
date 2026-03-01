import i18n from '@/locale'

const t = i18n.global.t

/**
 * 获取mission用的tag list
 */
export function useTagList() {
  return [
    {
      label: t('mission.missionTag.全体'),
      style: {
        'background-color': '#2f4766ff',
        color: '#fada0aff'
      }
    },

    // 1 イベント
    {
      label: t('mission.missionTag.イベント'),
      style: {
        'background-color': '#eb5792ff',
        color: '#ffffff'
      }
    },

    // 2 旅行
    {
      label: t('mission.missionTag.旅行'),
      style: {
        'background-color': '#4fbe47',
        color: '#ffffff'
      }
    },

    // 3 開発
    {
      label: t('mission.missionTag.開発'),
      style: {
        'background-color': '#389fe8ff',
        color: '#ffffff'
      }
    }
  ]
}
