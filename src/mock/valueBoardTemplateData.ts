import { ValueBoardTemplate, KPITemplate, AchievementTemplate, TemplateUsage } from '../types/valueBoardTemplate';

// KPI模板数据
export const mockKPITemplates: KPITemplate[] = [
  // 效率提升相关KPI
  {
    id: 'kpi_efficiency_001',
    name: '业务流程处理效率',
    description: '相比传统方式，业务流程处理时间的缩短比例',
    unit: '%',
    targetRange: { min: 20, max: 60, recommended: 40 },
    calculationMethod: '(传统处理时间 - 现在处理时间) / 传统处理时间 × 100%',
    dataSource: '业务系统操作日志'
  },
  {
    id: 'kpi_efficiency_002',
    name: '人工操作减少',
    description: '通过自动化减少的人工操作步骤数量',
    unit: '个',
    targetRange: { min: 10, max: 50, recommended: 25 },
    calculationMethod: '原有人工步骤数 - 现有人工步骤数',
    dataSource: '流程分析报告'
  },
  {
    id: 'kpi_efficiency_003',
    name: '数据处理速度提升',
    description: '数据处理和分析速度的提升倍数',
    unit: '倍',
    targetRange: { min: 2, max: 10, recommended: 5 },
    calculationMethod: '现在处理速度 / 原有处理速度',
    dataSource: '系统性能监控'
  },
  
  // ROI回报相关KPI
  {
    id: 'kpi_roi_001',
    name: 'ROI投资回报率',
    description: '项目投资回报率',
    unit: '%',
    targetRange: { min: 150, max: 500, recommended: 300 },
    calculationMethod: '(收益 - 投资成本) / 投资成本 × 100%',
    dataSource: '财务报表'
  },
  {
    id: 'kpi_roi_002',
    name: '回本周期',
    description: '投资回本所需时间',
    unit: '月',
    targetRange: { min: 6, max: 24, recommended: 12 },
    calculationMethod: '投资总额 / 月均收益',
    dataSource: '财务分析'
  },
  
  // 成本节约相关KPI
  {
    id: 'kpi_cost_001',
    name: '运营成本节约',
    description: '年度运营成本节约金额',
    unit: '万元',
    targetRange: { min: 50, max: 500, recommended: 200 },
    calculationMethod: '原有年度成本 - 现有年度成本',
    dataSource: '成本核算报告'
  },
  {
    id: 'kpi_cost_002',
    name: '人力成本优化',
    description: '通过自动化节约的人力成本',
    unit: '万元',
    targetRange: { min: 30, max: 300, recommended: 100 },
    calculationMethod: '节约人力 × 平均薪资成本',
    dataSource: 'HR成本分析'
  },
  
  // 用户采用相关KPI
  {
    id: 'kpi_adoption_001',
    name: '用户活跃度',
    description: '月活跃用户占总用户的比例',
    unit: '%',
    targetRange: { min: 60, max: 95, recommended: 80 },
    calculationMethod: '月活跃用户数 / 总用户数 × 100%',
    dataSource: '用户行为分析'
  },
  {
    id: 'kpi_adoption_002',
    name: '功能使用覆盖率',
    description: '用户使用的功能模块覆盖率',
    unit: '%',
    targetRange: { min: 40, max: 80, recommended: 60 },
    calculationMethod: '已使用功能数 / 总功能数 × 100%',
    dataSource: '功能使用统计'
  },
  
  // 业务增长相关KPI
  {
    id: 'kpi_growth_001',
    name: '业务量增长',
    description: '相比去年同期的业务量增长率',
    unit: '%',
    targetRange: { min: 10, max: 100, recommended: 30 },
    calculationMethod: '(今年业务量 - 去年业务量) / 去年业务量 × 100%',
    dataSource: '业务统计报表'
  },
  {
    id: 'kpi_growth_002',
    name: '客户满意度',
    description: '客户满意度评分',
    unit: '分',
    targetRange: { min: 4.0, max: 5.0, recommended: 4.5 },
    calculationMethod: '满意度调研平均分',
    dataSource: '客户满意度调研'
  }
];

