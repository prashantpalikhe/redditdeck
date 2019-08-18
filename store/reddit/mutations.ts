import Vue from 'vue'

export function setSubreddits(state, subreddits) {
  state.subreddits = subreddits
}

export function deleteSubreddit(state, subreddit) {
  const index = state.subreddits.findIndex(i => i === subreddit)

  if (index > -1) {
    state.subreddits.splice(index, 1)
  }
}

export function addBookmark(state, { post, subreddit }) {
  const subredditBookmarks = state.bookmarks[subreddit] || []

  subredditBookmarks.push(post)

  Vue.set(state.bookmarks, subreddit, subredditBookmarks)
}

export function removeBookmark(state, { post, subreddit }) {
  const subredditBookmarks = state.bookmarks[subreddit]
  const bookmarkIndex = subredditBookmarks.findIndex(
    bookmark => bookmark.id === post.id
  )

  subredditBookmarks.splice(bookmarkIndex, 1)
}
