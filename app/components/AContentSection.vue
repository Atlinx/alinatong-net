
<script lang="ts" setup>
  const props = withDefaults(defineProps<{
    header?: string,
    collection: string,
    preview?: "show_stripes" | "show_empty" | "none"
  }>(), { preview: "show_stripes" })
  const { data: projects } = await useAsyncData(props.collection, () => {
    return queryCollection(props.collection as any).all();
  });
  function link_icon_name(link_name: string | undefined) {
    const ICON_MAP: Record<string, string> = {
      "github": "mdi:github",
      "linkedin": "mdi:linkedin",
      "paper": "mdi:paper",
      "website": "mdi:link"
    }
    if (link_name && ICON_MAP[link_name])
      return ICON_MAP[link_name]
    return "mdi:arrow-top-right"
  }
</script>

<template>
  <div>
    <h2 class="inline-block font-bebas text-5xl mb-4 text-primary">
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
        <img
          v-if="project.logo"
          class="w-12 h-12 object-contain hidden sm:block"
          :src="project.logo"
        />
        <div class="flex flex-col grow">
          <div class="flex flex-row flex-nowrap">
            <img
              v-if="project.logo"
              class="w-12 h-12 object-contain mr-4 sm:hidden"
              :src="project.logo"
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
                    target="_blank"
                    :to="link[1]"
                    v-for="link in (Object.entries(project.links) as any as [string, string])"
                    :key="link[0]"
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
            <ul v-if="Array.isArray(project.desc)">
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