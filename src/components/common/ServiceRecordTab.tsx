import React, { useState, useMemo } from 'react';
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
  message,
  Descriptions,
  Divider,
  DatePicker
} from 'antd';
import {
  PlusOutlined,
  TeamOutlined,
  PhoneOutlined,
  PlayCircleOutlined,
  SettingOutlined,
  ExclamationCircleOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  EditOutlined,
  FileTextOutlined,
  FilterOutlined
} from '@ant-design/icons';

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

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
  onEditRecord?: (recordId: string, record: Omit<ServiceRecord, 'id' | 'createdAt' | 'updatedAt'>) => void;
  showAddButton?: boolean;
  tabTitle?: string;
  handoverData?: any; // 添加交接单数据，用于弹窗显示
}

const ServiceRecordTab: React.FC<ServiceRecordTabProps> = ({
  serviceRecords = [],
  onAddRecord,
  onEditRecord,
  showAddButton = true,
  tabTitle = '服务记录',
  handoverData
}) => {
  const [newRecordModalVisible, setNewRecordModalVisible] = useState(false);
  const [editRecordModalVisible, setEditRecordModalVisible] = useState(false);
  const [handoverDetailVisible, setHandoverDetailVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<ServiceRecord | null>(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  // 筛选状态
  const [filterType, setFilterType] = useState<ServiceRecordType | 'all'>('all');
  const [filterDateRange, setFilterDateRange] = useState<[any, any] | null>(null);

  // 筛选后的服务记录
  const filteredServiceRecords = useMemo(() => {
    return serviceRecords.filter(record => {
      // 类型筛选
      if (filterType !== 'all' && record.type !== filterType) {
        return false;
      }
      
      // 时间筛选
      if (filterDateRange && filterDateRange[0] && filterDateRange[1]) {
        const recordDate = new Date(record.timestamp);
        const startDate = filterDateRange[0].startOf('day');
        const endDate = filterDateRange[1].endOf('day');
        
        if (recordDate < startDate || recordDate > endDate) {
          return false;
        }
      }
      
      return true;
    });
  }, [serviceRecords, filterType, filterDateRange]);

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

  // 处理编辑记录
  const handleEditRecord = (record: ServiceRecord) => {
    setEditingRecord(record);
    editForm.setFieldsValue({
      type: record.type,
      title: record.title,
      content: record.content,
      tags: record.tags || [],
      attachments: record.attachments || []
    });
    setEditRecordModalVisible(true);
  };

  // 处理保存编辑
  const handleSaveEdit = () => {
    editForm.validateFields().then(values => {
      if (editingRecord && onEditRecord) {
        const updatedRecord = {
          ...values,
          operator: editingRecord.operator, // 保持原操作人
          timestamp: editingRecord.timestamp, // 保持原时间戳
          tags: values.tags || [],
          attachments: values.attachments || []
        };
        
        onEditRecord(editingRecord.id, updatedRecord);
        message.success('服务记录已更新');
        setEditRecordModalVisible(false);
        setEditingRecord(null);
        editForm.resetFields();
      }
    });
  };

  // 处理新增记录
  const handleAddRecord = () => {
    form.validateFields().then(values => {
      const newRecord = {
        ...values,
        operator: '当前用户', // 实际应用中应该从用户上下文获取
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        tags: values.tags || [],
        attachments: values.attachments || []
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
      {/* 筛选区域 */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: '16px',
        padding: '12px',
        background: '#f8f9fa',
        borderRadius: '6px',
        border: '1px solid #e8e8e8'
      }}>
        <Space>
          <FilterOutlined style={{ color: '#666' }} />
          <Select
            value={filterType}
            onChange={setFilterType}
            style={{ width: 120 }}
            placeholder="服务类型"
          >
            <Option value="all">全部类型</Option>
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
          
          <RangePicker
            value={filterDateRange}
            onChange={setFilterDateRange}
            placeholder={['开始时间', '结束时间']}
            style={{ width: 240 }}
            allowClear
          />
          
          <Button
            onClick={() => {
              setFilterType('all');
              setFilterDateRange(null);
            }}
            size="small"
          >
            重置筛选
          </Button>
        </Space>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Text type="secondary" style={{ fontSize: '14px' }}>
            共 {filteredServiceRecords.length} 条记录
            {filteredServiceRecords.length !== serviceRecords.length && (
              <span style={{ color: '#1890ff' }}>
                （已筛选，总共 {serviceRecords.length} 条）
              </span>
            )}
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
      </div>
      
      <Timeline
        style={{ padding: '16px 0' }}
        items={filteredServiceRecords.map((record) => {
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
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {record.timestamp}
                    </Text>
                    {onEditRecord && (
                      <Button
                        type="text"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => handleEditRecord(record)}
                        style={{ marginLeft: '8px' }}
                      />
                    )}
                  </div>
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
                
                {/* 关联/附件 - 每条记录都显示 */}
                <div style={{ 
                  padding: '8px 12px', 
                  background: '#e6f7ff', 
                  borderRadius: '4px',
                  border: '1px solid #91d5ff',
                  marginTop: '8px'
                }}>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    关联/附件：
                  </Text>
                  {record.relatedPlaybookId && (
                    <Tag color="blue" style={{ marginLeft: '4px', fontSize: '11px' }}>
                      剧本: {record.relatedPlaybookId}
                    </Tag>
                  )}
                  {record.relatedRiskEventId && (
                    <Tag color="red" style={{ marginLeft: '4px', fontSize: '11px' }}>
                      风险事件: {record.relatedRiskEventId}
                    </Tag>
                  )}
                  {record.attachments && record.attachments.map((attachment: string, index: number) => {
                    // 检查是否是交接单
                    if (attachment.includes('交接单')) {
                      return (
                        <Tag 
                          key={index} 
                          color="green" 
                          style={{ marginLeft: '4px', fontSize: '11px', cursor: 'pointer' }}
                          icon={<FileTextOutlined />}
                          onClick={() => setHandoverDetailVisible(true)}
                        >
                          {attachment}
                        </Tag>
                      );
                    }
                    return (
                      <Tag key={index} color="green" style={{ marginLeft: '4px', fontSize: '11px' }}>
                        {attachment}
                      </Tag>
                    );
                  })}
                  {(!record.relatedPlaybookId && !record.relatedRiskEventId && (!record.attachments || record.attachments.length === 0)) && (
                    <Text type="secondary" style={{ fontSize: '11px', marginLeft: '4px' }}>
                      暂无
                    </Text>
                  )}
                </div>
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
          <Form.Item name="attachments" label="关联/附件">
            <Select mode="tags" placeholder="请输入关联信息或附件（可多选）">
              <Option value="合同文档">合同文档</Option>
              <Option value="技术方案">技术方案</Option>
              <Option value="培训材料">培训材料</Option>
              <Option value="问题记录">问题记录</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="编辑服务记录"
        open={editRecordModalVisible}
        onCancel={() => {
          setEditRecordModalVisible(false);
          setEditingRecord(null);
          editForm.resetFields();
        }}
        onOk={handleSaveEdit}
        width={600}
        destroyOnClose
      >
        <Form form={editForm} layout="vertical">
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
          <Form.Item name="attachments" label="关联/附件">
            <Select mode="tags" placeholder="请输入关联信息或附件（可多选）">
              <Option value="合同文档">合同文档</Option>
              <Option value="技术方案">技术方案</Option>
              <Option value="培训材料">培训材料</Option>
              <Option value="问题记录">问题记录</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* 交接单详情弹窗 */}
      <Modal
        title="交接单详情"
        open={handoverDetailVisible}
        onCancel={() => setHandoverDetailVisible(false)}
        footer={[
          <Button key="close" onClick={() => setHandoverDetailVisible(false)}>
            关闭
          </Button>
        ]}
        width={800}
      >
        {handoverData ? (
          <div>
            <Descriptions title="基本信息" bordered column={2} size="small">
              <Descriptions.Item label="交接单号">{handoverData.id}</Descriptions.Item>
              <Descriptions.Item label="客户名称">{handoverData.customerName}</Descriptions.Item>
              <Descriptions.Item label="项目名称">{handoverData.projectName}</Descriptions.Item>
              <Descriptions.Item label="交接状态">{handoverData.status}</Descriptions.Item>
              <Descriptions.Item label="交接时间">{handoverData.deliveredAt}</Descriptions.Item>
              <Descriptions.Item label="负责人">{handoverData.handoverPerson}</Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions title="CRM信息" bordered column={2} size="small">
              <Descriptions.Item label="客户经理">{handoverData.crmInfo?.accountManager}</Descriptions.Item>
              <Descriptions.Item label="销售阶段">{handoverData.crmInfo?.salesStage}</Descriptions.Item>
              <Descriptions.Item label="合同金额">{handoverData.crmInfo?.contractAmount}</Descriptions.Item>
              <Descriptions.Item label="预计收入">{handoverData.crmInfo?.expectedRevenue}</Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions title="风险与商机" bordered column={1} size="small">
              <Descriptions.Item label="风险点">
                {handoverData.risks?.map((risk: any, index: number) => (
                  <div key={index} style={{ marginBottom: '8px' }}>
                    <Tag color="red">{risk.level}</Tag>
                    {risk.description}
                  </div>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label="商机点">
                {handoverData.opportunities?.map((opportunity: any, index: number) => (
                  <div key={index} style={{ marginBottom: '8px' }}>
                    <Tag color="green">{opportunity.type}</Tag>
                    {opportunity.description}
                  </div>
                ))}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions title="干系人信息" bordered column={1} size="small">
              <Descriptions.Item label="关键联系人">
                {handoverData.stakeholders?.map((stakeholder: any, index: number) => (
                  <div key={index} style={{ marginBottom: '8px' }}>
                    <strong>{stakeholder.name}</strong> - {stakeholder.role}
                    <br />
                    <Text type="secondary">
                      电话: {stakeholder.phone} | 邮箱: {stakeholder.email}
                    </Text>
                  </div>
                ))}
              </Descriptions.Item>
            </Descriptions>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Text type="secondary">暂无交接单详情数据</Text>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ServiceRecordTab;