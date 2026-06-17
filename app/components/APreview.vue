<script lang="ts" setup>
import { computed } from 'vue'
import type { PreviewValue } from '../../shared/types/preview'

type PreviewMode = "show_stripes" | "show_empty" | "none"
type FileType = "image" | "video" | "none"

const VIDEO_EXTENSIONS = ["mp4", "webm", "ogg"]
const DEFAULT_PREVIEW_ALT = "Preview image/video"

const props = withDefaults(defineProps<{
  preview?: PreviewValue
  alt?: string
  mediaClasses?: string | string[] | Record<string, boolean>
  containerClasses?: string | string[] | Record<string, boolean>
  mode?: PreviewMode
}>(), {
  mode: "show_stripes",
  containerClasses: "aspect-video max-w-sm sm:max-w-none sm:w-48 md:w-64 sm:min-h-64",
})

const emit = defineEmits<{
  error: [error: Event]
}>()

const previewSrc = computed(() => {
  if (typeof props.preview === "string") return props.preview
  return props.preview?.src
})

const previewAlt = computed(() => {
  if (props.alt) return props.alt
  if (typeof props.preview === "string") return DEFAULT_PREVIEW_ALT
  return props.preview?.alt ?? DEFAULT_PREVIEW_ALT
})

const previewMediaClasses = computed(() => {
  if (props.mediaClasses) return props.mediaClasses
  if (typeof props.preview === "string") return undefined
  return props.preview?.media_classes
})

const fileType = computed<FileType>(() => {
  if (!previewSrc.value) return "none"
  const extension = previewSrc.value.split(".").pop()?.toLowerCase() || ""
  return VIDEO_EXTENSIONS.includes(extension) ? "video" : "image"
})

const hasPreview = computed(() => fileType.value !== "none")

const handleError = (e: string | Event) => {
  emit("error", e)
}
</script>

<template>
  <div 
    v-if="mode !== 'none'" 
    :class="[
      {
        'max-sm:hidden': !hasPreview && mode === 'show_empty'
      }, 
      containerClasses
    ]"
    :aria-label="previewAlt"
  >
    <!-- Image -->
    <NuxtImg
      v-if="fileType === 'image'"
      class="w-full h-full object-cover border border-primary bg-primary text-secondary-100"
      :class="previewMediaClasses"
      :src="previewSrc"
      loading="lazy"
      @error="handleError"
    />

    <!-- Video -->
    <video
      v-else-if="fileType === 'video'"
      class="w-full h-full object-cover border border-primary bg-primary"
      :class="previewMediaClasses"
      :src="previewSrc"
      autoplay
      muted
      draggable="false"
      playsinline
      disablePictureInPicture
      loop
      @error="handleError"
    />

    <!-- Stripe pattern fallback -->
    <div
      v-else-if="mode === 'show_stripes'"
      class="w-full h-full border border-secondary-200 opacity-50 bg-stripes"
    />

    <!-- Empty state -->
    <div
      v-else-if="mode === 'show_empty'"
      class="w-full h-full"
    />
  </div>
</template>