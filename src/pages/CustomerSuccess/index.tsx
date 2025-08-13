import React from 'react';
import { useLocation } from '@umijs/max';
import { generateTabContent } from '@/utils/tabContentGenerator';

// 路径到内容标题的映射
const pathToTitleMap: { [key: string]: string } = {
  '/dashboard/work': '我的工作看板',
  '/dashboard/layers': '客户分层盘点',
  '/dashboard/focus': '近期客户关注重点',
  '/dashboard/competition': '客成部门大比武',
  '/dashboard/coordination': '大服务体系内协同',
  '/profiles/handover': '客户交接',
  '/profiles/implementation': '实施搭建',
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
};

const CustomerSuccess: React.FC = () => {
  const location = useLocation();
  
  // 根据当前路径获取页面标题
  const pageTitle = pathToTitleMap[location.pathname] || '客户成功系统';
  
  // 根据页面标题生成内容
  const content = generateTabContent(pageTitle);

  return (
    <div style={{ 
      padding: '24px',
      background: '#fafafa',
      minHeight: 'calc(100vh - 64px)'
    }}>
      {content}
    </div>
  );
};

export default CustomerSuccess;
