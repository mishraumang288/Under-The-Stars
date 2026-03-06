/** @type {import('next').NextConfig} */
const basePath = '/Under-The-Stars';

const nextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
