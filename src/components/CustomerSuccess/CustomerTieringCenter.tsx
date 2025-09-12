import React, { useState, useEffect, useMemo } from 'react';
import {
  Layout,
  Tabs,
  Typography,
  Space,
  message,
} from 'antd';
import { unifiedCustomerData, UnifiedCustomer } from '../../mock/customerData';
import GlobalFilters from './GlobalFilters';
import KPISummary from './KPISummary';
import ValueLifecycleTab from './ValueLifecycleTab';
import NewCustomerTieringTab from './NewCustomerTieringTab';
import HighValueCustomerTab from './HighValueCustomerTab';
import ChannelEcosystemTab from './ChannelEcosystemTab';
import CustomerDetailDrawer from './CustomerDetailModal';
import styles from './CustomerTieringCenter.module.css';

const { Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

// 全局筛选条件接口
interface GlobalFilters {
  timeRange: 'current' | 'previous' | 'custom';
  customDateRange?: [any, any] | null;
  industries: string[];
  customerSizes: string[];
  csmOwners: string[];
  regions: string[];
  isChannelCustomer?: boolean | null;
  searchText: string;
}

// 通用客户数据接口
interface BaseCustomer {
  id: string;
  name: string;
  industry: string;
  size: 'small' | 'medium' | 'large' | 'xlarge';
  csm: string;
  region: string;
  isChannelCustomer: boolean;
  arr: number;
  valueScore: number;
  lifecycle: 'import' | 'growth' | 'mature' | 'decline';
  healthScore: number;
  rScore: number;
  fScore: number;
  mScore: number;
  riskLevel: 'safe' | 'attention' | 'risk';
  signDate?: string;
  tags: string[];
  collaborationEvents: number;
  channelType: 'direct' | 'partner' | 'reseller';
  isKeyAccount: boolean;
  isInRenewalWindow: boolean;
  visits90Days: number;
  revenue90Days: number;
  insights: Array<{
    id: string;
    content: string;
    date: string;
    type: string;
  }>;
  nextAction?: {
    content: string;
    dueDate: string;
    overdue: boolean;
  };
}

// KPI数据接口
interface KPIData {
  totalCustomers: {
    value: number;
    change: number;
    changeType: 'increase' | 'decrease' | 'stable';
  };
  highValueCustomers: {
    value: number;
    change: number;
    changeType: 'increase' | 'decrease' | 'stable';
  };
  newSignups: {
    value: number;
    change: number;
    changeType: 'increase' | 'decrease' | 'stable';
  };
  highRiskCustomers: {
    value: number;
    change: number;
    changeType: 'increase' | 'decrease' | 'stable';
  };
  currentARR: {
    value: number;
    change: number;
    changeType: 'increase' | 'decrease' | 'stable';
  };
  retentionRates: {
    grr: number;
    nrr: number;
    grrChange: number;
    nrrChange: number;
  };
}

const CustomerTieringCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('value-lifecycle');
  const [globalFilters, setGlobalFilters] = useState<GlobalFilters>({
    timeRange: 'current',
    industries: [],
    customerSizes: [],
    csmOwners: [],
    regions: [],
    searchText: '',
  });
  const [customers, setCustomers] = useState<BaseCustomer[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMatrix, setSelectedMatrix] = useState<{ valueTier: '高价值' | '中价值' | '低价值'; stage: '导入期' | '成长期' | '成熟期' | '衰退期' } | null>(null);

  // 转换统一客户数据为BaseCustomer格式
  const convertUnifiedToBaseCustomer = (unifiedCustomers: UnifiedCustomer[]): BaseCustomer[] => {
    return unifiedCustomers.map(customer => ({
      id: customer.id,
      name: customer.name,
      industry: customer.industry,
      size: customer.size,
      csm: customer.csm,
      region: customer.region,
      isChannelCustomer: customer.isChannelCustomer,
      arr: customer.arr,
      valueScore: customer.valueScore,
      lifecycle: customer.lifecycle,
      healthScore: customer.healthScore,
      rScore: customer.rScore,
      fScore: customer.fScore,
      mScore: customer.mScore,
      riskLevel: customer.riskLevel,
      signDate: customer.signDate,
      tags: customer.tags,
      collaborationEvents: customer.collaborationEvents,
      channelType: customer.channelType,
      isKeyAccount: customer.isKeyAccount,
      isInRenewalWindow: customer.isInRenewalWindow,
      visits90Days: customer.visits90Days,
      revenue90Days: customer.revenue90Days,
      insights: customer.insights,
      nextAction: customer.nextAction,
    }));
  };

  // 根据全局筛选条件过滤客户数据
  const filteredCustomers = useMemo(() => {
    let filtered = customers;
    
    // 行业筛选
    if (globalFilters.industries.length > 0) {
      filtered = filtered.filter(customer => 
        globalFilters.industries.includes(customer.industry)
      );
    }
    
    // 客户规模筛选
    if (globalFilters.customerSizes.length > 0) {
      filtered = filtered.filter(customer => 
        globalFilters.customerSizes.includes(customer.size)
      );
    }
    
    // CSM筛选
    if (globalFilters.csmOwners.length > 0) {
      filtered = filtered.filter(customer => 
        globalFilters.csmOwners.includes(customer.csm)
      );
    }
    
    // 地区筛选
    if (globalFilters.regions.length > 0) {
      filtered = filtered.filter(customer => 
        globalFilters.regions.includes(customer.region)
      );
    }
    
    // 渠道客户筛选
    if (globalFilters.isChannelCustomer !== undefined) {
      filtered = filtered.filter(customer => 
        customer.isChannelCustomer === globalFilters.isChannelCustomer
      );
    }
    
    // 搜索筛选
    if (globalFilters.searchText) {
      const searchLower = globalFilters.searchText.toLowerCase();
      filtered = filtered.filter(customer => 
        customer.name.toLowerCase().includes(searchLower) ||
        customer.id.toLowerCase().includes(searchLower)
      );
    }
    
    return filtered;
  }, [customers, globalFilters]);

  // 计算KPI数据
  const kpiData = useMemo((): KPIData => {
    const totalCustomers = filteredCustomers.length;
    const highValueCustomers = filteredCustomers.filter(c => c.valueScore >= 80).length;
    const newCustomers = filteredCustomers.filter(c => {
      if (!c.signDate) return false;
      const signDate = new Date(c.signDate);
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      return signDate >= threeMonthsAgo;
    }).length;
    const riskCustomers = filteredCustomers.filter(c => c.riskLevel === 'risk').length;
    const currentARR = filteredCustomers.reduce((sum, c) => sum + c.arr, 0);
    
    // 基于数据特征计算固定的环比变化
    const getChangeType = (change: number): 'increase' | 'decrease' | 'stable' => {
      if (change > 2) return 'increase';
      if (change < -2) return 'decrease';
      return 'stable';
    };
    
    // 基于客户数据计算固定的变化值
    const totalChange = Math.floor((filteredCustomers.length % 20) - 10); // -10 到 +9
    const highValueChange = Math.floor((highValueCustomers % 15) - 7); // -7 到 +7
    const newSignupsChange = Math.floor((newCustomers % 12) - 6); // -6 到 +5
    const riskChange = Math.floor((riskCustomers % 8) - 4); // -4 到 +3
    const arrChange = ((currentARR % 100) - 50) / 10; // -5% 到 +4.9%
    const grrChange = ((totalCustomers % 20) - 10) / 10; // -1% 到 +0.9%
    const nrrChange = ((highValueCustomers % 30) - 15) / 10; // -1.5% 到 +1.4%
    
    return {
      totalCustomers: { 
        value: totalCustomers, 
        change: totalChange,
        changeType: getChangeType(totalChange)
      },
      highValueCustomers: { 
        value: highValueCustomers, 
        change: highValueChange,
        changeType: getChangeType(highValueChange)
      },
      newSignups: { 
        value: newCustomers, 
        change: newSignupsChange,
        changeType: getChangeType(newSignupsChange)
      },
      highRiskCustomers: { 
        value: riskCustomers, 
        change: riskChange,
        changeType: getChangeType(riskChange)
      },
      currentARR: { 
        value: currentARR, 
        change: arrChange,
        changeType: getChangeType(arrChange)
      },
      retentionRates: {
        grr: 95.2,
        nrr: 108.5,
        grrChange,
        nrrChange,
      },
    };
  }, [filteredCustomers]);

  // 初始化数据
  useEffect(() => {
    setLoading(true);
    // 模拟异步加载
    setTimeout(() => {
      setCustomers(convertUnifiedToBaseCustomer(unifiedCustomerData));
      setLoading(false);
    }, 1000);
  }, []);

  // 处理全局筛选变化
  const handleFiltersChange = (filters: Partial<GlobalFilters>) => {
    setGlobalFilters(prev => ({ ...prev, ...filters }));
  };

  // 处理保存视图
  const handleSaveView = () => {
    // 这里可以实现保存视图的逻辑
    message.success('视图保存成功');
  };

  // 处理导出
  const handleExport = (data: any[]) => {
    // 这里可以实现导出逻辑
    message.success(`导出 ${data.length} 条数据`);
  };

  // 客户详情弹窗状态
  const [customerDetailVisible, setCustomerDetailVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<BaseCustomer | null>(null);

  // 处理客户点击
  const handleCustomerClick = (customer: any) => {
    setSelectedCustomer(customer);
    setCustomerDetailVisible(true);
  };

  const tabItems = [
    {
      key: 'value-lifecycle',
      label: '价值 × 生命周期',
      children: (
        <ValueLifecycleTab
          customers={filteredCustomers.map(c => {
            // 从统一数据源获取对应的完整客户数据
            const unifiedCustomer = unifiedCustomerData.find(uc => uc.id === c.id);
            return {
              ...c,
              logoColor: '#1890ff',
              trend: unifiedCustomer?.trend || (c.valueScore > 75 ? 'up' : c.valueScore < 40 ? 'down' : 'flat'),
              valueTier: c.valueScore >= 80 ? '高价值' : c.valueScore >= 50 ? '中价值' : '低价值' as const,
              rAndM: c.rScore + c.mScore,
              f: c.fScore,
              serviceScore: unifiedCustomer?.serviceScore || Math.round((c.collaborationEvents / 30) * 100),
              riskEvents: unifiedCustomer?.riskEvents || (c.riskLevel === 'risk' ? 3 : c.riskLevel === 'attention' ? 1 : 0),
              upsellAmount: unifiedCustomer?.upsellAmount || c.revenue90Days,
              lifecycle: c.lifecycle === 'import' ? '导入期' : 
                         c.lifecycle === 'growth' ? '成长期' : 
                         c.lifecycle === 'mature' ? '成熟期' : '衰退期'
            };
          })}
          onCustomerSelect={handleCustomerClick}
          selectedMatrix={selectedMatrix}
          onMatrixSelect={setSelectedMatrix}
        />
      ),
    },
    {
      key: 'new-customer-tiering',
      label: '新签客户分层',
      children: (
        <NewCustomerTieringTab
          customers={filteredCustomers.filter(c => c.signDate).map(c => ({
            id: c.id || `customer-${c.id?.slice(-4) || '0000'}`,
            name: c.name || '未知客户',
            logoColor: '#52c41a',
            csm: c.csm || '未分配',
            industry: (c.industry as any) || '其他',
            customerScale: Math.floor((c.valueScore * 10) + 50), // 基于价值分计算规模
            unitPrice: Math.floor((c.arr || 0) / 12),
            signDate: c.signDate!,
            activationRate: Math.min(95, Math.max(20, c.healthScore + (c.valueScore % 30))), // 基于健康度和价值分计算激活率
            quadrant: '领先者' as const,
            arr: c.arr || 0,
            tags: c.tags || [],
            healthScore: c.healthScore || 0,
            riskLevel: c.riskLevel || 'safe',
            lifecycle: c.lifecycle === 'import' ? '导入期' : 
                      c.lifecycle === 'growth' ? '成长期' : 
                      c.lifecycle === 'mature' ? '成熟期' : '衰退期',
            valueScore: c.valueScore || 0
          }))}
          onCustomerSelect={handleCustomerClick}
        />
      ),
    },
    {
      key: 'high-value-customer',
      label: '高价值客户洞察',
      children: (
        <HighValueCustomerTab
          customers={filteredCustomers.filter(c => c.valueScore >= 60).map(c => ({
            id: c.id,
            name: c.name,
            logoColor: '#faad14',
            csm: c.csm,
            rScore: c.rScore,
            fScore: c.fScore,
            mScore: c.mScore,
            contractAmount: c.arr,
            visits90Days: c.visits90Days,
            lastVisitDate: new Date(Date.now() - (c.visits90Days % 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 基于访问次数计算最后访问日期
            lastVisitType: '现场拜访',
            lastVisitor: c.csm,
            valueAdded90Days: c.revenue90Days,
            insights90Days: c.insights.length,
            insightsSummary: '近期客户活跃度良好，续约意向积极',
            ecoTags: c.tags,
            riskStatus: c.riskLevel === 'safe' ? '安全' : c.riskLevel === 'attention' ? '关注' : '风险' as const,
            healthScore: c.healthScore,
            nextAction: c.nextAction?.content || '跟进续约',
            actionDueDate: c.nextAction?.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            actionStatus: c.nextAction?.overdue ? '逾期' : '进行中' as const,
            isKeyAccount: c.isKeyAccount,
            isChannelCustomer: c.isChannelCustomer,
            isInRenewalWindow: c.isInRenewalWindow,
            milestones: [
              { date: '2024-01-15', event: '合同签署', status: 'completed' as const },
              { date: '2024-06-01', event: '中期评估', status: 'pending' as const }
            ],
            activityTrend: Array.from({ length: 12 }, (_, i) => Math.floor((c.healthScore + (c.valueScore % 50) + i * 5) % 100)), // 基于健康度和价值分生成趋势
            stakeholders: [
              { name: '张总', role: 'CEO', influence: 'high' as const },
              { name: '李经理', role: 'IT总监', influence: 'medium' as const }
            ]
          }))}
          onCustomerSelect={handleCustomerClick}
        />
      ),
    },
    {
      key: 'channel-ecosystem',
      label: '渠道与生态分析',
      children: (
        <ChannelEcosystemTab
          customers={filteredCustomers}
          onCustomerClick={handleCustomerClick}
          onExport={handleExport}
        />
      ),
    },
  ];

  return (
    <div style={{ 
      padding: '32px 40px',
      background: '#f5f5f5',
      minHeight: 'calc(100vh - 64px)'
    }}>
      {/* 页面标题 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <div>
          <Title level={2} style={{ margin: 0, color: '#262626' }}>客户分层盘点</Title>
          <Text type="secondary">基于价值与生命周期的客户精细化分层管理</Text>
        </div>
      </div>

      {/* 全局筛选条 */}
      <div style={{ 
        borderRadius: '14px',
        marginBottom: '16px'
      }}>
        <GlobalFilters
          filters={globalFilters}
          onFiltersChange={handleFiltersChange}
          onSaveView={handleSaveView}
          onExport={() => handleExport(filteredCustomers)}
        />
      </div>
      
      {/* KPI摘要 */}
      <div style={{ 
        marginBottom: '16px'
      }}>
        <KPISummary data={kpiData} loading={loading} />
      </div>
    
      {/* 页签内容 */}
      <div style={{ 
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        border: '1px solid #f0f0f0',
        background: '#ffffff',
        overflow: 'hidden'
      }}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          size="large"
          tabBarStyle={{
            margin: '0 24px',
            borderBottom: '1px solid #f0f0f0'
          }}
          className={styles.customTabsWithPadding}
        />
      </div>

      {/* 客户详情弹窗 */}
      <CustomerDetailDrawer
        visible={customerDetailVisible}
        customer={selectedCustomer}
        onClose={() => {
          setCustomerDetailVisible(false);
          setSelectedCustomer(null);
        }}
      />
    </div>
  );
};

export default CustomerTieringCenter;