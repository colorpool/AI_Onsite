import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useLocation, history } from '@umijs/max';

interface CustomMenuProps {
  items?: MenuProps['items'];
  mode?: 'inline' | 'horizontal' | 'vertical';
  theme?: 'light' | 'dark';
  className?: string;
}

const CustomMenu: React.FC<CustomMenuProps> = ({
  items = [],
  mode = 'inline',
  theme = 'light',
  className,
}) => {
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // 根据当前路径设置选中的菜单项
  useEffect(() => {
    const currentPath = location.pathname;
    setSelectedKeys([currentPath]);
    
    // 根据当前路径找到对应的父级菜单
    const findParentKey = (menuItems: any[], targetPath: string): string | null => {
      for (const item of menuItems) {
        if (item?.children) {
          for (const child of item.children) {
            if (child?.key === targetPath) {
              return item.key;
            }
          }
          const found = findParentKey(item.children, targetPath);
          if (found) return found;
        }
      }
      return null;
    };

    const parentKey = findParentKey(items, currentPath);
    if (parentKey) {
      setOpenKeys([parentKey]);
    }
  }, [location.pathname, items]);

  // 处理菜单展开/收起
  const handleOpenChange = (keys: string[]) => {
    // 实现手风琴效果：只保留最后一个展开的菜单
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (latestOpenKey) {
      setOpenKeys([latestOpenKey]);
    } else {
      setOpenKeys([]);
    }
  };

  // 处理菜单点击
  const handleClick: MenuProps['onClick'] = (info) => {
    console.log('菜单点击:', info);
    // 如果点击的是子菜单项，导航到对应路径
    if (info.key !== location.pathname) {
      history.push(info.key);
    }
  };

  return (
    <Menu
      mode={mode}
      theme={theme}
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onOpenChange={handleOpenChange}
      onClick={handleClick}
      items={items}
      className={className}
    />
  );
};

export default CustomMenu;
