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
import { useNavigate, useParams, useLocation } from 'umi';
import { mockCustomerHandovers, mockCRMSyncData, mockStakeholders, mockOnboardingTasks, mockInternalComments } from '../../../mock/handoverData';
import { CustomerHandover, Stakeholder, OnboardingTask, InternalComment } from '../../../types/handover';

import HandoverDetailHeader from '../../../components/handover/HandoverDetailHeader';
import StakeholderOrgChart from '../../../components/handover/StakeholderOrgChart';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;

// 页签样式
const tabStyles = {
  tabBar: {
    margin: 0,
    backgroundColor: '#fff',
    borderBottom: '1px solid #f0f0f0',
    padding: '0 24px'
  },
  tab: {
    padding: '16px 32px',
    margin: '0',
    border: 'none',
    background: 'transparent',
    transition: 'all 0.3s ease',
    textAlign: 'center'
  },
  tabActive: {
    background: '#fff',
    borderBottom: '2px solid #1890ff'
  },
  tabBtn: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#666',
    transition: 'color 0.3s ease',
    whiteSpace: 'nowrap'
  },
  tabBtnActive: {
    color: '#1890ff',
    fontWeight: 600
  }
};

const HandoverDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  
  // 添加自定义样式来强制标签页均匀分布
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .ant-tabs-nav-list {
        width: 100% !important;
        display: flex !important;
      }
      .ant-tabs-tab {
        min-width: 80px !important;
        max-width: none !important;
        text-align: left !important;
        margin: 0 8px 0 0 !important;
        flex-shrink: 0 !important;
      }
      .ant-tabs-tab-btn {
        width: 100% !important;
        text-align: left !important;
        white-space: nowrap !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const [loading, setLoading] = useState(true);
  const [handoverData, setHandoverData] = useState<CustomerHandover | null>(null);
  const [onboardingTasks, setOnboardingTasks] = useState<OnboardingTask[]>([]);
  const [internalComments, setInternalComments] = useState<InternalComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [analysisData, setAnalysisData] = useState({
    painPoints: '',
    successCriteria: '',
    risks: '',
  });

  // 解析 URL 中的默认 tab，并保持与 URL 同步
  const searchParams = new URLSearchParams(location.search);
  const defaultTab = searchParams.get('tab') || 'action-plan';
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab') || 'action-plan';
    setActiveTab(tab);
  }, [location.search]);

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
          setStakeholders(data.stakeholders || mockStakeholders);
          
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
          navigate('/profiles/handover-implementation');
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
      navigate('/profiles/handover-implementation');
    }, 50);
  };

  // 处理新建议
  const handleNewSuggestion = () => {
    message.success('已创建"新建议"草稿');
  };

  // 处理编辑
  const handleEdit = () => {
    message.info('编辑功能开发中...');
  };

  // 处理查看合同
  const handleViewContract = () => {
    message.info('查看合同功能开发中...');
  };

  // 处理分享
  const handleShare = () => {
    message.info('分享功能开发中...');
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

  // 处理干系人更新
  const handleStakeholderUpdate = (updatedStakeholder: Stakeholder) => {
    setStakeholders(prev => 
      prev.map(s => s.id === updatedStakeholder.id ? updatedStakeholder : s)
    );
  };

  // 处理干系人添加
  const handleStakeholderAdd = (newStakeholder: Stakeholder) => {
    setStakeholders(prev => [...prev, newStakeholder]);
  };

  // 处理干系人删除
  const handleStakeholderDelete = (id: string) => {
    setStakeholders(prev => prev.filter(s => s.id !== id));
  };

  if (loading) {
    return (
      <div style={{ 
        padding: '24px', 
        textAlign: 'center',
        background: '#f5f5f5',
        minHeight: 'calc(100vh - 120px)',
        paddingBottom: '60px' // 为footer留出底部间距
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
        minHeight: 'calc(100vh - 120px)',
        paddingBottom: '60px' // 为footer留出底部间距
      }}>
        <div>未找到客户交接记录</div>
      </div>
    );
  }

  // 状态标签颜色映射
  const statusColorMap = {
    normal: 'green',
    not_handover: 'orange',
    risk: 'red'
  };

  const statusTextMap = {
    normal: '正常交接',
    not_handover: '未交接',
    risk: '有风险'
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
  const ORG_CHART_HEIGHT = 560;

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
        minHeight: 'calc(100vh - 120px)',
        paddingBottom: '60px' // 为footer留出底部间距
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
        
        {/* 新设计的头部组件 */}
        <div style={{ marginBottom: '24px' }}>
          <HandoverDetailHeader
            handoverData={handoverData}
            onBack={handleBack}
            onEdit={handleEdit}
            onViewContract={handleViewContract}
            onShare={handleShare}
          />
        </div>
        {/* 主要内容区域 */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
        }}>
          <Tabs
            activeKey={activeTab}
            onChange={(key) => {
              setActiveTab(key as string);
              // 同步到 URL（不新增历史记录）
              const params = new URLSearchParams(location.search);
              params.set('tab', String(key));
              navigate(`${location.pathname}?${params.toString()}`, { replace: true });
            }}
            style={{
              margin: 0
            }}
            tabBarStyle={{
              margin: 0,
              backgroundColor: '#fff',
              borderBottom: '1px solid #f0f0f0',
              padding: '0 24px'
            }}
            size="large"
            type="line"
            items={[
            {
              key: 'action-plan',
              label: '行动计划',
              children: (
                <div style={{ padding: '24px' }}>
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
              key: 'basic-info',
              label: '基础信息',
              children: (
                <div style={{ padding: '24px' }}>
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
                      <Descriptions.Item label="合同金额">
                        <Text strong style={{ color: '#1890ff' }}>¥{handoverData.crmData?.contractAmount?.toLocaleString() || '0'}</Text>
                      </Descriptions.Item>
                      <Descriptions.Item label="服务周期">{handoverData.crmData?.servicePeriod || '未知'}</Descriptions.Item>
                      <Descriptions.Item label="购买账号数">
                        <Text strong style={{ color: '#52c41a' }}>{handoverData.crmData?.accountCount || '0'} 个</Text>
                      </Descriptions.Item>
                      <Descriptions.Item label="已购产品" span={2}>
                        {handoverData.crmData?.purchasedProducts?.map((p, i) => (
                          <Tag key={i} color="blue" style={{ marginBottom: 4 }}>{p}</Tag>
                        )) || '暂无产品信息'}
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                  <Card title="销售来源信息" size="small" style={{ borderRadius: '8px' }}>
                    <Descriptions column={2} size="small">
                      <Descriptions.Item label="销售类型">
                        <Tag color={handoverData.crmData?.salesSource === 'direct' ? 'blue' : 'green'}>
                          {handoverData.crmData?.salesSource === 'direct' ? '直营' : handoverData.crmData?.salesSource === 'channel' ? '渠道' : '直营'}
                        </Tag>
                      </Descriptions.Item>
                      {handoverData.crmData?.salesSource === 'direct' && (
                        <Descriptions.Item label="销售人员">
                          <Text strong>{handoverData.crmData?.salesPerson || '未知'}</Text>
                        </Descriptions.Item>
                      )}
                      {handoverData.crmData?.salesSource === 'channel' && (
                        <Descriptions.Item label="渠道合作伙伴">
                          <Text strong>{handoverData.crmData?.channelPartner || '未知'}</Text>
                        </Descriptions.Item>
                      )}
                    </Descriptions>
                    <div style={{ marginTop: '16px' }}>
                      <Text strong style={{ display: 'block', marginBottom: '8px' }}>销售备注</Text>
                      <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '6px', border: '1px solid #e8e8e8' }}>
                        <Text>{handoverData.crmData?.salesNotes || '暂无备注'}</Text>
                      </div>
                    </div>
                  </Card>
                </div>
              )
            },
            {
              key: 'expectation-alignment',
              label: '期望对齐',
              children: (
                <div style={{ padding: '24px' }}>
                  <Card title="期望对齐状态" size="small" style={{ marginBottom: '16px', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div>
                        <Text type="secondary" style={{ fontSize: '12px' }}>对齐状态</Text>
                        <div style={{ marginTop: '4px' }}>
                          <Tag color={handoverData.expectationAlignment === 'aligned' ? 'green' : handoverData.expectationAlignment === 'partially_aligned' ? 'gold' : 'red'} style={{ fontSize: '14px', padding: '4px 12px' }}>
                            {handoverData.expectationAlignment === 'aligned' ? '已对齐' : handoverData.expectationAlignment === 'partially_aligned' ? '部分对齐' : '未对齐'}
                          </Tag>
                        </div>
                      </div>
                      <div>
                        <Text type="secondary" style={{ fontSize: '12px' }}>档案完整度</Text>
                        <div style={{ marginTop: '4px' }}>
                          <Progress 
                            percent={handoverData.expectationAlignment === 'aligned' ? 100 : handoverData.expectationAlignment === 'partially_aligned' ? 60 : 30} 
                            size="small" 
                            showInfo={false}
                            strokeColor={handoverData.expectationAlignment === 'aligned' ? '#52c41a' : handoverData.expectationAlignment === 'partially_aligned' ? '#faad14' : '#ff4d4f'}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                  <Card title="核心痛点与期望" style={{ marginBottom: '16px', borderRadius: '8px' }} size="small">
                    <TextArea
                      value={analysisData.painPoints}
                      onChange={(e) => setAnalysisData(prev => ({ ...prev, painPoints: e.target.value }))}
                      rows={3}
                      placeholder="请输入客户的核心痛点和期望..."
                    />
                  </Card>
                  <Card title="成功标准" style={{ marginBottom: '16px', borderRadius: '8px' }} size="small">
                    <TextArea
                      value={analysisData.successCriteria}
                      onChange={(e) => setAnalysisData(prev => ({ ...prev, successCriteria: e.target.value }))}
                      rows={3}
                      placeholder="请输入补充的成功标准..."
                    />
                  </Card>
                </div>
              )
            },
            {
              key: 'stakeholders',
              label: '干系人',
              children: (
                <div style={{ padding: '24px' }}>
                  <Row gutter={16}>
                    <Col span={16}>
                      <StakeholderOrgChart
                        stakeholders={stakeholders}
                        onStakeholderUpdate={handleStakeholderUpdate}
                        onStakeholderAdd={handleStakeholderAdd}
                        onStakeholderDelete={handleStakeholderDelete}
                        chartHeight={ORG_CHART_HEIGHT}
                      />
                    </Col>
                    <Col span={8}>
                      <Card title="关键联系人" size="small" style={{ borderRadius: '8px' }}>
                        <div style={{ height: ORG_CHART_HEIGHT, overflow: 'auto' }}>
                          {handoverData.crmData?.keyContacts && handoverData.crmData.keyContacts.length > 0 ? (
                            handoverData.crmData.keyContacts.map((contact, index) => (
                              <div key={index} style={{ marginBottom: '12px', padding: '12px', background: '#f8f9fa', borderRadius: '6px', border: '1px solid #e8e8e8' }}>
                                <Text>{contact}</Text>
                              </div>
                            ))
                          ) : (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                              暂无关键联系人信息
                            </div>
                          )}
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </div>
              )
            },
            {
              key: 'risks-opportunities',
              label: '风险与商机',
              children: (
                <div style={{ padding: '24px' }}>
                  <Card title="风险提示" size="small" style={{ marginBottom: '16px', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                      <div>
                        <Text type="secondary" style={{ fontSize: '12px' }}>风险等级</Text>
                        <div style={{ marginTop: '4px' }}>
                          <Tag color={riskColorMap[handoverData.riskLevel]} style={{ fontSize: '14px', padding: '4px 12px' }}>
                            {riskTextMap[handoverData.riskLevel]}
                          </Tag>
                        </div>
                      </div>
                      <div>
                        <Text type="secondary" style={{ fontSize: '12px' }}>风险评分</Text>
                        <div style={{ marginTop: '4px' }}>
                          <Progress 
                            percent={handoverData.riskLevel === 'high' ? 90 : handoverData.riskLevel === 'medium' ? 60 : 30} 
                            size="small" 
                            showInfo={false}
                            strokeColor={riskColorMap[handoverData.riskLevel]}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <Text strong style={{ display: 'block', marginBottom: '8px' }}>风险详情</Text>
                      <TextArea
                        value={analysisData.risks}
                        onChange={(e) => setAnalysisData(prev => ({ ...prev, risks: e.target.value }))}
                        rows={3}
                        placeholder="请输入风险详情..."
                      />
                    </div>
                  </Card>
                  <Card title="商机识别" size="small" style={{ marginBottom: '16px', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                      <div>
                        <Text type="secondary" style={{ fontSize: '12px' }}>商机等级</Text>
                        <div style={{ marginTop: '4px' }}>
                          <Tag color="green" style={{ fontSize: '14px', padding: '4px 12px' }}>
                            高潜力
                          </Tag>
                        </div>
                      </div>
                      <div>
                        <Text type="secondary" style={{ fontSize: '12px' }}>预估价值</Text>
                        <div style={{ marginTop: '4px' }}>
                          <Text strong style={{ color: '#52c41a' }}>¥50,000</Text>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Text strong style={{ display: 'block', marginBottom: '8px' }}>商机描述</Text>
                      <TextArea
                        rows={3}
                        placeholder="请输入潜在的商机和扩展机会..."
                      />
                    </div>
                  </Card>
                  <Card title="服务历史" size="small" style={{ borderRadius: '8px' }}>
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
                </div>
              )
            }
            ]}
          />
        </div>
      </div>
      

    </div>
    </>
  );
};

export default HandoverDetailPage;

