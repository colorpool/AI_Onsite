import React, { useState, useMemo, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Tabs, 
  Typography, 
  Statistic,
  Table,
  Tag,
  Input,
  Select,
  Space,
  Button,
  Tooltip,
  Progress,
  Badge,
  Avatar,
  message,
  Modal,
  Form,
  DatePicker,
  Divider,
  Checkbox,
  Popover
} from 'antd';
import ValueBoardTemplateLibrary from '../../../components/ValueBoardTemplateLibrary';
import PlaybookLibrary from '../../../components/PlaybookLibrary';
import PlaybookLauncher from '../../../components/PlaybookLauncher';
import PlaybookTaskManager from '../../../components/PlaybookTaskManager';
import PlaybookTriggerEngine from '../../../components/PlaybookTriggerEngine';
import {
  SearchOutlined,
  ReloadOutlined,
  ExportOutlined,
  PlusOutlined,
  BarChartOutlined,
  TeamOutlined,
  HeartOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  PlayCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  SettingOutlined,
  CustomerServiceOutlined,
  RiseOutlined,
  FallOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  PieChartOutlined,
  FireOutlined,
  AlertOutlined,
  TrophyOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  StarOutlined,
  StarFilled,
  QuestionCircleOutlined,
  PhoneOutlined,
  MailOutlined,
  PauseCircleOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  BankOutlined,
   GlobalOutlined,
    TagOutlined,
    BellOutlined,
    WifiOutlined,
    ControlOutlined
  } from '@ant-design/icons';
// 使用 Ant Design 内置组件替代图表库
import { useNavigate, useLocation } from 'umi';
import {
  mockCustomers,
  mockValueBoards,
  mockQBRMeetings,
  mockRiskEvents,
  mockServicePlaybooks,
  mockKeyActions,
  mockServiceOverview,
  healthColors
} from '../../../mock/continuousServiceData';
import type { 
  Customer, 
  CustomerFilter, 
  HealthLevel,
  ActionType,
  ValueBoard,
  QBRMeeting,
  RiskEvent,
  ServicePlaybook,
  PlaybookExecution,
  PlaybookRecommendation
} from '../../../types/continuousService';

const { Title, Text } = Typography;
const { Option } = Select;

// 统一的卡片样式 - 参考工作看板的现代风格
const cardStyle = {
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  border: '1px solid #f0f0f0',
  background: '#ffffff',
  marginBottom: '16px',
};

