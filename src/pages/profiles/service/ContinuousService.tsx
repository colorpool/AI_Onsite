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
  healthColors
} from '../../../mock/continuousServiceData';
import type { 
  Customer, 
  CustomerFilter, 
  HealthLevel,
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

  // 重点关注客户：直接使用模拟数据（无筛选）
  const mockedFocusCustomers = focusCustomers;

  // 异动情况：直接使用模拟数据（无筛选）
  const filteredMovements = movementEvents;

  // 移除筛选逻辑

  // 表格列定义
  const columns = [
    {
      title: '客户名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      sorter: (a: Customer, b: Customer) => a.name.localeCompare(b.name),
      render: (text: string, record: Customer) => (
        <a onClick={() => navigate(`/profiles/service/${record.id}`)} style={{ fontWeight: 500 }}>{text}</a>
      )
    },
    {
      title: 'CSM',
      dataIndex: 'csm',
      key: 'csm',
      width: 100,
      sorter: (a: Customer, b: Customer) => a.csm.localeCompare(b.csm),
    },
    {
      title: '健康分',
      dataIndex: 'healthScore',
      key: 'healthScore',
      width: 120,
      sorter: (a: Customer, b: Customer) => a.healthScore - b.healthScore,
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
      sorter: (a: Customer, b: Customer) => a.healthLevel.localeCompare(b.healthLevel),
      render: (level: HealthLevel) => (
        <Tag color={healthColors[level]}>{level}</Tag>
      )
    },
    {
      title: '合同金额',
      dataIndex: 'contractAmount',
      key: 'contractAmount',
      width: 120,
      sorter: (a: Customer, b: Customer) => a.contractAmount - b.contractAmount,
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '续费风险',
      dataIndex: 'isRenewalRisk',
      key: 'isRenewalRisk',
      width: 100,
      sorter: (a: Customer, b: Customer) => Number(a.isRenewalRisk) - Number(b.isRenewalRisk),
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
      sorter: (a: Customer, b: Customer) => new Date(a.lastContactDate).getTime() - new Date(b.lastContactDate).getTime(),
      render: (date: string) => new Date(date).toLocaleDateString()
    }
  ];

  return (
    <div style={{ padding: 0 }}>
      {/* 顶部一行：左侧三指标合并卡片 + 右侧健康度分布卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={18}>
          <Card style={{ ...cardStyle, height: headerCardHeight }} bodyStyle={{ padding: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 700, color: '#1890ff', marginBottom: 8 }}>
                  {mockServiceOverview.totalCustomers}
                </div>
                <Text type="secondary" style={{ fontSize: 14 }}>总客户数</Text>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
                  <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 12, marginRight: 4 }} />
                  <Text style={{ color: '#52c41a', fontSize: 12 }}>+12</Text>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 700, color: '#52c41a', marginBottom: 8 }}>
                  {mockServiceOverview.avgHealthScore}
                </div>
                <Text type="secondary" style={{ fontSize: 14 }}>平均健康分</Text>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
                  <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 12, marginRight: 4 }} />
                  <Text style={{ color: '#52c41a', fontSize: 12 }}>+3.2</Text>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 700, color: '#f5222d', marginBottom: 8 }}>
                  {mockServiceOverview.riskCustomers}
                </div>
                <Text type="secondary" style={{ fontSize: 14 }}>风险客户数</Text>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
                  <ArrowDownOutlined style={{ color: '#ff4d4f', fontSize: 12, marginRight: 4 }} />
                  <Text style={{ color: '#ff4d4f', fontSize: 12 }}>-2</Text>
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={6}>
          <Card style={{ ...cardStyle, height: headerCardHeight }} bodyStyle={{ padding: 16 }}>
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
              marginBottom: 0
            }}
            bodyStyle={{ padding: 16 }}
            title={
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                <AlertOutlined style={{ color: '#fa8c16', marginRight: '6px' }} />
                <span style={{ fontSize: '16px', fontWeight: '600' }}>异动情况</span>
              </div>
            }
          >
            <div style={{ padding: 0, display: 'grid', gap: 4 }}>
              {filteredMovements.map(e => (
                <Card key={e.id} size="small" style={{ borderRadius: 4, border: '1px solid #f0f0f0', marginBottom: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
                    <div>
                      <Text strong style={{ marginRight: 6, fontSize: '14px' }}>{e.title}</Text>
                      <Text type="secondary" style={{ fontSize: '12px' }}>{e.detail}</Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Tag color={e.level === 'high' ? 'red' : e.level === 'medium' ? 'orange' : 'default'} style={{ fontSize: '11px', padding: '1px 4px' }}>
                        {e.level === 'high' ? '高' : e.level === 'medium' ? '中' : '低'}
                      </Tag>
                      <Text type="secondary" style={{ fontSize: '12px' }}>{e.date}</Text>
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
              marginBottom: 0
            }}
            bodyStyle={{ padding: 16 }}
            title={
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                <StarOutlined style={{ color: '#722ed1', marginRight: '6px' }} />
                <span style={{ fontSize: '16px', fontWeight: '600' }}>重点关注客户</span>
              </div>
            }
          >
            <div style={{ padding: 0, display: 'grid', gap: 4 }}>
              {mockedFocusCustomers.map(c => (
                <Card key={c.id} size="small" style={{ borderRadius: 4, border: '1px solid #f0f0f0', marginBottom: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Avatar size={20} icon={<UserOutlined />} />
                      <Text strong style={{ fontSize: '14px' }}>{c.name}</Text>
                    </div>
                    <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                      {c.tags.map((t, i) => (
                        <Tag key={i} color={i % 3 === 0 ? 'blue' : i % 3 === 1 ? 'purple' : 'green'} style={{ borderRadius: 3, fontSize: '11px', padding: '1px 4px' }}>
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
        ...cardStyle,
        padding: '16px'
      }}>
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
          scroll={{ x: 1000 }}
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
    <div style={{ padding: 0 }}>
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
    <div style={{ padding: 0 }}>
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
                 <Tag key={stage} color={stage === '成长期' ? 'blue' : stage === '成熟期' ? 'purple' : 'green'} style={{ borderRadius: '6px' }}>
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

  const QuickLink: React.FC<{ active: boolean; icon: React.ReactNode; label: string; onClick: () => void }>=({ active, icon, label, onClick })=> (
    <Button
      type="text"
      onClick={onClick}
      style={{
        height: 36,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '0 12px',
        borderRadius: 18,
        background: active ? '#1890ff15' : 'transparent',
        border: active ? '1px solid #1890ff33' : '1px solid transparent',
        color: active ? '#1890ff' : '#595959',
        fontWeight: 500,
      }}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );

  return (
    <div style={{
      padding: '32px 40px',
      background: '#f5f5f5',
      minHeight: 'calc(100vh - 120px)',
      paddingBottom: '60px'
    }}>
      {/* 页面标题 - 采用工作看板的现代化风格 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {activeTab !== 'overview' && (
            <Button type="text" onClick={() => setActiveTab('overview')} style={{ color: '#666' }}>
              ← 返回
            </Button>
          )}
          <div>
            <Title level={2} style={{ margin: 0, color: '#262626', fontWeight: '600' }}>
              持续服务
            </Title>
            <Text type="secondary" style={{ fontSize: '14px', color: '#666' }}>
              基于客户成功体系化运营的智能服务平台
            </Text>
          </div>
        </div>
        <Space size={8}>
          <QuickLink
            active={activeTab === 'actions'}
            icon={<PlayCircleOutlined style={{ color: activeTab === 'actions' ? '#1890ff' : '#8c8c8c' }} />}
            label="关键动作"
            onClick={() => setActiveTab('actions')}
          />
          <QuickLink
            active={activeTab === 'playbooks'}
            icon={<FileTextOutlined style={{ color: activeTab === 'playbooks' ? '#1890ff' : '#8c8c8c' }} />}
            label="服务剧本"
            onClick={() => setActiveTab('playbooks')}
          />
        </Space>
      </div>

      {/* 直接渲染模块，无外层白色底容器，宽度与工作看板一致 */}
      {activeTab === 'overview' && <OverviewTab />}
      {activeTab === 'actions' && <KeyActionsTab />}
      {activeTab === 'playbooks' && <PlaybooksTab />}
    </div>
  );
};

export default ContinuousService;
