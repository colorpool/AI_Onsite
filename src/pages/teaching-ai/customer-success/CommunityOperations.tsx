import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
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
  Avatar,
  List,
  Badge,
  Tooltip,
  Typography,
  Statistic,
  Progress,
  Timeline,
  Rate,
  Divider,
  Alert,
  Upload,
  Switch,
} from 'antd';
import {
  TeamOutlined,
  MessageOutlined,
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
  UserOutlined,
  CommentOutlined,
  HeartOutlined,
  ShareAltOutlined,
  BellOutlined,
  CalendarOutlined,
  TrophyOutlined,
  FireOutlined,
  UploadOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;

// 样式定义
const cardStyle = {
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  border: '1px solid #f0f0f0',
  background: '#ffffff',
  marginBottom: '16px',
};

// 数据接口定义
interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  createTime: string;
  category: string;
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  status: 'published' | 'draft' | 'reviewing';
  isTop: boolean;
  isHot: boolean;
}

interface CommunityActivity {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  participants: number;
  maxParticipants: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  organizer: string;
  category: string;
}

interface CommunityMember {
  id: string;
  username: string;
  avatar: string;
  level: number;
  points: number;
  joinDate: string;
  lastActive: string;
  postsCount: number;
  commentsCount: number;
  status: 'active' | 'inactive' | 'banned';
  role: 'member' | 'moderator' | 'admin';
}

