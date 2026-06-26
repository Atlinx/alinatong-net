export type LightboxType = 'image' | 'video'

export const useLightbox = () => {
  const activeSrc = useState<string | null>('lightbox-src', () => null)
  const activeCaption = useState<string | null>('lightbox-caption', () => null)
  const activeAttrs = useState<Record<string, unknown>>('lightbox-attrs', () => ({}))
  const activeType = useState<LightboxType>('lightbox-type', () => 'image')

  const open = (src: string, caption?: string, attrs?: Record<string, unknown>, type: LightboxType = 'image') => {
    activeSrc.value = src
    activeCaption.value = caption ?? null
    activeAttrs.value = attrs ?? {}
    activeType.value = type
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

  return { activeSrc, activeCaption, activeAttrs, activeType, open, close }
}
