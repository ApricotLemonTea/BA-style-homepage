/**
 * 计算当前等级和下一级所需经验 <br/>
 * ・每升一级的所需经验是前一级的1.123324倍 <br/>
 * ・满级99级，总经验99,999 <br/>
 * ・(1.123324 ^ 99 ≈ 99,999)
 *
 * @param exp 当前经验（页面的page view总和）
 * @return {{level: number, nextExp: number}}
 */
const calculateLevelAndNextExp = (exp) => {
  const base = 1.123324

  const level = Math.ceil(Math.log(exp) / Math.log(base))
  const maxLevel = 99

  const nextExp = Math.floor(Math.pow(base, level + 1))
  const maxNextExp = 99999

  return {
    level: Math.min(level, maxLevel),
    nextExp: Math.min(nextExp, maxNextExp)
  }
}

export default calculateLevelAndNextExp