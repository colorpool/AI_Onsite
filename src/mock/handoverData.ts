import { CustomerHandover, CRMSyncData, Stakeholder, OnboardingTask, InternalComment, HandoverStatus } from '../types/handover';
import { mockContracts, getPlatformType } from './continuousServiceData';

// 交接实施阶段客户类型定义
export interface Customer {
  id: string;
  name: string;
  industry: string;
  size: 'small' | 'medium' | 'large' | 'xlarge';
  csm: string;
  region: string;
  arr: number;
  healthScore: number;
  healthLevel: '健康' | '一般' | '风险';
  lifecycleStage: '成长期';
  tier: 'S' | 'A' | 'B' | 'C';
  signDate: string;
  tags: string[];
  collaborationEvents: number;
  channelType: 'direct' | 'partner' | 'reseller';
  isKeyAccount: boolean;
  isInRenewalWindow: boolean;
  visits90Days: number;
  revenue90Days: number;
  insights: Array<{
    id: string;
    content: string;
    date: string;
    type: string;
  }>;
  nextAction: {
    content: string;
    dueDate: string;
    overdue: boolean;
  };
}

// 根据平台类型获取已购产品
function getPurchasedProductsByPlatform(customerId: string): string[] {
  const platformType = getPlatformType(customerId);
  
  switch (platformType) {
    case 'dingtalk':
      return ['直营-极简版'];
    case 'dingtalk_hr':
      return ['智能人事-标准', '智能人事-专业版'];
    case 'wechat_work':
      return ['企微版'];
    case 'feishu':
      return ['飞书版'];
    case 'lark':
      return ['D-learning'];
    case 'dingtalk_global':
      return ['D-learning'];
    case 'standalone':
      return ['独立版'];
    default:
      return ['企业版SaaS平台', '数据分析模块', 'API集成服务'];
  }
}

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
    contact: 'zhangsan@company.com',
    status: 'active',
    history: [
      { position: '研发经理', startDate: '2020-01-01', endDate: '2022-06-30' },
      { position: '技术总监', startDate: '2022-07-01' }
    ]
  },
  {
    id: '2',
    name: '李四',
    position: '项目经理',
    role: 'user',
    contact: 'lisi@company.com',
    status: 'left',
    history: [
      { position: '实施顾问', startDate: '2021-03-01', endDate: '2022-12-31' },
      { position: '项目经理', startDate: '2023-01-01', endDate: '2024-03-31', note: '离职' }
    ]
  },
  {
    id: '3',
    name: '王五',
    position: '运维工程师',
    role: 'technical_contact',
    contact: 'wangwu@company.com',
    status: 'active',
    history: [
      { position: '初级运维', startDate: '2022-05-01', endDate: '2023-08-01' },
      { position: '运维工程师', startDate: '2023-08-02' }
    ]
  }
];

// 模拟Onboarding任务数据
export const mockOnboardingTasks: OnboardingTask[] = [
  {
    id: '1',
    title: '安排启动会议',
    completed: true,
    dueDate: '2024-01-15'
  },
  {
    id: '2',
    title: '完成账号开通和权限配置',
    completed: true,
    dueDate: '2024-01-16'
  },
  {
    id: '3',
    title: '系统环境配置和数据迁移',
    completed: true,
    dueDate: '2024-01-18'
  },
  {
    id: '4',
    title: '用户培训和操作指导',
    completed: false,
    dueDate: '2024-01-25'
  },
  {
    id: '5',
    title: '业务流程梳理和优化',
    completed: false,
    dueDate: '2024-01-28'
  },
  {
    id: '6',
    title: '系统集成测试和验收',
    completed: false,
    dueDate: '2024-02-01'
  },
  {
    id: '7',
    title: '正式上线和运行监控',
    completed: false,
    dueDate: '2024-02-05'
  }
];