// 成就模板数据
export const mockAchievementTemplates: AchievementTemplate[] = [
  // 效率提升成就
  {
    id: 'achievement_efficiency_001',
    title: '流程自动化里程碑',
    description: '成功实现核心业务流程的全自动化处理',
    impactDescription: '大幅提升业务处理效率，减少人工错误',
    category: '效率'
  },
  {
    id: 'achievement_efficiency_002',
    title: '数据处理能力突破',
    description: '数据处理能力提升10倍以上',
    impactDescription: '支撑业务快速增长，提升决策效率',
    category: '效率'
  },
  
  // 成本节约成就
  {
    id: 'achievement_cost_001',
    title: '年度成本节约目标达成',
    description: '实现年度运营成本节约超过200万元',
    impactDescription: '显著改善企业盈利能力',
    category: '成本'
  },
  {
    id: 'achievement_cost_002',
    title: '人力资源优化',
    description: '通过自动化释放30%的人力资源',
    impactDescription: '人员可投入更高价值的工作',
    category: '成本'
  },
  
  // 收入增长成就
  {
    id: 'achievement_revenue_001',
    title: '业务增长加速器',
    description: '支撑业务量增长50%以上',
    impactDescription: '为企业创造更多收入机会',
    category: '收入'
  },
  {
    id: 'achievement_revenue_002',
    title: '新业务模式启动',
    description: '基于平台能力开拓新的业务模式',
    impactDescription: '拓展收入来源，增强竞争优势',
    category: '收入'
  },
  
  // 满意度成就
  {
    id: 'achievement_satisfaction_001',
    title: '客户满意度新高',
    description: '客户满意度评分达到4.8分以上',
    impactDescription: '提升客户忠诚度和口碑传播',
    category: '满意度'
  },
  {
    id: 'achievement_satisfaction_002',
    title: '用户体验优化',
    description: '用户操作便捷性提升显著',
    impactDescription: '降低用户学习成本，提升使用意愿',
    category: '满意度'
  }
];

