import React, { useMemo, useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Input, 
  Select, 
  Table, 
  Tag, 
  Progress, 
  Statistic, 
  Space, 
  Typography, 
  Divider, 
  Tooltip,
  Button,
  message,
  Drawer,
  Descriptions,
  Timeline,
  Badge,
  Switch
} from 'antd';
import {
  UserOutlined,
  SearchOutlined,
  ReloadOutlined,
  SettingOutlined,
  BarChartOutlined,
  TeamOutlined,
  CustomerServiceOutlined,
  BellOutlined,
  PlusOutlined
} from '@ant-design/icons';

type HealthLevel = '健康' | '一般' | '风险';
type Lifecycle = '成长期' | '成熟期' | '衰退期';
type ConnectionLevel = 'high' | 'medium' | 'low';

interface AccountRow {
  key: string;
  name: string;
  owner: string;
  health: HealthLevel;
  healthScore: number;
  riskReason?: string;
  opportunityType?: string;
  lastInteractionDays: number;
  lifecycle: Lifecycle;
  renewalRisk: boolean;
  onboardingCompleted: boolean;
  profileCompleteness: number;
  handoverCompleted: boolean;
  connectionLevel: ConnectionLevel;
  lastContactDate: string;
  lastContactMethod: string;
  arr: number;
}

const mockAccounts: AccountRow[] = [
  { key: 'a1', name: '客户A', owner: '张伟', health: '风险', healthScore: 65, riskReason: '活跃度连续下降', lastInteractionDays: 12, lifecycle: '成长期', renewalRisk: true, onboardingCompleted: true, profileCompleteness: 100, handoverCompleted: true, connectionLevel: 'medium', lastContactDate: '2024-01-15', lastContactMethod: '电话', arr: 120000 },
  { key: 'a2', name: '客户B', owner: '王芳', health: '健康', healthScore: 88, opportunityType: 'NPS高分', lastInteractionDays: 7, lifecycle: '成熟期', renewalRisk: false, onboardingCompleted: true, profileCompleteness: 100, handoverCompleted: true, connectionLevel: 'high', lastContactDate: '2024-01-20', lastContactMethod: '会议', arr: 250000 },
  { key: 'a3', name: '客户C', owner: '李强', health: '一般', healthScore: 72, lastInteractionDays: 33, lifecycle: '成熟期', renewalRisk: false, onboardingCompleted: true, profileCompleteness: 100, handoverCompleted: true, connectionLevel: 'low', lastContactDate: '2023-12-20', lastContactMethod: '邮件', arr: 80000 },
  { key: 'a4', name: '客户D', owner: '赵敏', health: '风险', healthScore: 54, riskReason: '高优工单过多', lastInteractionDays: 3, lifecycle: '衰退期', renewalRisk: true, onboardingCompleted: true, profileCompleteness: 100, handoverCompleted: true, connectionLevel: 'high', lastContactDate: '2024-01-24', lastContactMethod: '会议', arr: 180000 },
  { key: 'a5', name: '客户E', owner: '刘洋', health: '健康', healthScore: 92, opportunityType: '用量超限', lastInteractionDays: 45, lifecycle: '成长期', renewalRisk: false, onboardingCompleted: true, profileCompleteness: 100, handoverCompleted: true, connectionLevel: 'low', lastContactDate: '2023-12-10', lastContactMethod: '电话', arr: 320000 },
  { key: 'a6', name: '客户F', owner: '张伟', health: '一般', healthScore: 76, lastInteractionDays: 29, lifecycle: '成熟期', renewalRisk: false, onboardingCompleted: true, profileCompleteness: 100, handoverCompleted: true, connectionLevel: 'medium', lastContactDate: '2023-12-28', lastContactMethod: '邮件', arr: 150000 },
  { key: 'a7', name: '客户G', owner: '王芳', health: '风险', healthScore: 61, riskReason: '活跃度连续下降', lastInteractionDays: 40, lifecycle: '衰退期', renewalRisk: true, onboardingCompleted: true, profileCompleteness: 100, handoverCompleted: true, connectionLevel: 'low', lastContactDate: '2023-12-15', lastContactMethod: '电话', arr: 95000 },
];

