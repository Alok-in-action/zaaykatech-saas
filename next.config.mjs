/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning-level linting issues won't block cloud deployment builds
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
