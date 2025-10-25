import React, { useState } from 'react';
import { Drawer, Typography, List, Checkbox, Space, Upload, Button, Input } from 'antd';
import type { JourneyNode, JourneyChecklistItem, JourneyComment } from '../../types/journey';

interface NodeDetailsDrawerProps {
  node?: JourneyNode;
  open: boolean;
  onClose: () => void;
  onUpdateChecklist?: (items: JourneyChecklistItem[]) => void;
  onAddComment?: (comment: JourneyComment) => void;
}

export const NodeDetailsDrawer: React.FC<NodeDetailsDrawerProps> = ({ node, open, onClose, onUpdateChecklist, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const checklist = node?.checklist ?? [];
  const comments = node?.comments ?? [];

  const toggleItem = (item: JourneyChecklistItem) => {
    const updated = checklist.map((it) => (it.id === item.id ? { ...it, done: !it.done } : it));
    onUpdateChecklist?.(updated);
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !node) return;
    const comment: JourneyComment = {
      id: `${Date.now()}`,
      author: 'CSM-王五',
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
    };
    onAddComment?.(comment);
    setNewComment('');
  };

  return (
    <Drawer title={node ? `任务详情：${node.title}` : '任务详情'} width={420} open={open} onClose={onClose}>
      {!node ? (
        <Typography.Text type="secondary">请选择一个旅程节点查看详情</Typography.Text>
      ) : (
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <div>
            <Typography.Title level={5}>任务描述</Typography.Title>
            <Typography.Paragraph>{node.description || '暂无描述'}</Typography.Paragraph>
          </div>
          <div>
            <Typography.Title level={5}>子任务清单</Typography.Title>
            <List
              dataSource={checklist}
              renderItem={(item) => (
                <List.Item>
                  <Checkbox checked={item.done} onChange={() => toggleItem(item)}>
                    {item.text}
                  </Checkbox>
                </List.Item>
              )}
            />
          </div>
          <div>
            <Typography.Title level={5}>数据洞察</Typography.Title>
            <Typography.Text type="secondary">展示消费方案推荐、用户参与分析、激活率、粘合度等系统数据（示意）。</Typography.Text>
          </div>
          <div>
            <Typography.Title level={5}>交付物上传</Typography.Title>
            <Upload>
              <Button>上传文件</Button>
            </Upload>
          </div>
          <div>
            <Typography.Title level={5}>协作评论</Typography.Title>
            <Space direction="vertical" style={{ width: '100%' }} size={8}>
              {comments.map((c) => (
                <div key={c.id} style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <Typography.Text strong>{c.author}</Typography.Text>
                  <Typography.Text type="secondary" style={{ marginLeft: 8 }}>
                    {new Date(c.createdAt).toLocaleString()}
                  </Typography.Text>
                  <div>
                    <Typography.Paragraph style={{ marginBottom: 0 }}>{c.content}</Typography.Paragraph>
                  </div>
                </div>
              ))}
              <Input.TextArea rows={3} value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="输入评论，@同事进行协作" />
              <Space>
                <Button type="primary" onClick={handleAddComment}>发表评论</Button>
              </Space>
            </Space>
          </div>
        </Space>
      )}
    </Drawer>
  );
};

export default NodeDetailsDrawer;