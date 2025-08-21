import React, { useState, useMemo } from 'react';
import { 
  Button, 
  Row, 
  Col, 
  Typography, 
  Input, 
  Select, 
  Space, 
  Table, 
  Tag, 
  Pagination,
  message,
  Breadcrumb,
  Card,
  Statistic
} from 'antd';
import { 
  PlusOutlined, 
  SearchOutlined, 
  ReloadOutlined, 
  ExportOutlined,
  SettingOutlined,
  DownloadOutlined,
  DownOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'umi';
import { mockCustomerHandovers } from '../../mock/handoverData';
import { CustomerHandover, HandoverStatus, RiskLevel } from '../../types/handover';

const { Title } = Typography;
const { Option } = Select;

const HandoverListPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 搜索筛选状态
  const [searchParams, setSearchParams] = useState({
    customerName: '',
    status: undefined as HandoverStatus | undefined,
    riskLevel: undefined as RiskLevel | undefined
  });

  // 分页状态
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // 处理搜索
  const handleSearch = () => {
    setCurrentPage(1);
    message.success('搜索完成');
  };

  // 处理重置
  const handleReset = () => {
    setSearchParams({
      customerName: '',
      status: undefined,
      riskLevel: undefined
    });
    setCurrentPage(1);
    message.success('已重置筛选条件');
  };

  // 处理新增交接
  const handleAddHandover = () => {
    navigate('/profiles/handover/new');
  };

  // 处理导出
  const handleExport = () => {
    message.success('导出功能开发中...');
  };

  // 处理查看详情
  const handleViewDetail = (record: CustomerHandover) => {
    console.log('点击查看详情:', record);
    const url = `/profiles/handover/${record.id}`;
    console.log('跳转URL:', url);
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
        minHeight: 'calc(100vh - 120px)'
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
              onClick={() => navigate('/profiles/handover')}
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
  
  // 如果是详情页面，不显示列表页内容
  if (pathname.match(/^\/profiles\/handover\/\d+$/)) {
    return null;
  }

  // 过滤数据
  const filteredData = useMemo(() => {
    return mockCustomerHandovers.filter(item => {
      const matchName = !searchParams.customerName || 
        item.customerName.includes(searchParams.customerName);
      const matchStatus = !searchParams.status || 
        item.handoverStatus === searchParams.status;
      const matchRisk = !searchParams.riskLevel || 
        item.riskLevel === searchParams.riskLevel;
      
      return matchName && matchStatus && matchRisk;
    });
  }, [searchParams]);

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

    const pendingCount = mockCustomerHandovers.filter(item => item.handoverStatus === 'pending').length;
    const completedThisMonth = mockCustomerHandovers.filter(item => {
      if (item.handoverStatus !== 'aligned') return false;
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
      title: '客户名称',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 200,
    },
    {
      title: '交接单',
      dataIndex: 'hasHandoverDocument',
      key: 'hasHandoverDocument',
      width: 100,
      render: (hasDocument: boolean, record: CustomerHandover) => (
        hasDocument ? (
          <a onClick={() => handleViewDetail(record)} style={{ color: '#1890ff' }}>
            有
          </a>
        ) : (
          <span style={{ color: '#999' }}>无</span>
        )
      ),
    },
    {
      title: '风险提示',
      dataIndex: 'hasRiskAlert',
      key: 'hasRiskAlert',
      width: 100,
      render: (hasRisk: boolean) => (
        hasRisk ? (
          <Tag color="orange">有</Tag>
        ) : (
          <span style={{ color: '#999' }}>无</span>
        )
      ),
    },
    {
      title: '干系人信息',
      dataIndex: 'stakeholderCount',
      key: 'stakeholderCount',
      width: 120,
      render: (count: number) => `${count}人`,
    },
    {
      title: '客户期望对齐',
      dataIndex: 'expectationAlignment',
      key: 'expectationAlignment',
      width: 150,
      render: (alignment: string) => {
        const colorMap = {
          aligned: 'green',
          partially_aligned: 'orange',
          not_aligned: 'red'
        };
        const textMap = {
          aligned: '已对齐',
          partially_aligned: '部分对齐',
          not_aligned: '未对齐'
        };
        return (
          <Tag color={colorMap[alignment as keyof typeof colorMap]}>
            {textMap[alignment as keyof typeof textMap]}
          </Tag>
        );
      },
    },
    {
      title: '交接评价',
      dataIndex: 'handoverRating',
      key: 'handoverRating',
      width: 150,
      render: (rating: number, record: CustomerHandover) => (
        <span>{rating}分 - {record.handoverComment}</span>
      ),
    },
  ];

  return (
    <div style={{ 
      padding: '24px',
      background: '#f5f5f5',
      minHeight: 'calc(100vh - 120px)'
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto'
      }}>

        {/* 顶部数据看板 */}
        <div style={{ marginBottom: '24px' }}>
          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Card style={{ borderRadius: '8px' }}>
                <Statistic title="待处理交接" value={kpi.pendingCount} valueStyle={{ fontWeight: 700 }} />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card style={{ borderRadius: '8px' }}>
                <Statistic title="本月已完成" value={kpi.completedThisMonth} valueStyle={{ fontWeight: 700 }} />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card style={{ borderRadius: '8px' }}>
                <Statistic title="存在风险交接" value={kpi.riskyCount} valueStyle={{ fontWeight: 700 }} />
              </Card>
            </Col>
          </Row>
        </div>


        {/* 筛选区域 - 白色矩形 */}
        <div style={{ 
          background: '#fff',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
        }}>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center'
          }}>
            <Space size="middle" wrap>
              <Input 
                allowClear 
                placeholder="客户名称: 请输入" 
                value={searchParams.customerName}
                onChange={(e) => setSearchParams(prev => ({ ...prev, customerName: e.target.value }))}
                style={{ width: 220 }}
                size="middle"
              />
              <Select
                allowClear
                placeholder="交接状态: 请选择"
                value={searchParams.status}
                onChange={(value) => setSearchParams(prev => ({ ...prev, status: value }))}
                style={{ width: 180 }}
                size="middle"
              >
                <Option value="pending">待处理</Option>
                <Option value="processing">处理中</Option>
                <Option value="aligned">已对齐</Option>
                <Option value="partially_aligned">部分对齐</Option>
              </Select>
              <Select
                allowClear
                placeholder="风险等级: 请选择"
                value={searchParams.riskLevel}
                onChange={(value) => setSearchParams(prev => ({ ...prev, riskLevel: value }))}
                style={{ width: 180 }}
                size="middle"
              >
                <Option value="high">高风险</Option>
                <Option value="medium">中风险</Option>
                <Option value="low">低风险</Option>
              </Select>
            </Space>

            <Space size="small">
              <Button onClick={handleReset}>
                重置
              </Button>
              <Button 
                type="primary" 
                icon={<SearchOutlined />}
                onClick={handleSearch}
              >
                查询
              </Button>
              <span 
                style={{ 
                  color: '#1890ff', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                展开
                <DownOutlined style={{ fontSize: '12px' }} />
              </span>
            </Space>
          </div>
        </div>

        {/* 列表区域 - 白色矩形 */}
        <div style={{ 
          background: '#fff',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            alignItems: 'center',
            marginBottom: '16px'
          }}>

            <Space size="small">
              <Button 
                type="primary" 
                onClick={handleAddHandover}
                style={{ borderRadius: '6px', fontWeight: '500' }}
              >
                + 新建
              </Button>
              <Button icon={<ReloadOutlined />} />
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
            scroll={{ x: 1000 }}
            style={{ background: '#fff' }}
          />

          {/* 分页 */}
          <div style={{ textAlign: 'right', marginTop: '16px' }}>
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
    </div>
  );
};

export default HandoverListPage;
