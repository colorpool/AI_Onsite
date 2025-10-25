import React from 'react';
import { Button, Space, Tag, Avatar } from 'antd';
import { 
  ArrowLeftOutlined, 
  EditOutlined, 
  FileTextOutlined,
  ShareAltOutlined,
  StarOutlined,
  StarFilled,
  DollarOutlined,
  ClockCircleOutlined,
  MessageOutlined
} from '@ant-design/icons';
import { getPlatformType } from '../../mock/continuousServiceData';

interface ContinuousServiceHeaderProps {
  customerData: {
    id: string;
    name: string;
    healthLevel: 'healthy' | 'normal' | 'risk';
    customerTier: 'strategic' | 'large' | 'medium';
    arr: number;
    renewalDate: string;
    lastContactDays: number;

    contractNumber?: string;
  };
  onBack: () => void;
  title?: string;
  onViewContract: () => void;
  onShare: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

// 平台图标组件 - 动态显示平台类型
const PlatformIcon: React.FC<{ customerId: string }> = ({ customerId }) => {
  const platformType = getPlatformType(customerId);
  
  // 获取平台配置
  const getPlatformConfig = (platform: string) => {
    const configs = {
      'dingtalk': { text: '钉', color: '#1677ff' },
      'wechat_work': { text: '企', color: '#07c160' },
      'feishu': { text: '飞', color: '#00d4aa' },
      'lark': { text: 'L', color: '#00d4aa' },
      'dingtalk_global': { text: 'D', color: '#1677ff' },
      'standalone': { text: '独', color: '#722ed1' }
    };
    return configs[platform as keyof typeof configs] || { text: '未', color: '#d9d9d9' };
  };
  
  const config = getPlatformConfig(platformType);
  
  return (
    <div style={{
      width: 24,
      height: 24,
      backgroundColor: config.color,
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: '12px',
      fontWeight: 'bold',
      marginRight: '12px'
    }}>
      {config.text}
    </div>
  );
};

const ContinuousServiceHeader: React.FC<ContinuousServiceHeaderProps> = ({
  customerData,
  onBack,
  onViewContract,
  onShare,
  isFavorite = false,
  onToggleFavorite
}) => {
  // 健康状态配置 - 调整为更柔和的配色
  const getHealthConfig = (healthLevel: string) => {
    const configs = {
      'healthy': { color: '#73d13d', text: '健康' },
      'normal': { color: '#ffc53d', text: '一般' },
      'risk': { color: '#ff7875', text: '风险' }
    };
    return configs[healthLevel as keyof typeof configs] || { color: '#d9d9d9', text: '未知' };
  };

  // 客户定级配置 - 调整为更柔和的配色
  const getTierConfig = (tier: string) => {
    const configs = {
      'strategic': { color: '#9254de', text: '战略客户' },
      'large': { color: '#40a9ff', text: '大客户' },
      'medium': { color: '#36cfc9', text: '中型客户' }
    };
    return configs[tier as keyof typeof configs] || { color: '#d9d9d9', text: '普通客户' };
  };

  // 计算续约剩余天数
  const calculateRemainingDays = (renewalDate: string) => {
    const today = new Date();
    const renewal = new Date(renewalDate);
    const diffTime = renewal.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // 格式化ARR金额
  const formatARR = (amount: number) => {
    if (amount >= 10000) {
      return `¥${(amount / 10000).toFixed(0)}万`;
    }
    return `¥${amount.toLocaleString()}`;
  };

  // 获取关系热度配置 - 更柔和的配色
  const getContactHeatConfig = (days: number) => {
    if (days <= 7) {
      return { color: '#73d13d', level: '热' };
    } else if (days <= 30) {
      return { color: '#ffc53d', level: '温' };
    } else {
      return { color: '#ff7875', level: '冷' };
    }
  };

  const healthConfig = getHealthConfig(customerData.healthLevel);
  const tierConfig = getTierConfig(customerData.customerTier);
  const remainingDays = calculateRemainingDays(customerData.renewalDate);
  const contactHeat = getContactHeatConfig(customerData.lastContactDays);

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)', position: 'relative' }}>
      {/* 顶部操作栏 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 24px 16px 24px',
        borderBottom: '1px solid #f0f0f0'
      }}>
        {/* 左侧：返回按钮 + 平台图标 + 客户名称 */}
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={onBack}
            style={{
              padding: '4px 8px',
              height: 'auto',
              marginRight: '16px',
              color: '#666',
              fontSize: '14px'
            }}
          >
            返回
          </Button>
          
          <PlatformIcon customerId={customerData.id} />
          
          <h1 style={{
            margin: 0,
            fontSize: '24px',
            fontWeight: '600',
            color: '#262626',
            lineHeight: '32px'
          }}>
            {customerData.name}
          </h1>
        </div>

        {/* 右侧：操作按钮 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Space size="middle">
            {onToggleFavorite && (
              <Button
                type="text"
                icon={isFavorite ? <StarFilled /> : <StarOutlined />}
                onClick={onToggleFavorite}
                style={{
                  color: isFavorite ? '#faad14' : '#666',
                  padding: '4px 8px'
                }}
                title={isFavorite ? '取消关注' : '添加关注'}
              />
            )}
            
            <Button
              type="text"
              icon={<FileTextOutlined />}
              onClick={onViewContract}
              style={{
                color: '#666',
                padding: '4px 8px'
              }}
              title="查看合同"
            >
              查看合同
            </Button>
            
            <Button
              type="text"
              icon={<ShareAltOutlined />}
              onClick={onShare}
              style={{
                color: '#666',
                padding: '4px 8px'
              }}
              title="分享"
            >
              分享
            </Button>
          </Space>
        </div>
      </div>

      {/* 核心信息标签栏 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px 24px 20px 24px',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        {/* 健康状态标签 - 统一样式，可点击进入公司详情 */}
        <Tag
          style={{
            backgroundColor: healthConfig.color,
            color: '#fff',
            border: 'none',
            borderRadius: '16px',
            padding: '4px 12px',
            fontSize: '13px',
            fontWeight: '500',
            margin: 0,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onClick={() => {
            // 点击健康度标签进入公司详情页面
            window.open(`/profiles/company/${customerData.id}`, '_blank');
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          {healthConfig.text}
        </Tag>

        {/* 客户定级标签 */}
        <Tag
          style={{
            backgroundColor: '#f5f5f5',
            color: '#666',
            border: 'none',
            borderRadius: '16px',
            padding: '4px 12px',
            fontSize: '13px',
            margin: 0
          }}
        >
          {tierConfig.text}
        </Tag>

        {/* ARR 核心商业指标 - 统一样式 */}
        <Tag
          style={{
            backgroundColor: '#f5f5f5',
            color: '#666',
            border: 'none',
            borderRadius: '16px',
            padding: '4px 12px',
            fontSize: '13px',
            margin: 0
          }}
        >
          <DollarOutlined style={{ marginRight: '4px', fontSize: '10px' }} />
          ARR: {formatARR(customerData.arr)}
        </Tag>

        {/* 续约倒计时 - 统一样式 */}
        <Tag
          style={{
            backgroundColor: '#f5f5f5',
            color: '#666',
            border: 'none',
            borderRadius: '16px',
            padding: '4px 12px',
            fontSize: '13px',
            margin: 0
          }}
        >
          <ClockCircleOutlined style={{ marginRight: '4px', fontSize: '10px' }} />
          将于 {customerData.renewalDate} 续约 (剩 {remainingDays} 天)
        </Tag>

        {/* 关系热度指标 - 统一样式 */}
        <Tag
          style={{
            backgroundColor: contactHeat.color,
            color: '#fff',
            border: 'none',
            borderRadius: '16px',
            padding: '2px 8px',
            fontSize: '12px',
            fontWeight: '500',
            margin: 0
          }}
        >
          <MessageOutlined style={{ marginRight: '4px', fontSize: '10px' }} />
          上次接触: {customerData.lastContactDays}天前
        </Tag>
      </div>
      
      {/* 合同编号 - 右下角显示，居中对齐 */}
      {customerData.contractNumber && (
        <div style={{
          position: 'absolute',
          right: '24px',
          bottom: '16px',
          fontSize: '12px',
          color: '#8c8c8c',
          display: 'flex',
          alignItems: 'center'
        }}>
          合同编号：<span style={{ fontFamily: 'monospace', marginLeft: '4px' }}>{customerData.contractNumber}</span>
        </div>
      )}
    </div>
  );
};

export default ContinuousServiceHeader;