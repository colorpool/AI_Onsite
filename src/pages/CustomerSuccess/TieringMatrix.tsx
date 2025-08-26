import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Row, Col, Card, Typography, Tooltip, Space, Button, Badge, Dropdown, Table, Avatar, Tag, Input } from 'antd';
import { SettingOutlined, QuestionCircleOutlined, MoreOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';


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
};

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

// 蓝色饱和度梯度（高->低）
const valueTierRowColor: Record<ValueTier, string> = {
  高价值: '#2f54eb14',
  中价值: '#2f54eb0d',
  低价值: '#2f54eb08',
};

// 生命周期色调（用于边框/强调色）
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

function generateMockCustomers(): Customer[] {
  const names = [
    '阿里巴巴', '腾讯科技', '字节跳动', '美团点评', '滴滴出行', '小米科技', '百度集团', '网易公司',
    '京东科技', '拼多多', '哔哩哔哩', '快手科技', '携程旅行', '小红书', '华为云', 'OPPO', 'vivo',
    '海尔智家', '隆基绿能', '比亚迪', '蔚来汽车', '理想汽车', '小鹏汽车', '同程旅行', '去哪儿',
  ];
  const csms = ['王一', '李二', '张三', '赵四', '陈五', '孙六', '周七'];
  const colors = ['#1890ff', '#fa8c16', '#722ed1', '#13c2c2', '#eb2f96', '#52c41a', '#2f54eb'];

  const customers: Customer[] = [];
  let id = 1;
  for (const baseName of names) {
    const repeats = Math.random() > 0.5 ? 2 : 1;
    for (let i = 0; i < repeats; i++) {
      const lifecycle = lifecycleStages[Math.floor(Math.random() * lifecycleStages.length)];
      const valueScore = Math.floor(Math.random() * 61) + 40; // 40-100
      const valueTier: ValueTier = valueScore >= 80 ? '高价值' : valueScore >= 60 ? '中价值' : '低价值';
      const rAndM = Math.floor(Math.random() * 61) + 40;
      const f = Math.floor(Math.random() * 61) + 20;
      const serviceScore = Math.floor(Math.random() * 61) + 20;
      const trend: Customer['trend'] = Math.random() > 0.6 ? 'down' : 'up';
      const arr = Math.round((Math.random() * 400 + 100) * 1000); // 100k - 500k
      customers.push({
        id: String(id++),
        name: `${baseName}${i ? '·子业务' + i : ''}`,
        logoColor: colors[id % colors.length],
        csm: csms[id % csms.length],
        valueScore,
        trend,
        lifecycle,
        valueTier,
        rAndM,
        f,
        serviceScore,
        arr,
      });
    }
  }
  return customers;
}

const stageAbbrev: Record<LifecycleStage, string> = {
  导入期: '导',
  成长期: '成',
  成熟期: '熟',
  衰退期: '衰',
};

// 数据源：默认为本地mock，如有可用接口则自动对接
// 预期接口：GET /api/customer-tiers -> { customers: Customer[] }
// 字段需包含：valueScore, f, serviceScore, valueTier, lifecycle, arr, csm, name
// 注意：若接口失败，会回落到mock数据
//
// 气泡图与桑基图的数据将自动基于 customers 聚合计算

// 初始化为mock数据
// 实时数据将通过useEffect尝试拉取并覆盖
let initialMock = generateMockCustomers();

