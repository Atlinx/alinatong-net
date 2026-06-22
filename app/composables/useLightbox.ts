export const useLightbox = () => {
  const activeSrc = useState<string | null>('lightbox-src', () => null)
  const activeCaption = useState<string | null>('lightbox-caption', () => null)
  const activeAttrs = useState<Record<string, unknown>>('lightbox-attrs', () => ({}))

  const open = (src: string, caption?: string, attrs?: Record<string, unknown>) => {
    activeSrc.value = src
    activeCaption.value = caption ?? null
    activeAttrs.value = attrs ?? {}
    if (import.meta.client) {
      document.body.style.overflow = 'hidden'
    }
  }

  const close = () => {
    activeSrc.value = null
    activeCaption.value = null
    activeAttrs.value = {}
    if (import.meta.client) {
      document.body.style.overflow = ''
    }
  }

  return { activeSrc, activeCaption, activeAttrs, open, close }
}
