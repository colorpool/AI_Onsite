import React, { useMemo, useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Progress, 
  List, 
  Button, 
  Tag, 
  Avatar, 
  Checkbox,
  Space,
  Typography,
  Tabs,
  Divider,
  Badge,
  Select,
  Tooltip,
  Calendar,
  theme,
  Drawer,
  Modal,
  Form,
  Input,
  Select as AntSelect,
  Popconfirm
} from 'antd';
import { 
  UserOutlined, 
  TeamOutlined, 
  DollarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  BellOutlined,
  BarChartOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  BookOutlined,
  UserSwitchOutlined,
  CalendarOutlined,
  MessageOutlined,
  RiseOutlined,
  FallOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  ArrowRightOutlined,
  StarOutlined,
  TrophyOutlined,
  PlusOutlined,
  AppstoreOutlined,
  TableOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  FireOutlined,
  AlertOutlined,
  HeartOutlined,
  PieChartOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { useModel } from '@umijs/max';

import { mockCustomerHandovers } from '../../mock/handoverData';
import type { CustomerHandover } from '../../types/handover';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

// 统一的卡片样式 - 参考图片的现代风格
const cardStyle = {
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  border: '1px solid #f0f0f0',
  background: '#ffffff',
  marginBottom: '16px',
};

// 问候语生成函数
const generateGreeting = (userName: string = '用户') => {
  const now = new Date();
  const hour = now.getHours();
  
  let timeGreeting = '';
  let encouragements: string[] = [];
  
  if (hour >= 5 && hour < 12) {
    timeGreeting = '早安';
    encouragements = [
      '祝你开心每一天！',
      '新的一天充满希望！',
      '愿你今天收获满满！',
      '今天也要加油哦！',
      '美好的一天开始了！'
    ];
  } else if (hour >= 12 && hour < 14) {
    timeGreeting = '中午好';
    encouragements = [
      '午休愉快！',
      '下午继续加油！',
      '享受美好的午间时光！',
      '休息是为了更好的工作！',
      '中午记得好好休息！'
    ];
  } else if (hour >= 14 && hour < 18) {
    timeGreeting = '下午好';
    encouragements = [
      '下午工作顺利！',
      '继续努力，加油！',
      '下午也要保持好心情！',
      '工作再忙也要注意休息！',
      '下午时光很美好！'
    ];
  } else if (hour >= 18 && hour < 22) {
    timeGreeting = '晚上好';
    encouragements = [
      '晚上也要保持好心情！',
      '今天辛苦了！',
      '晚上记得放松一下！',
      '今天的工作很棒！',
      '晚上时光很温馨！'
    ];
  } else {
    timeGreeting = '夜深了';
    encouragements = [
      '早点休息，明天见！',
      '夜深了，注意身体！',
      '今天辛苦了，晚安！',
      '休息是为了更好的明天！',
      '夜深人静，好好休息！'
    ];
  }
  
  // 随机选择一条鼓励话语
  const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
  
  return `${timeGreeting}，${userName}，${randomEncouragement}`;
};

// 顶部区域：个性化欢迎语 + 快捷链接
const HeaderSection: React.FC<{ userName: string; greeting: string }> = ({ userName, greeting }) => {
  const [quickLinks, setQuickLinks] = useState([
    { id: 1, name: 'CRM', icon: <UserOutlined />, url: '#', color: '#1890ff' },
    { id: 2, name: '禅道', icon: <SettingOutlined />, url: '#', color: '#52c41a' },
    { id: 3, name: '多维表', icon: <TableOutlined />, url: '#', color: '#722ed1' },
  ]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      marginBottom: '24px'
    }}>
      {/* 左侧：个性化欢迎语 */}
            <div>
        <Title level={2} style={{ margin: 0, color: '#262626', fontWeight: '600' }}>
          {greeting}
        </Title>
        <Text type="secondary" style={{ fontSize: '14px', color: '#666' }}>
          客户成功经理 · 数据洞察与任务管理
        </Text>
              </div>
      
      {/* 右侧：快捷链接图标组 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {quickLinks.map((link) => (
          <Tooltip key={link.id} title={link.name}>
            <Button
              type="text"
              shape="circle"
              size="large"
              icon={link.icon}
              style={{
                width: '44px',
                height: '44px',
                background: `${link.color}15`,
                border: `1px solid ${link.color}30`,
                color: link.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
              }}
              onClick={() => window.open(link.url, '_blank')}
            />
          </Tooltip>
        ))}
        
        {/* 添加按钮 */}
        <Tooltip title="添加快捷链接">
          <Button
            type="dashed"
            shape="circle"
            size="large"
            icon={<PlusOutlined />}
            style={{
              width: '44px',
              height: '44px',
              borderColor: '#d9d9d9',
              color: '#666'
            }}
          />
        </Tooltip>
            </div>
          </div>
  );
};

// 公司业绩指标横幅
const CompanyKPIBanner: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState('年度');

  return (
    <Card 
      style={{
        ...cardStyle,
        marginBottom: '24px'
      }}
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BarChartOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
            <span style={{ fontSize: '16px', fontWeight: '600' }}>公司业绩指标</span>
              </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* 时间跨度选择器 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {['年度', '季度', '月度'].map((period) => (
                <Button
                  key={period}
                  type={timePeriod === period ? 'primary' : 'text'}
                  size="small"
                  style={{
                    padding: '4px 12px',
                    height: '28px',
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}
                  onClick={() => setTimePeriod(period)}
                >
                  {period}
                </Button>
              ))}
              </div>
            
            {/* 日期范围选择器 */}
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              padding: '4px 12px',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              background: '#fff',
              fontSize: '12px',
              color: '#666'
            }}>
              <span>2025-01-01</span>
              <ArrowRightOutlined style={{ margin: '0 8px', fontSize: '10px' }} />
              <span>2025-12-31</span>
              <CalendarOutlined style={{ marginLeft: '8px', fontSize: '12px' }} />
            </div>
          </div>
        </div>
      }
    >
      <Row gutter={[24, 16]}>
        <Col span={6}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#1890ff', marginBottom: '8px' }}>
              92.5%
            </div>
            <Text type="secondary" style={{ fontSize: '14px' }}>续费率</Text>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '8px' }}>
              <ArrowUpOutlined style={{ color: '#52c41a', fontSize: '12px', marginRight: '4px' }} />
              <Text style={{ color: '#52c41a', fontSize: '12px' }}>+3.2%</Text>
            </div>
          </div>
      </Col>
      
      <Col span={6}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#52c41a', marginBottom: '8px' }}>
              87.8%
              </div>
            <Text type="secondary" style={{ fontSize: '14px' }}>续约率</Text>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '8px' }}>
                <ArrowUpOutlined style={{ color: '#52c41a', fontSize: '12px', marginRight: '4px' }} />
              <Text style={{ color: '#52c41a', fontSize: '12px' }}>+1.8%</Text>
              </div>
            </div>
        </Col>
        
        <Col span={6}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#722ed1', marginBottom: '8px' }}>
              ¥1,250万
            </div>
            <Text type="secondary" style={{ fontSize: '14px' }}>增值业绩</Text>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '8px' }}>
              <ArrowUpOutlined style={{ color: '#52c41a', fontSize: '12px', marginRight: '4px' }} />
              <Text style={{ color: '#52c41a', fontSize: '12px' }}>+15.6%</Text>
          </div>
          </div>
      </Col>
      
      <Col span={6}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#fa8c16', marginBottom: '8px' }}>
              78.5%
              </div>
            <Text type="secondary" style={{ fontSize: '14px' }}>客户档案完整度</Text>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '8px' }}>
                <ArrowDownOutlined style={{ color: '#ff4d4f', fontSize: '12px', marginRight: '4px' }} />
              <Text style={{ color: '#ff4d4f', fontSize: '12px' }}>-0.5%</Text>
              </div>
            </div>
      </Col>
    </Row>
    </Card>
  );
};

