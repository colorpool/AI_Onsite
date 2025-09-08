import React, { useState, useEffect } from 'react';
import {
  Modal,
  Descriptions,
  Tag,
  Progress,
  Timeline,
  Button,
  Space,
  Typography,
  Card,
  Row,
  Col,
  Statistic,
  Alert,
  Divider,
  Avatar,
  Badge,
  Tooltip,
  Tabs,
  List,
  Empty,
  Table,
  message
} from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  DollarOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  RiseOutlined,
  FileTextOutlined,
  TeamOutlined,
  SettingOutlined,
  PlayCircleOutlined,
  RobotOutlined,
  ThunderboltOutlined,
  EyeOutlined,
  BellOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';
import type {
  Customer,
  PlaybookRecommendation,
  PlaybookExecution,
  ServicePlaybook
} from '../types/continuousService';
import { 
  mockCustomerHistory, 
  mockContacts, 
  getPlatformType, 
  getPurchasedProducts,
  CustomerHistoryItem
} from '../mock/continuousServiceData';
import type { ContactInfo } from '../types/continuousService';
import PlaybookLauncher from './PlaybookLauncher';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// 平台类型显示名称映射
const getPlatformDisplayName = (platformType: string) => {
  const displayNames = {
    'dingtalk': '钉钉',
    'wechat_work': '企业微信',
    'feishu': '飞书',
    'lark': 'Lark',
    'dingtalk_global': '钉钉海外版',
    'standalone': '独立部署'
  };
  return displayNames[platformType as keyof typeof displayNames] || '未知';
};

interface CustomerDetailWithPlaybooksProps {
  visible: boolean;
  customer: Customer | null;
  recommendations: PlaybookRecommendation[];
  executions: PlaybookExecution[];
  playbooks: ServicePlaybook[];
  onClose: () => void;
  onAction: (action: string, customerId: string) => void;
  onLaunchPlaybook: (playbookId: string, customerId: string) => Promise<void>;
  onUpdateRecommendation: (id: string, updates: Partial<PlaybookRecommendation>) => Promise<void>;
  loading?: boolean;
}

