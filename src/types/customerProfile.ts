// 生命周期阶段
export type LifecycleStage = 'handover_implementation' | 'continuous_service' | 'renewal_management' | 'recall_incubation';

// 客户健康度
export type HealthLevel = 'healthy' | 'warning' | 'risk';

// 客户分层
export type CustomerTier = 'S' | 'A' | 'B' | 'C';

// 健康分趋势
export type HealthTrend = 'up' | 'down' | 'stable';

// 客户档案接口
export interface CustomerProfile {
  id: string;
  customerName: string;
  lifecycleStage: LifecycleStage;
  csmName: string; // 负责人CSM
  healthScore: number; // 客户健康分
  healthTrend: HealthTrend; // 健康分趋势
  contractAmount: number; // 合同金额 (ARR)
  serviceExpiryDate: string; // 服务到期日
  customerTier: CustomerTier; // 客户分层
  healthLevel: HealthLevel; // 客户健康度
  industry?: string; // 行业
  region?: string; // 地区
  createdAt: string; // 创建时间
  updatedAt: string; // 更新时间
}

// 筛选参数接口
export interface CustomerProfileFilters {
  lifecycleStage?: LifecycleStage | 'all';
  healthLevel?: HealthLevel | 'all';
  customerTier?: CustomerTier | 'all';
  searchKeyword?: string;
}

// 生命周期阶段配置
export const LIFECYCLE_STAGE_CONFIG = {
  handover_implementation: { text: '交接实施', color: 'blue' },
  continuous_service: { text: '持续服务', color: 'green' },
  renewal_management: { text: '续约管理', color: 'orange' },
  recall_incubation: { text: '召回孵化', color: 'purple' }
};

// 客户健康度配置
export const HEALTH_LEVEL_CONFIG = {
  healthy: { text: '健康', color: 'green' },
  warning: { text: '一般', color: 'orange' },
  risk: { text: '风险', color: 'red' }
};

// 客户分层配置
export const CUSTOMER_TIER_CONFIG = {
  S: { text: 'S级', color: 'gold' },
  A: { text: 'A级', color: 'blue' },
  B: { text: 'B级', color: 'green' },
  C: { text: 'C级', color: 'default' }
};