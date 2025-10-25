import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Tag,
  Space,
  Typography,
  Tabs,
  Progress,
  message,
  Avatar,
  List,
  Badge,
  Tooltip,
  Divider,
  Upload,
  Switch,
} from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  FileTextOutlined,
  CalendarOutlined,
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  FilterOutlined,
  ExportOutlined,
  MessageOutlined,
  LikeOutlined,
  ShareAltOutlined,
  QuestionCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  TrophyOutlined,
  BellOutlined,
  StarOutlined,
  CommentOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Column, Pie } from '@ant-design/plots';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { TabPane } = Tabs;

// 统一的卡片样式 - 参考持续服务的现代风格
const cardStyle = {
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  border: '1px solid #f0f0f0',
  background: '#ffffff',
  marginBottom: '16px',
};

interface CommunityMember {
  id: string;
  name: string;
  company: string;
  role: 'admin' | 'moderator' | 'member';
  joinDate: string;
  lastActive: string;
  postsCount: number;
  reputation: number;
  status: 'active' | 'inactive';
}

interface CommunityPost {
  id: string;
  title: string;
  author: string;
  company: string;
  category: 'discussion' | 'qa' | 'share' | 'announcement';
  content: string;
  likes: number;
  comments: number;
  views: number;
  createTime: string;
  status: 'published' | 'draft' | 'hidden';
  isTop: boolean;
}

interface CommunityEvent {
  id: string;
  title: string;
  type: 'webinar' | 'workshop' | 'meetup' | 'competition';
  organizer: string;
  startTime: string;
  endTime: string;
  participants: number;
  maxParticipants: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

const CommunityOperations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [memberModalVisible, setMemberModalVisible] = useState(false);
  const [postModalVisible, setPostModalVisible] = useState(false);
  const [eventModalVisible, setEventModalVisible] = useState(false);

  // 模拟数据
  const communityStats = {
    totalMembers: 1248,
    activeMembers: 892,
    totalPosts: 3456,
    monthlyPosts: 234,
    totalEvents: 45,
    upcomingEvents: 8,
  };

  const memberData: CommunityMember[] = [
    {
      id: '1',
      name: '张经理',
      company: '科技有限公司',
      role: 'admin',
      joinDate: '2023-06-15',
      lastActive: '2024-01-15 10:30',
      postsCount: 45,
      reputation: 1250,
      status: 'active',
    },
    {
      id: '2',
      name: '王总监',
      company: '教育集团',
      role: 'moderator',
      joinDate: '2023-08-20',
      lastActive: '2024-01-14 16:20',
      postsCount: 32,
      reputation: 890,
      status: 'active',
    },
    {
      id: '3',
      name: '李主任',
      company: '培训机构',
      role: 'member',
      joinDate: '2023-10-10',
      lastActive: '2024-01-10 09:15',
      postsCount: 18,
      reputation: 420,
      status: 'inactive',
    },
  ];

  const postData: CommunityPost[] = [
    {
      id: '1',
      title: '如何提升学员参与度的最佳实践分享',
      author: '张经理',
      company: '科技有限公司',
      category: 'share',
      content: '分享我们公司在提升学员参与度方面的经验...',
      likes: 45,
      comments: 12,
      views: 234,
      createTime: '2024-01-15 14:30',
      status: 'published',
      isTop: true,
    },
    {
      id: '2',
      title: '关于数据分析功能的使用问题',
      author: '王总监',
      company: '教育集团',
      category: 'qa',
      content: '在使用数据分析功能时遇到一些问题...',
      likes: 23,
      comments: 8,
      views: 156,
      createTime: '2024-01-14 11:20',
      status: 'published',
      isTop: false,
    },
    {
      id: '3',
      title: '授客SaaS新功能发布通知',
      author: '系统管理员',
      company: '授客团队',
      category: 'announcement',
      content: '我们很高兴地宣布新版本的发布...',
      likes: 67,
      comments: 25,
      views: 445,
      createTime: '2024-01-13 09:00',
      status: 'published',
      isTop: true,
    },
  ];

