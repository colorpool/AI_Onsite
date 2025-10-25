import { ServiceRecord } from '@/components/common/ServiceRecordTab';
import { CustomerHandover, InternalComment, OnboardingTask } from '@/types/handover';

/**
 * 将交接实施的活动源与协作数据同步到持续服务记录
 * @param handoverData 交接实施数据
 * @param internalComments 内部协作评论
 * @param onboardingTasks 完成的Onboarding任务
 * @returns 转换后的服务记录数组
 */
export const syncHandoverToServiceRecords = (
  handoverData: CustomerHandover,
  internalComments: InternalComment[],
  onboardingTasks: OnboardingTask[]
): ServiceRecord[] => {
  const serviceRecords: ServiceRecord[] = [];
  const now = new Date().toISOString();

  // 1. 不再生成内部协作评论的服务记录（已删除）

  // 2. 转换已完成的Onboarding任务为服务记录
  const completedTasks = onboardingTasks.filter(task => task.completed && task.completedAt);
  completedTasks.forEach(task => {
    serviceRecords.push({
      id: `handover-task-${task.id}`,
      type: '培训',
      title: `Onboarding任务完成：${task.title}`,
      content: `任务完成记录\n完成时间：${task.completedAt}\n计划完成日期：${task.dueDate || '未设置'}`,
      operator: '交接实施团队',
      timestamp: task.completedAt!,
      tags: ['交接实施', 'Onboarding', '任务完成'],
      createdAt: now,
      updatedAt: now,
      relatedPlaybookId: `handover-${handoverData.id}`
    });
  });

  // 3. 创建交接实施完成总结记录
  if (handoverData.deliveredAt || handoverData.handoverStatus === 'implementation_in_progress') {
    const totalTasks = onboardingTasks.length;
    const completedTasksCount = completedTasks.length;
    const totalComments = internalComments.length;
    
    // 确保有交付时间，如果没有则使用当前时间
    const deliveryTime = handoverData.deliveredAt || new Date().toISOString();
    
    // 将ISO时间格式转换为可读格式
    const formattedTimestamp = new Date(deliveryTime).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(/\//g, '-').replace(',', '');

    serviceRecords.push({
      id: `handover-summary-${handoverData.id}`,
      type: '其他',
      title: `客户交接实施完成`,
      content: `客户 ${handoverData.customerName} 的交接实施已成功完成。
      
    交接概要：
    • 交接状态：${getHandoverStatusText(handoverData.handoverStatus)}
    • 风险等级：${getRiskLevelText(handoverData.riskLevel)}
    • 完成时间：${new Date(deliveryTime).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })}
    • Onboarding任务：${completedTasksCount}/${totalTasks} 已完成
    • 协作记录：已同步至服务记录中

    相关信息：
    • 历史交接单：交接单-${handoverData.id}

    客户现已进入持续服务阶段，相关交接记录已同步至服务记录中。`,
          operator: '系统自动',
          timestamp: formattedTimestamp,
          tags: ['交接实施', '阶段完成', '持续服务'],
          attachments: [`历史交接单：交接单-${handoverData.id}`],
          createdAt: now,
          updatedAt: now
        });
      }

  // 按时间倒序排列（最新的在前）
  return serviceRecords.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

/**
 * 获取交接状态的中文描述
 */
const getHandoverStatusText = (status: string): string => {
  const statusMap: Record<string, string> = {
    'pending_handover': '待交接',
    'handover_in_progress': '交接中',
    'pending_implementation': '待实施',
    'implementation_in_progress': '实施中'
  };
  return statusMap[status] || status;
};

/**
 * 获取风险等级的中文描述
 */
const getRiskLevelText = (level: string): string => {
  const levelMap: Record<string, string> = {
    'low': '低风险',
    'medium': '中风险',
    'high': '高风险'
  };
  return levelMap[level] || level;
};

/**
 * 检查交接是否已完成，可以进行数据同步
 */
export const canSyncHandoverData = (handoverData: CustomerHandover): boolean => {
  // 如果有交付时间或者状态为实施中，都可以同步数据
  return !!(handoverData.deliveredAt || handoverData.handoverStatus === 'implementation_in_progress');
};

/**
 * 获取交接实施相关的服务记录标识符
 * 用于在持续服务中识别来自交接实施的记录
 */
export const getHandoverServiceRecordIds = (handoverId: string): string[] => {
  return [
    `handover-summary-${handoverId}`,
    // 可以根据需要添加更多模式匹配
  ];
};