import { CustomerHandover, CRMSyncData, Stakeholder, OnboardingTask, InternalComment, HandoverStatus } from '../types/handover';
import { mockContracts, getPlatformType } from './continuousServiceData';

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
    handoverNumber: 'HO-2024-001',
    customerId: 'CUST-0001',
    contractId: 'contract_001',
    contractNumber: 'CONT-2024-001',
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
    customerSuccessCriteria: '1. 系统稳定性达到99.9%；2. 用户满意度评分4.5分以上；3. 培训完成率达到95%以上'
  },
  {
    id: '2',
    handoverNumber: 'HO-2024-002',
    customerId: 'CUST-0002',
    contractId: 'contract_003',
    contractNumber: 'CONT-2023-045',
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
    id: '3',
    handoverNumber: 'HO-2024-003',
    customerId: 'CUST-0003',
    contractId: 'contract_004',
    contractNumber: 'CONT-2022-008',
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
    customerSuccessCriteria: '1. 关键业务指标提升15%以上；2. 员工工作效率提升25%；3. 客户满意度保持在4.0以上'
  },
  {
    id: '4',
    handoverNumber: 'HO-2024-004',
    customerId: 'CUST-0005',
    contractId: 'contract_007',
    contractNumber: 'CONT-2023-089',
    customerName: '杭州互联网科技有限公司',
    handoverStatus: 'normal',
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
    customerSuccessCriteria: '1. 系统可用性达到99.5%；2. 用户活跃度达到85%；3. 客户服务效率提升20%'
  },
  {
    id: '5',
    handoverNumber: 'HO-2024-005',
    customerId: 'CUST-0006',
    contractId: 'contract_009',
    contractNumber: 'CONT-2024-010',
    customerName: '成都软件开发有限公司',
    handoverStatus: 'not_handover',
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
    customerSuccessCriteria: '1. 培训覆盖率100%；2. 系统使用满意度4.5分以上；3. 业务流程优化效果明显'
  },
  {
    id: '6',
    handoverNumber: 'HO-2024-006',
    customerId: 'CUST-0004',
    contractId: 'contract_006',
    contractNumber: 'CONT-2023-120',
    customerName: '广州数字化企业服务有限公司',
    handoverStatus: 'normal',
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
    customerSuccessCriteria: '1. ROI在12个月内实现；2. 员工满意度保持4.8分以上；3. 客户续约率达到95%以上'
  }
];
