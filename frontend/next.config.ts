/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // 本物のAPIを使用する場合（Docker環境など）
    // デフォルトはローカル開発用（ダミーAPI使用）
    const useDummyApi = process.env.USE_DUMMY_API ?? 'true';
    
    if (useDummyApi !== 'true') {
      return [
        {
          source: '/api/:path*',      // フロントの /api/* へのリクエスト
          destination: 'http://backend:8080/api/:path*', // Go API へ転送（Docker環境用）
        },
      ];
    }
    
    // ダミーAPIを使用する場合は、プロキシを設定しない
    return [];
  },
};

module.exports = nextConfig;
