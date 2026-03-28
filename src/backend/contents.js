import request from '@/utils/request_tmp'
import { BACKEND_API_URL } from '@/consts/consts'

export async function getAnnouncement() {
  return request.get(BACKEND_API_URL.GET_ANNOUNCEMENT)
}

export async function getPatchNote() {
  return request.get(BACKEND_API_URL.GET_PATCH_NOTE)
}
