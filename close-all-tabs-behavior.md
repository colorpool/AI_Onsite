# 关闭所有Tab行为优化

## 问题描述
当前点击"关闭所有"后，会停留在当前Tab页面，用户希望关闭所有Tab后自动导航到"我的工作看板"页面。

## 解决方案

### 修改内容
在 `src/components/TabBar/index.tsx` 文件中，修改了"关闭所有"按钮的点击处理逻辑。

### 具体修改

#### 修改前
```javascript
{
  key: 'closeAll',
  label: '关闭所有',
  onClick: () => {
    tabs.forEach(tab => {
      onTabClose(tab.key);
    });
  },
}
```

#### 修改后
```javascript
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
}
```

## 修改效果

### 行为变化
- **之前**: 关闭所有Tab后停留在当前页面
- **之后**: 关闭所有Tab后自动导航到"我的工作看板"页面

### 用户体验改进
- ✅ 提供明确的默认页面
- ✅ 避免用户停留在空白页面
- ✅ 符合用户的使用习惯
- ✅ 提供更好的导航体验

### 技术实现
- ✅ 使用 `setTimeout` 确保Tab关闭操作完成后再导航
- ✅ 使用 `history.push('/dashboard/work')` 进行页面跳转
- ✅ 100ms延迟确保状态更新完成

## 技术细节

### 修改的文件
- `src/components/TabBar/index.tsx`

### 关键代码
1. **关闭所有Tab**: `tabs.forEach(tab => onTabClose(tab.key))`
2. **延迟导航**: `setTimeout(() => history.push('/dashboard/work'), 100)`
3. **目标页面**: `/dashboard/work` (我的工作看板)

### 延迟原因
- 确保Tab关闭操作完成
- 避免状态更新冲突
- 提供流畅的用户体验

## 测试验证
1. 启动应用
2. 打开多个不同的Tab
3. 点击Tab栏右侧的"..."按钮
4. 选择"关闭所有"
5. 确认所有Tab被关闭
6. 验证自动跳转到"我的工作看板"页面

## 相关功能
- **关闭其他**: 保持原有逻辑，只关闭非当前Tab
- **Tab限制**: 显示当前Tab数量限制信息
- **单个Tab关闭**: 保持原有功能

这个修改让"关闭所有"功能更加用户友好，提供了更好的导航体验。
