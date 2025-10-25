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
  Typography,
} from 'antd';
import {
  MessageOutlined,
  UserOutlined,
  BellOutlined,
  LikeOutlined,
  CommentOutlined,
  ShareAltOutlined,
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  ExportOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  BarChartOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { Column } from '@ant-design/charts';
import type { ColumnsType } from 'antd/es/table';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { TabPane } = Tabs;
const { Title, Text } = Typography;

// 统一的卡片样式 - 参考持续服务的现代风格
const cardStyle = {
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  border: '1px solid #f0f0f0',
  background: '#ffffff',
  marginBottom: '16px',
};

interface FeedbackRecord {
  id: string;
  customerName: string;
  company: string;
  feedbackType: 'bug' | 'feature' | 'complaint' | 'suggestion';
  content: string;
  status: 'pending' | 'processing' | 'resolved' | 'closed';
  priority: 'high' | 'medium' | 'low';
  createTime: string;
  assignee?: string;
}

interface ActivityRecord {
  id: string;
  title: string;
  type: 'announcement' | 'event' | 'promotion' | 'training';
  targetAudience: string;
  status: 'draft' | 'published' | 'ended';
  participantCount: number;
  engagementRate: number;
  createTime: string;
}

interface InteractionData {
  month: string;
  feedback: number;
  activities: number;
  engagement: number;
}

const UserInteractionManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackRecord | null>(null);

  // 模拟数据
  const interactionData: InteractionData[] = [
    { month: '1月', feedback: 45, activities: 8, engagement: 78 },
    { month: '2月', feedback: 52, activities: 12, engagement: 82 },
    { month: '3月', feedback: 38, activities: 15, engagement: 85 },
    { month: '4月', feedback: 61, activities: 10, engagement: 79 },
    { month: '5月', feedback: 49, activities: 18, engagement: 88 },
    { month: '6月', feedback: 55, activities: 14, engagement: 91 },
  ];

  const feedbackData: FeedbackRecord[] = [
    {
      id: '1',
      customerName: '张经理',
      company: '科技有限公司',
      feedbackType: 'feature',
      content: '希望能增加批量导入学员功能',
      status: 'processing',
      priority: 'high',
      createTime: '2024-01-15 10:30',
      assignee: '李产品',
    },
    {
      id: '2',
      customerName: '王总监',
      company: '教育集团',
      feedbackType: 'bug',
      content: '数据导出功能偶尔会出现卡顿',
      status: 'resolved',
      priority: 'medium',
      createTime: '2024-01-14 14:20',
      assignee: '赵开发',
    },
    {
      id: '3',
      customerName: '刘主任',
      company: '培训机构',
      feedbackType: 'complaint',
      content: '系统响应速度较慢，影响使用体验',
      status: 'pending',
      priority: 'high',
      createTime: '2024-01-13 16:45',
    },
  ];

  const activityData: ActivityRecord[] = [
    {
      id: '1',
      title: '授客SaaS 2.0版本发布会',
      type: 'announcement',
      targetAudience: '全部客户',
      status: 'published',
      participantCount: 156,
      engagementRate: 78.5,
      createTime: '2024-01-10',
    },
    {
      id: '2',
      title: '客户成功最佳实践分享',
      type: 'training',
      targetAudience: '企业客户',
      status: 'published',
      participantCount: 89,
      engagementRate: 85.2,
      createTime: '2024-01-08',
    },
    {
      id: '3',
      title: '春节特惠活动',
      type: 'promotion',
      targetAudience: '潜在客户',
      status: 'ended',
      participantCount: 234,
      engagementRate: 92.1,
      createTime: '2024-01-05',
    },
  ];

  const feedbackColumns: ColumnsType<FeedbackRecord> = [
    {
      title: '客户信息',
      key: 'customer',
      render: (record: FeedbackRecord) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{record.customerName}</div>
          <div style={{ color: '#666', fontSize: '12px' }}>{record.company}</div>
        </div>
      ),
    },
    {
      title: '反馈类型',
      dataIndex: 'feedbackType',
      key: 'feedbackType',
      render: (type: string) => {
        const typeMap = {
          bug: { color: 'red', text: 'Bug反馈' },
          feature: { color: 'blue', text: '功能建议' },
          complaint: { color: 'orange', text: '投诉建议' },
          suggestion: { color: 'green', text: '优化建议' },
        };
        const config = typeMap[type as keyof typeof typeMap];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '反馈内容',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
      width: 300,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          pending: { color: 'default', text: '待处理' },
          processing: { color: 'processing', text: '处理中' },
          resolved: { color: 'success', text: '已解决' },
          closed: { color: 'default', text: '已关闭' },
        };
        const config = statusMap[status as keyof typeof statusMap];
        return <Badge status={config.color as any} text={config.text} />;
      },
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => {
        const priorityMap = {
          high: { color: 'red', text: '高' },
          medium: { color: 'orange', text: '中' },
          low: { color: 'green', text: '低' },
        };
        const config = priorityMap[priority as keyof typeof priorityMap];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '负责人',
      dataIndex: 'assignee',
      key: 'assignee',
      render: (assignee: string) => assignee || '-',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (record: FeedbackRecord) => (
        <Space>
          <Tooltip title="查看详情">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => setSelectedFeedback(record)}
            />
          </Tooltip>
          <Tooltip title="编辑">
            <Button type="text" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="删除">
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const activityColumns: ColumnsType<ActivityRecord> = [
    {
      title: '活动标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '活动类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const typeMap = {
          announcement: { color: 'blue', text: '公告通知' },
          event: { color: 'green', text: '活动事件' },
          promotion: { color: 'orange', text: '促销活动' },
          training: { color: 'purple', text: '培训活动' },
        };
        const config = typeMap[type as keyof typeof typeMap];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '目标受众',
      dataIndex: 'targetAudience',
      key: 'targetAudience',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          draft: { color: 'default', text: '草稿' },
          published: { color: 'processing', text: '已发布' },
          ended: { color: 'success', text: '已结束' },
        };
        const config = statusMap[status as keyof typeof statusMap];
        return <Badge status={config.color as any} text={config.text} />;
      },
    },
    {
      title: '参与人数',
      dataIndex: 'participantCount',
      key: 'participantCount',
    },
    {
      title: '互动率',
      dataIndex: 'engagementRate',
      key: 'engagementRate',
      render: (rate: number) => `${rate}%`,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space>
          <Button type="text" icon={<EyeOutlined />} />
          <Button type="text" icon={<EditOutlined />} />
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  const chartConfig = {
    data: interactionData,
    xField: 'month',
    yField: 'feedback',
    color: '#1890ff',
    columnWidthRatio: 0.6,
    meta: {
      feedback: { alias: '反馈数量' },
    },
  };

  return (
    <div style={{ padding: 0 }}>
      <Title level={2} style={{ marginBottom: 24 }}>用户互动管理</Title>
      
      {/* 数据概览 - 使用统一卡片样式 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={6}>
          <Card style={{ ...cardStyle, marginBottom: 0 }}>
            <Statistic 
              title={
                <span>
                  总客户数
                  <Tooltip 
                    title="当前平台注册的B端客户总数"
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
              value={156} 
              valueStyle={{ fontWeight: 700 }}
              suffix={
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
                  <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 12, marginRight: 4 }} />
                  <Text style={{ color: '#52c41a', fontSize: 12 }}>+8</Text>
                </div>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card style={{ ...cardStyle, marginBottom: 0 }}>
            <Statistic 
              title={
                <span>
                  活跃客户
                  <Tooltip 
                    title="近30天内有互动行为的客户数量"
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
              value={89} 
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
        <Col xs={24} sm={6}>
          <Card style={{ ...cardStyle, marginBottom: 0 }}>
            <Statistic 
              title={
                <span>
                  待处理反馈
                  <Tooltip 
                    title="需要跟进处理的客户反馈数量"
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
              value={23} 
              valueStyle={{ fontWeight: 700, color: '#fa8c16' }}
              suffix={
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
                  <ArrowDownOutlined style={{ color: '#52c41a', fontSize: 12, marginRight: 4 }} />
                  <Text style={{ color: '#52c41a', fontSize: 12 }}>-5</Text>
                </div>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card style={{ ...cardStyle, marginBottom: 0 }}>
            <Statistic 
              title={
                <span>
                  满意度评分
                  <Tooltip 
                    title="客户满意度平均评分（5分制）"
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
              value={4.2} 
              precision={1}
              valueStyle={{ fontWeight: 700, color: '#52c41a' }}
              suffix={
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
                  <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 12, marginRight: 4 }} />
                  <Text style={{ color: '#52c41a', fontSize: 12 }}>+0.3</Text>
                </div>
              }
            />
          </Card>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="数据概览" key="overview">

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card title="月度反馈趋势" extra={<Button icon={<ExportOutlined />}>导出</Button>} style={cardStyle}>
                <Column {...chartConfig} />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="反馈处理进度" style={cardStyle}>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>已解决</span>
                    <span>78%</span>
                  </div>
                  <Progress percent={78} status="active" />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>处理中</span>
                    <span>15%</span>
                  </div>
                  <Progress percent={15} status="active" strokeColor="#faad14" />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>待处理</span>
                    <span>7%</span>
                  </div>
                  <Progress percent={7} status="exception" />
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="客户反馈" key="feedback">
          <Card style={cardStyle}>
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <Space>
                <Search placeholder="搜索客户或反馈内容" style={{ width: 300 }} />
                <Select placeholder="反馈类型" style={{ width: 120 }}>
                  <Option value="bug">Bug反馈</Option>
                  <Option value="feature">功能建议</Option>
                  <Option value="complaint">投诉建议</Option>
                  <Option value="suggestion">优化建议</Option>
                </Select>
                <Select placeholder="状态" style={{ width: 120 }}>
                  <Option value="pending">待处理</Option>
                  <Option value="processing">处理中</Option>
                  <Option value="resolved">已解决</Option>
                  <Option value="closed">已关闭</Option>
                </Select>
                <RangePicker />
              </Space>
              <Space>
                <Button icon={<FilterOutlined />}>筛选</Button>
                <Button icon={<ExportOutlined />}>导出</Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setFeedbackModalVisible(true)}>
                  新建反馈
                </Button>
              </Space>
            </div>
            <Table
              columns={feedbackColumns}
              dataSource={feedbackData}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        <TabPane tab="活动推送" key="activities">
          <Card style={cardStyle}>
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <Space>
                <Search placeholder="搜索活动标题" style={{ width: 300 }} />
                <Select placeholder="活动类型" style={{ width: 120 }}>
                  <Option value="announcement">公告通知</Option>
                  <Option value="event">活动事件</Option>
                  <Option value="promotion">促销活动</Option>
                  <Option value="training">培训活动</Option>
                </Select>
                <Select placeholder="状态" style={{ width: 120 }}>
                  <Option value="draft">草稿</Option>
                  <Option value="published">已发布</Option>
                  <Option value="ended">已结束</Option>
                </Select>
              </Space>
              <Space>
                <Button icon={<FilterOutlined />}>筛选</Button>
                <Button icon={<ExportOutlined />}>导出</Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setActivityModalVisible(true)}>
                  创建活动
                </Button>
              </Space>
            </div>
            <Table
              columns={activityColumns}
              dataSource={activityData}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        <TabPane tab="互动分析" key="analytics">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card title="客户互动热力图" style={cardStyle}>
                <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                  互动热力图组件 - 显示客户活跃度分布
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="反馈类型分布" style={cardStyle}>
                <List
                  dataSource={[
                    { type: '功能建议', count: 45, percent: 40 },
                    { type: 'Bug反馈', count: 32, percent: 28 },
                    { type: '投诉建议', count: 23, percent: 20 },
                    { type: '优化建议', count: 14, percent: 12 },
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span>{item.type}</span>
                          <span>{item.count}条</span>
                        </div>
                        <Progress percent={item.percent} showInfo={false} />
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="活动效果排行" style={cardStyle}>
                <List
                  dataSource={[
                    { title: '春节特惠活动', rate: 92.1 },
                    { title: '客户成功最佳实践分享', rate: 85.2 },
                    { title: '授客SaaS 2.0版本发布会', rate: 78.5 },
                    { title: '产品功能培训', rate: 72.3 },
                  ]}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar style={{ backgroundColor: '#1890ff' }}>{index + 1}</Avatar>}
                        title={item.title}
                        description={`互动率: ${item.rate}%`}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      {/* 反馈详情弹窗 */}
      <Modal
        title="反馈详情"
        open={!!selectedFeedback}
        onCancel={() => setSelectedFeedback(null)}
        footer={[
          <Button key="close" onClick={() => setSelectedFeedback(null)}>
            关闭
          </Button>,
          <Button key="edit" type="primary">
            编辑处理
          </Button>,
        ]}
        width={600}
      >
        {selectedFeedback && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <strong>客户信息：</strong>
              {selectedFeedback.customerName} - {selectedFeedback.company}
            </div>
            <div style={{ marginBottom: '16px' }}>
              <strong>反馈内容：</strong>
              <div style={{ marginTop: '8px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                {selectedFeedback.content}
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <strong>处理状态：</strong>
              <Tag color="processing" style={{ marginLeft: '8px' }}>处理中</Tag>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <strong>负责人：</strong>
              {selectedFeedback.assignee || '未分配'}
            </div>
            <div>
              <strong>创建时间：</strong>
              {selectedFeedback.createTime}
            </div>
          </div>
        )}
      </Modal>

      {/* 新建反馈弹窗 */}
      <Modal
        title="新建反馈"
        open={feedbackModalVisible}
        onCancel={() => setFeedbackModalVisible(false)}
        onOk={() => {
          message.success('反馈创建成功');
          setFeedbackModalVisible(false);
        }}
      >
        <Form layout="vertical">
          <Form.Item label="客户名称" required>
            <Input placeholder="请输入客户名称" />
          </Form.Item>
          <Form.Item label="公司名称" required>
            <Input placeholder="请输入公司名称" />
          </Form.Item>
          <Form.Item label="反馈类型" required>
            <Select placeholder="请选择反馈类型">
              <Option value="bug">Bug反馈</Option>
              <Option value="feature">功能建议</Option>
              <Option value="complaint">投诉建议</Option>
              <Option value="suggestion">优化建议</Option>
            </Select>
          </Form.Item>
          <Form.Item label="反馈内容" required>
            <TextArea rows={4} placeholder="请详细描述反馈内容" />
          </Form.Item>
          <Form.Item label="优先级" required>
            <Select placeholder="请选择优先级">
              <Option value="high">高</Option>
              <Option value="medium">中</Option>
              <Option value="low">低</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* 创建活动弹窗 */}
      <Modal
        title="创建活动"
        open={activityModalVisible}
        onCancel={() => setActivityModalVisible(false)}
        onOk={() => {
          message.success('活动创建成功');
          setActivityModalVisible(false);
        }}
        width={600}
      >
        <Form layout="vertical">
          <Form.Item label="活动标题" required>
            <Input placeholder="请输入活动标题" />
          </Form.Item>
          <Form.Item label="活动类型" required>
            <Select placeholder="请选择活动类型">
              <Option value="announcement">公告通知</Option>
              <Option value="event">活动事件</Option>
              <Option value="promotion">促销活动</Option>
              <Option value="training">培训活动</Option>
            </Select>
          </Form.Item>
          <Form.Item label="目标受众" required>
            <Select placeholder="请选择目标受众">
              <Option value="all">全部客户</Option>
              <Option value="enterprise">企业客户</Option>
              <Option value="potential">潜在客户</Option>
              <Option value="vip">VIP客户</Option>
            </Select>
          </Form.Item>
          <Form.Item label="活动描述" required>
            <TextArea rows={4} placeholder="请详细描述活动内容" />
          </Form.Item>
          <Form.Item label="推送时间" required>
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserInteractionManagement;