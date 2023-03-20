/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  reactStrictMode: true,
  swcMinify: true,
  images: {
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ['firebasestorage.googleapis.com'],
    dangerouslyAllowSVG: true,
    formats: ['image/avif', 'image/webp'],
  },
});
