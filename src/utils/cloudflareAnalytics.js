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
              date_geq: "2024-11-01",
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

  let totalAccess = 0
  let accessDataList = []
  for (const item of res.data.data.viewer.zones[0].httpRequests1dGroups) {
    totalAccess += item.uniq.uniques
    accessDataList.push([item.dimensions.date, item.uniq.uniques, item.sum.requests])
  }

  accessDataList.reverse()
  accessDataList.pop()

  return { totalAccess, accessDataList }
}

/**
 * cloudflare api统计当天的每小时访问量
 * @return {Promise<number>} 当天访问量总和
 */
const getAccessAnalyticsByHour = async () => {
  const headers = {
    Authorization: `Bearer ${apiToken}`
  }
  const { utcStart, utcEnd } = getUTCRangeForTodayJST()
  const data = {
    query: `{
      viewer {
        zones(filter: { zoneTag: "${zoneId}" }) {
          httpRequests1hGroups(
            limit: 9999,
            filter: {
              datetime_geq: "${utcStart}",
              datetime_leq: "${utcEnd}"
            },
            orderBy: [datetime_DESC]
          ) {
            dimensions {
              datetime
            }
            uniq {
              uniques
            }
          }
        }
      }
    }`,
    variables: {}
  }
  const res = await axios.post('/client/v4/graphql', data, { headers })
  let todayAccess = 0
  for (let item of res.data.data.viewer.zones[0].httpRequests1hGroups) {
    todayAccess += item.uniq.uniques
  }

  return todayAccess
}

export { getAccessAnalyticsByDay, getAccessAnalyticsByHour }

/**
 * 获取当天日期的00：00：00和23：59：59对应的ISO日期字符串
 * @return {{utcEnd: string, utcStart: string}}
 */
const getUTCRangeForTodayJST = () => {
  const jstNow = new Date()

  // JST 当天的开始与结束
  const jstStart = new Date(jstNow.getFullYear(), jstNow.getMonth(), jstNow.getDate(), 0, 0, 0)
  const jstEnd = new Date(jstNow.getFullYear(), jstNow.getMonth(), jstNow.getDate(), 23, 59, 59)

  // 转成 UTC（减去9小时）
  const utcStart = new Date(jstStart.getTime()).toISOString()
  const utcEnd = new Date(jstEnd.getTime()).toISOString()

  return { utcStart, utcEnd }
}
