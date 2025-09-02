import React, { useState, useMemo } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Tabs, 
  Typography, 
  Statistic,
  Table,
  Tag,
  Input,
  Select,
  Space,
  Button,
  Tooltip,
  Progress,
  Badge,
  Avatar,
  message,
  Modal,
  Form,
  DatePicker,
  Divider
} from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  ExportOutlined,
  PlusOutlined,
  BarChartOutlined,
  TeamOutlined,
  HeartOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  PlayCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  SettingOutlined,
  CustomerServiceOutlined,
  RiseOutlined,
  FallOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  PieChartOutlined,
  FireOutlined,
  AlertOutlined,
  TrophyOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  StarOutlined
} from '@ant-design/icons';
// 使用 Ant Design 内置组件替代图表库
import { useNavigate } from 'umi';
import {
  mockCustomers,
  mockValueBoards,
  mockQBRMeetings,
  mockRiskEvents,
  mockServicePlaybooks,
  mockKeyActions,
  mockServiceOverview,
  healthColors,
  lifecycleColors
} from '../../../mock/continuousServiceData';
import type { 
  Customer, 
  CustomerFilter, 
  HealthLevel, 
  LifecycleStage,
  ActionType,
  ValueBoard,
  QBRMeeting,
  RiskEvent,
  ServicePlaybook
} from '../../../types/continuousService';

const { Title, Text } = Typography;
const { Option } = Select;

// 统一的卡片样式 - 参考工作看板的现代风格
const cardStyle = {
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  border: '1px solid #f0f0f0',
  background: '#ffffff',
  marginBottom: '16px',
};

