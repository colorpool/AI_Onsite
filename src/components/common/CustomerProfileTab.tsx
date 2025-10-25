import React, { useState } from 'react';
import { 
  Card,
  Descriptions, 
  Tag, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Space,
  Typography,
  message,
  InputNumber,
  DatePicker,
  Checkbox,
  Divider
} from 'antd';
import { 
  DollarOutlined, 
  UserOutlined, 
  TeamOutlined, 
  EditOutlined, 
  PlusOutlined,
  CopyOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text } = Typography;
const { Option } = Select;

interface CustomerProfileTabProps {
  customer: any;
  lifecycle?: 'renewal' | 'continuous' | 'handover';
  onEditContract?: () => void;
  onEditContacts?: () => void;
}

const CustomerProfileTab: React.FC<CustomerProfileTabProps> = ({
  customer,
  lifecycle = 'continuous',
  onEditContract,
  onEditContacts
}) => {
  // 关键联系人本地可编辑数据
  const [keyContacts, setKeyContacts] = useState(customer?.keyContacts || []);
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [editingContactIndex, setEditingContactIndex] = useState<number | null>(null);
  const [contactForm] = Form.useForm();

  // 服务成本投入 本地可编辑数据
  type ServiceCostItem = { description: string; amount?: number; time?: string };
  const initialCostDetails: ServiceCostItem[] = (customer?.currentContract?.serviceCostDetails || [
    '客户拜访费用: ¥3,000',
    '礼品采购: ¥5,000', 
    '培训支持: ¥4,000',
    '技术支持: ¥3,000'
  ]).map((detail: any) => {
    if (typeof detail === 'string') {
      const match = detail.match(/^(.*?):\s*¥?([\d,]+)/);
      return {
        description: match ? match[1] : detail.replace(/^•\s*/, '').trim(),
        amount: match ? parseInt(match[2].replace(/,/g, ''), 10) : undefined,
        time: undefined,
      };
    }
    // 兼容对象格式 { description, amount, time }
    return {
      description: detail.description || '',
      amount: detail.amount,
      time: detail.time,
    } as ServiceCostItem;
  });

  const [serviceCostItems, setServiceCostItems] = useState<ServiceCostItem[]>(initialCostDetails);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  // 联系人编辑相关函数
  const handleAddContact = () => {
    setEditingContactIndex(null);
    contactForm.resetFields();
    setContactModalVisible(true);
  };

  const handleEditContact = (index: number) => {
    setEditingContactIndex(index);
    const contact = keyContacts[index];
    contactForm.setFieldsValue({
      name: contact.name,
      title: contact.title,
      phone: contact.phone,
      email: contact.email,
      type: contact.type,
      influence: contact.influence,
      attitude: contact.attitude,
      isPrimary: contact.isPrimary || false,
    });
    setContactModalVisible(true);
  };

  const handleSaveContact = () => {
    contactForm.validateFields().then((values) => {
      // 如果设置为主要联系人，需要将其他联系人的isPrimary设为false
      if (values.isPrimary) {
        const updatedContacts = keyContacts.map((contact: any) => ({ ...contact, isPrimary: false }));
        setKeyContacts(updatedContacts);
      }

      if (editingContactIndex !== null) {
        // 编辑现有联系人
        const updatedContacts = [...keyContacts];
        updatedContacts[editingContactIndex] = { ...updatedContacts[editingContactIndex], ...values };
        setKeyContacts(updatedContacts);
        message.success('联系人信息更新成功');
      } else {
        // 新增联系人
        const newContact = {
          id: Date.now().toString(),
          ...values
        };
        setKeyContacts([...keyContacts, newContact]);
        message.success('联系人添加成功');
      }
      setContactModalVisible(false);
      setEditingContactIndex(null);
    });
  };

  const handleAddCost = () => {
    addForm.validateFields().then((values) => {
      const newItem: ServiceCostItem = {
        description: values.description,
        amount: values.amount,
        time: values.time ? values.time.format('YYYY-MM-DD HH:mm') : undefined,
      };
      setServiceCostItems((prev) => [...prev, newItem]);
      setAddModalVisible(false);
      addForm.resetFields();
      message.success('已添加投入');
    });
  };

  const openEditCost = (index: number) => {
    setEditingIndex(index);
    const item = serviceCostItems[index];
    editForm.setFieldsValue({
      description: item.description,
      amount: item.amount,
      time: item.time ? dayjs(item.time) : undefined,
    });
    setEditModalVisible(true);
  };

  const handleSaveEditCost = () => {
    editForm.validateFields().then((values) => {
      if (editingIndex === null) return;
      const next = [...serviceCostItems];
      next[editingIndex] = {
        description: values.description,
        amount: values.amount,
        time: values.time ? values.time.format('YYYY-MM-DD HH:mm') : next[editingIndex].time,
      };
      setServiceCostItems(next);
      setEditModalVisible(false);
      setEditingIndex(null);
      message.success('已更新投入');
    });
  };

  return (
    <div style={{ padding: '16px 0' }}>
      {/* 合同与服务 */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '12px',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          <DollarOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
          <span>合同与服务</span>
          {onEditContract && (
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={onEditContract}
              size="small"
              style={{ marginLeft: 'auto' }}
            />
          )}
        </div>
        <Descriptions 
          bordered 
          size="small" 
          column={2}
          labelStyle={{ width: '180px', minWidth: '180px' }}
        >
          <Descriptions.Item label="服务开始时间" span={1}>
            {customer?.currentContract?.startDate || '-'}
          </Descriptions.Item>
          
          <Descriptions.Item label="合同金额" span={1}>
            <span style={{ color: '#52c41a', fontWeight: '600' }}>
              ¥{customer?.currentContract?.amount?.toLocaleString() || '0'}
            </span>
          </Descriptions.Item>
          
          <Descriptions.Item label="服务到期时间" span={1}>
            <span style={{ color: '#fa541c' }}>
              {customer?.contractEndDate || '暂无'}
            </span>
          </Descriptions.Item>
          
          <Descriptions.Item label="人数版本" span={1}>
            <span style={{ color: '#52c41a' }}>
              {customer?.currentContract?.userVersion || customer?.scale || '暂无'}
            </span>
          </Descriptions.Item>
          
          {lifecycle !== 'renewal' && (
            <>
              <Descriptions.Item label="提单版本" span={1}>
                <span style={{ color: '#722ed1' }}>
                  {customer?.currentContract?.ticketVersion || '暂无'}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="提单到期时间" span={1}>
                <span style={{ color: '#fa541c' }}>
                  {customer?.ticketExpiryDate || '暂无'}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="天元订单" span={1}>
                <Tag color={customer?.currentContract?.tianyuanOrderStatus === 'active' ? 'green' : 'orange'}>
                  {customer?.currentContract?.tianyuanOrderStatus === 'active' ? '已生效' : '未生效'}
                </Tag>
              </Descriptions.Item>
            </>
          )}
        </Descriptions>
      </div>

      <Divider />

      {/* 基本信息 */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '12px',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          <UserOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
          <span>基本信息</span>
        </div>
        <Descriptions 
          bordered 
          size="small" 
          column={2}
          labelStyle={{ width: '180px', minWidth: '180px' }}
        >
          <Descriptions.Item label="公司名称" span={1}>
            {customer?.companyName || '暂无'}
          </Descriptions.Item>
          
          <Descriptions.Item label="行业" span={1}>
            {customer?.industry || '暂无'}
          </Descriptions.Item>
          
          <Descriptions.Item label="规模" span={1}>
            {customer?.scale || '暂无'}
          </Descriptions.Item>
          
          <Descriptions.Item label="客户类型" span={1}>
            {customer?.customerType || '暂无'}
          </Descriptions.Item>
          
          <Descriptions.Item label="健康分" span={1}>
            <span style={{ 
              color: customer?.healthScore >= 80 ? '#52c41a' : 
                     customer?.healthScore >= 60 ? '#faad14' : '#ff4d4f',
              fontWeight: '600'
            }}>
              {customer?.healthScore || '暂无'}
            </span>
          </Descriptions.Item>
          
          <Descriptions.Item label="建档数" span={1}>
            {customer?.profileCount || '0'}
          </Descriptions.Item>
        </Descriptions>
      </div>

      <Divider />

      {/* 关键联系人 */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '12px',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          <TeamOutlined style={{ color: '#722ed1', marginRight: '8px' }} />
          <span>关键联系人</span>
          <Button 
            type="text" 
            icon={<PlusOutlined />} 
            onClick={() => setContactModalVisible(true)}
            size="small"
            style={{ marginLeft: 'auto' }}
          />
        </div>
        
        {/* 每个联系人使用独立的Descriptions组件 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {keyContacts?.map((contact: any, index: number) => (
            <div key={index} style={{ position: 'relative' }}>
              <Descriptions 
                bordered 
                size="small" 
                column={2} 
                style={{ width: '100%' }}
                labelStyle={{ width: '180px', minWidth: '180px' }}
                contentStyle={{ minWidth: '200px' }}
              >
                <Descriptions.Item label="姓名" span={1}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{contact.name}</span>
                    {contact.isPrimary && <Tag color="green">主要联系人</Tag>}
                  </div>
                </Descriptions.Item>
                
                <Descriptions.Item label="职位" span={1}>
                  {contact.title}
                </Descriptions.Item>
                
                <Descriptions.Item label="电话" span={1}>
                  <span>{contact.phone?.replace(/\*+/g, '') || contact.phone}</span>
                </Descriptions.Item>
                
                <Descriptions.Item label="邮箱" span={1}>
                  <span>{contact.email}</span>
                </Descriptions.Item>
              </Descriptions>
              
              {/* 编辑按钮放在右上角 */}
              <Button 
                type="text" 
                size="small" 
                icon={<EditOutlined />} 
                onClick={() => handleEditContact(index)}
                style={{ 
                  position: 'absolute', 
                  top: '8px', 
                  right: '8px',
                  zIndex: 1
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* 服务成本投入 - 使用Descriptions组件统一样式 */}
      {(lifecycle === 'renewal' || customer?.currentContract?.serviceCost || customer?.currentContract?.serviceCostDetails) && (
        <div style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <DollarOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
              <span style={{ fontSize: '14px', fontWeight: '500' }}>服务成本投入</span>
            </div>
            <Button 
              type="text" 
              size="small" 
              icon={<PlusOutlined />} 
              onClick={() => setAddModalVisible(true)}
            >
            </Button>
          </div>
          
          <Descriptions 
            bordered 
            size="small" 
            column={1}
            labelStyle={{ width: '180px', minWidth: '180px' }}
          >
            <Descriptions.Item label="总投入">
              <Text style={{ color: '#1890ff', fontWeight: 600 }}>
                ¥{customer?.currentContract?.serviceCost?.toLocaleString() || '15,000'}
              </Text>
            </Descriptions.Item>
            
            {serviceCostItems.map((item, index) => (
              <Descriptions.Item 
                key={index} 
                label={item.description}
                style={{ position: 'relative' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    {item.amount !== undefined ? `¥${item.amount.toLocaleString()}` : '—'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Text type="secondary" style={{ marginRight: '8px', fontSize: '12px' }}>
                      {item.time || '—'}
                    </Text>
                    <Button 
                      type="text" 
                      size="small" 
                      icon={<EditOutlined />} 
                      onClick={() => openEditCost(index)}
                    />
                  </div>
                </div>
              </Descriptions.Item>
            ))}
          </Descriptions>
        </div>
      )}

      {/* 添加服务成本投入模态框 */}
      <Modal
        title="添加服务成本投入"
        open={addModalVisible}
        onOk={handleAddCost}
        onCancel={() => setAddModalVisible(false)}
        width={400}
      >
        <Form form={addForm} layout="vertical">
          <Form.Item label="投入描述" name="description" rules={[{ required: true, message: '请输入投入描述' }]}>
            <Input placeholder="例如：客户拜访费用" />
          </Form.Item>
          <Form.Item label="金额" name="amount">
            <InputNumber
              style={{ width: '100%' }}
              formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/¥\s?|(,*)/g, '')}
              placeholder="请输入金额"
            />
          </Form.Item>
          <Form.Item label="时间" name="time">
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 编辑服务成本投入模态框 */}
      <Modal
        title="编辑服务成本投入"
        open={editModalVisible}
        onOk={handleSaveEditCost}
        onCancel={() => setEditModalVisible(false)}
        width={400}
      >
        <Form form={editForm} layout="vertical">
          <Form.Item label="投入描述" name="description" rules={[{ required: true, message: '请输入投入描述' }]}>
            <Input placeholder="例如：客户拜访费用" />
          </Form.Item>
          <Form.Item label="金额" name="amount">
            <InputNumber
              style={{ width: '100%' }}
              formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/¥\s?|(,*)/g, '')}
              placeholder="请输入金额"
            />
          </Form.Item>
          <Form.Item label="时间" name="time">
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 联系人编辑模态框 */}
      <Modal
        title={editingContactIndex !== null ? "编辑联系人" : "添加联系人"}
        open={contactModalVisible}
        onOk={handleSaveContact}
        onCancel={() => {
          setContactModalVisible(false);
          setEditingContactIndex(null);
        }}
        width={500}
      >
        <Form form={contactForm} layout="vertical">
          <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="职位" name="title">
            <Input />
          </Form.Item>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
               <Form.Item label="干系类型" name="type" rules={[{ required: true, message: '请选择干系类型' }]}>
                 <Select>
                   <Option value="decision_maker">决策者</Option>
                   <Option value="influencer">影响者</Option>
                   <Option value="user">使用者</Option>
                   <Option value="gatekeeper">把关者</Option>
                 </Select>
               </Form.Item>
             </div>
            <div style={{ flex: 1 }}>
              <Form.Item label="影响力" name="influence" rules={[{ required: true, message: '请选择影响力' }]}>
                <Select>
                  <Option value="high">高</Option>
                  <Option value="medium">中</Option>
                  <Option value="low">低</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <Form.Item label="态度" name="attitude" rules={[{ required: true, message: '请选择态度' }]}>
            <Select>
              <Option value="positive">积极</Option>
              <Option value="neutral">中性</Option>
              <Option value="negative">消极</Option>
            </Select>
          </Form.Item>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <Form.Item label="电话" name="phone">
                <Input />
              </Form.Item>
            </div>
            <div style={{ flex: 1 }}>
              <Form.Item label="邮箱" name="email">
                <Input />
              </Form.Item>
            </div>
          </div>
          <Form.Item name="isPrimary" valuePropName="checked">
            <Checkbox>设为主要联系人</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CustomerProfileTab;