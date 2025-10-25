// 持续服务相关类型定义

// 客户健康度等级
export type HealthLevel = '健康' | '一般' | '风险';

// 客户生命周期阶段
export type LifecycleStage = '成长期' | '成熟期' | '衰退期';

// 客户定级
export type CustomerTier = 'strategic' | 'large' | 'medium' | 'small';

// 关键动作类型
export type ActionType = 'A1' | 'A2' | 'A3' | 'A4' | 'A5';

// 风险事件状态
export type RiskEventStatus = '待处理' | '处理中' | '已解决' | '已关闭';

// 价值看板状态
export type ValueBoardStatus = '草稿' | '进行中' | '已完成' | '已归档';

// QBR会议状态
export type QBRStatus = '待召开' | '已完成' | '已取消';

// 服务剧本状态
export type PlaybookStatus = '可用' | '维护中' | '已停用';

// 剧本触发条件类型
export type TriggerConditionType = 'health_score' | 'arr_value' | 'login_days' | 'contract_days' | 'custom';

// 剧本执行状态
export type PlaybookExecutionStatus = 'pending' | 'in_progress' | 'completed' | 'paused' | 'cancelled';

// 任务状态
export type PlaybookTaskStatus = 'pending' | 'in_progress' | 'completed' | 'overdue' | 'skipped';

// 合同信息
export interface Contract {
  id: string;
  contractNumber: string; // 合同编号 (如 CONT-2023-001)
  customerId: string; // 关联的客户档案编号
  contractType: 'new' | 'renewal' | 'upgrade' | 'expansion'; // 合同类型：新签/续约/升级/扩展
  amount: number; // 合同金额
  startDate: string; // 合同开始日期
  endDate: string; // 合同结束日期
  status: 'active' | 'expired' | 'terminated'; // 合同状态
  servicePeriod: string; // 服务周期描述
  purchasedProducts: string[]; // 购买的产品/服务
  accountCount: number; // 购买的账号数
  salesSource: 'direct' | 'channel'; // 销售来源
  salesPerson?: string; // 销售人员（直营）
  channelPartner?: string; // 渠道合作伙伴（渠道）
  
  // 扩展字段
  userVersion?: string; // 人数版本
  ticketVersion?: string; // 提单版本
  ticketTime?: string; // 提单时间
  tianyuanOrderStatus?: 'active' | 'inactive' | 'pending'; // 天元订单是否生效
  tianyuanOrderId?: string; // 天元订单号
  serviceCost?: number; // 服务成本（如送礼等投入）
  serviceCostDetails?: string[]; // 服务成本明细
  attachments?: ContractAttachment[]; // 合同附件
  
  createdAt: string;
  updatedAt: string;
}

// 合同附件
export interface ContractAttachment {
  id: string;
  name: string;
  type: 'contract' | 'supplement' | 'invoice' | 'other';
  url: string;
  size: number;
  uploadDate: string;
}

// 交接单信息
export interface HandoverRecord {
  id: string;
  handoverNumber: string; // 交接单编号 (如 HAND-2023-001)
  customerId: string; // 关联的客户档案编号
  contractId: string; // 关联的合同编号
  status: 'pending' | 'in_progress' | 'completed' | 'archived'; // 交接状态
  createdAt: string; // 交接单创建时间
  completedAt?: string; // 交接完成时间
  archivedAt?: string; // 归档时间
}

// 联系人信息
export interface ContactInfo {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  isPrimary: boolean;
  // 干系表相关字段
  stakeholderType?: 'decision_maker' | 'supporter' | 'opponent' | 'influencer' | 'user' | 'other'; // 干系人类型
  influence?: 'high' | 'medium' | 'low'; // 影响力
  attitude?: 'positive' | 'neutral' | 'negative'; // 态度
  department?: string; // 部门
  notes?: string; // 备注
}

// 客户档案信息（全生命周期）
export interface Customer {
  id: string; // 客户档案编号 (如 CUST-0001)
  name: string; // 客户名称
  industry?: string; // 行业
  scale?: string; // 企业规模
  
  // 服务信息
  csm: string; // 客户成功经理
  arr: number; // Annual Recurring Revenue
  healthScore: number; // 健康分 0-100
  healthLevel: HealthLevel;
  lifecycleStage: LifecycleStage; // 生命周期阶段
  customerTier?: CustomerTier; // 客户定级
  salesPerson?: string; // 销售人员
  
  // 产品和联系人信息
  purchasedProducts: string[]; // 已购产品/服务
  keyContacts: ContactInfo[]; // 关键联系人
  connectionLevel?: number; // 建联度 1-5
  
  // 当前合同信息（最新的活跃合同）
  currentContract?: Contract;
  
