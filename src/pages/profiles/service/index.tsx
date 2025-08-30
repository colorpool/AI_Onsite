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
  ExportOutlined,
  SettingOutlined
} from '@ant-design/icons';

type HealthLevel = '健康' | '一般' | '风险';
type Lifecycle = '成长期' | '成熟期' | '衰退期';

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
}

const mockAccounts: AccountRow[] = [
  { key: 'a1', name: '客户A', owner: '张伟', health: '风险', healthScore: 65, riskReason: '活跃度连续下降', lastInteractionDays: 12, lifecycle: '成长期', renewalRisk: true, onboardingCompleted: true, profileCompleteness: 100, handoverCompleted: true },
  { key: 'a2', name: '客户B', owner: '王芳', health: '健康', healthScore: 88, opportunityType: 'NPS高分', lastInteractionDays: 7, lifecycle: '成熟期', renewalRisk: false, onboardingCompleted: true, profileCompleteness: 100, handoverCompleted: true },
  { key: 'a3', name: '客户C', owner: '李强', health: '一般', healthScore: 72, lastInteractionDays: 33, lifecycle: '成熟期', renewalRisk: false, onboardingCompleted: true, profileCompleteness: 100, handoverCompleted: true },
  { key: 'a4', name: '客户D', owner: '赵敏', health: '风险', healthScore: 54, riskReason: '高优工单过多', lastInteractionDays: 3, lifecycle: '衰退期', renewalRisk: true, onboardingCompleted: true, profileCompleteness: 100, handoverCompleted: true },
  { key: 'a5', name: '客户E', owner: '刘洋', health: '健康', healthScore: 92, opportunityType: '用量超限', lastInteractionDays: 45, lifecycle: '成长期', renewalRisk: false, onboardingCompleted: true, profileCompleteness: 100, handoverCompleted: true },
  { key: 'a6', name: '客户F', owner: '张伟', health: '一般', healthScore: 76, lastInteractionDays: 29, lifecycle: '成熟期', renewalRisk: false, onboardingCompleted: true, profileCompleteness: 100, handoverCompleted: true },
  { key: 'a7', name: '客户G', owner: '王芳', health: '风险', healthScore: 61, riskReason: '活跃度连续下降', lastInteractionDays: 40, lifecycle: '衰退期', renewalRisk: true, onboardingCompleted: true, profileCompleteness: 100, handoverCompleted: true },
];

const healthColorMap: Record<HealthLevel, string> = {
  健康: '#52c41a',
  一般: '#8c8c8c',
  风险: '#fa541c',
};

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
  const pageSize = 10;

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

  // 处理导出
  const handleExport = () => {
    message.success('导出功能开发中...');
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
      width: 150,
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
      title: '最近活跃',
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
          <Typography.Title level={2} style={{ margin: 0, color: '#262626' }}>持续服务</Typography.Title>
          <Typography.Text type="secondary">以数据驱动的日常服务运营与健康度管理</Typography.Text>
        </div>

        {/* 顶部数据看板 */}
        <div style={{ marginBottom: '24px' }}>
          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Card style={{ borderRadius: '8px' }}>
                <Statistic title="总客户数" value={counts.total} valueStyle={{ fontWeight: 700 }} />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card style={{ borderRadius: '8px' }}>
                <Statistic title="平均健康分" value={counts.avgHealth} valueStyle={{ fontWeight: 700 }} />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card style={{ borderRadius: '8px' }}>
                <Statistic title="风险客户数" value={counts.risky} valueStyle={{ fontWeight: 700 }} />
              </Card>
            </Col>
          </Row>
        </div>

                {/* 筛选区域 */}
        <div style={{ 
          background: '#fff',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
        }}>
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
                <Button 
                  icon={<ExportOutlined />}
                  onClick={handleExport}
                >
                  导出
                </Button>
              </Space>
            </div>
          </div>
        </div>

        {/* 数据表格 */}
        <div style={{
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
        }}>
          <Table
            rowKey="key"
            columns={columns}
            dataSource={paginatedData}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: filteredAccounts.length,
              showSizeChanger: false,
              showQuickJumper: true,
              showTotal: (total, range) => `第${range[0]}-${range[1]}条/共${total}条`,
              onChange: (page) => setCurrentPage(page),
            }}
            size="middle"
          />
        </div>

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


