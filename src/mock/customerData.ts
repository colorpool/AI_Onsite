// 统一的客户mock数据源
// 包含不同生命周期的完整客户档案

export interface UnifiedCustomer {
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
  // 价值×生命周期专用字段
  logoColor?: string;
  trend?: 'up' | 'down' | 'flat';
  valueTier?: '高价值' | '中价值' | '低价值';
  rAndM?: number;
  f?: number;
  serviceScore?: number;
  riskEvents?: number;
  upsellAmount?: number;
}

// 生成统一的客户mock数据
export const generateUnifiedCustomerData = (): UnifiedCustomer[] => {
  const industries = ['制造业', '金融', '零售', '医疗', '教育', '政府', '科技', '房地产', '物流', '能源'];
  const sizes = ['small', 'medium', 'large', 'xlarge'] as const;
  const lifecycles = ['import', 'growth', 'mature', 'decline'] as const;
  const regions = ['华北', '华东', '华南', '华中', '西南', '西北', '东北'];
  const csms = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十'];
  const riskLevels = ['safe', 'attention', 'risk'] as const;
  const channelTypes = ['direct', 'partner', 'reseller'] as const;
  const tags = [
    '医院生态', '零售生态', 'ISV合作伙伴', '系统集成商', '代理商',
    '战略客户', '标杆客户', '创新试点', '数字化转型', '云原生',
    '高增长', '稳定客户', '重点关注', '续约风险', '扩展机会'
  ];
  
  const companyNames = [
    '阿里巴巴集团', '腾讯科技', '字节跳动', '美团点评', '滴滴出行', '小米科技', '百度集团', '网易公司',
    '京东科技', '拼多多', '哔哩哔哩', '快手科技', '携程旅行', '小红书', '华为云', 'OPPO', 'vivo',
    '海尔智家', '隆基绿能', '比亚迪', '蔚来汽车', '理想汽车', '小鹏汽车', '同程旅行', '去哪儿',
    '中国平安', '招商银行', '工商银行', '建设银行', '中国银行', '农业银行', '交通银行', '浦发银行',
    '万科集团', '恒大集团', '碧桂园', '保利发展', '中海地产', '华润置地', '龙湖集团', '融创中国',
    '顺丰控股', '圆通速递', '申通快递', '韵达股份', '中通快递', '德邦物流', '京东物流', '菜鸟网络',
    '中石油', '中石化', '中海油', '国家电网', '南方电网', '华能集团', '大唐集团', '华电集团'
  ];

  const mockCustomers: UnifiedCustomer[] = [];
  
  // 确保每个生命周期都有足够的客户
  const customersPerLifecycle = Math.floor(500 / lifecycles.length);
  
  for (let lifecycleIndex = 0; lifecycleIndex < lifecycles.length; lifecycleIndex++) {
    const lifecycle = lifecycles[lifecycleIndex];
    const startIndex = lifecycleIndex * customersPerLifecycle;
    const endIndex = lifecycleIndex === lifecycles.length - 1 ? 500 : (lifecycleIndex + 1) * customersPerLifecycle;
    
    for (let i = startIndex; i < endIndex; i++) {
      const industry = industries[Math.floor(Math.random() * industries.length)];
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const region = regions[Math.floor(Math.random() * regions.length)];
      const csm = csms[Math.floor(Math.random() * csms.length)];
      const channelType = channelTypes[Math.floor(Math.random() * channelTypes.length)];
      const isChannelCustomer = Math.random() > 0.6;
      const isKeyAccount = Math.random() > 0.8;
      const isInRenewalWindow = Math.random() > 0.7;
      
      // 根据生命周期调整各项指标的分布
      let valueScore: number;
      let healthScore: number;
      let riskLevel: 'safe' | 'attention' | 'risk';
      let arr: number;
      
      switch (lifecycle) {
        case 'import':
          valueScore = Math.floor(Math.random() * 40) + 30; // 30-70
          healthScore = Math.floor(Math.random() * 30) + 40; // 40-70
          riskLevel = Math.random() > 0.7 ? 'attention' : Math.random() > 0.9 ? 'risk' : 'safe';
          arr = Math.floor(Math.random() * 300000) + 50000; // 5万-35万
          break;
        case 'growth':
          valueScore = Math.floor(Math.random() * 40) + 50; // 50-90
          healthScore = Math.floor(Math.random() * 30) + 60; // 60-90
          riskLevel = Math.random() > 0.8 ? 'attention' : Math.random() > 0.95 ? 'risk' : 'safe';
          arr = Math.floor(Math.random() * 500000) + 100000; // 10万-60万
          break;
        case 'mature':
          valueScore = Math.floor(Math.random() * 30) + 60; // 60-90
          healthScore = Math.floor(Math.random() * 40) + 50; // 50-90
          riskLevel = Math.random() > 0.85 ? 'attention' : Math.random() > 0.97 ? 'risk' : 'safe';
          arr = Math.floor(Math.random() * 800000) + 200000; // 20万-100万
          break;
        case 'decline':
          valueScore = Math.floor(Math.random() * 50) + 20; // 20-70
          healthScore = Math.floor(Math.random() * 50) + 20; // 20-70
          riskLevel = Math.random() > 0.4 ? 'risk' : Math.random() > 0.7 ? 'attention' : 'safe';
          arr = Math.floor(Math.random() * 400000) + 30000; // 3万-43万
          break;
        default:
          valueScore = Math.floor(Math.random() * 100) + 1;
          healthScore = Math.floor(Math.random() * 100) + 1;
          riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];
          arr = Math.floor(Math.random() * 1000000) + 50000;
      }
      
      const rScore = Math.floor(Math.random() * 100) + 1;
      const fScore = Math.floor(Math.random() * 100) + 1;
      const mScore = Math.floor(Math.random() * 100) + 1;
      
      // 生成客户标签
      const customerTags: string[] = [];
      const tagCount = Math.floor(Math.random() * 4) + 1;
      for (let j = 0; j < tagCount; j++) {
        const tag = tags[Math.floor(Math.random() * tags.length)];
        if (!customerTags.includes(tag)) {
          customerTags.push(tag);
        }
      }
      
      const signDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
        .toISOString().split('T')[0];
      
      const visits90Days = Math.floor(Math.random() * 20);
      const revenue90Days = Math.floor(Math.random() * 100000);
      const collaborationEvents = Math.floor(Math.random() * 30);
      
      // 生成洞察数据
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
      
      // 价值×生命周期专用字段
      const logoColor = '#1890ff';
      const trend = valueScore > 75 ? 'up' : valueScore < 40 ? 'down' : 'flat' as const;
      const valueTier = valueScore >= 80 ? '高价值' : valueScore >= 50 ? '中价值' : '低价值' as const;
      const rAndM = rScore + mScore;
      const f = fScore;
      const serviceScore = Math.round((collaborationEvents / 30) * 100);
      const riskEvents = riskLevel === 'risk' ? Math.floor(Math.random() * 8) + 3 : 
                        riskLevel === 'attention' ? Math.floor(Math.random() * 3) + 1 : 
                        Math.floor(Math.random() * 2);
      const upsellAmount = revenue90Days;
      
      mockCustomers.push({
        id: `customer-${i + 1}`,
        name: companyNames[i % companyNames.length],
        industry,
        size,
        csm,
        region,
        isChannelCustomer,
        arr,
        valueScore,
        lifecycle,
        healthScore,
        rScore,
        fScore,
        mScore,
        riskLevel,
        signDate,
        tags: customerTags,
        collaborationEvents,
        channelType,
        isKeyAccount,
        isInRenewalWindow,
        visits90Days,
        revenue90Days,
        insights,
        nextAction,
        // 价值×生命周期专用字段
        logoColor,
        trend,
        valueTier,
        rAndM,
        f,
        serviceScore,
        riskEvents,
        upsellAmount,
      });
    }
  }
  
  return mockCustomers;
};

// 导出统一的客户数据 - 使用固定种子确保数据一致性
let cachedCustomerData: UnifiedCustomer[] | null = null;

export const unifiedCustomerData = (() => {
  if (cachedCustomerData) {
    return cachedCustomerData;
  }
  
  // 使用固定种子生成一致的数据
  const originalRandom = Math.random;
  let seed = 12345; // 固定种子
  Math.random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  
  cachedCustomerData = generateUnifiedCustomerData();
  
  // 恢复原始随机函数
  Math.random = originalRandom;
  
  return cachedCustomerData;
})();