  // 历史记录
  contracts: Contract[]; // 所有合同记录
  handoverRecords: HandoverRecord[]; // 所有交接单记录
  
  // 续约相关
  nextRenewalDate?: string; // 下次续约日期
  serviceExpiryDate?: string; // 服务到期日期（基于当前合同）
  isRenewalRisk: boolean; // 是否续约风险
  
  // 新增字段
  ticketExpiryDate?: string; // 提单到期时间
  contractStartDate?: string; // 合同开始时间
  contractEndDate?: string; // 合同结束时间
  customerSegment?: string; // 客户分层
  
  // 互动记录
  lastContactDate: string; // 最后接触日期
  serviceRecords: ServiceRecord[]; // 服务记录
  
  // 待办任务
  todoTasks: TodoTask[]; // 待办任务列表
  
  // 星标功能
  isFavorite?: boolean; // 是否星标客户
  
  // 时间戳
  createdAt: string; // 客户档案创建时间（通常是首次交接完成时间）
  updatedAt: string;
}

// 服务记录类型
export type ServiceRecordType = 'QBR' | '电话回访' | '培训' | '工单解决' | '风险处理' | '产品演示' | '技术支持' | '商务沟通' | '其他';

// 待办任务状态
export type TodoTaskStatus = 'pending' | 'in_progress' | 'completed' | 'overdue';

// 待办任务类型
export type TodoTaskType = 'business-review' | 'renewal' | 'training' | 'report' | 'survey' | 'meeting' | 'demo' | 'contract' | 'follow-up' | 'other';

