import createNextIntlPlugin from 'next-intl/plugin';
import { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin(
  './src/i18n/request.ts'
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { 
        protocol: 'https', 
        hostname: 'raw.githubusercontent.com' 
      } as const,
    ],
  },
};

export default withNextIntl(nextConfig);