/** @type {import('next').NextConfig} */
const nextConfig = {
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000, // 1秒ごとにファイル変更をチェック
      aggregateTimeout: 300, // 変更後300ms待ってから再ビルド
    };
    return config;
  },
};

export default nextConfig;
