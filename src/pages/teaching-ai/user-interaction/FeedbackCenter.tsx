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
  Rate,
  DatePicker,
  Statistic,
  Progress,
  Avatar,
  Tooltip,
  Badge,
} from 'antd';
import {
  MessageOutlined,
  StarOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  TrophyOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface FeedbackItem {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  type: 'suggestion' | 'complaint' | 'praise' | 'bug';
  title: string;
  content: string;
  rating: number;
  status: 'pending' | 'processing' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  createTime: string;
  updateTime: string;
  assignee?: string;
  response?: string;
}

const FeedbackCenter: React.FC = () => {
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isResponseModalVisible, setIsResponseModalVisible] = useState(false);
  const [form] = Form.useForm();

  // 模拟数据
  const feedbackData: FeedbackItem[] = [
    {
      id: '1',
      userId: 'U001',
      userName: '张三',
      userAvatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1',
      type: 'suggestion',
      title: '希望增加更多AI实战案例',
      content: '目前的课程理论较多，希望能增加更多实际项目案例，帮助理解和应用。',
      rating: 4,
      status: 'pending',
      priority: 'medium',
      category: '课程内容',
      createTime: '2024-01-15 14:30:00',
      updateTime: '2024-01-15 14:30:00',
    },
    {
      id: '2',
      userId: 'U002',
      userName: '李四',
      userAvatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2',
      type: 'complaint',
      title: '视频播放卡顿问题',
      content: '在观看视频课程时经常出现卡顿，影响学习体验。',
      rating: 2,
      status: 'processing',
      priority: 'high',
      category: '技术问题',
      createTime: '2024-01-14 09:15:00',
      updateTime: '2024-01-15 10:20:00',
      assignee: '技术支持小组',
    },
    {
      id: '3',
      userId: 'U003',
      userName: '王五',
      userAvatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
      type: 'praise',
      title: '课程质量很高',
      content: '老师讲解很清晰，课程内容很实用，学到了很多东西。',
      rating: 5,
      status: 'resolved',
      priority: 'low',
      category: '课程质量',
      createTime: '2024-01-13 16:45:00',
      updateTime: '2024-01-14 11:30:00',
      assignee: '客服小王',
      response: '感谢您的好评，我们会继续努力提供更好的课程内容！',
    },
  ];

  const getTypeIcon = (type: string) => {
    const icons = {
      suggestion: <MessageOutlined style={{ color: '#1890ff' }} />,
      complaint: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
      praise: <HeartOutlined style={{ color: '#52c41a' }} />,
      bug: <ExclamationCircleOutlined style={{ color: '#fa8c16' }} />,
    };
    return icons[type as keyof typeof icons];
  };

  const getTypeText = (type: string) => {
    const texts = {
      suggestion: '建议',
      complaint: '投诉',
      praise: '表扬',
      bug: '问题反馈',
    };
    return texts[type as keyof typeof texts];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'orange',
      processing: 'blue',
      resolved: 'green',
      closed: 'gray',
    };
    return colors[status as keyof typeof colors];
  };

  const getStatusText = (status: string) => {
    const texts = {
      pending: '待处理',
      processing: '处理中',
      resolved: '已解决',
      closed: '已关闭',
    };
    return texts[status as keyof typeof texts];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'green',
      medium: 'orange',
      high: 'red',
      urgent: 'purple',
    };
    return colors[priority as keyof typeof colors];
  };

  const getPriorityText = (priority: string) => {
    const texts = {
      low: '低',
      medium: '中',
      high: '高',
      urgent: '紧急',
    };
    return texts[priority as keyof typeof texts];
  };

  const columns: ColumnsType<FeedbackItem> = [
    {
      title: '用户信息',
      dataIndex: 'userName',
      key: 'userName',
      render: (text, record) => (
        <Space>
          <Avatar src={record.userAvatar} icon={<UserOutlined />} />
          <div>
            <div>{text}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              ID: {record.userId}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: '反馈信息',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space direction="vertical" size="small">
          <Space>
            {getTypeIcon(record.type)}
            <Text strong>{text}</Text>
          </Space>
          <Space>
            <Tag color="blue">{record.category}</Tag>
            <Tag color={getPriorityColor(record.priority)}>
              {getPriorityText(record.priority)}优先级
            </Tag>
          </Space>
        </Space>
      ),
    },
    {
      title: '评分',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => <Rate disabled value={rating} style={{ fontSize: '14px' }} />,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
    },
    {
      title: '处理人',
      dataIndex: 'assignee',
      key: 'assignee',
      render: (assignee) => assignee || '-',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (time) => dayjs(time).format('MM-DD HH:mm'),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            size="small"
            onClick={() => handleViewDetail(record)}
          >
            查看详情
          </Button>
          {record.status !== 'resolved' && record.status !== 'closed' && (
            <Button
              type="link"
              size="small"
              onClick={() => handleResponse(record)}
            >
              回复处理
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const handleViewDetail = (feedback: FeedbackItem) => {
    setSelectedFeedback(feedback);
    setIsDetailModalVisible(true);
  };

  const handleResponse = (feedback: FeedbackItem) => {
    setSelectedFeedback(feedback);
    form.setFieldsValue({
      status: feedback.status,
      assignee: feedback.assignee,
    });
    setIsResponseModalVisible(true);
  };

  const handleResponseSubmit = () => {
    form.validateFields().then((values) => {
      console.log('Response values:', values);
      setIsResponseModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <div style={{ padding: '32px 40px', background: '#f5f5f5', minHeight: 'calc(100vh - 64px)' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>
          <MessageOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          用户反馈中心
        </Title>
        <Text type="secondary">收集、处理和分析用户反馈，持续改进产品和服务</Text>
      </div>

      {/* 统计概览 */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总反馈数"
              value={1234}
              prefix={<MessageOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="待处理"
              value={45}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="已解决"
              value={1156}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="满意度"
              value={4.2}
              suffix="/ 5.0"
              prefix={<StarOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 反馈类型分布 */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={12}>
          <Card title="反馈类型分布" extra={<Button size="small">查看详情</Button>}>
            <Row gutter={16}>
              <Col span={12}>
                <div style={{ textAlign: 'center', padding: '16px' }}>
                  <MessageOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>456</div>
                    <div style={{ color: '#666' }}>建议</div>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ textAlign: 'center', padding: '16px' }}>
                  <ExclamationCircleOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>123</div>
                    <div style={{ color: '#666' }}>投诉</div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <div style={{ textAlign: 'center', padding: '16px' }}>
                  <HeartOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>567</div>
                    <div style={{ color: '#666' }}>表扬</div>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ textAlign: 'center', padding: '16px' }}>
                  <ExclamationCircleOutlined style={{ fontSize: '24px', color: '#fa8c16' }} />
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>88</div>
                    <div style={{ color: '#666' }}>问题反馈</div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="处理效率" extra={<Button size="small">查看详情</Button>}>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <div>
                <div style={{ marginBottom: '8px' }}>
                  <Text>平均响应时间</Text>
                  <Text strong style={{ float: 'right' }}>2.5小时</Text>
                </div>
                <Progress percent={85} strokeColor="#52c41a" />
              </div>
              <div>
                <div style={{ marginBottom: '8px' }}>
                  <Text>平均解决时间</Text>
                  <Text strong style={{ float: 'right' }}>1.2天</Text>
                </div>
                <Progress percent={78} strokeColor="#1890ff" />
              </div>
              <div>
                <div style={{ marginBottom: '8px' }}>
                  <Text>解决率</Text>
                  <Text strong style={{ float: 'right' }}>94%</Text>
                </div>
                <Progress percent={94} strokeColor="#722ed1" />
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* 反馈列表 */}
      <Card title="反馈列表" extra={<Text type="secondary">共 {feedbackData.length} 条反馈</Text>}>
        <Table
          columns={columns}
          dataSource={feedbackData}
          rowKey="id"
          pagination={{
            total: feedbackData.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
          }}
        />
      </Card>

      {/* 反馈详情弹窗 */}
      <Modal
        title="反馈详情"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
            关闭
          </Button>,
        ]}
        width={600}
      >
        {selectedFeedback && (
          <div>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <div>
                <Space>
                  <Avatar src={selectedFeedback.userAvatar} icon={<UserOutlined />} />
                  <div>
                    <Text strong>{selectedFeedback.userName}</Text>
                    <br />
                    <Text type="secondary">{selectedFeedback.userId}</Text>
                  </div>
                </Space>
              </div>
              
              <div>
                <Space>
                  {getTypeIcon(selectedFeedback.type)}
                  <Text strong style={{ fontSize: '16px' }}>{selectedFeedback.title}</Text>
                </Space>
                <div style={{ marginTop: '8px' }}>
                  <Space>
                    <Tag color="blue">{selectedFeedback.category}</Tag>
                    <Tag color={getPriorityColor(selectedFeedback.priority)}>
                      {getPriorityText(selectedFeedback.priority)}优先级
                    </Tag>
                    <Tag color={getStatusColor(selectedFeedback.status)}>
                      {getStatusText(selectedFeedback.status)}
                    </Tag>
                  </Space>
                </div>
              </div>

              <div>
                <Text strong>评分：</Text>
                <Rate disabled value={selectedFeedback.rating} />
              </div>

              <div>
                <Text strong>反馈内容：</Text>
                <Paragraph style={{ marginTop: '8px', padding: '12px', background: '#f5f5f5', borderRadius: '6px' }}>
                  {selectedFeedback.content}
                </Paragraph>
              </div>

              {selectedFeedback.response && (
                <div>
                  <Text strong>处理回复：</Text>
                  <Paragraph style={{ marginTop: '8px', padding: '12px', background: '#e6f7ff', borderRadius: '6px' }}>
                    {selectedFeedback.response}
                  </Paragraph>
                </div>
              )}

              <div>
                <Row>
                  <Col span={12}>
                    <Text type="secondary">创建时间：{selectedFeedback.createTime}</Text>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">更新时间：{selectedFeedback.updateTime}</Text>
                  </Col>
                </Row>
              </div>
            </Space>
          </div>
        )}
      </Modal>

      {/* 回复处理弹窗 */}
      <Modal
        title="回复处理"
        open={isResponseModalVisible}
        onOk={handleResponseSubmit}
        onCancel={() => setIsResponseModalVisible(false)}
        okText="提交"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="status" label="处理状态">
            <Select>
              <Option value="processing">处理中</Option>
              <Option value="resolved">已解决</Option>
              <Option value="closed">已关闭</Option>
            </Select>
          </Form.Item>
          
          <Form.Item name="assignee" label="指派给">
            <Input placeholder="请输入处理人" />
          </Form.Item>
          
          <Form.Item
            name="response"
            label="回复内容"
            rules={[{ required: true, message: '请输入回复内容' }]}
          >
            <TextArea rows={4} placeholder="请输入回复内容" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FeedbackCenter;