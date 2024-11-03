/**
 * 计算当前等级和下一级所需经验 <br/>
 *
 * @param exp 当前经验（页面的page view总和）
 * @return {{level: number, nextExp: number}}
 */
const calculateLevelAndNextExp = (exp) => {
  if (exp >= 294784){
    return {
      level: 90,
      nextExp: 294784
    }
  }

  for (let item of levelExpList){
    if (exp < item.Total){
      return {
        level: item.Lv,
        nextExp: item.Total
      }
    }
  }
}

/**
 *  游戏实际的经验表 <br>
 *  <a href="https://bluearchive.wikiru.jp/?%E7%B5%8C%E9%A8%93%E5%80%A4%E8%A1%A8#Player"> wikiru </a>
 */
const levelExpList = [
  {"Lv": 1, "Next": 8, "Total": 0},
  {"Lv": 2, "Next": 10, "Total": 8},
  {"Lv": 3, "Next": 15, "Total": 18},
  {"Lv": 4, "Next": 21, "Total": 33},
  {"Lv": 5, "Next": 28, "Total": 54},
  {"Lv": 6, "Next": 36, "Total": 82},
  {"Lv": 7, "Next": 45, "Total": 118},
  {"Lv": 8, "Next": 55, "Total": 163},
  {"Lv": 9, "Next": 66, "Total": 218},
  {"Lv": 10, "Next": 79, "Total": 284},
  {"Lv": 11, "Next": 93, "Total": 363},
  {"Lv": 12, "Next": 108, "Total": 456},
  {"Lv": 13, "Next": 124, "Total": 564},
  {"Lv": 14, "Next": 141, "Total": 688},
  {"Lv": 15, "Next": 159, "Total": 829},
  {"Lv": 16, "Next": 178, "Total": 988},
  {"Lv": 17, "Next": 198, "Total": 1166},
  {"Lv": 18, "Next": 219, "Total": 1364},
  {"Lv": 19, "Next": 241, "Total": 1583},
  {"Lv": 20, "Next": 265, "Total": 1824},
  {"Lv": 21, "Next": 288, "Total": 2089},
  {"Lv": 22, "Next": 312, "Total": 2377},
  {"Lv": 23, "Next": 337, "Total": 2689},
  {"Lv": 24, "Next": 363, "Total": 3026},
  {"Lv": 25, "Next": 390, "Total": 3389},
  {"Lv": 26, "Next": 418, "Total": 3779},
  {"Lv": 27, "Next": 447, "Total": 4197},
  {"Lv": 28, "Next": 477, "Total": 4644},
  {"Lv": 29, "Next": 508, "Total": 5121},
  {"Lv": 30, "Next": 581, "Total": 5629},
  {"Lv": 31, "Next": 658, "Total": 6210},
  {"Lv": 32, "Next": 734, "Total": 6868},
  {"Lv": 33, "Next": 814, "Total": 7602},
  {"Lv": 34, "Next": 897, "Total": 8416},
  {"Lv": 35, "Next": 982, "Total": 9313},
  {"Lv": 36, "Next": 1069, "Total": 10295},
  {"Lv": 37, "Next": 1159, "Total": 11364},
  {"Lv": 38, "Next": 1251, "Total": 12523},
  {"Lv": 39, "Next": 1346, "Total": 13774},
  {"Lv": 40, "Next": 1443, "Total": 15120},
  {"Lv": 41, "Next": 1543, "Total": 16563},
  {"Lv": 42, "Next": 1645, "Total": 18106},
  {"Lv": 43, "Next": 1750, "Total": 19751},
  {"Lv": 44, "Next": 1857, "Total": 21501},
  {"Lv": 45, "Next": 1966, "Total": 23358},
  {"Lv": 46, "Next": 2078, "Total": 25324},
  {"Lv": 47, "Next": 2192, "Total": 27402},
  {"Lv": 48, "Next": 2309, "Total": 29594},
  {"Lv": 49, "Next": 2428, "Total": 31903},
  {"Lv": 50, "Next": 2550, "Total": 34331},
  {"Lv": 51, "Next": 2674, "Total": 36881},
  {"Lv": 52, "Next": 2800, "Total": 39555},
  {"Lv": 53, "Next": 2929, "Total": 42355},
  {"Lv": 54, "Next": 3060, "Total": 45284},
  {"Lv": 55, "Next": 3194, "Total": 48344},
  {"Lv": 56, "Next": 3330, "Total": 51538},
  {"Lv": 57, "Next": 3469, "Total": 54868},
  {"Lv": 58, "Next": 3610, "Total": 58337},
  {"Lv": 59, "Next": 3754, "Total": 61947},
  {"Lv": 60, "Next": 3900, "Total": 65701},
  {"Lv": 61, "Next": 4048, "Total": 69601},
  {"Lv": 62, "Next": 4199, "Total": 73649},
  {"Lv": 63, "Next": 4352, "Total": 77848},
  {"Lv": 64, "Next": 4508, "Total": 82200},
  {"Lv": 65, "Next": 4666, "Total": 86708},
  {"Lv": 66, "Next": 4831, "Total": 91374},
  {"Lv": 67, "Next": 5007, "Total": 96205},
  {"Lv": 68, "Next": 5186, "Total": 101212},
  {"Lv": 69, "Next": 5369, "Total": 106398},
  {"Lv": 70, "Next": 5556, "Total": 111767},
  {"Lv": 71, "Next": 5747, "Total": 117323},
  {"Lv": 72, "Next": 5942, "Total": 123070},
  {"Lv": 73, "Next": 6141, "Total": 129012},
  {"Lv": 74, "Next": 6344, "Total": 135153},
  {"Lv": 75, "Next": 6552, "Total": 141497},
  {"Lv": 76, "Next": 6768, "Total": 148049},
  {"Lv": 77, "Next": 6989, "Total": 154817},
  {"Lv": 78, "Next": 7216, "Total": 161806},
  {"Lv": 79, "Next": 7449, "Total": 169022},
  {"Lv": 80, "Next": 7682, "Total": 176471},
  {"Lv": 81, "Next": 7915, "Total": 184153},
  {"Lv": 82, "Next": 8148, "Total": 192068},
  {"Lv": 83, "Next": 8381, "Total": 200216},
  {"Lv": 84, "Next": 8883, "Total": 208597},
  {"Lv": 85, "Next": 9460, "Total": 217480},
  {"Lv": 86, "Next": 10614, "Total": 226940},
  {"Lv": 87, "Next": 12922, "Total": 237554},
  {"Lv": 88, "Next": 17538, "Total": 250476},
  {"Lv": 89, "Next": 26770, "Total": 268014},
  {"Lv": 90, "Next": null, "Total": 294784},
  {"Lv": 91, "Next": null, "Total": null},
  {"Lv": 92, "Next": null, "Total": null},
  {"Lv": 93, "Next": null, "Total": null},
  {"Lv": 94, "Next": null, "Total": null},
  {"Lv": 95, "Next": null, "Total": null},
  {"Lv": 96, "Next": null, "Total": null},
  {"Lv": 97, "Next": null, "Total": null},
  {"Lv": 98, "Next": null, "Total": null},
  {"Lv": 99, "Next": null, "Total": null},
  {"Lv": 100, "Next": null, "Total": null}
]

export default calculateLevelAndNextExp