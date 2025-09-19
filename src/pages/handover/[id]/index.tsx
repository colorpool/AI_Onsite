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
import { getPurchasedProducts } from '../../../mock/continuousServiceData';
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
    padding: '8px 24px',
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
  // 已删除：该样式会影响 Tabs 的默认布局，造成样式问题
  // useEffect(() => {
  //   const style = document.createElement('style');
  //   style.textContent = `
  //     .ant-tabs-nav-list {
  //       width: 100% !important;
  //       display: flex !important;
  //     }
  //     .ant-tabs-tab {
  //       min-width: 80px !important;
  //       max-width: none !important;
  //       text-align: left !important;
  //       margin: 0 8px 0 0 !important;
  //       flex-shrink: 0 !important;
  //     }
  //     .ant-tabs-tab-btn {
  //       width: 100% !important;
  //       text-align: left !important;
  //       white-space: nowrap !important;
  //     }
  //   `;
  //   document.head.appendChild(style);
  //   return () => {
  //     document.head.removeChild(style);
  //   };
  // }, []);
  const [loading, setLoading] = useState(true);
  const [handoverData, setHandoverData] = useState<CustomerHandover | null>(null);
  const [onboardingTasks, setOnboardingTasks] = useState<OnboardingTask[]>([]);
  const [internalComments, setInternalComments] = useState<InternalComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [selectedStakeholder, setSelectedStakeholder] = useState<Stakeholder | null>(null);
  const [analysisData, setAnalysisData] = useState({
    painPoints: '',
    successCriteria: '',
    risks: '',
    shortTermExpectation: '',
    longTermExpectation: '',
    unacceptableSituations: '',
    customerSuccessCriteria: '',
  });

  // 风险勾选状态
  const [riskChecked, setRiskChecked] = useState({
    leadership: false,
    unclear_needs: false,
    high_expectations: false,
    tight_schedule: false,
    difficult_contact: false,
    other_risks: false
  });

  // 商机勾选状态
  const [opportunityChecked, setOpportunityChecked] = useState({
    account_expansion: false,
    version_upgrade: false,
    new_modules: false,
    referrals: false,
    long_term: false,
    other_opportunities: false
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
        
        // 根据客户ID查找交接记录（ID格式：0001 -> CUST-0001）
        const customerId = `CUST-${id?.padStart(4, '0')}`;
        const data = mockCustomerHandovers.find(item => item.customerId === customerId);
        console.log('查找客户ID:', customerId, '找到的数据:', data);
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
            shortTermExpectation: data.shortTermExpectation || '',
            longTermExpectation: data.longTermExpectation || '',
            unacceptableSituations: data.unacceptableSituations || '',
            customerSuccessCriteria: data.customerSuccessCriteria || '',
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
        padding: '32px 40px', 
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
        padding: '32px 40px', 
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
    pending_handover: 'orange',
    handover_in_progress: 'blue',
    pending_implementation: 'purple',
    implementation_in_progress: 'green'
  };

  const statusTextMap = {
    pending_handover: '待交接',
    handover_in_progress: '交接中',
    pending_implementation: '待实施',
    implementation_in_progress: '实施中'
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
        padding: '32px 40px',
        background: '#f5f5f5',
        minHeight: 'calc(100vh - 120px)',
        paddingBottom: '60px' // 为footer留出底部间距
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
                  <Row gutter={16}>
                    <Col span={12}>
                      {/* Onboarding行动计划 */}
                      <Card 
                        title="Onboarding行动计划" 
                        style={{ borderRadius: '8px', height: '260px' }} 
                        size="small"
                        extra={
                          <Button 
                            type="primary" 
                            size="small"
                            disabled={!onboardingTasks.every(task => task.completed) || !!handoverData?.deliveredAt}
                            onClick={() => {
                              const now = new Date().toISOString();
                              setHandoverData(prev => prev ? { ...prev, deliveredAt: now, handoverStatus: 'completed' as any } : null);
                              message.success('交付完成确认成功！交接记录已标记为已完成');
                            }}
                          >
                            {handoverData?.deliveredAt ? '已交付完成' : '确认交付完成'}
                          </Button>
                        }
                      >
                        <div style={{ padding: '8px 0', height: '180px', overflowY: 'auto' }}>
                          {onboardingTasks.map((task) => (
                            <div key={task.id} style={{ marginBottom: '12px' }}>
                              <Checkbox checked={task.completed} onChange={() => handleTaskToggle(task.id)}>
                                <span style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#999' : '#1890ff', fontSize: '14px', fontWeight: '500' }}>
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
                          
                          {handoverData?.deliveredAt && (
                            <div style={{ 
                              marginTop: '16px', 
                              padding: '12px', 
                              backgroundColor: '#f6ffed', 
                              border: '1px solid #b7eb8f', 
                              borderRadius: '6px' 
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <CheckCircleOutlined style={{ color: '#52c41a' }} />
                                <Text style={{ color: '#52c41a', fontWeight: '500' }}>
                                  交付完成时间: {new Date(handoverData.deliveredAt).toLocaleString()}
                                </Text>
                              </div>
                            </div>
                          )}
                        </div>
                      </Card>
                    </Col>
                    <Col span={12}>
                      {/* 服务历史 */}
                      <Card 
                        title="服务历史" 
                        style={{ borderRadius: '8px', height: '260px' }} 
                        size="small"
                      >
                        <div style={{ height: '180px', overflowY: 'auto', overflowX: 'hidden', paddingTop: '8px' }}>
                          <Timeline mode="left">
                            <Timeline.Item label={handoverData.createdAt}><span style={{ color: '#52c41a', fontWeight: '500' }}>创建交接记录</span></Timeline.Item>
                            {onboardingTasks
                              .filter(t => t.completed)
                              .map(t => (
                                <Timeline.Item key={t.id} color="green"><span style={{ color: '#52c41a', fontWeight: '500' }}>完成任务：{t.title}</span></Timeline.Item>
                              ))}
                            <Timeline.Item label={handoverData.updatedAt} color="blue"><span style={{ color: '#1890ff', fontWeight: '500' }}>最近一次更新</span></Timeline.Item>
                          </Timeline>
                        </div>
                      </Card>
                    </Col>
                  </Row>

                  {/* 近期协作动态 */}
                  <Card title={<span style={{ color: '#eb2f96', fontWeight: '600' }}>近期协作动态</span>} style={{ marginTop: '24px', marginBottom: '16px', borderRadius: '8px' }} size="small">
                    <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                      {internalComments.slice(0, 5).map((comment) => (
                        <div key={comment.id} style={{ padding: '6px 0', borderBottom: '1px solid #f0f0f0' }}>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3px' }}>
                            <Avatar icon={<UserOutlined />} size={20} style={{ marginRight: '6px' }} />
                            <span style={{ fontWeight: 500, fontSize: '13px' }}>{comment.author}</span>
                            <span style={{ color: '#999', marginLeft: '6px', fontSize: '11px' }}>{comment.createdAt}</span>
                          </div>
                          <div style={{ fontSize: '13px', lineHeight: '1.4' }}>{comment.content}</div>
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
                  <Card title={<span style={{ color: '#1890ff', fontWeight: '600' }}>基本信息</span>} size="small" style={{ marginBottom: '16px', borderRadius: '8px' }}>
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
                  <Card title={<span style={{ color: '#52c41a', fontWeight: '600' }}>CRM信息</span>} size="small" style={{ marginBottom: '16px', borderRadius: '8px' }}>
                    <Descriptions column={2} size="small">
                      <Descriptions.Item label="合同金额">
                        <Text strong style={{ color: '#1890ff' }}>¥{handoverData.crmData?.contractAmount?.toLocaleString() || '0'}</Text>
                      </Descriptions.Item>
                      <Descriptions.Item label="服务周期">{handoverData.crmData?.servicePeriod || '未知'}</Descriptions.Item>
                      <Descriptions.Item label="购买账号数">
                        <Text strong style={{ color: '#52c41a' }}>{handoverData.crmData?.accountCount || '0'} 个</Text>
                      </Descriptions.Item>
                      <Descriptions.Item label="已购产品" span={2}>
                        {getPurchasedProducts(handoverData.customerId).products.map((p, i) => (
                          <Tag key={i} color="blue" style={{ marginBottom: 4 }}>{p}</Tag>
                        ))}
                      </Descriptions.Item>
                      <Descriptions.Item label="增值服务" span={2}>
                        {getPurchasedProducts(handoverData.customerId).services.map((s, i) => (
                          <Tag key={i} color="orange" style={{ marginBottom: 4 }}>{s}</Tag>
                        ))}
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                  <Card title={<span style={{ color: '#722ed1', fontWeight: '600' }}>销售来源信息</span>} size="small" style={{ borderRadius: '8px' }}>
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
                        onStakeholderSelect={setSelectedStakeholder}
                        chartHeight={ORG_CHART_HEIGHT}
                      />
                    </Col>
                    <Col span={8}>
                      <Card title={<span style={{ color: '#fa8c16', fontWeight: '600' }}>干系人详情</span>} size="small" style={{ borderRadius: '8px' }}>
                        <div style={{ height: ORG_CHART_HEIGHT, overflow: 'auto' }}>
                          {selectedStakeholder ? (
                            <div style={{ padding: '16px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <Avatar icon={<UserOutlined />} size="large" />
                                <div>
                                  <div style={{ fontWeight: 500, fontSize: '16px', marginBottom: '4px' }}>
                                    {selectedStakeholder.name}
                                  </div>
                                  <div style={{ color: '#666', fontSize: '14px' }}>
                                    {selectedStakeholder.position}
                                  </div>
                                </div>
                              </div>
                              
                              <Descriptions column={1} size="small" style={{ marginBottom: '16px' }}>
                                <Descriptions.Item label="重要性">
                                  <Tag color={selectedStakeholder.role === 'decision_maker' ? 'red' : selectedStakeholder.role === 'influencer' ? 'orange' : 'blue'}>
                                    {selectedStakeholder.role === 'decision_maker' ? '决策者' : 
                                     selectedStakeholder.role === 'influencer' ? '影响者' : 
                                     selectedStakeholder.role === 'user' ? '使用者' : '技术联系人'}
                                  </Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label="联系方式">
                                  {selectedStakeholder.contact}
                                </Descriptions.Item>
                                <Descriptions.Item label="状态">
                                  <Tag color={selectedStakeholder.status === 'active' ? 'green' : 'red'}>
                                    {selectedStakeholder.status === 'active' ? '在职' : '已离职'}
                                  </Tag>
                                </Descriptions.Item>
                              </Descriptions>
                              
                              {selectedStakeholder.history && selectedStakeholder.history.length > 0 && (
                                <div>
                                  <div style={{ fontWeight: 500, marginBottom: '8px', fontSize: '14px' }}>上次沟通记录</div>
                                  <Timeline>
                                    {selectedStakeholder.history.map((record, index) => (
                                      <Timeline.Item key={index}>
                                        <div style={{ fontSize: '12px' }}>
                                          <div>{record.startDate}{record.endDate ? ` ~ ${record.endDate}` : ''}</div>
                                          <div style={{ color: '#666' }}>{record.position}</div>
                                          {record.note && <div style={{ color: '#999', marginTop: '4px' }}>{record.note}</div>}
                                        </div>
                                      </Timeline.Item>
                                    ))}
                                  </Timeline>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div style={{ padding: '40px 20px', textAlign: 'center', color: '#999' }}>
                              <UserOutlined style={{ fontSize: '32px', marginBottom: '12px', display: 'block' }} />
                              <div>点击左侧干系人姓名查看详细信息</div>
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
                  <Card 
                    title={<span style={{ color: '#fa8c16' }}>风险类型 (可多选+补充说明)</span>} 
                    size="small" 
                    style={{ marginBottom: '16px', borderRadius: '8px', backgroundColor: '#ffffff' }}
                  >
                    <div style={{ marginBottom: '16px' }}>
                      <Checkbox 
                        checked={riskChecked.leadership}
                        onChange={(e) => setRiskChecked(prev => ({ ...prev, leadership: e.target.checked }))}
                      >
                        关键领导力缺失对接
                      </Checkbox>
                      {riskChecked.leadership && (
                        <div style={{ marginLeft: '24px', marginTop: '8px', marginBottom: '16px' }}>
                          <TextArea
                            placeholder="若勾选上项，请说明：反对领导姓名/职位、反对原因、当前协调进展，如：王总（运营总监）担心平台操作复杂，已安排1次demo演示"
                            rows={3}
                          />
                        </div>
                      )}
                    </div>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <Checkbox 
                        checked={riskChecked.unclear_needs}
                        onChange={(e) => setRiskChecked(prev => ({ ...prev, unclear_needs: e.target.checked }))}
                      >
                        客户需求场景不明确
                      </Checkbox>
                      {riskChecked.unclear_needs && (
                        <div style={{ marginLeft: '24px', marginTop: '8px', marginBottom: '16px' }}>
                          <TextArea
                             placeholder="若勾选上项，请说明：当前未明确的需求点、客户模糊表述，如：客户提到'要做员工培训'，但未明确培训内容/对象/频次"
                             rows={3}
                           />
                        </div>
                      )}
                    </div>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <Checkbox 
                        checked={riskChecked.high_expectations}
                        onChange={(e) => setRiskChecked(prev => ({ ...prev, high_expectations: e.target.checked }))}
                      >
                        客户对产品功能期待值过高
                      </Checkbox>
                      {riskChecked.high_expectations && (
                        <div style={{ marginLeft: '24px', marginTop: '8px', marginBottom: '16px' }}>
                          <TextArea
                             placeholder="若勾选上项，请说明：客户期待的未实现功能，已沟通的差异点，如：客户期待平台支持'自动生成培训计划'，已说明需要制定开发"
                             rows={3}
                           />
                        </div>
                      )}
                    </div>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <Checkbox 
                        checked={riskChecked.tight_schedule}
                        onChange={(e) => setRiskChecked(prev => ({ ...prev, tight_schedule: e.target.checked }))}
                      >
                        客户实施需求多/周期紧
                      </Checkbox>
                      {riskChecked.tight_schedule && (
                        <div style={{ marginLeft: '24px', marginTop: '8px', marginBottom: '16px' }}>
                          <TextArea
                            placeholder="若勾选上项，请说明：具体实施需求（如定制化配置、数据迁移）、客户要求的完成时间，如：要求1周内完成1000条工数据迁移，已协调技术团队支持"
                            rows={3}
                          />
                        </div>
                      )}
                    </div>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <Checkbox 
                        checked={riskChecked.difficult_contact}
                        onChange={(e) => setRiskChecked(prev => ({ ...prev, difficult_contact: e.target.checked }))}
                      >
                        对接人性格难接触
                      </Checkbox>
                      {riskChecked.difficult_contact && (
                        <div style={{ marginLeft: '24px', marginTop: '8px', marginBottom: '16px' }}>
                          <TextArea
                            placeholder="若勾选上项，请说明：对接人性格特点（如苛刻、敏感、他控制）、沟通建议，如：李经理（IT）过重细节，建议点对点线后体验"
                            rows={3}
                          />
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <Checkbox 
                        checked={riskChecked.other_risks}
                        onChange={(e) => setRiskChecked(prev => ({ ...prev, other_risks: e.target.checked }))}
                      >
                        其他风险
                      </Checkbox>
                      {riskChecked.other_risks && (
                        <div style={{ marginLeft: '24px', marginTop: '8px' }}>
                          <TextArea
                            placeholder="如：客户近期有人员变动，预算可能调整等，行业解决方案合作意向等"
                            rows={3}
                          />
                        </div>
                      )}
                    </div>
                  </Card>
                  
                  <Card 
                    title={<span style={{ color: '#52c41a' }}>潜在商机 (可多选+补充说明)</span>} 
                    size="small" 
                    style={{ borderRadius: '8px', backgroundColor: '#ffffff' }}
                  >
                    <div style={{ marginBottom: '16px' }}>
                      <Checkbox 
                        checked={opportunityChecked.account_expansion}
                        onChange={(e) => setOpportunityChecked(prev => ({ ...prev, account_expansion: e.target.checked }))}
                      >
                        账号增购可能
                      </Checkbox>
                      {opportunityChecked.account_expansion && (
                        <div style={{ marginLeft: '24px', marginTop: '8px', marginBottom: '16px' }}>
                          <TextArea
                            placeholder="若勾选上项，请说明：增购数点（如客户扩招、新部门推入）、预计增购数量/时间，如：客户Q3计划招50人，预计需增购50个账号，已同步优化改策"
                            rows={3}
                          />
                        </div>
                      )}
                    </div>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <Checkbox 
                        checked={opportunityChecked.version_upgrade}
                        onChange={(e) => setOpportunityChecked(prev => ({ ...prev, version_upgrade: e.target.checked }))}
                      >
                        版本升级需求
                      </Checkbox>
                      {opportunityChecked.version_upgrade && (
                        <div style={{ marginLeft: '24px', marginTop: '8px', marginBottom: '16px' }}>
                          <TextArea
                            placeholder="若勾选上项，请说明：客户需求的高级功能，当前版本不支持，可升级至专业版"
                            rows={3}
                          />
                        </div>
                      )}
                    </div>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <Checkbox 
                        checked={opportunityChecked.new_modules}
                        onChange={(e) => setOpportunityChecked(prev => ({ ...prev, new_modules: e.target.checked }))}
                      >
                        新增模块采购需求
                      </Checkbox>
                      {opportunityChecked.new_modules && (
                        <div style={{ marginLeft: '24px', marginTop: '8px', marginBottom: '16px' }}>
                          <TextArea
                             placeholder="若勾选上项，请说明：客户关注的模块、预算范围，如：客户对'直播培训模块'感兴趣，已提供详细介绍，预算在1万以内"
                             rows={3}
                           />
                        </div>
                      )}
                    </div>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <Checkbox 
                        checked={opportunityChecked.referrals}
                        onChange={(e) => setOpportunityChecked(prev => ({ ...prev, referrals: e.target.checked }))}
                      >
                        转介绍可能性
                      </Checkbox>
                      {opportunityChecked.referrals && (
                        <div style={{ marginLeft: '24px', marginTop: '8px', marginBottom: '16px' }}>
                          <TextArea
                             placeholder="若勾选上项，请说明：客户转介绍意愿，潜在推荐对象，如：客户负责人提到'同行XX公司也有培训需求'，已请客户协助对接"
                             rows={3}
                           />
                        </div>
                      )}
                    </div>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <Checkbox 
                        checked={opportunityChecked.long_term}
                        onChange={(e) => setOpportunityChecked(prev => ({ ...prev, long_term: e.target.checked }))}
                      >
                        长期合作（续费）意向
                      </Checkbox>
                      {opportunityChecked.long_term && (
                        <div style={{ marginLeft: '24px', marginTop: '8px', marginBottom: '16px' }}>
                          <TextArea
                             placeholder="若勾选上项，请说明：客户对当前服务的满意度，续费初步意向，如：客户表示'若合作愉快，明年会继续合作'，需重点关注体验"
                             rows={3}
                           />
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <Checkbox 
                        checked={opportunityChecked.other_opportunities}
                        onChange={(e) => setOpportunityChecked(prev => ({ ...prev, other_opportunities: e.target.checked }))}
                      >
                        其他商机
                      </Checkbox>
                      {opportunityChecked.other_opportunities && (
                        <div style={{ marginLeft: '24px', marginTop: '8px' }}>
                          <TextArea
                            placeholder="如：客户有定制化开发需求，行业解决方案合作意向等"
                            rows={3}
                          />
                        </div>
                      )}
                    </div>
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

