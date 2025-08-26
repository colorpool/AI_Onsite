import React from 'react';
import { Card, Row, Col, Statistic, Progress, Table, Button, Space, Tag, Avatar } from 'antd';
import { 
  UserOutlined, 
  TeamOutlined, 
  TrophyOutlined, 
  RiseOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  ReloadOutlined,
  ExportOutlined,
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { DashboardMetrics, CustomerProfile } from '@/types/tab';

// 仪表板内容
export const DashboardContent: React.FC = () => {
  const metrics: DashboardMetrics = {
    totalCustomers: 1250,
    activeCustomers: 1180,
    pendingHandovers: 15,
    renewalRate: 85.6,
    satisfactionScore: 92.3,
  };

  const recentActivities = [
    { id: 1, customer: '阿里巴巴', action: '续约成功', time: '2小时前', status: 'success' },
    { id: 2, customer: '腾讯科技', action: '新客户接入', time: '4小时前', status: 'info' },
    { id: 3, customer: '字节跳动', action: '服务升级', time: '6小时前', status: 'warning' },
    { id: 4, customer: '美团点评', action: '问题解决', time: '8小时前', status: 'success' },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总客户数"
              value={metrics.totalCustomers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="活跃客户"
              value={metrics.activeCustomers}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="待交接客户"
              value={metrics.pendingHandovers}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="续约率"
              value={metrics.renewalRate}
              suffix="%"
              prefix={<RiseOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="客户满意度" extra={<Button type="link">查看详情</Button>}>
            <div style={{ textAlign: 'center' }}>
              <Progress
                type="circle"
                percent={metrics.satisfactionScore}
                format={(percent) => `${percent}分`}
                strokeColor="#52c41a"
              />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="最近活动" extra={<Button type="link">查看全部</Button>}>
            <div>
              {recentActivities.map(activity => (
                <div key={activity.id} style={{ marginBottom: 12, display: 'flex', alignItems: 'center' }}>
                  <Avatar size="small" style={{ marginRight: 8 }}>
                    {activity.customer.charAt(0)}
                  </Avatar>
                  <div style={{ flex: 1 }}>
                    <div>{activity.customer}</div>
                    <div style={{ fontSize: 12, color: '#666' }}>{activity.action}</div>
                  </div>
                  <Tag color={activity.status === 'success' ? 'green' : activity.status === 'warning' ? 'orange' : 'blue'}>
                    {activity.time}
                  </Tag>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

// 交接实施内容
export const HandoverImplementationContent: React.FC = () => {
  const handoverData = [
    {
      key: '1',
      customer: '阿里巴巴',
      contact: '张三',
      phone: '13800138000',
      status: 'pending',
      priority: 'high',
      createTime: '2024-01-15',
    },
    {
      key: '2',
      customer: '腾讯科技',
      contact: '李四',
      phone: '13900139000',
      status: 'in_progress',
      priority: 'medium',
      createTime: '2024-01-14',
    },
    {
      key: '3',
      customer: '字节跳动',
      contact: '王五',
      phone: '13700137000',
      status: 'completed',
      priority: 'low',
      createTime: '2024-01-13',
    },
  ];

  const columns = [
    {
      title: '客户名称',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: '联系人',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          pending: { text: '待处理', color: 'orange' },
          in_progress: { text: '进行中', color: 'blue' },
          completed: { text: '已完成', color: 'green' },
        };
        const { text, color } = statusMap[status as keyof typeof statusMap];
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => {
        const priorityMap = {
          high: { text: '高', color: 'red' },
          medium: { text: '中', color: 'orange' },
          low: { text: '低', color: 'green' },
        };
        const { text, color } = priorityMap[priority as keyof typeof priorityMap];
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" size="small">查看详情</Button>
          <Button type="link" size="small">开始交接</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card
        title="交接实施管理"
        extra={
          <Space>
            <Button type="primary" icon={<PlusOutlined />}>
              新建交接
            </Button>
            <Button icon={<DownloadOutlined />}>
              导出数据
            </Button>
          </Space>
        }
      >
        {/* 统计卡片 */}
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col span={6}>
            <Card size="small" title="待交接客户">
              <Statistic title="客户数量" value={8} prefix={<UserOutlined />} />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small" title="进行中交接">
              <Statistic title="客户数量" value={12} prefix={<SyncOutlined spin />} />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small" title="已完成交接">
              <Statistic title="客户数量" value={45} prefix={<CheckCircleOutlined />} />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small" title="实施项目">
              <Statistic title="项目数量" value={15} prefix={<TrophyOutlined />} />
            </Card>
          </Col>
        </Row>

        {/* 交接列表 */}
        <Table
          columns={columns}
          dataSource={handoverData}
          pagination={false}
          size="small"
        />
      </Card>
    </div>
  );
};

// 默认内容
export const DefaultContent: React.FC<{ tabName: string }> = ({ tabName }) => {
  return (
    <div style={{ padding: '24px', textAlign: 'center' }}>
      <Card>
        <h2>{tabName}</h2>
        <p>此功能正在开发中，敬请期待...</p>
        <Button type="primary" icon={<ReloadOutlined />}>
          刷新页面
        </Button>
      </Card>
    </div>
  );
};

// 路径到内容标题的映射
const pathToTitleMap: { [key: string]: string } = {
  '/dashboard/work': '我的工作看板',
  '/dashboard/layers': '客户分层盘点',
  '/dashboard/focus': '近期客户关注重点',
  '/dashboard/competition': '客成部门大比武',
  '/dashboard/coordination': '大服务体系内协同',
  '/profiles/handover-implementation': '交接实施',
  '/profiles/service': '持续服务',
  '/profiles/renewal': '续约管理',
  '/profiles/recall': '召回孵化',
  '/profiles/churn': '流失归因',
  '/revenue/consultation': '咨询应答',
  '/revenue/upgrade': '定制升舱建议',
  '/revenue/learning': '学习项目推荐',
  '/revenue/purchase': '课程采购活动',
  '/revenue/alliance': '战略活动结盟',
  '/revenue/message': '消息推送管理',
  '/resources/deployment': '实施部署套件',
  '/resources/support': '年度服务支撑',
  '/resources/equipment': '续约升级装备',
  '/resources/knowledge': '团队能力建设',
  '/ai-tools/consultant': '实施顾问分身',
  '/ai-tools/simulator': '续费模拟器',
  '/ai-tools/communication': '干系人沟通话术',
  '/ai-tools/travel': '面客差旅行程表',
  '/ai-tools/prediction': '预测水晶球',
  '/ai-tools/avatar': '我的虚拟分身',
  '/ai-tools/tags': '智能标签在干活',
};

// Tab内容生成器
export const generateTabContent = (tabName: string): React.ReactNode => {
  // 创建中文label到英文key的映射表
  const labelToKeyMap: { [key: string]: string } = {
    '我的工作看板': 'work-dashboard',
    '交接实施': 'handover-implementation',
    '客户分层盘点': 'customer-layers',
    '近期客户关注重点': 'customer-focus',
    '客成部门大比武': 'department-competition',
    '大服务体系内协同': 'service-coordination',
    '持续服务': 'continuous-service',
    '续约管理': 'renewal-management',
    '召回孵化': 'recall-incubation',
    '流失归因': 'churn-analysis',
    '咨询应答': 'consultation',
    '定制升舱建议': 'upgrade-suggestions',
    '学习项目推荐': 'learning-projects',
    '课程采购活动': 'course-purchase',
    '战略活动结盟': 'strategic-alliance',
    '消息推送管理': 'message-push',
    '实施部署套件': 'deployment-kit',
    '年度服务支撑': 'operation-support',
    '续约升级装备': 'renewal-equipment',
    '团队能力建设': 'knowledge-base',
    '实施顾问分身': 'implementation-consultant',
    '续费模拟器': 'renewal-simulator',
    '干系人沟通话术': 'stakeholder-communication',
    '面客差旅行程表': 'travel-schedule',
    '预测水晶球': 'prediction-crystal',
    '我的虚拟分身': 'virtual-avatar',
    '智能标签在干活': 'smart-tags',
  };

  // 如果传入的是中文label，转换为英文key，否则直接使用
  const key = labelToKeyMap[tabName] || tabName;

  switch (key) {
    case 'work-dashboard':
      return <DashboardContent />;
    case 'handover-implementation':
      return <HandoverImplementationContent />;
    default:
      return <DefaultContent tabName={tabName} />;
  }
};
