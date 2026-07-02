import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/fonts", "@nuxt/image", "@nuxtjs/color-mode", "@nuxt/content", "@nuxt/icon"],
  colorMode: {
    classSuffix: "",
    dataValue: "theme"
  },
  features: {
    inlineStyles: false
  },
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
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true,
    },
    server: {
      allowedHosts: ["atlinx.net"]
    }
  },
  icon: {
    mode: "svg",
    clientBundle: {
      icons: [
        "mdi:arrow-left",
        "mdi:arrow-top-right",
        "mdi:arrow-top",
        "mdi:information",
        "mdi:check-circle",
        "mdi:alert",
        "mdi:alert-circle-outline",
        "mdi:alert-circle",
        "mdi:white-balance-sunny",
        "mdi:weather-night",
        "mdi:circle-half-full",
        "mdi:palette",
        "mdi:close",
        "mdi:menu",
        "mdi:message-text"
      ]
    }
  },
  fonts: {
    defaults: {
      preload: true,
    },
    families: [
      // Force a specific provider (e.g., download only from Google Fonts)
      { name: "League Gothic", provider: "google"},
      { name: "Ubuntu", provider: "google", weights: ["400", "500", "600", "700"] },
    ]
  },
  router: {
    options: {
      scrollBehaviorType: "smooth"
    }
  },
  content: {
    build: {
      markdown: {
        toc: {
          depth: 2,
          searchDepth: 2
        },
        remarkPlugins: {
          "remark-math": {},
        },
        rehypePlugins: {
          "rehype-katex": {}
        },
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