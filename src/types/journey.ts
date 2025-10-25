export type NodeStatus = '待办' | '进行中' | '已完成' | '已逾期';

export type LaneType = '用户运营' | '系统提供信息' | '营销/客成动作';

export interface JourneyNodeMetric {
  name: string;
  type: 'percent' | 'number';
  value: number;
}

export interface JourneyChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export interface JourneyComment {
  id: string;
  author: string;
  content: string;
  createdAt: string; // ISO string
}

export interface JourneyNode {
  id: string;
  title: string;
  status: NodeStatus;
  owner?: string;
  dueDate?: string; // ISO string
  lane: LaneType;
  stageId: string;
  metrics?: JourneyNodeMetric[];
  description?: string;
  checklist?: JourneyChecklistItem[];
  attachments?: { id: string; name: string; url?: string }[];
  comments?: JourneyComment[];
}

export interface JourneyStage {
  id: string;
  title: string;
  periodLabel: string;
}

export interface JourneyTemplate {
  id: string;
  name: string;
  stages: JourneyStage[];
  lanes: LaneType[];
  nodes: JourneyNode[];
}