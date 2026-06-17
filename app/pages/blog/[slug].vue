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
</script>

<template>
  <div v-if="article" class="max-w-2xl mx-auto">
    <div class="flex mb-8">
        <NuxtLink class="link icon-btn" to="/blog"><Icon name="mdi:arrow-left" size="18"/> back</NuxtLink>
    </div>
    <article>
      <header class="mb-8 block">
        <h2 class="font-bebas text-6xl mb-2 text-primary ">{{ article.title }}</h2>
        <p v-if="article.description" class="text-primary mb-2">{{ article.description }}</p>
        <time v-if="article.date" class="tag-outline">{{ article.date }}</time>
      </header>
      
      <div v-if="article.body">
        <ContentRenderer :value="article" class="content-renderer" prose />
      </div>
    </article>
  </div>
</template>