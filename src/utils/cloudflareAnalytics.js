import axios from 'axios'

const apiToken = import.meta.env.VITE_CLOUDFLARE_API_TOKEN
const zoneId = import.meta.env.VITE_CLOUDFLARE_ZONE_ID

async function getRequestAnalytics() {
  const headers = {
    Authorization: "Bearer " + apiToken,
    'Content-Type': 'application/json',
  }
  const data = {
    query: "{" +
      "viewer {" +
        "zones(filter: {zoneTag: b7b7c1a6b979f66c447101d0127ddedd}) " +
          "{httpRequests1dGroups (limit:32," +
          "filter:{date_geq:\"2024-11-01\",date_lt:\"2024-11-06\"},orderBy:[date_ASC]) " +
          "{sum {bytes, cachedBytes, cachedRequests, encryptedBytes, encryptedRequests, pageViews, requests, threats}" +
        "dimensions {date}" +
      "}}}}",
    variables: {}
  }
  const res = await axios.post("/cloudflare-api/graphql", data, { headers })

  console.log(res)
}

export default getRequestAnalytics