<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const { open } = useLightbox()
const figcaptionRef = ref<HTMLElement>()

function onImageClick() {
  open(attrs.src as string, figcaptionRef.value?.innerHTML, attrs)
}
</script>

<template>
  <figure class="my-6">
    <NuxtImg
      v-bind="attrs"
      class="cursor-zoom-in m-auto"
      @click="onImageClick"
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

