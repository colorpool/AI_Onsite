'use client';

import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Typography, 
  Button, 
  DatePicker, 
  Select,
  Table,
  Progress,
  Avatar,
  Space,
  Tag,
  Divider
} from 'antd';
import { 
  ArrowLeftOutlined, 
  UserOutlined, 
  MessageOutlined, 
  CheckCircleOutlined, 
  ExclamationCircleOutlined,
  RiseOutlined,
  FallOutlined,
  ClockCircleOutlined,
  TrophyOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from 'umi';
import { mockAgents } from '../../../mock/agentData';
import { Agent } from '../../../types/agent';
import type { Dayjs } from 'dayjs';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface AgentAnalyticsPageProps {
  agentId?: string;
}

const AgentAnalyticsPage: React.FC<AgentAnalyticsPageProps> = ({ agentId }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [timeRange, setTimeRange] = useState('7d');
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);

  // 优先使用props中的agentId，如果没有则使用params中的id
  const currentAgentId = agentId || params.id;

  useEffect(() => {
    // 模拟从API获取Agent数据
    const foundAgent = mockAgents.find(a => a.id === currentAgentId);
    if (foundAgent) {
      setAgent(foundAgent);
    } else {
      navigate('/ai-tools/consultant');
    }
  }, [currentAgentId, navigate]);

  // 模拟分析数据
  const analyticsData = {
    totalConversations: 1247,
    avgResponseTime: 2.3,
    satisfactionScore: 4.6,
    resolutionRate: 0.89,
    escalationRate: 0.05,
    activeHours: 18.5,
    peakHours: ['09:00-11:00', '14:00-16:00'],
    topIssues: [
      { issue: '数据看板配置', count: 156, percentage: 25 },
      { issue: '权限设置', count: 89, percentage: 14 },
      { issue: '报表生成', count: 67, percentage: 11 },
      { issue: '数据导入', count: 45, percentage: 7 },
      { issue: '系统集成', count: 34, percentage: 5 },
    ],
    channelStats: [
      { channel: '网页聊天', conversations: 789, satisfaction: 4.7 },
      { channel: '企业微信', conversations: 458, satisfaction: 4.5 },
    ],
    dailyStats: [
      { date: '2024-01-15', conversations: 45, resolved: 42, escalated: 3 },
      { date: '2024-01-16', conversations: 52, resolved: 48, escalated: 4 },
      { date: '2024-01-17', conversations: 38, resolved: 35, escalated: 3 },
      { date: '2024-01-18', conversations: 61, resolved: 57, escalated: 4 },
      { date: '2024-01-19', conversations: 49, resolved: 46, escalated: 3 },
      { date: '2024-01-20', conversations: 55, resolved: 52, escalated: 3 },
      { date: '2024-01-21', conversations: 42, resolved: 40, escalated: 2 },
    ]
  };

  const handleCancel = () => {
    navigate('/ai-tools/consultant');
  };

  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '对话数',
      dataIndex: 'conversations',
      key: 'conversations',
      sorter: (a: any, b: any) => a.conversations - b.conversations,
    },
    {
      title: '已解决',
      dataIndex: 'resolved',
      key: 'resolved',
      render: (text: number, record: any) => (
        <span style={{ color: '#52c41a' }}>{text}</span>
      ),
    },
    {
      title: '转人工',
      dataIndex: 'escalated',
      key: 'escalated',
      render: (text: number, record: any) => (
        <span style={{ color: '#faad14' }}>{text}</span>
      ),
    },
    {
      title: '解决率',
      key: 'resolutionRate',
      render: (_: any, record: any) => (
        <Progress 
          percent={Math.round((record.resolved / record.conversations) * 100)} 
          size="small" 
          status="active"
        />
      ),
    },
  ];

  // 无过渡加载页，直接展示轻量提示
  if (!agent) {
    return (
      <div style={{ padding: '24px', background: '#fafafa', minHeight: 'calc(100vh - 120px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', gap: '16px' }}>
            <Button onClick={() => navigate('/ai-tools/consultant')} style={{ border: 'none', padding: 0 }}>
              返回
            </Button>
            <Title level={3} style={{ margin: 0, color: '#262626', fontSize: '18px' }}>
              分析
            </Title>
          </div>
          <Card style={{ borderRadius: '8px', border: '1px solid #f0f0f0' }}>
            <div style={{ color: '#999' }}>未找到分身数据，请返回列表重试。</div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '24px',
      background: '#fafafa',
      minHeight: 'calc(100vh - 120px)'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto'
      }}>
        {/* 页面标题和操作按钮 */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '24px',
          gap: '16px'
        }}>
          <Button 
            icon={<ArrowLeftOutlined />}
            onClick={handleCancel}
            style={{ border: 'none', padding: 0 }}
          >
            返回
          </Button>
          <div style={{ flex: 1 }}>
            <Title level={3} style={{ margin: 0, color: '#262626', fontSize: '18px' }}>
              分身分析 - {agent.role}
            </Title>
            <Text type="secondary" style={{ fontSize: '13px' }}>深入了解分身的表现和客户互动情况</Text>
          </div>
          <Space>
            <Select
              value={timeRange}
              onChange={setTimeRange}
              style={{ width: 120 }}
              options={[
                { label: '最近7天', value: '7d' },
                { label: '最近30天', value: '30d' },
                { label: '最近90天', value: '90d' },
              ]}
            />
            <RangePicker 
              value={dateRange}
              onChange={(dates) => setDateRange(dates)}
            />
          </Space>
        </div>

        {/* 关键指标卡片 */}
        <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="总对话数"
                value={analyticsData.totalConversations}
                prefix={<MessageOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="平均响应时间"
                value={analyticsData.avgResponseTime}
                suffix="秒"
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="满意度评分"
                value={analyticsData.satisfactionScore}
                suffix="/5"
                prefix={<TrophyOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="问题解决率"
                value={analyticsData.resolutionRate * 100}
                suffix="%"
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
        </Row>

        {/* 详细分析 */}
        <Row gutter={[24, 24]}>
          {/* 渠道统计 */}
          <Col xs={24} lg={12}>
            <Card title="渠道表现" style={{ height: '100%' }}>
              {analyticsData.channelStats.map((stat, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: index < analyticsData.channelStats.length - 1 ? '1px solid #f0f0f0' : 'none'
                }}>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{stat.channel}</div>
                    <div style={{ color: '#666', fontSize: '12px' }}>
                      {stat.conversations} 次对话
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold', color: '#faad14' }}>
                      {stat.satisfaction}/5
                    </div>
                    <div style={{ color: '#666', fontSize: '12px' }}>满意度</div>
                  </div>
                </div>
              ))}
            </Card>
          </Col>

          {/* 热门问题 */}
          <Col xs={24} lg={12}>
            <Card title="热门问题类型" style={{ height: '100%' }}>
              {analyticsData.topIssues.map((issue, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: index < analyticsData.topIssues.length - 1 ? '1px solid #f0f0f0' : 'none'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold' }}>{issue.issue}</div>
                    <div style={{ color: '#666', fontSize: '12px' }}>
                      {issue.count} 次咨询
                    </div>
                  </div>
                  <div style={{ width: '100px', marginLeft: '16px' }}>
                    <Progress 
                      percent={issue.percentage} 
                      size="small" 
                      showInfo={false}
                    />
                    <div style={{ textAlign: 'center', fontSize: '12px', color: '#666' }}>
                      {issue.percentage}%
                    </div>
                  </div>
                </div>
              ))}
            </Card>
          </Col>
        </Row>

        {/* 每日统计表格 */}
        <Card title="每日详细统计" style={{ marginTop: '24px' }}>
          <Table
            columns={columns}
            dataSource={analyticsData.dailyStats}
            pagination={false}
            size="small"
            rowKey="date"
          />
        </Card>

        {/* 性能洞察 */}
        <Card title="性能洞察" style={{ marginTop: '24px' }}>
          <Row gutter={[24, 16]}>
            <Col xs={24} md={8}>
              <div style={{ 
                background: '#f6ffed', 
                padding: '16px', 
                borderRadius: '6px',
                border: '1px solid #b7eb8f'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <RiseOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>表现优秀</Text>
                </div>
                <Text type="secondary">
                  响应时间保持在2.3秒以内，客户满意度达到4.6分
                </Text>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div style={{ 
                background: '#fff7e6', 
                padding: '16px', 
                borderRadius: '6px',
                border: '1px solid #ffd591'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <ExclamationCircleOutlined style={{ color: '#faad14', marginRight: '8px' }} />
                  <Text strong>需要关注</Text>
                </div>
                <Text type="secondary">
                  转人工率为5%，建议优化知识库覆盖范围
                </Text>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div style={{ 
                background: '#e6f7ff', 
                padding: '16px', 
                borderRadius: '6px',
                border: '1px solid #91d5ff'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <ClockCircleOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
                  <Text strong>活跃时段</Text>
                </div>
                <Text type="secondary">
                  工作日9-11点和14-16点为咨询高峰期
                </Text>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default AgentAnalyticsPage;