// 模拟内部评论数据
export const mockInternalComments: InternalComment[] = [
  {
    id: '1',
    content: '客户对数据安全要求很高，建议安排安全专家参与启动会 @security_team',
    author: 'CSM-张明',
    createdAt: '2024-01-10 14:30:00',
    mentions: ['security_team']
  },
  {
    id: '2',
    content: '已联系技术团队，确认可以满足客户的合规要求，预计下周完成环境配置',
    author: 'CSM-李华',
    createdAt: '2024-01-11 09:15:00'
  },
  {
    id: '3',
    content: '启动会议进行顺利，客户技术团队配合度很高，已确定培训计划',
    author: 'CSM-张明',
    createdAt: '2024-01-15 16:20:00'
  },
  {
    id: '4',
    content: '账号开通完成，权限配置已按客户需求调整，等待客户确认',
    author: '技术支持-王工',
    createdAt: '2024-01-16 11:45:00'
  },
  {
    id: '5',
    content: '数据迁移测试通过，客户对系统响应速度表示满意',
    author: '实施顾问-刘强',
    createdAt: '2024-01-18 14:30:00'
  },
  {
    id: '6',
    content: '下周安排用户培训，已准备培训材料和演示环境',
    author: 'CSM-张明',
    createdAt: '2024-01-20 10:00:00'
  }
];

// 模拟客户数据 - 交接实施阶段专用 (使用HANDOVER-前缀)
export const mockCustomers: Customer[] = [
  {
    id: 'CUST-0001',
    name: '北京科技创新有限公司',
    industry: '科技',
    size: 'large',
    csm: '张明',
    region: '华北',
    arr: 1200000,
    healthScore: 92,
    healthLevel: '健康',
    lifecycleStage: '成长期',
    tier: 'S',
    signDate: '2023-03-15',
    tags: ['重点客户', '技术驱动'],
    collaborationEvents: 15,
    channelType: 'direct',
    isKeyAccount: true,
    isInRenewalWindow: false,
    visits90Days: 12,
    revenue90Days: 300000,
    insights: [
      {
        id: 'insight-001',
        content: '客户对新功能使用率较高，建议加强培训支持',
        date: '2024-01-15',
        type: 'usage'
      }
    ],
    nextAction: {
      content: '准备季度业务回顾会议',
      dueDate: '2024-02-01',
      overdue: false
    }
  },
  {
    id: 'CUST-0002',
    name: '武汉智能制造有限公司',
    industry: '制造业',
    size: 'large',
    csm: '李明',
    region: '华中',
    arr: 800000,
    healthScore: 90,
    healthLevel: '健康',
    lifecycleStage: '成长期',
    tier: 'S',
    signDate: '2024-01-10',
    tags: ['制造业', '智能化', '重点客户'],
    collaborationEvents: 5,
    channelType: 'direct',
    isKeyAccount: true,
    isInRenewalWindow: false,
    visits90Days: 8,
    revenue90Days: 200000,
    insights: [
      {
        id: 'insight_h002_001',
        content: '客户对智能制造解决方案非常感兴趣',
        date: '2024-01-12',
        type: 'positive'
      }
    ],
    nextAction: {
      content: '安排制造业专家进行深度培训',
      dueDate: '2024-01-28',
      overdue: false
    }
  },
  {
    id: 'CUST-0003',
    name: '深圳金融科技有限公司',
    industry: '金融',
    size: 'large',
    csm: '王芳',
    region: '华北',
    arr: 600000,
    healthScore: 80,
    healthLevel: '健康',
    lifecycleStage: '成长期',
    tier: 'A',
    signDate: '2024-01-08',
    tags: ['金融科技', '重点客户', '数字化转型'],
    collaborationEvents: 4,
    channelType: 'partner',
    isKeyAccount: true,
    isInRenewalWindow: false,
    visits90Days: 6,
    revenue90Days: 150000,
    insights: [
      {
        id: 'insight_h003_001',
        content: '金融行业对数据安全和合规性要求极高',
        date: '2024-01-09',
        type: 'requirement'
      }
    ],
    nextAction: {
      content: '制定金融合规和安全方案',
      dueDate: '2024-01-30',
      overdue: false
    }
  },
  {
    id: 'CUST-0010',
    name: '西安航空航天有限公司',
    industry: '航空航天',
    size: 'xlarge',
    csm: '郑涛',
    region: '西北',
    arr: 1100000,
    healthScore: 76,
    healthLevel: '健康',
    lifecycleStage: '成长期',
    tier: 'S',
    signDate: '2024-01-08',
    tags: ['航空航天', '军工', '重点客户'],
    collaborationEvents: 3,
    channelType: 'direct',
    isKeyAccount: true,
    isInRenewalWindow: false,
    visits90Days: 4,
    revenue90Days: 275000,
    insights: [
      {
        id: 'insight_h010_001',
        content: '客户对系统安全性要求极高，需要定制化配置',
        date: '2024-01-10',
        type: 'requirement'
      }
    ],
    nextAction: {
      content: '安排安全合规专家评估',
      dueDate: '2024-02-05',
      overdue: false
    }
  }
];

