/* eslint-disable no-console */

import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

const local_path = path.resolve('src/.vitepress/data/_data/update-time.json')
const remote_path
  = 'https://raw.githubusercontent.com/zotero-chinese/zotero-plugins/gh-pages/dist/shields.json'

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
