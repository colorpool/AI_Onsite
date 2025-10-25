// 续约管理专用mock数据
// 确保与交接实施、持续服务的客户数据不重复

export interface RenewalCustomer {
  id: string;
  name: string;
  industry: string;
  size: 'small' | 'medium' | 'large' | 'xlarge';
  csm: string;
  region: string;
  arr: number;
  healthScore: number;
  healthLevel: '健康' | '一般' | '风险';
  lifecycleStage: '成熟期' | '衰退期'; // 续约管理主要关注这两个阶段
  tier: 'S' | 'A' | 'B' | 'C';
  contractEndDate: string;
  daysToExpiry: number;
  renewalProbability: number;
  renewalStage: '未开始' | '沟通中' | '方案制定' | '商务谈判' | '合同签署' | '已完成' | '已流失';
  lastContactDate: string;
  nextActionDate: string;
  riskFactors: string[];
  opportunities: string[];
  currentContractValue: number;
  proposedRenewalValue: number;
  renewalType: '标准续约' | '扩容续约' | '降级续约';
  keyStakeholders: Array<{
    name: string;
    role: string;
    influence: 'high' | 'medium' | 'low';
    attitude: 'supporter' | 'neutral' | 'detractor';
  }>;
  competitorThreat: 'none' | 'low' | 'medium' | 'high';
  renewalNotes: string;
  tags: string[];
}

export interface RenewalContract {
  id: string;
  customerId: string;
  contractNumber: string;
  currentValue: number;
  proposedValue: number;
  startDate: string;
  endDate: string;
  renewalStartDate: string;
  status: 'active' | 'pending_renewal' | 'renewed' | 'expired' | 'cancelled';
  products: string[];
  accountCount: number;
  renewalHistory: Array<{
    year: string;
    value: number;
    status: 'renewed' | 'cancelled' | 'downgraded' | 'upgraded';
    notes: string;
  }>;
}

