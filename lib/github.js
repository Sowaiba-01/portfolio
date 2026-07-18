// shared, cached GitHub profile fetch (one request for the whole page)
let cached = null;

export function fetchGithubRepos() {
  if (!cached) {
    cached = fetch('https://api.github.com/users/Sowaiba-01')
      .then((r) => r.json())
      .then((d) => (d && d.public_repos !== undefined ? d.public_repos : null))
      .catch(() => null);
  }
  return cached;
}
