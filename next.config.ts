import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
  './src/i18n/request.ts' // Путь к твоему файлу request.ts
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Твои другие настройки (если есть), например для картинок:
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);