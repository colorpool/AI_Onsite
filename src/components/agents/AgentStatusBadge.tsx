import React from 'react';
import { Badge, Tag } from 'antd';
import { AgentStatus } from '../../types/agent';

interface AgentStatusBadgeProps {
  status: AgentStatus;
}

const AgentStatusBadge: React.FC<AgentStatusBadgeProps> = ({ status }) => {
  const getStatusConfig = (status: AgentStatus) => {
    switch (status) {
      case 'running':
        return {
          color: 'success',
          text: '运行中',
          icon: '🟢',
        };
      case 'paused':
        return {
          color: 'warning',
          text: '已暂停',
          icon: '🟡',
        };
      case 'draft':
        return {
          color: 'default',
          text: '草稿',
          icon: '⚪',
        };
      default:
        return {
          color: 'default',
          text: '未知',
          icon: '❓',
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Tag color={config.color} style={{ margin: 0 }}>
      <span style={{ marginRight: 4 }}>{config.icon}</span>
      {config.text}
    </Tag>
  );
};

export default AgentStatusBadge;
