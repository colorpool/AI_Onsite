import React, { useState } from 'react';
import {
  Modal,
  Card,
  Row,
  Col,
  Button,
  Tag,
  Typography,
  Space,
  Rate,
  Tabs,
  Input,
  Select,
  Divider,
  List,
  Badge,
  Tooltip,
  message
} from 'antd';
import {
  RocketOutlined,
  DollarOutlined,
  FallOutlined,
  UserOutlined,
  RiseOutlined,
  DashboardOutlined,
  EyeOutlined,
  StarOutlined,
  SearchOutlined,
  FilterOutlined
} from '@ant-design/icons';
import { ValueBoardTemplate, TemplateCategory, TemplateType } from '../types/valueBoardTemplate';
import { mockValueBoardTemplates } from '../mock/valueBoardTemplateData';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

interface ValueBoardTemplateLibraryProps {
  onCancel: () => void;
  onTemplateSelect: (template: ValueBoardTemplate) => void;
}

// 图标映射
const iconMap: Record<string, React.ReactNode> = {
  RocketOutlined: <RocketOutlined />,
  DollarOutlined: <DollarOutlined />,
  FallOutlined: <FallOutlined />,
  UserOutlined: <UserOutlined />,
  RiseOutlined: <RiseOutlined />,
  DashboardOutlined: <DashboardOutlined />
};

// 分类颜色映射
const categoryColors: Record<TemplateCategory, string> = {
  '效率提升': '#1890ff',
  'ROI回报': '#52c41a',
  '成本节约': '#fa8c16',
  '用户采用': '#722ed1',
  '业务增长': '#13c2c2',
  '自定义': '#eb2f96'
};

