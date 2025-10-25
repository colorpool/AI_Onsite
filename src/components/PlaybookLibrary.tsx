import React, { useState, useMemo } from 'react';
import {
  Card,
  Input,
  Select,
  Space,
  Button,
  Tag,
  Typography,
  Modal,
  Descriptions,
  Timeline,
  Divider,
  Row,
  Col,
  Badge,
  Tooltip,
  Empty,
  message,
  Form
} from 'antd';
import {
  SearchOutlined,
  PlayCircleOutlined,
  EyeOutlined,
  FilterOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  FireOutlined,
  UserOutlined,
  FileTextOutlined,
  TagOutlined,
  PlusOutlined
} from '@ant-design/icons';
import type { ServicePlaybook, LifecycleStage, PlaybookStatus } from '../types/continuousService';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface PlaybookLibraryProps {
  playbooks: ServicePlaybook[];
  onLaunchPlaybook: (playbookId: string) => void;
  onAddPlaybook?: (playbook: Omit<ServicePlaybook, 'id' | 'createdAt' | 'updatedAt'>) => void;
  loading?: boolean;
}

interface PlaybookFilter {
  search?: string;
  category?: string;
  applicableStage?: LifecycleStage;
  status?: PlaybookStatus;
  scenarioTag?: string;
}

