import type { NextConfig } from 'next';

const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? '/trem-plugins' : '';

const nextConfig: NextConfig = {
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    if (isProduction) {
      config.output.publicPath = `${basePath}/_next/`;
    }
    return config;
  },
  trailingSlash: isProduction,
};

export default nextConfig;
