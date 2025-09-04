// 持续服务相关类型定义

// 客户健康度等级
export type HealthLevel = '健康' | '一般' | '风险';

// 关键动作类型
export type ActionType = 'A1' | 'A2' | 'A3' | 'A4' | 'A5';

// 风险事件状态
export type RiskEventStatus = '待处理' | '处理中' | '已解决' | '已关闭';

// 价值看板状态
export type ValueBoardStatus = '草稿' | '进行中' | '已完成' | '已归档';

// QBR会议状态
export type QBRStatus = '待召开' | '已完成' | '已取消';

// 服务剧本状态
export type PlaybookStatus = '可用' | '维护中' | '已停用';

// 客户基础信息
export interface Customer {
  id: string;
  name: string;
  csm: string; // 客户成功经理
  healthScore: number; // 健康分 0-100
  healthLevel: HealthLevel;
  contractAmount: number; // 合同金额
  renewalDate: string; // 续费日期
  isRenewalRisk: boolean; // 是否续费风险
  lastContactDate: string; // 最后接触日期
  createdAt: string;
  updatedAt: string;
}

// 价值看板
export interface ValueBoard {
  id: string;
  customerId: string;
  customerName: string;
  title: string;
  description: string;
  status: ValueBoardStatus;
  kpis: ValueKPI[];
  achievements: Achievement[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// 价值KPI
export interface ValueKPI {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

// 价值成果
export interface Achievement {
  id: string;
  title: string;
  description: string;
  impact: string; // 业务影响
  date: string;
}

// QBR会议
export interface QBRMeeting {
  id: string;
  customerId: string;
  customerName: string;
  title: string;
  scheduledDate: string;
  status: QBRStatus;
  agenda: string[];
  attendees: string[];
  outcomes?: string[];
  nextSteps?: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// 风险事件
export interface RiskEvent {
  id: string;
  customerId: string;
  customerName: string;
  riskType: string; // 风险类型
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical'; // 严重程度
  status: RiskEventStatus;
  assignedTo: string; // 负责人
  dueDate: string;
  resolution?: string; // 解决方案
  createdAt: string;
  updatedAt: string;
}

// 服务剧本
export interface ServicePlaybook {
  id: string;
  name: string;
  description: string;
  applicableStage: LifecycleStage[]; // 适用阶段
  category: string; // 剧本分类
  status: PlaybookStatus;
  steps: PlaybookStep[];
  estimatedDuration: number; // 预估耗时（小时）
  successRate: number; // 成功率
  usage: number; // 使用次数
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// 剧本步骤
export interface PlaybookStep {
  id: string;
  title: string;
  description: string;
  duration: number; // 耗时（小时）
  resources: string[]; // 所需资源
  checkpoints: string[]; // 检查点
}

// 关键动作配置
export interface KeyAction {
  id: ActionType;
  title: string;
  description: string;
  icon: string;
  color: string;
  route?: string; // 跳转路由
  enabled: boolean;
}

// 持续服务概览数据
export interface ServiceOverview {
  totalCustomers: number;
  avgHealthScore: number;
  riskCustomers: number;
  healthDistribution: {
    healthy: number;
    normal: number;
    risky: number;
  };
  lifecycleDistribution: {
    growth: number;
    mature: number;
    decline: number;
  };
}

// 客户筛选条件
export interface CustomerFilter {
  name?: string;
  csm?: string;
  healthLevel?: HealthLevel;
  lifecycleStage?: LifecycleStage;
  renewalRisk?: boolean;
  healthScoreRange?: [number, number];
}

// 图表数据
export interface ChartData {
  name: string;
  value: number;
  color?: string;
}
