import React, { useState } from 'react';
import { 
  Button, 
  Row, 
  Col, 
  Typography, 
  Input, 
  Select, 
  Space, 
  Form, 
  Card,
  message,
  Breadcrumb
} from 'antd';
import { 
  ArrowLeftOutlined, 
  SaveOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'umi';
import { CustomerHandover, HandoverStatus, RiskLevel } from '../../../types/handover';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const HandoverCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // 处理返回
  const handleBack = () => {
    navigate('/profiles/handover-implementation');
  };

  // 处理保存
  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      console.log('创建客户交接:', values);
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      message.success('客户交接创建成功！');
      navigate('/profiles/handover-implementation');
    } catch (error) {
      console.log('创建失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '24px',
      background: '#f5f5f5',
      minHeight: 'calc(100vh - 120px)',
      paddingBottom: '60px' // 为footer留出底部间距
    }}>
      <div style={{ 
        maxWidth: '1000px', 
        margin: '0 auto'
      }}>


        {/* 创建表单 */}
        <div style={{ 
          background: '#fff',
          borderRadius: '8px',
          padding: '24px'
        }}>
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              handoverStatus: 'pending',
              riskLevel: 'low',
              expectationAlignment: 'not_aligned'
            }}
          >
            <Row gutter={24}>
              {/* 基本信息 */}
              <Col span={12}>
                <Card title="基本信息" size="small" style={{ marginBottom: '24px' }}>
                  <Form.Item
                    name="customerName"
                    label="客户名称"
                    rules={[{ required: true, message: '请输入客户名称' }]}
                  >
                    <Input placeholder="请输入客户名称" />
                  </Form.Item>

                  <Form.Item
                    name="handoverStatus"
                    label="交接状态"
                    rules={[{ required: true, message: '请选择交接状态' }]}
                  >
                    <Select placeholder="请选择交接状态">
                      <Option value="pending">待处理</Option>
                      <Option value="processing">处理中</Option>
                      <Option value="aligned">已对齐</Option>
                      <Option value="partially_aligned">部分对齐</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="riskLevel"
                    label="风险等级"
                    rules={[{ required: true, message: '请选择风险等级' }]}
                  >
                    <Select placeholder="请选择风险等级">
                      <Option value="high">高风险</Option>
                      <Option value="medium">中风险</Option>
                      <Option value="low">低风险</Option>
                    </Select>
                  </Form.Item>
                </Card>
              </Col>

              {/* 客户期望 */}
              <Col span={12}>
                <Card title="客户期望" size="small" style={{ marginBottom: '24px' }}>
                  <Form.Item
                    name="expectationAlignment"
                    label="期望对齐状态"
                    rules={[{ required: true, message: '请选择期望对齐状态' }]}
                  >
                    <Select placeholder="请选择期望对齐状态">
                      <Option value="aligned">已对齐</Option>
                      <Option value="partially_aligned">部分对齐</Option>
                      <Option value="not_aligned">未对齐</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="corePainPoints"
                    label="核心痛点"
                  >
                    <TextArea 
                      placeholder="请描述客户的核心痛点..."
                      rows={3}
                    />
                  </Form.Item>

                  <Form.Item
                    name="successCriteria"
                    label="成功标准"
                  >
                    <TextArea 
                      placeholder="请定义客户成功的标准..."
                      rows={3}
                    />
                  </Form.Item>
                </Card>
              </Col>
            </Row>

            {/* 风险信息 */}
            <Card title="风险信息" size="small" style={{ marginBottom: '24px' }}>
              <Form.Item
                name="hasRiskAlert"
                label="是否有风险提示"
                valuePropName="checked"
              >
                <Select placeholder="请选择">
                  <Option value={true}>有</Option>
                  <Option value={false}>无</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="riskDetails"
                label="风险详情"
                dependencies={['hasRiskAlert']}
              >
                <TextArea 
                  placeholder="请详细描述风险情况..."
                  rows={4}
                />
              </Form.Item>
            </Card>

            {/* 干系人信息 */}
            <Card title="干系人信息" size="small" style={{ marginBottom: '24px' }}>
              <Form.Item
                name="stakeholderCount"
                label="干系人数量"
                rules={[{ required: true, message: '请输入干系人数量' }]}
              >
                <Input 
                  type="number" 
                  placeholder="请输入干系人数量"
                  min={1}
                />
              </Form.Item>

              <Form.Item
                name="keyStakeholders"
                label="关键干系人"
              >
                <TextArea 
                  placeholder="请描述关键干系人信息..."
                  rows={3}
                />
              </Form.Item>
            </Card>

            {/* 操作按钮 */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: '12px',
              marginTop: '24px',
              paddingTop: '24px',
              borderTop: '1px solid #f0f0f0'
            }}>
              <Button onClick={handleBack}>
                取消
              </Button>
              <Button 
                type="primary" 
                icon={<SaveOutlined />}
                onClick={handleSave}
                loading={loading}
                style={{ borderRadius: '6px', fontWeight: '500' }}
              >
                创建交接
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default HandoverCreatePage;
