import React, { useState, useMemo } from 'react';
import { message } from 'antd';
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
  Input
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
  PlayCircleOutlined
} from '@ant-design/icons';
import type { TabsProps } from 'antd';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

// 续约状态类型
type RenewalStatus = '意向明确' | '谈判中' | '已续约' | '流失风险';
type CustomerHealth = '健康' | '一般' | '风险';

// 续约客户数据接口
interface RenewalCustomer {
  key: string;
  customerName: string;
  healthScore: number;
  healthLevel: CustomerHealth;
  contractExpiryDate: string;
  renewalAmount: number;
  daysToExpiry: number;
  status: RenewalStatus;
  riskReason?: string;
  opportunityPoint?: string;
  owner: string;
  lastInteraction: string;
  nextAction: string;
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

// 模拟数据
const mockRenewalCustomers: RenewalCustomer[] = [
  {
    key: '1',
    customerName: '腾讯科技',
    healthScore: 45,
    healthLevel: '风险',
    contractExpiryDate: '2024-03-15',
    renewalAmount: 500000,
    daysToExpiry: 15,
    status: '流失风险',
    riskReason: '活跃度连续下降，关键联系人离职',
    owner: '张伟',
    lastInteraction: '2024-02-20',
    nextAction: '紧急客户拜访'
  },
  {
    key: '2',
    customerName: '阿里巴巴',
    healthScore: 92,
    healthLevel: '健康',
    contractExpiryDate: '2024-04-20',
    renewalAmount: 800000,
    daysToExpiry: 50,
    status: '意向明确',
    opportunityPoint: '用量超限，频繁访问高级功能',
    owner: '王芳',
    lastInteraction: '2024-02-25',
    nextAction: '增购方案设计'
  },
  {
    key: '3',
    customerName: '字节跳动',
    healthScore: 78,
    healthLevel: '一般',
    contractExpiryDate: '2024-03-30',
    renewalAmount: 300000,
    daysToExpiry: 30,
    status: '谈判中',
    owner: '李强',
    lastInteraction: '2024-02-28',
    nextAction: '报价单跟进'
  },
  {
    key: '4',
    customerName: '美团点评',
    healthScore: 88,
    healthLevel: '健康',
    contractExpiryDate: '2024-02-28',
    renewalAmount: 600000,
    daysToExpiry: 8,
    status: '已续约',
    owner: '赵敏',
    lastInteraction: '2024-02-26',
    nextAction: '续约后服务'
  },
  {
    key: '5',
    customerName: '滴滴出行',
    healthScore: 35,
    healthLevel: '风险',
    contractExpiryDate: '2024-03-10',
    renewalAmount: 400000,
    daysToExpiry: 10,
    status: '流失风险',
    riskReason: '高优工单过多，客户满意度低',
    owner: '刘洋',
    lastInteraction: '2024-02-22',
    nextAction: '问题紧急处理'
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

  // 处理客户详情查看
  const handleViewCustomerDetail = (customer: RenewalCustomer) => {
    setSelectedCustomer(customer);
    setCustomerDetailVisible(true);
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
      dataIndex: 'customerName',
      key: 'customerName',
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
              负责人: {record.owner}
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
            color: record.healthLevel === '健康' ? '#52c41a' : 
                   record.healthLevel === '风险' ? '#fa541c' : '#8c8c8c'
          }}>
            {score}
          </div>
          <Tag color={
            record.healthLevel === '健康' ? 'green' : 
            record.healthLevel === '风险' ? 'red' : 'default'
          }>
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
      render: (record: RenewalCustomer) => (
        <div>
          <Tag color={
            record.status === '已续约' ? 'green' :
            record.status === '流失风险' ? 'red' :
            record.status === '谈判中' ? 'orange' : 'blue'
          }>
            {record.status}
          </Tag>
          {record.riskReason && (
            <div style={{ fontSize: '12px', color: '#fa541c', marginTop: 4 }}>
              {record.riskReason}
            </div>
          )}
          {record.opportunityPoint && (
            <div style={{ fontSize: '12px', color: '#52c41a', marginTop: 4 }}>
              {record.opportunityPoint}
            </div>
          )}
        </div>
      ),
    },
    {
      title: '下一步行动',
      dataIndex: 'nextAction',
      key: 'nextAction',
      align: 'center' as const,
      render: (action: string) => (
        <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
          {action}
        </div>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 90,
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
      padding: '24px',
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
          {/* 左侧续约机会列表 */}
          <Col span={16}>
            <Card 
              title="智能续约分群"
              style={{ borderRadius: '8px' }}
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
                  <Button size="small" icon={<RiseOutlined />}>
                    导出报告
                  </Button>
                </Space>
              }
            >
              <Tabs
                activeKey={selectedTab}
                onChange={setSelectedTab}
                items={tabItems}
                style={{ marginTop: '16px' }}
              />
              
              <Table
                columns={getColumns()}
                dataSource={getCurrentTabCustomers()}
                pagination={false}
                size="small"
                style={{ marginTop: '16px' }}
                rowClassName={(record) => 
                  record.daysToExpiry <= 15 ? 'urgent-renewal-row' : ''
                }
              />
            </Card>
          </Col>

          {/* 右侧洞察与行动指南 */}
          <Col span={8}>
            <Space direction="vertical" style={{ width: '100%' }} size={16}>
              
              {/* 近期续约动态 */}
              <Card 
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <ClockCircleOutlined style={{ color: '#1890ff' }} />
                    近期续约动态
                  </div>
                }
                style={{ borderRadius: '8px' }}
              >
                <Timeline
                  items={mockRenewalActivities.map(activity => ({
                    color: activity.color,
                    children: (
                      <div>
                        <div style={{ fontWeight: 500, marginBottom: '4px' }}>
                          {activity.customerName}
                        </div>
                        <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '4px' }}>
                          {activity.timestamp}
                        </div>
                        <div style={{ fontSize: '13px' }}>
                          {activity.activity}
                        </div>
                      </div>
                    ),
                  }))}
                />
              </Card>

              {/* 推荐续约剧本 */}
              <Card 
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <PlayCircleOutlined style={{ color: '#52c41a' }} />
                    推荐续约剧本
                  </div>
                }
                style={{ borderRadius: '8px' }}
              >
                {getRecommendedPlaybooks().map(playbook => (
                  <div key={playbook.id} style={{ marginBottom: '16px' }}>
                    <div style={{ fontWeight: 500, marginBottom: '8px', color: '#262626' }}>
                      {playbook.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '8px' }}>
                      {playbook.description}
                    </div>
                    <div style={{ fontSize: '12px', color: '#595959' }}>
                      {playbook.steps.map((step, index) => (
                        <div key={index} style={{ marginBottom: '4px' }}>
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </Card>

              {/* 续约健康度分析 */}
              <Card 
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <RiseOutlined style={{ color: '#722ed1' }} />
                    续约健康度分析
                  </div>
                }
                style={{ borderRadius: '8px' }}
              >
                <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', color: '#722ed1', marginBottom: '8px' }}>
                      📊
                    </div>
                    <div style={{ fontSize: '14px', color: '#8c8c8c' }}>
                      气泡图展示续约健康度
                    </div>
                    <div style={{ fontSize: '12px', color: '#bfbfbf', marginTop: '8px' }}>
                      X轴: 续约倒计时 | Y轴: 客户健康分 | 气泡大小: 合同金额
                    </div>
                  </div>
                </div>
                
                {/* 关键洞察 */}
                <Alert
                  message="关键洞察"
                  description="发现3个高风险客户：金额大、即将到期、健康分低，建议优先处理"
                  type="warning"
                  showIcon
                  style={{ marginTop: '16px' }}
                />
              </Card>
            </Space>
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
