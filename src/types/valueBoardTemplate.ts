// 价值看板模板相关类型定义

import { ValueKPI, Achievement } from './continuousService';

// 模板类型
export type TemplateType = 'efficiency' | 'roi' | 'cost_saving' | 'user_adoption' | 'business_growth' | 'custom';

// 模板分类
export type TemplateCategory = '效率提升' | 'ROI回报' | '成本节约' | '用户采用' | '业务增长' | '自定义';

// 价值看板模板
export interface ValueBoardTemplate {
  id: string;
  name: string;
  description: string;
  type: TemplateType;
  category: TemplateCategory;
  icon: string;
  color: string;
  
  // 模板内容
  defaultTitle: string;
  defaultDescription: string;
  kpiTemplates: KPITemplate[];
  achievementTemplates: AchievementTemplate[];
  
  // 适用场景
  applicableIndustries: string[]; // 适用行业
  applicableScales: string[]; // 适用企业规模
  
  // 使用统计
  usageCount: number;
  rating: number; // 评分 1-5
  
  // 时间戳
  createdAt: string;
  updatedAt: string;
}

// KPI模板
export interface KPITemplate {
  id: string;
  name: string;
  description: string;
  unit: string;
  targetRange: {
    min: number;
    max: number;
    recommended: number;
  };
  calculationMethod?: string; // 计算方法说明
  dataSource?: string; // 数据来源说明
}

// 成就模板
export interface AchievementTemplate {
  id: string;
  title: string;
  description: string;
  impactDescription: string;
  category: '效率' | '成本' | '收入' | '满意度' | '其他';
}

// 模板使用记录
export interface TemplateUsage {
  id: string;
  templateId: string;
  customerId: string;
  customerName: string;
  valueBoardId: string;
  usedAt: string;
  feedback?: {
    rating: number;
    comment: string;
  };
}