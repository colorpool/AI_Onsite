import React, { useState, useEffect } from 'react';
import { Tabs, Button, Dropdown, MenuProps } from 'antd';
import { CloseOutlined, PlusOutlined, MoreOutlined } from '@ant-design/icons';
import { history, useLocation } from '@umijs/max';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  tabBarContainer: {
    background: '#fff',
    borderBottom: `1px solid ${token.colorBorderSecondary}`,
    padding: '0 16px',
    marginTop: '8px', // 添加顶部间距
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '40px', // 减少高度，让Tab更紧凑
    overflow: 'hidden', // 防止内容溢出
  },
  customTabs: {
    flex: 1,
    overflow: 'hidden', // 防止内容溢出
    '& .ant-tabs-nav': {
      margin: 0,
      overflow: 'auto', // 添加水平滚动
      scrollbarWidth: 'thin', // Firefox滚动条样式
      scrollbarColor: `${token.colorBorderSecondary} transparent`, // Firefox滚动条颜色
      '&::-webkit-scrollbar': {
        height: '6px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
        borderRadius: '3px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: token.colorBorderSecondary,
        borderRadius: '3px',
        '&:hover': {
          background: token.colorTextSecondary,
        },
      },
    },
    '& .ant-tabs-nav-wrap': {
      overflow: 'visible', // 确保滚动容器可见
    },
    '& .ant-tabs-tab': {
      padding: '6px 10px', // 恢复正常的内边距
      margin: '0 16px 0 0 !important', // 增加tab之间的间距，使用!important确保优先级
      borderRadius: '6px 6px 0 0',
      border: `1px solid ${token.colorBorderSecondary}`,
      borderBottom: 'none',
      borderTop: '2px solid transparent',
      background: token.colorBgContainer,
      transition: 'none', // 去掉过渡动画
      whiteSpace: 'nowrap', // 防止文字换行
      minWidth: '80px', // 减小最小宽度，适应短文本
      maxWidth: 'none', // 移除最大宽度限制，让tab根据内容自适应
      flexShrink: 0, // 防止tab被压缩
      '&:hover': {
        background: token.colorBgTextHover,
      },
    },
    '& .ant-tabs-tab-active': {
      background: '#fff',
      borderColor: token.colorPrimary,
      borderTopColor: token.colorPrimary,
      borderTopWidth: '2px',
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 8px rgba(24, 144, 255, 0.12)',
      transition: 'none', // 去掉过渡动画
      '& .ant-tabs-tab-btn': {
        color: token.colorPrimary,
        fontWeight: 700, // 加粗字体，从600改为700
      },
    },
    '& .ant-tabs-content-holder': {
      display: 'none',
    },
    '& .ant-tabs-nav-add': {
      display: 'none !important',
    },
    '& .ant-tabs-tab-add': {
      display: 'none !important',
    },
    '& .ant-tabs-nav-more': {
      display: 'none !important',
    },
    '& .ant-tabs-nav-operations': {
      display: 'none !important',
    },
    '& .ant-tabs-nav-list': {
      display: 'flex',
      alignItems: 'center',
      minWidth: 'fit-content', // 确保容器宽度至少能容纳内容
      flexWrap: 'nowrap', // 防止换行
    },

  },
  tabCloseButton: {
    padding: '2px',
    borderRadius: '50%',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: '12px',
    color: token.colorTextSecondary,
    '&:hover': {
      background: token.colorBgTextHover,
      color: token.colorText,
    },
  },
  tabActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  moreButton: {
    padding: '4px 8px',
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: '4px',
    background: '#fff',
    cursor: 'pointer',
    '&:hover': {
      background: token.colorBgTextHover,
    },
  },
}));

export interface TabItem {
  key: string;
  label: string;
  path: string;
  closable?: boolean;
}

interface TabBarProps {
  tabs: TabItem[];
  activeKey: string;
  onTabChange: (key: string) => void;
  onTabClose: (key: string) => void;
  onTabAdd?: () => void;
}

const TabBar: React.FC<TabBarProps> = React.memo(({
  tabs,
  activeKey,
  onTabChange,
  onTabClose,
  onTabAdd,
}) => {
  const { styles } = useStyles();
  const location = useLocation();



  const handleTabClick = (key: string) => {
    onTabChange(key);
  };

  const getMoreMenuItems = (): MenuProps['items'] => {
    return [
      {
        key: 'closeOthers',
        label: '关闭其他',
        onClick: () => {
          tabs.forEach(tab => {
            if (tab.key !== activeKey) {
              onTabClose(tab.key);
            }
          });
        },
      },
      {
        key: 'closeAll',
        label: '关闭所有',
        onClick: () => {
          // 关闭所有Tab
          tabs.forEach(tab => {
            onTabClose(tab.key);
          });
          // 关闭所有Tab后，自动导航到"我的工作看板"
          setTimeout(() => {
            history.push('/dashboard/work');
          }, 100);
        },
      },
      {
        type: 'divider',
      },
      {
        key: 'tabLimit',
        label: `Tab限制: ${tabs.length}/7`,
        disabled: true,
      },
    ];
  };

  const tabItems = tabs.map(tab => ({
    key: tab.key,
    label: (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        width: '100%',
        minWidth: '80px'
      }}>
        <span style={{ flex: 1, textAlign: 'left' }}>{tab.label}</span>
        {tab.closable !== false && tabs.length > 1 && (
          <CloseOutlined
            className={styles.tabCloseButton}
            onClick={(e) => {
              e.stopPropagation();
              onTabClose(tab.key);
            }}
            style={{ marginLeft: '8px', flexShrink: 0 }}
          />
        )}
      </div>
    ),
  }));

  return (
    <div className={styles.tabBarContainer}>
      <Tabs
        className={styles.customTabs}
        activeKey={activeKey}
        items={tabItems}
        onChange={handleTabClick}
        hideAdd
        addIcon={null}
        type="card"
        tabBarGutter={8}
        tabBarStyle={{ margin: 0 }}
      />
      <div className={styles.tabActions}>
        {onTabAdd && (
          <Button
            type="text"
            icon={<PlusOutlined />}
            onClick={onTabAdd}
            size="small"
          />
        )}
        {tabs.length > 1 && (
          <Dropdown
            menu={{ items: getMoreMenuItems() }}
            trigger={['click']}
            placement="bottomRight"
          >
            <div className={styles.moreButton}>
              <MoreOutlined />
            </div>
          </Dropdown>
        )}
      </div>
    </div>
  );
});

export default TabBar;
