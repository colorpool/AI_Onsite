import React, { useMemo, useState, useRef } from 'react';
import { Row, Col, Card, Typography, Tooltip, Space, Button, Badge, Dropdown, Table, Avatar, Tag, Input, Slider, Select } from 'antd';
import { SettingOutlined, QuestionCircleOutlined, MoreOutlined, ArrowUpOutlined, ArrowDownOutlined, ReloadOutlined } from '@ant-design/icons';
import CustomerDetailDrawer from './CustomerDetailModal';

const { Title, Text } = Typography;
const { Option } = Select;

type Industry = '制造业' | '金融' | '零售' | '医疗' | '教育' | '科技' | '房地产' | '物流';
type Quadrant = '领先者' | '精品标杆' | '规模潜力' | '追赶者';
type ScaleMetric = '人数' | '席位' | '门店数';

type NewCustomer = {
  id: string;
  name: string;
  logoColor: string;
  csm: string;
  industry: Industry;
  customerScale: number; // 客户规模数值
  unitPrice: number; // 客单价
  signDate: string; // 签约日期
  activationRate: number; // 首90天激活率
  quadrant: Quadrant;
  arr: number;
  tags: string[];
};

type IndustryBubble = {
  industry: Industry;
  newCustomerCount: number;
  avgUnitPrice: number;
  avgScale: number;
  totalArr: number;
  topCustomers: string[];
  quadrant: Quadrant;
};

export interface NewCustomerTieringTabProps {
  customers: NewCustomer[];
  onCustomerSelect?: (customer: NewCustomer) => void;
}

