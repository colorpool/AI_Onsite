import React, { useState, useMemo } from 'react';
import { 
  Card, 
  Table, 
  Tag, 
  Button, 
  Space, 
  Input, 
  Select, 
  DatePicker, 
  Typography, 
  Row, 
  Col,
  Modal,
  Descriptions,
  Divider,
  message
} from 'antd';
import { 
  SearchOutlined, 
  DownloadOutlined, 
  ReloadOutlined,
  EyeOutlined,
  FileTextOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import { useNavigate, Helmet } from '@umijs/max';
import { mockCustomerHandovers } from '../../mock/handoverData';
import type { CustomerHandover } from '../../types/handover';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

// 统一的卡片样式
const cardStyle = {
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  border: '1px solid #f0f0f0',
  background: '#ffffff',
  marginBottom: '16px',
};

const HistoryHandover: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [dateRange, setDateRange] = useState<[string, string] | undefined>();
  const [selectedRecord, setSelectedRecord] = useState<CustomerHandover | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);

  // 本页自带的历史交接 mock（确保有数据可看）
  const mockHistoryHandovers = useMemo<CustomerHandover[]>(() => {
    // 取现有交接数据，补齐交付时间并置为已完成/已转移
    const now = new Date();
    return mockCustomerHandovers.slice(0, 8).map((item, idx) => ({
      ...item,
      handoverStatus: idx % 3 === 0 ? ('transferred' as any) : ('completed' as any),
      deliveredAt: item.deliveredAt || new Date(now.getTime() - (idx + 3) * 86400000).toISOString(),
      handoverNumber: item.handoverNumber || `HO-2024-${String(idx + 101).padStart(3, '0')}`,
    }));
  }, []);

  // 过滤历史交接数据
  const historyData = useMemo(() => {
    return mockHistoryHandovers;
  }, [mockHistoryHandovers]);

  // 搜索和筛选逻辑
  const filteredData = useMemo(() => {
    let result = historyData;

    // 客户名称或编号搜索
    if (searchText) {
      result = result.filter(item => 
        (item.customerName || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (item.handoverNumber || '').toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // 状态筛选
    if (statusFilter) {
      result = result.filter(item => (item.handoverStatus as any) === statusFilter);
    }

    // 日期范围筛选（按交付时间或更新时间）
    if (dateRange) {
      const [startDate, endDate] = dateRange;
      result = result.filter(item => {
        const itemDate = new Date(item.deliveredAt || item.updatedAt);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
      });
    }

    return result;
  }, [historyData, searchText, statusFilter, dateRange]);

  // 查看详情
  const handleViewDetail = (record: CustomerHandover) => {
    setSelectedRecord(record);
    setDetailVisible(true);
  };

  // 表格列定义
  const columns = [
    {
      title: '交接单编号',
      dataIndex: 'handoverNumber',
      key: 'handoverNumber',
      width: 140,
      render: (number: string) => (
        <Text code style={{ fontSize: '12px' }}>{number}</Text>
      ),
    },
    {
      title: '客户名称',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 200,
      render: (name: string, record: CustomerHandover) => (
        <Button 
          type="link" 
          onClick={() => handleViewDetail(record)}
          style={{ padding: 0, height: 'auto' }}
        >
          {name}
        </Button>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      sorter: (a: CustomerHandover, b: CustomerHandover) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: '交付时间',
      dataIndex: 'deliveredAt',
      key: 'deliveredAt',
      width: 120,
      sorter: (a: CustomerHandover, b: CustomerHandover) => 
        new Date(a.deliveredAt || '').getTime() - new Date(b.deliveredAt || '').getTime(),
      render: (date: string) => date ? new Date(date).toLocaleDateString() : '-',
    },
    {
      title: '交接状态',
      dataIndex: 'handoverStatus',
      key: 'handoverStatus',
      width: 100,
      render: (status: string) => {
        const statusMap = {
          completed: { text: '已完成', color: 'green' },
          transferred: { text: '已转移', color: 'blue' },
          normal: { text: '正常', color: 'default' }
        };
        const config = statusMap[status as keyof typeof statusMap] || { text: status, color: 'default' };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '客户满意度',
      dataIndex: 'handoverRating',
      key: 'handoverRating',
      width: 120,
      sorter: (a: CustomerHandover, b: CustomerHandover) => (a.handoverRating || 0) - (b.handoverRating || 0),
      render: (rating: number) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: '#faad14' }}>★</span>
          <span style={{ fontWeight: '500' }}>{rating}</span>
        </div>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_: unknown, record: CustomerHandover) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => handleViewDetail(record)}
            title="查看详情"
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ 
      padding: '32px 40px',
      background: '#f5f5f5',
      minHeight: 'calc(100vh - 64px)'
    }}>
      <Helmet>
        <title>历史交接查询</title>
      </Helmet>
      {/* 顶部：返回按钮 + 面包屑 + 标题 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            style={{ padding: '4px 8px', height: 'auto', color: '#666' }}
          >
            返回
          </Button>
          <div>
            <Title level={2} style={{ margin: 0, color: '#262626' }}>交接实施/历史交接查询</Title>
            <Text type="secondary">查看所有已完成的历史交接记录</Text>
          </div>
        </div>
      </div>

      {/* 筛选区域 */}
      <Card style={cardStyle}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8} md={6}>
            <Input
              placeholder="搜索客户名称或交接单编号"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={8} md={4}>
            <Select
              placeholder="交接状态"
              value={statusFilter}
              onChange={setStatusFilter}
              allowClear
              style={{ width: '100%' }}
            >
              <Select.Option value="completed">已完成</Select.Option>
              <Select.Option value="transferred">已转移</Select.Option>
              <Select.Option value="normal">正常</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={8} md={6}>
            <RangePicker
              placeholder={['交付开始时间', '交付结束时间']}
              onChange={(dates, dateStrings) => setDateRange(dateStrings as [string, string])}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={24} md={8}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <Button 
                icon={<ReloadOutlined />} 
                onClick={() => {
                  setSearchText('');
                  setStatusFilter(undefined);
                  setDateRange(undefined);
                }}
              >
                重置
              </Button>
              <Button icon={<DownloadOutlined />}>导出</Button>
            </div>
          </Col>
        </Row>
      </Card>

      {/* 数据表格 */}
      <Card style={cardStyle}>
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            total: filteredData.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
          }}
          scroll={{ x: 800 }}
          size="small"
        />
      </Card>

      {/* 详情弹窗 */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileTextOutlined />
            <span>交接单详情</span>
            {selectedRecord && (
              <Text code style={{ fontSize: '12px', marginLeft: '8px' }}>
                {selectedRecord.handoverNumber}
              </Text>
            )}
          </div>
        }
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailVisible(false)}>
            关闭
          </Button>
        ]}
        width={800}
      >
        {selectedRecord && (
          <div>
            {/* 基本信息 */}
            <Descriptions title="基本信息" bordered size="small" column={2}>
              <Descriptions.Item label="客户名称">{selectedRecord.customerName}</Descriptions.Item>
              <Descriptions.Item label="交接单编号">{selectedRecord.handoverNumber}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{new Date(selectedRecord.createdAt).toLocaleString()}</Descriptions.Item>
              <Descriptions.Item label="交付时间">
                {selectedRecord.deliveredAt ? new Date(selectedRecord.deliveredAt).toLocaleString() : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="交接状态">
                <Tag color={(selectedRecord.handoverStatus as any) === 'completed' ? 'green' : 'blue'}>
                  {(selectedRecord.handoverStatus as any) === 'completed' ? '已完成' : '已转移'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="客户满意度">
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ color: '#faad14' }}>★</span>
                  <span>{selectedRecord.handoverRating}</span>
                </div>
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            {/* 公司基本情况 */}
            {selectedRecord.crmData && (
              <div>
                <Title level={5}>公司基本情况</Title>
                <Descriptions bordered size="small" column={2}>
                  <Descriptions.Item label="合同金额">¥{selectedRecord.crmData.contractAmount.toLocaleString()}</Descriptions.Item>
                  <Descriptions.Item label="服务周期">{selectedRecord.crmData.servicePeriod}</Descriptions.Item>
                  <Descriptions.Item label="账号数量">{selectedRecord.crmData.accountCount}</Descriptions.Item>
                  <Descriptions.Item label="销售来源">
                    {selectedRecord.crmData.salesSource === 'direct' ? '直营' : '渠道'}
                  </Descriptions.Item>
                  {selectedRecord.crmData.salesPerson && (
                    <Descriptions.Item label="销售人员">{selectedRecord.crmData.salesPerson}</Descriptions.Item>
                  )}
                  {selectedRecord.crmData.channelPartner && (
                    <Descriptions.Item label="渠道合作伙伴">{selectedRecord.crmData.channelPartner}</Descriptions.Item>
                  )}
                </Descriptions>
              </div>
            )}

            <Divider />

            {/* 交接评价 */}
            <div>
              <Title level={5}>交接评价</Title>
              <Text>{selectedRecord.handoverComment}</Text>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default HistoryHandover;