  const eventData: CommunityEvent[] = [
    {
      id: '1',
      title: '客户成功管理最佳实践研讨会',
      type: 'webinar',
      organizer: '授客团队',
      startTime: '2024-01-20 14:00',
      endTime: '2024-01-20 16:00',
      participants: 89,
      maxParticipants: 100,
      status: 'upcoming',
    },
    {
      id: '2',
      title: '数据分析功能深度培训',
      type: 'workshop',
      organizer: '产品团队',
      startTime: '2024-01-25 10:00',
      endTime: '2024-01-25 12:00',
      participants: 45,
      maxParticipants: 50,
      status: 'upcoming',
    },
    {
      id: '3',
      title: '年度优秀客户案例分享大赛',
      type: 'competition',
      organizer: '运营团队',
      startTime: '2024-02-01 09:00',
      endTime: '2024-02-28 18:00',
      participants: 156,
      maxParticipants: 200,
      status: 'upcoming',
    },
  ];

  const categoryData = [
    { type: '经验分享', value: 45 },
    { type: '问题讨论', value: 32 },
    { type: '功能建议', value: 28 },
    { type: '公告通知', value: 15 },
  ];

  const memberColumns: ColumnsType<CommunityMember> = [
    {
      title: '成员信息',
      key: 'member',
      render: (record: CommunityMember) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar icon={<UserOutlined />} style={{ marginRight: '12px' }} />
          <div>
            <div style={{ fontWeight: 'bold' }}>{record.name}</div>
            <div style={{ color: '#666', fontSize: '12px' }}>{record.company}</div>
          </div>
        </div>
      ),
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        const roleMap = {
          admin: { color: 'red', text: '管理员' },
          moderator: { color: 'blue', text: '版主' },
          member: { color: 'default', text: '成员' },
        };
        const config = roleMap[role as keyof typeof roleMap];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '发帖数',
      dataIndex: 'postsCount',
      key: 'postsCount',
      sorter: (a, b) => a.postsCount - b.postsCount,
    },
    {
      title: '声望值',
      dataIndex: 'reputation',
      key: 'reputation',
      sorter: (a, b) => a.reputation - b.reputation,
      render: (reputation: number) => (
        <span style={{ color: '#1890ff', fontWeight: 'bold' }}>{reputation}</span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          active: { color: 'success', text: '活跃' },
          inactive: { color: 'default', text: '不活跃' },
        };
        const config = statusMap[status as keyof typeof statusMap];
        return <Badge status={config.color as any} text={config.text} />;
      },
    },
    {
      title: '加入时间',
      dataIndex: 'joinDate',
      key: 'joinDate',
    },
    {
      title: '最后活跃',
      dataIndex: 'lastActive',
      key: 'lastActive',
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
          <Tooltip title="发送消息">
            <Button type="text" icon={<MessageOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const postColumns: ColumnsType<CommunityPost> = [
    {
      title: '帖子信息',
      key: 'post',
      render: (record: CommunityPost) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            {record.isTop && <Tag color="red" style={{ marginRight: '8px' }}>置顶</Tag>}
            <span style={{ fontWeight: 'bold' }}>{record.title}</span>
          </div>
          <div style={{ color: '#666', fontSize: '12px' }}>
            {record.author} · {record.company}
          </div>
        </div>
      ),
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => {
        const categoryMap = {
          discussion: { color: 'blue', text: '讨论' },
          qa: { color: 'green', text: '问答' },
          share: { color: 'orange', text: '分享' },
          announcement: { color: 'red', text: '公告' },
        };
        const config = categoryMap[category as keyof typeof categoryMap];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '互动数据',
      key: 'engagement',
      render: (record: CommunityPost) => (
        <div>
          <div><LikeOutlined /> {record.likes}</div>
          <div><CommentOutlined /> {record.comments}</div>
          <div><EyeOutlined /> {record.views}</div>
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          published: { color: 'success', text: '已发布' },
          draft: { color: 'default', text: '草稿' },
          hidden: { color: 'warning', text: '已隐藏' },
        };
        const config = statusMap[status as keyof typeof statusMap];
        return <Badge status={config.color as any} text={config.text} />;
      },
    },
    {
      title: '发布时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (record: CommunityPost) => (
        <Space>
          <Tooltip title="查看">
            <Button type="text" icon={<EyeOutlined />} />
          </Tooltip>
          <Tooltip title="编辑">
            <Button type="text" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title={record.isTop ? '取消置顶' : '置顶'}>
            <Button type="text" icon={<StarOutlined />} />
          </Tooltip>
          <Tooltip title="删除">
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const eventColumns: ColumnsType<CommunityEvent> = [
    {
      title: '活动信息',
      key: 'event',
      render: (record: CommunityEvent) => (
        <div>
          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{record.title}</div>
          <div style={{ color: '#666', fontSize: '12px' }}>
            主办方: {record.organizer}
          </div>
        </div>
      ),
    },
    {
      title: '活动类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const typeMap = {
          webinar: { color: 'blue', text: '在线研讨会' },
          workshop: { color: 'green', text: '工作坊' },
          meetup: { color: 'orange', text: '线下聚会' },
          competition: { color: 'purple', text: '竞赛活动' },
        };
        const config = typeMap[type as keyof typeof typeMap];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '参与情况',
      key: 'participation',
      render: (record: CommunityEvent) => (
        <div>
          <div>{record.participants}/{record.maxParticipants} 人</div>
          <Progress
            percent={Math.round((record.participants / record.maxParticipants) * 100)}
            size="small"
            showInfo={false}
          />
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          upcoming: { color: 'processing', text: '即将开始' },
          ongoing: { color: 'success', text: '进行中' },
          completed: { color: 'default', text: '已结束' },
          cancelled: { color: 'error', text: '已取消' },
        };
        const config = statusMap[status as keyof typeof statusMap];
        return <Badge status={config.color as any} text={config.text} />;
      },
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
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
          <Tooltip title="分享">
            <Button type="text" icon={<ShareAltOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const pieConfig = {
    data: categoryData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [{ type: 'element-active' }],
  };

  return (
    <div style={{ padding: '32px 40px', background: '#f5f5f5', minHeight: 'calc(100vh - 64px)' }}>
      <Title level={2} style={{ marginBottom: 24 }}>学习社区运营</Title>
      
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="社区概览" key="overview">
          {/* 社区概览数据 - 使用统一卡片样式 */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={6}>
              <Card style={{ ...cardStyle, marginBottom: 0 }}>
                <Statistic 
                  title={
                    <span>
                      社区成员
                      <Tooltip 
                        title="当前社区注册成员总数"
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
                  value={communityStats.totalMembers} 
                  valueStyle={{ fontWeight: 700 }}
                  suffix={
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
                      <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 12, marginRight: 4 }} />
                      <Text style={{ color: '#52c41a', fontSize: 12 }}>+32</Text>
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
                      活跃成员
                      <Tooltip 
                        title="近30天内有互动行为的成员数量"
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
                  value={communityStats.activeMembers} 
                  valueStyle={{ fontWeight: 700 }}
                  suffix={
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
                      <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 12, marginRight: 4 }} />
                      <Text style={{ color: '#52c41a', fontSize: 12 }}>+18</Text>
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
                      内容发布
                      <Tooltip 
                        title="本月发布的内容总数"
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
                  value={communityStats.monthlyPosts} 
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
                      互动率
                      <Tooltip 
                        title="内容的平均互动参与率"
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
                  value={73.5} 
                  precision={1}
                  valueStyle={{ fontWeight: 700, color: '#52c41a' }}
                  suffix={
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
                      <span style={{ color: '#52c41a', fontSize: 12 }}>%</span>
                      <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 12, marginLeft: 4 }} />
                      <Text style={{ color: '#52c41a', fontSize: 12 }}>+2.3</Text>
                    </div>
                  }
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card style={cardStyle} title="帖子分类分布" extra={<Button icon={<ExportOutlined />}>导出</Button>}>
                <Pie {...pieConfig} />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card style={cardStyle} title="社区活跃度趋势">
                <div style={{ textAlign: 'center', padding: '60px', color: '#666' }}>
                  活跃度趋势图表
                </div>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
            <Col span={8}>
              <Card title="热门话题" size="small">
                <List
                  size="small"
                  dataSource={[
                    { title: '学员参与度提升', count: 45 },
                    { title: '数据分析应用', count: 32 },
                    { title: '功能使用技巧', count: 28 },
                    { title: '客户成功案例', count: 24 },
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>{item.title}</span>
                        <Tag>{item.count}个讨论</Tag>
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="活跃成员排行" size="small">
                <List
                  size="small"
                  dataSource={[
                    { name: '张经理', posts: 45, reputation: 1250 },
                    { name: '王总监', posts: 32, reputation: 890 },
                    { name: '李主任', posts: 28, reputation: 720 },
                    { name: '赵老师', posts: 24, reputation: 650 },
                  ]}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar style={{ backgroundColor: '#1890ff' }}>{index + 1}</Avatar>}
                        title={item.name}
                        description={`${item.posts}篇帖子 · ${item.reputation}声望`}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="即将开始的活动" size="small">
                <List
                  size="small"
                  dataSource={eventData.filter(event => event.status === 'upcoming').slice(0, 4)}
                  renderItem={(item) => (
                    <List.Item>
                      <div>
                        <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{item.title}</div>
                        <div style={{ color: '#666', fontSize: '12px' }}>{item.startTime}</div>
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="成员管理" key="members">
          <Card style={cardStyle}>
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <Space>
                <Search placeholder="搜索成员姓名或公司" style={{ width: 300 }} />
                <Select placeholder="角色" style={{ width: 120 }}>
                  <Option value="admin">管理员</Option>
                  <Option value="moderator">版主</Option>
                  <Option value="member">成员</Option>
                </Select>
                <Select placeholder="状态" style={{ width: 120 }}>
                  <Option value="active">活跃</Option>
                  <Option value="inactive">不活跃</Option>
                </Select>
                <RangePicker placeholder={['加入开始时间', '加入结束时间']} />
              </Space>
              <Space>
                <Button icon={<FilterOutlined />}>筛选</Button>
                <Button icon={<ExportOutlined />}>导出</Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setMemberModalVisible(true)}>
                  邀请成员
                </Button>
              </Space>
            </div>
            <Table
              columns={memberColumns}
              dataSource={memberData}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        <TabPane tab="内容管理" key="content">
          <Card style={cardStyle}>
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <Space>
                <Search placeholder="搜索帖子标题或内容" style={{ width: 300 }} />
                <Select placeholder="分类" style={{ width: 120 }}>
                  <Option value="discussion">讨论</Option>
                  <Option value="qa">问答</Option>
                  <Option value="share">分享</Option>
                  <Option value="announcement">公告</Option>
                </Select>
                <Select placeholder="状态" style={{ width: 120 }}>
                  <Option value="published">已发布</Option>
                  <Option value="draft">草稿</Option>
                  <Option value="hidden">已隐藏</Option>
                </Select>
                <RangePicker placeholder={['发布开始时间', '发布结束时间']} />
              </Space>
              <Space>
                <Button icon={<FilterOutlined />}>筛选</Button>
                <Button icon={<ExportOutlined />}>导出</Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setPostModalVisible(true)}>
                  发布内容
                </Button>
              </Space>
            </div>
            <Table
              columns={postColumns}
              dataSource={postData}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        <TabPane tab="活动管理" key="events">
          <Card style={cardStyle}>
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <Space>
                <Search placeholder="搜索活动标题" style={{ width: 300 }} />
                <Select placeholder="活动类型" style={{ width: 150 }}>
                  <Option value="webinar">在线研讨会</Option>
                  <Option value="workshop">工作坊</Option>
                  <Option value="meetup">线下聚会</Option>
                  <Option value="competition">竞赛活动</Option>
                </Select>
                <Select placeholder="状态" style={{ width: 120 }}>
                  <Option value="upcoming">即将开始</Option>
                  <Option value="ongoing">进行中</Option>
                  <Option value="completed">已结束</Option>
                  <Option value="cancelled">已取消</Option>
                </Select>
              </Space>
              <Space>
                <Button icon={<FilterOutlined />}>筛选</Button>
                <Button icon={<ExportOutlined />}>导出</Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setEventModalVisible(true)}>
                  创建活动
                </Button>
              </Space>
            </div>
            <Table
              columns={eventColumns}
              dataSource={eventData}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
      </Tabs>

      {/* 邀请成员弹窗 */}
      <Modal
        title="邀请成员"
        open={memberModalVisible}
        onCancel={() => setMemberModalVisible(false)}
        onOk={() => {
          message.success('邀请发送成功');
          setMemberModalVisible(false);
        }}
      >
        <Form layout="vertical">
          <Form.Item label="邀请方式" required>
            <Select placeholder="请选择邀请方式">
              <Option value="email">邮箱邀请</Option>
              <Option value="link">邀请链接</Option>
              <Option value="batch">批量导入</Option>
            </Select>
          </Form.Item>
          <Form.Item label="邮箱地址" required>
            <TextArea rows={3} placeholder="请输入邮箱地址，多个邮箱用换行分隔" />
          </Form.Item>
          <Form.Item label="初始角色" required>
            <Select placeholder="请选择初始角色">
              <Option value="member">成员</Option>
              <Option value="moderator">版主</Option>
            </Select>
          </Form.Item>
          <Form.Item label="邀请消息">
            <TextArea rows={3} placeholder="可选：添加个性化邀请消息" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 发布内容弹窗 */}
      <Modal
        title="发布内容"
        open={postModalVisible}
        onCancel={() => setPostModalVisible(false)}
        onOk={() => {
          message.success('内容发布成功');
          setPostModalVisible(false);
        }}
        width={800}
      >
        <Form layout="vertical">
          <Form.Item label="标题" required>
            <Input placeholder="请输入内容标题" />
          </Form.Item>
          <Form.Item label="分类" required>
            <Select placeholder="请选择内容分类">
              <Option value="discussion">讨论</Option>
              <Option value="qa">问答</Option>
              <Option value="share">分享</Option>
              <Option value="announcement">公告</Option>
            </Select>
          </Form.Item>
          <Form.Item label="内容" required>
            <TextArea rows={8} placeholder="请输入内容详情" />
          </Form.Item>
          <Form.Item label="附件">
            <Upload>
              <Button icon={<UploadOutlined />}>上传附件</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="设置">
            <Space>
              <span>置顶:</span>
              <Switch />
              <span>允许评论:</span>
              <Switch defaultChecked />
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 创建活动弹窗 */}
      <Modal
        title="创建活动"
        open={eventModalVisible}
        onCancel={() => setEventModalVisible(false)}
        onOk={() => {
          message.success('活动创建成功');
          setEventModalVisible(false);
        }}
        width={600}
      >
        <Form layout="vertical">
          <Form.Item label="活动标题" required>
            <Input placeholder="请输入活动标题" />
          </Form.Item>
          <Form.Item label="活动类型" required>
            <Select placeholder="请选择活动类型">
              <Option value="webinar">在线研讨会</Option>
              <Option value="workshop">工作坊</Option>
              <Option value="meetup">线下聚会</Option>
              <Option value="competition">竞赛活动</Option>
            </Select>
          </Form.Item>
          <Form.Item label="活动描述" required>
            <TextArea rows={4} placeholder="请详细描述活动内容" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="开始时间" required>
                <DatePicker showTime style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="结束时间" required>
                <DatePicker showTime style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="最大参与人数" required>
            <Input type="number" placeholder="请输入最大参与人数" />
          </Form.Item>
          <Form.Item label="活动封面">
            <Upload>
              <Button icon={<UploadOutlined />}>上传封面图片</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CommunityOperations;