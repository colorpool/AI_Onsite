// Tab 相关类型已移除，直接使用 Ant Design Pro 的路由系统

export interface CustomerProfile {
  id: string;
  name: string;
  type: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail?: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardMetrics {
  totalCustomers: number;
  activeCustomers: number;
  pendingHandovers: number;
  renewalRate: number;
  satisfactionScore: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}
