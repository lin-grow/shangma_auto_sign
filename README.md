## 上马自动签到 [![Run Auto Sign](https://github.com/zhaohongxuan/shangma_auto_sign/actions/workflows/auto-sign.yaml/badge.svg)](https://github.com/zhaohongxuan/shangma_auto_sign/actions/workflows/auto-sign.yaml)

### 基于 Node.js + GitHub Action 实现上海马拉松官网每日签到

> 已适配上马官网 2025 年改版后的新接口（`apih5.shang-ma.com`），无需手动抓包。

### Use 使用

1. Fork 本项目（顺手点 Star 以示鼓励～🥳）
2. 在 Repo 的 **Settings → Secrets and variables → Actions** 页面，添加两个 Repository secret：
   - `SM_USERNAME`：上马官网的登录手机号 / 邮箱
   - `SM_PASSWORD`：上马官网的登录密码
3. 在 **Actions** 页面选择 `Run Auto Sign`，点击 `Run workflow` 手动测试运行
4. 控制台应该能看到 `签到成功，当前积分：xxx` 或 `今日已签到，无需重复签到`

### 本地运行

1. `npm install`
2. 复制 `.env.example` 为 `.env`，填写 `SM_USERNAME`、`SM_PASSWORD`
3. `npm run sign`

### 关于Job执行时间
签到Job执行时间是**UTC时间0点**，也就是**北京时间8点**执行，**不过由于GitHub的负载比较重**，真正签到时间可能延后一段时间，一般是几十分钟，这个延迟时间取决于GitHub Action的负载。

### 申明
- 本项目仅做学习交流, 禁止用于各种非法途径
- Auto Sign-in run successful on Thu Jul  3 00:56:54 UTC 2025
- Auto Sign-in run successful on Fri Jul  4 00:56:30 UTC 2025
- Auto Sign-in run successful on Sat Jul  5 00:54:22 UTC 2025
- Auto Sign-in run successful on Sun Jul  6 01:02:16 UTC 2025
- Auto Sign-in run successful on Mon Jul  7 01:01:09 UTC 2025
- Auto Sign-in run successful on Mon Oct 19 02:28:05 UTC 2026
- Auto Sign-in run successful on Mon Oct 19 03:18:54 UTC 2026
