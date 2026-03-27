import request from '@/utils/request_tmp'
import { BACKEND_API_URL } from '@/consts/consts'

export function countPageVisits(page) {
  request.post(BACKEND_API_URL.COUNT_PAGE_VISITS, null, {
    params: {
      page: page
    }
  })
}
