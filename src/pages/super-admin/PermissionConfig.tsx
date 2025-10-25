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
  Tree,
  message,
  Tag,
  Popconfirm,
  Row,
  Col,
  Tabs,
  Transfer,
  Checkbox,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  SettingOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { DataNode } from 'antd/es/tree';

const { Option } = Select;
const { TabPane } = Tabs;

interface Role {
  id: string;
  name: string;
  code: string;
  description: string;
  status: 'active' | 'inactive';
  permissions: string[];
  userCount: number;
  createTime: string;
}

interface User {
  id: string;
  username: string;
  realName: string;
  email: string;
  roles: string[];
  status: 'active' | 'inactive';
  lastLogin: string;
}

interface Permission {
  id: string;
  name: string;
  code: string;
  type: 'menu' | 'button' | 'api';
  parentId?: string;
  children?: Permission[];
}

const PermissionConfig: React.FC = () => {
  // 角色数据
  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: '超级管理员',
      code: 'super_admin',
      description: '拥有系统所有权限',
      status: 'active',
      permissions: ['dashboard', 'user_manage', 'role_manage', 'system_config'],
      userCount: 2,
      createTime: '2024-01-01',
    },
    {
      id: '2',
      name: '客户成功经理',
      code: 'cs_manager',
      description: '客户成功服务相关权限',
      status: 'active',
      permissions: ['dashboard', 'customer_manage', 'service_manage'],
      userCount: 15,
      createTime: '2024-01-15',
    },
    {
      id: '3',
      name: '智能驻场专员',
      code: 'onsite_specialist',
      description: '智能驻场相关权限',
      status: 'active',
      permissions: ['dashboard', 'onsite_manage', 'ai_tools'],
      userCount: 8,
      createTime: '2024-02-01',
    },
  ]);

  // 用户数据
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      username: 'admin',
      realName: '系统管理员',
      email: 'admin@example.com',
      roles: ['1'],
      status: 'active',
      lastLogin: '2024-03-15 10:30:00',
    },
    {
      id: '2',
      username: 'zhangsan',
      realName: '张三',
      email: 'zhangsan@example.com',
      roles: ['2'],
      status: 'active',
      lastLogin: '2024-03-15 09:15:00',
    },
    {
      id: '3',
      username: 'lisi',
      realName: '李四',
      email: 'lisi@example.com',
      roles: ['3'],
      status: 'active',
      lastLogin: '2024-03-14 16:45:00',
    },
  ]);

  // 权限树数据
  const permissionTree: DataNode[] = [
    {
      title: '驻场智能看板',
      key: 'dashboard',
      children: [
        { title: '我的工作看板', key: 'dashboard_work' },
        { title: '客户分层盘点', key: 'dashboard_layers' },
        { title: '近期客户关注重点', key: 'dashboard_focus' },
      ],
    },
    {
      title: '动态客户档案',
      key: 'customer_manage',
      children: [
        { title: '客户档案', key: 'customer_profile' },
        { title: '交接实施', key: 'customer_handover' },
        { title: '持续服务', key: 'customer_service' },
        { title: '续约管理', key: 'customer_renewal' },
      ],
    },
    {
      title: 'AI智能工具箱',
      key: 'ai_tools',
      children: [
        { title: '实施顾问分身', key: 'ai_consultant' },
        { title: '续费模拟器', key: 'ai_simulator' },
        { title: '预测水晶球', key: 'ai_prediction' },
      ],
    },
    {
      title: '系统管理',
      key: 'system_manage',
      children: [
        { title: '用户管理', key: 'user_manage' },
        { title: '角色管理', key: 'role_manage' },
        { title: '权限管理', key: 'permission_manage' },
        { title: '系统配置', key: 'system_config' },
      ],
    },
  ];

  const [isRoleModalVisible, setIsRoleModalVisible] = useState(false);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [roleForm] = Form.useForm();
  const [userForm] = Form.useForm();
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  // 角色表格列
  const roleColumns: ColumnsType<Role> = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '角色编码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '用户数',
      dataIndex: 'userCount',
      key: 'userCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditRole(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个角色吗？"
            onConfirm={() => handleDeleteRole(record.id)}
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

  // 用户表格列
  const userColumns: ColumnsType<User> = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '真实姓名',
      dataIndex: 'realName',
      key: 'realName',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '角色',
      dataIndex: 'roles',
      key: 'roles',
      render: (roleIds: string[]) => (
        <>
          {roleIds.map(roleId => {
            const role = roles.find(r => r.id === roleId);
            return role ? <Tag key={roleId}>{role.name}</Tag> : null;
          })}
        </>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '最后登录',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个用户吗？"
            onConfirm={() => handleDeleteUser(record.id)}
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

  // 角色操作
  const handleAddRole = () => {
    setEditingRole(null);
    roleForm.resetFields();
    setSelectedPermissions([]);
    setIsRoleModalVisible(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    roleForm.setFieldsValue(role);
    setSelectedPermissions(role.permissions);
    setIsRoleModalVisible(true);
  };

  const handleDeleteRole = (id: string) => {
    setRoles(roles.filter(item => item.id !== id));
    message.success('删除成功');
  };

  const handleRoleSubmit = async () => {
    try {
      const values = await roleForm.validateFields();
      
      if (editingRole) {
        setRoles(roles.map(item => 
          item.id === editingRole.id 
            ? { ...item, ...values, permissions: selectedPermissions }
            : item
        ));
        message.success('更新成功');
      } else {
        const newRole: Role = {
          ...values,
          id: Date.now().toString(),
          permissions: selectedPermissions,
          userCount: 0,
          createTime: new Date().toISOString().split('T')[0],
        };
        setRoles([...roles, newRole]);
        message.success('添加成功');
      }
      
      setIsRoleModalVisible(false);
      roleForm.resetFields();
      setSelectedPermissions([]);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 用户操作
  const handleAddUser = () => {
    setEditingUser(null);
    userForm.resetFields();
    setIsUserModalVisible(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    userForm.setFieldsValue(user);
    setIsUserModalVisible(true);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(item => item.id !== id));
    message.success('删除成功');
  };

  const handleUserSubmit = async () => {
    try {
      const values = await userForm.validateFields();
      
      if (editingUser) {
        setUsers(users.map(item => 
          item.id === editingUser.id 
            ? { ...item, ...values }
            : item
        ));
        message.success('更新成功');
      } else {
        const newUser: User = {
          ...values,
          id: Date.now().toString(),
          lastLogin: '-',
        };
        setUsers([...users, newUser]);
        message.success('添加成功');
      }
      
      setIsUserModalVisible(false);
      userForm.resetFields();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Tabs defaultActiveKey="roles">
        <TabPane tab={<span><KeyOutlined />角色管理</span>} key="roles">
          <Card
            title="角色管理"
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddRole}
              >
                新增角色
              </Button>
            }
          >
            <Table
              columns={roleColumns}
              dataSource={roles}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab={<span><UserOutlined />用户管理</span>} key="users">
          <Card
            title="用户管理"
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddUser}
              >
                新增用户
              </Button>
            }
          >
            <Table
              columns={userColumns}
              dataSource={users}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab={<span><SettingOutlined />权限配置</span>} key="permissions">
          <Card title="权限树结构">
            <Tree
              checkable
              defaultExpandAll
              treeData={permissionTree}
              style={{ marginTop: 16 }}
            />
          </Card>
        </TabPane>
      </Tabs>

      {/* 角色编辑弹窗 */}
      <Modal
        title={editingRole ? '编辑角色' : '新增角色'}
        open={isRoleModalVisible}
        onOk={handleRoleSubmit}
        onCancel={() => {
          setIsRoleModalVisible(false);
          roleForm.resetFields();
          setSelectedPermissions([]);
        }}
        width={800}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={roleForm}
          layout="vertical"
          initialValues={{ status: 'active' }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="角色名称"
                rules={[{ required: true, message: '请输入角色名称' }]}
              >
                <Input placeholder="请输入角色名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="code"
                label="角色编码"
                rules={[{ required: true, message: '请输入角色编码' }]}
              >
                <Input placeholder="请输入角色编码" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="角色描述"
            rules={[{ required: true, message: '请输入角色描述' }]}
          >
            <Input.TextArea rows={3} placeholder="请输入角色描述" />
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Option value="active">启用</Option>
              <Option value="inactive">禁用</Option>
            </Select>
          </Form.Item>

          <Form.Item label="权限配置">
            <Tree
              checkable
              checkedKeys={selectedPermissions}
              onCheck={(checkedKeys) => {
                setSelectedPermissions(checkedKeys as string[]);
              }}
              treeData={permissionTree}
              style={{ border: '1px solid #d9d9d9', borderRadius: 6, padding: 8 }}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 用户编辑弹窗 */}
      <Modal
        title={editingUser ? '编辑用户' : '新增用户'}
        open={isUserModalVisible}
        onOk={handleUserSubmit}
        onCancel={() => {
          setIsUserModalVisible(false);
          userForm.resetFields();
        }}
        width={600}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={userForm}
          layout="vertical"
          initialValues={{ status: 'active' }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="username"
                label="用户名"
                rules={[{ required: true, message: '请输入用户名' }]}
              >
                <Input placeholder="请输入用户名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="realName"
                label="真实姓名"
                rules={[{ required: true, message: '请输入真实姓名' }]}
              >
                <Input placeholder="请输入真实姓名" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入正确的邮箱格式' }
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            name="roles"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select
              mode="multiple"
              placeholder="请选择角色"
              style={{ width: '100%' }}
            >
              {roles.map(role => (
                <Option key={role.id} value={role.id}>
                  {role.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Option value="active">启用</Option>
              <Option value="inactive">禁用</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PermissionConfig;