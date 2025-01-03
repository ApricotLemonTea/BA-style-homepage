/**
 * 获取mission用的tag list
 * @param { function } t 传入i18n的t方法
 */
export function useTagList(t) {
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
  ];
}
