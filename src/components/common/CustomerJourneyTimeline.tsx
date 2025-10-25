import React, { useState, useEffect } from 'react';
import { Card, Timeline, Tag, Button, Space, Typography, Tooltip, Progress, Modal, Form, Input, Select, DatePicker, message } from 'antd';
import dayjs from 'dayjs';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  CalendarOutlined,
  UserOutlined,
  PlayCircleOutlined,
  FileTextOutlined,
  TeamOutlined,
  TrophyOutlined,
  RiseOutlined
} from '@ant-design/icons';
import { CustomerJourney, JourneyStage, JourneyAction } from '../../types/customerJourney';
import { getCustomerJourney } from '../../data/mockCustomerJourney';
import { getCustomerJourneyByScale } from '../../data/customerJourneyByScale';
import { CustomerScale, getCustomerScaleByARR } from '../../types/customerProfile';
import { mockCustomers } from '../../mock/continuousServiceData';

const { Text, Title } = Typography;

interface CustomerJourneyTimelineProps {
  customerId: string;
  journeyType: 'continuous' | 'renewal';
  onActionClick?: (action: JourneyAction) => void;
  onStageClick?: (stage: JourneyStage) => void;
  showActions?: boolean;
  compact?: boolean;
  style?: React.CSSProperties;
}

