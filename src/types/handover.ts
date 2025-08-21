// 客户交接状态
export type HandoverStatus = 'pending' | 'processing' | 'aligned' | 'partially_aligned';

// 风险等级
export type RiskLevel = 'high' | 'medium' | 'low';

// 干系人角色
export type StakeholderRole = 'decision_maker' | 'user' | 'influencer' | 'technical_contact';

// 干系人信息
export interface Stakeholder {
  id: string;
  name: string;
  position: string;
  role: StakeholderRole;
  contact: string;
}

// CRM同步数据
export interface CRMSyncData {
  contractAmount: number;
  servicePeriod: string;
  purchasedProducts: string[];
  keyContacts: string[];
  salesNotes: string;
}

// 客户交接记录
export interface CustomerHandover {
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
  createdAt: string;
  updatedAt: string;
  crmData?: CRMSyncData;
  stakeholders?: Stakeholder[];
  riskDetails?: string;
  expectationDetails?: string;
  corePainPoints?: string;
  successCriteria?: string;
  onboardingTasks?: OnboardingTask[];
  internalComments?: InternalComment[];
}

// Onboarding任务
export interface OnboardingTask {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

// 内部协作评论
export interface InternalComment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  mentions?: string[];
}

// 搜索筛选条件
export interface HandoverSearchParams {
  customerName?: string;
  status?: HandoverStatus;
  riskLevel?: RiskLevel;
}

// 客户交接表单数据
export interface HandoverFormData {
  riskAlert: boolean;
  riskDetails?: string;
  stakeholders: Stakeholder[];
  expectationAlignment: 'aligned' | 'partially_aligned' | 'not_aligned';
  expectationDetails?: string;
  corePainPoints?: string;
  successCriteria?: string;
  onboardingTasks: OnboardingTask[];
}
