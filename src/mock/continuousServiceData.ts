import {
  Customer,
  Contract,
  HandoverRecord,
  ValueBoard,
  QBRMeeting,
  RiskEvent,
  ServicePlaybook,
  KeyAction,
  ServiceOverview,
  ValueKPI,
  Achievement,
  PlaybookTask,
  ActionType,
  HealthLevel,
  LifecycleStage,
  CustomerTier,
  TodoTask,
  PlaybookExecution,
  PlaybookRecommendation,
  ContactInfo
} from '../types/continuousService';

// 模拟合同数据
export const mockContracts: Contract[] = [
  // 北京科技有限公司的合同历史
  {
    id: 'contract_001',
    contractNumber: 'CONT-2023-001',
    customerId: 'CUST-0001',
    contractType: 'new',
    amount: 500000,
    startDate: '2023-06-01',
    endDate: '2024-05-31',
    status: 'active',
    servicePeriod: '2023-06-01 至 2024-05-31',
    purchasedProducts: ['直营-极简版'],
    accountCount: 50,
    salesSource: 'direct',
    salesPerson: '王销售',
    createdAt: '2023-05-15',
    updatedAt: '2023-06-01'
  },
  // 上海智能科技有限公司的合同历史
  {
    id: 'contract_002',
    contractNumber: 'CONT-2022-015',
    customerId: 'CUST-0002',
    contractType: 'new',
    amount: 600000,
    startDate: '2022-09-01',
    endDate: '2023-08-31',
    status: 'expired',
    servicePeriod: '2022-09-01 至 2023-08-31',
    purchasedProducts: ['企微版'],
    accountCount: 30,
    salesSource: 'channel',
    channelPartner: '上海渠道合作伙伴有限公司',
    createdAt: '2022-08-15',
    updatedAt: '2023-08-31'
  },
  {
    id: 'contract_003',
    contractNumber: 'CONT-2023-045',
    customerId: 'CUST-0002',
    contractType: 'renewal',
    amount: 800000,
    startDate: '2023-09-01',
    endDate: '2024-08-31',
    status: 'active',
    servicePeriod: '2023-09-01 至 2024-08-31',
    purchasedProducts: ['企微版'],
    accountCount: 40,
    salesSource: 'direct',
    salesPerson: '李销售',
    createdAt: '2023-08-10',
    updatedAt: '2023-09-01'
  },
  // 深圳创新科技有限公司的合同历史
  {
    id: 'contract_004',
    contractNumber: 'CONT-2022-008',
    customerId: 'CUST-0003',
    contractType: 'new',
    amount: 400000,
    startDate: '2022-07-01',
    endDate: '2023-06-30',
    status: 'expired',
    servicePeriod: '2022-07-01 至 2023-06-30',
    purchasedProducts: ['飞书版'],
    accountCount: 20,
    salesSource: 'direct',
    salesPerson: '张销售',
    createdAt: '2022-06-15',
    updatedAt: '2023-06-30'
  },
  {
    id: 'contract_005',
    contractNumber: 'CONT-2023-078',
    customerId: 'CUST-0003',
    contractType: 'renewal',
    amount: 300000,
    startDate: '2023-07-01',
    endDate: '2024-06-30',
    status: 'active',
    servicePeriod: '2023-07-01 至 2024-06-30',
    purchasedProducts: ['飞书版'],
    accountCount: 15,
    salesSource: 'direct',
    salesPerson: '张销售',
    createdAt: '2023-06-10',
    updatedAt: '2023-07-01'
  },
  // 广州数字化企业的合同历史
  {
    id: 'contract_006',
    contractNumber: 'CONT-2023-120',
    customerId: 'CUST-0004',
    contractType: 'new',
    amount: 1200000,
    startDate: '2023-10-01',
    endDate: '2025-09-30',
    status: 'active',
    servicePeriod: '2023-10-01 至 2025-09-30',
    purchasedProducts: ['D-learning'],
    accountCount: 100,
    salesSource: 'direct',
    salesPerson: '陈销售',
    createdAt: '2023-09-15',
    updatedAt: '2023-10-01'
  },
  // 杭州互联网公司的合同历史
  {
    id: 'contract_007',
    contractNumber: 'CONT-2023-089',
    customerId: 'CUST-0005',
    contractType: 'new',
    amount: 450000,
    startDate: '2023-06-01',
    endDate: '2024-05-31',
    status: 'active',
    servicePeriod: '2023-06-01 至 2024-05-31',
    purchasedProducts: ['D-learning'],
    accountCount: 35,
    salesSource: 'direct',
    salesPerson: '刘销售',
    createdAt: '2023-05-20',
    updatedAt: '2023-06-01'
  },
  // 成都软件开发公司的合同历史（断约后重签的例子）
  {
    id: 'contract_008',
    contractNumber: 'CONT-2021-045',
    customerId: 'CUST-0006',
    contractType: 'new',
    amount: 350000,
    startDate: '2021-09-01',
    endDate: '2022-08-31',
    status: 'terminated',
    servicePeriod: '2021-09-01 至 2022-08-31',
    purchasedProducts: ['独立版'],
    accountCount: 25,
    salesSource: 'channel',
    channelPartner: '成都渠道合作伙伴有限公司',
    createdAt: '2021-08-15',
    updatedAt: '2022-06-15'
  },
  {
    id: 'contract_009',
    contractNumber: 'CONT-2024-010',
    customerId: 'CUST-0006',
    contractType: 'new',
    amount: 200000,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'active',
    servicePeriod: '2024-01-01 至 2024-12-31',
    purchasedProducts: ['独立版'],
    accountCount: 20,
    salesSource: 'direct',
    salesPerson: '赵销售',
    createdAt: '2023-12-15',
    updatedAt: '2024-01-01'
  }
];

