<script setup lang="ts">
const { activeSrc, activeCaption, activeAttrs, close } = useLightbox()

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="activeSrc"
        class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-secondary-100/70 p-8"
        @click.self="close"
      >
        <button
          class="absolute top-4 right-4 btn-round"
          @click="close"
          aria-label="Close preview"
        >
          <Icon 
            name="mdi:close"
            size="22" />
        </button>
        <div class="flex flex-col max-w-full outline-primary outline-2">
          <img
            v-bind="activeAttrs"
            :src="activeSrc"
            class="max-w-full max-h-[85vh] object-contain"
          />
          <p
            v-if="activeCaption"
            class="p-4 text-sm text-secondary-300 text-center w-full bg-secondary-100"
          >
            <span class="max-w-2xl">
              {{ activeCaption }}
            </span>
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.2s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
