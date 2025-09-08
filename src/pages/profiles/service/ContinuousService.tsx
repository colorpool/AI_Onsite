import React, { useState, useMemo, useEffect } from 'react';
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
import ValueBoardTemplateLibrary from '../../../components/ValueBoardTemplateLibrary';
import PlaybookLibrary from '../../../components/PlaybookLibrary';
import PlaybookLauncher from '../../../components/PlaybookLauncher';
import PlaybookTaskManager from '../../../components/PlaybookTaskManager';
import PlaybookTriggerEngine from '../../../components/PlaybookTriggerEngine';
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
  StarOutlined,
  StarFilled,
  QuestionCircleOutlined,
  PhoneOutlined,
  MailOutlined,
  PauseCircleOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  BankOutlined,
   GlobalOutlined,
    TagOutlined
  } from '@ant-design/icons';
// 使用 Ant Design 内置组件替代图表库
import { useNavigate, useLocation } from 'umi';
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
  ServicePlaybook,
  PlaybookExecution,
  PlaybookRecommendation
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
  const [comparisonPeriod, setComparisonPeriod] = useState('上周');
  const pageSize = 10;
  const headerCardHeight = 180;

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
      if (customerFilter.isFavorite !== undefined && customer.isFavorite !== customerFilter.isFavorite) {
        return false;
      }
      return true;
    });
  }, [customerFilter]);

  // 健康度分布数据（带趋势）
  const healthDistributionData = [
    { 
      name: '健康', 
      value: mockServiceOverview.healthDistribution.healthy, 
      color: healthColors['健康'],
      trend: { direction: 'up', change: 2, previous: mockServiceOverview.healthDistribution.healthy - 2 }
    },
    { 
      name: '一般', 
      value: mockServiceOverview.healthDistribution.normal, 
      color: healthColors['一般'],
      trend: { direction: 'down', change: 1, previous: mockServiceOverview.healthDistribution.normal + 1 }
    },
    { 
      name: '风险', 
      value: mockServiceOverview.healthDistribution.risky, 
      color: healthColors['风险'],
      trend: { direction: 'down', change: 1, previous: mockServiceOverview.healthDistribution.risky + 1 }
    }
  ];

  // 异动情况的示例数据
  const movementEvents = [
    { id: 'm1', title: '管理员离职', detail: '客户A 主要管理员离职', date: '2025-01-05', level: 'high' },
    { id: 'm2', title: 'CSM变更', detail: '客户B CSM 负责人调整', date: '2025-01-08', level: 'medium' },
    { id: 'm3', title: '权限收缩', detail: '客户C 减少管理员数量', date: '2025-01-12', level: 'low' },
  ];

  // 异动情况：直接使用模拟数据（无筛选）
  const filteredMovements = movementEvents;

  // 健康度下钻功能
  const handleHealthDrillDown = (healthLevel: string) => {
    setCustomerFilter(prev => ({ ...prev, healthLevel: healthLevel as HealthLevel }));
    message.success(`已筛选出${healthLevel}状态的客户`);
  };

  // 表格列定义
  const columns = [
    {
      title: '关注',
      dataIndex: 'isFavorite',
      key: 'isFavorite',
      width: 60,
      align: 'center' as const,
      render: (isFavorite: boolean) => (
        isFavorite ? (
          <StarFilled style={{ color: '#faad14', fontSize: 16 }} />
        ) : (
          <StarOutlined style={{ color: '#d9d9d9', fontSize: 16 }} />
        )
      )
    },
    {
      title: '客户名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      sorter: (a: Customer, b: Customer) => a.name.localeCompare(b.name),
      render: (text: string, record: Customer) => (
        <a onClick={() => navigate(`/profiles/service/${record.id}`)}>{text}</a>
      )
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
      title: '合同金额',
      dataIndex: 'currentContract',
      key: 'contractAmount',
      width: 120,
      sorter: (a: Customer, b: Customer) => {
        const amountA = a.currentContract?.amount || 0;
        const amountB = b.currentContract?.amount || 0;
        return amountA - amountB;
      },
      render: (contract: any) => (
        <span style={{ fontWeight: 500, color: '#1890ff' }}>
          {contract?.amount ? `¥${(contract.amount / 10000).toFixed(1)}万` : '-'}
        </span>
      )
    },
    {
      title: 'ARR',
      dataIndex: 'currentContract',
      key: 'arr',
      width: 120,
      sorter: (a: Customer, b: Customer) => {
        const arrA = a.currentContract?.amount || 0;
        const arrB = b.currentContract?.amount || 0;
        return arrA - arrB;
      },
      render: (contract: any) => {
        if (!contract?.amount) return '-';
        // 简化计算：假设合同都是年度合同，ARR = 合同金额
        const arr = contract.amount;
        return (
          <span style={{ fontWeight: 500, color: '#52c41a' }}>
            ¥{(arr / 10000).toFixed(1)}万
          </span>
        );
      }
    },
    // 待办任务字段已隐藏，代码保留
    // {
    //   title: '待办任务',
    //   dataIndex: 'todoTasks',
    //   key: 'todoTasks',
    //   width: 150,
    //   sorter: (a: Customer, b: Customer) => {
    //     const pendingA = a.todoTasks.filter(t => t.status === 'pending' || t.status === 'in_progress' || t.status === 'overdue').length;
    //     const pendingB = b.todoTasks.filter(t => t.status === 'pending' || t.status === 'in_progress' || t.status === 'overdue').length;
    //     return pendingA - pendingB;
    //   },
    //   render: (todoTasks: any[], record: Customer) => {
    //     const pendingTasks = todoTasks.filter(t => t.status === 'pending' || t.status === 'in_progress' || t.status === 'overdue');
    //     const overdueTasks = todoTasks.filter(t => t.status === 'overdue');
    //     const nearestTask = pendingTasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0];
    //     
    //     if (pendingTasks.length === 0) {
    //       return <span style={{ color: '#8c8c8c' }}>无待办</span>;
    //     }
    //     
    //     return (
    //       <div>
    //         <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
    //           <Badge 
    //             count={pendingTasks.length} 
    //             size="small" 
    //             style={{ backgroundColor: overdueTasks.length > 0 ? '#ff4d4f' : '#1890ff' }}
    //           />
    //           <span style={{ marginLeft: 8, fontSize: '12px', color: '#666' }}>个任务</span>
    //         </div>
    //         {nearestTask && (
    //           <div style={{ fontSize: '11px', color: overdueTasks.length > 0 ? '#ff4d4f' : '#8c8c8c' }}>
    //             最近: {new Date(nearestTask.dueDate).toLocaleDateString()}
    //           </div>
    //         )}
    //       </div>
    //     );
    //   }
    // },
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
      {/* 顶部一行：核心指标卡片 - 3个一行的布局 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={8}>
          <Card style={{ ...cardStyle, marginBottom: 0 }}>
            <Statistic 
              title={
                <span>
                  总客户数
                  <Tooltip 
                    title={
                      <div style={{ maxWidth: '300px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>总客户数</div>
                        <div style={{ marginBottom: '6px' }}>含义：当前负责的所有客户总数</div>
                        <div style={{ marginBottom: '6px' }}>来源：客户管理系统实时统计</div>
                        <div style={{ marginBottom: '6px' }}>计算方式：状态为"服务中"的客户数量</div>
                        <div style={{ color: '#1890ff' }}>提示：反映客户成功经理的工作负荷</div>
                      </div>
                    }
                    placement="top"
                    overlayStyle={{ 
                      maxWidth: '320px',
                      fontSize: '12px'
                    }}
                  >
                    <QuestionCircleOutlined 
                      style={{ 
                        marginLeft: '8px', 
                        color: '#8c8c8c',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }} 
                    />
                  </Tooltip>
                </span>
              } 
              value={mockServiceOverview.totalCustomers} 
              valueStyle={{ fontWeight: 700 }} 
              suffix={
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
                  <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 12, marginRight: 4 }} />
                  <Text style={{ color: '#52c41a', fontSize: 12 }}>+12</Text>
                </div>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card style={{ ...cardStyle, marginBottom: 0 }}>
            <Statistic 
              title={
                <span>
                  平均健康分
                  <Tooltip 
                    title={
                      <div style={{ maxWidth: '300px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>平均健康分</div>
                        <div style={{ marginBottom: '6px' }}>含义：所有客户健康分的平均值</div>
                        <div style={{ marginBottom: '6px' }}>来源：客户健康度评估系统</div>
                        <div style={{ marginBottom: '6px' }}>计算方式：所有客户健康分总和除以客户数量</div>
                        <div style={{ color: '#52c41a' }}>提示：反映整体客户健康状况</div>
                      </div>
                    }
                    placement="top"
                    overlayStyle={{ 
                      maxWidth: '320px',
                      fontSize: '12px'
                    }}
                  >
                    <QuestionCircleOutlined 
                      style={{ 
                        marginLeft: '8px', 
                        color: '#8c8c8c',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }} 
                    />
                  </Tooltip>
                </span>
              } 
              value={mockServiceOverview.avgHealthScore} 
              valueStyle={{ fontWeight: 700 }} 
              suffix={
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
                  <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 12, marginRight: 4 }} />
                  <Text style={{ color: '#52c41a', fontSize: 12 }}>+3.2</Text>
                </div>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card style={{ ...cardStyle, marginBottom: 0 }}>
            <Statistic 
              title={
                <span>
                  风险客户数
                  <Tooltip 
                    title={
                      <div style={{ maxWidth: '300px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>风险客户数</div>
                        <div style={{ marginBottom: '6px' }}>含义：存在续费风险的客户数量</div>
                        <div style={{ marginBottom: '6px' }}>来源：风险评估系统自动识别</div>
                        <div style={{ marginBottom: '6px' }}>计算方式：健康等级为"风险"的客户数量</div>
                        <div style={{ color: '#ff4d4f' }}>提示：需要重点关注和干预</div>
                      </div>
                    }
                    placement="top"
                    overlayStyle={{ 
                      maxWidth: '320px',
                      fontSize: '12px'
                    }}
                  >
                    <QuestionCircleOutlined 
                      style={{ 
                        marginLeft: '8px', 
                        color: '#8c8c8c',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }} 
                    />
                  </Tooltip>
                </span>
              } 
              value={mockServiceOverview.riskCustomers} 
              valueStyle={{ fontWeight: 700 }} 
              suffix={
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
                  <ArrowDownOutlined style={{ color: '#faad14', fontSize: 12, marginRight: 4 }} />
                  <Text style={{ color: '#faad14', fontSize: 12 }}>-2</Text>
                </div>
              }
            />
          </Card>
        </Col>
      </Row>

      {/* 洞察分析区域 - 左侧页签 + 右侧健康度分布 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        {/* 左侧：异动情况与重点关注客户页签 */}
        <Col xs={24} lg={16}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <AlertOutlined style={{ marginRight: 8, color: '#fa8c16', fontSize: '16px' }} />
                <Text strong style={{ fontSize: '16px', color: '#262626' }}>异动情况</Text>
              </div>
            }
            style={{ ...cardStyle, marginBottom: 0, height: '300px' }}
            bodyStyle={{
              height: 'calc(100% - 57px)',
              overflowY: 'auto',
              padding: '16px',
              display: 'grid',
              gap: 12,
              alignContent: 'start'
            }}
          >
                {filteredMovements.map(e => (
                  <div key={e.id} style={{ 
                    borderRadius: 6, 
                    border: '1px solid #e8e8e8', 
                    marginBottom: 0,
                    minHeight: '60px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.2s ease',
                    backgroundColor: '#ffffff',
                    padding: '12px 14px',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.06)';
                  }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1, marginRight: 12 }}>
                        <div style={{ marginBottom: 4 }}>
                          <Text strong style={{ fontSize: '14px', color: '#262626' }}>{e.title}</Text>
                        </div>
                        <Text type="secondary" style={{ fontSize: '13px', lineHeight: '1.4' }}>{e.detail}</Text>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                        <Tag 
                          color={e.level === 'high' ? '#ff4d4f' : e.level === 'medium' ? '#fa8c16' : '#52c41a'} 
                          style={{ 
                            fontSize: '11px', 
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontWeight: '500',
                            border: 'none'
                          }}
                        >
                          {e.level === 'high' ? '高风险' : e.level === 'medium' ? '中风险' : '低风险'}
                        </Tag>
                        <Text type="secondary" style={{ fontSize: '12px' }}>{e.date}</Text>
                      </div>
                    </div>
                  </div>
                ))}
          </Card>
        </Col>

        {/* 右侧：健康度分布图 */}
        <Col xs={24} lg={8}>
          <Card style={{ ...cardStyle, marginBottom: 0, height: '300px', display: 'flex', flexDirection: 'column' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: 16, fontWeight: 500, color: 'rgba(0, 0, 0, 0.85)' }}>
                    健康度分布
                  </span>
                  <Tooltip 
                    title={
                      <div style={{ maxWidth: '300px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>健康度分布</div>
                        <div style={{ marginBottom: '6px' }}>含义：客户健康等级的分布情况</div>
                        <div style={{ marginBottom: '6px' }}>来源：客户健康度评估系统</div>
                        <div style={{ marginBottom: '6px' }}>计算方式：按健康等级统计客户数量</div>
                        <div style={{ color: '#1890ff' }}>提示：帮助了解整体客户健康状况</div>
                      </div>
                    }
                    placement="top"
                    overlayStyle={{ 
                      maxWidth: '320px',
                      fontSize: '12px'
                    }}
                  >
                    <QuestionCircleOutlined 
                      style={{ 
                        marginLeft: '8px', 
                        color: '#8c8c8c',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }} 
                    />
                  </Tooltip>
                </div>
                <Select
                  value={comparisonPeriod}
                  onChange={setComparisonPeriod}
                  size="small"
                  style={{ width: 100 }}
                >
                  <Option value="上周">对比上周</Option>
                  <Option value="上月">对比上月</Option>
                  <Option value="上季度">对比上季度</Option>
                </Select>
              </div>
              
              {/* 饼图 */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <div style={{ 
                  position: 'relative', 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  background: `conic-gradient(${healthDistributionData.map((d, idx, arr) => {
                     const total = arr.reduce((s, i) => s + i.value, 0) || 1;
                     const start = arr.slice(0, idx).reduce((s, i) => s + i.value, 0) / total * 360;
                     const end = (start + d.value / total * 360);
                     return `${healthColors[d.name as keyof typeof healthColors]} ${start}deg ${end}deg`;
                   }).join(', ')})`,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }} />
              </div>
              
              {/* 图例和趋势 */}
              <div style={{ display: 'grid', gap: 8 }}>
                {healthDistributionData.map((d) => (
                  <div 
                    key={d.name} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      padding: '6px 8px',
                      borderRadius: 4,
                      border: '1px solid #f0f0f0',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onClick={() => handleHealthDrillDown(d.name)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f5f5f5';
                      e.currentTarget.style.borderColor = '#d9d9d9';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = '#f0f0f0';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: healthColors[d.name as keyof typeof healthColors] }} />
                      <Text style={{ fontSize: 13, fontWeight: 500 }}>{d.name}</Text>
                      <Text style={{ fontSize: 13, fontWeight: 600, color: '#262626' }}>{d.value}</Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      {d.trend.direction === 'up' ? (
                        <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 12 }} />
                      ) : (
                        <ArrowDownOutlined style={{ color: d.trend.change > 0 ? '#ff4d4f' : '#52c41a', fontSize: 12 }} />
                      )}
                      <Text style={{ 
                        fontSize: 11, 
                        color: d.trend.direction === 'up' ? '#52c41a' : (d.trend.change > 0 ? '#ff4d4f' : '#52c41a')
                      }}>
                        {d.trend.direction === 'up' ? '+' : '-'}{d.trend.change}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 客户列表 - 采用交接实施页面的现代化风格 */}
      <div style={{ 
        ...cardStyle,
        padding: '24px'
      }}>
        {/* 搜索区域 */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <Input
            placeholder="搜索客户名称"
            prefix={<SearchOutlined />}
            value={customerFilter.name || ''}
            onChange={e => setCustomerFilter(prev => ({ ...prev, name: e.target.value }))}
            allowClear
            style={{ width: 300, borderRadius: '6px' }}
          />
          
          <Space>
            <Button
              icon={<ReloadOutlined />}
              onClick={() => {
                setCustomerFilter({});
                setCurrentPage(1);
              }}
            >
              重置
            </Button>
            <Button 
              type={customerFilter.isFavorite ? "primary" : "default"}
              icon={<StarOutlined />}
              onClick={() => {
                if (customerFilter.isFavorite) {
                  // 如果已经在筛选关注客户，则取消筛选
                  setCustomerFilter(prev => ({ ...prev, isFavorite: undefined }));
                  message.success('已显示全部客户');
                } else {
                  // 筛选关注的客户
                  setCustomerFilter(prev => ({ ...prev, isFavorite: true }));
                  message.success('已筛选我的关注客户');
                }
              }}
            >
              {customerFilter.isFavorite ? '显示全部' : '我的关注'}
            </Button>
          </Space>
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
  const [templateLibraryVisible, setTemplateLibraryVisible] = useState(false);
  const [form] = Form.useForm();

  const handleCreateValueBoard = () => {
    setCreateValueBoardVisible(true);
  };

  const handleOpenTemplateLibrary = () => {
    setTemplateLibraryVisible(true);
  };

  const handleTemplateSelect = (template: any) => {
    console.log('选择模板:', template);
    setTemplateLibraryVisible(false);
    // 使用模板数据预填充创建表单
    form.setFieldsValue({
      title: template.name,
      description: template.description
    });
    setCreateValueBoardVisible(true);
    message.success(`已选择模板：${template.name}`);
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
    navigate(`/profiles/service/risk-event/${eventId}`);
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
            <Space>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={handleCreateValueBoard}
                size="large"
              >
                创建价值看板
              </Button>
              <Button 
                icon={<FileTextOutlined />}
                onClick={handleOpenTemplateLibrary}
                size="large"
              >
                模板库
              </Button>
            </Space>
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
    }
  ];

  return (
    <div style={{ padding: 0 }}>
      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
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

      {/* 价值看板模板库模态框 */}
      <Modal
        title="价值看板模板库"
        open={templateLibraryVisible}
        onCancel={() => setTemplateLibraryVisible(false)}
        footer={null}
        width="90%"
        style={{ top: 20, maxWidth: 1000 }}
        bodyStyle={{ overflow: 'hidden', padding: '16px' }}
      >
        <ValueBoardTemplateLibrary
          onTemplateSelect={handleTemplateSelect}
          onCancel={() => setTemplateLibraryVisible(false)}
        />
      </Modal>
    </div>
  );
};

// 服务剧本页签组件
const PlaybooksTab: React.FC = () => {
  const [selectedPlaybook, setSelectedPlaybook] = useState<ServicePlaybook | null>(null);
  const [launcherVisible, setLauncherVisible] = useState(false);
  const [taskManagerVisible, setTaskManagerVisible] = useState(false);
  const [triggerEngineVisible, setTriggerEngineVisible] = useState(false);
  const [executions, setExecutions] = useState<PlaybookExecution[]>([]);
  const [recommendations, setRecommendations] = useState<PlaybookRecommendation[]>([]);

  const handleLaunchPlaybook = async (playbookId: string, customerId: string) => {
    try {
      // 模拟启动剧本
      const newExecution: PlaybookExecution = {
        id: `exec_${Date.now()}`,
        playbookId,
        playbookName: mockServicePlaybooks.find(p => p.id === playbookId)?.name || '未知剧本',
        customerId,
        customerName: mockCustomers.find(c => c.id === customerId)?.name || '未知客户',
        status: 'pending',
        progress: 0,
        launchedBy: '当前用户',
        launchType: 'manual',
        startedAt: new Date().toISOString(),
        expectedEndAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        taskExecutions: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setExecutions(prev => [...prev, newExecution]);
      message.success('剧本启动成功');
    } catch (error) {
      message.error('启动剧本失败');
    }
  };

  const handlePlaybookSelect = (playbook: ServicePlaybook) => {
    setSelectedPlaybook(playbook);
    setLauncherVisible(true);
  };

  const handleUpdateRecommendation = async (id: string, updates: Partial<PlaybookRecommendation>) => {
    setRecommendations(prev => 
      prev.map(rec => rec.id === id ? { ...rec, ...updates } : rec)
    );
  };

  return (
    <div style={{ padding: 0 }}>
      {/* 剧本库组件 */}
      <PlaybookLibrary
        playbooks={mockServicePlaybooks}
        onLaunchPlaybook={(playbookId) => {
          const playbook = mockServicePlaybooks.find(p => p.id === playbookId);
          if (playbook) {
            handlePlaybookSelect(playbook);
          }
        }}
        loading={false}
      />

      {/* 剧本启动器 */}
      {selectedPlaybook && (
        <PlaybookLauncher
          visible={launcherVisible}
          playbook={selectedPlaybook}
          onCancel={() => {
            setLauncherVisible(false);
            setSelectedPlaybook(null);
          }}
          onLaunch={async (execution) => {
            if (execution.playbookId) {
              await handleLaunchPlaybook(execution.playbookId, execution.customerId || '');
              setLauncherVisible(false);
              setSelectedPlaybook(null);
            }
          }}
        />
      )}

      {/* 任务管理器 */}
      <Modal
        title="任务管理"
        open={taskManagerVisible}
        onCancel={() => setTaskManagerVisible(false)}
        width={1200}
        footer={null}
      >
        <PlaybookTaskManager
          executions={executions}
          onUpdateTaskStatus={async (executionId, taskId, status, result, notes) => {
            // 更新任务状态的逻辑
            message.success('任务状态已更新');
          }}
          onUpdateCheckpoint={async (executionId, taskId, checkpointId, completed, notes) => {
            // 更新检查点的逻辑
            message.success('检查点已更新');
          }}
          onReassignTask={async (executionId, taskId, newAssignee) => {
            // 重新分配任务的逻辑
            message.success('任务已重新分配');
          }}
        />
      </Modal>

      {/* 触发引擎 */}
      <Modal
        title="智能推荐引擎"
        open={triggerEngineVisible}
        onCancel={() => setTriggerEngineVisible(false)}
        width={1400}
        footer={null}
      >
        <PlaybookTriggerEngine
          customers={mockCustomers}
          playbooks={mockServicePlaybooks}
          recommendations={recommendations}
          onCreateRecommendation={async (recommendation) => {
            const newRec = {
              ...recommendation,
              id: `rec_${Date.now()}`,
              createdAt: new Date().toISOString()
            };
            setRecommendations(prev => [...prev, newRec]);
          }}
          onUpdateRecommendation={handleUpdateRecommendation}
          onDeleteRecommendation={async (id) => {
            setRecommendations(prev => prev.filter(rec => rec.id !== id));
          }}
          onLaunchPlaybook={async (playbookId, customerId, triggeredBy) => {
            await handleLaunchPlaybook(playbookId, customerId);
          }}
        />
      </Modal>

      {/* 管理按钮 */}
      <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'center' }}>
        <Button
          type="default"
          icon={<SettingOutlined />}
          onClick={() => setTaskManagerVisible(true)}
        >
          任务管理 ({executions.length})
        </Button>
        <Button
          type="default"
          icon={<AlertOutlined />}
          onClick={() => setTriggerEngineVisible(true)}
        >
          智能推荐 ({recommendations.length})
        </Button>
      </div>
    </div>
  );
};

