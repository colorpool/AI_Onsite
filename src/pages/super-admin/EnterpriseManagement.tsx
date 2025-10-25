import React, { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message,
  Tag,
  Popconfirm,
  Row,
  Col,
  Statistic,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface Enterprise {
  id: string;
  name: string;
  code: string;
  industry: string;
  scale: string;
  status: 'active' | 'inactive' | 'trial';
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  createTime: string;
  expireTime: string;
  userCount: number;
  maxUsers: number;
}

const EnterpriseManagement: React.FC = () => {
  const [enterprises, setEnterprises] = useState<Enterprise[]>([
    {
      id: '1',
      name: '阿里巴巴集团',
      code: 'ALI001',
      industry: '互联网',
      scale: '大型企业',
      status: 'active',
      contactPerson: '张三',
      contactPhone: '13800138000',
      contactEmail: 'zhangsan@alibaba.com',
      createTime: '2024-01-15',
      expireTime: '2024-12-31',
      userCount: 1250,
      maxUsers: 2000,
    },
    {
      id: '2',
      name: '腾讯科技',
      code: 'TX002',
      industry: '互联网',
      scale: '大型企业',
      status: 'active',
      contactPerson: '李四',
      contactPhone: '13900139000',
      contactEmail: 'lisi@tencent.com',
      createTime: '2024-02-20',
      expireTime: '2024-11-30',
      userCount: 980,
      maxUsers: 1500,
    },
    {
      id: '3',
      name: '字节跳动',
      code: 'BD003',
      industry: '互联网',
      scale: '大型企业',
      status: 'trial',
      contactPerson: '王五',
      contactPhone: '13700137000',
      contactEmail: 'wangwu@bytedance.com',
      createTime: '2024-03-10',
      expireTime: '2024-04-10',
      userCount: 50,
      maxUsers: 100,
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEnterprise, setEditingEnterprise] = useState<Enterprise | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  const columns: ColumnsType<Enterprise> = [
    {
      title: '企业名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toString().toLowerCase()) ||
        record.code.toLowerCase().includes(value.toString().toLowerCase()),
    },
    {
      title: '企业编码',
      dataIndex: 'code',
      key: 'code',
      width: 120,
    },
    {
      title: '行业',
      dataIndex: 'industry',
      key: 'industry',
      width: 100,
    },
    {
      title: '企业规模',
      dataIndex: 'scale',
      key: 'scale',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        const statusConfig = {
          active: { color: 'green', text: '正常' },
          inactive: { color: 'red', text: '停用' },
          trial: { color: 'orange', text: '试用' },
        };
        const config = statusConfig[status as keyof typeof statusConfig];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '用户数/上限',
      key: 'userInfo',
      width: 120,
      render: (_, record) => (
        <span>
          {record.userCount}/{record.maxUsers}
        </span>
      ),
    },
    {
      title: '联系人',
      dataIndex: 'contactPerson',
      key: 'contactPerson',
      width: 100,
    },
    {
      title: '联系电话',
      dataIndex: 'contactPhone',
      key: 'contactPhone',
      width: 130,
    },
    {
      title: '到期时间',
      dataIndex: 'expireTime',
      key: 'expireTime',
      width: 120,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个企业吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button
              type="link"
              size="small"
              danger
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingEnterprise(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (enterprise: Enterprise) => {
    setEditingEnterprise(enterprise);
    form.setFieldsValue(enterprise);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    setEnterprises(enterprises.filter(item => item.id !== id));
    message.success('删除成功');
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingEnterprise) {
        // 编辑
        setEnterprises(enterprises.map(item => 
          item.id === editingEnterprise.id 
            ? { ...item, ...values }
            : item
        ));
        message.success('更新成功');
      } else {
        // 新增
        const newEnterprise: Enterprise = {
          ...values,
          id: Date.now().toString(),
          createTime: new Date().toISOString().split('T')[0],
          userCount: 0,
        };
        setEnterprises([...enterprises, newEnterprise]);
        message.success('添加成功');
      }
      
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleExport = () => {
    message.info('导出功能开发中...');
  };

  // 统计数据
  const totalEnterprises = enterprises.length;
  const activeEnterprises = enterprises.filter(e => e.status === 'active').length;
  const trialEnterprises = enterprises.filter(e => e.status === 'trial').length;
  const totalUsers = enterprises.reduce((sum, e) => sum + e.userCount, 0);

  return (
    <div style={{ padding: '24px' }}>
      {/* 统计卡片 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="企业总数"
              value={totalEnterprises}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="正常企业"
              value={activeEnterprises}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="试用企业"
              value={trialEnterprises}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总用户数"
              value={totalUsers}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 主要内容 */}
      <Card
        title="企业管理"
        extra={
          <Space>
            <Input.Search
              placeholder="搜索企业名称或编码"
              allowClear
              style={{ width: 250 }}
              onSearch={setSearchText}
              onChange={(e) => !e.target.value && setSearchText('')}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >
              新增企业
            </Button>
            <Button
              icon={<ExportOutlined />}
              onClick={handleExport}
            >
              导出数据
            </Button>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={enterprises}
          rowKey="id"
          pagination={{
            total: enterprises.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
          }}
        />
      </Card>

      {/* 新增/编辑弹窗 */}
      <Modal
        title={editingEnterprise ? '编辑企业' : '新增企业'}
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        width={600}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            status: 'trial',
            scale: '中小企业',
            industry: '互联网',
            maxUsers: 100,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="企业名称"
                rules={[{ required: true, message: '请输入企业名称' }]}
              >
                <Input placeholder="请输入企业名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="code"
                label="企业编码"
                rules={[{ required: true, message: '请输入企业编码' }]}
              >
                <Input placeholder="请输入企业编码" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="industry"
                label="行业"
                rules={[{ required: true, message: '请选择行业' }]}
              >
                <Select placeholder="请选择行业">
                  <Option value="互联网">互联网</Option>
                  <Option value="金融">金融</Option>
                  <Option value="制造业">制造业</Option>
                  <Option value="教育">教育</Option>
                  <Option value="医疗">医疗</Option>
                  <Option value="其他">其他</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="scale"
                label="企业规模"
                rules={[{ required: true, message: '请选择企业规模' }]}
              >
                <Select placeholder="请选择企业规模">
                  <Option value="小微企业">小微企业</Option>
                  <Option value="中小企业">中小企业</Option>
                  <Option value="中型企业">中型企业</Option>
                  <Option value="大型企业">大型企业</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="status"
                label="状态"
                rules={[{ required: true, message: '请选择状态' }]}
              >
                <Select placeholder="请选择状态">
                  <Option value="trial">试用</Option>
                  <Option value="active">正常</Option>
                  <Option value="inactive">停用</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="maxUsers"
                label="用户上限"
                rules={[{ required: true, message: '请输入用户上限' }]}
              >
                <Input type="number" placeholder="请输入用户上限" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="contactPerson"
                label="联系人"
                rules={[{ required: true, message: '请输入联系人' }]}
              >
                <Input placeholder="请输入联系人" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="contactPhone"
                label="联系电话"
                rules={[{ required: true, message: '请输入联系电话' }]}
              >
                <Input placeholder="请输入联系电话" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="contactEmail"
                label="联系邮箱"
                rules={[
                  { required: true, message: '请输入联系邮箱' },
                  { type: 'email', message: '请输入正确的邮箱格式' }
                ]}
              >
                <Input placeholder="请输入联系邮箱" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="expireTime"
            label="到期时间"
            rules={[{ required: true, message: '请选择到期时间' }]}
          >
            <DatePicker style={{ width: '100%' }} placeholder="请选择到期时间" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EnterpriseManagement;