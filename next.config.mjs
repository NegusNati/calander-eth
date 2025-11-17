/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {},
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      type: 'asset/resource',
    });
    return config;
  },
}

export default nextConfig
