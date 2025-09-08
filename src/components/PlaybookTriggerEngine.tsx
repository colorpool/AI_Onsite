import React, { useState, useEffect, useMemo } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Switch,
  Typography,
  Space,
  Tooltip,
  Badge,
  Divider,
  Alert,
  Progress,
  Row,
  Col,
  Statistic,
  Timeline,
  Tabs,
  List,
  Avatar,
  Empty,
  message
} from 'antd';
import {
  ThunderboltOutlined,
  RobotOutlined,
  UserOutlined,
  SettingOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  ReloadOutlined,
  BellOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';
import type {
  ServicePlaybook,
  TriggerCondition,
  TriggerConditionType,
  PlaybookRecommendation,
  Customer
} from '../types/continuousService';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

interface PlaybookTriggerEngineProps {
  playbooks: ServicePlaybook[];
  customers: Customer[];
  recommendations: PlaybookRecommendation[];
  onCreateRecommendation: (recommendation: Omit<PlaybookRecommendation, 'id' | 'createdAt'>) => Promise<void>;
  onUpdateRecommendation: (id: string, updates: Partial<PlaybookRecommendation>) => Promise<void>;
  onDeleteRecommendation: (id: string) => Promise<void>;
  onLaunchPlaybook: (playbookId: string, customerId: string, triggeredBy: 'auto' | 'manual') => Promise<void>;
  loading?: boolean;
}

interface TriggerRule {
  id: string;
  name: string;
  playbookId: string;
  conditions: TriggerCondition[];
  enabled: boolean;
  priority: number;
  cooldownHours: number;
  autoLaunch: boolean;
  createdAt: string;
  lastTriggered?: string;
  triggerCount: number;
}

interface TriggerEvent {
  id: string;
  ruleId: string;
  customerId: string;
  playbookId: string;
  triggeredAt: string;
  triggeredBy: 'auto' | 'manual';
  status: 'pending' | 'launched' | 'ignored';
  confidence: number;
  reason: string;
}

const PlaybookTriggerEngine: React.FC<PlaybookTriggerEngineProps> = ({
  playbooks,
  customers,
  recommendations,
  onCreateRecommendation,
  onUpdateRecommendation,
  onDeleteRecommendation,
  onLaunchPlaybook,
  loading = false
}) => {
  const [activeTab, setActiveTab] = useState('recommendations');
  const [triggerRules, setTriggerRules] = useState<TriggerRule[]>([]);
  const [triggerEvents, setTriggerEvents] = useState<TriggerEvent[]>([]);
  const [ruleModalVisible, setRuleModalVisible] = useState(false);
  const [selectedRule, setSelectedRule] = useState<TriggerRule | null>(null);
  const [form] = Form.useForm();

  // 模拟触发规则数据
  useEffect(() => {
    const mockRules: TriggerRule[] = [
      {
        id: 'rule_1',
        name: '新客户欢迎流程',
        playbookId: 'playbook_1',
        conditions: [
          {
            id: 'cond_1',
            type: 'custom',
            field: 'customer_status',
            operator: 'eq',
            value: 'new',
            description: '客户状态为新客户'
          }
        ],
        enabled: true,
        priority: 1,
        cooldownHours: 24,
        autoLaunch: true,
        createdAt: '2024-01-15T10:00:00Z',
        lastTriggered: '2024-01-20T14:30:00Z',
        triggerCount: 15
      },
      {
        id: 'rule_2',
        name: '合同到期提醒',
        playbookId: 'playbook_2',
        conditions: [
          {
            id: 'cond_2',
            type: 'contract_days',
            field: 'days_to_expiry',
            operator: 'lt',
            value: 30,
            description: '合同30天内到期'
          }
        ],
        enabled: true,
        priority: 2,
        cooldownHours: 168, // 7天
        autoLaunch: false,
        createdAt: '2024-01-10T09:00:00Z',
        lastTriggered: '2024-01-18T16:00:00Z',
        triggerCount: 8
      },
      {
        id: 'rule_3',
        name: '健康度下降处理',
        playbookId: 'playbook_3',
        conditions: [
          {
            id: 'cond_3',
            type: 'health_score',
            field: 'health_score',
            operator: 'lt',
            value: 60,
            description: '健康度低于60分'
          },
          {
            id: 'cond_4',
            type: 'custom',
            field: 'health_trend',
            operator: 'eq',
            value: 'declining',
            description: '健康度呈下降趋势'
          }
        ],
        enabled: true,
        priority: 3,
        cooldownHours: 72,
        autoLaunch: false,
        createdAt: '2024-01-12T11:00:00Z',
        triggerCount: 3
      }
    ];
    setTriggerRules(mockRules);

    // 模拟触发事件
    const mockEvents: TriggerEvent[] = [
      {
        id: 'event_1',
        ruleId: 'rule_1',
        customerId: 'customer_1',
        playbookId: 'playbook_1',
        triggeredAt: '2024-01-20T14:30:00Z',
        triggeredBy: 'auto',
        status: 'launched',
        confidence: 0.95,
        reason: '检测到新客户注册，自动触发欢迎流程'
      },
      {
        id: 'event_2',
        ruleId: 'rule_2',
        customerId: 'customer_2',
        playbookId: 'playbook_2',
        triggeredAt: '2024-01-20T16:00:00Z',
        triggeredBy: 'auto',
        status: 'pending',
        confidence: 0.88,
        reason: '合同将在25天后到期，建议启动续约流程'
      },
      {
        id: 'event_3',
        ruleId: 'rule_3',
        customerId: 'customer_3',
        playbookId: 'playbook_3',
        triggeredAt: '2024-01-20T18:15:00Z',
        triggeredBy: 'manual',
        status: 'launched',
        confidence: 0.76,
        reason: '客户健康度从75分降至55分，手动启动干预流程'
      }
    ];
    setTriggerEvents(mockEvents);
  }, []);

  // 获取推荐统计
  const recommendationStats = useMemo(() => {
    const total = recommendations.length;
    const pending = recommendations.filter(r => r.status === 'pending').length;
    const accepted = recommendations.filter(r => r.status === 'accepted').length;
    const rejected = recommendations.filter(r => r.status === 'rejected').length;
    const avgConfidence = recommendations.length > 0 
      ? recommendations.reduce((sum, r) => sum + r.confidence, 0) / recommendations.length 
      : 0;
    
    return { total, pending, accepted, rejected, avgConfidence };
  }, [recommendations]);

  // 获取触发规则统计
  const ruleStats = useMemo(() => {
    const total = triggerRules.length;
    const enabled = triggerRules.filter(r => r.enabled).length;
    const autoLaunch = triggerRules.filter(r => r.autoLaunch).length;
    const totalTriggers = triggerRules.reduce((sum, r) => sum + r.triggerCount, 0);
    
    return { total, enabled, autoLaunch, totalTriggers };
  }, [triggerRules]);

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'orange';
      case 'accepted': case 'launched': return 'green';
      case 'rejected': case 'ignored': return 'red';
      default: return 'default';
    }
  };

  // 获取置信度颜色
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return '#52c41a';
    if (confidence >= 0.6) return '#faad14';
    return '#ff4d4f';
  };

  // 处理推荐操作
  const handleRecommendationAction = async (id: string, action: 'accept' | 'reject') => {
    try {
      await onUpdateRecommendation(id, { status: action === 'accept' ? 'accepted' : 'rejected' });
      
      if (action === 'accept') {
        const recommendation = recommendations.find(r => r.id === id);
        if (recommendation) {
          await onLaunchPlaybook(recommendation.playbookId, recommendation.customerId, 'manual');
        }
      }
      
      message.success(action === 'accept' ? '已接受推荐并启动剧本' : '已拒绝推荐');
    } catch (error) {
      message.error('操作失败，请重试');
    }
  };

  // 显示规则编辑对话框
  const showRuleModal = (rule?: TriggerRule) => {
    setSelectedRule(rule || null);
    if (rule) {
      form.setFieldsValue({
        name: rule.name,
        playbookId: rule.playbookId,
        enabled: rule.enabled,
        priority: rule.priority,
        cooldownHours: rule.cooldownHours,
        autoLaunch: rule.autoLaunch
      });
    } else {
      form.resetFields();
    }
    setRuleModalVisible(true);
  };

  // 保存触发规则
  const handleSaveRule = async () => {
    try {
      const values = await form.validateFields();
      // 这里应该调用API保存规则
      console.log('Save rule:', values);
      message.success('规则保存成功');
      setRuleModalVisible(false);
    } catch (error) {
      message.error('保存失败，请重试');
    }
  };

  // 推荐表格列
  const recommendationColumns: ColumnsType<PlaybookRecommendation> = [
    {
      title: '推荐剧本',
      dataIndex: 'playbookName',
      key: 'playbookName',
      width: 200,
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            置信度: {Math.round(record.confidence * 100)}%
          </Text>
        </div>
      )
    },
    {
      title: '目标客户',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 120
    },
    {
      title: '推荐原因',
      dataIndex: 'reason',
      key: 'reason',
      width: 250,
      ellipsis: true
    },
    {
      title: '置信度',
      dataIndex: 'confidence',
      key: 'confidence',
      width: 100,
      render: (confidence) => (
        <Progress
          percent={Math.round(confidence * 100)}
          size="small"
          strokeColor={getConfidenceColor(confidence)}
        />
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status === 'pending' ? '待处理' : status === 'accepted' ? '已接受' : '已拒绝'}
        </Tag>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (date) => dayjs(date).format('MM-DD HH:mm')
    },
    {
      title: '操作',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          {record.status === 'pending' && (
            <>
              <Button
                type="primary"
                size="small"
                onClick={() => handleRecommendationAction(record.id, 'accept')}
              >
                接受
              </Button>
              <Button
                size="small"
                onClick={() => handleRecommendationAction(record.id, 'reject')}
              >
                拒绝
              </Button>
            </>
          )}
          {record.status !== 'pending' && (
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => onDeleteRecommendation(record.id)}
            />
          )}
        </Space>
      )
    }
  ];

  // 触发规则表格列
  const ruleColumns: ColumnsType<TriggerRule> = [
    {
      title: '规则名称',
      dataIndex: 'name',
      key: 'name',
      width: 200
    },
    {
      title: '目标剧本',
      dataIndex: 'playbookId',
      key: 'playbookId',
      width: 150,
      render: (playbookId) => {
        const playbook = playbooks.find(p => p.id === playbookId);
        return playbook?.name || playbookId;
      }
    },
    {
      title: '状态',
      key: 'status',
      width: 100,
      render: (_, record) => (
        <Space>
          <Tag color={record.enabled ? 'green' : 'red'}>
            {record.enabled ? '启用' : '禁用'}
          </Tag>
          {record.autoLaunch && (
            <Tag color="blue">自动启动</Tag>
          )}
        </Space>
      )
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      width: 80,
      render: (priority) => (
        <Badge count={priority} style={{ backgroundColor: '#108ee9' }} />
      )
    },
    {
      title: '触发次数',
      dataIndex: 'triggerCount',
      key: 'triggerCount',
      width: 100
    },
    {
      title: '最后触发',
      dataIndex: 'lastTriggered',
      key: 'lastTriggered',
      width: 120,
      render: (date) => date ? dayjs(date).format('MM-DD HH:mm') : '-'
    },
    {
      title: '操作',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="编辑规则">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => showRuleModal(record)}
            />
          </Tooltip>
          <Tooltip title={record.enabled ? '禁用' : '启用'}>
            <Button
              type="text"
              icon={record.enabled ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
              onClick={() => {
                // 切换启用状态
                const updatedRules = triggerRules.map(r => 
                  r.id === record.id ? { ...r, enabled: !r.enabled } : r
                );
                setTriggerRules(updatedRules);
              }}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  return (
    <div>
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        {/* 推荐管理 */}
        <TabPane
          tab={
            <span>
              <RobotOutlined />
              推荐管理
              {recommendationStats.pending > 0 && (
                <Badge count={recommendationStats.pending} style={{ marginLeft: 8 }} />
              )}
            </span>
          }
          key="recommendations"
        >
          {/* 推荐统计 */}
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="总推荐数"
                  value={recommendationStats.total}
                  prefix={<BellOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="待处理"
                  value={recommendationStats.pending}
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: '#faad14' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="已接受"
                  value={recommendationStats.accepted}
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="平均置信度"
                  value={Math.round(recommendationStats.avgConfidence * 100)}
                  suffix="%"
                  prefix={<ThunderboltOutlined />}
                  valueStyle={{ color: getConfidenceColor(recommendationStats.avgConfidence) }}
                />
              </Card>
            </Col>
          </Row>

          {/* 推荐列表 */}
          <Card>
            <Table
              columns={recommendationColumns}
              dataSource={recommendations}
              rowKey="id"
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 条推荐`
              }}
            />
          </Card>
        </TabPane>

        {/* 触发规则 */}
        <TabPane
          tab={
            <span>
              <SettingOutlined />
              触发规则
            </span>
          }
          key="rules"
        >
          {/* 规则统计 */}
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="总规则数"
                  value={ruleStats.total}
                  prefix={<SettingOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="启用规则"
                  value={ruleStats.enabled}
                  prefix={<PlayCircleOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="自动启动"
                  value={ruleStats.autoLaunch}
                  prefix={<RobotOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="总触发次数"
                  value={ruleStats.totalTriggers}
                  prefix={<ThunderboltOutlined />}
                />
              </Card>
            </Col>
          </Row>

          {/* 规则管理 */}
          <Card
            title="触发规则"
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => showRuleModal()}
              >
                新建规则
              </Button>
            }
          >
            <Table
              columns={ruleColumns}
              dataSource={triggerRules}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 条规则`
              }}
            />
          </Card>
        </TabPane>

        {/* 触发历史 */}
        <TabPane
          tab={
            <span>
              <ClockCircleOutlined />
              触发历史
            </span>
          }
          key="history"
        >
          <Card>
            <Timeline>
              {triggerEvents.map(event => {
                const rule = triggerRules.find(r => r.id === event.ruleId);
                const customer = customers.find(c => c.id === event.customerId);
                const playbook = playbooks.find(p => p.id === event.playbookId);
                
                return (
                  <Timeline.Item
                    key={event.id}
                    dot={
                      event.status === 'launched' ? (
                        <CheckCircleOutlined style={{ color: '#52c41a' }} />
                      ) : event.status === 'pending' ? (
                        <ClockCircleOutlined style={{ color: '#faad14' }} />
                      ) : (
                        <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
                      )
                    }
                    color={getStatusColor(event.status)}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <Text strong>{rule?.name || '未知规则'}</Text>
                        <Tag color={event.triggeredBy === 'auto' ? 'blue' : 'green'}>
                          {event.triggeredBy === 'auto' ? '自动触发' : '手动触发'}
                        </Tag>
                        <Tag color={getStatusColor(event.status)}>
                          {event.status === 'launched' ? '已启动' : event.status === 'pending' ? '待处理' : '已忽略'}
                        </Tag>
                      </div>
                      <div style={{ marginBottom: 4 }}>
                        <Text type="secondary">
                          客户: {customer?.name || '未知客户'} | 
                          剧本: {playbook?.name || '未知剧本'} | 
                          置信度: {Math.round(event.confidence * 100)}%
                        </Text>
                      </div>
                      <div style={{ marginBottom: 4 }}>
                        <Text>{event.reason}</Text>
                      </div>
                      <div>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {dayjs(event.triggeredAt).format('YYYY-MM-DD HH:mm:ss')}
                        </Text>
                      </div>
                    </div>
                  </Timeline.Item>
                );
              })}
            </Timeline>
          </Card>
        </TabPane>
      </Tabs>

      {/* 规则编辑模态框 */}
      <Modal
        title={selectedRule ? '编辑触发规则' : '新建触发规则'}
        open={ruleModalVisible}
        onCancel={() => setRuleModalVisible(false)}
        onOk={handleSaveRule}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="规则名称"
            rules={[{ required: true, message: '请输入规则名称' }]}
          >
            <Input placeholder="请输入规则名称" />
          </Form.Item>

          <Form.Item
            name="playbookId"
            label="目标剧本"
            rules={[{ required: true, message: '请选择目标剧本' }]}
          >
            <Select placeholder="请选择目标剧本">
              {playbooks.map(playbook => (
                <Option key={playbook.id} value={playbook.id}>
                  {playbook.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="priority"
                label="优先级"
                rules={[{ required: true, message: '请输入优先级' }]}
              >
                <Input type="number" min={1} max={10} placeholder="1-10" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cooldownHours"
                label="冷却时间(小时)"
                rules={[{ required: true, message: '请输入冷却时间' }]}
              >
                <Input type="number" min={1} placeholder="冷却时间" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="enabled" label="启用规则" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="autoLaunch" label="自动启动" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default PlaybookTriggerEngine;