interface Author {
  name: string
  username: string
  avatar: string
}

export const contributors: Author[] = [
  {
    name: 'Your Name',
    username: 'your-github-username',
    avatar: 'https://github.com/your-github-username.png',
  },
]

export const creatorNames = contributors.map(c => c.name)
export const creatorUsernames = contributors.map(c => c.username || '')
