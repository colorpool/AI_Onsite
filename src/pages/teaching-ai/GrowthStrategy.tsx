import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Button,
  Input,
  Select,
  DatePicker,
  Tag,
  Space,
  Modal,
  Form,
  message,
  Tabs,
  Progress,
  Avatar,
  List,
  Badge,
  Tooltip,
  Steps,
  Timeline,
  Rate,
  Divider,
  Typography,
} from 'antd';
import {
  UserAddOutlined,
  TrophyOutlined,
  RocketOutlined,
  HeartOutlined,
  DollarOutlined,
  TeamOutlined,
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  ExportOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  StarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  RiseOutlined,
  FallOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { Line, Column, Funnel } from '@ant-design/charts';
import type { ColumnsType } from 'antd/es/table';

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Title, Text } = Typography;
const { Step } = Steps;

// 统一卡片样式
const cardStyle = {
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  border: '1px solid #f0f0f0',
  background: '#ffffff',
  marginBottom: '16px',
};



interface SuccessStory {
  id: string;
  customerName: string;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  roi: number;
  timeline: string;
  status: 'draft' | 'published' | 'featured';
  createDate: string;
}

interface GrowthCampaign {
  id: string;
  name: string;
  type: 'upsell' | 'cross_sell' | 'retention' | 'referral';
  target: string;
  startDate: string;
  endDate: string;
  budget: number;
  leads: number;
  conversions: number;
  revenue: number;
  status: 'planning' | 'active' | 'paused' | 'completed';
}

