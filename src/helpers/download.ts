import { createWriteStream, promises as fs } from 'fs'
import got from 'got'
import { tmpdir } from 'os'
import { join } from 'path'
import { Stream } from 'stream'
import tar from 'tar'
import { promisify } from 'util'
import { RepoInfo } from './create-app'

const pipeline = promisify(Stream.pipeline)

async function downloadTar(url: string) {
  const tempFile = join(tmpdir(), `next.js-cna-example.temp-${Date.now()}`)
  await pipeline(got.stream(url), createWriteStream(tempFile))
  return tempFile
}

export async function downloadAndExtractRepo(
  root: string,
  { username, name, branch, filePath }: RepoInfo
) {
  const tempFile = await downloadTar(
    `https://codeload.github.com/${username}/${name}/tar.gz/${branch}`
  )

  await tar.x({
    file: tempFile,
    cwd: root,
    strip: filePath ? filePath.split('/').length + 1 : 1,
    filter: (p) =>
      p.startsWith(
        `${name}-${branch.replace(/\//g, '-')}${
          filePath ? `/${filePath}/` : '/'
        }`
      ),
  })

  await fs.unlink(tempFile)
}

export async function downloadAndExtractExample(root: string, name: string) {
  if (name === '__internal-testing-retry') {
    throw new Error('This is an internal example for testing the CLI.')
  }

  const tempFile = await downloadTar(
    'https://codeload.github.com/vercel/next.js/tar.gz/canary'
  )

  await tar.x({
    file: tempFile,
    cwd: root,
    strip: 2 + name.split('/').length,
    filter: (p) => p.includes(`next.js-canary/examples/${name}/`),
  })

  await fs.unlink(tempFile)
}
