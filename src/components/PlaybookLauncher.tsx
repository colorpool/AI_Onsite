import React, { useState } from 'react';
import {
  Modal,
  Steps,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Card,
  Typography,
  Divider,
  Timeline,
  Tag,
  Alert,
  Space,
  Checkbox,
  Row,
  Col,
  message,
  Spin
} from 'antd';
import {
  PlayCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { ServicePlaybook, PlaybookExecution, Customer } from '../types/continuousService';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

interface PlaybookLauncherProps {
  visible: boolean;
  playbook: ServicePlaybook | null;
  customer?: Customer;
  onCancel: () => void;
  onLaunch: (execution: Partial<PlaybookExecution>) => Promise<void>;
  loading?: boolean;
}

interface LaunchForm {
  customerId: string;
  launchReason?: string;
  expectedEndDate?: dayjs.Dayjs;
  taskAssignments: Record<string, string>; // taskId -> assignee
  notes?: string;
}

const PlaybookLauncher: React.FC<PlaybookLauncherProps> = ({
  visible,
  playbook,
  customer,
  onCancel,
  onLaunch,
  loading = false
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm<LaunchForm>();
  const [confirmed, setConfirmed] = useState(false);

  // 重置状态
  const resetState = () => {
    setCurrentStep(0);
    setConfirmed(false);
    form.resetFields();
  };

  // 处理取消
  const handleCancel = () => {
    resetState();
    onCancel();
  };

  // 下一步
  const handleNext = async () => {
    if (currentStep === 0) {
      // 验证基本信息
      try {
        await form.validateFields(['customerId', 'launchReason']);
        setCurrentStep(1);
      } catch (error) {
        // 验证失败，不进行下一步
      }
    } else if (currentStep === 1) {
      // 验证任务分派
      try {
        await form.validateFields(['taskAssignments']);
        setCurrentStep(2);
      } catch (error) {
        // 验证失败，不进行下一步
      }
    }
  };

  // 上一步
  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  // 启动剧本
  const handleLaunch = async () => {
    if (!playbook || !confirmed) {
      message.warning('请确认所有信息无误后再启动');
      return;
    }

    try {
      const values = await form.validateFields();
      
      // 构建执行实例
      const execution: Partial<PlaybookExecution> = {
        playbookId: playbook.id,
        playbookName: playbook.name,
        customerId: values.customerId,
        customerName: customer?.name || '',
        status: 'pending',
        progress: 0,
        launchedBy: 'current_user', // 实际应用中应该从用户上下文获取
        launchType: 'manual',
        launchReason: values.launchReason,
        startedAt: dayjs().toISOString(),
        expectedEndAt: values.expectedEndDate?.toISOString() || dayjs().add(playbook.estimatedDuration, 'hour').toISOString(),
        notes: values.notes,
        taskExecutions: playbook.tasks.map(task => ({
          id: `exec_${task.id}_${Date.now()}`,
          executionId: '', // 会在后端生成
          taskId: task.id,
          taskTitle: task.title,
          status: 'pending',
          assignedTo: values.taskAssignments[task.id] || '',
          assignedAt: dayjs().toISOString(),
          dueDate: dayjs().add(task.dueOffset, 'day').toISOString(),
          checkpointResults: task.checkpoints.map(checkpoint => ({
            checkpointId: `cp_${checkpoint}_${Date.now()}`,
            description: checkpoint,
            completed: false
          })),
          createdAt: dayjs().toISOString(),
          updatedAt: dayjs().toISOString()
        })),
        createdAt: dayjs().toISOString(),
        updatedAt: dayjs().toISOString()
      };

      await onLaunch(execution);
      message.success('剧本启动成功！');
      resetState();
    } catch (error) {
      console.error('启动剧本失败:', error);
      message.error('启动剧本失败，请重试');
    }
  };

  // 获取默认负责人显示名称
  const getDefaultAssigneeName = (defaultAssignee: string, customAssignee?: string) => {
    if (defaultAssignee === 'custom' && customAssignee) {
      return customAssignee;
    }
    const assigneeMap: Record<string, string> = {
      'csm': 'CSM',
      'csm_manager': 'CSM经理',
      'support': '技术支持',
      'sales': '销售',
      'custom': '自定义'
    };
    return assigneeMap[defaultAssignee] || defaultAssignee;
  };

  if (!playbook) {
    return null;
  }

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <PlayCircleOutlined style={{ color: '#1890ff' }} />
          <span>启动剧本：{playbook.name}</span>
        </div>
      }
      open={visible}
      onCancel={handleCancel}
      width={900}
      footer={null}
      destroyOnClose
    >
      <Spin spinning={loading}>
        <Steps current={currentStep} style={{ marginBottom: 24 }}>
          <Step title="基本信息" icon={<FileTextOutlined />} />
          <Step title="任务分派" icon={<UserOutlined />} />
          <Step title="确认启动" icon={<CheckCircleOutlined />} />
        </Steps>

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            customerId: customer?.id || '',
            taskAssignments: playbook.tasks.reduce((acc, task) => {
              acc[task.id] = task.customAssignee || getDefaultAssigneeName(task.defaultAssignee);
              return acc;
            }, {} as Record<string, string>)
          }}
        >
          {/* 步骤1：基本信息 */}
          {currentStep === 0 && (
            <div>
              <Card title="剧本信息" style={{ marginBottom: 16 }}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>剧本名称：</Text>{playbook.name}
                  </Col>
                  <Col span={12}>
                    <Text strong>分类：</Text>{playbook.category}
                  </Col>
                  <Col span={12} style={{ marginTop: 8 }}>
                    <Text strong>预估耗时：</Text>{playbook.estimatedDuration}小时
                  </Col>
                  <Col span={12} style={{ marginTop: 8 }}>
                    <Text strong>成功率：</Text>{playbook.successRate}%
                  </Col>
                </Row>
                <Divider />
                <Paragraph>{playbook.description}</Paragraph>
                <Text strong>目标：</Text>
                <Paragraph>{playbook.goal}</Paragraph>
              </Card>

              <Card title="启动配置">
                <Form.Item
                  name="customerId"
                  label="目标客户"
                  rules={[{ required: true, message: '请选择目标客户' }]}
                >
                  <Select placeholder="选择客户" disabled={!!customer}>
                    {customer && (
                      <Option value={customer.id}>{customer.name}</Option>
                    )}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="launchReason"
                  label="启动原因"
                  rules={[{ required: true, message: '请输入启动原因' }]}
                >
                  <TextArea
                    rows={3}
                    placeholder="请描述启动此剧本的原因和背景"
                  />
                </Form.Item>

                <Form.Item
                  name="expectedEndDate"
                  label="预期完成时间"
                >
                  <DatePicker
                    showTime
                    style={{ width: '100%' }}
                    placeholder="选择预期完成时间"
                    disabledDate={(current) => current && current < dayjs().startOf('day')}
                  />
                </Form.Item>
              </Card>
            </div>
          )}

          {/* 步骤2：任务分派 */}
          {currentStep === 1 && (
            <div>
              <Alert
                message="任务分派"
                description="请为每个任务指定负责人。系统已根据剧本配置预设了默认负责人，您可以根据实际情况进行调整。"
                type="info"
                style={{ marginBottom: 16 }}
              />

              <Timeline>
                {playbook.tasks.map((task, index) => (
                  <Timeline.Item
                    key={task.id}
                    dot={<UserOutlined style={{ fontSize: '16px' }} />}
                    color={index === 0 ? 'blue' : 'gray'}
                  >
                    <Card size="small" style={{ marginBottom: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <Title level={5} style={{ margin: 0 }}>{task.title}</Title>
                          <Text type="secondary">{task.description}</Text>
                          <div style={{ marginTop: 8 }}>
                            <Tag color="blue">阶段: {task.phase}</Tag>
                            <Tag color="green">耗时: {task.duration}h</Tag>
                            <Tag color="orange">截止: {task.dueOffset}天</Tag>
                            {task.isOptional && <Tag color="purple">可选</Tag>}
                          </div>
                          {task.checkpoints.length > 0 && (
                            <div style={{ marginTop: 8 }}>
                              <Text strong>检查点：</Text>
                              <ul style={{ margin: '4px 0', paddingLeft: 20 }}>
                                {task.checkpoints.map((checkpoint, idx) => (
                                  <li key={idx}>{checkpoint}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        <div style={{ width: 200, marginLeft: 16 }}>
                          <Form.Item
                            name={['taskAssignments', task.id]}
                            label="负责人"
                            rules={[{ required: true, message: '请指定负责人' }]}
                            style={{ margin: 0 }}
                          >
                            <Input placeholder="输入负责人姓名" />
                          </Form.Item>
                        </div>
                      </div>
                    </Card>
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>
          )}

          {/* 步骤3：确认启动 */}
          {currentStep === 2 && (
            <div>
              <Alert
                message="确认启动"
                description="请仔细检查以下信息，确认无误后点击启动剧本。"
                type="warning"
                style={{ marginBottom: 16 }}
              />

              <Card title="启动信息确认" style={{ marginBottom: 16 }}>
                <Row gutter={[16, 8]}>
                  <Col span={8}>
                    <Text strong>剧本名称：</Text>
                  </Col>
                  <Col span={16}>
                    {playbook.name}
                  </Col>
                  <Col span={8}>
                    <Text strong>目标客户：</Text>
                  </Col>
                  <Col span={16}>
                    {customer?.name || form.getFieldValue('customerId')}
                  </Col>
                  <Col span={8}>
                    <Text strong>启动原因：</Text>
                  </Col>
                  <Col span={16}>
                    {form.getFieldValue('launchReason')}
                  </Col>
                  <Col span={8}>
                    <Text strong>预期完成：</Text>
                  </Col>
                  <Col span={16}>
                    {form.getFieldValue('expectedEndDate')?.format('YYYY-MM-DD HH:mm') || '系统自动计算'}
                  </Col>
                </Row>
              </Card>

              <Card title="任务分派确认">
                {playbook.tasks.map(task => {
                  const assignee = form.getFieldValue(['taskAssignments', task.id]);
                  return (
                    <div key={task.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                      <div>
                        <Text strong>{task.title}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {task.phase} • {task.duration}h • {task.dueOffset}天内完成
                        </Text>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <Text strong>{assignee}</Text>
                      </div>
                    </div>
                  );
                })}
              </Card>

              <Form.Item name="notes" label="备注" style={{ marginTop: 16 }}>
                <TextArea rows={3} placeholder="可选：添加执行备注" />
              </Form.Item>

              <div style={{ marginTop: 16 }}>
                <Checkbox
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                >
                  我已确认以上信息无误，同意启动此剧本
                </Checkbox>
              </div>
            </div>
          )}
        </Form>

        {/* 底部按钮 */}
        <div style={{ marginTop: 24, textAlign: 'right' }}>
          <Space>
            <Button onClick={handleCancel}>取消</Button>
            {currentStep > 0 && (
              <Button onClick={handlePrev}>上一步</Button>
            )}
            {currentStep < 2 && (
              <Button type="primary" onClick={handleNext}>
                下一步
              </Button>
            )}
            {currentStep === 2 && (
              <Button
                type="primary"
                icon={<PlayCircleOutlined />}
                onClick={handleLaunch}
                disabled={!confirmed}
                loading={loading}
              >
                启动剧本
              </Button>
            )}
          </Space>
        </div>
      </Spin>
    </Modal>
  );
};

export default PlaybookLauncher;