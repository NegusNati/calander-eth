import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Use Next image optimizer for local assets; add remotePatterns if loading external hosts.
    unoptimized: false,
  },
  // Produce a standalone server output for lean Docker images.
  output: 'standalone',
  turbopack: {},
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      type: 'asset/resource',
    });
    return config;
  },
}

export default withBundleAnalyzer(nextConfig)
