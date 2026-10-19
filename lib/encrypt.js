import crypto from 'node:crypto'
import CryptoJS from 'crypto-js'

// 上马官网前端硬编码的 RSA 公钥，用于加密 AES 的随机 key
const PUBLIC_KEY =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCOEpPvD+QMOo6em92agSV1PxEgZrJd1fIBbrx86foJjYbYjbqncIpDOnNisUVlNvvx5hvTRCn5pmFQ56JyFuNU4iwk8Cb6zGv4E28ClllFiB7DdAaslGCK2+yiSkq+NpQt35KFYItHzCqDoBJuJuCDc+yNBMWO1qlhN4NnK3UH6wIDAQAB'

const KEY_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const KEY_LENGTH = 32

function toPem(publicKey) {
  const lines = publicKey.match(/.{1,64}/g).join('\n')
  return `-----BEGIN PUBLIC KEY-----\n${lines}\n-----END PUBLIC KEY-----`
}

const pem = toPem(PUBLIC_KEY)

function randomKey() {
  let key = ''
  for (let i = 0; i < KEY_LENGTH; i++) {
    key += KEY_CHARS.charAt(Math.floor(Math.random() * KEY_CHARS.length))
  }
  return key
}

/**
 * 按官网前端的方式加密请求体：
 * 1. 生成 32 位随机 key
 * 2. encryptedData = AES-256-ECB-PKCS7(JSON, key) 的 base64
 * 3. encryptedKey = RSA-PKCS1(base64(key)) 的 base64
 */
export function encryptBody(payload = {}) {
  const key = randomKey()
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(payload),
    CryptoJS.enc.Utf8.parse(key),
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }
  ).toString()

  // 注意：服务端解密后拿到的是 key 的 base64 字符串，不是原始 key
  const keyBase64 = Buffer.from(key, 'utf8').toString('base64')
  const encryptedKey = crypto
    .publicEncrypt(
      { key: pem, padding: crypto.constants.RSA_PKCS1_PADDING },
      Buffer.from(keyBase64, 'utf8')
    )
    .toString('base64')

  return { encryptedData, encryptedKey }
}
