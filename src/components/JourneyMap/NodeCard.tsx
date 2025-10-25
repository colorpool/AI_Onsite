import React from 'react';
import { Card, Tag, Space, Typography, Progress } from 'antd';
import type { JourneyNode } from '../../types/journey';

const statusColor: Record<JourneyNode['status'], string> = {
  待办: 'default',
  进行中: 'processing',
  已完成: 'success',
  已逾期: 'error',
};

interface NodeCardProps {
  node: JourneyNode;
  onClick?: (node: JourneyNode) => void;
}

export const NodeCard: React.FC<NodeCardProps> = ({ node, onClick }) => {
  const showChart = node.lane === '系统提供信息' && node.metrics && node.metrics.length > 0;
  const mainMetric = showChart ? node.metrics![0] : undefined;

  return (
    <Card
      size="small"
      hoverable
      onClick={() => onClick?.(node)}
      style={{ minWidth: 220 }}
      title={
        <Space align="center">
          <Tag color={statusColor[node.status]}>{node.status}</Tag>
          <Typography.Text strong>{node.title}</Typography.Text>
        </Space>
      }
      bodyStyle={{ padding: 12 }}
    >
      <Space direction="vertical" size={8} style={{ width: '100%' }}>
        {node.owner && (
          <Typography.Text type="secondary">负责人：{node.owner}</Typography.Text>
        )}
        {node.dueDate && (
          <Typography.Text type="secondary">
            截止日期：{new Date(node.dueDate).toLocaleDateString()}
          </Typography.Text>
        )}
        {showChart && mainMetric && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div>
              <Progress
                type="dashboard"
                percent={Math.min(100, Math.max(0, mainMetric.value))}
                size={60}
              />
            </div>
            <div>
              <Typography.Text>系统数据：{mainMetric.name}</Typography.Text>
              <div>
                <Typography.Text type="secondary">当前值 {mainMetric.value}%</Typography.Text>
              </div>
            </div>
          </div>
        )}
      </Space>
    </Card>
  );
};

export default NodeCard;