const GrowthStrategy: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [customerModalVisible, setCustomerModalVisible] = useState(false);
  const [storyModalVisible, setStoryModalVisible] = useState(false);
  const [campaignModalVisible, setCampaignModalVisible] = useState(false);

  // 模拟数据
  const growthStats = {
    totalCustomers: 1248,
    activeCustomers: 1089,
    churnRate: 5.2,
    expansionRevenue: 2340000,
    nps: 72,
    csat: 4.6,
  };



  const successStoryData: SuccessStory[] = [
    {
      id: '1',
      customerName: '张总',
      company: '科技创新有限公司',
      industry: '科技',
      challenge: '员工培训效率低下，缺乏系统化管理',
      solution: '部署授客SaaS平台，建立完整的培训体系',
      results: '培训效率提升60%，员工满意度提升40%',
      roi: 320,
      timeline: '3个月',
      status: 'featured',
      createDate: '2024-01-10',
    },
    {
      id: '2',
      customerName: '王经理',
      company: '教育集团',
      industry: '教育',
      challenge: '多校区管理困难，数据分散',
      solution: '统一平台管理，实时数据分析',
      results: '管理效率提升50%，成本降低30%',
      roi: 280,
      timeline: '4个月',
      status: 'published',
      createDate: '2024-01-08',
    },
  ];

  const campaignData: GrowthCampaign[] = [
    {
      id: '1',
      name: '高级功能推广活动',
      type: 'upsell',
      target: '活跃客户',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      budget: 50000,
      leads: 156,
      conversions: 23,
      revenue: 345000,
      status: 'active',
    },
    {
      id: '2',
      name: '客户推荐奖励计划',
      type: 'referral',
      target: '满意客户',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      budget: 30000,
      leads: 89,
      conversions: 12,
      revenue: 180000,
      status: 'active',
    },
  ];

  const funnelData = [
    { stage: '潜在客户', value: 1000 },
    { stage: '试用客户', value: 600 },
    { stage: '付费客户', value: 300 },
    { stage: '续费客户', value: 240 },
    { stage: '扩展客户', value: 120 },
  ];

  const retentionData = [
    { month: '1月', rate: 95 },
    { month: '2月', rate: 92 },
    { month: '3月', rate: 89 },
    { month: '4月', rate: 87 },
    { month: '5月', rate: 85 },
    { month: '6月', rate: 83 },
  ];



  const storyColumns: ColumnsType<SuccessStory> = [
    {
      title: '客户信息',
      key: 'customer',
      render: (record: SuccessStory) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{record.customerName}</div>
          <div style={{ color: '#666', fontSize: '12px' }}>{record.company}</div>
        </div>
      ),
    },
    {
      title: '行业',
      dataIndex: 'industry',
      key: 'industry',
    },
    {
      title: '挑战',
      dataIndex: 'challenge',
      key: 'challenge',
      ellipsis: true,
    },
    {
      title: 'ROI',
      dataIndex: 'roi',
      key: 'roi',
      render: (roi: number) => (
        <span style={{ color: '#52c41a', fontWeight: 'bold' }}>{roi}%</span>
      ),
      sorter: (a, b) => a.roi - b.roi,
    },
    {
      title: '实施周期',
      dataIndex: 'timeline',
      key: 'timeline',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          draft: { color: 'default', text: '草稿' },
          published: { color: 'success', text: '已发布' },
          featured: { color: 'gold', text: '精选案例' },
        };
        const config = statusMap[status as keyof typeof statusMap];
        return <Badge status={config.color as any} text={config.text} />;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space>
          <Tooltip title="查看">
            <Button type="text" icon={<EyeOutlined />} />
          </Tooltip>
          <Tooltip title="编辑">
            <Button type="text" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="设为精选">
            <Button type="text" icon={<StarOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const campaignColumns: ColumnsType<GrowthCampaign> = [
    {
      title: '活动名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const typeMap = {
          upsell: { color: 'blue', text: '向上销售' },
          cross_sell: { color: 'green', text: '交叉销售' },
          retention: { color: 'orange', text: '客户留存' },
          referral: { color: 'purple', text: '推荐奖励' },
        };
        const config = typeMap[type as keyof typeof typeMap];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '目标客户',
      dataIndex: 'target',
      key: 'target',
    },
    {
      title: '预算',
      dataIndex: 'budget',
      key: 'budget',
      render: (budget: number) => `¥${budget.toLocaleString()}`,
    },
    {
      title: '转化情况',
      key: 'conversion',
      render: (record: GrowthCampaign) => (
        <div>
          <div>{record.conversions}/{record.leads}</div>
          <Progress
            percent={Math.round((record.conversions / record.leads) * 100)}
            size="small"
            showInfo={false}
          />
        </div>
      ),
    },
    {
      title: '收入',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (revenue: number) => (
        <span style={{ color: '#52c41a', fontWeight: 'bold' }}>
          ¥{revenue.toLocaleString()}
        </span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          planning: { color: 'default', text: '规划中' },
          active: { color: 'processing', text: '进行中' },
          paused: { color: 'warning', text: '已暂停' },
          completed: { color: 'success', text: '已完成' },
        };
        const config = statusMap[status as keyof typeof statusMap];
        return <Badge status={config.color as any} text={config.text} />;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space>
          <Tooltip title="查看详情">
            <Button type="text" icon={<EyeOutlined />} />
          </Tooltip>
          <Tooltip title="编辑">
            <Button type="text" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="暂停/恢复">
            <Button type="text" icon={<ClockCircleOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const funnelConfig = {
    data: funnelData,
    xField: 'stage',
    yField: 'value',
    shape: 'funnel',
    legend: false,
    conversionTag: {
      formatter: (datum: any) => {
        return (datum.$$percentage$$ * 100).toFixed(1) + '%';
      },
    },
  };

  const retentionConfig = {
    data: retentionData,
    xField: 'month',
    yField: 'rate',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  };

  return (
    <div style={{ padding: '32px 40px', background: '#f5f5f5', minHeight: 'calc(100vh - 64px)' }}>
      <Title level={2} style={{ marginBottom: 24 }}>用户增长策略</Title>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="增长概览" key="overview">
          {/* 增长概览数据 - 使用统一卡片样式 */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={4}>
              <Card style={{ ...cardStyle, marginBottom: 0 }}>
                <Statistic
                  title={
                    <span>
                      客户总数
                      <Tooltip 
                        title="当前平台注册的客户总数量"
                        placement="top"
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
                  value={growthStats.totalCustomers}
                  valueStyle={{ fontWeight: 700, color: '#1890ff' }}
                  suffix={
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
                      <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 12, marginRight: 4 }} />
                      <Text style={{ color: '#52c41a', fontSize: 12 }}>+45</Text>
                    </div>
                  }
                />
              </Card>
            </Col>
            <Col xs={24} sm={4}>
              <Card style={{ ...cardStyle, marginBottom: 0 }}>
                <Statistic
                  title={
                    <span>
                      活跃客户
                      <Tooltip 
                        title="近30天内有活动的客户数量"
                        placement="top"
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
                  value={growthStats.activeCustomers}
                  valueStyle={{ fontWeight: 700, color: '#52c41a' }}
                  suffix={
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
                      <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 12, marginRight: 4 }} />
                      <Text style={{ color: '#52c41a', fontSize: 12 }}>+23</Text>
                    </div>
                  }
                />
              </Card>
            </Col>
            <Col xs={24} sm={4}>
              <Card style={{ ...cardStyle, marginBottom: 0 }}>
                <Statistic
                  title={
                    <span>
                      流失率
                      <Tooltip 
                        title="本月客户流失率"
                        placement="top"
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
                  value={growthStats.churnRate}
                  precision={1}
                  valueStyle={{ fontWeight: 700, color: '#ff4d4f' }}
                  suffix={
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
                      <span style={{ color: '#ff4d4f', fontSize: 12 }}>%</span>
                      <ArrowDownOutlined style={{ color: '#52c41a', fontSize: 12, marginLeft: 4 }} />
                      <Text style={{ color: '#52c41a', fontSize: 12 }}>-0.5</Text>
                    </div>
                  }
                />
              </Card>
            </Col>
            <Col xs={24} sm={4}>
              <Card style={{ ...cardStyle, marginBottom: 0 }}>
                <Statistic
                  title={
                    <span>
                      扩展收入
                      <Tooltip 
                        title="本月客户扩展产生的收入"
                        placement="top"
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
                  value={growthStats.expansionRevenue}
                  formatter={(value) => `¥${Number(value).toLocaleString()}`}
                  valueStyle={{ fontWeight: 700, color: '#722ed1' }}
                  suffix={
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
                      <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 12, marginRight: 4 }} />
                      <Text style={{ color: '#52c41a', fontSize: 12 }}>+15%</Text>
                    </div>
                  }
                />
              </Card>
            </Col>
            <Col xs={24} sm={4}>
              <Card style={{ ...cardStyle, marginBottom: 0 }}>
                <Statistic
                  title={
                    <span>
                      NPS评分
                      <Tooltip 
                        title="客户净推荐值评分"
                        placement="top"
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
                  value={growthStats.nps}
                  valueStyle={{ fontWeight: 700, color: '#fa8c16' }}
                  suffix={
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
                      <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 12, marginRight: 4 }} />
                      <Text style={{ color: '#52c41a', fontSize: 12 }}>+3</Text>
                    </div>
                  }
                />
              </Card>
            </Col>
            <Col xs={24} sm={4}>
              <Card style={{ ...cardStyle, marginBottom: 0 }}>
                <Statistic
                  title={
                    <span>
                      CSAT评分
                      <Tooltip 
                        title="客户满意度评分"
                        placement="top"
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
                  value={growthStats.csat}
                  precision={1}
                  valueStyle={{ fontWeight: 700, color: '#eb2f96' }}
                  suffix={
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
                      <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 12, marginRight: 4 }} />
                      <Text style={{ color: '#52c41a', fontSize: 12 }}>+0.2</Text>
                    </div>
                  }
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card style={cardStyle} title="客户转化漏斗" extra={<Button icon={<ExportOutlined />}>导出</Button>}>
                <Funnel {...funnelConfig} />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card style={cardStyle} title="客户留存率趋势">
                <Line {...retentionConfig} />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col xs={24} lg={8}>
              <Card style={cardStyle} title="客户生命周期分布" size="small">
                <List
                  size="small"
                  dataSource={[
                    { stage: '试用期', count: 156, color: '#1890ff' },
                    { stage: '活跃期', count: 892, color: '#52c41a' },
                    { stage: '扩展期', count: 234, color: '#faad14' },
                    { stage: '流失风险', count: 45, color: '#ff4d4f' },
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>{item.stage}</span>
                        <Tag color={item.color}>{item.count}个客户</Tag>
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card style={cardStyle} title="本月关键指标" size="small">
                <div style={{ padding: '16px 0' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span>新客户获取</span>
                      <span style={{ fontWeight: 'bold', color: '#52c41a' }}>+23</span>
                    </div>
                    <Progress percent={76} size="small" />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span>客户扩展</span>
                      <span style={{ fontWeight: 'bold', color: '#1890ff' }}>+12</span>
                    </div>
                    <Progress percent={60} size="small" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span>续费成功</span>
                      <span style={{ fontWeight: 'bold', color: '#722ed1' }}>+34</span>
                    </div>
                    <Progress percent={85} size="small" />
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card style={cardStyle} title="待处理任务" size="small">
                <List
                  size="small"
                  dataSource={[
                    { task: '续费提醒', count: 12, priority: 'high' },
                    { task: '健康度预警', count: 8, priority: 'medium' },
                    { task: '扩展机会跟进', count: 15, priority: 'medium' },
                    { task: '客户回访', count: 23, priority: 'low' },
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>{item.task}</span>
                        <Badge
                          count={item.count}
                          style={{
                            backgroundColor: item.priority === 'high' ? '#ff4d4f' : 
                                           item.priority === 'medium' ? '#faad14' : '#52c41a'
                          }}
                        />
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>



        <TabPane tab="成功案例" key="success-stories">
          <Card style={cardStyle}>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
              <Space>
                <Input.Search placeholder="搜索客户或公司" style={{ width: 300 }} />
                <Select placeholder="行业" style={{ width: 120 }}>
                  <Option value="tech">科技</Option>
                  <Option value="education">教育</Option>
                  <Option value="finance">金融</Option>
                  <Option value="healthcare">医疗</Option>
                </Select>
                <Select placeholder="状态" style={{ width: 120 }}>
                  <Option value="draft">草稿</Option>
                  <Option value="published">已发布</Option>
                  <Option value="featured">精选案例</Option>
                </Select>
              </Space>
              <Space>
                <Button icon={<FilterOutlined />}>筛选</Button>
                <Button icon={<ExportOutlined />}>导出</Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setStoryModalVisible(true)}>
                  创建案例
                </Button>
              </Space>
            </div>
            <Table
              columns={storyColumns}
              dataSource={successStoryData}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        <TabPane tab="增长活动" key="campaigns">
          <Card style={cardStyle}>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
              <Space>
                <Input.Search placeholder="搜索活动名称" style={{ width: 300 }} />
                <Select placeholder="活动类型" style={{ width: 150 }}>
                  <Option value="upsell">向上销售</Option>
                  <Option value="cross_sell">交叉销售</Option>
                  <Option value="retention">客户留存</Option>
                  <Option value="referral">推荐奖励</Option>
                </Select>
                <Select placeholder="状态" style={{ width: 120 }}>
                  <Option value="planning">规划中</Option>
                  <Option value="active">进行中</Option>
                  <Option value="paused">已暂停</Option>
                  <Option value="completed">已完成</Option>
                </Select>
              </Space>
              <Space>
                <Button icon={<FilterOutlined />}>筛选</Button>
                <Button icon={<ExportOutlined />}>导出</Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setCampaignModalVisible(true)}>
                  创建活动
                </Button>
              </Space>
            </div>
            <Table
              columns={campaignColumns}
              dataSource={campaignData}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
      </Tabs>

      {/* 添加客户弹窗 */}
      <Modal
        title="添加客户"
        open={customerModalVisible}
        onCancel={() => setCustomerModalVisible(false)}
        onOk={() => {
          message.success('客户添加成功');
          setCustomerModalVisible(false);
        }}
        width={600}
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="客户姓名" required>
                <Input placeholder="请输入客户姓名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="公司名称" required>
                <Input placeholder="请输入公司名称" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="行业" required>
                <Select placeholder="请选择行业">
                  <Option value="tech">科技</Option>
                  <Option value="education">教育</Option>
                  <Option value="finance">金融</Option>
                  <Option value="healthcare">医疗</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="生命周期阶段" required>
                <Select placeholder="请选择阶段">
                  <Option value="trial">试用期</Option>
                  <Option value="onboarding">入门期</Option>
                  <Option value="active">活跃期</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="客户价值" required>
                <Input type="number" placeholder="请输入客户价值" addonBefore="¥" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="CSM" required>
                <Select placeholder="请选择客户成功经理">
                  <Option value="李经理">李经理</Option>
                  <Option value="赵主管">赵主管</Option>
                  <Option value="陈顾问">陈顾问</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="备注">
            <TextArea rows={3} placeholder="请输入备注信息" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 创建成功案例弹窗 */}
      <Modal
        title="创建成功案例"
        open={storyModalVisible}
        onCancel={() => setStoryModalVisible(false)}
        onOk={() => {
          message.success('成功案例创建成功');
          setStoryModalVisible(false);
        }}
        width={800}
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="客户姓名" required>
                <Input placeholder="请输入客户姓名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="公司名称" required>
                <Input placeholder="请输入公司名称" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="面临挑战" required>
            <TextArea rows={3} placeholder="请描述客户面临的主要挑战" />
          </Form.Item>
          <Form.Item label="解决方案" required>
            <TextArea rows={3} placeholder="请描述提供的解决方案" />
          </Form.Item>
          <Form.Item label="实施效果" required>
            <TextArea rows={3} placeholder="请描述实施后的效果" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="ROI (%)" required>
                <Input type="number" placeholder="请输入ROI" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="实施周期" required>
                <Input placeholder="如：3个月" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="案例状态" required>
                <Select placeholder="请选择状态">
                  <Option value="draft">草稿</Option>
                  <Option value="published">发布</Option>
                  <Option value="featured">精选</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* 创建增长活动弹窗 */}
      <Modal
        title="创建增长活动"
        open={campaignModalVisible}
        onCancel={() => setCampaignModalVisible(false)}
        onOk={() => {
          message.success('增长活动创建成功');
          setCampaignModalVisible(false);
        }}
        width={600}
      >
        <Form layout="vertical">
          <Form.Item label="活动名称" required>
            <Input placeholder="请输入活动名称" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="活动类型" required>
                <Select placeholder="请选择活动类型">
                  <Option value="upsell">向上销售</Option>
                  <Option value="cross_sell">交叉销售</Option>
                  <Option value="retention">客户留存</Option>
                  <Option value="referral">推荐奖励</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="目标客户" required>
                <Input placeholder="请输入目标客户群体" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="开始时间" required>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="结束时间" required>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="活动预算" required>
            <Input type="number" placeholder="请输入活动预算" addonBefore="¥" />
          </Form.Item>
          <Form.Item label="活动描述" required>
            <TextArea rows={4} placeholder="请详细描述活动内容和目标" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GrowthStrategy;