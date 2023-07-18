import { API_URL, API_URL_LOCAL } from '@env';
// const isLocal = true
const isLocal = false

export const mainUrl = () => {
  return isLocal ? API_URL_LOCAL : API_URL
}
