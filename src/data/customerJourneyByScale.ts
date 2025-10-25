import { CustomerJourney, JourneyAction } from '../types/customerJourney';
import { CustomerScale } from '../types/customerProfile';

// 基于客户规模的持续服务阶段旅程内容
export const continuousServiceActionsByScale: Record<CustomerScale, JourneyAction[]> = {
  // 重点客户 (Key Account) 的持续服务旅程
  key_account: [
    {
      id: 'action-2-ka-1',
      stageId: 'stage-2',
      title: '首个项目稳定运营期',
      description: '密切监控客户首批核心培训项目的学员学习数据，与管理员共同复盘项目运营情况，确保平台稳定运行。',
      type: 'check-in',
      priority: 'high',
      status: 'pending',
      triggerCondition: '项目上线后第1个月',
      assignee: '客户成功经理',
      estimatedDuration: '4小时',
      isRequired: true
    },
    {
      id: 'action-2-ka-2',
      stageId: 'stage-2',
      title: '首次季度业务回顾(QBR)',
      description: '与客户决策层共同复盘上线后90天的培训成果，展示数据报告与初步ROI，对齐下阶段的合作目标。',
      type: 'review',
      priority: 'high',
      status: 'pending',
      triggerCondition: '服务开始第3个月',
      assignee: '客户成功经理',
      estimatedDuration: '3小时',
      isRequired: true
    },
    {
      id: 'action-2-ka-3',
      stageId: 'stage-2',
      title: '培训体系拓展期',
      description: '基于客户年度培训计划，主动建议并将平台应用从单个项目扩展至更多培训类型（如合规、产品、领导力等）。',
      type: 'meeting',
      priority: 'high',
      status: 'pending',
      triggerCondition: '服务开始第4个月',
      assignee: '客户成功经理',
      estimatedDuration: '2小时',
      isRequired: true
    },
    {
      id: 'action-2-ka-4',
      stageId: 'stage-2',
      title: '学习效果量化与巩固期',
      description: '协助客户设计训后评估问卷或模型，将培训效果与业务表现进行初步关联，用以巩固平台的核心价值。',
      type: 'training',
      priority: 'medium',
      status: 'pending',
      triggerCondition: '服务开始第5个月',
      assignee: '客户成功经理',
      estimatedDuration: '3小时',
      isRequired: true
    },
    {
      id: 'action-2-ka-5',
      stageId: 'stage-2',
      title: '年度培训规划参与期',
      description: '主动参与到客户下一年度的培训规划讨论中，将平台定位为其实现年度培训目标的战略工具，为续约奠定基础。',
      type: 'meeting',
      priority: 'high',
      status: 'pending',
      triggerCondition: '服务开始第6个月',
      assignee: '客户成功经理',
      estimatedDuration: '4小时',
      isRequired: true
    }
  ],

  // 中端客户 (Mid-Market Customer) 的持续服务旅程
  mid_market: [
    {
      id: 'action-2-mm-1',
      stageId: 'stage-2',
      title: '3个月健康巡检',
      description: '与客户管理员进行线上会议，检查平台健康度（活跃度、功能使用率），解答疑问并分享同行业最佳实践。',
      type: 'check-in',
      priority: 'medium',
      status: 'pending',
      triggerCondition: '服务开始第3个月',
      assignee: '客户成功经理',
      estimatedDuration: '1.5小时',
      isRequired: true
    },
    {
      id: 'action-2-mm-2',
      stageId: 'stage-2',
      title: '半年度线上复盘会',
      description: '邀请客户参加线上复盘会议，分享其使用数据的亮点，并介绍能进一步提升其培训效率的产品功能。',
      type: 'review',
      priority: 'medium',
      status: 'pending',
      triggerCondition: '服务开始第6个月',
      assignee: '客户成功经理',
      estimatedDuration: '2小时',
      isRequired: true
    },
    {
      id: 'action-2-mm-3',
      stageId: 'stage-2',
      title: '功能深化应用',
      description: '邀请客户参加"高阶功能"主题的线上公开课或提供教学视频，鼓励客户使用能显著提升价值的进阶功能。',
      type: 'training',
      priority: 'medium',
      status: 'pending',
      triggerCondition: '服务开始第4个月',
      assignee: '客户成功经理',
      estimatedDuration: '1小时',
      isRequired: false
    },
    {
      id: 'action-2-mm-4',
      stageId: 'stage-2',
      title: '年度满意度调研',
      description: '在进入续约期前，主动与客户接口人电话沟通，或发放NPS问卷，评估客户的整体满意度和续约意向。',
      type: 'review',
      priority: 'medium',
      status: 'pending',
      triggerCondition: '合同到期前60天',
      assignee: '客户成功经理',
      estimatedDuration: '1小时',
      isRequired: true
    }
  ],

  // 小微客户 (SMB Customer) 的持续服务旅程
  smb: [
    {
      id: 'action-2-smb-1',
      stageId: 'stage-2',
      title: '自动化健康分预警',
      description: '系统基于客户活跃度、登录频率等数据自动计算健康分，当分数过低时，自动创建任务提醒CSM进行人工干预。',
      type: 'other',
      priority: 'low',
      status: 'pending',
      triggerCondition: '健康分低于70分时',
      assignee: '系统自动',
      estimatedDuration: '自动化',
      isRequired: true
    },
    {
      id: 'action-2-smb-2',
      stageId: 'stage-2',
      title: '线上公开课邀请',
      description: '通过邮件或产品内消息，定期邀请客户参加介绍产品通用功能或行业趋势的线上公开课，实现规模化赋能。',
      type: 'training',
      priority: 'low',
      status: 'pending',
      triggerCondition: '每月第二周',
      assignee: '市场部',
      estimatedDuration: '1小时',
      isRequired: false
    },
    {
      id: 'action-2-smb-3',
      stageId: 'stage-2',
      title: '新功能价值推送',
      description: '当产品发布新功能时，系统根据客户标签，自动向其推送相关的应用介绍和简短教程，确保客户知晓产品价值更新。',
      type: 'other',
      priority: 'low',
      status: 'pending',
      triggerCondition: '新功能发布时',
      assignee: '产品团队',
      estimatedDuration: '自动化',
      isRequired: false
    },
    {
      id: 'action-2-smb-4',
      stageId: 'stage-2',
      title: '年度NPS调研',
      description: '通过系统在签约后第10个月自动向客户管理员发送NPS调研问卷，规模化收集客户满意度数据。',
      type: 'review',
      priority: 'low',
      status: 'pending',
      triggerCondition: '签约后第10个月',
      assignee: '系统自动',
      estimatedDuration: '自动化',
      isRequired: true
    }
  ]
};

