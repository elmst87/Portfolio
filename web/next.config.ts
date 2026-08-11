import type {NextConfig} from 'next'

const isGithubPages = process.env.GITHUB_PAGES === 'true'
const basePath = isGithubPages ? '/Portfolio' : ''

const nextConfig: NextConfig = {
  output: isGithubPages ? 'export' : undefined,
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}

export default nextConfig
