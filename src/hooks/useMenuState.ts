import { useState, useEffect } from 'react';
import { useLocation } from '@umijs/max';

export const useMenuState = () => {
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  // 根据当前路径自动设置展开的菜单
  useEffect(() => {
    const currentPath = location.pathname;
    
    // 根据路径找到对应的父级菜单
    const findParentKey = (path: string): string | null => {
      // 这里可以根据路由配置来查找父级菜单
      // 简化实现：根据路径前缀来判断
      const pathSegments = path.split('/').filter(Boolean);
      if (pathSegments.length >= 2) {
        return `/${pathSegments[0]}`;
      }
      return null;
    };

    const parentKey = findParentKey(currentPath);
    if (parentKey) {
      setOpenKeys([parentKey]);
    }
  }, [location.pathname]);

  const handleOpenChange = (keys: string[]) => {
    // 实现手风琴效果：只保留最后一个展开的菜单
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (latestOpenKey) {
      setOpenKeys([latestOpenKey]);
    } else {
      setOpenKeys([]);
    }
  };

  return {
    openKeys,
    setOpenKeys,
    handleOpenChange,
  };
};