// 基于客户规模的续约管理阶段旅程内容
export const renewalActionsByScale: Record<CustomerScale, JourneyAction[]> = {
  // 重点客户续约管理旅程
  key_account: [
    {
      id: 'action-3-ka-1',
      stageId: 'stage-3',
      title: '续约策略沟通会',
      description: '提前90-120天，由客户成功经理与销售总监共同与客户决策层开会，回顾年度价值，并探讨下一周期的合作模式与目标。',
      type: 'meeting',
      priority: 'high',
      status: 'pending',
      triggerCondition: '合同到期前90-120天',
      assignee: '客户成功经理+销售总监',
      estimatedDuration: '3小时',
      isRequired: true
    },
    {
      id: 'action-3-ka-2',
      stageId: 'stage-3',
      title: '商业价值方案提报',
      description: '基于年度合作成果，为客户量身定制一份商业价值方案（包含ROI分析、新周期服务计划、报价方案），并正式提报。',
      type: 'review',
      priority: 'high',
      status: 'pending',
      triggerCondition: '合同到期前60天',
      assignee: '客户成功经理',
      estimatedDuration: '4小时',
      isRequired: true
    },
    {
      id: 'action-3-ka-3',
      stageId: 'stage-3',
      title: '商务谈判与合同敲定',
      description: '由销售主导，客户成功经理辅助，就合同价格、服务条款、SLA等细节进行谈判，扫清续约的所有商务障碍。',
      type: 'meeting',
      priority: 'high',
      status: 'pending',
      triggerCondition: '合同到期前30天',
      assignee: '销售+客户成功经理',
      estimatedDuration: '2小时',
      isRequired: true
    },
    {
      id: 'action-3-ka-4',
      stageId: 'stage-3',
      title: '续约成功与新周期启动',
      description: '在合同签署后，立即发送感谢函，并预约"新周期战略合作启动会"，无缝衔接下一年度的持续服务旅程。',
      type: 'other',
      priority: 'high',
      status: 'pending',
      triggerCondition: '合同签署后',
      assignee: '客户成功经理',
      estimatedDuration: '1小时',
      isRequired: true
    }
  ],

  // 中端客户续约管理旅程
  mid_market: [
    {
      id: 'action-3-mm-1',
      stageId: 'stage-3',
      title: '续约意向确认与报价',
      description: '提前90天，客户成功经理主动与客户联系人沟通续约意向，并发送标准化的续约报价单与服务说明。',
      type: 'meeting',
      priority: 'medium',
      status: 'pending',
      triggerCondition: '合同到期前90天',
      assignee: '客户成功经理',
      estimatedDuration: '1.5小时',
      isRequired: true
    },
    {
      id: 'action-3-mm-2',
      stageId: 'stage-3',
      title: '续约价值回顾',
      description: '为客户提供一份年度使用报告和价值摘要，通过线上会议或邮件方式，重申产品在过去一年中为其带来的核心价值。',
      type: 'review',
      priority: 'medium',
      status: 'pending',
      triggerCondition: '合同到期前60天',
      assignee: '客户成功经理',
      estimatedDuration: '2小时',
      isRequired: true
    },
    {
      id: 'action-3-mm-3',
      stageId: 'stage-3',
      title: '合同签署与付款跟进',
      description: '协助客户完成内部审批流程，提供必要的合同文件，并跟进财务付款进度，确保续约流程顺利完成。',
      type: 'other',
      priority: 'medium',
      status: 'pending',
      triggerCondition: '合同到期前30天',
      assignee: '客户成功经理',
      estimatedDuration: '1小时',
      isRequired: true
    }
  ],

  // 小微客户续约管理旅程
  smb: [
    {
      id: 'action-3-smb-1',
      stageId: 'stage-3',
      title: '自动化续约提醒',
      description: '系统在合同到期前90/60/30天，自动通过邮件和产品内消息向客户发送续约提醒和在线续约链接。',
      type: 'other',
      priority: 'low',
      status: 'pending',
      triggerCondition: '合同到期前90/60/30天',
      assignee: '系统自动',
      estimatedDuration: '自动化',
      isRequired: true
    },
    {
      id: 'action-3-smb-2',
      stageId: 'stage-3',
      title: '在线续约与支付',
      description: '引导客户通过在线支付平台自助完成续约操作，系统自动处理订单、生成新合同并开具发票。',
      type: 'other',
      priority: 'low',
      status: 'pending',
      triggerCondition: '客户点击续约链接时',
      assignee: '系统自动',
      estimatedDuration: '自助服务',
      isRequired: true
    },
    {
      id: 'action-3-smb-3',
      stageId: 'stage-3',
      title: '续约成功通知',
      description: '客户完成支付后，系统自动发送续约成功的确认邮件，并更新其账户的服务有效期。',
      type: 'other',
      priority: 'low',
      status: 'pending',
      triggerCondition: '支付完成后',
      assignee: '系统自动',
      estimatedDuration: '自动化',
      isRequired: true
    }
  ]
};

