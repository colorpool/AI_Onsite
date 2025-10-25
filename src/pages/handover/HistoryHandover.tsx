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
  ShareAltOutlined, 
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
  const [dateRange, setDateRange] = useState<[string, string] | undefined>();
  const [selectedRecord, setSelectedRecord] = useState<CustomerHandover | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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

    // 日期范围筛选（按交付时间或更新时间）
    if (dateRange) {
      const [startDate, endDate] = dateRange;
      result = result.filter(item => {
        const itemDate = new Date(item.deliveredAt || item.updatedAt);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
      });
    }

    return result;
  }, [historyData, searchText, dateRange]);

  // 查看详情
  const handleViewDetail = (record: CustomerHandover) => {
    setSelectedRecord(record);
    setDetailVisible(true);
  };

  // 处理分享
  const handleShare = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要分享的历史交接单');
      return;
    }
    message.success(`已选择 ${selectedRowKeys.length} 个历史交接单进行分享`);
  };

  // 多选配置
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  // 表格列定义
  const columns = [
    {
      title: '交接单编号',
      dataIndex: 'handoverNumber',
      key: 'handoverNumber',
      width: 140,
      render: (number: string) => (
        <span style={{ fontFamily: 'monospace', fontSize: '14px' }}>{number}</span>
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
      title: '交付用时',
      key: 'deliveryDuration',
      width: 100,
      sorter: (a: CustomerHandover, b: CustomerHandover) => {
        const getDuration = (record: CustomerHandover) => {
          if (!record.deliveredAt) return 0;
          return new Date(record.deliveredAt).getTime() - new Date(record.createdAt).getTime();
        };
        return getDuration(a) - getDuration(b);
      },
      render: (_: unknown, record: CustomerHandover) => {
        if (!record.deliveredAt) return '-';
        const createdTime = new Date(record.createdAt).getTime();
        const deliveredTime = new Date(record.deliveredAt).getTime();
        const diffDays = Math.ceil((deliveredTime - createdTime) / (1000 * 60 * 60 * 24));
        return `${diffDays}天`;
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
          <Col xs={24} sm={8} md={6}>
            <RangePicker
              placeholder={['交付开始时间', '交付结束时间']}
              onChange={(dates, dateStrings) => setDateRange(dateStrings as [string, string])}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={24} md={10}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <Button 
                icon={<ReloadOutlined />} 
                onClick={() => {
                  setSearchText('');
                  setDateRange(undefined);
                }}
              >
                重置
              </Button>
              <Button 
                icon={<ShareAltOutlined />}
                onClick={handleShare}
              >
                分享
              </Button>
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
          rowSelection={rowSelection}
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
        <Divider />
        {selectedRecord && (
          <div>
            {/* 基本信息 */}
            <Descriptions title="基本信息" bordered size="small" column={2}>
              <Descriptions.Item label="客户名称">{selectedRecord.customerName}</Descriptions.Item>
              <Descriptions.Item label="交接单编号">{selectedRecord.handoverNumber}</Descriptions.Item>
              <Descriptions.Item label="合同编号">{selectedRecord.contractNumber}</Descriptions.Item>
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

            {/* CRM信息 */}
            {selectedRecord.crmData && (
              <div>
                <Title level={5}>CRM信息</Title>
                <Descriptions bordered size="small" column={2}>
                  <Descriptions.Item label="合同金额">¥{selectedRecord.crmData.contractAmount.toLocaleString()}</Descriptions.Item>
                  <Descriptions.Item label="服务周期">{selectedRecord.crmData.servicePeriod}</Descriptions.Item>
                  <Descriptions.Item label="购买账号数">{selectedRecord.crmData.accountCount} 个</Descriptions.Item>
                  <Descriptions.Item label="销售来源">
                    {selectedRecord.crmData.salesSource === 'direct' ? '直营' : '渠道'}
                  </Descriptions.Item>
                  {selectedRecord.crmData.salesPerson && (
                    <Descriptions.Item label="销售人员">{selectedRecord.crmData.salesPerson}</Descriptions.Item>
                  )}
                  {selectedRecord.crmData.channelPartner && (
                    <Descriptions.Item label="渠道合作伙伴">{selectedRecord.crmData.channelPartner}</Descriptions.Item>
                  )}
                  <Descriptions.Item label="已购产品" span={2}>
                    {selectedRecord.crmData.purchasedProducts?.map((product, index) => (
                      <Tag key={index} color="blue" style={{ marginBottom: 4 }}>{product}</Tag>
                    ))}
                  </Descriptions.Item>
                </Descriptions>
                
                {selectedRecord.crmData.salesNotes && (
                  <div style={{ marginTop: '16px' }}>
                    <Text strong style={{ display: 'block', marginBottom: '8px' }}>销售备注</Text>
                    <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '6px', border: '1px solid #e8e8e8' }}>
                      <Text>{selectedRecord.crmData.salesNotes}</Text>
                    </div>
                  </div>
                )}
              </div>
            )}

            <Divider />

            {/* 风险与商机 */}
            {((selectedRecord.risks && selectedRecord.risks.length > 0) || (selectedRecord.opportunities && selectedRecord.opportunities.length > 0)) && (
              <div>
                <Title level={5}>风险与商机</Title>
                
                {/* 风险部分 */}
                {selectedRecord.risks && selectedRecord.risks.length > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    <Text strong style={{ display: 'block', marginBottom: '8px' }}>风险识别</Text>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {selectedRecord.risks.map((risk, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                          <Tag color="red">
                            {risk.type === 'leadership' ? '关键领导力缺失对接' :
                             risk.type === 'unclear_needs' ? '客户需求场景不明确' :
                             risk.type === 'high_expectations' ? '客户对产品功能期待值过高' :
                             risk.type === 'tight_schedule' ? '客户实施需求多/周期紧' :
                             risk.type === 'difficult_contact' ? '对接人性格难接触' : '其他风险'}
                          </Tag>
                          {risk.description && <Text>{risk.description}</Text>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 商机部分 */}
                {selectedRecord.opportunities && selectedRecord.opportunities.length > 0 && (
                  <div>
                    <Text strong style={{ display: 'block', marginBottom: '8px' }}>潜在商机</Text>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {selectedRecord.opportunities.map((opportunity, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                          <Tag color="green">
                            {opportunity.type === 'account_expansion' ? '账号增购可能' :
                             opportunity.type === 'version_upgrade' ? '版本升级需求' :
                             opportunity.type === 'new_modules' ? '新增模块采购需求' :
                             opportunity.type === 'referrals' ? '转介绍可能性' :
                             opportunity.type === 'long_term' ? '长期合作（续费）意向' : '其他商机'}
                          </Tag>
                          {opportunity.description && <Text>{opportunity.description}</Text>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {(selectedRecord.risks || selectedRecord.opportunities) && <Divider />}

            {/* 干系人信息 */}
            {selectedRecord.stakeholders && selectedRecord.stakeholders.length > 0 && (
              <div>
                <Title level={5}>干系人信息</Title>
                <Descriptions bordered size="small" column={1}>
                  {selectedRecord.stakeholders.map((stakeholder, index) => (
                    <Descriptions.Item key={index} label={`${stakeholder.name} (${stakeholder.position})`}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Tag color={stakeholder.role === 'decision_maker' ? 'red' : stakeholder.role === 'influencer' ? 'orange' : 'blue'}>
                          {stakeholder.role === 'decision_maker' ? '决策者' : 
                           stakeholder.role === 'influencer' ? '影响者' : 
                           stakeholder.role === 'user' ? '使用者' : '技术联系人'}
                        </Tag>
                        <span>{stakeholder.contact}</span>
                        <Tag color={stakeholder.status === 'active' ? 'green' : 'red'}>
                          {stakeholder.status === 'active' ? '在职' : '已离职'}
                        </Tag>
                      </div>
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              </div>
            )}

            {selectedRecord.stakeholders && selectedRecord.stakeholders.length > 0 && <Divider />}

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
