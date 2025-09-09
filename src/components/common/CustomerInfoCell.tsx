import React from 'react';
import { getPlatformType } from '../../mock/continuousServiceData';

interface CustomerInfoCellProps {
  customerId: string;
  customerName: string;
  contractNumber?: string;
  showContract?: boolean;
}

// 平台图标组件 - 动态显示平台类型
const PlatformTag: React.FC<{ customerId: string }> = ({ customerId }) => {
  const platformType = getPlatformType(customerId);
  
  // 获取平台配置
  const getPlatformConfig = (platform: string) => {
    const configs = {
      'dingtalk': { text: '钉钉', color: '#1677ff' },
      'wechat_work': { text: '企微', color: '#07c160' },
      'feishu': { text: '飞书', color: '#00d4aa' },
      'lark': { text: 'Lark', color: '#00d4aa' },
      'dingtalk_global': { text: 'DingTalk', color: '#1677ff' },
      'standalone': { text: '独立部署', color: '#722ed1' }
    };
    return configs[platform as keyof typeof configs] || { text: '未知平台', color: '#d9d9d9' };
  };
  
  const config = getPlatformConfig(platformType);
  
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      color: '#666',
      padding: '2px 6px',
      borderRadius: '4px',
      fontSize: '11px',
      fontWeight: '500',
      marginRight: '8px'
    }}>
      {config.text}
    </span>
  );
};

const CustomerInfoCell: React.FC<CustomerInfoCellProps> = ({
  customerId,
  customerName,
  contractNumber,
  showContract = true
}) => {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <PlatformTag customerId={customerId} />
        <span style={{ fontWeight: '500', color: '#262626' }}>
          {customerName}
        </span>
      </div>
      
      {showContract && contractNumber && (
        <div style={{
          position: 'absolute',
          right: 24,
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#8c8c8c',
          fontSize: 12
        }}>
          合同编号：<span style={{ fontFamily: 'monospace' }}>{contractNumber}</span>
        </div>
      )}
    </div>
  );
};

export default CustomerInfoCell;