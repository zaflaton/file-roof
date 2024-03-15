import { hostname } from 'os'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'resilient-eagle-617.convex.cloud',
      },
    ],
  },
}

export default nextConfig
