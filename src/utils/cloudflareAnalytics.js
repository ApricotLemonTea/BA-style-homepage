import axios from 'axios'
import { getFormattedDate } from '@/utils/commonFunctions'

const apiToken = import.meta.env.VITE_CLOUDFLARE_API_TOKEN
const zoneId = import.meta.env.VITE_CLOUDFLARE_ZONE_ID

/**
 * cloudflare api统计过去一年(?)的访问量总和
 * @returns {Promise<{totalAccess: number, accessDataList: *[]}>} 访问量总和
 */
const getAccessAnalytics = async () => {
  const headers = {
    Authorization: `Bearer ${apiToken}`
  }
  const data = {
    query: `{
      viewer {
        zones(filter: { zoneTag: "${zoneId}" }) {
          httpRequests1dGroups(
            limit: 9999,
            filter: { date_geq: "2024-11-01", date_leq: "${getFormattedDate(new Date())}" },
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
  const res = await axios.post("/client/v4/graphql", data, { headers })

  let totalAccess = 0
  let accessDataList = []
  for (const item of res.data.data.viewer.zones[0].httpRequests1dGroups){
    totalAccess += item.sum.requests
    accessDataList.push([item.dimensions.date, item.uniq.uniques, item.sum.requests])
  }

  accessDataList.reverse()
  accessDataList.pop()

  return { totalAccess, accessDataList }
}

export default getAccessAnalytics
