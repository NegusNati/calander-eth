import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fav/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.{svg,png,jpg,jpeg,webp,avif,ico}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/shader_bg.svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },
  modularizeImports: {
    'date-fns': {
      transform: 'date-fns/{{member}}',
      preventFullImport: true,
    },
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
