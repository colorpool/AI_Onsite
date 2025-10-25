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
  Statistic,
  Timeline
} from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  DollarOutlined,
  TrophyOutlined,
  ShareAltOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { useNavigate, useParams, useLocation } from 'umi';
import { renewalCustomers, RenewalCustomer } from '../../../../mock/renewalData';
import RenewalDetailHeader from '../../../../components/renewal/RenewalDetailHeader';
import CustomerProfileTab from '../../../../components/common/CustomerProfileTab';
import ServiceRecordTab from '../../../../components/common/ServiceRecordTab';
import CustomerJourneyTimeline from '../../../../components/common/CustomerJourneyTimeline';
import ServiceRecordAdapter from '../../../../utils/serviceRecordAdapter';
import { getCustomerJourney } from '../../../../data/mockCustomerJourney';

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
  
  const [activeTab, setActiveTab] = useState('profile');

  // 根据客户ID查找续约数据（ID格式：0001 -> CUST-0001）
  const customerId = `CUST-${id?.padStart(4, '0')}`;
  const renewalData = renewalCustomers.find(c => c.id === customerId);
  console.log('续约详情页 - 查找客户ID:', customerId, '找到的数据:', renewalData);

  // 获取服务记录数据
  const [serviceRecords, setServiceRecords] = useState(() => {
    if (renewalData) {
      return ServiceRecordAdapter.getServiceRecordsByName(renewalData.name);
    }
    return [];
  });

  // 从URL参数获取默认标签页
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  // 检查客户是否存在
  useEffect(() => {
    if (!id) {
      message.error('客户ID不能为空');
      navigate('/profiles/renewal');
      return;
    }

    if (!renewalData) {
      message.error('客户不存在');
      navigate('/profiles/renewal');
      return;
    }
  }, [id, renewalData, navigate]);

  // 处理新增服务记录
  const handleAddServiceRecord = (record: any) => {
    if (renewalData) {
      ServiceRecordAdapter.addServiceRecord(renewalData.id, record);
      // 更新本地状态
      setServiceRecords(ServiceRecordAdapter.getServiceRecordsByName(renewalData.name));
    }
  };

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

  if (!renewalData) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Text>客户数据不存在</Text>
      </div>
    );
  }

  // 客户档案标签页内容（原概览标签页）
  const OverviewTab = () => (
    <div style={{ padding: '24px' }}>
      <Row gutter={[24, 24]}>
        {/* 基本信息 */}
        <Col span={24}>
          <Card title="基本信息" size="small">
            <Descriptions 
              column={2} 
              size="small"
              labelStyle={{ width: '180px', minWidth: '180px' }}
            >
              <Descriptions.Item label="客户名称">{renewalData.name}</Descriptions.Item>
              <Descriptions.Item label="客户编号">{renewalData.id}</Descriptions.Item>
              <Descriptions.Item label="合同到期时间">{renewalData.contractEndDate}</Descriptions.Item>
              <Descriptions.Item label="续约状态">
                <Tag color={getRenewalStatusColor(renewalData.renewalStage)}>
                  {renewalData.renewalStage}
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
  const ContractTab = () => {
    // 模拟合同数据，包含当期续约合同和历史合同
    const contractData = [
      {
        id: 'current',
        contractNumber: `CONT-2024-${renewalData.id.slice(-3)}`,
        status: 'active',
        amount: renewalData.arr,
        startDate: '2024-01-01',
        endDate: renewalData.contractEndDate,
        servicePeriod: '2024-01-01 至 ' + renewalData.contractEndDate,
        purchasedProducts: ['企微版', 'AI助手'],
        accountCount: 100,
        userVersion: '100人版',
        ticketVersion: 'V2.1',
        ticketTime: '2024-01-15',
        tianyuanOrderStatus: 'active',
        tianyuanOrderId: 'TY-2024-001',
        contractPlatform: '天元合同平台',
        signerName: '张经理',
        signerContact: '13800138000',
        userType: '采购账号数量',
        attachments: [
          {
            id: 'att_001',
            name: '续约合同.pdf',
            type: 'contract',
            url: '/attachments/renewal-contract.pdf',
            size: 2048576,
            uploadDate: '2024-01-01'
          }
        ]
      },
      {
        id: 'history_1',
        contractNumber: `CONT-2023-${renewalData.id.slice(-3)}`,
        status: 'expired',
        amount: renewalData.arr * 0.8,
        startDate: '2023-01-01',
        endDate: '2023-12-31',
        servicePeriod: '2023-01-01 至 2023-12-31',
        purchasedProducts: ['企微版'],
        accountCount: 80,
        userVersion: '80人版',
        ticketVersion: 'V2.0',
        ticketTime: '2023-01-10',
        tianyuanOrderStatus: 'inactive',
        tianyuanOrderId: 'TY-2023-001',
        contractPlatform: '天元合同平台',
        signerName: '李经理',
        signerContact: '13900139000',
        userType: '采购账号数量',
        attachments: []
      }
    ];

    const getContractStatusConfig = (status: string) => {
      const configs: Record<string, { color: string; text: string }> = {
        'active': { color: '#52c41a', text: '生效中' },
        'expired': { color: '#fa8c16', text: '已到期' },
        'terminated': { color: '#f5222d', text: '已终止' }
      };
      return configs[status] || { color: '#8c8c8c', text: '未知' };
    };

    return (
      <div style={{ padding: '8px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <Text type="secondary" style={{ fontSize: '14px' }}>
            共 {contractData.length} 份合同（当期续约合同和过往全部合同）
          </Text>
        </div>
        <Timeline
          style={{ padding: '16px 0' }}
          items={contractData.map((contract, index) => {
            const statusConfig = getContractStatusConfig(contract.status);
            
            return {
              color: statusConfig.color,
              dot: <DollarOutlined />,
              children: (
                <div style={{ 
                  padding: '16px', 
                  background: '#f8f9fa', 
                  borderRadius: '8px',
                  border: '1px solid #e8e8e8'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                      <Tag color={statusConfig.color} style={{ marginRight: '8px' }}>
                        {statusConfig.text}
                      </Tag>
                      <Text strong style={{ fontSize: '14px' }}>
                        {contract.contractNumber}
                      </Text>
                      {index === 0 && (
                        <Tag color="blue" style={{ marginLeft: '8px' }}>
                          当期续约
                        </Tag>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        {contract.startDate} - {contract.endDate}
                      </Text>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <Text strong>合同金额：</Text>
                    <Text style={{ color: '#1890ff', fontWeight: '600' }}>
                      ¥{contract.amount?.toLocaleString() || '0'}
                    </Text>
                  </div>
                  
                  <div style={{ marginBottom: '8px' }}>
                    <Text strong>购买产品：</Text>
                    <div style={{ marginTop: '4px' }}>
                      {contract.purchasedProducts?.map((product: string, idx: number) => (
                        <Tag key={idx} style={{ marginBottom: '4px' }}>
                          {product}
                        </Tag>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '8px' }}>
                    <Text strong>天元下单版本：</Text>
                    <Text>{contract.ticketVersion} </Text>
                    <Text strong style={{ marginLeft: '16px' }}>天元提单到期时间：</Text>
                    <Text>{contract.ticketTime}</Text>
                  </div>

                  <div style={{ marginBottom: '8px' }}>
                    <Text strong>合同签约平台：</Text>
                    <Text>{contract.contractPlatform} </Text>
                    <Text strong style={{ marginLeft: '16px' }}>客户侧合同签约人：</Text>
                    <Text>{contract.signerName}（{contract.signerContact}）</Text>
                  </div>

                  <div style={{ marginBottom: '8px' }}>
                    <Text strong>用户数量：</Text>
                    <Text>{contract.accountCount}个（{contract.userType}）</Text>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <Text strong>服务周期：</Text>
                      <Text> {contract.servicePeriod}</Text>
                    </div>
                    {contract.attachments && contract.attachments.length > 0 && (
                      <Button
                        type="primary"
                        size="small"
                        icon={<EyeOutlined />}
                        onClick={() => message.info('查看附件功能开发中')}
                      >
                        查看附件({contract.attachments.length})
                      </Button>
                    )}
                  </div>
                </div>
              )
            };
          })}
        />
      </div>
    );
  };



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
               name: renewalData.name,
               contractNumber: `CONT-2023-${renewalData.id.slice(-3)}`,
               healthScore: renewalData.healthScore,
               renewalAmount: renewalData.arr,
               expiryDate: renewalData.contractEndDate,
               status: renewalData.renewalStage === '已流失' ? 'at_risk' : 
                      renewalData.renewalStage === '已完成' ? 'active' : 
                      renewalData.renewalStage === '商务谈判' ? 'negotiating' : 'pending',
               lastContactDays: Math.floor((new Date().getTime() - new Date(renewalData.lastContactDate).getTime()) / (1000 * 60 * 60 * 24))
             }}
             onBack={handleBack}
             onEdit={() => message.info('编辑功能开发中')}
             onViewContract={() => message.info('查看合同功能开发中')}
             onShare={() => message.info('分享功能开发中')}
           />
        </div>

        {/* 客户旅程时间轴 */}
        <CustomerJourneyTimeline 
          customerId={id || ''}
          journeyType="renewal"
          style={{ marginBottom: '24px' }}
        />

        {/* 标签页内容 */}
        <Card 
          style={{
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
            border: '1px solid #f0f0f0',
            background: '#ffffff',
            minHeight: '420px'
          }}
          bodyStyle={{ paddingTop: '0px' }}
        >
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            size="middle"
            type="line"
            style={{ height: '100%' }}
            tabBarStyle={{
              margin: 0,
              backgroundColor: '#fff',
              borderBottom: '1px solid #f0f0f0',
              padding: '0px 24px 0 24px',
              minHeight: '48px'
            }}
            items={[
              {
                key: 'profile',
                label: (
                  <div style={{ display: 'flex', alignItems: 'center', padding: '4px 8px' }}>
                    <UserOutlined style={{ marginRight: '6px', color: '#8c8c8c', fontSize: '14px' }} />
                    <span style={{ color: '#8c8c8c', fontSize: '14px' }}>客户档案</span>
                  </div>
                ),
                children: (
                  <CustomerProfileTab 
                    customer={renewalData}
                    lifecycle="renewal"
                    onEditContract={() => message.info('编辑合同功能开发中')}
                    onEditContacts={() => message.info('编辑联系人功能开发中')}
                  />
                ),
              },
              {
                key: 'contract',
                label: (
                  <div style={{ display: 'flex', alignItems: 'center', padding: '4px 8px' }}>
                    <FileTextOutlined style={{ marginRight: '6px', color: '#8c8c8c', fontSize: '14px' }} />
                    <span style={{ color: '#8c8c8c', fontSize: '14px' }}>往期合同</span>
                  </div>
                ),
                children: <ContractTab />
              },
              {
                key: 'service',
                label: (
                  <div style={{ display: 'flex', alignItems: 'center', padding: '4px 8px' }}>
                    <AppstoreOutlined style={{ marginRight: '6px', color: '#8c8c8c', fontSize: '14px' }} />
                    <span style={{ color: '#8c8c8c', fontSize: '14px' }}>服务记录</span>
                  </div>
                ),
                children: (
                  <ServiceRecordTab
                    serviceRecords={serviceRecords}
                    onAddRecord={handleAddServiceRecord}
                    showAddButton={true}
                    tabTitle="服务记录"
                  />
                )
              }
            ]}
          />
        </Card>
      </div>
    </>
  );
};

export default RenewalDetailPage;