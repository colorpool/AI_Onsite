import React, { useState, useRef, useEffect } from 'react';
import { Card, Button, message, Modal, Form, Input, Select, Space, Tree, Avatar, Tag, Timeline } from 'antd';
import { EditOutlined, SaveOutlined, CloseOutlined, DragOutlined, PlusOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { Stakeholder } from '../../types/handover';

interface StakeholderNode extends Stakeholder {
  children?: StakeholderNode[];
  level: number;
  parentId?: string;
  key: string;
  title: string;
}

interface StakeholderOrgChartProps {
  stakeholders: Stakeholder[];
  onStakeholderUpdate?: (stakeholder: Stakeholder) => void;
  onStakeholderAdd?: (stakeholder: Stakeholder) => void;
  onStakeholderDelete?: (id: string) => void;
  chartHeight?: number;
}

const StakeholderOrgChart: React.FC<StakeholderOrgChartProps> = ({
  stakeholders,
  onStakeholderUpdate,
  onStakeholderAdd,
  onStakeholderDelete,
  chartHeight,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [orgData, setOrgData] = useState<StakeholderNode[]>([]);
  const [draggedNode, setDraggedNode] = useState<StakeholderNode | null>(null);
  const [dragOverNode, setDragOverNode] = useState<string | null>(null);
  const [originalData, setOriginalData] = useState<StakeholderNode[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editingNode, setEditingNode] = useState<StakeholderNode | null>(null);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [form] = Form.useForm();
  const containerRef = useRef<HTMLDivElement>(null);
  const [historyVisible, setHistoryVisible] = useState<StakeholderNode | null>(null);

  // 构建树状结构
  const buildTreeStructure = (data: Stakeholder[]): StakeholderNode[] => {
    const nodeMap = new Map<string, StakeholderNode>();
    const rootNodes: StakeholderNode[] = [];

    // 初始化所有节点
    data.forEach((stakeholder) => {
      nodeMap.set(stakeholder.id, {
        ...stakeholder,
        children: [],
        level: 0,
        parentId: undefined,
        key: stakeholder.id,
        title: stakeholder.name,
      });
    });

    // 构建层级关系
    data.forEach((stakeholder) => {
      const node = nodeMap.get(stakeholder.id)!;
      
      // 根据角色确定层级关系
      if (stakeholder.role === 'decision_maker') {
        node.level = 0;
        rootNodes.push(node);
      } else if (stakeholder.role === 'influencer') {
        node.level = 1;
        // 找到决策者作为父节点
        const decisionMaker = data.find(s => s.role === 'decision_maker');
        if (decisionMaker && decisionMaker.id !== stakeholder.id) {
          node.parentId = decisionMaker.id;
          const parent = nodeMap.get(decisionMaker.id);
          if (parent) {
            parent.children = parent.children || [];
            parent.children.push(node);
          }
        } else {
          rootNodes.push(node);
        }
      } else if (stakeholder.role === 'user' || stakeholder.role === 'technical_contact') {
        node.level = 2;
        // 优先找到影响者作为父节点，如果没有则找决策者
        const influencer = data.find(s => s.role === 'influencer');
        const parent = influencer || data.find(s => s.role === 'decision_maker');
        if (parent && parent.id !== stakeholder.id) {
          node.parentId = parent.id;
          const parentNode = nodeMap.get(parent.id);
          if (parentNode) {
            parentNode.children = parentNode.children || [];
            parentNode.children.push(node);
          }
        } else {
          rootNodes.push(node);
        }
      } else {
        // 其他角色作为根节点
        rootNodes.push(node);
      }
    });

    return rootNodes;
  };

  useEffect(() => {
    const treeData = buildTreeStructure(stakeholders);
    setOrgData(treeData);
    setOriginalData(JSON.parse(JSON.stringify(treeData)));
    // 默认展开所有节点
    const allKeys = getAllKeys(treeData);
    setExpandedKeys(allKeys);
  }, [stakeholders]);

  // 获取所有节点的key
  const getAllKeys = (nodes: StakeholderNode[]): React.Key[] => {
    const keys: React.Key[] = [];
    const collectKeys = (nodeList: StakeholderNode[]) => {
      nodeList.forEach(node => {
        keys.push(node.key);
        if (node.children && node.children.length > 0) {
          collectKeys(node.children);
        }
      });
    };
    collectKeys(nodes);
    return keys;
  };

  // Tree 拖拽处理
  const onDrop = (info: any) => {
    if (!isEditMode) return;
    
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data: StakeholderNode[], key: string, callback: Function) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          callback(item, index, arr);
          return;
        }
        if (item.children) {
          loop(item.children, key, callback);
        }
      });
    };

    const data = [...orgData];
    let dragObj: StakeholderNode | null = null;

    // 找到拖拽的节点
    loop(data, dragKey, (item: StakeholderNode, index: number, arr: StakeholderNode[]) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!dragObj) return;

    if (!info.dropToGap) {
      // 放置到节点内部
      loop(data, dropKey, (item: StakeholderNode) => {
        item.children = item.children || [];
        item.children.unshift(dragObj!);
      });
    } else if (
      ((info.node as any).props.children || []).length > 0 && 
      (info.node as any).props.expanded && 
      dropPosition === 1
    ) {
      // 放置到展开节点的子节点位置
      loop(data, dropKey, (item: StakeholderNode) => {
        item.children = item.children || [];
        item.children.unshift(dragObj!);
      });
    } else {
      // 放置到节点前后
      let ar: StakeholderNode[] = [];
      let i: number;
      loop(data, dropKey, (_item: StakeholderNode, index: number, arr: StakeholderNode[]) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!);
      } else {
        ar.splice(i! + 1, 0, dragObj!);
      }
    }

    setOrgData(data);
  };

  // 保存更改
  const handleSave = () => {
    // 这里可以调用API保存层级关系
    message.success('层级关系已保存');
    setIsEditMode(false);
    setOriginalData(JSON.parse(JSON.stringify(orgData)));
  };

  // 取消编辑
  const handleCancel = () => {
    setOrgData(JSON.parse(JSON.stringify(originalData)));
    setIsEditMode(false);
    setDraggedNode(null);
    setDragOverNode(null);
    setIsAddModalVisible(false);
    setEditingNode(null);
    form.resetFields();
  };

  // 新增干系人
  const handleAddStakeholder = () => {
    setIsAddModalVisible(true);
    setEditingNode(null);
    form.resetFields();
  };

  // 编辑干系人
  const handleEditStakeholder = (node: StakeholderNode) => {
    setEditingNode(node);
    setIsAddModalVisible(true);
    form.setFieldsValue({
      name: node.name,
      position: node.position,
      role: node.role,
      contact: node.contact,
      status: node.status || 'active'
    });
  };

  // 删除干系人
  const handleDeleteStakeholder = (nodeId: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个干系人吗？',
      onOk: () => {
        const removeNode = (nodes: StakeholderNode[]): StakeholderNode[] => {
          return nodes
            .filter(node => node.id !== nodeId)
            .map(node => ({
              ...node,
              children: node.children ? removeNode(node.children) : []
            }));
        };
        
        const newTree = removeNode(orgData);
        setOrgData(newTree);
        message.success('干系人已删除');
      }
    });
  };

  // 处理表单提交
  const handleFormSubmit = (values: any) => {
    if (editingNode) {
      // 编辑现有干系人
      const updateNode = (nodes: StakeholderNode[]): StakeholderNode[] => {
        return nodes.map(node => {
          if (node.id === editingNode.id) {
            return { ...node, ...values };
          }
          return {
            ...node,
            children: node.children ? updateNode(node.children) : []
          };
        });
      };
      
      const newTree = updateNode(orgData);
      setOrgData(newTree);
      message.success('干系人信息已更新');
    } else {
      // 新增干系人
      const newStakeholder: Stakeholder = {
        id: Date.now().toString(),
        name: values.name,
        position: values.position,
        role: values.role,
        contact: values.contact,
        status: values.status || 'active'
      };
      
      if (onStakeholderAdd) {
        onStakeholderAdd(newStakeholder);
      }
      
      // 添加到根节点
      const newTreeNode: StakeholderNode = {
        ...newStakeholder,
        children: [],
        level: 0,
        parentId: undefined,
        key: newStakeholder.id,
        title: newStakeholder.name
      };
      
      setOrgData([...orgData, newTreeNode]);
      message.success('干系人已添加');
    }
    
    setIsAddModalVisible(false);
    setEditingNode(null);
    form.resetFields();
  };

  // 将树数据转换为 Ant Design Tree 格式
  const convertToTreeData = (nodes: StakeholderNode[]): any[] => {
    return nodes.map(node => ({
      key: node.key,
      title: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
          <Avatar icon={<UserOutlined />} size="small" />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 500, fontSize: '14px' }}>
              {node.name}
              {node.status === 'left' && (
                <Tag color="red" style={{ marginLeft: 8 }}>已离职</Tag>
              )}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>{node.position}</div>
          </div>
          {isEditMode && (
            <Space size="small">
              <Button
                type="text"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setHistoryVisible(node);
                }}
              >
                历史
              </Button>
              <Button
                type="text"
                size="small"
                icon={<EditOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditStakeholder(node);
                }}
                style={{ padding: '2px', minWidth: 'auto' }}
              />
              <Button
                type="text"
                size="small"
                icon={<DeleteOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteStakeholder(node.id);
                }}
                style={{ padding: '2px', minWidth: 'auto', color: '#ff4d4f' }}
              />
            </Space>
          )}
        </div>
      ),
      children: node.children ? convertToTreeData(node.children) : undefined,
    }));
  };

  // 将树数据转换为列表格式
  const convertToListData = (nodes: StakeholderNode[]): Stakeholder[] => {
    const result: Stakeholder[] = [];
    const flatten = (nodeList: StakeholderNode[], level: number = 0) => {
      nodeList.forEach(node => {
        result.push({
          ...node,
          // 添加层级信息用于显示
          level
        } as Stakeholder);
        if (node.children && node.children.length > 0) {
          flatten(node.children, level + 1);
        }
      });
    };
    flatten(nodes);
    return result;
  };

  return (
    <Card
      title="客户干系人架构"
      extra={
        <div style={{ display: 'flex', gap: '8px' }}>
          {isEditMode ? (
            <>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="small"
                onClick={handleAddStakeholder}
              >
                新增
              </Button>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                size="small"
                onClick={handleSave}
              >
                保存
              </Button>
              <Button
                icon={<CloseOutlined />}
                size="small"
                onClick={handleCancel}
              >
                取消
              </Button>
            </>
          ) : (
            <Button
              icon={<EditOutlined />}
              size="small"
              onClick={() => setIsEditMode(true)}
            >
              编辑层级
            </Button>
          )}
        </div>
      }
      style={{ borderRadius: '8px' }}
    >
      <div ref={containerRef} style={{ height: chartHeight || 300, overflow: 'auto' }}>
        {orgData.length > 0 ? (
          <Tree
            treeData={convertToTreeData(orgData)}
            expandedKeys={expandedKeys}
            selectedKeys={selectedKeys}
            onExpand={(keys) => setExpandedKeys(keys)}
            onSelect={(keys) => setSelectedKeys(keys)}
            draggable={isEditMode}
            onDrop={onDrop}
            showLine
            showIcon={false}
            blockNode
            style={{ padding: '16px' }}
          />
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
            <p>暂无干系人信息</p>
          </div>
        )}
      </div>
      
      {/* 新增/编辑干系人模态框 */}
      <Modal
        title={editingNode ? '编辑干系人' : '新增干系人'}
        open={isAddModalVisible}
        onCancel={() => {
          setIsAddModalVisible(false);
          setEditingNode(null);
          form.resetFields();
        }}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
        >
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入干系人姓名" />
          </Form.Item>
          
          <Form.Item
            name="position"
            label="职位"
            rules={[{ required: true, message: '请输入职位' }]}
          >
            <Input placeholder="请输入职位" />
          </Form.Item>
          
          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="请选择角色">
              <Select.Option value="decision_maker">决策者</Select.Option>
              <Select.Option value="influencer">影响者</Select.Option>
              <Select.Option value="user">使用者</Select.Option>
              <Select.Option value="technical_contact">技术联系人</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
          >
            <Select placeholder="请选择状态">
              <Select.Option value="active">在职</Select.Option>
              <Select.Option value="left">已离职</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="contact"
            label="联系方式"
            rules={[{ required: true, message: '请输入联系方式' }]}
          >
            <Input placeholder="请输入邮箱或电话" />
          </Form.Item>
          
          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => {
                setIsAddModalVisible(false);
                setEditingNode(null);
                form.resetFields();
              }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                {editingNode ? '更新' : '添加'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 历史查看 */}
      <Modal
        title="干系人历史"
        open={!!historyVisible}
        onCancel={() => setHistoryVisible(null)}
        footer={null}
      >
        {historyVisible?.history && historyVisible.history.length > 0 ? (
          <Timeline items={historyVisible.history.map(h => ({
            children: `${h.startDate}${h.endDate ? ' ~ ' + h.endDate : ''} · ${h.position}${h.note ? ' · ' + h.note : ''}`
          }))} />
        ) : (
          <div style={{ color: '#999' }}>暂无历史记录</div>
        )}
      </Modal>
    </Card>
  );
};

export default StakeholderOrgChart;
