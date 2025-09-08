import React, { useState, useMemo } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Progress,
  Typography,
  Space,
  Tooltip,
  Badge,
  Divider,
  Timeline,
  Checkbox,
  Upload,
  message,
  Row,
  Col,
  Statistic,
  Alert
} from 'antd';
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
  EditOutlined,
  EyeOutlined,
  UploadOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';
import type {
  PlaybookExecution,
  PlaybookTaskExecution,
  PlaybookTaskStatus,
  CheckpointResult
} from '../types/continuousService';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface PlaybookTaskManagerProps {
  executions: PlaybookExecution[];
  onUpdateTaskStatus: (executionId: string, taskId: string, status: PlaybookTaskStatus, result?: string, notes?: string) => Promise<void>;
  onUpdateCheckpoint: (executionId: string, taskId: string, checkpointId: string, completed: boolean, notes?: string) => Promise<void>;
  onReassignTask: (executionId: string, taskId: string, newAssignee: string) => Promise<void>;
  loading?: boolean;
}

interface TaskFilter {
  status?: PlaybookTaskStatus;
  assignee?: string;
  execution?: string;
  overdue?: boolean;
}

const PlaybookTaskManager: React.FC<PlaybookTaskManagerProps> = ({
  executions,
  onUpdateTaskStatus,
  onUpdateCheckpoint,
  onReassignTask,
  loading = false
}) => {
  const [filter, setFilter] = useState<TaskFilter>({});
  const [selectedTask, setSelectedTask] = useState<PlaybookTaskExecution | null>(null);
  const [selectedExecution, setSelectedExecution] = useState<PlaybookExecution | null>(null);
  const [taskDetailVisible, setTaskDetailVisible] = useState(false);
  const [updateTaskVisible, setUpdateTaskVisible] = useState(false);
  const [form] = Form.useForm();

  // 获取所有任务的扁平化列表
  const allTasks = useMemo(() => {
    const tasks: (PlaybookTaskExecution & { execution: PlaybookExecution })[] = [];
    executions.forEach(execution => {
      execution.taskExecutions.forEach(task => {
        tasks.push({ ...task, execution });
      });
    });
    return tasks;
  }, [executions]);

  // 过滤任务
  const filteredTasks = useMemo(() => {
    return allTasks.filter(task => {
      if (filter.status && task.status !== filter.status) {
        return false;
      }
      if (filter.assignee && !task.assignedTo.toLowerCase().includes(filter.assignee.toLowerCase())) {
        return false;
      }
      if (filter.execution && task.execution.id !== filter.execution) {
        return false;
      }
      if (filter.overdue) {
        const isOverdue = dayjs().isAfter(dayjs(task.dueDate)) && task.status !== 'completed';
        if (!isOverdue) return false;
      }
      return true;
    });
  }, [allTasks, filter]);

  // 获取统计数据
  const statistics = useMemo(() => {
    const total = allTasks.length;
    const completed = allTasks.filter(t => t.status === 'completed').length;
    const inProgress = allTasks.filter(t => t.status === 'in_progress').length;
    const overdue = allTasks.filter(t => dayjs().isAfter(dayjs(t.dueDate)) && t.status !== 'completed').length;
    const pending = allTasks.filter(t => t.status === 'pending').length;
    
    return { total, completed, inProgress, overdue, pending };
  }, [allTasks]);

  // 获取状态颜色
  const getStatusColor = (status: PlaybookTaskStatus) => {
    switch (status) {
      case 'completed': return 'green';
      case 'in_progress': return 'blue';
      case 'overdue': return 'red';
      case 'pending': return 'orange';
      case 'skipped': return 'gray';
      default: return 'default';
    }
  };

  // 获取状态文本
  const getStatusText = (status: PlaybookTaskStatus) => {
    const statusMap = {
      'pending': '待开始',
      'in_progress': '进行中',
      'completed': '已完成',
      'overdue': '已逾期',
      'skipped': '已跳过'
    };
    return statusMap[status] || status;
  };

  // 检查是否逾期
  const isOverdue = (task: PlaybookTaskExecution) => {
    return dayjs().isAfter(dayjs(task.dueDate)) && task.status !== 'completed';
  };

  // 显示任务详情
  const showTaskDetail = (task: PlaybookTaskExecution & { execution: PlaybookExecution }) => {
    setSelectedTask(task);
    setSelectedExecution(task.execution);
    setTaskDetailVisible(true);
  };

  // 显示更新任务状态对话框
  const showUpdateTask = (task: PlaybookTaskExecution & { execution: PlaybookExecution }) => {
    setSelectedTask(task);
    setSelectedExecution(task.execution);
    form.setFieldsValue({
      status: task.status,
      result: task.result || '',
      notes: task.notes || ''
    });
    setUpdateTaskVisible(true);
  };

  // 更新任务状态
  const handleUpdateTask = async () => {
    if (!selectedTask || !selectedExecution) return;
    
    try {
      const values = await form.validateFields();
      await onUpdateTaskStatus(
        selectedExecution.id,
        selectedTask.taskId,
        values.status,
        values.result,
        values.notes
      );
      message.success('任务状态更新成功');
      setUpdateTaskVisible(false);
    } catch (error) {
      message.error('更新失败，请重试');
    }
  };

  // 更新检查点
  const handleUpdateCheckpoint = async (checkpointId: string, completed: boolean, notes?: string) => {
    if (!selectedTask || !selectedExecution) return;
    
    try {
      await onUpdateCheckpoint(
        selectedExecution.id,
        selectedTask.taskId,
        checkpointId,
        completed,
        notes
      );
      message.success('检查点更新成功');
    } catch (error) {
      message.error('更新失败，请重试');
    }
  };

  // 表格列定义
  const columns: ColumnsType<PlaybookTaskExecution & { execution: PlaybookExecution }> = [
    {
      title: '任务名称',
      dataIndex: 'taskTitle',
      key: 'taskTitle',
      width: 200,
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.execution.playbookName}
          </Text>
        </div>
      )
    },
    {
      title: '客户',
      dataIndex: ['execution', 'customerName'],
      key: 'customer',
      width: 120
    },
    {
      title: '负责人',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      width: 100,
      render: (text) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <UserOutlined />
          <span>{text}</span>
        </div>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status, record) => {
        const overdue = isOverdue(record);
        return (
          <Tag color={overdue ? 'red' : getStatusColor(status)}>
            {overdue ? '已逾期' : getStatusText(status)}
          </Tag>
        );
      }
    },
    {
      title: '截止时间',
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 120,
      render: (date, record) => {
        const overdue = isOverdue(record);
        return (
          <div style={{ color: overdue ? '#ff4d4f' : undefined }}>
            <CalendarOutlined style={{ marginRight: 4 }} />
            {dayjs(date).format('MM-DD HH:mm')}
          </div>
        );
      }
    },
    {
      title: '进度',
      key: 'progress',
      width: 120,
      render: (_, record) => {
        const completedCheckpoints = record.checkpointResults.filter(cp => cp.completed).length;
        const totalCheckpoints = record.checkpointResults.length;
        const progress = totalCheckpoints > 0 ? Math.round((completedCheckpoints / totalCheckpoints) * 100) : 0;
        
        return (
          <div>
            <Progress percent={progress} size="small" />
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {completedCheckpoints}/{totalCheckpoints} 检查点
            </Text>
          </div>
        );
      }
    },
    {
      title: '操作',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="查看详情">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => showTaskDetail(record)}
            />
          </Tooltip>
          <Tooltip title="更新状态">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => showUpdateTask(record)}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  return (
    <div>
      {/* 统计卡片 */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总任务数"
              value={statistics.total}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="已完成"
              value={statistics.completed}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="进行中"
              value={statistics.inProgress}
              prefix={<PlayCircleOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="已逾期"
              value={statistics.overdue}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 筛选器 */}
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col span={6}>
            <Select
              placeholder="筛选状态"
              value={filter.status}
              onChange={(value) => setFilter({ ...filter, status: value })}
              allowClear
              style={{ width: '100%' }}
            >
              <Option value="pending">待开始</Option>
              <Option value="in_progress">进行中</Option>
              <Option value="completed">已完成</Option>
              <Option value="overdue">已逾期</Option>
              <Option value="skipped">已跳过</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Input
              placeholder="筛选负责人"
              value={filter.assignee}
              onChange={(e) => setFilter({ ...filter, assignee: e.target.value })}
              allowClear
            />
          </Col>
          <Col span={6}>
            <Select
              placeholder="筛选剧本执行"
              value={filter.execution}
              onChange={(value) => setFilter({ ...filter, execution: value })}
              allowClear
              style={{ width: '100%' }}
            >
              {executions.map(exec => (
                <Option key={exec.id} value={exec.id}>
                  {exec.playbookName} - {exec.customerName}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={6}>
            <Space>
              <Checkbox
                checked={filter.overdue}
                onChange={(e) => setFilter({ ...filter, overdue: e.target.checked })}
              >
                仅显示逾期
              </Checkbox>
              <Button icon={<ReloadOutlined />} onClick={() => setFilter({})}>
                重置
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 任务表格 */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredTasks}
          rowKey={(record) => `${record.executionId}_${record.taskId}`}
          loading={loading}
          pagination={{
            pageSize: 20,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 个任务`
          }}
        />
      </Card>

      {/* 任务详情模态框 */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <FileTextOutlined />
            <span>任务详情</span>
          </div>
        }
        open={taskDetailVisible}
        onCancel={() => setTaskDetailVisible(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setTaskDetailVisible(false)}>
            关闭
          </Button>
        ]}
      >
        {selectedTask && selectedExecution && (
          <div>
            <Card title="基本信息" size="small" style={{ marginBottom: 16 }}>
              <Row gutter={[16, 8]}>
                <Col span={8}><Text strong>任务名称：</Text></Col>
                <Col span={16}>{selectedTask.taskTitle}</Col>
                <Col span={8}><Text strong>所属剧本：</Text></Col>
                <Col span={16}>{selectedExecution.playbookName}</Col>
                <Col span={8}><Text strong>目标客户：</Text></Col>
                <Col span={16}>{selectedExecution.customerName}</Col>
                <Col span={8}><Text strong>负责人：</Text></Col>
                <Col span={16}>{selectedTask.assignedTo}</Col>
                <Col span={8}><Text strong>状态：</Text></Col>
                <Col span={16}>
                  <Tag color={getStatusColor(selectedTask.status)}>
                    {getStatusText(selectedTask.status)}
                  </Tag>
                </Col>
                <Col span={8}><Text strong>截止时间：</Text></Col>
                <Col span={16}>{dayjs(selectedTask.dueDate).format('YYYY-MM-DD HH:mm')}</Col>
              </Row>
            </Card>

            {selectedTask.result && (
              <Card title="执行结果" size="small" style={{ marginBottom: 16 }}>
                <Paragraph>{selectedTask.result}</Paragraph>
              </Card>
            )}

            {selectedTask.notes && (
              <Card title="执行备注" size="small" style={{ marginBottom: 16 }}>
                <Paragraph>{selectedTask.notes}</Paragraph>
              </Card>
            )}

            <Card title="检查点进度" size="small">
              <Timeline>
                {selectedTask.checkpointResults.map((checkpoint, index) => (
                  <Timeline.Item
                    key={checkpoint.checkpointId}
                    dot={
                      checkpoint.completed ? (
                        <CheckCircleOutlined style={{ color: '#52c41a' }} />
                      ) : (
                        <ClockCircleOutlined style={{ color: '#d9d9d9' }} />
                      )
                    }
                    color={checkpoint.completed ? 'green' : 'gray'}
                  >
                    <div>
                      <Text strong={checkpoint.completed}>
                        {checkpoint.description}
                      </Text>
                      {checkpoint.completed && checkpoint.completedAt && (
                        <div>
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            完成时间: {dayjs(checkpoint.completedAt).format('YYYY-MM-DD HH:mm')}
                          </Text>
                        </div>
                      )}
                      {checkpoint.notes && (
                        <div style={{ marginTop: 4 }}>
                          <Text type="secondary">{checkpoint.notes}</Text>
                        </div>
                      )}
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card>
          </div>
        )}
      </Modal>

      {/* 更新任务状态模态框 */}
      <Modal
        title="更新任务状态"
        open={updateTaskVisible}
        onCancel={() => setUpdateTaskVisible(false)}
        onOk={handleUpdateTask}
        width={600}
      >
        {selectedTask && (
          <Form form={form} layout="vertical">
            <Alert
              message={`更新任务：${selectedTask.taskTitle}`}
              type="info"
              style={{ marginBottom: 16 }}
            />
            
            <Form.Item
              name="status"
              label="任务状态"
              rules={[{ required: true, message: '请选择任务状态' }]}
            >
              <Select>
                <Option value="pending">待开始</Option>
                <Option value="in_progress">进行中</Option>
                <Option value="completed">已完成</Option>
                <Option value="skipped">跳过</Option>
              </Select>
            </Form.Item>

            <Form.Item name="result" label="执行结果">
              <TextArea rows={4} placeholder="请描述任务执行结果" />
            </Form.Item>

            <Form.Item name="notes" label="备注">
              <TextArea rows={3} placeholder="可选：添加执行备注" />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default PlaybookTaskManager;