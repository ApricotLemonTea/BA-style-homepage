import axios from 'axios'
import { getFormattedDate } from '@/utils/commonFunctions'

const apiToken = import.meta.env.VITE_CLOUDFLARE_API_TOKEN
const zoneId = import.meta.env.VITE_CLOUDFLARE_ZONE_ID

/**
 * cloudflare api统计过去一年(?)的日访问量
 * @returns {Promise<{totalAccess: number, accessDataList: *[]}>} 访问量总和
 */
const getAccessAnalyticsByDay = async () => {
  const headers = {
    Authorization: `Bearer ${apiToken}`
  }
  const data = {
    query: `{
      viewer {
        zones(filter: { zoneTag: "${zoneId}" }) {
          httpRequests1dGroups(
            limit: 9999,
            filter: {
              date_geq: "${getOneYearAgo()}",
              date_leq: "${getFormattedDate(new Date())}"
            },
            orderBy: [date_DESC]
          ) {
              dimensions {
                date
              }
              uniq {
                uniques
              }
              sum {
                requests
              }
            }
        }
      }
    }`,
    variables: {}
  }
  const res = await axios.post('/client/v4/graphql', data, { headers })
  const resData = res.data.data.viewer.zones[0].httpRequests1dGroups

  const todayAccess = resData[0].uniq.uniques
  let totalAccess = 0
  let accessDataList = []

  for (const item of resData) {
    totalAccess += item.uniq.uniques
    accessDataList.push([item.dimensions.date, item.uniq.uniques, item.sum.requests])
  }

  accessDataList.reverse()
  accessDataList.pop()

  return { todayAccess, totalAccess, accessDataList }
}

export { getAccessAnalyticsByDay }

/**
 * 获取一年前的今天的下一天（api查询用起始时间）
 * @return {string}
 */
const getOneYearAgo = () => {
  const today = new Date()
  const lastYear = new Date(today)
  lastYear.setFullYear(today.getFullYear() - 1)
  lastYear.setDate(lastYear.getDate() + 1)
  return getFormattedDate(lastYear)
}
