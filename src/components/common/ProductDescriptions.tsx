import React from 'react';
import { Descriptions, Tag, Card, Space, Typography } from 'antd';
import { DatabaseOutlined, DollarOutlined, ClockCircleOutlined, SettingOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface ProductInfo {
  product: string;
  billing: string;
  time: string;
  amount: number;
  discount: number;
  official: number;
  configInfo: {
    dataDiskType: string;
    databaseVersion: string;
    packageName: string;
  };
  hardwareInfo: {
    cpu: string;
    storageSpace: string;
    replicationFactor: number;
    region: string;
  };
}

interface ProductDescriptionsProps {
  data: ProductInfo;
}

const ProductDescriptions: React.FC<ProductDescriptionsProps> = ({ data }) => {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={4} style={{ marginBottom: '24px' }}>
        <DatabaseOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
        响应式描述列表
      </Title>
      
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 基本信息 */}
        <Card 
          title={
            <span>
              <DatabaseOutlined style={{ marginRight: '8px' }} />
              产品信息
            </span>
          }
          size="small"
        >
          <Descriptions 
            column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 2, xs: 1 }}
            size="small"
            bordered
          >
            <Descriptions.Item label="Product">
              <Tag color="blue">{data.product}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Billing">
              <Tag color="green">{data.billing}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Time">
              <span>
                <ClockCircleOutlined style={{ marginRight: '4px' }} />
                {data.time}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Amount">
              <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
                <DollarOutlined style={{ marginRight: '4px' }} />
                ${data.amount.toFixed(2)}
              </span>
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* 价格信息 */}
        <Card 
          title={
            <span>
              <DollarOutlined style={{ marginRight: '8px' }} />
              价格详情
            </span>
          }
          size="small"
        >
          <Descriptions 
            column={{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
            size="small"
            bordered
          >
            <Descriptions.Item label="Discount">
              <span style={{ color: '#52c41a', fontWeight: 'bold' }}>
                ${data.discount.toFixed(2)}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Official">
              <span style={{ color: '#fa8c16', fontWeight: 'bold' }}>
                ${data.official.toFixed(2)}
              </span>
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* 配置信息 */}
        <Card 
          title={
            <span>
              <SettingOutlined style={{ marginRight: '8px' }} />
              Config Info
            </span>
          }
          size="small"
        >
          <Descriptions 
            column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
            size="small"
            bordered
          >
            <Descriptions.Item label="Data disk type">
              <Tag color="purple">{data.configInfo.dataDiskType}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Database version">
              <Tag color="cyan">{data.configInfo.databaseVersion}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Package" span={2}>
              <Tag color="orange">{data.configInfo.packageName}</Tag>
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* 硬件信息 */}
        <Card 
          title={
            <span>
              <DatabaseOutlined style={{ marginRight: '8px' }} />
              Hardware Info
            </span>
          }
          size="small"
        >
          <Descriptions 
            column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
            size="small"
            bordered
          >
            <Descriptions.Item label="CPU">
              <Tag color="red">{data.hardwareInfo.cpu}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Storage space">
              <Tag color="blue">{data.hardwareInfo.storageSpace}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Replication factor">
              <Tag color="green">{data.hardwareInfo.replicationFactor}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Region">
              <Tag color="volcano">{data.hardwareInfo.region}</Tag>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Space>
    </div>
  );
};

// 示例数据
export const sampleData: ProductInfo = {
  product: 'Cloud Database',
  billing: 'Prepaid',
  time: '18:00:00',
  amount: 80.00,
  discount: 20.00,
  official: 60.00,
  configInfo: {
    dataDiskType: 'MongoDB',
    databaseVersion: '3.4',
    packageName: 'dds.mongo.mid'
  },
  hardwareInfo: {
    cpu: '6 Core 3.5 GHz',
    storageSpace: '10 GB',
    replicationFactor: 3,
    region: 'East China 1'
  }
};

export default ProductDescriptions;