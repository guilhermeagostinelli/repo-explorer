export const getRepos = async user => {
  const url = `https://api.github.com/users/${user}/repos?per_page=100`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.statusText);
  return await res.json();
};

export const getCommits = async (user, repo, page) => {
  const url = `https://api.github.com/repos/${user}/${repo}/commits?per_page=20&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.statusText);
  return await res.json();
};