// 模拟交接单记录
export const mockHandoverRecords: HandoverRecord[] = [
  {
    id: 'handover_001',
    handoverNumber: 'HAND-2023-001',
    customerId: 'CUST-0001',
    contractId: 'contract_001',
    status: 'completed',
    createdAt: '2023-05-20',
    completedAt: '2023-06-15',
    archivedAt: '2023-06-20'
  },
  {
    id: 'handover_002',
    handoverNumber: 'HAND-2022-015',
    customerId: 'CUST-0002',
    contractId: 'contract_002',
    status: 'archived',
    createdAt: '2022-08-20',
    completedAt: '2022-09-15',
    archivedAt: '2022-09-20'
  },
  {
    id: 'handover_003',
    handoverNumber: 'HAND-2023-045',
    customerId: 'CUST-0002',
    contractId: 'contract_003',
    status: 'completed',
    createdAt: '2023-08-15',
    completedAt: '2023-09-10',
    archivedAt: '2023-09-15'
  },
  {
    id: 'handover_004',
    handoverNumber: 'HAND-2022-008',
    customerId: 'CUST-0003',
    contractId: 'contract_004',
    status: 'archived',
    createdAt: '2022-06-20',
    completedAt: '2022-07-15',
    archivedAt: '2022-07-20'
  },
  {
    id: 'handover_005',
    handoverNumber: 'HAND-2023-078',
    customerId: 'CUST-0003',
    contractId: 'contract_005',
    status: 'completed',
    createdAt: '2023-06-15',
    completedAt: '2023-07-10',
    archivedAt: '2023-07-15'
  },
  {
    id: 'handover_006',
    handoverNumber: 'HAND-2023-120',
    customerId: 'CUST-0004',
    contractId: 'contract_006',
    status: 'completed',
    createdAt: '2023-09-20',
    completedAt: '2023-10-15',
    archivedAt: '2023-10-20'
  },
  {
    id: 'handover_007',
    handoverNumber: 'HAND-2023-089',
    customerId: 'CUST-0005',
    contractId: 'contract_007',
    status: 'completed',
    createdAt: '2023-05-25',
    completedAt: '2023-06-10',
    archivedAt: '2023-06-15'
  },
  {
    id: 'handover_008',
    handoverNumber: 'HAND-2021-045',
    customerId: 'CUST-0006',
    contractId: 'contract_008',
    status: 'archived',
    createdAt: '2021-08-20',
    completedAt: '2021-09-15',
    archivedAt: '2021-09-20'
  },
  {
    id: 'handover_009',
    handoverNumber: 'HAND-2024-010',
    customerId: 'CUST-0006',
    contractId: 'contract_009',
    status: 'completed',
    createdAt: '2023-12-20',
    completedAt: '2024-01-15',
    archivedAt: '2024-01-20'
  }
];

// 模拟待办任务数据
export const mockTodoTasks: TodoTask[] = [
  {
    id: 'todo_001',
    title: '客户回访 - 北京科技有限公司',
    description: '定期回访，了解系统使用情况和满意度',
    type: 'business-review',
    status: 'pending',
    priority: 'high',
    dueDate: '2024-01-20',
    assignedTo: '张伟',
    customerId: 'CUST-0001',
    customerName: '北京科技有限公司',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 'todo_002',
    title: '续约谈判准备 - 上海智能科技',
    description: '准备续约材料，安排续约谈判会议',
    type: 'renewal',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2024-01-25',
    assignedTo: '李明',
    customerId: 'CUST-0002',
    customerName: '上海智能科技有限公司',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18'
  },
  {
    id: 'todo_003',
    title: '风险处理 - 深圳创新科技',
    description: '处理客户满意度下降问题，制定改进方案',
    type: 'follow-up',
    status: 'pending',
    priority: 'high',
    dueDate: '2024-01-22',
    assignedTo: '王芳',
    customerId: 'CUST-0003',
    customerName: '深圳创新科技有限公司',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12'
  },
  {
    id: 'todo_004',
    title: 'QBR会议安排 - 广州数字化企业',
    description: '安排Q1季度业务回顾会议',
    type: 'meeting',
    status: 'pending',
    priority: 'medium',
    dueDate: '2024-01-30',
    assignedTo: '张伟',
    customerId: 'CUST-0004',
    customerName: '广州数字化企业',
    createdAt: '2024-01-16',
    updatedAt: '2024-01-16'
  },
  {
    id: 'todo_005',
    title: '培训安排 - 杭州互联网公司',
    description: '安排新功能培训，提升用户使用率',
    type: 'training',
    status: 'completed',
    priority: 'medium',
    dueDate: '2024-01-15',
    assignedTo: '李明',
    customerId: 'CUST-0005',
    customerName: '杭州互联网公司',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-15',
    completedAt: '2024-01-15'
  },
  {
    id: 'todo_006',
    title: '系统优化跟进 - 成都软件开发',
    description: '跟进系统使用率提升方案的执行情况',
    type: 'follow-up',
    status: 'overdue',
    priority: 'high',
    dueDate: '2024-01-10',
    assignedTo: '王芳',
    customerId: 'CUST-0006',
    customerName: '成都软件开发公司',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  }
];

// 模拟客户档案数据（全生命周期）
// 客户历史记录类型定义
export interface CustomerHistoryItem {
  date: string;
  type: string;
  description: string;
  icon: string;
  color: string;
}

