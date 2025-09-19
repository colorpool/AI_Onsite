import { ServiceRecord } from '../components/common/ServiceRecordTab';
import { mockCustomers } from '../mock/continuousServiceData';

/**
 * 服务记录适配器
 * 用于从持续服务数据中获取服务记录，并适配到续约详情页面使用
 */
export class ServiceRecordAdapter {
  /**
   * 根据续约客户ID获取对应的持续服务记录
   * @param renewalCustomerId 续约客户ID (如 RENEW-0001)
   * @returns 服务记录数组
   */
  static getServiceRecordsByRenewalId(renewalCustomerId: string): ServiceRecord[] {
    // 映射续约客户ID到持续服务客户ID
    // 这里使用简单的映射规则，实际项目中可能需要更复杂的映射逻辑
    const continuousCustomerId = this.mapRenewalIdToContinuousId(renewalCustomerId);
    
    if (!continuousCustomerId) {
      return [];
    }

    // 从持续服务数据中查找对应客户
    const continuousCustomer = mockCustomers.find(customer => customer.id === continuousCustomerId);
    
    if (!continuousCustomer || !continuousCustomer.serviceRecords) {
      return [];
    }

    // 返回服务记录，可以在这里进行额外的过滤或转换
    return continuousCustomer.serviceRecords;
  }

  /**
   * 根据客户名称获取服务记录
   * @param customerName 客户名称
   * @returns 服务记录数组
   */
  static getServiceRecordsByName(customerName: string): ServiceRecord[] {
    const continuousCustomer = mockCustomers.find(customer => customer.name === customerName);
    
    if (!continuousCustomer || !continuousCustomer.serviceRecords) {
      return [];
    }

    return continuousCustomer.serviceRecords;
  }

  /**
   * 映射续约客户ID到持续服务客户ID
   * @param renewalId 续约客户ID
   * @returns 持续服务客户ID
   */
  private static mapRenewalIdToContinuousId(renewalId: string): string | null {
    // 简单的映射规则，实际项目中可能需要数据库查询或更复杂的映射
    const mappings: Record<string, string> = {
      'RENEW-0001': 'CONTINUOUS-0003', // 深圳创新医疗科技 -> 深圳创新科技
      'RENEW-0002': 'CONTINUOUS-0001', // 北京智能制造 -> 北京科技
      'RENEW-0003': 'CONTINUOUS-0002', // 上海金融服务 -> 上海智能科技
      'RENEW-0004': 'CONTINUOUS-0004', // 广州教育科技 -> 广州数字化企业
      'RENEW-0005': 'CONTINUOUS-0005', // 杭州电商平台 -> 杭州互联网公司
    };

    return mappings[renewalId] || null;
  }

  /**
   * 为续约客户添加新的服务记录
   * @param renewalCustomerId 续约客户ID
   * @param record 新的服务记录
   */
  static addServiceRecord(renewalCustomerId: string, record: Omit<ServiceRecord, 'id' | 'createdAt' | 'updatedAt'>): void {
    const continuousCustomerId = this.mapRenewalIdToContinuousId(renewalCustomerId);
    
    if (!continuousCustomerId) {
      console.warn(`无法找到续约客户 ${renewalCustomerId} 对应的持续服务客户`);
      return;
    }

    const continuousCustomer = mockCustomers.find(customer => customer.id === continuousCustomerId);
    
    if (!continuousCustomer) {
      console.warn(`无法找到持续服务客户 ${continuousCustomerId}`);
      return;
    }

    // 生成新的服务记录
    const newRecord: ServiceRecord = {
      ...record,
      id: `sr_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // 添加到服务记录数组
    if (!continuousCustomer.serviceRecords) {
      continuousCustomer.serviceRecords = [];
    }
    
    continuousCustomer.serviceRecords.unshift(newRecord); // 添加到数组开头，显示最新记录
  }

  /**
   * 获取续约相关的服务记录（过滤出与续约相关的记录）
   * @param renewalCustomerId 续约客户ID
   * @returns 续约相关的服务记录
   */
  static getRenewalRelatedRecords(renewalCustomerId: string): ServiceRecord[] {
    const allRecords = this.getServiceRecordsByRenewalId(renewalCustomerId);
    
    // 过滤出与续约相关的记录
    const renewalRelatedTypes = ['商务沟通', '电话回访', 'QBR'];
    const renewalRelatedTags = ['续约沟通', '续约意向', '商务谈判', '合同讨论'];
    
    return allRecords.filter(record => {
      // 按类型过滤
      if (renewalRelatedTypes.includes(record.type)) {
        return true;
      }
      
      // 按标签过滤
      if (record.tags && record.tags.some(tag => 
        renewalRelatedTags.some(renewalTag => tag.includes(renewalTag))
      )) {
        return true;
      }
      
      // 按内容关键词过滤
      const renewalKeywords = ['续约', '续费', '合同', '商务', '价格', '折扣'];
      if (renewalKeywords.some(keyword => 
        record.title.includes(keyword) || record.content.includes(keyword)
      )) {
        return true;
      }
      
      return false;
    });
  }
}

export default ServiceRecordAdapter;