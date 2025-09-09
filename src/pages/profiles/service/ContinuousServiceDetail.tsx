import React, { useState, useEffect, useRef } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Tag, 
  Button, 
  Space, 
  Timeline, 
  Collapse, 
  Avatar, 
  message,
  Modal,
  Form,
  Input,
  Select,
  Tabs
} from 'antd';
import { 
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  TeamOutlined,
  PlusOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  SettingOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  ArrowLeftOutlined,
  HeartOutlined,
  RiseOutlined,
  SmileOutlined,
  TrophyOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import ContinuousServiceDetailHeader from '@/components/service/ContinuousServiceDetailHeader';
import { useParams, useNavigate, useLocation } from 'umi';
import { mockCustomers } from '@/mock/continuousServiceData';
import { ServiceRecordType } from '@/types/continuousService';

const { Title, Text } = Typography;
const { Panel } = Collapse;
const { Option } = Select;
const { TextArea } = Input;

const ContinuousServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [customer, setCustomer] = useState<any>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const [newRecordModalVisible, setNewRecordModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      const foundCustomer = mockCustomers.find(c => c.id === id);
      if (foundCustomer) {
        setCustomer(foundCustomer);
        
        // 检查是否为收藏客户
        const favoriteCustomers = JSON.parse(localStorage.getItem('favoriteCustomers') || '[]');
        setIsFavorite(favoriteCustomers.includes(id));
        
        // 如果URL中包含scrollTo参数，滚动到对应位置
        const searchParams = new URLSearchParams(location.search);
        const scrollTo = searchParams.get('scrollTo');
        if (scrollTo === 'top' && topRef.current) {
          setTimeout(() => {
            topRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      } else {
        // 如果找不到客户，跳转回列表页
        navigate('/profiles/service');
      }
    }
  }, [id]);

  const getHealthColor = (level: string) => {
    switch (level) {
      case '健康': return '#52c41a';
      case '一般': return '#faad14';
      case '风险': return '#ff4d4f';
      default: return '#8c8c8c';
    }
  };

  const handleToggleFavorite = () => {
    const favoriteCustomers = JSON.parse(localStorage.getItem('favoriteCustomers') || '[]');
    const newFavorites = isFavorite 
      ? favoriteCustomers.filter((fId: string) => fId !== id)
      : [...favoriteCustomers, id];
    localStorage.setItem('favoriteCustomers', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  if (!customer) {
    return <div>加载中...</div>;
  }

  return (
    <div ref={topRef} style={{
      padding: '32px 40px',
      background: '#f5f5f5',
      minHeight: 'calc(100vh - 120px)',
      paddingBottom: '60px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* 客户头部信息 */}
        <ContinuousServiceDetailHeader
            customerData={{
              id: customer.id,
              name: customer.name,
              healthLevel: customer.healthLevel === '健康' ? 'healthy' : customer.healthLevel === '一般' ? 'normal' : 'risk',
              customerTier: customer.customerTier || 'medium',
              arr: customer.arr || customer.currentContract?.amount || 0,
              renewalDate: customer.nextRenewalDate || '2024-12-31',
              lastContactDays: (() => {
                const lastContact = customer.serviceRecords?.[0]?.timestamp;
                if (!lastContact) return 0;
                const lastDate = new Date(lastContact);
                const today = new Date();
                return Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
              })(),
              contractNumber: customer.currentContract?.contractNumber || `CONT-${customer.id}`
            }}
            isFavorite={isFavorite}
            onToggleFavorite={handleToggleFavorite}
            onBack={() => {
              // 检查是否从特定页面跳转过来
              const searchParams = new URLSearchParams(location.search);
              const from = searchParams.get('from');
              
              if (from === 'handover') {
                navigate('/handover');
              } else {
                navigate('/profiles/service');
              }
            }}
            onViewContract={() => {
              message.info('查看合同功能开发中');
            }}
            onShare={() => {
              message.info('分享功能开发中');
            }}
          />

        {/* 客户健康度和推荐行动 */}
        <Row gutter={24} style={{ marginBottom: '24px' }}>
          {/* 客户健康度详情 - 左侧 3/5 */}
          <Col xs={24} lg={14}>
            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <HeartOutlined style={{ color: '#fa8c16', marginRight: '8px', fontSize: '18px' }} />
                  <span style={{ fontSize: '18px', fontWeight: '600' }}>客户健康度详情</span>
                </div>
              }
              style={{
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                border: '1px solid #f0f0f0',
                background: '#ffffff',
                height: '100%'
              }}
            >
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12} md={6}>
                  <div style={{ textAlign: 'center', padding: '16px' }}>
                    <div style={{ 
                      fontSize: '32px', 
                      fontWeight: 'bold', 
                      color: customer.healthLevel === '健康' ? '#52c41a' : customer.healthLevel === '一般' ? '#faad14' : '#ff4d4f',
                      marginBottom: '8px' 
                    }}>
                      {customer.healthScore}
                    </div>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>综合健康分</div>
                    <Tag color={customer.healthLevel === '健康' ? 'green' : customer.healthLevel === '一般' ? 'orange' : 'red'}>
                      {customer.healthLevel}
                    </Tag>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <div style={{ textAlign: 'center', padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                      <RiseOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
                      <Text strong style={{ whiteSpace: 'nowrap' }}>产品使用活跃度</Text>
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <Text style={{ fontSize: '20px', fontWeight: 'bold', color: '#1890ff' }}>85</Text>
                      <Text style={{ color: '#666', marginLeft: '4px' }}>/100</Text>
                    </div>
                    <Text type="secondary" style={{ fontSize: '12px' }}>最近30天登录15次</Text>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <div style={{ textAlign: 'center', padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                      <SettingOutlined style={{ color: '#722ed1', marginRight: '8px' }} />
                      <Text strong style={{ whiteSpace: 'nowrap' }}>关键功能渗透率</Text>
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <Text style={{ fontSize: '20px', fontWeight: 'bold', color: '#722ed1' }}>60</Text>
                      <Text style={{ color: '#666', marginLeft: '4px' }}>/100</Text>
                    </div>
                    <Text type="secondary" style={{ fontSize: '12px' }}>核心功能A已使用，B未使用</Text>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <div style={{ textAlign: 'center', padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                      <SmileOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                      <Text strong style={{ whiteSpace: 'nowrap' }}>服务满意度</Text>
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <Text style={{ fontSize: '20px', fontWeight: 'bold', color: '#52c41a' }}>90</Text>
                      <Text style={{ color: '#666', marginLeft: '4px' }}>/100</Text>
                    </div>
                    <Text type="secondary" style={{ fontSize: '12px' }}>上季度NPS为9分</Text>
                  </div>
                </Col>
              </Row>
              <Row gutter={24} style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}>
                <Col xs={24} md={12}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <TrophyOutlined style={{ color: '#faad14', marginRight: '8px' }} />
                      <Text strong>增购潜力</Text>
                    </div>
                    <Tag color="red" style={{ fontSize: '14px', padding: '4px 12px' }}>高</Tag>
                  </div>
                  <Text type="secondary" style={{ fontSize: '12px', marginTop: '4px' }}>用户数已达许可的95%</Text>
                </Col>
                <Col xs={24} md={12}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <DollarOutlined style={{ color: '#13c2c2', marginRight: '8px' }} />
                      <Text strong>合同价值</Text>
                    </div>
                    <Text style={{ fontSize: '16px', fontWeight: 'bold', color: '#13c2c2' }}>
                      ¥{customer.currentContract?.amount?.toLocaleString() || '0'}
                    </Text>
                  </div>
                  <Text type="secondary" style={{ fontSize: '12px', marginTop: '4px' }}>年度经常性收入</Text>
                </Col>
              </Row>
            </Card>
          </Col>
          
          {/* 推荐服务剧本 - 右侧 2/5 */}
          <Col xs={24} lg={10}>
            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <PlayCircleOutlined style={{ color: '#1890ff', marginRight: '8px', fontSize: '18px' }} />
                    <span style={{ fontSize: '18px', fontWeight: '600' }}>推荐行动</span>
                  </div>
                  <Button 
                    type="primary" 
                    size="small"
                    icon={<PlayCircleOutlined />}
                    style={{ 
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  >
                    启动剧本
                  </Button>
                </div>
              }
              style={{
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                border: '1px solid #f0f0f0',
                background: '#ffffff',
                height: '100%'
              }}
            >
              <div style={{ padding: '8px 0' }}>
                <Title level={4} style={{ margin: 0, marginBottom: '8px', color: '#1890ff' }}>
                  主动增购与价值提升
                </Title>
                <Text type="secondary" style={{ fontSize: '14px', display: 'block', marginBottom: '12px' }}>
                  针对健康成长期客户，主动推荐增值服务和产品升级
                </Text>
                <div style={{ marginBottom: '16px' }}>
                  <Text strong style={{ marginRight: '8px' }}>适用场景：</Text>
                  <Tag color="blue">成长期-健康</Tag>
                </div>
                <div>
                  <Text strong style={{ marginRight: '8px' }}>包含任务：</Text>
                  <Space wrap>
                    <Tag color="green" style={{ borderRadius: '4px' }}>产品功能演示</Tag>
                    <Tag color="green" style={{ borderRadius: '4px' }}>增值服务介绍</Tag>
                    <Tag color="green" style={{ borderRadius: '4px' }}>客户培训安排</Tag>
                  </Space>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* 客户档案和持续服务标签页 */}
        <Card 
          style={{
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
            border: '1px solid #f0f0f0',
            background: '#ffffff',
            minHeight: '420px'
          }}
        >
          <Tabs
            defaultActiveKey="profile"
            size="large"
            type="line"
            style={{ height: '100%' }}
            tabBarStyle={{
              margin: 0,
              backgroundColor: '#fff',
              borderBottom: '1px solid #f0f0f0',
              padding: '0 24px'
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
                  <div style={{ padding: '8px 0' }}>
                    <Collapse defaultActiveKey={['contract', 'contacts']} ghost>
                      <Panel 
                        header={
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <DollarOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                            <span>合同与服务</span>
                          </div>
                        } 
                        key="contract"
                      >
                        <div style={{ padding: '8px 0' }}>
                          <div style={{ marginBottom: '12px' }}>
                            <Text strong>已购产品/服务：</Text>
                            <div style={{ marginTop: '8px' }}>
                              {customer.purchasedProducts?.map((product: string, index: number) => (
                                <Tag key={index} color="blue" style={{ marginBottom: '4px' }}>
                                  {product}
                                </Tag>
                              ))}
                            </div>
                          </div>
                          <div style={{ marginBottom: '12px' }}>
                            <Text strong>合同金额 (ARR)：</Text>
                            <div style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600' }}>
                              ¥{customer.currentContract?.amount?.toLocaleString() || '0'}
                            </div>
                          </div>
                          <div>
                            <Text strong>服务到期日：</Text>
                            <div style={{ color: '#fa8c16' }}>
                              {customer.contractEndDate}
                            </div>
                          </div>
                        </div>
                      </Panel>

                      <Panel 
                        header={
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <TeamOutlined style={{ color: '#722ed1', marginRight: '8px' }} />
                            <span>关键联系人</span>
                          </div>
                        } 
                        key="contacts"
                      >
                        <div style={{ padding: '8px 0' }}>
                          {customer.keyContacts?.map((contact: any) => (
                            <div key={contact.id} style={{ 
                              marginBottom: '16px', 
                              padding: '12px', 
                              background: '#f8f9fa', 
                              borderRadius: '8px',
                              border: '1px solid #e8e8e8'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                <Avatar 
                                  icon={<UserOutlined />} 
                                  style={{ 
                                    marginRight: '8px',
                                    backgroundColor: '#d9d9d9'
                                  }} 
                                />
                                <div>
                                  <Text strong style={{ fontSize: '14px' }}>{contact.name}</Text>
                                </div>
                              </div>
                              <div style={{ marginBottom: '4px' }}>
                                <Text type="secondary">{contact.title}</Text>
                              </div>
                              <div style={{ marginBottom: '4px' }}>
                                <PhoneOutlined style={{ marginRight: '4px' }} />
                                <Text copyable={{ text: contact.phone }}>{contact.phone}</Text>
                              </div>
                              <div>
                                <MailOutlined style={{ marginRight: '4px' }} />
                                <Text copyable={{ text: contact.email }}>{contact.email}</Text>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Panel>
                    </Collapse>
                  </div>
                )
              },
              {
                key: 'history-contracts',
                label: (
                  <div style={{ display: 'flex', alignItems: 'center', padding: '4px 8px' }}>
                    <DollarOutlined style={{ marginRight: '6px', color: '#8c8c8c', fontSize: '14px' }} />
                    <span style={{ color: '#8c8c8c', fontSize: '14px' }}>往期合同</span>
                  </div>
                ),
                children: (
                  <div style={{ padding: '8px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <Text type="secondary" style={{ fontSize: '14px' }}>
                        共 {customer?.contracts?.length || 0} 份合同
                      </Text>
                    </div>
                    <Timeline
                      style={{ padding: '16px 0' }}
                      items={customer?.contracts?.map((contract: any, index: number) => {
                        const getContractStatusConfig = (status: string) => {
                           const configs: Record<string, { color: string; text: string }> = {
                             'active': { color: '#52c41a', text: '生效中' },
                             'expired': { color: '#fa8c16', text: '已到期' },
                             'terminated': { color: '#f5222d', text: '已终止' }
                           };
                           return configs[status] || { color: '#8c8c8c', text: '未知' };
                         };
                        
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
                                    {contract.contractNumber || `合同-${index + 1}`}
                                  </Text>
                                </div>
                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                  {contract.startDate} - {contract.endDate}
                                </Text>
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
                              
                              <div>
                                <Text strong>服务周期：</Text>
                                <Text> {contract.servicePeriod || '1年'}</Text>
                              </div>
                            </div>
                          )
                        };
                      }) || []}
                    />
                  </div>
                )
              },
              {
                key: 'service',
                label: (
                  <div style={{ display: 'flex', alignItems: 'center', padding: '4px 8px' }}>
                    <ClockCircleOutlined style={{ marginRight: '6px', color: '#8c8c8c', fontSize: '14px' }} />
                    <span style={{ color: '#8c8c8c', fontSize: '14px' }}>持续服务</span>
                  </div>
                ),
                children: (
                  <div style={{ padding: '8px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <Text type="secondary" style={{ fontSize: '14px' }}>
                        共 {customer?.serviceRecords?.length || 0} 条记录
                      </Text>
                      <Button 
                        type="primary" 
                        icon={<PlusOutlined />}
                        onClick={() => setNewRecordModalVisible(true)}
                      >
                        新增服务记录
                      </Button>
                    </div>
                    <Timeline
                      style={{ padding: '16px 0' }}
                      items={customer?.serviceRecords?.map((record: any) => {
                        const getRecordConfig = (type: ServiceRecordType) => {
                          const configs = {
                            'QBR': { color: '#52c41a', icon: <TeamOutlined /> },
                            '电话回访': { color: '#1890ff', icon: <PhoneOutlined /> },
                            '培训': { color: '#722ed1', icon: <PlayCircleOutlined /> },
                            '工单解决': { color: '#fa8c16', icon: <SettingOutlined /> },
                            '风险处理': { color: '#f5222d', icon: <ExclamationCircleOutlined /> },
                            '产品演示': { color: '#13c2c2', icon: <PlayCircleOutlined /> },
                            '技术支持': { color: '#eb2f96', icon: <SettingOutlined /> },
                            '商务沟通': { color: '#faad14', icon: <DollarOutlined /> },
                            '其他': { color: '#8c8c8c', icon: <ClockCircleOutlined /> }
                          };
                          return configs[type] || configs['其他'];
                        };
                        
                        const config = getRecordConfig(record.type);
                        
                        return {
                          color: config.color,
                          dot: config.icon,
                          children: (
                            <div style={{ 
                              padding: '16px', 
                              background: '#f8f9fa', 
                              borderRadius: '8px',
                              border: '1px solid #e8e8e8'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                  <Tag color={config.color} style={{ marginRight: '8px' }}>
                                    {record.type}
                                  </Tag>
                                  <Text strong style={{ fontSize: '14px' }}>
                                    {record.title}
                                  </Text>
                                </div>
                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                  {record.timestamp}
                                </Text>
                              </div>
                              
                              <div style={{ marginBottom: '8px' }}>
                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                  操作人：{record.operator}
                                </Text>
                              </div>
                              
                              <div style={{ marginBottom: '12px' }}>
                                <Text>{record.content}</Text>
                              </div>
                              
                              {record.tags && record.tags.length > 0 && (
                                <div style={{ marginBottom: '8px' }}>
                                  <Space size={4}>
                                    {record.tags.map((tag: string, index: number) => (
                                      <Tag key={index} style={{ fontSize: '11px' }}>
                                        {tag}
                                      </Tag>
                                    ))}
                                  </Space>
                                </div>
                              )}
                              
                              {(record.relatedPlaybookId || record.relatedRiskEventId) && (
                                <div style={{ 
                                  padding: '8px 12px', 
                                  background: '#e6f7ff', 
                                  borderRadius: '4px',
                                  border: '1px solid #91d5ff'
                                }}>
                                  <Text type="secondary" style={{ fontSize: '12px' }}>
                                    关联信息：
                                  </Text>
                                  {record.relatedPlaybookId && (
                                    <Tag color="blue" style={{ marginLeft: '4px', fontSize: '11px' }}>
                                      剧本: {record.relatedPlaybookId}
                                    </Tag>
                                  )}
                                  {record.relatedRiskEventId && (
                                    <Tag color="red" style={{ marginLeft: '4px', fontSize: '11px' }}>
                                      风险: {record.relatedRiskEventId}
                                    </Tag>
                                  )}
                                </div>
                              )}
                            </div>
                          )
                        };
                      })}
                    />
                  </div>
                )
              }
            ]}
          />
        </Card>
      </div>

      <Modal
        title="新建服务记录"
        open={newRecordModalVisible}
        onCancel={() => setNewRecordModalVisible(false)}
        onOk={() => {
          message.success('服务记录已创建');
          setNewRecordModalVisible(false);
        }}
        width={600}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item name="type" label="记录类型" rules={[{ required: true }]}>
            <Select placeholder="请选择记录类型">
              <Option value="QBR">QBR</Option>
              <Option value="电话回访">电话回访</Option>
              <Option value="培训">培训</Option>
              <Option value="工单解决">工单解决</Option>
              <Option value="风险处理">风险处理</Option>
              <Option value="产品演示">产品演示</Option>
              <Option value="技术支持">技术支持</Option>
              <Option value="商务沟通">商务沟通</Option>
              <Option value="其他">其他</Option>
            </Select>
          </Form.Item>
          <Form.Item name="title" label="记录标题" rules={[{ required: true }]}>
            <Input placeholder="请输入记录标题" />
          </Form.Item>
          <Form.Item name="content" label="详细内容" rules={[{ required: true }]}>
            <TextArea rows={4} placeholder="请输入详细内容" />
          </Form.Item>
          <Form.Item name="tags" label="标签">
            <Select mode="tags" placeholder="请输入标签（可多选）">
              <Option value="定期回访">定期回访</Option>
              <Option value="满意度调研">满意度调研</Option>
              <Option value="季度回顾">季度回顾</Option>
              <Option value="高层会议">高层会议</Option>
              <Option value="技术问题">技术问题</Option>
              <Option value="紧急处理">紧急处理</Option>
              <Option value="产品培训">产品培训</Option>
              <Option value="新功能">新功能</Option>
            </Select>
          </Form.Item>
          <Form.Item name="relatedPlaybookId" label="关联剧本">
            <Select placeholder="请选择关联的剧本（可选）" allowClear>
              <Option value="pb001">成长期客户增购引导剧本</Option>
              <Option value="pb002">风险客户挽回剧本</Option>
              <Option value="pb003">成熟期客户深度合作剧本</Option>
            </Select>
          </Form.Item>
          <Form.Item name="relatedRiskEventId" label="关联风险事件">
            <Select placeholder="请选择关联的风险事件（可选）" allowClear>
              <Option value="re001">续费风险</Option>
              <Option value="re002">使用率低</Option>
              <Option value="re003">技术问题</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ContinuousServiceDetail;
