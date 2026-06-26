<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const { activeSrc, activeCaption, activeAttrs, activeType, close } = useLightbox()

const isHeightConstrained = ref(false)
const isReady = ref(false)

function calculateConstraints() {
  const img = document.querySelector('.lightbox-img') as HTMLImageElement
  if (!img || !img.naturalWidth || !img.naturalHeight) return

  const imageRatio = img.naturalWidth / img.naturalHeight
  const maxAvailableWidth = window.innerWidth * 0.85
  const maxAvailableHeight = window.innerHeight * 0.70
  const viewportRatio = maxAvailableWidth / maxAvailableHeight

  isHeightConstrained.value = imageRatio < viewportRatio
  isReady.value = true
}

function onImageLoad() {
  calculateConstraints()
}

function onVideoLoaded() {
  isReady.value = true
}

// Reset states whenever a new source is triggered
watch(activeSrc, () => {
  isReady.value = false
  isHeightConstrained.value = false
})

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', calculateConstraints)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', calculateConstraints)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="activeSrc"
        class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-secondary-100/80 p-8"
        @click.self="close"
      >
        <div 
          class="relative flex flex-col gap-4 items-end w-fit h-fit max-w-full max-h-full transition-opacity duration-200"
          :class="isReady ? 'opacity-100' : 'opacity-0'"
        >
          <button
            class="btn-round shrink-0"
            @click="close"
            aria-label="Close preview"
          >
            <Icon 
              name="mdi:close"
              size="22" />
          </button>
          
          <div class="flex flex-col w-fit h-fit outline-primary outline-2 bg-secondary-100 items-center overflow-hidden">
            <img
              v-if="activeType === 'image'"
              v-bind="activeAttrs"
              :src="activeSrc"
              @load="onImageLoad"
              class="lightbox-img p-4 pb-0 object-contain block"
              :class="isHeightConstrained ? 'h-[65vh] lg:h-[70vh] w-auto' : 'w-[90vw] md:w-[85vw] h-auto'"
            />
            <video
              v-else
              v-bind="activeAttrs"
              :src="activeSrc"
              controls
              @loadedmetadata="onVideoLoaded"
              class="p-4 pb-0 object-contain block max-h-[70vh] max-w-[90vw] md:max-w-[85vw]"
            />
            
            <div
              v-if="activeCaption"
              class="shrink-0 p-2 sm:p-4 text-sm w-full text-secondary-300 text-center"
            >
              <span
                class="max-w-2xl block mx-auto wrap-break-word [&>a]:link content-renderer"
                v-html="activeCaption"
              />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>