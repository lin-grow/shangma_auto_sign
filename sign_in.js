import { get, post } from './lib/http_util.js'
import login from './login.js'

async function signIn() {
  const { token, appUserId } = await login()
  console.log(`登录成功，appUserId：${appUserId}`)

  const before = await get(`/web/points/info/${appUserId}`, token)
  console.log(`当前积分：${before.totalPoints}`)

  if (before.checkinStatus === 1) {
    console.log('今日已签到，无需重复签到')
    return
  }

  await post(`/web/user/checkin/${appUserId}`, {}, token)

  const after = await get(`/web/points/info/${appUserId}`, token)
  console.log(`签到成功，当前积分：${after.totalPoints}`)
}

export default signIn
