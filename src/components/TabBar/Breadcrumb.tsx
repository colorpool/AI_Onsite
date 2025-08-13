import React from 'react';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import { useLocation } from '@umijs/max';
import { createStyles } from 'antd-style';
import { mockAgents } from '../../mock/agentData';

const useStyles = createStyles(({ token }) => ({
  breadcrumbContainer: {
    background: '#fff',
    padding: '8px 16px',
    borderBottom: `1px solid ${token.colorBorderSecondary}`,
    fontSize: '13px',
    '& .ant-breadcrumb': {
      fontSize: '13px',
    },
    '& .ant-breadcrumb-link': {
      color: token.colorTextSecondary,
      fontSize: '13px',
    },
    '& .ant-breadcrumb-separator': {
      color: token.colorTextSecondary,
      fontSize: '13px',
    },
  },
}));

// 路由到面包屑的映射
const routeToBreadcrumbMap: Record<string, { title: string; breadcrumb: string[] }> = {
  '/ai-tools/consultant': {
    title: '实施顾问分身',
    breadcrumb: ['AI智能工具箱', '实施顾问分身'],
  },
  '/ai-tools/consultant/new': {
    title: '创建新分身',
    breadcrumb: ['AI智能工具箱', '实施顾问分身', '创建新分身'],
  },
  // 动态路由的映射会在组件中处理
};

const Breadcrumb: React.FC = () => {
  const { styles } = useStyles();
  const location = useLocation();

  const getBreadcrumbItems = () => {
    const pathname = location.pathname;
    
    // 处理动态路由
    if (pathname.includes('/ai-tools/consultant/') && pathname !== '/ai-tools/consultant' && pathname !== '/ai-tools/consultant/new') {
      // 匹配 /ai-tools/consultant/[id]/edit 或 /ai-tools/consultant/[id]/analytics
      const match = pathname.match(/\/ai-tools\/consultant\/([^\/]+)\/(edit|analytics)/);
      if (match) {
        const [, id, action] = match;
        const actionText = action === 'edit' ? '配置' : '分析';
        
        // 查找对应的Agent
        const agent = mockAgents.find(a => a.id === id);
        const agentName = agent ? agent.role : id;
        
        return [
          { title: 'AI智能工具箱' },
          { title: '实施顾问分身' },
          { title: `${agentName}${actionText}` },
        ];
      }
    }

    // 静态路由映射
    const routeConfig = routeToBreadcrumbMap[pathname];
    if (routeConfig) {
      return routeConfig.breadcrumb.map((item, index) => ({
        title: item,
      }));
    }

    // 默认返回空数组，不显示面包屑
    return [];
  };

  const breadcrumbItems = getBreadcrumbItems();

  // 如果没有面包屑项，不显示组件
  if (breadcrumbItems.length === 0) {
    return null;
  }

  return (
    <div className={styles.breadcrumbContainer}>
      <AntBreadcrumb items={breadcrumbItems} />
    </div>
  );
};

export default Breadcrumb;
