type BlogPostLike = {
  path?: string | null
  title?: string | null
}

export function getPostSlug(post: BlogPostLike): string {
  const pathSlug = post.path?.split('/').filter(Boolean).pop()

  if (pathSlug) {
    return pathSlug
  }

  return (post.title ?? '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}