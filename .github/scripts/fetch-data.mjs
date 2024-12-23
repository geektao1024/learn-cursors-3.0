import path from 'node:path'
import { exit } from 'node:process'
import fs from 'fs-extra'

const data_list = [
  {
    local_path: 'src/.vitepress/data/_data/update-time.json',
    remote_url:
      'https://raw.githubusercontent.com/zotero-chinese/zotero-plugins/gh-pages/dist/shields.json',
  },
  {
    local_path: 'src/.vitepress/data/_data/dashboard.json',
    remote_url:
      'https://raw.githubusercontent.com/l0o0/translators_CN/master/data/dashboard.json',
  },
]

const tasks_data = data_list.map(async (d) => {
  const data = await (await fetch(d.remote_url)).json()
  fs.outputJSONSync(path.resolve(d.local_path), data)
  console.log(`Download ${d.local_path} success!`)
})

// Contributors images
const contributors_list = [
  // {
  //   local_path: 'src/.vitepress/data/_data/contributors_zotero-chinese_wiki.svg',
  //   remote_url:
  //       'https://github.com/zotero-chinese/.github/raw/main/.github-contributors/zotero-chinese_wiki.svg',
  // },
  // {
  //   local_path: 'src/.vitepress/data/_data/contributors_zotero-chinese_zotero-plugins.svg',
  //   remote_url:
  //       'https://github.com/zotero-chinese/.github/raw/main/.github-contributors/zotero-chinese_zotero-plugins.svg',
  // },
  // {
  //   local_path: 'src/.vitepress/data/_data/contributors_zotero-chinese_styles.svg',
  //   remote_url:
  //       'https://github.com/zotero-chinese/.github/raw/main/.github-contributors/zotero-chinese_styles.svg',
  // },
  // {
  //   local_path: 'src/.vitepress/data/_data/contributors_l0o0_translators_CN.svg',
  //   remote_url:
  //       'https://github.com/zotero-chinese/.github/raw/main/.github-contributors/l0o0_translators_CN.svg',
  // },
]

const tasks_contributors = contributors_list.map(async (d) => {
  const data = await (await fetch(d.remote_url)).text()
  fs.outputFileSync(path.resolve(d.local_path), data)
  console.log(`Download ${d.local_path} success!`)
})

const tasks = [...tasks_data, ...tasks_contributors]

Promise.all(tasks)
  .then(() => {
    console.log('Done!')
  })
  .catch((e) => {
    console.error(e)
    exit(1)
  })
