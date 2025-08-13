import React, { useState } from 'react';
import { 
  Form, 
  Input, 
  Radio, 
  Checkbox, 
  Button, 
  Upload, 
  Card, 
  Steps, 
  Space, 
  Alert,
  Avatar,
  Typography
} from 'antd';
import { 
  UserOutlined, 
  BookOutlined, 
  RocketOutlined,
  UploadOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { KnowledgeBase, AgentSkill, AgentCreateFormData } from '../../types/agent';

const { Step } = Steps;
const { Title } = Typography;

interface AgentCreateFormProps {
  allKnowledgeBases: KnowledgeBase[];
  allAgentSkills: AgentSkill[];
  onSubmit: (data: AgentCreateFormData) => void;
  onCancel: () => void;
}

const AgentCreateForm: React.FC<AgentCreateFormProps> = ({
  allKnowledgeBases,
  allAgentSkills,
  onSubmit,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [form] = Form.useForm();

  const [formData, setFormData] = useState<Partial<AgentCreateFormData>>({
    name: '',
    role: '',
    personality: 'professional',
    avatarUrl: '',
    knowledgeBases: [],
    skills: [],
    channels: [],
  });

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const handleFormChange = (changedValues: any, allValues: any) => {
    setFormData(allValues);
  };

  const handleNext = async () => {
    try {
      await form.validateFields();
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values as AgentCreateFormData);
    } catch (error) {
      console.log('Submit failed:', error);
    }
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

  const renderStep1 = () => (
    <div>
      <Title level={4} style={{ fontSize: '16px' }}>身份设定</Title>
      <Form.Item
        name="name"
        label="内部名称"
        rules={[{ required: true, message: '请输入内部名称' }]}
      >
        <Input placeholder="例如：数据看板配置助手" />
      </Form.Item>

      <Form.Item
        name="role"
        label="对外角色"
        rules={[{ required: true, message: '请输入对外角色' }]}
      >
        <Input placeholder="例如：小智" />
      </Form.Item>

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
          <Avatar size={64} icon={<UserOutlined />} />
          <Upload>
            <Button icon={<UploadOutlined />}>上传头像</Button>
          </Upload>
        </div>
      </Form.Item>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <Title level={4} style={{ fontSize: '16px' }}>知识与技能</Title>
      
      <Form.Item
        name="knowledgeBases"
        label="知识库"
      >
        <Checkbox.Group>
          {allKnowledgeBases.map((item) => (
            <div key={item.id} style={{ marginBottom: '8px' }}>
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

      <Form.Item
        name="skills"
        label="系统权限"
      >
        <Checkbox.Group>
          {allAgentSkills.map((item) => (
            <div key={item.id} style={{ marginBottom: '8px' }}>
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

      {formData.skills?.some(skillId => 
        allAgentSkills.find(skill => skill.id === skillId)?.isSensitive
      ) && (
        <Alert
          message="注意"
          description="您选择了敏感权限，请确保Agent的使用符合安全规范。"
          type="warning"
          showIcon
          style={{ marginBottom: '16px' }}
        />
      )}
    </div>
  );

  const renderStep3 = () => (
    <div>
      <Title level={4} style={{ fontSize: '16px' }}>部署</Title>
      
      <Form.Item
        name="channels"
        label="部署渠道"
        rules={[{ required: true, message: '请至少选择一个部署渠道' }]}
      >
        <Checkbox.Group options={channelOptions} />
      </Form.Item>

      <Alert
        message="创建完成"
        description="分身创建后将进入草稿状态，您可以在配置页面进行进一步设置。"
        type="info"
        showIcon
        style={{ marginBottom: '16px' }}
      />
    </div>
  );

  const steps = [
    {
      title: '身份设定',
      icon: <UserOutlined />,
      content: renderStep1(),
    },
    {
      title: '知识与技能',
      icon: <BookOutlined />,
      content: renderStep2(),
    },
    {
      title: '部署',
      icon: <RocketOutlined />,
      content: renderStep3(),
    },
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Steps 
        current={currentStep - 1} 
        style={{ marginBottom: '24px' }}
        progressDot
        size="small"
      >
        {steps.map((step, index) => (
          <Step key={index} title={step.title} icon={step.icon} />
        ))}
      </Steps>

      <Card
        style={{
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #f0f0f0'
        }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={formData}
          onValuesChange={handleFormChange}
        >
          {steps[currentStep - 1].content}

          <div style={{ 
            marginTop: '32px', 
            textAlign: 'center',
            paddingTop: '24px',
            borderTop: '1px solid #f0f0f0'
          }}>
            <Space size="large">
              {currentStep > 1 && (
                <Button 
                  onClick={handlePrev}
                  size="large"
                  style={{ width: '120px' }}
                >
                  上一步
                </Button>
              )}
              
              {currentStep < steps.length ? (
                <Button 
                  type="primary" 
                  onClick={handleNext}
                  size="large"
                  style={{ width: '120px' }}
                >
                  下一步
                </Button>
              ) : (
                <Button 
                  type="primary" 
                  onClick={handleSubmit}
                  size="large"
                  style={{ width: '120px' }}
                >
                  创建分身
                </Button>
              )}
              
              <Button 
                onClick={onCancel}
                size="large"
                style={{ width: '120px' }}
              >
                取消
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AgentCreateForm;
