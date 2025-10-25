import React from 'react';
import { Button, Space, Tag } from 'antd';
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
import { CustomerScale, CUSTOMER_SCALE_CONFIG, getCustomerScaleByARR } from '@/types/customerProfile';

interface ContinuousServiceDetailHeaderProps {
  customerData: {
    id: string;
    name: string;
    healthLevel: 'healthy' | 'normal' | 'risk';
    customerTier: 'strategic' | 'large' | 'medium';
    customerScale?: CustomerScale;
    arr: number;
    renewalDate: string;
    lastContactDays: number;
    contractNumber?: string;
    connectionLevel?: number;
  };
  onBack: () => void;
  onViewContract: () => void;
  onShare: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

const PlatformIcon: React.FC<{ customerId: string }> = ({ customerId }) => {
  const platformType = getPlatformType(customerId);
  
  const getPlatformConfig = (type: string) => {
    switch (type) {
      case 'dingtalk':
        return { color: '#1677ff', text: '钉' };
      case 'wechat_work':
        return { color: '#07c160', text: '企' };
      case 'feishu':
        return { color: '#00d4aa', text: '飞' };
      case 'lark':
        return { color: '#00d4aa', text: 'L' };
      case 'dingtalk_global':
        return { color: '#1677ff', text: 'D' };
      case 'standalone':
        return { color: '#722ed1', text: '独' };
      default:
        return { color: '#d9d9d9', text: '未' };
    }
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

const ContinuousServiceDetailHeader: React.FC<ContinuousServiceDetailHeaderProps> = ({
  customerData,
  onBack,
  onViewContract,
  onShare,
  isFavorite = false,
  onToggleFavorite
}) => {
  // 健康状态配置
  const getHealthConfig = (healthLevel: string) => {
    switch (healthLevel) {
      case 'healthy': return { color: '#52c41a', text: '健康' };
      case 'normal': return { color: '#faad14', text: '正常' };
      case 'risk': return { color: '#ff4d4f', text: '风险' };
      default: return { color: '#8c8c8c', text: '未知' };
    }
  };

  // 客户定级配置
  const getTierConfig = (tier: string) => {
    switch (tier) {
      case 'strategic': return { color: '#722ed1', text: '战略客户' };
      case 'large': return { color: '#1890ff', text: '大客户' };
      case 'medium': return { color: '#52c41a', text: '中等客户' };
      default: return { color: '#8c8c8c', text: '普通客户' };
    }
  };

  // 计算续约剩余天数
  const calculateRemainingDays = (renewalDate: string) => {
    const today = new Date();
    const renewal = new Date(renewalDate);
    const diffTime = renewal.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // 格式化ARR金额
  const formatARR = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}K`;
    }
    return amount.toString();
  };

  // 获取联系热度配置
  const getContactHeatConfig = (days: number) => {
    if (days <= 7) return { color: '#52c41a', text: '热' };
    if (days <= 30) return { color: '#faad14', text: '温' };
    return { color: '#ff4d4f', text: '冷' };
  };

  // 获取连接等级配置
  const getConnectionLevelConfig = (level: number) => {
    const getSignalConfig = (level: number) => {
      if (level >= 5) {
        return { bars: 5, color: '#52c41a', text: '极强' };
      } else if (level >= 4) {
        return { bars: 4, color: '#73d13d', text: '强' };
      } else if (level >= 3) {
        return { bars: 3, color: '#faad14', text: '中' };
      } else if (level >= 2) {
        return { bars: 2, color: '#ff7a45', text: '弱' };
      } else if (level >= 1) {
        return { bars: 1, color: '#ff4d4f', text: '极弱' };
      } else {
        return { bars: 0, color: '#d9d9d9', text: '未知' };
      }
    };
    
    const config = getSignalConfig(level || 0);
    
    return {
      color: config.color,
      text: config.text,
      icon: (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1px' }}>
          {[1, 2, 3, 4, 5].map(bar => (
            <div
              key={bar}
              style={{
                width: '3px',
                height: `${6 + bar * 1.5}px`,
                backgroundColor: bar <= config.bars ? config.color : '#f0f0f0',
                borderRadius: '1px',
                transition: 'all 0.2s ease'
              }}
            />
          ))}
        </div>
      )
    };
  };

  const healthConfig = getHealthConfig(customerData.healthLevel);
  const tierConfig = getTierConfig(customerData.customerTier);
  const remainingDays = calculateRemainingDays(customerData.renewalDate);
  const contactHeat = getContactHeatConfig(customerData.lastContactDays);
  
  // 获取客户规模标签配置
  const customerScale = customerData.customerScale || getCustomerScaleByARR(customerData.arr);
  const scaleConfig = CUSTOMER_SCALE_CONFIG[customerScale];

  return (
    <div style={{ 
      backgroundColor: '#fff', 
      borderRadius: '8px', 
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      border: '1px solid #f0f0f0',
      position: 'relative',
      marginBottom: '24px'
    }}>
      {/* 顶部操作栏 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 24px 16px 24px',
        borderBottom: '1px solid #f0f0f0'
      }}>
        {/* 左侧：返回按钮 + 平台标识 + 客户名称 + 连接等级 */}
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
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: '600',
              color: '#262626',
              lineHeight: '32px'
            }}>
              {customerData.name}
            </h1>
            
            {/* 连接等级指示器 */}
            {customerData.connectionLevel && (() => {
              const connectionConfig = getConnectionLevelConfig(customerData.connectionLevel);
              return (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  {connectionConfig.icon}
                </div>
              );
            })()}
          </div>
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
              >
                {isFavorite ? '取消关注' : '关注'}
              </Button>
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

      {/* 客户分层标签行 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 24px',
        backgroundColor: '#fafafa',
        borderBottom: '1px solid #f0f0f0',
        gap: '12px'
      }}>
        {/* 客户规模标签 */}
        <Tag color={scaleConfig.color}>
          {scaleConfig.text}
        </Tag>
        
        {/* 客户定级标签 */}
        <Tag color={tierConfig.color === '#722ed1' ? 'purple' : tierConfig.color === '#1890ff' ? 'blue' : 'green'}>
          {tierConfig.text}
        </Tag>
      </div>

      {/* 底部标签区域 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px 24px 20px 24px',
        gap: '12px',
        flexWrap: 'wrap',
        position: 'relative'
      }}>
        {/* 健康状态标签 */}
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
            cursor: 'pointer'
          }}
          onClick={() => {
            window.open(`/profiles/company/${customerData.id}`, '_blank');
          }}
        >
          {healthConfig.text}
        </Tag>

        {/* ARR 核心商业指标 */}
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

        {/* 续约时间标签 */}
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

        {/* 最后接触时间标签 */}
        <Tag
          style={{
            backgroundColor: contactHeat.color,
            color: '#fff',
            border: 'none',
            borderRadius: '16px',
            padding: '4px 12px',
            fontSize: '13px',
            fontWeight: '500',
            margin: 0
          }}
        >
          <MessageOutlined style={{ marginRight: '4px', fontSize: '10px' }} />
          上次接触: {customerData.lastContactDays}天前
        </Tag>

        {/* 合同编号 - 右侧绝对定位 */}
        {customerData.contractNumber && (
          <div style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', color: '#8c8c8c', fontSize: 12 }}>
            合同编号：<span style={{ fontFamily: 'monospace' }}>{customerData.contractNumber}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContinuousServiceDetailHeader;