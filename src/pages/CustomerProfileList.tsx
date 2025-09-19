import React, { useState, useMemo } from 'react';
import { Table, Button, Select, Input, Tag, Typography, Space, Tooltip, Card, Row, Col, Statistic } from 'antd';
import { PlusOutlined, ExportOutlined, ArrowUpOutlined, ArrowDownOutlined, MinusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
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
    searchKeyword: ''
  });

  // 分页状态
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 卡片样式
  const cardStyle = {
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    border: '1px solid #f0f0f0',
    background: '#ffffff',
    marginBottom: '16px',
  };

  // 计算KPI数据
  const kpiData = useMemo(() => {
    const totalProfiles = mockCustomerProfiles.length;
    
    // 计算本月新增客户数（模拟数据）
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const monthlyNewCount = mockCustomerProfiles.filter(p => {
      // 模拟创建时间在本月的客户
      const createDate = new Date(p.serviceExpiryDate); // 使用服务到期日模拟创建时间
      createDate.setFullYear(createDate.getFullYear() - 1); // 假设服务期1年
      return createDate.getMonth() === currentMonth && createDate.getFullYear() === currentYear;
    }).length;
    
    // 计算本月流失客户数（模拟数据）
    const monthlyChurnCount = mockCustomerProfiles.filter(p => {
      // 模拟本月内服务到期且未续约的客户
      const expiryDate = new Date(p.serviceExpiryDate);
      const isThisMonth = expiryDate.getMonth() === currentMonth && expiryDate.getFullYear() === currentYear;
      const isExpired = expiryDate < now;
      return isThisMonth && isExpired;
    }).length;
    
    const renewalDueCount = mockCustomerProfiles.filter(p => {
      if (!p.serviceExpiryDate) return false;
      const endDate = new Date(p.serviceExpiryDate);
      const now = new Date();
      const diffTime = endDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 90 && diffDays > 0; // 90天内到期
    }).length;

    return {
      totalProfiles,
      monthlyNewCount,
      monthlyChurnCount,
      renewalDueCount
    };
  }, []);

  // 筛选后的数据
  const filteredData = useMemo(() => {
    return getFilteredCustomerProfiles({
      lifecycleStage: filters.lifecycleStage === 'all' ? undefined : filters.lifecycleStage,
      healthLevel: filters.healthLevel === 'all' ? undefined : filters.healthLevel,
      customerTier: filters.customerTier === 'all' ? undefined : filters.customerTier,
      searchKeyword: filters.searchKeyword
    });
  }, [filters]);

  // 处理筛选器变化
  const handleFilterChange = (key: keyof CustomerProfileFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
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
      title: '交接编号',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (id: string) => (
        <span style={{ color: '#595959', fontSize: '14px' }}>{id}</span>
      ),
    },
    {
      title: '客户名称',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 200,
      render: (text: string, record: CustomerProfile) => {
        // 根据生命周期阶段生成跳转路径
        const getDetailPath = (lifecycleStage: string, customerId: string) => {
          // 从客户档案ID (CUST-001) 中提取数字部分作为详情页ID
          const detailId = customerId.replace('CUST-', '');
          
          switch (lifecycleStage) {
            case 'handover_implementation':
              return `/profiles/handover/${detailId}`;
            case 'continuous_service':
              return `/profiles/service/${detailId}`;
            case 'renewal_management':
              return `/profiles/renewal/${detailId}`;
            case 'recall_incubation':
              // 召回孵化暂时跳转到持续服务详情页，因为没有专门的召回详情页
              return `/profiles/service/${detailId}`;
            default:
              return `/profiles/service/${detailId}`;
          }
        };

        return (
          <a 
            style={{ color: '#1890ff' }}
            onClick={(e) => {
              e.preventDefault();
              // 使用 umi history 进行页面跳转
              const targetPath = getDetailPath(record.lifecycleStage, record.id);
              history.push(targetPath);
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: '交接状态',
      dataIndex: 'lifecycleStage',
      key: 'lifecycleStage',
      width: 130,
      render: (stage: string) => {
        const config = LIFECYCLE_STAGE_CONFIG[stage as keyof typeof LIFECYCLE_STAGE_CONFIG];
        return (
          <Tag color={config.color} style={{ borderRadius: '12px', padding: '2px 8px' }}>
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: '合同金额 (ARR)',
      dataIndex: 'contractAmount',
      key: 'contractAmount',
      width: 140,
      render: (amount: number) => (
        <span style={{ fontWeight: 500 }}>{formatAmount(amount)}</span>
      ),
      sorter: (a, b) => a.contractAmount - b.contractAmount,
    },
    {
      title: '服务到期日',
      dataIndex: 'serviceExpiryDate',
      key: 'serviceExpiryDate',
      width: 120,
      render: (date: string) => {
        const expiryDate = new Date(date);
        const today = new Date();
        const diffTime = expiryDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        let color = '#000';
        if (diffDays < 30) color = '#ff4d4f';
        else if (diffDays < 90) color = '#faad14';
        
        return <span style={{ color }}>{date}</span>;
      },
      sorter: (a, b) => new Date(a.serviceExpiryDate).getTime() - new Date(b.serviceExpiryDate).getTime(),
    },
  ];

  return (
    <div style={{ 
      padding: '32px 40px',
      background: '#fafafa',
      minHeight: 'calc(100vh - 64px)'
    }}>
      {/* 页面标题 */}
      <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '16px'
          }}>
          <div>
            <Title level={2} style={{ margin: 0, color: '#262626' }}>客户档案</Title>
            <Text type="secondary">客户档案列表</Text>
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
                    客户档案总数
                    <Tooltip 
                      title={
                        <div style={{ maxWidth: '300px' }}>
                          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>客户档案总数</div>
                          <div style={{ marginBottom: '6px' }}>含义：系统中所有客户档案的总数量</div>
                          <div style={{ marginBottom: '6px' }}>来源：客户档案管理系统</div>
                          <div style={{ marginBottom: '6px' }}>计算方式：所有状态的客户档案记录总数</div>
                          <div style={{ color: '#1890ff' }}>提示：反映客户规模和业务覆盖范围</div>
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
                          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>本月新增客户数</div>
                          <div style={{ marginBottom: '6px' }}>含义：本月新增的客户数量</div>
                          <div style={{ marginBottom: '6px' }}>来源：客户档案管理系统</div>
                          <div style={{ marginBottom: '6px' }}>计算方式：本月创建的客户档案总数</div>
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
                value={kpiData.monthlyNewCount} 
                valueStyle={{ fontWeight: 700, color: '#52c41a' }} 
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
                          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>本月流失客户数</div>
                          <div style={{ marginBottom: '6px' }}>含义：本月流失的客户数量</div>
                          <div style={{ marginBottom: '6px' }}>来源：客户档案管理系统</div>
                          <div style={{ marginBottom: '6px' }}>计算方式：本月内服务到期且未续约的客户总数</div>
                          <div style={{ color: '#ff4d4f' }}>提示：需要重点关注和分析流失原因</div>
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
                value={kpiData.monthlyChurnCount} 
                valueStyle={{ fontWeight: 700, color: '#ff4d4f' }} 
              />
            </Card>
          </Col>
        </Row>
      </div>

      {/* 列表区域 - 参考交接实施样式 */}
      <Card style={cardStyle}>

        {/* 筛选器和操作区 */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          {/* 筛选器区域 */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flex: 1 }}>
            <div>
              <span style={{ marginRight: '8px', color: '#595959', fontSize: '14px' }}>生命周期阶段:</span>
              <Select
                value={filters.lifecycleStage}
                onChange={(value) => handleFilterChange('lifecycleStage', value)}
                style={{ width: 140 }}
                size="middle"
              >
                <Option value="all">全部</Option>
                <Option value="handover_implementation">交接实施</Option>
                <Option value="continuous_service">持续服务</Option>
                <Option value="renewal_management">续约管理</Option>
                <Option value="recall_incubation">召回孵化</Option>
              </Select>
            </div>



            <div>
              <Search
                placeholder="搜索客户名称"
                value={filters.searchKeyword}
                onChange={(e) => handleFilterChange('searchKeyword', e.target.value)}
                style={{ width: 200 }}
                size="middle"
                allowClear
              />
            </div>
          </div>

          {/* 操作按钮区域 */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {/* 导出按钮已删除 */}
          </div>
        </div>

        {/* 数据表格 */}
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: filteredData.length,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
            pageSizeOptions: ['10', '20', '50', '100'],
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            },
            style: { marginTop: '16px' }
          }}
          size="small"
          style={{ background: '#fff' }}
          scroll={{ x: 800 }}
          rowClassName={(record, index) => {
            return index % 2 === 0 ? 'table-row-light' : 'table-row-dark';
          }}
        />
      </Card>

      {/* 自定义样式 */}
      <style>{`
        .table-row-light {
          background-color: #fafafa;
        }
        .table-row-dark {
          background-color: #ffffff;
        }
        .ant-table-thead > tr > th {
          background-color: #f5f5f5;
          font-weight: 600;
          color: #262626;
          height: 48px;
          border-bottom: 2px solid #e8e8e8;
        }
        .ant-table-tbody > tr > td {
          padding: 12px 16px;
          border-bottom: 1px solid #f0f0f0;
        }
        .ant-table-tbody > tr:hover > td {
          background-color: #f5f5f5 !important;
        }
        .ant-pagination {
          text-align: center;
          margin-top: 24px;
        }
        .ant-pagination-total-text {
          color: #8c8c8c;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default CustomerProfileList;