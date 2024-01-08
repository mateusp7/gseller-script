import { detect } from '@antfu/ni'

export type PackageManagerType = 'yarn' | 'pnpm' | 'bun' | 'npm'

export async function getPackageManager(
  targetDir: string
): Promise<PackageManagerType> {
  const packageManager = await detect({ programmatic: true, cwd: targetDir })

  if (packageManager === 'yarn@berry') return 'yarn'
  if (packageManager === 'pnpm@6') return 'pnpm'
  if (packageManager === 'bun') return 'bun'

  return packageManager ?? 'npm'
}