const ValueBoardTemplateLibrary: React.FC<ValueBoardTemplateLibraryProps> = ({
  onCancel,
  onTemplateSelect
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<ValueBoardTemplate | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedScale, setSelectedScale] = useState<string>('all');

  // 获取所有行业和规模选项
  const allIndustries = Array.from(new Set(mockValueBoardTemplates.flatMap(t => t.applicableIndustries)));
  const allScales = Array.from(new Set(mockValueBoardTemplates.flatMap(t => t.applicableScales)));

  // 过滤模板
  const filteredTemplates = mockValueBoardTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesIndustry = selectedIndustry === 'all' || 
                           template.applicableIndustries.includes(selectedIndustry) ||
                           template.applicableIndustries.includes('所有行业');
    const matchesScale = selectedScale === 'all' || template.applicableScales.includes(selectedScale);
    
    return matchesSearch && matchesCategory && matchesIndustry && matchesScale;
  });

  // 按分类分组
  const groupedTemplates = filteredTemplates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<TemplateCategory, ValueBoardTemplate[]>);

  const handlePreview = (template: ValueBoardTemplate) => {
    setSelectedTemplate(template);
    setPreviewVisible(true);
  };

  const handleSelectTemplate = (template: ValueBoardTemplate) => {
    onTemplateSelect(template);
    message.success(`已选择模板：${template.name}`);
    onCancel();
  };

  const renderTemplateCard = (template: ValueBoardTemplate) => (
    <Card
      key={template.id}
      hoverable
      style={{ marginBottom: 16 }}
      actions={[
        <Button
          key="preview"
          type="text"
          icon={<EyeOutlined />}
          onClick={() => handlePreview(template)}
        >
          预览
        </Button>,
        <Button
          key="select"
          type="primary"
          onClick={() => handleSelectTemplate(template)}
        >
          使用模板
        </Button>
      ]}
    >
      <Card.Meta
        avatar={
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              backgroundColor: template.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 20
            }}
          >
            {iconMap[template.icon]}
          </div>
        }
        title={
          <Space>
            <span>{template.name}</span>
            <Tag color={categoryColors[template.category]}>{template.category}</Tag>
          </Space>
        }
        description={
          <div>
            <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 8 }}>
              {template.description}
            </Paragraph>
            <Space size="small">
              <Rate disabled defaultValue={template.rating} style={{ fontSize: 12 }} />
              <Text type="secondary">({template.rating})</Text>
              <Divider type="vertical" />
              <Text type="secondary">{template.usageCount} 次使用</Text>
            </Space>
            <div style={{ marginTop: 8 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>适用：</Text>
              {template.applicableIndustries.slice(0, 2).map(industry => (
                <Tag key={industry} style={{ fontSize: 10, marginLeft: 4 }}>
                  {industry}
                </Tag>
              ))}
              {template.applicableIndustries.length > 2 && (
                <Tag style={{ fontSize: 10, marginLeft: 4 }}>+{template.applicableIndustries.length - 2}</Tag>
              )}
            </div>
          </div>
        }
      />
    </Card>
  );

  return (
    <>
        <div style={{ marginBottom: 16 }}>
          <Row gutter={16}>
            <Col span={8}>
              <Input
                placeholder="搜索模板名称或描述"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Col>
            <Col span={4}>
              <Select
                placeholder="选择分类"
                value={selectedCategory}
                onChange={setSelectedCategory}
                style={{ width: '100%' }}
              >
                <Option value="all">所有分类</Option>
                <Option value="效率提升">效率提升</Option>
                <Option value="ROI回报">ROI回报</Option>
                <Option value="成本节约">成本节约</Option>
                <Option value="用户采用">用户采用</Option>
                <Option value="业务增长">业务增长</Option>
                <Option value="自定义">自定义</Option>
              </Select>
            </Col>
            <Col span={6}>
              <Select
                placeholder="选择行业"
                value={selectedIndustry}
                onChange={setSelectedIndustry}
                style={{ width: '100%' }}
              >
                <Option value="all">所有行业</Option>
                {allIndustries.map(industry => (
                  <Option key={industry} value={industry}>{industry}</Option>
                ))}
              </Select>
            </Col>
            <Col span={6}>
              <Select
                placeholder="选择规模"
                value={selectedScale}
                onChange={setSelectedScale}
                style={{ width: '100%' }}
              >
                <Option value="all">所有规模</Option>
                {allScales.map(scale => (
                  <Option key={scale} value={scale}>{scale}</Option>
                ))}
              </Select>
            </Col>
          </Row>
        </div>

        <div style={{ maxHeight: 600, overflowY: 'auto' }}>
          {Object.keys(groupedTemplates).length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <Text type="secondary">没有找到匹配的模板</Text>
            </div>
          ) : (
            <Tabs defaultActiveKey="all" type="card">
              <TabPane tab={`全部 (${filteredTemplates.length})`} key="all">
                <Row gutter={[16, 16]}>
                  {filteredTemplates.map(template => (
                    <Col key={template.id} span={12}>
                      {renderTemplateCard(template)}
                    </Col>
                  ))}
                </Row>
              </TabPane>
              {Object.entries(groupedTemplates).map(([category, templates]) => (
                <TabPane
                  tab={
                    <Badge count={templates.length} size="small">
                      <span>{category}</span>
                    </Badge>
                  }
                  key={category}
                >
                  <Row gutter={[16, 16]}>
                    {templates.map(template => (
                      <Col key={template.id} span={12}>
                        {renderTemplateCard(template)}
                      </Col>
                    ))}
                  </Row>
                </TabPane>
              ))}
            </Tabs>
          )}
        </div>
      {/* 模板预览模态框 */}
      <Modal
        title={`模板预览 - ${selectedTemplate?.name}`}
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        width={800}
        footer={[
          <Button key="cancel" onClick={() => setPreviewVisible(false)}>
            关闭
          </Button>,
          <Button
            key="select"
            type="primary"
            onClick={() => {
              if (selectedTemplate) {
                handleSelectTemplate(selectedTemplate);
                setPreviewVisible(false);
              }
            }}
          >
            使用此模板
          </Button>
        ]}
      >
        {selectedTemplate && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <Space>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    backgroundColor: selectedTemplate.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 16
                  }}
                >
                  {iconMap[selectedTemplate.icon]}
                </div>
                <div>
                  <Title level={4} style={{ margin: 0 }}>{selectedTemplate.name}</Title>
                  <Space>
                    <Tag color={categoryColors[selectedTemplate.category]}>
                      {selectedTemplate.category}
                    </Tag>
                    <Rate disabled defaultValue={selectedTemplate.rating} style={{ fontSize: 12 }} />
                    <Text type="secondary">({selectedTemplate.rating})</Text>
                  </Space>
                </div>
              </Space>
            </div>

            <Paragraph>{selectedTemplate.description}</Paragraph>

            <Divider>默认内容</Divider>
            <div style={{ marginBottom: 16 }}>
              <Title level={5}>看板标题</Title>
              <Text>{selectedTemplate.defaultTitle}</Text>
            </div>
            <div style={{ marginBottom: 16 }}>
              <Title level={5}>看板描述</Title>
              <Text>{selectedTemplate.defaultDescription}</Text>
            </div>

            <Divider>KPI指标模板</Divider>
            <List
              size="small"
              dataSource={selectedTemplate.kpiTemplates}
              renderItem={(kpi) => (
                <List.Item>
                  <List.Item.Meta
                    title={kpi.name}
                    description={
                      <div>
                        <Text type="secondary">{kpi.description}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          目标范围: {kpi.targetRange.min}-{kpi.targetRange.max}{kpi.unit}
                          （推荐: {kpi.targetRange.recommended}{kpi.unit}）
                        </Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />

            <Divider>成就模板</Divider>
            <List
              size="small"
              dataSource={selectedTemplate.achievementTemplates}
              renderItem={(achievement) => (
                <List.Item>
                  <List.Item.Meta
                    title={achievement.title}
                    description={
                      <div>
                        <Text type="secondary">{achievement.description}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          业务影响: {achievement.impactDescription}
                        </Text>
                        <Tag style={{ marginLeft: 8 }}>
                          {achievement.category}
                        </Tag>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />

            <Divider>适用场景</Divider>
            <div style={{ marginBottom: 8 }}>
              <Text strong>适用行业: </Text>
              {selectedTemplate.applicableIndustries.map(industry => (
                <Tag key={industry} style={{ marginBottom: 4 }}>{industry}</Tag>
              ))}
            </div>
            <div>
              <Text strong>适用规模: </Text>
              {selectedTemplate.applicableScales.map(scale => (
                <Tag key={scale} style={{ marginBottom: 4 }}>{scale}</Tag>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ValueBoardTemplateLibrary;