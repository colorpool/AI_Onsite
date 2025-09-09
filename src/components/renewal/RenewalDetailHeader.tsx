import React from 'react';
import { Button, Space, Tag } from 'antd';
import { 
  ArrowLeftOutlined, 
  EditOutlined, 
  FileTextOutlined,
  ShareAltOutlined,
  StarOutlined,
  StarFilled
} from '@ant-design/icons';
import { getPlatformType } from '../../mock/continuousServiceData';

interface RenewalDetailHeaderProps {
  customerData: {
    id: string;
    name: string;
    contractNumber?: string;
    healthScore?: number;
    renewalAmount?: number;
    expiryDate?: string;
    status?: string;
  };
  onBack: () => void;
  onEdit: () => void;
  onViewContract: () => void;
  onShare: () => void;
  numberLabel?: string;
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

const RenewalDetailHeader: React.FC<RenewalDetailHeaderProps> = ({
  customerData,
  onBack,
  onEdit,
  onViewContract,
  onShare,
  numberLabel = '合同编号',
  isFavorite = false,
  onToggleFavorite
}) => {
  // 健康分状态配置
  const getHealthScoreConfig = (score?: number) => {
    if (!score) return { color: '#d9d9d9', text: '未评分' };
    if (score >= 80) return { color: '#52c41a', text: '健康' };
    if (score >= 60) return { color: '#faad14', text: '一般' };
    return { color: '#ff4d4f', text: '风险' };
  };

  const healthConfig = getHealthScoreConfig(customerData.healthScore);

  // 续约状态配置
  const getRenewalStatusConfig = (status?: string) => {
    const configs = {
      'active': { color: '#52c41a', text: '正常续约' },
      'at_risk': { color: '#ff4d4f', text: '续约风险' },
      'negotiating': { color: '#faad14', text: '协商中' },
      'pending': { color: '#1890ff', text: '待续约' }
    };
    return configs[status as keyof typeof configs] || { color: '#d9d9d9', text: '未知状态' };
  };

  const statusConfig = getRenewalStatusConfig(customerData.status);

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

        {/* 右侧：续约金额信息 + 操作按钮 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {customerData.renewalAmount && (
            <span style={{
              color: '#666',
              fontSize: '14px'
            }}>
              续约金额: ¥{customerData.renewalAmount.toLocaleString()}
            </span>
          )}
          
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
              type="default"
              icon={<EditOutlined />}
              onClick={onEdit}
              style={{
                borderColor: '#d9d9d9',
                color: '#666'
              }}
            >
              编辑
            </Button>
            
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

      {/* 状态标签栏 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px 24px 20px 24px',
        gap: '16px',
        flexWrap: 'wrap',
        position: 'relative'
      }}>
        {/* 续约状态标签 */}
        <Tag
          style={{
            backgroundColor: statusConfig.color,
            color: '#fff',
            border: 'none',
            borderRadius: '16px',
            padding: '4px 12px',
            fontSize: '13px',
            fontWeight: '500',
            margin: 0
          }}
        >
          {statusConfig.text}
        </Tag>

        {/* 健康分标签 */}
        {customerData.healthScore && (
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
            健康分: {customerData.healthScore}
          </Tag>
        )}

        {/* 到期时间标签 */}
        {customerData.expiryDate && (
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
            到期时间: {customerData.expiryDate}
          </Tag>
        )}

        {/* 合同编号：状态栏内部右侧垂直居中 */}
        {customerData.contractNumber && (
          <div style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', color: '#8c8c8c', fontSize: 12 }}>
            {numberLabel}：<span style={{ fontFamily: 'monospace' }}>{customerData.contractNumber}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RenewalDetailHeader;