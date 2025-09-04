import React from 'react';
import { Button, Space, Tag, Avatar } from 'antd';
import { 
  ArrowLeftOutlined, 
  EditOutlined, 
  FileTextOutlined,
  ShareAltOutlined
} from '@ant-design/icons';
import { CustomerHandover } from '../../types/handover';

interface HandoverDetailHeaderProps {
  handoverData: CustomerHandover;
  onBack: () => void;
  onEdit: () => void;
  onViewContract: () => void;
  onShare: () => void;
}

// 平台图标组件 - 使用钉钉风格
const PlatformIcon = () => (
  <div style={{
    width: 24,
    height: 24,
    backgroundColor: '#1677ff',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '12px',
    fontWeight: 'bold',
    marginRight: '12px'
  }}>
    钉
  </div>
);

const HandoverDetailHeader: React.FC<HandoverDetailHeaderProps> = ({
  handoverData,
  onBack,
  onEdit,
  onViewContract,
  onShare
}) => {
  // 状态颜色映射
  const getStatusConfig = (status: string) => {
    const configs = {
      'normal': { color: '#52c41a', text: '正常交接' },
      'not_handover': { color: '#faad14', text: '未交接' },
      'risk': { color: '#ff4d4f', text: '有风险' }
    };
    return configs[status as keyof typeof configs] || { color: '#d9d9d9', text: '未知' };
  };

  const statusConfig = getStatusConfig(handoverData.handoverStatus);

  // 计算档案完整度（示例逻辑）
  const calculateCompleteness = () => {
    let score = 0;
    if (handoverData.stakeholders && handoverData.stakeholders.length > 0) score += 30;
    if (handoverData.crmData) score += 25;
    if (handoverData.onboardingTasks && handoverData.onboardingTasks.length > 0) score += 25;
    if (handoverData.expectationAlignment === 'aligned') score += 20;
    return score;
  };

  const completeness = calculateCompleteness();

  // 计算续约次数（示例数据）
  const renewalCount = 2;

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
          
          <PlatformIcon />
          
          <h1 style={{
            margin: 0,
            fontSize: '24px',
            fontWeight: '600',
            color: '#262626',
            lineHeight: '32px'
          }}>
            {handoverData.customerName}
          </h1>
        </div>

        {/* 右侧：销售来源信息 + 操作按钮 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{
            color: '#666',
            fontSize: '14px'
          }}>
            {handoverData.crmData?.salesSource === 'direct' 
              ? `销售: ${handoverData.crmData?.salesPerson || '未知'}`
              : handoverData.crmData?.salesSource === 'channel' 
                ? `渠道: ${handoverData.crmData?.channelPartner || '未知'}`
                : '销售: 未知'
            }
          </span>
          
          <Space size="middle">
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
            />
            
            <Button
              type="text"
              icon={<ShareAltOutlined />}
              onClick={onShare}
              style={{
                color: '#666',
                padding: '4px 8px'
              }}
              title="分享"
            />
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
        {/* 交接状态标签 */}
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

        {/* 档案完整度标签 */}
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
          档案完整度: {completeness}%
        </Tag>

        {/* 服务周期标签 */}
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
          服务期: {handoverData.crmData?.servicePeriod || '2024-01-01 至 2024-12-31'}
        </Tag>

        {/* 客户身份标签 */}
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
          续约{renewalCount}次
        </Tag>

        {/* 编号：状态栏内部右侧垂直居中 */}
        <div style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', color: '#8c8c8c', fontSize: 12 }}>
          交接单编号：<span style={{ fontFamily: 'monospace' }}>{handoverData.handoverNumber}</span>
        </div>
      </div>


    </div>
  );
};

export default HandoverDetailHeader;
