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
import dayjs from 'dayjs';
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
  DeleteOutlined,
  FileTextOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import ContinuousServiceDetailHeader from '@/components/service/ContinuousServiceDetailHeader';
import CustomerProfileTab from '@/components/common/CustomerProfileTab';
import ServiceRecordTab from '@/components/common/ServiceRecordTab';
import CustomerJourneyTimeline from '@/components/common/CustomerJourneyTimeline';
import { useParams, useNavigate, useLocation } from 'umi';
import { mockCustomers } from '@/mock/continuousServiceData';
import { mockCustomerHandovers, mockInternalComments, mockOnboardingTasks } from '@/mock/handoverData';
import { ServiceRecordType, ContractAttachment } from '@/types/continuousService';
import { syncHandoverToServiceRecords, canSyncHandoverData } from '@/utils/handoverToServiceSync';
import { getCustomerJourney } from '@/data/mockCustomerJourney';

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
  const [serviceRecords, setServiceRecords] = useState<any[]>([]);
  const [relatedHandover, setRelatedHandover] = useState<any>(null);

  useEffect(() => {
    if (id) {
      // 根据路由参数id生成客户ID格式 (CUST-0001)
      const customerId = `CUST-${id?.padStart(4, '0')}`;
      console.log('持续服务详情页 - 路由参数id:', id, '生成的客户ID:', customerId);
      
      const foundCustomer = mockCustomers.find(c => c.id === customerId);
      if (foundCustomer) {
        setCustomer(foundCustomer);
        
        // 检查是否为收藏客户
        const favoriteCustomers = JSON.parse(localStorage.getItem('favoriteCustomers') || '[]');
        setIsFavorite(favoriteCustomers.includes(customerId));
        
        // 初始化联系人数据
        if (foundCustomer.keyContacts) {
          setContactData(foundCustomer.keyContacts);
        }
        
        // 初始化服务记录数据
        const initialServiceRecords = [
          {
            id: '1',
            type: 'QBR',
            title: 'Q1季度业务回顾',
            content: '与客户进行了Q1季度的业务回顾，讨论了产品使用情况和未来规划。客户对当前服务表示满意，提出了一些功能优化建议。',
            operator: '张三',
            timestamp: '2024-03-15 14:30:00',
            tags: ['定期回访', '客户满意'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '2',
            type: '技术支持',
            title: '系统集成问题解决',
            content: '协助客户解决了与第三方系统的集成问题，提供了详细技术方案和实施指导。',
            operator: '李四',
            timestamp: '2024-03-10 10:15:00',
            tags: ['技术支持', '问题解决'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '3',
            type: '培训',
            title: '新功能培训',
            content: '为客户团队提供了新版本功能的培训，包括操作演示和最佳实践分享。',
            operator: '王五',
            timestamp: '2024-03-05 16:00:00',
            tags: ['产品培训', '功能介绍'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];

        // 检查是否有对应的交接实施记录需要同步
        const foundHandover = mockCustomerHandovers.find(h => h.customerId === customerId);
        setRelatedHandover(foundHandover);
        
        if (foundHandover && canSyncHandoverData(foundHandover)) {
          // 获取交接实施的活动源与协作数据
          const handoverComments = mockInternalComments.filter(c => 
            // 假设评论ID包含交接ID，实际应用中应该有更明确的关联关系
            c.id.includes(foundHandover.id) || c.id.startsWith('comment-')
          );
          const handoverTasks = mockOnboardingTasks.filter(t => 
            // 假设任务ID包含交接ID，实际应用中应该有更明确的关联关系
            t.id.includes(foundHandover.id) || t.id.startsWith('task-')
          );

          // 同步交接数据到服务记录
          const handoverServiceRecords = syncHandoverToServiceRecords(
            foundHandover,
            handoverComments,
            handoverTasks
          );

          // 合并交接记录和现有服务记录
          const allServiceRecords = [...handoverServiceRecords, ...initialServiceRecords];
          setServiceRecords(allServiceRecords);

          // 同步成功，不显示提示消息
        } else {
          setServiceRecords(initialServiceRecords);
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
  }, [id, location.search, navigate]);

  // 合同编辑处理函数
  const handleContractEdit = () => {
    contractForm.setFieldsValue({
      amount: customer.currentContract?.amount,
      endDate: customer.contractEndDate ? dayjs(customer.contractEndDate) : null,
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

  // 服务记录处理函数
  const handleAddServiceRecord = (record: any) => {
    const newRecord = {
      ...record,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setServiceRecords([newRecord, ...serviceRecords]);
  };

  // 编辑服务记录处理函数
  const handleEditServiceRecord = (updatedRecord: any) => {
    setServiceRecords(serviceRecords.map(record => 
      record.id === updatedRecord.id 
        ? { ...updatedRecord, updatedAt: new Date().toISOString() }
        : record
    ));
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
                  <HeartOutlined style={{ color: '#1890ff', marginRight: '8px', fontSize: '18px' }} />
                  <span style={{ fontSize: '16px', fontWeight: '600' }}>客户状态概览</span>
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
                  <div style={{ textAlign: 'center', padding: '20px 16px' }}>
                    <div style={{ marginBottom: '16px' }}>
                      <Text style={{ fontSize: '32px', fontWeight: 'bold', color: '#52c41a', lineHeight: '1' }}>85</Text>
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <Text style={{ fontSize: '14px', color: '#666', fontWeight: '500' }}>综合健康分</Text>
                    </div>
                    <Tag 
                      style={{ 
                        borderRadius: '4px', 
                        fontSize: '12px', 
                        padding: '2px 8px',
                        backgroundColor: '#f6ffed',
                        border: '1px solid #b7eb8f',
                        color: '#52c41a'
                      }}
                    >
                      健康
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
                      <SettingOutlined style={{ color: '#fa8c16', marginRight: '8px' }} />
                      <Text strong style={{ whiteSpace: 'nowrap' }}>服务工单情况</Text>
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <Text style={{ fontSize: '20px', fontWeight: 'bold', color: '#fa8c16' }}>3</Text>
                      <Text style={{ color: '#666', marginLeft: '4px' }}>次</Text>
                    </div>
                    <Text type="secondary" style={{ fontSize: '12px' }}>最近30天技术支持请求</Text>
                  </div>
                </Col>

                <Col xs={24} sm={12} md={6}>
                  <div style={{ textAlign: 'center', padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                      <AppstoreOutlined style={{ color: '#722ed1', marginRight: '8px' }} />
                      <Text strong style={{ whiteSpace: 'nowrap' }}>功能使用频率</Text>
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <Text style={{ fontSize: '20px', fontWeight: 'bold', color: '#722ed1' }}>10</Text>
                      <Text style={{ color: '#666', marginLeft: '4px' }}>次</Text>
                    </div>
                    <Text type="secondary" style={{ fontSize: '12px' }}>报表导出功能30天使用</Text>
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
                    <span style={{ fontSize: '16px', fontWeight: '600' }}>推荐行动</span>
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

        {/* 客户旅程时间轴 */}
        <CustomerJourneyTimeline 
          customerId={customer?.id || ''}
          journeyType="continuous"
          style={{ marginBottom: '24px' }}
        />

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
                    <UserOutlined style={{ marginRight: '6px', color: '#1890ff', fontSize: '15px' }} />
                    <span style={{ fontSize: '15px', fontWeight: '600' }}>客户档案</span>
                  </div>
                ),
                children: (
                  <CustomerProfileTab 
                    customer={customer}
                    lifecycle="continuous"
                    onEditContract={handleContractEdit}
                    onEditContacts={handleContactAdd}
                  />
                ),
              },
              {
                key: 'contract',
                label: (
                  <div style={{ display: 'flex', alignItems: 'center', padding: '4px 8px' }}>
                    <FileTextOutlined style={{ marginRight: '6px', color: '#1890ff', fontSize: '18px' }} />
                    <span style={{ fontSize: '15px', fontWeight: '600' }}>往期合同</span>
                  </div>
                ),
                children: (
                  <div style={{ padding: '8px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <Text type="secondary" style={{ fontSize: '14px' }}>
                        共 {customer?.contracts?.length || 0} 份合同（当期合同和过往全部合同）
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
                                    {contract.contractNumber}
                                  </Text>
                                  {contract.status === 'active' && (
                                    <Tag color="blue" style={{ marginLeft: '8px' }}>
                                      当期合同
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
                                <Text strong>用户数量：</Text>
                                <Text>{contract.accountCount}个（采购账号数量）</Text>
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
                      }) || []}
                    />
                  </div>
                ),
              },
              {
                key: 'service-record',
                label: (
                  <div style={{ display: 'flex', alignItems: 'center', padding: '4px 8px' }}>
                    <AppstoreOutlined style={{ marginRight: '6px', color: '#1890ff', fontSize: '15px' }} />
                    <span style={{ fontSize: '15px', fontWeight: '600' }}>服务记录</span>
                  </div>
                ),
                children: (
                  <ServiceRecordTab
                    serviceRecords={serviceRecords}
                    onAddRecord={handleAddServiceRecord}
                    onEditRecord={handleEditServiceRecord}
                    showAddButton={true}
                    tabTitle="服务记录"
                    handoverData={relatedHandover}
                  />
                )
              }
            ]}
          />
        </Card>
      </div>

      {/* 新建服务记录模态框 */}
      <Modal
        title="新建服务记录"
        open={newRecordModalVisible}
        onCancel={() => setNewRecordModalVisible(false)}
        onOk={() => {
          // 处理新建服务记录的逻辑
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

      {/* 合同附件模态框 */}
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
                    'sow': { color: 'green', text: 'SOW' },
                    'invoice': { color: 'orange', text: '发票' },
                    'other': { color: 'default', text: '其他' }
                  };
                  const config = typeConfig[type] || typeConfig['other'];
                  return <Tag color={config.color}>{config.text}</Tag>;
                }
              },
              {
                title: '大小',
                dataIndex: 'size',
                key: 'size',
                width: 80,
                render: (size: number) => {
                  if (size < 1024) return `${size}B`;
                  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)}KB`;
                  return `${(size / (1024 * 1024)).toFixed(1)}MB`;
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

      {/* 编辑合同信息模态框 */}
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
              <Form.Item name="customerTier">
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

      {/* 编辑联系人模态框 */}
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
