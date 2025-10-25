import React, { useState, useEffect } from 'react';
import { Helmet } from '@umijs/max';
import {
  Button,
  Typography,
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  Space,
  message,
  Row,
  Col,
  Divider,
  Switch,
  InputNumber
} from 'antd';
import {
  ArrowLeftOutlined,
  SaveOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from 'umi';
import { mockCustomerHandovers } from '../../../mock/handoverData';
import { CustomerHandover } from '../../../types/handover';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const HandoverEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [handoverData, setHandoverData] = useState<CustomerHandover | null>(null);

  useEffect(() => {
    if (id) {
      // 模拟获取交接单数据
      const data = mockCustomerHandovers.find(h => h.id === id);
      if (data) {
        setHandoverData(data);
        // 设置表单初始值
        form.setFieldsValue({
          customerName: data.customerName,
          handoverStatus: data.handoverStatus,
          riskLevel: data.riskLevel,
          salesPerson: data.crmData?.salesPerson,
          salesSource: data.crmData?.salesSource,
          channelPartner: data.crmData?.channelPartner,
          servicePeriod: data.crmData?.servicePeriod,
          contractAmount: data.crmData?.contractAmount,
          handoverComment: data.handoverComment,
          riskDetails: data.riskDetails,
          expectationDetails: data.expectationDetails,
          corePainPoints: data.corePainPoints,
          successCriteria: data.successCriteria
        });
      }
    }
  }, [id, form]);

  const handleBack = () => {
    navigate(`/handover/${id}`);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      // 模拟保存操作
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      message.success('交接单信息已保存');
      navigate(`/handover/${id}`);
    } catch (error) {
      console.error('保存失败:', error);
      message.error('保存失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  if (!handoverData) {
    return (
      <div style={{ 
        padding: '32px 40px', 
        textAlign: 'center',
        background: '#f5f5f5',
        minHeight: 'calc(100vh - 120px)'
      }}>
        <div>未找到交接单数据</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>编辑交接单 - {handoverData.customerName}</title>
      </Helmet>
      <div style={{
        padding: '32px 40px',
        background: '#f5f5f5',
        minHeight: 'calc(100vh - 120px)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* 页面头部 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={handleBack}
                style={{
                  padding: '4px 8px',
                  height: 'auto',
                  marginRight: '16px',
                  color: '#666',
                  fontSize: '14px'
                }}
              >
                返回
              </Button>
              <Title level={3} style={{ margin: 0, color: '#262626' }}>
                编辑交接单 - {handoverData.customerName}
              </Title>
            </div>
            
            <Space>
              <Button onClick={handleBack}>
                取消
              </Button>
              <Button 
                type="primary" 
                icon={<SaveOutlined />}
                loading={loading}
                onClick={handleSave}
              >
                保存
              </Button>
            </Space>
          </div>

          {/* 编辑表单 */}
          <Card style={{ borderRadius: '8px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)' }}>
            <Form
              form={form}
              layout="vertical"
              style={{ maxWidth: '100%' }}
            >
              {/* 基本信息 */}
              <Title level={4} style={{ marginBottom: '16px' }}>基本信息</Title>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="customerName"
                    label="客户名称"
                    rules={[{ required: true, message: '请输入客户名称' }]}
                  >
                    <Input placeholder="请输入客户名称" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="handoverStatus"
                    label="交接状态"
                    rules={[{ required: true, message: '请选择交接状态' }]}
                  >
                    <Select placeholder="请选择交接状态">
                      <Option value="pending_handover">待交接</Option>
                      <Option value="handover_in_progress">交接中</Option>
                      <Option value="pending_implementation">待实施</Option>
                      <Option value="implementation_in_progress">实施中</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="riskLevel"
                    label="风险等级"
                  >
                    <Select placeholder="请选择风险等级">
                      <Option value="high">高风险</Option>
                      <Option value="medium">中风险</Option>
                      <Option value="low">低风险</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="handoverDate"
                    label="交接日期"
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>

              <Divider />

              {/* CRM信息 */}
              <Title level={4} style={{ marginBottom: '16px' }}>CRM信息</Title>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="salesPerson"
                    label="销售人员"
                  >
                    <Input placeholder="请输入销售人员" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="salesSource"
                    label="销售来源"
                  >
                    <Select placeholder="请选择销售来源">
                      <Option value="direct">直销</Option>
                      <Option value="channel">渠道</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="channelPartner"
                    label="渠道伙伴"
                  >
                    <Input placeholder="请输入渠道伙伴" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="contractAmount"
                    label="合同金额"
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder="请输入合同金额"
                      formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value!.replace(/¥\s?|(,*)/g, '')}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="servicePeriod"
                label="服务周期"
              >
                <Input placeholder="例如：2024-01-01 至 2024-12-31" />
              </Form.Item>

              <Divider />

              {/* 描述信息 */}
              <Title level={4} style={{ marginBottom: '16px' }}>描述信息</Title>
              <Form.Item
                name="handoverComment"
                label="交接评论"
              >
                <TextArea
                  rows={4}
                  placeholder="请输入交接评论"
                />
              </Form.Item>

              <Form.Item
                name="riskDetails"
                label="风险详情"
              >
                <TextArea
                  rows={3}
                  placeholder="请输入风险详情"
                />
              </Form.Item>

              <Form.Item
                name="expectationDetails"
                label="期望详情"
              >
                <TextArea
                  rows={3}
                  placeholder="请输入期望详情"
                />
              </Form.Item>

              <Form.Item
                name="corePainPoints"
                label="核心痛点"
              >
                <TextArea
                  rows={3}
                  placeholder="请输入核心痛点"
                />
              </Form.Item>

              <Form.Item
                name="successCriteria"
                label="成功标准"
              >
                <TextArea
                  rows={3}
                  placeholder="请输入成功标准"
                />
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default HandoverEditPage;