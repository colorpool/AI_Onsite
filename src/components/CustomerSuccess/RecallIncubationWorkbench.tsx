import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Tag,
  Avatar,
  Button,
  Select,
  Input,
  Space,
  Drawer,
  Typography,
  Divider,
  message,
  Table,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  FilterOutlined,
  SearchOutlined,
  UserOutlined,
  DollarOutlined,
  CalendarOutlined,
  PhoneOutlined,
  MailOutlined,
  FileTextOutlined,
  BulbOutlined,
  CloseOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  ArrowRightOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { DragSourceMonitor, DropTargetMonitor } from 'react-dnd';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

// 类型定义
interface ChurnedCustomer {
  id: string;
  name: string;
  churnReason: string;
  churnReasonColor: string;
  preChurnARR: number;
  churnedDays: number;
  stage: 'pool' | 'pending' | 'incubating' | 'negotiating' | 'recalled' | 'lost';
  industry: string;
  csm: string;
  riskLevel: 'high' | 'medium' | 'low';
  contacts: Array<{
    name: string;
    role: string;
    phone: string;
    email: string;
  }>;
  churnAnalysis: {
    primaryReason: string;
    secondaryReasons: string[];
    competitorInfo?: string;
    customerFeedback: string;
  };
  recallPlan: Array<{
    id: string;
    task: string;
    completed: boolean;
    dueDate: string;
  }>;
}

// 常量定义
const SWIM_LANES = [
  { key: 'pool', title: '流失客户池', color: '#8c8c8c', bgColor: '#f5f5f5' },
  { key: 'pending', title: '待召回', color: '#fa8c16', bgColor: '#fff7e6' },
  { key: 'incubating', title: '孵化中', color: '#1890ff', bgColor: '#e6f7ff' },
  { key: 'negotiating', title: '商务谈判', color: '#722ed1', bgColor: '#f9f0ff' },
  { key: 'recalled', title: '已召回', color: '#52c41a', bgColor: '#f6ffed' },
  { key: 'lost', title: '永久流失', color: '#ff4d4f', bgColor: '#fff2f0' },
];

const CHURN_REASONS = [
  { value: 'feature', label: '功能不满足', color: '#ff4d4f' },
  { value: 'price', label: '价格因素', color: '#fa8c16' },
  { value: 'service', label: '服务问题', color: '#722ed1' },
  { value: 'competitor', label: '竞品替代', color: '#1890ff' },
  { value: 'business', label: '业务调整', color: '#52c41a' },
  { value: 'other', label: '其他原因', color: '#8c8c8c' },
];

// 当前CSM信息
const CURRENT_CSM = {
  name: '张三',
  id: 'csm001'
};

// 智能推荐数据
const SMART_RECOMMENDATIONS = [
  {
    id: '1',
    customer: '阿里巴巴集团',
    reason: '高价值客户，请优先评估',
    priority: 'high'
  },
  {
    id: '2', 
    customer: '字节跳动',
    reason: '关键功能已上线，建议联系',
    priority: 'medium'
  },
  {
    id: '3',
    customer: '美团',
    reason: '商务谈判进展良好',
    priority: 'medium'
  },
  {
    id: '4',
    customer: '腾讯科技',
    reason: '续约意向积极，可加快推进',
    priority: 'medium'
  }
];

// 行动剧本模板
const PLAYBOOK_TEMPLATES: Record<string, Array<{id: string, title: string, type: string}>> = {
  feature: [
    { id: '1', title: '功能演示剧本', type: '产品演示' },
    { id: '2', title: '定制化方案剧本', type: '解决方案' }
  ],
  price: [
    { id: '3', title: '价格谈判剧本', type: '商务谈判' },
    { id: '4', title: 'ROI价值证明剧本', type: '价值证明' }
  ],
  service: [
    { id: '5', title: '服务升级剧本', type: '服务改进' },
    { id: '6', title: '客户关怀剧本', type: '关系维护' }
  ],
  competitor: [
    { id: '7', title: '竞品对比剧本', type: '竞争分析' },
    { id: '8', title: '差异化价值剧本', type: '价值定位' }
  ],
  business: [
    { id: '9', title: '业务对接剧本', type: '业务沟通' }
  ],
  other: [
    { id: '10', title: '通用召回剧本', type: '通用模板' }
  ]
};