// 模拟客户历史记录数据
export const mockCustomerHistory: Record<string, CustomerHistoryItem[]> = {
  'CUST-0001': [
    {
      date: '2024-01-28',
      type: '客户拜访',
      description: '进行季度回访，了解系统使用情况',
      icon: 'UserOutlined',
      color: '#1890ff'
    },
    {
      date: '2024-01-20',
      type: '健康分提升',
      description: '客户健康分从80提升到85',
      icon: 'RiseOutlined',
      color: '#52c41a'
    },
    {
      date: '2024-01-15',
      type: '技术支持',
      description: '协助客户完成系统升级',
      icon: 'SettingOutlined',
      color: '#52c41a'
    }
  ],
  'CUST-0002': [
    {
      date: '2024-01-25',
      type: '续约谈判',
      description: '进行续约谈判，讨论新年度合作',
      icon: 'FileTextOutlined',
      color: '#1890ff'
    },
    {
      date: '2024-01-18',
      type: '技术问题解决',
      description: '解决API集成兼容性问题',
      icon: 'SettingOutlined',
      color: '#52c41a'
    }
  ],
  'CUST-0003': [
    {
      date: '2024-02-28',
      type: '续约状态更新',
      description: '续约状态更新为"流失风险"',
      icon: 'ExclamationCircleOutlined',
      color: '#fa541c'
    },
    {
      date: '2024-02-25',
      type: '客户拜访',
      description: '进行客户拜访，了解续约意向',
      icon: 'UserOutlined',
      color: '#1890ff'
    },
    {
      date: '2024-02-20',
      type: '健康分下降',
      description: '客户健康分从75下降到45',
      icon: 'RiseOutlined',
      color: '#fa541c'
    }
  ],
  'CUST-0004': [
    {
      date: '2024-01-30',
      type: 'QBR会议',
      description: '完成Q4季度业务回顾会议',
      icon: 'TeamOutlined',
      color: '#52c41a'
    }
  ],
  'CUST-0005': [
    {
      date: '2024-01-15',
      type: '培训完成',
      description: '完成新功能培训，用户反馈良好',
      icon: 'CheckCircleOutlined',
      color: '#52c41a'
    }
  ],
  'CUST-0006': [
    {
      date: '2024-01-20',
      type: '系统优化',
      description: '完成系统性能优化',
      icon: 'SettingOutlined',
      color: '#52c41a'
    }
  ]
};

// 模拟联系人信息数据
export const mockContacts: Record<string, ContactInfo[]> = {
  'CUST-0001': [
    {
      name: '张总',
      title: 'CEO',
      phone: '138****1001',
      email: 'zhang@bjtech.com',
      isPrimary: true
    },
    {
      name: '李经理',
      title: '技术总监',
      phone: '139****1002',
      email: 'li@bjtech.com',
      isPrimary: false
    }
  ],
  'CUST-0002': [
    {
      name: '王总',
      title: 'CTO',
      phone: '138****2001',
      email: 'wang@shtech.com',
      isPrimary: true
    },
    {
      name: '赵经理',
      title: '产品总监',
      phone: '139****2002',
      email: 'zhao@shtech.com',
      isPrimary: false
    }
  ],
  'CUST-0003': [
    {
      name: '刘总',
      title: 'CEO',
      phone: '138****3001',
      email: 'liu@sztech.com',
      isPrimary: true
    },
    {
      name: '陈经理',
      title: '运营总监',
      phone: '139****3002',
      email: 'chen@sztech.com',
      isPrimary: false
    }
  ],
  'CUST-0004': [
    {
      name: '钱总',
      title: 'CEO',
      phone: '138****4001',
      email: 'qian@gztech.com',
      isPrimary: true
    },
    {
      name: '孙经理',
      title: '技术总监',
      phone: '139****4002',
      email: 'sun@gztech.com',
      isPrimary: false
    }
  ],
  'CUST-0005': [
    {
      name: '周总',
      title: 'CTO',
      phone: '138****5001',
      email: 'zhou@hztech.com',
      isPrimary: true
    },
    {
      name: '吴经理',
      title: '产品经理',
      phone: '139****5002',
      email: 'wu@hztech.com',
      isPrimary: false
    }
  ],
  'CUST-0006': [
    {
      name: '郑总',
      title: 'CEO',
      phone: '138****6001',
      email: 'zheng@cdtech.com',
      isPrimary: true
    },
    {
      name: '王经理',
      title: '技术经理',
      phone: '139****6002',
      email: 'wang@cdtech.com',
      isPrimary: false
    }
  ]
};

// 获取平台类型的统一函数 - 固定映射确保每个平台都有公司使用
export const getPlatformType = (customerId: string) => {
  // 固定映射关系，确保每个平台类型都有对应的公司
  const platformMapping: Record<string, string> = {
    'CUST-0001': 'dingtalk',      // 北京科技有限公司
    'CUST-0002': 'wechat_work',   // 上海智能科技有限公司
    'CUST-0003': 'feishu',        // 深圳创新科技有限公司
    'CUST-0004': 'lark',          // 广州数字化企业
    'CUST-0005': 'dingtalk_global', // 杭州互联网公司
    'CUST-0006': 'standalone',    // 成都软件开发公司
  };
  
  // 如果有固定映射则使用，否则使用默认逻辑
  if (platformMapping[customerId]) {
    return platformMapping[customerId];
  }
  
  // 对于其他客户ID，使用原有的随机分配逻辑
  const platformTypes = ['dingtalk', 'wechat_work', 'feishu', 'lark', 'dingtalk_global', 'standalone'];
  const index = customerId.length % platformTypes.length;
  return platformTypes[index];
};