const NewCustomerTieringTab: React.FC<NewCustomerTieringTabProps> = ({ customers, onCustomerSelect }) => {
  const [scaleMetric, setScaleMetric] = useState<ScaleMetric>('人数');
  const [scaleThreshold, setScaleThreshold] = useState(100); // 规模分割线
  const [priceThreshold, setPriceThreshold] = useState(() => {
    // 动态计算初始客单价阈值，确保在合理范围内
    if (customers.length === 0) return 50000;
    const prices = customers.map(c => c.unitPrice).filter(p => p > 0);
    if (prices.length === 0) return 50000;
    const avgPrice = prices.reduce((sum, p) => sum + p, 0) / prices.length;
    return Math.round(avgPrice / 1000) * 1000; // 四舍五入到千位
  }); // 客单价分割线
  const [selectedIndustries, setSelectedIndustries] = useState<Industry[]>([]);
  const [search, setSearch] = useState('');
  const [bubbleTip, setBubbleTip] = useState<{ visible: boolean; x: number; y: number; html: React.ReactNode } | null>(null);

  const [customerDetailVisible, setCustomerDetailVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<NewCustomer | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  const cardStyle: React.CSSProperties = {
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    border: '1px solid #f0f0f0',
    background: '#ffffff',
  };

  const industries: Industry[] = ['制造业', '金融', '零售', '医疗', '教育', '科技', '房地产', '物流'];
  
  const industryColors: Record<Industry, string> = {
    制造业: '#1890ff',
    金融: '#52c41a',
    零售: '#fa8c16',
    医疗: '#eb2f96',
    教育: '#722ed1',
    科技: '#13c2c2',
    房地产: '#faad14',
    物流: '#f5222d',
  };

  const quadrantColors: Record<Quadrant, string> = {
    领先者: '#52c41a',
    精品标杆: '#1890ff',
    规模潜力: '#fa8c16',
    追赶者: '#bfbfbf',
  };

  const quadrantLabels: Record<Quadrant, { name: string; desc: string }> = {
    领先者: { name: '领先者', desc: '大规模×高客单' },
    精品标杆: { name: '精品标杆', desc: '小规模×高客单' },
    规模潜力: { name: '规模潜力', desc: '大规模×低客单' },
    追赶者: { name: '追赶者', desc: '小规模×低客单' },
  };

  // 计算象限
  function getQuadrant(scale: number, price: number): Quadrant {
    if (scale >= scaleThreshold && price >= priceThreshold) return '领先者';
    if (scale < scaleThreshold && price >= priceThreshold) return '精品标杆';
    if (scale >= scaleThreshold && price < priceThreshold) return '规模潜力';
    return '追赶者';
  }

  // 按行业聚合气泡数据
  const industryBubbles = useMemo(() => {
    const bubbles: Record<Industry, IndustryBubble> = {} as any;
    
    for (const industry of industries) {
      bubbles[industry] = {
        industry,
        newCustomerCount: 0,
        avgUnitPrice: 0,
        avgScale: 0,
        totalArr: 0,
        topCustomers: [],
        quadrant: '追赶者',
      };
    }

    const industryCustomers: Record<Industry, NewCustomer[]> = {} as any;
    for (const industry of industries) {
      industryCustomers[industry] = [];
    }

    for (const customer of customers) {
      // 安全检查：确保客户行业存在且在预定义列表中
      if (customer.industry && industryCustomers[customer.industry]) {
        industryCustomers[customer.industry].push(customer);
      }
    }

    for (const industry of industries) {
      const industryList = industryCustomers[industry];
      if (industryList.length === 0) continue;

      const bubble = bubbles[industry];
      bubble.newCustomerCount = industryList.length;
      bubble.avgUnitPrice = Math.round(industryList.reduce((sum, c) => sum + c.unitPrice, 0) / industryList.length);
      bubble.avgScale = Math.round(industryList.reduce((sum, c) => sum + c.customerScale, 0) / industryList.length);
      bubble.totalArr = industryList.reduce((sum, c) => sum + c.arr, 0);
      bubble.topCustomers = industryList
        .sort((a, b) => b.arr - a.arr)
        .slice(0, 3)
        .map(c => c.name);
      bubble.quadrant = getQuadrant(bubble.avgScale, bubble.avgUnitPrice);
    }

    return Object.values(bubbles).filter(b => b.newCustomerCount > 0);
  }, [customers, scaleThreshold, priceThreshold]);

  // 筛选后的客户列表
  const filteredCustomers = useMemo(() => {
    let list = customers;
    
    if (selectedIndustries.length > 0) {
      list = list.filter(c => selectedIndustries.includes(c.industry));
    }
    
    if (search.trim()) {
      const k = search.trim().toLowerCase();
      list = list.filter(c => 
        c.name.toLowerCase().includes(k) || 
        c.csm.toLowerCase().includes(k) ||
        c.industry.includes(k)
      );
    }
    
    return list.map(c => ({
      ...c,
      quadrant: getQuadrant(c.customerScale, c.unitPrice)
    }));
  }, [customers, selectedIndustries, search, scaleThreshold, priceThreshold]);

  // 计算客单价范围
  const priceRange = useMemo(() => {
    if (customers.length === 0) return { min: 10000, max: 200000 };
    
    const prices = customers.map(c => c.unitPrice).filter(p => p > 0);
    if (prices.length === 0) return { min: 10000, max: 200000 };
    
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    // 添加一些缓冲区间，确保滑块范围合理
    const buffer = (maxPrice - minPrice) * 0.2;
    const adjustedMin = Math.max(1000, Math.floor((minPrice - buffer) / 1000) * 1000);
    const adjustedMax = Math.ceil((maxPrice + buffer) / 1000) * 1000;
    
    return { min: adjustedMin, max: adjustedMax };
  }, [customers]);

  // 图表尺寸和比例
  const chartWidth = 500;
  const chartHeight = 300;
  const padding = 60;
  const plotWidth = chartWidth - padding * 2;
  const plotHeight = chartHeight - padding * 2;

  const maxScale = Math.max(1, ...industryBubbles.map(b => b.avgScale));
  const maxPrice = Math.max(1, ...industryBubbles.map(b => b.avgUnitPrice));
  const maxBubbleCount = Math.max(1, ...industryBubbles.map(b => b.newCustomerCount));

  const columns = [
    {
      title: '客户名称',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left' as const,
      width: 200,
      sorter: (a: NewCustomer, b: NewCustomer) => a.name.localeCompare(b.name),
      render: (_: unknown, record: NewCustomer) => (
        <Space>
          <Avatar style={{ backgroundColor: record.logoColor }}>
            {record.name.charAt(0)}
          </Avatar>
          <span>{record.name}</span>
        </Space>
      ),
    },
    {
      title: '负责人CSM',
      dataIndex: 'csm',
      key: 'csm',
      width: 120,
      sorter: (a: NewCustomer, b: NewCustomer) => a.csm.localeCompare(b.csm),
    },
    {
      title: '所属象限',
      dataIndex: 'quadrant',
      key: 'quadrant',
      width: 120,
      filters: Object.keys(quadrantLabels).map(q => ({ text: q, value: q })),
      onFilter: (value: string | number | boolean, record: NewCustomer) => record.quadrant === value,
      render: (quadrant: Quadrant) => (
        <Tag color={quadrantColors[quadrant]}>
          {quadrant}
        </Tag>
      ),
    },
    {
      title: '行业',
      dataIndex: 'industry',
      key: 'industry',
      width: 100,
      filters: industries.map(i => ({ text: i, value: i })),
      onFilter: (value: string | number | boolean, record: NewCustomer) => record.industry === value,
      render: (industry: Industry) => (
        <Badge color={industryColors[industry]} text={industry} />
      ),
    },
    {
      title: `客户规模 (${scaleMetric})`,
      dataIndex: 'customerScale',
      key: 'customerScale',
      width: 120,
      sorter: (a: NewCustomer, b: NewCustomer) => a.customerScale - b.customerScale,
      render: (scale: number) => scale.toLocaleString(),
    },
    {
      title: '客单价 (¥)',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      width: 120,
      sorter: (a: NewCustomer, b: NewCustomer) => a.unitPrice - b.unitPrice,
      render: (price: number) => `¥${(price / 10000).toFixed(1)}万`,
    },
    {
      title: '签约日期',
      dataIndex: 'signDate',
      key: 'signDate',
      width: 120,
      sorter: (a: NewCustomer, b: NewCustomer) => new Date(a.signDate).getTime() - new Date(b.signDate).getTime(),
      defaultSortOrder: 'descend' as const,
    },
    {
      title: '首90天激活率',
      dataIndex: 'activationRate',
      key: 'activationRate',
      width: 130,
      sorter: (a: NewCustomer, b: NewCustomer) => a.activationRate - b.activationRate,
      render: (rate: number) => (
        <Text style={{ color: rate >= 80 ? '#52c41a' : rate >= 60 ? '#fa8c16' : '#ff4d4f' }}>
          {rate}%
        </Text>
      ),
    },
  ];

  return (
    <div>
      {/* 控制面板 */}
      <Card style={{ ...cardStyle, marginBottom: 16 }} bodyStyle={{ padding: 16 }}>
        <Row gutter={16} align="middle">
          <Col>
            <Space>
              <Text>规模口径：</Text>
              <Select value={scaleMetric} onChange={setScaleMetric} style={{ width: 100 }}>
                <Option value="人数">人数</Option>
                <Option value="席位">席位</Option>
                <Option value="门店数">门店数</Option>
              </Select>
            </Space>
          </Col>
          <Col>
            <Space>
              <Text>规模阈值：</Text>
              <Slider
                style={{ width: 120 }}
                min={50}
                max={500}
                value={scaleThreshold}
                onChange={setScaleThreshold}
                tooltip={{ formatter: (v) => `${v}${scaleMetric === '人数' ? '人' : scaleMetric === '席位' ? '席' : '家'}` }}
              />
              <Text type="secondary">{scaleThreshold}</Text>
            </Space>
          </Col>
          <Col>
            <Space>
              <Text>客单价阈值：</Text>
              <Slider
                style={{ width: 120 }}
                min={priceRange.min}
                max={priceRange.max}
                step={Math.max(1000, Math.round((priceRange.max - priceRange.min) / 40))}
                value={priceThreshold}
                onChange={setPriceThreshold}
                tooltip={{ formatter: (v) => `¥${(v! / 10000).toFixed(1)}万` }}
              />
              <Text type="secondary">¥{(priceThreshold / 10000).toFixed(1)}万</Text>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 四象限气泡图 */}
      <Card 
        style={{ ...cardStyle, marginBottom: 16 }} 
        title={<span style={{ fontWeight: 600 }}>新签客户分层 - 四象限气泡图</span>}
        extra={
          <Space>
            <Text type="secondary">气泡大小 = 新签客户数</Text>
            <Text type="secondary">颜色 = 行业类目</Text>

          </Space>
        }
      >
        <div 
          ref={chartRef} 
          style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden' }}
        >
          {bubbleTip?.visible && (
            <div style={{ 
              position: 'absolute', 
              left: bubbleTip.x, 
              top: bubbleTip.y, 
              background: '#fff', 
              border: '1px solid #f0f0f0', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)', 
              borderRadius: 6, 
              padding: '12px 16px', 
              fontSize: 12, 
              pointerEvents: 'none', 
              zIndex: 10,
              minWidth: 200
            }}>
              {bubbleTip.html}
            </div>
          )}
          
          <svg 
            viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
            style={{ width: '100%', height: '100%' }}
          >
            {/* 象限背景 */}
            <rect x={padding} y={padding} width={plotWidth/2} height={plotHeight/2} fill="#f6ffed" fillOpacity={0.3} />
            <rect x={padding + plotWidth/2} y={padding} width={plotWidth/2} height={plotHeight/2} fill="#e6f7ff" fillOpacity={0.3} />
            <rect x={padding} y={padding + plotHeight/2} width={plotWidth/2} height={plotHeight/2} fill="#fff7e6" fillOpacity={0.3} />
            <rect x={padding + plotWidth/2} y={padding + plotHeight/2} width={plotWidth/2} height={plotHeight/2} fill="#f5f5f5" fillOpacity={0.3} />
            
            {/* 象限标签 */}
            <text x={padding + plotWidth/4} y={padding + 20} textAnchor="middle" fontSize="14" fontWeight="600" fill="#52c41a">精品标杆</text>
            <text x={padding + plotWidth*3/4} y={padding + 20} textAnchor="middle" fontSize="14" fontWeight="600" fill="#1890ff">领先者</text>
            <text x={padding + plotWidth/4} y={padding + plotHeight - 10} textAnchor="middle" fontSize="14" fontWeight="600" fill="#bfbfbf">追赶者</text>
            <text x={padding + plotWidth*3/4} y={padding + plotHeight - 10} textAnchor="middle" fontSize="14" fontWeight="600" fill="#fa8c16">规模潜力</text>
            
            {/* 坐标轴 */}
            <line x1={padding} y1={padding} x2={padding} y2={padding + plotHeight} stroke="#d9d9d9" strokeWidth={2} />
            <line x1={padding} y1={padding + plotHeight} x2={padding + plotWidth} y2={padding + plotHeight} stroke="#d9d9d9" strokeWidth={2} />
            
            {/* 分割线 */}
            <line 
              x1={padding + (scaleThreshold / maxScale) * plotWidth} 
              y1={padding} 
              x2={padding + (scaleThreshold / maxScale) * plotWidth} 
              y2={padding + plotHeight} 
              stroke="#1890ff" 
              strokeWidth={2} 
              strokeDasharray="5,5" 
            />
            <line 
              x1={padding} 
              y1={padding + plotHeight - (priceThreshold / maxPrice) * plotHeight} 
              x2={padding + plotWidth} 
              y2={padding + plotHeight - (priceThreshold / maxPrice) * plotHeight} 
              stroke="#1890ff" 
              strokeWidth={2} 
              strokeDasharray="5,5" 
            />
            
            {/* X轴刻度 */}
            {Array.from({ length: 6 }).map((_, i) => {
              const value = (maxScale / 5) * i;
              const x = padding + (value / maxScale) * plotWidth;
              return (
                <g key={i}>
                  <line x1={x} y1={padding + plotHeight} x2={x} y2={padding + plotHeight + 5} stroke="#d9d9d9" />
                  <text x={x} y={padding + plotHeight + 20} textAnchor="middle" fontSize="10" fill="#8c8c8c">
                    {Math.round(value)}
                  </text>
                </g>
              );
            })}
            
            {/* Y轴刻度 */}
            {Array.from({ length: 6 }).map((_, i) => {
              const value = (maxPrice / 5) * i;
              const y = padding + plotHeight - (value / maxPrice) * plotHeight;
              return (
                <g key={i}>
                  <line x1={padding - 5} y1={y} x2={padding} y2={y} stroke="#d9d9d9" />
                  <text x={padding - 10} y={y + 4} textAnchor="end" fontSize="10" fill="#8c8c8c">
                    {(value / 10000).toFixed(0)}万
                  </text>
                </g>
              );
            })}
            
            {/* 气泡 */}
            {industryBubbles.map((bubble) => {
              const x = padding + (bubble.avgScale / maxScale) * plotWidth;
              const y = padding + plotHeight - (bubble.avgUnitPrice / maxPrice) * plotHeight;
              const r = 8 + (bubble.newCustomerCount / maxBubbleCount) * 20;
              const color = industryColors[bubble.industry];
              
              const tooltipContent = (
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8, color: color }}>{bubble.industry}</div>
                  <div>新签客户数：{bubble.newCustomerCount}</div>
                  <div>平均客单价：¥{(bubble.avgUnitPrice / 10000).toFixed(1)}万</div>
                  <div>平均规模：{bubble.avgScale}{scaleMetric === '人数' ? '人' : scaleMetric === '席位' ? '席' : '家'}</div>
                  <div>总ARR：¥{(bubble.totalArr / 10000).toFixed(1)}万</div>
                  <div style={{ marginTop: 8 }}>Top3客户：</div>
                  {bubble.topCustomers.map((name, idx) => (
                    <div key={idx} style={{ marginLeft: 8, fontSize: 11 }}>• {name}</div>
                  ))}
                </div>
              );
              
              return (
                <circle
                  key={bubble.industry}
                  cx={x}
                  cy={y}
                  r={r}
                  fill={color}
                  fillOpacity={0.6}
                  stroke={color}
                  strokeWidth={2}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={(e) => {
                    try {
                      const rect = chartRef.current?.getBoundingClientRect();
                      if (rect && e.clientX !== undefined && e.clientY !== undefined) {
                        setBubbleTip({ 
                          visible: true, 
                          x: e.clientX - rect.left + 12, 
                          y: e.clientY - rect.top + 12, 
                          html: tooltipContent 
                        });
                      }
                    } catch (error) {
                      console.warn('Error in bubble tooltip:', error);
                      setBubbleTip(null);
                    }
                  }}
                  onMouseMove={(e) => {
                    try {
                      const rect = chartRef.current?.getBoundingClientRect();
                      if (rect && bubbleTip && e.clientX !== undefined && e.clientY !== undefined) {
                        setBubbleTip(prev => prev ? { 
                          ...prev, 
                          x: e.clientX - rect.left + 12, 
                          y: e.clientY - rect.top + 12 
                        } : prev);
                      }
                    } catch (error) {
                      console.warn('Error in bubble tooltip move:', error);
                      setBubbleTip(null);
                    }
                  }}
                  onMouseLeave={() => setBubbleTip(null)}
                  onClick={() => {
                    setSelectedIndustries([bubble.industry]);
                  }}
                />
              );
            })}
            
            {/* 轴标题 */}
            <text x={padding + plotWidth/2} y={chartHeight - 10} textAnchor="middle" fontSize="12" fill="#8c8c8c">
              客户规模 ({scaleMetric})
            </text>
            <text x={20} y={padding + plotHeight/2} textAnchor="middle" fontSize="12" fill="#8c8c8c" transform={`rotate(-90, 20, ${padding + plotHeight/2})`}>
              客单价 (万元)
            </text>
          </svg>
        </div>
      </Card>

      {/* 新签客户清单 */}
      <Card
        style={{ ...cardStyle }}
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <span style={{ fontSize: 16, fontWeight: 600 }}>新签客户清单 ({filteredCustomers.length})</span>
            <Space>
              {selectedIndustries.length > 0 && (
                <Space>
                  <Text type="secondary">已选行业：</Text>
                  {selectedIndustries.map(industry => (
                    <Tag 
                      key={industry} 
                      color={industryColors[industry]}
                      closable
                      onClose={() => setSelectedIndustries(prev => prev.filter(i => i !== industry))}
                    >
                      {industry}
                    </Tag>
                  ))}
                  <Button size="small" onClick={() => setSelectedIndustries([])}>
                    清除筛选
                  </Button>
                </Space>
              )}
              <Input.Search
                allowClear
                placeholder="搜索客户/CSM/行业..."
                style={{ width: 280 }}
                onSearch={setSearch}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Space>
          </div>
        }
      >
        <Table
          rowKey="id"
          dataSource={filteredCustomers}
          columns={columns as any}
          pagination={{ pageSize: 10, showSizeChanger: true, showQuickJumper: true }}
          scroll={{ x: 1200 }}
          onRow={(record) => ({
            onClick: () => {
              setSelectedCustomer(record);
              setCustomerDetailVisible(true);
              onCustomerSelect?.(record);
            },
            style: { cursor: 'pointer' }
          })}
        />  
      </Card>

      {/* 客户详情弹窗 */}
      <CustomerDetailDrawer
        visible={customerDetailVisible}
        customer={selectedCustomer}
        onClose={() => {
          setCustomerDetailVisible(false);
          setSelectedCustomer(null);
        }}
      />
    </div>
  );
};

export default NewCustomerTieringTab;