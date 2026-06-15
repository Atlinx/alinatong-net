
<script lang="ts" setup>
  const props = withDefaults(defineProps<{
    header?: string,
    collection: string,
    preview?: "show_stripes" | "show_empty" | "none"
  }>(), { preview: "show_stripes" })
  const { data: projects } = await useAsyncData(props.collection, () => {
    return queryCollection(props.collection as any).all();
  });
  function item_has_preview(item: any) {
    return item.preview
  }
  function file_type(file: String) {
    const VIDEO_EXT = ["mp4", "webm", "ogg"] 
    const extension = file.split(".").slice(-1)[0] || ""
    if (VIDEO_EXT.includes(extension)) {
      return "video"
    } else {
      return "image"
    }
  }
  function link_icon_name(link_name: string | undefined) {
    const ICON_MAP: Record<string, string> = {
      "github": "mdi:github",
      "linkedin": "lucide:linkedin",
      "paper": "mdi:paper",
      "website": "lucide:link"
    }
    if (link_name && ICON_MAP[link_name])
      return ICON_MAP[link_name]
    return "lucide:arrow-up-right"
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
        <template v-if="props.preview != 'none'">
          <img
            class="w-full aspect-video max-w-100 sm:max-w-none sm:w-48 md:w-64 sm:min-h-64 object-cover border-solid border border-primary bg-primary"
            :class="{[project.preview_classes]: true}"
            :src="project.preview"
            v-if="file_type(project.preview) == 'image'"
          />
          <video
            class="w-full aspect-video max-w-100 sm:max-w-none sm:w-48 md:w-64 sm:min-h-64 object-cover border-solid border border-primary bg-primary"
            :class="{[project.preview_classes]: true}"
            :src="project.preview"
            v-if="file_type(project.preview) == 'video'"
            autoplay
            muted
            draggable="false"
            playsinline
            preload="auto"
            loop
          />
          <template v-if="!item_has_preview(project)">
            <div
              class="w-full aspect-video max-w-100 sm:max-w-none sm:w-48 md:w-64 sm:min-h-64 sm:aspect-square border-solid border border-grey-300 opacity-50 bg-stripes sm:block"
              :class="{'hidden': !item_has_preview(project)}"
              v-if="props.preview == 'show_stripes'"
            ></div>
            <div
              class="w-full aspect-video max-w-100 sm:max-w-none sm:w-48 md:w-64 sm:min-h-64 sm:aspect-square sm:block"
              :class="{'hidden': !item_has_preview(project)}"
              v-if="props.preview == 'show_empty'"
            ></div>
          </template>
        </template>
        <img
          v-if="project.logo"
          class="w-12 h-12 object-contain"
          :src="project.logo"
        />
        <div class="flex flex-col grow">
          <div class="flex flex-col md:flex-row mb-2 gap-2">
            <div class="flex flex-col items-start">
              <div class="mb-1 flex flex-col">
                <div>
                  <h2
                    class="highlight-text"
                  >
                    {{ project.name }}
                  </h2>
                </div>
                <h2
                  v-if="project.authors" class="inline font-normal"
                  v-html="project.authors"
                >
                </h2>
                <h2
                  v-if="project.venue" class="inline italic text-primary font-medium"
                >
                  {{ project.venue }}
                </h2>
                <h2
                  v-if="project.subtitle" class="inline italic text-primary font-medium"
                >
                  {{ project.subtitle }}
                </h2>
              </div>
              <div class="flex flex-row gap-4" v-if="project.links">
                <a
                  target="_blank"
                  :href="link[1]"
                  v-for="link in (Object.entries(project.links) as any as [string, string])"
                  :key="link[0]"
                  class="flex flex-row flex-nowrap items-center gap-1"
                  >
                  <span>
                    {{ link[0] }}
                  </span>
                  <Icon :name="link_icon_name(link[0])" size="18"/>
                </a>
              </div>
            </div>
            <p
              class="text-primary font-medium grow text-left md:text-right md:mb-0 whitespace-nowrap"
            >
              {{ project.date }}
            </p>
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