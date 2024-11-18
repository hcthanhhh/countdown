/* eslint-disable import/no-extraneous-dependencies, import/extensions */
/** @type {import('next').NextConfig} */
import './src/libs/Env.mjs';

import withBundleAnalyzer from '@next/bundle-analyzer';
import withNextIntl from 'next-intl/plugin';

const withNextIntlConfig = withNextIntl('./src/libs/i18n.mjs');

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default bundleAnalyzer(
  withNextIntlConfig({
    poweredByHeader: false,
    reactStrictMode: true,
    images: {
      domains: [
        'lh3.googleusercontent.com',
        'avatars.githubusercontent.com',
        'prnd-public.s3.amazonaws.com',
        'writesonic-frontend.s3.us-east-1.amazonaws.com',
        'w7.pngwing.com',
        'uprace2.vcdn.vn',
        'www.vmcdn.ca',
        'encrypted-tbn0.gstatic.com',
        'mdbcdn.b-cdn.net',
        's3img.vcdn.vn',
        '2x.com',
        'horizon-ui.com',
        'cover-talk.zadn.vn',
        's160-ava-talk.zadn.vn',
        's75-ava-talk.zadn.vn'
      ],
    },
    webpack: (config) => {
      // eslint-disable-next-line no-param-reassign
      config.resolve.alias.canvas = false;
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      });
      // config.externals is needed to resolve the following errors:
      // Module not found: Can't resolve 'bufferutil'
      // Module not found: Can't resolve 'utf-8-validate'
      config.externals.push({
        bufferutil: 'bufferutil',
        'utf-8-validate': 'utf-8-validate',
      });

      return config;
    },
  }),
);
