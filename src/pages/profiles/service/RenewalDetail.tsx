import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTabManager } from '../../../contexts/TabContext';
import {
  Card,
  Row,
  Col,
  Statistic,
  Timeline,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message,
  Tabs,
  Collapse,
  Tag,
  Avatar,
  Space,
  Typography,
  Progress,
  Tooltip
} from 'antd';
import {
  CalendarOutlined,
  DollarOutlined,
  TeamOutlined,
  UserOutlined,
  PlusOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
  PhoneOutlined,
  MailOutlined,
  WechatOutlined,
  PlayCircleOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import ContinuousServiceHeader from '../../../components/service/ContinuousServiceHeader';
import { mockCustomers } from '../../../mock/continuousServiceData';
import dayjs from 'dayjs';

const { Text, Title } = Typography;
const { Panel } = Collapse;
const { Option } = Select;
const { TextArea } = Input;

// 续约客户类型定义
interface RenewalCustomer {
  id: string;
  name: string;
  healthLevel: 'healthy' | 'normal' | 'risk';
  customerTier: 'strategic' | 'large' | 'medium' | 'small';
  arr: number;
  renewalDate: string;
  lastContactDays: number;
  contractNumber: string;
  renewalProbability: number;
  renewalAmount: number;
  keyRisks: string[];
  renewalHistory: {
    year: string;
    amount: number;
    growthRate: number;
    status: 'completed' | 'churned';
  }[];
  renewalTasks: {
    id: string;
    title: string;
    status: 'pending' | 'in_progress' | 'completed';
    dueDate: string;
    assignee: string;
    priority: 'high' | 'medium' | 'low';
  }[];
  negotiationHistory: {
    id: string;
    date: string;
    type: string;
    content: string;
    result: string;
    nextAction: string;
  }[];
}

const RenewalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { removeTab } = useTabManager();
  const [customer, setCustomer] = useState<RenewalCustomer | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const [newTaskModalVisible, setNewTaskModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      // 从mockCustomers中找到对应客户并转换为续约客户格式
      const foundCustomer = mockCustomers.find(c => c.id === id);
      if (foundCustomer) {
        const renewalCustomer: RenewalCustomer = {
          id: foundCustomer.id,
          name: foundCustomer.name,
          healthLevel: foundCustomer.healthLevel === '健康' ? 'healthy' : foundCustomer.healthLevel === '一般' ? 'normal' : 'risk',
          customerTier: foundCustomer.customerTier || 'medium',
          arr: foundCustomer.arr,
          renewalDate: foundCustomer.nextRenewalDate || foundCustomer.serviceExpiryDate || '2024-12-31',
          lastContactDays: Math.floor((new Date().getTime() - new Date(foundCustomer.lastContactDate).getTime()) / (1000 * 60 * 60 * 24)),
          contractNumber: foundCustomer.currentContract?.contractNumber || `CONT-2023-${id.slice(-3)}`,
          renewalProbability: Math.floor(Math.random() * 40) + 60, // 60-100%
           renewalAmount: foundCustomer.currentContract?.amount || 500000,
          keyRisks: [
            '预算紧张',
            '决策周期长',
            '竞品对比中'
          ],
          renewalHistory: [
            {
              year: '2023',
              amount: foundCustomer.currentContract?.amount || 500000,
              growthRate: 15,
              status: 'completed'
            },
            {
              year: '2022',
              amount: (foundCustomer.currentContract?.amount || 500000) * 0.87,
              growthRate: 8,
              status: 'completed'
            }
          ],
          renewalTasks: [
            {
              id: 'task1',
              title: '商务谈判会议',
              status: 'in_progress',
              dueDate: '2024-06-15',
              assignee: '张经理',
              priority: 'high'
            },
            {
              id: 'task2',
              title: '续约方案制定',
              status: 'completed',
              dueDate: '2024-06-10',
              assignee: '李顾问',
              priority: 'high'
            },
            {
              id: 'task3',
              title: '客户满意度调研',
              status: 'pending',
              dueDate: '2024-06-20',
              assignee: '王专员',
              priority: 'medium'
            }
          ],
          negotiationHistory: [
            {
              id: 'nego1',
              date: '2024-06-01',
              type: '商务会议',
              content: '讨论续约条件和价格方案',
              result: '客户对价格有异议，需要进一步优化方案',
              nextAction: '准备新的报价方案'
            },
            {
              id: 'nego2',
              date: '2024-05-25',
              type: '技术交流',
              content: '产品功能演示和技术支持讨论',
              result: '客户对产品功能满意，技术团队认可',
              nextAction: '跟进商务条款谈判'
            }
          ]
        };
        
        setCustomer(renewalCustomer);
        
        // 检查是否为收藏客户
        const favoriteCustomers = JSON.parse(localStorage.getItem('favoriteCustomers') || '[]');
        setIsFavorite(favoriteCustomers.includes(id));
        
        // 如果URL中包含scrollTo参数，滚动到对应位置
        const searchParams = new URLSearchParams(location.search);
        const scrollTo = searchParams.get('scrollTo');
        if (scrollTo === 'top' && topRef.current) {
          setTimeout(() => {
            topRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      } else {
        // 如果找不到客户，跳转回续约管理页
        navigate('/profiles/renewal');
      }
    }
  }, [id, navigate, location.search]);

  // 切换收藏状态
  const handleToggleFavorite = () => {
    if (!id) return;
    
    const favoriteCustomers = JSON.parse(localStorage.getItem('favoriteCustomers') || '[]');
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favoriteCustomers.filter((customerId: string) => customerId !== id);
      message.success('已取消关注');
    } else {
      newFavorites = [...favoriteCustomers, id];
      message.success('已添加关注');
    }
    
    localStorage.setItem('favoriteCustomers', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  // 新增续约任务
  const handleCreateTask = () => {
    form.validateFields().then(values => {
      console.log('新增续约任务:', values);
      message.success('续约任务创建成功');
      setNewTaskModalVisible(false);
      form.resetFields();
    });
  };

  if (!customer) {
    return <div>加载中...</div>;
  }

  // 计算续约剩余天数
  const calculateRemainingDays = (renewalDate: string) => {
    const today = new Date();
    const renewal = new Date(renewalDate);
    const diffTime = renewal.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const remainingDays = calculateRemainingDays(customer.renewalDate);

  return (
    <div ref={topRef} style={{
      padding: '32px 40px',
      background: '#f5f5f5',
      minHeight: 'calc(100vh - 120px)'
    }}>
      {/* 顶部客户信息 */}
      <div style={{ marginBottom: '24px' }}>
        <ContinuousServiceHeader
          customerData={{
            id: customer.id,
            name: customer.name,
            healthLevel: customer.healthLevel,
            customerTier: customer.customerTier === 'small' ? 'medium' : customer.customerTier,
            arr: customer.arr,
            renewalDate: customer.renewalDate,
            lastContactDays: customer.lastContactDays,
            contractNumber: customer.contractNumber
          }}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
          onBack={() => {
            // 触发删除当前详情页tab的事件
            const event = new CustomEvent('tabClose', {
              detail: { path: location.pathname }
            });
            window.dispatchEvent(event);
            
            // 延迟导航，确保tab删除事件先处理
            setTimeout(() => {
              navigate('/profiles/renewal');
            }, 50);
          }}
          onViewContract={() => {
            message.info('查看合同功能开发中');
          }}
          onShare={() => {
            message.info('分享功能开发中');
          }}
        />
      </div>

      {/* 续约核心指标 */}
      <Row gutter={24} style={{ marginBottom: '24px' }}>
        {/* 续约概率 */}
        <Col xs={24} lg={6}>
          <Card 
            style={{
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
              border: '1px solid #f0f0f0',
              background: '#ffffff',
              height: '140px'
            }}
          >
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <TrophyOutlined style={{ color: '#52c41a', marginRight: '8px', fontSize: '18px' }} />
                <Text strong style={{ fontSize: '16px' }}>续约概率</Text>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <Text style={{ fontSize: '28px', fontWeight: 'bold', color: '#52c41a' }}>{customer.renewalProbability}</Text>
                <Text style={{ color: '#666', marginLeft: '4px', fontSize: '16px' }}>%</Text>
              </div>
              <Progress 
                percent={customer.renewalProbability} 
                showInfo={false} 
                strokeColor={customer.renewalProbability >= 80 ? '#52c41a' : customer.renewalProbability >= 60 ? '#faad14' : '#ff4d4f'}
                size="small"
              />
            </div>
          </Card>
        </Col>

        {/* 续约金额 */}
        <Col xs={24} lg={6}>
          <Card 
            style={{
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
              border: '1px solid #f0f0f0',
              background: '#ffffff',
              height: '140px'
            }}
          >
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <DollarOutlined style={{ color: '#1890ff', marginRight: '8px', fontSize: '18px' }} />
                <Text strong style={{ fontSize: '16px' }}>预期续约金额</Text>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>¥{(customer.renewalAmount / 10000).toFixed(0)}</Text>
                <Text style={{ color: '#666', marginLeft: '4px', fontSize: '14px' }}>万</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <RiseOutlined style={{ color: '#52c41a', fontSize: '12px', marginRight: '4px' }} />
                <Text style={{ color: '#52c41a', fontSize: '12px' }}>较去年增长15%</Text>
              </div>
            </div>
          </Card>
        </Col>

        {/* 剩余天数 */}
        <Col xs={24} lg={6}>
          <Card 
            style={{
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
              border: '1px solid #f0f0f0',
              background: '#ffffff',
              height: '140px'
            }}
          >
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <CalendarOutlined style={{ color: '#fa8c16', marginRight: '8px', fontSize: '18px' }} />
                <Text strong style={{ fontSize: '16px' }}>到期时间</Text>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <Text style={{ fontSize: '28px', fontWeight: 'bold', color: remainingDays <= 30 ? '#ff4d4f' : '#fa8c16' }}>{remainingDays}</Text>
                <Text style={{ color: '#666', marginLeft: '4px', fontSize: '16px' }}>天</Text>
              </div>
              <Text type="secondary" style={{ fontSize: '12px' }}>{customer.renewalDate} 到期</Text>
            </div>
          </Card>
        </Col>

        {/* 关键风险 */}
        <Col xs={24} lg={6}>
          <Card 
            style={{
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
              border: '1px solid #f0f0f0',
              background: '#ffffff',
              height: '140px'
            }}
          >
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <ExclamationCircleOutlined style={{ color: '#ff4d4f', marginRight: '8px', fontSize: '18px' }} />
                <Text strong style={{ fontSize: '16px' }}>关键风险</Text>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <Text style={{ fontSize: '28px', fontWeight: 'bold', color: '#ff4d4f' }}>{customer.keyRisks.length}</Text>
                <Text style={{ color: '#666', marginLeft: '4px', fontSize: '16px' }}>项</Text>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px' }}>
                {customer.keyRisks.slice(0, 2).map((risk, index) => (
                  <Tag key={index} color="red" style={{ fontSize: '10px', margin: 0 }}>
                    {risk}
                  </Tag>
                ))}
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 续约详情标签页 */}
      <Card 
        style={{
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          border: '1px solid #f0f0f0',
          background: '#ffffff',
          minHeight: '420px'
        }}
      >
        <Tabs
          defaultActiveKey="tasks"
          size="large"
          type="line"
          style={{
            margin: 0
          }}
          tabBarStyle={{
            margin: 0,
            backgroundColor: '#fff',
            borderBottom: '1px solid #f0f0f0',
            padding: '0 24px'
          }}
          items={[
            {
              key: 'tasks',
              label: (
                <div style={{ display: 'flex', alignItems: 'center', padding: '4px 8px' }}>
                  <CheckCircleOutlined style={{ marginRight: '6px', color: '#8c8c8c', fontSize: '14px' }} />
                  <span style={{ color: '#8c8c8c', fontSize: '14px' }}>续约任务</span>
                </div>
              ),
              children: (
                <div style={{ padding: '8px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <Text type="secondary" style={{ fontSize: '14px' }}>
                      共 {customer.renewalTasks.length} 个任务
                    </Text>
                    <Button 
                      type="primary" 
                      icon={<PlusOutlined />}
                      onClick={() => setNewTaskModalVisible(true)}
                    >
                      新增任务
                    </Button>
                  </div>
                  <Timeline
                    style={{ padding: '16px 0' }}
                    items={customer.renewalTasks.map((task) => {
                      const getStatusConfig = (status: string) => {
                        const configs = {
                          'completed': { color: '#52c41a', text: '已完成', icon: <CheckCircleOutlined /> },
                          'in_progress': { color: '#1890ff', text: '进行中', icon: <ClockCircleOutlined /> },
                          'pending': { color: '#d9d9d9', text: '待开始', icon: <ClockCircleOutlined /> }
                        };
                        return configs[status as keyof typeof configs] || configs['pending'];
                      };

                      const getPriorityColor = (priority: string) => {
                        const colors = {
                          'high': '#ff4d4f',
                          'medium': '#faad14',
                          'low': '#52c41a'
                        };
                        return colors[priority as keyof typeof colors] || '#d9d9d9';
                      };

                      const statusConfig = getStatusConfig(task.status);
                      
                      return {
                        color: statusConfig.color,
                        dot: statusConfig.icon,
                        children: (
                          <div style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Text strong style={{ marginRight: '8px' }}>{task.title}</Text>
                                <Tag color={getPriorityColor(task.priority)}>
                                  {task.priority === 'high' ? '高优先级' : task.priority === 'medium' ? '中优先级' : '低优先级'}
                                </Tag>
                              </div>
                              <Tag color={statusConfig.color}>{statusConfig.text}</Tag>
                            </div>
                            <div style={{ color: '#666', fontSize: '12px' }}>
                              <div>负责人：{task.assignee}</div>
                              <div>截止时间：{task.dueDate}</div>
                            </div>
                          </div>
                        )
                      };
                    })}
                  />
                </div>
              )
            },
            {
              key: 'negotiation',
              label: (
                <div style={{ display: 'flex', alignItems: 'center', padding: '4px 8px' }}>
                  <FileTextOutlined style={{ marginRight: '6px', color: '#8c8c8c', fontSize: '14px' }} />
                  <span style={{ color: '#8c8c8c', fontSize: '14px' }}>谈判记录</span>
                </div>
              ),
              children: (
                <div style={{ padding: '8px 0' }}>
                  <Timeline
                    style={{ padding: '16px 0' }}
                    items={customer.negotiationHistory.map((record) => ({
                      color: '#1890ff',
                      children: (
                        <div style={{ marginBottom: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <Text strong>{record.type}</Text>
                            <Text type="secondary" style={{ fontSize: '12px' }}>{record.date}</Text>
                          </div>
                          <div style={{ marginBottom: '8px' }}>
                            <Text style={{ color: '#666' }}>{record.content}</Text>
                          </div>
                          <div style={{ marginBottom: '8px' }}>
                            <Text strong style={{ color: '#52c41a' }}>结果：</Text>
                            <Text style={{ color: '#666' }}>{record.result}</Text>
                          </div>
                          <div>
                            <Text strong style={{ color: '#1890ff' }}>下一步：</Text>
                            <Text style={{ color: '#666' }}>{record.nextAction}</Text>
                          </div>
                        </div>
                      )
                    }))}
                  />
                </div>
              )
            },
            {
              key: 'activities',
              label: (
                <div style={{ display: 'flex', alignItems: 'center', padding: '4px 8px' }}>
                  <ClockCircleOutlined style={{ marginRight: '6px', color: '#8c8c8c', fontSize: '14px' }} />
                  <span style={{ color: '#8c8c8c', fontSize: '14px' }}>近期动态</span>
                </div>
              ),
              children: (
                <div style={{ padding: '8px 0' }}>
                  <Timeline
                    style={{ padding: '16px 0' }}
                    items={[
                      {
                        color: '#fa541c',
                        children: (
                          <div>
                            <div style={{ fontWeight: 500, marginBottom: '4px' }}>
                              {customer.name}
                            </div>
                            <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '4px' }}>
                              续约状态更新为"流失风险"
                            </div>
                            <div style={{ fontSize: '11px', color: '#bfbfbf' }}>
                              2024-02-28 14:30
                            </div>
                          </div>
                        )
                      },
                      {
                        color: '#52c41a',
                        children: (
                          <div>
                            <div style={{ fontWeight: 500, marginBottom: '4px' }}>
                              {customer.name}
                            </div>
                            <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '4px' }}>
                              健康分从85提升到92
                            </div>
                            <div style={{ fontSize: '11px', color: '#bfbfbf' }}>
                              2024-02-27 16:15
                            </div>
                          </div>
                        )
                      },
                      {
                        color: '#1890ff',
                        children: (
                          <div>
                            <div style={{ fontWeight: 500, marginBottom: '4px' }}>
                              {customer.name}
                            </div>
                            <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '4px' }}>
                              发送续约报价单
                            </div>
                            <div style={{ fontSize: '11px', color: '#bfbfbf' }}>
                              2024-02-26 10:20
                            </div>
                          </div>
                        )
                      }
                    ]}
                  />
                </div>
              )
            },
            {
              key: 'playbooks',
              label: (
                <div style={{ display: 'flex', alignItems: 'center', padding: '4px 8px' }}>
                  <PlayCircleOutlined style={{ marginRight: '6px', color: '#8c8c8c', fontSize: '14px' }} />
                  <span style={{ color: '#8c8c8c', fontSize: '14px' }}>推荐剧本</span>
                </div>
              ),
              children: (
                <div style={{ padding: '8px 0' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <Text strong>客户流失挽留SOP</Text>
                      <Button 
                        type="text" 
                        size="small" 
                        icon={<PlayCircleOutlined />}
                        style={{ color: '#1890ff' }}
                      >
                        启用
                      </Button>
                    </div>
                    <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '8px' }}>
                      针对流失风险客户的标准化挽留流程
                    </div>
                    <div style={{ fontSize: '12px', color: '#595959' }}>
                      <div style={{ marginBottom: '4px' }}>1. 紧急客户访谈，了解流失原因</div>
                      <div style={{ marginBottom: '4px' }}>2. 制定个性化挽留方案</div>
                      <div style={{ marginBottom: '4px' }}>3. 高层介入商务谈判</div>
                      <div style={{ marginBottom: '4px' }}>4. 提供额外价值和优惠</div>
                    </div>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <Text strong>续约谈判标准流程</Text>
                      <Button 
                        type="text" 
                        size="small" 
                        icon={<PlayCircleOutlined />}
                        style={{ color: '#1890ff' }}
                      >
                        启用
                      </Button>
                    </div>
                    <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '8px' }}>
                      适用于正常续约客户的标准谈判流程
                    </div>
                    <div style={{ fontSize: '12px', color: '#595959' }}>
                      <div style={{ marginBottom: '4px' }}>1. 续约意向确认</div>
                      <div style={{ marginBottom: '4px' }}>2. 需求调研和方案制定</div>
                      <div style={{ marginBottom: '4px' }}>3. 商务条款谈判</div>
                      <div style={{ marginBottom: '4px' }}>4. 合同签署和交付</div>
                    </div>
                  </div>
                </div>
              )
            },
            {
              key: 'analysis',
              label: (
                <div style={{ display: 'flex', alignItems: 'center', padding: '4px 8px' }}>
                  <BarChartOutlined style={{ marginRight: '6px', color: '#8c8c8c', fontSize: '14px' }} />
                  <span style={{ color: '#8c8c8c', fontSize: '14px' }}>健康分析</span>
                </div>
              ),
              children: (
                <div style={{ padding: '8px 0' }}>
                  <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '48px', color: '#722ed1', marginBottom: '8px' }}>
                        📊
                      </div>
                      <div style={{ fontSize: '14px', color: '#8c8c8c' }}>
                        续约健康度分析图表
                      </div>
                      <div style={{ fontSize: '12px', color: '#bfbfbf', marginTop: '8px' }}>
                        X轴: 续约倒计时 | Y轴: 客户健康分 | 气泡大小: 合同金额
                      </div>
                    </div>
                  </div>
                  
                  {/* 关键洞察 */}
                  <div style={{ 
                    background: '#f6ffed', 
                    border: '1px solid #b7eb8f', 
                    borderRadius: '6px', 
                    padding: '12px',
                    marginTop: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                      <RiseOutlined style={{ color: '#52c41a', marginRight: '6px' }} />
                      <Text strong style={{ color: '#52c41a' }}>关键洞察</Text>
                    </div>
                    <div style={{ fontSize: '12px', color: '#52c41a' }}>
                      • 该客户健康分呈上升趋势，续约概率较高<br/>
                      • 建议在合同到期前30天启动续约流程<br/>
                      • 重点关注预算和决策流程优化
                    </div>
                  </div>
                </div>
              )
            },
            {
              key: 'history',
              label: (
                <div style={{ display: 'flex', alignItems: 'center', padding: '4px 8px' }}>
                  <CalendarOutlined style={{ marginRight: '6px', color: '#8c8c8c', fontSize: '14px' }} />
                  <span style={{ color: '#8c8c8c', fontSize: '14px' }}>续约历史</span>
                </div>
              ),
              children: (
                <div style={{ padding: '8px 0' }}>
                  <Row gutter={16}>
                    {customer.renewalHistory.map((history, index) => (
                      <Col xs={24} sm={12} md={8} key={index}>
                        <Card 
                          size="small"
                          style={{ 
                            marginBottom: '16px',
                            borderRadius: '8px',
                            border: '1px solid #f0f0f0'
                          }}
                        >
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ marginBottom: '8px' }}>
                              <Text strong style={{ fontSize: '16px' }}>{history.year}年</Text>
                            </div>
                            <div style={{ marginBottom: '8px' }}>
                              <Text style={{ fontSize: '20px', fontWeight: 'bold', color: '#1890ff' }}>
                                ¥{(history.amount / 10000).toFixed(0)}万
                              </Text>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                              {history.growthRate > 0 ? (
                                <RiseOutlined style={{ color: '#52c41a', fontSize: '12px', marginRight: '4px' }} />
                              ) : (
                                <FallOutlined style={{ color: '#ff4d4f', fontSize: '12px', marginRight: '4px' }} />
                              )}
                              <Text style={{ 
                                color: history.growthRate > 0 ? '#52c41a' : '#ff4d4f', 
                                fontSize: '12px' 
                              }}>
                                {history.growthRate > 0 ? '+' : ''}{history.growthRate}%
                              </Text>
                            </div>
                            <Tag color={history.status === 'completed' ? 'green' : 'red'}>
                              {history.status === 'completed' ? '续约成功' : '客户流失'}
                            </Tag>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              )
            }
          ]}
        />
      </Card>

      {/* 新增任务弹窗 */}
      <Modal
        title="新增续约任务"
        open={newTaskModalVisible}
        onOk={handleCreateTask}
        onCancel={() => {
          setNewTaskModalVisible(false);
          form.resetFields();
        }}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          style={{ marginTop: '16px' }}
        >
          <Form.Item name="title" label="任务标题" rules={[{ required: true, message: '请输入任务标题' }]}>
            <Input placeholder="请输入任务标题" />
          </Form.Item>
          <Form.Item name="description" label="任务描述">
            <TextArea rows={3} placeholder="请输入任务描述" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="priority" label="优先级" rules={[{ required: true, message: '请选择优先级' }]}>
                <Select placeholder="请选择优先级">
                  <Option value="high">高优先级</Option>
                  <Option value="medium">中优先级</Option>
                  <Option value="low">低优先级</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="assignee" label="负责人" rules={[{ required: true, message: '请输入负责人' }]}>
                <Input placeholder="请输入负责人" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="dueDate" label="截止时间" rules={[{ required: true, message: '请选择截止时间' }]}>
            <DatePicker style={{ width: '100%' }} placeholder="请选择截止时间" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RenewalDetail;