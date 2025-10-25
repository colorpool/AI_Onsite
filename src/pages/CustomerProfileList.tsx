import React, { useState, useMemo } from 'react';
import { Table, Button, Select, Input, Tag, Typography, Space, Tooltip, Card, Row, Col, Statistic, Pagination, Tabs } from 'antd';
import { 
  PlusOutlined, 
  ExportOutlined, 
  ArrowUpOutlined, 
  ArrowDownOutlined, 
  MinusOutlined, 
  QuestionCircleOutlined,
  SearchOutlined,
  ReloadOutlined,
  TeamOutlined,
  HeartOutlined,
  ExclamationCircleOutlined,
  DollarOutlined,
  StarFilled,
  StarOutlined,
  UserOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { history } from 'umi';
import { CustomerProfile, CustomerProfileFilters, LIFECYCLE_STAGE_CONFIG, HEALTH_LEVEL_CONFIG, CUSTOMER_TIER_CONFIG } from '../types/customerProfile';
import { mockCustomerProfiles, getFilteredCustomerProfiles } from '../mock/customerProfileData';

const { Option } = Select;
const { Search } = Input;
const { Title, Text } = Typography;

const CustomerProfileList: React.FC = () => {
  const [filters, setFilters] = useState<CustomerProfileFilters>({
    lifecycleStage: 'all',
    healthLevel: 'all',
    customerTier: 'all',
    searchKeyword: '',
    showFavoriteOnly: false
  });

  // 分页状态
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 健康趋势图标渲染函数
  const getHealthTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUpOutlined style={{ color: '#52c41a' }} />;
      case 'down':
        return <ArrowDownOutlined style={{ color: '#ff4d4f' }} />;
      case 'stable':
        return <MinusOutlined style={{ color: '#faad14' }} />;
      default:
        return null;
    }
  };

  // 统一卡片样式，与交接实施页面保持一致
  const cardStyle = {
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    border: '1px solid #f0f0f0',
    background: '#ffffff',
    marginBottom: '16px',
  };

  // 筛选后的数据
  const filteredData = useMemo(() => {
    return getFilteredCustomerProfiles({
      lifecycleStage: filters.lifecycleStage === 'all' ? undefined : filters.lifecycleStage,
      healthLevel: filters.healthLevel === 'all' ? undefined : filters.healthLevel,
      customerTier: filters.customerTier === 'all' ? undefined : filters.customerTier,
      searchKeyword: filters.searchKeyword,
      showFavoriteOnly: filters.showFavoriteOnly
    });
  }, [filters]);

  // 分页数据
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, pageSize]);

  // 计算KPI数据
  const kpiData = useMemo(() => {
    const totalProfiles = filteredData.length;
    
    // 计算本月新增客户数（模拟数据，实际应该根据创建时间计算）
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyNewCustomers = filteredData.filter(p => {
      // 模拟：假设ID较大的客户是新增的
      return parseInt(p.id.split('-')[1]) > 2020; // 简单模拟本月新增
    }).length;
    
    // 计算本月流失客户数（模拟数据，实际应该根据流失状态和时间计算）
    const monthlyLostCustomers = filteredData.filter(p => {
      // 模拟：假设健康度为风险且某些条件的客户为流失客户
      return p.healthLevel === 'risk' && p.healthScore < 30;
    }).length;
    
    return {
      totalProfiles,
      monthlyNewCustomers,
      monthlyLostCustomers
    };
  }, [filteredData]);

  // 处理筛选器变化
  const handleFilterChange = (key: keyof CustomerProfileFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1); // 重置到第一页
  };

  // 渲染健康分趋势图标
  const renderHealthTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUpOutlined style={{ color: '#52c41a', fontSize: '12px' }} />;
      case 'down':
        return <ArrowDownOutlined style={{ color: '#ff4d4f', fontSize: '12px' }} />;
      default:
        return <MinusOutlined style={{ color: '#d9d9d9', fontSize: '12px' }} />;
    }
  };

  // 格式化金额
  const formatAmount = (amount: number) => {
    return `¥${(amount / 10000).toFixed(1)}万`;
  };

  // 表格列定义
  const columns: ColumnsType<CustomerProfile> = [
    {
      title: '关注',
      dataIndex: 'isFavorite',
      key: 'isFavorite',
      width: 70,
      align: 'center',
      fixed: 'left',
      render: (isFavorite: boolean) => (
        isFavorite ? (
          <StarFilled style={{ color: '#faad14', fontSize: 16 }} />
        ) : (
          <StarOutlined style={{ color: '#d9d9d9', fontSize: 16 }} />
        )
      )
    },
    {
      title: '客户ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      fixed: 'left',
      render: (text: string) => (
        <span>
          {text}
        </span>
      )
    },
    {
      title: '客户名称',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 150,
      fixed: 'left',
      render: (text: string, record: CustomerProfile) => {
        // 根据生命周期阶段确定跳转路径
        const getDetailPath = (lifecycleStage: string, customerId: string) => {
          // 将完整的客户ID（CUST-0001）转换为简化的ID（0001）
          const shortId = customerId.replace('CUST-', '');
          
          switch (lifecycleStage) {
            case 'handover_implementation':
              return `/profiles/handover/${shortId}`;
            case 'continuous_service':
              return `/profiles/service/${shortId}`;
            case 'renewal_management':
              return `/profiles/renewal/${shortId}`;
            case 'recall_incubation':
              // 召回孵化暂时跳转到通用页面，可根据实际需求调整
              return `/profiles/recall`;
            default:
              return `/profiles/service/${shortId}`;
          }
        };

        return (
          <a 
            onClick={() => history.push(getDetailPath(record.lifecycleStage, record.id))}
          >
            {text}
          </a>
        );
      }
    },
    {
      title: '生命周期阶段',
      dataIndex: 'lifecycleStage',
      key: 'lifecycleStage',
      width: 120,
      render: (stage: string) => {
        const config = LIFECYCLE_STAGE_CONFIG[stage as keyof typeof LIFECYCLE_STAGE_CONFIG];
        return <Tag color={config?.color}>{config?.text}</Tag>;
      }
    },
    {
      title: '合同金额',
      dataIndex: 'contractAmount',
      key: 'contractAmount',
      width: 120,
      align: 'left' as const,
      sorter: (a: CustomerProfile, b: CustomerProfile) => a.contractAmount - b.contractAmount,
      sortDirections: ['descend', 'ascend'],
      render: (amount: number) => formatAmount(amount)
    },
    {
      title: '服务到期日',
      dataIndex: 'serviceExpiryDate',
      key: 'serviceExpiryDate',
      width: 120,
      sorter: (a: CustomerProfile, b: CustomerProfile) => {
        const dateA = new Date(a.serviceExpiryDate).getTime();
        const dateB = new Date(b.serviceExpiryDate).getTime();
        return dateA - dateB;
      },
      sortDirections: ['ascend', 'descend'],
      render: (date: string) => {
        const expiryDate = new Date(date);
        const now = new Date();
        const diffTime = expiryDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        let color = 'default';
        if (diffDays < 0) {
          color = 'red';
        } else if (diffDays <= 30) {
          color = 'orange';
        }
        
        return <Tag color={color}>{date}</Tag>;
      }
    }
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
              <Title level={2} style={{ margin: 0, color: '#262626' }}>客户档案</Title>
              <Text type="secondary">客户档案客户档案客户档案哈哈哈</Text>
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
                    总客户数
                    <Tooltip 
                      title={
                        <div style={{ maxWidth: '300px' }}>
                          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>总客户数</div>
                          <div style={{ marginBottom: '6px' }}>含义：系统中所有客户档案的总数量</div>
                          <div style={{ marginBottom: '6px' }}>来源：CRM系统中的客户档案数据</div>
                          <div style={{ marginBottom: '6px' }}>计算方式：所有状态客户档案的总计</div>
                          <div style={{ color: '#1890ff' }}>提示：反映业务规模和客户基础</div>
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
                value={kpiData.totalProfiles} 
                valueStyle={{ fontWeight: 700 }} 
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card style={{ ...cardStyle, marginBottom: 0 }}>
              <Statistic 
                title={
                  <span>
                    本月新增
                    <Tooltip 
                      title={
                        <div style={{ maxWidth: '300px' }}>
                          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>本月新增</div>
                          <div style={{ marginBottom: '6px' }}>含义：本月新增的客户档案数量</div>
                          <div style={{ marginBottom: '6px' }}>来源：客户创建时间统计</div>
                          <div style={{ marginBottom: '6px' }}>计算方式：创建时间在本月内的客户总数</div>
                          <div style={{ color: '#52c41a' }}>提示：反映业务增长和获客能力</div>
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
                value={kpiData.monthlyNewCustomers} 
                valueStyle={{ fontWeight: 700 }} 
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card style={{ ...cardStyle, marginBottom: 0 }}>
              <Statistic 
                title={
                  <span>
                    本月流失
                    <Tooltip 
                      title={
                        <div style={{ maxWidth: '300px' }}>
                          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>本月流失</div>
                          <div style={{ marginBottom: '6px' }}>含义：本月流失的客户档案数量</div>
                          <div style={{ marginBottom: '6px' }}>来源：客户流失状态和时间统计</div>
                          <div style={{ marginBottom: '6px' }}>计算方式：本月内标记为流失的客户总数</div>
                          <div style={{ color: '#ff4d4f' }}>提示：需要关注客户留存和满意度</div>
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
                value={kpiData.monthlyLostCustomers} 
                valueStyle={{ fontWeight: 700 }} 
              />
            </Card>
          </Col>
        </Row>
      </div>

      {/* 主要内容区域 */}
      <div 
        style={{ 
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          border: '1px solid #f0f0f0',
          padding: '24px'
        }}
      >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <Input
                placeholder="搜索客户名称"
                prefix={<SearchOutlined />}
                value={filters.searchKeyword}
                onChange={(e) => handleFilterChange('searchKeyword', e.target.value)}
                allowClear
                style={{ width: 300, borderRadius: '6px' }}
              />

              <Space size="middle">
                <Select
                  placeholder="生命周期阶段"
                  value={filters.lifecycleStage}
                  onChange={(value) => handleFilterChange('lifecycleStage', value)}
                  style={{ width: 150 }}
                  allowClear
                >
                  <Option value="all">全部</Option>
                  <Option value="handover_implementation">交接实施</Option>
                  <Option value="continuous_service">持续服务</Option>
                  <Option value="renewal_management">续约管理</Option>
                  <Option value="recall_incubation">召回孵化</Option>
                </Select>
                <Button 
                  type={filters.showFavoriteOnly ? 'primary' : 'default'}
                  icon={<HeartOutlined />} 
                  onClick={() => handleFilterChange('showFavoriteOnly', !filters.showFavoriteOnly)}
                >
                  {filters.showFavoriteOnly ? '已关注' : '我的关注'}
                </Button>
                <Button icon={<ReloadOutlined />} onClick={() => setFilters({ lifecycleStage: 'all', healthLevel: 'all', customerTier: 'all', searchKeyword: '', showFavoriteOnly: false })}>
                  重置
                </Button>
              </Space>
            </div>

            {/* 数据表格 */}
            <div>
              <Table
                columns={columns}
                dataSource={paginatedData}
                pagination={false}
                rowKey="id"
                scroll={{ x: 1200 }}
                size="middle"
                style={{ 
                  background: '#fff',
                }}
                className="customer-profile-table"
              />
              
              <style dangerouslySetInnerHTML={{
                __html: `
                  .customer-profile-table .ant-table-tbody > tr > td {
                    border-bottom: 1px solid #f0f0f0 !important;
                    border-left: none !important;
                    border-right: none !important;
                  }
                  .customer-profile-table .ant-table-thead > tr > th {
                    border-left: none !important;
                    border-right: none !important;
                    border-bottom: 1px solid #f0f0f0 !important;
                  }
                  .customer-profile-table .ant-table-tbody > tr:hover > td {
                    background-color: #fafafa !important;
                  }
                  .customer-profile-table table {
                    border-left: none !important;
                    border-right: none !important;
                  }
                  .customer-profile-table .ant-table-container {
                    border-left: none !important;
                    border-right: none !important;
                  }
                `
              }} />
            </div>
            
            {/* 分页和记录数显示 */}
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

      {/* 自定义样式 */}
       <style>{`
         .table-row-light {
           background-color: #fafafa;
         }
         .table-row-dark {
           background-color: #ffffff;
         }
         .ant-table-tbody > tr:hover > td {
           background-color: #e6f7ff !important;
         }
         .ant-table-tbody > tr > td {
           border-bottom: none !important;
         }
         .ant-table-tbody > tr {
           box-shadow: none !important;
         }
       `}</style>
    </div>
  );
};

export default CustomerProfileList;