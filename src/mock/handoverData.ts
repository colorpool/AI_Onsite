import { CustomerHandover, CRMSyncData, Stakeholder, OnboardingTask, InternalComment } from '../types/handover';

// 模拟CRM数据
export const mockCRMSyncData: CRMSyncData = {
  contractAmount: 150000,
  servicePeriod: '2024-01-01 至 2024-12-31',
  purchasedProducts: ['企业版SaaS平台', '数据分析模块', 'API集成服务'],
  keyContacts: ['张三 - 技术总监', '李四 - 项目经理'],
  salesNotes: '客户对数据安全要求较高，需要重点关注合规性配置。客户团队技术能力较强，可以快速上手。',
  accountCount: 50,
  salesSource: 'direct',
  salesPerson: '王销售'
};

// 模拟干系人数据
export const mockStakeholders: Stakeholder[] = [
  {
    id: '1',
    name: '张三',
    position: '技术总监',
    role: 'decision_maker',
    contact: 'zhangsan@company.com'
  },
  {
    id: '2',
    name: '李四',
    position: '项目经理',
    role: 'user',
    contact: 'lisi@company.com'
  },
  {
    id: '3',
    name: '王五',
    position: '运维工程师',
    role: 'technical_contact',
    contact: 'wangwu@company.com'
  }
];

// 模拟Onboarding任务
export const mockOnboardingTasks: OnboardingTask[] = [
  {
    id: '1',
    title: '安排启动会',
    completed: true,
    dueDate: '2024-01-15'
  },
  {
    id: '2',
    title: '完成账号开通',
    completed: true,
    dueDate: '2024-01-16'
  },
  {
    id: '3',
    title: '配置数据权限',
    completed: false,
    dueDate: '2024-01-20'
  },
  {
    id: '4',
    title: '培训用户使用',
    completed: false,
    dueDate: '2024-01-25'
  }
];

// 模拟内部评论
export const mockInternalComments: InternalComment[] = [
  {
    id: '1',
    content: '客户对数据安全要求很高，建议安排安全专家参与启动会 @security_team',
    author: 'CSM-小王',
    createdAt: '2024-01-10 14:30:00',
    mentions: ['security_team']
  },
  {
    id: '2',
    content: '已联系技术团队，确认可以满足客户的合规要求',
    author: 'CSM-小李',
    createdAt: '2024-01-11 09:15:00'
  }
];

// 模拟客户交接列表数据
export const mockCustomerHandovers: CustomerHandover[] = [
  {
    id: '1',
    customerName: '北京科技有限公司',
    handoverStatus: 'normal',
    riskLevel: 'low',
    hasHandoverDocument: true,
    hasRiskAlert: false,
    stakeholderCount: 5,
    expectationAlignment: 'aligned',
    handoverRating: 4.5,
    handoverComment: '服务专业，响应及时',
    createdAt: '2024-01-10 10:00:00',
    updatedAt: '2024-01-15 16:30:00',
    crmData: mockCRMSyncData,
    stakeholders: mockStakeholders,
    onboardingTasks: mockOnboardingTasks,
    internalComments: mockInternalComments
  },
  {
    id: '2',
    customerName: '上海智能科技有限公司',
    handoverStatus: 'not_handover',
    riskLevel: 'medium',
    hasHandoverDocument: false,
    hasRiskAlert: true,
    stakeholderCount: 3,
    expectationAlignment: 'partially_aligned',
    handoverRating: 3.8,
    handoverComment: '需要进一步沟通客户需求',
    createdAt: '2024-01-12 14:20:00',
    updatedAt: '2024-01-14 11:45:00',
    crmData: {
      ...mockCRMSyncData,
      accountCount: 25,
      salesSource: 'channel',
      channelPartner: '上海渠道合作伙伴有限公司'
    }
  },
  {
    id: '3',
    customerName: '深圳创新科技有限公司',
    handoverStatus: 'risk',
    riskLevel: 'high',
    hasHandoverDocument: true,
    hasRiskAlert: true,
    stakeholderCount: 7,
    expectationAlignment: 'not_aligned',
    handoverRating: 2.5,
    handoverComment: '客户期望与产品功能存在较大差距',
    createdAt: '2024-01-08 09:30:00',
    updatedAt: '2024-01-13 15:20:00',
    crmData: {
      ...mockCRMSyncData,
      accountCount: 100,
      salesSource: 'direct',
      salesPerson: '李销售'
    }
  }
];
