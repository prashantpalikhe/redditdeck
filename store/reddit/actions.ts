import find from 'lodash/find'

export function setSubreddits({ commit }, payload) {
  commit('setSubreddits', payload)
}

export function deleteSubreddit({ commit }, payload) {
  commit('deleteSubreddit', payload)
}

export function addBookmark(
  { commit, state: { bookmarks } },
  { post, subreddit }
) {
  const subredditBookmarks = bookmarks[subreddit]

  const existingPost = find(subredditBookmarks, { id: post.id })

  if (!existingPost) {
    commit('addBookmark', { post, subreddit })
  }
}

export function removeBookmark(
  { commit, state: { bookmarks } },
  { post, subreddit }
) {
  const subredditBookmarks = bookmarks[subreddit]

  const bookmark = find(subredditBookmarks, { id: post.id })

  if (bookmark) {
    commit('removeBookmark', { post, subreddit })
  }
}