const CustomerDetailWithPlaybooks: React.FC<CustomerDetailWithPlaybooksProps> = ({
  visible,
  customer,
  recommendations,
  executions,
  playbooks,
  onClose,
  onAction,
  onLaunchPlaybook,
  onUpdateRecommendation,
  loading = false
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [launcherVisible, setLauncherVisible] = useState(false);
  const [selectedPlaybook, setSelectedPlaybook] = useState<ServicePlaybook | null>(null);

  if (!customer) return null;

  // 获取客户相关的推荐
  const customerRecommendations = (recommendations || []).filter(r => r.customerId === customer.id);
  
  // 获取客户相关的执行记录
  const customerExecutions = (executions || []).filter(e => e.customerId === customer.id);

  // 获取客户历史记录
  const customerHistory = mockCustomerHistory[customer.id as keyof typeof mockCustomerHistory] || [];
  
  // 获取联系人信息
  const contacts = mockContacts[customer.id as keyof typeof mockContacts] || [];

  // 使用统一的数据源函数

  const getHealthColor = (score: number) => {
    if (score >= 80) return '#52c41a';
    if (score >= 60) return '#faad14';
    return '#fa541c';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'orange';
      case 'accepted': case 'completed': return 'green';
      case 'rejected': case 'cancelled': return 'red';
      case 'in_progress': return 'blue';
      default: return 'default';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return '#52c41a';
    if (confidence >= 0.6) return '#faad14';
    return '#ff4d4f';
  };

  // 处理推荐操作
  const handleRecommendationAction = async (id: string, action: 'accept' | 'reject') => {
    try {
      await onUpdateRecommendation(id, { 
        status: action === 'accept' ? 'accepted' : 'rejected',
        handledAt: new Date().toISOString(),
        handledBy: '当前用户' // 这里应该从用户上下文获取
      });
      
      if (action === 'accept') {
        const recommendation = customerRecommendations.find(r => r.id === id);
        if (recommendation) {
          const playbook = playbooks.find(p => p.id === recommendation.playbookId);
          if (playbook) {
            setSelectedPlaybook(playbook);
            setLauncherVisible(true);
          }
        }
      }
      
      message.success(action === 'accept' ? '已接受推荐' : '已拒绝推荐');
    } catch (error) {
      message.error('操作失败，请重试');
    }
  };

  // 启动剧本适配器函数
  const handleLaunchPlaybook = async (execution: Partial<PlaybookExecution>) => {
    if (!customer || !execution.playbookId) return;
    
    try {
      await onLaunchPlaybook(execution.playbookId, customer.id);
      setLauncherVisible(false);
      message.success('剧本启动成功');
    } catch (error) {
      message.error('启动剧本失败');
    }
  };

  const handleQuickLaunch = (playbook: ServicePlaybook) => {
    const execution: Partial<PlaybookExecution> = {
      id: `exec_${Date.now()}`,
      playbookId: playbook.id,
      customerId: customer?.id,
      status: 'pending',
      startedAt: new Date().toISOString(),
    };
    handleLaunchPlaybook(execution);
  };

  // 推荐表格列
  const recommendationColumns: ColumnsType<PlaybookRecommendation> = [
    {
      title: '推荐剧本',
      dataIndex: 'playbookName',
      key: 'playbookName',
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            置信度: {Math.round(record.confidence * 100)}%
          </Text>
        </div>
      )
    },
    {
      title: '推荐原因',
      dataIndex: 'reason',
      key: 'reason',
      ellipsis: true
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status === 'pending' ? '待处理' : 
           status === 'accepted' ? '已接受' : 
           status === 'rejected' ? '已拒绝' : '已过期'}
        </Tag>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => dayjs(date).format('MM-DD HH:mm')
    },
    {
      title: '操作',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          {record.status === 'pending' && (
            <>
              <Button
                type="primary"
                size="small"
                onClick={() => handleRecommendationAction(record.id, 'accept')}
              >
                接受
              </Button>
              <Button
                size="small"
                onClick={() => handleRecommendationAction(record.id, 'reject')}
              >
                拒绝
              </Button>
            </>
          )}
        </Space>
      )
    }
  ];

  // 执行记录表格列
  const executionColumns: ColumnsType<PlaybookExecution> = [
    {
      title: '剧本名称',
      dataIndex: 'playbookName',
      key: 'playbookName'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status === 'pending' ? '待开始' :
           status === 'in_progress' ? '进行中' :
           status === 'completed' ? '已完成' :
           status === 'paused' ? '已暂停' : '已取消'}
        </Tag>
      )
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress) => (
        <Progress percent={progress} size="small" />
      )
    },
    {
      title: '启动时间',
      dataIndex: 'startedAt',
      key: 'startedAt',
      render: (date) => dayjs(date).format('MM-DD HH:mm')
    },
    {
      title: '预期完成',
      dataIndex: 'expectedEndAt',
      key: 'expectedEndAt',
      render: (date) => dayjs(date).format('MM-DD HH:mm')
    }
  ];

  return (
    <>
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar size="large" style={{ backgroundColor: '#1890ff' }}>
              {customer.name?.charAt(0)}
            </Avatar>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Title level={4} style={{ margin: 0 }}>{customer.name}</Title>
                <Tag color="blue">{getPlatformDisplayName(getPlatformType(customer.id))}</Tag>
              </div>
              <Text type="secondary">客户详情</Text>
            </div>
          </div>
        }
        open={visible}
        onCancel={onClose}
        width={1200}
        footer={null}
        bodyStyle={{ padding: '24px' }}
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          {/* 基本信息 */}
          <TabPane tab="基本信息" key="overview">
            <Row gutter={24}>
              {/* 左侧基本信息 */}
              <Col span={12}>
                <Space direction="vertical" style={{ width: '100%' }} size={16}>
                  {/* 基本信息卡片 */}
                  <Card title="基本信息" size="small">
                    <Descriptions column={1} size="small">
                      <Descriptions.Item label="客户名称">{customer.name}</Descriptions.Item>
                      <Descriptions.Item label="行业">{customer.industry}</Descriptions.Item>
                      <Descriptions.Item label="企业规模">{customer.scale}</Descriptions.Item>
                      <Descriptions.Item label="客户成功经理">{customer.csm}</Descriptions.Item>
                      <Descriptions.Item label="ARR">¥{customer.arr?.toLocaleString()}</Descriptions.Item>
                      <Descriptions.Item label="生命周期阶段">
                        <Tag color="blue">{customer.lifecycleStage}</Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label="客户定级">
                        <Tag color="purple">{customer.customerTier}</Tag>
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>

                  {/* CRM信息卡片 */}
                  <Card title="CRM信息" size="small">
                    <Descriptions column={1} size="small">
                      <Descriptions.Item label="平台类型">
                        <Tag color="blue">{getPlatformDisplayName(getPlatformType(customer.id))}</Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label="已购产品">
                        <div>
                          {getPurchasedProducts(customer.id).products.map((product, index) => (
                            <Tag key={index} color="green" style={{ marginBottom: 4 }}>
                              {product}
                            </Tag>
                          ))}
                        </div>
                      </Descriptions.Item>
                      <Descriptions.Item label="增值服务">
                        <div>
                          {getPurchasedProducts(customer.id).services.map((service, index) => (
                            <Tag key={index} color="orange" style={{ marginBottom: 4 }}>
                              {service}
                            </Tag>
                          ))}
                        </div>
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>

                  {/* 健康度分析 */}
                  <Card title="健康度分析" size="small">
                    <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                      <Progress
                        type="circle"
                        percent={customer.healthScore}
                        strokeColor={getHealthColor(customer.healthScore)}
                        format={(percent) => (
                          <div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: getHealthColor(customer.healthScore) }}>
                              {percent}
                            </div>
                            <div style={{ fontSize: '12px', color: '#8c8c8c' }}>健康分</div>
                          </div>
                        )}
                      />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <Tag color={
                        customer.healthLevel === '健康' ? 'green' : 
                        customer.healthLevel === '风险' ? 'red' : 'orange'
                      }>
                        {customer.healthLevel}
                      </Tag>
                    </div>
                  </Card>

                  {/* 续约信息 */}
                  {customer.nextRenewalDate && (
                    <Card title="续约信息" size="small">
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label="下次续约日期">
                          {dayjs(customer.nextRenewalDate).format('YYYY-MM-DD')}
                        </Descriptions.Item>
                        <Descriptions.Item label="续约风险">
                          <Tag color={customer.isRenewalRisk ? 'red' : 'green'}>
                            {customer.isRenewalRisk ? '有风险' : '无风险'}
                          </Tag>
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  )}

                  {/* 联系人信息 */}
                  <Card title="主要联系人" size="small">
                    {contacts.map((contact: ContactInfo, index: number) => (
                      <div key={index} style={{ 
                        padding: '12px', 
                        border: '1px solid #f0f0f0', 
                        borderRadius: '6px',
                        marginBottom: '8px',
                        background: contact.isPrimary ? '#f6ffed' : '#fff'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '4px' }}>
                          <Avatar size="small" icon={<UserOutlined />} />
                          <Text strong>{contact.name}</Text>
                          {contact.isPrimary && <Badge status="success" text="主要" />}
                        </div>
                        <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '4px' }}>
                          {contact.title}
                        </div>
                        <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                          <PhoneOutlined /> {contact.phone} | <MailOutlined /> {contact.email}
                        </div>
                      </div>
                    ))}
                  </Card>
                </Space>
              </Col>

              {/* 右侧详细信息 */}
              <Col span={12}>
                <Space direction="vertical" style={{ width: '100%' }} size={16}>
                  {/* 客户历史记录 */}
                  <Card title="客户历史记录" size="small">
                    <Timeline
                      items={customerHistory.map((item: CustomerHistoryItem, index: number) => {
                        // 根据icon字符串渲染对应的图标组件
                        const getIconComponent = (iconName: string) => {
                          switch (iconName) {
                            case 'UserOutlined': return <UserOutlined />;
                            case 'ExclamationCircleOutlined': return <ExclamationCircleOutlined />;
                            case 'RiseOutlined': return <RiseOutlined />;
                            case 'MailOutlined': return <MailOutlined />;
                            case 'SettingOutlined': return <SettingOutlined />;
                            case 'FileTextOutlined': return <FileTextOutlined />;
                            case 'TeamOutlined': return <TeamOutlined />;
                            case 'CheckCircleOutlined': return <CheckCircleOutlined />;
                            default: return <UserOutlined />;
                          }
                        };
                        
                        return {
                          color: item.color,
                          children: (
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                {getIconComponent(item.icon)}
                                <Text strong>{item.type}</Text>
                                <Text type="secondary" style={{ fontSize: '12px' }}>{item.date}</Text>
                              </div>
                              <Text type="secondary">{item.description}</Text>
                            </div>
                          )
                        };
                      })}
                    />
                  </Card>

                  {/* 快速操作 */}
                  <Card title="快速操作" size="small">
                    <Space wrap>
                      <Button 
                        icon={<PhoneOutlined />} 
                        onClick={() => onAction('call', customer.id)}
                      >
                        拨打电话
                      </Button>
                      <Button 
                        icon={<MailOutlined />} 
                        onClick={() => onAction('email', customer.id)}
                      >
                        发送邮件
                      </Button>
                      <Button 
                        icon={<CalendarOutlined />} 
                        onClick={() => onAction('schedule', customer.id)}
                      >
                        安排会议
                      </Button>
                      <Button 
                        icon={<FileTextOutlined />} 
                        onClick={() => onAction('quote', customer.id)}
                      >
                        发送报价
                      </Button>
                      <Button 
                        icon={<TeamOutlined />} 
                        onClick={() => onAction('escalate', customer.id)}
                      >
                        升级处理
                      </Button>
                    </Space>
                  </Card>
                </Space>
              </Col>
            </Row>
          </TabPane>

          {/* 剧本推荐 */}
          <TabPane 
            tab={
              <span>
                <RobotOutlined />
                剧本推荐
                {customerRecommendations.filter(r => r.status === 'pending').length > 0 && (
                  <Badge count={customerRecommendations.filter(r => r.status === 'pending').length} style={{ marginLeft: 8 }} />
                )}
              </span>
            } 
            key="recommendations"
          >
            {customerRecommendations.length > 0 ? (
              <Table
                columns={recommendationColumns}
                dataSource={customerRecommendations}
                rowKey="id"
                pagination={false}
                size="small"
              />
            ) : (
              <Empty description="暂无剧本推荐" />
            )}
          </TabPane>

          {/* 执行记录 */}
          <TabPane 
            tab={
              <span>
                <HistoryOutlined />
                执行记录
              </span>
            } 
            key="executions"
          >
            {customerExecutions.length > 0 ? (
              <Table
                columns={executionColumns}
                dataSource={customerExecutions}
                rowKey="id"
                pagination={false}
                size="small"
              />
            ) : (
              <Empty description="暂无执行记录" />
            )}
          </TabPane>
        </Tabs>
      </Modal>

      {/* 剧本启动器 */}
      {selectedPlaybook && (
        <PlaybookLauncher
          visible={launcherVisible}
          playbook={selectedPlaybook}
          customer={customer}
          onCancel={() => {
            setLauncherVisible(false);
            setSelectedPlaybook(null);
          }}
          onLaunch={handleLaunchPlaybook}
        />
      )}
    </>
  );
};

export default CustomerDetailWithPlaybooks;