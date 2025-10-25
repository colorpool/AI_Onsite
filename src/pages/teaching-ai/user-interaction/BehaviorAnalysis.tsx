import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  DatePicker,
  Select,
  Button,
  Space,
  Typography,
  Tag,
  Progress,
  Tooltip,
  Divider,
} from 'antd';
import {
  UserOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  InteractionOutlined,
  RiseOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

interface UserBehaviorData {
  id: string;
  userId: string;
  userName: string;
  loginCount: number;
  pageViews: number;
  avgSessionDuration: number;
  interactionScore: number;
  lastActiveTime: string;
  userType: 'new' | 'active' | 'inactive';
  preferredContent: string[];
}

const BehaviorAnalysis: React.FC = () => {
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().subtract(7, 'day'),
    dayjs(),
  ]);
  const [userTypeFilter, setUserTypeFilter] = useState<string>('all');

  // 模拟数据
  const behaviorData: UserBehaviorData[] = [
    {
      id: '1',
      userId: 'U001',
      userName: '张三',
      loginCount: 15,
      pageViews: 120,
      avgSessionDuration: 25.5,
      interactionScore: 85,
      lastActiveTime: '2024-01-15 14:30:00',
      userType: 'active',
      preferredContent: ['AI课程', '编程教程'],
    },
    {
      id: '2',
      userId: 'U002',
      userName: '李四',
      loginCount: 8,
      pageViews: 45,
      avgSessionDuration: 12.3,
      interactionScore: 62,
      lastActiveTime: '2024-01-14 09:15:00',
      userType: 'new',
      preferredContent: ['基础教程'],
    },
    {
      id: '3',
      userId: 'U003',
      userName: '王五',
      loginCount: 2,
      pageViews: 8,
      avgSessionDuration: 5.2,
      interactionScore: 28,
      lastActiveTime: '2024-01-10 16:45:00',
      userType: 'inactive',
      preferredContent: ['产品介绍'],
    },
  ];

  const columns: ColumnsType<UserBehaviorData> = [
    {
      title: '用户信息',
      dataIndex: 'userName',
      key: 'userName',
      render: (text, record) => (
        <Space>
          <UserOutlined />
          <div>
            <div>{text}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              ID: {record.userId}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: '用户类型',
      dataIndex: 'userType',
      key: 'userType',
      render: (type: 'new' | 'active' | 'inactive') => {
        const config = {
          new: { color: 'green', text: '新用户' },
          active: { color: 'blue', text: '活跃用户' },
          inactive: { color: 'red', text: '不活跃用户' },
        };
        return <Tag color={config[type].color}>{config[type].text}</Tag>;
      },
    },
    {
      title: '登录次数',
      dataIndex: 'loginCount',
      key: 'loginCount',
      sorter: (a, b) => a.loginCount - b.loginCount,
    },
    {
      title: '页面浏览量',
      dataIndex: 'pageViews',
      key: 'pageViews',
      sorter: (a, b) => a.pageViews - b.pageViews,
    },
    {
      title: '平均会话时长(分钟)',
      dataIndex: 'avgSessionDuration',
      key: 'avgSessionDuration',
      render: (duration) => `${duration}分钟`,
      sorter: (a, b) => a.avgSessionDuration - b.avgSessionDuration,
    },
    {
      title: '互动评分',
      dataIndex: 'interactionScore',
      key: 'interactionScore',
      render: (score) => (
        <Tooltip title={`互动评分: ${score}/100`}>
          <Progress
            percent={score}
            size="small"
            status={score >= 70 ? 'success' : score >= 40 ? 'normal' : 'exception'}
            showInfo={false}
            style={{ width: '80px' }}
          />
          <span style={{ marginLeft: '8px' }}>{score}</span>
        </Tooltip>
      ),
      sorter: (a, b) => a.interactionScore - b.interactionScore,
    },
    {
      title: '最后活跃时间',
      dataIndex: 'lastActiveTime',
      key: 'lastActiveTime',
      render: (time) => dayjs(time).format('MM-DD HH:mm'),
    },
    {
      title: '偏好内容',
      dataIndex: 'preferredContent',
      key: 'preferredContent',
      render: (content: string[]) => (
        <Space wrap>
          {content.map((item: string, index: number) => (
            <Tag key={index} color="blue">
              {item}
            </Tag>
          ))}
        </Space>
      ),
    },
  ];

  const filteredData = behaviorData.filter(
    (item) => userTypeFilter === 'all' || item.userType === userTypeFilter
  );

  return (
    <div style={{ padding: '32px 40px', background: '#f5f5f5', minHeight: 'calc(100vh - 64px)' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>
          <InteractionOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          用户行为分析
        </Title>
        <Text type="secondary">深入分析用户行为模式，优化用户体验和互动策略</Text>
      </div>

      {/* 统计概览 */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总用户数"
              value={1234}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="活跃用户数"
              value={856}
              prefix={<RiseOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="平均页面浏览量"
              value={58}
              prefix={<EyeOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="平均会话时长"
              value={14.2}
              suffix="分钟"
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 筛选和操作区域 */}
      <Card style={{ marginBottom: '24px' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Space>
              <Text strong>时间范围：</Text>
              <RangePicker
                value={dateRange}
                onChange={(dates) => setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])}
                format="YYYY-MM-DD"
              />
              <Text strong>用户类型：</Text>
              <Select
                value={userTypeFilter}
                onChange={setUserTypeFilter}
                style={{ width: 120 }}
              >
                <Option value="all">全部</Option>
                <Option value="new">新用户</Option>
                <Option value="active">活跃用户</Option>
                <Option value="inactive">不活跃用户</Option>
              </Select>
            </Space>
          </Col>
          <Col>
            <Space>
              <Button type="primary" icon={<DownloadOutlined />}>
                导出数据
              </Button>
              <Button>刷新</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 用户行为详细数据表格 */}
      <Card title="用户行为详细数据" extra={<Text type="secondary">共 {filteredData.length} 条记录</Text>}>
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            total: filteredData.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* 行为趋势分析 */}
      <Row gutter={16} style={{ marginTop: '24px' }}>
        <Col span={12}>
          <Card title="用户活跃度趋势" extra={<Button size="small">查看详情</Button>}>
            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Text type="secondary">图表组件占位 - 用户活跃度趋势图</Text>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="内容偏好分布" extra={<Button size="small">查看详情</Button>}>
            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Text type="secondary">图表组件占位 - 内容偏好分布图</Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BehaviorAnalysis;