// 续约管理客户数据 - 使用独立的客户ID范围 (RENEW-0001 ~ RENEW-0050)
export const renewalCustomers: RenewalCustomer[] = [
  {
    id: 'CUST-0001',
    name: '深圳创新医疗科技有限公司',
    industry: '医疗健康',
    size: 'large',
    csm: '王芳',
    region: '华南',
    arr: 800000,
    healthScore: 75,
    healthLevel: '一般',
    lifecycleStage: '成熟期',
    tier: 'A',
    contractEndDate: '2024-03-31',
    daysToExpiry: 45,
    renewalProbability: 70,
    renewalStage: '沟通中',
    lastContactDate: '2024-01-15',
    nextActionDate: '2024-01-25',
    riskFactors: ['预算压缩', '新竞品出现'],
    opportunities: ['扩展到子公司', '增加培训服务'],
    currentContractValue: 800000,
    proposedRenewalValue: 900000,
    renewalType: '扩容续约',
    keyStakeholders: [
      { name: '李总', role: 'CEO', influence: 'high', attitude: 'supporter' },
      { name: '张经理', role: 'IT总监', influence: 'high', attitude: 'neutral' },
      { name: '王主管', role: '采购主管', influence: 'medium', attitude: 'detractor' }
    ],
    competitorThreat: 'medium',
    renewalNotes: '客户对产品满意，但对价格敏感，需要展示更多ROI价值',
    tags: ['重点客户', '价格敏感', '扩容机会']
  },
  {
    id: 'CUST-0002',
    name: '上海智能制造集团',
    industry: '制造业',
    size: 'xlarge',
    csm: '李明',
    region: '华东',
    arr: 800000,
    healthScore: 72,
    healthLevel: '一般',
    lifecycleStage: '成熟期',
    tier: 'S',
    contractEndDate: '2024-03-15',
    daysToExpiry: 30,
    renewalProbability: 75,
    renewalStage: '方案制定',
    lastContactDate: '2024-01-18',
    nextActionDate: '2024-01-28',
    riskFactors: ['预算压缩'],
    opportunities: ['多工厂部署', '高级功能模块'],
    currentContractValue: 800000,
    proposedRenewalValue: 900000,
    renewalType: '扩容续约',
    keyStakeholders: [
      { name: '陈董事长', role: '董事长', influence: 'high', attitude: 'supporter' },
      { name: '刘副总', role: '副总经理', influence: 'high', attitude: 'supporter' },
      { name: '赵总监', role: '信息化总监', influence: 'medium', attitude: 'supporter' }
    ],
    competitorThreat: 'low',
    renewalNotes: '制造业标杆客户，满意度较高，有扩容需求但对价格敏感',
    tags: ['制造业', '扩容机会', '价格敏感']
  },
  {
    id: 'CUST-0003',
    name: '杭州电商科技有限公司',
    industry: '电子商务',
    size: 'medium',
    csm: '张伟',
    region: '华东',
    arr: 450000,
    healthScore: 60,
    healthLevel: '风险',
    lifecycleStage: '衰退期',
    tier: 'B',
    contractEndDate: '2024-02-28',
    daysToExpiry: 15,
    renewalProbability: 40,
    renewalStage: '商务谈判',
    lastContactDate: '2024-01-20',
    nextActionDate: '2024-01-22',
    riskFactors: ['使用率下降', '关键联系人离职', '业务调整'],
    opportunities: ['降级续约保留', '重新培训激活'],
    currentContractValue: 450000,
    proposedRenewalValue: 300000,
    renewalType: '降级续约',
    keyStakeholders: [
      { name: '新任CTO', role: 'CTO', influence: 'high', attitude: 'neutral' },
      { name: '财务总监', role: 'CFO', influence: 'high', attitude: 'detractor' }
    ],
    competitorThreat: 'high',
    renewalNotes: '客户业务调整，预算收紧，需要紧急挽回措施',
    tags: ['流失风险', '紧急处理', '降级续约']
  },
  {
    id: 'CUST-0004',
    name: '成都金融服务公司',
    industry: '金融服务',
    size: 'large',
    csm: '赵六',
    region: '西南',
    arr: 600000,
    healthScore: 80,
    healthLevel: '健康',
    lifecycleStage: '成熟期',
    tier: 'A',
    contractEndDate: '2024-05-20',
    daysToExpiry: 95,
    renewalProbability: 85,
    renewalStage: '未开始',
    lastContactDate: '2024-01-10',
    nextActionDate: '2024-02-01',
    riskFactors: [],
    opportunities: ['合规模块升级', '多部门推广'],
    currentContractValue: 600000,
    proposedRenewalValue: 750000,
    renewalType: '扩容续约',
    keyStakeholders: [
      { name: '王行长', role: '行长', influence: 'high', attitude: 'supporter' },
      { name: '李副行长', role: '副行长', influence: 'high', attitude: 'supporter' }
    ],
    competitorThreat: 'none',
    renewalNotes: '客户满意度高，有明确的扩容计划',
    tags: ['优质客户', '扩容潜力', '合规需求']
  },
  {
    id: 'CUST-0005',
    name: '北京教育科技集团',
    industry: '教育培训',
    size: 'large',
    csm: '钱七',
    region: '华北',
    arr: 550000,
    healthScore: 70,
    healthLevel: '一般',
    lifecycleStage: '成熟期',
    tier: 'A',
    contractEndDate: '2024-06-30',
    daysToExpiry: 135,
    renewalProbability: 75,
    renewalStage: '未开始',
    lastContactDate: '2024-01-08',
    nextActionDate: '2024-02-15',
    riskFactors: ['行业政策变化'],
    opportunities: ['在线教育模块', '学员管理系统'],
    currentContractValue: 550000,
    proposedRenewalValue: 650000,
    renewalType: '扩容续约',
    keyStakeholders: [
      { name: '校长', role: '校长', influence: 'high', attitude: 'supporter' },
      { name: '教务主任', role: '教务主任', influence: 'medium', attitude: 'neutral' }
    ],
    competitorThreat: 'low',
    renewalNotes: '教育行业客户，对产品依赖度高，续约意愿强',
    tags: ['教育行业', '政策敏感', '扩容机会']
  }
];