// 获取已购产品信息的统一函数
export const getPurchasedProducts = (customerId: string) => {
  const platformType = getPlatformType(customerId);
  const productMap = {
    'dingtalk': {
      products: ['直营-极简版', '直营-网校版', '直营-畅学版', '直营-标准版', '直营-专业版', '直营-智学版'],
      services: ['智能人事-标准', '智能人事-专业版']
    },
    'wechat_work': {
      products: ['企微版'],
      services: ['企微增值服务包', '企微定制开发']
    },
    'feishu': {
      products: ['飞书版'],
      services: ['飞书集成服务', '飞书培训服务']
    },
    'lark': {
      products: ['D-learning'],
      services: ['Lark技术支持', 'Lark定制化服务']
    },
    'dingtalk_global': {
      products: ['D-learning'],
      services: ['DingTalk集成服务', 'DingTalk培训包']
    },
    'standalone': {
      products: ['独立版'],
      services: ['独立部署实施', '独立部署运维']
    }
  };
  
  const config = productMap[platformType as keyof typeof productMap] || productMap['dingtalk'];
  // 根据客户ID生成固定的随机选择，确保数据一致性
  const seed = customerId.charCodeAt(customerId.length - 1);
  const productCount = (seed % 2) + 1; // 1-2个产品
  const serviceCount = (seed % 2) + 1; // 1-2个服务
  
  return {
    products: config.products.slice(0, productCount),
    services: config.services.slice(0, serviceCount)
  };
};

