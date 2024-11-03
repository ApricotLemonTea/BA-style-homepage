import axios from 'axios'

const apiToken = import.meta.env.VITE_CLOUDFLARE_API_TOKEN
const zoneId = import.meta.env.VITE_CLOUDFLARE_ZONE_ID

/**
 * cloudflare api统计从2024-11-01至今的page view总和
 * @returns { Promise<number> } page view总和
 */
async function getRequestAnalytics() {
  const headers = {
    Authorization: "Bearer " + apiToken,
    'Content-Type': 'application/json',
  }
  const data = {
    query: "{" +
      "viewer {" +
        "zones(filter: {zoneTag:" + zoneId + "})" +
          "{httpRequests1dGroups (limit:32," +
          "filter:{date_geq:\"2024-11-01\",date_leq:\"" + formatDate(new Date()) + "\"},orderBy:[date_ASC])" +
          "{sum {bytes, cachedBytes, cachedRequests, encryptedBytes, encryptedRequests, pageViews, requests, threats}" +
        "dimensions {date}" +
      "}}}}",
    variables: {}
  }
  const res = await axios.post("/cloudflare-api/graphql", data, { headers })

  let result = 0
  for (const item of res.data.data.viewer.zones[0].httpRequests1dGroups){
    result += item.sum.pageViews
  }

  return result
}

/**
 * 格式化日期为 yyyy-MM-DD
 */
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default getRequestAnalytics