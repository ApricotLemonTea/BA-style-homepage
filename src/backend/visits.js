import request from '@/utils/request_tmp'
import { BACKEND_API_URL } from '@/consts/consts'

const isApricotLemonTea = localStorage.getItem('isApricotLemonTea')

export async function countPageVisits(page) {
  request.post(BACKEND_API_URL.COUNT_PAGE_VISITS, null, {
    params: {
      page: page
    },
    headers: {
      isApricotLemonTea: isApricotLemonTea
    }
  })
}

export async function getPageVisitsData() {
  return await request.get(BACKEND_API_URL.GET_PAGE_VISITS_DATA)
}