const healthColorMap: Record<HealthLevel, string> = {
  健康: '#52c41a',
  一般: '#8c8c8c',
  风险: '#fa541c',
};

// 智能跟进提醒数据
const smartReminders = [
  {
    id: 1,
    customerName: '客户A',
    reason: '已超过30天未联系，建议安排回访',
    priority: 'high',
    daysOverdue: 18
  },
  {
    id: 2,
    customerName: '客户E',
    reason: '即将进入续约期，请启动续约沟通',
    priority: 'medium',
    daysOverdue: 5
  },
  {
    id: 3,
    customerName: '客户C',
    reason: '健康度下降，需要关注客户状态',
    priority: 'medium',
    daysOverdue: 10
  }
];

const ServiceWorkbench: React.FC = () => {
  // 搜索筛选状态
  const [searchParams, setSearchParams] = useState({
    customerName: '',
    healthLevel: undefined as HealthLevel | undefined,
    lifecycle: undefined as Lifecycle | undefined,
    renewalRisk: undefined as boolean | undefined
  });

  // 我的/全部切换状态
  const [showMyCustomersOnly, setShowMyCustomersOnly] = useState(true);
  const currentUser = '张伟'; // 当前登录用户，后续从登录状态获取

  // 分页状态
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 抽屉状态
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AccountRow | null>(null);

  // 处理搜索
  const handleSearch = () => {
    setCurrentPage(1);
    message.success('搜索完成');
  };

  // 处理重置
  const handleReset = () => {
    setSearchParams({
      customerName: '',
      healthLevel: undefined,
      lifecycle: undefined,
      renewalRisk: undefined
    });
    setCurrentPage(1);
    message.success('已重置筛选条件');
  };

  

  // 处理查看详情
  const handleViewDetail = (record: AccountRow) => {
    setSelectedRecord(record);
    setDrawerVisible(true);
  };

  // 处理关闭抽屉
  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setSelectedRecord(null);
  };

    // 过滤数据 - 只显示已完成交接且档案完整度100%的客户
  const filteredAccounts = useMemo(() => {
    return mockAccounts.filter(acc => {
      // 只显示已完成交接且档案完整度100%的客户
      if (!acc.handoverCompleted || acc.profileCompleteness < 100) {
        return false;
      }

      // 我的/全部切换过滤
      if (showMyCustomersOnly && acc.owner !== currentUser) {
        return false;
      }

      // 应用搜索筛选条件
      const matchName = !searchParams.customerName || 
        acc.name.includes(searchParams.customerName);
      const matchHealth = !searchParams.healthLevel || 
        acc.health === searchParams.healthLevel;
      const matchLifecycle = !searchParams.lifecycle || 
        acc.lifecycle === searchParams.lifecycle;
      const matchRenewalRisk = typeof searchParams.renewalRisk === 'undefined' || 
        acc.renewalRisk === searchParams.renewalRisk;
      
      return matchName && matchHealth && matchLifecycle && matchRenewalRisk;
    });
  }, [searchParams, showMyCustomersOnly, currentUser]);

  // 分页数据
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAccounts.slice(startIndex, startIndex + pageSize);
  }, [filteredAccounts, currentPage]);

  // 统计数据
  const counts = useMemo(() => {
    const total = filteredAccounts.length || 1;
    const healthy = filteredAccounts.filter(a => a.health === '健康').length;
    const medium = filteredAccounts.filter(a => a.health === '一般').length;
    const risky = filteredAccounts.filter(a => a.health === '风险').length;
    const avgHealth = Math.round(
      filteredAccounts.reduce((s, a) => s + a.healthScore, 0) / Math.max(1, filteredAccounts.length)
    );
    return { total, healthy, medium, risky, avgHealth };
  }, [filteredAccounts]);

  // 表格列定义
  const columns = [
    {
      title: '客户名称',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left' as const,
      width: 200,
      align: 'center' as const,
      render: (name: string) => (
        <a style={{ color: '#1890ff' }}>{name}</a>
      ),
    },
    {
      title: '负责人',
      dataIndex: 'owner',
      key: 'owner',
      width: 120,
      align: 'center' as const,
    },
    {
      title: '健康度',
      dataIndex: 'health',
      key: 'health',
      width: 120,
      align: 'center' as const,
      render: (health: HealthLevel) => (
        <Tag color={healthColorMap[health]}>{health}</Tag>
      ),
    },
    {
      title: '健康分',
      dataIndex: 'healthScore',
      key: 'healthScore',
      width: 100,
      align: 'center' as const,
      render: (score: number) => (
        <span style={{ fontWeight: 500 }}>{score}</span>
      ),
    },
    {
      title: '生命周期',
      dataIndex: 'lifecycle',
      key: 'lifecycle',
      width: 120,
      align: 'center' as const,
    },
    {
      title: 'ARR',
      dataIndex: 'arr',
      key: 'arr',
      width: 120,
      align: 'center' as const,
      render: (arr: number) => (
        <span style={{ fontWeight: 500 }}>¥{(arr / 10000).toFixed(1)}万</span>
      ),
    },
    {
      title: '建联度',
      dataIndex: 'connectionLevel',
      key: 'connectionLevel',
      width: 100,
      align: 'center' as const,
      render: (level: ConnectionLevel, record: AccountRow) => {
        const getSignalIcon = (level: ConnectionLevel) => {
          const baseStyle = { display: 'inline-block', width: '4px', height: '12px', marginRight: '2px', borderRadius: '1px' };
          
          switch (level) {
            case 'high':
              return (
                <div style={{ display: 'flex', alignItems: 'end', gap: '1px' }}>
                  <div style={{ ...baseStyle, height: '6px', backgroundColor: '#52c41a' }} />
                  <div style={{ ...baseStyle, height: '9px', backgroundColor: '#52c41a' }} />
                  <div style={{ ...baseStyle, height: '12px', backgroundColor: '#52c41a' }} />
                </div>
              );
            case 'medium':
              return (
                <div style={{ display: 'flex', alignItems: 'end', gap: '1px' }}>
                  <div style={{ ...baseStyle, height: '6px', backgroundColor: '#1890ff' }} />
                  <div style={{ ...baseStyle, height: '9px', backgroundColor: '#1890ff' }} />
                  <div style={{ ...baseStyle, height: '12px', backgroundColor: '#d9d9d9' }} />
                </div>
              );
            case 'low':
              return (
                <div style={{ display: 'flex', alignItems: 'end', gap: '1px' }}>
                  <div style={{ ...baseStyle, height: '6px', backgroundColor: '#8c8c8c' }} />
                  <div style={{ ...baseStyle, height: '9px', backgroundColor: '#d9d9d9' }} />
                  <div style={{ ...baseStyle, height: '12px', backgroundColor: '#d9d9d9' }} />
                </div>
              );
            default:
              return null;
          }
        };
        
        return (
          <Tooltip title={`最近联系: ${record.lastContactDate}, 联系方式: ${record.lastContactMethod}`}>
            {getSignalIcon(level)}
          </Tooltip>
        );
      },
    },
    {
      title: '最后接触',
      dataIndex: 'lastInteractionDays',
      key: 'lastInteractionDays',
      width: 120,
      align: 'center' as const,
      render: (days: number) => (
        <span>{days === 0 ? '今天' : `${days} 天前`}</span>
      ),
    },
    {
      title: '续约风险',
      dataIndex: 'renewalRisk',
      key: 'renewalRisk',
      width: 120,
      align: 'center' as const,
      render: (risk: boolean, record: AccountRow) => (
        <Tooltip title={risk ? '存在续约风险' : '无明显风险'}>
          <Progress
            percent={risk ? Math.min(95, 50 + (100 - record.healthScore)) : 8}
            size="small"
            showInfo={false}
            strokeColor={risk ? '#fa541c' : '#bfbfbf'}
          />
        </Tooltip>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      align: 'center' as const,
      render: (_: any, record: AccountRow) => (
        <Space>
          <a onClick={() => handleViewDetail(record)}>查看详情</a>
          <a>编辑</a>
        </Space>
      ),
    },
  ];

  // 统一卡片样式（参考我的工作台）
  const cardStyle = {
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    border: '1px solid #f0f0f0',
    background: '#ffffff',
    marginBottom: '16px',
  };

  return (
    <div style={{
      padding: '24px',
      background: '#f5f5f5',
      minHeight: 'calc(100vh - 120px)',
      paddingBottom: '60px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* 页面标题 */}
        <div style={{ marginBottom: '24px' }}>
          <Typography.Title level={2} style={{ margin: 0, color: '#262626', fontWeight: '600' }}>持续服务</Typography.Title>
          <Typography.Text type="secondary" style={{ fontSize: '14px', color: '#666' }}>以数据驱动的日常服务运营与健康度管理</Typography.Text>
        </div>

        {/* 顶部数据看板 */}
        <div style={{ marginBottom: '24px' }}>
          {/* 第一行：统计数据 */}
          <Row gutter={16} style={{ marginBottom: '16px' }}>
            <Col xs={24} sm={8}>
              <Card 
                style={cardStyle}
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <BarChartOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
                    <span style={{ fontSize: '16px', fontWeight: '600' }}>总客户数</span>
                  </div>
                }
                bodyStyle={{ padding: '12px' }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#1890ff', marginBottom: '6px' }}>
                    {counts.total}
                  </div>
                  <Typography.Text type="secondary" style={{ fontSize: '13px' }}>已完成交接的客户</Typography.Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card 
                style={cardStyle}
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TeamOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                    <span style={{ fontSize: '16px', fontWeight: '600' }}>平均健康分</span>
                  </div>
                }
                bodyStyle={{ padding: '12px' }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#52c41a', marginBottom: '6px' }}>
                    {counts.avgHealth}
                  </div>
                  <Typography.Text type="secondary" style={{ fontSize: '13px' }}>客户健康度均值</Typography.Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card 
                style={cardStyle}
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CustomerServiceOutlined style={{ color: '#fa541c', marginRight: '8px' }} />
                    <span style={{ fontSize: '16px', fontWeight: '600' }}>风险客户数</span>
                  </div>
                }
                bodyStyle={{ padding: '12px' }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#fa541c', marginBottom: '6px' }}>
                    {counts.risky}
                  </div>
                  <Typography.Text type="secondary" style={{ fontSize: '13px' }}>需要关注的客户</Typography.Text>
                </div>
              </Card>
            </Col>
          </Row>
          
          {/* 第二行：健康度分布和智能跟进提醒 */}
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Card 
                style={cardStyle}
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '16px', fontWeight: '600' }}>健康度分布</span>
                  </div>
                }
                bodyStyle={{ padding: '12px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}>
                  <div style={{ position: 'relative', width: 60, height: 60, borderRadius: '50%', background: `conic-gradient(${[
                    { name: '健康', value: counts.healthy, color: '#52c41a' },
                    { name: '一般', value: counts.medium, color: '#8c8c8c' },
                    { name: '风险', value: counts.risky, color: '#fa541c' }
                  ].map((d, idx, arr) => {
                    const total = arr.reduce((s, i) => s + i.value, 0) || 1;
                    const start = arr.slice(0, idx).reduce((s, i) => s + i.value, 0) / total * 360;
                    const end = (start + d.value / total * 360);
                    return `${d.color} ${start}deg ${end}deg`;
                  }).join(', ')})` }} />
                  <div style={{ display: 'grid', gap: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: '#52c41a' }} />
                      <span style={{ fontSize: '13px' }}>健康：{counts.healthy}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: '#8c8c8c' }} />
                      <span style={{ fontSize: '13px' }}>一般：{counts.medium}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: '#fa541c' }} />
                      <span style={{ fontSize: '13px' }}>风险：{counts.risky}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card 
                style={cardStyle}
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <BellOutlined style={{ color: '#fa8c16', marginRight: '8px' }} />
                    <span style={{ fontSize: '16px', fontWeight: '600' }}>智能跟进提醒</span>
                  </div>
                }
                bodyStyle={{ padding: '12px' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {smartReminders.slice(0, 3).map((reminder) => (
                    <div key={reminder.id} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      padding: '6px 0',
                      borderBottom: '1px solid #f0f0f0'
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13px', marginBottom: '2px' }}>
                          <a style={{ color: '#1890ff', fontWeight: 500 }}>[{reminder.customerName}]</a>
                          <span style={{ color: '#666', marginLeft: '4px' }}>- {reminder.reason}</span>
                        </div>
                      </div>
                      <Button 
                        size="small" 
                        type="primary" 
                        icon={<PlusOutlined />}
                        style={{ fontSize: '12px', height: '24px', padding: '0 8px' }}
                        onClick={() => message.success(`已为${reminder.customerName}创建跟进任务`)}
                      >
                        创建任务
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          </Row>
        </div>

        {/* 筛选区域 */}
        <Card 
          style={cardStyle}
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <SearchOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
              <span style={{ fontSize: '16px', fontWeight: '600' }}>客户筛选</span>
            </div>
          }
          bodyStyle={{ padding: '24px' }}
        >
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '16px'
          }}>
            <Input 
              allowClear 
              placeholder="客户名称: 请输入" 
              value={searchParams.customerName}
              onChange={(e) => setSearchParams(prev => ({ ...prev, customerName: e.target.value }))}
              style={{ width: 220 }}
              size="middle"
            />
            <Select
              allowClear
              placeholder="健康度: 请选择"
              value={searchParams.healthLevel}
              onChange={(value) => setSearchParams(prev => ({ ...prev, healthLevel: value }))}
              style={{ width: 180 }}
              size="middle"
            >
              <Select.Option value="健康">健康</Select.Option>
              <Select.Option value="一般">一般</Select.Option>
              <Select.Option value="风险">风险</Select.Option>
            </Select>
            <Select
              allowClear
              placeholder="生命周期: 请选择"
              value={searchParams.lifecycle}
              onChange={(value) => setSearchParams(prev => ({ ...prev, lifecycle: value }))}
              style={{ width: 180 }}
              size="middle"
            >
              <Select.Option value="成长期">成长期</Select.Option>
              <Select.Option value="成熟期">成熟期</Select.Option>
              <Select.Option value="衰退期">衰退期</Select.Option>
            </Select>
            <Select
              allowClear
              placeholder="续约风险: 请选择"
              value={searchParams.renewalRisk}
              onChange={(value) => setSearchParams(prev => ({ ...prev, renewalRisk: value }))}
              style={{ width: 180 }}
              size="middle"
            >
              <Select.Option value={true}>存在风险</Select.Option>
              <Select.Option value={false}>无风险</Select.Option>
            </Select>
            
            <div style={{ marginLeft: 'auto' }}>
              <Space size="small">
                <Switch 
                  checked={showMyCustomersOnly}
                  onChange={setShowMyCustomersOnly}
                  size="small"
                  checkedChildren="我的"
                  unCheckedChildren="全部"
                />
                <Divider type="vertical" />
                <Button onClick={handleReset}>
                  重置
                </Button>
                <Button 
                  type="primary" 
                  icon={<SearchOutlined />}
                  onClick={handleSearch}
                >
                  查询
                </Button>

              </Space>
            </div>
          </div>
        </Card>

        {/* 数据表格 */}
        <Card 
          style={cardStyle}
          title={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <SettingOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
                <span style={{ fontSize: '16px', fontWeight: '600' }}>客户服务数据</span>
              </div>
              <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                共 {filteredAccounts.length} 条记录
              </Typography.Text>
            </div>
          }
          bodyStyle={{ padding: '0' }}
        >
          <Table
            rowKey="key"
            columns={columns}
            dataSource={paginatedData}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: filteredAccounts.length,
              showSizeChanger: true,
              showQuickJumper: true,
              pageSizeOptions: ['5', '10', '20', '50'],
              showTotal: (total, range) => `第${range[0]}-${range[1]}条/共${total}条`,
              onChange: (page, size) => {
                setCurrentPage(page);
                if (size !== pageSize) {
                  setPageSize(size);
                  setCurrentPage(1); // 改变页面大小时重置到第一页
                }
              },
              onShowSizeChange: (current, size) => {
                setPageSize(size);
                setCurrentPage(1); // 改变页面大小时重置到第一页
              },
            }}
            size="middle"
            style={{ 
              background: '#fff',
              borderRadius: '0 0 12px 12px'
            }}
          />
        </Card>

        {/* 客户详情抽屉 */}
        <Drawer
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                background: '#1890ff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold'
              }}>
                {selectedRecord?.name.charAt(0)}
              </div>
              <div>
                <Typography.Title level={4} style={{ margin: 0 }}>{selectedRecord?.name}</Typography.Title>
                <Typography.Text type="secondary">客户详情</Typography.Text>
              </div>
            </div>
          }
          placement="right"
          width={600}
          open={drawerVisible}
          onClose={handleCloseDrawer}
          extra={
            <Space>
              <Button size="small">编辑</Button>
              <Button type="primary" size="small">联系客户</Button>
            </Space>
          }
        >
          {selectedRecord && (
            <div style={{ padding: '0 16px' }}>
              {/* 基本信息 */}
              <Card title="基本信息" size="small" style={{ marginBottom: 16 }}>
                <Descriptions column={2} size="small">
                  <Descriptions.Item label="客户名称">{selectedRecord.name}</Descriptions.Item>
                  <Descriptions.Item label="负责人">{selectedRecord.owner}</Descriptions.Item>
                  <Descriptions.Item label="健康度">
                    <Tag color={healthColorMap[selectedRecord.health]}>{selectedRecord.health}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="健康分">{selectedRecord.healthScore}</Descriptions.Item>
                  <Descriptions.Item label="生命周期">{selectedRecord.lifecycle}</Descriptions.Item>
                  <Descriptions.Item label="最近活跃">
                    {selectedRecord.lastInteractionDays === 0 ? '今天' : `${selectedRecord.lastInteractionDays} 天前`}
                  </Descriptions.Item>
                  <Descriptions.Item label="续约风险">
                    <Badge 
                      status={selectedRecord.renewalRisk ? 'error' : 'success'} 
                      text={selectedRecord.renewalRisk ? '存在风险' : '无风险'} 
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="档案完整度">
                    <Progress percent={selectedRecord.profileCompleteness} size="small" />
                  </Descriptions.Item>
                </Descriptions>
              </Card>

              {/* 风险与机会 */}
              {(selectedRecord.riskReason || selectedRecord.opportunityType) && (
                <Card title="风险与机会" size="small" style={{ marginBottom: 16 }}>
                  {selectedRecord.riskReason && (
                    <div style={{ marginBottom: 12 }}>
                      <Typography.Text strong style={{ color: '#fa541c' }}>风险提示：</Typography.Text>
                      <Typography.Text>{selectedRecord.riskReason}</Typography.Text>
                    </div>
                  )}
                  {selectedRecord.opportunityType && (
                    <div>
                      <Typography.Text strong style={{ color: '#52c41a' }}>机会类型：</Typography.Text>
                      <Typography.Text>{selectedRecord.opportunityType}</Typography.Text>
                    </div>
                  )}
                </Card>
              )}

              {/* 服务记录 */}
              <Card title="服务记录" size="small" style={{ marginBottom: 16 }}>
                <Timeline
                  items={[
                    {
                      color: 'green',
                      children: (
                        <div>
                          <Typography.Text strong>客户回访</Typography.Text>
                          <br />
                          <Typography.Text type="secondary">2024-01-15 14:30</Typography.Text>
                          <br />
                          <Typography.Text>客户对产品功能满意，建议增加高级培训课程</Typography.Text>
                        </div>
                      ),
                    },
                    {
                      color: 'blue',
                      children: (
                        <div>
                          <Typography.Text strong>技术支持</Typography.Text>
                          <br />
                          <Typography.Text type="secondary">2024-01-10 09:15</Typography.Text>
                          <br />
                          <Typography.Text>解决了API集成问题，客户反馈良好</Typography.Text>
                        </div>
                      ),
                    },
                    {
                      color: 'orange',
                      children: (
                        <div>
                          <Typography.Text strong>续约提醒</Typography.Text>
                          <br />
                          <Typography.Text type="secondary">2024-01-05 16:00</Typography.Text>
                          <br />
                          <Typography.Text>发送续约提醒邮件，客户已确认收到</Typography.Text>
                        </div>
                      ),
                    },
                  ]}
                />
              </Card>

              {/* 快速操作 */}
              <Card title="快速操作" size="small">
                <Space wrap>
                  <Button size="small" type="primary">安排回访</Button>
                  <Button size="small">发送邮件</Button>
                  <Button size="small">创建工单</Button>
                  <Button size="small">更新档案</Button>
                  <Button size="small" danger={selectedRecord.renewalRisk}>风险处理</Button>
                </Space>
              </Card>
            </div>
          )}
        </Drawer>

      </div>
    </div>
  );
};

export default ServiceWorkbench;


