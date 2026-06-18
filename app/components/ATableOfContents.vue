<script setup lang="ts">
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

const activeId = ref<string>('')
const tocListRef = ref<HTMLElement | null>(null)

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

let observer: IntersectionObserver | null = null

function scrollActiveTocLinkIntoView(id: string) {
  const container = tocListRef.value
  if (!container || !id) return

  const activeLink = container.querySelector<HTMLElement>(`[data-toc-id="${CSS.escape(id)}"]`)
  if (!activeLink) return

  const containerRect = container.getBoundingClientRect()
  const linkRect = activeLink.getBoundingClientRect()

  // Only scroll when the active entry is actually outside the visible TOC viewport.
  if (linkRect.top < containerRect.top || linkRect.bottom > containerRect.bottom) {
    activeLink.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'auto' })
  }
}

function disconnectObserver() {
  if (observer) {
    observer.disconnect()
    observer = null
  }
}

function observeHeadings() {
  disconnectObserver()

  observer = new IntersectionObserver(
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
}

onMounted(() => {
  observeHeadings()

  watch(
    () => activeId.value,
    async (id) => {
      if (!id) return
      await nextTick()
      scrollActiveTocLinkIntoView(id)
    }
  )

  watch(
    () => flatLinks.value.map(link => link.id).join('|'),
    async () => {
      await nextTick()
      observeHeadings()
    }
  )

  onUnmounted(() => disconnectObserver())
})

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="size-full min-h-0 flex flex-col">
    <p class="text-xs font-semibold uppercase tracking-wider text-secondary-300 mb-3">
      Contents
    </p>
    <ul ref="tocListRef" class="space-y-1 border-l-2 border-secondary-150 min-h-0 overflow-y-auto pr-2">
      <template v-for="link in flatLinks" :key="link.id">
        <li>
          <a
            :href="`#${link.id}`"
            :data-toc-id="link.id"
            class="toc-link block w-full whitespace-normal wrap-break-word text-sm leading-5 duration-150"
            :style="linkPaddingStyle(link.depth)"
            :class="activeId === link.id ? 'text-primary font-medium border-l-4 border-primary -ml-px' : 'text-secondary-300 hover:text-secondary-400'"
            @click.prevent="scrollTo(link.id)"
          >
            {{ link.text }}
          </a>
        </li>
      </template>
    </ul>
  </div>
</template>
