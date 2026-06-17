import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "@nuxt/content",
    "@nuxt/icon",
  ],
  app: {
    head: {
      title: "Alina Tong",
      meta: [
        { name: "description", content: "I'm an incoming UPenn MS Robotics student and former research assistant for Prof. Bekris' Pracsys Lab. I'm passionate about robot learning, including VLAs, RL, and imitation learning." },
        { property: "og:title", content: "Alina Tong's Website" },
        {
          property: "og:description",
          content: "I'm an incoming UPenn MS Robotics student and former research assistant for Prof. Bekris' Pracsys Lab. I'm passionate about robot learning, including VLAs, RL, and imitation learning.",
        },
        {
          property: "og:image",
          content: "https://alinatong.net/images/preview.webp",
        },
        { property: "og:url", content: "https://alinatong.net" },
        { property: "og:type", content: "website" },
        {
          name: "twitter:card",
          content: "https://alinatong.net/images/preview.webp",
        },
        { name: "twitter:title", content: "Alina Tong's Website" },
        {
          name: "twitter:description",
          content: "Personal website of Alina Tong.",
        },
        {
          name: "twitter:image",
          content: "https://alinatong.net/images/preview.webp",
        },
      ],
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['atlinx.net']
    }
  },
  icon: {
    mode: 'svg',
    clientBundle: {
      icons: [
        "mdi:arrow-left",
        "mdi:arrow-top-right"
      ]
    }
  },
  fonts: {
    defaults: {
      preload: true,
    },
  },
  router: {
    options: {
      scrollBehaviorType: "smooth"
    }
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: "monokai",
          langs: [
            "c",
            "cpp",
            "rust",
            "python",
            "html",
            "css",
            "javascript",
            "typescript"
          ]
        }
      }
    }
  },
});