// 左侧行动区组件
const ActionSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [handoverDrawerOpen, setHandoverDrawerOpen] = useState<boolean>(false);
  const [selectedHandover, setSelectedHandover] = useState<CustomerHandover | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState<boolean>(false);
  const [editingContext, setEditingContext] = useState<{ section: 'today' | 'thisWeek' | 'future'; id?: number } | null>(null);
  const [form] = Form.useForm();
  const [hoveredItem, setHoveredItem] = useState<{ section: 'today' | 'thisWeek' | 'future'; id: number } | null>(null);
  
  // 智能提醒与任务队列数据
  const intelligentTasks = {
    newImplementation: [
      { id: 1, customer: '阿里巴巴集团', sales: '张销售', amount: '¥500,000', priority: 'high', dueDate: '2024-01-15' },
      { id: 2, customer: '腾讯科技', sales: '李销售', amount: '¥300,000', priority: 'medium', dueDate: '2024-01-16' },
      { id: 3, customer: '字节跳动', sales: '王销售', amount: '¥800,000', priority: 'high', dueDate: '2024-01-18' },
    ],
    pendingRenewal: [
      { id: 4, customer: '美团点评', contractEnd: '2024-02-28', amount: '¥450,000', probability: 85 },
      { id: 5, customer: '滴滴出行', contractEnd: '2024-03-15', amount: '¥320,000', probability: 75 },
      { id: 6, customer: '小米科技', contractEnd: '2024-03-30', amount: '¥280,000', probability: 90 },
    ],
    inactiveCustomers: [
      { id: 7, customer: '百度公司', lastActivity: '30天前', healthScore: 45, risk: 'high' },
      { id: 8, customer: '网易公司', lastActivity: '15天前', healthScore: 62, risk: 'medium' },
      { id: 9, customer: '搜狐公司', lastActivity: '45天前', healthScore: 38, risk: 'critical' },
    ],
    activeOpportunities: [
      { id: 10, customer: '京东集团', opportunity: '产品升级', potential: '¥200,000', stage: '需求评估' },
      { id: 11, customer: '拼多多', opportunity: '功能扩展', potential: '¥350,000', stage: '方案制定' },
      { id: 12, customer: '新浪微博', opportunity: '增值服务', potential: '¥150,000', stage: '商务谈判' },
    ]
  };

  // 任务类型文本映射函数
  const getTaskTypeText = (type: string) => {
    const texts = {
      'business-review': '业务回顾',
      'renewal': '续约',
      'training': '培训',
      'report': '报告',
      'survey': '调研',
      'meeting': '会议',
      'demo': '演示',
      'contract': '合同'
    };
    return texts[type as keyof typeof texts] || '其他';
  };

  // 我的日程与待办数据（使用状态管理以支持新增/编辑/删除）
  const [scheduleData, setScheduleData] = useState<{
    today: Array<{ id: number; task: string; customer: string; time: string; type: string; completed: boolean }>;
    thisWeek: Array<{ id: number; task: string; customer: string; time: string; type: string; completed: boolean }>;
    future: Array<{ id: number; task: string; customer: string; time: string; type: string; completed: boolean }>;
  }>({
    today: [
      { id: 1, task: '客户回访 - 阿里巴巴', customer: '阿里巴巴集团', time: '14:00', type: 'business-review', completed: false },
      { id: 2, task: '续约谈判准备', customer: '腾讯科技', time: '16:00', type: 'renewal', completed: false },
      { id: 3, task: '客户培训安排', customer: '字节跳动', time: '18:00', type: 'training', completed: true },
    ],
    thisWeek: [
      { id: 4, task: '月度报告整理', customer: '美团点评', time: '明天 10:00', type: 'report', completed: false },
      { id: 5, task: '客户满意度调研', customer: '滴滴出行', time: '周三 15:00', type: 'survey', completed: false },
      { id: 6, task: '产品演示准备', customer: '百度公司', time: '周四 14:00', type: 'demo', completed: false },
    ],
    future: [
      { id: 7, task: '年度客户会议', customer: '小米科技', time: '下周一 09:00', type: 'meeting', completed: false },
      { id: 8, task: '季度业务回顾', customer: '京东集团', time: '下周三 14:00', type: 'business-review', completed: false },
      { id: 9, task: '合同续签仪式', customer: '拼多多', time: '下周五 16:00', type: 'contract', completed: false },
    ]
  });

  const allIds = useMemo(() => {
    return new Set<number>([
      ...scheduleData.today.map(i => i.id),
      ...scheduleData.thisWeek.map(i => i.id),
      ...scheduleData.future.map(i => i.id),
    ]);
  }, [scheduleData]);

  const getNextId = () => {
    let next = 1;
    while (allIds.has(next)) next += 1;
    return next;
  };

  const openAddModal = () => {
    setEditingContext({ section: 'today' });
    form.resetFields();
    setIsScheduleModalOpen(true);
  };

  const openEditModal = (section: 'today' | 'thisWeek' | 'future', id: number) => {
    const record = scheduleData[section].find(i => i.id === id);
    if (record) {
      setEditingContext({ section, id });
      form.setFieldsValue({
        section,
        task: record.task,
        customer: record.customer,
        time: record.time,
        type: record.type,
        completed: record.completed,
      });
      setIsScheduleModalOpen(true);
    }
  };

  const handleDelete = (section: 'today' | 'thisWeek' | 'future', id: number) => {
    setScheduleData(prev => ({
      ...prev,
      [section]: prev[section].filter(i => i.id !== id)
    }));
  };

  const handleToggleCompleted = (section: 'today' | 'thisWeek' | 'future', id: number, checked: boolean) => {
    setScheduleData(prev => ({
      ...prev,
      [section]: prev[section].map(i => i.id === id ? { ...i, completed: checked } : i)
    }));
  };

  const handleModalOk = async () => {
    const values = await form.validateFields();
    const { section, task, customer, time, type } = values as { section: 'today' | 'thisWeek' | 'future'; task: string; customer: string; time: string; type: string };
    const completed = Boolean(values.completed);

    setScheduleData(prev => {
      if (editingContext && editingContext.id != null) {
        // 编辑
        const originalSection = editingContext.section;
        // 如果切换了分组，需要从原分组删除，添加到新分组
        const updatedOriginal = prev[originalSection].filter(i => i.id !== editingContext.id);
        const updatedTarget = [
          ...prev[section].filter(i => i.id !== editingContext.id),
          { id: editingContext.id, task, customer, time, type, completed }
        ];
        return {
          ...prev,
          [originalSection]: updatedOriginal,
          [section]: updatedTarget
        };
      }
      // 新增
      const newItem = { id: getNextId(), task, customer, time, type, completed };
      return {
        ...prev,
        [section]: [...prev[section], newItem]
      };
    });

    setIsScheduleModalOpen(false);
    setEditingContext(null);
  };

  const handleModalCancel = () => {
    setIsScheduleModalOpen(false);
    setEditingContext(null);
  };

  // 日历视图：悬停与隐藏的本地状态
  const [hoveredCalendarIdx, setHoveredCalendarIdx] = useState<number | null>(null);
  const [hiddenCalendarItems, setHiddenCalendarItems] = useState<{ [date: string]: number[] }>({});

  const inferSectionByDate = (dateStr: string): 'today' | 'thisWeek' | 'future' => {
    try {
      const today = new Date();
      const target = new Date(dateStr);
      const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const startOfTarget = new Date(target.getFullYear(), target.getMonth(), target.getDate());
      const diffMs = startOfTarget.getTime() - startOfToday.getTime();
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays === 0) return 'today';
      if (diffDays > 0 && diffDays <= 7) return 'thisWeek';
      return 'future';
    } catch {
      return 'future';
    }
  };

  const openEditFromCalendar = (
    dateStr: string,
    item: { task: string; customer: string; time: string; type: string }
  ) => {
    const section = inferSectionByDate(dateStr);
    setEditingContext({ section });
    form.setFieldsValue({
      section,
      task: item.task,
      customer: item.customer,
      time: item.time,
      type: item.type,
      completed: false,
    });
    setIsScheduleModalOpen(true);
  };

  const deleteFromCalendarView = (dateStr: string, index: number) => {
    setHiddenCalendarItems((prev) => {
      const existed = prev[dateStr] || [];
      if (existed.includes(index)) return prev;
      return { ...prev, [dateStr]: [...existed, index] };
    });
  };

  // 日历事件数据
  const calendarEvents = (() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const monthStr = currentMonth.toString().padStart(2, '0');
    
    const events: { [key: string]: Array<{ task: string; customer: string; time: string; type: string }> } = {
      // 使用当前月份的日期
      [`${currentYear}-${monthStr}-15`]: [
        { task: '客户回访 - 阿里巴巴', customer: '阿里巴巴集团', time: '14:00', type: 'business-review' },
        { task: '续约谈判准备', customer: '腾讯科技', time: '16:00', type: 'renewal' }
      ],
      [`${currentYear}-${monthStr}-16`]: [
        { task: '客户培训安排', customer: '字节跳动', time: '18:00', type: 'training' }
      ],
      [`${currentYear}-${monthStr}-20`]: [
        { task: '月度报告整理', customer: '美团点评', time: '10:00', type: 'report' }
      ],
      [`${currentYear}-${monthStr}-22`]: [
        { task: '客户满意度调研', customer: '滴滴出行', time: '15:00', type: 'survey' }
      ],
      [`${currentYear}-${monthStr}-23`]: [
        { task: '产品演示准备', customer: '百度公司', time: '14:00', type: 'demo' }
      ],
      [`${currentYear}-${monthStr}-08`]: [
        { task: '客户会议', customer: '小米科技', time: '09:00', type: 'meeting' }
      ],
      [`${currentYear}-${monthStr}-10`]: [
        { task: '合同签署', customer: '京东集团', time: '16:00', type: 'contract' }
      ],
      [`${currentYear}-${monthStr}-12`]: [
        { task: '产品培训', customer: '拼多多', time: '14:00', type: 'training' },
        { task: '业务回顾', customer: '新浪微博', time: '16:00', type: 'business-review' }
      ],
      [`${currentYear}-${monthStr}-18`]: [
        { task: '续约谈判', customer: '网易公司', time: '10:00', type: 'renewal' }
      ],
      [`${currentYear}-${monthStr}-25`]: [
        { task: '客户回访', customer: '搜狐公司', time: '15:00', type: 'business-review' }
      ],
      [`${currentYear}-${monthStr}-28`]: [
        { task: '月度总结', customer: '百度公司', time: '14:00', type: 'report' }
      ]
    };
    
    // 注意：不再生成随机事件，保持稳定
    
    return events;
  })();

  const getTaskTypeColor = (type: string) => {
    const colors = {
      'business-review': '#52c41a',
      'renewal': '#1890ff',
      'training': '#722ed1',
      'report': '#fa8c16',
      'survey': '#13c2c2',
      'meeting': '#eb2f96',
      'demo': '#fa541c',
      'contract': '#2f54eb'
    };
    return colors[type as keyof typeof colors] || '#666';
  };

  const getRiskColor = (risk: string) => {
    const colors = {
      'critical': '#ff4d4f',
      'high': '#fa8c16',
      'medium': '#faad14',
      'low': '#52c41a'
    };
    return colors[risk as keyof typeof colors] || '#666';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'high': '#ff4d4f',
      'medium': '#fa8c16',
      'low': '#52c41a'
    };
    return colors[priority as keyof typeof colors] || '#666';
  };

  return (
    <Col span={16}>
      <Row gutter={[0, 16]}>
        {/* 智能提醒与任务队列 */}
        <Col span={24}>
          <Card 
            style={cardStyle}
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <BellOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
                <span style={{ fontSize: '16px', fontWeight: '600' }}>智能提醒与任务队列</span>
              </div>
            }
            bodyStyle={{ padding: '16px' }}
          >
            <Tabs defaultActiveKey="handover" size="small">
              <TabPane tab="交接实施" key="handover">
                <List
                  dataSource={mockCustomerHandovers}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Button size="small" style={{ borderRadius: '6px' }} onClick={() => { setSelectedHandover(item); setHandoverDrawerOpen(true); }}>查看详情</Button>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar style={{ backgroundColor: '#1890ff' }}>{item.customerName.charAt(0)}</Avatar>}
                        title={item.customerName}
                        description={
                          <Space size="small" wrap>
                            <Tag color={item.expectationAlignment === 'aligned' ? 'green' : item.expectationAlignment === 'partially_aligned' ? 'gold' : 'orange'}>
                              {item.expectationAlignment === 'aligned' ? '已对齐' : item.expectationAlignment === 'partially_aligned' ? '部分对齐' : '未对齐'}
                            </Tag>
                            <Tag color={item.hasRiskAlert ? 'orange' : 'default'}>
                              风险提示: {item.hasRiskAlert ? '有' : '无'}
                            </Tag>
                            {typeof item.stakeholderCount === 'number' && (
                              <Tag color="purple">干系人: {item.stakeholderCount}</Tag>
                            )}
                            {typeof item.handoverRating === 'number' && (
                              <Tag color="gold">评分: {item.handoverRating}</Tag>
                            )}
                            {item.updatedAt && (
                              <Text type="secondary">更新时间: {item.updatedAt}</Text>
                            )}
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
                <Drawer
                  title={selectedHandover?.customerName || '客户交接详情'}
                  open={handoverDrawerOpen}
                  onClose={() => setHandoverDrawerOpen(false)}
                  width={720}
                >
                  {selectedHandover && (
                    <div>
                      <Space size="small" wrap style={{ marginBottom: 12 }}>
                        <Tag color={selectedHandover.expectationAlignment === 'aligned' ? 'green' : selectedHandover.expectationAlignment === 'partially_aligned' ? 'gold' : 'orange'}>
                          {selectedHandover.expectationAlignment === 'aligned' ? '已对齐' : selectedHandover.expectationAlignment === 'partially_aligned' ? '部分对齐' : '未对齐'}
                        </Tag>
                        <Tag color={selectedHandover.hasRiskAlert ? 'orange' : 'default'}>风险提示: {selectedHandover.hasRiskAlert ? '有' : '无'}</Tag>
                        {typeof selectedHandover.handoverRating === 'number' && <Tag color="gold">评分: {selectedHandover.handoverRating}</Tag>}
                        {typeof selectedHandover.stakeholderCount === 'number' && <Tag color="purple">干系人: {selectedHandover.stakeholderCount}</Tag>}
                      </Space>

                      {selectedHandover.crmData && (
                        <div style={{ marginBottom: 16 }}>
                          <Title level={5} style={{ marginBottom: 8 }}>CRM 同步信息</Title>
                          <Row gutter={16}>
                            <Col span={12}><Text type="secondary">合同金额：</Text><Text style={{ marginLeft: 8 }}>¥{selectedHandover.crmData.contractAmount}</Text></Col>
                            <Col span={12}><Text type="secondary">服务周期：</Text><Text style={{ marginLeft: 8 }}>{selectedHandover.crmData.servicePeriod}</Text></Col>
                          </Row>
                          <div style={{ marginTop: 8 }}>
                            <Text type="secondary">已购产品：</Text>
                            <Space wrap style={{ marginTop: 6 }}>
                              {selectedHandover.crmData.purchasedProducts.map((p, i) => (<Tag key={i} color="blue">{p}</Tag>))}
                            </Space>
                          </div>
                          <div style={{ marginTop: 8 }}>
                            <Text type="secondary">关键联系人：</Text>
                            <div style={{ marginTop: 6 }}>
                              {selectedHandover.crmData.keyContacts.map((c, i) => (<div key={i} style={{ marginBottom: 4 }}><Text>{c}</Text></div>))}
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedHandover.onboardingTasks && (
                        <div style={{ marginBottom: 16 }}>
                          <Title level={5} style={{ marginBottom: 8 }}>Onboarding 行动计划</Title>
                          <List
                            size="small"
                            dataSource={selectedHandover.onboardingTasks}
                            renderItem={(t) => (
                              <List.Item>
                                <Space>
                                  <Checkbox checked={t.completed} />
                                  <Text style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>{t.title}</Text>
                                  {t.dueDate && <Text type="secondary">截止: {t.dueDate}</Text>}
                                </Space>
                              </List.Item>
                            )}
                          />
                        </div>
                      )}

                      {selectedHandover.internalComments && (
                        <div>
                          <Title level={5} style={{ marginBottom: 8 }}>内部协作沟通</Title>
                          <List
                            size="small"
                            dataSource={selectedHandover.internalComments}
                            renderItem={(c) => (
                              <List.Item>
                                <div>
                                  <div style={{ marginBottom: 4 }}><Text strong>{c.author}</Text><Text type="secondary" style={{ marginLeft: 8 }}>{c.createdAt}</Text></div>
                                  <Text>{c.content}</Text>
                                </div>
                              </List.Item>
                            )}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </Drawer>
              </TabPane>
              <TabPane tab="新签实施" key="1">
                <List
                  dataSource={intelligentTasks.newImplementation}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Button type="primary" size="small" style={{ borderRadius: '6px' }}>
                          开始实施
                        </Button>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar style={{ backgroundColor: '#1890ff' }}>{item.customer.charAt(0)}</Avatar>}
                        title={item.customer}
                        description={
                          <Space>
                            <Text type="secondary">来源销售: {item.sales}</Text>
                            <Text type="secondary">合同金额: {item.amount}</Text>
                            <Text type="secondary">交付期限: {item.dueDate}</Text>
                            <Tag color={getPriorityColor(item.priority)}>
                              {item.priority === 'high' ? '高优先级' : '中优先级'}
                            </Tag>
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
              
              <TabPane tab="待续费" key="2">
                <List
                  dataSource={intelligentTasks.pendingRenewal}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Button size="small" style={{ borderRadius: '6px' }}>跟进续费</Button>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar style={{ backgroundColor: '#52c41a' }}>{item.customer.charAt(0)}</Avatar>}
                        title={item.customer}
                        description={
                          <Space>
                            <Text type="secondary">合同到期: {item.contractEnd}</Text>
                            <Text type="secondary">续费金额: {item.amount}</Text>
                            <Tag color="green">续费概率: {item.probability}%</Tag>
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
              
              <TabPane 
                tab={
                  <span>
                    不活跃客户 
                    <Badge count={3} size="small" style={{ marginLeft: '4px' }} />
                  </span>
                } 
                key="3"
              >
                <List
                  dataSource={intelligentTasks.inactiveCustomers}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Button size="small" style={{ borderRadius: '6px' }}>立即联系</Button>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar style={{ backgroundColor: getRiskColor(item.risk) }}>{item.customer.charAt(0)}</Avatar>}
                        title={item.customer}
                        description={
                          <Space>
                            <Text type="secondary">最后活跃: {item.lastActivity}</Text>
                            <Text type="secondary">健康分: {item.healthScore}</Text>
                            <Tag color={getRiskColor(item.risk)}>
                              {item.risk === 'critical' ? '严重风险' : item.risk === 'high' ? '高风险' : '中风险'}
                            </Tag>
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
              
              <TabPane 
                tab={
                  <span>
                    高活跃客户 
                    <FireOutlined style={{ color: '#fa8c16', marginLeft: '4px' }} />
                  </span>
                } 
                key="4"
              >
                <List
                  dataSource={intelligentTasks.activeOpportunities}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Button type="primary" size="small" style={{ borderRadius: '6px' }}>抓住商机</Button>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar style={{ backgroundColor: '#fa8c16' }}>{item.customer.charAt(0)}</Avatar>}
                        title={item.customer}
                        description={
                          <Space>
                            <Text type="secondary">{item.opportunity}</Text>
                            <Text type="secondary">潜在价值: {item.potential}</Text>
                            <Tag color="orange">{item.stage}</Tag>
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
            </Tabs>
          </Card>
        </Col>

        {/* 我的日程与待办 */}
        <Col span={24}>
          <Card 
            style={cardStyle}
            title={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CalendarOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <span style={{ fontSize: '16px', fontWeight: '600' }}>我的日程与待办</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button
                    type="primary"
                    size="small"
                    shape="circle"
                    icon={<PlusOutlined />}
                    onClick={openAddModal}
                  />
                  <Button
                    type={viewMode === 'list' ? 'primary' : 'text'}
                    size="small"
                    icon={<UnorderedListOutlined />}
                    onClick={() => setViewMode('list')}
                    style={{ borderRadius: '6px' }}
                  />
                  <Button
                    type={viewMode === 'calendar' ? 'primary' : 'text'}
                    size="small"
                    icon={<CalendarOutlined />}
                    onClick={() => setViewMode('calendar')}
                    style={{ borderRadius: '6px' }}
                  />
                </div>
              </div>
            }
            bodyStyle={{ padding: '16px' }}
          >
            {viewMode === 'list' ? (
              <>
            {/* 今天 */}
                <div style={{ marginBottom: '20px' }}>
              <Title level={5} style={{ marginBottom: '12px', color: '#262626' }}>今天</Title>
              <List
                    dataSource={scheduleData.today}
                renderItem={(item) => (
                  <List.Item
                    style={{ padding: '8px 0' }}
                    onMouseEnter={() => setHoveredItem({ section: 'today', id: item.id })}
                    onMouseLeave={() => setHoveredItem(null)}
                    actions={
                      hoveredItem && hoveredItem.section === 'today' && hoveredItem.id === item.id
                        ? [
                            <Button key="edit" size="small" type="text" icon={<EditOutlined />} onClick={() => openEditModal('today', item.id)} />,
                            <Popconfirm key="delete" title="确认删除该日程？" onConfirm={() => handleDelete('today', item.id)}>
                              <Button size="small" type="text" danger icon={<DeleteOutlined />} />
                            </Popconfirm>
                          ]
                        : []
                    }
                  >
                    <List.Item.Meta
                          avatar={<Checkbox checked={item.completed} onChange={(e) => handleToggleCompleted('today', item.id, e.target.checked)} />}
                      title={
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '8px' }}>
                          <Tag 
                            color={getTaskTypeColor(item.type)} 
                            style={{ 
                              background: `${getTaskTypeColor(item.type)}15`,
                              border: `1px solid ${getTaskTypeColor(item.type)}30`,
                              color: getTaskTypeColor(item.type)
                            }}
                          >
                            {getTaskTypeText(item.type)}
                          </Tag>
                          <span style={{ textDecoration: item.completed ? 'line-through' : 'none', opacity: item.completed ? 0.6 : 1 }}>
                            {item.task}
                          </span>
                        </div>
                      }
                      description={
                        <Space>
                          <Text type="secondary">{item.customer}</Text>
                              <Text type="secondary">时间: {item.time}</Text>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>

            {/* 本周 */}
                <div style={{ marginBottom: '20px' }}>
              <Title level={5} style={{ marginBottom: '12px', color: '#262626' }}>本周</Title>
              <List
                    dataSource={scheduleData.thisWeek}
                renderItem={(item) => (
                  <List.Item
                    style={{ padding: '8px 0' }}
                    onMouseEnter={() => setHoveredItem({ section: 'thisWeek', id: item.id })}
                    onMouseLeave={() => setHoveredItem(null)}
                    actions={
                      hoveredItem && hoveredItem.section === 'thisWeek' && hoveredItem.id === item.id
                        ? [
                            <Button key="edit" size="small" type="text" icon={<EditOutlined />} onClick={() => openEditModal('thisWeek', item.id)} />,
                            <Popconfirm key="delete" title="确认删除该日程？" onConfirm={() => handleDelete('thisWeek', item.id)}>
                              <Button size="small" type="text" danger icon={<DeleteOutlined />} />
                            </Popconfirm>
                          ]
                        : []
                    }
                  >
                    <List.Item.Meta
                          avatar={<Checkbox checked={item.completed} onChange={(e) => handleToggleCompleted('thisWeek', item.id, e.target.checked)} />}
                      title={
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '8px' }}>
                          <Tag 
                            color={getTaskTypeColor(item.type)} 
                            style={{ 
                              background: `${getTaskTypeColor(item.type)}15`,
                              border: `1px solid ${getTaskTypeColor(item.type)}30`,
                              color: getTaskTypeColor(item.type)
                            }}
                          >
                            {getTaskTypeText(item.type)}
                          </Tag>
                          <span style={{ textDecoration: item.completed ? 'line-through' : 'none', opacity: item.completed ? 0.6 : 1 }}>
                            {item.task}
                          </span>
                        </div>
                      }
                      description={
                        <Space>
                          <Text type="secondary">{item.customer}</Text>
                              <Text type="secondary">时间: {item.time}</Text>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>

            {/* 未来 */}
            <div>
              <Title level={5} style={{ marginBottom: '12px', color: '#262626' }}>未来</Title>
              <List
                    dataSource={scheduleData.future}
                    renderItem={(item) => (
                      <List.Item
                        style={{ padding: '8px 0' }}
                        onMouseEnter={() => setHoveredItem({ section: 'future', id: item.id })}
                        onMouseLeave={() => setHoveredItem(null)}
                        actions={
                          hoveredItem && hoveredItem.section === 'future' && hoveredItem.id === item.id
                            ? [
                                <Button key="edit" size="small" type="text" icon={<EditOutlined />} onClick={() => openEditModal('future', item.id)} />,
                                <Popconfirm key="delete" title="确认删除该日程？" onConfirm={() => handleDelete('future', item.id)}>
                                  <Button size="small" type="text" danger icon={<DeleteOutlined />} />
                                </Popconfirm>
                              ]
                            : []
                        }
                      >
                        <List.Item.Meta
                          avatar={<Checkbox checked={item.completed} onChange={(e) => handleToggleCompleted('future', item.id, e.target.checked)} />}
                          title={
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '8px' }}>
                              <Tag 
                                color={getTaskTypeColor(item.type)} 
                                style={{ 
                                  background: `${getTaskTypeColor(item.type)}15`,
                                  border: `1px solid ${getTaskTypeColor(item.type)}30`,
                                  color: getTaskTypeColor(item.type)
                                }}
                              >
                                {getTaskTypeText(item.type)}
                              </Tag>
                              <span style={{ textDecoration: item.completed ? 'line-through' : 'none', opacity: item.completed ? 0.6 : 1 }}>
                                {item.task}
                              </span>
                            </div>
                          }
                          description={
                            <Space>
                              <Text type="secondary">{item.customer}</Text>
                              <Text type="secondary">时间: {item.time}</Text>
                            </Space>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </div>
              </>
            ) : (
              /* 日历视图 */
              <div style={{ padding: '8px' }}>
                <Calendar 
                  fullscreen={false}
                  style={{ border: 'none' }}
                  onSelect={(date) => {
                    const dateStr = date.format('YYYY-MM-DD');
                    setSelectedDate(selectedDate === dateStr ? '' : dateStr);
                  }}
                  dateCellRender={(value) => {
                    const dateStr = value.format('YYYY-MM-DD');
                    const events = calendarEvents[dateStr] || [];
                    
                    if (events.length === 0) {
                      return null;
                    }
                    
                    return (
                      <div style={{ 
                        display: 'flex', 
                        gap: '2px', 
                        flexWrap: 'wrap', 
                        marginTop: '2px',
                        justifyContent: 'center'
                      }}>
                        {events.slice(0, 3).map((event, index) => (
                          <div 
                            key={index} 
                            style={{ 
                              width: '6px', 
                              height: '6px', 
                              borderRadius: '50%', 
                              backgroundColor: getTaskTypeColor(event.type),
                              border: '1px solid #fff',
                              boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                            }} 
                          />
                        ))}
                        {events.length > 3 && (
                          <div style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: '#999',
                            fontSize: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontWeight: 'bold'
                          }}>
                            +
                          </div>
                        )}
                      </div>
                    );
                  }}
                />
                
                {/* 选中日期的任务列表 */}
                {selectedDate && calendarEvents[selectedDate] && (
                  <div style={{ 
                    marginTop: '16px', 
                    padding: '12px', 
                    background: '#f8f9fa', 
                    borderRadius: '8px',
                    border: '1px solid #e9ecef'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      marginBottom: '12px'
                    }}>
                      <Text style={{ fontWeight: '600', color: '#262626' }}>
                        {selectedDate} 的待办事项
                      </Text>
                      <Button 
                        type="text" 
                        size="small" 
                        onClick={() => setSelectedDate('')}
                        style={{ padding: '0', minWidth: 'auto' }}
                      >
                        ✕
                      </Button>
                    </div>
                    <List
                      size="small"
                      dataSource={(calendarEvents[selectedDate] || []).filter((_, idx) => !(hiddenCalendarItems[selectedDate] || []).includes(idx))}
                renderItem={(item, index) => (
                  <List.Item 
                    style={{ padding: '8px 0' }}
                    onMouseEnter={() => setHoveredCalendarIdx(index)}
                    onMouseLeave={() => setHoveredCalendarIdx(null)}
                    actions={
                      hoveredCalendarIdx === index
                        ? [
                            <Button key="edit" size="small" type="text" icon={<EditOutlined />} onClick={() => openEditFromCalendar(selectedDate, item)} />,
                            <Popconfirm key="delete" title="确认删除该日程？" onConfirm={() => deleteFromCalendarView(selectedDate, index)}>
                              <Button size="small" type="text" danger icon={<DeleteOutlined />} />
                            </Popconfirm>
                          ]
                        : []
                    }
                  >
                    <List.Item.Meta
                      avatar={<Checkbox />}
                      title={
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '8px' }}>
                          <Tag 
                            color={getTaskTypeColor(item.type)} 
                            style={{ 
                              background: `${getTaskTypeColor(item.type)}15`,
                              border: `1px solid ${getTaskTypeColor(item.type)}30`,
                              color: getTaskTypeColor(item.type)
                            }}
                          >
                            {getTaskTypeText(item.type)}
                          </Tag>
                          <span>{item.task}</span>
                        </div>
                      }
                      description={
                        <Space>
                          <Text type="secondary">{item.customer}</Text>
                                <Text type="secondary">时间: {item.time}</Text>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
                )}
              </div>
            )}
          </Card>
          <Modal
            title={editingContext && editingContext.id != null ? '编辑日程' : '新增日程'}
            open={isScheduleModalOpen}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
            okText="保存"
            cancelText="取消"
            destroyOnClose
          >
            <Form form={form} layout="vertical" initialValues={{ section: editingContext?.section ?? 'today', completed: false }}>
              <Form.Item name="section" label="分组" rules={[{ required: true, message: '请选择分组' }]}>
                <AntSelect
                  options={[
                    { label: '今天', value: 'today' },
                    { label: '本周', value: 'thisWeek' },
                    { label: '未来', value: 'future' },
                  ]}
                />
              </Form.Item>
              <Form.Item name="task" label="事项" rules={[{ required: true, message: '请输入事项' }]}>
                <Input placeholder="例如：客户回访 - 阿里巴巴" />
              </Form.Item>
              <Form.Item name="customer" label="客户" rules={[{ required: true, message: '请输入客户名称' }]}>
                <Input placeholder="例如：阿里巴巴集团" />
              </Form.Item>
              <Form.Item name="time" label="时间" rules={[{ required: true, message: '请输入时间' }]}>
                <Input placeholder="例如：14:00 或 周三 15:00" />
              </Form.Item>
              <Form.Item name="type" label="类型" rules={[{ required: true, message: '请选择类型' }]}>
                <AntSelect
                  options={[
                    { label: getTaskTypeText('business-review'), value: 'business-review' },
                    { label: getTaskTypeText('renewal'), value: 'renewal' },
                    { label: getTaskTypeText('training'), value: 'training' },
                    { label: getTaskTypeText('report'), value: 'report' },
                    { label: getTaskTypeText('survey'), value: 'survey' },
                    { label: getTaskTypeText('demo'), value: 'demo' },
                    { label: getTaskTypeText('meeting'), value: 'meeting' },
                    { label: getTaskTypeText('contract'), value: 'contract' },
                  ]}
                />
              </Form.Item>
              <Form.Item name="completed" valuePropName="checked">
                <Checkbox>标记为已完成</Checkbox>
              </Form.Item>
            </Form>
          </Modal>
        </Col>
      </Row>
    </Col>
  );
};

// 右侧洞察区组件
const InsightSection: React.FC = () => {
  const [dataPeriod, setDataPeriod] = useState('年度');
  
  // 行业分析数据
  const industryData = [
    { industry: '互联网科技', count: 38, percentage: 29.7 },
    { industry: '金融服务', count: 25, percentage: 19.5 },
    { industry: '制造业', count: 22, percentage: 17.2 },
    { industry: '教育培训', count: 18, percentage: 14.1 },
    { industry: '医疗健康', count: 15, percentage: 11.7 }
  ];

  // 业务数据矩阵
  const businessMatrixData = [
    { type: '直营', total: 85, active: 72, inactive: 13, healthScore: 88.5 },
    { type: '渠道', total: 43, active: 17, inactive: 26, healthScore: 65.2 }
  ];

      return (
      <Col span={8}>
        <Row gutter={[0, 16]}>
        {/* 我的业务数据 */}
        <Col span={24}>
          <Card 
            style={cardStyle}
            title={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                  <BarChartOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
                  <span style={{ fontSize: '16px', fontWeight: '600' }}>我的业务数据</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {['年度', '季度', '月度'].map((period) => (
                    <Button
                      key={period}
                      type={dataPeriod === period ? 'primary' : 'text'}
                      size="small"
                      style={{
                        padding: '4px 12px',
                        height: '28px',
                        borderRadius: '6px',
                        fontSize: '12px'
                      }}
                      onClick={() => setDataPeriod(period)}
                    >
                      {period}
                    </Button>
                  ))}
                </div>
              </div>
            }
            bodyStyle={{ padding: '16px' }}
          >
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#1890ff', marginBottom: '4px' }}>
                    128
                  </div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>我的总客户数</Text>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '4px' }}>
                    <ArrowUpOutlined style={{ color: '#52c41a', fontSize: '10px', marginRight: '2px' }} />
                    <Text style={{ color: '#52c41a', fontSize: '10px' }}>+5</Text>
                  </div>
                </div>
              </Col>
              
              <Col span={8}>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#52c41a', marginBottom: '4px' }}>
                    89
                  </div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>活跃客户数</Text>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '4px' }}>
                    <ArrowUpOutlined style={{ color: '#52c41a', fontSize: '10px', marginRight: '2px' }} />
                    <Text style={{ color: '#52c41a', fontSize: '10px' }}>+12</Text>
                  </div>
                </div>
              </Col>
              
              <Col span={8}>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#722ed1', marginBottom: '4px' }}>
                    85.2
                  </div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>客户健康分均值</Text>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '4px' }}>
                    <ArrowUpOutlined style={{ color: '#52c41a', fontSize: '10px', marginRight: '2px' }} />
                    <Text style={{ color: '#52c41a', fontSize: '10px' }}>+2.3</Text>
                  </div>
                </div>
              </Col>
            </Row>

            {/* 业务数据矩阵表格 */}
            <div style={{ marginTop: '20px' }}>
              <Text style={{ fontSize: '14px', fontWeight: '600', color: '#262626', marginBottom: '12px', display: 'block' }}>
                客户分布矩阵
              </Text>
              <div style={{ 
                border: '1px solid #f0f0f0', 
                borderRadius: '8px',
                overflow: 'hidden',
                background: '#fff'
              }}>
                {/* 表头 */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                  background: '#fafafa',
                  borderBottom: '1px solid #f0f0f0'
                }}>
                  <div style={{ padding: '12px 8px', fontSize: '12px', fontWeight: '600', color: '#262626', textAlign: 'center' }}>
                    类型
                </div>
                  <div style={{ padding: '12px 8px', fontSize: '12px', fontWeight: '600', color: '#262626', textAlign: 'center' }}>
                    总客户数
                  </div>
                  <div style={{ padding: '12px 8px', fontSize: '12px', fontWeight: '600', color: '#262626', textAlign: 'center' }}>
                    活跃客户
                  </div>
                  <div style={{ padding: '12px 8px', fontSize: '12px', fontWeight: '600', color: '#262626', textAlign: 'center' }}>
                    不活跃客户
                  </div>
                  <div style={{ padding: '12px 8px', fontSize: '12px', fontWeight: '600', color: '#262626', textAlign: 'center' }}>
                    健康分
              </div>
            </div>
            
                {/* 表格内容 */}
                {businessMatrixData.map((row, index) => (
                  <div key={index} style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                    borderBottom: index < businessMatrixData.length - 1 ? '1px solid #f0f0f0' : 'none'
                  }}>
              <div style={{ 
                      padding: '12px 8px', 
                      fontSize: '12px', 
                      color: '#262626', 
                      textAlign: 'center',
                      fontWeight: '500'
                    }}>
                      {row.type}
                </div>
                    <div style={{ 
                      padding: '12px 8px', 
                      fontSize: '12px', 
                      color: '#1890ff', 
                      textAlign: 'center',
                      fontWeight: '600'
                    }}>
                      {row.total}
                    </div>
                    <div style={{ 
                      padding: '12px 8px', 
                      fontSize: '12px', 
                      color: '#52c41a', 
                      textAlign: 'center',
                      fontWeight: '600'
                    }}>
                      {row.active}
                    </div>
                    <div style={{ 
                      padding: '12px 8px', 
                      fontSize: '12px', 
                      color: '#fa8c16', 
                      textAlign: 'center',
                      fontWeight: '600'
                    }}>
                      {row.inactive}
                    </div>
                    <div style={{ 
                      padding: '12px 8px', 
                      fontSize: '12px', 
                      color: '#722ed1', 
                      textAlign: 'center',
                      fontWeight: '600'
                    }}>
                      {row.healthScore}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Col>

        {/* 我的客户行业分析 */}
        <Col span={24}>
          <Card 
            style={cardStyle}
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <PieChartOutlined style={{ color: '#fa8c16', marginRight: '8px' }} />
                <span style={{ fontSize: '16px', fontWeight: '600' }}>我的客户行业分析</span>
              </div>
            }
            bodyStyle={{ padding: '16px' }}
          >
            <div>
              <Text type="secondary" style={{ fontSize: '12px', marginBottom: '16px', display: 'block' }}>
                客户数量 TOP 5 行业分布
              </Text>
              
              {/* 垂直条形图 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {industryData.map((item, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ 
                      width: '60px', 
                      fontSize: '12px', 
                      color: '#666',
                      textAlign: 'right',
                      flexShrink: 0
                    }}>
                      {item.industry}
                        </div>
                    
                    <div style={{ 
                      flex: 1, 
                      height: '20px', 
                      background: '#f5f5f5', 
                      borderRadius: '4px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${item.percentage * 3}%`, // 放大显示比例
                        background: `linear-gradient(90deg, ${['#1890ff', '#52c41a', '#722ed1', '#fa8c16', '#13c2c2'][index]}, ${['#40a9ff', '#73d13d', '#9254de', '#ffc53d', '#36cfc9'][index]})`,
                        borderRadius: '4px',
                        transition: 'width 0.3s ease'
                      }} />
                  </div>
                    
                    <div style={{ 
                      width: '40px', 
                      fontSize: '12px', 
                      color: '#262626',
                      fontWeight: '500',
                      textAlign: 'center',
                      flexShrink: 0
                    }}>
                      {item.count}
                  </div>
                </div>
                ))}
              </div>

              {/* 饼图展示 */}
              <div style={{ marginTop: '20px' }}>
                <Text style={{ fontSize: '14px', fontWeight: '600', color: '#262626', marginBottom: '12px', display: 'block' }}>
                  行业分布饼图
                </Text>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  height: '120px',
                  background: '#fafafa',
                  borderRadius: '8px',
                  border: '1px solid #f0f0f0'
                }}>
                  <div style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%',
                    background: `conic-gradient(
                      #1890ff 0deg ${industryData[0].percentage * 3.6}deg,
                      #52c41a ${industryData[0].percentage * 3.6}deg ${(industryData[0].percentage + industryData[1].percentage) * 3.6}deg,
                      #722ed1 ${(industryData[0].percentage + industryData[1].percentage) * 3.6}deg ${(industryData[0].percentage + industryData[1].percentage + industryData[2].percentage) * 3.6}deg,
                      #fa8c16 ${(industryData[0].percentage + industryData[1].percentage + industryData[2].percentage) * 3.6}deg ${(industryData[0].percentage + industryData[1].percentage + industryData[2].percentage + industryData[3].percentage) * 3.6}deg,
                      #13c2c2 ${(industryData[0].percentage + industryData[1].percentage + industryData[2].percentage + industryData[3].percentage) * 3.6}deg 360deg
                    )`,
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: '#fff',
                      border: '2px solid #f0f0f0'
                    }} />
                        </div>
                  </div>
                
                {/* 图例 */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '8px', 
                  marginTop: '12px' 
                }}>
                  {industryData.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '2px',
                        background: ['#1890ff', '#52c41a', '#722ed1', '#fa8c16', '#13c2c2'][index]
                      }} />
                      <Text style={{ fontSize: '11px', color: '#666' }}>
                        {item.industry} ({item.count})
                      </Text>
                  </div>
                  ))}
                </div>
              </div>
              
              <div style={{ 
                marginTop: '12px', 
                padding: '8px 0', 
                borderTop: '1px solid #f0f0f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Text type="secondary" style={{ fontSize: '11px' }}>
                  其他行业: {128 - industryData.reduce((sum, item) => sum + item.count, 0)} 家
                </Text>
                <Text type="secondary" style={{ fontSize: '11px' }}>
                  总计: 128 家客户
                </Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Col>
  );
};

// 主工作台组件
export const WorkbenchDashboard: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const userName = initialState?.currentUser?.name || 'Serati Ma';
  const greeting = generateGreeting(userName);

  return (
    <div style={{ 
      padding: '32px 40px',
      background: '#f5f5f5',
      minHeight: 'calc(100vh - 64px)'
    }}>
      {/* 顶部区域：个性化欢迎语 + 快捷链接 */}
      <HeaderSection userName={userName} greeting={greeting} />

      {/* 公司业绩指标横幅 */}
      <CompanyKPIBanner />

      {/* 主要内容区域 */}
      <Row gutter={24}>
        {/* 左侧行动区 (70%高度) */}
        <ActionSection />
        
        {/* 右侧洞察区 (30%高度) */}
        <InsightSection />
      </Row>
      

    </div>
  );
};

export default WorkbenchDashboard;
