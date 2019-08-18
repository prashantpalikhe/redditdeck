export function getBookmarksBySubreddit(state) {
  return subreddit => state.bookmarks[subreddit] || []
}

export function isBookmarked(_, getters) {
  return ({ post, subreddit }) =>
    !!getters
      .getBookmarksBySubreddit(subreddit)
      .find(bookmark => bookmark.id === post.id)
}
