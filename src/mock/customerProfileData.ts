import { CustomerProfile, LifecycleStage, HealthLevel, CustomerTier, HealthTrend } from '../types/customerProfile';

// 模拟客户档案数据
export const mockCustomerProfiles: CustomerProfile[] = [
  {
    id: 'CUST-0001',
    customerName: '北京科技创新有限公司',
    lifecycleStage: 'continuous_service',
    csmName: '张伟',
    healthScore: 85,
    healthTrend: 'up',
    contractAmount: 500000,
    serviceExpiryDate: '2024-12-31',
    customerTier: 'A',
    customerScale: 'mid_market',
    healthLevel: 'healthy',
    industry: '科技',
    region: '华北',
    createdAt: '2024-01-15 10:00:00',
    updatedAt: '2024-01-20 14:30:00',
    isFavorite: true
  },
  {
    id: 'CUST-0002',
    customerName: '上海智能制造集团',
    lifecycleStage: 'renewal_management',
    csmName: '李明',
    healthScore: 72,
    healthTrend: 'down',
    contractAmount: 800000,
    serviceExpiryDate: '2024-03-15',
    customerTier: 'S',
    customerScale: 'key_account',
    healthLevel: 'warning',
    industry: '制造业',
    region: '华东',
    createdAt: '2023-12-10 09:15:00',
    updatedAt: '2024-01-18 16:45:00',
    isFavorite: false
  },
  {
    id: 'CUST-0003',
    customerName: '深圳金融科技有限公司',
    lifecycleStage: 'handover_implementation',
    csmName: '王芳',
    healthScore: 90,
    healthTrend: 'up',
    contractAmount: 1200000,
    serviceExpiryDate: '2025-06-30',
    customerTier: 'S',
    customerScale: 'key_account',
    healthLevel: 'healthy',
    industry: '金融',
    region: '华南',
    createdAt: '2024-01-20 11:30:00',
    updatedAt: '2024-01-22 09:20:00',
    isFavorite: true
  },
  {
    id: 'CUST-0004',
    customerName: '广州教育科技股份有限公司',
    lifecycleStage: 'continuous_service',
    csmName: '刘强',
    healthScore: 78,
    healthTrend: 'stable',
    contractAmount: 350000,
    serviceExpiryDate: '2024-09-20',
    customerTier: 'A',
    customerScale: 'mid_market',
    healthLevel: 'healthy',
    industry: '教育',
    region: '华南',
    createdAt: '2023-11-05 14:20:00',
    updatedAt: '2024-01-19 11:10:00',
    isFavorite: false
  },
  {
    id: 'CUST-0005',
    customerName: '杭州电商平台有限公司',
    lifecycleStage: 'recall_incubation',
    csmName: '陈静',
    healthScore: 45,
    healthTrend: 'down',
    contractAmount: 200000,
    serviceExpiryDate: '2024-02-28',
    customerTier: 'B',
    customerScale: 'smb',
    healthLevel: 'risk',
    industry: '电商',
    region: '华东',
    createdAt: '2023-08-15 16:45:00',
    updatedAt: '2024-01-21 13:25:00',
    isFavorite: true
  },
  {
    id: 'CUST-0006',
    customerName: '成都软件开发有限公司',
    lifecycleStage: 'handover_implementation',
    csmName: '赵磊',
    healthScore: 88,
    healthTrend: 'up',
    contractAmount: 450000,
    serviceExpiryDate: '2024-11-15',
    customerTier: 'A',
    customerScale: 'mid_market',
    healthLevel: 'healthy',
    industry: '软件',
    region: '西南',
    createdAt: '2024-01-10 08:30:00',
    updatedAt: '2024-01-23 15:40:00',
    isFavorite: false
  },
  {
    id: 'CUST-0007',
    customerName: '武汉医疗器械有限公司',
    lifecycleStage: 'continuous_service',
    csmName: '孙丽',
    healthScore: 82,
    healthTrend: 'up',
    contractAmount: 600000,
    serviceExpiryDate: '2024-08-10',
    customerTier: 'A',
    customerScale: 'mid_market',
    healthLevel: 'healthy',
    industry: '医疗',
    region: '华中',
    createdAt: '2023-10-20 12:15:00',
    updatedAt: '2024-01-17 10:30:00',
    isFavorite: false
  },
  {
    id: 'CUST-0008',
    customerName: '天津物流科技集团',
    lifecycleStage: 'renewal_management',
    csmName: '周华',
    healthScore: 65,
    healthTrend: 'down',
    contractAmount: 750000,
    serviceExpiryDate: '2024-04-30',
    customerTier: 'S',
    customerScale: 'key_account',
    healthLevel: 'warning',
    industry: '物流',
    region: '华北',
    createdAt: '2023-09-12 09:45:00',
    updatedAt: '2024-01-16 14:20:00',
    isFavorite: true
  },
  {
    id: 'CUST-0009',
    customerName: '南京新能源科技有限公司',
    lifecycleStage: 'continuous_service',
    csmName: '吴敏',
    healthScore: 91,
    healthTrend: 'up',
    contractAmount: 900000,
    serviceExpiryDate: '2024-10-25',
    customerTier: 'S',
    customerScale: 'key_account',
    healthLevel: 'healthy',
    industry: '新能源',
    region: '华东',
    createdAt: '2023-12-01 11:00:00',
    updatedAt: '2024-01-24 16:15:00',
    isFavorite: false
  },
  {
    id: 'CUST-0010',
    customerName: '西安航空航天有限公司',
    lifecycleStage: 'handover_implementation',
    csmName: '郑涛',
    healthScore: 76,
    healthTrend: 'stable',
    contractAmount: 1100000,
    serviceExpiryDate: '2025-01-20',
    customerTier: 'S',
    customerScale: 'key_account',
    healthLevel: 'healthy',
    industry: '航空航天',
    region: '西北',
    createdAt: '2024-01-08 13:20:00',
    updatedAt: '2024-01-25 12:45:00',
    isFavorite: false
  },
  {
    id: 'CUST-0011',
    customerName: '青岛海洋科技有限公司',
    lifecycleStage: 'recall_incubation',
    csmName: '马超',
    healthScore: 38,
    healthTrend: 'down',
    contractAmount: 180000,
    serviceExpiryDate: '2024-01-31',
    customerTier: 'C',
    customerScale: 'smb',
    healthLevel: 'risk',
    industry: '海洋科技',
    region: '华东',
    createdAt: '2023-07-20 15:30:00',
    updatedAt: '2024-01-15 09:10:00',
    isFavorite: false
  },
  {
    id: 'CUST-0012',
    customerName: '重庆智慧城市建设有限公司',
    lifecycleStage: 'renewal_management',
    csmName: '林雪',
    healthScore: 69,
    healthTrend: 'stable',
    contractAmount: 650000,
    serviceExpiryDate: '2024-05-15',
    customerTier: 'A',
    customerScale: 'mid_market',
    healthLevel: 'warning',
    industry: '智慧城市',
    region: '西南',
    createdAt: '2023-11-18 10:45:00',
    updatedAt: '2024-01-22 17:30:00',
    isFavorite: false
  }
];

// 获取筛选后的客户档案数据
export const getFilteredCustomerProfiles = (filters: {
  lifecycleStage?: string;
  healthLevel?: string;
  customerTier?: string;
  searchKeyword?: string;
  showFavoriteOnly?: boolean;
}) => {
  return mockCustomerProfiles.filter(profile => {
    // 生命周期阶段筛选
    if (filters.lifecycleStage && filters.lifecycleStage !== 'all') {
      if (profile.lifecycleStage !== filters.lifecycleStage) return false;
    }

    // 客户健康度筛选
    if (filters.healthLevel && filters.healthLevel !== 'all') {
      if (profile.healthLevel !== filters.healthLevel) return false;
    }

    // 客户分层筛选
    if (filters.customerTier && filters.customerTier !== 'all') {
      if (profile.customerTier !== filters.customerTier) return false;
    }

    // 搜索关键词筛选
    if (filters.searchKeyword && filters.searchKeyword.trim()) {
      const keyword = filters.searchKeyword.toLowerCase();
      if (!profile.customerName.toLowerCase().includes(keyword)) return false;
    }

    // 关注企业筛选
    if (filters.showFavoriteOnly) {
      if (!profile.isFavorite) return false;
    }

    return true;
  });
};