const TieringMatrix: React.FC = () => {
  const [selected, setSelected] = useState<{ valueTier: ValueTier; stage: LifecycleStage } | null>(null);
  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState<Customer[]>(initialMock);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [listHighlight, setListHighlight] = useState(false);
  const highlightTimerRef = useRef<number | null>(null);

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
    if (selected) {
      list = list.filter((c) => c.valueTier === selected.valueTier && c.lifecycle === selected.stage);
    }
    if (search.trim()) {
      const k = search.trim();
      list = list.filter((c) => c.name.includes(k) || c.csm.includes(k) || c.valueTier.includes(k) || c.lifecycle.includes(k));
    }
    return list;
  }, [selected, search, customers]);

  const selectedTitle = selected ? `${selected.valueTier} · ${selected.stage}` : '全部客户';

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
    for (const c of customers) {
      const key = `${c.valueTier}-${c.lifecycle}`;
      const it = agg[key];
      it.count += 1;
      it.avgHealth += c.valueScore;
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
  }, [customers]);

  const maxSegmentArr = useMemo(() => {
    return Math.max(1, ...Object.values(segmentAgg).map((s) => s.totalArr));
  }, [segmentAgg]);

  // 气泡图工具提示
  const [bubbleTip, setBubbleTip] = useState<{ visible: boolean; x: number; y: number; html: React.ReactNode } | null>(null);
  // 桑基图工具提示
  const [sankeyTip, setSankeyTip] = useState<{ visible: boolean; x: number; y: number; text: string } | null>(null);

  // 尝试从接口获取数据
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/customer-tiers', { method: 'GET' });
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json?.customers)) {
            setCustomers(json.customers as Customer[]);
            return;
          }
        }
      } catch (e) {
        // ignore
      }
      setCustomers(initialMock);
    }
    fetchData();
  }, []);

  function scrollToListAndHighlight() {
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setListHighlight(true);
    if (highlightTimerRef.current) {
      window.clearTimeout(highlightTimerRef.current);
    }
    highlightTimerRef.current = window.setTimeout(() => setListHighlight(false), 1600);
  }

  useEffect(() => {
    return () => {
      if (highlightTimerRef.current) {
        window.clearTimeout(highlightTimerRef.current);
      }
    };
  }, []);

  const columns = [
    {
      title: '客户名称',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Customer, b: Customer) => a.name.localeCompare(b.name),
      render: (_: unknown, record: Customer) => (
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
      sorter: (a: Customer, b: Customer) => a.csm.localeCompare(b.csm),
    },
    {
      title: '价值总分',
      dataIndex: 'valueScore',
      key: 'valueScore',
      sorter: (a: Customer, b: Customer) => a.valueScore - b.valueScore,
      render: (v: number, record: Customer) => (
        <Space>
          <Text strong>{v}分</Text>
          {record.trend === 'up' ? (
            <ArrowUpOutlined style={{ color: '#52c41a' }} />
          ) : record.trend === 'down' ? (
            <ArrowDownOutlined style={{ color: '#ff4d4f' }} />
          ) : null}
        </Space>
      ),
    },
    {
      title: '生命周期',
      dataIndex: 'lifecycle',
      key: 'lifecycle',
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
      sorter: (a: Customer, b: Customer) => a.rAndM - b.rAndM,
    },
    {
      title: '活跃度价值 (F)',
      dataIndex: 'f',
      key: 'f',
      sorter: (a: Customer, b: Customer) => a.f - b.f,
    },
    {
      title: '服务互动价值',
      dataIndex: 'serviceScore',
      key: 'serviceScore',
      sorter: (a: Customer, b: Customer) => a.serviceScore - b.serviceScore,
    },
  ];

  const headerTitle = selected
    ? `客户列表 - ${selected.valueTier} & ${selected.stage} (${filteredCustomers.length})`
    : `客户列表 - 全部客户 (${filteredCustomers.length})`;

  // ---- Charts data helpers ----
  function hashStringToNumber(input: string): number {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = (hash << 5) - hash + input.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  const healthTrendPoints = useMemo(() => {
    const key = selected ? `${selected.valueTier}-${selected.stage}` : 'ALL';
    const base = selected ? 70 : 65;
    const variance = selected ? 12 : 10;
    const seed = hashStringToNumber(key);
    const length = 12; // 近12周
    const points: number[] = [];
    for (let i = 0; i < length; i++) {
      // 简单可重复的伪随机
      const n = Math.sin((seed % 1000) * (i + 1)) * 0.5 + Math.cos((seed % 777) * (i + 2)) * 0.5;
      const value = Math.max(40, Math.min(95, base + n * variance + (i - length / 2) * 0.4));
      points.push(Math.round(value));
    }
    return points;
  }, [selected]);

  type FlowKey = 'up_l2m' | 'up_m2h' | 'same_l' | 'same_m' | 'same_h' | 'down_h2m' | 'down_m2l';
  const flowColors: Record<FlowKey, string> = {
    up_l2m: '#5B8FF9',
    up_m2h: '#5AD8A6',
    same_l: '#B37FEB',
    same_m: '#FF9D4D',
    same_h: '#CDDDFD',
    down_h2m: '#F4664A',
    down_m2l: '#D3F261',
  };

  const tierMigration = useMemo(() => {
    // 基于选中人群，构造稳定的“上升/持平/下降”分布
    const key = selected ? `${selected.valueTier}-${selected.stage}` : 'ALL';
    const seed = hashStringToNumber(key);
    const size = filteredCustomers.length || 1;
    const ratioUp = 0.2 + ((seed % 30) / 100); // 20%-50%
    const ratioDown = 0.1 + ((seed % 15) / 100); // 10%-25%
    const up = Math.round(size * ratioUp);
    const down = Math.round(size * ratioDown);
    const same = Math.max(0, size - up - down);
    // 拆分路径
    const up_l2m = Math.round(up * 0.45);
    const up_m2h = Math.max(0, up - up_l2m);
    const down_h2m = Math.round(down * 0.6);
    const down_m2l = Math.max(0, down - down_h2m);
    const same_m = Math.round(same * 0.5);
    const same_l = Math.round((same - same_m) * 0.4);
    const same_h = Math.max(0, same - same_m - same_l);
    return { up_l2m, up_m2h, same_l, same_m, same_h, down_h2m, down_m2l };
  }, [filteredCustomers.length, selected]);

  return (
    <div style={{ padding: 24, background: '#f5f5f5', minHeight: 'calc(100vh - 64px)' }}>
      {/* 顶部区域 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <Title level={2} style={{ margin: 0, fontWeight: 600, color: '#262626' }}>客户分层矩阵 (2025年Q3)</Title>
          <Text type="secondary">将客户按“价值等级”与“生命周期”进行矩阵分层，以指导精细化服务策略。</Text>
        </div>
        <Button type="link" icon={<SettingOutlined />}>配置评分模型</Button>
      </div>
      {/* 矩阵在上 */}
      <Card style={{ ...cardStyle }} bodyStyle={{ padding: 16 }}>
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
              const isSelected = !!selected && selected.valueTier === tier && selected.stage === stage;
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
                    onClick={() => setSelected({ valueTier: tier, stage })}
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
                              setSelected({ valueTier: tier, stage });
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
      <Row gutter={16} style={{ marginTop: 16 }}>
        {/* 图表一：分层健康与体量气泡图 */}
        <Col xs={24} lg={12}>
          <Card style={{ ...cardStyle }} title={<span style={{ fontWeight: 600 }}>客户分层健康与价值矩阵</span>}>
            <div style={{ width: '100%', height: 260, position: 'relative' }}>
              {bubbleTip?.visible && (
                <div style={{ position: 'absolute', left: bubbleTip.x, top: bubbleTip.y, background: '#fff', border: '1px solid #f0f0f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', borderRadius: 6, padding: '8px 10px', fontSize: 12, pointerEvents: 'none', zIndex: 2 }}>
                  {bubbleTip.html}
                </div>
              )}
              <svg viewBox="0 0 420 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                {/* 坐标轴 */}
                <line x1="40" y1="10" x2="40" y2="170" stroke="#d9d9d9" />
                <line x1="40" y1="170" x2="400" y2="170" stroke="#d9d9d9" />
                {/* y轴刻度 0-100 */}
                {Array.from({ length: 6 }).map((_, i) => {
                  const v = i * 20;
                  const y = 170 - (v / 100) * 150;
                  return (
                    <g key={i}>
                      <line x1="36" y1={y} x2="40" y2={y} stroke="#d9d9d9" />
                      <text x="10" y={y + 4} fontSize="10" fill="#8c8c8c">{v}</text>
                    </g>
                  );
                })}
                {/* x轴刻度 0-100 */}
                {Array.from({ length: 6 }).map((_, i) => {
                  const v = i * 20;
                  const x = 40 + (v / 100) * 360;
                  return (
                    <g key={i}>
                      <line x1={x} y1="170" x2={x} y2="174" stroke="#d9d9d9" />
                      <text x={x} y="188" fontSize="10" fill="#8c8c8c" textAnchor="middle">{v}</text>
                    </g>
                  );
                })}
                {/* 气泡 */}
                {
                  Object.values(segmentAgg).map((s) => {
                    if (s.count === 0) return null;
                    const x = 40 + (s.avgHealth / 100) * 360;
                    const y = 170 - (s.avgActive / 100) * 150;
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
                        onClick={() => setSelected({ valueTier: s.valueTier, stage: s.stage })}
                        style={{ cursor: 'pointer' }}
                      />
                    );
                  })
                }
                {/* 图例：生命周期颜色 */}
                {(() => {
                  const entries: [LifecycleStage, string][] = [
                    ['导入期', lifecycleAccentColor['导入期']],
                    ['成长期', lifecycleAccentColor['成长期']],
                    ['成熟期', lifecycleAccentColor['成熟期']],
                    ['衰退期', lifecycleAccentColor['衰退期']],
                  ];
                  return (
                    <g>
                      {entries.map(([label, color], i) => (
                        <g key={label}>
                          <rect x={44 + i * 90} y={12} width={10} height={10} fill={color} rx={2} opacity={0.6} />
                          <text x={58 + i * 90} y={21} fontSize="10" fill="#8c8c8c">{label}</text>
                        </g>
                      ))}
                    </g>
                  );
                })()}
                {/* 图例：气泡大小（示意） */}
                <g>
                  <circle cx="60" cy="150" r="6" fill="#8c8c8c" fillOpacity="0.15" stroke="#bfbfbf" />
                  <circle cx="90" cy="150" r="10" fill="#8c8c8c" fillOpacity="0.15" stroke="#bfbfbf" />
                  <circle cx="130" cy="150" r="14" fill="#8c8c8c" fillOpacity="0.15" stroke="#bfbfbf" />
                  <text x="160" y="154" fontSize="10" fill="#8c8c8c">气泡大小表示总ARR</text>
                </g>
                {/* 轴标题 */}
                <text x="220" y="198" textAnchor="middle" fontSize="12" fill="#8c8c8c">客户健康分 (0-100)</text>
                <text x="12" y="14" textAnchor="start" fontSize="12" fill="#8c8c8c">客户活跃度 (0-100)</text>
                {/* 角标 */}
                <text x="400" y="16" textAnchor="end" fontSize="12" fill="#8c8c8c">{selected ? selectedTitle : '全部'}</text>
              </svg>
            </div>
          </Card>
        </Col>

        {/* 图表二：客户价值流动桑基图 */}
        <Col xs={24} lg={12}>
          <Card style={{ ...cardStyle }} title={<span style={{ fontWeight: 600 }}>客户价值层级流动 (Q2 vs Q3)</span>}>
            <div style={{ width: '100%', height: 260, position: 'relative' }}>
              {sankeyTip?.visible && (
                <div style={{ position: 'absolute', left: sankeyTip.x, top: sankeyTip.y, background: '#fff', border: '1px solid #f0f0f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', borderRadius: 6, padding: '8px 10px', fontSize: 12, pointerEvents: 'none', zIndex: 2 }}>
                  {sankeyTip.text}
                </div>
              )}
              <svg viewBox="0 0 420 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                {/* 左/右节点位置 */}
                {(() => {
                  const leftX = 70; const rightX = 350;
                  const tiers: ValueTier[] = ['高价值', '中价值', '低价值'];
                  const positions: Record<string, number> = {};
                  tiers.forEach((t, i) => {
                    positions[`L-${t}`] = 40 + i * 60;
                    positions[`R-${t}`] = 40 + i * 60;
                  });
                  // 使用之前的迁移数据构造流
                  const flows = [
                    { from: '低价值', to: '中价值', value: tierMigration.up_l2m, color: '#5B8FF9' },
                    { from: '中价值', to: '高价值', value: tierMigration.up_m2h, color: '#5AD8A6' },
                    { from: '低价值', to: '低价值', value: tierMigration.same_l, color: '#B37FEB' },
                    { from: '中价值', to: '中价值', value: tierMigration.same_m, color: '#FF9D4D' },
                    { from: '高价值', to: '高价值', value: tierMigration.same_h, color: '#CDDDFD' },
                    { from: '高价值', to: '中价值', value: tierMigration.down_h2m, color: '#F4664A' },
                    { from: '中价值', to: '低价值', value: tierMigration.down_m2l, color: '#D3F261' },
                  ];
                  const maxFlow = Math.max(1, ...flows.map(f => f.value));
                  const strokeScale = (v: number) => 2 + (v / maxFlow) * 14;
                  function pathD(y1: number, y2: number) {
                    const cx1 = 160; const cx2 = 260;
                    return `M ${leftX} ${y1} C ${cx1} ${y1}, ${cx2} ${y2}, ${rightX} ${y2}`;
                  }
                  return (
                    <g>
                      {/* 节点 */}
                      {tiers.map((t) => (
                        <g key={`node-left-${t}`}>
                          <rect x={leftX - 28} y={positions[`L-${t}`] - 10} width={56} height={20} rx={4} fill="#f5f5f5" stroke="#d9d9d9" />
                          <text x={leftX - 32} y={positions[`L-${t}`] + 4} fontSize="12" textAnchor="end" fill="#595959">上季度-{t}</text>
                        </g>
                      ))}
                      {tiers.map((t) => (
                        <g key={`node-right-${t}`}>
                          <rect x={rightX - 28} y={positions[`R-${t}`] - 10} width={56} height={20} rx={4} fill="#f5f5f5" stroke="#d9d9d9" />
                          <text x={rightX + 32} y={positions[`R-${t}`] + 4} fontSize="12" textAnchor="start" fill="#595959">本季度-{t}</text>
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
                <text x="400" y="16" textAnchor="end" fontSize="12" fill="#8c8c8c">{selected ? selectedTitle : '全部'}</text>
                {/* 图例：路径颜色说明 */}
                {(() => {
                  const items = [
                    ['低→中', '#5B8FF9'],
                    ['中→高', '#5AD8A6'],
                    ['低→低', '#B37FEB'],
                    ['中→中', '#FF9D4D'],
                    ['高→高', '#CDDDFD'],
                    ['高→中', '#F4664A'],
                    ['中→低', '#D3F261'],
                  ];
                  return (
                    <g>
                      {items.map(([label, color], i) => (
                        <g key={String(i)}>
                          <rect x={44 + (i % 4) * 88} y={12 + Math.floor(i / 4) * 18} width={10} height={10} fill={String(color)} rx={2} opacity={0.6} />
                          <text x={58 + (i % 4) * 88} y={21 + Math.floor(i / 4) * 18} fontSize="10" fill="#8c8c8c">{String(label)}</text>
                        </g>
                      ))}
                    </g>
                  );
                })()}
              </svg>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 客户列表：保留并联动筛选 */}
      <Card
        ref={listRef as any}
        style={{
          ...cardStyle,
          marginTop: 16,
          boxShadow: listHighlight
            ? '0 0 0 3px #1890ff33, 0 6px 20px rgba(0,0,0,0.08)'
            : (cardStyle.boxShadow as string),
          border: listHighlight ? '1px solid #91caff' : (cardStyle.border as string),
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        }}
        title={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <span style={{ fontSize: 16, fontWeight: 600 }}>{headerTitle}</span>
          <Input.Search
            allowClear
            placeholder="搜索客户/CSM/标签..."
            style={{ width: 320 }}
            onSearch={(v) => setSearch(v)}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      }
      >
        <Table
          rowKey="id"
          dataSource={filteredCustomers}
          columns={columns as any}
          pagination={{ pageSize: 10, showSizeChanger: false }}
        />
      </Card>
      

    </div>
  );
};

export default TieringMatrix;


