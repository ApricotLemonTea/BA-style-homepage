import request from '@/utils/request'
import { BACKEND_API_URL } from '@/consts/consts'

export function apiRequest(page) {
  request.post(BACKEND_API_URL.VISITS, null, {
    params: {
      page: page
    }
  })
}
