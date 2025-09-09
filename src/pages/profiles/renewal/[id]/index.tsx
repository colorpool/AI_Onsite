import React, { useState, useEffect } from 'react';
import { Helmet } from '@umijs/max';
import {
  Button,
  Typography,
  Card,
  Space,
  Tag,
  Divider,
  message,
  Row,
  Col,
  Tabs,
  Descriptions,
  Progress,
  Statistic
} from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  DollarOutlined,
  TrophyOutlined,
  ShareAltOutlined,
  FileTextOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { useNavigate, useParams, useLocation } from 'umi';
import { mockRenewalCustomers } from '../../service/renewal-management';
import { Customer } from '../../../../types/continuousService';
import { RenewalCustomer } from '../../service/renewal-management';
import { getPlatformType } from '../../../../mock/continuousServiceData';
import RenewalDetailHeader from '../../../../components/renewal/RenewalDetailHeader';

const { Title, Text } = Typography;

// 页签样式
const tabStyles = {
  tabBar: {
    margin: 0,
    backgroundColor: '#fff',
    borderBottom: '1px solid #f0f0f0',
    padding: '0 24px'
  },
  tab: {
    padding: '8px 24px',
    margin: '0',
    border: 'none',
    background: 'transparent',
    transition: 'all 0.3s ease',
    textAlign: 'center'
  },
  tabActive: {
    background: '#fff',
    borderBottom: '2px solid #1890ff'
  },
  tabBtn: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#666',
    transition: 'color 0.3s ease',
    whiteSpace: 'nowrap'
  },
  tabBtnActive: {
    color: '#1890ff',
    fontWeight: 600
  }
};

const RenewalDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  
  const [renewalData, setRenewalData] = useState<RenewalCustomer | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');



  // 从URL参数获取默认标签页
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  // 加载数据
  useEffect(() => {
    const loadData = async () => {
      if (!id) {
        message.error('客户ID不能为空');
        navigate('/profiles/renewal');
        return;
      }

      try {
        setLoading(true);
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const customer = mockRenewalCustomers.find((c: RenewalCustomer) => c.id === id);
        if (!customer) {
          message.error('客户不存在');
          navigate('/profiles/renewal');
          return;
        }
        
        setRenewalData(customer);
      } catch (error) {
        console.error('加载客户数据失败:', error);
        message.error('加载客户数据失败');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, navigate]);

  // 处理返回
  const handleBack = () => {
    // 触发删除当前详情页tab的事件
    const event = new CustomEvent('tabClose', {
      detail: { path: location.pathname }
    });
    window.dispatchEvent(event);
    
    // 延迟导航，确保tab删除事件先处理
    setTimeout(() => {
      navigate('/profiles/renewal');
    }, 50);
  };

  // 获取健康度颜色
  const getHealthColor = (score: number) => {
    if (score >= 80) return '#52c41a';
    if (score >= 60) return '#faad14';
    return '#ff4d4f';
  };

  // 获取续约状态颜色
  const getRenewalStatusColor = (status: string) => {
    switch (status) {
      case '已续约': return 'green';
      case '续约中': return 'blue';
      case '风险': return 'red';
      case '待跟进': return 'orange';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Text>加载中...</Text>
      </div>
    );
  }

  if (!renewalData) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Text>客户数据不存在</Text>
      </div>
    );
  }

  // 概览标签页内容
  const OverviewTab = () => (
    <div style={{ padding: '24px' }}>
      <Row gutter={[24, 24]}>
        {/* 基本信息 */}
        <Col span={24}>
          <Card title="基本信息" size="small">
            <Descriptions column={2} size="small">
              <Descriptions.Item label="客户名称">{renewalData.customerName}</Descriptions.Item>
              <Descriptions.Item label="客户编号">{renewalData.id}</Descriptions.Item>
              <Descriptions.Item label="合同到期时间">{renewalData.contractExpiryDate}</Descriptions.Item>
              <Descriptions.Item label="续约状态">
                <Tag color={getRenewalStatusColor(renewalData.renewalStatus)}>
                  {renewalData.renewalStatus}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="健康度评分">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Progress 
                    percent={renewalData.healthScore} 
                    size="small" 
                    strokeColor={getHealthColor(renewalData.healthScore)}
                    style={{ width: '100px' }}
                  />
                  <Text strong style={{ color: getHealthColor(renewalData.healthScore) }}>
                    {renewalData.healthScore}分
                  </Text>
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="ARR">
                <Statistic 
                  value={renewalData.arr} 
                  prefix="¥" 
                  valueStyle={{ fontSize: '16px', color: '#1890ff' }}
                />
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* 续约风险分析 */}
        <Col span={12}>
          <Card title="续约风险分析" size="small">
            <div style={{ padding: '16px 0' }}>
              <div style={{ marginBottom: '16px' }}>
                <Text strong>主要风险因素：</Text>
                <div style={{ marginTop: '8px' }}>
                  <Tag color="red">使用频率下降</Tag>
                  <Tag color="orange">关键联系人离职</Tag>
                  <Tag color="yellow">预算压缩</Tag>
                </div>
              </div>
              <div>
                <Text strong>建议措施：</Text>
                <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  <li>加强产品培训和使用指导</li>
                  <li>建立多层级联系人关系</li>
                  <li>展示ROI和业务价值</li>
                </ul>
              </div>
            </div>
          </Card>
        </Col>

        {/* 续约进展 */}
        <Col span={12}>
          <Card title="续约进展" size="small">
            <div style={{ padding: '16px 0' }}>
              <div style={{ marginBottom: '16px' }}>
                <Text strong>当前阶段：</Text>
                <Tag color="blue" style={{ marginLeft: '8px' }}>商务谈判</Tag>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <Text strong>预计签约时间：</Text>
                <Text style={{ marginLeft: '8px' }}>2024-03-15</Text>
              </div>
              <div>
                <Text strong>负责人：</Text>
                <Text style={{ marginLeft: '8px' }}>张经理</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );

  // 合同信息标签页内容
  const ContractTab = () => (
    <div style={{ padding: '24px' }}>
      <Card title="合同详情" size="small">
        <Descriptions column={2} size="small">
          <Descriptions.Item label="当前合同金额">¥{renewalData.arr.toLocaleString()}</Descriptions.Item>
          <Descriptions.Item label="合同开始时间">2023-01-01</Descriptions.Item>
          <Descriptions.Item label="合同到期时间">{renewalData.contractExpiryDate}</Descriptions.Item>
          <Descriptions.Item label="付款方式">年付</Descriptions.Item>
          <Descriptions.Item label="服务等级">标准版</Descriptions.Item>
          <Descriptions.Item label="用户数量">100人</Descriptions.Item>
          <Descriptions.Item label="存储空间">1TB</Descriptions.Item>
          <Descriptions.Item label="技术支持">工作日 9:00-18:00</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );

  // 使用情况标签页内容
  const UsageTab = () => (
    <div style={{ padding: '24px' }}>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Card title="使用统计" size="small">
            <div style={{ padding: '16px 0' }}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Statistic title="月活跃用户" value={75} suffix="/ 100" />
                </Col>
                <Col span={12}>
                  <Statistic title="日均登录" value={45} suffix="人" />
                </Col>
                <Col span={12}>
                  <Statistic title="功能使用率" value={68} suffix="%" />
                </Col>
                <Col span={12}>
                  <Statistic title="存储使用" value={650} suffix="/ 1024 GB" />
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="使用趋势" size="small">
            <div style={{ padding: '16px 0', textAlign: 'center' }}>
              <Text type="secondary">使用趋势图表</Text>
              <div style={{ height: '200px', background: '#f5f5f5', marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Text type="secondary">图表占位符</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );

  // 沟通记录标签页内容
  const CommunicationTab = () => (
    <div style={{ padding: '24px' }}>
      <Card title="最近沟通记录" size="small">
        <div style={{ padding: '16px 0' }}>
          <div style={{ marginBottom: '16px', padding: '12px', background: '#f9f9f9', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <Text strong>续约意向确认</Text>
              <Text type="secondary">2024-01-15</Text>
            </div>
            <Text>与客户CTO沟通，确认续约意向积极，但需要调整服务等级。</Text>
          </div>
          <div style={{ marginBottom: '16px', padding: '12px', background: '#f9f9f9', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <Text strong>商务条款讨论</Text>
              <Text type="secondary">2024-01-10</Text>
            </div>
            <Text>讨论新合同的商务条款，客户希望获得更多折扣。</Text>
          </div>
          <div style={{ marginBottom: '16px', padding: '12px', background: '#f9f9f9', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <Text strong>产品培训</Text>
              <Text type="secondary">2024-01-05</Text>
            </div>
            <Text>为客户团队提供新功能培训，提升产品使用率。</Text>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>续约详情</title>
      </Helmet>
      
      <div style={{ 
        background: '#f5f5f5',
        minHeight: 'calc(100vh - 64px)',
        padding: '32px 40px'
      }}>
        {/* 页面头部 */}
        <div style={{ marginBottom: '24px' }}>
          <RenewalDetailHeader 
             customerData={{
               id: renewalData.id,
               name: renewalData.customerName,
               contractNumber: `CONT-2023-${renewalData.id.slice(-3)}`,
               healthScore: renewalData.healthScore,
               renewalAmount: renewalData.arr,
               expiryDate: renewalData.contractExpiryDate,
               status: renewalData.status === '流失风险' ? 'at_risk' : 
                      renewalData.status === '意向明确' ? 'active' : 
                      renewalData.status === '谈判中' ? 'negotiating' : 'pending'
             }}
             onBack={handleBack}
             onEdit={() => message.info('编辑功能开发中')}
             onViewContract={() => message.info('查看合同功能开发中')}
             onShare={() => message.info('分享功能开发中')}
           />
        </div>

        {/* 标签页内容 */}
        <Card style={{
          borderRadius: '8px',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)'
        }}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            style={{ margin: 0 }}
            tabBarStyle={tabStyles.tabBar}
            items={[
              {
                key: 'overview',
                label: '概览',
                children: <OverviewTab />
              },
              {
                key: 'contract',
                label: '合同信息',
                children: <ContractTab />
              },
              {
                key: 'usage',
                label: '使用情况',
                children: <UsageTab />
              },
              {
                key: 'communication',
                label: '沟通记录',
                children: <CommunicationTab />
              }
            ]}
          />
        </Card>
      </div>
    </>
  );
};

export default RenewalDetailPage;