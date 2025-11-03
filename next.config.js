/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  // Vercel 배포를 위한 설정
  output: 'standalone',
}

module.exports = nextConfig
