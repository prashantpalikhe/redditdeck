export function setSubreddits(state, subreddits) {
  state.subreddits = subreddits
}

export function deleteSubreddit(state, subreddit) {
  const index = state.subreddits.findIndex(i => i === subreddit)

  if (index > -1) {
    state.subreddits.splice(index, 1)
  }
}
