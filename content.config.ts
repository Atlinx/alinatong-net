import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import type { PreviewObject, PreviewValue } from './shared/types/preview'

const previewObjectSchema: z.ZodType<PreviewObject> = z.object({
  src: z.string(),
  media_classes: z.optional(z.string()),
  alt: z.optional(z.string())
})

const previewSchema: z.ZodType<PreviewValue> = z.union([
  z.string(),
  previewObjectSchema
])

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        slug: z.optional(z.string()),
        date: z.string(),
        preview: z.optional(previewSchema),
        links: z.optional(z.map(z.string(), z.string())),
        tags: z.optional(z.array(z.string()))
      })
    }),
    education: defineCollection({
      type: 'data',
      source: 'education/**/*.yaml',
      schema: z.object({
        name: z.string(),
        date: z.string(),
        logo: z.optional(z.string()),
        logo_alt: z.optional(z.string()),
        majors: z.array(z.string()),
        awards: z.array(z.string()),
      }),
    }),
    research: defineCollection({
      type: 'data',
      source: 'research/**/*.yaml',
      schema: z.object({
        name: z.string(),
        date: z.string(),
        authors: z.optional(z.string()),
        venue: z.optional(z.string()),
        preview: z.optional(previewSchema),
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
        preview: z.optional(previewSchema),
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
        preview: z.optional(previewSchema),
        links: z.optional(z.map(z.string(), z.string())),
        logo: z.optional(z.string()),
        logo_alt: z.optional(z.string()),
        desc: z.array(z.string())
      })
    })
  }
})