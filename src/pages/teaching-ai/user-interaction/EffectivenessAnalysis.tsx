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
  Select,
  DatePicker,
  Progress,
  Statistic,
  Tabs,
  List,
  Avatar,
  Tooltip,
  Alert,
  Badge,
} from 'antd';
import {
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
  EyeOutlined,
  HeartOutlined,
  MessageOutlined,
  StarOutlined,
  ThunderboltOutlined,
  BulbOutlined,
  WarningOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

interface AnalysisMetric {
  id: string;
  name: string;
  category: 'engagement' | 'conversion' | 'retention' | 'satisfaction';
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
  unit: string;
  description: string;
}

interface InteractionEvent {
  id: string;
  type: 'click' | 'view' | 'share' | 'comment' | 'like' | 'complete';
  name: string;
  count: number;
  conversionRate: number;
  avgDuration: number;
  satisfaction: number;
  date: string;
}

interface OptimizationSuggestion {
  id: string;
  type: 'critical' | 'important' | 'suggestion';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  category: string;
  metrics: string[];
}

const EffectivenessAnalysis: React.FC = () => {
  const [selectedDateRange, setSelectedDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // 模拟分析指标数据
  const metricsData: AnalysisMetric[] = [
    {
      id: '1',
      name: '用户参与度',
      category: 'engagement',
      value: 78.5,
      target: 80,
      trend: 'up',
      change: 5.2,
      unit: '%',
      description: '用户在平台上的活跃程度和互动频率',
    },
    {
      id: '2',
      name: '内容完成率',
      category: 'conversion',
      value: 65.3,
      target: 70,
      trend: 'up',
      change: 3.1,
      unit: '%',
      description: '用户完成学习内容的比例',
    },
    {
      id: '3',
      name: '用户留存率',
      category: 'retention',
      value: 72.8,
      target: 75,
      trend: 'down',
      change: -2.4,
      unit: '%',
      description: '用户在一定时期内继续使用平台的比例',
    },
    {
      id: '4',
      name: '满意度评分',
      category: 'satisfaction',
      value: 4.3,
      target: 4.5,
      trend: 'stable',
      change: 0.1,
      unit: '/5',
      description: '用户对平台和内容的满意度评分',
    },
  ];

  // 模拟互动事件数据
  const interactionData: InteractionEvent[] = [
    {
      id: '1',
      type: 'view',
      name: '课程浏览',
      count: 15420,
      conversionRate: 68.5,
      avgDuration: 8.5,
      satisfaction: 4.2,
      date: '2024-01-15',
    },
    {
      id: '2',
      type: 'click',
      name: '内容点击',
      count: 8930,
      conversionRate: 45.2,
      avgDuration: 12.3,
      satisfaction: 4.1,
      date: '2024-01-15',
    },
    {
      id: '3',
      type: 'complete',
      name: '课程完成',
      count: 3240,
      conversionRate: 85.7,
      avgDuration: 45.6,
      satisfaction: 4.6,
      date: '2024-01-15',
    },
    {
      id: '4',
      type: 'share',
      name: '内容分享',
      count: 1250,
      conversionRate: 92.3,
      avgDuration: 2.1,
      satisfaction: 4.4,
      date: '2024-01-15',
    },
  ];

  // 模拟优化建议数据
  const suggestionsData: OptimizationSuggestion[] = [
    {
      id: '1',
      type: 'critical',
      title: '提升用户留存率',
      description: '当前用户留存率低于目标值，建议优化新用户引导流程和增加互动元素',
      impact: 'high',
      effort: 'medium',
      category: '用户体验',
      metrics: ['用户留存率', '用户参与度'],
    },
    {
      id: '2',
      type: 'important',
      title: '优化内容推荐算法',
      description: '通过改进推荐算法提升内容完成率和用户满意度',
      impact: 'high',
      effort: 'high',
      category: '算法优化',
      metrics: ['内容完成率', '满意度评分'],
    },
    {
      id: '3',
      type: 'suggestion',
      title: '增加社交互动功能',
      description: '添加用户评论、点赞等社交功能，提升用户参与度',
      impact: 'medium',
      effort: 'low',
      category: '功能增强',
      metrics: ['用户参与度'],
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      engagement: 'blue',
      conversion: 'green',
      retention: 'orange',
      satisfaction: 'purple',
    };
    return colors[category as keyof typeof colors];
  };

  const getCategoryText = (category: string) => {
    const texts = {
      engagement: '参与度',
      conversion: '转化率',
      retention: '留存率',
      satisfaction: '满意度',
    };
    return texts[category as keyof typeof texts];
  };

  const getTrendIcon = (trend: string) => {
    const icons = {
      up: <RiseOutlined style={{ color: '#52c41a' }} />,
      down: <FallOutlined style={{ color: '#ff4d4f' }} />,
      stable: <LineChartOutlined style={{ color: '#1890ff' }} />,
    };
    return icons[trend as keyof typeof icons];
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      view: <EyeOutlined />,
      click: <ThunderboltOutlined />,
      share: <MessageOutlined />,
      comment: <MessageOutlined />,
      like: <HeartOutlined />,
      complete: <CheckCircleOutlined />,
    };
    return icons[type as keyof typeof icons];
  };

  const getSuggestionIcon = (type: string) => {
    const icons = {
      critical: <WarningOutlined style={{ color: '#ff4d4f' }} />,
      important: <BulbOutlined style={{ color: '#fa8c16' }} />,
      suggestion: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
    };
    return icons[type as keyof typeof icons];
  };

  const getSuggestionColor = (type: string) => {
    const colors = {
      critical: 'red',
      important: 'orange',
      suggestion: 'green',
    };
    return colors[type as keyof typeof colors];
  };

  const getImpactColor = (impact: string) => {
    const colors = {
      high: 'red',
      medium: 'orange',
      low: 'green',
    };
    return colors[impact as keyof typeof colors];
  };

  const metricsColumns: ColumnsType<AnalysisMetric> = [
    {
      title: '指标名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <BarChartOutlined style={{ color: getCategoryColor(record.category) }} />
          <div>
            <div style={{ fontWeight: 'bold' }}>{text}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {record.description}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: '类别',
      dataIndex: 'category',
      key: 'category',
      render: (category) => (
        <Tag color={getCategoryColor(category)}>{getCategoryText(category)}</Tag>
      ),
    },
    {
      title: '当前值',
      dataIndex: 'value',
      key: 'value',
      render: (value, record) => (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1890ff' }}>
            {value}{record.unit}
          </div>
        </div>
      ),
    },
    {
      title: '目标值',
      dataIndex: 'target',
      key: 'target',
      render: (target, record) => (
        <Text>{target}{record.unit}</Text>
      ),
    },
    {
      title: '完成度',
      key: 'completion',
      render: (_, record) => {
        const completion = Math.round((record.value / record.target) * 100);
        return (
          <div>
            <Progress
              percent={completion}
              size="small"
              strokeColor={completion >= 100 ? '#52c41a' : completion >= 80 ? '#fa8c16' : '#ff4d4f'}
            />
            <Text style={{ fontSize: '12px' }}>{completion}%</Text>
          </div>
        );
      },
    },
    {
      title: '趋势',
      key: 'trend',
      render: (_, record) => (
        <Space>
          {getTrendIcon(record.trend)}
          <Text style={{ 
            color: record.trend === 'up' ? '#52c41a' : record.trend === 'down' ? '#ff4d4f' : '#1890ff' 
          }}>
            {record.change > 0 ? '+' : ''}{record.change}%
          </Text>
        </Space>
      ),
    },
  ];

  const interactionColumns: ColumnsType<InteractionEvent> = [
    {
      title: '互动类型',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          {getTypeIcon(record.type)}
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '互动次数',
      dataIndex: 'count',
      key: 'count',
      render: (count) => (
        <Text strong style={{ color: '#1890ff' }}>
          {count.toLocaleString()}
        </Text>
      ),
    },
    {
      title: '转化率',
      dataIndex: 'conversionRate',
      key: 'conversionRate',
      render: (rate) => (
        <div>
          <Progress percent={rate} size="small" />
          <Text style={{ fontSize: '12px' }}>{rate}%</Text>
        </div>
      ),
    },
    {
      title: '平均时长',
      dataIndex: 'avgDuration',
      key: 'avgDuration',
      render: (duration) => <Text>{duration}分钟</Text>,
    },
    {
      title: '满意度',
      dataIndex: 'satisfaction',
      key: 'satisfaction',
      render: (satisfaction) => (
        <Space>
          <StarOutlined style={{ color: '#faad14' }} />
          <Text>{satisfaction}/5</Text>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '32px 40px', background: '#f5f5f5', minHeight: 'calc(100vh - 64px)' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>
          <BarChartOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          互动效果分析
        </Title>
        <Text type="secondary">全面分析用户互动数据，评估平台效果并提供优化建议</Text>
      </div>

      {/* 筛选条件 */}
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={16} align="middle">
          <Col>
            <Text strong>时间范围：</Text>
          </Col>
          <Col>
            <RangePicker
              value={selectedDateRange}
              onChange={setSelectedDateRange}
              placeholder={['开始日期', '结束日期']}
            />
          </Col>
          <Col>
            <Text strong>指标类别：</Text>
          </Col>
          <Col>
            <Select
              value={selectedCategory}
              onChange={setSelectedCategory}
              style={{ width: 120 }}
            >
              <Option value="all">全部</Option>
              <Option value="engagement">参与度</Option>
              <Option value="conversion">转化率</Option>
              <Option value="retention">留存率</Option>
              <Option value="satisfaction">满意度</Option>
            </Select>
          </Col>
          <Col>
            <Button type="primary">应用筛选</Button>
          </Col>
        </Row>
      </Card>

      {/* 核心指标概览 */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        {metricsData.map((metric) => (
          <Col span={6} key={metric.id}>
            <Card>
              <Statistic
                title={metric.name}
                value={metric.value}
                suffix={metric.unit}
                prefix={getTrendIcon(metric.trend)}
                valueStyle={{ 
                  color: metric.value >= metric.target ? '#52c41a' : '#fa8c16' 
                }}
              />
              <div style={{ marginTop: '8px' }}>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  目标: {metric.target}{metric.unit}
                </Text>
                <Text 
                  style={{ 
                    fontSize: '12px', 
                    marginLeft: '8px',
                    color: metric.trend === 'up' ? '#52c41a' : metric.trend === 'down' ? '#ff4d4f' : '#1890ff'
                  }}
                >
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Tabs defaultActiveKey="metrics">
        <TabPane tab="指标分析" key="metrics">
          <Card title="关键指标详情">
            <Table
              columns={metricsColumns}
              dataSource={metricsData}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </TabPane>

        <TabPane tab="互动分析" key="interactions">
          <Row gutter={16} style={{ marginBottom: '16px' }}>
            <Col span={12}>
              <Card title="互动类型分布">
                <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text type="secondary">互动类型分布图表</Text>
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="互动趋势分析">
                <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text type="secondary">互动趋势分析图表</Text>
                </div>
              </Card>
            </Col>
          </Row>
          
          <Card title="互动事件详情">
            <Table
              columns={interactionColumns}
              dataSource={interactionData}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </TabPane>

        <TabPane tab="效果评估" key="evaluation">
          <Row gutter={16}>
            <Col span={8}>
              <Card title="整体表现评估" style={{ height: '400px' }}>
                <Space direction="vertical" style={{ width: '100%' }} size="large">
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#52c41a' }}>
                      B+
                    </div>
                    <Text type="secondary">综合评分</Text>
                  </div>
                  
                  <div>
                    <Text strong>评估维度：</Text>
                    <div style={{ marginTop: '8px' }}>
                      <div style={{ marginBottom: '8px' }}>
                        <Text>用户参与度</Text>
                        <Progress percent={78} size="small" style={{ marginLeft: '8px' }} />
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <Text>内容质量</Text>
                        <Progress percent={85} size="small" style={{ marginLeft: '8px' }} />
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <Text>用户体验</Text>
                        <Progress percent={72} size="small" style={{ marginLeft: '8px' }} />
                      </div>
                      <div>
                        <Text>技术性能</Text>
                        <Progress percent={88} size="small" style={{ marginLeft: '8px' }} />
                      </div>
                    </div>
                  </div>
                </Space>
              </Card>
            </Col>
            <Col span={16}>
              <Card title="对比分析" style={{ height: '400px' }}>
                <div style={{ height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text type="secondary">同期对比分析图表</Text>
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="优化建议" key="suggestions">
          <Row gutter={16}>
            <Col span={16}>
              <Card title="优化建议列表">
                <List
                  itemLayout="vertical"
                  dataSource={suggestionsData}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Button key="detail" type="link">查看详情</Button>,
                        <Button key="implement" type="primary" size="small">
                          实施建议
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={getSuggestionIcon(item.type)}
                        title={
                          <Space>
                            <Text strong>{item.title}</Text>
                            <Tag color={getSuggestionColor(item.type)}>
                              {item.type === 'critical' ? '紧急' : item.type === 'important' ? '重要' : '建议'}
                            </Tag>
                          </Space>
                        }
                        description={
                          <Space direction="vertical" size="small">
                            <Text>{item.description}</Text>
                            <Space>
                              <Text type="secondary">影响程度：</Text>
                              <Tag color={getImpactColor(item.impact)}>
                                {item.impact === 'high' ? '高' : item.impact === 'medium' ? '中' : '低'}
                              </Tag>
                              <Text type="secondary">实施难度：</Text>
                              <Tag color={getImpactColor(item.effort)}>
                                {item.effort === 'high' ? '高' : item.effort === 'medium' ? '中' : '低'}
                              </Tag>
                              <Text type="secondary">相关指标：</Text>
                              {item.metrics.map((metric, index) => (
                                <Tag key={index} color="blue" style={{ fontSize: '12px' }}>
                                  {metric}
                                </Tag>
                              ))}
                            </Space>
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="优化优先级" style={{ marginBottom: '16px' }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Alert
                    message="紧急优化项"
                    description="1个紧急问题需要立即处理"
                    type="error"
                    showIcon
                  />
                  <Alert
                    message="重要优化项"
                    description="1个重要问题建议本周处理"
                    type="warning"
                    showIcon
                  />
                  <Alert
                    message="一般建议"
                    description="1个优化建议可安排后续处理"
                    type="info"
                    showIcon
                  />
                </Space>
              </Card>
              
              <Card title="预期收益">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <Text strong>用户留存率提升</Text>
                    <div style={{ marginTop: '4px' }}>
                      <Progress percent={15} strokeColor="#52c41a" />
                      <Text style={{ fontSize: '12px' }}>预期提升15%</Text>
                    </div>
                  </div>
                  <div>
                    <Text strong>用户参与度提升</Text>
                    <div style={{ marginTop: '4px' }}>
                      <Progress percent={12} strokeColor="#1890ff" />
                      <Text style={{ fontSize: '12px' }}>预期提升12%</Text>
                    </div>
                  </div>
                  <div>
                    <Text strong>满意度提升</Text>
                    <div style={{ marginTop: '4px' }}>
                      <Progress percent={8} strokeColor="#722ed1" />
                      <Text style={{ fontSize: '12px' }}>预期提升8%</Text>
                    </div>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default EffectivenessAnalysis;