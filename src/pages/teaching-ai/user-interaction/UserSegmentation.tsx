import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Table,
  Button,
  Space,
  Typography,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Progress,
  Avatar,
  Tooltip,
  Badge,
  Tabs,
  List,
  Statistic,
  Divider,
} from 'antd';
import {
  TeamOutlined,
  UserOutlined,
  SettingOutlined,
  BarChartOutlined,
  FilterOutlined,
  SendOutlined,
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
  StarOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

interface UserSegment {
  id: string;
  name: string;
  description: string;
  userCount: number;
  criteria: {
    type: string;
    conditions: Array<{
      field: string;
      operator: string;
      value: any;
    }>;
  };
  status: 'active' | 'inactive';
  createTime: string;
  updateTime: string;
  performance: {
    conversionRate: number;
    avgEngagement: number;
    retention: number;
  };
}

interface SegmentUser {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  joinDate: string;
  lastActive: string;
  engagement: number;
  courseCompleted: number;
  totalSpent: number;
  tags: string[];
}

const UserSegmentation: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<UserSegment | null>(null);
  const [isSegmentModalVisible, setIsSegmentModalVisible] = useState(false);
  const [isUserListModalVisible, setIsUserListModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('segments');

  // 模拟用户分群数据
  const segmentData: UserSegment[] = [
    {
      id: '1',
      name: '高价值用户',
      description: '学习时长超过100小时，完成课程数量>5的用户',
      userCount: 1234,
      criteria: {
        type: 'and',
        conditions: [
          { field: 'study_hours', operator: '>', value: 100 },
          { field: 'completed_courses', operator: '>', value: 5 },
        ],
      },
      status: 'active',
      createTime: '2024-01-10 10:00:00',
      updateTime: '2024-01-15 14:30:00',
      performance: {
        conversionRate: 85,
        avgEngagement: 92,
        retention: 78,
      },
    },
    {
      id: '2',
      name: '新手用户',
      description: '注册时间少于30天的新用户',
      userCount: 856,
      criteria: {
        type: 'and',
        conditions: [
          { field: 'register_days', operator: '<=', value: 30 },
        ],
      },
      status: 'active',
      createTime: '2024-01-08 09:15:00',
      updateTime: '2024-01-14 16:20:00',
      performance: {
        conversionRate: 45,
        avgEngagement: 65,
        retention: 52,
      },
    },
    {
      id: '3',
      name: '流失风险用户',
      description: '最近30天未登录的用户',
      userCount: 432,
      criteria: {
        type: 'and',
        conditions: [
          { field: 'last_login_days', operator: '>', value: 30 },
        ],
      },
      status: 'active',
      createTime: '2024-01-05 14:45:00',
      updateTime: '2024-01-12 11:10:00',
      performance: {
        conversionRate: 15,
        avgEngagement: 25,
        retention: 18,
      },
    },
  ];

  // 模拟分群用户数据
  const segmentUsers: SegmentUser[] = [
    {
      id: 'U001',
      name: '张三',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1',
      email: 'zhangsan@example.com',
      joinDate: '2023-12-01',
      lastActive: '2024-01-15',
      engagement: 92,
      courseCompleted: 8,
      totalSpent: 2580,
      tags: ['VIP用户', '活跃学员'],
    },
    {
      id: 'U002',
      name: '李四',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2',
      email: 'lisi@example.com',
      joinDate: '2023-11-15',
      lastActive: '2024-01-14',
      engagement: 88,
      courseCompleted: 6,
      totalSpent: 1980,
      tags: ['高价值用户', '推荐达人'],
    },
  ];

  const segmentColumns: ColumnsType<UserSegment> = [
    {
      title: '分群信息',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space direction="vertical" size="small">
          <Space>
            <TeamOutlined style={{ color: '#1890ff' }} />
            <Text strong>{text}</Text>
          </Space>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.description}
          </Text>
        </Space>
      ),
    },
    {
      title: '用户数量',
      dataIndex: 'userCount',
      key: 'userCount',
      render: (count) => (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1890ff' }}>
            {count.toLocaleString()}
          </div>
          <Text type="secondary" style={{ fontSize: '12px' }}>用户</Text>
        </div>
      ),
    },
    {
      title: '转化率',
      dataIndex: ['performance', 'conversionRate'],
      key: 'conversionRate',
      render: (rate) => (
        <div>
          <Progress
            percent={rate}
            size="small"
            strokeColor={rate >= 70 ? '#52c41a' : rate >= 40 ? '#fa8c16' : '#ff4d4f'}
          />
          <Text style={{ fontSize: '12px' }}>{rate}%</Text>
        </div>
      ),
    },
    {
      title: '活跃度',
      dataIndex: ['performance', 'avgEngagement'],
      key: 'avgEngagement',
      render: (engagement) => (
        <div>
          <Progress
            percent={engagement}
            size="small"
            strokeColor={engagement >= 80 ? '#52c41a' : engagement >= 60 ? '#fa8c16' : '#ff4d4f'}
          />
          <Text style={{ fontSize: '12px' }}>{engagement}%</Text>
        </div>
      ),
    },
    {
      title: '留存率',
      dataIndex: ['performance', 'retention'],
      key: 'retention',
      render: (retention) => (
        <div>
          <Progress
            percent={retention}
            size="small"
            strokeColor={retention >= 70 ? '#52c41a' : retention >= 50 ? '#fa8c16' : '#ff4d4f'}
          />
          <Text style={{ fontSize: '12px' }}>{retention}%</Text>
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'gray'}>
          {status === 'active' ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            size="small"
            onClick={() => handleViewUsers(record)}
          >
            查看用户
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => handleEditSegment(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => handleSendMessage(record)}
          >
            发送消息
          </Button>
        </Space>
      ),
    },
  ];

  const userColumns: ColumnsType<SegmentUser> = [
    {
      title: '用户信息',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar src={record.avatar} icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 'bold' }}>{text}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {record.email}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: '加入时间',
      dataIndex: 'joinDate',
      key: 'joinDate',
      render: (date) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: '最后活跃',
      dataIndex: 'lastActive',
      key: 'lastActive',
      render: (date) => dayjs(date).format('MM-DD HH:mm'),
    },
    {
      title: '活跃度',
      dataIndex: 'engagement',
      key: 'engagement',
      render: (engagement) => (
        <div>
          <Progress percent={engagement} size="small" />
          <Text style={{ fontSize: '12px' }}>{engagement}%</Text>
        </div>
      ),
    },
    {
      title: '完成课程',
      dataIndex: 'courseCompleted',
      key: 'courseCompleted',
      render: (count) => <Text strong>{count}</Text>,
    },
    {
      title: '消费金额',
      dataIndex: 'totalSpent',
      key: 'totalSpent',
      render: (amount) => <Text strong>¥{amount.toLocaleString()}</Text>,
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <Space wrap>
          {tags.map((tag, index) => (
            <Tag key={index} color="blue" style={{ fontSize: '12px' }}>
              {tag}
            </Tag>
          ))}
        </Space>
      ),
    },
  ];

  const handleEditSegment = (segment: UserSegment) => {
    setSelectedSegment(segment);
    form.setFieldsValue({
      name: segment.name,
      description: segment.description,
      status: segment.status,
    });
    setIsSegmentModalVisible(true);
  };

  const handleViewUsers = (segment: UserSegment) => {
    setSelectedSegment(segment);
    setIsUserListModalVisible(true);
  };

  const handleSendMessage = (segment: UserSegment) => {
    Modal.info({
      title: '发送消息',
      content: `将向 "${segment.name}" 分群的 ${segment.userCount} 名用户发送消息`,
      okText: '确认发送',
    });
  };

  const handleSegmentSubmit = () => {
    form.validateFields().then((values) => {
      console.log('Segment values:', values);
      setIsSegmentModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <div style={{ padding: '32px 40px', background: '#f5f5f5', minHeight: 'calc(100vh - 64px)' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>
          <FilterOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          用户分群管理
        </Title>
        <Text type="secondary">基于用户行为和属性进行智能分群，实现精准营销</Text>
      </div>

      {/* 分群概览 */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总分群数"
              value={segmentData.length}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总用户数"
              value={segmentData.reduce((sum, segment) => sum + segment.userCount, 0)}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="平均转化率"
              value={Math.round(segmentData.reduce((sum, segment) => sum + segment.performance.conversionRate, 0) / segmentData.length)}
              suffix="%"
              prefix={<RiseOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="平均留存率"
              value={Math.round(segmentData.reduce((sum, segment) => sum + segment.performance.retention, 0) / segmentData.length)}
              suffix="%"
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="分群管理" key="segments">
          <Card
            title="用户分群列表"
            extra={
              <Button type="primary" onClick={() => setIsSegmentModalVisible(true)}>
                创建分群
              </Button>
            }
          >
            <Table
              columns={segmentColumns}
              dataSource={segmentData}
              rowKey="id"
              pagination={{
                total: segmentData.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="分群分析" key="analytics">
          <Row gutter={16}>
            <Col span={12}>
              <Card title="分群性能对比">
                <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text type="secondary">分群性能对比图表</Text>
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="用户流转分析">
                <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text type="secondary">用户流转分析图表</Text>
                </div>
              </Card>
            </Col>
          </Row>
          
          <Row gutter={16} style={{ marginTop: '16px' }}>
            <Col span={24}>
              <Card title="分群趋势分析">
                <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text type="secondary">分群趋势分析图表</Text>
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="营销活动" key="campaigns">
          <Card title="精准营销活动">
            <List
              itemLayout="horizontal"
              dataSource={[
                {
                  title: '高价值用户专享课程推荐',
                  description: '向高价值用户推荐高级课程，提升客单价',
                  segment: '高价值用户',
                  status: '进行中',
                  sendTime: '2024-01-15 10:00',
                },
                {
                  title: '新手用户引导活动',
                  description: '为新手用户提供学习指导和优惠券',
                  segment: '新手用户',
                  status: '已完成',
                  sendTime: '2024-01-10 14:30',
                },
                {
                  title: '流失用户召回活动',
                  description: '通过优惠活动召回流失风险用户',
                  segment: '流失风险用户',
                  status: '待发送',
                  sendTime: '2024-01-20 09:00',
                },
              ]}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button key="view" type="link">查看详情</Button>,
                    <Button key="edit" type="link">编辑</Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<SendOutlined style={{ fontSize: '24px', color: '#1890ff' }} />}
                    title={
                      <Space>
                        <Text strong>{item.title}</Text>
                        <Tag color={item.status === '进行中' ? 'blue' : item.status === '已完成' ? 'green' : 'orange'}>
                          {item.status}
                        </Tag>
                      </Space>
                    }
                    description={
                      <Space direction="vertical" size="small">
                        <Text>{item.description}</Text>
                        <Space>
                          <Text type="secondary">目标分群：</Text>
                          <Tag color="blue">{item.segment}</Tag>
                          <Text type="secondary">发送时间：{item.sendTime}</Text>
                        </Space>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </TabPane>
      </Tabs>

      {/* 分群配置弹窗 */}
      <Modal
        title={selectedSegment ? '编辑用户分群' : '创建用户分群'}
        open={isSegmentModalVisible}
        onOk={handleSegmentSubmit}
        onCancel={() => setIsSegmentModalVisible(false)}
        okText="保存"
        cancelText="取消"
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="分群名称"
            rules={[{ required: true, message: '请输入分群名称' }]}
          >
            <Input placeholder="请输入分群名称" />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="分群描述"
            rules={[{ required: true, message: '请输入分群描述' }]}
          >
            <Input.TextArea rows={3} placeholder="请输入分群描述" />
          </Form.Item>
          
          <Form.Item label="筛选条件">
            <Card size="small" style={{ background: '#fafafa' }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Row gutter={8}>
                  <Col span={8}>
                    <Select placeholder="选择字段" style={{ width: '100%' }}>
                      <Option value="study_hours">学习时长</Option>
                      <Option value="completed_courses">完成课程数</Option>
                      <Option value="register_days">注册天数</Option>
                      <Option value="last_login_days">最后登录天数</Option>
                    </Select>
                  </Col>
                  <Col span={6}>
                    <Select placeholder="操作符" style={{ width: '100%' }}>
                      <Option value=">">大于</Option>
                      <Option value=">=">大于等于</Option>
                      <Option value="<">小于</Option>
                      <Option value="<=">小于等于</Option>
                      <Option value="=">等于</Option>
                    </Select>
                  </Col>
                  <Col span={6}>
                    <InputNumber placeholder="数值" style={{ width: '100%' }} />
                  </Col>
                  <Col span={4}>
                    <Button type="dashed" style={{ width: '100%' }}>
                      添加
                    </Button>
                  </Col>
                </Row>
              </Space>
            </Card>
          </Form.Item>
          
          <Form.Item name="status" label="启用状态">
            <Select placeholder="请选择状态">
              <Option value="active">启用</Option>
              <Option value="inactive">禁用</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* 分群用户列表弹窗 */}
      <Modal
        title={`${selectedSegment?.name} - 用户列表`}
        open={isUserListModalVisible}
        onCancel={() => setIsUserListModalVisible(false)}
        footer={[
          <Button key="export">导出用户</Button>,
          <Button key="message" type="primary">发送消息</Button>,
          <Button key="close" onClick={() => setIsUserListModalVisible(false)}>
            关闭
          </Button>,
        ]}
        width={1000}
      >
        <Table
          columns={userColumns}
          dataSource={segmentUsers}
          rowKey="id"
          size="small"
          pagination={{
            total: segmentUsers.length,
            pageSize: 5,
            showSizeChanger: false,
            showQuickJumper: false,
          }}
        />
      </Modal>
    </div>
  );
};

export default UserSegmentation;