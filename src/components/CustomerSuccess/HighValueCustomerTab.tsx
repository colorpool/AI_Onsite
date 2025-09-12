import React, { useMemo, useState, useRef } from 'react';
import { Row, Col, Card, Typography, Tooltip, Space, Button, Badge, Dropdown, Table, Avatar, Tag, Input, Slider, Checkbox, Collapse, Progress } from 'antd';
import { SettingOutlined, QuestionCircleOutlined, ArrowUpOutlined, ArrowDownOutlined, UserOutlined, FileTextOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { Panel } = Collapse;

type RiskStatus = '安全' | '关注' | '风险';
type ActionStatus = '进行中' | '已完成' | '逾期';

type HighValueCustomer = {
  id: string;
  name: string;
  logoColor: string;
  csm: string;
  rScore: number; // R分 (0-100)
  fScore: number; // F分 (0-100) 
  mScore: number; // M分 (0-100)
  contractAmount: number; // 合同总金额
  visits90Days: number; // 过去90天拜访次数
  lastVisitDate: string;
  lastVisitType: string;
  lastVisitor: string;
  valueAdded90Days: number; // 过去90天增值金额
  insights90Days: number; // 客户洞察数量
  insightsSummary: string; // 洞察摘要
  ecoTags: string[]; // 生态标签
  riskStatus: RiskStatus;
  healthScore: number; // 健康度评分
  nextAction: string; // 下一步动作
  actionDueDate: string; // 动作到期日
  actionStatus: ActionStatus;
  isKeyAccount: boolean; // 是否关键账户
  isChannelCustomer: boolean; // 是否渠道客户
  isInRenewalWindow: boolean; // 是否在续约窗口
  milestones: { date: string; event: string; status: 'completed' | 'pending' }[];
  activityTrend: number[]; // 活跃度趋势 (12个月)
  stakeholders: { name: string; role: string; influence: 'high' | 'medium' | 'low' }[];
};

export interface HighValueCustomerTabProps {
  customers: HighValueCustomer[];
  onCustomerSelect?: (customer: HighValueCustomer) => void;
}

const HighValueCustomerTab: React.FC<HighValueCustomerTabProps> = ({ customers, onCustomerSelect }) => {
  const [rRange, setRRange] = useState<[number, number]>([0, 100]);
  const [fRange, setFRange] = useState<[number, number]>([0, 100]);
  const [mRange, setMRange] = useState<[number, number]>([0, 100]);
  const [onlyKeyAccount, setOnlyKeyAccount] = useState(false);
  const [onlyChannelCustomer, setOnlyChannelCustomer] = useState(false);
  const [onlyInRenewalWindow, setOnlyInRenewalWindow] = useState(false);
  const [selectedEcoTags, setSelectedEcoTags] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const [columnSettings, setColumnSettings] = useState({
    rScore: true,
    fScore: true,
    mScore: true,
    contractAmount: true,
    visits90Days: true,
    valueAdded90Days: true,
    insights90Days: true,
    ecoTags: true,
    riskStatus: true,
    nextAction: true,
  });

  const cardStyle: React.CSSProperties = {
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    border: '1px solid #f0f0f0',
    background: '#ffffff',
  };

  const riskStatusColors: Record<RiskStatus, string> = {
    安全: '#52c41a',
    关注: '#fa8c16',
    风险: '#ff4d4f',
  };

  const actionStatusColors: Record<ActionStatus, string> = {
    进行中: '#1890ff',
    已完成: '#52c41a',
    逾期: '#ff4d4f',
  };

  // 获取所有生态标签
  const allEcoTags = useMemo(() => {
    const tags = new Set<string>();
    customers.forEach(c => c.ecoTags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [customers]);

  // 筛选后的客户列表
  const filteredCustomers = useMemo(() => {
    let list = customers;
    
    // RFM筛选
    list = list.filter(c => 
      c.rScore >= rRange[0] && c.rScore <= rRange[1] &&
      c.fScore >= fRange[0] && c.fScore <= fRange[1] &&
      c.mScore >= mRange[0] && c.mScore <= mRange[1]
    );
    
    // 特殊筛选
    if (onlyKeyAccount) {
      list = list.filter(c => c.isKeyAccount);
    }
    if (onlyChannelCustomer) {
      list = list.filter(c => c.isChannelCustomer);
    }
    if (onlyInRenewalWindow) {
      list = list.filter(c => c.isInRenewalWindow);
    }
    
    // 生态标签筛选
    if (selectedEcoTags.length > 0) {
      list = list.filter(c => selectedEcoTags.some(tag => c.ecoTags.includes(tag)));
    }
    
    // 搜索筛选
    if (search.trim()) {
      const k = search.trim().toLowerCase();
      list = list.filter(c => 
        c.name.toLowerCase().includes(k) || 
        c.csm.toLowerCase().includes(k) ||
        c.ecoTags.some(tag => tag.toLowerCase().includes(k))
      );
    }
    
    return list;
  }, [customers, rRange, fRange, mRange, onlyKeyAccount, onlyChannelCustomer, onlyInRenewalWindow, selectedEcoTags, search]);

  // 快速筛选方案
  const applyQuickFilter = (type: 'top10' | 'top25' | 'bottom') => {
    const sortedByTotal = [...customers].sort((a, b) => (b.rScore + b.fScore + b.mScore) - (a.rScore + a.fScore + a.mScore));
    
    if (type === 'top10') {
      const threshold = Math.ceil(customers.length * 0.1);
      const minScore = sortedByTotal[threshold - 1];
      const totalScore = minScore.rScore + minScore.fScore + minScore.mScore;
      const avgScore = Math.floor(totalScore / 3);
      setRRange([avgScore, 100]);
      setFRange([avgScore, 100]);
      setMRange([avgScore, 100]);
    } else if (type === 'top25') {
      const threshold = Math.ceil(customers.length * 0.25);
      const minScore = sortedByTotal[threshold - 1];
      const totalScore = minScore.rScore + minScore.fScore + minScore.mScore;
      const avgScore = Math.floor(totalScore / 3);
      setRRange([avgScore, 100]);
      setFRange([avgScore, 100]);
      setMRange([avgScore, 100]);
    } else {
      setRRange([0, 40]);
      setFRange([0, 40]);
      setMRange([0, 40]);
    }
  };

  // 展开行内容
  const expandedRowRender = (record: HighValueCustomer) => {
    return (
      <div style={{ padding: '16px 0' }}>
        <Row gutter={24}>
          <Col span={8}>
            <Card size="small" title="里程碑进展" style={{ height: 200 }}>
              <div style={{ maxHeight: 140, overflowY: 'auto' }}>
                {record.milestones.map((milestone, idx) => (
                  <div key={idx} style={{ marginBottom: 8, display: 'flex', alignItems: 'center' }}>
                    <Badge 
                      status={milestone.status === 'completed' ? 'success' : 'processing'} 
                      style={{ marginRight: 8 }}
                    />
                    <div>
                      <Text style={{ fontSize: 12 }}>{milestone.date}</Text>
                      <div style={{ fontSize: 11, color: '#8c8c8c' }}>{milestone.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small" title="活跃度趋势" style={{ height: 200 }}>
              <div style={{ display: 'flex', alignItems: 'end', height: 120, gap: 4 }}>
                {record.activityTrend.map((value, idx) => (
                  <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div 
                      style={{ 
                        width: '100%', 
                        height: `${(value / 100) * 80}px`, 
                        backgroundColor: '#1890ff', 
                        borderRadius: 2,
                        minHeight: 2
                      }}
                    />
                    <Text style={{ fontSize: 10, marginTop: 4 }}>{idx + 1}月</Text>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small" title="关键干系人" style={{ height: 200 }}>
              <div style={{ maxHeight: 140, overflowY: 'auto' }}>
                {record.stakeholders.map((stakeholder, idx) => (
                  <div key={idx} style={{ marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <Text style={{ fontSize: 12, fontWeight: 500 }}>{stakeholder.name}</Text>
                      <div style={{ fontSize: 11, color: '#8c8c8c' }}>{stakeholder.role}</div>
                    </div>
                    <Tag 
                      color={stakeholder.influence === 'high' ? 'red' : stakeholder.influence === 'medium' ? 'orange' : 'default'}
                    >
                      {stakeholder.influence === 'high' ? '高影响' : stakeholder.influence === 'medium' ? '中影响' : '低影响'}
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

  const columns: ColumnsType<HighValueCustomer> = [
    {
      title: '客户名称',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 200,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, record) => (
        <div>
          <div>{record.name}</div>
          <div style={{ fontSize: 11, color: '#8c8c8c' }}>
            {record.isKeyAccount && <Tag color="gold">KA</Tag>}
            {record.isChannelCustomer && <Tag color="blue">渠道</Tag>}
            {record.isInRenewalWindow && <Tag color="orange">续约期</Tag>}
          </div>
        </div>
      ),
    },
  ];

  // 动态添加可配置的列
  if (columnSettings.rScore) {
    columns.push({
      title: (
        <Tooltip title="财务价值分：基于合同金额、付费历史、增购潜力等计算">
          <span>R分 <QuestionCircleOutlined /></span>
        </Tooltip>
      ),
      dataIndex: 'rScore',
      key: 'rScore',
      width: 80,
      sorter: (a, b) => a.rScore - b.rScore,
      render: (score: number) => (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 600, color: score >= 80 ? '#52c41a' : score >= 60 ? '#fa8c16' : '#ff4d4f' }}>
            {score}
          </div>
          <Progress 
            percent={score} 
            size="small" 
            showInfo={false} 
            strokeColor={score >= 80 ? '#52c41a' : score >= 60 ? '#fa8c16' : '#ff4d4f'}
          />
        </div>
      ),
    });
  }

  if (columnSettings.fScore) {
    columns.push({
      title: (
        <Tooltip title="活跃度分：基于登录频次、功能使用深度、互动频率等计算">
          <span>F分 <QuestionCircleOutlined /></span>
        </Tooltip>
      ),
      dataIndex: 'fScore',
      key: 'fScore',
      width: 80,
      sorter: (a, b) => a.fScore - b.fScore,
      render: (score: number) => (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 600, color: score >= 80 ? '#52c41a' : score >= 60 ? '#fa8c16' : '#ff4d4f' }}>
            {score}
          </div>
          <Progress 
            percent={score} 
            size="small" 
            showInfo={false} 
            strokeColor={score >= 80 ? '#52c41a' : score >= 60 ? '#fa8c16' : '#ff4d4f'}
          />
        </div>
      ),
    });
  }

  if (columnSettings.mScore) {
    columns.push({
      title: (
        <Tooltip title="货币价值分：基于客单价、付费意愿、价格敏感度等计算">
          <span>M分 <QuestionCircleOutlined /></span>
        </Tooltip>
      ),
      dataIndex: 'mScore',
      key: 'mScore',
      width: 80,
      sorter: (a, b) => a.mScore - b.mScore,
      render: (score: number) => (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 600, color: score >= 80 ? '#52c41a' : score >= 60 ? '#fa8c16' : '#ff4d4f' }}>
            {score}
          </div>
          <Progress 
            percent={score} 
            size="small" 
            showInfo={false} 
            strokeColor={score >= 80 ? '#52c41a' : score >= 60 ? '#fa8c16' : '#ff4d4f'}
          />
        </div>
      ),
    });
  }

  if (columnSettings.contractAmount) {
    columns.push({
      title: '合同总金额',
      dataIndex: 'contractAmount',
      key: 'contractAmount',
      width: 120,
      sorter: (a, b) => a.contractAmount - b.contractAmount,
      render: (amount: number) => `¥${(amount / 10000).toFixed(1)}万`,
    });
  }

  if (columnSettings.visits90Days) {
    columns.push({
      title: '过去90天拜访',
      dataIndex: 'visits90Days',
      key: 'visits90Days',
      width: 120,
      sorter: (a, b) => a.visits90Days - b.visits90Days,
      render: (_, record) => (
        <Tooltip title={`最近拜访：${record.lastVisitor} | ${record.lastVisitDate} | ${record.lastVisitType}`}>
          <Space>
            <UserOutlined />
            <span>{record.visits90Days}</span>
          </Space>
        </Tooltip>
      ),
    });
  }

  if (columnSettings.valueAdded90Days) {
    columns.push({
      title: '过去90天增值',
      dataIndex: 'valueAdded90Days',
      key: 'valueAdded90Days',
      width: 120,
      sorter: (a, b) => a.valueAdded90Days - b.valueAdded90Days,
      render: (amount: number) => (
        <Text style={{ color: amount > 0 ? '#52c41a' : '#8c8c8c' }}>
          {amount > 0 ? `¥${(amount / 10000).toFixed(1)}万` : '-'}
        </Text>
      ),
    });
  }

  if (columnSettings.insights90Days) {
    columns.push({
      title: '客户洞察',
      dataIndex: 'insights90Days',
      key: 'insights90Days',
      width: 100,
      sorter: (a, b) => a.insights90Days - b.insights90Days,
      render: (_, record) => (
        <Space>
          <FileTextOutlined />
          <span 
            style={{ cursor: 'pointer', color: '#1890ff' }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {record.insights90Days}
          </span>
        </Space>
      ),
    });
  }

  if (columnSettings.ecoTags) {
    columns.push({
      title: '生态标签',
      dataIndex: 'ecoTags',
      key: 'ecoTags',
      width: 150,
      render: (tags: string[]) => (
        <Space wrap>
          {tags.slice(0, 2).map(tag => (
            <Tag key={tag} style={{ cursor: 'pointer' }} onClick={() => {
              if (!selectedEcoTags.includes(tag)) {
                setSelectedEcoTags([...selectedEcoTags, tag]);
              }
            }}>
              {tag}
            </Tag>
          ))}
          {tags.length > 2 && <Text type="secondary">+{tags.length - 2}</Text>}
        </Space>
      ),
    });
  }

  if (columnSettings.riskStatus) {
    columns.push({
      title: '风险状态',
      dataIndex: 'riskStatus',
      key: 'riskStatus',
      width: 100,
      filters: Object.keys(riskStatusColors).map(status => ({ text: status, value: status })),
      onFilter: (value, record) => record.riskStatus === value,
      render: (status: RiskStatus) => (
        <Tag color={riskStatusColors[status]}>{status}</Tag>
      ),
    });
  }

  if (columnSettings.nextAction) {
    columns.push({
      title: '下一步动作/到期日',
      dataIndex: 'nextAction',
      key: 'nextAction',
      width: 180,
      render: (_, record) => {
        const isOverdue = new Date(record.actionDueDate) < new Date();
        return (
          <div>
            <div style={{ fontSize: 12, marginBottom: 4 }}>{record.nextAction}</div>
            <Tag 
              color={record.actionStatus === '已完成' ? 'success' : isOverdue ? 'error' : 'processing'}
              style={{ fontSize: 11 }}
            >
              {record.actionDueDate} | {record.actionStatus}
            </Tag>
          </div>
        );
      },
    });
  }



  return (
    <div>
      {/* R/F/M 筛选器 */}
      <Card style={{ ...cardStyle, marginTop: 16, marginBottom: 16 }} bodyStyle={{ padding: 16 }}>
        <Row gutter={24}>
          <Col span={18}>
            <Row gutter={16}>
              <Col span={8}>
                <div style={{ marginBottom: 8 }}>
                  <Text strong>R分 (财务价值)</Text>
                  <Text type="secondary" style={{ marginLeft: 8 }}>当前: {rRange[0]} - {rRange[1]}</Text>
                </div>
                <Slider
                  range
                  min={0}
                  max={100}
                  value={rRange}
                  onChange={(value) => setRRange(value as [number, number])}
                  tooltip={{ formatter: (v) => `${v}分` }}
                />
              </Col>
              <Col span={8}>
                <div style={{ marginBottom: 8 }}>
                  <Text strong>F分 (活跃度)</Text>
                  <Text type="secondary" style={{ marginLeft: 8 }}>当前: {fRange[0]} - {fRange[1]}</Text>
                </div>
                <Slider
                  range
                  min={0}
                  max={100}
                  value={fRange}
                  onChange={(value) => setFRange(value as [number, number])}
                  tooltip={{ formatter: (v) => `${v}分` }}
                />
              </Col>
              <Col span={8}>
                <div style={{ marginBottom: 8 }}>
                  <Text strong>M分 (货币价值)</Text>
                  <Text type="secondary" style={{ marginLeft: 8 }}>当前: {mRange[0]} - {mRange[1]}</Text>
                </div>
                <Slider
                  range
                  min={0}
                  max={100}
                  value={mRange}
                  onChange={(value) => setMRange(value as [number, number])}
                  tooltip={{ formatter: (v) => `${v}分` }}
                />
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <div style={{ marginBottom: 8 }}>
              <Text strong>一键方案</Text>
            </div>
            <Space wrap>
              <Button size="small" onClick={() => applyQuickFilter('top10')}>Top 10%</Button>
              <Button size="small" onClick={() => applyQuickFilter('top25')}>Top 25%</Button>
              <Button size="small" onClick={() => applyQuickFilter('bottom')}>底盘筛选</Button>
            </Space>
            <div style={{ marginTop: 12 }}>
              <Checkbox checked={onlyKeyAccount} onChange={(e) => setOnlyKeyAccount(e.target.checked)}>
                仅看关键账户(KA)
              </Checkbox>
              <br />
              <Checkbox checked={onlyChannelCustomer} onChange={(e) => setOnlyChannelCustomer(e.target.checked)}>
                仅看渠道客户
              </Checkbox>
              <br />
              <Checkbox checked={onlyInRenewalWindow} onChange={(e) => setOnlyInRenewalWindow(e.target.checked)}>
                仅看续约窗口
              </Checkbox>
            </div>
          </Col>
        </Row>
      </Card>

      {/* 生态标签筛选 */}
      {allEcoTags.length > 0 && (
        <Card style={{ ...cardStyle, marginBottom: 16 }} bodyStyle={{ padding: 16 }}>
          <div style={{ marginBottom: 12 }}>
            <Text strong>生态标签筛选</Text>
            {selectedEcoTags.length > 0 && (
              <Button size="small" style={{ marginLeft: 12 }} onClick={() => setSelectedEcoTags([])}>
                清除选择
              </Button>
            )}
          </div>
          <Space wrap>
            {allEcoTags.map(tag => (
              <Tag
                key={tag}
                style={{ cursor: 'pointer', marginBottom: 8 }}
                color={selectedEcoTags.includes(tag) ? 'blue' : undefined}
                onClick={() => {
                  if (selectedEcoTags.includes(tag)) {
                    setSelectedEcoTags(selectedEcoTags.filter(t => t !== tag));
                  } else {
                    setSelectedEcoTags([...selectedEcoTags, tag]);
                  }
                }}
              >
                {tag}
              </Tag>
            ))}
          </Space>
        </Card>
      )}

      {/* 高价值客户表格 */}
      <Card
        style={{ ...cardStyle }}
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <span style={{ fontSize: 16, fontWeight: 600 }}>高价值客户洞察 ({filteredCustomers.length})</span>
            <Space>
              <Dropdown
                menu={{
                  items: Object.entries(columnSettings).map(([key, visible]) => ({
                    key,
                    label: (
                      <Checkbox 
                        checked={visible} 
                        onChange={(e) => setColumnSettings(prev => ({ ...prev, [key]: e.target.checked }))}
                      >
                        {key === 'rScore' ? 'R分' : 
                         key === 'fScore' ? 'F分' : 
                         key === 'mScore' ? 'M分' : 
                         key === 'contractAmount' ? '合同金额' :
                         key === 'visits90Days' ? '拜访记录' :
                         key === 'valueAdded90Days' ? '增值金额' :
                         key === 'insights90Days' ? '客户洞察' :
                         key === 'ecoTags' ? '生态标签' :
                         key === 'riskStatus' ? '风险状态' :
                         key === 'nextAction' ? '下一步动作' : key}
                      </Checkbox>
                    ),
                  })),
                }}
                trigger={['click']}
              >
                <Button icon={<SettingOutlined />}>列设置</Button>
              </Dropdown>
              <Input.Search
                allowClear
                placeholder="搜索客户/CSM/标签..."
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
          columns={columns}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `共 ${total} 条记录，当前显示 ${range[0]}-${range[1]} 条`,
            pageSizeOptions: ['10', '20', '50', '100'],
            showLessItems: true,
          }}
          scroll={{ x: 1400 }}
          expandable={{
            expandedRowKeys: expandedRows,
            onExpandedRowsChange: (keys) => setExpandedRows(keys as string[]),
            expandedRowRender,
            rowExpandable: () => true,
          }}
          onRow={(record) => ({
            onClick: () => onCustomerSelect?.(record),
            style: { cursor: 'pointer' },
            onContextMenu: (e) => {
              e.preventDefault();
              // 右键菜单逻辑
            },
          })}
        />
      </Card>


    </div>
  );
};

export default HighValueCustomerTab;