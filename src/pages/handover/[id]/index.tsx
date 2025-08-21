import React, { useState, useEffect } from 'react';
import { Helmet } from '@umijs/max';
import {
  Button,
  Typography,
  Card,
  Checkbox,
  Input,
  Space,
  Tag,
  Avatar,
  Divider,
  message,
  Collapse,
  Row,
  Col,
  Tabs,
  Descriptions,
  Timeline,
  Progress
} from 'antd';
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  EditOutlined,
  UserOutlined,
  DownOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams, history } from 'umi';
import { mockCustomerHandovers, mockCRMSyncData, mockStakeholders, mockOnboardingTasks, mockInternalComments } from '../../../mock/handoverData';
import { CustomerHandover, Stakeholder, OnboardingTask, InternalComment } from '../../../types/handover';
import Footer from '../../../components/Footer';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;

const HandoverDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [handoverData, setHandoverData] = useState<CustomerHandover | null>(null);
  const [onboardingTasks, setOnboardingTasks] = useState<OnboardingTask[]>([]);
  const [internalComments, setInternalComments] = useState<InternalComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [analysisData, setAnalysisData] = useState({
    painPoints: '',
    successCriteria: '',
    risks: '',
  });

  useEffect(() => {
    const loadData = async () => {
      console.log('详情页面加载，ID:', id);
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const data = mockCustomerHandovers.find(item => item.id === id);
        console.log('找到的数据:', data);
        if (data) {
          setHandoverData(data);
          setOnboardingTasks(data.onboardingTasks || mockOnboardingTasks);
          setInternalComments(data.internalComments || mockInternalComments);
          
          // 设置分析数据
          setAnalysisData({
            painPoints: data.corePainPoints || '客户对数据安全要求较高，需要满足行业合规标准。',
            successCriteria: data.successCriteria || '完成系统部署，用户培训，实现业务流程数字化。',
            risks: data.riskDetails || '客户技术团队经验不足，可能需要额外的技术支持。',
          });
          
          // 动态设置页面标题
          const title = `${data.customerName} - 客户交接详情`;
          document.title = title;
          
          // 触发tab标题更新
          setTimeout(() => {
            const event = new CustomEvent('tabTitleUpdate', {
              detail: { path: location.pathname, title }
            });
            window.dispatchEvent(event);
          }, 100);

        } else {
          console.log('未找到数据，ID:', id);
          message.error('未找到客户交接记录');
          navigate('/profiles/handover');
        }
      } catch (error) {
        console.error('加载数据失败:', error);
        message.error('加载数据失败');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, navigate]);

  // 处理返回
  const handleBack = () => {
    // 触发删除当前详情页tab的事件
    const event = new CustomEvent('tabClose', {
      detail: { path: location.pathname }
    });
    window.dispatchEvent(event);
    
    // 延迟导航，确保tab删除事件先处理
    setTimeout(() => {
      navigate('/profiles/handover');
    }, 50);
  };

  // 处理新建议
  const handleNewSuggestion = () => {
    message.success('已创建“新建议”草稿');
  };

  // 处理任务完成状态
  const handleTaskToggle = (taskId: string) => {
    const newTasks = onboardingTasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setOnboardingTasks(newTasks);
  };

  // 处理添加评论
  const handleAddComment = () => {
    if (!newComment.trim()) {
      message.warning('请输入评论内容');
      return;
    }

    const comment: InternalComment = {
      id: Date.now().toString(),
      content: newComment,
      author: 'CSM-小王',
      createdAt: new Date().toLocaleString('zh-CN'),
    };

    setInternalComments([comment, ...internalComments]);
    setNewComment('');
    message.success('评论已添加');
  };

  if (loading) {
    return (
      <div style={{ 
        padding: '24px', 
        textAlign: 'center',
        background: '#f5f5f5',
        minHeight: 'calc(100vh - 120px)'
      }}>
        <div>加载中...</div>
      </div>
    );
  }

  if (!handoverData) {
    return (
      <div style={{ 
        padding: '24px', 
        textAlign: 'center',
        background: '#f5f5f5',
        minHeight: 'calc(100vh - 120px)'
      }}>
        <div>未找到客户交接记录</div>
      </div>
    );
  }

  // 状态标签颜色映射
  const statusColorMap = {
    pending: 'orange',
    processing: 'blue',
    aligned: 'green',
    partially_aligned: 'gold'
  };

  const statusTextMap = {
    pending: '待处理',
    processing: '处理中',
    aligned: '已对齐',
    partially_aligned: '部分对齐'
  };

  const riskColorMap = {
    high: 'red',
    medium: 'orange',
    low: 'green'
  };

  const riskTextMap = {
    high: '高风险',
    medium: '中风险',
    low: '低风险'
  };

  return (
    <>
      <Helmet>
        <title>
          {handoverData ? `${handoverData.customerName} - 客户交接详情` : '客户交接详情'}
        </title>
      </Helmet>
      <div style={{
        padding: '24px',
        background: '#f5f5f5',
        minHeight: 'calc(100vh - 120px)'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
        
        {/* 档案头部 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '16px',
          background: '#fff',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
        }}>
          {/* 左侧：返回按钮和客户信息 */}
          <div style={{ flex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '16px',
              gap: '12px'
            }}>
              <Button
                onClick={handleBack}
                icon={<ArrowLeftOutlined />}
                style={{ border: 'none', padding: 0, color: '#666' }}
              >
                返回
              </Button>
            </div>
            
            <Title level={2} style={{ margin: 0, marginBottom: '16px', fontSize: '24px', fontWeight: 600 }}>
              {handoverData.customerName}
            </Title>
            
            <Space size="middle" wrap>
              <Tag color={statusColorMap[handoverData.handoverStatus]}>
                {statusTextMap[handoverData.handoverStatus]}
              </Tag>
              <Tag color={handoverData.hasRiskAlert ? 'orange' : 'default'}>
                风险提示: {handoverData.hasRiskAlert ? '有' : '无'}
              </Tag>
              <Tag color={handoverData.expectationAlignment === 'aligned' ? 'green' : 'orange'}>
                期望对齐: {handoverData.expectationAlignment === 'aligned' ? '已对齐' : '部分对齐'}
              </Tag>
            </Space>
          </div>
          
          {/* 右侧：操作按钮 */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button icon={<EditOutlined />}>
              编辑
            </Button>
            <Button type="primary" icon={<CheckCircleOutlined />} onClick={handleNewSuggestion}>
              新建议
            </Button>
          </div>
        </div>
        {/* Tabs导航 */}
        <Tabs
          defaultActiveKey="overview"
          items={[
            {
              key: 'overview',
              label: '交接概览',
              children: (
                <div>
                  {/* Onboarding行动计划 */}
                  <Card title="Onboarding行动计划" style={{ marginBottom: '16px', borderRadius: '8px' }} size="small">
                    <div style={{ padding: '8px 0' }}>
                      {onboardingTasks.map((task) => (
                        <div key={task.id} style={{ marginBottom: '12px' }}>
                          <Checkbox checked={task.completed} onChange={() => handleTaskToggle(task.id)}>
                            <span style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#999' : '#333', fontSize: '14px' }}>
                              {task.title}
                            </span>
                          </Checkbox>
                          {task.dueDate && (
                            <Text type="secondary" style={{ fontSize: '12px', marginLeft: '8px' }}>
                              {task.dueDate}
                            </Text>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* 核心痛点与期望 */}
                  <Card title="核心痛点与期望" style={{ marginBottom: '16px', borderRadius: '8px' }} size="small">
                    <TextArea
                      value={analysisData.painPoints}
                      onChange={(e) => setAnalysisData(prev => ({ ...prev, painPoints: e.target.value }))}
                      rows={3}
                      placeholder="请输入客户的核心痛点和期望..."
                    />
                  </Card>

                  {/* 附加成功标准 */}
                  <Card title="附加成功标准" style={{ marginBottom: '16px', borderRadius: '8px' }} size="small">
                    <TextArea
                      value={analysisData.successCriteria}
                      onChange={(e) => setAnalysisData(prev => ({ ...prev, successCriteria: e.target.value }))}
                      rows={3}
                      placeholder="请输入补充的成功标准..."
                    />
                  </Card>

                  {/* 近期协作动态 */}
                  <Card title="近期协作动态" style={{ marginBottom: '16px', borderRadius: '8px' }} size="small">
                    <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                      {internalComments.slice(0, 5).map((comment) => (
                        <div key={comment.id} style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                            <Avatar icon={<UserOutlined />} size={24} style={{ marginRight: '8px' }} />
                            <span style={{ fontWeight: 500 }}>{comment.author}</span>
                            <span style={{ color: '#999', marginLeft: '8px', fontSize: '12px' }}>{comment.createdAt}</span>
                          </div>
                          <div style={{ fontSize: '14px' }}>{comment.content}</div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* CRM同步信息 */}
                  <Card style={{ marginBottom: '16px', borderRadius: '8px' }} size="small">
                    <Collapse defaultActiveKey={[]} ghost expandIcon={({ isActive }) => (isActive ? <UpOutlined /> : <DownOutlined />)}>
                      <Panel header="CRM同步信息" key="crm">
                        <div style={{ padding: '8px 0' }}>
                          <div style={{ marginBottom: '20px' }}>
                            <Text strong style={{ display: 'block', marginBottom: '12px', color: '#333' }}>
                              合同信息
                            </Text>
                            <Row gutter={[16, 8]}>
                              <Col span={12}>
                                <Text type="secondary">合同金额:</Text>
                                <Text style={{ marginLeft: '8px' }}>¥{mockCRMSyncData.contractAmount}</Text>
                              </Col>
                              <Col span={12}>
                                <Text type="secondary">服务周期:</Text>
                                <Text style={{ marginLeft: '8px' }}>{mockCRMSyncData.servicePeriod}</Text>
                              </Col>
                            </Row>
                          </div>

                          <div style={{ marginBottom: '20px' }}>
                            <Text strong style={{ display: 'block', marginBottom: '12px', color: '#333' }}>
                              产品信息
                            </Text>
                            <div>
                              <Text type="secondary">已购产品:</Text>
                              <div style={{ marginTop: '8px' }}>
                                {mockCRMSyncData.purchasedProducts.map((product, index) => (
                                  <Tag key={index} color="blue" style={{ marginBottom: '4px' }}>
                                    {product}
                                  </Tag>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div style={{ marginBottom: '20px' }}>
                            <Text strong style={{ display: 'block', marginBottom: '12px', color: '#333' }}>
                              联系人信息
                            </Text>
                            <div>
                              <Text type="secondary">关键联系人:</Text>
                              <div style={{ marginTop: '8px' }}>
                                {mockCRMSyncData.keyContacts.map((contact, index) => (
                                  <div key={index} style={{ marginBottom: '8px', padding: '8px', background: '#f8f9fa', borderRadius: '4px' }}>
                                    <Text>{contact}</Text>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div>
                            <Text strong style={{ display: 'block', marginBottom: '12px', color: '#333' }}>
                              销售备注
                            </Text>
                            <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '4px' }}>
                              <Text>{mockCRMSyncData.salesNotes}</Text>
                            </div>
                          </div>
                        </div>
                      </Panel>
                    </Collapse>
                  </Card>

                  {/* 内部协作沟通 */}
                  <Card style={{ marginBottom: '16px', borderRadius: '8px' }} size="small">
                    <Collapse defaultActiveKey={[]} ghost expandIcon={({ isActive }) => (isActive ? <UpOutlined /> : <DownOutlined />)}>
                      <Panel header="内部协作沟通" key="communication">
                        <div style={{ padding: '8px 0' }}>
                          <div style={{ marginBottom: '20px' }}>
                            <TextArea placeholder="输入评论，支持@功能..." value={newComment} onChange={(e) => setNewComment(e.target.value)} rows={3} style={{ marginBottom: '8px' }} />
                            <Button type="primary" size="small" onClick={handleAddComment}>
                              发送评论
                            </Button>
                          </div>
                          <Divider style={{ margin: '16px 0' }} />
                          <div>
                            <Text strong style={{ display: 'block', marginBottom: '12px', color: '#333' }}>
                              历史评论
                            </Text>
                            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                              {internalComments.map((comment) => (
                                <div key={comment.id} style={{ marginBottom: '16px', padding: '12px', border: '1px solid #f0f0f0', borderRadius: '6px', background: '#fff' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                    <Avatar icon={<UserOutlined />} style={{ marginRight: '8px' }} />
                                    <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{comment.author}</span>
                                    <span style={{ color: '#999', marginLeft: '8px', fontSize: '12px' }}>{comment.createdAt}</span>
                                  </div>
                                  <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
                                    {comment.content}
                                    {comment.mentions && comment.mentions.length > 0 && (
                                      <div style={{ marginTop: '4px' }}>
                                        {comment.mentions.map(mention => (
                                          <Tag key={mention} color="blue">
                                            @{mention}
                                          </Tag>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Panel>
                    </Collapse>
                  </Card>
                </div>
              )
            },
            {
              key: 'health',
              label: '健康度监控',
              children: (
                <div>
                  <Card title="健康分趋势" style={{ marginBottom: '16px', borderRadius: '8px' }} size="small">
                    <div style={{ height: 180, background: 'linear-gradient(180deg, #e6f7ff, #fff)', border: '1px dashed #91d5ff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1890ff' }}>
                      折线图占位（健康分趋势）
                    </div>
                  </Card>
                  <Card title="活跃度分析" style={{ marginBottom: '16px', borderRadius: '8px' }} size="small">
                    <Row gutter={16}>
                      {[
                        { label: '登录', value: 76 },
                        { label: '访问页面', value: 58 },
                        { label: '功能使用', value: 42 },
                        { label: 'API调用', value: 30 },
                      ].map((m) => (
                        <Col xs={24} sm={12} key={m.label} style={{ marginBottom: 12 }}>
                          <div style={{ marginBottom: 6 }}>{m.label}</div>
                          <Progress percent={m.value} showInfo />
                        </Col>
                      ))}
                    </Row>
                  </Card>
                </div>
              )
            },
            {
              key: 'history',
              label: '服务历史',
              children: (
                <Card size="small" style={{ borderRadius: '8px' }}>
                  <Timeline mode="left">
                    <Timeline.Item label={handoverData.createdAt}>创建交接记录</Timeline.Item>
                    {onboardingTasks
                      .filter(t => t.completed)
                      .map(t => (
                        <Timeline.Item key={t.id} color="green">完成任务：{t.title}</Timeline.Item>
                      ))}
                    <Timeline.Item label={handoverData.updatedAt} color="blue">最近一次更新</Timeline.Item>
                  </Timeline>
                </Card>
              )
            },
            {
              key: 'info',
              label: '客户信息',
              children: (
                <div>
                  <Card title="基本信息" size="small" style={{ marginBottom: '16px', borderRadius: '8px' }}>
                    <Descriptions column={1} size="small">
                      <Descriptions.Item label="客户名称">{handoverData.customerName}</Descriptions.Item>
                      <Descriptions.Item label="交接状态">
                        <Tag color={statusColorMap[handoverData.handoverStatus]}>{statusTextMap[handoverData.handoverStatus]}</Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label="风险等级">
                        <Tag color={riskColorMap[handoverData.riskLevel]}>{riskTextMap[handoverData.riskLevel]}</Tag>
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                  <Card title="CRM信息" size="small" style={{ marginBottom: '16px', borderRadius: '8px' }}>
                    <Descriptions column={2} size="small">
                      <Descriptions.Item label="合同金额">¥{mockCRMSyncData.contractAmount}</Descriptions.Item>
                      <Descriptions.Item label="服务周期">{mockCRMSyncData.servicePeriod}</Descriptions.Item>
                      <Descriptions.Item label="已购产品" span={2}>
                        {mockCRMSyncData.purchasedProducts.map((p, i) => (
                          <Tag key={i} color="blue" style={{ marginBottom: 4 }}>{p}</Tag>
                        ))}
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                  <Card title="干系人信息" size="small" style={{ borderRadius: '8px' }}>
                    {(handoverData.stakeholders || []).map((s) => (
                      <div key={s.id} style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                        <Space>
                          <Avatar icon={<UserOutlined />} />
                          <span>{s.name}</span>
                          <Tag>{s.position}</Tag>
                          <Tag color="purple">{s.role}</Tag>
                          <span style={{ color: '#999' }}>{s.contact}</span>
                        </Space>
                      </div>
                    ))}
                  </Card>
                </div>
              )
            }
          ]}
        />
      </div>
      
      {/* 钉学科技Footer */}
      <Footer />
    </div>
    </>
  );
};

export default HandoverDetailPage;
