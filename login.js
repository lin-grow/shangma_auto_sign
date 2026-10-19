import { get, post } from './lib/http_util.js'

/**
 * 使用账号密码登录官网新版接口，返回 token 与 appUserId
 */
export async function login() {
  const accountName = process.env.SM_USERNAME
  const password = process.env.SM_PASSWORD

  if (!accountName || !password) {
    throw Error('缺少登录信息，请配置环境变量 SM_USERNAME / SM_PASSWORD')
  }

  const data = await post('/web/user/login', {
    accountName,
    password,
    loginDevice: 'OFFICIAL_WEBSITE'
  })

  const token = data && data.token
  if (!token) {
    throw Error('登录失败：未获取到 token')
  }

  let appUserId = data.appUserId
  if (!appUserId) {
    const info = await get('/web/user/info/0', token)
    appUserId = info && info.appUserId
  }
  if (!appUserId) {
    throw Error('登录失败：未获取到 appUserId')
  }

  return { token, appUserId }
}

export default login
