import React, { useMemo, useState } from 'react';
import { Button, Row, Col, Typography, Input, Select, Space, Table, Tag } from 'antd';
import { PlusOutlined, AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'umi';
import AgentCard from '../../components/agents/AgentCard';
import { mockAgents } from '../../mock/agentData';
import AgentCreateForm from '../../components/agents/AgentCreateForm';
import { mockKnowledgeBases, mockAgentSkills } from '../../mock/agentData';
import { AgentCreateFormData } from '../../types/agent';
import { message } from 'antd';
import AgentEditPage from './[id]/edit';
import AgentAnalyticsPage from './[id]/analytics';

const { Title } = Typography;

const AgentsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [searchText, setSearchText] = useState('');
  const [channelFilter, setChannelFilter] = useState<string | undefined>(undefined);

  const handleCreateAgent = () => {
    navigate('/ai-tools/consultant/new');
  };

  const handleSubmit = (data: AgentCreateFormData) => {
    // TODO: 实现创建Agent的API调用
    console.log('Creating agent with data:', data);
    
    // 模拟API调用成功
    message.success('分身创建成功！');
    navigate('/ai-tools/consultant');
  };

  const handleCancel = () => {
    navigate('/ai-tools/consultant');
  };

  // 根据当前路径决定显示什么内容
  const pathname = location.pathname;
  console.log('Current pathname:', pathname);
  
  // 确保所有渲染分支的 Hook 数量一致：
  // 提前计算 filteredAgents，避免在某些分支中少调用 useMemo 导致 Hook 次序不一致
  const filteredAgents = useMemo(() => {
    return mockAgents.filter((a) => {
      const matchName = a.name.includes(searchText) || a.role.includes(searchText);
      const matchChannel = channelFilter ? a.deployedChannels.includes(channelFilter as any) : true;
      return matchName && matchChannel;
    });
  }, [searchText, channelFilter]);
  
  // 如果是创建页面
  if (pathname === '/ai-tools/consultant/new') {
    return (
      <div style={{ 
        padding: '24px',
        background: '#fafafa',
        minHeight: 'calc(100vh - 120px)'
      }}>
        <div style={{ 
          maxWidth: '1000px', 
          margin: '0 auto'
        }}>
          {/* 页面标题和返回按钮 */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '24px',
            gap: '16px'
          }}>
            <Button 
              onClick={handleCancel}
              style={{ border: 'none', padding: 0 }}
            >
              返回
            </Button>
            <Title level={3} style={{ margin: 0, color: '#262626', fontSize: '18px' }}>
              创建新分身
            </Title>
          </div>

          {/* 创建表单 */}
          <AgentCreateForm
            allKnowledgeBases={mockKnowledgeBases}
            allAgentSkills={mockAgentSkills}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </div>
    );
  }

  // 如果是配置或分析页面
  const editMatch = pathname.match(/\/ai-tools\/consultant\/([^\/]+)\/edit/);
  const analyticsMatch = pathname.match(/\/ai-tools\/consultant\/([^\/]+)\/analytics/);
  
  if (editMatch || analyticsMatch) {
    const agentId = editMatch ? editMatch[1] : analyticsMatch![1];
    const isEdit = !!editMatch;
    const agent = mockAgents.find(a => a.id === agentId);
    
    if (!agent) {
      return <div>分身不存在</div>;
    }

    // 直接渲染对应的组件，传递必要的参数
    if (isEdit) {
      return <AgentEditPage agentId={agentId} />;
    } else {
      return <AgentAnalyticsPage agentId={agentId} />;
    }
  }

  

  const listColumns = [
    { title: '名称', dataIndex: 'name', key: 'name' },
    { title: '角色', dataIndex: 'role', key: 'role' },
    { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => <Tag>{s}</Tag> },
    { title: '服务客户', dataIndex: ['metrics','servedCustomers'], key: 'servedCustomers' },
    { title: '已解决', dataIndex: ['metrics','resolvedIssues'], key: 'resolvedIssues' },
    { title: '转人工率', key: 'escalationRate', render: (_: any, r: any) => `${Math.round(r.metrics.escalationRate*100)}%` },
    { title: '渠道', key: 'channels', render: (_: any, r: any) => r.deployedChannels.map((c: string) => <Tag key={c}>{c}</Tag>) },
    { title: '操作', key: 'actions', render: (_: any, r: any) => (
        <Space size="small">
          <Button size="small" onClick={() => navigate(`/ai-tools/consultant/${r.id}/edit`)}>配置</Button>
          <Button size="small" onClick={() => navigate(`/ai-tools/consultant/${r.id}/analytics`)}>分析</Button>
        </Space>
      ) },
  ];

  const channelOptions = [
    { label: '全部渠道', value: undefined },
    { label: 'web-chat', value: 'web-chat' },
    { label: 'wecom', value: 'wecom' },
    { label: 'lark', value: 'lark' },
  ];
  return (
    <div style={{ 
      padding: '24px',
      background: '#fafafa',
      minHeight: 'calc(100vh - 120px)'
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto'
      }}>
        {/* 搜索 / 筛选 / 视图切换 / 创建 */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '24px'
        }}>
          <Space size="middle" wrap>
            <Input 
              allowClear 
              placeholder="按名称/角色搜索" 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 220 }}
              size="middle"
            />
            <Select
              allowClear
              placeholder="按渠道筛选"
              value={channelFilter as any}
              onChange={(v) => setChannelFilter(v)}
              options={channelOptions as any}
              style={{ width: 180 }}
              size="middle"
            />
          </Space>

          <Space size="small">
            <Button 
              icon={<AppstoreOutlined />} 
              type={viewMode==='card' ? 'primary' : 'default'}
              size="middle"
              onClick={() => setViewMode('card')}
            />
            <Button 
              icon={<UnorderedListOutlined />} 
              type={viewMode==='list' ? 'primary' : 'default'}
              size="middle"
              onClick={() => setViewMode('list')}
            />
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              size="middle"
              onClick={handleCreateAgent}
              style={{ borderRadius: '6px', fontWeight: '500' }}
            >创建新分身</Button>
          </Space>
        </div>

        {viewMode === 'card' ? (
          <Row gutter={[16, 16]}>
            {filteredAgents.map((agent) => (
              <Col key={agent.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                <AgentCard agent={agent} />
              </Col>
            ))}
          </Row>
        ) : (
          <Table
            rowKey="id"
            size="small"
            pagination={{ pageSize: 8 }}
            dataSource={filteredAgents}
            columns={listColumns as any}
            style={{ background: '#fff', borderRadius: 8 }}
          />
        )}

        {/* 空状态 */}
        {mockAgents.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '80px 20px',
            color: '#999'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>🤖</div>
            <Title level={3} style={{ color: '#666', marginBottom: '16px' }}>
              还没有创建任何分身
            </Title>
            <p style={{ fontSize: '16px', color: '#999', marginBottom: '32px' }}>
              点击右上角的"创建新分身"按钮开始创建您的第一个AI助手
            </p>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={handleCreateAgent}
              size="large"
              style={{ 
                height: '48px',
                borderRadius: '6px',
                fontWeight: '500'
              }}
            >
              创建第一个分身
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentsPage;
