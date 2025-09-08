import React, { useState, useMemo } from 'react';
import { message } from 'antd';
import { useTabManager } from '../../../contexts/TabContext';
import CustomerDetailModal from './customer-detail-modal';
import {
  Card,
  Row,
  Col,
  Tabs,
  Table,
  Tag,
  Progress,
  Statistic,
  Space,
  Typography,
  Button,
  Timeline,
  Badge,
  Tooltip,
  Avatar,
  Divider,
  Alert,
  Select,
  DatePicker,
  Input,
  List
} from 'antd';
import {
  RiseOutlined,
  FallOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  BarChartOutlined,
  PlayCircleOutlined,
  EditOutlined,
  PlusOutlined,
  FireOutlined
} from '@ant-design/icons';
import type { TabsProps } from 'antd';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

// 迷你趋势图组件
const Sparkline: React.FC<{ data: number[]; color?: string }> = ({ data, color = '#52c41a' }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 60;
    const y = 20 - ((value - min) / range) * 16;
    return `${x},${y}`;
  }).join(' ');
  
  // 判断趋势方向
  const isUpward = data[data.length - 1] > data[0];
  const isDownward = data[data.length - 1] < data[0];
  const trendColor = isDownward ? '#fa541c' : isUpward ? '#52c41a' : '#8c8c8c';
  
  return (
    <svg width="60" height="20" style={{ marginTop: '4px' }}>
      <polyline
        points={points}
        fill="none"
        stroke={trendColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 添加小圆点标记最新值 */}
      <circle
        cx={60}
        cy={20 - ((data[data.length - 1] - min) / range) * 16}
        r="1.5"
        fill={trendColor}
      />
    </svg>
  );
};

// 关键任务组件
const KeyTaskComponent: React.FC<{ 
  task: Task; 
  onTaskClick: (task: Task) => void;
  onEditTask: (task: Task) => void;
}> = ({ task, onTaskClick, onEditTask }) => {
  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'in_progress':
        return <ClockCircleOutlined style={{ color: '#1890ff' }} />;
      default:
        return <div style={{ 
          width: '14px', 
          height: '14px', 
          border: '2px solid #d9d9d9', 
          borderRadius: '2px',
          cursor: 'pointer'
        }} />;
    }
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high': return '#fa541c';
      case 'medium': return '#faad14';
      default: return '#52c41a';
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div 
      style={{
        border: '1px solid #f0f0f0',
        borderRadius: '6px',
        padding: '8px 10px',
        background: '#fafafa',
        cursor: 'pointer',
        transition: 'all 0.2s',
        position: 'relative'
      }}
      onClick={() => onTaskClick(task)}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#1890ff';
        e.currentTarget.style.background = '#f6f9ff';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#f0f0f0';
        e.currentTarget.style.background = '#fafafa';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
        <div style={{ marginTop: '2px' }}>
          {getStatusIcon()}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ 
            fontSize: '13px', 
            fontWeight: 500, 
            color: '#262626',
            marginBottom: '4px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {task.title}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Avatar size={16} style={{ backgroundColor: getPriorityColor(), fontSize: '10px' }}>
              {task.assignee.charAt(0)}
            </Avatar>
            <span style={{ 
              fontSize: '11px', 
              color: isOverdue ? '#fa541c' : '#8c8c8c'
            }}>
              {task.dueDate}
            </span>
          </div>
        </div>
        <Button 
          type="text" 
          size="small" 
          icon={<EditOutlined />}
          style={{ 
            padding: '2px 4px', 
            height: 'auto',
            minWidth: 'auto',
            opacity: 0.6
          }}
          onClick={(e) => {
            e.stopPropagation();
            onEditTask(task);
          }}
        />
      </div>
      {task.priority === 'high' && (
        <div style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#fa541c'
        }} />
      )}
    </div>
  );
};

// 续约状态类型
type RenewalStatus = '意向明确' | '谈判中' | '已续约' | '流失风险';
type CustomerHealth = '健康' | '一般' | '风险';

// 任务接口
interface Task {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed';
  assignee: string;
  assigneeAvatar?: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}

