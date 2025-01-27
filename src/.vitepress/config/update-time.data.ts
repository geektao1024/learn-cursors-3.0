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
