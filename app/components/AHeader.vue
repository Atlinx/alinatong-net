<script setup lang="ts">
const is_menu_open = ref(false)

const menu_items = [
  { label: "publications", to: "/#publications" },
  { label: "projects", to: "/#projects" },
  { label: "experience", to: "/#experience" },
  { label: "education", to: "/#education" },
  { label: "blog", to: "/blog" },
]

function close_menu() {
  is_menu_open.value = false
}

</script>

<template>
  <header class="w-full p-2 px-8 md:px-16 sticky top-0 left-0 right-0 z-10 bg-secondary-100 flex justify-center">
    <div class="w-full max-w-4xl">
      <div class="flex items-center justify-between gap-4">
        <NuxtLink class="link font-league-gothic text-3xl text-primary leading-none" to="/" @click="close_menu">alina tong</NuxtLink>

        <nav class="hidden md:flex items-center gap-6">
          <NuxtLink
            v-for="item in menu_items"
            :key="item.label"
            :to="item.to"
            class="link text-primary transition-opacity"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <button
          type="button"
          class="md:hidden inline-flex h-10 w-10 items-center justify-center text-primary relative z-20"
          :aria-expanded="is_menu_open"
          aria-label="Toggle menu"
          @click="is_menu_open = !is_menu_open"
        >
          <span class="sr-only">Menu</span>
          <Icon
            name="mdi:close"
            :class="{
              'hidden': !is_menu_open,
            }"
            size="24"
          />
          <Icon
            name="mdi:menu"
            :class="{
              'hidden': is_menu_open,
            }"
            size="24"
          />
        </button>
      </div>

      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <button
          v-if="is_menu_open"
          type="button"
          class="md:hidden fixed inset-0 -bottom-20 bg-black/40"
          aria-label="Close menu"
          @click="close_menu"
        />
      </Transition>

      <Transition
        enter-active-class="transition-transform duration-200 ease-out"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-200 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <nav
          v-if="is_menu_open"
          class="md:hidden fixed right-0 top-0 -bottom-20 w-72 max-w-[85vw] bg-secondary-100 px-6 py-20"
        >
          <div class="flex flex-col gap-2 text-5xl font-league-gothic">
            <NuxtLink
              v-for="item in menu_items"
              :key="item.label"
              :to="item.to"
              class="link block py-2 text-primary"
              @click="close_menu"
            >
              {{ item.label }}
            </NuxtLink>
          </div>
        </nav>
      </Transition>
    </div>
  </header>
</template>