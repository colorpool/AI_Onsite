import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Table,
  Button,
  Space,
  Typography,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  DatePicker,
  Switch,
  message,
  Popconfirm,
  Tooltip,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  FileTextOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  SendOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface ContentItem {
  id: string;
  title: string;
  type: 'article' | 'video' | 'image' | 'interactive';
  status: 'draft' | 'published' | 'scheduled';
  category: string;
  author: string;
  createTime: string;
  publishTime?: string;
  views: number;
  likes: number;
  comments: number;
  tags: string[];
}

const ContentManagement: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);
  const [form] = Form.useForm();

  // 模拟数据
  const contentData: ContentItem[] = [
    {
      id: '1',
      title: 'AI学习入门指南',
      type: 'article',
      status: 'published',
      category: '教程',
      author: '张老师',
      createTime: '2024-01-15 10:00:00',
      publishTime: '2024-01-15 14:00:00',
      views: 1250,
      likes: 89,
      comments: 23,
      tags: ['AI', '入门', '教程'],
    },
    {
      id: '2',
      title: '机器学习实战视频',
      type: 'video',
      status: 'published',
      category: '视频课程',
      author: '李老师',
      createTime: '2024-01-14 09:30:00',
      publishTime: '2024-01-14 16:00:00',
      views: 2100,
      likes: 156,
      comments: 45,
      tags: ['机器学习', '实战', '视频'],
    },
    {
      id: '3',
      title: '深度学习算法解析',
      type: 'article',
      status: 'draft',
      category: '技术文档',
      author: '王老师',
      createTime: '2024-01-13 15:20:00',
      views: 0,
      likes: 0,
      comments: 0,
      tags: ['深度学习', '算法'],
    },
  ];

  const getTypeIcon = (type: string) => {
    const icons = {
      article: <FileTextOutlined />,
      video: <VideoCameraOutlined />,
      image: <PictureOutlined />,
      interactive: <SendOutlined />,
    };
    return icons[type as keyof typeof icons] || <FileTextOutlined />;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'orange',
      published: 'green',
      scheduled: 'blue',
    };
    return colors[status as keyof typeof colors] || 'default';
  };

  const getStatusText = (status: string) => {
    const texts = {
      draft: '草稿',
      published: '已发布',
      scheduled: '定时发布',
    };
    return texts[status as keyof typeof texts] || status;
  };

  const columns: ColumnsType<ContentItem> = [
    {
      title: '内容信息',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space>
          {getTypeIcon(record.type)}
          <div>
            <div style={{ fontWeight: 500 }}>{text}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {record.category} · {record.author}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <Space wrap>
          {tags.map((tag, index) => (
            <Tag key={index} color="blue" style={{ fontSize: '11px' }}>
              {tag}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (time) => dayjs(time).format('MM-DD HH:mm'),
    },
    {
      title: '发布时间',
      dataIndex: 'publishTime',
      key: 'publishTime',
      render: (time) => time ? dayjs(time).format('MM-DD HH:mm') : '-',
    },
    {
      title: '数据统计',
      key: 'stats',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Text style={{ fontSize: '12px' }}>浏览: {record.views}</Text>
          <Text style={{ fontSize: '12px' }}>点赞: {record.likes}</Text>
          <Text style={{ fontSize: '12px' }}>评论: {record.comments}</Text>
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Tooltip title="预览">
            <Button type="text" size="small" icon={<EyeOutlined />} />
          </Tooltip>
          <Tooltip title="编辑">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title="确定删除这个内容吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Tooltip title="删除">
              <Button type="text" size="small" icon={<DeleteOutlined />} danger />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleCreate = () => {
    setEditingContent(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (content: ContentItem) => {
    setEditingContent(content);
    form.setFieldsValue({
      ...content,
      publishTime: content.publishTime ? dayjs(content.publishTime) : null,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    message.success('删除成功');
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      console.log('Form values:', values);
      message.success(editingContent ? '更新成功' : '创建成功');
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div style={{ padding: '32px 40px', background: '#f5f5f5', minHeight: 'calc(100vh - 64px)' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>
          <FileTextOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          互动内容管理
        </Title>
        <Text type="secondary">创建、编辑和管理各类互动内容，提升用户参与度</Text>
      </div>

      {/* 统计概览 */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <FileTextOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
              <div style={{ marginTop: '8px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>156</div>
                <div style={{ color: '#666' }}>文章内容</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <VideoCameraOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
              <div style={{ marginTop: '8px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>89</div>
                <div style={{ color: '#666' }}>视频内容</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <PictureOutlined style={{ fontSize: '24px', color: '#722ed1' }} />
              <div style={{ marginTop: '8px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>234</div>
                <div style={{ color: '#666' }}>图片内容</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <SendOutlined style={{ fontSize: '24px', color: '#fa8c16' }} />
              <div style={{ marginTop: '8px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>67</div>
                <div style={{ color: '#666' }}>互动内容</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 内容管理表格 */}
      <Card
        title="内容列表"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            创建内容
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={contentData}
          rowKey="id"
          pagination={{
            total: contentData.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
          }}
        />
      </Card>

      {/* 创建/编辑内容弹窗 */}
      <Modal
        title={editingContent ? '编辑内容' : '创建内容'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
        okText="确定"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="内容标题"
                rules={[{ required: true, message: '请输入内容标题' }]}
              >
                <Input placeholder="请输入内容标题" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="内容类型"
                rules={[{ required: true, message: '请选择内容类型' }]}
              >
                <Select placeholder="请选择内容类型">
                  <Option value="article">文章</Option>
                  <Option value="video">视频</Option>
                  <Option value="image">图片</Option>
                  <Option value="interactive">互动内容</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="category"
                label="内容分类"
                rules={[{ required: true, message: '请输入内容分类' }]}
              >
                <Input placeholder="请输入内容分类" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tags"
                label="标签"
                rules={[{ required: true, message: '请输入标签' }]}
              >
                <Select mode="tags" placeholder="请输入标签，按回车添加">
                  <Option value="AI">AI</Option>
                  <Option value="机器学习">机器学习</Option>
                  <Option value="深度学习">深度学习</Option>
                  <Option value="教程">教程</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="content"
            label="内容详情"
            rules={[{ required: true, message: '请输入内容详情' }]}
          >
            <TextArea rows={6} placeholder="请输入内容详情" />
          </Form.Item>

          <Form.Item name="file" label="上传文件">
            <Upload>
              <Button icon={<UploadOutlined />}>选择文件</Button>
            </Upload>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="publishTime" label="发布时间">
                <DatePicker
                  showTime
                  placeholder="选择发布时间"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="autoPublish" label="自动发布" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ContentManagement;