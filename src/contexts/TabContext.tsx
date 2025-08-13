import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { history } from '@umijs/max';
import { TabItem } from '@/components/TabBar';

interface TabState {
  tabs: TabItem[];
  activeKey: string;
  nextTabId: number; // 用于生成稳定的Tab ID
}

type TabAction =
  | { type: 'ADD_TAB'; payload: TabItem }
  | { type: 'REMOVE_TAB'; payload: string }
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | { type: 'CLEAR_ALL_TABS' };

const TabContext = createContext<{
  state: TabState;
  dispatch: React.Dispatch<TabAction>;
} | null>(null);

const tabReducer = (state: TabState, action: TabAction): TabState => {
  switch (action.type) {
    case 'ADD_TAB':
      const existingTab = state.tabs.find(tab => tab.key === action.payload.key);
      if (existingTab) {
        return {
          ...state,
          activeKey: action.payload.key,
        };
      }
      
      // 最多只能打开7个tab
      const MAX_TABS = 7;
      let newTabs = [...state.tabs];
      
      if (newTabs.length >= MAX_TABS) {
        // 删除最晚打开的tab（删除最后一个）
        newTabs = newTabs.slice(0, -1);
      }
      
      // 为新Tab添加稳定的内部ID
      const newTabWithId = {
        ...action.payload,
        internalId: state.nextTabId,
      };
      
      return {
        ...state,
        tabs: [newTabWithId, ...newTabs], // 新Tab添加到最前面
        activeKey: action.payload.key,
        nextTabId: state.nextTabId + 1,
      };
    case 'REMOVE_TAB':
      const filteredTabs = state.tabs.filter(tab => tab.key !== action.payload);
      let newActiveKey = state.activeKey;
      
      if (state.activeKey === action.payload) {
        const currentIndex = state.tabs.findIndex(tab => tab.key === action.payload);
        if (filteredTabs.length > 0) {
          // 如果关闭的是当前tab，优先切换到左边的tab，如果没有则选择第一个
          const targetIndex = Math.max(0, currentIndex - 1);
          newActiveKey = filteredTabs[targetIndex]?.key || filteredTabs[0]?.key || '';
        } else {
          // 没有其他tab了
          newActiveKey = '';
        }
      }
      
      return {
        ...state,
        tabs: filteredTabs,
        activeKey: newActiveKey,
      };
    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeKey: action.payload,
      };
    case 'CLEAR_ALL_TABS':
      return {
        ...state,
        tabs: [],
        activeKey: '',
      };
    default:
      return state;
  }
};

interface TabProviderProps {
  children: ReactNode;
}

export const TabProvider: React.FC<TabProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(tabReducer, {
    tabs: [],
    activeKey: '',
    nextTabId: 1,
  });

  return (
    <TabContext.Provider value={{ state, dispatch }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext must be used within a TabProvider');
  }
  return context;
};

export const useTabManager = () => {
  const { state, dispatch } = useTabContext();

  const addTab = (tab: TabItem) => {
    dispatch({ type: 'ADD_TAB', payload: tab });
    // 导航到对应路径
    history.push(tab.path);
  };

  const removeTab = (key: string) => {
    const currentIndex = state.tabs.findIndex(tab => tab.key === key);
    const isCurrentTab = state.activeKey === key;

    // 计算移除Tab后的剩余Tab
    const remainingTabs = state.tabs.filter(tab => tab.key !== key);

    if (isCurrentTab) {
      // 先导航到目标Tab，再移除当前Tab，避免被基于当前路径的自动添加逻辑重新加回
      let targetPath = '/dashboard/work';
      if (remainingTabs.length > 0) {
        const targetIndex = Math.max(0, currentIndex - 1);
        const targetTab = remainingTabs[targetIndex] || remainingTabs[0];
        targetPath = targetTab.path;
      }

      if (history.location.pathname !== targetPath) {
        history.push(targetPath);
      }
      // 在下一轮事件循环中再执行移除，保证路由已切换
      setTimeout(() => {
        dispatch({ type: 'REMOVE_TAB', payload: key });
      }, 0);
      return;
    }

    // 非当前Tab，直接移除
    dispatch({ type: 'REMOVE_TAB', payload: key });
  };

  const setActiveTab = (key: string) => {
    const tab = state.tabs.find(t => t.key === key);
    if (tab && state.activeKey !== key) {
      dispatch({ type: 'SET_ACTIVE_TAB', payload: key });
      history.push(tab.path);
    }
  };

  const clearAllTabs = () => {
    dispatch({ type: 'CLEAR_ALL_TABS' });
  };

  return {
    tabs: state.tabs,
    activeKey: state.activeKey,
    addTab,
    removeTab,
    setActiveTab,
    clearAllTabs,
  };
};
