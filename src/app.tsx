import { LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import React from 'react';
import {
  AvatarDropdown,
  AvatarName,
  Footer,
  Question,
  SelectLang,
} from '@/components';
import { currentUser as queryCurrentUser } from '@/services/ant-design-pro/api';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import { TabProvider } from '@/contexts/TabContext';
import TabBarWrapper from '@/components/TabBar/TabBarWrapper';
import { useMenuState } from '@/hooks/useMenuState';
import { isProduction, getEnvironmentInfo } from '@/utils/env';
import { getMockCurrentUser } from '@/utils/mockData';
import '@ant-design/v5-patch-for-react-19';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/**
 * @see https://umijs.org/docs/api/runtime-config#getinitialstate
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  try {
    // 输出环境信息用于调试
    const envInfo = getEnvironmentInfo();
    
    const fetchUserInfo = async () => {
      // 生产环境直接返回Mock用户，避免API调用
      if (isProduction()) {
        console.log('Production environment detected, using mock data');
        return getMockCurrentUser();
      }
      
      // 开发环境尝试调用真实API
      try {
        console.log('Development environment, calling API');
        const msg = await queryCurrentUser({
          skipErrorHandler: true,
        });
        return msg.data;
      } catch (error) {
        console.log('API call failed:', error);
        // 开发环境API失败时也使用Mock数据，避免重定向循环
        return getMockCurrentUser();
      }
    };
    
    const currentUser = await fetchUserInfo();
    console.log('Current user loaded:', currentUser?.name);
    
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  } catch (error) {
    console.error('getInitialState error:', error);
    // 发生任何错误时返回基本配置和Mock用户
    return {
      fetchUserInfo: async () => getMockCurrentUser(),
      currentUser: getMockCurrentUser(),
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  return {
    // 移除actionsRender，不再在顶部显示
    // actionsRender: () => [
    //   <Question key="doc" />,
    //   <SelectLang key="SelectLang" />,
    // ],
    // 移除avatarProps，避免重复显示用户头像
    // avatarProps: {
    //   src: initialState?.currentUser?.avatar,
    //   title: <AvatarName />,
    //   render: (_, avatarChildren) => {
    //     return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
    //   },
    // },
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 生产环境跳过登录检查
      if (isProduction()) {
        return;
      }
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    bgLayoutImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: [], // 移除OpenAPI文档链接
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <TabProvider>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div style={{ position: 'sticky', top: 0, zIndex: 1000, background: '#fff' }}>
              <TabBarWrapper />
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: 0 }}>
              {children}
            </div>
          </div>
        </TabProvider>
      );
    },
    // 自定义侧边栏底部内容，包含用户头像和语言切换
    siderMenuType: 'sub',
    // 配置菜单属性，实现点击菜单时自动关闭其他菜单
    menuProps: {
      mode: 'inline',
      onClick: (info) => {
        // 这里可以添加自定义的点击处理逻辑
        console.log('菜单点击:', info);
      },
    },
    // 添加侧边栏底部自定义渲染
    menuFooterRender: () => (
      <div style={{ 
        padding: '16px', 
        borderTop: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <AvatarDropdown>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: '6px',
            transition: 'background-color 0.2s'
          }}>
            <AvatarName />
          </div>
        </AvatarDropdown>
      </div>
    ),
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request: RequestConfig = {
  baseURL: isProduction() ? '' : 'https://proapi.azurewebsites.net',
  ...errorConfig,
};
