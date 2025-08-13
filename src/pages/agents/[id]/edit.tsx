'use client';

import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Form, 
  Input, 
  Radio, 
  Checkbox, 
  Button, 
  Upload, 
  Avatar, 
  Typography, 
  Space, 
  Divider,
  message,
  Row,
  Col,
  Switch,
  Tag
} from 'antd';
import { 
  ArrowLeftOutlined, 
  SaveOutlined, 
  UserOutlined,
  UploadOutlined,
  ExclamationCircleOutlined,
  WechatOutlined,
  DingtalkOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from 'umi';
import { mockAgents, mockKnowledgeBases, mockAgentSkills } from '../../../mock/agentData';
import { Agent, KnowledgeBase, AgentSkill } from '../../../types/agent';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface AgentEditPageProps {
  agentId?: string;
}

const AgentEditPage: React.FC<AgentEditPageProps> = ({ agentId }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [form] = Form.useForm();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(false);

  // 优先使用props中的agentId，如果没有则使用params中的id
  const currentAgentId = agentId || params.id;

  useEffect(() => {
    // 模拟从API获取Agent数据
    const foundAgent = mockAgents.find(a => a.id === currentAgentId);
    if (foundAgent) {
      setAgent(foundAgent);
      form.setFieldsValue({
        name: foundAgent.name,
        role: foundAgent.role,
        status: foundAgent.status,
        channels: foundAgent.deployedChannels,
        // 这里应该从Agent的实际配置中获取
        knowledgeBases: [],
        skills: [],
      });
    } else {
      message.error('分身不存在');
      navigate('/ai-tools/consultant');
    }
  }, [currentAgentId, form, navigate]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      console.log('保存配置:', values);
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      message.success('配置保存成功！');
      navigate('/ai-tools/consultant');
    } catch (error) {
      console.log('保存失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/ai-tools/consultant');
  };

  const personalityOptions = [
    { label: '专业严谨', value: 'professional' },
    { label: '热情活泼', value: 'enthusiastic' },
    { label: '简洁高效', value: 'concise' },
  ];

  const channelOptions = [
    { label: '网页聊天', value: 'web-chat' },
    { label: '企业微信', value: 'wecom' },
    { label: '飞书', value: 'lark' },
  ];

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

  // 如果没有拿到 agent，也不要显示“加载中”过渡，直接给出轻量提示界面
  if (!agent) {
    return (
      <div style={{ padding: '24px', background: '#fafafa', minHeight: 'calc(100vh - 120px)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', gap: '16px' }}>
            <Button onClick={() => navigate('/ai-tools/consultant')} style={{ border: 'none', padding: 0 }}>
              返回
            </Button>
            <Title level={3} style={{ margin: 0, color: '#262626', fontSize: '18px' }}>
              配置
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
        maxWidth: '1000px', 
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
          <Title level={3} style={{ margin: 0, color: '#262626', fontSize: '18px' }}>
            配置分身 - {agent.role}
          </Title>
        </div>

        <Form
          form={form}
          layout="vertical"
          style={{ maxWidth: '800px' }}
        >
          {/* 基本信息 */}
          <Card title="基本信息" style={{ marginBottom: '24px' }}>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="内部名称"
                  rules={[{ required: true, message: '请输入内部名称' }]}
                >
                  <Input placeholder="例如：数据看板配置助手" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="role"
                  label="对外角色"
                  rules={[{ required: true, message: '请输入对外角色' }]}
                >
                  <Input placeholder="例如：小智" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="personality"
              label="AI 性格"
              rules={[{ required: true, message: '请选择AI性格' }]}
            >
              <Radio.Group options={personalityOptions} />
            </Form.Item>

            <Form.Item
              name="avatarUrl"
              label="头像"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Avatar size={64} src={agent.avatarUrl} icon={<UserOutlined />} />
                <Upload>
                  <Button icon={<UploadOutlined />}>更换头像</Button>
                </Upload>
              </div>
            </Form.Item>
          </Card>

          {/* 状态管理 */}
          <Card title="状态管理" style={{ marginBottom: '24px' }}>
            <Form.Item
              name="status"
              label="运行状态"
            >
              <Radio.Group>
                <Radio.Button value="running">运行中</Radio.Button>
                <Radio.Button value="paused">已暂停</Radio.Button>
                <Radio.Button value="draft">草稿</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <div style={{ 
              background: '#f6ffed', 
              padding: '12px', 
              borderRadius: '6px',
              border: '1px solid #b7eb8f'
            }}>
              <Text type="secondary">
                💡 提示：暂停状态的分身将停止响应客户请求，但保留所有配置和数据。
              </Text>
            </div>
          </Card>

          {/* 知识库配置 */}
          <Card title="知识库配置" style={{ marginBottom: '24px' }}>
            <Form.Item
              name="knowledgeBases"
              label="选择知识库"
            >
              <Checkbox.Group>
                {mockKnowledgeBases.map((item) => (
                  <div key={item.id} style={{ marginBottom: '12px' }}>
                    <Checkbox value={item.id}>
                      <div>
                        <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                        <div style={{ color: '#666', fontSize: '12px' }}>{item.description}</div>
                      </div>
                    </Checkbox>
                  </div>
                ))}
              </Checkbox.Group>
            </Form.Item>
          </Card>

          {/* 权限配置 */}
          <Card title="权限配置" style={{ marginBottom: '24px' }}>
            <Form.Item
              name="skills"
              label="系统权限"
            >
              <Checkbox.Group>
                {mockAgentSkills.map((item) => (
                  <div key={item.id} style={{ marginBottom: '12px' }}>
                    <Checkbox value={item.id}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div>
                          <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                          <div style={{ color: '#666', fontSize: '12px' }}>{item.description}</div>
                        </div>
                        {item.isSensitive && (
                          <ExclamationCircleOutlined style={{ color: '#faad14' }} />
                        )}
                      </div>
                    </Checkbox>
                  </div>
                ))}
              </Checkbox.Group>
            </Form.Item>

            <div style={{ 
              background: '#fff7e6', 
              padding: '12px', 
              borderRadius: '6px',
              border: '1px solid #ffd591'
            }}>
              <Text type="warning">
                ⚠️ 注意：敏感权限可能涉及客户数据操作，请谨慎授权。
              </Text>
            </div>
          </Card>

          {/* 部署配置 */}
          <Card title="部署配置" style={{ marginBottom: '24px' }}>
            <Form.Item
              name="channels"
              label="部署渠道"
              rules={[{ required: true, message: '请至少选择一个部署渠道' }]}
            >
              <Checkbox.Group options={channelOptions} />
            </Form.Item>

            <div style={{ 
              background: '#e6f7ff', 
              padding: '12px', 
              borderRadius: '6px',
              border: '1px solid #91d5ff'
            }}>
              <Text type="secondary">
                📱 当前部署渠道：
                <Space style={{ marginLeft: '8px' }}>
                  {agent.deployedChannels.map(channel => (
                    <Tag key={channel} icon={getChannelIcon(channel)}>
                      {channel === 'web-chat' ? '网页聊天' : 
                       channel === 'wecom' ? '企业微信' : '飞书'}
                    </Tag>
                  ))}
                </Space>
              </Text>
            </div>
          </Card>

          {/* 操作按钮 */}
          <div style={{ 
            textAlign: 'center', 
            paddingTop: '24px',
            borderTop: '1px solid #f0f0f0'
          }}>
            <Space size="large">
              <Button 
                size="large" 
                onClick={handleCancel}
                style={{ width: '120px' }}
              >
                取消
              </Button>
              <Button 
                type="primary" 
                size="large" 
                icon={<SaveOutlined />}
                onClick={handleSave}
                loading={loading}
                style={{ width: '120px' }}
              >
                保存配置
              </Button>
            </Space>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AgentEditPage;
