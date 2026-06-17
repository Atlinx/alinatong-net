<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
</script>

<template>
    <NuxtLayout>
        <div class="flex flex-col items-center">
            <h1 class="font-league-gothic text-9xl text-primary">{{ error.status }}</h1>
            <p class="mb-6">{{  error.message  }}</p>
            <NuxtLink class="link" to="/">home</NuxtLink>
        </div>
    </NuxtLayout>
</template>