// 概览与监控页签组件
const OverviewTab: React.FC = () => {
  const navigate = useNavigate();
  const [customerFilter, setCustomerFilter] = useState<CustomerFilter>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [comparisonPeriod, setComparisonPeriod] = useState('上周');
  const headerCardHeight = 180;
  
  // 字段管理状态
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'isFavorite', 'name', 'connectionLevel', 
    'arr', 'lastContactDate', 'ticketExpiryDate', 'contractStartDate', 
    'contractEndDate', 'customerSegment', 'isRenewalRisk', 'contractAmount'
  ]);
  
  // 智能跟进提醒弹窗状态
  const [followUpModalVisible, setFollowUpModalVisible] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  
  // 智能跟进提醒数据
  const followUpReminders = {
    high: [
      { id: 1, customer: '深圳金融科技有限公司', content: '健康分下降至35分，建议立即联系', time: '2小时前', type: 'health_decline' },
      { id: 2, customer: '广州数字化企业', content: '合同即将到期，需要续约跟进', time: '4小时前', type: 'contract_expiry' },
      { id: 3, customer: '杭州互联网公司', content: '客户投诉未处理，影响满意度', time: '6小时前', type: 'complaint' }
    ],
    medium: [
      { id: 4, customer: '上海智能科技', content: '7天未登录，建议主动联系', time: '1天前', type: 'inactive' },
      { id: 5, customer: '北京科技创新有限公司', content: '使用频率下降30%，需要关注', time: '1天前', type: 'usage_decline' },
      { id: 6, customer: '成都软件公司', content: '支持工单响应超时', time: '2天前', type: 'support_delay' },
      { id: 7, customer: '武汉创新企业', content: '产品功能使用率偏低', time: '2天前', type: 'low_adoption' },
      { id: 8, customer: '西安科技集团', content: '培训完成度不足50%', time: '3天前', type: 'training_incomplete' }
    ],
    low: [
      { id: 9, customer: '天津制造业', content: '定期回访提醒', time: '3天前', type: 'regular_followup' },
      { id: 10, customer: '重庆物流公司', content: '产品更新通知', time: '4天前', type: 'product_update' },
      { id: 11, customer: '南京电子商务', content: '季度业务回顾安排', time: '5天前', type: 'quarterly_review' },
      { id: 12, customer: '苏州智能制造', content: '新功能推荐', time: '5天前', type: 'feature_recommendation' }
    ]
  };
  
  // 处理智能跟进提醒卡片点击
  const handleFollowUpCardClick = (priority: string) => {
    setSelectedPriority(priority);
    setFollowUpModalVisible(true);
  };
  
  // 处理查看全部点击
  const handleViewAllClick = () => {
    setSelectedPriority('all');
    setFollowUpModalVisible(true);
  };
  
  // 获取当前显示的提醒数据
  const getCurrentReminders = () => {
    if (selectedPriority === 'all') {
      return [...followUpReminders.high, ...followUpReminders.medium, ...followUpReminders.low];
    }
    return followUpReminders[selectedPriority as keyof typeof followUpReminders] || [];
  };
  
  // 获取优先级标签
  const getPriorityTag = (priority: string) => {
    const configs = {
      high: { color: '#ff4d4f', text: '高优先级' },
      medium: { color: '#fa8c16', text: '中优先级' },
      low: { color: '#52c41a', text: '低优先级' }
    };
    return configs[priority as keyof typeof configs] || { color: '#666', text: '未知' };
  };
  
  // 获取提醒类型标签
  const getTypeTag = (type: string) => {
    const types = {
      health_decline: '健康度下降',
      contract_expiry: '合同到期',
      complaint: '客户投诉',
      inactive: '用户不活跃',
      usage_decline: '使用率下降',
      support_delay: '支持延迟',
      low_adoption: '功能采用率低',
      training_incomplete: '培训未完成',
      regular_followup: '定期回访',
      product_update: '产品更新',
      quarterly_review: '季度回顾',
      feature_recommendation: '功能推荐'
    };
    return types[type as keyof typeof types] || '其他';
  };
  
  // 所有可用字段定义
  const allColumnOptions = [
    { key: 'isFavorite', label: '关注' },
    { key: 'name', label: '客户名称' },
    { key: 'healthScore', label: '健康分' },
    { key: 'healthLevel', label: '健康等级' },
    { key: 'connectionLevel', label: '建联度' },
    { key: 'arr', label: 'ARR' },
    { key: 'lastContactDate', label: '最后接触' },
    { key: 'ticketExpiryDate', label: '提单到期时间' },
    { key: 'contractStartDate', label: '合同开始时间' },
    { key: 'contractEndDate', label: '合同结束时间' },
    { key: 'customerSegment', label: '客户分层' },
    { key: 'isRenewalRisk', label: '续费风险' },
    { key: 'contractAmount', label: '合同金额' }
  ];

  // 过滤客户数据
  const filteredCustomers = useMemo(() => {
    return mockCustomers.filter(customer => {
      if (customerFilter.name && !customer.name.toLowerCase().includes(customerFilter.name.toLowerCase())) {
        return false;
      }
      if (customerFilter.healthLevel && customer.healthLevel !== customerFilter.healthLevel) {
        return false;
      }
      if (customerFilter.renewalRisk !== undefined && customer.isRenewalRisk !== customerFilter.renewalRisk) {
        return false;
      }
      if (customerFilter.isFavorite !== undefined && customer.isFavorite !== customerFilter.isFavorite) {
        return false;
      }
      return true;
    });
  }, [customerFilter]);

  // 健康度分布数据（带趋势）
  const healthDistributionData = [
    { 
      name: '健康', 
      value: mockServiceOverview.healthDistribution.healthy, 
      color: healthColors['健康'],
      trend: { direction: 'up', change: 2, previous: mockServiceOverview.healthDistribution.healthy - 2 }
    },
    { 
      name: '一般', 
      value: mockServiceOverview.healthDistribution.normal, 
      color: healthColors['一般'],
      trend: { direction: 'down', change: 1, previous: mockServiceOverview.healthDistribution.normal + 1 }
    },
    { 
      name: '风险', 
      value: mockServiceOverview.healthDistribution.risky, 
      color: healthColors['风险'],
      trend: { direction: 'down', change: 1, previous: mockServiceOverview.healthDistribution.risky + 1 }
    }
  ];

  // 异动情况的示例数据
  const movementEvents = [
    { id: 'm1', title: '管理员离职', detail: '北京科技创新有限公司 主要管理员离职', date: '2025-01-05', level: 'high' },
    { id: 'm2', title: 'CSM变更', detail: '深圳创新科技 CSM负责人调整', date: '2025-01-08', level: 'medium' },
    { id: 'm3', title: '权限收缩', detail: '广州数字化企业 减少管理员数量', date: '2025-01-12', level: 'low' },
    { id: 'm4', title: '合同到期', detail: '上海软件公司 合同即将到期', date: '2025-01-15', level: 'high' },
    { id: 'm5', title: '使用量下降', detail: '杭州互联网公司 系统使用频率降低', date: '2025-01-18', level: 'medium' },
    { id: 'm6', title: '新增用户', detail: '成都软件开发公司 新增10个用户', date: '2025-01-20', level: 'low' },
    { id: 'm7', title: '支付逾期', detail: '武汉电商平台 续费款项逾期未支付', date: '2025-01-22', level: 'high' }
  ];

  // 异动情况：直接使用模拟数据（无筛选）
  const filteredMovements = movementEvents;

  // 健康度下钻功能
  const handleHealthDrillDown = (healthLevel: string) => {
    setCustomerFilter(prev => ({ ...prev, healthLevel: healthLevel as HealthLevel }));
    message.success(`已筛选出${healthLevel}状态的客户`);
  };

  // 字段管理处理函数
  const handleColumnVisibilityChange = (checkedValues: string[]) => {
    setVisibleColumns(checkedValues);
  };

  // 字段管理UI组件
  const ColumnManagementPopover = () => (
    <div style={{ padding: '8px 0' }}>
      <div style={{ marginBottom: '8px', fontWeight: 500 }}>选择要显示的字段</div>
      <Checkbox.Group
        value={visibleColumns}
        onChange={handleColumnVisibilityChange}
        style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
      >
        {allColumnOptions.map(option => (
          <Checkbox key={option.key} value={option.key}>
            {option.label}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );

  // 所有列定义
  const allColumns: any[] = [
    {
      title: '关注',
      dataIndex: 'isFavorite',
      key: 'isFavorite',
      width: 60,
      align: 'center' as const,
      fixed: 'left' as const,
      render: (isFavorite: boolean) => (
        isFavorite ? (
          <StarFilled style={{ color: '#faad14', fontSize: 16 }} />
        ) : (
          <StarOutlined style={{ color: '#d9d9d9', fontSize: 16 }} />
        )
      )
    },
    {
      title: '客户名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      fixed: 'left' as const,
      sorter: (a: Customer, b: Customer) => a.name.localeCompare(b.name),
      render: (text: string, record: Customer) => (
        <a 
          onClick={() => {
            // 从客户ID中提取数字部分 (CUST-0001 -> 1)
            const numericId = record.id.replace('CUST-', '').replace(/^0+/, '') || '1';
            navigate(`/profiles/service/${numericId}`);
          }}
          style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}
          title={text}
        >
          {text}
        </a>
      )
    },
    {
      title: '健康分',
      dataIndex: 'healthScore',
      key: 'healthScore',
      width: 120,
      align: 'center' as const,
      sorter: (a: Customer, b: Customer) => a.healthScore - b.healthScore,
      render: (score: number, record: Customer) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Progress 
            percent={score} 
            size="small" 
            strokeColor={healthColors[record.healthLevel]}
            showInfo={false}
            style={{ width: 60, marginRight: 8 }}
          />
          <span style={{ color: healthColors[record.healthLevel], fontWeight: 500 }}>{score}</span>
        </div>
      )
    },
    {
      title: '健康等级',
      dataIndex: 'healthLevel',
      key: 'healthLevel',
      width: 100,
      align: 'center' as const,
      filters: [
        { text: '健康', value: '健康' },
        { text: '一般', value: '一般' },
        { text: '风险', value: '风险' }
      ],
      onFilter: (value: string | number | boolean, record: Customer) => record.healthLevel === value,
      render: (level: HealthLevel) => {
        const levelConfig = {
          '健康': { color: 'green', text: '健康' },
          '一般': { color: 'orange', text: '一般' },
          '风险': { color: 'red', text: '风险' }
        };
        const config = levelConfig[level] || { color: 'default', text: level };
        return <Tag color={config.color}>{config.text}</Tag>;
      }
    },

    {
      title: '建联度',
      dataIndex: 'connectionLevel',
      key: 'connectionLevel',
      width: 100,
      align: 'center' as const,
      sorter: (a: Customer, b: Customer) => {
        const levelA = a.connectionLevel || 0;
        const levelB = b.connectionLevel || 0;
        return levelA - levelB;
      },
      render: (level: number) => {
        const getSignalConfig = (level: number) => {
          if (level >= 5) {
            return { bars: 5, color: '#52c41a', text: '极强', tooltip: '建联度极强：与客户核心决策层建立深度信任关系，沟通无障碍' };
          } else if (level >= 4) {
            return { bars: 4, color: '#73d13d', text: '强', tooltip: '建联度强：与客户关键决策人保持密切联系，沟通顺畅' };
          } else if (level >= 3) {
            return { bars: 3, color: '#faad14', text: '中', tooltip: '建联度中：与客户有一定联系，但需要加强沟通深度' };
          } else if (level >= 2) {
            return { bars: 2, color: '#ff7a45', text: '弱', tooltip: '建联度弱：与客户联系较少，需要主动建立更多接触点' };
          } else if (level >= 1) {
            return { bars: 1, color: '#ff4d4f', text: '极弱', tooltip: '建联度极弱：与客户几乎无联系，急需建立有效沟通渠道' };
          } else {
            return { bars: 0, color: '#d9d9d9', text: '未知', tooltip: '建联度未知：缺乏客户联系信息' };
          }
        };
        
        const config = getSignalConfig(level || 0);
        
        return (
          <Tooltip 
            title={
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: 4 }}>建联度：{config.text} ({level || 0}/5)</div>
                <div>{config.tooltip}</div>
              </div>
            } 
            placement="top"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1px', cursor: 'pointer' }}>
              {[1, 2, 3, 4, 5].map(bar => (
                <div
                  key={bar}
                  style={{
                    width: '3px',
                    height: `${6 + bar * 1.5}px`,
                    backgroundColor: bar <= config.bars ? config.color : '#f0f0f0',
                    borderRadius: '1px',
                    transition: 'all 0.2s ease'
                  }}
                />
              ))}
            </div>
          </Tooltip>
        );
      }
    },
    {
      title: 'ARR',
      dataIndex: 'arr',
      key: 'arr',
      width: 120,
      align: 'center' as const,
      sorter: (a: Customer, b: Customer) => a.arr - b.arr,
      render: (arr: number) => `¥${(arr / 10000).toFixed(1)}万`
    },
    {
      title: '最后接触',
      dataIndex: 'lastContactDate',
      key: 'lastContactDate',
      width: 120,
      align: 'center' as const,
      sorter: (a: Customer, b: Customer) => new Date(a.lastContactDate).getTime() - new Date(b.lastContactDate).getTime(),
      render: (date: string) => new Date(date).toLocaleDateString()
    },
    {
      title: '提单到期时间',
      dataIndex: 'ticketExpiryDate',
      key: 'ticketExpiryDate',
      width: 130,
      align: 'center' as const,
      sorter: (a: Customer, b: Customer) => new Date(a.ticketExpiryDate || '').getTime() - new Date(b.ticketExpiryDate || '').getTime(),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
        <div style={{ padding: 8 }}>
          <DatePicker.RangePicker
            value={selectedKeys[0] as any}
            onChange={(dates) => {
              setSelectedKeys(dates ? [dates] : []);
            }}
            style={{ marginBottom: 8, display: 'block' }}
            placeholder={['开始日期', '结束日期']}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              style={{ width: 90 }}
            >
              筛选
            </Button>
            <Button
              onClick={() => {
                clearFilters?.();
                confirm();
              }}
              size="small"
              style={{ width: 90 }}
            >
              重置
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value: any, record: Customer) => {
        if (!value || !Array.isArray(value) || value.length !== 2) return true;
        if (!record.ticketExpiryDate) return false;
        const recordDate = new Date(record.ticketExpiryDate);
        const [startDate, endDate] = value;
        return recordDate >= startDate && recordDate <= endDate;
      },
      render: (date: string) => date ? new Date(date).toLocaleDateString() : '-'
    },
    {
      title: '合同开始时间',
      dataIndex: 'contractStartDate',
      key: 'contractStartDate',
      width: 130,
      align: 'center' as const,
      sorter: (a: Customer, b: Customer) => new Date(a.contractStartDate || '').getTime() - new Date(b.contractStartDate || '').getTime(),
      render: (date: string) => date ? new Date(date).toLocaleDateString() : '-'
    },
    {
      title: '合同结束时间',
      dataIndex: 'contractEndDate',
      key: 'contractEndDate',
      width: 130,
      align: 'center' as const,
      sorter: (a: Customer, b: Customer) => new Date(a.contractEndDate || '').getTime() - new Date(b.contractEndDate || '').getTime(),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
        <div style={{ padding: 8 }}>
          <DatePicker.RangePicker
            value={selectedKeys[0] as any}
            onChange={(dates) => {
              setSelectedKeys(dates ? [dates] : []);
            }}
            style={{ marginBottom: 8, display: 'block' }}
            placeholder={['开始日期', '结束日期']}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              style={{ width: 90 }}
            >
              筛选
            </Button>
            <Button
              onClick={() => {
                clearFilters?.();
                confirm();
              }}
              size="small"
              style={{ width: 90 }}
            >
              重置
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value: any, record: Customer) => {
        if (!value || !Array.isArray(value) || value.length !== 2) return true;
        if (!record.contractEndDate) return false;
        const recordDate = new Date(record.contractEndDate);
        const [startDate, endDate] = value;
        return recordDate >= startDate && recordDate <= endDate;
      },
      render: (date: string) => date ? new Date(date).toLocaleDateString() : '-'
    },
    {
      title: '客户分层',
      dataIndex: 'customerSegment',
      key: 'customerSegment',
      width: 100,
      align: 'center' as const,
      filters: [
        { text: '战略客户', value: 'strategic' },
        { text: '重点客户', value: 'key' },
        { text: '普通客户', value: 'general' }
      ],
      onFilter: (value: string | number | boolean, record: Customer) => record.customerSegment === value,
      render: (segment: string) => {
        const segmentConfig: Record<string, { color: string; text: string }> = {
          strategic: { color: 'red', text: '战略客户' },
          key: { color: 'blue', text: '重点客户' },
          general: { color: 'green', text: '普通客户' }
        };
        const config = segmentConfig[segment] || { color: '#d9d9d9', text: '未分层' };
        return <Tag color={config.color}>{config.text}</Tag>;
      }
    },
    {
      title: '续费风险',
      dataIndex: 'isRenewalRisk',
      key: 'isRenewalRisk',
      width: 100,
      align: 'center' as const,
      sorter: (a: Customer, b: Customer) => Number(a.isRenewalRisk) - Number(b.isRenewalRisk),
      render: (isRisk: boolean) => (
        <Badge 
          status={isRisk ? 'error' : 'success'} 
          text={isRisk ? '是' : '否'} 
        />
      )
    },
    {
      title: '合同金额',
      dataIndex: 'currentContract',
      key: 'contractAmount',
      width: 120,
      align: 'center' as const,
      sorter: (a: Customer, b: Customer) => {
        const amountA = a.currentContract?.amount || 0;
        const amountB = b.currentContract?.amount || 0;
        return amountA - amountB;
      },
      render: (contract: any) => (
        <span style={{ fontWeight: 500, color: '#1890ff' }}>
          {contract?.amount ? `¥${(contract.amount / 10000).toFixed(1)}万` : '-'}
        </span>
      )
    },
    // 第二个建联度字段已删除，避免重复
    // {
    //   title: '建联度',
    //   dataIndex: 'connectionLevel',
    //   key: 'connectionLevel',
    //   width: 100,
    //   align: 'center' as const,
    //   sorter: (a: Customer, b: Customer) => {
    //     const levelA = a.connectionLevel || 0;
    //     const levelB = b.connectionLevel || 0;
    //     return levelA - levelB;
    //   },
    //   render: (level: number) => {
    //     const getSignalConfig = (level: number) => {
    //       if (level >= 5) {
    //         return { bars: 5, color: '#52c41a', text: '极强', tooltip: '建联度极强：与客户核心决策层建立深度信任关系，沟通无障碍' };
    //       } else if (level >= 4) {
    //         return { bars: 4, color: '#73d13d', text: '强', tooltip: '建联度强：与客户关键决策人保持密切联系，沟通顺畅' };
    //       } else if (level >= 3) {
    //         return { bars: 3, color: '#faad14', text: '中', tooltip: '建联度中：与客户有一定联系，但需要加强沟通深度' };
    //       } else if (level >= 2) {
    //         return { bars: 2, color: '#ff7a45', text: '弱', tooltip: '建联度弱：与客户联系较少，需要主动建立更多接触点' };
    //       } else if (level >= 1) {
    //         return { bars: 1, color: '#ff4d4f', text: '极弱', tooltip: '建联度极弱：与客户几乎无联系，急需建立有效沟通渠道' };
    //       } else {
    //         return { bars: 0, color: '#d9d9d9', text: '未知', tooltip: '建联度未知：缺乏客户联系信息' };
    //       }
    //     };
    //     
    //     const config = getSignalConfig(level || 0);
    //     
    //     return (
    //       <Tooltip 
    //         title={
    //           <div>
    //             <div style={{ fontWeight: 'bold', marginBottom: 4 }}>建联度：{config.text} ({level || 0}/5)</div>
    //             <div>{config.tooltip}</div>
    //           </div>
    //         } 
    //         placement="top"
    //       >
    //         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1px', cursor: 'pointer' }}>
    //           {[1, 2, 3, 4, 5].map(bar => (
    //             <div
    //               key={bar}
    //               style={{
    //                 width: '3px',
    //                 height: `${6 + bar * 1.5}px`,
    //                 backgroundColor: bar <= config.bars ? config.color : '#f0f0f0',
    //                 borderRadius: '1px',
    //                 transition: 'all 0.2s ease'
    //               }}
    //             />
    //           ))}
    //         </div>
    //       </Tooltip>
    //     );
    //   }
    // },
    // 待办任务字段已隐藏，代码保留
    // {
    //   title: '待办任务',
    //   dataIndex: 'todoTasks',
    //   key: 'todoTasks',
    //   width: 150,
    //   sorter: (a: Customer, b: Customer) => {
    //     const pendingA = a.todoTasks.filter(t => t.status === 'pending' || t.status === 'in_progress' || t.status === 'overdue').length;
    //     const pendingB = b.todoTasks.filter(t => t.status === 'pending' || t.status === 'in_progress' || t.status === 'overdue').length;
    //     return pendingA - pendingB;
    //   },
    //   render: (todoTasks: any[], record: Customer) => {
    //     const pendingTasks = todoTasks.filter(t => t.status === 'pending' || t.status === 'in_progress' || t.status === 'overdue');
    //     const overdueTasks = todoTasks.filter(t => t.status === 'overdue');
    //     const nearestTask = pendingTasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0];
    //     
    //     if (pendingTasks.length === 0) {
    //       return <span style={{ color: '#8c8c8c' }}>无待办</span>;
    //     }
    //     
    //     return (
    //       <div>
    //         <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
    //           <Badge 
    //             count={pendingTasks.length} 
    //             size="small" 
    //             style={{ backgroundColor: overdueTasks.length > 0 ? '#ff4d4f' : '#1890ff' }}
    //           />
    //           <span style={{ marginLeft: 8, fontSize: '12px', color: '#666' }}>个任务</span>
    //         </div>
    //         {nearestTask && (
    //           <div style={{ fontSize: '11px', color: overdueTasks.length > 0 ? '#ff4d4f' : '#8c8c8c' }}>
    //             最近: {new Date(nearestTask.dueDate).toLocaleDateString()}
    //           </div>
    //         )}
    //       </div>
    //     );
    //   }
    // }
  ];

  // 根据可见列过滤列定义
  const columns = allColumns.filter(column => visibleColumns.includes(column.key as string));
  
  return (
    <div style={{ padding: 0 }}>
      {/* 顶部一行：核心指标卡片 - 3个一行的布局 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={8}>
          <Card style={{ ...cardStyle, marginBottom: 0 }}>
            <Statistic 
              title={
                <span>
                  总客户数
                  <Tooltip 
                    title={
                      <div style={{ maxWidth: '300px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>总客户数</div>
                        <div style={{ marginBottom: '6px' }}>含义：当前负责的所有客户总数</div>
                        <div style={{ marginBottom: '6px' }}>来源：客户管理系统实时统计</div>
                        <div style={{ marginBottom: '6px' }}>计算方式：状态为"服务中"的客户数量</div>
                        <div style={{ color: '#1890ff' }}>提示：反映客户成功经理的工作负荷</div>
                      </div>
                    }
                    placement="top"
                    overlayStyle={{ 
                      maxWidth: '320px',
                      fontSize: '12px'
                    }}
                  >
                    <QuestionCircleOutlined 
                      style={{ 
                        marginLeft: '8px', 
                        color: '#8c8c8c',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }} 
                    />
                  </Tooltip>
                </span>
              } 
              value={mockServiceOverview.totalCustomers} 
              valueStyle={{ fontWeight: 700 }} 
              suffix={
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
                  <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 12, marginRight: 4 }} />
                  <Text style={{ color: '#52c41a', fontSize: 12 }}>+12</Text>
                </div>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card style={{ ...cardStyle, marginBottom: 0 }}>
            <Statistic 
              title={
                <span>
                  平均健康分
                  <Tooltip 
                    title={
                      <div style={{ maxWidth: '300px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>平均健康分</div>
                        <div style={{ marginBottom: '6px' }}>含义：所有客户健康分的平均值</div>
                        <div style={{ marginBottom: '6px' }}>来源：客户健康度评估系统</div>
                        <div style={{ marginBottom: '6px' }}>计算方式：所有客户健康分总和除以客户数量</div>
                        <div style={{ color: '#52c41a' }}>提示：反映整体客户健康状况</div>
                      </div>
                    }
                    placement="top"
                    overlayStyle={{ 
                      maxWidth: '320px',
                      fontSize: '12px'
                    }}
                  >
                    <QuestionCircleOutlined 
                      style={{ 
                        marginLeft: '8px', 
                        color: '#8c8c8c',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }} 
                    />
                  </Tooltip>
                </span>
              } 
              value={mockServiceOverview.avgHealthScore} 
              valueStyle={{ fontWeight: 700 }} 
              suffix={
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
                  <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 12, marginRight: 4 }} />
                  <Text style={{ color: '#52c41a', fontSize: 12 }}>+3.2</Text>
                </div>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card style={{ ...cardStyle, marginBottom: 0 }}>
            <Statistic 
              title={
                <span>
                  风险客户数
                  <Tooltip 
                    title={
                      <div style={{ maxWidth: '300px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>风险客户数</div>
                        <div style={{ marginBottom: '6px' }}>含义：存在续费风险的客户数量</div>
                        <div style={{ marginBottom: '6px' }}>来源：风险评估系统自动识别</div>
                        <div style={{ marginBottom: '6px' }}>计算方式：健康等级为"风险"的客户数量</div>
                        <div style={{ color: '#ff4d4f' }}>提示：需要重点关注和干预</div>
                      </div>
                    }
                    placement="top"
                    overlayStyle={{ 
                      maxWidth: '320px',
                      fontSize: '12px'
                    }}
                  >
                    <QuestionCircleOutlined 
                      style={{ 
                        marginLeft: '8px', 
                        color: '#8c8c8c',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }} 
                    />
                  </Tooltip>
                </span>
              } 
              value={mockServiceOverview.riskCustomers} 
              valueStyle={{ fontWeight: 700 }} 
              suffix={
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
                  <ArrowDownOutlined style={{ color: '#faad14', fontSize: 12, marginRight: 4 }} />
                  <Text style={{ color: '#faad14', fontSize: 12 }}>-2</Text>
                </div>
              }
            />
          </Card>
        </Col>
      </Row>

      {/* 洞察分析区域 - 左侧页签 + 右侧健康度分布 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        {/* 左侧：异动情况页签 */}
        <Col xs={24} lg={16}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <AlertOutlined style={{ marginRight: 8, color: '#fa8c16', fontSize: '16px' }} />
                <Text strong style={{ fontSize: '16px', color: '#262626' }}>异动情况</Text>
              </div>
            }
            style={{ ...cardStyle, marginBottom: 0, height: '230px', display: 'flex', flexDirection: 'column' }}
            bodyStyle={{
              padding: '16px',
              flex: 1,
              overflow: 'auto'
            }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              {Array.from({ length: Math.ceil(filteredMovements.length / 2) }, (_, rowIndex) => (
                <div key={rowIndex} style={{
                  display: 'flex',
                  gap: '8px',
                  width: '100%',
                  minHeight: '44px'
                }}>
                  {filteredMovements.slice(rowIndex * 2, rowIndex * 2 + 2).map(e => {
                    const levelConfig = {
                      high: { color: '#ff4d4f', text: '高' },
                      medium: { color: '#fa8c16', text: '中' },
                      low: { color: '#52c41a', text: '低' }
                    };
                    const config = levelConfig[e.level as keyof typeof levelConfig];
                    
                    return (
                      <div key={e.id} style={{ 
                        padding: '10px 12px',
                        border: `1px solid #f0f0f0`,
                        borderRadius: '6px',
                        background: '#fafafa',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        minHeight: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        flex: '0 0 calc(50% - 4px)',
                        maxWidth: 'calc(50% - 4px)',
                        overflow: 'hidden',
                        boxSizing: 'border-box'
                      }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', minWidth: 0 }}>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                          <Tag color={config.color} style={{ margin: 0, fontSize: '12px', flexShrink: 0 }}>
                            {config.text}
                          </Tag>
                          <Text style={{ 
                            fontSize: '12px', 
                            color: '#666', 
                            lineHeight: '18px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            flex: 1
                          }}>{e.detail}</Text>
                        </div>
                        <Text style={{ fontSize: '12px', color: '#999', whiteSpace: 'nowrap', flexShrink: 0 }}>{e.date}</Text>
                      </div>
                    </div>
                  );
                })}
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* 右侧：健康度分布图 */}
        <Col xs={24} lg={8}>
          <Card style={{ ...cardStyle, marginBottom: 0, height: '230px', display: 'flex', flexDirection: 'column' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: 16, fontWeight: 500, color: 'rgba(0, 0, 0, 0.85)' }}>
                    健康度分布
                  </span>
                  <Tooltip 
                    title={
                      <div style={{ maxWidth: '300px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>健康度分布</div>
                        <div style={{ marginBottom: '6px' }}>含义：客户健康等级的分布情况</div>
                        <div style={{ marginBottom: '6px' }}>来源：客户健康度评估系统</div>
                        <div style={{ marginBottom: '6px' }}>计算方式：按健康等级统计客户数量</div>
                        <div style={{ color: '#1890ff' }}>提示：帮助了解整体客户健康状况</div>
                      </div>
                    }
                    placement="top"
                    overlayStyle={{ 
                      maxWidth: '320px',
                      fontSize: '12px'
                    }}
                  >
                    <QuestionCircleOutlined 
                      style={{ 
                        marginLeft: '8px', 
                        color: '#8c8c8c',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }} 
                    />
                  </Tooltip>
                </div>
                <Select
                  value={comparisonPeriod}
                  onChange={setComparisonPeriod}
                  size="small"
                  style={{ width: 100 }}
                >
                  <Option value="上周">对比上周</Option>
                  <Option value="上月">对比上月</Option>
                  <Option value="上季度">对比上季度</Option>
                </Select>
              </div>
              
              {/* 饼图和图例 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                {/* 饼图 */}
                <div style={{ 
                  position: 'relative', 
                  width: 120, 
                  height: 120, 
                  borderRadius: '50%', 
                  background: `conic-gradient(${healthDistributionData.map((d, idx, arr) => {
                     const total = arr.reduce((s, i) => s + i.value, 0) || 1;
                     const start = arr.slice(0, idx).reduce((s, i) => s + i.value, 0) / total * 360;
                     const end = (start + d.value / total * 360);
                     return `${healthColors[d.name as keyof typeof healthColors]} ${start}deg ${end}deg`;
                   }).join(', ')})`,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* 中心白色圆圈显示总数 */}
                  <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}>
                    <Text style={{ fontSize: '18px', fontWeight: '700', color: '#262626', lineHeight: 1 }}>
                      {healthDistributionData.reduce((sum, d) => sum + d.value, 0)}
                    </Text>
                    <Text style={{ fontSize: '11px', color: '#8c8c8c', lineHeight: 1 }}>客户数</Text>
                  </div>
                </div>
                
                {/* 图例 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginLeft: 16 }}>
                  {healthDistributionData.map((d) => {
                    const total = healthDistributionData.reduce((sum, item) => sum + item.value, 0);
                    const percentage = total > 0 ? ((d.value / total) * 100).toFixed(0) : '0';
                    
                    return (
                      <div 
                        key={d.name} 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          gap: 8,
                          cursor: 'pointer'
                        }}
                        onClick={() => handleHealthDrillDown(d.name)}
                      >
                        <div style={{ 
                          width: 12, 
                          height: 12, 
                          borderRadius: '50%', 
                          background: healthColors[d.name as keyof typeof healthColors],
                          flexShrink: 0
                        }} />
                        <Text style={{ fontSize: 12, color: '#666', minWidth: '40px' }}>{d.name}</Text>
                        <Text style={{ fontSize: 12, fontWeight: 600, color: '#262626', minWidth: '35px' }}>{percentage}.00 %</Text>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </Card>
        </Col>
      </Row>

      {/* 智能跟进提醒模块 */}
      <Row gutter={24} style={{ marginBottom: 16 }}>
        <Col span={24}>
          <Card style={{ ...cardStyle, marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <BellOutlined style={{ color: '#1890ff', marginRight: 8, fontSize: 16 }} />
                <span style={{ fontSize: 16, fontWeight: 500, color: 'rgba(0, 0, 0, 0.85)' }}>
                  智能跟进提醒
                </span>
                <Tooltip 
                  title={
                    <div style={{ maxWidth: '300px' }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>智能跟进提醒</div>
                      <div style={{ marginBottom: '6px' }}>含义：基于客户行为和健康度变化的智能提醒</div>
                      <div style={{ marginBottom: '6px' }}>来源：客户行为分析和健康度监控系统</div>
                      <div style={{ marginBottom: '6px' }}>计算方式：AI算法分析客户数据生成个性化提醒</div>
                      <div style={{ color: '#1890ff' }}>提示：帮助及时发现客户问题并采取行动</div>
                    </div>
                  }
                  placement="top"
                  overlayStyle={{ 
                    maxWidth: '320px',
                    fontSize: '12px'
                  }}
                >
                  <QuestionCircleOutlined 
                    style={{ 
                      marginLeft: '8px', 
                      color: '#8c8c8c',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }} 
                  />
                </Tooltip>
              </div>
              <Button size="small" type="link" onClick={handleViewAllClick}>
                查看全部
              </Button>
            </div>
            
            <Row gutter={16}>
              {/* 高优先级提醒 */}
              <Col xs={24} sm={8}>
                <div 
                  style={{ 
                    padding: '12px 16px', 
                    borderRadius: 8, 
                    border: '1px solid #ffccc7',
                    backgroundColor: '#fff2f0',
                    marginBottom: 12,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => handleFollowUpCardClick('high')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 77, 79, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                    <AlertOutlined style={{ color: '#ff4d4f', marginRight: 6, fontSize: 14 }} />
                    <Text strong style={{ color: '#ff4d4f', fontSize: 13 }}>高优先级</Text>
                    <Badge count={3} size="small" style={{ marginLeft: 8 }} />
                  </div>
                  <div style={{ fontSize: 12, color: '#666', lineHeight: '18px' }}>
                    深圳创新科技健康分下降至35分，建议立即联系
                  </div>
                  <div style={{ fontSize: 11, color: '#999', marginTop: 4 }}>
                    2小时前
                  </div>
                </div>
              </Col>
              
              {/* 中优先级提醒 */}
              <Col xs={24} sm={8}>
                <div 
                  style={{ 
                    padding: '12px 16px', 
                    borderRadius: 8, 
                    border: '1px solid #ffe7ba',
                    backgroundColor: '#fffbe6',
                    marginBottom: 12,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => handleFollowUpCardClick('medium')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(250, 140, 22, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                    <ClockCircleOutlined style={{ color: '#fa8c16', marginRight: 6, fontSize: 14 }} />
                    <Text strong style={{ color: '#fa8c16', fontSize: 13 }}>中优先级</Text>
                    <Badge count={5} size="small" style={{ marginLeft: 8 }} />
                  </div>
                  <div style={{ fontSize: 12, color: '#666', lineHeight: '18px' }}>
                    上海智能科技7天未登录，建议主动联系
                  </div>
                  <div style={{ fontSize: 11, color: '#999', marginTop: 4 }}>
                    1天前
                  </div>
                </div>
              </Col>
              
              {/* 低优先级提醒 */}
              <Col xs={24} sm={8}>
                <div 
                  style={{ 
                    padding: '12px 16px', 
                    borderRadius: 8, 
                    border: '1px solid #b7eb8f',
                    backgroundColor: '#f6ffed',
                    marginBottom: 12,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => handleFollowUpCardClick('low')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(82, 196, 26, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 6, fontSize: 14 }} />
                    <Text strong style={{ color: '#52c41a', fontSize: 13 }}>低优先级</Text>
                    <Badge count={2} size="small" style={{ marginLeft: 8 }} />
                  </div>
                  <div style={{ fontSize: 12, color: '#666', lineHeight: '18px' }}>
                    北京科技创新有限公司续约即将到期，可准备续约材料
                  </div>
                  <div style={{ fontSize: 11, color: '#999', marginTop: 4 }}>
                    3天前
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* 客户列表 - 采用交接实施页面的现代化风格 */}
      <div style={{ 
        ...cardStyle,
        padding: '24px'
      }}>
        {/* 搜索区域 */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <Input
            placeholder="搜索客户名称"
            prefix={<SearchOutlined />}
            value={customerFilter.name || ''}
            onChange={e => setCustomerFilter(prev => ({ ...prev, name: e.target.value }))}
            allowClear
            style={{ width: 300, borderRadius: '6px' }}
          />
          
          <Space>
            <Popover
              content={<ColumnManagementPopover />}
              title="字段管理"
              trigger="click"
              placement="bottomRight"
            >
              <Button icon={<ControlOutlined />}>
                字段管理
              </Button>
            </Popover>
            <Button
              icon={<ReloadOutlined />}
              onClick={() => {
                setCustomerFilter({});
                setCurrentPage(1);
              }}
            >
              重置
            </Button>
            <Button 
              type={customerFilter.isFavorite ? "primary" : "default"}
              icon={<StarOutlined />}
              onClick={() => {
                if (customerFilter.isFavorite) {
                  // 如果已经在筛选关注客户，则取消筛选
                  setCustomerFilter(prev => ({ ...prev, isFavorite: undefined }));
                  message.success('已显示全部客户');
                } else {
                  // 筛选关注的客户
                  setCustomerFilter(prev => ({ ...prev, isFavorite: true }));
                  message.success('已筛选我的关注客户');
                }
              }}
            >
              {customerFilter.isFavorite ? '显示全部' : '我的关注'}
            </Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredCustomers}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: filteredCustomers.length,
            onChange: (page, size) => {
              setCurrentPage(page);
              if (size !== pageSize) {
                setPageSize(size);
                setCurrentPage(1); // 重置到第一页
              }
            },
            onShowSizeChange: (current, size) => {
              setPageSize(size);
              setCurrentPage(1); // 重置到第一页
            },
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50', '100'],
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
          }}
          size="middle"
          scroll={{ x: 1500 }}
          style={{ background: '#fff' }}
        />
        
        {/* 智能跟进提醒弹窗 */}
        <Modal
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <BellOutlined style={{ color: '#1890ff', marginRight: 8 }} />
              智能跟进提醒详情
              {selectedPriority !== 'all' && (
                <Tag 
                  color={getPriorityTag(selectedPriority).color} 
                  style={{ marginLeft: 8 }}
                >
                  {getPriorityTag(selectedPriority).text}
                </Tag>
              )}
            </div>
          }
          open={followUpModalVisible}
          onCancel={() => setFollowUpModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setFollowUpModalVisible(false)}>
              关闭
            </Button>
          ]}
          width={800}
          bodyStyle={{ maxHeight: '60vh', overflowY: 'auto' }}
        >
          <div style={{ padding: '16px 0' }}>
            {getCurrentReminders().map((reminder, index) => {
              const priorityConfig = reminder.id <= 3 ? 'high' : reminder.id <= 8 ? 'medium' : 'low';
              const priorityTag = getPriorityTag(priorityConfig);
              
              return (
                <div 
                  key={reminder.id} 
                  style={{
                    padding: '16px',
                    marginBottom: '12px',
                    border: '1px solid #f0f0f0',
                    borderRadius: '8px',
                    backgroundColor: '#fafafa',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                    e.currentTarget.style.borderColor = '#d9d9d9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#fafafa';
                    e.currentTarget.style.borderColor = '#f0f0f0';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Tag color={priorityTag.color} style={{ marginRight: '8px' }}>
                        {priorityTag.text}
                      </Tag>
                      <Tag color="blue">{getTypeTag(reminder.type)}</Tag>
                    </div>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {reminder.time}
                    </Text>
                  </div>
                  
                  <div style={{ marginBottom: '8px' }}>
                    <Text strong style={{ fontSize: '14px', color: '#262626' }}>
                      {reminder.customer}
                    </Text>
                  </div>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <Text style={{ fontSize: '13px', color: '#595959', lineHeight: '1.5' }}>
                      {reminder.content}
                    </Text>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button size="small" type="primary" icon={<PhoneOutlined />}>
                      立即联系
                    </Button>
                    <Button size="small" icon={<MailOutlined />}>
                      发送邮件
                    </Button>
                    <Button 
                      size="small" 
                      icon={<EyeOutlined />}
                      onClick={() => {
                        // 根据客户名称找到对应的客户ID
                        const customer = mockCustomers.find(c => c.name === reminder.customer);
                        if (customer) {
                          // 从客户ID中提取数字部分 (CUST-0001 -> 1)
                          const numericId = customer.id.replace('CUST-', '').replace(/^0+/, '') || '1';
                          navigate(`/profiles/service/${numericId}`);
                        } else {
                          message.warning('未找到对应的客户信息');
                        }
                      }}
                    >
                      查看详情
                    </Button>
                  </div>
                </div>
              );
            })}
            
            {getCurrentReminders().length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                <BellOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
                <div>暂无提醒信息</div>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

// 关键动作页签组件
const KeyActionsTab: React.FC = () => {
  const navigate = useNavigate();
  const [createValueBoardVisible, setCreateValueBoardVisible] = useState(false);
  const [createQBRVisible, setCreateQBRVisible] = useState(false);
  const [templateLibraryVisible, setTemplateLibraryVisible] = useState(false);
  const [form] = Form.useForm();

  const handleCreateValueBoard = () => {
    setCreateValueBoardVisible(true);
  };

  const handleOpenTemplateLibrary = () => {
    setTemplateLibraryVisible(true);
  };

  const handleTemplateSelect = (template: any) => {
    console.log('选择模板:', template);
    setTemplateLibraryVisible(false);
    // 使用模板数据预填充创建表单
    form.setFieldsValue({
      title: template.name,
      description: template.description
    });
    setCreateValueBoardVisible(true);
    message.success(`已选择模板：${template.name}`);
  };

  const handleCreateQBR = () => {
    setCreateQBRVisible(true);
  };

  const handleValueBoardSubmit = (values: any) => {
    console.log('创建价值看板:', values);
    message.success('价值看板创建成功！');
    setCreateValueBoardVisible(false);
    form.resetFields();
  };

  const handleQBRSubmit = (values: any) => {
    console.log('创建QBR会议:', values);
    message.success('QBR会议创建成功！');
    setCreateQBRVisible(false);
    form.resetFields();
  };

  const handleRiskEventAction = (eventId: string) => {
    navigate(`/profiles/service/risk-event/${eventId}`);
  };

  const actionBlocks = [
    {
      id: 'A1',
      title: '价值实现与效果报告',
      icon: <BarChartOutlined style={{ fontSize: 24, color: '#1890ff' }} />,
      color: '#1890ff',
      content: (
        <div>
          <div style={{ marginBottom: 16 }}>
            <Space>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={handleCreateValueBoard}
                size="large"
              >
                创建价值看板
              </Button>
              <Button 
                icon={<FileTextOutlined />}
                onClick={handleOpenTemplateLibrary}
                size="large"
              >
                模板库
              </Button>
            </Space>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {mockValueBoards.map(board => (
              <Card key={board.id} size="small" style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong>{board.title}</Text>
                    <div style={{ color: '#666', fontSize: 12, marginTop: 4 }}>
                      客户: {board.customerName}
                    </div>
                  </div>
                  <Tag color={board.status === '进行中' ? 'processing' : 'default'}>
                    {board.status}
                  </Tag>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'A2',
      title: '业务复盘会 (QBR)',
      icon: <TeamOutlined style={{ fontSize: 24, color: '#52c41a' }} />,
      color: '#52c41a',
      content: (
        <div>
          <div style={{ marginBottom: 16 }}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={handleCreateQBR}
              size="large"
            >
              创建QBR会议
            </Button>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {mockQBRMeetings.map(meeting => (
              <Card key={meeting.id} size="small" style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong>{meeting.title}</Text>
                    <div style={{ color: '#666', fontSize: 12, marginTop: 4 }}>
                      {meeting.customerName} • {new Date(meeting.scheduledDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Tag color={meeting.status === '待召开' ? 'orange' : 'green'}>
                      {meeting.status}
                    </Tag>
                    <Button size="small" type="link">查看详情</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'A4',
      title: '风险事件处理队列',
      icon: <ExclamationCircleOutlined style={{ fontSize: 24, color: '#f5222d' }} />,
      color: '#f5222d',
      content: (
        <div>
          <div style={{ display: 'grid', gap: 12 }}>
            {mockRiskEvents.filter(event => event.status !== '已解决').map(event => (
              <Card key={event.id} size="small">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <Text strong>{event.customerName}</Text>
                      <Tag color={
                        event.severity === 'critical' ? 'red' :
                        event.severity === 'high' ? 'orange' :
                        event.severity === 'medium' ? 'gold' : 'green'
                      }>
                        {event.severity === 'critical' ? '紧急' :
                         event.severity === 'high' ? '高' :
                         event.severity === 'medium' ? '中' : '低'}
                      </Tag>
                    </div>
                    <div style={{ color: '#666', fontSize: 12 }}>
                      {event.description}
                    </div>
                    <div style={{ color: '#999', fontSize: 11, marginTop: 4 }}>
                      负责人: {event.assignedTo} • 截止: {new Date(event.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                  <Button 
                    type="primary" 
                    size="small"
                    onClick={() => handleRiskEventAction(event.id)}
                  >
                    处理
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <div style={{ padding: 0 }}>
      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
        {actionBlocks.map(block => (
          <Card
            key={block.id}
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {block.icon}
                <span>{block.title}</span>
              </div>
            }
            style={{ 
              borderLeft: `4px solid ${block.color}`,
              height: 'fit-content'
            }}
          >
            {block.content}
          </Card>
        ))}
      </div>

      {/* 创建价值看板模态框 */}
      <Modal
        title="创建价值看板"
        open={createValueBoardVisible}
        onCancel={() => setCreateValueBoardVisible(false)}
        onOk={() => form.submit()}
        width={600}
      >
        <Form form={form} onFinish={handleValueBoardSubmit} layout="vertical">
          <Form.Item name="customerId" label="选择客户" rules={[{ required: true }]}>
            <Select placeholder="请选择客户">
              {mockCustomers.map(customer => (
                <Option key={customer.id} value={customer.id}>{customer.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="title" label="看板标题" rules={[{ required: true }]}>
            <Input placeholder="请输入看板标题" />
          </Form.Item>
          <Form.Item name="description" label="看板描述">
            <Input.TextArea rows={3} placeholder="请输入看板描述" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 创建QBR会议模态框 */}
      <Modal
        title="创建QBR会议"
        open={createQBRVisible}
        onCancel={() => setCreateQBRVisible(false)}
        onOk={() => form.submit()}
        width={600}
      >
        <Form form={form} onFinish={handleQBRSubmit} layout="vertical">
          <Form.Item name="customerId" label="选择客户" rules={[{ required: true }]}>
            <Select placeholder="请选择客户">
              {mockCustomers.map(customer => (
                <Option key={customer.id} value={customer.id}>{customer.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="title" label="会议主题" rules={[{ required: true }]}>
            <Input placeholder="请输入会议主题" />
          </Form.Item>
          <Form.Item name="scheduledDate" label="会议时间" rules={[{ required: true }]}>
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="attendees" label="参会人员">
            <Select mode="tags" placeholder="请输入参会人员">
              <Option value="张总">张总</Option>
              <Option value="李经理">李经理</Option>
              <Option value="王主管">王主管</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* 价值看板模板库模态框 */}
      <Modal
        title="价值看板模板库"
        open={templateLibraryVisible}
        onCancel={() => setTemplateLibraryVisible(false)}
        footer={null}
        width="90%"
        style={{ top: 20, maxWidth: 1000 }}
        bodyStyle={{ overflow: 'hidden', padding: '16px' }}
      >
        <ValueBoardTemplateLibrary
          onTemplateSelect={handleTemplateSelect}
          onCancel={() => setTemplateLibraryVisible(false)}
        />
      </Modal>
    </div>
  );
};

// 服务剧本页签组件
const PlaybooksTab: React.FC = () => {
  const [selectedPlaybook, setSelectedPlaybook] = useState<ServicePlaybook | null>(null);
  const [launcherVisible, setLauncherVisible] = useState(false);
  const [taskManagerVisible, setTaskManagerVisible] = useState(false);
  const [triggerEngineVisible, setTriggerEngineVisible] = useState(false);
  const [executions, setExecutions] = useState<PlaybookExecution[]>([]);
  const [recommendations, setRecommendations] = useState<PlaybookRecommendation[]>([]);
  const [playbooks, setPlaybooks] = useState<ServicePlaybook[]>(mockServicePlaybooks);

  const handleLaunchPlaybook = async (playbookId: string, customerId: string) => {
    try {
      // 模拟启动剧本
      const newExecution: PlaybookExecution = {
        id: `exec_${Date.now()}`,
        playbookId,
        playbookName: playbooks.find(p => p.id === playbookId)?.name || '未知剧本',
        customerId,
        customerName: mockCustomers.find(c => c.id === customerId)?.name || '未知客户',
        status: 'pending',
        progress: 0,
        launchedBy: '当前用户',
        launchType: 'manual',
        startedAt: new Date().toISOString(),
        expectedEndAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        taskExecutions: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setExecutions(prev => [...prev, newExecution]);
      message.success('剧本启动成功');
    } catch (error) {
      message.error('启动剧本失败');
    }
  };

  const handlePlaybookSelect = (playbook: ServicePlaybook) => {
    setSelectedPlaybook(playbook);
    setLauncherVisible(true);
  };

  const handleAddPlaybook = async (newPlaybook: Omit<ServicePlaybook, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      // 创建新剧本
      const playbook: ServicePlaybook = {
        ...newPlaybook,
        id: `playbook_${Date.now()}`,
        usage: 0,
        successRate: 0,
        createdBy: '当前用户',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastExecutedAt: undefined,
        successMetrics: [],
        resources: []
      };
      
      setPlaybooks(prev => [...prev, playbook]);
      message.success('服务剧本创建成功！');
    } catch (error) {
      message.error('创建剧本失败');
    }
  };

  const handleUpdateRecommendation = async (id: string, updates: Partial<PlaybookRecommendation>) => {
    setRecommendations(prev => 
      prev.map(rec => rec.id === id ? { ...rec, ...updates } : rec)
    );
  };

  return (
    <div style={{ padding: 0 }}>
      {/* 剧本库组件 */}
      <PlaybookLibrary
        playbooks={playbooks}
        onLaunchPlaybook={(playbookId) => {
          const playbook = playbooks.find(p => p.id === playbookId);
          if (playbook) {
            handlePlaybookSelect(playbook);
          }
        }}
        onAddPlaybook={handleAddPlaybook}
        loading={false}
      />

      {/* 剧本启动器 */}
      {selectedPlaybook && (
        <PlaybookLauncher
          visible={launcherVisible}
          playbook={selectedPlaybook}
          onCancel={() => {
            setLauncherVisible(false);
            setSelectedPlaybook(null);
          }}
          onLaunch={async (execution) => {
            if (execution.playbookId) {
              await handleLaunchPlaybook(execution.playbookId, execution.customerId || '');
              setLauncherVisible(false);
              setSelectedPlaybook(null);
            }
          }}
        />
      )}

      {/* 任务管理器 */}
      <Modal
        title="任务管理"
        open={taskManagerVisible}
        onCancel={() => setTaskManagerVisible(false)}
        width={1200}
        footer={null}
      >
        <PlaybookTaskManager
          executions={executions}
          onUpdateTaskStatus={async (executionId, taskId, status, result, notes) => {
            // 更新任务状态的逻辑
            message.success('任务状态已更新');
          }}
          onUpdateCheckpoint={async (executionId, taskId, checkpointId, completed, notes) => {
            // 更新检查点的逻辑
            message.success('检查点已更新');
          }}
          onReassignTask={async (executionId, taskId, newAssignee) => {
            // 重新分配任务的逻辑
            message.success('任务已重新分配');
          }}
        />
      </Modal>

      {/* 触发引擎 */}
      <Modal
        title="智能推荐引擎"
        open={triggerEngineVisible}
        onCancel={() => setTriggerEngineVisible(false)}
        width={1400}
        footer={null}
      >
        <PlaybookTriggerEngine
          customers={mockCustomers}
          playbooks={mockServicePlaybooks}
          recommendations={recommendations}
          onCreateRecommendation={async (recommendation) => {
            const newRec = {
              ...recommendation,
              id: `rec_${Date.now()}`,
              createdAt: new Date().toISOString()
            };
            setRecommendations(prev => [...prev, newRec]);
          }}
          onUpdateRecommendation={handleUpdateRecommendation}
          onDeleteRecommendation={async (id) => {
            setRecommendations(prev => prev.filter(rec => rec.id !== id));
          }}
          onLaunchPlaybook={async (playbookId, customerId, triggeredBy) => {
            await handleLaunchPlaybook(playbookId, customerId);
          }}
        />
      </Modal>

      {/* 管理按钮 */}
      <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'center' }}>
        <Button
          type="default"
          icon={<SettingOutlined />}
          onClick={() => setTaskManagerVisible(true)}
        >
          任务管理 ({executions.length})
        </Button>
        <Button
          type="default"
          icon={<AlertOutlined />}
          onClick={() => setTriggerEngineVisible(true)}
        >
          智能推荐 ({recommendations.length})
        </Button>
      </div>
    </div>
  );
};

// 主组件
const ContinuousService: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');

  // 处理URL参数，设置初始tab
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'actions', 'playbooks'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location.search]);

  const QuickLink: React.FC<{ active: boolean; icon: React.ReactNode; label: string; onClick: () => void }>=({ active, icon, label, onClick })=> (
    <Button
      type="text"
      onClick={onClick}
      style={{
        height: 36,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '0 12px',
        borderRadius: 18,
        background: active ? '#1890ff15' : 'transparent',
        border: active ? '1px solid #1890ff33' : '1px solid transparent',
        color: active ? '#1890ff' : '#595959',
        fontWeight: 500,
      }}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );

  return (
    <div style={{
      padding: '32px 40px',
      background: '#f5f5f5',
      minHeight: 'calc(100vh - 120px)',
      paddingBottom: '60px'
    }}>
      {/* 页面标题 - 采用工作看板的现代化风格 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {activeTab !== 'overview' && (
            <Button type="text" onClick={() => setActiveTab('overview')} style={{ color: '#666' }}>
              ← 返回
            </Button>
          )}
          <div>
            <Title level={2} style={{ margin: 0, color: '#262626', fontWeight: '600' }}>
              {activeTab === 'playbooks' ? '持续服务/服务剧本' : activeTab === 'actions' ? '持续服务/关键动作' : '持续服务'}
            </Title>
            <Text type="secondary" style={{ fontSize: '14px', color: '#666' }}>
              {activeTab === 'playbooks' ? '一个好的剧本远不止是一个任务清单' : activeTab === 'actions' ? '快速启动关键业务动作，提升客户成功效率' : '基于客户成功体系化运营的智能服务平台'}
            </Text>
          </div>
        </div>
        <Space size={12}>
          <Button
            type="text"
            onClick={() => setActiveTab('actions')}
            className={`tab-button ${activeTab === 'actions' ? 'active' : ''}`}
            style={{
              height: 40,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '0 16px',
              borderRadius: 8,
              background: activeTab === 'actions' ? '#1890ff' : '#ffffff',
              border: 'none',
              color: activeTab === 'actions' ? '#ffffff' : '#8c8c8c',
              fontWeight: 500,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'actions') {
                e.currentTarget.style.background = '#1890ff';
                e.currentTarget.style.color = '#ffffff';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'actions') {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.color = '#8c8c8c';
              }
            }}
          >
            <PlayCircleOutlined />
            <span>关键动作</span>
          </Button>
          <Button
            type="text"
            onClick={() => setActiveTab('playbooks')}
            className={`tab-button ${activeTab === 'playbooks' ? 'active' : ''}`}
            style={{
              height: 40,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '0 16px',
              borderRadius: 8,
              background: activeTab === 'playbooks' ? '#1890ff' : '#ffffff',
              border: 'none',
              color: activeTab === 'playbooks' ? '#ffffff' : '#8c8c8c',
              fontWeight: 500,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'playbooks') {
                e.currentTarget.style.background = '#1890ff';
                e.currentTarget.style.color = '#ffffff';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'playbooks') {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.color = '#8c8c8c';
              }
            }}
          >
            <FileTextOutlined />
            <span>服务剧本</span>
          </Button>
        </Space>
      </div>

      {/* 直接渲染模块，无外层白色底容器，宽度与工作看板一致 */}
      {activeTab === 'overview' && <OverviewTab />}
      {activeTab === 'actions' && <KeyActionsTab />}
      {activeTab === 'playbooks' && <PlaybooksTab />}
    </div>
  );
};

export default ContinuousService;
