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
  Select
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
  ArrowLeftOutlined
} from '@ant-design/icons';
import HandoverDetailHeader from '@/components/handover/HandoverDetailHeader';
import { useParams, useNavigate } from 'umi';
import { mockCustomers } from '@/mock/continuousServiceData';

const { Title, Text } = Typography;
const { Panel } = Collapse;
const { Option } = Select;
const { TextArea } = Input;

const ContinuousServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<any>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const [newRecordModalVisible, setNewRecordModalVisible] = useState(false);
  const [form] = Form.useForm();

  // 加载与列表一致的客户数据（通过URL中的id）
  useEffect(() => {
    // 在统一mock数据中查找该客户
    const base = mockCustomers.find((c) => c.id === id);
    if (!base) {
      // 未找到则保持原有占位数据以避免空白
      return;
    }

    // 将列表的关键字段映射到详情所需结构，其余字段仍用示例占位
    const mapped = {
      id: base.id,
      name: base.name,
      healthLevel: base.healthLevel,
      healthScore: base.healthScore,
      lifecycle: (base as any).lifecycleStage || '成长期',
      renewalRisk: base.isRenewalRisk ? '高' : '低',
      industry: '互联网科技',
      companySize: '500-1000人',
      address: '示例地址',
      contractAmount: base.contractAmount,
      contractEndDate: base.renewalDate,
      purchasedProducts: ['产品A', '插件B'],
      keyContacts: [
        {
          id: '1',
          name: base.csm,
          title: '客户成功经理',
          phone: '138-0000-0000',
          email: 'csm@example.com',
          isPrimary: true
        }
      ],
      serviceRecords: [
        {
          id: '1',
          type: 'phone',
          title: '客户回访电话',
          content: '与客户进行了产品使用情况回访',
          operator: `CSM-${base.csm}`,
          timestamp: '2024-01-15 14:30'
        }
      ]
    } as any;

    setCustomer(mapped);
  }, [id]);

  // 获取健康度颜色
  const getHealthColor = (level: string) => {
    switch (level) {
      case '健康': return 'success';
      case '一般': return 'warning';
      case '风险': return 'error';
      default: return 'default';
    }
  };

  if (!customer) {
    return <div style={{ padding: '24px', textAlign: 'center' }}>加载中...</div>;
  }

  return (
    <div ref={topRef} style={{
      padding: '24px',
      background: '#f5f5f5',
      minHeight: 'calc(100vh - 120px)',
      paddingBottom: '60px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* 复用交接实施的表头风格 */}
        <div style={{ marginBottom: '24px' }}>
          <HandoverDetailHeader
            handoverData={{
              id: customer.id,
              customerName: customer.name,
              handoverStatus: 'normal' as any,
              riskLevel: customer.healthLevel === '风险' ? 'high' as any : customer.healthLevel === '一般' ? 'medium' as any : 'low' as any,
              handoverNumber: 'SV-' + customer.id,
              createdAt: '2024-01-01',
              updatedAt: '2024-01-15',
              crmData: { salesSource: 'direct', salesPerson: customer.csm } as any,
            } as any}
            onBack={() => navigate('/profiles/service')}
            onEdit={() => setNewRecordModalVisible(true)}
            onViewContract={() => {}
            }
            onShare={() => {}
            }
          />
        </div>

        {/* 推荐服务剧本 */}
        <Card 
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <PlayCircleOutlined style={{ color: '#1890ff', marginRight: '8px', fontSize: '18px' }} />
              <span style={{ fontSize: '18px', fontWeight: '600' }}>推荐行动 (Playbook)</span>
            </div>
          }
          style={{
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
            border: '1px solid #f0f0f0',
            background: '#ffffff',
            marginBottom: '24px'
          }}
        >
          <Row gutter={24} align="middle">
            <Col flex="1">
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
            </Col>
            <Col>
              <Button 
                type="primary" 
                size="large"
                icon={<PlayCircleOutlined />}
                style={{ 
                  borderRadius: '8px',
                  height: '48px',
                  padding: '0 24px',
                  fontSize: '16px'
                }}
              >
                启动剧本
              </Button>
            </Col>
          </Row>
        </Card>

        <Row gutter={24}>
          {/* 客户档案信息 */}
          <Col span={8}>
            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <UserOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
                  <span style={{ fontSize: '16px', fontWeight: '600' }}>客户档案信息</span>
                </div>
              }
              style={{
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                border: '1px solid #f0f0f0',
                background: '#ffffff',
                marginBottom: '24px'
              }}
            >
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
                        {customer.purchasedProducts.map((product: string, index: number) => (
                          <Tag key={index} color="blue" style={{ marginBottom: '4px' }}>
                            {product}
                          </Tag>
                        ))}
                      </div>
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <Text strong>合同金额 (ARR)：</Text>
                      <div style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600' }}>
                        ¥{customer.contractAmount.toLocaleString()}
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
                    {customer.keyContacts.map((contact: any) => (
                      <div key={contact.id} style={{ 
                        marginBottom: '16px', 
                        padding: '12px', 
                        background: '#f8f9fa', 
                        borderRadius: '8px',
                        border: contact.isPrimary ? '2px solid #1890ff' : '1px solid #e8e8e8'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                          <Avatar 
                            icon={<UserOutlined />} 
                            style={{ 
                              marginRight: '8px',
                              backgroundColor: contact.isPrimary ? '#1890ff' : '#d9d9d9'
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
            </Card>
          </Col>

          {/* 服务记录 */}
          <Col span={16}>
            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ClockCircleOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
                    <span style={{ fontSize: '16px', fontWeight: '600' }}>服务记录</span>
                  </div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    共 {customer.serviceRecords.length} 条记录
                  </Text>
                </div>
              }
              style={{
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                border: '1px solid #f0f0f0',
                background: '#ffffff'
              }}
            >
              <Timeline
                style={{ padding: '16px 0' }}
                items={customer.serviceRecords.map((record: any) => ({
                  color: 'blue',
                  children: (
                    <div style={{ 
                      padding: '16px', 
                      background: '#f8f9fa', 
                      borderRadius: '8px',
                      border: '1px solid #e8e8e8'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <PhoneOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
                        <Text strong style={{ marginLeft: '8px', fontSize: '14px' }}>
                          {record.title}
                        </Text>
                        <div style={{ marginLeft: 'auto' }}>
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            {record.timestamp}
                          </Text>
                        </div>
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          操作人：{record.operator}
                        </Text>
                      </div>
                      <div>
                        <Text>{record.content}</Text>
                      </div>
                    </div>
                  )
                }))}
              />
            </Card>
          </Col>
        </Row>
      </>

      {/* 新建服务记录模态框 */}
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
              <Option value="phone">电话沟通</Option>
              <Option value="visit">上门拜访</Option>
              <Option value="email">邮件</Option>
              <Option value="task">任务完成</Option>
            </Select>
          </Form.Item>
          <Form.Item name="title" label="记录标题" rules={[{ required: true }]}>
            <Input placeholder="请输入记录标题" />
          </Form.Item>
          <Form.Item name="content" label="详细内容" rules={[{ required: true }]}>
            <TextArea rows={4} placeholder="请输入详细内容" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ContinuousServiceDetail;
