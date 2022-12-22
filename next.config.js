const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  let config = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
      mongodb_username: 'rootuser',
      mongodb_pwd: 'root',
      mongodb_cluster: 'cluster0',
      mongodb_db: 'nextblogs',
    },
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    config = {
      ...config,
      env: {
        ...config.env,
        mongodb_db: 'nextblogs-dev',
      },
    };
  }

  return config;
};

module.exports = nextConfig;
