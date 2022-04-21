export interface GithubResponse {
  incomplete_results: boolean
  total_count: number
  items: Array<GithubProfile>
}

export interface GithubProfile {
  avatar_url: string
  login: string,
  html_url: string
}
