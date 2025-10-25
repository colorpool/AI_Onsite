import { JourneyTemplate, JourneyStage, JourneyNode, LaneType } from '../types/journey';

const stages: JourneyStage[] = [
  { id: 's1', title: '正式使用自然年1月份', periodLabel: '1月' },
  { id: 's2', title: '正式使用自然年2-4月份', periodLabel: '2-4月' },
  { id: 's3', title: '正式使用自然年5-7月份', periodLabel: '5-7月' },
  { id: 's4', title: '正式使用自然年8-9月份', periodLabel: '8-9月' },
  { id: 's5', title: '正式使用自然年10-12月份', periodLabel: '10-12月' },
];

const lanes: LaneType[] = ['用户运营', '系统提供信息', '营销/客成动作'];

const nodes: JourneyNode[] = [
  {
    id: 'n1',
    title: '年度预算沟通、总结汇报',
    status: '待办',
    owner: 'CSM-王五',
    dueDate: new Date().toISOString(),
    lane: '用户运营',
    stageId: 's1',
    description:
      '与客户确认年度预算，回顾上年度成果，形成总结与新年计划建议。',
    checklist: [
      { id: 'c1', text: '收集上年度数据', done: false },
      { id: 'c2', text: '草拟汇报文档', done: false },
      { id: 'c3', text: '与关键干系人评审', done: false },
    ],
  },
  {
    id: 'n2',
    title: '用户参与度监测',
    status: '进行中',
    owner: '系统',
    dueDate: new Date().toISOString(),
    lane: '系统提供信息',
    stageId: 's1',
    metrics: [
      { name: '用户参与度', type: 'percent', value: 85 },
      { name: '激活率', type: 'percent', value: 72 },
    ],
    description: '自动从系统采集参与活跃数据并生成趋势分析。',
  },
  {
    id: 'n3',
    title: '开年信件发送【年初】',
    status: '待办',
    owner: 'CSM-王五',
    dueDate: new Date().toISOString(),
    lane: '营销/客成动作',
    stageId: 's1',
    description: '撰写并发送开年致信，包含价值主张与行动安排。',
  },
  {
    id: 'n4',
    title: '季度使用评估与方案优化',
    status: '进行中',
    owner: 'CSM-王五',
    dueDate: new Date().toISOString(),
    lane: '用户运营',
    stageId: 's2',
    checklist: [
      { id: 'c4', text: '拉取季度报告', done: true },
      { id: 'c5', text: '梳理问题清单', done: false },
    ],
  },
  {
    id: 'n5',
    title: '粘合度趋势分析',
    status: '已完成',
    owner: '系统',
    dueDate: new Date().toISOString(),
    lane: '系统提供信息',
    stageId: 's2',
    metrics: [
      { name: '粘合度', type: 'percent', value: 63 },
    ],
  },
  {
    id: 'n6',
    title: '联合营销活动策划',
    status: '已逾期',
    owner: '市场-李四',
    dueDate: new Date().toISOString(),
    lane: '营销/客成动作',
    stageId: 's2',
  },
];

export const journeyTemplates: JourneyTemplate[] = [
  {
    id: 't1',
    name: '战略客户年度旅程',
    stages,
    lanes,
    nodes,
  },
  {
    id: 't2',
    name: '标准客户年度旅程',
    stages,
    lanes,
    nodes: nodes.map((n) => ({ ...n, id: `${n.id}-std` })),
  },
];