export const mockCustomers: Customer[] = [
  {
    id: 'CUST-0001',
    name: '北京科技有限公司',
    industry: '信息技术',
    scale: '中型企业',
    csm: '张伟',
    arr: 500000,
    healthScore: 85,
    healthLevel: '健康',
    lifecycleStage: '成长期',
    customerTier: 'strategic',
    salesPerson: '王销售',
    purchasedProducts: ['直营-极简版'],
    keyContacts: mockContacts['CUST-0001'],
    currentContract: mockContracts.find(c => c.id === 'contract_001'),
    contracts: mockContracts.filter(c => c.customerId === 'CUST-0001'),
    handoverRecords: mockHandoverRecords.filter(h => h.customerId === 'CUST-0001'),
    nextRenewalDate: '2024-05-31',
    serviceExpiryDate: '2024-05-31',
    isRenewalRisk: false,
    lastContactDate: '2024-01-15',
    serviceRecords: [
      {
        id: 'sr001',
        type: 'QBR',
        title: 'Q4季度业务回顾会议',
        content: '回顾了Q4业务指标，客户对系统使用效果满意，计划扩大使用范围',
        operator: '张伟',
        timestamp: '2024-01-10 14:00:00',
        tags: ['季度回顾', '业务增长'],
        createdAt: '2024-01-10 14:30:00',
        updatedAt: '2024-01-10 14:30:00'
      },
      {
        id: 'sr002',
        type: '培训',
        title: '新功能培训会',
        content: '为客户团队进行了新版本功能培训，参与人员20人，反馈良好',
        operator: '张伟',
        timestamp: '2024-01-05 10:00:00',
        tags: ['功能培训', '用户教育'],
        createdAt: '2024-01-05 11:00:00',
        updatedAt: '2024-01-05 11:00:00'
      }
    ],
    todoTasks: mockTodoTasks.filter(t => t.customerId === 'CUST-0001'),
    isFavorite: true,
    createdAt: '2023-06-20',
    updatedAt: '2024-01-15'
  },
  {
    id: 'CUST-0002',
    name: '上海智能科技有限公司',
    industry: '人工智能',
    scale: '大型企业',
    csm: '李明',
    arr: 800000,
    healthScore: 65,
    healthLevel: '一般',
    lifecycleStage: '成熟期',
    customerTier: 'large',
    salesPerson: '李销售',
    purchasedProducts: ['企微版'],
    keyContacts: mockContacts['CUST-0002'],
    currentContract: mockContracts.find(c => c.id === 'contract_003'),
    contracts: mockContracts.filter(c => c.customerId === 'CUST-0002'),
    handoverRecords: mockHandoverRecords.filter(h => h.customerId === 'CUST-0002'),
    nextRenewalDate: '2024-08-31',
    serviceExpiryDate: '2024-08-31',
    isRenewalRisk: false,
    lastContactDate: '2024-01-12',
    serviceRecords: [
      {
        id: 'sr003',
        type: '电话回访',
        title: '续约意向沟通',
        content: '与客户CTO沟通续约事宜，客户表示满意当前服务，有续约意向',
        operator: '李明',
        timestamp: '2024-01-12 15:30:00',
        tags: ['续约沟通', '客户满意'],
        createdAt: '2024-01-12 16:00:00',
        updatedAt: '2024-01-12 16:00:00'
      },
      {
        id: 'sr004',
        type: '技术支持',
        title: 'API集成问题解决',
        content: '协助客户解决企微集成中的API调用问题，已成功解决',
        operator: '李明',
        timestamp: '2024-01-08 09:00:00',
        tags: ['技术支持', '问题解决'],
        createdAt: '2024-01-08 10:30:00',
        updatedAt: '2024-01-08 10:30:00'
      }
    ],
    todoTasks: mockTodoTasks.filter(t => t.customerId === 'CUST-0002'),
    isFavorite: false,
    createdAt: '2022-09-20',
    updatedAt: '2024-01-12'
  },
  {
    id: 'CUST-0003',
    name: '深圳创新科技有限公司',
    industry: '软件开发',
    scale: '小型企业',
    csm: '王芳',
    arr: 300000,
    healthScore: 45,
    healthLevel: '风险',
    customerTier: 'medium',
    salesPerson: '张销售',
    lifecycleStage: '衰退期',
    purchasedProducts: ['飞书版'],
    keyContacts: mockContacts['CUST-0003'],
    currentContract: mockContracts.find(c => c.id === 'contract_005'),
    contracts: mockContracts.filter(c => c.customerId === 'CUST-0003'),
    handoverRecords: mockHandoverRecords.filter(h => h.customerId === 'CUST-0003'),
    nextRenewalDate: '2024-06-30',
    serviceExpiryDate: '2024-06-30',
    isRenewalRisk: true,
    lastContactDate: '2024-01-08',
    serviceRecords: [
      {
        id: 'sr005',
        type: '风险处理',
        title: '客户满意度下降处理',
        content: '客户反馈系统使用体验不佳，已安排产品团队跟进优化',
        operator: '王芳',
        timestamp: '2024-01-08 11:00:00',
        tags: ['风险处理', '满意度'],
        createdAt: '2024-01-08 11:30:00',
        updatedAt: '2024-01-08 11:30:00'
      },
      {
        id: 'sr006',
        type: '商务沟通',
        title: '预算削减风险沟通',
        content: '与客户财务部门沟通，了解预算情况，制定应对方案',
        operator: '王芳',
        timestamp: '2024-01-05 14:00:00',
        tags: ['预算风险', '商务沟通'],
        createdAt: '2024-01-05 14:30:00',
        updatedAt: '2024-01-05 14:30:00'
      }
    ],
    todoTasks: mockTodoTasks.filter(t => t.customerId === 'CUST-0003'),
    isFavorite: true,
    createdAt: '2022-07-20',
    updatedAt: '2024-01-08'
  },
  {
    id: 'CUST-0004',
    name: '广州数字化企业',
    industry: '数字化服务',
    scale: '大型企业',
    csm: '张伟',
    arr: 1200000,
    healthScore: 92,
    healthLevel: '健康',
    lifecycleStage: '成长期',
    customerTier: 'strategic',
    salesPerson: '陈销售',
    purchasedProducts: ['D-learning'],
    keyContacts: mockContacts['CUST-0004'],
    currentContract: mockContracts.find(c => c.id === 'contract_006'),
    contracts: mockContracts.filter(c => c.customerId === 'CUST-0004'),
    handoverRecords: mockHandoverRecords.filter(h => h.customerId === 'CUST-0004'),
    nextRenewalDate: '2025-09-30',
    serviceExpiryDate: '2025-09-30',
    isRenewalRisk: false,
    lastContactDate: '2024-01-20',
    serviceRecords: [
      {
        id: 'sr007',
        type: '产品演示',
        title: '新版本功能演示',
        content: '为客户演示最新版本的学习分析功能，客户对数据可视化很感兴趣',
        operator: '陈强',
        timestamp: '2024-01-20 10:00:00',
        tags: ['产品演示', '功能升级'],
        createdAt: '2024-01-20 11:00:00',
        updatedAt: '2024-01-20 11:00:00'
      },
      {
        id: 'sr008',
        type: '培训',
        title: '管理员权限培训',
        content: '为客户IT团队进行系统管理员权限和配置培训',
        operator: '陈强',
        timestamp: '2024-01-18 14:00:00',
        tags: ['用户培训', '权限管理'],
        createdAt: '2024-01-18 15:00:00',
        updatedAt: '2024-01-18 15:00:00'
      }
    ],
    todoTasks: mockTodoTasks.filter(t => t.customerId === 'CUST-0004'),
    isFavorite: false,
    createdAt: '2023-10-20',
    updatedAt: '2024-01-14'
  },
  {
    id: 'CUST-0005',
    name: '杭州互联网公司',
    industry: '互联网',
    scale: '中型企业',
    csm: '李明',
    arr: 450000,
    healthScore: 58,
    healthLevel: '一般',
    lifecycleStage: '成熟期',
    customerTier: 'medium',
    salesPerson: '刘销售',
    purchasedProducts: ['D-learning'],
    keyContacts: mockContacts['CUST-0005'],
    currentContract: mockContracts.find(c => c.id === 'contract_007'),
    contracts: mockContracts.filter(c => c.customerId === 'CUST-0005'),
    handoverRecords: mockHandoverRecords.filter(h => h.customerId === 'CUST-0005'),
    nextRenewalDate: '2024-05-31',
    serviceExpiryDate: '2024-05-31',
    isRenewalRisk: false,
    lastContactDate: '2024-01-18',
    serviceRecords: [
      {
        id: 'sr009',
        type: '其他',
        title: '系统使用情况检查',
        content: '定期检查客户系统使用情况，发现活跃度较高，建议增加高级功能',
        operator: '刘洋',
        timestamp: '2024-01-18 16:00:00',
        tags: ['健康检查', '使用分析'],
        createdAt: '2024-01-18 16:30:00',
        updatedAt: '2024-01-18 16:30:00'
      },
      {
        id: 'sr010',
        type: '商务沟通',
        title: '扩容需求跟进',
        content: '客户提出扩容需求，已转交销售团队跟进',
        operator: '刘洋',
        timestamp: '2024-01-15 13:00:00',
        tags: ['商机跟进', '扩容需求'],
        createdAt: '2024-01-15 13:30:00',
        updatedAt: '2024-01-15 13:30:00'
      }
    ],
    todoTasks: mockTodoTasks.filter(t => t.customerId === 'CUST-0005'),
    isFavorite: true,
    createdAt: '2023-06-15',
    updatedAt: '2024-01-10'
  },
  {
    id: 'CUST-0006',
    name: '成都软件开发公司',
    industry: '软件开发',
    scale: '小型企业',
    csm: '王芳',
    arr: 200000,
    healthScore: 38,
    healthLevel: '风险',
    lifecycleStage: '衰退期',
    customerTier: 'small',
    salesPerson: '赵销售',
    purchasedProducts: ['独立版'],
    keyContacts: mockContacts['CUST-0006'],
    currentContract: mockContracts.find(c => c.id === 'contract_009'),
    contracts: mockContracts.filter(c => c.customerId === 'CUST-0006'),
    handoverRecords: mockHandoverRecords.filter(h => h.customerId === 'CUST-0006'),
    nextRenewalDate: '2024-12-31',
    serviceExpiryDate: '2024-12-31',
    isRenewalRisk: true,
    lastContactDate: '2024-01-22',
    serviceRecords: [
      {
        id: 'sr011',
        type: 'QBR',
        title: 'Q1季度业务回顾准备',
        content: '准备Q1季度业务回顾材料，整理客户使用数据和成果展示',
        operator: '赵敏',
        timestamp: '2024-01-22 09:00:00',
        tags: ['季度回顾', '数据分析'],
        createdAt: '2024-01-22 09:30:00',
        updatedAt: '2024-01-22 09:30:00'
      },
      {
        id: 'sr012',
        type: '其他',
        title: '现场服务拜访',
        content: '现场拜访客户，了解使用情况和改进建议，客户反馈良好',
        operator: '赵敏',
        timestamp: '2024-01-20 14:00:00',
        tags: ['客户拜访', '现场服务'],
        createdAt: '2024-01-20 17:00:00',
        updatedAt: '2024-01-20 17:00:00'
      }
    ],
    todoTasks: mockTodoTasks.filter(t => t.customerId === 'CUST-0006'),
    isFavorite: false,
    createdAt: '2021-09-20',
    updatedAt: '2024-01-05'
  }
];

