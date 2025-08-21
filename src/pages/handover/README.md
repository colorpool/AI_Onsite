# 客户交接功能模块

## 功能概述

客户交接功能模块是SaaS公司客户成功管理平台的核心功能之一，专为客户成功经理（CSM）设计，用于管理客户从销售到客户成功的交接过程。

## 功能特性

### 1. 客户交接列表页 (`/profiles/handover`)

**搜索筛选功能：**
- 客户名称搜索
- 交接状态筛选（待处理、处理中、已对齐、部分对齐）
- 风险等级筛选（高风险、中风险、低风险）
- 搜索和重置功能

**数据列表功能：**
- 显示客户交接记录列表
- 支持分页浏览
- 显示关键信息：客户名称、交接单、风险提示、干系人信息、客户期望对齐、交接评价
- 新增交接和导出功能

### 2. 客户交接详情页 (`/profiles/handover/:id`)

**三栏式布局设计：**

#### 左侧栏 - CRM同步信息（只读）
- 合同金额
- 服务周期
- 购买产品
- 关键联系人
- 销售备注

#### 中间栏 - CSM补充与分析（可编辑）
- **风险提示**：开关控件，支持详细风险描述
- **干系人信息**：动态增删干系人，包含姓名、职位、角色、联系方式
- **客户期望对齐**：状态选择器（已对齐/部分对齐/未对齐）+ 详细描述
- **核心痛点**：多行文本输入
- **成功标准**：多行文本输入

#### 右侧栏 - 行动计划与协同
- **Onboarding任务清单**：可勾选的任务列表
- **内部协作沟通**：评论系统，支持@功能

**页面功能：**
- 确认完成交接按钮
- 返回列表导航

## 技术实现

### 技术栈
- React 19
- TypeScript
- Ant Design 5
- UmiJS 4

### 文件结构
```
src/
├── pages/
│   └── handover/
│       ├── index.tsx          # 客户交接列表页
│       ├── [id]/
│       │   └── index.tsx      # 客户交接详情页
│       └── README.md          # 功能说明文档
├── types/
│   └── handover.ts            # 类型定义
└── mock/
    └── handoverData.ts        # 模拟数据
```

### 核心类型定义

```typescript
// 客户交接状态
type HandoverStatus = 'pending' | 'processing' | 'aligned' | 'partially_aligned';

// 风险等级
type RiskLevel = 'high' | 'medium' | 'low';

// 干系人角色
type StakeholderRole = 'decision_maker' | 'user' | 'influencer' | 'technical_contact';

// 客户交接记录
interface CustomerHandover {
  id: string;
  customerName: string;
  handoverStatus: HandoverStatus;
  riskLevel: RiskLevel;
  hasHandoverDocument: boolean;
  hasRiskAlert: boolean;
  stakeholderCount: number;
  expectationAlignment: 'aligned' | 'partially_aligned' | 'not_aligned';
  handoverRating: number;
  handoverComment: string;
  // ... 其他字段
}
```

## 使用说明

### 访问路径
- 列表页：`/profiles/handover`
- 详情页：`/profiles/handover/:id`

### 主要操作流程
1. **查看交接列表**：在列表页可以查看所有客户交接记录
2. **搜索筛选**：使用顶部的搜索筛选功能快速找到目标客户
3. **查看详情**：点击"交接单"列的"有"链接进入详情页
4. **编辑信息**：在详情页的中间栏编辑客户相关信息
5. **管理任务**：在右侧栏管理Onboarding任务和内部沟通
6. **完成交接**：点击"确认完成交接"按钮完成整个交接流程

## 设计亮点

1. **三栏式布局**：清晰分离CRM数据、CSM分析和行动计划
2. **响应式设计**：适配不同屏幕尺寸
3. **实时交互**：支持动态增删干系人、任务状态切换
4. **协作功能**：内置评论系统，支持@功能
5. **状态管理**：完整的TypeScript类型定义，确保数据一致性

## 后续扩展

- 集成真实的CRM API
- 添加数据导出功能
- 实现实时通知系统
- 增加权限控制
- 添加数据统计和分析功能