// 续约客户数据接口
export interface RenewalCustomer {
  key: string;
  id: string; // 客户档案编号
  name: string; // 客户名称，与Customer接口保持一致
  customerName: string; // 客户名称别名
  industry?: string; // 行业
  scale?: string; // 企业规模
  csm: string; // 客户成功经理
  owner: string; // 负责人
  arr: number; // 年度经常性收入
  contractValue: string; // 合同价值
  healthScore: number;
  healthLevel: '健康' | '一般' | '风险'; // 与Customer接口保持一致
  lifecycleStage?: 'growth' | 'mature' | 'decline'; // 生命周期阶段
  customerTier?: 'strategic' | 'large' | 'medium' | 'small'; // 客户定级
  salesPerson?: string; // 销售人员
  purchasedProducts: string[]; // 已购产品/服务
  contractNumber?: string; // 合同编号
  contractExpiryDate: string; // 合同到期日期
  renewalDate: string; // 续约日期
  renewalAmount: number;
  renewalStatus: RenewalStatus; // 续约状态
  daysToExpiry: number;
  status: RenewalStatus;
  riskReason?: string;
  opportunityPoint?: string;
  lastContactDate: string; // 最后接触日期，与Customer接口保持一致
  lastInteraction: string; // 最后交互时间
  nextAction: string;
  healthTrend: number[]; // 过去30天的健康分趋势数据
  keyTask: Task; // 关键任务
  isFavorite?: boolean; // 是否星标客户
  favorite?: boolean; // 是否收藏
  platform: string; // 平台
  severity: string; // 严重程度
  createdAt: string; // 创建时间
  updatedAt: string; // 更新时间
}

// 续约动态接口
interface RenewalActivity {
  id: string;
  customerName: string;
  activity: string;
  timestamp: string;
  type: 'status_update' | 'health_change' | 'interaction' | 'quote_sent';
  icon: React.ReactNode;
  color: string;
}

// 续约剧本接口
interface RenewalPlaybook {
  id: string;
  title: string;
  description: string;
  steps: string[];
  applicableFor: RenewalStatus[];
}

