import { Agent, KnowledgeBase, AgentSkill } from '../types/agent';

// 模拟的 Agent 数据
export const mockAgents: Agent[] = [
  {
    id: 'agent-001',
    name: '数据看板配置助手',
    role: '小智',
    avatarUrl: '/api/avatar/agent-001.png',
    status: 'running',
    metrics: {
      servedCustomers: 156,
      resolvedIssues: 89,
      escalationRate: 0.05, // 5%
    },
    deployedChannels: ['web-chat', 'wecom'],
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'agent-002',
    name: '客户服务专员',
    role: '小美',
    avatarUrl: '/api/avatar/agent-002.png',
    status: 'paused',
    metrics: {
      servedCustomers: 203,
      resolvedIssues: 145,
      escalationRate: 0.08, // 8%
    },
    deployedChannels: ['web-chat', 'lark'],
    createdAt: '2024-01-10T14:20:00Z',
  },
  {
    id: 'agent-003',
    name: '产品咨询专家',
    role: '小博',
    avatarUrl: '/api/avatar/agent-003.png',
    status: 'draft',
    metrics: {
      servedCustomers: 0,
      resolvedIssues: 0,
      escalationRate: 0,
    },
    deployedChannels: [],
    createdAt: '2024-01-20T09:15:00Z',
  },
  {
    id: 'agent-004',
    name: '技术支持工程师',
    role: '小技',
    avatarUrl: '/api/avatar/agent-004.png',
    status: 'running',
    metrics: {
      servedCustomers: 89,
      resolvedIssues: 67,
      escalationRate: 0.12, // 12%
    },
    deployedChannels: ['web-chat'],
    createdAt: '2024-01-18T16:45:00Z',
  },
  {
    id: 'agent-005',
    name: '销售顾问',
    role: '小销',
    avatarUrl: '/api/avatar/agent-005.png',
    status: 'running',
    metrics: {
      servedCustomers: 234,
      resolvedIssues: 198,
      escalationRate: 0.03, // 3%
    },
    deployedChannels: ['wecom', 'lark'],
    createdAt: '2024-01-12T11:20:00Z',
  },
];

// 模拟的知识库数据
export const mockKnowledgeBases: KnowledgeBase[] = [
  {
    id: 'kb-001',
    name: '产品使用手册',
    description: '包含所有产品功能的详细使用说明和最佳实践',
  },
  {
    id: 'kb-002',
    name: '常见问题解答',
    description: '客户经常遇到的问题和标准答案',
  },
  {
    id: 'kb-003',
    name: '技术文档',
    description: 'API文档、集成指南和技术规格说明',
  },
  {
    id: 'kb-004',
    name: '销售资料',
    description: '产品介绍、价格表和销售话术',
  },
  {
    id: 'kb-005',
    name: '客户案例',
    description: '成功案例和客户使用场景',
  },
  {
    id: 'kb-006',
    name: '培训材料',
    description: '新员工培训和客户培训资料',
  },
];

// 模拟的 Agent 技能数据
export const mockAgentSkills: AgentSkill[] = [
  {
    id: 'skill-001',
    name: '查看客户信息',
    description: '获取客户基本信息和历史记录',
  },
  {
    id: 'skill-002',
    name: '创建工单',
    description: '为客户创建支持工单',
  },
  {
    id: 'skill-003',
    name: '查询订单状态',
    description: '查看客户订单的当前状态',
  },
  {
    id: 'skill-004',
    name: '修改客户配置',
    description: '更新客户的系统配置',
    isSensitive: true,
  },
  {
    id: 'skill-005',
    name: '发送通知',
    description: '向客户发送系统通知和提醒',
  },
];