// 其余的mock数据保持不变，但需要更新customerId引用
export const mockValueBoards: ValueBoard[] = [
  {
    id: 'vb001',
    customerId: 'CUST-0001',
    customerName: '北京科技有限公司',
    title: 'Q4业务数字化转型价值报告',
    description: '展示客户在数字化转型过程中取得的关键业务成果',
    status: '进行中',
    kpis: [
      { id: 'kpi1', name: '业务效率提升', target: 30, current: 25, unit: '%', trend: 'up' },
      { id: 'kpi2', name: '成本节约', target: 500000, current: 420000, unit: '元', trend: 'up' },
      { id: 'kpi3', name: '用户满意度', target: 90, current: 88, unit: '%', trend: 'stable' }
    ],
    achievements: [
      {
        id: 'ach1',
        title: '完成核心系统部署',
        description: '成功部署客户关系管理系统，覆盖全部业务流程',
        impact: '提升客户响应速度50%',
        date: '2024-01-10'
      },
      {
        id: 'ach2',
        title: '员工培训完成',
        description: '完成200+员工的系统使用培训',
        impact: '用户采用率达到95%',
        date: '2024-01-05'
      }
    ],
    createdBy: '张伟',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15'
  }
];

export const mockQBRMeetings: QBRMeeting[] = [
  {
    id: 'qbr001',
    customerId: 'CUST-0001',
    customerName: '北京科技有限公司',
    title: '2024 Q1 业务回顾会议',
    scheduledDate: '2024-01-25 14:00',
    status: '待召开',
    agenda: ['业务成果回顾', '问题与挑战讨论', 'Q2规划制定'],
    attendees: ['张总 - CEO', '李经理 - CTO', '王主管 - 运营总监', '张伟 - CSM'],
    createdBy: '张伟',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15'
  },
  {
    id: 'qbr002',
    customerId: 'CUST-0002',
    customerName: '上海智能科技有限公司',
    title: '2023 Q4 业务回顾会议',
    scheduledDate: '2023-12-28 10:00',
    status: '已完成',
    agenda: ['Q4业务成果总结', '系统优化建议', '2024年发展规划'],
    attendees: ['赵总 - CEO', '钱经理 - 产品总监', '李明 - CSM'],
    outcomes: ['确认Q4目标达成85%', '识别3个关键优化点', '制定2024年扩展计划'],
    nextSteps: ['1月完成系统优化', '2月启动新功能开发', '3月进行用户培训'],
    createdBy: '李明',
    createdAt: '2023-12-15',
    updatedAt: '2023-12-28'
  }
];

export const mockRiskEvents: RiskEvent[] = [
  {
    id: 're001',
    customerId: 'CUST-0003',
    customerName: '深圳创新科技有限公司',
    riskType: '续费风险',
    description: '客户对当前服务满意度下降，预算可能削减',
    severity: 'high',
    status: '处理中',
    assignedTo: '王芳',
    dueDate: '2024-01-30',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-15'
  },
  {
    id: 're002',
    customerId: 'CUST-0006',
    customerName: '成都软件开发公司',
    riskType: '使用率低',
    description: '系统使用率持续下降，用户活跃度不足',
    severity: 'medium',
    status: '待处理',
    assignedTo: '王芳',
    dueDate: '2024-01-25',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12'
  },
  {
    id: 're003',
    customerId: 'CUST-0002',
    customerName: '上海智能科技有限公司',
    riskType: '技术问题',
    description: '系统集成出现兼容性问题，影响业务流程',
    severity: 'medium',
    status: '已解决',
    assignedTo: '李明',
    dueDate: '2024-01-20',
    resolution: '通过API升级解决兼容性问题，系统运行正常',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-18'
  }
];

