import React from 'react';
import { Card, Row, Col, Typography, Tag, Button, Space, Collapse } from 'antd';
import { DollarOutlined, EditOutlined, UserOutlined, TeamOutlined, PlusOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface CustomerProfileTabProps {
  customer: any;
  lifecycle?: 'renewal' | 'continuous' | 'handover';
  onEditContract?: () => void;
  onEditContacts?: () => void;
}

const CustomerProfileTab: React.FC<CustomerProfileTabProps> = ({
  customer,
  lifecycle = 'continuous',
  onEditContract,
  onEditContacts
}) => {
  return (
    <div style={{ padding: '16px 0' }}>
      {/* 合同与服务卡片 */}
      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <DollarOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
              <span>合同与服务</span>
            </div>
            {onEditContract && (
              <Button 
                type="primary" 
                icon={<EditOutlined />} 
                onClick={onEditContract}
                size="small"
              >
                编辑信息
              </Button>
            )}
          </div>
        }
        size="small"
        style={{ marginBottom: '16px' }}
      >
        <Row gutter={[24, 16]}>
          <Col span={24}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Text strong style={{ minWidth: 120, display: 'inline-block' }}>已购产品/服务：</Text>
              <div style={{ marginLeft: '8px' }}>
                {customer?.purchasedProducts?.map((product: string, index: number) => (
                  <Tag key={index} color="blue" style={{ marginRight: '4px' }}>
                    {product}
                  </Tag>
                ))}
              </div>
            </div>
          </Col>
          
          <Col span={8}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Text strong style={{ minWidth: 120, display: 'inline-block' }}>
                {lifecycle === 'renewal' ? '续约金额 (ARR)：' : '合同金额 (ARR)：'}
              </Text>
              <span style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginLeft: '8px' }}>
                ¥{(customer?.arr || customer?.currentContract?.amount || customer?.renewalAmount || 0).toLocaleString()}
              </span>
            </div>
          </Col>
          
          <Col span={8}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Text strong style={{ minWidth: 100, display: 'inline-block' }}>
                {lifecycle === 'renewal' ? '续约到期日：' : '服务到期日：'}
              </Text>
              <span style={{ color: '#fa8c16', marginLeft: '8px' }}>
                {customer?.contractEndDate || customer?.contractExpiryDate || customer?.serviceExpiryDate || '-'}
              </span>
            </div>
          </Col>
          
          <Col span={8}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Text strong style={{ minWidth: 80, display: 'inline-block' }}>人数版本：</Text>
              <span style={{ color: '#52c41a', marginLeft: '8px' }}>
                {customer?.currentContract?.userVersion || customer?.scale || '暂无'}
              </span>
            </div>
          </Col>
          
          {lifecycle !== 'renewal' && (
            <>
              <Col span={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Text strong style={{ minWidth: 80, display: 'inline-block' }}>提单版本：</Text>
                  <span style={{ color: '#722ed1', marginLeft: '8px' }}>
                    {customer?.currentContract?.ticketVersion || '暂无'}
                  </span>
                </div>
              </Col>
              <Col span={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Text strong style={{ minWidth: 100, display: 'inline-block' }}>提单到期时间：</Text>
                  <span style={{ color: '#fa541c', marginLeft: '8px' }}>
                    {customer?.ticketExpiryDate || '暂无'}
                  </span>
                </div>
              </Col>
              <Col span={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Text strong style={{ minWidth: 80, display: 'inline-block' }}>天元订单：</Text>
                  <Tag color={customer?.currentContract?.tianyuanOrderStatus === 'active' ? 'green' : 'orange'}>
                    {customer?.currentContract?.tianyuanOrderStatus === 'active' ? '已生效' : '未生效'}
                  </Tag>
                </div>
              </Col>
            </>
          )}
        </Row>
        
        {/* 续约阶段特有的服务成本投入 */}
        {lifecycle === 'renewal' && (
          <div style={{ marginTop: '16px' }}>
            <Collapse 
              ghost 
              size="small"
              items={[
                {
                  key: '1',
                  label: (
                    <Text strong style={{ color: '#1890ff' }}>
                      服务成本投入: ¥{customer?.currentContract?.serviceCost?.toLocaleString() || '15,000'} 
                    </Text>
                  ),
                  children: (
                    <div style={{ background: '#f8f9fa', padding: '12px', borderRadius: '6px', marginTop: '8px' }}>
                      {customer?.currentContract?.serviceCostDetails ? 
                        customer.currentContract.serviceCostDetails.map((detail: string, index: number) => (
                          <div key={index} style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                            • {detail}
                          </div>
                        )) : 
                        [
                          '客户拜访费用: ¥3,000',
                          '礼品采购: ¥5,000', 
                          '培训支持: ¥4,000',
                          '技术支持: ¥3,000'
                        ].map((detail, index) => (
                          <div key={index} style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                            • {detail}
                          </div>
                        ))
                      }
                    </div>
                  )
                }
              ]}
            />
          </div>
        )}
      </Card>

      {/* 基本信息卡片 */}
      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <UserOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
            <span>基本信息</span>
          </div>
        }
        size="small"
        style={{ marginBottom: '16px' }}
      >
        <Row gutter={[24, 16]}>
          <Col span={8}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Text strong style={{ minWidth: 80, display: 'inline-block' }}>公司名称：</Text>
              <span style={{ marginLeft: '8px' }}>{customer?.name || '-'}</span>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Text strong style={{ minWidth: 60, display: 'inline-block' }}>行业：</Text>
              <span style={{ marginLeft: '8px' }}>{customer?.industry || '-'}</span>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Text strong style={{ minWidth: 60, display: 'inline-block' }}>规模：</Text>
              <span style={{ marginLeft: '8px' }}>{customer?.scale || '-'}</span>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Text strong style={{ minWidth: 80, display: 'inline-block' }}>客户成功：</Text>
              <span style={{ marginLeft: '8px' }}>{customer?.csm || '-'}</span>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Text strong style={{ minWidth: 60, display: 'inline-block' }}>健康分：</Text>
              <span style={{ 
                color: (customer?.healthScore || 0) >= 80 ? '#3f8600' : 
                       (customer?.healthScore || 0) >= 60 ? '#faad14' : '#cf1322',
                fontWeight: '600',
                marginLeft: '8px'
              }}>
                {customer?.healthScore || 0}分
              </span>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Text strong style={{ minWidth: 60, display: 'inline-block' }}>建联度：</Text>
              <span style={{ marginLeft: '8px' }}>{customer?.connectionLevel || '-'}</span>
            </div>
          </Col>
        </Row>
      </Card>

      {/* 关键联系人卡片 */}
      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TeamOutlined style={{ color: '#722ed1', marginRight: '8px' }} />
              <span>关键联系人</span>
            </div>
            {onEditContacts && (
              <Button 
                type="primary" 
                icon={lifecycle === 'continuous' ? <PlusOutlined /> : <EditOutlined />} 
                onClick={onEditContacts}
                size="small"
              >
                {lifecycle === 'continuous' ? '添加联系人' : '编辑联系人'}
              </Button>
            )}
          </div>
        }
        size="small"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          {customer?.keyContacts?.map((contact: any, index: number) => (
            <div key={index} style={{ 
              padding: '12px', 
              border: '1px solid #f0f0f0', 
              borderRadius: '6px',
              backgroundColor: contact.isPrimary ? '#f6ffed' : '#fafafa'
            }}>
              <Row gutter={16}>
                <Col span={6}>
                  <Text strong>{contact.name}</Text>
                  {contact.isPrimary && <Tag color="green" style={{ marginLeft: '8px', fontSize: '12px' }}>主要联系人</Tag>}
                </Col>
                <Col span={4}>
                  <Text type="secondary">{contact.title}</Text>
                </Col>
                <Col span={6}>
                  <Text copyable>{contact.phone}</Text>
                </Col>
                <Col span={8}>
                  <Text copyable>{contact.email}</Text>
                </Col>
              </Row>
            </div>
          ))}
          {(!customer?.keyContacts || customer.keyContacts.length === 0) && (
            <div style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
              暂无联系人信息
            </div>
          )}
        </Space>
      </Card>
    </div>
  );
};

export default CustomerProfileTab;