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
  },
  customTabs: {
    flex: 1,
    '& .ant-tabs-nav': {
      margin: 0,
    },
    '& .ant-tabs-tab': {
      padding: '6px 10px', // 减少内边距，让Tab更紧凑
      margin: '0 1px 0 0', // 缩短间距从2px改为1px
      borderRadius: '6px 6px 0 0',
      border: `1px solid ${token.colorBorderSecondary}`,
      borderBottom: 'none',
      borderTop: '2px solid transparent',
      background: token.colorBgContainer,
      transition: 'none', // 去掉过渡动画
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
  },
  tabCloseButton: {
    marginLeft: '8px',
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

  const handleTabEdit = (targetKey: React.Key | React.MouseEvent | React.KeyboardEvent, action: 'add' | 'remove') => {
    if (action === 'add' && onTabAdd) {
      onTabAdd();
    } else if (action === 'remove' && typeof targetKey === 'string') {
      onTabClose(targetKey);
    }
  };

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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>{tab.label}</span>
        {tab.closable !== false && tabs.length > 1 && (
          <CloseOutlined
            className={styles.tabCloseButton}
            onClick={(e) => {
              e.stopPropagation();
              onTabClose(tab.key);
            }}
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
        onEdit={handleTabEdit}
        hideAdd
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