// 价值看板模板数据
export const mockValueBoardTemplates: ValueBoardTemplate[] = [
  {
    id: 'template_001',
    name: '业务流程效率提升模板',
    description: '专注于展示业务流程自动化和效率提升的价值成果',
    type: 'efficiency',
    category: '效率提升',
    icon: 'RocketOutlined',
    color: '#1890ff',
    defaultTitle: '业务流程数字化转型价值报告',
    defaultDescription: '展示通过数字化转型实现的业务流程效率提升和自动化成果',
    kpiTemplates: [
      mockKPITemplates.find(k => k.id === 'kpi_efficiency_001')!,
      mockKPITemplates.find(k => k.id === 'kpi_efficiency_002')!,
      mockKPITemplates.find(k => k.id === 'kpi_efficiency_003')!
    ],
    achievementTemplates: [
      mockAchievementTemplates.find(a => a.id === 'achievement_efficiency_001')!,
      mockAchievementTemplates.find(a => a.id === 'achievement_efficiency_002')!
    ],
    applicableIndustries: ['制造业', '金融服务', '零售电商', '物流运输'],
    applicableScales: ['中型企业', '大型企业'],
    usageCount: 45,
    rating: 4.6,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: 'template_002',
    name: 'ROI投资回报分析模板',
    description: '全面展示项目投资回报率和财务价值的专业模板',
    type: 'roi',
    category: 'ROI回报',
    icon: 'DollarOutlined',
    color: '#52c41a',
    defaultTitle: 'SaaS平台投资回报分析报告',
    defaultDescription: '详细分析SaaS平台投资的财务回报和长期价值',
    kpiTemplates: [
      mockKPITemplates.find(k => k.id === 'kpi_roi_001')!,
      mockKPITemplates.find(k => k.id === 'kpi_roi_002')!,
      mockKPITemplates.find(k => k.id === 'kpi_cost_001')!
    ],
    achievementTemplates: [
      mockAchievementTemplates.find(a => a.id === 'achievement_cost_001')!,
      mockAchievementTemplates.find(a => a.id === 'achievement_revenue_001')!
    ],
    applicableIndustries: ['所有行业'],
    applicableScales: ['中型企业', '大型企业'],
    usageCount: 32,
    rating: 4.8,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18'
  },
  {
    id: 'template_003',
    name: '成本优化价值模板',
    description: '重点展示通过数字化实现的成本节约和资源优化效果',
    type: 'cost_saving',
    category: '成本节约',
    icon: 'FallOutlined',
    color: '#fa8c16',
    defaultTitle: '数字化成本优化价值报告',
    defaultDescription: '展示通过数字化转型实现的成本节约和资源配置优化成果',
    kpiTemplates: [
      mockKPITemplates.find(k => k.id === 'kpi_cost_001')!,
      mockKPITemplates.find(k => k.id === 'kpi_cost_002')!,
      mockKPITemplates.find(k => k.id === 'kpi_efficiency_002')!
    ],
    achievementTemplates: [
      mockAchievementTemplates.find(a => a.id === 'achievement_cost_001')!,
      mockAchievementTemplates.find(a => a.id === 'achievement_cost_002')!
    ],
    applicableIndustries: ['制造业', '物流运输', '零售电商'],
    applicableScales: ['小型企业', '中型企业', '大型企业'],
    usageCount: 28,
    rating: 4.4,
    createdAt: '2024-01-12',
    updatedAt: '2024-01-22'
  },
  {
    id: 'template_004',
    name: '用户采用度分析模板',
    description: '专注于用户使用情况和平台采用度的价值展示',
    type: 'user_adoption',
    category: '用户采用',
    icon: 'UserOutlined',
    color: '#722ed1',
    defaultTitle: '平台用户采用度价值分析',
    defaultDescription: '分析用户对平台的采用情况和使用价值',
    kpiTemplates: [
      mockKPITemplates.find(k => k.id === 'kpi_adoption_001')!,
      mockKPITemplates.find(k => k.id === 'kpi_adoption_002')!,
      mockKPITemplates.find(k => k.id === 'kpi_growth_002')!
    ],
    achievementTemplates: [
      mockAchievementTemplates.find(a => a.id === 'achievement_satisfaction_001')!,
      mockAchievementTemplates.find(a => a.id === 'achievement_satisfaction_002')!
    ],
    applicableIndustries: ['互联网', '教育培训', '企业服务'],
    applicableScales: ['小型企业', '中型企业'],
    usageCount: 21,
    rating: 4.3,
    createdAt: '2024-01-08',
    updatedAt: '2024-01-16'
  },
  {
    id: 'template_005',
    name: '业务增长驱动模板',
    description: '展示平台如何驱动业务增长和创造新的商业机会',
    type: 'business_growth',
    category: '业务增长',
    icon: 'RiseOutlined',
    color: '#13c2c2',
    defaultTitle: '业务增长驱动价值报告',
    defaultDescription: '展示平台对业务增长的推动作用和创造的商业价值',
    kpiTemplates: [
      mockKPITemplates.find(k => k.id === 'kpi_growth_001')!,
      mockKPITemplates.find(k => k.id === 'kpi_growth_002')!,
      mockKPITemplates.find(k => k.id === 'kpi_roi_001')!
    ],
    achievementTemplates: [
      mockAchievementTemplates.find(a => a.id === 'achievement_revenue_001')!,
      mockAchievementTemplates.find(a => a.id === 'achievement_revenue_002')!
    ],
    applicableIndustries: ['零售电商', '金融服务', '制造业'],
    applicableScales: ['中型企业', '大型企业'],
    usageCount: 18,
    rating: 4.7,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-14'
  },
  {
    id: 'template_006',
    name: '综合价值评估模板',
    description: '全方位展示项目价值，包含效率、成本、收入等多个维度',
    type: 'custom',
    category: '自定义',
    icon: 'DashboardOutlined',
    color: '#eb2f96',
    defaultTitle: '数字化转型综合价值评估报告',
    defaultDescription: '全面评估数字化转型在效率、成本、收入、满意度等方面的综合价值',
    kpiTemplates: [
      mockKPITemplates.find(k => k.id === 'kpi_efficiency_001')!,
      mockKPITemplates.find(k => k.id === 'kpi_roi_001')!,
      mockKPITemplates.find(k => k.id === 'kpi_cost_001')!,
      mockKPITemplates.find(k => k.id === 'kpi_growth_001')!
    ],
    achievementTemplates: [
      mockAchievementTemplates.find(a => a.id === 'achievement_efficiency_001')!,
      mockAchievementTemplates.find(a => a.id === 'achievement_cost_001')!,
      mockAchievementTemplates.find(a => a.id === 'achievement_revenue_001')!,
      mockAchievementTemplates.find(a => a.id === 'achievement_satisfaction_001')!
    ],
    applicableIndustries: ['所有行业'],
    applicableScales: ['中型企业', '大型企业'],
    usageCount: 56,
    rating: 4.9,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-25'
  }
];

// 模板使用记录
export const mockTemplateUsages: TemplateUsage[] = [
  {
    id: 'usage_001',
    templateId: 'template_001',
    customerId: 'CUST-0001',
    customerName: '北京科技有限公司',
    valueBoardId: 'vb001',
    usedAt: '2024-01-20',
    feedback: {
      rating: 5,
      comment: '模板非常实用，帮助我们快速创建了专业的价值报告'
    }
  },
  {
    id: 'usage_002',
    templateId: 'template_002',
    customerId: 'CUST-0002',
    customerName: '上海智能科技有限公司',
    valueBoardId: 'vb002',
    usedAt: '2024-01-18',
    feedback: {
      rating: 4,
      comment: 'ROI分析很详细，客户很满意'
    }
  }
];