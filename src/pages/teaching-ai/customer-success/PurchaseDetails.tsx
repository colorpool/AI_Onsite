import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Table,
  Button,
  Input,
  Select,
  DatePicker,
  Tag,
  Space,
  Modal,
  Form,
  message,
  Tabs,
  Avatar,
  List,
  Badge,
  Tooltip,
  Typography,
  Statistic,
  Progress,
  Timeline,
  Rate,
  Divider,
  Alert,
  Descriptions,
  Steps,
  Empty,
  Drawer,
  Radio,
  Checkbox,
  InputNumber,
} from 'antd';
import {
  ShoppingCartOutlined,
  DollarOutlined,
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  ExportOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  StarOutlined,
  HeartOutlined,
  CommentOutlined,
  FileTextOutlined,
  BugOutlined,
  QuestionCircleOutlined,
  SolutionOutlined,
  ThunderboltOutlined,
  CrownOutlined,
  GiftOutlined,
  BookOutlined,
  BulbOutlined,
  RocketOutlined,
  SafetyOutlined,
  PayCircleOutlined,
  WalletOutlined,
  CreditCardOutlined,
  BankOutlined,
  MoneyCollectOutlined,
  LineChartOutlined,
  PieChartOutlined,
  BarChartOutlined,
  FundOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

// 样式定义
const cardStyle = {
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  border: '1px solid #f0f0f0',
  background: '#ffffff',
  marginBottom: '16px',
};

// 数据接口定义
interface PurchaseOrder {
  id: string;
  orderId: string;
  customerName: string;
  customerAvatar: string;
  customerLevel: string;
  productName: string;
  productType: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled';
  orderDate: string;
  paymentDate?: string;
  completionDate?: string;
  salesPerson: string;
  notes?: string;
  tags: string[];
}

interface RecommendationRule {
  id: string;
  name: string;
  description: string;
  conditions: string[];
  recommendations: string[];
  priority: 'high' | 'medium' | 'low';
  isActive: boolean;
  successRate: number;
  createdDate: string;
}

interface CustomerInsight {
  id: string;
  customerId: string;
  customerName: string;
  avatar: string;
  totalSpent: number;
  orderCount: number;
  avgOrderValue: number;
  lastOrderDate: string;
  preferredProducts: string[];
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
  potentialValue: number;
}

const PurchaseDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState('contracts');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'detail'>('create');
  const [currentOrder, setCurrentOrder] = useState<PurchaseOrder | null>(null);
  const [form] = Form.useForm();

  // 模拟数据 - 企业合同统计
  const purchaseStats = [
    { title: '合同总金额', value: 2456789, prefix: <DollarOutlined />, color: '#1890ff', suffix: '元' },
    { title: '活跃合同数', value: 12, prefix: <ShoppingCartOutlined />, color: '#52c41a' },
    { title: '即将到期', value: 3, prefix: <ClockCircleOutlined />, color: '#faad14' },
    { title: '续约率', value: 85.5, prefix: <RiseOutlined />, color: '#f5222d', suffix: '%' },
  ];

  const mockOrders: PurchaseOrder[] = [
    {
      id: '1',
      orderId: 'CONTRACT-2024-001',
      customerName: '北京科技有限公司',
      customerAvatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=beijing',
      customerLevel: '企业',
      productName: 'AI培训平台企业版',
      productType: '企业服务',
      quantity: 1,
      unitPrice: 299900,
      totalAmount: 299900,
      discountAmount: 30000,
      finalAmount: 269900,
      paymentMethod: '银行转账',
      paymentStatus: 'paid',
      orderStatus: 'processing',
      orderDate: '2024-01-15 14:30',
      paymentDate: '2024-01-15 14:32',
      completionDate: '2025-01-15 16:00',
      salesPerson: '钉学科技-李经理',
      notes: '合同到期时间：2025年1月15日，建议提前3个月开始续约谈判。客户预算充足，可推荐升级至旗舰版。',
      tags: ['年度合同', '即将到期', '续约机会'],
    },
    {
      id: '2',
      orderId: 'CONTRACT-2024-002',
      customerName: '北京科技有限公司',
      customerAvatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=beijing',
      customerLevel: '企业',
      productName: '定制开发服务',
      productType: '框架开发',
      quantity: 1,
      unitPrice: 150000,
      totalAmount: 150000,
      discountAmount: 0,
      finalAmount: 150000,
      paymentMethod: '银行转账',
      paymentStatus: 'paid',
      orderStatus: 'completed',
      orderDate: '2024-03-14 10:20',
      paymentDate: '2024-03-16 09:15',
      salesPerson: '钉学科技-赵架构师',
      notes: '框架开发协议已完成，客户满意度高。可推荐后续维护服务和功能扩展。',
      tags: ['框架开发', '已完成', '扩展机会'],
    },
    {
      id: '3',
      orderId: 'CONTRACT-2024-003',
      customerName: '北京科技有限公司',
      customerAvatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=beijing',
      customerLevel: '企业',
      productName: '技术支持服务包',
      productType: '技术服务',
      quantity: 1,
      unitPrice: 80000,
      totalAmount: 80000,
      discountAmount: 8000,
      finalAmount: 72000,
      paymentMethod: '银行转账',
      paymentStatus: 'paid',
      orderStatus: 'processing',
      orderDate: '2024-06-15 16:00',
      salesPerson: '钉学科技-孙顾问',
      notes: '年度技术支持服务，到期时间：2025年6月15日。客户技术团队成长快，建议续约时推荐高级支持包。',
      tags: ['技术支持', '年度服务', '升级潜力'],
    },
  ];

  const mockRecommendations: RecommendationRule[] = [
    {
      id: '1',
      name: 'AI培训平台续约提醒',
      description: '北京科技有限公司AI培训平台企业版合同即将到期，建议提前续约',
      conditions: ['合同到期时间：2025年1月15日', '当前使用情况良好', '客户满意度高'],
      recommendations: ['升级至旗舰版', '增加定制开发服务', '延长服务期至3年'],
      priority: 'high',
      isActive: true,
      successRate: 85.5,
      createdDate: '2024-10-15',
    },
    {
      id: '2',
      name: '技术支持服务升级建议',
      description: '客户技术团队成长迅速，建议升级技术支持服务包',
      conditions: ['当前为标准支持包', '技术咨询频次增加', '团队规模扩大'],
      recommendations: ['升级至高级支持包', '增加专属技术顾问', '提供现场技术培训'],
      priority: 'medium',
      isActive: true,
      successRate: 72.3,
      createdDate: '2024-09-20',
    },
    {
      id: '3',
      name: '框架扩展开发机会',
      description: '基于已完成的框架开发，推荐后续功能扩展项目',
      conditions: ['框架开发项目已完成', '客户满意度高', '有新功能需求'],
      recommendations: ['移动端适配开发', '数据分析模块', '第三方系统集成'],
      priority: 'medium',
      isActive: true,
      successRate: 68.9,
      createdDate: '2024-08-10',
    },
  ];

  const mockInsights: CustomerInsight[] = [
    {
      id: '1',
      customerId: '1',
      customerName: '北京科技有限公司',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=beijing',
      totalSpent: 519900,
      orderCount: 3,
      avgOrderValue: 800000,
      lastOrderDate: '2024-06-15',
      preferredProducts: ['AI培训平台', '定制开发', '技术支持'],
      riskLevel: 'low',
      recommendations: ['升级至旗舰版AI培训平台', '增加移动端开发服务', '扩展技术支持包'],
      potentialValue: 1200000,
    },
  ];

  // 表格列定义
  const orderColumns: ColumnsType<PurchaseOrder> = [
    {
      title: '订单信息',
      key: 'order',
      render: (_, record) => (
        <div>
          <Space>
            <Avatar src={record.customerAvatar} size="small" />
            <div>
              <div style={{ fontWeight: 500 }}>
                {record.orderId}
                {record.customerLevel === 'VIP' && <Tag color="gold">VIP</Tag>}
                {record.customerLevel === '企业' && <Tag color="purple">企业</Tag>}
              </div>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {record.customerName} · {record.orderDate}
              </Text>
            </div>
          </Space>
        </div>
      ),
    },
    {
      title: '产品信息',
      key: 'product',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{record.productName}</div>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.productType} · 数量: {record.quantity}
          </Text>
          <div style={{ marginTop: '4px' }}>
            {record.tags.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: '金额信息',
      key: 'amount',
      render: (_, record) => (
        <div>
          <div>
            <Text>原价: </Text>
            <Text delete={record.discountAmount > 0}>¥{record.totalAmount}</Text>
          </div>
          {record.discountAmount > 0 && (
            <div>
              <Text>优惠: </Text>
              <Text type="success">-¥{record.discountAmount}</Text>
            </div>
          )}
          <div>
            <Text strong>实付: ¥{record.finalAmount}</Text>
          </div>
        </div>
      ),
    },
    {
      title: '支付方式',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (method) => {
        const methodIcons = {
          '微信支付': <WalletOutlined style={{ color: '#52c41a' }} />,
          '支付宝': <PayCircleOutlined style={{ color: '#1890ff' }} />,
          '银行转账': <BankOutlined style={{ color: '#faad14' }} />,
          '信用卡': <CreditCardOutlined style={{ color: '#f5222d' }} />,
        };
        return (
          <Space>
            {methodIcons[method as keyof typeof methodIcons]}
            <Text>{method}</Text>
          </Space>
        );
      },
    },
    {
      title: '支付状态',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status: string) => {
        const statusConfig: Record<string, { color: string; text: string }> = {
          pending: { color: 'orange', text: '待支付' },
          paid: { color: 'green', text: '已支付' },
          failed: { color: 'red', text: '支付失败' },
          refunded: { color: 'purple', text: '已退款' },
        };
        const config = statusConfig[status];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: (status: string) => {
        const statusConfig: Record<string, { color: string; text: string }> = {
          pending: { color: 'orange', text: '待确认' },
          confirmed: { color: 'blue', text: '已确认' },
          processing: { color: 'purple', text: '处理中' },
          completed: { color: 'green', text: '已完成' },
          cancelled: { color: 'red', text: '已取消' },
        };
        const config = statusConfig[status];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '销售人员',
      dataIndex: 'salesPerson',
      key: 'salesPerson',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link" size="small" icon={<EyeOutlined />} onClick={() => showOrderDetail(record)}>
            查看
          </Button>
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => showEditOrder(record)}>
            编辑
          </Button>
          <Button type="link" size="small" icon={<FileTextOutlined />}>
            发票
          </Button>
        </Space>
      ),
    },
  ];

  const recommendationColumns: ColumnsType<RecommendationRule> = [
    {
      title: '规则名称',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{name}</div>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.description}
          </Text>
        </div>
      ),
    },
    {
      title: '触发条件',
      dataIndex: 'conditions',
      key: 'conditions',
      render: (conditions: string[]) => (
        <div>
          {conditions.map((condition, index) => (
            <Tag key={index} style={{ marginBottom: '4px' }}>
              {condition}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: '推荐内容',
      dataIndex: 'recommendations',
      key: 'recommendations',
      render: (recommendations: string[]) => (
        <div>
          {recommendations.slice(0, 2).map((rec, index) => (
            <Tag key={index} color="blue" style={{ marginBottom: '4px' }}>
              {rec}
            </Tag>
          ))}
          {recommendations.length > 2 && (
            <Tag style={{ marginBottom: '4px' }}>+{recommendations.length - 2}</Tag>
          )}
        </div>
      ),
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => {
        const priorityConfig: Record<string, { color: string; text: string }> = {
          high: { color: 'red', text: '高' },
          medium: { color: 'orange', text: '中' },
          low: { color: 'default', text: '低' },
        };
        const config = priorityConfig[priority];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '成功率',
      dataIndex: 'successRate',
      key: 'successRate',
      render: (rate) => (
        <div>
          <Progress percent={rate} size="small" />
          <Text style={{ fontSize: '12px' }}>{rate}%</Text>
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <Badge color={isActive ? 'green' : 'gray'} text={isActive ? '启用' : '禁用'} />
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link" size="small" icon={<EditOutlined />}>
            编辑
          </Button>
          <Button type="link" size="small" icon={record.isActive ? <ExclamationCircleOutlined /> : <CheckCircleOutlined />}>
            {record.isActive ? '禁用' : '启用'}
          </Button>
        </Space>
      ),
    },
  ];

  const showOrderDetail = (order: PurchaseOrder) => {
    setCurrentOrder(order);
    setModalType('detail');
    setIsModalVisible(true);
  };

  const showEditOrder = (order: PurchaseOrder) => {
    setCurrentOrder(order);
    setModalType('edit');
    form.setFieldsValue(order);
    setIsModalVisible(true);
  };

  const showCreateOrder = () => {
    setCurrentOrder(null);
    setModalType('create');
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (modalType === 'detail') {
      setIsModalVisible(false);
      return;
    }
    
    form.validateFields().then((values) => {
      console.log('Form values:', values);
      message.success('操作成功！');
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, color: '#262626' }}>
          北京科技有限公司 - 合同管理与续约建议
        </Title>
        <Text type="secondary">
          查看合同到期时间、续约时间、推荐购买方案、客户预算、框架开发协议等信息
        </Text>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        {purchaseStats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card style={cardStyle}>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="合同管理" key="contracts">
          <Card style={cardStyle}>
            <div style={{ marginBottom: '16px' }}>
              <Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={showCreateOrder}>
                  新增合同
                </Button>
                <Input.Search
                  placeholder="搜索合同"
                  style={{ width: 300 }}
                  onSearch={(value) => console.log(value)}
                />
                <Select placeholder="合同状态" style={{ width: 120 }}>
                  <Option value="all">全部</Option>
                  <Option value="processing">执行中</Option>
                  <Option value="completed">已完成</Option>
                  <Option value="expired">已到期</Option>
                </Select>
                <Select placeholder="服务类型" style={{ width: 120 }}>
                  <Option value="all">全部</Option>
                  <Option value="企业服务">企业服务</Option>
                  <Option value="框架开发">框架开发</Option>
                  <Option value="技术服务">技术服务</Option>
                </Select>
                <RangePicker placeholder={['开始日期', '结束日期']} />
                <Button icon={<ExportOutlined />}>导出</Button>
              </Space>
            </div>
            <Table
              columns={orderColumns}
              dataSource={mockOrders}
              rowKey="id"
              pagination={{
                total: 156,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `共 ${total} 条记录`,
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="续约建议" key="recommendations">
          <Card style={cardStyle}>
            <div style={{ marginBottom: '16px' }}>
              <Space>
                <Button type="primary" icon={<PlusOutlined />}>
                  新增建议
                </Button>
                <Input.Search
                  placeholder="搜索续约建议"
                  style={{ width: 300 }}
                  onSearch={(value) => console.log(value)}
                />
                <Select placeholder="紧急程度" style={{ width: 120 }}>
                  <Option value="all">全部</Option>
                  <Option value="high">紧急</Option>
                  <Option value="medium">一般</Option>
                  <Option value="low">不急</Option>
                </Select>
                <Select placeholder="建议状态" style={{ width: 120 }}>
                  <Option value="all">全部</Option>
                  <Option value="active">待执行</Option>
                  <Option value="inactive">已完成</Option>
                </Select>
              </Space>
            </div>
            <Table
              columns={recommendationColumns}
              dataSource={mockRecommendations}
              rowKey="id"
              pagination={{
                total: 25,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `共 ${total} 条记录`,
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="客户预算分析" key="insights">
          <Row gutter={[16, 16]}>
            {mockInsights.map((insight) => (
              <Col xs={24} lg={8} key={insight.customerId}>
                <Card
                  style={cardStyle}
                  title={
                    <Space>
                      <Avatar src={insight.avatar} />
                      <span>{insight.customerName}</span>
                      <Tag color={insight.riskLevel === 'low' ? 'green' : insight.riskLevel === 'medium' ? 'orange' : 'red'}>
                        {insight.riskLevel === 'low' ? '预算充足' : insight.riskLevel === 'medium' ? '预算一般' : '预算紧张'}
                      </Tag>
                    </Space>
                  }
                  extra={
                    <Button type="link" onClick={() => setIsDrawerVisible(true)}>
                      详情
                    </Button>
                  }
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Statistic
                          title="历史投入"
                          value={insight.totalSpent}
                          prefix="¥"
                          valueStyle={{ fontSize: '16px' }}
                        />
                      </Col>
                      <Col span={12}>
                        <Statistic
                          title="合同数量"
                          value={insight.orderCount}
                          valueStyle={{ fontSize: '16px' }}
                        />
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Statistic
                          title="年度预算"
                          value={insight.avgOrderValue}
                          prefix="¥"
                          valueStyle={{ fontSize: '16px' }}
                        />
                      </Col>
                      <Col span={12}>
                        <Statistic
                          title="预估续约金额"
                          value={insight.potentialValue}
                          prefix="¥"
                          valueStyle={{ fontSize: '16px', color: '#52c41a' }}
                        />
                      </Col>
                    </Row>
                    <Divider style={{ margin: '12px 0' }} />
                    <div>
                      <Text strong style={{ fontSize: '12px' }}>主要服务:</Text>
                      <div style={{ marginTop: '4px' }}>
                        {insight.preferredProducts.map(product => (
                          <Tag key={product} style={{ fontSize: '10px', margin: '2px' }}>
                            {product}
                          </Tag>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Text strong style={{ fontSize: '12px' }}>续约建议:</Text>
                      <List
                        size="small"
                        dataSource={insight.recommendations}
                        renderItem={(item) => (
                          <List.Item style={{ padding: '4px 0', fontSize: '12px' }}>
                            <BulbOutlined style={{ marginRight: '4px', color: '#faad14' }} />
                            {item}
                          </List.Item>
                        )}
                      />
                    </div>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>

        <TabPane tab="销售分析" key="analysis">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="销售趋势" style={cardStyle}>
                <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text type="secondary">图表组件占位</Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="产品销量分布" style={cardStyle}>
                <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text type="secondary">图表组件占位</Text>
                </div>
              </Card>
            </Col>
          </Row>
          
          <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
            <Col xs={24} lg={8}>
              <Card title="支付方式统计" style={cardStyle}>
                <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text type="secondary">饼图占位</Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card title="客户等级分布" style={cardStyle}>
                <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text type="secondary">柱状图占位</Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card title="月度增长率" style={cardStyle}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <Text>本月增长</Text>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                      +23.5%
                    </div>
                  </div>
                  <Progress percent={23.5} strokeColor="#52c41a" />
                  <Text type="secondary">较上月提升 5.2%</Text>
                </Space>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      {/* 订单详情/编辑模态框 */}
      <Modal
        title={
          modalType === 'create' ? '创建订单' :
          modalType === 'edit' ? '编辑订单' : '订单详情'
        }
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
        footer={modalType === 'detail' ? [
          <Button key="close" onClick={handleModalCancel}>
            关闭
          </Button>
        ] : undefined}
      >
        {modalType === 'detail' && currentOrder ? (
          <div>
            <Descriptions column={2} bordered>
              <Descriptions.Item label="订单编号">{currentOrder.orderId}</Descriptions.Item>
              <Descriptions.Item label="客户姓名">{currentOrder.customerName}</Descriptions.Item>
              <Descriptions.Item label="产品名称">{currentOrder.productName}</Descriptions.Item>
              <Descriptions.Item label="产品类型">{currentOrder.productType}</Descriptions.Item>
              <Descriptions.Item label="购买数量">{currentOrder.quantity}</Descriptions.Item>
              <Descriptions.Item label="单价">¥{currentOrder.unitPrice}</Descriptions.Item>
              <Descriptions.Item label="总金额">¥{currentOrder.totalAmount}</Descriptions.Item>
              <Descriptions.Item label="优惠金额">¥{currentOrder.discountAmount}</Descriptions.Item>
              <Descriptions.Item label="实付金额">¥{currentOrder.finalAmount}</Descriptions.Item>
              <Descriptions.Item label="支付方式">{currentOrder.paymentMethod}</Descriptions.Item>
              <Descriptions.Item label="支付状态">
                <Tag color={currentOrder.paymentStatus === 'paid' ? 'green' : 'orange'}>
                  {currentOrder.paymentStatus === 'paid' ? '已支付' : '待支付'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="订单状态">
                <Tag color="blue">{currentOrder.orderStatus}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="下单时间" span={2}>{currentOrder.orderDate}</Descriptions.Item>
              {currentOrder.paymentDate && (
                <Descriptions.Item label="支付时间" span={2}>{currentOrder.paymentDate}</Descriptions.Item>
              )}
              <Descriptions.Item label="销售人员">{currentOrder.salesPerson}</Descriptions.Item>
              <Descriptions.Item label="客户等级">{currentOrder.customerLevel}</Descriptions.Item>
              {currentOrder.notes && (
                <Descriptions.Item label="备注" span={2}>
                  <Paragraph>{currentOrder.notes}</Paragraph>
                </Descriptions.Item>
              )}
            </Descriptions>
          </div>
        ) : (
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="customerName" label="客户姓名" rules={[{ required: true }]}>
                  <Input placeholder="请输入客户姓名" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="customerLevel" label="客户等级" rules={[{ required: true }]}>
                  <Select placeholder="选择客户等级">
                    <Option value="普通">普通</Option>
                    <Option value="VIP">VIP</Option>
                    <Option value="企业">企业</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="productName" label="产品名称" rules={[{ required: true }]}>
                  <Input placeholder="请输入产品名称" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="productType" label="产品类型" rules={[{ required: true }]}>
                  <Select placeholder="选择产品类型">
                    <Option value="在线课程">在线课程</Option>
                    <Option value="企业服务">企业服务</Option>
                    <Option value="咨询服务">咨询服务</Option>
                    <Option value="技术支持">技术支持</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="quantity" label="数量" rules={[{ required: true }]}>
                  <InputNumber min={1} placeholder="数量" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="unitPrice" label="单价" rules={[{ required: true }]}>
                  <InputNumber min={0} placeholder="单价" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="discountAmount" label="优惠金额">
                  <InputNumber min={0} placeholder="优惠金额" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="paymentMethod" label="支付方式" rules={[{ required: true }]}>
                  <Select placeholder="选择支付方式">
                    <Option value="微信支付">微信支付</Option>
                    <Option value="支付宝">支付宝</Option>
                    <Option value="银行转账">银行转账</Option>
                    <Option value="信用卡">信用卡</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="salesPerson" label="销售人员" rules={[{ required: true }]}>
                  <Input placeholder="请输入销售人员" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="notes" label="备注">
              <TextArea rows={3} placeholder="请输入备注信息" />
            </Form.Item>
          </Form>
        )}
      </Modal>

      {/* 客户洞察详情抽屉 */}
      <Drawer
        title="客户详细洞察"
        placement="right"
        onClose={() => setIsDrawerVisible(false)}
        open={isDrawerVisible}
        width={600}
      >
        <Alert
          message="客户洞察功能"
          description="基于客户购买行为、学习进度、互动数据等多维度分析，为客户提供个性化的产品推荐和服务建议。"
          type="info"
          showIcon
          style={{ marginBottom: '16px' }}
        />
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <LineChartOutlined style={{ fontSize: '64px', color: '#d9d9d9' }} />
          <div style={{ marginTop: '16px' }}>
            <Title level={4} type="secondary">详细洞察分析开发中</Title>
            <Text type="secondary">即将为您提供更深入的客户行为分析</Text>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default PurchaseDetails;