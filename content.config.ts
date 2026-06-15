import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    education: defineCollection({
      type: 'data',
      source: 'education/**/*.yaml',
      schema: z.object({
        name: z.string(),
        date: z.string(),
        logo: z.optional(z.string()),
        majors: z.array(z.string()),
        awards: z.array(z.string()),
      }),
    }),
    publications: defineCollection({
      type: 'data',
      source: 'publications/**/*.yaml',
      schema: z.object({
        name: z.string(),
        date: z.string(),
        authors: z.optional(z.string()),
        venue: z.optional(z.string()),
        preview: z.optional(z.string()),
        preview_classes: z.optional(z.string()),
        links: z.optional(z.map(z.string(), z.string())),
        desc: z.string()
      }),
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects/**/*.yaml',
      schema: z.object({
        name: z.string(),
        date: z.string(),
        subtitle: z.optional(z.string()),
        preview: z.optional(z.string()),
        preview_classes: z.optional(z.string()),
        links: z.optional(z.map(z.string(), z.string())),
        desc: z.array(z.string())
      }),
    }),
    experience: defineCollection({
      type: 'data',
      source: 'experience/**/*.yaml',
      schema: z.object({
        name: z.string(),
        date: z.string(),
        subtitle: z.optional(z.string()),
        preview: z.optional(z.string()),
        preview_classes: z.optional(z.string()),
        links: z.optional(z.map(z.string(), z.string())),
        logo: z.optional(z.string()),
        desc: z.array(z.string())
      })
    })
  }
})