// 续约客户数据
export const mockRenewalCustomers: RenewalCustomer[] = [
  {
    key: '1',
    id: 'CUST-0001',
    name: '北京科技有限公司',
    customerName: '北京科技有限公司',
    industry: '信息技术',
    scale: '中型企业',
    csm: '张伟',
    owner: '张伟',
    arr: 500000,
    contractValue: '500000',
    healthScore: 85,
    healthLevel: '健康',
    lifecycleStage: 'growth',
    customerTier: 'strategic',
    salesPerson: '王销售',
    purchasedProducts: ['直营-极简版'],
    contractNumber: 'CONT-2023-001',
    contractExpiryDate: '2024-05-31',
    renewalDate: '2024-05-31',
    renewalAmount: 500000,
    renewalStatus: '意向明确',
    daysToExpiry: 90,
    status: '意向明确',
    riskReason: '',
    lastContactDate: '2024-01-15',
    lastInteraction: '2024-01-15',
    nextAction: '续约方案设计',
    healthTrend: [75, 78, 80, 82, 83, 84, 85, 85], // 上升趋势
    keyTask: {
      id: 'task-001',
      title: '续约方案设计',
      status: 'pending',
      assignee: '张伟',
      dueDate: '2024-04-01',
      priority: 'medium'
    },
    isFavorite: true,
    favorite: true,
    platform: '直营-极简版',
    severity: 'low',
    createdAt: '2023-06-20',
    updatedAt: '2024-01-15'
  },
  {
    key: '2',
    id: 'CUST-0002',
    name: '上海商贸集团',
    customerName: '上海商贸集团',
    industry: '批发零售',
    scale: '大型企业',
    csm: '王芳',
    owner: '王芳',
    arr: 800000,
    contractValue: '800000',
    healthScore: 92,
    healthLevel: '健康',
    lifecycleStage: 'growth',
    customerTier: 'strategic',
    salesPerson: '李销售',
    purchasedProducts: ['直营-专业版'],
    contractNumber: 'CONT-2023-002',
    contractExpiryDate: '2024-06-30',
    renewalDate: '2024-06-30',
    renewalAmount: 800000,
    renewalStatus: '意向明确',
    daysToExpiry: 120,
    status: '意向明确',
    opportunityPoint: '用量超限，频繁访问高级功能',
    lastContactDate: '2024-01-20',
    lastInteraction: '2024-01-20',
    nextAction: '增购方案设计',
    healthTrend: [85, 87, 88, 89, 90, 91, 92, 92], // 上升趋势
    keyTask: {
      id: 'task-002',
      title: '增购方案设计',
      status: 'in_progress',
      assignee: '王芳',
      dueDate: '2024-05-15',
      priority: 'medium'
    },
    isFavorite: true,
    favorite: true,
    platform: '直营-专业版',
    severity: 'medium',
    createdAt: '2023-07-10',
    updatedAt: '2024-01-20'
  },
  {
    key: '3',
    id: 'CUST-0003',
    name: '深圳制造企业',
    customerName: '深圳制造企业',
    industry: '制造业',
    scale: '中型企业',
    csm: '李强',
    owner: '李强',
    arr: 300000,
    contractValue: '300000',
    healthScore: 78,
    healthLevel: '一般',
    lifecycleStage: 'mature',
    customerTier: 'large',
    salesPerson: '赵销售',
    purchasedProducts: ['渠道-标准版'],
    contractNumber: 'CONT-2023-003',
    contractExpiryDate: '2024-04-30',
    renewalDate: '2024-04-30',
    renewalAmount: 300000,
    renewalStatus: '谈判中',
    daysToExpiry: 60,
    status: '谈判中',
    lastContactDate: '2024-01-25',
    lastInteraction: '2024-01-25',
    nextAction: '报价单跟进',
    healthTrend: [82, 80, 79, 78, 77, 76, 78, 78], // 轻微波动
    keyTask: {
      id: 'task-003',
      title: '报价单跟进',
      status: 'pending',
      assignee: '李强',
      dueDate: '2024-03-30',
      priority: 'medium'
    },
    isFavorite: false,
    favorite: false,
    platform: '渠道-标准版',
    severity: 'medium',
    createdAt: '2023-08-15',
    updatedAt: '2024-01-25'
  },
  {
    key: '4',
    id: 'CUST-0004',
    name: '广州服务公司',
    customerName: '广州服务公司',
    industry: '商业服务',
    scale: '中型企业',
    csm: '赵敏',
    owner: '赵敏',
    arr: 600000,
    contractValue: '600000',
    healthScore: 88,
    healthLevel: '健康',
    lifecycleStage: 'mature',
    customerTier: 'large',
    salesPerson: '孙销售',
    purchasedProducts: ['直营-旗舰版'],
    contractNumber: 'CONT-2023-004',
    contractExpiryDate: '2024-03-31',
    renewalDate: '2024-03-31',
    renewalAmount: 600000,
    renewalStatus: '已续约',
    daysToExpiry: 30,
    status: '已续约',
    lastContactDate: '2024-01-10',
    lastInteraction: '2024-01-10',
    nextAction: '续约后服务',
    healthTrend: [85, 86, 87, 88, 88, 87, 88, 88], // 稳定趋势
    keyTask: {
      id: 'task-004',
      title: '续约后服务',
      status: 'completed',
      assignee: '赵敏',
      dueDate: '2024-02-15',
      priority: 'low'
    },
    isFavorite: false,
    favorite: false,
    platform: '直营-旗舰版',
    severity: 'low',
    createdAt: '2023-09-20',
    updatedAt: '2024-01-10'
  },
  {
    key: '5',
    id: 'CUST-0005',
    name: '杭州物流企业',
    customerName: '杭州物流企业',
    industry: '物流运输',
    scale: '小型企业',
    csm: '刘洋',
    owner: '刘洋',
    arr: 400000,
    contractValue: '400000',
    healthScore: 35,
    healthLevel: '风险',
    lifecycleStage: 'decline',
    customerTier: 'medium',
    salesPerson: '周销售',
    purchasedProducts: ['渠道-基础版'],
    contractNumber: 'CONT-2023-005',
    contractExpiryDate: '2024-03-31',
    renewalDate: '2024-03-31',
    renewalAmount: 400000,
    renewalStatus: '流失风险',
    daysToExpiry: 30,
    status: '流失风险',
    riskReason: '高优工单过多，客户满意度低',
    lastContactDate: '2024-01-05',
    lastInteraction: '2024-01-05',
    nextAction: '问题紧急处理',
    healthTrend: [65, 58, 52, 48, 42, 38, 36, 35], // 急剧下降
    keyTask: {
      id: 'task-005',
      title: '问题紧急处理',
      status: 'in_progress',
      assignee: '刘洋',
      dueDate: '2024-02-29',
      priority: 'high'
    },
    isFavorite: false,
    favorite: false,
    platform: '渠道-基础版',
    severity: 'high',
    createdAt: '2023-10-25',
     updatedAt: '2024-01-05'
   },
   {
     key: '6',
     id: 'CUST-0006',
     name: '成都软件开发公司',
     customerName: '成都软件开发公司',
     industry: '软件开发',
     scale: '小型企业',
     csm: '王芳',
     owner: '王芳',
     arr: 200000,
     contractValue: '200000',
     healthScore: 38,
     healthLevel: '风险',
     lifecycleStage: 'decline',
     customerTier: 'small',
     salesPerson: '赵销售',
     purchasedProducts: ['独立版'],
     contractNumber: 'CONT-2024-010',
     contractExpiryDate: '2024-12-31',
     renewalDate: '2024-12-31',
     renewalAmount: 200000,
     renewalStatus: '流失风险',
     daysToExpiry: 300,
     status: '流失风险',
     riskReason: '使用频率低，客户满意度下降',
     lastContactDate: '2024-01-22',
     lastInteraction: '2024-01-22',
     nextAction: '客户拜访沟通',
     healthTrend: [55, 50, 45, 42, 40, 38, 38, 38], // 下降趋势
     keyTask: {
       id: 'task_006',
       title: '客户拜访沟通',
       status: 'pending',
       assignee: '王芳',
       dueDate: '2024-02-15',
       priority: 'high'
     },
     isFavorite: false,
     favorite: false,
     platform: '独立版',
     severity: 'high',
     createdAt: '2021-09-20',
     updatedAt: '2024-01-22'
   },
   {
     key: '7',
     id: 'CUST-0007',
     name: '武汉教育科技',
     customerName: '武汉教育科技',
     industry: '教育培训',
     scale: '中型企业',
     csm: '陈明',
     owner: '陈明',
     arr: 350000,
     contractValue: '350000',
     healthScore: 72,
     healthLevel: '一般',
     lifecycleStage: 'growth',
     customerTier: 'medium',
     salesPerson: '吴销售',
     purchasedProducts: ['教育版'],
     contractNumber: 'CONT-2023-007',
     contractExpiryDate: '2024-07-15',
     renewalDate: '2024-07-15',
     renewalAmount: 350000,
     renewalStatus: '谈判中',
     daysToExpiry: 150,
     status: '谈判中',
     riskReason: '',
     lastContactDate: '2024-01-18',
     lastInteraction: '2024-01-18',
     nextAction: '续约条件确认',
     healthTrend: [68, 70, 71, 72, 73, 72, 72, 72], // 稳定趋势
     keyTask: {
       id: 'task_007',
       title: '续约条件确认',
       status: 'in_progress',
       assignee: '陈明',
       dueDate: '2024-06-01',
       priority: 'medium'
     },
     isFavorite: true,
     favorite: true,
     platform: '教育版',
     severity: 'medium',
     createdAt: '2023-07-15',
     updatedAt: '2024-01-18'
   },
   {
     key: '8',
     id: 'CUST-0008',
     name: '西安金融服务',
     customerName: '西安金融服务',
     industry: '金融服务',
     scale: '大型企业',
     csm: '李娜',
     owner: '李娜',
     arr: 950000,
     contractValue: '950000',
     healthScore: 95,
     healthLevel: '健康',
     lifecycleStage: 'mature',
     customerTier: 'strategic',
     salesPerson: '郑销售',
     purchasedProducts: ['金融版'],
     contractNumber: 'CONT-2023-008',
     contractExpiryDate: '2024-08-31',
     renewalDate: '2024-08-31',
     renewalAmount: 1200000,
     renewalStatus: '意向明确',
     daysToExpiry: 180,
     status: '意向明确',
     opportunityPoint: '业务快速增长，需要扩容升级',
     lastContactDate: '2024-01-28',
     lastInteraction: '2024-01-28',
     nextAction: '增购方案制定',
     healthTrend: [90, 91, 92, 93, 94, 95, 95, 95], // 上升趋势
     keyTask: {
       id: 'task_008',
       title: '增购方案制定',
       status: 'pending',
       assignee: '李娜',
       dueDate: '2024-07-01',
       priority: 'high'
     },
     isFavorite: true,
     favorite: true,
     platform: '金融版',
     severity: 'low',
     createdAt: '2023-08-31',
     updatedAt: '2024-01-28'
   }
 ];

