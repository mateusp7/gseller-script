import { cosmiconfig } from 'cosmiconfig'
import path from 'path'
import { loadConfig } from 'tsconfig-paths'
import { z } from 'zod'
import { resolveImport } from './resolve-import'

const explorer = cosmiconfig('gseller', {
  searchPlaces: ['gseller.json'],
})

export const rawConfigSchema = z
  .object({
    tsx: z.coerce.boolean().default(true),
    graphql: z.string(),
    tailwind: z.object({
      config: z.string(),
      css: z.string(),
    }),
    aliases: z.object({
      components: z.string(),
      utils: z.string(),
    }),
  })
  .strict()

export type RawConfig = z.infer<typeof rawConfigSchema>

export const configSchema = rawConfigSchema.extend({
  resolvedPaths: z.object({
    graphql: z.string(),
    tailwindConfig: z.string(),
    tailwindCss: z.string(),
    utils: z.string(),
    components: z.string(),
  }),
})

export type Config = z.infer<typeof configSchema>

export async function getConfig(cwd: string) {
  const config = await getRawConfig(cwd)

  if (!config) {
    return null
  }

  return await resolveConfigPaths(cwd, config)
}

export async function resolveConfigPaths(cwd: string, config: RawConfig) {
  // Read tsconfig.json.
  const tsConfig = loadConfig(cwd)

  if (tsConfig.resultType === 'failed') {
    throw new Error(
      `Failed to load ${config.tsx ? 'tsconfig' : 'jsconfig'}.json. ${
        tsConfig.message ?? ''
      }`.trim()
    )
  }

  return configSchema.parse({
    ...config,
    resolvedPaths: {
      graphql: path.resolve(cwd, config.graphql),
      tailwindConfig: path.resolve(cwd, config.tailwind.config),
      tailwindCss: path.resolve(cwd, config.tailwind.css),
      utils: await resolveImport(config.aliases['utils'], tsConfig),
      components: await resolveImport(config.aliases['components'], tsConfig),
    },
  })
}

export async function getRawConfig(cwd: string): Promise<RawConfig | null> {
  try {
    const configResult = await explorer.search(cwd)

    if (!configResult) {
      return null
    }

    return rawConfigSchema.parse(configResult.config)
  } catch (error) {
    throw new Error(`Invalid configuration found in ${cwd}/components.json.`)
  }
}
