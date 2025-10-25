import { CustomerJourney, JourneyStage, JourneyAction, JourneyMilestone } from '../types/customerJourney';

// 持续服务客户旅程模板
export const continuousServiceJourneyTemplate: CustomerJourney = {
  customerId: '',
  customerName: '',
  currentStage: 'stage-2',
  lifecycle: 'continuous',
  startDate: '2024-01-01',
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
      isCompleted: false,
      isActive: true,
      startDate: '2024-02-01'
    },
    {
      id: 'stage-3',
      name: '续约管理',
      description: '对服务效果进行全面评估，准备续约或调整',
      phase: 'renewal',
      order: 3,
      duration: '1个月',
      isCompleted: false,
      isActive: false
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
  actions: [
    {
      id: 'action-1-1',
      stageId: 'stage-1',
      title: '服务启动会议',
      description: '与客户召开服务启动会议，明确服务目标',
      type: 'meeting',
      priority: 'high',
      status: 'completed',
      triggerCondition: '服务合同签署后3个工作日内',
      dueDate: '2024-01-05',
      completedDate: '2024-01-05',
      assignee: '客户成功经理',
      estimatedDuration: '2小时',
      isRequired: true
    },
    {
      id: 'action-2-1',
      stageId: 'stage-2',
      title: '第6个月汇报会',
      description: '服务第6个月全面汇报和下阶段规划',
      type: 'meeting',
      priority: 'high',
      status: 'pending',
      triggerCondition: '服务开始第6个月',
      dueDate: '2024-07-15',
      assignee: '客户成功经理',
      estimatedDuration: '3小时',
      isRequired: true
    },
    {
      id: 'action-2-2',
      stageId: 'stage-2',
      title: '客户满意度调研',
      description: '进行客户满意度调研和反馈收集',
      type: 'review',
      priority: 'medium',
      status: 'overdue',
      triggerCondition: '服务第5个月末',
      dueDate: '2024-06-30',
      assignee: '客户成功经理',
      estimatedDuration: '2小时',
      isRequired: false
    }
  ],
  milestones: [
    {
      id: 'milestone-1-1',
      title: '服务启动会议',
      description: '与客户召开服务启动会议，明确服务目标和期望',
      date: '2024-01-05',
      type: 'onboarding_completed',
      isAchieved: true,
      stageId: 'stage-1'
    },
    {
      id: 'milestone-2-1',
      title: '第6个月汇报会',
      description: '服务第6个月全面汇报和下阶段规划',
      date: '2024-07-15',
      type: 'other',
      isAchieved: false,
      stageId: 'stage-2'
    }
  ]
};

// 续约管理客户旅程模板
export const renewalJourneyTemplate: CustomerJourney = {
  customerId: '',
  customerName: '',
  currentStage: 'stage-2',
  lifecycle: 'renewal',
  startDate: '2024-06-01',
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
      startDate: '2024-06-01',
      completedDate: '2024-06-30'
    },
    {
      id: 'stage-2',
      name: '持续服务',
      description: '服务进入稳定运行期，定期跟进和优化',
      phase: 'continuous',
      order: 2,
      duration: '5个月',
      isCompleted: true,
      isActive: false,
      startDate: '2024-07-01',
      completedDate: '2024-11-30'
    },
    {
      id: 'stage-3',
      name: '续约管理',
      description: '与客户进行续约条件谈判和确认',
      phase: 'renewal',
      order: 3,
      duration: '2个月',
      isCompleted: false,
      isActive: true,
      startDate: '2024-12-01'
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
  actions: [
    {
      id: 'action-1-1',
      stageId: 'stage-1',
      title: '客户续约意向确认',
      description: '与客户确认续约意向和基本需求',
      type: 'meeting',
      priority: 'high',
      status: 'completed',
      triggerCondition: '合同到期前90天',
      dueDate: '2024-06-05',
      completedDate: '2024-06-03',
      assignee: '客户成功经理',
      estimatedDuration: '2小时',
      isRequired: true
    },
    {
      id: 'action-2-1',
      stageId: 'stage-2',
      title: '价格谈判',
      description: '与客户进行续约价格和条件谈判',
      type: 'meeting',
      priority: 'high',
      status: 'in_progress',
      triggerCondition: '方案展示后',
      dueDate: '2024-07-05',
      assignee: '商务经理',
      estimatedDuration: '2小时',
      isRequired: true
    },
    {
      id: 'action-3-1',
      stageId: 'stage-3',
      title: '合同签署仪式',
      description: '举行正式的合同签署仪式',
      type: 'meeting',
      priority: 'high',
      status: 'pending',
      triggerCondition: '合同文件准备完成后',
      dueDate: '2024-07-15',
      assignee: '商务经理',
      estimatedDuration: '2小时',
      isRequired: true
    }
  ],
  milestones: [
    {
      id: 'milestone-1-1',
      title: '续约需求调研',
      description: '了解客户续约需求和期望',
      date: '2024-06-07',
      type: 'renewal_started',
      isAchieved: true,
      stageId: 'stage-1'
    },
    {
      id: 'milestone-3-1',
      title: '合同签署',
      description: '完成续约合同正式签署',
      date: '2024-07-15',
      type: 'contract_signed',
      isAchieved: false,
      stageId: 'stage-3'
    }
  ]
};

// 根据客户ID和生命周期类型获取客户旅程数据
export const getCustomerJourney = (customerId: string, customerName: string, lifecycle: 'continuous' | 'renewal'): CustomerJourney => {
  const template = lifecycle === 'continuous' ? continuousServiceJourneyTemplate : renewalJourneyTemplate;
  
  return {
    ...template,
    customerId: customerId,
    customerName: customerName
  };
};

// 获取客户旅程统计信息
export const getJourneyStats = (journey: CustomerJourney) => {
  const totalStages = journey.stages.length;
  const completedStages = journey.stages.filter(stage => stage.isCompleted).length;
  const totalActions = journey.actions.length;
  const completedActions = journey.actions.filter(action => action.status === 'completed').length;
  const overdueActions = journey.actions.filter(action => action.status === 'overdue').length;
  const pendingActions = journey.actions.filter(action => action.status === 'pending').length;
  
  return {
    stageProgress: Math.round((completedStages / totalStages) * 100),
    actionProgress: Math.round((completedActions / totalActions) * 100),
    totalStages,
    completedStages,
    totalActions,
    completedActions,
    overdueActions,
    pendingActions
  };
};