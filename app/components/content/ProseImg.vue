<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const { open } = useLightbox()

const props = defineProps<{
  caption?: string
}>()

const caption = computed(() => props.caption || (attrs.alt as string | undefined))
</script>

<template>
  <figure class="my-6">
    <NuxtImg
      v-bind="attrs"
      class="cursor-zoom-in"
      @click="open(attrs.src as string, caption, attrs)"
    />
    <figcaption
      v-if="caption"
      class="mt-2 text-sm text-center text-secondary-300"
    >
      {{ caption }}
    </figcaption>
  </figure>
</template>

