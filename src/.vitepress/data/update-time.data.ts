/* eslint-disable no-console */

import type { Plugin } from '@/types/plugin'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

const local_path = path.resolve('src/.vitepress/data/_data/update-time.json')
const remote_path
  = 'https://raw.githubusercontent.com/zotero-chinese/zotero-plugins/gh-pages/dist/shields.json'
const _BASE_URL = 'https://raw.githubusercontent.com/geektao1024/learn-cursors-3.0'

export default {
  async load() {
    if (existsSync(local_path)) {
      return JSON.parse(readFileSync(local_path).toString())
    }
    else {
      console.log('Local shields.json not found, will fetch from remote')
      return (await fetch(remote_path)).json()
    }
  },
}

export async function getPlugins(): Promise<Plugin[]> {
  try {
    const response = await fetch(`${_BASE_URL}/main/plugins.json`)
    if (!response.ok)
      return []
    return await response.json()
  }
  catch {
    return []
  }
}
