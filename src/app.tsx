import { LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
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
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser({
        skipErrorHandler: true,
      });
      return msg.data;
    } catch (_error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (
    ![loginPath, '/user/register', '/user/register-result'].includes(
      location.pathname,
    )
  ) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  // 使用自定义 hook 管理菜单状态
  const { openKeys, handleOpenChange } = useMenuState();

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
          <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div style={{ position: 'sticky', top: 0, zIndex: 1000, background: '#fff' }}>
              <TabBarWrapper />
            </div>
            <div style={{ flex: 1, padding: 0 }}>
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
      // 实现手风琴效果：通过 onOpenChange 控制只展开一个子菜单
      onOpenChange: (openKeys) => {
        // 只保留最后一个展开的菜单
        const latestOpenKey = openKeys[openKeys.length - 1];
        if (latestOpenKey) {
          // 这里可以通过状态管理来控制 openKeys
          console.log('展开菜单:', latestOpenKey);
        }
      },
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
        justifyContent: 'space-between'
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
        <SelectLang key="unique-select-lang" />
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
  baseURL: 'https://proapi.azurewebsites.net',
  ...errorConfig,
};