const PlaybookLibrary: React.FC<PlaybookLibraryProps> = ({
  playbooks,
  onLaunchPlaybook,
  onAddPlaybook,
  loading = false
}) => {
  const [filter, setFilter] = useState<PlaybookFilter>({});
  const [selectedPlaybook, setSelectedPlaybook] = useState<ServicePlaybook | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [addPlaybookModalVisible, setAddPlaybookModalVisible] = useState(false);
  const [form] = Form.useForm();

  // 获取所有分类和场景标签
  const categories = useMemo(() => {
    const cats = new Set(playbooks.map(p => p.category));
    return Array.from(cats);
  }, [playbooks]);

  const scenarioTags = useMemo(() => {
    const tags = new Set(playbooks.flatMap(p => p.scenarioTags || []));
    return Array.from(tags);
  }, [playbooks]);

  // 筛选剧本
  const filteredPlaybooks = useMemo(() => {
    return playbooks.filter(playbook => {
      if (filter.search && !playbook.name.toLowerCase().includes(filter.search.toLowerCase()) && 
          !playbook.description.toLowerCase().includes(filter.search.toLowerCase())) {
        return false;
      }
      if (filter.category && playbook.category !== filter.category) {
        return false;
      }
      if (filter.applicableStage && !playbook.applicableStage.includes(filter.applicableStage)) {
        return false;
      }
      if (filter.status && playbook.status !== filter.status) {
        return false;
      }
      if (filter.scenarioTag && !(playbook.scenarioTags || []).includes(filter.scenarioTag)) {
        return false;
      }
      return true;
    });
  }, [playbooks, filter]);

  // 处理启动剧本
  const handleLaunchPlaybook = (playbook: ServicePlaybook) => {
    onLaunchPlaybook(playbook.id);
    message.success(`已启动剧本：${playbook.name}`);
  };

  // 显示剧本详情
  const showPlaybookDetail = (playbook: ServicePlaybook) => {
    setSelectedPlaybook(playbook);
    setDetailModalVisible(true);
  };

  // 处理新增剧本
  const handleAddPlaybook = () => {
    form.validateFields().then(values => {
      const newPlaybook = {
        ...values,
        status: '可用' as PlaybookStatus,
        executionCount: 0,
        successRate: 0,
        avgDuration: 0,
        lastExecutedAt: null,
        tasks: values.tasks ? values.tasks.split('\n').filter((task: string) => task.trim()).map((task: string, index: number) => ({
          id: `task-${index}`,
          title: task.trim(),
          description: task.trim(),
          phase: '执行阶段',
          duration: 1,
          dueOffset: 1,
          checkpoints: []
        })) : []
      };
      
      if (onAddPlaybook) {
        onAddPlaybook(newPlaybook);
        message.success('服务剧本创建成功！');
        setAddPlaybookModalVisible(false);
        form.resetFields();
      }
    });
  };

  // 获取状态颜色
  const getStatusColor = (status: PlaybookStatus) => {
    switch (status) {
      case '可用': return 'green';
      case '维护中': return 'orange';
      case '已停用': return 'red';
      default: return 'default';
    }
  };

  // 获取阶段颜色
  const getStageColor = (stage: LifecycleStage) => {
    switch (stage) {
      case '成长期': return 'blue';
      case '成熟期': return 'green';
      case '衰退期': return 'orange';
      default: return 'default';
    }
  };

  return (
    <div>
      {/* 筛选器和新增按钮 */}
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="搜索剧本名称或描述"
              prefix={<SearchOutlined />}
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="选择分类"
              value={filter.category}
              onChange={(value) => setFilter({ ...filter, category: value })}
              allowClear
              style={{ width: '100%' }}
            >
              {categories.map(cat => (
                <Option key={cat} value={cat}>{cat}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="适用阶段"
              value={filter.applicableStage}
              onChange={(value) => setFilter({ ...filter, applicableStage: value })}
              allowClear
              style={{ width: '100%' }}
            >
              <Option value="成长期">成长期</Option>
              <Option value="成熟期">成熟期</Option>
              <Option value="衰退期">衰退期</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="状态"
              value={filter.status}
              onChange={(value) => setFilter({ ...filter, status: value })}
              allowClear
              style={{ width: '100%' }}
            >
              <Option value="可用">可用</Option>
              <Option value="维护中">维护中</Option>
              <Option value="已停用">已停用</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div style={{ display: 'flex', gap: 8 }}>
              <Select
                placeholder="场景标签"
                value={filter.scenarioTag}
                onChange={(value) => setFilter({ ...filter, scenarioTag: value })}
                allowClear
                style={{ flex: 1 }}
              >
                {scenarioTags.map(tag => (
                  <Option key={tag} value={tag}>{tag}</Option>
                ))}
              </Select>
              {onAddPlaybook && (
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setAddPlaybookModalVisible(true)}
                >
                  新增剧本
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Card>

      {/* 剧本列表 */}
      {filteredPlaybooks.length === 0 ? (
        <Empty description="暂无符合条件的剧本" />
      ) : (
        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))' }}>
          {filteredPlaybooks.map(playbook => (
            <Card
              key={playbook.id}
              style={{
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                border: '1px solid #f0f0f0',
                height: 'fit-content'
              }}
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <PlayCircleOutlined style={{ color: '#1890ff', fontSize: '18px' }} />
                  <span style={{ fontSize: '16px', fontWeight: '600' }}>{playbook.name}</span>
                </div>
              }
              extra={
                <Tag color={getStatusColor(playbook.status)} style={{ borderRadius: '6px' }}>
                  {playbook.status}
                </Tag>
              }
              actions={[
                <Button
                  key="detail"
                  icon={<EyeOutlined />}
                  onClick={() => showPlaybookDetail(playbook)}
                  style={{ borderRadius: '8px' }}
                >
                  查看详情
                </Button>,
                <Button
                  key="launch"
                  type="primary"
                  icon={<PlayCircleOutlined />}
                  onClick={() => handleLaunchPlaybook(playbook)}
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

              <div style={{ marginBottom: 12 }}>
                <Text strong>目标：</Text>
                <Paragraph ellipsis={{ rows: 2 }} style={{ margin: 0, marginTop: 4 }}>
                  {playbook.goal}
                </Paragraph>
              </div>

              {/* 适用阶段 */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
                {playbook.applicableStage.map(stage => (
                  <Tag key={stage} color={getStageColor(stage)} style={{ borderRadius: '6px' }}>
                    {stage}
                  </Tag>
                ))}
              </div>

              {/* 场景标签 */}
              {(playbook.scenarioTags || []).length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
                  {(playbook.scenarioTags || []).slice(0, 3).map(tag => (
                    <Tag key={tag} style={{ borderRadius: '6px', fontSize: '12px' }}>
                      {tag}
                    </Tag>
                  ))}
                  {(playbook.scenarioTags || []).length > 3 && (
                    <Tag style={{ borderRadius: '6px', fontSize: '12px' }}>+{(playbook.scenarioTags || []).length - 3}</Tag>
                  )}
                </div>
              )}

              <Divider style={{ margin: '12px 0' }} />

              {/* 统计信息 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#666' }}>
                <Tooltip title="预估耗时">
                  <span><ClockCircleOutlined /> {playbook.estimatedDuration}h</span>
                </Tooltip>
                <Tooltip title="成功率">
                  <span><TrophyOutlined /> {playbook.successRate}%</span>
                </Tooltip>
                <Tooltip title="使用次数">
                  <span><FireOutlined /> {playbook.usage}</span>
                </Tooltip>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* 剧本详情模态框 */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <PlayCircleOutlined style={{ color: '#1890ff' }} />
            <span>{selectedPlaybook?.name}</span>
            <Tag color={getStatusColor(selectedPlaybook?.status || '可用')}>
              {selectedPlaybook?.status}
            </Tag>
          </div>
        }
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        width={800}
        footer={[
          <Button key="cancel" onClick={() => setDetailModalVisible(false)}>
            关闭
          </Button>,
          <Button
            key="launch"
            type="primary"
            icon={<PlayCircleOutlined />}
            onClick={() => {
              if (selectedPlaybook) {
                handleLaunchPlaybook(selectedPlaybook);
                setDetailModalVisible(false);
              }
            }}
            disabled={selectedPlaybook?.status !== '可用'}
          >
            启动剧本
          </Button>
        ]}
      >
        {selectedPlaybook && (
          <div>
            <Descriptions column={2} style={{ marginBottom: 16 }}>
              <Descriptions.Item label="分类">{selectedPlaybook.category}</Descriptions.Item>
              <Descriptions.Item label="预估耗时">{selectedPlaybook.estimatedDuration}小时</Descriptions.Item>
              <Descriptions.Item label="成功率">{selectedPlaybook.successRate}%</Descriptions.Item>
              <Descriptions.Item label="使用次数">{selectedPlaybook.usage}次</Descriptions.Item>
              <Descriptions.Item label="创建人">{selectedPlaybook.createdBy}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{selectedPlaybook.createdAt}</Descriptions.Item>
            </Descriptions>

            <Divider orientation="left">剧本目标</Divider>
            <Paragraph>{selectedPlaybook.goal}</Paragraph>

            <Divider orientation="left">适用阶段</Divider>
            <div style={{ marginBottom: 16 }}>
              {selectedPlaybook.applicableStage.map(stage => (
                <Tag key={stage} color={getStageColor(stage)} style={{ marginBottom: 4 }}>
                  {stage}
                </Tag>
              ))}
            </div>

            {(selectedPlaybook.scenarioTags || []).length > 0 && (
              <>
                <Divider orientation="left">场景标签</Divider>
                <div style={{ marginBottom: 16 }}>
                  {(selectedPlaybook.scenarioTags || []).map(tag => (
                    <Tag key={tag} style={{ marginBottom: 4 }}>{tag}</Tag>
                  ))}
                </div>
              </>
            )}

            <Divider orientation="left">任务流程</Divider>
            <Timeline>
              {selectedPlaybook.tasks.map((task, index) => (
                <Timeline.Item
                  key={task.id}
                  dot={<UserOutlined style={{ fontSize: '16px' }} />}
                  color={index === 0 ? 'blue' : 'gray'}
                >
                  <div>
                    <Title level={5} style={{ margin: 0 }}>{task.title}</Title>
                    <Text type="secondary">{task.description}</Text>
                    <div style={{ marginTop: 8 }}>
                      <Tag color="blue">阶段: {task.phase}</Tag>
                      <Tag color="green">耗时: {task.duration}h</Tag>
                      <Tag color="orange">截止: {task.dueOffset}天</Tag>
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
                </Timeline.Item>
              ))}
            </Timeline>

            {selectedPlaybook.successMetrics && selectedPlaybook.successMetrics.length > 0 && (
              <>
                <Divider orientation="left">成功指标</Divider>
                <div>
                  {selectedPlaybook.successMetrics.map(metric => (
                    <Card key={metric.id} size="small" style={{ marginBottom: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <Text strong>{metric.name}</Text>
                          <br />
                          <Text type="secondary">{metric.description}</Text>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <Text strong style={{ fontSize: '16px' }}>
                            {metric.targetValue}{metric.unit}
                          </Text>
                          <br />
                          <Text type="secondary" style={{ fontSize: '12px' }}>目标值</Text>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {selectedPlaybook.resources && selectedPlaybook.resources.length > 0 && (
              <>
                <Divider orientation="left">相关资源</Divider>
                <div>
                  {selectedPlaybook.resources.map(resource => (
                    <Card key={resource.id} size="small" style={{ marginBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <FileTextOutlined />
                        <div>
                          <Text strong>{resource.name}</Text>
                          <br />
                          <Text type="secondary">{resource.description}</Text>
                          <div style={{ marginTop: 4 }}>
                            {resource.tags.map(tag => (
                              <Tag key={tag} style={{ fontSize: '12px' }}>{tag}</Tag>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </Modal>

      {/* 新增剧本模态框 */}
      <Modal
        title="新增服务剧本"
        open={addPlaybookModalVisible}
        onCancel={() => {
          setAddPlaybookModalVisible(false);
          form.resetFields();
        }}
        onOk={handleAddPlaybook}
        width={800}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="剧本名称" rules={[{ required: true, message: '请输入剧本名称' }]}>
                <Input placeholder="请输入剧本名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="category" label="剧本分类" rules={[{ required: true, message: '请选择剧本分类' }]}>
                <Select placeholder="请选择剧本分类">
                  <Option value="增购引导">增购引导</Option>
                  <Option value="风险挽回">风险挽回</Option>
                  <Option value="深度合作">深度合作</Option>
                  <Option value="产品培训">产品培训</Option>
                  <Option value="技术支持">技术支持</Option>
                  <Option value="客户关怀">客户关怀</Option>
                  <Option value="其他">其他</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="description" label="剧本描述" rules={[{ required: true, message: '请输入剧本描述' }]}>
            <TextArea rows={3} placeholder="请详细描述剧本的目标和适用场景" />
          </Form.Item>

          <Form.Item name="goal" label="剧本目标" rules={[{ required: true, message: '请输入剧本目标' }]}>
            <TextArea rows={2} placeholder="请描述剧本要达成的具体目标" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="applicableStage" label="适用阶段" rules={[{ required: true, message: '请选择适用阶段' }]}>
                <Select mode="multiple" placeholder="请选择适用阶段">
                  <Option value="成长期">成长期</Option>
                  <Option value="成熟期">成熟期</Option>
                  <Option value="衰退期">衰退期</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="estimatedDuration" label="预计执行时长（小时）" rules={[{ required: true, message: '请输入预计执行时长' }]}>
                <Input type="number" min={1} placeholder="请输入小时数" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="scenarioTags" label="场景标签">
            <Select mode="tags" placeholder="请输入或选择场景标签（可多选）">
              <Option value="健康度下降">健康度下降</Option>
              <Option value="使用率低">使用率低</Option>
              <Option value="续费风险">续费风险</Option>
              <Option value="增购机会">增购机会</Option>
              <Option value="产品升级">产品升级</Option>
              <Option value="技术问题">技术问题</Option>
              <Option value="客户投诉">客户投诉</Option>
              <Option value="定期回访">定期回访</Option>
            </Select>
          </Form.Item>

          <Form.Item name="triggerConditions" label="触发条件">
            <TextArea rows={2} placeholder="请描述剧本的自动触发条件（可选）" />
          </Form.Item>

          <Form.Item name="expectedOutcome" label="预期结果">
            <TextArea rows={2} placeholder="请描述执行剧本后的预期结果" />
          </Form.Item>

          <Form.Item name="tasks" label="任务清单">
            <TextArea rows={4} placeholder="请列出剧本包含的主要任务步骤，每行一个任务" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PlaybookLibrary;