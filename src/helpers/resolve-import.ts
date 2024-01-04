import {
  createMatchPath,
  type ConfigLoaderSuccessResult,
} from 'tsconfig-paths/lib'

export async function resolveImport(
  importPath: string,
  config: Pick<ConfigLoaderSuccessResult, 'absoluteBaseUrl' | 'paths'>
) {
  return createMatchPath(config.absoluteBaseUrl, config.paths)(
    importPath,
    undefined,
    () => true,
    ['.ts', '.tsx']
  )
}
