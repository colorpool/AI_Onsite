import React from 'react';
import CustomerDetailWithPlaybooks from '../../../components/CustomerDetailWithPlaybooks';
import { PlaybookExecution, Customer } from '../../../types/continuousService';

// 续约客户接口（从 renewal-management.tsx 复制）
interface RenewalCustomer {
  key: string;
  id: string;
  customerName: string;
  healthScore: number;
  healthLevel: '健康' | '一般' | '风险';
  contractExpiryDate: string;
  renewalAmount: number;
  daysToExpiry: number;
  status: '意向明确' | '谈判中' | '已续约' | '流失风险';
  riskReason?: string;
  opportunityPoint?: string;
  owner: string;
  lastInteraction: string;
  nextAction: string;
}

interface CustomerDetailModalProps {
  visible: boolean;
  customer: RenewalCustomer;
  onClose: () => void;
  onAction: (action: string, customerId: string) => void;
}

const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({
  visible,
  customer,
  onClose,
  onAction
}) => {
  const handleLaunchPlaybook = async (playbookId: string, customerId: string) => {
    console.log('启动剧本:', { playbookId, customerId });
    // 这里可以调用实际的剧本启动API
  };

  // 将 RenewalCustomer 转换为 Customer 对象
  const convertToCustomer = (renewalCustomer: RenewalCustomer): Customer => {
    return {
      id: renewalCustomer.id,
      name: renewalCustomer.customerName,
      industry: '互联网', // 默认值
      scale: '大型企业', // 默认值
      csm: renewalCustomer.owner,
      arr: renewalCustomer.renewalAmount,
      healthScore: renewalCustomer.healthScore,
      healthLevel: renewalCustomer.healthLevel,
      lifecycleStage: '成熟期', // 默认值
      customerTier: 'large', // 默认值
      purchasedProducts: ['产品A', '产品B'], // 默认值
      keyContacts: [
        {
          name: '联系人',
          title: '技术负责人',
          phone: '138****8888',
          email: 'contact@company.com',
          isPrimary: true
        }
      ],
      contracts: [],
      handoverRecords: [],
      nextRenewalDate: renewalCustomer.contractExpiryDate,
      serviceExpiryDate: renewalCustomer.contractExpiryDate,
      isRenewalRisk: renewalCustomer.status === '流失风险',
      lastContactDate: renewalCustomer.lastInteraction,
      serviceRecords: [],
      todoTasks: [],
      isFavorite: false,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: new Date().toISOString()
    };
  };

  return (
    <CustomerDetailWithPlaybooks
      visible={visible}
      customer={convertToCustomer(customer)}
      recommendations={[]}
      executions={[]}
      playbooks={[]}
      onClose={onClose}
      onAction={onAction}
      onLaunchPlaybook={handleLaunchPlaybook}
      onUpdateRecommendation={async () => {}}
    />
  );
};

export default CustomerDetailModal;
