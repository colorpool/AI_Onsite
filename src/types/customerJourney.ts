// 客户旅程相关类型定义

export interface JourneyStage {
  id: string;
  name: string;
  description: string;
  phase: 'onboarding' | 'continuous' | 'renewal' | 'expansion' | 'churn';
  order: number;
  duration?: string; // 预期持续时间，如 "30天"
  isActive: boolean; // 当前是否处于此阶段
  isCompleted: boolean; // 是否已完成
  startDate?: string;
  endDate?: string;
  completedDate?: string;
}

export interface JourneyAction {
  id: string;
  stageId: string;
  title: string;
  description: string;
  type: 'meeting' | 'training' | 'review' | 'check-in' | 'onboarding' | 'renewal' | 'other';
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  dueDate?: string;
  completedDate?: string;
  assignee?: string;
  estimatedDuration?: string; // 预计耗时，如 "2小时"
  isRequired: boolean; // 是否必需
  triggerCondition?: string; // 触发条件，如 "服务第6个月"
}

export interface CustomerJourney {
  customerId: string;
  customerName: string;
  currentStage: string; // 当前所在阶段ID
  lifecycle: 'onboarding' | 'continuous' | 'renewal' | 'expansion' | 'churn';
  startDate: string; // 客户旅程开始时间
  stages: JourneyStage[];
  actions: JourneyAction[];
  milestones: JourneyMilestone[];
}

export interface JourneyMilestone {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'contract_signed' | 'onboarding_completed' | 'first_value_achieved' | 'renewal_started' | 'expansion_opportunity' | 'other';
  isAchieved: boolean;
  stageId?: string; // 关联的阶段ID
}

export interface JourneyTemplate {
  id: string;
  name: string;
  description: string;
  lifecycle: 'onboarding' | 'continuous' | 'renewal' | 'expansion';
  customerTier: 'A' | 'B' | 'C' | 'all';
  stages: Omit<JourneyStage, 'isActive' | 'isCompleted' | 'startDate' | 'endDate' | 'completedDate'>[];
  actions: Omit<JourneyAction, 'status' | 'completedDate' | 'stageId'>[];
}