// 主组件
const ContinuousService: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');

  // 处理URL参数，设置初始tab
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'actions', 'playbooks'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location.search]);

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
              {activeTab === 'playbooks' ? '持续服务/服务剧本' : activeTab === 'actions' ? '持续服务/关键动作' : '持续服务'}
            </Title>
            <Text type="secondary" style={{ fontSize: '14px', color: '#666' }}>
              {activeTab === 'playbooks' ? '一个好的剧本远不止是一个任务清单' : activeTab === 'actions' ? '快速启动关键业务动作，提升客户成功效率' : '基于客户成功体系化运营的智能服务平台'}
            </Text>
          </div>
        </div>
        <Space size={12}>
          <Button
            type="text"
            onClick={() => setActiveTab('actions')}
            className={`tab-button ${activeTab === 'actions' ? 'active' : ''}`}
            style={{
              height: 40,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '0 16px',
              borderRadius: 8,
              background: activeTab === 'actions' ? '#1890ff' : '#ffffff',
              border: 'none',
              color: activeTab === 'actions' ? '#ffffff' : '#8c8c8c',
              fontWeight: 500,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'actions') {
                e.currentTarget.style.background = '#1890ff';
                e.currentTarget.style.color = '#ffffff';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'actions') {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.color = '#8c8c8c';
              }
            }}
          >
            <PlayCircleOutlined />
            <span>关键动作</span>
          </Button>
          <Button
            type="text"
            onClick={() => setActiveTab('playbooks')}
            className={`tab-button ${activeTab === 'playbooks' ? 'active' : ''}`}
            style={{
              height: 40,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '0 16px',
              borderRadius: 8,
              background: activeTab === 'playbooks' ? '#1890ff' : '#ffffff',
              border: 'none',
              color: activeTab === 'playbooks' ? '#ffffff' : '#8c8c8c',
              fontWeight: 500,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'playbooks') {
                e.currentTarget.style.background = '#1890ff';
                e.currentTarget.style.color = '#ffffff';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'playbooks') {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.color = '#8c8c8c';
              }
            }}
          >
            <FileTextOutlined />
            <span>服务剧本</span>
          </Button>
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
