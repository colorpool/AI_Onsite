import React, { useState, useEffect, useMemo } from 'react';
import {
  Layout,
  Tabs,
  Typography,
  Space,
  message,
} from 'antd';
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

  // 生成模拟数据
  const generateMockData = (): BaseCustomer[] => {
    const industries = ['制造业', '金融', '零售', '医疗', '教育', '政府'];
    const sizes = ['small', 'medium', 'large', 'xlarge'];
    const lifecycles = ['import', 'growth', 'mature', 'decline'];
    const regions = ['华北', '华东', '华南', '华中', '西南', '西北', '东北'];
    const csms = ['张三', '李四', '王五', '赵六', '钱七', '孙八'];
    const riskLevels = ['safe', 'attention', 'risk'];
    const channelTypes = ['direct', 'partner', 'reseller'];
    const tags = [
      '医院生态', '零售生态', 'ISV合作伙伴', '系统集成商', '代理商',
      '战略客户', '标杆客户', '创新试点', '数字化转型', '云原生'
    ];

    const mockCustomers: BaseCustomer[] = [];
    
    for (let i = 1; i <= 500; i++) {
      const industry = industries[Math.floor(Math.random() * industries.length)];
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const lifecycle = lifecycles[Math.floor(Math.random() * lifecycles.length)];
      const region = regions[Math.floor(Math.random() * regions.length)];
      const csm = csms[Math.floor(Math.random() * csms.length)];
      const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];
      const channelType = channelTypes[Math.floor(Math.random() * channelTypes.length)];
      const isChannelCustomer = Math.random() > 0.6;
      const isKeyAccount = Math.random() > 0.8;
      const isInRenewalWindow = Math.random() > 0.7;
      
      const customerTags: string[] = [];
      const tagCount = Math.floor(Math.random() * 4) + 1;
      for (let j = 0; j < tagCount; j++) {
        const tag = tags[Math.floor(Math.random() * tags.length)];
        if (!customerTags.includes(tag)) {
          customerTags.push(tag);
        }
      }
      
      const arr = Math.floor(Math.random() * 1000000) + 50000;
      const valueScore = Math.floor(Math.random() * 100) + 1;
      const healthScore = Math.floor(Math.random() * 100) + 1;
      const rScore = Math.floor(Math.random() * 100) + 1;
      const fScore = Math.floor(Math.random() * 100) + 1;
      const mScore = Math.floor(Math.random() * 100) + 1;
      
      const signDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
        .toISOString().split('T')[0];
      
      const visits90Days = Math.floor(Math.random() * 20);
      const revenue90Days = Math.floor(Math.random() * 100000);
      const collaborationEvents = Math.floor(Math.random() * 30);
      
      const insights = [];
      const insightCount = Math.floor(Math.random() * 5);
      for (let k = 0; k < insightCount; k++) {
        insights.push({
          id: `insight-${i}-${k}`,
          content: `客户洞察内容 ${k + 1}`,
          date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          type: ['会议', '邮件', '电话', '现场拜访'][Math.floor(Math.random() * 4)],
        });
      }
      
      const nextAction = Math.random() > 0.5 ? {
        content: ['跟进续约', '产品演示', '商务谈判', '技术支持'][Math.floor(Math.random() * 4)],
        dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        overdue: Math.random() > 0.8,
      } : undefined;
      
      mockCustomers.push({
        id: `customer-${i}`,
        name: `客户${i}`,
        industry,
        size: size as 'small' | 'medium' | 'large' | 'xlarge',
        csm,
        region,
        isChannelCustomer,
        arr,
        valueScore,
        lifecycle: lifecycle as 'import' | 'growth' | 'mature' | 'decline',
        healthScore,
        rScore,
        fScore,
        mScore,
        riskLevel: riskLevel as 'safe' | 'attention' | 'risk',
        signDate,
        tags: customerTags,
        collaborationEvents,
        channelType: channelType as 'direct' | 'partner' | 'reseller',
        isKeyAccount,
        isInRenewalWindow,
        visits90Days,
        revenue90Days,
        insights,
        nextAction,
      });
    }
    
    return mockCustomers;
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
    
    // 模拟环比变化 - 客户数变化应该是整数
    const generateCustomerChange = () => Math.floor((Math.random() - 0.5) * 20);
    const generatePercentageChange = () => (Math.random() - 0.5) * 20;
    const getChangeType = (change: number): 'increase' | 'decrease' | 'stable' => {
      if (change > 2) return 'increase';
      if (change < -2) return 'decrease';
      return 'stable';
    };
    
    const totalChange = generateCustomerChange();
    const highValueChange = generateCustomerChange();
    const newSignupsChange = generateCustomerChange();
    const riskChange = generateCustomerChange();
    const arrChange = generatePercentageChange();
    const grrChange = generatePercentageChange();
    const nrrChange = generatePercentageChange();
    
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
      setCustomers(generateMockData());
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
          customers={filteredCustomers.map(c => ({
            ...c,
            logoColor: '#1890ff',
            trend: 'up' as const,
            valueTier: c.valueScore >= 80 ? '高价值' : c.valueScore >= 50 ? '中价值' : '低价值' as const,
            rAndM: c.rScore + c.mScore,
            f: c.fScore,
            serviceScore: Math.floor(Math.random() * 100),
            riskEvents: Math.floor(Math.random() * 10),
            upsellAmount: Math.floor(Math.random() * 100000),
            lifecycle: c.lifecycle === 'import' ? '导入期' : 
                      c.lifecycle === 'growth' ? '成长期' : 
                      c.lifecycle === 'mature' ? '成熟期' : '衰退期' as const
          }))}
          onCustomerSelect={handleCustomerClick}
        />
      ),
    },
    {
      key: 'new-customer-tiering',
      label: '新签客户分层',
      children: (
        <NewCustomerTieringTab
          customers={filteredCustomers.filter(c => c.signDate).map(c => ({
            id: c.id || `customer-${Math.random()}`,
            name: c.name || '未知客户',
            logoColor: '#52c41a',
            csm: c.csm || '未分配',
            industry: (c.industry as any) || '其他',
            customerScale: Math.floor(Math.random() * 1000) + 50,
            unitPrice: Math.floor((c.arr || 0) / 12),
            signDate: c.signDate!,
            activationRate: Math.floor(Math.random() * 100),
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
            lastVisitDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
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
            activityTrend: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
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