// 模拟数据 - 只显示张三负责的客户
const MOCK_CUSTOMERS: ChurnedCustomer[] = [
  {
    id: '1',
    name: '阿里巴巴集团',
    churnReason: 'feature',
    churnReasonColor: '#ff4d4f',
    preChurnARR: 500000,
    churnedDays: 45,
    stage: 'pool',
    industry: '电商',
    csm: '张三',
    riskLevel: 'high',
    contacts: [
      { name: '李经理', role: '技术负责人', phone: '13800138001', email: 'li@alibaba.com' }
    ],
    churnAnalysis: {
      primaryReason: '功能不满足业务需求',
      secondaryReasons: ['价格偏高', '竞品功能更全'],
      customerFeedback: '希望能够支持更多定制化功能'
    },
    recallPlan: [
      { id: '1', task: '联系客户了解具体需求', completed: false, dueDate: '2024-02-01' },
      { id: '2', task: '准备产品功能演示', completed: false, dueDate: '2024-02-05' }
    ]
  },
  {
    id: '2',
    name: '腾讯科技',
    churnReason: 'price',
    churnReasonColor: '#fa8c16',
    preChurnARR: 800000,
    churnedDays: 120,
    stage: 'pending',
    industry: '互联网',
    csm: '张三',
    riskLevel: 'medium',
    contacts: [
      { name: '王总监', role: '采购负责人', phone: '13800138002', email: 'wang@tencent.com' }
    ],
    churnAnalysis: {
      primaryReason: '预算压缩',
      secondaryReasons: ['ROI不明显'],
      customerFeedback: '希望能够提供更优惠的价格方案'
    },
    recallPlan: [
      { id: '3', task: '准备ROI分析报告', completed: true, dueDate: '2024-01-15' },
      { id: '4', task: '制定优惠方案', completed: false, dueDate: '2024-02-10' }
    ]
  },
  {
    id: '3',
    name: '字节跳动',
    churnReason: 'competitor',
    churnReasonColor: '#1890ff',
    preChurnARR: 1200000,
    churnedDays: 80,
    stage: 'incubating',
    industry: '互联网',
    csm: '张三',
    riskLevel: 'high',
    contacts: [
      { name: '赵主管', role: '项目经理', phone: '13800138003', email: 'zhao@bytedance.com' }
    ],
    churnAnalysis: {
      primaryReason: '选择了竞品方案',
      secondaryReasons: ['竞品价格更低', '实施周期更短'],
      competitorInfo: '选择了某竞品公司的解决方案',
      customerFeedback: '希望我们能提供更快的实施服务'
    },
    recallPlan: [
      { id: '5', task: '分析竞品优劣势', completed: true, dueDate: '2024-01-20' },
      { id: '6', task: '制定差异化方案', completed: false, dueDate: '2024-02-15' }
    ]
  },
  {
    id: '4',
    name: '美团',
    churnReason: 'service',
    churnReasonColor: '#722ed1',
    preChurnARR: 300000,
    churnedDays: 200,
    stage: 'negotiating',
    industry: '生活服务',
    csm: '张三',
    riskLevel: 'medium',
    contacts: [
      { name: '孙经理', role: '业务负责人', phone: '13800138004', email: 'sun@meituan.com' }
    ],
    churnAnalysis: {
      primaryReason: '服务响应不及时',
      secondaryReasons: ['技术支持不够专业'],
      customerFeedback: '希望能够提供7x24小时技术支持'
    },
    recallPlan: [
      { id: '7', task: '升级服务等级', completed: true, dueDate: '2024-01-25' },
      { id: '8', task: '安排专属客户成功经理', completed: true, dueDate: '2024-01-30' },
      { id: '9', task: '商务谈判', completed: false, dueDate: '2024-02-20' }
    ]
  },
  {
    id: '5',
    name: '滴滴出行',
    churnReason: 'business',
    churnReasonColor: '#52c41a',
    preChurnARR: 600000,
    churnedDays: 30,
    stage: 'recalled',
    industry: '交通出行',
    csm: '张三',
    riskLevel: 'low',
    contacts: [
      { name: '周总', role: 'CTO', phone: '13800138005', email: 'zhou@didi.com' }
    ],
    churnAnalysis: {
      primaryReason: '业务方向调整',
      secondaryReasons: [],
      customerFeedback: '重新评估后决定继续合作'
    },
    recallPlan: [
      { id: '10', task: '重新签署合同', completed: true, dueDate: '2024-01-28' }
    ]
  },
  {
    id: '6',
    name: '京东集团',
    churnReason: 'other',
    churnReasonColor: '#8c8c8c',
    preChurnARR: 150000,
    churnedDays: 365,
    stage: 'lost',
    industry: '电商',
    csm: '张三',
    riskLevel: 'high',
    contacts: [
      { name: '吴主任', role: '采购主任', phone: '13800138006', email: 'wu@jd.com' }
    ],
    churnAnalysis: {
      primaryReason: '公司战略调整',
      secondaryReasons: ['内部自研替代'],
      customerFeedback: '暂时不考虑外部解决方案'
    },
    recallPlan: [
      { id: '11', task: '保持定期联系', completed: false, dueDate: '2024-06-01' }
    ]
  }
];

