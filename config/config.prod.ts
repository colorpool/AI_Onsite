// 生产环境配置
import { defineConfig } from '@umijs/max';
import config from './config';

export default defineConfig({
  ...config,
  // 生产环境特定配置
  define: {
    'process.env.REACT_APP_ENV': 'prod',
    'process.env.NODE_ENV': 'production',
  },
  // 生产环境API配置
  proxy: {
    // 生产环境API地址
    '/api': {
      target: process.env.API_BASE_URL || 'https://your-production-api.com',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
