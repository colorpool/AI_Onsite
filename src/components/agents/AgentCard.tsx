import React from 'react';
import { Card, Avatar, Button, Dropdown, Space, Statistic, Row, Col } from 'antd';
import { 
  UserOutlined, 
  CheckCircleOutlined, 
  ExclamationCircleOutlined,
  SettingOutlined,
  BarChartOutlined,
  MoreOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  DeleteOutlined,
  WechatOutlined,
  DingtalkOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { Agent } from '../../types/agent';
import AgentStatusBadge from './AgentStatusBadge';
import { useNavigate } from 'umi';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const navigate = useNavigate();

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'web-chat':
        return <GlobalOutlined style={{ color: '#1890ff' }} />;
      case 'wecom':
        return <WechatOutlined style={{ color: '#07c160' }} />;
      case 'lark':
        return <DingtalkOutlined style={{ color: '#00b96b' }} />;
      default:
        return <GlobalOutlined />;
    }
  };

  const handleConfigure = () => {
    navigate(`/ai-tools/consultant/${agent.id}/edit`);
  };

  const handleAnalytics = () => {
    navigate(`/ai-tools/consultant/${agent.id}/analytics`);
  };

  const handleToggleStatus = () => {
    // TODO: 实现状态切换逻辑
    console.log('Toggle status for agent:', agent.id);
  };

  const handleDelete = () => {
    // TODO: 实现删除逻辑
    console.log('Delete agent:', agent.id);
  };

  const moreMenuItems = [
    {
      key: 'toggle-status',
      icon: agent.status === 'running' ? <PauseCircleOutlined /> : <PlayCircleOutlined />,
      label: agent.status === 'running' ? '暂停' : '启动',
      onClick: handleToggleStatus,
    },
    {
      key: 'delete',
      icon: <DeleteOutlined />,
      label: '删除',
      danger: true,
      onClick: handleDelete,
    },
  ];

  return (
    <Card
      hoverable
      style={{ 
        height: '100%',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #f0f0f0',
        transition: 'all 0.3s ease'
      }}
      bodyStyle={{ 
        padding: '16px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* 顶部区域 */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
        <Avatar 
          size={40} 
          src={agent.avatarUrl} 
          icon={<UserOutlined />}
          style={{ marginRight: '10px' }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '2px' }}>
            {agent.name}
          </div>
          <div style={{ color: '#666', fontSize: '12px', marginBottom: '6px' }}>
            {agent.role}
          </div>
          <AgentStatusBadge status={agent.status} />
        </div>
      </div>

      {/* 中间区域 - 关键指标 */}
      <Row gutter={12} style={{ marginBottom: '12px' }}>
        <Col span={8}>
          <Statistic
            title="服务客户"
            value={agent.metrics.servedCustomers}
            prefix={<UserOutlined />}
            valueStyle={{ fontSize: '14px', fontWeight: 'bold' }}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="解决问题"
            value={agent.metrics.resolvedIssues}
            prefix={<CheckCircleOutlined />}
            valueStyle={{ fontSize: '14px', fontWeight: 'bold' }}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="转人工率"
            value={agent.metrics.escalationRate * 100}
            suffix="%"
            prefix={<ExclamationCircleOutlined />}
            valueStyle={{ fontSize: '14px', fontWeight: 'bold' }}
          />
        </Col>
      </Row>

      {/* 底部区域 - 部署渠道 */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '11px', color: '#666', marginBottom: '6px' }}>
          部署渠道
        </div>
        <Space>
          {agent.deployedChannels.length > 0 ? (
            agent.deployedChannels.map((channel) => (
              <span key={channel} title={channel}>
                {getChannelIcon(channel)}
              </span>
            ))
          ) : (
            <span style={{ color: '#999', fontSize: '11px' }}>未部署</span>
          )}
        </Space>
      </div>

      {/* 操作按钮 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: 'auto',
        paddingTop: '12px',
        borderTop: '1px solid #f0f0f0'
      }}>
        <Space size="small">
          <Button 
            type="primary" 
            size="small" 
            icon={<SettingOutlined />}
            onClick={handleConfigure}
            style={{
              borderRadius: '4px',
              fontWeight: '500',
              fontSize: '12px',
              height: '28px',
              padding: '0 8px'
            }}
          >
            配置
          </Button>
          <Button 
            size="small" 
            icon={<BarChartOutlined />}
            onClick={handleAnalytics}
            style={{
              borderRadius: '4px',
              fontWeight: '500',
              fontSize: '12px',
              height: '28px',
              padding: '0 8px'
            }}
          >
            分析
          </Button>
        </Space>
        
        <Dropdown
          menu={{ items: moreMenuItems }}
          placement="bottomRight"
          trigger={['click']}
        >
          <Button 
            type="text" 
            size="small" 
            icon={<MoreOutlined />}
            style={{
              borderRadius: '4px',
              height: '28px',
              width: '28px',
              padding: '0'
            }}
          />
        </Dropdown>
      </div>
    </Card>
  );
};

export default AgentCard;
