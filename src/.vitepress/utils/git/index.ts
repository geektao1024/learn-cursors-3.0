import { basename, dirname } from 'node:path'
import { execa } from 'execa'
import fs from 'fs-extra'

// Git 时间戳缓存
const timestampCache = new Map<string, number>()

// 获取文件的 Git 提交时间戳
export function getGitTimestamp(file: string) {
  const cached = timestampCache.get(file)
  if (cached)
    return cached

  return new Promise<number>((resolve, reject) => {
    const cwd = dirname(file)
    if (!fs.existsSync(cwd))
      return resolve(0)
    const fileName = basename(file)
    const child = execa('git', ['log', '-1', '--pretty="%ai"', fileName], {
      cwd,
    })
    let output = ''
    child.stdout.on('data', d => (output += String(d)))
    child.on('close', () => {
      const timestamp = +new Date(output)
      timestampCache.set(file, timestamp)
      resolve(timestamp)
    })
    child.on('error', reject)
  })
}

// 贡献者信息接口
interface Author {
  name: string
  username: string
  avatar: string
}

// 贡献者列表
export const contributors: Author[] = [
  {
    name: 'Your Name',
    username: 'your-github-username',
    avatar: 'https://github.com/your-github-username.png',
  },
]

export const creatorNames = contributors.map(c => c.name)
export const creatorUsernames = contributors.map(c => c.username || '')

// 获取文件更新时间
const _BASE_URL = 'https://raw.githubusercontent.com/geektao1024/learn-cursors-3.0'

export async function getUpdateTime(path: string) {
  try {
    const response = await fetch(`${_BASE_URL}/main/${path}`)
    if (!response.ok)
      return null
    const data = await response.json()
    return data.commit.author.date
  }
  catch {
    return null
  }
}
