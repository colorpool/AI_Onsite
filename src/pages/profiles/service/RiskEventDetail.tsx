import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Button,
  Space,
  Timeline,
  Form,
  Input,
  Select,
  DatePicker,
  Modal,
  message,
  Divider,
  Progress,
  Alert,
  Descriptions,
  Steps,
  List,
  Avatar,
  Tooltip,
  Badge,
  Spin
} from 'antd';
import {
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  EditOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlayCircleOutlined,
  FileTextOutlined,
  PlusOutlined,
  HistoryOutlined,
  AlertOutlined,
  BulbOutlined,
  TeamOutlined,
  SettingOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from 'umi';
import { mockRiskEvents, mockServicePlaybooks } from '../../../mock/continuousServiceData';
import type { RiskEvent, ServicePlaybook } from '../../../types/continuousService';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { Step } = Steps;

interface RiskAnalysis {
  rootCause: string;
  impactAssessment: string;
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  affectedAreas: string[];
  potentialLoss: string;
}

interface ActionPlan {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

interface ProcessLog {
  id: string;
  timestamp: string;
  action: string;
  operator: string;
  details: string;
  type: 'info' | 'warning' | 'success' | 'error';
}

const RiskEventDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [riskEvent, setRiskEvent] = useState<RiskEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [playbookModalVisible, setPlaybookModalVisible] = useState(false);
  const [actionPlanModalVisible, setActionPlanModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [playbookForm] = Form.useForm();
  const [actionForm] = Form.useForm();

  // 模拟数据
  const [riskAnalysis, setRiskAnalysis] = useState<RiskAnalysis>({
    rootCause: '客户对产品功能使用率低，关键业务流程未能有效集成，导致预期价值未实现',
    impactAssessment: '可能导致续约风险，预估影响合同金额50万元',
    urgencyLevel: 'high',
    affectedAreas: ['产品使用', '客户满意度', '续约概率'],
    potentialLoss: '50万元合同金额，以及潜在的口碑影响'
  });

  const [actionPlans, setActionPlans] = useState<ActionPlan[]>([
    {
      id: 'ap001',
      title: '安排产品培训会议',
      description: '组织客户关键用户进行产品功能培训，提升使用率',
      assignee: '王芳',
      dueDate: '2024-01-25',
      status: 'in_progress',
      priority: 'high'
    },
    {
      id: 'ap002',
      title: '制定业务集成方案',
      description: '与客户技术团队合作，制定详细的业务流程集成方案',
      assignee: '李明',
      dueDate: '2024-01-30',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 'ap003',
      title: '客户满意度调研',
      description: '进行深度访谈，了解客户真实需求和痛点',
      assignee: '张三',
      dueDate: '2024-01-28',
      status: 'pending',
      priority: 'medium'
    }
  ]);

  const [processLogs, setProcessLogs] = useState<ProcessLog[]>([
    {
      id: 'log001',
      timestamp: '2024-01-15 14:30',
      action: '风险事件创建',
      operator: '系统自动',
      details: '检测到客户使用率异常，自动创建风险事件',
      type: 'info'
    },
    {
      id: 'log002',
      timestamp: '2024-01-15 15:00',
      action: '分配处理人',
      operator: '张经理',
      details: '将风险事件分配给王芳处理',
      type: 'info'
    },
    {
      id: 'log003',
      timestamp: '2024-01-16 09:00',
      action: '开始处理',
      operator: '王芳',
      details: '开始分析风险原因，联系客户了解情况',
      type: 'info'
    },
    {
      id: 'log004',
      timestamp: '2024-01-16 16:30',
      action: '根因分析完成',
      operator: '王芳',
      details: '完成根因分析，确定主要问题为产品使用率低',
      type: 'success'
    }
  ]);

  useEffect(() => {
    // 模拟加载数据
    const loadRiskEvent = () => {
      const event = mockRiskEvents.find(e => e.id === id);
      if (event) {
        setRiskEvent(event);
        form.setFieldsValue({
          ...event,
          dueDate: dayjs(event.dueDate)
        });
      }
      setLoading(false);
    };

    setTimeout(loadRiskEvent, 500);
  }, [id, form]);

  const handleBack = () => {
    navigate('/profiles/service?tab=actions');
  };

  const handleUpdateRiskEvent = async (values: any) => {
    try {
      // 模拟更新API调用
      const updatedEvent = {
        ...riskEvent!,
        ...values,
        dueDate: values.dueDate.format('YYYY-MM-DD'),
        updatedAt: new Date().toISOString()
      };
      setRiskEvent(updatedEvent);
      setEditModalVisible(false);
      message.success('风险事件信息已更新');
    } catch (error) {
      message.error('更新失败，请重试');
    }
  };

  const handleLaunchPlaybook = async (values: any) => {
    try {
      // 模拟启动剧本API调用
      message.success(`已启动剧本: ${values.playbookId}`);
      setPlaybookModalVisible(false);
      
      // 添加处理日志
      const newLog: ProcessLog = {
        id: `log${Date.now()}`,
        timestamp: dayjs().format('YYYY-MM-DD HH:mm'),
        action: '启动处理剧本',
        operator: '王芳',
        details: `启动剧本: ${values.playbookId}`,
        type: 'success'
      };
      setProcessLogs(prev => [newLog, ...prev]);
    } catch (error) {
      message.error('启动剧本失败，请重试');
    }
  };

  const handleAddActionPlan = async (values: any) => {
    try {
      const newAction: ActionPlan = {
        id: `ap${Date.now()}`,
        ...values,
        dueDate: values.dueDate.format('YYYY-MM-DD'),
        status: 'pending'
      };
      setActionPlans(prev => [...prev, newAction]);
      setActionPlanModalVisible(false);
      actionForm.resetFields();
      message.success('行动计划已添加');
    } catch (error) {
      message.error('添加失败，请重试');
    }
  };

  const handleUpdateActionStatus = (actionId: string, status: ActionPlan['status']) => {
    setActionPlans(prev => 
      prev.map(action => 
        action.id === actionId ? { ...action, status } : action
      )
    );
    message.success('状态已更新');
  };

  const handleResolveRisk = () => {
    Modal.confirm({
      title: '确认解决风险事件',
      content: '确定要将此风险事件标记为已解决吗？',
      onOk: () => {
        setRiskEvent(prev => prev ? { ...prev, status: '已解决' } : null);
        message.success('风险事件已解决');
        
        // 添加处理日志
        const newLog: ProcessLog = {
          id: `log${Date.now()}`,
          timestamp: dayjs().format('YYYY-MM-DD HH:mm'),
          action: '风险事件解决',
          operator: '王芳',
          details: '风险事件已成功解决，客户问题得到妥善处理',
          type: 'success'
        };
        setProcessLogs(prev => [newLog, ...prev]);
      }
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'red';
      case 'high': return 'orange';
      case 'medium': return 'gold';
      case 'low': return 'green';
      default: return 'default';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'critical': return '紧急';
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return severity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已解决': return 'success';
      case '处理中': return 'processing';
      case '待处理': return 'warning';
      case '已关闭': return 'default';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'default';
    }
  };

  const getActionStatusIcon = (status: ActionPlan['status']) => {
    switch (status) {
      case 'completed': return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'in_progress': return <PlayCircleOutlined style={{ color: '#1890ff' }} />;
      case 'pending': return <ClockCircleOutlined style={{ color: '#faad14' }} />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: '#f5f5f5'
      }}>
        <Spin size="large" tip="正在加载风险事件详情..." />
      </div>
    );
  }

  if (!riskEvent) {
    return <div>风险事件不存在</div>;
  }

  return (
    <div style={{ padding: '32px 40px', background: '#f5f5f5', minHeight: '100vh' }}>
      {/* 头部导航 */}
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        <Button 
          type="text"
          icon={<ArrowLeftOutlined />} 
          onClick={handleBack}
          style={{
            padding: '4px 8px',
            height: 'auto',
            marginTop: '4px',
            color: '#666',
            fontSize: '14px'
          }}
        >
          返回
        </Button>
        <div style={{ flex: 1 }}>
          <Title level={2} style={{ margin: 0, color: '#262626', fontWeight: '600' }}>
            持续服务/关键动作/风险事件详情
          </Title>
          <Text type="secondary" style={{ fontSize: '14px', marginTop: '4px', display: 'block' }}>
            识别、分析和处理客户服务过程中的风险事件，确保服务质量和客户满意度
          </Text>
        </div>
      </div>

      <Row gutter={[24, 24]}>
        {/* 左侧主要内容 */}
        <Col span={16}>
          {/* 基本信息卡片 */}
          <Card 
            title={
              <Space>
                <ExclamationCircleOutlined style={{ color: getSeverityColor(riskEvent.severity) }} />
                风险事件信息
              </Space>
            }
            extra={
              <Space>
                <Button icon={<EditOutlined />} onClick={() => setEditModalVisible(true)}>
                  编辑
                </Button>
                {riskEvent.status !== '已解决' && (
                  <Button type="primary" onClick={handleResolveRisk}>
                    标记为已解决
                  </Button>
                )}
              </Space>
            }
            style={{ marginBottom: '24px' }}
          >
            <Descriptions column={2}>
              <Descriptions.Item label="事件ID">{riskEvent.id}</Descriptions.Item>
              <Descriptions.Item label="客户名称">
                <Text strong>{riskEvent.customerName}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="风险类型">
                <Tag color="blue">{riskEvent.riskType}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="严重程度">
                <Tag color={getSeverityColor(riskEvent.severity)}>
                  {getSeverityText(riskEvent.severity)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="当前状态">
                <Badge status={getStatusColor(riskEvent.status)} text={riskEvent.status} />
              </Descriptions.Item>
              <Descriptions.Item label="负责人">
                <Space>
                  <Avatar size="small" icon={<UserOutlined />} />
                  {riskEvent.assignedTo}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="截止日期">
                <Space>
                  <CalendarOutlined />
                  {dayjs(riskEvent.dueDate).format('YYYY-MM-DD')}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {dayjs(riskEvent.createdAt).format('YYYY-MM-DD HH:mm')}
              </Descriptions.Item>
            </Descriptions>
            
            <Divider />
            
            <div>
              <Text strong>风险描述：</Text>
              <Paragraph style={{ marginTop: '8px' }}>
                {riskEvent.description}
              </Paragraph>
            </div>

            {riskEvent.resolution && (
              <div style={{ marginTop: '16px' }}>
                <Text strong>解决方案：</Text>
                <Paragraph style={{ marginTop: '8px' }}>
                  {riskEvent.resolution}
                </Paragraph>
              </div>
            )}
          </Card>

          {/* 根因分析卡片 */}
          <Card 
            title={
              <Space>
                <BulbOutlined style={{ color: '#faad14' }} />
                根因分析
              </Space>
            }
            style={{ marginBottom: '24px' }}
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <div style={{ marginBottom: '16px' }}>
                  <Text strong>根本原因：</Text>
                  <Paragraph style={{ marginTop: '8px' }}>
                    {riskAnalysis.rootCause}
                  </Paragraph>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <Text strong>影响评估：</Text>
                  <Paragraph style={{ marginTop: '8px' }}>
                    {riskAnalysis.impactAssessment}
                  </Paragraph>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <Text strong>潜在损失：</Text>
                  <Paragraph style={{ marginTop: '8px' }}>
                    {riskAnalysis.potentialLoss}
                  </Paragraph>
                </div>
              </Col>
              <Col span={24}>
                <div>
                  <Text strong>影响领域：</Text>
                  <div style={{ marginTop: '8px' }}>
                    {riskAnalysis.affectedAreas.map(area => (
                      <Tag key={area} color="orange">{area}</Tag>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          </Card>

          {/* 行动计划卡片 */}
          <Card 
            title={
              <Space>
                <SettingOutlined style={{ color: '#1890ff' }} />
                行动计划
              </Space>
            }
            extra={
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setActionPlanModalVisible(true)}
              >
                添加计划
              </Button>
            }
            style={{ marginBottom: '24px' }}
          >
            <List
              dataSource={actionPlans}
              renderItem={(action) => (
                <List.Item
                  actions={[
                    <Select
                      value={action.status}
                      size="small"
                      onChange={(value) => handleUpdateActionStatus(action.id, value)}
                      style={{ width: 100 }}
                    >
                      <Option value="pending">待处理</Option>
                      <Option value="in_progress">进行中</Option>
                      <Option value="completed">已完成</Option>
                    </Select>
                  ]}
                >
                  <List.Item.Meta
                    avatar={getActionStatusIcon(action.status)}
                    title={
                      <Space>
                        <Text strong>{action.title}</Text>
                        <Tag color={getPriorityColor(action.priority)}>
                          {action.priority === 'high' ? '高优先级' : 
                           action.priority === 'medium' ? '中优先级' : '低优先级'}
                        </Tag>
                      </Space>
                    }
                    description={
                      <div>
                        <div style={{ marginBottom: '4px' }}>{action.description}</div>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          负责人: {action.assignee} • 截止: {action.dueDate}
                        </Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* 右侧边栏 */}
        <Col span={8}>
          {/* 关联剧本卡片 */}
          <Card 
            title={
              <Space>
                <PlayCircleOutlined style={{ color: '#52c41a' }} />
                关联剧本
              </Space>
            }
            extra={
              <Button 
                type="link" 
                size="small"
                onClick={() => setPlaybookModalVisible(true)}
              >
                启动剧本
              </Button>
            }
            style={{ marginBottom: '24px' }}
          >
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Text type="secondary">暂无关联剧本</Text>
              <div style={{ marginTop: '12px' }}>
                <Button 
                  type="primary" 
                  ghost
                  onClick={() => setPlaybookModalVisible(true)}
                >
                  启动风险处理剧本
                </Button>
              </div>
            </div>
          </Card>

          {/* 处理进度卡片 */}
          <Card 
            title={
              <Space>
                <HistoryOutlined style={{ color: '#722ed1' }} />
                处理进度
              </Space>
            }
            style={{ marginBottom: '24px' }}
          >
            <Steps
              direction="vertical"
              size="small"
              current={riskEvent.status === '已解决' ? 3 : riskEvent.status === '处理中' ? 2 : 1}
            >
              <Step title="风险识别" description="系统自动检测" />
              <Step title="分析评估" description="根因分析完成" />
              <Step title="制定方案" description="行动计划制定" />
              <Step title="执行处理" description="方案执行中" />
              <Step title="验证关闭" description="风险已解决" />
            </Steps>
          </Card>

          {/* 处理日志卡片 */}
          <Card 
            title={
              <Space>
                <FileTextOutlined style={{ color: '#13c2c2' }} />
                处理日志
              </Space>
            }
          >
            <Timeline
              items={processLogs.map(log => ({
                color: log.type === 'success' ? 'green' : 
                       log.type === 'warning' ? 'orange' : 
                       log.type === 'error' ? 'red' : 'blue',
                children: (
                  <div>
                    <div style={{ fontWeight: 500, marginBottom: '4px' }}>
                      {log.action}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                      {log.operator} • {log.timestamp}
                    </div>
                    <div style={{ fontSize: '12px', color: '#999' }}>
                      {log.details}
                    </div>
                  </div>
                )
              }))}
            />
          </Card>
        </Col>
      </Row>

      {/* 编辑风险事件模态框 */}
      <Modal
        title="编辑风险事件"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={() => form.submit()}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateRiskEvent}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="riskType"
                label="风险类型"
                rules={[{ required: true, message: '请输入风险类型' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="severity"
                label="严重程度"
                rules={[{ required: true, message: '请选择严重程度' }]}
              >
                <Select>
                  <Option value="low">低</Option>
                  <Option value="medium">中</Option>
                  <Option value="high">高</Option>
                  <Option value="critical">紧急</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="assignedTo"
                label="负责人"
                rules={[{ required: true, message: '请输入负责人' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dueDate"
                label="截止日期"
                rules={[{ required: true, message: '请选择截止日期' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="description"
            label="风险描述"
            rules={[{ required: true, message: '请输入风险描述' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="resolution"
            label="解决方案"
          >
            <TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 启动剧本模态框 */}
      <Modal
        title="启动处理剧本"
        open={playbookModalVisible}
        onCancel={() => setPlaybookModalVisible(false)}
        onOk={() => playbookForm.submit()}
        width={500}
      >
        <Form
          form={playbookForm}
          layout="vertical"
          onFinish={handleLaunchPlaybook}
        >
          <Form.Item
            name="playbookId"
            label="选择剧本"
            rules={[{ required: true, message: '请选择要启动的剧本' }]}
          >
            <Select placeholder="请选择剧本">
              {mockServicePlaybooks
                .filter(playbook => playbook.category === '风险处理')
                .map(playbook => (
                  <Option key={playbook.id} value={playbook.name}>
                    {playbook.name}
                  </Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            name="notes"
            label="备注"
          >
            <TextArea rows={3} placeholder="请输入启动剧本的备注信息" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 添加行动计划模态框 */}
      <Modal
        title="添加行动计划"
        open={actionPlanModalVisible}
        onCancel={() => setActionPlanModalVisible(false)}
        onOk={() => actionForm.submit()}
        width={600}
      >
        <Form
          form={actionForm}
          layout="vertical"
          onFinish={handleAddActionPlan}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                name="title"
                label="计划标题"
                rules={[{ required: true, message: '请输入计划标题' }]}
              >
                <Input placeholder="请输入行动计划标题" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="priority"
                label="优先级"
                rules={[{ required: true, message: '请选择优先级' }]}
              >
                <Select>
                  <Option value="high">高</Option>
                  <Option value="medium">中</Option>
                  <Option value="low">低</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="description"
            label="计划描述"
            rules={[{ required: true, message: '请输入计划描述' }]}
          >
            <TextArea rows={3} placeholder="请详细描述行动计划" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="assignee"
                label="负责人"
                rules={[{ required: true, message: '请输入负责人' }]}
              >
                <Input placeholder="请输入负责人姓名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dueDate"
                label="截止日期"
                rules={[{ required: true, message: '请选择截止日期' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default RiskEventDetail;