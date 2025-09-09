import React from 'react';
import { Drawer, Descriptions, Tag, Avatar, Space, Typography, Row, Col, Card, Divider, Badge } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, CalendarOutlined, DollarOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

interface CustomerDetailDrawerProps {
  visible: boolean;
  customer: {
    id: string;
    name: string;
    logoColor?: string;
    csm: string;
    industry?: string;
    customerScale?: number;
    unitPrice?: number;
    signDate?: string;
    activationRate?: number;
    quadrant?: string;
    arr?: number;
    tags?: string[];
    // 其他可能的字段
    healthScore?: number;
    riskLevel?: string;
    lifecycle?: string;
    valueScore?: number;
  } | null;
  onClose: () => void;
}

const CustomerDetailDrawer: React.FC<CustomerDetailDrawerProps> = ({ visible, customer, onClose }) => {
  if (!customer) return null;

  const getHealthColor = (score?: number) => {
    if (!score) return '#d9d9d9';
    if (score >= 80) return '#52c41a';
    if (score >= 60) return '#faad14';
    return '#ff4d4f';
  };

  const getRiskColor = (level?: string) => {
    switch (level) {
      case 'safe': return 'green';
      case 'attention': return 'orange';
      case 'risk': return 'red';
      default: return 'default';
    }
  };

  const getLifecycleColor = (lifecycle?: string) => {
    switch (lifecycle) {
      case '导入期': return 'blue';
      case '成长期': return 'green';
      case '成熟期': return 'gold';
      case '衰退期': return 'red';
      default: return 'default';
    }
  };

  return (
    <Drawer
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            style={{ backgroundColor: customer.logoColor || '#1890ff', marginRight: 12 }}
            size={40}
          >
            {customer.name.charAt(0)}
          </Avatar>
          <div>
            <Title level={4} style={{ margin: 0 }}>{customer.name}</Title>
            <Text type="secondary">{customer.industry || '未知行业'}</Text>
          </div>
        </div>
      }
      open={visible}
      onClose={onClose}
      width={600}
      placement="right"
      styles={{
        body: { padding: '24px' }
      }}
    >
      <div>
        {/* 核心指标卡片 */}
        <Row gutter={[12, 12]} style={{ marginBottom: 24 }}>
          <Col span={12}>
            <Card size="small" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 'bold', color: '#1890ff' }}>
                {customer.healthScore || 0}
              </div>
              <div style={{ color: '#8c8c8c', fontSize: 12 }}>健康分</div>
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 'bold', color: '#52c41a' }}>
                ¥{customer.arr ? (customer.arr / 10000).toFixed(1) : 0}万
              </div>
              <div style={{ color: '#8c8c8c', fontSize: 12 }}>ARR</div>
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 'bold', color: '#fa8c16' }}>
                {customer.activationRate || 0}%
              </div>
              <div style={{ color: '#8c8c8c', fontSize: 12 }}>激活率</div>
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 'bold', color: '#722ed1' }}>
                {customer.valueScore || 0}
              </div>
              <div style={{ color: '#8c8c8c', fontSize: 12 }}>价值分</div>
            </Card>
          </Col>
        </Row>

        {/* 基本信息 */}
        <Card title="基本信息" size="small" style={{ marginBottom: 16 }}>
          <Descriptions column={1} size="small" labelStyle={{ width: '80px' }}>
            <Descriptions.Item label="客户名称">{customer.name}</Descriptions.Item>
            <Descriptions.Item label="负责CSM">{customer.csm}</Descriptions.Item>
            <Descriptions.Item label="所属行业">{customer.industry || '-'}</Descriptions.Item>
            <Descriptions.Item label="客户规模">
              {customer.customerScale ? customer.customerScale.toLocaleString() : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="客单价">
              {customer.unitPrice ? `¥${(customer.unitPrice / 10000).toFixed(1)}万` : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="签约日期">{customer.signDate || '-'}</Descriptions.Item>
          </Descriptions>
        </Card>

        {/* 状态标签 */}
        <Card title="状态信息" size="small" style={{ marginBottom: 16 }}>
          <Space wrap>
            {customer.quadrant && (
              <Tag color="blue">{customer.quadrant}</Tag>
            )}
            {customer.lifecycle && (
              <Tag color={getLifecycleColor(customer.lifecycle)}>{customer.lifecycle}</Tag>
            )}
            {customer.riskLevel && (
              <Tag color={getRiskColor(customer.riskLevel)}>
                {customer.riskLevel === 'safe' ? '安全' : 
                 customer.riskLevel === 'attention' ? '关注' : '风险'}
              </Tag>
            )}
            {customer.healthScore && (
              <Badge 
                color={getHealthColor(customer.healthScore)} 
                text={`健康分: ${customer.healthScore}`} 
              />
            )}
          </Space>
        </Card>

        {/* 业务标签 */}
        {customer.tags && customer.tags.length > 0 && (
          <Card title="业务标签" size="small">
            <Space wrap>
              {customer.tags.map((tag, index) => (
                <Tag key={index} color="processing">{tag}</Tag>
              ))}
            </Space>
          </Card>
        )}
      </div>
    </Drawer>
  );
};

export default CustomerDetailDrawer;