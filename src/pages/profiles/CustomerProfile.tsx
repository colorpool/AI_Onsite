import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Table, 
  Input, 
  Select, 
  Button, 
  Tag, 
  Space,
  Typography,
  Avatar,
  Statistic,
  Progress
} from 'antd';
import { 
  UserOutlined, 
  SearchOutlined,
  FilterOutlined,
  ExportOutlined,
  PlusOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

// 模拟客户档案数据
const mockCustomerProfiles = [
  {
    id: 'CUST-001',
    name: '北京科技创新有限公司',
    industry: '科技',
    scale: '大型企业',
    csm: '张三',
    arr: 1200000,
    healthScore: 85,
    lifecycleStage: '成长期',
    customerTier: 'high',
    lastContactDate: '2024-01-20',
    status: 'active'
  },
  {
    id: 'CUST-002',
    name: '上海智能制造集团',
    industry: '人工智能',
    scale: '中型企业',
    csm: '李四',
    arr: 800000,
    healthScore: 72,
    lifecycleStage: '成熟期',
    customerTier: 'medium',
    lastContactDate: '2024-01-18',
    status: 'active'
  },
  {
    id: 'CUST-003',
    name: '深圳金融科技有限公司',
    industry: '互联网',
    scale: '小型企业',
    csm: '王五',
    arr: 300000,
    healthScore: 45,
    lifecycleStage: '风险期',
    customerTier: 'small',
    lastContactDate: '2024-01-15',
    status: 'risk'
  }
];

const CustomerProfile: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('');
  const [filterStage, setFilterStage] = useState('');

  const getHealthColor = (score: number) => {
    if (score >= 80) return '#52c41a';
    if (score >= 60) return '#faad14';
    return '#ff4d4f';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'risk': return 'red';
      case 'inactive': return 'gray';
      default: return 'blue';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '活跃';
      case 'risk': return '风险';
      case 'inactive': return '不活跃';
      default: return '正常';
    }
  };

  const columns = [
    {
      title: '客户信息',
      key: 'customer',
      render: (record: any) => (
        <Space>
          <Avatar style={{ backgroundColor: '#1890ff' }}>
            {record.name.charAt(0)}
          </Avatar>
          <div>
            <div style={{ fontWeight: 500 }}>{record.name}</div>
            <Text type="secondary">{record.id}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: '行业',
      dataIndex: 'industry',
      key: 'industry',
    },
    {
      title: '企业规模',
      dataIndex: 'scale',
      key: 'scale',
    },
    {
      title: '客户成功经理',
      dataIndex: 'csm',
      key: 'csm',
    },
    {
      title: 'ARR',
      dataIndex: 'arr',
      key: 'arr',
      render: (value: number) => `¥${value.toLocaleString()}`,
    },
    {
      title: '健康分',
      dataIndex: 'healthScore',
      key: 'healthScore',
      render: (score: number) => (
        <div style={{ width: 80 }}>
          <Progress 
            percent={score} 
            size="small" 
            strokeColor={getHealthColor(score)}
            format={() => score}
          />
        </div>
      ),
    },
    {
      title: '生命周期阶段',
      dataIndex: 'lifecycleStage',
      key: 'lifecycleStage',
      render: (stage: string) => {
        const color = stage === '成长期' ? 'green' : stage === '成熟期' ? 'blue' : 'red';
        return <Tag color={color}>{stage}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
    },
    {
      title: '最后联系',
      dataIndex: 'lastContactDate',
      key: 'lastContactDate',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space>
          <Button type="link" size="small">查看详情</Button>
          <Button type="link" size="small">编辑</Button>
        </Space>
      ),
    },
  ];

  const filteredData = mockCustomerProfiles.filter(item => {
    const matchSearch = !searchText || 
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.csm.toLowerCase().includes(searchText.toLowerCase());
    const matchIndustry = !filterIndustry || item.industry === filterIndustry;
    const matchStage = !filterStage || item.lifecycleStage === filterStage;
    
    return matchSearch && matchIndustry && matchStage;
  });

  return (
    <div style={{ padding: '24px' }}>
      {/* 页面标题 */}
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>
          <UserOutlined style={{ marginRight: '8px' }} />
          客户档案
        </Title>
        <Text type="secondary">管理和查看所有客户的详细档案信息</Text>
      </div>

      {/* 统计卡片 */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总客户数"
              value={mockCustomerProfiles.length}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="活跃客户"
              value={mockCustomerProfiles.filter(c => c.status === 'active').length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="风险客户"
              value={mockCustomerProfiles.filter(c => c.status === 'risk').length}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="平均健康分"
              value={Math.round(mockCustomerProfiles.reduce((sum, c) => sum + c.healthScore, 0) / mockCustomerProfiles.length)}
              suffix="分"
            />
          </Card>
        </Col>
      </Row>

      {/* 搜索和筛选 */}
      <Card style={{ marginBottom: '16px' }}>
        <Row gutter={16} align="middle">
          <Col span={8}>
            <Search
              placeholder="搜索客户名称或CSM"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col span={4}>
            <Select
              placeholder="筛选行业"
              value={filterIndustry}
              onChange={setFilterIndustry}
              style={{ width: '100%' }}
              allowClear
            >
              <Option value="科技">科技</Option>
              <Option value="人工智能">人工智能</Option>
              <Option value="互联网">互联网</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select
              placeholder="筛选阶段"
              value={filterStage}
              onChange={setFilterStage}
              style={{ width: '100%' }}
              allowClear
            >
              <Option value="成长期">成长期</Option>
              <Option value="成熟期">成熟期</Option>
              <Option value="风险期">风险期</Option>
            </Select>
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Space>
              <Button icon={<FilterOutlined />}>高级筛选</Button>
              <Button icon={<ExportOutlined />}>导出</Button>
              <Button type="primary" icon={<PlusOutlined />}>新增客户</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 客户列表 */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            total: filteredData.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
          }}
        />
      </Card>
    </div>
  );
};

export default CustomerProfile;