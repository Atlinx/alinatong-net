<script setup lang="ts">
const is_menu_open = ref(false)
const color_mode = useColorMode()

const THEME_ORDER = ["light", "dark", "b&w", "purple", "purple2", "arctic", "sandstone"] as const
type ThemeName = typeof THEME_ORDER[number]

const MENU_ITEMS = [
  { label: "research", to: "/#research" },
  { label: "projects", to: "/#projects" },
  { label: "experience", to: "/#experience" },
  { label: "education", to: "/#education" },
  { label: "blog", to: "/blog" },
]

function close_menu() {
  is_menu_open.value = false
}

const active_theme = computed<ThemeName>(() => {
  if (THEME_ORDER.includes(color_mode.value as ThemeName)) {
    return color_mode.value as ThemeName
  }

  return "light"
})

const next_theme = computed<ThemeName>(() => {
  const current_index = THEME_ORDER.indexOf(active_theme.value)
  const next_index = (current_index + 1) % THEME_ORDER.length
  return THEME_ORDER[next_index]!
})

function toggle_theme() {
  color_mode.preference = next_theme.value
}

</script>

<template>
  <header class="w-full p-2 px-4 xs:px-8 md:px-16 sticky top-0 left-0 right-0 z-10 bg-secondary-100 flex justify-center">
    <div class="w-full max-w-4xl">
      <div class="flex items-center justify-between gap-4">
        <NuxtLink class="link font-league-gothic text-3xl text-primary leading-none" to="/" @click="close_menu">alina tong</NuxtLink>

        <nav class="hidden md:flex justify-end gap-4 lg:gap-6 grow">
          <NuxtLink
            v-for="item in MENU_ITEMS"
            :key="item.label"
            :to="item.to"
            class="link text-primary transition-opacity"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-2 z-20">
          <button
            type="button"
            class="btn-round"
            :aria-label="`Current theme: ${active_theme}. Switch to ${next_theme} mode`"
            @click="toggle_theme"
          >
            <ClientOnly>
              <template #fallback>
                <Icon
                name="mdi:white-balance-sunny"
                size="22"
                />
              </template>
              <Icon
                name="mdi:white-balance-sunny"
                :class="{
                  'hidden': active_theme !== 'light',
                }"
                size="22"
              />
              <Icon
                name="mdi:weather-night"
                :class="{
                  'hidden': active_theme !== 'dark',
                }"
                size="22"
              />
              <Icon
                name="mdi:circle-half-full"
                :class="{
                  'hidden': active_theme !== 'b&w',
                }"
                size="22"
              />
              <Icon
                name="mdi:palette"
                :class="{
                  'hidden': ['light', 'dark', 'b&w'].includes(active_theme),
                }"
                size="22"
              />
            </ClientOnly>
          </button>

          <button
            type="button"
            class="md:hidden inline-flex h-10 w-10 items-center justify-center text-primary relative"
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
              v-for="item in MENU_ITEMS"
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