// 根据客户规模获取定制化的客户旅程
export const getCustomerJourneyByScale = (
  customerId: string, 
  customerName: string, 
  customerScale: CustomerScale,
  lifecycle: 'continuous' | 'renewal'
): CustomerJourney => {
  // 基础旅程模板
  const baseJourney: CustomerJourney = {
    customerId,
    customerName,
    currentStage: lifecycle === 'continuous' ? 'stage-2' : 'stage-3',
    lifecycle,
    startDate: new Date().toISOString().split('T')[0],
    stages: [
      {
        id: 'stage-1',
        name: '交接实施',
        description: '客户服务交接和实施阶段，建立基础服务框架',
        phase: 'onboarding',
        order: 1,
        duration: '1个月',
        isCompleted: true,
        isActive: false,
        startDate: '2024-01-01',
        completedDate: '2024-01-31'
      },
      {
        id: 'stage-2',
        name: '持续服务',
        description: '服务进入稳定运行期，定期跟进和优化',
        phase: 'continuous',
        order: 2,
        duration: '5个月',
        isCompleted: lifecycle === 'renewal',
        isActive: lifecycle === 'continuous',
        startDate: '2024-02-01',
        ...(lifecycle === 'renewal' && { completedDate: '2024-06-30' })
      },
      {
        id: 'stage-3',
        name: '续约管理',
        description: '对服务效果进行全面评估，准备续约或调整',
        phase: 'renewal',
        order: 3,
        duration: '1个月',
        isCompleted: false,
        isActive: lifecycle === 'renewal',
        ...(lifecycle === 'renewal' && { startDate: '2024-07-01' })
      },
      {
        id: 'stage-4',
        name: '召回孵化',
        description: '客户召回和重新孵化阶段，重新激活客户价值',
        phase: 'churn',
        order: 4,
        duration: '2个月',
        isCompleted: false,
        isActive: false
      }
    ],
    actions: [],
    milestones: []
  };

  // 根据生命周期和客户规模选择对应的行动计划
  if (lifecycle === 'continuous') {
    baseJourney.actions = continuousServiceActionsByScale[customerScale];
  } else if (lifecycle === 'renewal') {
    baseJourney.actions = renewalActionsByScale[customerScale];
  }

  // 添加里程碑（可以根据需要进一步定制）
  baseJourney.milestones = [
    {
      id: 'milestone-1',
      title: '服务启动',
      description: '客户服务正式启动',
      date: baseJourney.startDate,
      type: 'onboarding_completed',
      isAchieved: true,
      stageId: 'stage-1'
    }
  ];

  return baseJourney;
};

// 获取客户规模的显示配置
export const getScaleDisplayConfig = (scale: CustomerScale) => {
  const configs = {
    key_account: {
      name: '重点客户',
      color: '#722ed1',
      description: '战略级合作伙伴，需要高度定制化服务'
    },
    mid_market: {
      name: '中端客户',
      color: '#1890ff', 
      description: '标准化服务为主，适度个性化'
    },
    smb: {
      name: '小微客户',
      color: '#52c41a',
      description: '自动化和规模化服务'
    }
  };
  
  return configs[scale];
};