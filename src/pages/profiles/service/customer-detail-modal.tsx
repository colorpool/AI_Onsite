import React, { useState } from 'react';
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
  Tooltip
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
  TrendingUpOutlined,
  FileTextOutlined,
  TeamOutlined,
  SettingOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

interface CustomerDetailModalProps {
  visible: boolean;
  customer: any;
  onClose: () => void;
  onAction: (action: string, customerId: string) => void;
}

const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({
  visible,
  customer,
  onClose,
  onAction
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!customer) return null;

  // 模拟客户历史记录
  const customerHistory = [
    {
      date: '2024-02-28',
      type: '续约状态更新',
      description: '续约状态更新为"流失风险"',
      icon: <ExclamationCircleOutlined />,
      color: '#fa541c'
    },
    {
      date: '2024-02-25',
      type: '客户拜访',
      description: '进行客户拜访，了解续约意向',
      icon: <UserOutlined />,
      color: '#1890ff'
    },
    {
      date: '2024-02-20',
      type: '健康分下降',
      description: '客户健康分从75下降到45',
      icon: <TrendingUpOutlined />,
      color: '#fa541c'
    },
    {
      date: '2024-02-15',
      type: '续约提醒',
      description: '发送续约提醒邮件',
      icon: <MailOutlined />,
      color: '#1890ff'
    },
    {
      date: '2024-02-10',
      type: '技术支持',
      description: '解决API集成问题',
      icon: <SettingOutlined />,
      color: '#52c41a'
    }
  ];

  // 模拟续约建议
  const renewalSuggestions = [
    {
      type: '紧急行动',
      title: '立即安排客户拜访',
      description: '客户健康分较低，建议立即安排面对面沟通',
      priority: 'high',
      action: 'schedule_visit'
    },
    {
      type: '风险缓解',
      title: '制定挽留方案',
      description: '针对活跃度下降问题制定专门的挽留策略',
      priority: 'medium',
      action: 'create_retention_plan'
    },
    {
      type: '价值展示',
      title: 'ROI分析报告',
      description: '准备详细的ROI分析报告，展示产品价值',
      priority: 'medium',
      action: 'prepare_roi_report'
    }
  ];

  // 模拟联系人信息
  const contacts = [
    {
      name: '张三',
      title: '技术总监',
      phone: '138****1234',
      email: 'zhangsan@company.com',
      isPrimary: true
    },
    {
      name: '李四',
      title: '采购经理',
      phone: '139****5678',
      email: 'lisi@company.com',
      isPrimary: false
    }
  ];

  const getHealthColor = (score: number) => {
    if (score >= 80) return '#52c41a';
    if (score >= 60) return '#faad14';
    return '#fa541c';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#fa541c';
      case 'medium': return '#faad14';
      case 'low': return '#52c41a';
      default: return '#8c8c8c';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return '未知';
    }
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar size="large" style={{ backgroundColor: '#1890ff' }}>
            {customer.customerName?.charAt(0)}
          </Avatar>
          <div>
            <Title level={4} style={{ margin: 0 }}>{customer.customerName}</Title>
            <Text type="secondary">续约客户详情</Text>
          </div>
        </div>
      }
      open={visible}
      onCancel={onClose}
      width={1000}
      footer={null}
      bodyStyle={{ padding: '24px' }}
    >
      <Row gutter={24}>
        {/* 左侧基本信息 */}
        <Col span={12}>
          <Space direction="vertical" style={{ width: '100%' }} size="16">
            
            {/* 基本信息卡片 */}
            <Card title="基本信息" size="small">
              <Descriptions column={1} size="small">
                <Descriptions.Item label="客户名称">{customer.customerName}</Descriptions.Item>
                <Descriptions.Item label="负责人">{customer.owner}</Descriptions.Item>
                <Descriptions.Item label="合同到期日">{customer.contractExpiryDate}</Descriptions.Item>
                <Descriptions.Item label="续约金额">
                  <Text strong style={{ color: '#1890ff', fontSize: '16px' }}>
                    ¥{customer.renewalAmount?.toLocaleString()}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label="剩余天数">
                  <Text style={{ color: customer.daysToExpiry <= 15 ? '#fa541c' : '#8c8c8c' }}>
                    {customer.daysToExpiry} 天
                  </Text>
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
                } size="large">
                  {customer.healthLevel}
                </Tag>
              </div>
            </Card>

            {/* 风险与机会 */}
            {(customer.riskReason || customer.opportunityPoint) && (
              <Card title="风险与机会" size="small">
                {customer.riskReason && (
                  <Alert
                    message="风险提示"
                    description={customer.riskReason}
                    type="warning"
                    showIcon
                    style={{ marginBottom: '12px' }}
                  />
                )}
                {customer.opportunityPoint && (
                  <Alert
                    message="机会点"
                    description={customer.opportunityPoint}
                    type="success"
                    showIcon
                  />
                )}
              </Card>
            )}

            {/* 联系人信息 */}
            <Card title="主要联系人" size="small">
              {contacts.map((contact, index) => (
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
          <Space direction="vertical" style={{ width: '100%' }} size="16">
            
            {/* 续约建议 */}
            <Card title="续约建议" size="small">
              {renewalSuggestions.map((suggestion, index) => (
                <div key={index} style={{ 
                  padding: '12px', 
                  border: '1px solid #f0f0f0', 
                  borderRadius: '6px',
                  marginBottom: '12px',
                  borderLeft: `4px solid ${getPriorityColor(suggestion.priority)}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <Text strong>{suggestion.title}</Text>
                    <Tag color={getPriorityColor(suggestion.priority)}>
                      {getPriorityText(suggestion.priority)}优先级
                    </Tag>
                  </div>
                  <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '8px' }}>
                    {suggestion.description}
                  </div>
                  <Button 
                    size="small" 
                    type="primary"
                    onClick={() => onAction(suggestion.action, customer.key)}
                  >
                    执行
                  </Button>
                </div>
              ))}
            </Card>

            {/* 客户历史记录 */}
            <Card title="客户历史记录" size="small">
              <Timeline
                items={customerHistory.map((item, index) => ({
                  color: item.color,
                  children: (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <Text strong>{item.type}</Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>{item.date}</Text>
                      </div>
                      <div style={{ fontSize: '13px' }}>{item.description}</div>
                    </div>
                  ),
                }))}
              />
            </Card>

            {/* 快速操作 */}
            <Card title="快速操作" size="small">
              <Space wrap>
                <Button 
                  icon={<PhoneOutlined />} 
                  onClick={() => onAction('call', customer.key)}
                >
                  拨打电话
                </Button>
                <Button 
                  icon={<MailOutlined />} 
                  onClick={() => onAction('email', customer.key)}
                >
                  发送邮件
                </Button>
                <Button 
                  icon={<CalendarOutlined />} 
                  onClick={() => onAction('schedule', customer.key)}
                >
                  安排会议
                </Button>
                <Button 
                  icon={<FileTextOutlined />} 
                  onClick={() => onAction('quote', customer.key)}
                >
                  发送报价
                </Button>
                <Button 
                  icon={<TeamOutlined />} 
                  onClick={() => onAction('escalate', customer.key)}
                >
                  升级处理
                </Button>
              </Space>
            </Card>
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};

export default CustomerDetailModal;