const CustomerJourneyTimeline: React.FC<CustomerJourneyTimelineProps> = ({
  customerId,
  journeyType,
  onActionClick,
  onStageClick,
  showActions = true,
  compact = false,
  style
}) => {
  const [journey, setJourney] = useState<CustomerJourney | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAction, setSelectedAction] = useState<JourneyAction | null>(null);
  const [form] = Form.useForm();

  // 获取客户数据和规模信息
  useEffect(() => {
    if (customerId) {
      // 查找客户数据
      const customer = mockCustomers.find(c => c.id === customerId);
      
      if (customer) {
        // 获取客户规模 - 修复映射逻辑
        const customerScale: CustomerScale = customer.customerSegment === 'strategic' || customer.customerSegment === 'key' ? 'key_account' :
                                           customer.customerSegment === 'medium' ? 'mid_market' :
                                           customer.customerSegment === 'general' ? 'smb' :
                                           customer.arr >= 500000 ? 'key_account' :
                                           customer.arr >= 200000 ? 'mid_market' : 'smb';
        
        // 根据客户规模获取定制化旅程
        const customizedJourney = getCustomerJourneyByScale(
          customerId, 
          customer.name, 
          customerScale, 
          journeyType
        );
        
        setJourney(customizedJourney);
      } else {
        // 如果找不到客户数据，使用默认旅程
        const defaultJourney = getCustomerJourney(customerId, '客户名称', journeyType);
        setJourney(defaultJourney);
      }
    }
  }, [customerId, journeyType]);

  if (!journey) {
    return (
      <Card style={style}>
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Text type="secondary">暂无客户旅程数据</Text>
        </div>
      </Card>
    );
  }

  // 计算整体进度 - 根据实际完成的行动项计算
  const calculateProgress = () => {
    if (!journey.actions || journey.actions.length === 0) {
      return 0;
    }
    
    const completedActions = journey.actions.filter(action => action.status === 'completed').length;
    return Math.round((completedActions / journey.actions.length) * 100);
  };

  // 获取状态图标 - 简化为单圈设计
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleOutlined style={{ color: '#ffffff', fontSize: '10px' }} />;
      case 'in_progress':
        return <ClockCircleOutlined style={{ color: '#ffffff', fontSize: '10px' }} />;
      case 'overdue':
        return <ExclamationCircleOutlined style={{ color: '#ffffff', fontSize: '10px' }} />;
      case 'pending':
        return <ClockCircleOutlined style={{ color: '#ffffff', fontSize: '10px' }} />;
      default:
        return <CheckCircleOutlined style={{ color: '#ffffff', fontSize: '10px' }} />;
    }
  };

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#52c41a';
      case 'in_progress':
        return '#1890ff';
      case 'overdue':
        return '#ff4d4f';
      case 'pending':
        return '#d9d9d9';
      default:
        return '#52c41a';
    }
  };

  // 获取状态文本
  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'in_progress':
        return '进行中';
      case 'overdue':
        return '已延期';
      case 'pending':
        return '待处理';
      default:
        return '未知';
    }
  };

  // 检查是否延期
  const isOverdue = (action: JourneyAction) => {
    if (action.status === 'overdue') return true;
    if (action.status === 'completed') return false;
    if (!action.dueDate) return false;
    
    const dueDate = new Date(action.dueDate);
    const now = new Date();
    return now > dueDate;
  };

  // 处理节点点击
  const handleNodeClick = (action: JourneyAction) => {
    setSelectedAction(action);
    setModalVisible(true);
    form.setFieldsValue({
      title: action.title,
      description: action.description,
      status: action.status,
      dueDate: action.dueDate ? dayjs(action.dueDate) : null,
      assignee: action.assignee
    });
  };

  // 处理节点更新
  const handleNodeUpdate = async (values: any) => {
    if (!selectedAction || !journey) return;
    
    try {
      // 更新节点数据
      const updatedActions = journey.actions.map((action: JourneyAction) => 
        action.id === selectedAction.id 
          ? {
              ...action,
              title: values.title,
              description: values.description,
              status: values.status,
              dueDate: values.dueDate ? values.dueDate.format('YYYY-MM-DD') : action.dueDate,
              assignee: values.assignee
            }
          : action
      );
      
      // 更新旅程数据
      const updatedJourney = {
        ...journey,
        actions: updatedActions
      };
      
      setJourney(updatedJourney);
      setModalVisible(false);
      form.resetFields();
      message.success('节点更新成功');
      
      // 如果有回调函数，调用它
      if (onActionClick) {
        onActionClick(selectedAction);
      }
    } catch (error) {
      message.error('节点更新失败');
    }
  };

  // 处理节点完成
  const handleCompleteAction = () => {
    if (!selectedAction) return;
    
    form.setFieldsValue({
      ...form.getFieldsValue(),
      status: 'completed'
    });
    
    handleNodeUpdate({
      ...form.getFieldsValue(),
      status: 'completed'
    });
  };

  // 渲染节点内容卡片
  const renderNodeCard = (action: JourneyAction, index: number) => {
    const overdue = isOverdue(action);
    const actualStatus = overdue && action.status !== 'completed' ? 'overdue' : action.status;
    
    return (
      <div 
        key={action.id}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          minWidth: '220px',
          maxWidth: '280px'
        }}
      >
        {/* 简化的单圈节点图标 */}
        <div style={{
          width: '24px',
          height: '24px',
          backgroundColor: getStatusColor(actualStatus),
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          marginBottom: '16px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          {getStatusIcon(actualStatus)}
        </div>

        {/* 内容卡片组件 */}
        <div 
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            border: '1px solid #f0f0f0',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            width: '100%',
            position: 'relative'
          }}
          onClick={() => handleNodeClick(action)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
          }}
        >
          {/* 延期标识 */}
          {overdue && action.status !== 'completed' && (
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              backgroundColor: '#ff4d4f',
              color: '#ffffff',
              fontSize: '10px',
              padding: '2px 6px',
              borderRadius: '8px',
              fontWeight: '500'
            }}>
              延期
            </div>
          )}

          {/* 主要内容 */}
          <div style={{
            marginTop: overdue && action.status !== 'completed' ? '24px' : '0',
            paddingBottom: '50px' // 为底部状态和日期留出空间
          }}>
            <div style={{
              fontSize: '15px',
              fontWeight: '600',
              color: '#262626',
              lineHeight: '1.4',
              marginBottom: '8px',
              wordBreak: 'break-word'
            }}>
              {action.title}
            </div>
            
            {action.description && (
              <div style={{
                fontSize: '13px',
                color: '#595959',
                lineHeight: '1.5',
                marginBottom: '12px',
                wordBreak: 'break-word'
              }}>
                {action.description}
              </div>
            )}

            {/* 中间信息（负责人） */}
            {action.assignee && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                color: '#8c8c8c',
                marginBottom: '8px'
              }}>
                <UserOutlined />
                <span>{action.assignee}</span>
              </div>
            )}
          </div>

          {/* 右下角状态标签和日期 */}
          <div style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '4px'
          }}>
            {/* 状态标签 */}
            <Tag 
              color={getStatusColor(actualStatus)}
              style={{
                fontSize: '11px',
                padding: '2px 8px',
                borderRadius: '12px',
                border: 'none',
                color: '#ffffff',
                fontWeight: '500',
                margin: 0
              }}
            >
              {getStatusText(actualStatus)}
            </Tag>
            
            {/* 日期 */}
            {action.dueDate && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                color: '#8c8c8c'
              }}>
                <CalendarOutlined />
                <span>{new Date(action.dueDate).toLocaleDateString('zh-CN')}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CalendarOutlined style={{ color: '#1890ff', marginRight: '8px', fontSize: '18px' }} />
              <span style={{ fontSize: '16px', fontWeight: '600' }}>客户旅程</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Text type="secondary" style={{ fontSize: '14px' }}>整体进度:</Text>
                <Progress 
                  percent={calculateProgress()} 
                  size="small" 
                  style={{ width: '100px' }}
                  strokeColor="#1890ff"
                />
              </div>
              <Tag color="blue">{journey.lifecycle === 'continuous' ? '持续服务' : journey.lifecycle === 'renewal' ? '续约阶段' : '其他阶段'}</Tag>
            </div>
          </div>
        }
        style={{
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          border: '1px solid #f0f0f0',
          background: '#ffffff',
          ...style
        }}
        bodyStyle={{ padding: compact ? '16px' : '24px' }}
      >
        {/* 横版时间轴布局 */}
        <div style={{ 
          position: 'relative', 
          width: '100%',
          padding: '20px 0',
          overflowX: 'auto'
        }}>
          {/* 基于节点布局的连接线 */}
          {journey.actions && journey.actions.length > 1 && (
            <>
              {journey.actions.slice(0, -1).map((_, index) => (
                <div
                  key={`line-${index}`}
                  style={{
                    position: 'absolute',
                    top: '32px',
                    left: `calc(${20 + 110 + index * (220 + 60)}px + 12px)`,
                    width: `${220 + 60 - 24}px`,
                    height: '2px',
                    backgroundColor: '#e8e8e8',
                    zIndex: 1
                  }}
                />
              ))}
            </>
          )}

          {/* 横版时间轴节点列表 */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            gap: '60px',
            padding: '0 20px',
            minWidth: 'fit-content',
            justifyContent: journey.actions && journey.actions.length <= 3 ? 'center' : 'flex-start'
          }}>
            {journey.actions && journey.actions.length > 0 ? (
              journey.actions.map((action, index) => renderNodeCard(action, index))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0', width: '100%' }}>
                <Text type="secondary">暂无行动项数据</Text>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* 节点详情弹窗 */}
      <Modal
        title="节点详情"
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            取消
          </Button>,
          <Button 
            key="complete" 
            type="primary" 
            onClick={handleCompleteAction}
            disabled={selectedAction?.status === 'completed'}
          >
            标记完成
          </Button>,
          <Button 
            key="save" 
            type="primary" 
            onClick={() => form.submit()}
          >
            保存更新
          </Button>
        ]}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleNodeUpdate}
        >
          <Form.Item
            name="title"
            label="标题"
            rules={[{ required: true, message: '请输入标题' }]}
          >
            <Input placeholder="请输入节点标题" />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="描述"
          >
            <Input.TextArea 
              rows={3} 
              placeholder="请输入节点描述" 
            />
          </Form.Item>
          
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Select.Option value="pending">待处理</Select.Option>
              <Select.Option value="in_progress">进行中</Select.Option>
              <Select.Option value="completed">已完成</Select.Option>
              <Select.Option value="overdue">已延期</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="dueDate"
            label="截止日期"
          >
            <DatePicker 
              style={{ width: '100%' }} 
              placeholder="请选择截止日期"
            />
          </Form.Item>
          
          <Form.Item
            name="assignee"
            label="负责人"
          >
            <Input placeholder="请输入负责人" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CustomerJourneyTimeline;