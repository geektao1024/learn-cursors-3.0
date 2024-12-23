import process from 'node:process'
import { writeFile } from 'fs-extra'

const RAW_CONTENT_URL = 'https://raw.githubusercontent.com/cursor-tutorial/website'
const CONTRIBUTORS_PATH = '_data/contributors_cursor_tutorial.json'

async function fetchContributors() {
  const response = await fetch(`${RAW_CONTENT_URL}/main/${CONTRIBUTORS_PATH}`)
  if (!response.ok)
    throw new Error('Failed to fetch contributors data')
  return response.json()
}

async function fetchGithubContributors() {
  const response = await fetch(
    'https://api.github.com/repos/cursor-tutorial/website/contributors',
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    },
  )
  if (!response.ok)
    throw new Error('Failed to fetch GitHub contributors')
  return response.json()
}

function mergeCursorContributors(local, github) {
  return {
    contributors: github.map(contributor => ({
      username: contributor.login,
      contributions: contributor.contributions,
      avatar_url: contributor.avatar_url,
    })),
  }
}

async function saveContributorsData(data) {
  const outputPath = './src/data/contributors_cursor_tutorial.json'
  await writeFile(outputPath, JSON.stringify(data, null, 2))
}

async function main() {
  try {
    const [localContributors, githubContributors] = await Promise.all([
      fetchContributors(),
      fetchGithubContributors(),
    ])

    const mergedContributors = mergeCursorContributors(localContributors, githubContributors)
    await saveContributorsData(mergedContributors)
  }
  catch (error) {
    console.error('Error fetching data:', error)
    process.exit(1)
  }
}

main()
