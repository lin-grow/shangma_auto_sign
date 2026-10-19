import axios from 'axios'
import { encryptBody } from './encrypt.js'

export const BASE_URL = 'https://apih5.shang-ma.com/app'
const TIMEOUT = 20000

export function getHeaders(token) {
  const headers = {
    accept: 'application/json, text/plain, */*',
    'accept-language': 'zh-CN',
    'content-type': 'application/json',
    origin: 'https://static.shang-ma.com',
    referer: 'https://static.shang-ma.com/',
    'user-agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  }
  if (token) {
    headers.token = token
    headers['shm-token'] = token
  }
  return headers
}

function unwrap(response, action) {
  const body = response.data
  if (!body || typeof body.code !== 'number') {
    throw Error(`${action}失败：接口返回内容异常 ${JSON.stringify(body)}`)
  }
  if (body.code !== 0) {
    throw Error(`${action}失败：code=${body.code} msg=${body.msg}`)
  }
  return body.data
}

export async function post(path, payload = {}, token) {
  const response = await axios.post(
    `${BASE_URL}${path}`,
    encryptBody(payload),
    {
      headers: getHeaders(token),
      timeout: TIMEOUT
    }
  )
  return unwrap(response, path)
}

export async function get(path, token) {
  const response = await axios.get(`${BASE_URL}${path}`, {
    headers: getHeaders(token),
    timeout: TIMEOUT
  })
  return unwrap(response, path)
}
