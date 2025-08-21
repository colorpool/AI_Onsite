// 开发环境配置
import { defineConfig } from '@umijs/max';
import config from './config';

export default defineConfig({
  ...config,
  // 开发环境特定配置
  define: {
    'process.env.REACT_APP_ENV': 'dev',
    'process.env.NODE_ENV': 'development',
  },
  // 保持原有的开发环境代理配置
  proxy: config.proxy,
});
