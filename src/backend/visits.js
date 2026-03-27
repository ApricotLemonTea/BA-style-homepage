import request from '@/utils/request_tmp'
import { BACKEND_API_URL } from '@/consts/consts'

export async function countPageVisits(page) {
  request.post(BACKEND_API_URL.COUNT_PAGE_VISITS, null, {
    params: {
      page: page
    }
  })
}

export async function getPageVisitsData() {
  return await request.get(BACKEND_API_URL.GET_PAGE_VISITS_DATA)
}
