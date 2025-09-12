import React, { useMemo, useState, useRef } from 'react';
import { Row, Col, Card, Typography, Tooltip, Space, Button, Badge, Dropdown, Table, Avatar, Tag, Input, Checkbox } from 'antd';
import { SettingOutlined, QuestionCircleOutlined, MoreOutlined, ArrowUpOutlined, ArrowDownOutlined, ZoomInOutlined, ZoomOutOutlined, UndoOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

type ValueTier = '高价值' | '中价值' | '低价值';
type LifecycleStage = '导入期' | '成长期' | '成熟期' | '衰退期';

type Customer = {
  id: string;
  name: string;
  logoColor: string;
  csm: string;
  valueScore: number; // 0-100
  trend: 'up' | 'down' | 'flat';
  lifecycle: LifecycleStage;
  valueTier: ValueTier;
  rAndM: number; // 收入&金额分
  f: number; // 频次/活跃度
  serviceScore: number; // 服务互动
  arr: number; // 合同金额 (ARR)
  healthScore: number; // 健康度评分
  riskEvents: number; // 近90天风险事件数
  upsellAmount: number; // 近90天增购额
  tags: string[]; // 标签
  // 兼容BaseCustomer的额外字段
  industry?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  region?: string;
  isChannelCustomer?: boolean;
  rScore?: number;
  fScore?: number;
  mScore?: number;
  riskLevel?: 'safe' | 'attention' | 'risk';
  signDate?: string;
  collaborationEvents?: number;
  channelType?: 'direct' | 'partner' | 'reseller';
  isKeyAccount?: boolean;
  isInRenewalWindow?: boolean;
  visits90Days?: number;
  revenue90Days?: number;
  insights?: Array<{
    id: string;
    content: string;
    date: string;
    type: string;
  }>;
  nextAction?: {
    content: string;
    dueDate: string;
    overdue: boolean;
  };
};

export interface ValueLifecycleTabProps {
  customers: Customer[];
  onCustomerSelect?: (customer: Customer) => void;
  selectedMatrix?: { valueTier: ValueTier; stage: LifecycleStage } | null;
  onMatrixSelect?: (selection: { valueTier: ValueTier; stage: LifecycleStage } | null) => void;
}

const ValueLifecycleTab: React.FC<ValueLifecycleTabProps> = ({ customers, onCustomerSelect, selectedMatrix, onMatrixSelect }) => {
  const [selected, setSelected] = useState<{ valueTier: ValueTier; stage: LifecycleStage } | null>(null);
  const [search, setSearch] = useState('');
  const listRef = useRef<HTMLDivElement | null>(null);
  const [listHighlight, setListHighlight] = useState(false);
  const [flowFilter, setFlowFilter] = useState<'all' | 'inflow' | 'outflow'>('all');
  const highlightTimerRef = useRef<number | null>(null);
  const [bubbleTip, setBubbleTip] = useState<{ visible: boolean; x: number; y: number; html: React.ReactNode } | null>(null);
  const [sankeyTip, setSankeyTip] = useState<{ visible: boolean; x: number; y: number; text: string } | null>(null);
  
  // 字段显示控制状态
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    name: true,
    csm: true,
    valueScore: true,
    lifecycle: true,
    rAndM: true,
    f: true,
    serviceScore: true,
    riskEvents: true,
    upsellAmount: true,
    tags: true,
  });
  
  // 坐标轴缩放相关状态
  const [xAxisRange, setXAxisRange] = useState({ min: 0, max: 100 });
  const [yAxisRange, setYAxisRange] = useState({ min: 0, max: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  const cardStyle: React.CSSProperties = {
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    border: '1px solid #f0f0f0',
    background: '#ffffff',
  };

  const valueTiers: ValueTier[] = ['高价值', '中价值', '低价值'];
  const lifecycleStages: LifecycleStage[] = ['导入期', '成长期', '成熟期', '衰退期'];

  const valueTierScoreHint: Record<ValueTier, string> = {
    高价值: '评分区间: 80 - 100',
    中价值: '评分区间: 60 - 79',
    低价值: '评分区间: 0 - 59',
  };

  const valueTierRowColor: Record<ValueTier, string> = {
    高价值: '#2f54eb14',
    中价值: '#2f54eb0d',
    低价值: '#2f54eb08',
  };

  const lifecycleAccentColor: Record<LifecycleStage, string> = {
    导入期: '#40a9ff',
    成长期: '#fa8c16',
    成熟期: '#52c41a',
    衰退期: '#bfbfbf',
  };

  function getCellStyle(valueTier: ValueTier, stage: LifecycleStage, selected: boolean): React.CSSProperties {
    return {
      background: valueTierRowColor[valueTier],
      border: `1px solid ${selected ? lifecycleAccentColor[stage] : '#f0f0f0'}`,
      borderRadius: 10,
      padding: 16,
      cursor: 'pointer',
      transition: 'all 0.2s',
      boxShadow: selected ? `0 0 0 3px ${lifecycleAccentColor[stage]}22` : 'none',
    };
  }

  // 坐标轴缩放控制函数
  const handleZoomIn = () => {
    const xCenter = (xAxisRange.min + xAxisRange.max) / 2;
    const yCenter = (yAxisRange.min + yAxisRange.max) / 2;
    const xRange = (xAxisRange.max - xAxisRange.min) * 0.7; // 缩小范围
    const yRange = (yAxisRange.max - yAxisRange.min) * 0.7;
    
    setXAxisRange({
      min: Math.max(0, xCenter - xRange / 2),
      max: Math.min(100, xCenter + xRange / 2)
    });
    setYAxisRange({
      min: Math.max(0, yCenter - yRange / 2),
      max: Math.min(100, yCenter + yRange / 2)
    });
  };

  const handleZoomOut = () => {
    const xCenter = (xAxisRange.min + xAxisRange.max) / 2;
    const yCenter = (yAxisRange.min + yAxisRange.max) / 2;
    const xRange = (xAxisRange.max - xAxisRange.min) * 1.4; // 扩大范围
    const yRange = (yAxisRange.max - yAxisRange.min) * 1.4;
    
    setXAxisRange({
      min: Math.max(0, xCenter - xRange / 2),
      max: Math.min(100, xCenter + xRange / 2)
    });
    setYAxisRange({
      min: Math.max(0, yCenter - yRange / 2),
      max: Math.min(100, yCenter + yRange / 2)
    });
  };

  const handleResetZoom = () => {
    setXAxisRange({ min: 0, max: 100 });
    setYAxisRange({ min: 0, max: 100 });
    setPanOffset({ x: 0, y: 0 });
  };

  // 坐标轴拖拽处理函数
  const handleMouseDown = (e: React.MouseEvent) => {
    const isZoomed = xAxisRange.min > 0 || xAxisRange.max < 100 || yAxisRange.min > 0 || yAxisRange.max < 100;
    if (isZoomed) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = (e.clientX - dragStart.x) * 0.1; // 调整灵敏度
      const deltaY = (e.clientY - dragStart.y) * 0.1;
      
      const xRange = xAxisRange.max - xAxisRange.min;
      const yRange = yAxisRange.max - yAxisRange.min;
      
      let newXMin = xAxisRange.min - deltaX;
      let newXMax = xAxisRange.max - deltaX;
      let newYMin = yAxisRange.min + deltaY; // Y轴方向相反
      let newYMax = yAxisRange.max + deltaY;
      
      // 边界检查
      if (newXMin < 0) {
        newXMin = 0;
        newXMax = xRange;
      }
      if (newXMax > 100) {
        newXMax = 100;
        newXMin = 100 - xRange;
      }
      if (newYMin < 0) {
        newYMin = 0;
        newYMax = yRange;
      }
      if (newYMax > 100) {
        newYMax = 100;
        newYMin = 100 - yRange;
      }
      
      setXAxisRange({ min: newXMin, max: newXMax });
      setYAxisRange({ min: newYMin, max: newYMax });
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const matrixCounts = useMemo(() => {
    const counts: Record<ValueTier, Record<LifecycleStage, number>> = {
      高价值: { 导入期: 0, 成长期: 0, 成熟期: 0, 衰退期: 0 },
      中价值: { 导入期: 0, 成长期: 0, 成熟期: 0, 衰退期: 0 },
      低价值: { 导入期: 0, 成长期: 0, 成熟期: 0, 衰退期: 0 },
    };
    for (const c of customers) {
      counts[c.valueTier][c.lifecycle] += 1;
    }
    return counts;
  }, [customers]);

  const filteredCustomers = useMemo(() => {
    let list = customers;
    // 优先使用外部传入的selectedMatrix，如果没有则使用内部的selected
    const activeSelection = selectedMatrix || selected;
    if (activeSelection) {
      list = list.filter((c) => c.valueTier === activeSelection.valueTier && c.lifecycle === activeSelection.stage);
    }
    if (search.trim()) {
      const k = search.trim();
      list = list.filter((c) => c.name.includes(k) || c.csm.includes(k) || c.valueTier.includes(k) || c.lifecycle.includes(k));
    }
    return list;
  }, [selectedMatrix, selected, search, customers]);

  const activeSelection = selectedMatrix || selected;
  const selectedTitle = activeSelection ? `${activeSelection.valueTier} · ${activeSelection.stage}` : '全部客户';

  // 聚合每个矩阵分群的数据：计数、均值与总ARR
  const segmentAgg = useMemo(() => {
    const agg: Record<string, {
      key: string;
      valueTier: ValueTier;
      stage: LifecycleStage;
      count: number;
      avgHealth: number;
      avgActive: number;
      totalArr: number;
    }> = {};
    for (const vt of valueTiers) {
      for (const st of lifecycleStages) {
        const key = `${vt}-${st}`;
        agg[key] = { key, valueTier: vt, stage: st, count: 0, avgHealth: 0, avgActive: 0, totalArr: 0 };
      }
    }
    // 使用过滤后的客户数据进行聚合
    const activeSelection = selectedMatrix || selected;
    let dataSource = customers;
    if (activeSelection) {
      dataSource = customers.filter((c) => c.valueTier === activeSelection.valueTier && c.lifecycle === activeSelection.stage);
    }
    for (const c of dataSource) {
      const key = `${c.valueTier}-${c.lifecycle}`;
      const it = agg[key];
      it.count += 1;
      it.avgHealth += c.healthScore;
      it.avgActive += c.f;
      it.totalArr += c.arr;
    }
    for (const k of Object.keys(agg)) {
      const it = agg[k];
      if (it.count > 0) {
        it.avgHealth = Math.round(it.avgHealth / it.count);
        it.avgActive = Math.round(it.avgActive / it.count);
      }
    }
    return agg;
  }, [selectedMatrix, selected, customers]);

  const maxSegmentArr = useMemo(() => {
    return Math.max(1, ...Object.values(segmentAgg).map((s) => s.totalArr));
  }, [segmentAgg]);

  // 生成迁移数据
  function hashStringToNumber(input: string): number {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = (hash << 5) - hash + input.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  const tierMigration = useMemo(() => {
    const key = selected ? `${selected.valueTier}-${selected.stage}` : 'ALL';
    const seed = hashStringToNumber(key);
    const size = filteredCustomers.length || 1;
    const ratioUp = 0.2 + ((seed % 30) / 100);
    const ratioDown = 0.1 + ((seed % 15) / 100);
    const up = Math.round(size * ratioUp);
    const down = Math.round(size * ratioDown);
    const same = Math.max(0, size - up - down);
    const up_l2m = Math.round(up * 0.45);
    const up_m2h = Math.max(0, up - up_l2m);
    const down_h2m = Math.round(down * 0.6);
    const down_m2l = Math.max(0, down - down_h2m);
    const same_m = Math.round(same * 0.5);
    const same_l = Math.round((same - same_m) * 0.4);
    const same_h = Math.max(0, same - same_m - same_l);
    return { up_l2m, up_m2h, same_l, same_m, same_h, down_h2m, down_m2l };
  }, [filteredCustomers.length, selected]);

  function scrollToListAndHighlight() {
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setListHighlight(true);
    if (highlightTimerRef.current) {
      window.clearTimeout(highlightTimerRef.current);
    }
    highlightTimerRef.current = window.setTimeout(() => setListHighlight(false), 1600);
  }

  const allColumns = [
    {
      title: '客户名称',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left' as const,
      width: 180,
      sorter: (a: Customer, b: Customer) => a.name.localeCompare(b.name),
      render: (_: unknown, record: Customer) => (
        <span>{record.name}</span>
      ),
    },
    {
      title: '客户成功',
      dataIndex: 'csm',
      key: 'csm',
      width: 120,
      align: 'center' as const,
      sorter: (a: Customer, b: Customer) => a.csm.localeCompare(b.csm),
    },
    {
      title: '价值总分',
      dataIndex: 'valueScore',
      key: 'valueScore',
      width: 140,
      align: 'center' as const,
      sorter: (a: Customer, b: Customer) => a.valueScore - b.valueScore,
      render: (v: number, record: Customer) => (
        <Space>
          <Text strong>{v}分</Text>
          {record.trend === 'up' ? (
            <ArrowUpOutlined style={{ color: '#ff4d4f' }} />
          ) : record.trend === 'down' ? (
            <ArrowDownOutlined style={{ color: '#1890ff' }} />
          ) : (
            <span style={{ color: '#8c8c8c', fontSize: '12px' }}>—</span>
          )}
        </Space>
      ),
    },
    {
      title: '生命周期',
      dataIndex: 'lifecycle',
      key: 'lifecycle',
      width: 120,
      align: 'center' as const,
      filters: lifecycleStages.map((s) => ({ text: s, value: s })),
      onFilter: (value: string | number | boolean, record: Customer) => record.lifecycle === value,
      render: (v: LifecycleStage) => (
        <Tag color={lifecycleAccentColor[v]} style={{ borderColor: `${lifecycleAccentColor[v]}55` }}>
          {v}
        </Tag>
      ),
    },
    {
      title: '财务价值 (R&M)',
      dataIndex: 'rAndM',
      key: 'rAndM',
      width: 150,
      align: 'center' as const,
      sorter: (a: Customer, b: Customer) => a.rAndM - b.rAndM,
    },
    {
      title: '活跃度价值 (F)',
      dataIndex: 'f',
      key: 'f',
      width: 140,
      align: 'center' as const,
      sorter: (a: Customer, b: Customer) => a.f - b.f,
    },
    {
      title: '服务交互值',
      dataIndex: 'serviceScore',
      key: 'serviceScore',
      width: 120,
      align: 'center' as const,
      sorter: (a: Customer, b: Customer) => a.serviceScore - b.serviceScore,
    },
    {
      title: '近90天风险事件数',
      dataIndex: 'riskEvents',
      key: 'riskEvents',
      width: 160,
      align: 'center' as const,
      sorter: (a: Customer, b: Customer) => a.riskEvents - b.riskEvents,
      render: (v: number) => (
        <Text style={{ color: v > 0 ? '#ff4d4f' : '#52c41a' }}>{v}</Text>
      ),
    },
    {
      title: '近90天增购额',
      dataIndex: 'upsellAmount',
      key: 'upsellAmount',
      width: 140,
      align: 'center' as const,
      sorter: (a: Customer, b: Customer) => a.upsellAmount - b.upsellAmount,
      render: (v: number) => (
        <Text>{v > 0 ? `¥${(v / 10000).toFixed(1)}万` : '-'}</Text>
      ),
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      width: 200,
      align: 'center' as const,
      render: (tags: string[]) => (
        <Space wrap>
          {tags.slice(0, 2).map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
          {tags.length > 2 && <Text type="secondary">+{tags.length - 2}</Text>}
        </Space>
      ),
    },
  ];

  // 根据visibleColumns过滤显示的列
  const columns = allColumns.filter(col => visibleColumns[col.key]);

  // 字段设置菜单项
  const columnSettingsItems = allColumns.map(col => ({
    key: col.key,
    label: (
      <Checkbox
        checked={visibleColumns[col.key]}
        onChange={(e) => {
          setVisibleColumns(prev => ({
            ...prev,
            [col.key]: e.target.checked
          }));
        }}
      >
        {col.title}
      </Checkbox>
    ),
  }));

  const headerTitle = selected
    ? `客户列表 - ${selected.valueTier} & ${selected.stage} (${filteredCustomers.length})`
    : `客户列表 - 全部客户 (${filteredCustomers.length})`;

  return (
    <div>
      {/* 九宫格分层矩阵 */}
      <Card style={{ ...cardStyle, marginTop: 16, marginBottom: 16 }} bodyStyle={{ padding: 16 }}>
        <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center' }}>
          <Text type="secondary">当前筛选：</Text>
          <Text strong style={{ marginLeft: 8 }}>{selectedTitle}</Text>
        </div>
        <Row gutter={[12, 12]}>
          {/* 顶部X轴标签 */}
          <Col span={4}></Col>
          {lifecycleStages.map((stage) => (
            <Col key={stage} span={5} style={{ display: 'flex', alignItems: 'center' }}>
              <Space>
                <Badge color={lifecycleAccentColor[stage]} />
                <Text style={{ color: '#262626', fontWeight: 500 }}>{stage}</Text>
              </Space>
            </Col>
          ))}
        </Row>
        {valueTiers.map((tier) => (
          <Row key={tier} gutter={[12, 10]} align="middle" style={{ marginTop: 2 }}>
            <Col span={4}>
              <Space>
                <Text style={{ fontWeight: 600, color: '#1f1f1f' }}>{tier}</Text>
                <Tooltip title={valueTierScoreHint[tier]}>
                  <QuestionCircleOutlined style={{ color: '#8c8c8c' }} />
                </Tooltip>
              </Space>
            </Col>
            {lifecycleStages.map((stage) => {
              const activeSelection = selectedMatrix || selected;
              const isSelected = !!activeSelection && activeSelection.valueTier === tier && activeSelection.stage === stage;
              const count = matrixCounts[tier][stage];
              const menuItems = [
                { key: 'list', label: '查看客户列表' },
                { key: 'report', label: '生成群体报告' },
                { key: 'playbook', label: '应用服务剧本' },
              ];
              return (
                <Col key={`${tier}-${stage}`} span={5}>
                  <div
                    style={{ ...getCellStyle(tier, stage, isSelected), position: 'relative' }}
                    onClick={() => {
                      const selection = { valueTier: tier, stage };
                      setSelected(selection);
                      onMatrixSelect?.(selection);
                    }}
                    onMouseEnter={(e) => ((e.currentTarget.style.boxShadow = `0 4px 12px rgba(0,0,0,0.08), 0 0 0 3px ${lifecycleAccentColor[stage]}11`))}
                    onMouseLeave={(e) => ((e.currentTarget.style.boxShadow = isSelected ? `0 0 0 3px ${lifecycleAccentColor[stage]}22` : 'none'))}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text type="secondary" style={{ fontSize: 12 }}>{tier} · {stage}</Text>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Badge color={lifecycleAccentColor[stage]} />
                        <Dropdown
                          trigger={['click']}
                          menu={{
                            items: menuItems,
                            onClick: ({ key }) => {
                              const selection = { valueTier: tier, stage };
                              setSelected(selection);
                              onMatrixSelect?.(selection);
                              if (key === 'list') {
                                scrollToListAndHighlight();
                              }
                            },
                          }}
                        >
                          <MoreOutlined style={{ color: '#8c8c8c' }} onClick={(ev) => ev.stopPropagation()} />
                        </Dropdown>
                      </div>
                    </div>
                    <div style={{ marginTop: 6, fontSize: 24, fontWeight: 700, color: '#2f54eb' }}>{count}</div>
                    <div style={{ marginTop: 2, fontSize: 12, color: '#8c8c8c' }}>客户数</div>
                  </div>
                </Col>
              );
            })}
          </Row>
        ))}
      </Card>

      {/* 图表区：两图同一行 */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        {/* 分层健康与价值矩阵气泡图 */}
        <Col xs={24} lg={12}>
          <Card 
            style={{ ...cardStyle }} 
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600 }}>分层散点/气泡图</span>
                <Space>
                  <Button 
                    type="text" 
                    size="small" 
                    icon={<ZoomInOutlined />} 
                    onClick={handleZoomIn}
                    disabled={xAxisRange.max - xAxisRange.min <= 10 || yAxisRange.max - yAxisRange.min <= 10}
                  />
                  <Button 
                    type="text" 
                    size="small" 
                    icon={<ZoomOutOutlined />} 
                    onClick={handleZoomOut}
                    disabled={xAxisRange.min === 0 && xAxisRange.max === 100 && yAxisRange.min === 0 && yAxisRange.max === 100}
                  />
                  <Button 
                    type="text" 
                    size="small" 
                    icon={<UndoOutlined />} 
                    onClick={handleResetZoom}
                    disabled={xAxisRange.min === 0 && xAxisRange.max === 100 && yAxisRange.min === 0 && yAxisRange.max === 100}
                  />
                </Space>
              </div>
            }
          >
            <div 
              style={{ 
                width: '100%', 
                height: 280, 
                position: 'relative', 
                overflow: 'hidden',
                cursor: (xAxisRange.min > 0 || xAxisRange.max < 100 || yAxisRange.min > 0 || yAxisRange.max < 100) ? (isDragging ? 'grabbing' : 'grab') : 'default'
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {bubbleTip?.visible && (
                <div style={{ position: 'absolute', left: bubbleTip.x, top: bubbleTip.y, background: '#fff', border: '1px solid #f0f0f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', borderRadius: 6, padding: '8px 10px', fontSize: 12, pointerEvents: 'none', zIndex: 2 }}>
                  {bubbleTip.html}
                </div>
              )}
              <svg 
                viewBox="0 0 420 200" 
                preserveAspectRatio="none" 
                style={{ 
                  width: '100%', 
                  height: '100%'
                }}
              >
                {/* 坐标轴 */}
                <line x1="40" y1="10" x2="40" y2="170" stroke="#d9d9d9" />
                <line x1="40" y1="170" x2="400" y2="170" stroke="#d9d9d9" />
                {/* y轴刻度 */}
                {Array.from({ length: 6 }).map((_, i) => {
                  const v = yAxisRange.min + (i * (yAxisRange.max - yAxisRange.min)) / 5;
                  const y = 170 - (i / 5) * 150;
                  return (
                    <g key={i}>
                      <line x1="36" y1={y} x2="40" y2={y} stroke="#d9d9d9" />
                      <text x="10" y={y + 4} fontSize="10" fill="#8c8c8c">{Math.round(v)}</text>
                    </g>
                  );
                })}
                {/* x轴刻度 */}
                {Array.from({ length: 6 }).map((_, i) => {
                  const v = xAxisRange.min + (i * (xAxisRange.max - xAxisRange.min)) / 5;
                  const x = 40 + (i / 5) * 360;
                  return (
                    <g key={i}>
                      <line x1={x} y1="170" x2={x} y2="174" stroke="#d9d9d9" />
                      <text x={x} y="188" fontSize="10" fill="#8c8c8c" textAnchor="middle">{Math.round(v)}</text>
                    </g>
                  );
                })}
                {/* 气泡 */}
                {
                  Object.values(segmentAgg).map((s) => {
                    if (s.count === 0) return null;
                    
                    // 检查气泡是否在当前视图范围内
                    if (s.avgHealth < xAxisRange.min || s.avgHealth > xAxisRange.max || 
                        s.avgActive < yAxisRange.min || s.avgActive > yAxisRange.max) {
                      return null;
                    }
                    
                    const x = 40 + ((s.avgHealth - xAxisRange.min) / (xAxisRange.max - xAxisRange.min)) * 360;
                    const y = 170 - ((s.avgActive - yAxisRange.min) / (yAxisRange.max - yAxisRange.min)) * 150;
                    const r = 6 + (s.totalArr / maxSegmentArr) * 16;
                    const color = lifecycleAccentColor[s.stage];
                    const html = (
                      <div>
                        <div style={{ fontWeight: 600, marginBottom: 4 }}>{`${s.valueTier} - ${s.stage}`}</div>
                        <div>客户数：{s.count}</div>
                        <div>总ARR：¥{(s.totalArr / 10000).toFixed(1)}万</div>
                        <div>平均健康分：{s.avgHealth}</div>
                        <div>平均活跃度：{s.avgActive}</div>
                      </div>
                    );
                    return (
                      <circle
                        key={s.key}
                        cx={x}
                        cy={y}
                        r={r}
                        fill={color}
                        fillOpacity={0.35}
                        stroke={color}
                        onMouseEnter={(e) => {
                          const rect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
                          setBubbleTip({ visible: true, x: e.clientX - rect.left + 12, y: e.clientY - rect.top + 12, html });
                        }}
                        onMouseMove={(e) => {
                          const rect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
                          setBubbleTip((prev) => prev ? { ...prev, x: e.clientX - rect.left + 12, y: e.clientY - rect.top + 12 } : prev);
                        }}
                        onMouseLeave={() => setBubbleTip(null)}
                        onClick={() => {
                          const selection = { valueTier: s.valueTier, stage: s.stage };
                          setSelected(selection);
                          onMatrixSelect?.(selection);
                        }}
                        style={{ cursor: 'pointer' }}
                      />
                    );
                  })
                }
                {/* 轴标题 */}
                <text x="220" y="210" textAnchor="middle" fontSize="12" fill="#595959">客户健康度 ({Math.round(xAxisRange.min)}-{Math.round(xAxisRange.max)})</text>
                <text x="8" y="12" textAnchor="start" fontSize="12" fill="#595959">价值分 ({Math.round(yAxisRange.min)}-{Math.round(yAxisRange.max)})</text>
              </svg>
            </div>
          </Card>
        </Col>

        {/* 迁移流向图（Sankey） */}
        <Col xs={24} lg={12}>
          <Card style={{ ...cardStyle }} title={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600 }}>迁移流向图 (上季→本季)</span>
              <Space size="small">
                <Button 
                  size="small" 
                  type={flowFilter === 'all' ? 'primary' : 'default'}
                  onClick={() => setFlowFilter('all')}
                >
                  全部
                </Button>
                <Button 
                  size="small" 
                  type={flowFilter === 'inflow' ? 'primary' : 'default'}
                  onClick={() => setFlowFilter('inflow')}
                >
                  流入
                </Button>
                <Button 
                  size="small" 
                  type={flowFilter === 'outflow' ? 'primary' : 'default'}
                  onClick={() => setFlowFilter('outflow')}
                >
                  流出
                </Button>
              </Space>
            </div>
          }>
            <div style={{ width: '100%', height: 280, position: 'relative' }}>
              {sankeyTip?.visible && (
                <div style={{ position: 'absolute', left: sankeyTip.x, top: sankeyTip.y, background: '#fff', border: '1px solid #d9d9d9', borderRadius: 4, padding: '6px 8px', fontSize: 12, pointerEvents: 'none', zIndex: 10 }}>
                  {sankeyTip.text}
                </div>
              )}
              <svg viewBox="-20 0 460 260" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }}>
                {(() => {
                  const leftX = 70; const rightX = 350;
                  const tiers: ValueTier[] = ['高价值', '中价值', '低价值'];
                  const positions: Record<string, number> = {};
                  tiers.forEach((t, i) => {
                    positions[`L-${t}`] = 60 + i * 80;
                    positions[`R-${t}`] = 60 + i * 80;
                  });
                  // 使用之前的迁移数据构造流
                  const allFlows = [
                    { from: '低价值', to: '中价值', value: tierMigration.up_l2m, color: '#5B8FF9', type: 'inflow' },
                    { from: '中价值', to: '高价值', value: tierMigration.up_m2h, color: '#5AD8A6', type: 'inflow' },
                    { from: '低价值', to: '低价值', value: tierMigration.same_l, color: '#B37FEB', type: 'same' },
                    { from: '中价值', to: '中价值', value: tierMigration.same_m, color: '#FF9D4D', type: 'same' },
                    { from: '高价值', to: '高价值', value: tierMigration.same_h, color: '#CDDDFD', type: 'same' },
                    { from: '高价值', to: '中价值', value: tierMigration.down_h2m, color: '#F4664A', type: 'outflow' },
                    { from: '中价值', to: '低价值', value: tierMigration.down_m2l, color: '#D3F261', type: 'outflow' },
                  ];
                  
                  // 根据过滤条件筛选流向
                  const flows = allFlows.filter(flow => {
                    if (flowFilter === 'all') return true;
                    if (flowFilter === 'inflow') return flow.type === 'inflow';
                    if (flowFilter === 'outflow') return flow.type === 'outflow';
                    return true;
                  });
                  const maxFlow = Math.max(1, ...flows.map(f => f.value));
                  const strokeScale = (v: number) => 2 + (v / maxFlow) * 14;
                  function pathD(y1: number, y2: number) {
                    const cx1 = 160; const cx2 = 260;
                    return `M ${leftX} ${y1} C ${cx1} ${y1}, ${cx2} ${y2}, ${rightX} ${y2}`;
                  };
                  
                  return (
                    <g>
                      {/* 节点 */}
                      {tiers.map((t) => (
                        <g key={`node-left-${t}`}>
                          <rect x={leftX - 32} y={positions[`L-${t}`] - 18} width={64} height={36} rx={6} fill="#f5f5f5" stroke="#d9d9d9" />
                          <text x={leftX - 36} y={positions[`L-${t}`] - 2} fontSize="12" textAnchor="end" fill="#595959">上季度</text>
                          <text x={leftX - 36} y={positions[`L-${t}`] + 12} fontSize="12" textAnchor="end" fill="#595959">{t}</text>
                        </g>
                      ))}
                      {tiers.map((t) => (
                        <g key={`node-right-${t}`}>
                          <rect x={rightX - 32} y={positions[`R-${t}`] - 18} width={64} height={36} rx={6} fill="#f5f5f5" stroke="#d9d9d9" />
                          <text x={rightX + 36} y={positions[`R-${t}`] - 2} fontSize="12" textAnchor="start" fill="#595959">本季度</text>
                          <text x={rightX + 36} y={positions[`R-${t}`] + 12} fontSize="12" textAnchor="start" fill="#595959">{t}</text>
                        </g>
                      ))}
                      {/* 流动带 */}
                      {flows.map((f, idx) => (
                        <path
                          key={idx}
                          d={pathD(positions[`L-${f.from}`], positions[`R-${f.to}`])}
                          stroke={f.color}
                          strokeOpacity={0.5}
                          strokeWidth={strokeScale(f.value)}
                          fill="none"
                          onMouseEnter={(e) => {
                            const rect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
                            setSankeyTip({ visible: true, x: e.clientX - rect.left + 12, y: e.clientY - rect.top + 12, text: `${f.from} -> ${f.to}：${f.value}个客户` });
                          }}
                          onMouseMove={(e) => {
                            const rect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
                            setSankeyTip((prev) => prev ? { ...prev, x: e.clientX - rect.left + 12, y: e.clientY - rect.top + 12 } : prev);
                          }}
                          onMouseLeave={() => setSankeyTip(null)}
                        />
                      ))}
                    </g>
                  );
                })()}
              </svg>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 客户列表 */}
      <Card
        ref={listRef as any}
        style={{
          ...cardStyle,
          boxShadow: listHighlight
            ? '0 0 0 3px #1890ff33, 0 6px 20px rgba(0,0,0,0.08)'
            : (cardStyle.boxShadow as string),
          border: listHighlight ? '1px solid #91caff' : (cardStyle.border as string),
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        }}
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <span style={{ fontSize: 16, fontWeight: 600 }}>{headerTitle}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Dropdown
                menu={{ items: columnSettingsItems }}
                trigger={['click']}
                placement="bottomRight"
              >
                <Button icon={<SettingOutlined />} type="text">
                  字段设置
                </Button>
              </Dropdown>
              <Input.Search
                allowClear
                placeholder="搜索客户/CSM/标签..."
                style={{ width: 320 }}
                onSearch={(v) => setSearch(v)}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        }
      >
        <Table
          rowKey="id"
          dataSource={filteredCustomers}
          columns={columns as any}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `共 ${total} 条记录，当前显示 ${range[0]}-${range[1]} 条`,
            pageSizeOptions: ['10', '20', '50', '100'],
            showLessItems: true,
          }}
          scroll={{ x: 1500 }}
          onRow={(record) => ({
            onClick: () => onCustomerSelect?.(record),
            style: { cursor: 'pointer' }
          })}
        />
      </Card>
    </div>
  );
};

export default ValueLifecycleTab;