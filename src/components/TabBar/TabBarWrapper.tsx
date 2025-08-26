import React, { useEffect } from 'react';
import { useLocation } from '@umijs/max';
import TabBar, { TabItem } from './index';
import { useTabManager } from '@/contexts/TabContext';
import NotificationBar from '../NotificationBar';

// 路由到Tab标题的映射
const routeToTitleMap: Record<string, string> = {
  '/dashboard/work': '我的工作看板',
  '/dashboard/layers': '客户分层盘点',
  '/dashboard/focus': '近期客户关注重点',
  '/dashboard/competition': '客成部门大比武',
  '/dashboard/coordination': '大服务体系内协同',
  '/profiles/handover-implementation': '交接实施',
  '/profiles/service': '持续服务',
  '/profiles/renewal': '续约管理',
  '/profiles/recall': '召回孵化',
  '/profiles/churn': '流失归因',
  '/revenue/consultation': '咨询应答',
  '/revenue/upgrade': '定制升舱建议',
  '/revenue/learning': '学习项目推荐',
  '/revenue/purchase': '课程采购活动',
  '/revenue/alliance': '战略活动结盟',
  '/revenue/message': '消息推送管理',
  '/resources/deployment': '实施部署套件',
  '/resources/support': '年度服务支撑',
  '/resources/equipment': '续约升级装备',
  '/resources/knowledge': '团队能力建设',
  '/ai-tools/consultant': '实施顾问分身',
  '/ai-tools/simulator': '续费模拟器',
  '/ai-tools/communication': '干系人沟通话术',
  '/ai-tools/travel': '面客差旅行程表',
  '/ai-tools/prediction': '预测水晶球',
  '/ai-tools/avatar': '我的虚拟分身',
  '/ai-tools/tags': '智能标签在干活',
  '/user/login': '登录',
  '/user/register': '注册',
  '/user/register-result': '注册结果',
  '/404': '404',
};

const TabBarWrapper: React.FC = React.memo(() => {
  const location = useLocation();
  const { tabs, activeKey, addTab, removeTab, setActiveTab, updateTab } = useTabManager();

  // 监听tab标题更新事件
  useEffect(() => {
    const handleTabTitleUpdate = (event: CustomEvent) => {
      const { path, title } = event.detail;
      const existingTab = tabs.find(tab => tab.path === path);
      if (existingTab && existingTab.label !== title) {
        // 更新tab标题
        updateTab(existingTab.key, { label: title });
      }
    };

    window.addEventListener('tabTitleUpdate', handleTabTitleUpdate as EventListener);
    return () => {
      window.removeEventListener('tabTitleUpdate', handleTabTitleUpdate as EventListener);
    };
  }, [tabs, updateTab]);

  // 监听tab关闭事件
  useEffect(() => {
    const handleTabClose = (event: CustomEvent) => {
      const { path } = event.detail;
      const existingTab = tabs.find(tab => tab.path === path);
      if (existingTab) {
        // 删除对应的tab
        removeTab(existingTab.key);
      }
    };

    window.addEventListener('tabClose', handleTabClose as EventListener);
    return () => {
      window.removeEventListener('tabClose', handleTabClose as EventListener);
    };
  }, [tabs, removeTab]);

  // 根据当前路径自动添加Tab
  useEffect(() => {
    const currentPath = location.pathname;
    
    // 跳过根路径，不创建首页标签
    if (currentPath === '/') {
      return;
    }
    
    // 检查是否是子页面（配置、分析、新建），这些页面不创建新Tab
    const isSubPage = currentPath.includes('/ai-tools/consultant/') && 
                     currentPath !== '/ai-tools/consultant';
    
    if (isSubPage) {
      // 子页面不创建新Tab，直接导航到主页面Tab
      const mainTab = tabs.find(tab => tab.path === '/ai-tools/consultant');
      if (mainTab && activeKey !== mainTab.key) {
        setActiveTab(mainTab.key);
      }
      return;
    }
    
    // 处理客户交接详情页的动态标题
    let title = routeToTitleMap[currentPath] || '未知页面';
    
    // 如果是客户交接详情页，设置为默认标题，等待动态更新
    if (currentPath.match(/^\/profiles\/handover\/\d+$/)) {
      title = '客户交接详情';
    }
    
    // 如果当前路径没有对应的Tab，则添加一个
    const existingTab = tabs.find(tab => tab.path === currentPath);
    if (!existingTab) {
      const newTab: TabItem = {
        key: currentPath,
        label: title,
        path: currentPath,
        closable: true, // 所有Tab都可以关闭
      };
      addTab(newTab);
    } else if (activeKey !== existingTab.key) {
      // 如果Tab已存在且不是当前活跃Tab，设置为活跃Tab
      setActiveTab(existingTab.key);
    }
  }, [location.pathname, tabs, activeKey, addTab, setActiveTab]);

  // 如果没有Tab，不显示TabBar
  if (tabs.length === 0) {
    return null;
  }

  return (
    <>
      <NotificationBar />
      <TabBar
        tabs={tabs}
        activeKey={activeKey}
        onTabChange={setActiveTab}
        onTabClose={removeTab}
      />
      {/* 暂时注释掉Breadcrumb，看看是否是它导致的问题 */}
      {/* <Breadcrumb /> */}
    </>
  );
});

export default TabBarWrapper;
