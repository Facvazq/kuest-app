/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  distDir: 'out',
  // Disable server-side features for static export
  experimental: {
    esmExternals: false
  }
}

module.exports = nextConfig