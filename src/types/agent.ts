// AI Agent 的状态
export type AgentStatus = 'running' | 'paused' | 'draft';

// 代表一个 AI Agent（"分身"）
export interface Agent {
  id: string;
  name: string; // 内部名称，例如："数据看板配置助手"
  role: string; // 对外展示的角色名，例如："小智"
  avatarUrl: string;
  status: AgentStatus;
  // 用于仪表盘卡片的关键指标
  metrics: {
    servedCustomers: number; // 服务客户数
    resolvedIssues: number;  // 解决问题数
    escalationRate: number; // 转人工率，例如：0.05 代表 5%
  };
  // Agent 部署的渠道
  deployedChannels: ('web-chat' | 'wecom' | 'lark')[];
  createdAt: string; // ISO 格式的日期字符串
}

// 代表一个可供 Agent 使用的知识库
export interface KnowledgeBase {
  id: string;
  name: string;
  description: string;
}

// 代表一个可授权给 Agent 执行的系统操作（API 调用）
export interface AgentSkill {
  id: string;
  name: string;
  description: string;
  isSensitive?: boolean; // 是否为敏感权限
}

// Agent 创建表单的数据结构
export interface AgentCreateFormData {
  name: string;
  role: string;
  personality: 'professional' | 'enthusiastic' | 'concise';
  avatarUrl: string;
  knowledgeBases: string[];
  skills: string[];
  channels: ('web-chat' | 'wecom' | 'lark')[];
}
