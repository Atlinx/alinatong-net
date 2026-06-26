
<script lang="ts" setup>
  const props = withDefaults(defineProps<{
    header?: string,
    collection: string,
    preview?: "show_stripes" | "show_empty" | "none"
    logo?: "always" | "auto"
  }>(), { preview: "show_stripes", logo: "auto" })
  const { data: projects } = await useAsyncData(props.collection, () => {
    return queryCollection(props.collection as any).all();
  });
  function link_icon_name(link_name: string | undefined) {
    const ICON_MAP: Record<string, string> = {
      "github": "mdi:github",
      "linkedin": "mdi:linkedin",
      "paper": "mdi:paper",
      "website": "mdi:link",
      "blog": "mdi:message-text"
    }
    if (link_name && ICON_MAP[link_name])
      return ICON_MAP[link_name]
    return "mdi:arrow-top-right"
  }
  function link_target(link_name: string | undefined) {
    const TARGET_MAP: Record<string, string> = {
      "blog": "_self"
    }
    if (link_name && TARGET_MAP[link_name])
      return TARGET_MAP[link_name]
    return "_blank"
  }
</script>

<template>
  <div>
    <h2 class="inline-block font-league-gothic text-5xl mb-4 text-primary">
      {{  (props.header ?? props.collection) }}
    </h2>
    <div class="flex flex-col gap-16 sm:gap-8">
      <div
        class="flex flex-col h-auto sm:flex-row relative gap-4 sm:gap-8"
        v-for="project in projects"
        :key="project.id"
      >
        <APreview
          :preview="project.preview"
          :mode="props.preview"
        />
        <NuxtImg
          v-if="project.logo"
          class="size-12 shrink-0 object-contain hidden sm:block"
          :src="project.logo"
          :alt="project.logo_alt ?? 'Logo.'"
          loading="lazy"
        />
        <div v-else-if="props.logo === 'always'" class="size-12"></div>
        <div class="flex flex-col grow">
          <div class="flex flex-row flex-nowrap">
            <NuxtImg
              v-if="project.logo"
              class="size-12 shrink-0 object-contain mr-4 sm:hidden"
              :src="project.logo"
              :alt="project.logo_alt ?? 'Logo.'"
              loading="lazy"
            />
            <div class="flex flex-col md:flex-row mb-2 gap-y-1 gap-x-4 w-full">
              <div class="flex flex-col items-start">
                <div class="flex flex-col">
                  <h2>
                    <span class="highlight-text">
                      {{ project.name }}
                    </span>
                  </h2>
                  <h3
                    v-if="project.authors" class="inline font-normal"
                    v-html="project.authors"
                  >
                  </h3>
                  <h3
                    v-if="project.venue" class="inline italic text-primary font-medium"
                  >
                    {{ project.venue }}
                  </h3>
                  <h3
                    v-if="project.subtitle" class="inline italic text-primary font-medium"
                  >
                    {{ project.subtitle }}
                  </h3>
                </div>
                <div class="flex flex-row gap-4 mt-1" v-if="project.links">
                  <NuxtLink
                    :target="link_target(link[0])"
                    :to="link[1]"
                    v-for="link in (Object.entries(project.links) as any as [string, string])"
                    :key="link[0]"
                    :aria-label="`Go to the ${link[0]} page for &quot;${project.name}&quot;.`"
                    class="link icon-btn"
                    >
                    <span>
                      {{ link[0] }}
                    </span>
                    <Icon :name="link_icon_name(link[0])" size="18"/>
                  </NuxtLink>
                </div>
              </div>
              <p
                class="text-primary font-medium grow text-left md:text-right md:mb-0 whitespace-nowrap"
              >
                {{ project.date }}
              </p>
            </div>
          </div>
          <template v-if="project.desc">
            <ul v-if="Array.isArray(project.desc)" class="ul">
              <li v-for="line in project.desc" v-html="line"></li>
            </ul>
            <p v-else class="ml-4" v-html="project.desc"></p>
          </template>
          <div class="flex flex-col sm:flex-row ml-4 gap-4">
            <div v-if="project.majors" class="flex flex-col">
              <p v-for="entry in project.majors" v-html="entry"></p>
            </div>
            <div v-if="project.awards" class="flex flex-col">
              <p v-for="entry in project.awards" v-html="entry"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>