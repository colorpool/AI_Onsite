import React from 'react';
import { Row, Col, Card, Statistic, Typography, Space, Tooltip } from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined, 
  InfoCircleOutlined,
  TeamOutlined,
  CrownOutlined,
  UserAddOutlined,
  ExclamationCircleOutlined,
  DollarCircleOutlined,
  PercentageOutlined,
  DashboardOutlined
} from '@ant-design/icons';

const { Text } = Typography;

export interface KPIData {
  totalCustomers: {
    value: number;
    change: number;
    changeType: 'increase' | 'decrease' | 'stable';
  };
  highValueCustomers: {
    value: number;
    change: number;
    changeType: 'increase' | 'decrease' | 'stable';
  };
  newSignups: {
    value: number;
    change: number;
    changeType: 'increase' | 'decrease' | 'stable';
  };
  highRiskCustomers: {
    value: number;
    change: number;
    changeType: 'increase' | 'decrease' | 'stable';
  };
  currentARR: {
    value: number;
    change: number;
    changeType: 'increase' | 'decrease' | 'stable';
  };
  retentionRates: {
    grr: number; // Gross Revenue Retention
    nrr: number; // Net Revenue Retention
    grrChange: number;
    nrrChange: number;
  };
}

export interface KPISummaryProps {
  data: KPIData;
  loading?: boolean;
}