// 客户卡片组件
interface CustomerCardProps {
  customer: ChurnedCustomer;
  onCardClick: (customer: ChurnedCustomer) => void;
  onMoveCustomer: (customerId: string, targetStage: string) => void;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onCardClick, onMoveCustomer }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'customer',
    item: { id: customer.id, currentStage: customer.stage },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const churnReasonConfig = CHURN_REASONS.find(reason => reason.value === customer.churnReason);

  return (
    <div
      ref={drag as any}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        marginBottom: '8px',
      }}
    >
      <Card
        size="small"
        hoverable
        onClick={() => onCardClick(customer)}
        style={{
          borderLeft: `4px solid ${customer.churnReasonColor}`,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          height: '60px', // 固定高度，扁平样式
        }}
        bodyStyle={{ padding: '8px 12px', height: '100%' }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          height: '100%'
        }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{customer.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#666' }}>
              <span>ARR: ¥{customer.preChurnARR.toLocaleString()}</span>
              <span>流失: {customer.churnedDays}天</span>
            </div>
          </div>
          <Tag color={churnReasonConfig?.color} style={{ margin: 0 }}>
            {churnReasonConfig?.label}
          </Tag>
        </div>
      </Card>
    </div>
  );
};

// 泳道组件
// 动画计数标签组件
interface AnimatedCountTagProps {
  color: string;
  count: number;
}

const AnimatedCountTag: React.FC<AnimatedCountTagProps> = ({ color, count }) => {
  const [displayCount, setDisplayCount] = useState(count);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (displayCount !== count) {
      setIsAnimating(true);
      const duration = 800; // 动画持续时间
      const steps = 20; // 动画步数
      const increment = (count - displayCount) / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        if (currentStep >= steps) {
          setDisplayCount(count);
          setIsAnimating(false);
          clearInterval(timer);
        } else {
          setDisplayCount(prev => {
            const newValue = prev + increment;
            return increment > 0 ? Math.min(Math.round(newValue), count) : Math.max(Math.round(newValue), count);
          });
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [count, displayCount]);

  // 创建动态样式
  const pulseKeyframes = `
    @keyframes pulse-${color.replace('#', '')} {
      0% { 
        transform: scale(1); 
        box-shadow: 0 0 0 0 ${color}66;
      }
      50% { 
        transform: scale(1.15); 
        box-shadow: 0 0 0 8px ${color}33;
      }
      100% { 
        transform: scale(1); 
        box-shadow: 0 0 0 0 ${color}00;
      }
    }
  `;

  useEffect(() => {
    if (isAnimating) {
      // 动态插入CSS动画
      const styleElement = document.createElement('style');
      styleElement.textContent = pulseKeyframes;
      document.head.appendChild(styleElement);
      
      return () => {
        document.head.removeChild(styleElement);
      };
    }
  }, [isAnimating, pulseKeyframes]);

  return (
    <Tag 
      color={color} 
      style={{
        animation: isAnimating ? `pulse-${color.replace('#', '')} 0.8s ease-in-out` : 'none',
        transition: 'all 0.3s ease',
        fontWeight: 'bold',
        fontSize: '12px',
        minWidth: '24px',
        textAlign: 'center'
      }}
    >
      {displayCount}
    </Tag>
  );
};

interface SwimLaneProps {
  lane: typeof SWIM_LANES[0];
  customers: ChurnedCustomer[];
  onCardClick: (customer: ChurnedCustomer) => void;
  onMoveCustomer: (customerId: string, targetStage: string) => void;
  visibleCount: number;
  onLoadMore: () => void;
}

const SwimLane: React.FC<SwimLaneProps> = ({ lane, customers, onCardClick, onMoveCustomer, visibleCount, onLoadMore }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'customer',
    drop: (item: { id: string; currentStage: string }) => {
      if (item.currentStage !== lane.key) {
        onMoveCustomer(item.id, lane.key);
      }
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const visibleCustomers = customers.slice(0, visibleCount);
  const hasMore = customers.length > visibleCount;

  return (
    <div
      ref={drop as any}
      style={{
        backgroundColor: isOver ? '#e6f7ff' : lane.bgColor,
        borderRadius: '8px',
        padding: '16px',
        height: '500px', // 固定高度
        border: isOver ? '2px dashed #1890ff' : '1px solid #d9d9d9',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '12px',
        flexShrink: 0, // 防止标题被压缩
      }}>
        <Title level={4} style={{ margin: 0, color: lane.color }}>
          {lane.title}
        </Title>
        <AnimatedCountTag color={lane.color} count={customers.length} />
      </div>
      
      {/* 可滚动的内容区域 */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto',
        paddingRight: '4px', // 为滚动条留出空间
      }}>
        {visibleCustomers.map(customer => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            onCardClick={onCardClick}
            onMoveCustomer={onMoveCustomer}
          />
        ))}
        
        {hasMore && (
          <Button 
            type="link" 
            size="small" 
            onClick={onLoadMore}
            style={{ padding: 0, height: 'auto', marginTop: '8px' }}
          >
            <ArrowDownOutlined /> 加载更多 ({customers.length - visibleCount})
          </Button>
        )}
      </div>
    </div>
  );
};

