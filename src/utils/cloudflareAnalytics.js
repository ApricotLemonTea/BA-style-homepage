import axios from 'axios'
import { getFormattedDate } from '@/utils/commonFunctions'

const apiToken = import.meta.env.VITE_CLOUDFLARE_API_TOKEN
const zoneId = import.meta.env.VITE_CLOUDFLARE_ZONE_ID

/**
 * cloudflare api统计从2024-11-01至今的访问量总和
 * @returns { Promise<number> } 访问量总和
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
            sum {
              bytes
              cachedBytes
              cachedRequests
              encryptedBytes
              encryptedRequests
              pageViews
              requests
              threats
            }
            dimensions {
              date
            }
          }
        }
      }
    }`,
    variables: {}
  }
  const res = await axios.post("/client/v4/graphql", data, { headers })

  let result = 0
  for (const item of res.data.data.viewer.zones[0].httpRequests1dGroups){
    result += item.sum.requests
  }

  return result
}

export default getAccessAnalytics
