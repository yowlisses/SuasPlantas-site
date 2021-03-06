/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const plugins = [];

if (process.env.NEXT_PUBLIC_ENV !== 'development') {
  plugins.push(withPWA);
}

if (process.env.ANALYZE === 'true') {
  plugins.push(withBundleAnalyzer);
}

module.exports = withPlugins(
  plugins,
  {
    reactStrictMode: true,
    images: {
      domains: [
        'github.com',
        'unsplash.it',
        'unsplash.com',
        'play.google.com',
        'images.unsplash.com',
        'maps.googleapis.com',
        'lh3.googleusercontent.com',
        'scontent-for1-1.xx.fbcdn.net',
        'platform-lookaside.fbsbx.com',
        'suasplantas.s3.sa-east-1.amazonaws.com',
        'plantei-dev.s3.sa-east-1.amazonaws.com',
      ],
    },
    async redirects() {
      return [
        {
          source: '/plants',
          destination: '/',
          permanent: true,
        },
      ];
    },
    pwa: {
      dest: 'public',
      disable: process.env.NODE_ENV === 'development',
    },
  },
);