// 主组件
const RecallIncubationWorkbench: React.FC = () => {
  const [customers, setCustomers] = useState<ChurnedCustomer[]>(MOCK_CUSTOMERS);
  const [selectedCustomer, setSelectedCustomer] = useState<ChurnedCustomer | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [filterReason, setFilterReason] = useState<string>('all');
  const [filterARR, setFilterARR] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({});

  // 只显示当前CSM负责的客户
  const filteredCustomers = customers.filter(customer => {
    if (customer.csm !== CURRENT_CSM.name) return false;
    
    if (filterReason !== 'all' && customer.churnReason !== filterReason) return false;
    if (filterARR !== 'all') {
      if (filterARR === 'high' && customer.preChurnARR < 500000) return false;
      if (filterARR === 'medium' && (customer.preChurnARR < 100000 || customer.preChurnARR >= 500000)) return false;
      if (filterARR === 'low' && customer.preChurnARR >= 100000) return false;
    }
    if (searchKeyword && !customer.name.toLowerCase().includes(searchKeyword.toLowerCase())) return false;
    return true;
  });

  // 加载更多客户函数
  const loadMoreCustomers = useCallback((laneKey: string) => {
    setVisibleCounts(prev => ({
      ...prev,
      [laneKey]: (prev[laneKey] || 5) + 5
    }));
  }, []);

  // 点击客户卡片
  const handleCardClick = useCallback((customer: ChurnedCustomer) => {
    setSelectedCustomer(customer);
    setDrawerVisible(true);
  }, []);

  // 移动客户到不同阶段
  const handleMoveCustomer = useCallback((customerId: string, targetStage: string) => {
    setCustomers(prev => 
      prev.map(customer => 
        customer.id === customerId 
          ? { ...customer, stage: targetStage as ChurnedCustomer['stage'] }
          : customer
      )
    );
    message.success('客户状态已更新');
  }, []);

  // 列表视图的列定义
  const listColumns: ColumnsType<ChurnedCustomer> = [
    {
      title: '客户名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: ChurnedCustomer) => (
        <Button type="link" onClick={() => handleCardClick(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: '流失原因',
      dataIndex: 'churnReason',
      key: 'churnReason',
      render: (reason: string) => {
        const config = CHURN_REASONS.find(r => r.value === reason);
        return <Tag color={config?.color}>{config?.label}</Tag>;
      },
    },
    {
      title: '流失前ARR',
      dataIndex: 'preChurnARR',
      key: 'preChurnARR',
      sorter: (a: ChurnedCustomer, b: ChurnedCustomer) => a.preChurnARR - b.preChurnARR,
      render: (arr: number) => `¥${arr.toLocaleString()}`,
    },
    {
      title: '流失天数',
      dataIndex: 'churnedDays',
      key: 'churnedDays',
      sorter: (a: ChurnedCustomer, b: ChurnedCustomer) => a.churnedDays - b.churnedDays,
    },
    {
      title: '当前阶段',
      dataIndex: 'stage',
      key: 'stage',
      render: (stage: string) => {
        const lane = SWIM_LANES.find(l => l.key === stage);
        return <Tag color={lane?.color}>{lane?.title}</Tag>;
      },
    },
  ];

  // 初始化可见数量
  React.useEffect(() => {
    const initialCounts: Record<string, number> = {};
    SWIM_LANES.forEach(lane => {
      initialCounts[lane.key] = 5;
    });
    setVisibleCounts(initialCounts);
  }, []);

  // 按阶段分组客户
  const customersByStage = SWIM_LANES.reduce((acc, lane) => {
    acc[lane.key] = filteredCustomers.filter(customer => customer.stage === lane.key);
    return acc;
  }, {} as Record<string, ChurnedCustomer[]>);

  // 计算个人业绩
  const personalMetrics = React.useMemo(() => {
    const pendingAmount = filteredCustomers
      .filter(c => ['pool', 'pending', 'incubating', 'negotiating'].includes(c.stage))
      .reduce((sum, c) => sum + c.preChurnARR, 0);
    
    const recalledAmount = filteredCustomers
      .filter(c => c.stage === 'recalled')
      .reduce((sum, c) => sum + c.preChurnARR, 0);
    
    const totalAttempted = filteredCustomers.filter(c => c.stage !== 'pool').length;
    const successfulRecalls = filteredCustomers.filter(c => c.stage === 'recalled').length;
    const successRate = totalAttempted > 0 ? (successfulRecalls / totalAttempted * 100).toFixed(1) : '0';
    
    return { pendingAmount, recalledAmount, successRate };
  }, [filteredCustomers]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: '32px 40px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        {/* 页面标题 */}
        <div style={{ marginBottom: '24px' }}>
          <Title level={2} style={{ margin: 0, color: '#262626', fontWeight: '600' }}>
            召回孵化
          </Title>
          <Text type="secondary" style={{ fontSize: '14px', color: '#666' }}>以数据驱动的流失客户召回与价值重建</Text>
        </div>

        {/* 我的召回业绩 */}
        <Card 
          title="我的召回业绩 (本季度)"
          style={{ marginBottom: '24px' }}
        >
          <Row gutter={24}>
            <Col span={8}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fa8c16' }}>
                  ¥{personalMetrics.pendingAmount.toLocaleString()}
                </div>
                <div style={{ color: '#666' }}>待召回总金额</div>
              </div>
            </Col>
            <Col span={8}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                  ¥{personalMetrics.recalledAmount.toLocaleString()}
                </div>
                <div style={{ color: '#666' }}>已召回金额</div>
              </div>
            </Col>
            <Col span={8}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                  {personalMetrics.successRate}%
                </div>
                <div style={{ color: '#666' }}>召回成功率</div>
              </div>
            </Col>
          </Row>
        </Card>

        {/* 智能推荐区域 */}
        <Card 
          title={<span><BulbOutlined style={{ color: '#faad14' }} /> 智能推荐 - 今日优先关注</span>}
          style={{ 
            marginBottom: '24px'
          }}
        >
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {SMART_RECOMMENDATIONS.filter(rec => rec.customer !== '阿里巴巴集团').map(rec => (
              <div 
                key={rec.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 16px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '8px',
                  backgroundColor: '#fafafa',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  flex: 1
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                  e.currentTarget.style.borderColor = '#1890ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fafafa';
                  e.currentTarget.style.borderColor = '#d9d9d9';
                }}
              >
                <Avatar size={32} style={{ backgroundColor: '#1890ff', marginRight: '12px' }}>
                  {rec.customer.charAt(0)}
                </Avatar>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '2px' }}>{rec.customer}</div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>{rec.reason}</Text>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 筛选和视图切换 */}
        <Card style={{ marginBottom: '24px' }}>
          <Row gutter={16} align="middle">
            <Col>
              <Space>
                <FilterOutlined />
                <Select
                  value={filterReason}
                  onChange={setFilterReason}
                  style={{ width: 120 }}
                  placeholder="流失原因"
                >
                  <Option value="all">全部原因</Option>
                  {CHURN_REASONS.map(reason => (
                    <Option key={reason.value} value={reason.value}>{reason.label}</Option>
                  ))}
                </Select>
                <Select
                  value={filterARR}
                  onChange={setFilterARR}
                  style={{ width: 160 }}
                  placeholder="合同金额"
                >
                  <Option value="all">全部金额</Option>
                  <Option value="high">高价值(≥50万)</Option>
                  <Option value="medium">中价值(10-50万)</Option>
                  <Option value="low">低价值(&lt;10万)</Option>
                </Select>
                <Input
                  prefix={<SearchOutlined />}
                  placeholder="搜索客户名称"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  style={{ width: 200 }}
                />
              </Space>
            </Col>
            <Col flex="auto" />
            <Col>
              <Button.Group>
                <Button 
                  type={viewMode === 'board' ? 'primary' : 'default'}
                  icon={<AppstoreOutlined />}
                  onClick={() => setViewMode('board')}
                >
                  看板视图
                </Button>
                <Button 
                  type={viewMode === 'list' ? 'primary' : 'default'}
                  icon={<UnorderedListOutlined />}
                  onClick={() => setViewMode('list')}
                >
                  列表视图
                </Button>
              </Button.Group>
            </Col>
          </Row>
        </Card>

        <Row gutter={24}>
          {/* 主工作区 */}
          <Col span={24}>
            {viewMode === 'board' ? (
              <div>
                {/* 第一行：流失客户池 -> 待召回 -> 孵化中 */}
                <Row gutter={16} style={{ marginBottom: 24 }}>
                  <Col span={8}>
                    <SwimLane
                      lane={SWIM_LANES[0]}
                      customers={customersByStage[SWIM_LANES[0].key] || []}
                      onCardClick={handleCardClick}
                      onMoveCustomer={handleMoveCustomer}
                      visibleCount={visibleCounts[SWIM_LANES[0].key] || 5}
                      onLoadMore={() => loadMoreCustomers(SWIM_LANES[0].key)}
                    />
                  </Col>
                  <Col span={8}>
                    <SwimLane
                      lane={SWIM_LANES[1]}
                      customers={customersByStage[SWIM_LANES[1].key] || []}
                      onCardClick={handleCardClick}
                      onMoveCustomer={handleMoveCustomer}
                      visibleCount={visibleCounts[SWIM_LANES[1].key] || 5}
                      onLoadMore={() => loadMoreCustomers(SWIM_LANES[1].key)}
                    />
                  </Col>
                  <Col span={8}>
                    <SwimLane
                      lane={SWIM_LANES[2]}
                      customers={customersByStage[SWIM_LANES[2].key] || []}
                      onCardClick={handleCardClick}
                      onMoveCustomer={handleMoveCustomer}
                      visibleCount={visibleCounts[SWIM_LANES[2].key] || 5}
                      onLoadMore={() => loadMoreCustomers(SWIM_LANES[2].key)}
                    />
                  </Col>
                </Row>
                
                {/* 箭头指引 */}
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                  <ArrowDownOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                </div>
                
                {/* 第二行：商务谈判 -> 已召回 -> 永久流失 */}
                <Row gutter={16}>
                  <Col span={8}>
                    <SwimLane
                      lane={SWIM_LANES[3]}
                      customers={customersByStage[SWIM_LANES[3].key] || []}
                      onCardClick={handleCardClick}
                      onMoveCustomer={handleMoveCustomer}
                      visibleCount={visibleCounts[SWIM_LANES[3].key] || 5}
                      onLoadMore={() => loadMoreCustomers(SWIM_LANES[3].key)}
                    />
                  </Col>
                  <Col span={8}>
                    <SwimLane
                      lane={SWIM_LANES[4]}
                      customers={customersByStage[SWIM_LANES[4].key] || []}
                      onCardClick={handleCardClick}
                      onMoveCustomer={handleMoveCustomer}
                      visibleCount={visibleCounts[SWIM_LANES[4].key] || 5}
                      onLoadMore={() => loadMoreCustomers(SWIM_LANES[4].key)}
                    />
                  </Col>
                  <Col span={8}>
                    <SwimLane
                      lane={SWIM_LANES[5]}
                      customers={customersByStage[SWIM_LANES[5].key] || []}
                      onCardClick={handleCardClick}
                      onMoveCustomer={handleMoveCustomer}
                      visibleCount={visibleCounts[SWIM_LANES[5].key] || 5}
                      onLoadMore={() => loadMoreCustomers(SWIM_LANES[5].key)}
                    />
                  </Col>
                </Row>
              </div>
            ) : (
              <Card title="客户列表">
                <Table
                  columns={listColumns}
                  dataSource={filteredCustomers}
                  rowKey="id"
                  pagination={{ pageSize: 10 }}
                />
              </Card>
            )}
          </Col>


        </Row>

        {/* 客户详情抽屉 */}
        <Drawer
          title={selectedCustomer?.name}
          placement="right"
          width={600}
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
        >
          {selectedCustomer && (
            <div>
              {/* 基本信息 */}
              <Card title="基本信息" size="small" style={{ marginBottom: '16px' }}>
                <Row gutter={16}>
                  <Col span={12}>
                    <div><strong>行业:</strong> {selectedCustomer.industry}</div>
                    <div><strong>风险等级:</strong> 
                      <Tag color={selectedCustomer.riskLevel === 'high' ? 'red' : selectedCustomer.riskLevel === 'medium' ? 'orange' : 'green'}>
                        {selectedCustomer.riskLevel === 'high' ? '高风险' : selectedCustomer.riskLevel === 'medium' ? '中风险' : '低风险'}
                      </Tag>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div><strong>流失前ARR:</strong> ¥{selectedCustomer.preChurnARR.toLocaleString()}</div>
                    <div><strong>流失天数:</strong> {selectedCustomer.churnedDays}天</div>
                  </Col>
                </Row>
              </Card>

              {/* 联系人信息 */}
              <Card title="联系人" size="small" style={{ marginBottom: '16px' }}>
                {selectedCustomer.contacts.map((contact, index) => (
                  <div key={index} style={{ marginBottom: '8px' }}>
                    <div><strong>{contact.name}</strong> - {contact.role}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      <PhoneOutlined /> {contact.phone} | <MailOutlined /> {contact.email}
                    </div>
                  </div>
                ))}
              </Card>

              {/* 流失分析 */}
              <Card title="流失分析" size="small" style={{ marginBottom: '16px' }}>
                <div><strong>主要原因:</strong> {selectedCustomer.churnAnalysis.primaryReason}</div>
                <div><strong>次要原因:</strong> {selectedCustomer.churnAnalysis.secondaryReasons.join(', ')}</div>
                {selectedCustomer.churnAnalysis.competitorInfo && (
                  <div><strong>竞品信息:</strong> {selectedCustomer.churnAnalysis.competitorInfo}</div>
                )}
                <div><strong>客户反馈:</strong> {selectedCustomer.churnAnalysis.customerFeedback}</div>
              </Card>

              {/* 召回计划 */}
              <Card title="召回行动计划" size="small" style={{ marginBottom: '16px' }}>
                {selectedCustomer.recallPlan.map(plan => (
                  <div key={plan.id} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: '1px solid #f0f0f0'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        textDecoration: plan.completed ? 'line-through' : 'none',
                        color: plan.completed ? '#999' : '#000'
                      }}>
                        {plan.task}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        <CalendarOutlined /> {plan.dueDate}
                      </div>
                    </div>
                    <Tag color={plan.completed ? 'green' : 'orange'}>
                      {plan.completed ? '已完成' : '进行中'}
                    </Tag>
                  </div>
                ))}
              </Card>

              {/* 行动剧本 */}
              <Card title="行动剧本 (Playbook)" size="small">
                <div>
                  <div style={{ marginBottom: '12px', fontWeight: 'bold' }}>
                    针对 {selectedCustomer.name} 的推荐剧本:
                  </div>
                  {PLAYBOOK_TEMPLATES[selectedCustomer.churnReason]?.map(template => (
                    <div key={template.id} style={{ marginBottom: '8px' }}>
                      <Button type="link" size="small" style={{ padding: 0, height: 'auto' }}>
                        <FileTextOutlined /> {template.title}
                      </Button>
                      <div style={{ fontSize: '12px', color: '#666', marginLeft: '16px' }}>
                        {template.type}
                      </div>
                    </div>
                  )) || (
                    <Text type="secondary">暂无相关剧本</Text>
                  )}
                </div>
              </Card>
            </div>
          )}
        </Drawer>
      </div>
    </DndProvider>
  );
};

export default RecallIncubationWorkbench;