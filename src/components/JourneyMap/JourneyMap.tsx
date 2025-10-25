import React, { useMemo } from 'react';
import { Space, Typography, Divider } from 'antd';
import type { JourneyTemplate, LaneType, JourneyNode } from '../../types/journey';
import { NodeCard } from './NodeCard';

interface JourneyMapProps {
  template: JourneyTemplate;
  onNodeClick?: (node: JourneyNode) => void;
}

const laneOrder: LaneType[] = ['用户运营', '系统提供信息', '营销/客成动作'];

export const JourneyMap: React.FC<JourneyMapProps> = ({ template, onNodeClick }) => {
  const lanes = useMemo(() => laneOrder.filter((l) => template.lanes.includes(l)), [template]);

  return (
    <div style={{ overflowX: 'auto', paddingBottom: 12 }}>
      <div style={{ display: 'flex', gap: 16, minHeight: 300 }}>
        {template.stages.map((stage, idx) => (
          <div key={stage.id} style={{ minWidth: 360 }}>
            <Space direction="vertical" style={{ width: '100%' }} size={8}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Typography.Title level={4} style={{ margin: 0 }}>
                  {stage.title}
                </Typography.Title>
                {idx < template.stages.length - 1 && (
                  <span style={{ color: '#999' }}>→</span>
                )}
              </div>
              <Typography.Text type="secondary">阶段：{stage.periodLabel}</Typography.Text>
              <Divider style={{ margin: '8px 0' }} />
              {lanes.map((lane) => (
                <div key={`${stage.id}-${lane}`} style={{ marginBottom: 12 }}>
                  <Typography.Text strong>{lane}</Typography.Text>
                  <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
                    {template.nodes
                      .filter((n) => n.stageId === stage.id && n.lane === lane)
                      .map((node) => (
                        <NodeCard key={node.id} node={node} onClick={onNodeClick} />
                      ))}
                    {template.nodes.filter((n) => n.stageId === stage.id && n.lane === lane).length === 0 && (
                      <Typography.Text type="secondary">（暂无节点）</Typography.Text>
                    )}
                  </div>
                </div>
              ))}
            </Space>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JourneyMap;