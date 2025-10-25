import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Table,
  Button,
  Input,
  Select,
  DatePicker,
  Tag,
  Space,
  Modal,
  Form,
  message,
  Avatar,
  Badge,
  Typography,
  Statistic,
  Rate,
  Descriptions,
} from 'antd';
import {
  MessageOutlined,
  PlusOutlined,
  SearchOutlined,
  ExportOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  PhoneOutlined,
  MailOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;

const cardStyle = {
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  border: '1px solid #f0f0f0',
  background: '#ffffff',
  marginBottom: '16px',
};

// 添加样式定义
const tableStyles = `
  .highlight-row {
    background-color: #fffbe6 !important;
  }
  .highlight-row:hover {
    background-color: #fff7e6 !important;
  }
`;

interface ServiceRecord {
  id: string;
  ticketId: string;
  serviceType: string;
  serviceTitle: string;
  serviceDescription: string;
  csManagerName: string;
  csManagerAvatar: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'initiated' | 'in_progress' | 'waiting_feedback' | 'completed' | 'closed';
  createTime: string;
  updateTime: string;
  completedTime?: string;
  customerFeedback?: string;
  customerSatisfaction?: number;
  tags: string[];
  nextSteps?: string;
}

const ServiceRecords: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'detail' | 'feedback'>('detail');
  const [currentRecord, setCurrentRecord] = useState<ServiceRecord | null>(null);
  const [form] = Form.useForm();

  // 服务统计数据 - 客户视角
  const serviceStats = [
    { title: '进行中服务', value: 8, prefix: <ClockCircleOutlined />, color: '#1890ff' },
    { title: '待反馈服务', value: 3, prefix: <ExclamationCircleOutlined />, color: '#faad14' },
    { title: '已完成服务', value: 45, prefix: <CheckCircleOutlined />, color: '#52c41a' },
    { title: '本月新增', value: 12, prefix: <PlusOutlined />, color: '#722ed1' },
  ];

  const mockRecords: ServiceRecord[] = [
    {
      id: '1',
      ticketId: 'CS-2024-001',
      serviceType: '技术支持',
      serviceTitle: '培训系统视频播放问题解决',
      serviceDescription: '针对贵公司反馈的培训系统视频播放卡顿问题，我们的技术团队已进行深入分析并提供解决方案',
      csManagerName: '钉学科技-李客成',
      csManagerAvatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=li-cs',
      priority: 'high',
      status: 'completed',
      createTime: '2024-01-15 09:30',
      updateTime: '2024-01-15 16:45',
      completedTime: '2024-01-15 16:45',
      customerSatisfaction: 5,
      customerFeedback: '问题解决及时，技术支持专业',
      tags: ['技术支持', '视频播放', '已解决'],
      nextSteps: '后续将定期检查系统稳定性',
    },
    {
      id: '2',
      ticketId: 'CS-2024-002',
      serviceType: '培训指导',
      serviceTitle: '员工AI应用能力提升培训计划',
      serviceDescription: '根据贵公司需求，为员工制定个性化的AI应用能力提升培训计划，包括理论学习和实践操作',
      csManagerName: '钉学科技-王培训',
      csManagerAvatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=wang-training',
      priority: 'medium',
      status: 'in_progress',
      createTime: '2024-01-14 14:20',
      updateTime: '2024-01-16 10:30',
      tags: ['培训指导', '能力提升', '进行中'],
      nextSteps: '本周将安排第二阶段培训课程',
    },
    {
      id: '3',
      ticketId: 'CS-2024-003',
      serviceType: '定制开发',
      serviceTitle: '企业专属AI课程内容定制',
      serviceDescription: '基于贵公司业务特点，定制开发符合企业需求的AI应用培训课程和案例',
      csManagerName: '钉学科技-赵项目',
      csManagerAvatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=zhao-project',
      priority: 'high',
      status: 'waiting_feedback',
      createTime: '2024-01-13 11:00',
      updateTime: '2024-01-16 09:15',
      tags: ['定制开发', '课程内容', '待反馈'],
      nextSteps: '等待客户确认课程大纲和内容方向',
    },
  ];

  // 表格列定义 - 从管理员用户角度优化
  const recordColumns: ColumnsType<ServiceRecord> = [
    {
      title: '服务概览',
      key: 'overview',
      width: '35%',
      render: (_, record) => (
        <div style={{ padding: '8px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <Badge 
              dot={record.status === 'waiting_feedback'} 
              color={record.status === 'waiting_feedback' ? '#faad14' : 'transparent'}
            >
              <Avatar src={record.csManagerAvatar} size={32} />
            </Badge>
            <div style={{ marginLeft: '12px', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <Text strong style={{ fontSize: '14px' }}>{record.ticketId}</Text>
                 <Tag color="blue">{record.serviceType}</Tag>
                 {record.priority === 'urgent' && <Tag color="red">紧急</Tag>}
                 {record.priority === 'high' && <Tag color="orange">高优先级</Tag>}
               </div>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {record.csManagerName} · {record.createTime}
              </Text>
            </div>
          </div>
          <div>
            <Text strong style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>
              {record.serviceTitle}
            </Text>
            <Paragraph
              ellipsis={{ rows: 2, expandable: false }}
              style={{ margin: 0, fontSize: '13px', color: '#666', lineHeight: '1.4' }}
            >
              {record.serviceDescription}
            </Paragraph>
          </div>
        </div>
      ),
    },
    {
      title: '服务进展',
      key: 'progress',
      width: '20%',
      render: (_, record) => {
        const statusConfig: Record<string, { color: string; text: string; bgColor: string }> = {
          initiated: { color: '#1890ff', text: '已启动', bgColor: '#e6f7ff' },
          in_progress: { color: '#52c41a', text: '进行中', bgColor: '#f6ffed' },
          waiting_feedback: { color: '#faad14', text: '待您反馈', bgColor: '#fffbe6' },
          completed: { color: '#52c41a', text: '已完成', bgColor: '#f6ffed' },
          closed: { color: '#8c8c8c', text: '已关闭', bgColor: '#f5f5f5' },
        };
        const config = statusConfig[record.status];
        
        return (
          <div>
            <div 
              style={{ 
                padding: '4px 8px', 
                borderRadius: '4px', 
                backgroundColor: config.bgColor,
                border: `1px solid ${config.color}20`,
                marginBottom: '8px',
                textAlign: 'center'
              }}
            >
              <Text style={{ color: config.color, fontSize: '12px', fontWeight: 500 }}>
                {config.text}
              </Text>
            </div>
            {record.updateTime && (
              <Text type="secondary" style={{ fontSize: '11px', display: 'block', textAlign: 'center' }}>
                更新于 {record.updateTime.split(' ')[0]}
              </Text>
            )}
            {record.completedTime && (
              <Text type="secondary" style={{ fontSize: '11px', display: 'block', textAlign: 'center' }}>
                完成于 {record.completedTime.split(' ')[0]}
              </Text>
            )}
          </div>
        );
      },
    },
    {
      title: '服务效果',
      key: 'effectiveness',
      width: '20%',
      render: (_, record) => {
        if (record.customerSatisfaction) {
          return (
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '4px' }}>
                <Rate 
                  disabled 
                  defaultValue={record.customerSatisfaction} 
                  style={{ fontSize: '14px' }} 
                />
              </div>
              <Text style={{ fontSize: '12px', color: '#52c41a', fontWeight: 500 }}>
                {record.customerSatisfaction}/5 分
              </Text>
              {record.customerFeedback && (
                <div style={{ marginTop: '4px' }}>
                  <Text 
                    type="secondary" 
                    style={{ 
                      fontSize: '11px', 
                      display: 'block',
                      maxWidth: '120px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    "{record.customerFeedback}"
                  </Text>
                </div>
              )}
            </div>
          );
        }
        
        if (record.status === 'waiting_feedback') {
          return (
            <div style={{ textAlign: 'center' }}>
              <ExclamationCircleOutlined style={{ color: '#faad14', fontSize: '16px' }} />
              <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginTop: '4px' }}>
                等待您的评价
              </Text>
            </div>
          );
        }
        
        if (record.status === 'in_progress' || record.status === 'initiated') {
          return (
            <div style={{ textAlign: 'center' }}>
              <ClockCircleOutlined style={{ color: '#1890ff', fontSize: '16px' }} />
              <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginTop: '4px' }}>
                服务进行中
              </Text>
            </div>
          );
        }
        
        return (
          <div style={{ textAlign: 'center' }}>
            <Text type="secondary" style={{ fontSize: '12px' }}>-</Text>
          </div>
        );
      },
    },
    {
      title: '下一步行动',
      key: 'nextAction',
      width: '25%',
      render: (_, record) => (
        <div>
          {record.nextSteps && (
            <div style={{ marginBottom: '8px' }}>
              <Text 
                style={{ 
                  fontSize: '12px', 
                  color: '#666',
                  display: 'block',
                  lineHeight: '1.4'
                }}
              >
                {record.nextSteps.length > 50 
                  ? `${record.nextSteps.substring(0, 50)}...` 
                  : record.nextSteps
                }
              </Text>
            </div>
          )}
          <Space size="small">
            <Button 
              type="link" 
              size="small" 
              icon={<EyeOutlined />} 
              onClick={() => showDetail(record)}
              style={{ padding: '0 4px', fontSize: '12px' }}
            >
              查看详情
            </Button>
            {record.status === 'waiting_feedback' && (
              <Button 
                type="primary" 
                size="small" 
                icon={<CommentOutlined />} 
                onClick={() => showFeedback(record)}
                style={{ fontSize: '12px' }}
              >
                立即反馈
              </Button>
            )}
          </Space>
        </div>
      ),
    },
  ];

  const showDetail = (record: ServiceRecord) => {
    setCurrentRecord(record);
    setModalType('detail');
    setIsModalVisible(true);
  };

  const showFeedback = (record: ServiceRecord) => {
    setCurrentRecord(record);
    setModalType('feedback');
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (modalType === 'detail') {
      setIsModalVisible(false);
      return;
    }
    
    form.validateFields().then((values) => {
      console.log('Feedback values:', values);
      message.success('反馈提交成功！');
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div style={{ 
      padding: '32px 40px',
      background: '#f5f5f5',
      minHeight: 'calc(100vh - 64px)'
    }}>
      <style>{tableStyles}</style>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, color: '#262626' }}>
          服务互动记录
        </Title>
        <Text type="secondary">
          北京科技有限公司 - 查看钉学科技客成团队为您提供的专属服务记录
        </Text>
      </div>

      {/* 服务统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        {serviceStats.map((stat, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card style={cardStyle}>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={<span style={{ color: stat.color }}>{stat.prefix}</span>}
                valueStyle={{ color: stat.color, fontSize: '28px', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* 服务记录列表 */}
      <Card style={cardStyle}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '16px' 
        }}>
          <Space>
            <Input
              placeholder="搜索服务记录"
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
            />
            <Select placeholder="服务类型" style={{ width: 120 }}>
              <Option value="all">全部</Option>
              <Option value="技术支持">技术支持</Option>
              <Option value="培训指导">培训指导</Option>
              <Option value="定制开发">定制开发</Option>
            </Select>
            <Select placeholder="服务状态" style={{ width: 120 }}>
              <Option value="all">全部</Option>
              <Option value="in_progress">进行中</Option>
              <Option value="waiting_feedback">待反馈</Option>
              <Option value="completed">已完成</Option>
            </Select>
            <RangePicker placeholder={['开始日期', '结束日期']} />
          </Space>
          <Button icon={<ExportOutlined />}>导出记录</Button>
        </div>
        
        <Table
          columns={recordColumns}
          dataSource={mockRecords}
          rowKey="id"
          pagination={{
            total: 156,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
          size="middle"
          rowClassName={(record) => {
            if (record.status === 'waiting_feedback') return 'highlight-row';
            return '';
          }}
        />
      </Card>

      {/* 模态框 */}
      <Modal
        title={modalType === 'detail' ? '服务详情' : '提供反馈'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
        footer={modalType === 'detail' ? [
          <Button key="close" onClick={handleModalCancel}>
            关闭
          </Button>
        ] : undefined}
      >
        {modalType === 'detail' && currentRecord ? (
          <div>
            <Descriptions column={2} bordered>
              <Descriptions.Item label="服务编号">{currentRecord.ticketId}</Descriptions.Item>
              <Descriptions.Item label="服务类型">{currentRecord.serviceType}</Descriptions.Item>
              <Descriptions.Item label="客成经理">{currentRecord.csManagerName}</Descriptions.Item>
              <Descriptions.Item label="优先级">
                <Tag color={currentRecord.priority === 'high' ? 'red' : 'orange'}>
                  {currentRecord.priority}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="当前状态">
                <Tag color="blue">{currentRecord.status}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">{currentRecord.createTime}</Descriptions.Item>
              <Descriptions.Item label="服务标题" span={2}>{currentRecord.serviceTitle}</Descriptions.Item>
              <Descriptions.Item label="服务描述" span={2}>
                <Paragraph>{currentRecord.serviceDescription}</Paragraph>
              </Descriptions.Item>
              {currentRecord.nextSteps && (
                <Descriptions.Item label="下一步计划" span={2}>
                  <Paragraph>{currentRecord.nextSteps}</Paragraph>
                </Descriptions.Item>
              )}
            </Descriptions>
            
            {currentRecord.customerSatisfaction && (
              <div style={{ marginTop: '16px' }}>
                <Title level={5}>服务满意度</Title>
                <Rate disabled defaultValue={currentRecord.customerSatisfaction} />
                <Text style={{ marginLeft: '8px' }}>{currentRecord.customerSatisfaction}/5</Text>
                {currentRecord.customerFeedback && (
                  <div style={{ marginTop: '8px' }}>
                    <Text strong>您的反馈：</Text>
                    <Paragraph>{currentRecord.customerFeedback}</Paragraph>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <Form form={form} layout="vertical">
            <Form.Item name="satisfaction" label="服务满意度" rules={[{ required: true, message: '请评价服务满意度' }]}>
              <Rate />
            </Form.Item>
            <Form.Item name="feedback" label="反馈内容" rules={[{ required: true, message: '请输入反馈内容' }]}>
              <TextArea rows={4} placeholder="请描述您对本次服务的反馈和建议" />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default ServiceRecords;