// 续约动态数据
const mockRenewalActivities: RenewalActivity[] = [
  {
    id: '1',
    customerName: '腾讯科技',
    activity: '续约状态更新为"流失风险"',
    timestamp: '2024-02-28 14:30',
    type: 'status_update',
    icon: <ExclamationCircleOutlined />,
    color: '#fa541c'
  },
  {
    id: '2',
    customerName: '阿里巴巴',
    activity: '健康分从85提升到92',
    timestamp: '2024-02-27 16:15',
    type: 'health_change',
    icon: <RiseOutlined />,
    color: '#52c41a'
  },
  {
    id: '3',
    customerName: '字节跳动',
    activity: '发送续约报价单',
    timestamp: '2024-02-26 10:20',
    type: 'quote_sent',
    icon: <MailOutlined />,
    color: '#1890ff'
  },
  {
    id: '4',
    customerName: '美团点评',
    activity: '续约合同已签署',
    timestamp: '2024-02-25 15:45',
    type: 'status_update',
    icon: <CheckCircleOutlined />,
    color: '#52c41a'
  }
];

// 续约剧本数据
const mockPlaybooks: RenewalPlaybook[] = [
  {
    id: '1',
    title: '客户流失挽留SOP',
    description: '针对高风险流失客户的标准挽留流程',
    steps: [
      '1. 紧急客户拜访，了解真实需求',
      '2. 问题诊断与解决方案制定',
      '3. 价值重新对齐与ROI展示',
      '4. 优惠方案设计与谈判',
      '5. 高层介入与决策推动'
    ],
    applicableFor: ['流失风险']
  },
  {
    id: '2',
    title: '增购价值方案设计',
    description: '针对健康客户的增购机会挖掘',
    steps: [
      '1. 用量分析与增长趋势评估',
      '2. 高级功能使用情况调研',
      '3. 增购价值方案设计',
      '4. QBR会议中的增购探讨',
      '5. 合同条款优化与签署'
    ],
    applicableFor: ['意向明确']
  },
  {
    id: '3',
    title: '标准续约沟通流程',
    description: '正常续约客户的标准跟进流程',
    steps: [
      '1. 续约提醒与价值回顾',
      '2. 续约报价单发送',
      '3. 客户反馈收集与跟进',
      '4. 合同条款确认',
      '5. 续约完成与后续服务'
    ],
    applicableFor: ['谈判中', '意向明确']
  }
];