// 其余数据保持不变
export const mockServicePlaybooks: ServicePlaybook[] = [
  {
    id: 'pb001',
    name: '成长期客户增购引导剧本',
    description: '针对成长期客户的增购机会识别与转化流程',
    applicableStage: ['成长期'],
    category: '增购转化',
    status: '可用',
    
    goal: '通过系统化的分析和评估流程，识别并转化成长期客户的增购机会',
    scenarioTags: ['增购', '成长期', '系统使用率高'],
    
    // 触发条件
    triggerConditions: [
      {
        id: 'tc1',
        type: 'custom',
        field: 'usage_rate',
        operator: 'gt',
        value: 80,
        description: '系统使用率超过80%'
      },
      {
        id: 'tc2',
        type: 'custom',
        field: 'lifecycle_stage',
        operator: 'eq',
        value: '成长期',
        description: '客户处于成长期'
      }
    ],
    autoTrigger: true,
    
    // 成功指标
    successMetrics: [
      {
        id: 'metric1',
        name: '增购转化率',
        description: '成功完成增购的客户比例',
        targetValue: 75,
        unit: '%',
        measurementMethod: '统计启动剧本后30天内完成增购的客户数量占总启动数量的比例'
      },
      {
        id: 'metric2',
        name: '平均增购金额',
        description: '单个客户平均增购金额',
        targetValue: 200000,
        unit: '元',
        measurementMethod: '计算所有成功增购客户的增购金额平均值'
      }
    ],
    
    // 资源配置
    resources: [
      {
        id: 'res1',
        type: 'document',
        name: '使用数据分析模板',
        description: '客户系统使用情况分析模板',
        tags: ['分析', '模板']
      },
      {
        id: 'res2',
        type: 'script',
        name: '增购沟通话术',
        description: '与客户沟通增购机会的标准话术',
        tags: ['沟通', '话术']
      }
    ],
    
    tasks: [
      {
        id: 'task1',
        title: '客户使用情况分析',
        description: '分析客户当前系统使用深度和广度',
        phase: '诊断分析',
        duration: 2,
        dueOffset: 3,
        defaultAssignee: 'csm',
        requiredResources: ['res1'],
        checkpoints: ['完成使用率分析', '识别扩展需求点'],
        dependencies: [],
        isOptional: false,
        allowSkip: false
      },
      {
        id: 'task2',
        title: '增购机会评估',
        description: '评估客户的增购潜力和预算能力',
        phase: '价值评估',
        duration: 3,
        dueOffset: 7,
        defaultAssignee: 'sales',
        requiredResources: ['res2'],
        checkpoints: ['完成ROI计算', '确认预算范围'],
        dependencies: ['task1'],
        isOptional: false,
        allowSkip: false
      },
      {
        id: 'task3',
        title: '方案设计与提案',
        description: '设计个性化增购方案并进行提案',
        phase: '方案制定',
        duration: 5,
        dueOffset: 14,
        defaultAssignee: 'custom',
        customAssignee: '产品专家',
        requiredResources: ['res1', 'res2'],
        checkpoints: ['完成方案设计', '获得初步认可'],
        dependencies: ['task2'],
        isOptional: false,
        allowSkip: false
      }
    ],
    estimatedDuration: 10,
    successRate: 75,
    usage: 25,
    createdBy: '张伟',
    createdAt: '2023-08-15',
    updatedAt: '2024-01-10'
  },
  {
    id: 'pb002',
    name: '风险客户挽回剧本',
    description: '针对有流失风险客户的挽回策略和执行流程',
    applicableStage: ['衰退期'],
    category: '风险管理',
    status: '可用',
    
    goal: '通过系统化的风险识别和挽回措施，降低客户流失率',
    scenarioTags: ['流失风险', '客户挽回', '满意度提升'],
    
    // 触发条件
    triggerConditions: [
      {
        id: 'tc1',
        type: 'custom',
        field: 'health_score',
        operator: 'lt',
        value: 60,
        description: '客户健康分低于60分'
      },
      {
        id: 'tc2',
        type: 'custom',
        field: 'lifecycle_stage',
        operator: 'eq',
        value: '衰退期',
        description: '客户处于衰退期'
      }
    ],
    autoTrigger: true,
    
    // 成功指标
    successMetrics: [
      {
        id: 'metric1',
        name: '客户挽回率',
        description: '成功挽回的风险客户比例',
        targetValue: 60,
        unit: '%',
        measurementMethod: '统计启动剧本后60天内成功续约或健康分回升的客户比例'
      },
      {
        id: 'metric2',
        name: '满意度提升',
        description: '客户满意度改善程度',
        targetValue: 20,
        unit: '分',
        measurementMethod: '对比剧本执行前后的客户满意度评分差值'
      }
    ],
    
    // 资源配置
    resources: [
      {
        id: 'res1',
        type: 'document',
        name: '风险分析模板',
        description: '客户流失风险分析和评估模板',
        tags: ['分析', '风险评估']
      },
      {
        id: 'res2',
        type: 'script',
        name: '客户挽回沟通指南',
        description: '与风险客户沟通的标准流程和话术',
        tags: ['沟通', '挽回']
      }
    ],
    tasks: [
      {
        id: 'step1',
        title: '风险根因分析',
        description: '深入分析客户不满的根本原因',
        phase: '分析阶段',
        duration: 4,
        dueOffset: 3,
        defaultAssignee: 'csm',
        requiredResources: [],
        checkpoints: ['完成根因分析', '制定改进计划'],
        dependencies: [],
        isOptional: false,
        allowSkip: false
      },
      {
        id: 'step2',
        title: '紧急响应措施',
        description: '实施紧急措施缓解客户不满',
        phase: '响应阶段',
        duration: 2,
        dueOffset: 5,
        defaultAssignee: 'support',
        requiredResources: [],
        checkpoints: ['实施紧急措施', '获得客户认可'],
        dependencies: ['step1'],
        isOptional: false,
        allowSkip: false
      },
      {
        id: 'step3',
        title: '长期改进方案',
        description: '制定并实施长期的服务改进方案',
        phase: '改进阶段',
        duration: 8,
        dueOffset: 14,
        defaultAssignee: 'custom',
        customAssignee: '产品团队',
        requiredResources: [],
        checkpoints: ['完成方案实施', '客户满意度回升'],
        dependencies: ['step2'],
        isOptional: false,
        allowSkip: false
      }
    ],
    estimatedDuration: 14,
    successRate: 60,
    usage: 18,
    createdBy: '王芳',
    createdAt: '2023-09-20',
    updatedAt: '2024-01-08'
  },
  {
    id: 'pb003',
    name: '成熟期客户深度合作剧本',
    description: '与成熟期客户建立更深层次合作关系的策略',
    applicableStage: ['成熟期'],
    category: '合作深化',
    status: '可用',
    
    goal: '建立长期战略合作关系，实现双方价值最大化',
    scenarioTags: ['战略合作', '价值提升', '长期发展'],
    
    // 触发条件
    triggerConditions: [
      {
        id: 'tc1',
        type: 'custom',
        field: 'health_score',
        operator: 'gte',
        value: 85,
        description: '客户健康分大于等于85分'
      },
      {
        id: 'tc2',
        type: 'custom',
        field: 'arr',
        operator: 'gte',
        value: 500000,
        description: 'ARR大于等于50万'
      }
    ],
    autoTrigger: false,
    
    // 成功指标
    successMetrics: [
      {
        id: 'metric1',
        name: '战略合作达成率',
        description: '成功建立战略合作关系的客户比例',
        targetValue: 45,
        unit: '%',
        measurementMethod: '统计启动剧本后90天内签署战略合作协议的客户比例'
      },
      {
        id: 'metric2',
        name: '合作价值增长',
        description: '通过战略合作实现的收入增长',
        targetValue: 300000,
        unit: '元',
        measurementMethod: '计算战略合作带来的新增收入平均值'
      }
    ],
    
    // 资源配置
    resources: [
      {
        id: 'res1',
        type: 'document',
        name: '战略合作方案模板',
        description: '战略合作提案和协议模板',
        tags: ['合作', '模板']
      },
      {
         id: 'res2',
         type: 'document',
         name: '价值展示材料',
         description: '展示双方合作价值的演示材料',
         tags: ['展示', '价值']
       }
    ],
    tasks: [
      {
        id: 'step1',
        title: '合作机会识别',
        description: '识别与客户深度合作的机会点',
        phase: '识别阶段',
        duration: 3,
        dueOffset: 5,
        defaultAssignee: 'csm',
        requiredResources: [],
        checkpoints: ['完成机会分析', '确定合作方向'],
        dependencies: [],
        isOptional: false,
        allowSkip: false
      },
      {
        id: 'step2',
        title: '战略合作提案',
        description: '制定战略合作方案并进行高层提案',
        phase: '提案阶段',
        duration: 6,
        dueOffset: 12,
        defaultAssignee: 'sales',
        requiredResources: [],
        checkpoints: ['完成提案准备', '获得高层支持'],
        dependencies: ['step1'],
        isOptional: false,
        allowSkip: false
      }
    ],
    estimatedDuration: 9,
    successRate: 45,
    usage: 12,
    createdBy: '李明',
    createdAt: '2023-10-10',
    updatedAt: '2024-01-05'
  }
];

