// 环境检测工具
export const isProduction = () => {
  // 在Vercel环境中，NODE_ENV 会被设置为 'production'
  // 同时我们也检查 REACT_APP_ENV 环境变量
  return process.env.NODE_ENV === 'production' || 
         process.env.REACT_APP_ENV === 'prod' ||
         window.location.hostname.includes('vercel.app');
};

export const isDevelopment = () => {
  return process.env.NODE_ENV === 'development' || 
         process.env.REACT_APP_ENV === 'dev';
};

// 输出当前环境信息用于调试
export const getEnvironmentInfo = () => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    REACT_APP_ENV: process.env.REACT_APP_ENV,
    hostname: typeof window !== 'undefined' ? window.location.hostname : 'unknown',
    isProduction: isProduction(),
    isDevelopment: isDevelopment(),
  };
};