// 待办任务
export interface TodoTask {
  id: string;
  title: string;
  description?: string;
  type: TodoTaskType;
  status: TodoTaskStatus;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignedTo: string;
  customerId: string;
  customerName: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

// 服务记录
export interface ServiceRecord {
  id: string;
  type: ServiceRecordType; // 记录类型
  title: string; // 记录标题
  content: string; // 记录内容
  operator: string; // 操作人
  timestamp: string; // 时间戳
  relatedPlaybookId?: string; // 关联的Playbook ID
  relatedRiskEventId?: string; // 关联的风险事件ID
  tags?: string[]; // 标签
  attachments?: string[]; // 附件
  createdAt: string;
  updatedAt: string;
}

// 价值看板
export interface ValueBoard {
  id: string;
  customerId: string;
  customerName: string;
  title: string;
  description: string;
  status: ValueBoardStatus;
  kpis: ValueKPI[];
  achievements: Achievement[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// 价值KPI
export interface ValueKPI {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

// 价值成果
export interface Achievement {
  id: string;
  title: string;
  description: string;
  impact: string; // 业务影响
  date: string;
}

// QBR会议
export interface QBRMeeting {
  id: string;
  customerId: string;
  customerName: string;
  title: string;
  scheduledDate: string;
  status: QBRStatus;
  agenda: string[];
  attendees: string[];
  outcomes?: string[];
  nextSteps?: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// 风险事件
export interface RiskEvent {
  id: string;
  customerId: string;
  customerName: string;
  riskType: string; // 风险类型
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical'; // 严重程度
  status: RiskEventStatus;
  assignedTo: string; // 负责人
  dueDate: string;
  resolution?: string; // 解决方案
  createdAt: string;
  updatedAt: string;
}

// 剧本触发条件
export interface TriggerCondition {
  id: string;
  type: TriggerConditionType;
  field: string; // 字段名
  operator: 'gt' | 'lt' | 'eq' | 'gte' | 'lte' | 'in' | 'not_in'; // 操作符
  value: any; // 条件值
  description: string; // 条件描述
}

// 成功指标
export interface SuccessMetric {
  id: string;
  name: string;
  description: string;
  targetValue: number;
  unit: string;
  measurementMethod: string; // 测量方法
}

// 剧本资源
export interface PlaybookResource {
  id: string;
  type: 'email_template' | 'script' | 'document' | 'case_study' | 'tool' | 'other';
  name: string;
  description: string;
  url?: string; // 资源链接
  content?: string; // 资源内容
  tags: string[];
}

// 服务剧本
export interface ServicePlaybook {
  id: string;
  name: string;
  description: string;
  goal: string; // 剧本目标
  applicableStage: LifecycleStage[]; // 适用阶段
  category: string; // 剧本分类
  scenarioTags: string[]; // 适用场景标签
  status: PlaybookStatus;
  
  // 触发配置
  triggerConditions: TriggerCondition[]; // 触发条件
  autoTrigger: boolean; // 是否自动触发
  
  // 任务流配置
  tasks: PlaybookTask[]; // 任务列表（替代原来的steps）
  
  // 成功指标
  successMetrics: SuccessMetric[];
  
  // 资源配置
  resources: PlaybookResource[];
  
  // 统计信息
  estimatedDuration: number; // 预估耗时（小时）
  successRate: number; // 成功率
  usage: number; // 使用次数
  
  // 元信息
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  lastExecutedAt?: string; // 最后执行时间
}

// 剧本任务（替代原来的PlaybookStep）
export interface PlaybookTask {
  id: string;
  title: string;
  description: string; // 详细操作指引
  phase: string; // 任务阶段（如：诊断分析、客户沟通、方案执行等）
  
  // 时间配置
  duration: number; // 预估耗时（小时）
  dueOffset: number; // 相对于剧本启动的截止天数
  
  // 责任人配置
  defaultAssignee: 'csm' | 'csm_manager' | 'support' | 'sales' | 'custom'; // 默认负责人类型
  customAssignee?: string; // 自定义负责人
  
  // 任务资源
  requiredResources: string[]; // 所需资源ID列表
  
  // 检查点
  checkpoints: string[]; // 检查点列表
  
  // 依赖关系
  dependencies: string[]; // 依赖的任务ID列表
  
  // 任务配置
  isOptional: boolean; // 是否可选任务
  allowSkip: boolean; // 是否允许跳过
}

// 关键动作配置
export interface KeyAction {
  id: ActionType;
  title: string;
  description: string;
  icon: string;
  color: string;
  route?: string; // 跳转路由
  enabled: boolean;
}

// 持续服务概览数据
export interface ServiceOverview {
  totalCustomers: number;
  avgHealthScore: number;
  riskCustomers: number;
  healthDistribution: {
    healthy: number;
    normal: number;
    risky: number;
  };
  lifecycleDistribution: {
    growth: number;
    mature: number;
    decline: number;
  };
}

// 客户筛选条件
export interface CustomerFilter {
  name?: string;
  csm?: string;
  healthLevel?: HealthLevel;
  lifecycleStage?: LifecycleStage;
  renewalRisk?: boolean;
  healthScoreRange?: [number, number];
  isFavorite?: boolean;
}

// 剧本执行实例
export interface PlaybookExecution {
  id: string;
  playbookId: string; // 关联的剧本ID
  playbookName: string;
  customerId: string;
  customerName: string;
  
  // 执行状态
  status: PlaybookExecutionStatus;
  progress: number; // 进度百分比 0-100
  
  // 启动信息
  launchedBy: string; // 启动人
  launchType: 'auto' | 'manual'; // 启动方式
  launchReason?: string; // 启动原因
  
  // 时间信息
  startedAt: string; // 启动时间
  expectedEndAt: string; // 预期完成时间
  completedAt?: string; // 实际完成时间
  pausedAt?: string; // 暂停时间
  
  // 任务执行情况
  taskExecutions: PlaybookTaskExecution[];
  
  // 执行结果
  successMetricResults?: SuccessMetricResult[];
  notes?: string; // 执行备注
  
  createdAt: string;
  updatedAt: string;
}

// 剧本任务执行实例
export interface PlaybookTaskExecution {
  id: string;
  executionId: string; // 关联的剧本执行ID
  taskId: string; // 关联的任务ID
  taskTitle: string;
  
  // 任务状态
  status: PlaybookTaskStatus;
  
  // 分派信息
  assignedTo: string; // 实际负责人
  assignedAt: string; // 分派时间
  
  // 时间信息
  dueDate: string; // 截止日期
  startedAt?: string; // 开始时间
  completedAt?: string; // 完成时间
  
  // 执行结果
  result?: string; // 执行结果
  notes?: string; // 执行备注
  attachments?: string[]; // 相关附件
  
  // 检查点完成情况
  checkpointResults: CheckpointResult[];
  
  createdAt: string;
  updatedAt: string;
}

// 检查点结果
export interface CheckpointResult {
  checkpointId: string;
  description: string;
  completed: boolean;
  completedAt?: string;
  notes?: string;
}

// 成功指标结果
export interface SuccessMetricResult {
  metricId: string;
  metricName: string;
  targetValue: number;
  actualValue?: number;
  achieved: boolean;
  measuredAt?: string;
  notes?: string;
}

// 剧本推荐
export interface PlaybookRecommendation {
  id: string;
  customerId: string;
  playbookId: string;
  playbookName: string;
  
  // 推荐信息
  reason: string; // 推荐原因
  confidence: number; // 推荐置信度 0-100
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  // 触发信息
  triggeredBy: string[]; // 触发条件描述
  triggeredAt: string; // 触发时间
  
  // 状态
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  handledBy?: string; // 处理人
  handledAt?: string; // 处理时间
  
  // 执行信息
  executionId?: string; // 如果已启动，关联的执行ID
  
  createdAt: string;
  updatedAt: string;
}

// 图表数据
export interface ChartData {
  name: string;
  value: number;
  color?: string;
}
