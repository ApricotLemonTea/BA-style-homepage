import i18n from '@/locale'
const t = i18n.global.t

/**
 * 获取mission用的tag list
 */
export function useTagList() {
  return [
    {
      label: t("mission.missionTag.全体"),
      style: {
        'background-color': '#2f4766ff',
        'color': '#fada0aff'
      }
    },
    {
      label: t("mission.missionTag.イベント"),
      style: {
        "background-color": "#eb5792ff",
        "color": "#ffffff"
      }
    },
    {
      label: t("mission.missionTag.開発"),
      style: {
        "background-color": "#389fe8ff",
        "color": "#ffffff"
      }
    },
    // {
    //   label: t("mission.missionTag.実績"),
    //   style: {
    //     "background-color": "#e08700ff",
    //     "color": "#ffffff"
    //   }
    // }
  ]
}