// 续约合同数据
export const renewalContracts: RenewalContract[] = [
  {
    id: 'RENEWAL_CONTRACT_001',
    customerId: 'CUST-0001',
    contractNumber: 'RENEW-CONT-2024-001',
    currentValue: 800000,
    proposedValue: 900000,
    startDate: '2023-04-01',
    endDate: '2024-03-31',
    renewalStartDate: '2024-01-01',
    status: 'pending_renewal',
    products: ['企微版', '高级分析模块'],
    accountCount: 80,
    renewalHistory: [
      { year: '2023', value: 800000, status: 'renewed', notes: '首次续约，增加了分析模块' },
      { year: '2022', value: 600000, status: 'renewed', notes: '标准续约' }
    ]
  },
  {
    id: 'RENEWAL_CONTRACT_002',
    customerId: 'CUST-0002',
    contractNumber: 'RENEW-CONT-2024-002',
    currentValue: 1200000,
    proposedValue: 1500000,
    startDate: '2023-04-16',
    endDate: '2024-04-15',
    renewalStartDate: '2024-01-16',
    status: 'pending_renewal',
    products: ['D-learning', '定制模块', '高级支持'],
    accountCount: 150,
    renewalHistory: [
      { year: '2023', value: 1200000, status: 'upgraded', notes: '大幅扩容，增加定制功能' },
      { year: '2022', value: 800000, status: 'renewed', notes: '标准续约' }
    ]
  },
  {
    id: 'RENEWAL_CONTRACT_003',
    customerId: 'CUST-0003',
    contractNumber: 'RENEW-CONT-2024-003',
    currentValue: 450000,
    proposedValue: 300000,
    startDate: '2023-03-01',
    endDate: '2024-02-28',
    renewalStartDate: '2023-12-01',
    status: 'pending_renewal',
    products: ['直营-极简版'],
    accountCount: 45,
    renewalHistory: [
      { year: '2023', value: 450000, status: 'renewed', notes: '标准续约' },
      { year: '2022', value: 400000, status: 'renewed', notes: '小幅增长' }
    ]
  },
  {
    id: 'RENEWAL_CONTRACT_004',
    customerId: 'CUST-0004',
    contractNumber: 'RENEW-CONT-2024-004',
    currentValue: 600000,
    proposedValue: 750000,
    startDate: '2023-05-21',
    endDate: '2024-05-20',
    renewalStartDate: '2024-02-21',
    status: 'active',
    products: ['企微版', '合规模块'],
    accountCount: 60,
    renewalHistory: [
      { year: '2023', value: 600000, status: 'renewed', notes: '增加合规模块' },
      { year: '2022', value: 500000, status: 'renewed', notes: '标准续约' }
    ]
  },
  {
    id: 'RENEWAL_CONTRACT_005',
    customerId: 'CUST-0005',
    contractNumber: 'RENEW-CONT-2024-005',
    currentValue: 550000,
    proposedValue: 650000,
    startDate: '2023-07-01',
    endDate: '2024-06-30',
    renewalStartDate: '2024-04-01',
    status: 'active',
    products: ['D-learning', '学员管理系统'],
    accountCount: 55,
    renewalHistory: [
      { year: '2023', value: 550000, status: 'renewed', notes: '增加学员管理功能' },
      { year: '2022', value: 450000, status: 'renewed', notes: '标准续约' }
    ]
  }
];

// 续约管理统计数据
export const renewalStats = {
  totalCustomers: renewalCustomers.length,
  totalARR: renewalCustomers.reduce((sum, customer) => sum + customer.arr, 0),
  averageHealthScore: Math.round(renewalCustomers.reduce((sum, customer) => sum + customer.healthScore, 0) / renewalCustomers.length),
  renewalStageDistribution: {
    '未开始': renewalCustomers.filter(c => c.renewalStage === '未开始').length,
    '沟通中': renewalCustomers.filter(c => c.renewalStage === '沟通中').length,
    '方案制定': renewalCustomers.filter(c => c.renewalStage === '方案制定').length,
    '商务谈判': renewalCustomers.filter(c => c.renewalStage === '商务谈判').length,
    '合同签署': renewalCustomers.filter(c => c.renewalStage === '合同签署').length,
    '已完成': renewalCustomers.filter(c => c.renewalStage === '已完成').length,
    '已流失': renewalCustomers.filter(c => c.renewalStage === '已流失').length
  },
  healthDistribution: {
    '健康': renewalCustomers.filter(c => c.healthLevel === '健康').length,
    '一般': renewalCustomers.filter(c => c.healthLevel === '一般').length,
    '风险': renewalCustomers.filter(c => c.healthLevel === '风险').length
  },
  tierDistribution: {
    'S': renewalCustomers.filter(c => c.tier === 'S').length,
    'A': renewalCustomers.filter(c => c.tier === 'A').length,
    'B': renewalCustomers.filter(c => c.tier === 'B').length,
    'C': renewalCustomers.filter(c => c.tier === 'C').length
  },
  renewalTypeDistribution: {
    '标准续约': renewalCustomers.filter(c => c.renewalType === '标准续约').length,
    '扩容续约': renewalCustomers.filter(c => c.renewalType === '扩容续约').length,
    '降级续约': renewalCustomers.filter(c => c.renewalType === '降级续约').length
  }
};

// 续约风险分析
export const renewalRiskAnalysis = {
  highRiskCustomers: renewalCustomers.filter(c => c.renewalProbability < 50),
  mediumRiskCustomers: renewalCustomers.filter(c => c.renewalProbability >= 50 && c.renewalProbability < 80),
  lowRiskCustomers: renewalCustomers.filter(c => c.renewalProbability >= 80),
  urgentActions: renewalCustomers.filter(c => c.daysToExpiry <= 30),
  competitorThreats: renewalCustomers.filter(c => c.competitorThreat === 'high' || c.competitorThreat === 'medium')
};

export default {
  renewalCustomers,
  renewalContracts,
  renewalStats,
  renewalRiskAnalysis
};