const CommunityOperations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'post' | 'activity' | 'announcement'>('post');
  const [form] = Form.useForm();

  // 模拟数据 - 企业培训平台视角
  const communityStats = [
    { title: '企业员工', value: 1247, prefix: <UserOutlined />, color: '#1890ff' },
    { title: '今日活跃', value: 342, prefix: <FireOutlined />, color: '#52c41a' },
    { title: '公司活动', value: 28, prefix: <CalendarOutlined />, color: '#faad14' },
    { title: '积分兑换', value: 156, prefix: <TrophyOutlined />, color: '#f5222d' },
  ];

  const mockPosts: CommunityPost[] = [
    {
      id: '1',
      title: '钉学科技2024年度AI闭门会邀请函',
      content: '诚邀贵公司参加钉学科技主办的AI技术闭门会，分享最新AI应用案例...',
      author: '钉学科技运营部',
      authorAvatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=dingxue',
      createTime: '2024-01-15 14:30',
      category: '公司活动',
      tags: ['闭门会', 'AI技术', '邀请函'],
      likes: 89,
      comments: 12,
      shares: 25,
      status: 'published',
      isTop: true,
      isHot: true,
    },
    {
      id: '2',
      title: '《AI企业应用白皮书》免费下载',
      content: '钉学科技最新发布的AI企业应用白皮书，包含50+实际案例...',
      author: '钉学科技研究院',
      authorAvatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=research',
      createTime: '2024-01-14 16:45',
      category: '资料下载',
      tags: ['白皮书', 'AI应用', '免费下载'],
      likes: 156,
      comments: 23,
      shares: 67,
      status: 'published',
      isTop: false,
      isHot: true,
    },
    {
      id: '3',
      title: '积分打卡活动：每日学习赢积分',
      content: '参与每日AI知识打卡，连续7天可获得500积分，可兑换精美礼品...',
      author: '钉学科技活动组',
      authorAvatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=activity',
      createTime: '2024-01-13 10:20',
      category: '积分活动',
      tags: ['积分', '打卡', '礼品兑换'],
      likes: 234,
      comments: 45,
      shares: 89,
      status: 'published',
      isTop: false,
      isHot: false,
    },
    {
      id: '4',
      title: 'AI技术沙龙：北京站报名开启',
      content: '钉学科技将在北京举办AI技术沙龙，邀请行业专家分享最新技术趋势...',
      author: '钉学科技活动部',
      authorAvatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=salon',
      createTime: '2024-01-12 09:30',
      category: '线下活动',
      tags: ['技术沙龙', '北京', '专家分享'],
      likes: 67,
      comments: 18,
      shares: 34,
      status: 'published',
      isTop: false,
      isHot: false,
    },
  ];

  const mockActivities: CommunityActivity[] = [
    {
      id: '1',
      title: '钉学科技AI闭门会',
      description: '邀请企业高管参与AI技术闭门交流会，分享行业最佳实践',
      startTime: '2024-01-20 14:00',
      endTime: '2024-01-20 17:00',
      participants: 45,
      maxParticipants: 50,
      status: 'upcoming',
      organizer: '钉学科技运营部',
      category: '闭门会',
    },
    {
      id: '2',
      title: '积分兑换礼品活动',
      description: '使用积分兑换钉学科技定制礼品，包括AI书籍、文创用品等',
      startTime: '2024-01-15 00:00',
      endTime: '2024-01-31 23:59',
      participants: 128,
      maxParticipants: 200,
      status: 'ongoing',
      organizer: '钉学科技客服部',
      category: '积分活动',
    },
    {
      id: '3',
      title: 'AI白皮书发布会',
      description: '钉学科技《2024年AI企业应用白皮书》线上发布会',
      startTime: '2024-01-10 15:00',
      endTime: '2024-01-10 16:30',
      participants: 234,
      maxParticipants: 300,
      status: 'completed',
      organizer: '钉学科技研究院',
      category: '产品发布',
    },
    {
      id: '4',
      title: '企业AI培训方案推介会',
      description: '面向企业客户的AI培训解决方案推介和答疑',
      startTime: '2024-01-25 10:00',
      endTime: '2024-01-25 12:00',
      participants: 12,
      maxParticipants: 30,
      status: 'upcoming',
      organizer: '钉学科技销售部',
      category: '方案推介',
    },
  ];

  const mockMembers: CommunityMember[] = [
    {
      id: '1',
      username: '北京科技有限公司-张经理',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=zhang-manager',
      level: 8,
      points: 2450,
      joinDate: '2023-06-15',
      lastActive: '2024-01-15 14:30',
      postsCount: 12,
      commentsCount: 45,
      status: 'active',
      role: 'admin',
    },
    {
      id: '2',
      username: '北京科技有限公司-李培训师',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=li-trainer',
      level: 6,
      points: 1890,
      joinDate: '2023-08-20',
      lastActive: '2024-01-15 10:20',
      postsCount: 8,
      commentsCount: 32,
      status: 'active',
      role: 'moderator',
    },
    {
      id: '3',
      username: '北京科技有限公司-王员工',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=wang-employee',
      level: 4,
      points: 1250,
      joinDate: '2023-10-10',
      lastActive: '2024-01-14 16:45',
      postsCount: 5,
      commentsCount: 18,
      status: 'active',
      role: 'member',
    },
    {
      id: '4',
      username: '北京科技有限公司-赵主管',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=zhao-supervisor',
      level: 7,
      points: 2100,
      joinDate: '2023-07-05',
      lastActive: '2024-01-13 09:15',
      postsCount: 15,
      commentsCount: 67,
      status: 'active',
      role: 'moderator',
    },
  ];

  // 表格列定义
  const postColumns: ColumnsType<CommunityPost> = [
    {
      title: '帖子信息',
      key: 'post',
      render: (_, record) => (
        <div>
          <Space>
            <Avatar src={record.authorAvatar} size="small" />
            <div>
              <div style={{ fontWeight: 500 }}>
                {record.isTop && <Tag color="red">置顶</Tag>}
                {record.isHot && <Tag color="orange">热门</Tag>}
                {record.title}
              </div>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {record.author} · {record.createTime}
              </Text>
            </div>
          </Space>
        </div>
      ),
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (category) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: '互动数据',
      key: 'interaction',
      render: (_, record) => (
        <Space>
          <Tooltip title="点赞">
            <Space size={4}>
              <HeartOutlined />
              {record.likes}
            </Space>
          </Tooltip>
          <Tooltip title="评论">
            <Space size={4}>
              <CommentOutlined />
              {record.comments}
            </Space>
          </Tooltip>
          <Tooltip title="分享">
            <Space size={4}>
              <ShareAltOutlined />
              {record.shares}
            </Space>
          </Tooltip>
        </Space>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusConfig: Record<string, { color: string; text: string }> = {
          published: { color: 'green', text: '已发布' },
          draft: { color: 'orange', text: '草稿' },
          reviewing: { color: 'blue', text: '审核中' },
        };
        const config = statusConfig[status];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link" size="small" icon={<EyeOutlined />}>
            查看
          </Button>
          <Button type="link" size="small" icon={<EditOutlined />}>
            编辑
          </Button>
          <Button type="link" size="small" icon={<DeleteOutlined />} danger>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const activityColumns: ColumnsType<CommunityActivity> = [
    {
      title: '活动信息',
      key: 'activity',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{record.title}</div>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.description}
          </Text>
        </div>
      ),
    },
    {
      title: '时间',
      key: 'time',
      render: (_, record) => (
        <div>
          <div>{record.startTime}</div>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            至 {record.endTime}
          </Text>
        </div>
      ),
    },
    {
      title: '参与情况',
      key: 'participants',
      render: (_, record) => (
        <div>
          <Progress
            percent={(record.participants / record.maxParticipants) * 100}
            size="small"
            format={() => `${record.participants}/${record.maxParticipants}`}
          />
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusConfig: Record<string, { color: string; text: string }> = {
          upcoming: { color: 'blue', text: '即将开始' },
          ongoing: { color: 'green', text: '进行中' },
          completed: { color: 'default', text: '已结束' },
          cancelled: { color: 'red', text: '已取消' },
        };
        const config = statusConfig[status];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link" size="small" icon={<EyeOutlined />}>
            查看
          </Button>
          <Button type="link" size="small" icon={<EditOutlined />}>
            编辑
          </Button>
          <Button type="link" size="small" icon={<DeleteOutlined />} danger>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const memberColumns: ColumnsType<CommunityMember> = [
    {
      title: '用户信息',
      key: 'user',
      render: (_, record) => (
        <Space>
          <Badge dot={record.status === 'active'}>
            <Avatar src={record.avatar} />
          </Badge>
          <div>
            <div style={{ fontWeight: 500 }}>
              {record.username}
              {record.role === 'admin' && <Tag color="red">管理员</Tag>}
              {record.role === 'moderator' && <Tag color="orange">版主</Tag>}
            </div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              等级 {record.level} · {record.points} 积分
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: '活跃度',
      key: 'activity',
      render: (_, record) => (
        <div>
          <div>帖子: {record.postsCount}</div>
          <div>评论: {record.commentsCount}</div>
        </div>
      ),
    },
    {
      title: '最后活跃',
      dataIndex: 'lastActive',
      key: 'lastActive',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusConfig: Record<string, { color: string; text: string }> = {
          active: { color: 'green', text: '活跃' },
          inactive: { color: 'orange', text: '不活跃' },
          banned: { color: 'red', text: '已封禁' },
        };
        const config = statusConfig[status];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link" size="small" icon={<MessageOutlined />}>
            私信
          </Button>
          <Button type="link" size="small" icon={<EditOutlined />}>
            编辑
          </Button>
        </Space>
      ),
    },
  ];

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      console.log('Form values:', values);
      message.success('操作成功！');
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const showModal = (type: 'post' | 'activity' | 'announcement') => {
    setModalType(type);
    setIsModalVisible(true);
  };

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, color: '#262626' }}>
          运营交流社区
        </Title>
        <Text type="secondary">
          北京科技有限公司企业培训平台 - 发布公司活动、管理资料下载、组织积分活动
        </Text>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        {communityStats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card style={cardStyle}>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.prefix}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="公司活动发布" key="posts">
          <Card style={cardStyle}>
            <div style={{ marginBottom: '16px' }}>
              <Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal('post')}>
                  发布活动
                </Button>
                <Button icon={<NotificationOutlined />} onClick={() => showModal('announcement')}>
                  发布公告
                </Button>
                <Button icon={<UploadOutlined />}>
                  上传资料
                </Button>
                <Input.Search
                  placeholder="搜索活动内容"
                  style={{ width: 300 }}
                  onSearch={(value) => console.log(value)}
                />
                <Select placeholder="选择分类" style={{ width: 120 }}>
                  <Option value="all">全部</Option>
                  <Option value="company">公司活动</Option>
                  <Option value="download">资料下载</Option>
                  <Option value="points">积分活动</Option>
                  <Option value="offline">线下活动</Option>
                </Select>
              </Space>
            </div>
            <Table
              columns={postColumns}
              dataSource={mockPosts}
              rowKey="id"
              pagination={{
                total: 156,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `共 ${total} 条记录`,
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="积分活动管理" key="activities">
          <Card style={cardStyle}>
            <div style={{ marginBottom: '16px' }}>
              <Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal('activity')}>
                  创建积分活动
                </Button>
                <Button icon={<TrophyOutlined />}>
                  积分礼品管理
                </Button>
                <Input.Search
                  placeholder="搜索活动"
                  style={{ width: 300 }}
                  onSearch={(value) => console.log(value)}
                />
                <Select placeholder="活动状态" style={{ width: 120 }}>
                  <Option value="all">全部</Option>
                  <Option value="upcoming">即将开始</Option>
                  <Option value="ongoing">进行中</Option>
                  <Option value="completed">已结束</Option>
                </Select>
              </Space>
            </div>
            <Table
              columns={activityColumns}
              dataSource={mockActivities}
              rowKey="id"
              pagination={{
                total: 45,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `共 ${total} 条记录`,
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="企业员工管理" key="members">
          <Card style={cardStyle}>
            <div style={{ marginBottom: '16px' }}>
              <Space>
                <Button type="primary" icon={<PlusOutlined />}>
                  邀请员工
                </Button>
                <Input.Search
                  placeholder="搜索员工"
                  style={{ width: 300 }}
                  onSearch={(value) => console.log(value)}
                />
                <Select placeholder="员工状态" style={{ width: 120 }}>
                  <Option value="all">全部</Option>
                  <Option value="active">活跃</Option>
                  <Option value="inactive">不活跃</Option>
                </Select>
                <Select placeholder="员工角色" style={{ width: 120 }}>
                  <Option value="all">全部</Option>
                  <Option value="member">普通员工</Option>
                  <Option value="moderator">培训管理员</Option>
                  <Option value="admin">企业管理员</Option>
                </Select>
              </Space>
            </div>
            <Table
              columns={memberColumns}
              dataSource={mockMembers}
              rowKey="id"
              pagination={{
                total: 3247,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `共 ${total} 条记录`,
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="平台设置" key="settings">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="企业社区设置" style={cardStyle}>
                <Form layout="vertical">
                  <Form.Item label="企业名称">
                    <Input defaultValue="北京科技有限公司" />
                  </Form.Item>
                  <Form.Item label="社区描述">
                    <TextArea rows={3} defaultValue="专业的企业AI培训交流平台" />
                  </Form.Item>
                  <Form.Item label="新员工自动审核">
                    <Switch defaultChecked />
                  </Form.Item>
                  <Form.Item label="允许匿名发帖">
                    <Switch />
                  </Form.Item>
                  <Form.Item label="积分兑换功能">
                    <Switch defaultChecked />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary">保存设置</Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="积分规则设置" style={cardStyle}>
                <Form layout="vertical">
                  <Form.Item label="每日签到积分">
                    <Input defaultValue="10" suffix="积分" />
                  </Form.Item>
                  <Form.Item label="发布内容积分">
                    <Input defaultValue="20" suffix="积分" />
                  </Form.Item>
                  <Form.Item label="参与活动积分">
                    <Input defaultValue="50" suffix="积分" />
                  </Form.Item>
                  <Form.Item label="积分兑换比例">
                    <Input defaultValue="100" suffix="积分 = 1元" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary">保存规则</Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      {/* 模态框 */}
      <Modal
        title={
          modalType === 'post' ? '发布帖子' :
          modalType === 'activity' ? '创建活动' : '发布公告'
        }
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
      >
        <Form form={form} layout="vertical">
          {modalType === 'post' && (
            <>
              <Form.Item name="title" label="帖子标题" rules={[{ required: true }]}>
                <Input placeholder="请输入帖子标题" />
              </Form.Item>
              <Form.Item name="category" label="分类" rules={[{ required: true }]}>
                <Select placeholder="选择分类">
                  <Option value="study">学习心得</Option>
                  <Option value="project">项目实战</Option>
                  <Option value="tech">技术讨论</Option>
                  <Option value="qa">问答求助</Option>
                </Select>
              </Form.Item>
              <Form.Item name="tags" label="标签">
                <Select mode="tags" placeholder="添加标签" />
              </Form.Item>
              <Form.Item name="content" label="内容" rules={[{ required: true }]}>
                <TextArea rows={6} placeholder="请输入帖子内容" />
              </Form.Item>
              <Form.Item name="isTop" valuePropName="checked">
                <Switch /> 设为置顶
              </Form.Item>
            </>
          )}
          
          {modalType === 'activity' && (
            <>
              <Form.Item name="title" label="活动标题" rules={[{ required: true }]}>
                <Input placeholder="请输入活动标题" />
              </Form.Item>
              <Form.Item name="description" label="活动描述" rules={[{ required: true }]}>
                <TextArea rows={3} placeholder="请输入活动描述" />
              </Form.Item>
              <Form.Item name="time" label="活动时间" rules={[{ required: true }]}>
                <RangePicker showTime />
              </Form.Item>
              <Form.Item name="maxParticipants" label="最大参与人数">
                <Input type="number" placeholder="请输入最大参与人数" />
              </Form.Item>
              <Form.Item name="category" label="活动类型">
                <Select placeholder="选择活动类型">
                  <Option value="tech">技术分享</Option>
                  <Option value="training">训练营</Option>
                  <Option value="competition">竞赛</Option>
                  <Option value="social">社交活动</Option>
                </Select>
              </Form.Item>
            </>
          )}

          {modalType === 'announcement' && (
            <>
              <Form.Item name="title" label="公告标题" rules={[{ required: true }]}>
                <Input placeholder="请输入公告标题" />
              </Form.Item>
              <Form.Item name="content" label="公告内容" rules={[{ required: true }]}>
                <TextArea rows={6} placeholder="请输入公告内容" />
              </Form.Item>
              <Form.Item name="priority" label="优先级">
                <Select defaultValue="normal">
                  <Option value="low">低</Option>
                  <Option value="normal">普通</Option>
                  <Option value="high">高</Option>
                  <Option value="urgent">紧急</Option>
                </Select>
              </Form.Item>
              <Form.Item name="isTop" valuePropName="checked">
                <Switch /> 置顶显示
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default CommunityOperations;