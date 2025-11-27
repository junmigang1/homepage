/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  typescript: {
    ignoreBuildErrors: true, // \uc784\uc2dc\ub85c \ud0c0\uc785 \uccb4\ud06c \uac74\ub108\ub6f0\uae30
  },
  eslint: {
    ignoreDuringBuilds: true, // \uc784\uc2dc\ub85c ESLint \uac74\ub108\ub6f0\uae30
  },
}

module.exports = nextConfig
