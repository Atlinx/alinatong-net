<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})

interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

interface Toc {
  title?: string
  links: TocLink[]
}

const props = defineProps<{
  toc: Toc
}>()

const attrs = useAttrs()

const activeId = ref<string>('')

function linkPaddingStyle(depth: number) {
  const base = 12
  const step = 12
  return { paddingLeft: `${base + Math.max(depth - 2, 0) * step}px` }
}

const flatLinks = computed(() => {
  const result: TocLink[] = []
  const flatten = (links: TocLink[]) => {
    for (const link of links) {
      result.push(link)
      if (link.children?.length) flatten(link.children)
    }
  }
  flatten(props.toc.links)
  return result
})

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      }
    },
    {
      rootMargin: '0px 0px -80% 0px',
      threshold: 0
    }
  )

  for (const link of flatLinks.value) {
    const el = document.getElementById(link.id)
    if (el) observer.observe(el)
  }

  onUnmounted(() => observer.disconnect())
})

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <nav v-bind="attrs" class="top-24 self-start w-56 shrink-0">
    <p class="text-xs font-semibold uppercase tracking-wider text-secondary-300 mb-3">
      Contents
    </p>
    <ul class="space-y-1 border-l border-secondary-150">
      <template v-for="link in flatLinks" :key="link.id">
        <li>
          <a
            :href="`#${link.id}`"
            class="toc-link block w-full whitespace-normal wrap-break-word text-sm leading-5 transition-colors duration-150"
            :style="linkPaddingStyle(link.depth)"
            :class="activeId === link.id ? 'text-primary font-medium border-l-2 border-primary -ml-px' : 'text-secondary-300 hover:text-secondary-400'"
            @click.prevent="scrollTo(link.id)"
          >
            {{ link.text }}
          </a>
        </li>
      </template>
    </ul>
  </nav>
</template>
