<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const { open } = useLightbox()
const figcaptionRef = ref<HTMLElement>()

// Only openable in lightbox when controls are not enabled
const isLightboxable = computed(() => !attrs.controls)

function onVideoClick() {
  if (!isLightboxable.value) return
  const { src, class: _, style: __, ...rest } = attrs as Record<string, unknown>
  open(attrs.src as string, figcaptionRef.value?.innerHTML, rest, 'video')
}
</script>

<template>
  <figure class="my-6">
    <video
      v-bind="attrs"
      class="m-auto"
      :class="{ 'cursor-pointer': isLightboxable }"
      @click="onVideoClick"
    />
    <figcaption
      ref="figcaptionRef"
      v-if="$slots.default"
      class="mt-2 text-sm text-center text-secondary-300"
    >
      <slot />
    </figcaption>
  </figure>
</template>
