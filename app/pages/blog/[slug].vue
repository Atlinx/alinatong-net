<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { getPostSlug } from '~/composables/getPostSlug'

const route = useRoute()
const slug = route.params.slug as string

// Query all blog articles and find by slug
const { data: articles } = await useAsyncData('blog-articles', () => {
  return queryCollection('blog').all()
})

// Find article by slug using shared slug helper.
const article = computed(() => {
  if (!articles.value) return null

  return articles.value.find(a => getPostSlug(a) === slug)
})

// Check if article was found after data loads
watchEffect(() => {
  if (articles.value && !article.value) {
    throw createError({ statusCode: 404, statusMessage: 'Article not found' })
  }
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div v-if="article" class="max-w-5xl mx-auto">
    <div class="flex gap-12">
      <article class="min-w-0 flex-1">
        <div class="flex mb-4">
          <NuxtLink class="link icon-btn" to="/blog">
            <Icon name="mdi:arrow-left" size="18" /> back
          </NuxtLink>
        </div>

        <header class="mb-16 block">
          <h2 class="font-league-gothic text-6xl mb-2 text-primary ">{{ article.title }}</h2>
          <p v-if="article.description" class="text-primary mb-2">{{ article.description }}</p>
          <time v-if="article.date" class="tag-outline">{{ article.date }}</time>
        </header>

        <article v-if="article.body" class="not-prose">
          <ContentRenderer :value="article" class="content-renderer" prose />
        </article>
      </article>
      <nav class="top-20 self-start w-56 h-[calc(100dvh-7em)] shrink-0 sticky hidden md:flex md:flex-col">
        <div class="flex mb-4">
          <button class="link icon-btn" @click="scrollToTop">
            <Icon name="mdi:arrow-top" size="18" /> top
          </button>
        </div>
        <ATableOfContents v-if="article.body?.toc?.links?.length" :toc="article.body.toc" class="grow" />
      </nav>
    </div>
  </div>
</template>