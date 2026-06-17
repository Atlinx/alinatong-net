<script setup lang="ts">
import { getPostSlug } from '~/composables/getPostSlug'

const { data: posts } = await useAsyncData("blog", () => {
return queryCollection("blog").all();
});
</script>
<template>
    <div class="flex flex-col gap-16 w-full">
        <div class="flex flex-col gap-8">
            <h1 class="inline-block font-league-gothic text-6xl sm:text-8xl text-primary">
                blog
            </h1>
            <p>
                Posts covering my research projects, course-work, and other endeavors in more detail.
            </p>
        </div>
        <div class="flex flex-col gap-16 sm:gap-8">
            <NuxtLink v-for="post in posts" :key="post.id" class="group flex flex-col sm:flex-row gap-4" :to="`/blog/${getPostSlug(post)}`">
                <APreview :preview="post.preview" container-classes="aspect-video max-w-sm sm:max-w-none sm:w-48 sm:min-h-48"></APreview>
                <div class="flex flex-col gap-2 items-start">
                    <h2>
                        <span class="highlight-text">{{ post.title }}</span>
                    </h2>
                    <time class="tag-outline">{{ post.date }}</time>
                    <p>{{ post.description }}</p>
                </div>
                <div class="flex">
                    <Icon name="mdi:arrow-top-right" class="self-center size-8 text-primary group-hover:bg-primary group-hover:text-secondary-100 transition-transform duration-200 ease-out group-hover:scale-110" />
                </div>
            </NuxtLink>
        </div>
    </div>
</template>