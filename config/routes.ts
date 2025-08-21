/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  // 客户成功系统主要功能路由
  {
    path: '/dashboard',
    name: '驻场智能看板',
    icon: 'dashboard',
    routes: [
      {
        path: '/dashboard',
        redirect: '/dashboard/work',
      },
      {
        path: '/dashboard/work',
        name: '我的工作看板',
        icon: 'bell',
        component: './CustomerSuccess',
      },
      {
        path: '/dashboard/layers',
        name: '客户分层盘点',
        icon: 'group',
        component: './CustomerSuccess',
      },
      {
        path: '/dashboard/focus',
        name: '近期客户关注重点',
        icon: 'trophy',
        component: './CustomerSuccess',
      },
      {
        path: '/dashboard/competition',
        name: '客成部门大比武',
        icon: 'trophy',
        component: './CustomerSuccess',
      },
      {
        path: '/dashboard/coordination',
        name: '大服务体系内协同',
        icon: 'team',
        component: './CustomerSuccess',
      },
    ],
  },
  {
    path: '/profiles',
    name: '动态客户档案',
    icon: 'user',
    routes: [
      {
        path: '/profiles',
        redirect: '/profiles/handover',
      },
      {
        path: '/profiles/handover',
        name: '客户交接',
        icon: 'userAdd',
        component: './handover',
      },
      {
        path: '/profiles/handover/new',
        component: './handover/new',
        hideInMenu: true,
      },
      {
        path: '/profiles/handover/:id',
        component: './handover/[id]',
        hideInMenu: true,
        name: '客户交接详情',
      },
      {
        path: '/profiles/implementation',
        name: '实施搭建',
        icon: 'tool',
        component: './CustomerSuccess',
      },
      {
        path: '/profiles/service',
        name: '持续服务',
        icon: 'customerService',
        component: './CustomerSuccess',
      },
      {
        path: '/profiles/renewal',
        name: '续约管理',
        icon: 'fileText',
        component: './CustomerSuccess',
      },
      {
        path: '/profiles/recall',
        name: '召回孵化',
        icon: 'experiment',
        component: './CustomerSuccess',
      },
      {
        path: '/profiles/churn',
        name: '流失归因',
        icon: 'lineChart',
        component: './CustomerSuccess',
      },
    ],
  },
  {
    path: '/revenue',
    name: '增收服务推进',
    icon: 'message',
    routes: [
      {
        path: '/revenue',
        redirect: '/revenue/consultation',
      },
      {
        path: '/revenue/consultation',
        name: '咨询应答',
        icon: 'comment',
        component: './CustomerSuccess',
      },
      {
        path: '/revenue/upgrade',
        name: '定制升舱建议',
        icon: 'arrowUp',
        component: './CustomerSuccess',
      },
      {
        path: '/revenue/learning',
        name: '学习项目推荐',
        icon: 'book',
        component: './CustomerSuccess',
      },
      {
        path: '/revenue/purchase',
        name: '课程采购活动',
        icon: 'shoppingCart',
        component: './CustomerSuccess',
      },
      {
        path: '/revenue/alliance',
        name: '战略活动结盟',
        icon: 'userAdd',
        component: './CustomerSuccess',
      },
      {
        path: '/revenue/message',
        name: '消息推送管理',
        icon: 'bell',
        component: './CustomerSuccess',
      },
    ],
  },
  {
    path: '/resources',
    name: '共享方案资料包',
    icon: 'shareAlt',
    routes: [
      {
        path: '/resources',
        redirect: '/resources/deployment',
      },
      {
        path: '/resources/deployment',
        name: '实施部署套件',
        icon: 'setting',
        component: './CustomerSuccess',
      },
      {
        path: '/resources/support',
        name: '年度服务支撑',
        icon: 'barChart',
        component: './CustomerSuccess',
      },
      {
        path: '/resources/equipment',
        name: '续约升级装备',
        icon: 'arrowUp',
        component: './CustomerSuccess',
      },
      {
        path: '/resources/knowledge',
        name: '团队能力建设',
        icon: 'database',
        component: './CustomerSuccess',
      },
    ],
  },
  {
    path: '/ai-tools',
    name: 'AI智能工具箱',
    icon: 'robot',
    routes: [
      {
        path: '/ai-tools',
        redirect: '/ai-tools/consultant',
      },
      {
        path: '/ai-tools/consultant',
        name: '实施顾问分身',
        icon: 'userSwitch',
        component: './agents',
        routes: [
          {
            path: '/ai-tools/consultant/new',
            component: './agents',
            hideInMenu: true,
          },
          {
            path: '/ai-tools/consultant/:id/edit',
            component: './agents',
            hideInMenu: true,
          },
          {
            path: '/ai-tools/consultant/:id/analytics',
            component: './agents',
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/ai-tools/simulator',
        name: '续费模拟器',
        icon: 'eye',
        component: './CustomerSuccess',
      },
      {
        path: '/ai-tools/communication',
        name: '干系人沟通话术',
        icon: 'comment',
        component: './CustomerSuccess',
      },
      {
        path: '/ai-tools/travel',
        name: '面客差旅行程表',
        icon: 'car',
        component: './CustomerSuccess',
      },
      {
        path: '/ai-tools/prediction',
        name: '预测水晶球',
        icon: 'trophy',
        component: './CustomerSuccess',
      },
      {
        path: '/ai-tools/avatar',
        name: '我的虚拟分身',
        icon: 'user',
        component: './CustomerSuccess',
      },
      {
        path: '/ai-tools/tags',
        name: '智能标签在干活',
        icon: 'tags',
        component: './CustomerSuccess',
      },
    ],
  },
  {
    path: '/',
    redirect: '/dashboard/work',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