const RenewalManagement: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('at-risk');
  const [selectedCustomer, setSelectedCustomer] = useState<RenewalCustomer | null>(null);
  const [timeRange, setTimeRange] = useState<'current' | 'next'>('current');
  const [customerDetailVisible, setCustomerDetailVisible] = useState(false);
  const [selectedCustomerForActivity, setSelectedCustomerForActivity] = useState<string | null>(null);
  
  // 任务处理函数
  const handleTaskClick = (task: Task) => {
    console.log('查看任务详情:', task);
    // 这里可以打开任务详情弹窗
  };
  
  const handleEditTask = (task: Task) => {
    console.log('编辑任务:', task);
    // 这里可以打开任务编辑弹窗
  };
  
  const handleCreateTask = (customerId: string) => {
    console.log('为客户创建新任务:', customerId);
    // 这里可以打开新建任务弹窗
  };

  // 漏斗数据
  const funnelData = useMemo(() => {
    const totalPool = 5000000;
    const intentClear = 3500000;
    const inNegotiation = 2000000;
    const renewed = 1800000;
    
    return [
      { stage: '总续约池', amount: totalPool, percentage: 100 },
      { stage: '续约意向明确', amount: intentClear, percentage: 70 },
      { stage: '谈判/报价中', amount: inNegotiation, percentage: 40 },
      { stage: '已续约', amount: renewed, percentage: 36 }
    ];
  }, []);

  // KPI数据
  const kpiData = useMemo(() => {
    const renewalRate = 78;
    const upsellAmount = 250000;
    const churnAmount = -400000;
    
    return { renewalRate, upsellAmount, churnAmount };
  }, []);

  // 根据状态过滤客户
  const getFilteredCustomers = (status: RenewalStatus | 'all') => {
    if (status === 'all') return mockRenewalCustomers;
    return mockRenewalCustomers.filter(customer => customer.status === status);
  };

  // 获取当前分群的客户
  const getCurrentTabCustomers = () => {
    switch (selectedTab) {
      case 'at-risk':
        return mockRenewalCustomers.filter(c => c.status === '流失风险');
      case 'upsell':
        return mockRenewalCustomers.filter(c => c.healthLevel === '健康' && c.status === '意向明确');
      case 'standard':
        return mockRenewalCustomers.filter(c => c.status === '谈判中');
      case 'all':
        return mockRenewalCustomers;
      default:
        return [];
    }
  };

  // 获取推荐剧本
  const getRecommendedPlaybooks = () => {
    switch (selectedTab) {
      case 'at-risk':
        return mockPlaybooks.filter(p => p.applicableFor.includes('流失风险'));
      case 'upsell':
        return mockPlaybooks.filter(p => p.applicableFor.includes('意向明确'));
      case 'standard':
        return mockPlaybooks.filter(p => p.applicableFor.includes('谈判中'));
      default:
        return mockPlaybooks;
    }
  };

  const { addTab } = useTabManager();

  // 处理客户详情查看
  const handleViewCustomerDetail = (customer: RenewalCustomer) => {
    // 使用TabContext打开新标签页
    addTab({
      key: `renewal-detail-${customer.id}`,
      label: `续约详情`,
      path: `/profiles/renewal/${customer.id}`,
      closable: true
    });
  };

  // 处理客户操作
  const handleCustomerAction = (action: string, customerId: string) => {
    console.log('执行操作:', action, '客户ID:', customerId);
    // 这里可以添加具体的操作逻辑
    message.success(`已执行操作: ${action}`);
  };

  // 关闭客户详情弹窗
  const handleCloseCustomerDetail = () => {
    setCustomerDetailVisible(false);
    setSelectedCustomer(null);
  };

  // 表格列定义
  const getColumns = () => [
    {
      title: '客户名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as const,
      render: (name: string, record: RenewalCustomer) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>
            {name.charAt(0)}
          </Avatar>
          <div>
            <div style={{ fontWeight: 500, color: '#1890ff', cursor: 'pointer' }}
                 onClick={() => handleViewCustomerDetail(record)}>
              {name}
            </div>
            <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
              负责人: {record.csm}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '健康分',
      dataIndex: 'healthScore',
      key: 'healthScore',
      align: 'center' as const,
      render: (score: number, record: RenewalCustomer) => (
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontWeight: 600, 
            fontSize: '16px',
            color: record.healthLevel === '健康' ? '#52c41a' : 
                   record.healthLevel === '风险' ? '#fa541c' : '#8c8c8c'
          }}>
            {score}
          </div>
          <Sparkline data={record.healthTrend} />
          <Tag 
            color={
              record.healthLevel === '健康' ? 'green' : 
              record.healthLevel === '风险' ? 'red' : 'default'
            }
            style={{ marginTop: '4px', fontSize: '11px' }}
          >
            {record.healthLevel}
          </Tag>
        </div>
      ),
    },
    {
      title: '到期时间',
      dataIndex: 'contractExpiryDate',
      key: 'contractExpiryDate',
      align: 'center' as const,
      render: (date: string, record: RenewalCustomer) => (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 500 }}>{date}</div>
          <div style={{ 
            fontSize: '12px', 
            color: record.daysToExpiry <= 15 ? '#fa541c' : '#8c8c8c'
          }}>
            {record.daysToExpiry} 天后到期
          </div>
        </div>
      ),
    },
    {
      title: '续约金额',
      dataIndex: 'renewalAmount',
      key: 'renewalAmount',
      align: 'center' as const,
      render: (amount: number) => (
        <div style={{ fontWeight: 600, color: '#1890ff' }}>
          ¥{amount.toLocaleString()}
        </div>
      ),
    },
    {
      title: '状态/风险',
      key: 'status',
      align: 'center' as const,
      width: 200,
      render: (record: RenewalCustomer) => (
        <div style={{ textAlign: 'left', padding: '0 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
            <Tag color={
              record.status === '已续约' ? 'green' :
              record.status === '流失风险' ? 'red' :
              record.status === '谈判中' ? 'orange' : 'blue'
            }>
              {record.status}
            </Tag>
          </div>
          {record.riskReason && (
            <div style={{ 
              fontSize: '12px', 
              color: '#fa541c', 
              lineHeight: '1.4',
              background: '#fff2f0',
              padding: '4px 6px',
              borderRadius: '4px',
              border: '1px solid #ffccc7'
            }}>
              <span style={{ fontWeight: 500 }}>风险因素：</span>{record.riskReason}
            </div>
          )}
          {record.opportunityPoint && (
            <div style={{ 
              fontSize: '12px', 
              color: '#52c41a', 
              lineHeight: '1.4',
              background: '#f6ffed',
              padding: '4px 6px',
              borderRadius: '4px',
              border: '1px solid #b7eb8f'
            }}>
              <span style={{ fontWeight: 500 }}>机会点：</span>{record.opportunityPoint}
            </div>
          )}
        </div>
      ),
    },
    {
      title: '关键任务',
      key: 'keyTask',
      align: 'center' as const,
      width: 200,
      render: (record: RenewalCustomer) => (
        <div style={{ padding: '4px' }}>
          <KeyTaskComponent 
            task={record.keyTask}
            onTaskClick={handleTaskClick}
            onEditTask={handleEditTask}
          />
          <Button 
            type="dashed" 
            size="small" 
            icon={<PlusOutlined />}
            style={{ 
              marginTop: '8px', 
              width: '100%',
              fontSize: '11px',
              height: '24px'
            }}
            onClick={() => handleCreateTask(record.id)}
          >
            新建任务
          </Button>
        </div>
       ),
     },
     {
      title: '操作',
      key: 'action',
      width: 120,
      align: 'center' as const,
      render: (record: RenewalCustomer) => (
        <Space direction="vertical" size={4} style={{ width: '100%' }}>
          <Button size="small" type="link" icon={<PhoneOutlined />} style={{ padding: 0, height: 'auto' }}>
            联系
          </Button>
          <Button size="small" type="link" icon={<MailOutlined />} style={{ padding: 0, height: 'auto' }}>
            邮件
          </Button>
          <Button size="small" type="link" icon={<CalendarOutlined />} style={{ padding: 0, height: 'auto' }}>
            安排
          </Button>
          <Button 
            size="small" 
            type="link" 
            icon={<PlusOutlined />} 
            style={{ padding: 0, height: 'auto', color: '#52c41a' }}
            onClick={() => handleCreateTask(record.id)}
          >
            新建任务
          </Button>
        </Space>
      ),
    },
  ];

  // 标签页配置
  const tabItems: TabsProps['items'] = [
    {
      key: 'at-risk',
      label: (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ExclamationCircleOutlined style={{ color: '#fa541c' }} />
          高风险流失 ({getFilteredCustomers('流失风险').length})
        </span>
      ),
    },
    {
      key: 'upsell',
      label: (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <RiseOutlined style={{ color: '#52c41a' }} />
          增购机会 ({getFilteredCustomers('意向明确').filter(c => c.healthLevel === '健康').length})
        </span>
      ),
    },
    {
      key: 'standard',
      label: (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ClockCircleOutlined style={{ color: '#1890ff' }} />
          正常续约 ({getFilteredCustomers('谈判中').length})
        </span>
      ),
    },
    {
      key: 'all',
      label: (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <BarChartOutlined />
          所有机会 ({mockRenewalCustomers.length})
        </span>
      ),
    },
  ];

  return (
    <div style={{
      padding: '32px 40px',
      background: '#f5f5f5',
      minHeight: 'calc(100vh - 120px)'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        
        {/* 页面标题 */}
        <div style={{ marginBottom: '24px' }}>
          <Title level={2} style={{ margin: 0, color: '#262626' }}>
            续约管理
          </Title>
          <Text type="secondary">客户成功经理的续约作战指挥中心</Text>
        </div>

        {/* 顶部续约漏斗与业绩概览 */}
        <Row gutter={24} style={{ marginBottom: '24px' }}>
          {/* 续约预测漏斗 */}
          <Col span={16}>
            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <BarChartOutlined style={{ color: '#1890ff' }} />
                  续约预测漏斗 (本季度)
                </div>
              }
              style={{ borderRadius: '8px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '145px' }}>
                {funnelData.map((stage, index) => (
                  <div key={stage.stage} style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{
                      height: `${Math.max(40, stage.percentage * 0.8)}px`,
                      background: `linear-gradient(135deg, #1890ff ${stage.percentage}%, #e6f7ff ${stage.percentage}%)`,
                      borderRadius: '8px',
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}>
                      {stage.percentage}%
                    </div>
                    <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '4px' }}>
                      {stage.stage}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#262626' }}>
                      ¥{(stage.amount / 10000).toFixed(0)}万
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          {/* 核心续约指标 */}
          <Col span={8}>
            <Row gutter={[0, 16]}>
              <Col span={24}>
                <Card style={{ borderRadius: '8px', textAlign: 'center' }}>
                  <Statistic
                    title="续约率 (按金额)"
                    value={kpiData.renewalRate}
                    suffix="%"
                    valueStyle={{ color: '#52c41a', fontSize: '32px', fontWeight: 'bold' }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card style={{ borderRadius: '8px', textAlign: 'center' }}>
                  <Statistic
                    title="增购/升级"
                    value={kpiData.upsellAmount}
                    prefix="+"
                    suffix="¥"
                    valueStyle={{ color: '#52c41a', fontSize: '20px', fontWeight: 'bold' }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card style={{ borderRadius: '8px', textAlign: 'center' }}>
                  <Statistic
                    title="流失金额"
                    value={Math.abs(kpiData.churnAmount)}
                    prefix="-"
                    suffix="¥"
                    valueStyle={{ color: '#fa541c', fontSize: '20px', fontWeight: 'bold' }}
                  />
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* 主要内容区域 */}
        <Row gutter={24}>
          {/* 续约客户列表 */}
          <Col span={24}>
            <Card 
              style={{ 
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                border: '1px solid #f0f0f0',
                background: '#ffffff'
              }}
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <UserOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
                  <span style={{ fontSize: '16px', fontWeight: '600' }}>智能续约分群</span>
                </div>
              }
              extra={
                <Space>
                  <Select
                    defaultValue="current"
                    style={{ width: 140 }}
                    onChange={setTimeRange}
                    options={[
                      { label: '本季度', value: 'current' },
                      { label: '下季度', value: 'next' },
                    ]}
                  />
                  <Button size="small" icon={<RiseOutlined />} style={{ borderRadius: '6px' }}>
                    导出报告
                  </Button>
                </Space>
              }
              bodyStyle={{ padding: '16px' }}
            >
              <Tabs
                activeKey={selectedTab}
                onChange={setSelectedTab}
                items={tabItems.map(item => ({
                  ...item,
                  label: item.key === 'high_risk' ? (
                    <span>
                      {item.label}
                      <Badge count={getCurrentTabCustomers().filter(c => c.renewalStatus === '流失风险').length} size="small" style={{ marginLeft: '4px' }} />
                    </span>
                  ) : item.key === 'opportunity' ? (
                    <span>
                      {item.label}
                      <FireOutlined style={{ color: '#fa8c16', marginLeft: '4px' }} />
                    </span>
                  ) : item.label
                }))}
                size="small"
              />
              
              <div style={{ marginTop: '16px' }}>
                <List
                  dataSource={getCurrentTabCustomers()}
                  renderItem={(item) => (
                    <List.Item
                      style={{
                        padding: '12px 0',
                        borderBottom: '1px solid #f0f0f0',
                        cursor: 'pointer',
                        backgroundColor: selectedCustomerForActivity === item.id ? '#f6f9ff' : undefined,
                        borderRadius: '6px',
                        marginBottom: '8px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={() => setSelectedCustomerForActivity(item.id)}
                      onMouseLeave={() => {}}
                      onClick={() => setSelectedCustomerForActivity(item.id)}
                      actions={[
                        <Button size="small" style={{ borderRadius: '6px' }} onClick={(e) => {
                          e.stopPropagation();
                          handleViewCustomerDetail(item);
                        }}>查看详情</Button>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar 
                            style={{ 
                              backgroundColor: item.renewalStatus === '流失风险' ? '#ff4d4f' : 
                                              item.renewalStatus === '意向明确' ? '#52c41a' : 
                                              item.renewalStatus === '谈判中' ? '#fa8c16' : '#1890ff'
                            }}
                          >
                            {item.name.charAt(0)}
                          </Avatar>
                        }
                        title={
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: '600' }}>{item.name}</span>
                            <Tag 
                              color={
                                item.renewalStatus === '流失风险' ? 'red' : 
                                item.renewalStatus === '意向明确' ? 'green' : 
                                item.renewalStatus === '谈判中' ? 'orange' : 'blue'
                              }
                              style={{
                                background: `${item.renewalStatus === '流失风险' ? '#ff4d4f' : 
                                            item.renewalStatus === '意向明确' ? '#52c41a' : 
                                            item.renewalStatus === '谈判中' ? '#fa8c16' : '#1890ff'}15`,
                                border: `1px solid ${item.renewalStatus === '流失风险' ? '#ff4d4f' : 
                                                    item.renewalStatus === '意向明确' ? '#52c41a' : 
                                                    item.renewalStatus === '谈判中' ? '#fa8c16' : '#1890ff'}30`,
                                color: item.renewalStatus === '流失风险' ? '#ff4d4f' : 
                                       item.renewalStatus === '意向明确' ? '#52c41a' : 
                                       item.renewalStatus === '谈判中' ? '#fa8c16' : '#1890ff'
                              }}
                            >
                              {item.renewalStatus}
                            </Tag>
                            {item.daysToExpiry <= 15 && (
                              <Tag color="red" style={{ fontSize: '11px' }}>紧急</Tag>
                            )}
                          </div>
                        }
                        description={
                          <Space wrap>
                            <Text type="secondary">合同到期: {item.contractExpiryDate}</Text>
                            <Text type="secondary">续约金额: ¥{item.renewalAmount.toLocaleString()}</Text>
                            <Text type="secondary">健康分: {item.healthScore}</Text>
                            <Text type="secondary">负责人: {item.csm}</Text>
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* 客户详情弹窗 */}
      {selectedCustomer && (
        <CustomerDetailModal
          visible={customerDetailVisible}
          customer={selectedCustomer}
          onClose={handleCloseCustomerDetail}
          onAction={handleCustomerAction}
        />
      )}

      {/* 自定义样式 */}
      <style>{`
        .urgent-renewal-row {
          background-color: #fff2f0 !important;
        }
        .urgent-renewal-row:hover {
          background-color: #ffe7e3 !important;
        }
      `}</style>
    </div>
  );
};

export default RenewalManagement;
