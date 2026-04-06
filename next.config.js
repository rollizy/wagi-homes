/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Unsplash — used for mock cover images in development
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // Pannellum sample panoramas
      { protocol: 'https', hostname: 'pannellum.org' },
      // Cloudflare R2 — your production CDN
      { protocol: 'https', hostname: '**.r2.cloudflarestorage.com' },
      { protocol: 'https', hostname: '**.cloudflare.com' },
      { protocol: 'https', hostname: '*.r2.dev' },
      { protocol: 'https', hostname: 'pub-ba20e8c941504eaeab9c231e16fadea0.r2.dev' },
      // Add your own CDN domain here later, e.g.:
      // { protocol: 'https', hostname: 'cdn.wagihomes.co.za' },
    ],
  },
}

module.exports = nextConfig
