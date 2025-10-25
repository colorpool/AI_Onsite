import React from 'react';
import { Button, Space, Tag } from 'antd';
import { 
  ArrowLeftOutlined, 
  EditOutlined, 
  FileTextOutlined,
  ShareAltOutlined,
  StarOutlined,
  StarFilled,
  MessageOutlined
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
    lastContactDays?: number;
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

  // 获取接触热度配置
  const getContactHeatConfig = (days?: number) => {
    if (!days) return { color: '#d9d9d9', level: '未知' };
    if (days <= 7) {
      return { color: '#52c41a', level: '热' };
    } else if (days <= 30) {
      return { color: '#faad14', level: '温' };
    } else {
      return { color: '#ff4d4f', level: '冷' };
    }
  };

  const statusConfig = getRenewalStatusConfig(customerData.status);
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
            
            {/* 编辑按钮已隐藏 */}
            {/* <Button
              type="default"
              icon={<EditOutlined />}
              onClick={onEdit}
              style={{
                borderColor: '#d9d9d9',
                color: '#666'
              }}
            >
              编辑
            </Button> */}
            
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

      {/* 状态标签栏（与持续服务详情保持一致样式） */}
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
              backgroundColor: healthConfig.color,
              color: '#fff',
              border: 'none',
              borderRadius: '16px',
              padding: '4px 12px',
              fontSize: '13px',
              fontWeight: '500',
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

        {/* 上次接触时间标签 */}
        {customerData.lastContactDays && (
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
        )}

        {/* 合同编号：右下角显示，与持续服务详情一致 */}
        {customerData.contractNumber && (
          <div style={{ position: 'absolute', right: '24px', bottom: '16px', color: '#8c8c8c', fontSize: 12, display: 'flex', alignItems: 'center' }}>
            {numberLabel}：<span style={{ fontFamily: 'monospace', marginLeft: '4px' }}>{customerData.contractNumber}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RenewalDetailHeader;