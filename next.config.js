/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  async redirects() {
    return [
      {
        source: '/signium/app',
        destination: '/signium/dashboard',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/events/:path*',
        destination: '/api/events/:path*',
      },
    ]
  },
}

module.exports = nextConfig