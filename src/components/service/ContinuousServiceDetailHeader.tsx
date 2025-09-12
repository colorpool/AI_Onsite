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

interface ContinuousServiceDetailHeaderProps {
  customerData: {
    id: string;
    name: string;
    healthLevel: 'healthy' | 'normal' | 'risk';
    customerTier: 'strategic' | 'large' | 'medium';
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
    const configs = {
      'healthy': { color: '#52c41a', text: '健康' },
      'normal': { color: '#faad14', text: '一般' },
      'risk': { color: '#ff4d4f', text: '风险' }
    };
    return configs[healthLevel as keyof typeof configs] || { color: '#d9d9d9', text: '未知' };
  };

  // 客户定级配置
  const getTierConfig = (tier: string) => {
    const configs = {
      'strategic': { color: '#722ed1', text: '战略客户' },
      'large': { color: '#1890ff', text: '大客户' },
      'medium': { color: '#13c2c2', text: '中型客户' }
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

  // 获取关系热度配置
  const getContactHeatConfig = (days: number) => {
    if (days <= 7) {
      return { color: '#52c41a', level: '热' };
    } else if (days <= 30) {
      return { color: '#faad14', level: '温' };
    } else {
      return { color: '#ff4d4f', level: '冷' };
    }
  };

  // 获取建联度配置
  const getConnectionLevelConfig = (level: number) => {
    if (level >= 5) {
      return { bars: 5, color: '#52c41a', text: '极强', tooltip: '建联度极强：与客户核心决策层建立深度信任关系，沟通无障碍' };
    } else if (level >= 4) {
      return { bars: 4, color: '#73d13d', text: '强', tooltip: '建联度强：与客户关键决策人保持密切联系，沟通顺畅' };
    } else if (level >= 3) {
      return { bars: 3, color: '#faad14', text: '中', tooltip: '建联度中：与客户有一定联系，但需要加强沟通深度' };
    } else if (level >= 2) {
      return { bars: 2, color: '#ff7a45', text: '弱', tooltip: '建联度弱：与客户联系较少，需要主动建立更多接触点' };
    } else if (level >= 1) {
      return { bars: 1, color: '#ff4d4f', text: '极弱', tooltip: '建联度极弱：与客户几乎无联系，急需建立有效沟通渠道' };
    } else {
      return { bars: 0, color: '#d9d9d9', text: '未知', tooltip: '建联度未知：缺乏客户联系信息' };
    }
  };

  const healthConfig = getHealthConfig(customerData.healthLevel);
  const tierConfig = getTierConfig(customerData.customerTier);
  const remainingDays = calculateRemainingDays(customerData.renewalDate);
  const contactHeat = getContactHeatConfig(customerData.lastContactDays);

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
            
            {/* 建联度图标 */}
            {customerData.connectionLevel && (() => {
              const config = getConnectionLevelConfig(customerData.connectionLevel);
              return (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1px',
                  cursor: 'pointer'
                }}>
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

      {/* 核心信息标签栏 */}
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
            borderRadius: '4px',
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

        {/* 客户定级标签 */}
        <Tag
          style={{
            backgroundColor: '#f5f5f5',
            color: '#666',
            border: 'none',
            borderRadius: '4px',
            padding: '4px 12px',
            fontSize: '13px',
            margin: 0
          }}
        >
          {tierConfig.text}
        </Tag>

        {/* ARR 核心商业指标 */}
        <Tag
          style={{
            backgroundColor: '#f5f5f5',
            color: '#666',
            border: 'none',
            borderRadius: '4px',
            padding: '4px 12px',
            fontSize: '13px',
            margin: 0
          }}
        >
          <DollarOutlined style={{ marginRight: '4px', fontSize: '10px' }} />
          ARR: {formatARR(customerData.arr)}
        </Tag>

        {/* 续约倒计时 */}
        <Tag
          style={{
            backgroundColor: '#f5f5f5',
            color: '#666',
            border: 'none',
            borderRadius: '4px',
            padding: '4px 12px',
            fontSize: '13px',
            margin: 0
          }}
        >
          <ClockCircleOutlined style={{ marginRight: '4px', fontSize: '10px' }} />
          将于 {customerData.renewalDate} 续约 (剩 {remainingDays} 天)
        </Tag>

        {/* 关系热度指标 */}
        <Tag
          style={{
            backgroundColor: contactHeat.color,
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '4px 12px',
            fontSize: '13px',
            fontWeight: '500',
            margin: 0
          }}
        >
          <MessageOutlined style={{ marginRight: '4px', fontSize: '10px' }} />
          上次接触: {customerData.lastContactDays}天前
        </Tag>

        {/* 合同编号：状态栏内部右侧垂直居中 */}
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