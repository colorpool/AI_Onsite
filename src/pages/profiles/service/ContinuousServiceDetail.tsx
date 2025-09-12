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
  Tabs,
  Table,
  Tooltip,
  InputNumber,
  DatePicker
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
  ExclamationCircleOutlined,
  EyeOutlined,
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import ContinuousServiceDetailHeader from '@/components/service/ContinuousServiceDetailHeader';
import { useParams, useNavigate, useLocation } from 'umi';
import { mockCustomers } from '@/mock/continuousServiceData';
import { ServiceRecordType, ContractAttachment } from '@/types/continuousService';

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
  const [attachmentModalVisible, setAttachmentModalVisible] = useState(false);
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [isContractEditVisible, setIsContractEditVisible] = useState(false);
  const [contractForm] = Form.useForm();
  const [isContactEditVisible, setIsContactEditVisible] = useState(false);
  const [contactForm] = Form.useForm();
  const [editingContact, setEditingContact] = useState<any>(null);
  const [contactData, setContactData] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      const foundCustomer = mockCustomers.find(c => c.id === id);
      if (foundCustomer) {
        setCustomer(foundCustomer);
        
        // 检查是否为收藏客户
        const favoriteCustomers = JSON.parse(localStorage.getItem('favoriteCustomers') || '[]');
        setIsFavorite(favoriteCustomers.includes(id));
        
        // 初始化联系人数据
        if (foundCustomer.keyContacts) {
          setContactData(foundCustomer.keyContacts);
        }
        
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

  // 合同编辑处理函数
  const handleContractEdit = () => {
    contractForm.setFieldsValue({
      amount: customer.currentContract?.amount,
      endDate: customer.contractEndDate,
      userVersion: customer.currentContract?.userVersion,
      ticketVersion: customer.currentContract?.ticketVersion,
      customerTier: customer.customerTier,
      tianyuanOrderStatus: customer.currentContract?.tianyuanOrderStatus,
      serviceCost: customer.currentContract?.serviceCost
    });
    setIsContractEditVisible(true);
  };

  const handleContractSave = async () => {
    try {
      const values = await contractForm.validateFields();
      // 这里应该调用API保存数据
      message.success('合同信息保存成功');
      setIsContractEditVisible(false);
    } catch (error) {
      console.error('保存失败:', error);
    }
  };

  // 联系人编辑处理函数
  const handleContactEdit = (record: any) => {
    setEditingContact(record);
    contactForm.setFieldsValue(record);
    setIsContactEditVisible(true);
  };

  const handleContactAdd = () => {
    setEditingContact(null);
    contactForm.resetFields();
    setIsContactEditVisible(true);
  };

  const handleContactSave = async () => {
    try {
      const values = await contactForm.validateFields();
      if (editingContact) {
        // 编辑现有联系人
        const updatedData = contactData.map(item => 
          item.id === editingContact.id ? { ...item, ...values } : item
        );
        setContactData(updatedData);
        message.success('联系人信息更新成功');
      } else {
        // 新增联系人
        const newContact = {
          id: Date.now().toString(),
          ...values
        };
        setContactData([...contactData, newContact]);
        message.success('联系人添加成功');
      }
      setIsContactEditVisible(false);
    } catch (error) {
      console.error('保存失败:', error);
    }
  };

  const handleContactDelete = (record: any) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个联系人吗？',
      onOk: () => {
        const updatedData = contactData.filter(item => item.id !== record.id);
        setContactData(updatedData);
        message.success('联系人删除成功');
      }
    });
  };

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

  const handleViewAttachments = (contract: any) => {
    setSelectedContract(contract);
    setAttachmentModalVisible(true);
  };

  const handleDownloadAttachment = (attachment: { url: string; name: string }) => {
    // 创建一个临时的a标签来下载文件
    const link = document.createElement('a');
    link.href = attachment.url;
    link.download = attachment.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success(`开始下载 ${attachment.name}`);
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
              contractNumber: customer.currentContract?.contractNumber || `CONT-${customer.id}`,
              connectionLevel: customer.connectionLevel || 3
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
          bodyStyle={{ paddingTop: '0px' }}
        >
          <Tabs
            defaultActiveKey="profile"
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
                  <div style={{ padding: '16px 0' }}>
                    {/* 合同与服务卡片 */}
                    <Card 
                      title={
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <DollarOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                            <span>合同与服务</span>
                          </div>
                          <Button 
                             type="primary" 
                             icon={<EditOutlined />} 
                             onClick={handleContractEdit}
                             size="small"
                           >
                            编辑信息
                           </Button>
                        </div>
                      }
                      size="small"
                      style={{ marginBottom: '16px' }}
                    >
                      <Row gutter={[24, 16]}>
                        <Col span={24}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Text strong style={{ minWidth: 120, display: 'inline-block' }}>已购产品/服务：</Text>
                            <div style={{ marginLeft: '8px' }}>
                              {customer.purchasedProducts?.map((product: string, index: number) => (
                                <Tag key={index} color="blue" style={{ marginRight: '4px' }}>
                                  {product}
                                </Tag>
                              ))}
                            </div>
                          </div>
                        </Col>
                        
                        <Col span={8}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Text strong style={{ minWidth: 120, display: 'inline-block' }}>合同金额 (ARR)：</Text>
                            <span style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginLeft: '8px' }}>
                              ¥{customer.currentContract?.amount?.toLocaleString() || '0'}
                            </span>
                          </div>
                        </Col>
                        <Col span={8}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Text strong style={{ minWidth: 100, display: 'inline-block' }}>服务到期日：</Text>
                            <span style={{ color: '#fa8c16', marginLeft: '8px' }}>
                              {customer.contractEndDate}
                            </span>
                          </div>
                        </Col>
                        <Col span={8}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Text strong style={{ minWidth: 80, display: 'inline-block' }}>人数版本：</Text>
                            <span style={{ color: '#52c41a', marginLeft: '8px' }}>
                              {customer.currentContract?.userVersion || '暂无'}
                            </span>
                          </div>
                        </Col>
                        
                        <Col span={8}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Text strong style={{ minWidth: 80, display: 'inline-block' }}>提单版本：</Text>
                            <span style={{ color: '#722ed1', marginLeft: '8px' }}>
                              {customer.currentContract?.ticketVersion || '暂无'}
                            </span>
                          </div>
                        </Col>
                        <Col span={8}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Text strong style={{ minWidth: 80, display: 'inline-block' }}>客户分层：</Text>
                            <span style={{ marginLeft: '8px' }}>
                              {(() => {
                                const segmentConfig: Record<string, { color: string; text: string }> = {
                                  'strategic': { color: '#f5222d', text: '战略客户' },
                                  'key': { color: '#1890ff', text: '重点客户' },
                                  'standard': { color: '#52c41a', text: '普通客户' }
                                };
                                const config = segmentConfig[customer.customerTier] || { color: '#8c8c8c', text: '未知' };
                                return (
                                  <Tag color={config.color} style={{ fontSize: '12px' }}>
                                    {config.text}
                                  </Tag>
                                );
                              })()
                            }
                            </span>
                          </div>
                        </Col>
                        <Col span={8}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Text strong style={{ minWidth: 120, display: 'inline-block' }}>天元订单状态：</Text>
                            <span style={{ marginLeft: '8px' }}>
                              {(() => {
                                const statusConfig: Record<string, { color: string; text: string }> = {
                                  'active': { color: '#52c41a', text: '已生效' },
                                  'inactive': { color: '#8c8c8c', text: '未生效' },
                                  'pending': { color: '#fa8c16', text: '待处理' }
                                };
                                const config = statusConfig[customer.currentContract?.tianyuanOrderStatus || ''] || { color: '#8c8c8c', text: '未知' };
                                return (
                                  <Tag color={config.color} style={{ fontSize: '12px' }}>
                                    {config.text}
                                  </Tag>
                                );
                              })()
                            }
                            </span>
                          </div>
                        </Col>
                      </Row>
                      
                      {/* 服务成本投入 - 可展开链接 */}
                      <div>
                        <Collapse 
                          ghost 
                          size="small"
                          items={[
                            {
                              key: '1',
                              label: (
                                <Text strong style={{ color: '#1890ff' }}>
                                  服务成本投入: ¥{customer.currentContract?.serviceCost?.toLocaleString() || '15,000'} 
                                </Text>
                              ),
                              children: (
                                <div style={{ background: '#f8f9fa', padding: '12px', borderRadius: '6px', marginTop: '8px' }}>
                                  {customer.currentContract?.serviceCostDetails ? 
                                    customer.currentContract.serviceCostDetails.map((detail: string, index: number) => (
                                      <div key={index} style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                                        • {detail}
                                      </div>
                                    )) : 
                                    [
                                      '客户拜访费用: ¥3,000',
                                      '礼品采购: ¥5,000', 
                                      '培训支持: ¥4,000',
                                      '技术支持: ¥3,000'
                                    ].map((detail, index) => (
                                      <div key={index} style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                                        • {detail}
                                      </div>
                                    ))
                                  }
                                </div>
                              )
                            }
                          ]}
                        />
                      </div>
                    </Card>
                    
                    {/* 关键联系人卡片 */}
                    <Card 
                      title={
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <TeamOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
                            <span>关键联系人</span>
                          </div>
                          <Button 
                            type="primary" 
                            icon={<PlusOutlined />} 
                            onClick={handleContactAdd}
                            size="small"
                          >
                            添加联系人
                          </Button>
                        </div>
                      }
                      size="small"
                    >
                      <Table
                        dataSource={contactData}
                        pagination={false}
                        size="small"
                        rowKey="id"
                        scroll={{ y: 300 }}
                        columns={[
                          {
                            title: '姓名',
                            dataIndex: 'name',
                            key: 'name',
                            width: 100,
                            render: (name: string, record: any) => (
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar size="small" icon={<UserOutlined />} style={{ marginRight: 8 }} />
                                <div style={{ fontWeight: 500, fontSize: '12px' }}>{name}</div>
                              </div>
                            )
                          },
                          {
                            title: '职位',
                            dataIndex: 'title',
                            key: 'title',
                            width: 100,
                            render: (title: string) => (
                              <Text style={{ fontSize: '12px' }}>{title}</Text>
                            )
                          },
                          {
                            title: '干系类型',
                            dataIndex: 'stakeholderType',
                            key: 'stakeholderType',
                            width: 80,
                            render: (type: string) => {
                              const typeConfig: Record<string, { color: string; text: string }> = {
                                'decision_maker': { color: 'red', text: '决策者' },
                                'supporter': { color: 'green', text: '赞成者' },
                                'opponent': { color: 'orange', text: '反对者' },
                                'influencer': { color: 'blue', text: '影响者' },
                                'user': { color: 'purple', text: '使用者' }
                              };
                              const config = typeConfig[type] || { color: 'default', text: type || '未知' };
                              return <Tag color={config.color} style={{ fontSize: '11px' }}>{config.text}</Tag>;
                            }
                          },
                          {
                            title: '影响力',
                            dataIndex: 'influence',
                            key: 'influence',
                            width: 60,
                            render: (influence: string) => {
                              const influenceConfig: Record<string, { color: string; text: string }> = {
                                'high': { color: 'red', text: '高' },
                                'medium': { color: 'orange', text: '中' },
                                'low': { color: 'green', text: '低' }
                              };
                              const config = influenceConfig[influence] || { color: 'default', text: influence || '未知' };
                              return <Tag color={config.color} style={{ fontSize: '11px' }}>{config.text}</Tag>;
                            }
                          },
                          {
                            title: '态度',
                            dataIndex: 'attitude',
                            key: 'attitude',
                            width: 60,
                            render: (attitude: string) => {
                              const attitudeConfig: Record<string, { color: string; text: string }> = {
                                'positive': { color: 'green', text: '积极' },
                                'neutral': { color: 'blue', text: '中性' },
                                'negative': { color: 'red', text: '消极' }
                              };
                              const config = attitudeConfig[attitude] || { color: 'default', text: attitude || '未知' };
                              return <Tag color={config.color} style={{ fontSize: '11px' }}>{config.text}</Tag>;
                            }
                          },
                          {
                            title: '电话',
                            dataIndex: 'phone',
                            key: 'phone',
                            width: 110,
                            render: (phone: string) => (
                              <div style={{ fontSize: '11px', display: 'flex', alignItems: 'center' }}>
                                <PhoneOutlined style={{ marginRight: 4, color: '#8c8c8c' }} />
                                <span>{phone}</span>
                              </div>
                            )
                          },
                          {
                            title: '邮箱',
                            dataIndex: 'email',
                            key: 'email',
                            width: 140,
                            render: (email: string) => (
                              <div style={{ fontSize: '11px', display: 'flex', alignItems: 'center' }}>
                                <MailOutlined style={{ marginRight: 4, color: '#8c8c8c' }} />
                                <span>{email}</span>
                              </div>
                            )
                          },
                          {
                            title: '操作',
                            key: 'action',
                            width: 80,
                            render: (_, record: any) => (
                              <div style={{ display: 'flex', gap: '4px' }}>
                                <Button 
                                  type="text" 
                                  icon={<EditOutlined />} 
                                  size="small"
                                  onClick={() => handleContactEdit(record)}
                                />
                                <Button 
                                  type="text" 
                                  icon={<DeleteOutlined />} 
                                  size="small"
                                  danger
                                  onClick={() => handleContactDelete(record)}
                                />
                              </div>
                            )
                          }
                        ]}
                      />
                    </Card>
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
                              
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <div>
                                  <Text strong>服务周期：</Text>
                                  <Text> {contract.servicePeriod || '1年'}</Text>
                                </div>
                                {contract.attachments && contract.attachments.length > 0 && (
                                  <Button
                                    type="primary"
                                    size="small"
                                    icon={<EyeOutlined />}
                                    onClick={() => handleViewAttachments(contract)}
                                  >
                                    查看附件({contract.attachments.length})
                                  </Button>
                                )}
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

      {/* 附件查看模态框 */}
      <Modal
        title={`合同附件 - ${selectedContract?.contractNumber || ''}`}
        open={attachmentModalVisible}
        onCancel={() => setAttachmentModalVisible(false)}
        footer={null}
        width={800}
        destroyOnClose
      >
        {selectedContract?.attachments && (
          <Table
            dataSource={selectedContract.attachments}
            pagination={false}
            rowKey="id"
            columns={[
              {
                title: '文件名',
                dataIndex: 'name',
                key: 'name',
                ellipsis: { showTitle: true },
                width: '40%'
              },
              {
                title: '类型',
                dataIndex: 'type',
                key: 'type',
                width: 80,
                render: (type: string) => {
                  const typeConfig: Record<string, { color: string; text: string }> = {
                    'contract': { color: 'blue', text: '合同' },
                    'supplement': { color: 'green', text: '补充协议' },
                    'invoice': { color: 'orange', text: '发票' },
                    'other': { color: 'default', text: '其他' }
                  };
                  const config = typeConfig[type] || { color: 'default', text: '未知' };
                  return <Tag color={config.color}>{config.text}</Tag>;
                }
              },
              {
                title: '大小',
                dataIndex: 'size',
                key: 'size',
                width: 80,
                render: (size: number) => {
                  const formatSize = (bytes: number) => {
                    if (bytes === 0) return '0 B';
                    const k = 1024;
                    const sizes = ['B', 'KB', 'MB', 'GB'];
                    const i = Math.floor(Math.log(bytes) / Math.log(k));
                    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
                  };
                  return formatSize(size);
                }
              },
              {
                title: '上传时间',
                dataIndex: 'uploadDate',
                key: 'uploadDate',
                width: 100
              },
              {
                title: '操作',
                key: 'action',
                width: 140,
                render: (_, record: ContractAttachment) => (
                  <Space size="small" style={{ display: 'flex', flexWrap: 'nowrap' }}>
                    <Button
                      type="link"
                      size="small"
                      icon={<EyeOutlined />}
                      onClick={() => window.open(record.url, '_blank')}
                      style={{ padding: '4px 8px' }}
                    >
                      预览
                    </Button>
                    <Button
                      type="link"
                      size="small"
                      icon={<DownloadOutlined />}
                      onClick={() => handleDownloadAttachment({ url: record.url, name: record.name })}
                      style={{ padding: '4px 8px' }}
                    >
                      下载
                    </Button>
                  </Space>
                )
              }
            ]}
          />
        )}
      </Modal>

      {/* 合同编辑模态框 */}
      <Modal
        title="编辑合同信息"
        open={isContractEditVisible}
        onOk={handleContractSave}
        onCancel={() => setIsContractEditVisible(false)}
        width={600}
      >
        <Form form={contractForm} layout="vertical">
          <Row gutter={16}>
             <Col span={12}>
               <Form.Item label="合同金额 (ARR)" name="amount">
                 <InputNumber
                   style={{ width: '100%' }}
                   formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                   parser={value => value!.replace(/¥\s?|(,*)/g, '')}
                 />
               </Form.Item>
             </Col>
             <Col span={12}>
               <Form.Item label="服务到期日" name="endDate">
                 <DatePicker style={{ width: '100%' }} />
               </Form.Item>
             </Col>
           </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="人数版本" name="userVersion">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="提单版本" name="ticketVersion">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="客户分层" name="customerTier">
                <Select>
                  <Select.Option value="strategic">战略客户</Select.Option>
                  <Select.Option value="key">重点客户</Select.Option>
                  <Select.Option value="standard">普通客户</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="天元订单状态" name="tianyuanOrderStatus">
                <Select>
                  <Select.Option value="active">已生效</Select.Option>
                  <Select.Option value="inactive">未生效</Select.Option>
                  <Select.Option value="pending">待处理</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="服务成本投入" name="serviceCost">
             <InputNumber
               style={{ width: '100%' }}
               formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
               parser={value => value!.replace(/¥\s?|(,*)/g, '')}
             />
           </Form.Item>
        </Form>
      </Modal>

      {/* 联系人编辑模态框 */}
      <Modal
        title={editingContact ? "编辑联系人" : "添加联系人"}
        open={isContactEditVisible}
        onOk={handleContactSave}
        onCancel={() => setIsContactEditVisible(false)}
        width={500}
      >
        <Form form={contactForm} layout="vertical">
          <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="职位" name="title">
            <Input />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
               <Form.Item label="干系类型" name="type" rules={[{ required: true, message: '请选择干系类型' }]}>
                 <Select>
                   <Select.Option value="decision_maker">决策者</Select.Option>
                   <Select.Option value="influencer">影响者</Select.Option>
                   <Select.Option value="user">使用者</Select.Option>
                   <Select.Option value="gatekeeper">把关者</Select.Option>
                 </Select>
               </Form.Item>
             </Col>
            <Col span={12}>
              <Form.Item label="影响力" name="influence" rules={[{ required: true, message: '请选择影响力' }]}>
                <Select>
                  <Select.Option value="high">高</Select.Option>
                  <Select.Option value="medium">中</Select.Option>
                  <Select.Option value="low">低</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="态度" name="attitude" rules={[{ required: true, message: '请选择态度' }]}>
            <Select>
              <Select.Option value="positive">积极</Select.Option>
              <Select.Option value="neutral">中性</Select.Option>
              <Select.Option value="negative">消极</Select.Option>
            </Select>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="电话" name="phone">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="邮箱" name="email">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ContinuousServiceDetail;
