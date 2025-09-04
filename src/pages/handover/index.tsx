import React, { useState, useMemo } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Input, 
  Select, 
  Space, 
  Tag, 
  Typography, 
  Row, 
  Col, 
  Statistic, 
  Pagination,
  message,
  Tooltip,
  Rate
} from 'antd';
import { 
  SearchOutlined, 
  ReloadOutlined, 
  DownloadOutlined, 
  SettingOutlined,
  PlusOutlined,
  DownOutlined,
  QuestionCircleOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'umi';
import { mockCustomerHandovers } from '../../mock/handoverData';
import { CustomerHandover, HandoverStatus, RiskLevel, HandoverSearchParams } from '../../types/handover';
import type { InputRef } from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { useRef } from 'react';

const { Title, Text } = Typography;
const { Option } = Select;

// 统一的卡片样式 - 参考工作看板的现代风格
const cardStyle = {
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  border: '1px solid #f0f0f0',
  background: '#ffffff',
  marginBottom: '16px',
};

const HandoverListPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // 一页显示5个数据
  
  // 搜索筛选状态
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  
  const [searchParams, setSearchParams] = useState<HandoverSearchParams>({
    customerName: '',
    status: undefined,
    riskLevel: undefined
  });

  // 处理搜索
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: keyof CustomerHandover,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  // 处理重置
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  // 获取列搜索属性
  const getColumnSearchProps = (dataIndex: keyof CustomerHandover): ColumnType<CustomerHandover> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`搜索 ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            搜索
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            重置
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            筛选
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            关闭
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      const fieldValue = record[dataIndex];
      if (fieldValue === null || fieldValue === undefined) return false;
      return fieldValue
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase());
    },
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  // 处理新增交接
  const handleAddHandover = () => {
    navigate('/profiles/handover/new');
  };

  // 处理导出
  const handleExport = () => {
    message.success('导出功能开发中...');
  };

  // 处理查看详情（可指定默认标签页）
  const handleViewDetail = (record: CustomerHandover, tabKey?: string) => {
    const url = tabKey ? `/profiles/handover/${record.id}?tab=${tabKey}` : `/profiles/handover/${record.id}`;
    navigate(url);
  };

  // 根据当前路径决定显示什么内容
  const pathname = location.pathname;
  
  
  // 如果是创建页面
  if (pathname === '/profiles/handover/new') {
    return (
      <div style={{ 
        padding: '24px',
        background: '#fafafa',
        minHeight: 'calc(100vh - 120px)',
        paddingBottom: '60px' // 为footer留出底部间距
      }}>
        <div style={{ 
          maxWidth: '1000px', 
          margin: '0 auto'
        }}>
          {/* 页面标题和返回按钮 */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '24px',
            gap: '16px'
          }}>
            <Button 
              onClick={() => navigate('/profiles/handover-implementation')}
              style={{ border: 'none', padding: 0 }}
            >
              返回
            </Button>
            <Title level={3} style={{ margin: 0, color: '#262626', fontSize: '18px' }}>
              创建新客户交接
            </Title>
          </div>

          {/* 创建表单 */}
          <div style={{ 
            background: '#fff',
            borderRadius: '8px',
            padding: '24px'
          }}>
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <Title level={4} style={{ color: '#666' }}>
                创建客户交接表单
              </Title>
              <p style={{ color: '#999' }}>
                这里将显示创建客户交接的表单内容
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // 如果是详情页面或历史查询页面，不显示列表页内容
  if (pathname.match(/^\/profiles\/handover\/\d+$/) || pathname === '/profiles/handover/history') {
    return null;
  }

  // 过滤数据
  const filteredData = useMemo(() => {
    return mockCustomerHandovers.filter(item => {
      const text = (searchText || '').trim().toLowerCase();
      const matchText = !text || (item.customerName?.toLowerCase().includes(text) || item.handoverNumber?.toLowerCase().includes(text));
      const matchName = !searchParams.customerName || 
        item.customerName.includes(searchParams.customerName);
      const matchStatus = !searchParams.status || 
        item.handoverStatus === searchParams.status;
      const matchRisk = !searchParams.riskLevel || 
        item.riskLevel === searchParams.riskLevel;
      
      return matchText && matchName && matchStatus && matchRisk;
    });
  }, [searchParams, searchText]);

  // 分页数据
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage]);

  // 顶部数据看板统计
  const kpi = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const toDate = (s: string) => new Date(s.replace(/-/g, '/'));

    const pendingCount = mockCustomerHandovers.filter(item => item.handoverStatus === 'not_handover').length;
    const completedThisMonth = mockCustomerHandovers.filter(item => {
      if (item.expectationAlignment !== 'aligned') return false;
      const updated = toDate(item.updatedAt);
      return updated.getFullYear() === currentYear && updated.getMonth() === currentMonth;
    }).length;
    const riskyCount = mockCustomerHandovers.filter(item => item.hasRiskAlert).length;

    return { pendingCount, completedThisMonth, riskyCount };
  }, []);

  // 状态标签颜色映射
  const statusColorMap = {
    pending: 'orange',
    processing: 'blue',
    aligned: 'green',
    partially_aligned: 'gold'
  };

  // 状态文本映射
  const statusTextMap = {
    pending: '待处理',
    processing: '处理中',
    aligned: '已对齐',
    partially_aligned: '部分对齐'
  };

  // 风险等级颜色映射
  const riskColorMap = {
    high: 'red',
    medium: 'orange',
    low: 'green'
  };

  // 风险等级文本映射
  const riskTextMap = {
    high: '高风险',
    medium: '中风险',
    low: '低风险'
  };

  // 表格列定义
  const columns = [
    {
      title: '交接单编号',
      dataIndex: 'handoverNumber',
      key: 'handoverNumber',
      width: 120,
      render: (num: string, record: CustomerHandover) => (
        <span style={{ fontFamily: 'monospace' }}>{num}</span>
      ),
    },
    {
      title: '客户名称',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 220,
      sorter: (a: CustomerHandover, b: CustomerHandover) => a.customerName.localeCompare(b.customerName),
      render: (name: string, record: CustomerHandover) => (
        <a onClick={() => handleViewDetail(record, 'basic-info')}>{name}</a>
      ),
    },
    {
      title: '交接单',
      dataIndex: 'hasHandoverDocument',
      key: 'hasHandoverDocument',
      width: 80,
      sorter: (a: CustomerHandover, b: CustomerHandover) => Number(a.hasHandoverDocument) - Number(b.hasHandoverDocument),
      render: (hasDocument: boolean, record: CustomerHandover) => (
        hasDocument ? (
          <Tag color="blue" style={{ cursor: 'pointer' }} onClick={() => handleViewDetail(record, 'action-plan')}>有</Tag>
        ) : (
          <Tag>无</Tag>
        )
      ),
    },
    {
      title: '风险提示',
      dataIndex: 'hasRiskAlert',
      key: 'hasRiskAlert',
      width: 100,
      sorter: (a: CustomerHandover, b: CustomerHandover) => Number(a.hasRiskAlert) - Number(b.hasRiskAlert),
      render: (hasRisk: boolean, record: CustomerHandover) => {
        if (!hasRisk) return <Tag>无风险</Tag>;
        const level = record.riskLevel;
        const color = riskColorMap[level as keyof typeof riskColorMap] || 'orange';
        const text = riskTextMap[level as keyof typeof riskTextMap] || '有风险';
        return (
          <Tag color={color} style={{ cursor: 'pointer' }} onClick={() => handleViewDetail(record, 'risks-opportunities')}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: '干系人',
      dataIndex: 'stakeholderCount',
      key: 'stakeholderCount',
      width: 100,
      sorter: (a: CustomerHandover, b: CustomerHandover) => (a.stakeholderCount || 0) - (b.stakeholderCount || 0),
      render: (count: number, record: CustomerHandover) => (
        <Tag color="purple" style={{ cursor: 'pointer' }} onClick={() => handleViewDetail(record, 'stakeholders')}>
          {count} 人
        </Tag>
      ),
    },
    {
      title: '客户期望对齐',
      dataIndex: 'expectationAlignment',
      key: 'expectationAlignment',
      width: 120,
      sorter: (a: CustomerHandover, b: CustomerHandover) => a.expectationAlignment.localeCompare(b.expectationAlignment),
      render: (alignment: string, record: CustomerHandover) => {
        const colorMap = {
          aligned: 'green',
          partially_aligned: 'gold',
          not_aligned: 'red'
        };
        const textMap = {
          aligned: '已对齐',
          partially_aligned: '部分对齐',
          not_aligned: '未对齐'
        };
        return (
          <Tag color={colorMap[alignment as keyof typeof colorMap]} style={{ cursor: 'pointer' }} onClick={() => handleViewDetail(record, 'expectation-alignment')}>
            {textMap[alignment as keyof typeof textMap]}
          </Tag>
        );
      },
    },
    {
      title: '销售创建时间',
      dataIndex: 'salesCreatedAt',
      key: 'salesCreatedAt',
      width: 120,
      sorter: (a: CustomerHandover, b: CustomerHandover) => new Date(a.salesCreatedAt || '').getTime() - new Date(b.salesCreatedAt || '').getTime(),
      render: (date: string) => date ? new Date(date).toLocaleDateString() : '-',
    },
    {
      title: '客户满意度',
      dataIndex: 'handoverRating',
      key: 'handoverRating',
      width: 150,
      sorter: (a: CustomerHandover, b: CustomerHandover) => (a.handoverRating || 0) - (b.handoverRating || 0),
      render: (rating: number, record: CustomerHandover) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Rate 
            disabled 
            value={rating} 
            style={{ fontSize: '16px' }}
          />
          <span style={{ color: '#1890ff', fontWeight: '500' }}>
            {rating}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div style={{ 
      padding: '32px 40px',
      background: '#f5f5f5',
      minHeight: 'calc(100vh - 64px)'
    }}>
      {/* 页面标题 */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <div>
              <Title level={2} style={{ margin: 0, color: '#262626' }}>交接实施</Title>
              <Text type="secondary">确保从销售到服务的丝滑交接与价值对齐</Text>
            </div>
            
            {/* 右侧：快捷链接 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Tooltip title="历史交接查询">
                <Button
                  type="text"
                  shape="circle"
                  size="large"
                  icon={<HistoryOutlined />}
                  style={{
                    width: '44px',
                    height: '44px',
                    background: '#1890ff15',
                    border: '1px solid #1890ff30',
                    color: '#1890ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={() => navigate('/profiles/handover/history')}
                />
              </Tooltip>
            </div>
          </div>

        {/* 顶部数据看板 */}
        <div style={{ marginBottom: '24px' }}>
          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Card style={{ ...cardStyle, marginBottom: 0 }}>
                <Statistic 
                  title={
                    <span>
                      待处理交接
                      <Tooltip 
                        title={
                          <div style={{ maxWidth: '300px' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>待处理交接</div>
                            <div style={{ marginBottom: '6px' }}>含义：当前需要处理的客户交接任务数量</div>
                            <div style={{ marginBottom: '6px' }}>来源：CRM系统中的交接任务状态</div>
                            <div style={{ marginBottom: '6px' }}>计算方式：状态为"待处理"的交接记录总数</div>
                            <div style={{ color: '#ffa940' }}>提示：建议优先处理高优先级客户</div>
                          </div>
                        }
                        placement="top"
                        overlayStyle={{ 
                          maxWidth: '320px',
                          fontSize: '12px'
                        }}
                      >
                        <QuestionCircleOutlined 
                          style={{ 
                            marginLeft: '8px', 
                            color: '#8c8c8c',
                            fontSize: '14px',
                            cursor: 'pointer'
                          }} 
                        />
                      </Tooltip>
                    </span>
                  } 
                  value={kpi.pendingCount} 
                  valueStyle={{ fontWeight: 700 }} 
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card style={{ ...cardStyle, marginBottom: 0 }}>
                <Statistic 
                  title={
                    <span>
                      本月已完成
                      <Tooltip 
                        title={
                          <div style={{ maxWidth: '300px' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>本月已完成</div>
                            <div style={{ marginBottom: '6px' }}>含义：本月成功完成的客户交接数量</div>
                            <div style={{ marginBottom: '6px' }}>来源：交接完成时间在本月内的记录</div>
                            <div style={{ marginBottom: '6px' }}>计算方式：状态为"已完成"且完成时间在本月</div>
                            <div style={{ color: '#52c41a' }}>提示：反映团队本月工作效率</div>
                          </div>
                        }
                        placement="top"
                        overlayStyle={{ 
                          maxWidth: '320px',
                          fontSize: '12px'
                        }}
                      >
                        <QuestionCircleOutlined 
                          style={{ 
                            marginLeft: '8px', 
                            color: '#8c8c8c',
                            fontSize: '14px',
                            cursor: 'pointer'
                          }} 
                        />
                      </Tooltip>
                    </span>
                  } 
                  value={kpi.completedThisMonth} 
                  valueStyle={{ fontWeight: 700 }} 
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card style={{ ...cardStyle, marginBottom: 0 }}>
                <Statistic 
                  title={
                    <span>
                      存在风险交接
                      <Tooltip 
                        title={
                          <div style={{ maxWidth: '300px' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>存在风险交接</div>
                            <div style={{ marginBottom: '6px' }}>含义：需要特别关注的潜在风险交接</div>
                            <div style={{ marginBottom: '6px' }}>来源：风险评估系统自动识别</div>
                            <div style={{ marginBottom: '6px' }}>计算方式：风险等级为"中"或"高"的交接</div>
                            <div style={{ color: '#ff4d4f' }}>提示：建议优先处理，避免客户流失</div>
                          </div>
                        }
                        placement="top"
                        overlayStyle={{ 
                          maxWidth: '320px',
                          fontSize: '12px'
                        }}
                      >
                        <QuestionCircleOutlined 
                          style={{ 
                            marginLeft: '8px', 
                            color: '#8c8c8c',
                            fontSize: '14px',
                            cursor: 'pointer'
                          }} 
                        />
                      </Tooltip>
                    </span>
                  } 
                  value={kpi.riskyCount} 
                  valueStyle={{ fontWeight: 700 }} 
                />
              </Card>
            </Col>
          </Row>
        </div>

        {/* 列表区域 - 白色矩形 */}
        <div style={{ 
          ...cardStyle,
          padding: '24px'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <Input
              placeholder="搜索客户名称或交接单编号"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              allowClear
              style={{ width: 300, borderRadius: '6px' }}
            />

            <Space size="small">
              <Button 
                icon={<ReloadOutlined />} 
                onClick={() => {
                  // 重置所有搜索、筛选、排序状态
                  setSearchText('');
                  setSearchedColumn('');
                  setSearchParams({
                    customerName: '',
                    status: undefined,
                    riskLevel: undefined
                  });
                  setCurrentPage(1);
                  message.success('已重置所有筛选条件');
                }}
                title="重置所有筛选条件"
              />
              <Button icon={<DownloadOutlined />} />
              <Button icon={<SettingOutlined />} />
            </Space>
          </div>

          {/* 数据表格 */}
          <Table
            columns={columns}
            dataSource={paginatedData}
            rowKey="id"
            pagination={false}
            size="small"
            scroll={{ x: 900 }}
            style={{ background: '#fff' }}
          />

          {/* 分页 */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginTop: '16px' 
          }}>
            <div style={{ color: '#666', fontSize: '14px' }}>
              共 {filteredData.length} 条记录
            </div>
            <Pagination
              current={currentPage}
              total={filteredData.length}
              pageSize={pageSize}
              onChange={setCurrentPage}
              showSizeChanger={false}
              showQuickJumper
              showTotal={(total, range) => 
                `第 ${range[0]}-${range[1]} 条/共 ${total} 条`
              }
            />
          </div>
        </div>
    </div>
  );
};

export default HandoverListPage;