const KPISummary: React.FC<KPISummaryProps> = ({ data, loading = false }) => {
  const _formatNumber = (num: number): string => {
    if (num >= 10000) {
      return `${(num / 10000).toFixed(1)}万`;
    }
    return num.toString();
  };

  const formatCustomerCount = (num: number): string => {
    if (num >= 10000) {
      return `${Math.floor(num / 10000)}万`;
    }
    return num.toString();
  };

  const formatCurrency = (num: number): string => {
    if (num >= 100000000) {
      return `¥${(num / 100000000).toFixed(1)}亿`;
    }
    if (num >= 10000) {
      return `¥${(num / 10000).toFixed(1)}万`;
    }
    return `¥${num.toLocaleString()}`;
  };

  const getChangeIcon = (changeType: 'increase' | 'decrease' | 'stable') => {
    if (changeType === 'increase') {
      return <ArrowUpOutlined style={{ color: '#ff4d4f' }} />;
    }
    if (changeType === 'decrease') {
      return <ArrowDownOutlined style={{ color: '#52c41a' }} />;
    }
    return null;
  };

  const getChangeColor = (changeType: 'increase' | 'decrease' | 'stable') => {
    if (changeType === 'increase') return '#ff4d4f';
    if (changeType === 'decrease') return '#52c41a';
    return '#8c8c8c';
  };

  const cardStyle = {
    borderRadius: '8px',
    border: '1px solid #e8e8e8',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    background: '#fff',
    height: '140px'
  };

  const bodyStyle = {
    padding: '16px 12px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between'
  };

  return (
    <div style={{
      background: '#fff',
      padding: '16px',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: '1px solid #e8e8e8',
      marginBottom: '16px'
    }}>
      <div style={{ marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <DashboardOutlined style={{ fontSize: '16px', color: '#1890ff', marginRight: '8px' }} />
          <Text style={{ fontSize: '14px', fontWeight: 600, color: '#262626' }}>
            关键指标概览
          </Text>
          <Text type="secondary" style={{ marginLeft: '8px', fontSize: '12px' }}>
            数据随筛选条件实时更新
          </Text>
        </div>
      </div>
      
      <Row gutter={[16, 16]}>
        {/* 客户总数 */}
        <Col xs={12} sm={8} lg={4}>
          <Card size="small" style={cardStyle} bodyStyle={bodyStyle}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <TeamOutlined style={{ fontSize: '16px', color: '#1890ff', marginRight: '8px' }} />
                <Space>
                  <span style={{ fontSize: '12px', color: '#8c8c8c' }}>客户总数</span>
                  <Tooltip title="当前筛选条件下的客户总数量">
                    <InfoCircleOutlined style={{ color: '#8c8c8c', fontSize: '12px' }} />
                  </Tooltip>
                </Space>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#262626' }}>
                {loading ? '-' : formatCustomerCount(data.totalCustomers.value)}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {getChangeIcon(data.totalCustomers.changeType)}
              <Text 
                style={{ 
                  marginLeft: '4px', 
                  fontSize: '12px',
                  color: getChangeColor(data.totalCustomers.changeType)
                }}
              >
                {Math.abs(Math.floor(data.totalCustomers.change))}
              </Text>
              <Text type="secondary" style={{ marginLeft: '4px', fontSize: '12px' }}>
                vs上期
              </Text>
            </div>
          </Card>
        </Col>

        {/* 高价值客户数 */}
        <Col xs={12} sm={8} lg={4}>
          <Card size="small" style={cardStyle} bodyStyle={bodyStyle}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <CrownOutlined style={{ fontSize: '16px', color: '#faad14', marginRight: '8px' }} />
                <Space>
                  <span style={{ fontSize: '12px', color: '#8c8c8c' }}>高价值客户</span>
                  <Tooltip title="价值评分≥80分的客户数量">
                    <InfoCircleOutlined style={{ color: '#8c8c8c', fontSize: '12px' }} />
                  </Tooltip>
                </Space>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#262626' }}>
                {loading ? '-' : formatCustomerCount(data.highValueCustomers.value)}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {getChangeIcon(data.highValueCustomers.changeType)}
              <Text 
                style={{ 
                  marginLeft: '4px', 
                  fontSize: '12px',
                  color: getChangeColor(data.highValueCustomers.changeType)
                }}
              >
                {Math.abs(Math.floor(data.highValueCustomers.change))}
              </Text>
              <Text type="secondary" style={{ marginLeft: '4px', fontSize: '12px' }}>
                vs上期
              </Text>
            </div>
          </Card>
        </Col>

        {/* 新签客户数 */}
        <Col xs={12} sm={8} lg={4}>
          <Card size="small" style={cardStyle} bodyStyle={bodyStyle}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <UserAddOutlined style={{ fontSize: '16px', color: '#52c41a', marginRight: '8px' }} />
                <Space>
                  <span style={{ fontSize: '12px', color: '#8c8c8c' }}>新签客户</span>
                  <Tooltip title="本期新签约的客户数量">
                    <InfoCircleOutlined style={{ color: '#8c8c8c', fontSize: '12px' }} />
                  </Tooltip>
                </Space>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#262626' }}>
                {loading ? '-' : formatCustomerCount(data.newSignups.value)}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {getChangeIcon(data.newSignups.changeType)}
              <Text 
                style={{ 
                  marginLeft: '4px', 
                  fontSize: '12px',
                  color: getChangeColor(data.newSignups.changeType)
                }}
              >
                {Math.abs(Math.floor(data.newSignups.change))}
              </Text>
              <Text type="secondary" style={{ marginLeft: '4px', fontSize: '12px' }}>
                vs上期
              </Text>
            </div>
          </Card>
        </Col>

        {/* 高风险客户数 */}
        <Col xs={12} sm={8} lg={4}>
          <Card size="small" style={cardStyle} bodyStyle={bodyStyle}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <ExclamationCircleOutlined style={{ fontSize: '16px', color: '#ff4d4f', marginRight: '8px' }} />
                <Space>
                  <span style={{ fontSize: '12px', color: '#8c8c8c' }}>高风险客户</span>
                  <Tooltip title="健康度评分<60分或有流失风险的客户">
                    <InfoCircleOutlined style={{ color: '#8c8c8c', fontSize: '12px' }} />
                  </Tooltip>
                </Space>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#262626' }}>
                {loading ? '-' : formatCustomerCount(data.highRiskCustomers.value)}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {getChangeIcon(data.highRiskCustomers.changeType)}
              <Text 
                style={{ 
                  marginLeft: '4px', 
                  fontSize: '12px',
                  color: getChangeColor(data.highRiskCustomers.changeType)
                }}
              >
                {Math.abs(Math.floor(data.highRiskCustomers.change))}
              </Text>
              <Text type="secondary" style={{ marginLeft: '4px', fontSize: '12px' }}>
                vs上期
              </Text>
            </div>
          </Card>
        </Col>

        {/* 本期ARR */}
        <Col xs={12} sm={8} lg={4}>
          <Card size="small" style={cardStyle} bodyStyle={bodyStyle}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <DollarCircleOutlined style={{ fontSize: '16px', color: '#722ed1', marginRight: '8px' }} />
                <Space>
                  <span style={{ fontSize: '12px', color: '#8c8c8c' }}>本期ARR</span>
                  <Tooltip title="Annual Recurring Revenue - 年度经常性收入">
                    <InfoCircleOutlined style={{ color: '#8c8c8c', fontSize: '12px' }} />
                  </Tooltip>
                </Space>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#262626' }}>
                {loading ? '-' : formatCurrency(data.currentARR.value)}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {getChangeIcon(data.currentARR.changeType)}
              <Text 
                style={{ 
                  marginLeft: '4px', 
                  fontSize: '12px',
                  color: getChangeColor(data.currentARR.changeType)
                }}
              >
                {formatCurrency(Math.abs(data.currentARR.change))}
              </Text>
              <Text type="secondary" style={{ marginLeft: '4px', fontSize: '12px' }}>
                vs上期
              </Text>
            </div>
          </Card>
        </Col>

        {/* 留存率 */}
        <Col xs={12} sm={8} lg={4}>
          <Card size="small" style={cardStyle} bodyStyle={bodyStyle}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <PercentageOutlined style={{ fontSize: '16px', color: '#13c2c2', marginRight: '8px' }} />
                <Space>
                  <span style={{ fontSize: '12px', color: '#8c8c8c' }}>留存率</span>
                  <Tooltip title="客户留存和收入留存指标">
                    <InfoCircleOutlined style={{ color: '#8c8c8c', fontSize: '12px' }} />
                  </Tooltip>
                </Space>
              </div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#262626' }}>
                GRR: {loading ? '-' : `${data.retentionRates.grr.toFixed(2)}%`}
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#262626', marginTop: '4px' }}>
                NRR: {loading ? '-' : `${data.retentionRates.nrr.toFixed(2)}%`}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {getChangeIcon(data.retentionRates.grrChange > 0 ? 'increase' : data.retentionRates.grrChange < 0 ? 'decrease' : 'stable')}
                <Text 
                  style={{ 
                    marginLeft: '4px', 
                    fontSize: '10px',
                    color: getChangeColor(data.retentionRates.grrChange > 0 ? 'increase' : data.retentionRates.grrChange < 0 ? 'decrease' : 'stable')
                  }}
                >
                  {Math.abs(data.retentionRates.grrChange).toFixed(2)}%
                </Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {getChangeIcon(data.retentionRates.nrrChange > 0 ? 'increase' : data.retentionRates.nrrChange < 0 ? 'decrease' : 'stable')}
                <Text 
                  style={{ 
                    marginLeft: '4px', 
                    fontSize: '10px',
                    color: getChangeColor(data.retentionRates.nrrChange > 0 ? 'increase' : data.retentionRates.nrrChange < 0 ? 'decrease' : 'stable')
                  }}
                >
                  {Math.abs(data.retentionRates.nrrChange).toFixed(2)}%
                </Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default KPISummary;