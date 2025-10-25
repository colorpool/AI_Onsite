import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Avatar,
  Button,
  Space,
  Tag,
  Typography,
  Divider,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  message,
  Badge,
  Tooltip,
  List,
  Tabs,
  Progress,
  Rate,
  Timeline,
  Statistic,
  Alert,
  Empty,
  Descriptions,
  Switch,
} from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  WechatOutlined,
  QqOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  TrophyOutlined,
  StarOutlined,
  TeamOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  PrinterOutlined,
  CopyOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FireOutlined,
  HeartOutlined,
  ThunderboltOutlined,
  CrownOutlined,
  GiftOutlined,
  BookOutlined,
  BulbOutlined,
  RocketOutlined,
  SafetyOutlined,
} from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

// 样式定义
const cardStyle = {
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  border: '1px solid #f0f0f0',
  background: '#ffffff',
  marginBottom: '16px',
};

const memberCardStyle = {
  ...cardStyle,
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
  },
};

// 数据接口定义
interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  position: string;
  department: string;
  level: string;
  status: 'online' | 'busy' | 'offline' | 'vacation';
  phone: string;
  email: string;
  wechat: string;
  qq?: string;
  location: string;
  joinDate: string;
  specialties: string[];
  skills: { name: string; level: number }[];
  experience: number;
  projects: number;
  satisfaction: number;
  introduction: string;
  achievements: string[];
  certifications: string[];
  languages: string[];
  workTime: string;
  isTeamLeader: boolean;
  mentorStudents: number;
}

interface TeamStats {
  totalMembers: number;
  onlineMembers: number;
  avgExperience: number;
  avgSatisfaction: number;
  totalProjects: number;
  totalStudents: number;
}

const TeamCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'detail' | 'edit' | 'create'>('detail');
  const [form] = Form.useForm();

  // 模拟数据 - 驻场团队
  const teamStats: TeamStats = {
    totalMembers: 12,
    onlineMembers: 8,
    avgExperience: 4.2,
    avgSatisfaction: 4.8,
    totalProjects: 156,
    totalStudents: 2340,
  };

  const mockMembers: TeamMember[] = [
    {
      id: '1',
      name: '张客成',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=zhang-cs',
      position: '客户成功经理',
      department: '客户成功部',
      level: '高级',
      status: 'online',
      phone: '138-0013-8888',
      email: 'zhang.cs@dingxue.com',
      wechat: 'zhang_cs_manager',
      qq: '123456789',
      location: '北京·海淀区',
      joinDate: '2020-03-15',
      specialties: ['客户关系管理', '业务咨询', '培训规划'],
      skills: [
        { name: '客户沟通', level: 95 },
        { name: '业务分析', level: 90 },
        { name: '项目管理', level: 88 },
        { name: '培训规划', level: 92 },
      ],
      experience: 8,
      projects: 45,
      satisfaction: 4.9,
      introduction: '专注于企业客户成功服务，拥有8年客户关系管理经验，擅长为企业客户提供个性化的AI培训解决方案。',
      achievements: ['年度最佳客户成功经理', '客户满意度第一名', '优秀项目管理奖'],
      certifications: ['PMP项目管理认证', '客户成功管理师', 'ITIL服务管理认证'],
      languages: ['中文', '英文'],
      workTime: '周一至周五 9:00-18:00',
      isTeamLeader: true,
      mentorStudents: 120,
    },
    {
      id: '2',
      name: '李客服',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=li-service',
      position: '在线客服专员',
      department: '客户服务部',
      level: '中级',
      status: 'online',
      phone: '138-0013-7777',
      email: 'li.service@dingxue.com',
      wechat: 'li_online_service',
      location: '北京·朝阳区',
      joinDate: '2021-06-20',
      specialties: ['在线客服', '问题解答', '用户指导'],
      skills: [
        { name: '客户服务', level: 92 },
        { name: '问题诊断', level: 85 },
        { name: '产品知识', level: 88 },
        { name: '沟通技巧', level: 90 },
      ],
      experience: 3,
      projects: 28,
      satisfaction: 4.7,
      introduction: '专业的在线客服专员，熟悉平台各项功能，能够快速响应客户问题，提供及时有效的技术支持。',
      achievements: ['优秀客服代表', '快速响应奖', '客户好评率95%'],
      certifications: ['客户服务认证', '产品知识认证'],
      languages: ['中文'],
      workTime: '周一至周日 8:00-20:00（轮班制）',
      isTeamLeader: false,
      mentorStudents: 80,
    },
    {
      id: '3',
      name: '王增值',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=wang-value',
      position: '增值业务顾问',
      department: '增值业务部',
      level: '高级',
      status: 'busy',
      phone: '138-0013-6666',
      email: 'wang.value@dingxue.com',
      wechat: 'wang_value_advisor',
      location: '北京·西城区',
      joinDate: '2019-09-10',
      specialties: ['增值服务', '业务拓展', '定制化方案'],
      skills: [
        { name: '业务咨询', level: 93 },
        { name: '方案设计', level: 91 },
        { name: '商务谈判', level: 87 },
        { name: '客户分析', level: 89 },
      ],
      experience: 5,
      projects: 35,
      satisfaction: 4.8,
      introduction: '专业的增值业务顾问，擅长为企业客户设计个性化的增值服务方案，提升客户价值和满意度。',
      achievements: ['年度业务拓展奖', '优秀方案设计师', '客户价值提升奖'],
      certifications: ['商务咨询师', '方案设计认证', '客户分析师'],
      languages: ['中文', '英文'],
      workTime: '周一至周五 9:00-18:00',
      isTeamLeader: false,
      mentorStudents: 95,
    },
    {
      id: '4',
      name: '赵销售',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=zhao-sales',
      position: '企业销售经理',
      department: '销售部',
      level: '高级',
      status: 'online',
      phone: '138-0013-5555',
      email: 'zhao.sales@dingxue.com',
      wechat: 'zhao_enterprise_sales',
      location: '北京·东城区',
      joinDate: '2020-01-08',
      specialties: ['企业销售', '商务拓展', '合同谈判'],
      skills: [
        { name: '销售技巧', level: 94 },
        { name: '商务谈判', level: 92 },
        { name: '客户开发', level: 90 },
        { name: '市场分析', level: 86 },
      ],
      experience: 6,
      projects: 42,
      satisfaction: 4.6,
      introduction: '资深企业销售经理，专注于企业级AI培训产品销售，具有丰富的B2B销售经验和商务谈判能力。',
      achievements: ['年度销售冠军', '优秀销售经理', '商务拓展奖'],
      certifications: ['销售管理师', '商务谈判师', '市场营销师'],
      languages: ['中文', '英文'],
      workTime: '周一至周五 9:00-18:00',
      isTeamLeader: false,
      mentorStudents: 75,
    },
    {
      id: '5',
      name: '孙项目',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=sun-pm',
      position: '项目经理',
      department: '项目管理部',
      level: '高级',
      status: 'online',
      phone: '138-0013-4444',
      email: 'sun.pm@dingxue.com',
      wechat: 'sun_project_manager',
      location: '北京·丰台区',
      joinDate: '2019-11-15',
      specialties: ['项目管理', '进度控制', '风险管理'],
      skills: [
        { name: '项目管理', level: 96 },
        { name: '团队协调', level: 91 },
        { name: '风险控制', level: 89 },
        { name: '质量管理', level: 88 },
      ],
      experience: 7,
      projects: 52,
      satisfaction: 4.9,
      introduction: '经验丰富的项目经理，擅长大型企业AI培训项目的规划、执行和交付，确保项目按时按质完成。',
      achievements: ['优秀项目经理', '项目交付零延期', '客户满意度第一'],
      certifications: ['PMP项目管理认证', '敏捷项目管理', 'PRINCE2认证'],
      languages: ['中文', '英文'],
      workTime: '周一至周五 9:00-18:00',
      isTeamLeader: true,
      mentorStudents: 110,
    },
    {
      id: '6',
      name: '周售前',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=zhou-presales',
      position: '售前技术顾问',
      department: '售前支持部',
      level: '高级',
      status: 'busy',
      phone: '138-0013-3333',
      email: 'zhou.presales@dingxue.com',
      wechat: 'zhou_presales_advisor',
      location: '北京·石景山区',
      joinDate: '2020-05-12',
      specialties: ['技术咨询', '方案设计', '产品演示'],
      skills: [
        { name: '技术咨询', level: 95 },
        { name: '方案设计', level: 93 },
        { name: '产品演示', level: 91 },
        { name: '需求分析', level: 89 },
      ],
      experience: 5,
      projects: 38,
      satisfaction: 4.8,
      introduction: '专业的售前技术顾问，深度了解AI培训产品技术特性，能够为客户提供专业的技术咨询和解决方案。',
      achievements: ['优秀售前顾问', '方案设计专家', '技术咨询师'],
      certifications: ['售前咨询师', '解决方案架构师', 'AI技术认证'],
      languages: ['中文', '英文'],
      workTime: '周一至周五 9:00-18:00',
      isTeamLeader: false,
      mentorStudents: 85,
    },
    {
      id: '7',
      name: '吴运维',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=wu-ops',
      position: '运维技术专家',
      department: '技术运维部',
      level: '专家级',
      status: 'online',
      phone: '138-0013-2222',
      email: 'wu.ops@dingxue.com',
      wechat: 'wu_ops_expert',
      location: '北京·昌平区',
      joinDate: '2018-08-20',
      specialties: ['系统运维', '故障排查', '性能优化'],
      skills: [
        { name: '系统运维', level: 97 },
        { name: '故障诊断', level: 94 },
        { name: '性能调优', level: 92 },
        { name: '安全防护', level: 90 },
      ],
      experience: 9,
      projects: 65,
      satisfaction: 4.9,
      introduction: '资深运维技术专家，负责平台系统的稳定运行和技术保障，具有丰富的大型系统运维经验。',
      achievements: ['技术专家', '系统稳定性保障奖', '故障快速响应奖'],
      certifications: ['系统架构师', '网络安全认证', 'DevOps认证'],
      languages: ['中文', '英文'],
      workTime: '7×24小时待命（轮班制）',
      isTeamLeader: true,
      mentorStudents: 60,
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      online: { color: 'green', text: '在线' },
      busy: { color: 'orange', text: '忙碌' },
      offline: { color: 'gray', text: '离线' },
      vacation: { color: 'blue', text: '休假' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge color={config.color} text={config.text} />;
  };

  const getLevelColor = (level: string) => {
    const levelColors = {
      '初级': 'default',
      '中级': 'blue',
      '高级': 'orange',
      '专家级': 'red',
    };
    return levelColors[level as keyof typeof levelColors] || 'default';
  };

  const showMemberDetail = (member: TeamMember) => {
    setSelectedMember(member);
    setModalType('detail');
    setIsModalVisible(true);
  };

  const showEditMember = (member: TeamMember) => {
    setSelectedMember(member);
    setModalType('edit');
    form.setFieldsValue(member);
    setIsModalVisible(true);
  };

  const showCreateMember = () => {
    setSelectedMember(null);
    setModalType('create');
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (modalType === 'detail') {
      setIsModalVisible(false);
      return;
    }
    
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

  const uploadProps: UploadProps = {
    name: 'avatar',
    listType: 'picture-card',
    className: 'avatar-uploader',
    showUploadList: false,
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('只能上传 JPG/PNG 格式的图片!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('图片大小不能超过 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
  };

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, color: '#262626' }}>
          钉学科技驻场团队名片 - 为北京科技有限公司提供专业服务
        </Title>
        <Text type="secondary">
          展示为您服务的专业团队成员，包括客户成功、在线客服、增值业务、销售、项目经理、售前顾问、运维技术等各个岗位的专业人员
        </Text>
      </div>

      {/* 团队统计 */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={4}>
          <Card style={cardStyle}>
            <Statistic
              title="团队成员"
              value={teamStats.totalMembers}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <Card style={cardStyle}>
            <Statistic
              title="在线成员"
              value={teamStats.onlineMembers}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <Card style={cardStyle}>
            <Statistic
              title="平均经验"
              value={teamStats.avgExperience}
              suffix="年"
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <Card style={cardStyle}>
            <Statistic
              title="满意度"
              value={teamStats.avgSatisfaction}
              suffix="/5.0"
              prefix={<StarOutlined />}
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <Card style={cardStyle}>
            <Statistic
              title="项目总数"
              value={teamStats.totalProjects}
              prefix={<RocketOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <Card style={cardStyle}>
            <Statistic
              title="学员总数"
              value={teamStats.totalStudents}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#13c2c2' }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="团队概览" key="overview">
          <div style={{ marginBottom: '16px' }}>
            <Space>
              <Button type="primary" icon={<PlusOutlined />} onClick={showCreateMember}>
                添加成员
              </Button>
              <Button icon={<DownloadOutlined />}>
                导出名片
              </Button>
              <Button icon={<ShareAltOutlined />}>
                分享团队
              </Button>
            </Space>
          </div>

          <Row gutter={[16, 16]}>
            {mockMembers.map((member) => (
              <Col xs={24} sm={12} lg={8} xl={6} key={member.id}>
                <Card
                  style={memberCardStyle}
                  hoverable
                  onClick={() => showMemberDetail(member)}
                  actions={[
                    <Tooltip title="查看详情">
                      <EyeOutlined onClick={(e) => { e.stopPropagation(); showMemberDetail(member); }} />
                    </Tooltip>,
                    <Tooltip title="编辑信息">
                      <EditOutlined onClick={(e) => { e.stopPropagation(); showEditMember(member); }} />
                    </Tooltip>,
                    <Tooltip title="分享名片">
                      <ShareAltOutlined onClick={(e) => { e.stopPropagation(); message.info('分享功能开发中'); }} />
                    </Tooltip>,
                  ]}
                >
                  <div style={{ textAlign: 'center' }}>
                    <Badge dot={member.status === 'online'} color={member.status === 'online' ? 'green' : 'gray'}>
                      <Avatar size={64} src={member.avatar} />
                    </Badge>
                    {member.isTeamLeader && (
                      <div style={{ marginTop: '8px' }}>
                        <Tag color="gold" icon={<CrownOutlined />}>团队负责人</Tag>
                      </div>
                    )}
                    <div style={{ marginTop: '12px' }}>
                      <Title level={5} style={{ margin: 0 }}>{member.name}</Title>
                      <Text type="secondary">{member.position}</Text>
                    </div>
                    <div style={{ margin: '8px 0' }}>
                      <Tag color={getLevelColor(member.level)}>{member.level}</Tag>
                      {getStatusBadge(member.status)}
                    </div>
                    <div style={{ margin: '8px 0' }}>
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <div>
                          <EnvironmentOutlined style={{ marginRight: '4px' }} />
                          <Text style={{ fontSize: '12px' }}>{member.location}</Text>
                        </div>
                        <div>
                          <StarOutlined style={{ marginRight: '4px' }} />
                          <Rate disabled defaultValue={member.satisfaction} style={{ fontSize: '12px' }} />
                        </div>
                        <div>
                          <BookOutlined style={{ marginRight: '4px' }} />
                          <Text style={{ fontSize: '12px' }}>指导学员: {member.mentorStudents}</Text>
                        </div>
                      </Space>
                    </div>
                    <Divider style={{ margin: '12px 0' }} />
                    <div>
                      <Text strong style={{ fontSize: '12px' }}>专业领域:</Text>
                      <div style={{ marginTop: '4px' }}>
                        {member.specialties.slice(0, 2).map(specialty => (
                          <Tag key={specialty} style={{ fontSize: '10px', margin: '2px' }}>
                            {specialty}
                          </Tag>
                        ))}
                        {member.specialties.length > 2 && (
                          <Tag style={{ fontSize: '10px', margin: '2px' }}>
                            +{member.specialties.length - 2}
                          </Tag>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>

        <TabPane tab="技能矩阵" key="skills">
          <Card style={cardStyle}>
            <Alert
              message="技能矩阵"
              description="展示团队成员的技能分布和专业水平，帮助合理分配教学任务。"
              type="info"
              showIcon
              style={{ marginBottom: '16px' }}
            />
            
            <Row gutter={[16, 16]}>
              {mockMembers.map((member) => (
                <Col xs={24} lg={12} key={member.id}>
                  <Card
                    title={
                      <Space>
                        <Avatar src={member.avatar} size="small" />
                        <span>{member.name}</span>
                        <Tag color={getLevelColor(member.level)}>{member.level}</Tag>
                      </Space>
                    }
                    size="small"
                    style={{ marginBottom: '16px' }}
                  >
                    <Space direction="vertical" style={{ width: '100%' }}>
                      {member.skills.map((skill) => (
                        <div key={skill.name}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <Text>{skill.name}</Text>
                            <Text>{skill.level}%</Text>
                          </div>
                          <Progress percent={skill.level} size="small" />
                        </div>
                      ))}
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </TabPane>

        <TabPane tab="联系方式" key="contacts">
          <Card style={cardStyle}>
            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
              dataSource={mockMembers}
              renderItem={(member) => (
                <List.Item>
                  <Card
                    hoverable
                    style={{ textAlign: 'center' }}
                    actions={[
                      <Tooltip title="拨打电话">
                        <PhoneOutlined onClick={() => message.info(`拨打 ${member.phone}`)} />
                      </Tooltip>,
                      <Tooltip title="发送邮件">
                        <MailOutlined onClick={() => message.info(`发送邮件到 ${member.email}`)} />
                      </Tooltip>,
                      <Tooltip title="微信联系">
                        <WechatOutlined onClick={() => message.info(`微信: ${member.wechat}`)} />
                      </Tooltip>,
                    ]}
                  >
                    <Badge dot={member.status === 'online'} color={member.status === 'online' ? 'green' : 'gray'}>
                      <Avatar size={48} src={member.avatar} />
                    </Badge>
                    <div style={{ marginTop: '12px' }}>
                      <Title level={5} style={{ margin: 0 }}>{member.name}</Title>
                      <Text type="secondary">{member.position}</Text>
                    </div>
                    <Divider style={{ margin: '12px 0' }} />
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                      <div>
                        <PhoneOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                        <Text copyable={{ text: member.phone }}>{member.phone}</Text>
                      </div>
                      <div>
                        <MailOutlined style={{ marginRight: '8px', color: '#52c41a' }} />
                        <Text copyable={{ text: member.email }} ellipsis style={{ maxWidth: '150px' }}>
                          {member.email}
                        </Text>
                      </div>
                      <div>
                        <WechatOutlined style={{ marginRight: '8px', color: '#faad14' }} />
                        <Text copyable={{ text: member.wechat }}>{member.wechat}</Text>
                      </div>
                      <div>
                        <ClockCircleOutlined style={{ marginRight: '8px', color: '#722ed1' }} />
                        <Text style={{ fontSize: '12px' }}>{member.workTime}</Text>
                      </div>
                    </Space>
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </TabPane>

        <TabPane tab="组织架构" key="organization">
          <Card style={cardStyle}>
            <Alert
              message="组织架构"
              description="展示AI教学团队的组织结构和汇报关系。"
              type="info"
              showIcon
              style={{ marginBottom: '16px' }}
            />
            
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <TeamOutlined style={{ fontSize: '64px', color: '#d9d9d9' }} />
              <div style={{ marginTop: '16px' }}>
                <Title level={4} type="secondary">组织架构图开发中</Title>
                <Text type="secondary">即将为您提供完整的团队组织架构展示</Text>
              </div>
            </div>
          </Card>
        </TabPane>
      </Tabs>

      {/* 成员详情/编辑模态框 */}
      <Modal
        title={
          modalType === 'create' ? '添加团队成员' :
          modalType === 'edit' ? '编辑成员信息' : '成员详情'
        }
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
        footer={modalType === 'detail' ? [
          <Button key="close" onClick={handleModalCancel}>
            关闭
          </Button>
        ] : undefined}
      >
        {modalType === 'detail' && selectedMember ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <Badge dot={selectedMember.status === 'online'} color={selectedMember.status === 'online' ? 'green' : 'gray'}>
                <Avatar size={80} src={selectedMember.avatar} />
              </Badge>
              <div style={{ marginTop: '12px' }}>
                <Title level={3} style={{ margin: 0 }}>
                  {selectedMember.name}
                  {selectedMember.isTeamLeader && <CrownOutlined style={{ marginLeft: '8px', color: '#faad14' }} />}
                </Title>
                <Text type="secondary">{selectedMember.position}</Text>
              </div>
              <div style={{ marginTop: '8px' }}>
                <Tag color={getLevelColor(selectedMember.level)}>{selectedMember.level}</Tag>
                {getStatusBadge(selectedMember.status)}
              </div>
            </div>

            <Tabs defaultActiveKey="basic">
              <TabPane tab="基本信息" key="basic">
                <Descriptions column={2} bordered>
                  <Descriptions.Item label="姓名">{selectedMember.name}</Descriptions.Item>
                  <Descriptions.Item label="职位">{selectedMember.position}</Descriptions.Item>
                  <Descriptions.Item label="部门">{selectedMember.department}</Descriptions.Item>
                  <Descriptions.Item label="级别">{selectedMember.level}</Descriptions.Item>
                  <Descriptions.Item label="工作地点">{selectedMember.location}</Descriptions.Item>
                  <Descriptions.Item label="入职时间">{selectedMember.joinDate}</Descriptions.Item>
                  <Descriptions.Item label="工作经验">{selectedMember.experience} 年</Descriptions.Item>
                  <Descriptions.Item label="项目数量">{selectedMember.projects}</Descriptions.Item>
                  <Descriptions.Item label="指导学员">{selectedMember.mentorStudents} 人</Descriptions.Item>
                  <Descriptions.Item label="满意度评分">
                    <Rate disabled defaultValue={selectedMember.satisfaction} />
                  </Descriptions.Item>
                  <Descriptions.Item label="工作时间" span={2}>{selectedMember.workTime}</Descriptions.Item>
                  <Descriptions.Item label="个人简介" span={2}>
                    <Paragraph>{selectedMember.introduction}</Paragraph>
                  </Descriptions.Item>
                </Descriptions>
              </TabPane>

              <TabPane tab="联系方式" key="contact">
                <Descriptions column={1} bordered>
                  <Descriptions.Item label="手机号码">
                    <Space>
                      <PhoneOutlined />
                      <Text copyable>{selectedMember.phone}</Text>
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label="邮箱地址">
                    <Space>
                      <MailOutlined />
                      <Text copyable>{selectedMember.email}</Text>
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label="微信号">
                    <Space>
                      <WechatOutlined />
                      <Text copyable>{selectedMember.wechat}</Text>
                    </Space>
                  </Descriptions.Item>
                  {selectedMember.qq && (
                    <Descriptions.Item label="QQ号">
                      <Space>
                        <QqOutlined />
                        <Text copyable>{selectedMember.qq}</Text>
                      </Space>
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </TabPane>

              <TabPane tab="专业技能" key="skills">
                <div style={{ marginBottom: '16px' }}>
                  <Title level={5}>专业领域</Title>
                  <Space wrap>
                    {selectedMember.specialties.map(specialty => (
                      <Tag key={specialty} color="blue">{specialty}</Tag>
                    ))}
                  </Space>
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <Title level={5}>技能水平</Title>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {selectedMember.skills.map((skill) => (
                      <div key={skill.name}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <Text>{skill.name}</Text>
                          <Text>{skill.level}%</Text>
                        </div>
                        <Progress percent={skill.level} />
                      </div>
                    ))}
                  </Space>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <Title level={5}>语言能力</Title>
                  <Space wrap>
                    {selectedMember.languages.map(language => (
                      <Tag key={language} color="green">{language}</Tag>
                    ))}
                  </Space>
                </div>

                <div>
                  <Title level={5}>认证证书</Title>
                  <List
                    size="small"
                    dataSource={selectedMember.certifications}
                    renderItem={(cert) => (
                      <List.Item>
                        <SafetyOutlined style={{ marginRight: '8px', color: '#52c41a' }} />
                        {cert}
                      </List.Item>
                    )}
                  />
                </div>
              </TabPane>

              <TabPane tab="成就荣誉" key="achievements">
                <div>
                  <Title level={5}>获得荣誉</Title>
                  <List
                    size="small"
                    dataSource={selectedMember.achievements}
                    renderItem={(achievement) => (
                      <List.Item>
                        <TrophyOutlined style={{ marginRight: '8px', color: '#faad14' }} />
                        {achievement}
                      </List.Item>
                    )}
                  />
                </div>
              </TabPane>
            </Tabs>
          </div>
        ) : (
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={24} style={{ textAlign: 'center', marginBottom: '16px' }}>
                <Upload {...uploadProps}>
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>上传头像</div>
                  </div>
                </Upload>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
                  <Input placeholder="请输入姓名" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="position" label="职位" rules={[{ required: true }]}>
                  <Input placeholder="请输入职位" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="department" label="部门" rules={[{ required: true }]}>
                  <Select placeholder="选择部门">
                    <Option value="客户成功部">客户成功部</Option>
                    <Option value="客户服务部">客户服务部</Option>
                    <Option value="增值业务部">增值业务部</Option>
                    <Option value="销售部">销售部</Option>
                    <Option value="项目管理部">项目管理部</Option>
                    <Option value="售前支持部">售前支持部</Option>
                    <Option value="技术运维部">技术运维部</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="level" label="级别" rules={[{ required: true }]}>
                  <Select placeholder="选择级别">
                    <Option value="初级">初级</Option>
                    <Option value="中级">中级</Option>
                    <Option value="高级">高级</Option>
                    <Option value="专家级">专家级</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="phone" label="手机号码" rules={[{ required: true }]}>
                  <Input placeholder="请输入手机号码" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="email" label="邮箱地址" rules={[{ required: true, type: 'email' }]}>
                  <Input placeholder="请输入邮箱地址" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="wechat" label="微信号">
                  <Input placeholder="请输入微信号" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="location" label="工作地点">
                  <Input placeholder="请输入工作地点" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="experience" label="工作经验(年)">
                  <Input type="number" placeholder="请输入工作经验" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="isTeamLeader" label="是否团队负责人" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="introduction" label="个人简介">
              <TextArea rows={4} placeholder="请输入个人简介" />
            </Form.Item>
            <Form.Item name="workTime" label="工作时间">
              <Input placeholder="例如：周一至周五 9:00-18:00" />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default TeamCard;