// 概览与监控页签组件
const OverviewTab: React.FC = () => {
  const navigate = useNavigate();
  const [customerFilter, setCustomerFilter] = useState<CustomerFilter>({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const headerCardHeight = 150;

  // 过滤客户数据
  const filteredCustomers = useMemo(() => {
    return mockCustomers.filter(customer => {
      if (customerFilter.name && !customer.name.toLowerCase().includes(customerFilter.name.toLowerCase())) {
        return false;
      }
      if (customerFilter.healthLevel && customer.healthLevel !== customerFilter.healthLevel) {
        return false;
      }
      if (customerFilter.lifecycleStage && customer.lifecycleStage !== customerFilter.lifecycleStage) {
        return false;
      }
      if (customerFilter.renewalRisk !== undefined && customer.isRenewalRisk !== customerFilter.renewalRisk) {
        return false;
      }
      return true;
    });
  }, [customerFilter]);

  // 健康度分布数据
  const healthDistributionData = [
    { name: '健康', value: mockServiceOverview.healthDistribution.healthy, color: healthColors['健康'] },
    { name: '一般', value: mockServiceOverview.healthDistribution.normal, color: healthColors['一般'] },
    { name: '风险', value: mockServiceOverview.healthDistribution.risky, color: healthColors['风险'] }
  ];

  // 异动情况与重点关注客户的示例数据
  const movementEvents = [
    { id: 'm1', title: '管理员离职', detail: '客户A 主要管理员离职', date: '2025-01-05', level: 'high' },
    { id: 'm2', title: 'CSM变更', detail: '客户B CSM 负责人调整', date: '2025-01-08', level: 'medium' },
    { id: 'm3', title: '权限收缩', detail: '客户C 减少管理员数量', date: '2025-01-12', level: 'low' },
  ];

  const focusCustomers = [
    { id: 'f1', name: '华夏教育集团', tags: ['培训部>3人', '教育行业', '成交额>¥50万'] },
    { id: 'f2', name: '星云制造', tags: ['制造业', '增购潜力高'] },
    { id: 'f3', name: '新锐互联网', tags: ['互联网科技', '培训部>3人'] },
  ];

  // 可配置查询条件（本地状态）
  const [movementLevel, setMovementLevel] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [movementKeyword, setMovementKeyword] = useState('');

  // 重点关注客户：直接使用模拟数据（无筛选）
  const mockedFocusCustomers = focusCustomers;

  const filteredMovements = useMemo(() => {
    return movementEvents.filter(e => {
      const levelOk = movementLevel === 'all' || e.level === movementLevel;
      const kw = movementKeyword.trim();
      const kwOk = kw === '' || e.title.includes(kw) || e.detail.includes(kw);
      return levelOk && kwOk;
    });
  }, [movementEvents, movementLevel, movementKeyword]);

  // 移除筛选逻辑

  // 表格列定义
  const columns = [
    {
      title: '客户名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (text: string) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar size={32} icon={<UserOutlined />} style={{ marginRight: 8 }} />
          <span style={{ fontWeight: 500 }}>{text}</span>
        </div>
      )
    },
    {
      title: 'CSM',
      dataIndex: 'csm',
      key: 'csm',
      width: 100
    },
    {
      title: '健康分',
      dataIndex: 'healthScore',
      key: 'healthScore',
      width: 120,
      render: (score: number, record: Customer) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Progress 
            percent={score} 
            size="small" 
            strokeColor={healthColors[record.healthLevel]}
            showInfo={false}
            style={{ width: 60, marginRight: 8 }}
          />
          <span style={{ color: healthColors[record.healthLevel], fontWeight: 500 }}>{score}</span>
        </div>
      )
    },
    {
      title: '健康等级',
      dataIndex: 'healthLevel',
      key: 'healthLevel',
      width: 100,
      render: (level: HealthLevel) => (
        <Tag color={healthColors[level]}>{level}</Tag>
      )
    },
    {
      title: '生命周期',
      dataIndex: 'lifecycleStage',
      key: 'lifecycleStage',
      width: 100,
      render: (stage: LifecycleStage) => (
        <Tag color={lifecycleColors[stage]}>{stage}</Tag>
      )
    },
    {
      title: '合同金额',
      dataIndex: 'contractAmount',
      key: 'contractAmount',
      width: 120,
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '续费风险',
      dataIndex: 'isRenewalRisk',
      key: 'isRenewalRisk',
      width: 100,
      render: (isRisk: boolean) => (
        <Badge 
          status={isRisk ? 'error' : 'success'} 
          text={isRisk ? '是' : '否'} 
        />
      )
    },
    {
      title: '最后接触',
      dataIndex: 'lastContactDate',
      key: 'lastContactDate',
      width: 120,
      render: (date: string) => new Date(date).toLocaleDateString()
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_: any, record: Customer) => (
        <Button 
          type="link" 
          size="small"
          onClick={() => navigate(`/profiles/service/${record.id}`)}
        >
          查看详情
        </Button>
      )
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      {/* 顶部一行：左侧三指标合并卡片 + 右侧健康度分布卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={18}>
          <Card style={{ ...cardStyle, height: headerCardHeight }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#1890ff', marginBottom: 4 }}>
                  {mockServiceOverview.totalCustomers}
                </div>
                <Text type="secondary" style={{ fontSize: 12 }}>总客户数</Text>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 6 }}>
                  <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 12, marginRight: 4 }} />
                  <Text style={{ color: '#52c41a', fontSize: 12 }}>+12</Text>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#52c41a', marginBottom: 4 }}>
                  {mockServiceOverview.avgHealthScore}
                </div>
                <Text type="secondary" style={{ fontSize: 12 }}>平均健康分</Text>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 6 }}>
                  <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 12, marginRight: 4 }} />
                  <Text style={{ color: '#52c41a', fontSize: 12 }}>+3.2</Text>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#f5222d', marginBottom: 4 }}>
                  {mockServiceOverview.riskCustomers}
                </div>
                <Text type="secondary" style={{ fontSize: 12 }}>风险客户数</Text>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 6 }}>
                  <ArrowDownOutlined style={{ color: '#ff4d4f', fontSize: 12, marginRight: 4 }} />
                  <Text style={{ color: '#ff4d4f', fontSize: 12 }}>-2</Text>
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={6}>
          <Card style={{ ...cardStyle, height: headerCardHeight }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ position: 'relative', width: 88, height: 88, borderRadius: '50%', background: `conic-gradient(${healthDistributionData.map((d, idx, arr) => {
                const total = arr.reduce((s, i) => s + i.value, 0) || 1;
                const start = arr.slice(0, idx).reduce((s, i) => s + i.value, 0) / total * 360;
                const end = (start + d.value / total * 360);
                return `${d.color} ${start}deg ${end}deg`;
              }).join(', ')})` }} />
              <div style={{ display: 'grid', gap: 8 }}>
                {healthDistributionData.map((d) => (
                  <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: d.color }} />
                    <Text>{d.name}：{d.value}</Text>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 数据分布卡片 - 移除健康度分布，保留异动情况与重点关注客户 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        {/* 异动情况 */}
        <Col xs={24} lg={12}>
          <Card 
            style={{
              ...cardStyle,
              marginBottom: 0,
              padding: '16px'
            }}
            bodyStyle={{ padding: '12px 0' }}
            title={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <AlertOutlined style={{ color: '#fa8c16', marginRight: '8px' }} />
                  <span style={{ fontSize: '16px', fontWeight: '600' }}>异动情况</span>
                </div>
                <Space size={8}>
                  <Select size="small" value={movementLevel} onChange={setMovementLevel} style={{ width: 96 }}>
                    <Option value="all">全部</Option>
                    <Option value="high">高</Option>
                    <Option value="medium">中</Option>
                    <Option value="low">低</Option>
                  </Select>
                  <Input size="small" placeholder="关键词" value={movementKeyword} onChange={(e)=>setMovementKeyword(e.target.value)} style={{ width: 120 }} />
                </Space>
              </div>
            }
          >
            <div style={{ display: 'grid', gap: 12 }}>
              {filteredMovements.map(e => (
                <Card key={e.id} size="small" style={{ borderRadius: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <Text strong style={{ marginRight: 8 }}>{e.title}</Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>{e.detail}</Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Tag color={e.level === 'high' ? 'red' : e.level === 'medium' ? 'orange' : 'default'}>
                        {e.level === 'high' ? '高' : e.level === 'medium' ? '中' : '低'}
                      </Tag>
                      <Text type="secondary" style={{ fontSize: 12 }}>{e.date}</Text>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </Col>

        {/* 重点关注客户（无筛选） */}
        <Col xs={24} lg={12}>
          <Card 
            style={{
              ...cardStyle,
              marginBottom: 0,
              padding: '16px'
            }}
            bodyStyle={{ padding: '12px 0' }}
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <StarOutlined style={{ color: '#722ed1', marginRight: '8px' }} />
                <span style={{ fontSize: '16px', fontWeight: '600' }}>重点关注客户</span>
              </div>
            }
          >
            <div style={{ display: 'grid', gap: 12 }}>
              {mockedFocusCustomers.map(c => (
                <Card key={c.id} size="small" style={{ borderRadius: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Avatar size={24} icon={<UserOutlined />} />
                      <Text strong>{c.name}</Text>
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                      {c.tags.map((t, i) => (
                        <Tag key={i} color={i % 3 === 0 ? 'blue' : i % 3 === 1 ? 'purple' : 'green'} style={{ borderRadius: 6 }}>
                          {t}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* 客户列表 - 采用交接实施页面的现代化风格 */}
      <div style={{ 
        background: '#fff',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
      }}>
        {/* 筛选器 - 采用交接实施页面的筛选风格 */}
        <div style={{ 
          marginBottom: 16, 
          padding: 16, 
          background: '#fafafa', 
          borderRadius: '8px',
          border: '1px solid #f0f0f0'
        }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={6}>
              <Input
                placeholder="搜索客户名称"
                prefix={<SearchOutlined />}
                value={customerFilter.name}
                onChange={e => setCustomerFilter(prev => ({ ...prev, name: e.target.value }))}
                style={{ borderRadius: '6px' }}
              />
            </Col>
            <Col xs={24} sm={5}>
              <Select
                placeholder="健康等级"
                style={{ width: '100%', borderRadius: '6px' }}
                value={customerFilter.healthLevel}
                onChange={value => setCustomerFilter(prev => ({ ...prev, healthLevel: value }))}
                allowClear
              >
                <Option value="健康">健康</Option>
                <Option value="一般">一般</Option>
                <Option value="风险">风险</Option>
              </Select>
            </Col>
            <Col xs={24} sm={5}>
              <Select
                placeholder="生命周期"
                style={{ width: '100%', borderRadius: '6px' }}
                value={customerFilter.lifecycleStage}
                onChange={value => setCustomerFilter(prev => ({ ...prev, lifecycleStage: value }))}
                allowClear
              >
                <Option value="成长期">成长期</Option>
                <Option value="成熟期">成熟期</Option>
                <Option value="衰退期">衰退期</Option>
              </Select>
            </Col>
            <Col xs={24} sm={5}>
              <Select
                placeholder="续费风险"
                style={{ width: '100%', borderRadius: '6px' }}
                value={customerFilter.renewalRisk}
                onChange={value => setCustomerFilter(prev => ({ ...prev, renewalRisk: value }))}
                allowClear
              >
                <Option value={true}>是</Option>
                <Option value={false}>否</Option>
              </Select>
            </Col>
            {/* 操作组：搜索（最左，蓝色图标按钮）、导出、刷新 */}
            <Col xs={24} sm={3} style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={() => message.success('搜索完成')} />
              <Button type="text" icon={<ExportOutlined />} onClick={() => message.success('导出功能开发中')} />
              <Button type="text" icon={<ReloadOutlined />} onClick={() => message.success('数据已刷新')} />
            </Col>
          </Row>
        </div>

        <Table
          columns={columns}
          dataSource={filteredCustomers}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: filteredCustomers.length,
            onChange: setCurrentPage,
            showSizeChanger: false,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
          }}
          size="middle"
          style={{ background: '#fff' }}
        />
      </div>
    </div>
  );
};

// 关键动作页签组件
const KeyActionsTab: React.FC = () => {
  const navigate = useNavigate();
  const [createValueBoardVisible, setCreateValueBoardVisible] = useState(false);
  const [createQBRVisible, setCreateQBRVisible] = useState(false);
  const [form] = Form.useForm();

  const handleCreateValueBoard = () => {
    setCreateValueBoardVisible(true);
  };

  const handleCreateQBR = () => {
    setCreateQBRVisible(true);
  };

  const handleValueBoardSubmit = (values: any) => {
    console.log('创建价值看板:', values);
    message.success('价值看板创建成功！');
    setCreateValueBoardVisible(false);
    form.resetFields();
  };

  const handleQBRSubmit = (values: any) => {
    console.log('创建QBR会议:', values);
    message.success('QBR会议创建成功！');
    setCreateQBRVisible(false);
    form.resetFields();
  };

  const handleRiskEventAction = (eventId: string) => {
    message.success(`正在处理风险事件: ${eventId}`);
  };

  const actionBlocks = [
    {
      id: 'A1',
      title: '价值实现与效果报告',
      icon: <BarChartOutlined style={{ fontSize: 24, color: '#1890ff' }} />,
      color: '#1890ff',
      content: (
        <div>
          <div style={{ marginBottom: 16 }}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={handleCreateValueBoard}
              size="large"
            >
              创建价值看板
            </Button>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {mockValueBoards.map(board => (
              <Card key={board.id} size="small" style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong>{board.title}</Text>
                    <div style={{ color: '#666', fontSize: 12, marginTop: 4 }}>
                      客户: {board.customerName}
                    </div>
                  </div>
                  <Tag color={board.status === '进行中' ? 'processing' : 'default'}>
                    {board.status}
                  </Tag>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'A2',
      title: '业务复盘会 (QBR)',
      icon: <TeamOutlined style={{ fontSize: 24, color: '#52c41a' }} />,
      color: '#52c41a',
      content: (
        <div>
          <div style={{ marginBottom: 16 }}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={handleCreateQBR}
              size="large"
            >
              创建QBR会议
            </Button>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {mockQBRMeetings.map(meeting => (
              <Card key={meeting.id} size="small" style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong>{meeting.title}</Text>
                    <div style={{ color: '#666', fontSize: 12, marginTop: 4 }}>
                      {meeting.customerName} • {new Date(meeting.scheduledDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Tag color={meeting.status === '待召开' ? 'orange' : 'green'}>
                      {meeting.status}
                    </Tag>
                    <Button size="small" type="link">查看详情</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'A3',
      title: '健康度评分',
      icon: <HeartOutlined style={{ fontSize: 24, color: '#fa8c16' }} />,
      color: '#fa8c16',
      content: (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ marginBottom: 16, color: '#666' }}>
            客户健康度评分系统帮助您实时监控客户状态
          </div>
          <Button 
            type="primary" 
            size="large"
            onClick={() => message.info('跳转到健康度中心')}
          >
            前往健康度中心
          </Button>
        </div>
      )
    },
    {
      id: 'A4',
      title: '风险事件处理队列',
      icon: <ExclamationCircleOutlined style={{ fontSize: 24, color: '#f5222d' }} />,
      color: '#f5222d',
      content: (
        <div>
          <div style={{ display: 'grid', gap: 12 }}>
            {mockRiskEvents.filter(event => event.status !== '已解决').map(event => (
              <Card key={event.id} size="small">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <Text strong>{event.customerName}</Text>
                      <Tag color={
                        event.severity === 'critical' ? 'red' :
                        event.severity === 'high' ? 'orange' :
                        event.severity === 'medium' ? 'gold' : 'green'
                      }>
                        {event.severity === 'critical' ? '紧急' :
                         event.severity === 'high' ? '高' :
                         event.severity === 'medium' ? '中' : '低'}
                      </Tag>
                    </div>
                    <div style={{ color: '#666', fontSize: 12 }}>
                      {event.description}
                    </div>
                    <div style={{ color: '#999', fontSize: 11, marginTop: 4 }}>
                      负责人: {event.assignedTo} • 截止: {new Date(event.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                  <Button 
                    type="primary" 
                    size="small"
                    onClick={() => handleRiskEventAction(event.id)}
                  >
                    处理
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'A5',
      title: '续费续签',
      icon: <FileTextOutlined style={{ fontSize: 24, color: '#722ed1' }} />,
      color: '#722ed1',
      content: (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ marginBottom: 16, color: '#666' }}>
            专业的续约管理模块帮助您提升续约成功率
          </div>
          <Button 
            type="primary" 
            size="large"
            onClick={() => navigate('/profiles/renewal')}
          >
            进入续约管理模块
          </Button>
        </div>
      )
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
        {actionBlocks.map(block => (
          <Card
            key={block.id}
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {block.icon}
                <span>{block.title}</span>
              </div>
            }
            style={{ 
              borderLeft: `4px solid ${block.color}`,
              height: 'fit-content'
            }}
          >
            {block.content}
          </Card>
        ))}
      </div>

      {/* 创建价值看板模态框 */}
      <Modal
        title="创建价值看板"
        open={createValueBoardVisible}
        onCancel={() => setCreateValueBoardVisible(false)}
        onOk={() => form.submit()}
        width={600}
      >
        <Form form={form} onFinish={handleValueBoardSubmit} layout="vertical">
          <Form.Item name="customerId" label="选择客户" rules={[{ required: true }]}>
            <Select placeholder="请选择客户">
              {mockCustomers.map(customer => (
                <Option key={customer.id} value={customer.id}>{customer.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="title" label="看板标题" rules={[{ required: true }]}>
            <Input placeholder="请输入看板标题" />
          </Form.Item>
          <Form.Item name="description" label="看板描述">
            <Input.TextArea rows={3} placeholder="请输入看板描述" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 创建QBR会议模态框 */}
      <Modal
        title="创建QBR会议"
        open={createQBRVisible}
        onCancel={() => setCreateQBRVisible(false)}
        onOk={() => form.submit()}
        width={600}
      >
        <Form form={form} onFinish={handleQBRSubmit} layout="vertical">
          <Form.Item name="customerId" label="选择客户" rules={[{ required: true }]}>
            <Select placeholder="请选择客户">
              {mockCustomers.map(customer => (
                <Option key={customer.id} value={customer.id}>{customer.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="title" label="会议主题" rules={[{ required: true }]}>
            <Input placeholder="请输入会议主题" />
          </Form.Item>
          <Form.Item name="scheduledDate" label="会议时间" rules={[{ required: true }]}>
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="attendees" label="参会人员">
            <Select mode="tags" placeholder="请输入参会人员">
              <Option value="张总">张总</Option>
              <Option value="李经理">李经理</Option>
              <Option value="王主管">王主管</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

// 服务剧本页签组件
const PlaybooksTab: React.FC = () => {
  const handleStartPlaybook = (playbookId: string) => {
    message.success(`启动剧本: ${playbookId}`);
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' }}>
        {mockServicePlaybooks.map(playbook => (
          <Card
            key={playbook.id}
            style={{
              ...cardStyle,
              height: 'fit-content'
            }}
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <PlayCircleOutlined style={{ color: '#1890ff', fontSize: '18px' }} />
                <span style={{ fontSize: '16px', fontWeight: '600' }}>{playbook.name}</span>
              </div>
            }
            extra={
              <Tag color={playbook.status === '可用' ? 'green' : 'default'} style={{ borderRadius: '6px' }}>
                {playbook.status}
              </Tag>
            }
            actions={[
              <Button 
                key="start"
                type="primary" 
                icon={<PlayCircleOutlined />}
                onClick={() => handleStartPlaybook(playbook.id)}
                disabled={playbook.status !== '可用'}
                style={{ borderRadius: '8px', fontWeight: '500' }}
              >
                启动剧本
              </Button>
            ]}
          >
            <div style={{ marginBottom: 12 }}>
              <Text type="secondary">{playbook.description}</Text>
            </div>
            
                         <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
               {playbook.applicableStage.map(stage => (
                 <Tag key={stage} color={lifecycleColors[stage]} style={{ borderRadius: '6px' }}>
                   {stage}
                 </Tag>
               ))}
             </div>

            <Divider style={{ margin: '12px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#666' }}>
              <span>预估耗时: {playbook.estimatedDuration}h</span>
              <span>成功率: {playbook.successRate}%</span>
              <span>使用次数: {playbook.usage}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// 主组件
const ContinuousService: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabItems = [
    {
      key: 'overview',
      label: '概览与监控',
      children: <OverviewTab />
    },
    {
      key: 'actions',
      label: '关键动作',
      children: <KeyActionsTab />
    },
    {
      key: 'playbooks',
      label: '服务剧本',
      children: <PlaybooksTab />
    }
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
        {/* 页面标题 - 采用工作看板的现代化风格 */}
        <div style={{ marginBottom: '24px' }}>
          <Title level={2} style={{ margin: 0, color: '#262626', fontWeight: '600' }}>
            持续服务
          </Title>
          <Text type="secondary" style={{ fontSize: '14px', color: '#666' }}>
            基于客户成功体系化运营的智能服务平台
          </Text>
        </div>

        {/* 主要内容区域 - 采用交接实施页面的现代化风格 */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          border: '1px solid #f0f0f0'
        }}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            size="large"
            style={{ margin: 0 }}
            tabBarStyle={{
              margin: 0,
              backgroundColor: '#fff',
              borderBottom: '1px solid #f0f0f0',
              padding: '0 24px'
            }}
            tabBarGutter={32}
          />
        </div>
      </div>
    </div>
  );
};

export default ContinuousService;
