import React, { useState } from 'react';
import {
  Timeline,
  Button,
  Typography,
  Tag,
  Space,
  Modal,
  Form,
  Input,
  Select,
  message
} from 'antd';
import {
  PlusOutlined,
  TeamOutlined,
  PhoneOutlined,
  PlayCircleOutlined,
  SettingOutlined,
  ExclamationCircleOutlined,
  DollarOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

// 服务记录类型
export type ServiceRecordType = 'QBR' | '电话回访' | '培训' | '工单解决' | '风险处理' | '产品演示' | '技术支持' | '商务沟通' | '其他';

// 服务记录接口
export interface ServiceRecord {
  id: string;
  type: ServiceRecordType;
  title: string;
  content: string;
  operator: string;
  timestamp: string;
  relatedPlaybookId?: string;
  relatedRiskEventId?: string;
  tags?: string[];
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

interface ServiceRecordTabProps {
  serviceRecords: ServiceRecord[];
  onAddRecord?: (record: Omit<ServiceRecord, 'id' | 'createdAt' | 'updatedAt'>) => void;
  showAddButton?: boolean;
  tabTitle?: string;
}

const ServiceRecordTab: React.FC<ServiceRecordTabProps> = ({
  serviceRecords = [],
  onAddRecord,
  showAddButton = true,
  tabTitle = '服务记录'
}) => {
  const [newRecordModalVisible, setNewRecordModalVisible] = useState(false);
  const [form] = Form.useForm();

  // 获取记录类型配置
  const getRecordConfig = (type: ServiceRecordType) => {
    const configs = {
      'QBR': { color: '#52c41a', icon: <TeamOutlined /> },
      '电话回访': { color: '#1890ff', icon: <PhoneOutlined /> },
      '培训': { color: '#722ed1', icon: <PlayCircleOutlined /> },
      '工单解决': { color: '#fa8c16', icon: <SettingOutlined /> },
      '风险处理': { color: '#f5222d', icon: <ExclamationCircleOutlined /> },
      '产品演示': { color: '#13c2c2', icon: <PlayCircleOutlined /> },
      '技术支持': { color: '#eb2f96', icon: <SettingOutlined /> },
      '商务沟通': { color: '#faad14', icon: <DollarOutlined /> },
      '其他': { color: '#8c8c8c', icon: <ClockCircleOutlined /> }
    };
    return configs[type] || configs['其他'];
  };

  // 处理新增记录
  const handleAddRecord = () => {
    form.validateFields().then(values => {
      const newRecord = {
        ...values,
        operator: '当前用户', // 实际应用中应该从用户上下文获取
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        tags: values.tags || []
      };
      
      if (onAddRecord) {
        onAddRecord(newRecord);
      }
      
      message.success('服务记录已创建');
      setNewRecordModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <div style={{ padding: '8px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <Text type="secondary" style={{ fontSize: '14px' }}>
          共 {serviceRecords.length} 条记录
        </Text>
        {showAddButton && (
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setNewRecordModalVisible(true)}
          >
            新增{tabTitle}
          </Button>
        )}
      </div>
      
      <Timeline
        style={{ padding: '16px 0' }}
        items={serviceRecords.map((record) => {
          const config = getRecordConfig(record.type);
          
          return {
            color: config.color,
            dot: config.icon,
            children: (
              <div style={{ 
                padding: '16px', 
                background: '#f8f9fa', 
                borderRadius: '8px',
                border: '1px solid #e8e8e8'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Tag color={config.color} style={{ marginRight: '8px' }}>
                      {record.type}
                    </Tag>
                    <Text strong style={{ fontSize: '14px' }}>
                      {record.title}
                    </Text>
                  </div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    {record.timestamp}
                  </Text>
                </div>
                
                <div style={{ marginBottom: '8px' }}>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    操作人：{record.operator}
                  </Text>
                </div>
                
                <div style={{ marginBottom: '12px' }}>
                  <Text>{record.content}</Text>
                </div>
                
                {record.tags && record.tags.length > 0 && (
                  <div style={{ marginBottom: '8px' }}>
                    <Space size={4}>
                      {record.tags.map((tag: string, index: number) => (
                        <Tag key={index} style={{ fontSize: '11px' }}>
                          {tag}
                        </Tag>
                      ))}
                    </Space>
                  </div>
                )}
                
                {(record.relatedPlaybookId || record.relatedRiskEventId) && (
                  <div style={{ 
                    padding: '8px 12px', 
                    background: '#e6f7ff', 
                    borderRadius: '4px',
                    border: '1px solid #91d5ff'
                  }}>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      关联信息：
                    </Text>
                    {record.relatedPlaybookId && (
                      <Tag color="blue" style={{ marginLeft: '4px', fontSize: '11px' }}>
                        剧本: {record.relatedPlaybookId}
                      </Tag>
                    )}
                    {record.relatedRiskEventId && (
                      <Tag color="red" style={{ marginLeft: '4px', fontSize: '11px' }}>
                        风险: {record.relatedRiskEventId}
                      </Tag>
                    )}
                  </div>
                )}
              </div>
            )
          };
        })}
      />

      <Modal
        title={`新建${tabTitle}`}
        open={newRecordModalVisible}
        onCancel={() => {
          setNewRecordModalVisible(false);
          form.resetFields();
        }}
        onOk={handleAddRecord}
        width={600}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item name="type" label="记录类型" rules={[{ required: true }]}>
            <Select placeholder="请选择记录类型">
              <Option value="QBR">QBR</Option>
              <Option value="电话回访">电话回访</Option>
              <Option value="培训">培训</Option>
              <Option value="工单解决">工单解决</Option>
              <Option value="风险处理">风险处理</Option>
              <Option value="产品演示">产品演示</Option>
              <Option value="技术支持">技术支持</Option>
              <Option value="商务沟通">商务沟通</Option>
              <Option value="其他">其他</Option>
            </Select>
          </Form.Item>
          <Form.Item name="title" label="记录标题" rules={[{ required: true }]}>
            <Input placeholder="请输入记录标题" />
          </Form.Item>
          <Form.Item name="content" label="详细内容" rules={[{ required: true }]}>
            <TextArea rows={4} placeholder="请输入详细内容" />
          </Form.Item>
          <Form.Item name="tags" label="标签">
            <Select mode="tags" placeholder="请输入标签（可多选）">
              <Option value="定期回访">定期回访</Option>
              <Option value="问题解决">问题解决</Option>
              <Option value="产品培训">产品培训</Option>
              <Option value="续约沟通">续约沟通</Option>
              <Option value="客户满意">客户满意</Option>
              <Option value="技术支持">技术支持</Option>
              <Option value="商务谈判">商务谈判</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ServiceRecordTab;