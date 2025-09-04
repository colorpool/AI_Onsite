import {
  Customer,
  ValueBoard,
  QBRMeeting,
  RiskEvent,
  ServicePlaybook,
  KeyAction,
  ServiceOverview,
  ValueKPI,
  Achievement,
  PlaybookStep,
  ActionType,
  HealthLevel,
  LifecycleStage
} from '../types/continuousService';

// 模拟客户数据
export const mockCustomers: Customer[] = [
  {
    id: 'c001',
    name: '北京科技有限公司',
    csm: '张伟',
    healthScore: 85,
    healthLevel: '健康',
    lifecycleStage: '成长期',
    contractAmount: 500000,
    renewalDate: '2024-12-31',
    isRenewalRisk: false,
    lastContactDate: '2024-01-15',
    createdAt: '2023-06-01',
    updatedAt: '2024-01-15'
  },
  {
    id: 'c002',
    name: '上海智能科技有限公司',
    csm: '李明',
    healthScore: 65,
    healthLevel: '一般',
    lifecycleStage: '成熟期',
    contractAmount: 800000,
    renewalDate: '2024-08-15',
    isRenewalRisk: false,
    lastContactDate: '2024-01-12',
    createdAt: '2023-03-15',
    updatedAt: '2024-01-12'
  },
  {
    id: 'c003',
    name: '深圳创新科技有限公司',
    csm: '王芳',
    healthScore: 45,
    healthLevel: '风险',
    lifecycleStage: '衰退期',
    contractAmount: 300000,
    renewalDate: '2024-06-30',
    isRenewalRisk: true,
    lastContactDate: '2024-01-08',
    createdAt: '2022-12-01',
    updatedAt: '2024-01-08'
  },
  {
    id: 'c004',
    name: '广州数字化企业',
    csm: '张伟',
    healthScore: 92,
    healthLevel: '健康',
    lifecycleStage: '成长期',
    contractAmount: 1200000,
    renewalDate: '2025-03-20',
    isRenewalRisk: false,
    lastContactDate: '2024-01-14',
    createdAt: '2023-09-10',
    updatedAt: '2024-01-14'
  },
  {
    id: 'c005',
    name: '杭州互联网公司',
    csm: '李明',
    healthScore: 58,
    healthLevel: '一般',
    lifecycleStage: '成熟期',
    contractAmount: 450000,
    renewalDate: '2024-10-15',
    isRenewalRisk: false,
    lastContactDate: '2024-01-10',
    createdAt: '2023-05-20',
    updatedAt: '2024-01-10'
  },
  {
    id: 'c006',
    name: '成都软件开发公司',
    csm: '王芳',
    healthScore: 38,
    healthLevel: '风险',
    lifecycleStage: '衰退期',
    contractAmount: 200000,
    renewalDate: '2024-04-10',
    isRenewalRisk: true,
    lastContactDate: '2024-01-05',
    createdAt: '2022-08-15',
    updatedAt: '2024-01-05'
  }
];

// 价值看板数据
export const mockValueBoards: ValueBoard[] = [
  {
    id: 'vb001',
    customerId: 'c001',
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

// QBR会议数据
export const mockQBRMeetings: QBRMeeting[] = [
  {
    id: 'qbr001',
    customerId: 'c001',
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
    customerId: 'c002',
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

// 风险事件数据
export const mockRiskEvents: RiskEvent[] = [
  {
    id: 're001',
    customerId: 'c003',
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
    customerId: 'c006',
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
    customerId: 'c002',
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

// 服务剧本数据
export const mockServicePlaybooks: ServicePlaybook[] = [
  {
    id: 'pb001',
    name: '成长期客户增购引导剧本',
    description: '针对成长期客户的增购机会识别与转化流程',
    applicableStage: ['成长期'],
    category: '增购转化',
    status: '可用',
    steps: [
      {
        id: 'step1',
        title: '客户使用情况分析',
        description: '分析客户当前系统使用深度和广度',
        duration: 2,
        resources: ['使用数据报告', '业务分析工具'],
        checkpoints: ['完成使用率分析', '识别扩展需求点']
      },
      {
        id: 'step2',
        title: '增购机会评估',
        description: '评估客户的增购潜力和预算能力',
        duration: 3,
        resources: ['财务信息', '业务规划文档'],
        checkpoints: ['完成ROI计算', '确认预算范围']
      },
      {
        id: 'step3',
        title: '方案设计与提案',
        description: '设计个性化增购方案并进行提案',
        duration: 5,
        resources: ['方案模板', '案例库'],
        checkpoints: ['完成方案设计', '获得初步认可']
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
    steps: [
      {
        id: 'step1',
        title: '风险根因分析',
        description: '深入分析客户不满的根本原因',
        duration: 4,
        resources: ['客户反馈记录', '使用数据分析'],
        checkpoints: ['完成根因分析', '制定改进计划']
      },
      {
        id: 'step2',
        title: '紧急响应措施',
        description: '实施紧急措施缓解客户不满',
        duration: 2,
        resources: ['技术支持团队', '高级管理层'],
        checkpoints: ['实施紧急措施', '获得客户认可']
      },
      {
        id: 'step3',
        title: '长期改进方案',
        description: '制定并实施长期的服务改进方案',
        duration: 8,
        resources: ['产品团队', '实施团队'],
        checkpoints: ['完成方案实施', '客户满意度回升']
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
    steps: [
      {
        id: 'step1',
        title: '合作机会识别',
        description: '识别与客户深度合作的机会点',
        duration: 3,
        resources: ['行业分析报告', '客户发展规划'],
        checkpoints: ['完成机会分析', '确定合作方向']
      },
      {
        id: 'step2',
        title: '战略合作提案',
        description: '制定战略合作方案并进行高层提案',
        duration: 6,
        resources: ['高管团队', '商务团队'],
        checkpoints: ['完成提案准备', '获得高层支持']
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

// 关键动作配置
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

// 概览数据
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

// 图表颜色配置
export const healthColors = {
  '健康': '#52c41a',
  '一般': '#faad14', 
  '风险': '#f5222d'
};
export const lifecycleColors = {
  '成长期': '#1890ff',
  '成熟期': '#13c2c2',
  '衰退期': '#eb2f96'
};

