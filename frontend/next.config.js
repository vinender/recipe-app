const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    // Add aliases for module resolution
    const aliases = {
      '@components': path.resolve(__dirname, 'components'),
      '@pages': path.resolve(__dirname, 'pages'),
      '@utils': path.resolve(__dirname, 'utils'),
      // Add more aliases for other directories as needed
    };

    Object.assign(config.resolve.alias, aliases);

    return config;
  },
};

module.exports = nextConfig;
