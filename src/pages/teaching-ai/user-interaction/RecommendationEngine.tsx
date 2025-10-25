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
  Switch,
  Slider,
  Progress,
  Avatar,
  Tooltip,
  Badge,
  Tabs,
  List,
  Rate,
} from 'antd';
import {
  RobotOutlined,
  UserOutlined,
  SettingOutlined,
  BarChartOutlined,
  BulbOutlined,
  HeartOutlined,
  EyeOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  StarOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

interface RecommendationStrategy {
  id: string;
  name: string;
  type: 'content' | 'collaborative' | 'hybrid';
  status: 'active' | 'inactive';
  accuracy: number;
  coverage: number;
  diversity: number;
  description: string;
  parameters: Record<string, any>;
}

interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  interests: string[];
  behavior: {
    viewTime: number;
    completionRate: number;
    interactionCount: number;
  };
  preferences: {
    difficulty: string;
    topics: string[];
    format: string[];
  };
  recommendations: {
    total: number;
    clicked: number;
    completed: number;
  };
}

const RecommendationEngine: React.FC = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<RecommendationStrategy | null>(null);
  const [isStrategyModalVisible, setIsStrategyModalVisible] = useState(false);
  const [isUserProfileModalVisible, setIsUserProfileModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [form] = Form.useForm();

  // 模拟推荐策略数据
  const strategyData: RecommendationStrategy[] = [
    {
      id: '1',
      name: '基于内容的推荐',
      type: 'content',
      status: 'active',
      accuracy: 85,
      coverage: 78,
      diversity: 65,
      description: '根据用户历史学习内容的特征进行相似内容推荐',
      parameters: {
        similarity_threshold: 0.7,
        max_recommendations: 10,
        content_weight: 0.8,
      },
    },
    {
      id: '2',
      name: '协同过滤推荐',
      type: 'collaborative',
      status: 'active',
      accuracy: 78,
      coverage: 85,
      diversity: 72,
      description: '基于相似用户的学习行为进行推荐',
      parameters: {
        user_similarity_threshold: 0.6,
        min_common_items: 5,
        neighbor_size: 50,
      },
    },
    {
      id: '3',
      name: '混合推荐策略',
      type: 'hybrid',
      status: 'inactive',
      accuracy: 92,
      coverage: 88,
      diversity: 80,
      description: '结合多种推荐算法的混合策略',
      parameters: {
        content_weight: 0.4,
        collaborative_weight: 0.4,
        popularity_weight: 0.2,
      },
    },
  ];

  // 模拟用户画像数据
  const userProfileData: UserProfile[] = [
    {
      id: 'U001',
      name: '张三',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1',
      interests: ['机器学习', '深度学习', 'Python编程'],
      behavior: {
        viewTime: 120,
        completionRate: 85,
        interactionCount: 45,
      },
      preferences: {
        difficulty: '中级',
        topics: ['AI算法', '数据科学', '编程实战'],
        format: ['视频课程', '实战项目'],
      },
      recommendations: {
        total: 50,
        clicked: 35,
        completed: 28,
      },
    },
    {
      id: 'U002',
      name: '李四',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2',
      interests: ['自然语言处理', '计算机视觉'],
      behavior: {
        viewTime: 95,
        completionRate: 72,
        interactionCount: 32,
      },
      preferences: {
        difficulty: '高级',
        topics: ['NLP', 'CV', '模型优化'],
        format: ['理论课程', '论文解读'],
      },
      recommendations: {
        total: 42,
        clicked: 28,
        completed: 20,
      },
    },
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      content: 'blue',
      collaborative: 'green',
      hybrid: 'purple',
    };
    return colors[type as keyof typeof colors];
  };

  const getTypeText = (type: string) => {
    const texts = {
      content: '基于内容',
      collaborative: '协同过滤',
      hybrid: '混合策略',
    };
    return texts[type as keyof typeof texts];
  };

  const strategyColumns: ColumnsType<RecommendationStrategy> = [
    {
      title: '策略名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <RobotOutlined style={{ color: '#1890ff' }} />
          <div>
            <div style={{ fontWeight: 'bold' }}>{text}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {record.description}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={getTypeColor(type)}>{getTypeText(type)}</Tag>
      ),
    },
    {
      title: '准确率',
      dataIndex: 'accuracy',
      key: 'accuracy',
      render: (accuracy) => (
        <div>
          <Progress
            percent={accuracy}
            size="small"
            strokeColor={accuracy >= 80 ? '#52c41a' : accuracy >= 60 ? '#fa8c16' : '#ff4d4f'}
          />
          <Text style={{ fontSize: '12px' }}>{accuracy}%</Text>
        </div>
      ),
    },
    {
      title: '覆盖率',
      dataIndex: 'coverage',
      key: 'coverage',
      render: (coverage) => (
        <div>
          <Progress
            percent={coverage}
            size="small"
            strokeColor={coverage >= 80 ? '#52c41a' : coverage >= 60 ? '#fa8c16' : '#ff4d4f'}
          />
          <Text style={{ fontSize: '12px' }}>{coverage}%</Text>
        </div>
      ),
    },
    {
      title: '多样性',
      dataIndex: 'diversity',
      key: 'diversity',
      render: (diversity) => (
        <div>
          <Progress
            percent={diversity}
            size="small"
            strokeColor={diversity >= 80 ? '#52c41a' : diversity >= 60 ? '#fa8c16' : '#ff4d4f'}
          />
          <Text style={{ fontSize: '12px' }}>{diversity}%</Text>
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
            onClick={() => handleEditStrategy(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => handleViewStrategy(record)}
          >
            查看详情
          </Button>
        </Space>
      ),
    },
  ];

  const userColumns: ColumnsType<UserProfile> = [
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
              ID: {record.id}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: '兴趣标签',
      dataIndex: 'interests',
      key: 'interests',
      render: (interests: string[]) => (
        <Space wrap>
          {interests.slice(0, 3).map((interest, index) => (
            <Tag key={index} color="blue" style={{ fontSize: '12px' }}>
              {interest}
            </Tag>
          ))}
          {interests.length > 3 && <Text type="secondary">+{interests.length - 3}</Text>}
        </Space>
      ),
    },
    {
      title: '学习行为',
      key: 'behavior',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Text style={{ fontSize: '12px' }}>
            <EyeOutlined /> 观看时长: {record.behavior.viewTime}h
          </Text>
          <Text style={{ fontSize: '12px' }}>
            <TrophyOutlined /> 完成率: {record.behavior.completionRate}%
          </Text>
        </Space>
      ),
    },
    {
      title: '推荐效果',
      key: 'recommendations',
      render: (_, record) => {
        const clickRate = Math.round((record.recommendations.clicked / record.recommendations.total) * 100);
        const completionRate = Math.round((record.recommendations.completed / record.recommendations.clicked) * 100);
        return (
          <Space direction="vertical" size="small">
            <Text style={{ fontSize: '12px' }}>
              点击率: {clickRate}%
            </Text>
            <Text style={{ fontSize: '12px' }}>
              完成率: {completionRate}%
            </Text>
          </Space>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button
          type="link"
          size="small"
          onClick={() => handleViewUserProfile(record)}
        >
          查看画像
        </Button>
      ),
    },
  ];

  const handleEditStrategy = (strategy: RecommendationStrategy) => {
    setSelectedStrategy(strategy);
    form.setFieldsValue(strategy);
    setIsStrategyModalVisible(true);
  };

  const handleViewStrategy = (strategy: RecommendationStrategy) => {
    setSelectedStrategy(strategy);
    setIsStrategyModalVisible(true);
  };

  const handleViewUserProfile = (user: UserProfile) => {
    setSelectedUser(user);
    setIsUserProfileModalVisible(true);
  };

  const handleStrategySubmit = () => {
    form.validateFields().then((values) => {
      console.log('Strategy values:', values);
      setIsStrategyModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <div style={{ padding: '32px 40px', background: '#f5f5f5', minHeight: 'calc(100vh - 64px)' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>
          <BulbOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          个性化推荐引擎
        </Title>
        <Text type="secondary">智能推荐算法配置与用户画像分析</Text>
      </div>

      {/* 推荐效果概览 */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <ThunderboltOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
              <div style={{ marginTop: '12px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                  87.5%
                </div>
                <div style={{ color: '#666', marginTop: '4px' }}>平均准确率</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <EyeOutlined style={{ fontSize: '32px', color: '#52c41a' }} />
              <div style={{ marginTop: '12px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                  68.2%
                </div>
                <div style={{ color: '#666', marginTop: '4px' }}>点击率</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <TrophyOutlined style={{ fontSize: '32px', color: '#fa8c16' }} />
              <div style={{ marginTop: '12px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fa8c16' }}>
                  45.3%
                </div>
                <div style={{ color: '#666', marginTop: '4px' }}>转化率</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <StarOutlined style={{ fontSize: '32px', color: '#722ed1' }} />
              <div style={{ marginTop: '12px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#722ed1' }}>
                  4.6
                </div>
                <div style={{ color: '#666', marginTop: '4px' }}>用户满意度</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="strategies">
        <TabPane tab="推荐策略" key="strategies">
          <Card
            title="推荐策略管理"
            extra={
              <Button type="primary" onClick={() => setIsStrategyModalVisible(true)}>
                新增策略
              </Button>
            }
          >
            <Table
              columns={strategyColumns}
              dataSource={strategyData}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </TabPane>

        <TabPane tab="用户画像" key="profiles">
          <Card title="用户画像分析">
            <Table
              columns={userColumns}
              dataSource={userProfileData}
              rowKey="id"
              pagination={{
                total: userProfileData.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="效果分析" key="analytics">
          <Row gutter={16}>
            <Col span={12}>
              <Card title="推荐效果趋势">
                <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text type="secondary">推荐效果趋势图表</Text>
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="用户行为分析">
                <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text type="secondary">用户行为分析图表</Text>
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      {/* 策略配置弹窗 */}
      <Modal
        title={selectedStrategy ? '编辑推荐策略' : '新增推荐策略'}
        open={isStrategyModalVisible}
        onOk={handleStrategySubmit}
        onCancel={() => setIsStrategyModalVisible(false)}
        okText="保存"
        cancelText="取消"
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="策略名称"
            rules={[{ required: true, message: '请输入策略名称' }]}
          >
            <Input placeholder="请输入策略名称" />
          </Form.Item>
          
          <Form.Item
            name="type"
            label="推荐类型"
            rules={[{ required: true, message: '请选择推荐类型' }]}
          >
            <Select placeholder="请选择推荐类型">
              <Option value="content">基于内容</Option>
              <Option value="collaborative">协同过滤</Option>
              <Option value="hybrid">混合策略</Option>
            </Select>
          </Form.Item>
          
          <Form.Item name="status" label="启用状态" valuePropName="checked">
            <Switch checkedChildren="启用" unCheckedChildren="禁用" />
          </Form.Item>
          
          <Form.Item name="description" label="策略描述">
            <Input.TextArea rows={3} placeholder="请输入策略描述" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 用户画像详情弹窗 */}
      <Modal
        title="用户画像详情"
        open={isUserProfileModalVisible}
        onCancel={() => setIsUserProfileModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsUserProfileModalVisible(false)}>
            关闭
          </Button>,
        ]}
        width={700}
      >
        {selectedUser && (
          <div>
            <Row gutter={16}>
              <Col span={8}>
                <Card size="small" title="基本信息">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ textAlign: 'center' }}>
                      <Avatar size={64} src={selectedUser.avatar} icon={<UserOutlined />} />
                      <div style={{ marginTop: '8px', fontWeight: 'bold' }}>
                        {selectedUser.name}
                      </div>
                      <Text type="secondary">{selectedUser.id}</Text>
                    </div>
                  </Space>
                </Card>
              </Col>
              <Col span={16}>
                <Card size="small" title="学习偏好">
                  <Space direction="vertical" style={{ width: '100%' }} size="middle">
                    <div>
                      <Text strong>难度偏好：</Text>
                      <Tag color="blue">{selectedUser.preferences.difficulty}</Tag>
                    </div>
                    <div>
                      <Text strong>兴趣主题：</Text>
                      <div style={{ marginTop: '4px' }}>
                        {selectedUser.preferences.topics.map((topic, index) => (
                          <Tag key={index} color="green" style={{ marginBottom: '4px' }}>
                            {topic}
                          </Tag>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Text strong>内容格式：</Text>
                      <div style={{ marginTop: '4px' }}>
                        {selectedUser.preferences.format.map((format, index) => (
                          <Tag key={index} color="orange" style={{ marginBottom: '4px' }}>
                            {format}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  </Space>
                </Card>
              </Col>
            </Row>
            
            <Row gutter={16} style={{ marginTop: '16px' }}>
              <Col span={12}>
                <Card size="small" title="学习行为">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                      <Text>观看时长</Text>
                      <div style={{ marginTop: '4px' }}>
                        <Progress percent={Math.min(selectedUser.behavior.viewTime / 2, 100)} />
                        <Text style={{ fontSize: '12px' }}>{selectedUser.behavior.viewTime}小时</Text>
                      </div>
                    </div>
                    <div>
                      <Text>完成率</Text>
                      <div style={{ marginTop: '4px' }}>
                        <Progress percent={selectedUser.behavior.completionRate} />
                        <Text style={{ fontSize: '12px' }}>{selectedUser.behavior.completionRate}%</Text>
                      </div>
                    </div>
                    <div>
                      <Text>互动次数</Text>
                      <div style={{ marginTop: '4px' }}>
                        <Progress percent={Math.min(selectedUser.behavior.interactionCount * 2, 100)} />
                        <Text style={{ fontSize: '12px' }}>{selectedUser.behavior.interactionCount}次</Text>
                      </div>
                    </div>
                  </Space>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" title="推荐效果">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                      <Text>推荐总数：</Text>
                      <Text strong>{selectedUser.recommendations.total}</Text>
                    </div>
                    <div>
                      <Text>点击数：</Text>
                      <Text strong>{selectedUser.recommendations.clicked}</Text>
                      <Text type="secondary" style={{ marginLeft: '8px' }}>
                        ({Math.round((selectedUser.recommendations.clicked / selectedUser.recommendations.total) * 100)}%)
                      </Text>
                    </div>
                    <div>
                      <Text>完成数：</Text>
                      <Text strong>{selectedUser.recommendations.completed}</Text>
                      <Text type="secondary" style={{ marginLeft: '8px' }}>
                        ({Math.round((selectedUser.recommendations.completed / selectedUser.recommendations.clicked) * 100)}%)
                      </Text>
                    </div>
                  </Space>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RecommendationEngine;