export const mockKeyActions: KeyAction[] = [
  {
    id: 'A1',
    title: '价值实现与效果报告',
    description: '创建和管理客户价值看板，展示业务成果',
    icon: 'BarChartOutlined',
    color: '#1890ff',
    enabled: true
  },
  {
    id: 'A2',
    title: '业务复盘会 (QBR)',
    description: '定期组织业务回顾会议，深化客户关系',
    icon: 'TeamOutlined',
    color: '#52c41a',
    enabled: true
  },
  {
    id: 'A3',
    title: '健康度评分',
    description: '监控和管理客户健康度指标',
    icon: 'HeartOutlined',
    color: '#fa8c16',
    route: '/health-center',
    enabled: true
  },
  {
    id: 'A4',
    title: '风险事件处理队列',
    description: '及时识别和处理客户风险事件',
    icon: 'ExclamationCircleOutlined',
    color: '#f5222d',
    enabled: true
  },
  {
    id: 'A5',
    title: '续费续签',
    description: '管理客户续约流程和策略',
    icon: 'FileTextOutlined',
    color: '#722ed1',
    route: '/profiles/renewal',
    enabled: true
  }
];

export const mockServiceOverview: ServiceOverview = {
  totalCustomers: mockCustomers.length,
  avgHealthScore: Math.round(mockCustomers.reduce((sum, c) => sum + c.healthScore, 0) / mockCustomers.length),
  riskCustomers: mockCustomers.filter(c => c.healthLevel === '风险').length,
  healthDistribution: {
    healthy: mockCustomers.filter(c => c.healthLevel === '健康').length,
    normal: mockCustomers.filter(c => c.healthLevel === '一般').length,
    risky: mockCustomers.filter(c => c.healthLevel === '风险').length
  },
  lifecycleDistribution: {
    growth: mockCustomers.filter(c => c.lifecycleStage === '成长期').length,
    mature: mockCustomers.filter(c => c.lifecycleStage === '成熟期').length,
    decline: mockCustomers.filter(c => c.lifecycleStage === '衰退期').length
  }
};

export const healthColors = {
  '健康': '#7ED321',
  '一般': '#F5A623', 
  '风险': '#FF6B6B'
};

export const lifecycleColors = {
  '成长期': '#1890ff',
  '成熟期': '#13c2c2',
  '衰退期': '#eb2f96'
};