// 模拟客户交接列表数据
export const mockCustomerHandovers: CustomerHandover[] = [
  {
    id: '1',
    handoverNumber: 'HO-2024-001',
    customerId: 'CUST-0001',
    contractId: 'contract_001',
    contractNumber: 'CONT-2024-001',
    customerName: '北京科技创新有限公司',
    handoverStatus: 'implementation_in_progress',
    riskLevel: 'low',
    hasHandoverDocument: true,
    hasRiskAlert: false,
    stakeholderCount: 5,
    expectationAlignment: 'aligned',
    handoverRating: 4.5,
    handoverComment: '服务专业，响应及时',
    createdAt: '2024-01-10 10:00:00',
    updatedAt: '2024-01-15 16:30:00',
    salesCreatedAt: '2024-01-05 14:20:00',
    crmData: {
      ...mockCRMSyncData,
      purchasedProducts: getPurchasedProductsByPlatform('CUST-0001')
    },
    stakeholders: mockStakeholders,
    onboardingTasks: mockOnboardingTasks,
    internalComments: mockInternalComments,
    corePainPoints: '1. 原有培训效率低下，无法满足快速发展需求；2. 缺乏统一的培训管理平台，数据分散；3. 无法有效统计和分析员工学习数据；4. 线下培训成本高，覆盖面有限',
    shortTermExpectation: '1. 员工平台使用率达到80%以上；2. 完成新员工入职培训全覆盖；3. 解决线下培训数据统计难题',
    longTermExpectation: '1. 通过平台赋能30%培训成本；2. 员工技能达标率提升20%；3. 形成企业内部知识库，支持知识沉淀',
    unacceptableSituations: '1. 系统频繁宕机影响业务；2. 数据安全出现重大漏洞；3. 培训效果无法量化评估',
    customerSuccessCriteria: '1. 系统稳定性达到99.9%；2. 用户满意度评分4.5分以上；3. 培训完成率达到95%以上',
    risks: [
      {
        type: 'leadership',
        description: '技术总监张三即将离职，可能影响项目推进'
      },
      {
        type: 'unclear_needs',
        description: '客户对数据分析模块的具体需求还不够明确'
      }
    ],
    opportunities: [
      {
        type: 'account_expansion',
        description: '客户表示有意向增购50个账号'
      },
      {
        type: 'version_upgrade',
        description: '客户对企业版功能很感兴趣，有升级意向'
      },
      {
        type: 'referrals',
        description: '客户愿意推荐给同行业的合作伙伴'
      }
    ]
  },
  {
    id: '2',
    handoverNumber: 'HO-2024-002',
    customerId: 'CUST-0002',
    contractId: 'contract_003',
    contractNumber: 'CONT-2023-045',
    customerName: '上海智能制造集团',
    handoverStatus: 'pending_handover',
    riskLevel: 'medium',
    hasHandoverDocument: false,
    hasRiskAlert: true,
    stakeholderCount: 3,
    expectationAlignment: 'partially_aligned',
    handoverRating: 3.8,
    handoverComment: '需要进一步沟通客户需求',
    createdAt: '2024-01-12 14:20:00',
    updatedAt: '2024-01-14 11:45:00',
    salesCreatedAt: '2024-01-08 09:15:00',
    crmData: {
      ...mockCRMSyncData,
      accountCount: 25,
      salesSource: 'channel',
      channelPartner: '上海渠道合作伙伴有限公司',
      purchasedProducts: getPurchasedProductsByPlatform('CUST-0002')
    },
    stakeholders: [
      {
        id: '4',
        name: '赵六',
        position: '产品经理',
        role: 'decision_maker',
        contact: 'zhaoliu@company.com',
        status: 'active',
        history: [
          { position: '资深产品', startDate: '2021-07-01', endDate: '2023-06-30' },
          { position: '产品经理', startDate: '2023-07-01' }
        ]
      },
      {
        id: '5',
        name: '钱七',
        position: '开发工程师',
        role: 'user',
        contact: 'qianqi@company.com',
        status: 'active'
      }
    ],
    onboardingTasks: mockOnboardingTasks,
    internalComments: mockInternalComments,
    corePainPoints: '1. 现有系统老旧，维护成本高；2. 业务流程不规范，效率低下；3. 数据孤岛严重，无法形成有效分析；4. 人工操作繁琐，容易出错',
    shortTermExpectation: '1. 快速完成系统集成；2. 团队熟练掌握基础功能；3. 建立标准化操作流程',
    longTermExpectation: '1. 实现业务流程全面数字化；2. 提升工作效率30%；3. 建立数据驱动的决策体系',
    unacceptableSituations: '1. 系统响应时间超过5秒；2. 数据丢失或错误；3. 用户体验差导致抵触情绪',
    customerSuccessCriteria: '1. 系统正常运行率99%以上；2. 用户培训通过率90%以上；3. 业务指标提升可量化'
  },
  {
    id: '0003',
    handoverNumber: 'HO-2024-003',
    customerId: 'CUST-0003',
    contractId: 'contract_004',
    contractNumber: 'CONT-2022-008',
    customerName: '深圳金融科技有限公司',
    handoverStatus: 'handover_in_progress',
    riskLevel: 'high',
    hasHandoverDocument: true,
    hasRiskAlert: true,
    stakeholderCount: 7,
    expectationAlignment: 'not_aligned',
    handoverRating: 2.5,
    handoverComment: '客户期望与产品功能存在较大差距',
    createdAt: '2024-01-08 09:30:00',
    updatedAt: '2024-01-13 15:20:00',
    salesCreatedAt: '2024-01-03 11:45:00',
    crmData: {
      ...mockCRMSyncData,
      accountCount: 100,
      salesSource: 'direct',
      salesPerson: '李销售',
      purchasedProducts: getPurchasedProductsByPlatform('CUST-0003')
    },
    stakeholders: [
      {
        id: '6',
        name: '孙八',
        position: '技术总监',
        role: 'decision_maker',
        contact: 'sunba@company.com',
        status: 'active'
      },
      {
        id: '7',
        name: '周九',
        position: '项目经理',
        role: 'influencer',
        contact: 'zhoujiu@company.com',
        status: 'active',
        history: [
          { position: '实施顾问', startDate: '2020-09-01', endDate: '2022-12-31' },
          { position: '项目经理', startDate: '2023-01-01' }
        ]
      },
      {
        id: '8',
        name: '吴十',
        position: '运维工程师',
        role: 'technical_contact',
        contact: 'wushi@company.com',
        status: 'left',
        history: [
          { position: '运维工程师', startDate: '2022-01-01', endDate: '2024-05-31', note: '离职' }
        ]
      }
    ],
    onboardingTasks: mockOnboardingTasks,
    internalComments: mockInternalComments,
    corePainPoints: '1. 客户期望与产品功能存在较大差距；2. 技术团队对新系统接受度不高；3. 现有业务流程复杂，改造难度大；4. 预算有限，需要快速见效',
    shortTermExpectation: '1. 解决当前业务痛点；2. 提升团队协作效率；3. 建立规范化管理流程',
    longTermExpectation: '1. 成为行业数字化标杆；2. 实现智能化运营管理；3. 支撑业务快速扩张',
    unacceptableSituations: '1. 影响现有业务正常运行；2. 增加员工工作负担；3. 投资回报率低于预期',
    customerSuccessCriteria: '1. 关键业务指标提升15%以上；2. 员工工作效率提升25%；3. 客户满意度保持在4.0以上',
    risks: [
      {
        type: 'high_expectations',
        description: '客户对产品功能期待值过高，可能导致满意度下降'
      },
      {
        type: 'tight_schedule',
        description: '客户要求快速上线，时间压力较大'
      }
    ],
    opportunities: [
      {
        type: 'version_upgrade',
        description: '客户对高级功能感兴趣，有升级潜力'
      },
      {
        type: 'new_modules',
        description: '客户提到可能需要采购额外的数据分析模块'
      }
    ]
  },
  {
    id: '4',
    handoverNumber: 'HO-2024-004',
    customerId: 'CUST-0005',
    contractId: 'contract_007',
    contractNumber: 'CONT-2023-089',
    customerName: '杭州互联网科技有限公司',
    handoverStatus: 'pending_implementation',
    riskLevel: 'low',
    hasHandoverDocument: true,
    hasRiskAlert: false,
    stakeholderCount: 4,
    expectationAlignment: 'aligned',
    handoverRating: 4.2,
    handoverComment: '客户满意度较高，服务响应及时',
    createdAt: '2024-01-09 16:00:00',
    updatedAt: '2024-01-16 10:30:00',
    salesCreatedAt: '2024-01-04 13:20:00',
    crmData: {
      ...mockCRMSyncData,
      accountCount: 35,
      salesSource: 'direct',
      salesPerson: '张销售',
      purchasedProducts: getPurchasedProductsByPlatform('CUST-0005')
    },
    stakeholders: [
      {
        id: '9',
        name: '郑十一',
        position: '技术总监',
        role: 'decision_maker',
        contact: 'zhengshiyi@company.com',
        status: 'active'
      },
      {
        id: '10',
        name: '王十二',
        position: '产品经理',
        role: 'user',
        contact: 'wangshier@company.com',
        status: 'active'
      }
    ],
    onboardingTasks: mockOnboardingTasks,
    internalComments: mockInternalComments,
    corePainPoints: '1. 客户服务响应速度慢，影响用户体验；2. 数据分析能力不足，无法支撑决策；3. 系统集成度低，操作繁琐；4. 缺乏有效的用户行为分析工具',
    shortTermExpectation: '1. 系统稳定上线运行；2. 核心用户快速上手；3. 基础数据完整迁移',
    longTermExpectation: '1. 全面提升客户服务质量；2. 实现精细化运营管理；3. 支持业务创新发展',
    unacceptableSituations: '1. 系统不稳定影响业务；2. 学习成本过高；3. 无法满足个性化需求',
    customerSuccessCriteria: '1. 系统可用性达到99.5%；2. 用户活跃度达到85%；3. 客户服务效率提升20%',
    risks: [
      {
        type: 'high_expectations',
        description: '系统集成复杂度较高，可能影响上线时间'
      },
      {
        type: 'unclear_needs',
        description: '用户对新系统接受度需要时间培养'
      }
    ],
    opportunities: [
      {
        type: 'version_upgrade',
        description: '客户服务流程优化有很大提升空间'
      },
      {
        type: 'new_modules',
        description: '数据分析能力提升可以带来更多商业价值'
      }
    ]
  },
  {
    id: '5',
    handoverNumber: 'HO-2024-005',
    customerId: 'CUST-0006',
    contractId: 'contract_009',
    contractNumber: 'CONT-2024-010',
    customerName: '成都软件开发有限公司',
    handoverStatus: 'pending_handover',
    riskLevel: 'medium',
    hasHandoverDocument: false,
    hasRiskAlert: true,
    stakeholderCount: 6,
    expectationAlignment: 'partially_aligned',
    handoverRating: 3.6,
    handoverComment: '需要加强技术支持和培训',
    createdAt: '2024-01-11 11:00:00',
    updatedAt: '2024-01-17 14:15:00',
    salesCreatedAt: '2024-01-06 15:30:00',
    crmData: {
      ...mockCRMSyncData,
      accountCount: 45,
      salesSource: 'channel',
      channelPartner: '成都渠道合作伙伴有限公司',
      purchasedProducts: getPurchasedProductsByPlatform('CUST-0006')
    },
    stakeholders: [
      {
        id: '11',
        name: '李十三',
        position: '技术总监',
        role: 'decision_maker',
        contact: 'lishisan@company.com',
        status: 'active'
      },
      {
        id: '12',
        name: '刘十四',
        position: '项目经理',
        role: 'influencer',
        contact: 'liushisi@company.com',
        status: 'active'
      }
    ],
    onboardingTasks: mockOnboardingTasks,
    internalComments: mockInternalComments,
    corePainPoints: '1. 团队技术能力参差不齐，培训需求多样化；2. 现有知识管理混乱，查找困难；3. 缺乏系统化的学习路径；4. 员工学习积极性不高，需要激励机制',
    shortTermExpectation: '1. 完成团队培训；2. 建立使用规范；3. 实现基本功能应用',
    longTermExpectation: '1. 打造学习型组织；2. 实现知识管理体系化；3. 提升企业竞争力',
    unacceptableSituations: '1. 培训效果不达标；2. 系统操作复杂；3. 技术支持响应慢',
    customerSuccessCriteria: '1. 培训覆盖率100%；2. 系统使用满意度4.5分以上；3. 业务流程优化效果明显',
    risks: [
      {
        type: 'tight_schedule',
        description: '团队技术能力参差不齐，培训周期可能延长'
      },
      {
        type: 'unclear_needs',
        description: '学习积极性不高，需要建立有效激励机制'
      }
    ],
    opportunities: [
      {
        type: 'account_expansion',
        description: '培训效果好可以推广到更多部门'
      },
      {
        type: 'long_term',
        description: '建立学习型组织有助于长期合作'
      }
    ]
  },
  {
    id: '6',
    handoverNumber: 'HO-2024-006',
    customerId: 'CUST-0010',
    contractId: 'contract_010',
    contractNumber: 'CONT-2024-015',
    customerName: '西安航空航天有限公司',
    handoverStatus: 'implementation_in_progress',
    riskLevel: 'low',
    hasHandoverDocument: true,
    hasRiskAlert: false,
    stakeholderCount: 6,
    expectationAlignment: 'aligned',
    handoverRating: 4.3,
    handoverComment: '客户技术实力强，配合度高',
    createdAt: '2024-01-08 13:20:00',
    updatedAt: '2024-01-25 12:45:00',
    salesCreatedAt: '2024-01-05 16:30:00',
    crmData: {
      ...mockCRMSyncData,
      contractAmount: 1100000,
      accountCount: 120,
      salesSource: 'direct',
      salesPerson: '郑销售',
      purchasedProducts: getPurchasedProductsByPlatform('CUST-0010')
    },
    stakeholders: [
      {
        id: '16',
        name: '张航空',
        position: '技术总监',
        role: 'decision_maker',
        contact: 'zhanghangkong@xaero.com',
        status: 'active'
      },
      {
        id: '17',
        name: '李航天',
        position: '项目经理',
        role: 'user',
        contact: 'lihangtian@xaero.com',
        status: 'active'
      },
      {
        id: '18',
        name: '王工程',
        position: '系统工程师',
        role: 'technical_contact',
        contact: 'wanggongcheng@xaero.com',
        status: 'active'
      }
    ],
    onboardingTasks: mockOnboardingTasks,
    internalComments: mockInternalComments,
    corePainPoints: '1. 航空航天行业对系统稳定性要求极高；2. 需要满足严格的安全合规要求；3. 技术团队对新系统接受度需要时间；4. 现有流程复杂，需要定制化配置',
    shortTermExpectation: '1. 系统稳定上线运行；2. 满足行业合规要求；3. 核心团队熟练掌握系统操作',
    longTermExpectation: '1. 提升研发效率和质量；2. 建立标准化的项目管理流程；3. 支撑企业数字化转型',
    unacceptableSituations: '1. 系统安全漏洞；2. 影响关键项目进度；3. 不符合行业标准要求',
    customerSuccessCriteria: '1. 系统安全性达到军工级标准；2. 项目管理效率提升25%；3. 用户满意度达到4.5分以上',
    risks: [
      {
        type: 'high_expectations',
        description: '航空航天行业对系统稳定性要求极高'
      },
      {
        type: 'tight_schedule',
        description: '严格的安全合规要求可能影响实施进度'
      }
    ],
    opportunities: [
      {
        type: 'referrals',
        description: '航空航天行业标杆客户，有转介绍潜力'
      },
      {
        type: 'version_upgrade',
        description: '定制化需求可能带来高级版本升级机会'
      }
    ]
  },
  {
    id: '7',
    handoverNumber: 'HO-2024-007',
    customerId: 'CUST-0004',
    contractId: 'contract_006',
    contractNumber: 'CONT-2023-120',
    customerName: '广州数字化企业服务有限公司',
    handoverStatus: 'implementation_in_progress',
    riskLevel: 'low',
    hasHandoverDocument: true,
    hasRiskAlert: false,
    stakeholderCount: 8,
    expectationAlignment: 'aligned',
    handoverRating: 4.8,
    handoverComment: '客户对服务非常满意，续约意愿强烈',
    createdAt: '2024-01-07 13:00:00',
    updatedAt: '2024-01-18 09:45:00',
    salesCreatedAt: '2024-01-02 10:15:00',
    crmData: {
      ...mockCRMSyncData,
      accountCount: 80,
      salesSource: 'direct',
      salesPerson: '陈销售',
      purchasedProducts: getPurchasedProductsByPlatform('CUST-0004')
    },
    stakeholders: [
      {
        id: '13',
        name: '黄十五',
        position: '技术总监',
        role: 'decision_maker',
        contact: 'huangshiwu@company.com',
        status: 'active'
      },
      {
        id: '14',
        name: '赵十六',
        position: '产品经理',
        role: 'user',
        contact: 'zhaoshiliu@company.com',
        status: 'active'
      },
      {
        id: '15',
        name: '孙十七',
        position: '运维工程师',
        role: 'technical_contact',
        contact: 'sunshiqi@company.com',
        status: 'active'
      }
    ],
    onboardingTasks: mockOnboardingTasks,
    internalComments: mockInternalComments,
    corePainPoints: '1. 数字化转型进度缓慢，竞争优势不明显；2. 各部门协作效率低，信息传递不畅；3. 客户需求响应速度慢；4. 缺乏数据驱动的业务优化能力',
    shortTermExpectation: '1. 快速实现投资回报；2. 团队高效协作；3. 客户满意度提升',
    longTermExpectation: '1. 成为数字化转型典范；2. 实现可持续发展；3. 建立行业领先优势',
    unacceptableSituations: '1. 投资回报周期过长；2. 员工适应困难；3. 服务质量下降',
    customerSuccessCriteria: '1. ROI在12个月内实现；2. 员工满意度保持4.8分以上；3. 客户续约率达到95%以上',
    risks: [
      {
        type: 'leadership',
        description: '数字化转型需要高层持续支持和推动'
      },
      {
        type: 'other_risks',
        description: '各部门协作效率提升需要时间磨合'
      }
    ],
    opportunities: [
      {
        type: 'account_expansion',
        description: '数字化转型成功可推广到集团其他公司'
      },
      {
        type: 'long_term',
        description: '客户满意度高，续约意愿强烈'
      }
    ]
  }
];
