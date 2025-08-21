# 部署指南

## Vercel 部署

### 1. 准备工作

1. 确保代码已提交到 GitHub 仓库
2. 在 Vercel 中连接你的 GitHub 仓库

### 2. 环境配置

#### 开发环境（本地）
- 使用 `npm run start:dev` 启动开发服务器
- 使用 `npm run build:dev` 构建开发版本

#### 生产环境（Vercel）
- Vercel 会自动使用 `npm run vercel-build` 构建生产版本
- 生产环境使用 `config/config.prod.ts` 配置

### 3. 环境变量设置

在 Vercel 项目设置中添加以下环境变量：

```
REACT_APP_ENV=prod
UMI_ENV=prod
API_BASE_URL=https://your-production-api.com
NODE_ENV=production
```

### 4. 部署流程

1. 推送代码到 GitHub
2. Vercel 自动检测并开始构建
3. 构建完成后自动部署

### 5. 注意事项

- 开发环境配置保持不变，不会影响生产环境
- 生产环境使用独立的配置文件 `config/config.prod.ts`
- 可以通过 Vercel 的环境变量控制不同环境的配置
