import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Select,
  Tag,
  Table,
  Drawer,
  Button,
  Space,
  Tooltip,
  Radio,
  Typography,
  Empty,
  Spin,
} from 'antd';
import {
  ExportOutlined,
  FilterOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

const { Option } = Select;
const { Title, Text } = Typography;

interface Customer {
  id: string;
  name: string;
  industry: string;
  size: 'small' | 'medium' | 'large' | 'xlarge';
  arr: number;
  csm: string;
  channelType: 'direct' | 'partner' | 'reseller';
  isChannelCustomer: boolean;
  collaborationEvents: number;
  tags: string[];
  riskLevel: 'safe' | 'attention' | 'risk';
}

interface MatrixCell {
  industry: string;
  size: string;
  channelRatio: number;
  totalCustomers: number;
  channelCustomers: number;
  totalARR: number;
  channelARR: number;
  riskCustomers: number;
}

interface EcosystemTag {
  name: string;
  count: number;
  arr: number;
  events: number;
  color: string;
}

interface ChannelEcosystemTabProps {
  customers: Customer[];
  onCustomerClick?: (customer: Customer) => void;
  onExport?: (data: any[]) => void;
}

const ChannelEcosystemTab: React.FC<ChannelEcosystemTabProps> = ({
  customers,
  onCustomerClick,
  onExport,
}) => {
  const [period, setPeriod] = useState<'current' | 'previous' | 'yoy'>('current');
  const [channelType, setChannelType] = useState<'all' | 'direct' | 'partner' | 'reseller'>('all');
  const [riskMetric, setRiskMetric] = useState<'ratio' | 'arr_ratio' | 'risk_ratio'>('ratio');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagLogic, setTagLogic] = useState<'AND' | 'OR'>('OR');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedCell, setSelectedCell] = useState<MatrixCell | null>(null);
  const [loading, setLoading] = useState(false);

  // 生成矩阵数据
  const generateMatrixData = (): MatrixCell[] => {
    const industries = ['制造业', '金融', '零售', '医疗', '教育', '政府'];
    const sizes = ['small', 'medium', 'large', 'xlarge'];
    const sizeLabels = { small: '小型', medium: '中型', large: '大型', xlarge: '超大型' };
    
    const matrix: MatrixCell[] = [];
    
    industries.forEach(industry => {
      sizes.forEach(size => {
        const cellCustomers = customers.filter(c => 
          c.industry === industry && c.size === size
        );
        const channelCustomers = cellCustomers.filter(c => c.isChannelCustomer);
        const riskCustomers = cellCustomers.filter(c => c.riskLevel === 'risk');
        
        const totalARR = cellCustomers.reduce((sum, c) => sum + c.arr, 0);
        const channelARR = channelCustomers.reduce((sum, c) => sum + c.arr, 0);
        
        let ratio = 0;
        if (riskMetric === 'ratio') {
          ratio = cellCustomers.length > 0 ? (channelCustomers.length / cellCustomers.length) * 100 : 0;
        } else if (riskMetric === 'arr_ratio') {
          ratio = totalARR > 0 ? (channelARR / totalARR) * 100 : 0;
        } else {
          ratio = cellCustomers.length > 0 ? (riskCustomers.length / cellCustomers.length) * 100 : 0;
        }
        
        matrix.push({
          industry,
          size: sizeLabels[size as keyof typeof sizeLabels],
          channelRatio: ratio,
          totalCustomers: cellCustomers.length,
          channelCustomers: channelCustomers.length,
          totalARR,
          channelARR,
          riskCustomers: riskCustomers.length,
        });
      });
    });
    
    return matrix;
  };

  // 生成生态标签数据
  const generateEcosystemTags = (): EcosystemTag[] => {
    const tagMap = new Map<string, { customers: Customer[], arr: number, events: number }>();
    
    customers.forEach(customer => {
      customer.tags.forEach(tag => {
        if (!tagMap.has(tag)) {
          tagMap.set(tag, { customers: [], arr: 0, events: 0 });
        }
        const tagData = tagMap.get(tag)!;
        tagData.customers.push(customer);
        tagData.arr += customer.arr;
        tagData.events += customer.collaborationEvents;
      });
    });
    
    const colors = ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1', '#13c2c2', '#eb2f96', '#fa8c16'];
    
    return Array.from(tagMap.entries()).map(([name, data], index) => ({
      name,
      count: data.customers.length,
      arr: data.arr,
      events: data.events,
      color: colors[index % colors.length],
    }));
  };

  // 获取热力图颜色
  const getHeatmapColor = (ratio: number): string => {
    if (ratio === 0) return '#f5f5f5';
    if (ratio <= 20) return '#fff7e6';
    if (ratio <= 40) return '#ffd591';
    if (ratio <= 60) return '#ffb347';
    if (ratio <= 80) return '#ff8c00';
    return '#ff4500';
  };

  // 筛选客户列表
  const getFilteredCustomers = (): Customer[] => {
    let filtered = customers;
    
    if (selectedTags.length > 0) {
      filtered = customers.filter(customer => {
        if (tagLogic === 'AND') {
          return selectedTags.every(tag => customer.tags.includes(tag));
        } else {
          return selectedTags.some(tag => customer.tags.includes(tag));
        }
      });
    }
    
    return filtered;
  };

  const matrixData = generateMatrixData();
  const ecosystemTags = generateEcosystemTags();
  const filteredCustomers = getFilteredCustomers();

  // 表格列配置
  const columns = [
    {
      title: '客户名称',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left' as const,
      width: 200,
      render: (text: string, record: Customer) => (
        <div>
          <div 
            style={{ cursor: 'pointer', color: '#1890ff' }}
            onClick={() => onCustomerClick?.(record)}
          >
            {text}
          </div>
          <div style={{ fontSize: 12, color: '#8c8c8c' }}>
            {record.isChannelCustomer && <Tag color="blue">渠道</Tag>}
          </div>
        </div>
      ),
    },
    {
      title: '行业',
      dataIndex: 'industry',
      key: 'industry',
      width: 100,
    },
    {
      title: 'ARR',
      dataIndex: 'arr',
      key: 'arr',
      width: 120,
      render: (value: number) => `¥${(value / 10000).toFixed(1)}万`,
      sorter: (a: Customer, b: Customer) => a.arr - b.arr,
    },
    {
      title: '负责人CSM',
      dataIndex: 'csm',
      key: 'csm',
      width: 120,
    },
    {
      title: '近90天协作事件数',
      dataIndex: 'collaborationEvents',
      key: 'collaborationEvents',
      width: 150,
      render: (value: number) => (
        <span style={{ color: value > 10 ? '#52c41a' : value > 5 ? '#faad14' : '#8c8c8c' }}>
          {value}
        </span>
      ),
      sorter: (a: Customer, b: Customer) => a.collaborationEvents - b.collaborationEvents,
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      width: 200,
      render: (tags: string[]) => (
        <div>
          {tags.slice(0, 3).map(tag => (
            <Tag key={tag} style={{ marginBottom: 2 }}>
              {tag}
            </Tag>
          ))}
          {tags.length > 3 && (
            <Tag>+{tags.length - 3}</Tag>
          )}
        </div>
      ),
    },
  ];

  // 处理矩阵单元格点击
  const handleCellClick = (cell: MatrixCell) => {
    setSelectedCell(cell);
    setDrawerVisible(true);
  };

  // 处理标签点击
  const handleTagClick = (tagName: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tagName)) {
        return prev.filter(t => t !== tagName);
      } else {
        return [...prev, tagName];
      }
    });
  };

  return (
    <div style={{ padding: '0 24px' }}>
      {/* 渠道客户风险矩阵 */}
      <Card 
        title="渠道客户风险矩阵"
        style={{ marginBottom: 24 }}
        extra={
          <Space>
            <Select value={period} onChange={setPeriod} style={{ width: 120 }}>
              <Option value="current">本季</Option>
              <Option value="previous">上季</Option>
              <Option value="yoy">同比</Option>
            </Select>
            <Select value={channelType} onChange={setChannelType} style={{ width: 120 }}>
              <Option value="all">全部</Option>
              <Option value="direct">直销</Option>
              <Option value="partner">代理</Option>
              <Option value="reseller">联合</Option>
            </Select>
            <Select value={riskMetric} onChange={setRiskMetric} style={{ width: 140 }}>
              <Option value="ratio">渠道占比</Option>
              <Option value="arr_ratio">ARR占比</Option>
              <Option value="risk_ratio">风险客户占比</Option>
            </Select>
          </Space>
        }
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '8px', border: '1px solid #f0f0f0', background: '#fafafa' }}>行业\规模</th>
                <th style={{ padding: '8px', border: '1px solid #f0f0f0', background: '#fafafa' }}>小型</th>
                <th style={{ padding: '8px', border: '1px solid #f0f0f0', background: '#fafafa' }}>中型</th>
                <th style={{ padding: '8px', border: '1px solid #f0f0f0', background: '#fafafa' }}>大型</th>
                <th style={{ padding: '8px', border: '1px solid #f0f0f0', background: '#fafafa' }}>超大型</th>
              </tr>
            </thead>
            <tbody>
              {['制造业', '金融', '零售', '医疗', '教育', '政府'].map(industry => (
                <tr key={industry}>
                  <td style={{ padding: '8px', border: '1px solid #f0f0f0', background: '#fafafa', fontWeight: 500 }}>
                    {industry}
                  </td>
                  {['小型', '中型', '大型', '超大型'].map(size => {
                    const cell = matrixData.find(c => c.industry === industry && c.size === size);
                    return (
                      <td 
                        key={size}
                        style={{
                          padding: '8px',
                          border: '1px solid #f0f0f0',
                          background: cell ? getHeatmapColor(cell.channelRatio) : '#f5f5f5',
                          cursor: 'pointer',
                          textAlign: 'center',
                          minWidth: 80,
                        }}
                        onClick={() => cell && handleCellClick(cell)}
                      >
                        <Tooltip 
                          title={
                            cell ? (
                              <div>
                                <div>总客户数: {cell.totalCustomers}</div>
                                <div>渠道客户数: {cell.channelCustomers}</div>
                                <div>占比: {cell.channelRatio.toFixed(1)}%</div>
                                <div>总ARR: ¥{(cell.totalARR / 10000).toFixed(1)}万</div>
                              </div>
                            ) : '暂无数据'
                          }
                        >
                          <div style={{ fontSize: 14, fontWeight: 500 }}>
                            {cell ? `${cell.channelRatio.toFixed(1)}%` : '-'}
                          </div>
                          <div style={{ fontSize: 12, color: '#666' }}>
                            {cell ? `${cell.totalCustomers}客户` : ''}
                          </div>
                        </Tooltip>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 客户生态标签 */}
      <Card title="客户生态标签">
        <Row gutter={24}>
          <Col span={10}>
            <div style={{ marginBottom: 16 }}>
              <Space>
                <Text strong>逻辑关系:</Text>
                <Radio.Group value={tagLogic} onChange={(e) => setTagLogic(e.target.value)}>
                  <Radio.Button value="AND">AND</Radio.Button>
                  <Radio.Button value="OR">OR</Radio.Button>
                </Radio.Group>
                {selectedTags.length > 0 && (
                  <Button size="small" onClick={() => setSelectedTags([])}>
                    清空选择
                  </Button>
                )}
              </Space>
            </div>
            
            <div style={{ minHeight: 400, maxHeight: 500, overflowY: 'auto' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {ecosystemTags.map(tag => (
                  <Tag
                    key={tag.name}
                    color={selectedTags.includes(tag.name) ? tag.color : 'default'}
                    style={{
                      cursor: 'pointer',
                      padding: '4px 8px',
                      fontSize: 13,
                      border: selectedTags.includes(tag.name) ? `2px solid ${tag.color}` : '1px solid #d9d9d9',
                    }}
                    onClick={() => handleTagClick(tag.name)}
                  >
                    <Tooltip 
                      title={
                        <div>
                          <div>客户数: {tag.count}</div>
                          <div>ARR: ¥{(tag.arr / 10000).toFixed(1)}万</div>
                          <div>近90天事件数: {tag.events}</div>
                        </div>
                      }
                    >
                      {tag.name} ({tag.count})
                    </Tooltip>
                  </Tag>
                ))}
              </div>
            </div>
          </Col>
          
          <Col span={14}>
            <div style={{ marginBottom: 16 }}>
              <Space>
                <Text strong>客户列表 ({filteredCustomers.length})</Text>
                <Button 
                  icon={<ExportOutlined />} 
                  size="small"
                  onClick={() => onExport?.(filteredCustomers)}
                >
                  导出
                </Button>
              </Space>
            </div>
            
            <Table
              columns={columns}
              dataSource={filteredCustomers}
              rowKey="id"
              size="small"
              scroll={{ x: 800, y: 400 }}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `共 ${total} 条`,
              }}
            />
          </Col>
        </Row>
      </Card>

      {/* 侧边抽屉 */}
      <Drawer
        title={selectedCell ? `${selectedCell.industry} - ${selectedCell.size}` : ''}
        placement="right"
        width={600}
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      >
        {selectedCell && (
          <div>
            <Row gutter={16} style={{ marginBottom: 24 }}>
              <Col span={12}>
                <Card size="small">
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 24, fontWeight: 'bold', color: '#1890ff' }}>
                      {selectedCell.totalCustomers}
                    </div>
                    <div style={{ color: '#8c8c8c' }}>总客户数</div>
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small">
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 24, fontWeight: 'bold', color: '#52c41a' }}>
                      {selectedCell.channelRatio.toFixed(1)}%
                    </div>
                    <div style={{ color: '#8c8c8c' }}>渠道占比</div>
                  </div>
                </Card>
              </Col>
            </Row>
            
            <Row gutter={16} style={{ marginBottom: 24 }}>
              <Col span={12}>
                <Card size="small">
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 20, fontWeight: 'bold' }}>
                      ¥{(selectedCell.totalARR / 10000).toFixed(1)}万
                    </div>
                    <div style={{ color: '#8c8c8c' }}>总ARR</div>
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small">
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 20, fontWeight: 'bold', color: '#f5222d' }}>
                      {selectedCell.riskCustomers}
                    </div>
                    <div style={{ color: '#8c8c8c' }}>风险客户</div>
                  </div>
                </Card>
              </Col>
            </Row>
            
            <Button 
              type="primary" 
              block 
              icon={<ExportOutlined />}
              onClick={() => {
                const cellCustomers = customers.filter(c => 
                  c.industry === selectedCell.industry && 
                  c.size === (selectedCell.size === '小型' ? 'small' : 
                            selectedCell.size === '中型' ? 'medium' : 
                            selectedCell.size === '大型' ? 'large' : 'xlarge')
                );
                onExport?.(cellCustomers);
              }}
            >
              导出该分组客户
            </Button>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default ChannelEcosystemTab;