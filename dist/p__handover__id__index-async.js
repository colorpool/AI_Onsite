((typeof globalThis !== 'undefined' ? globalThis : self)["makoChunk_ant-design-pro"] = (typeof globalThis !== 'undefined' ? globalThis : self)["makoChunk_ant-design-pro"] || []).push([
        ['p__handover__id__index'],
{ "src/components/handover/HandoverDetailHeader.tsx": function (module, exports, __mako_require__){
"use strict";
__mako_require__.d(exports, "__esModule", {
    value: true
});
__mako_require__.d(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
var _interop_require_default = __mako_require__("@swc/helpers/_/_interop_require_default");
var _interop_require_wildcard = __mako_require__("@swc/helpers/_/_interop_require_wildcard");
var _reactrefresh = /*#__PURE__*/ _interop_require_wildcard._(__mako_require__("node_modules/react-refresh/runtime.js"));
var _jsxdevruntime = __mako_require__("node_modules/react/jsx-dev-runtime.js");
var _react = /*#__PURE__*/ _interop_require_default._(__mako_require__("node_modules/react/index.js"));
var _antd = __mako_require__("node_modules/antd/es/index.js");
var _icons = __mako_require__("node_modules/@ant-design/icons/es/index.js");
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
// 平台图标组件 - 使用钉钉风格
const PlatformIcon = ()=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            width: 24,
            height: 24,
            backgroundColor: '#1677ff',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '12px',
            fontWeight: 'bold',
            marginRight: '12px'
        },
        children: "钉"
    }, void 0, false, {
        fileName: "src/components/handover/HandoverDetailHeader.tsx",
        lineNumber: 21,
        columnNumber: 3
    }, this);
_c = PlatformIcon;
const HandoverDetailHeader = ({ handoverData, onBack, onEdit, onViewContract, onShare })=>{
    var _handoverData_crmData, _handoverData_crmData1, _handoverData_crmData2, _handoverData_crmData3, _handoverData_crmData4;
    // 状态颜色映射
    const getStatusConfig = (status)=>{
        const configs = {
            'normal': {
                color: '#52c41a',
                text: '正常交接'
            },
            'not_handover': {
                color: '#faad14',
                text: '未交接'
            },
            'risk': {
                color: '#ff4d4f',
                text: '有风险'
            }
        };
        return configs[status] || {
            color: '#d9d9d9',
            text: '未知'
        };
    };
    const statusConfig = getStatusConfig(handoverData.handoverStatus);
    // 计算档案完整度（示例逻辑）
    const calculateCompleteness = ()=>{
        let score = 0;
        if (handoverData.stakeholders && handoverData.stakeholders.length > 0) score += 30;
        if (handoverData.crmData) score += 25;
        if (handoverData.onboardingTasks && handoverData.onboardingTasks.length > 0) score += 25;
        if (handoverData.expectationAlignment === 'aligned') score += 20;
        return score;
    };
    const completeness = calculateCompleteness();
    // 计算续约次数（示例数据）
    const renewalCount = 2;
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
        },
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px 24px 16px 24px',
                    borderBottom: '1px solid #f0f0f0'
                },
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            flex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                type: "text",
                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ArrowLeftOutlined, {}, void 0, false, {
                                    fileName: "src/components/handover/HandoverDetailHeader.tsx",
                                    lineNumber: 86,
                                    columnNumber: 19
                                }, void 0),
                                onClick: onBack,
                                style: {
                                    padding: '4px 8px',
                                    height: 'auto',
                                    marginRight: '16px',
                                    color: '#666',
                                    fontSize: '14px'
                                },
                                children: "返回"
                            }, void 0, false, {
                                fileName: "src/components/handover/HandoverDetailHeader.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(PlatformIcon, {}, void 0, false, {
                                fileName: "src/components/handover/HandoverDetailHeader.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("h1", {
                                style: {
                                    margin: 0,
                                    fontSize: '24px',
                                    fontWeight: '600',
                                    color: '#262626',
                                    lineHeight: '32px'
                                },
                                children: handoverData.customerName
                            }, void 0, false, {
                                fileName: "src/components/handover/HandoverDetailHeader.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/handover/HandoverDetailHeader.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                style: {
                                    color: '#666',
                                    fontSize: '14px'
                                },
                                children: ((_handoverData_crmData = handoverData.crmData) === null || _handoverData_crmData === void 0 ? void 0 : _handoverData_crmData.salesSource) === 'direct' ? `销售: ${((_handoverData_crmData1 = handoverData.crmData) === null || _handoverData_crmData1 === void 0 ? void 0 : _handoverData_crmData1.salesPerson) || '未知'}` : ((_handoverData_crmData2 = handoverData.crmData) === null || _handoverData_crmData2 === void 0 ? void 0 : _handoverData_crmData2.salesSource) === 'channel' ? `渠道: ${((_handoverData_crmData3 = handoverData.crmData) === null || _handoverData_crmData3 === void 0 ? void 0 : _handoverData_crmData3.channelPartner) || '未知'}` : '销售: 未知'
                            }, void 0, false, {
                                fileName: "src/components/handover/HandoverDetailHeader.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                size: "middle",
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        type: "default",
                                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.EditOutlined, {}, void 0, false, {
                                            fileName: "src/components/handover/HandoverDetailHeader.tsx",
                                            lineNumber: 129,
                                            columnNumber: 21
                                        }, void 0),
                                        onClick: onEdit,
                                        style: {
                                            borderColor: '#d9d9d9',
                                            color: '#666'
                                        },
                                        children: "编辑"
                                    }, void 0, false, {
                                        fileName: "src/components/handover/HandoverDetailHeader.tsx",
                                        lineNumber: 127,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        type: "text",
                                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.FileTextOutlined, {}, void 0, false, {
                                            fileName: "src/components/handover/HandoverDetailHeader.tsx",
                                            lineNumber: 141,
                                            columnNumber: 21
                                        }, void 0),
                                        onClick: onViewContract,
                                        style: {
                                            color: '#666',
                                            padding: '4px 8px'
                                        },
                                        title: "查看合同"
                                    }, void 0, false, {
                                        fileName: "src/components/handover/HandoverDetailHeader.tsx",
                                        lineNumber: 139,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        type: "text",
                                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ShareAltOutlined, {}, void 0, false, {
                                            fileName: "src/components/handover/HandoverDetailHeader.tsx",
                                            lineNumber: 152,
                                            columnNumber: 21
                                        }, void 0),
                                        onClick: onShare,
                                        style: {
                                            color: '#666',
                                            padding: '4px 8px'
                                        },
                                        title: "分享"
                                    }, void 0, false, {
                                        fileName: "src/components/handover/HandoverDetailHeader.tsx",
                                        lineNumber: 150,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/handover/HandoverDetailHeader.tsx",
                                lineNumber: 126,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/handover/HandoverDetailHeader.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/handover/HandoverDetailHeader.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px 24px 20px 24px',
                    gap: '16px',
                    flexWrap: 'wrap'
                },
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                        style: {
                            backgroundColor: statusConfig.color,
                            color: '#fff',
                            border: 'none',
                            borderRadius: '16px',
                            padding: '4px 12px',
                            fontSize: '13px',
                            fontWeight: '500',
                            margin: 0
                        },
                        children: statusConfig.text
                    }, void 0, false, {
                        fileName: "src/components/handover/HandoverDetailHeader.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                        style: {
                            backgroundColor: '#f5f5f5',
                            color: '#666',
                            border: 'none',
                            borderRadius: '16px',
                            padding: '4px 12px',
                            fontSize: '13px',
                            margin: 0
                        },
                        children: [
                            "档案完整度: ",
                            completeness,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "src/components/handover/HandoverDetailHeader.tsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                        style: {
                            backgroundColor: '#f5f5f5',
                            color: '#666',
                            border: 'none',
                            borderRadius: '16px',
                            padding: '4px 12px',
                            fontSize: '13px',
                            margin: 0
                        },
                        children: [
                            "服务期: ",
                            ((_handoverData_crmData4 = handoverData.crmData) === null || _handoverData_crmData4 === void 0 ? void 0 : _handoverData_crmData4.servicePeriod) || '2024-01-01 至 2024-12-31'
                        ]
                    }, void 0, true, {
                        fileName: "src/components/handover/HandoverDetailHeader.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                        style: {
                            backgroundColor: '#f5f5f5',
                            color: '#666',
                            border: 'none',
                            borderRadius: '16px',
                            padding: '4px 12px',
                            fontSize: '13px',
                            margin: 0
                        },
                        children: [
                            "续约",
                            renewalCount,
                            "次"
                        ]
                    }, void 0, true, {
                        fileName: "src/components/handover/HandoverDetailHeader.tsx",
                        lineNumber: 219,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/handover/HandoverDetailHeader.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/components/handover/HandoverDetailHeader.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
};
_c1 = HandoverDetailHeader;
var _default = HandoverDetailHeader;
var _c;
var _c1;
$RefreshReg$(_c, "PlatformIcon");
$RefreshReg$(_c1, "HandoverDetailHeader");
if (prevRefreshReg) self.$RefreshReg$ = prevRefreshReg;
if (prevRefreshSig) self.$RefreshSig$ = prevRefreshSig;
function registerClassComponent(filename, moduleExports) {
    for(const key in moduleExports)try {
        if (key === "__esModule") continue;
        const exportValue = moduleExports[key];
        if (_reactrefresh.isLikelyComponentType(exportValue) && exportValue.prototype && exportValue.prototype.isReactComponent) _reactrefresh.register(exportValue, filename + " " + key);
    } catch (e) {}
}
function $RefreshIsReactComponentLike$(moduleExports) {
    if (_reactrefresh.isLikelyComponentType(moduleExports || moduleExports.default)) return true;
    for(var key in moduleExports)try {
        if (_reactrefresh.isLikelyComponentType(moduleExports[key])) return true;
    } catch (e) {}
    return false;
}
registerClassComponent(module.id, module.exports);
if ($RefreshIsReactComponentLike$(module.exports)) {
    module.meta.hot.accept();
    _reactrefresh.performReactRefresh();
}

},
"src/components/handover/StakeholderOrgChart.tsx": function (module, exports, __mako_require__){
"use strict";
__mako_require__.d(exports, "__esModule", {
    value: true
});
__mako_require__.d(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
var _interop_require_wildcard = __mako_require__("@swc/helpers/_/_interop_require_wildcard");
var _reactrefresh = /*#__PURE__*/ _interop_require_wildcard._(__mako_require__("node_modules/react-refresh/runtime.js"));
var _jsxdevruntime = __mako_require__("node_modules/react/jsx-dev-runtime.js");
var _react = /*#__PURE__*/ _interop_require_wildcard._(__mako_require__("node_modules/react/index.js"));
var _antd = __mako_require__("node_modules/antd/es/index.js");
var _icons = __mako_require__("node_modules/@ant-design/icons/es/index.js");
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
var _s = $RefreshSig$();
const StakeholderOrgChart = ({ stakeholders, onStakeholderUpdate, onStakeholderAdd, onStakeholderDelete, chartHeight })=>{
    _s();
    const [isEditMode, setIsEditMode] = (0, _react.useState)(false);
    const [orgData, setOrgData] = (0, _react.useState)([]);
    const [draggedNode, setDraggedNode] = (0, _react.useState)(null);
    const [dragOverNode, setDragOverNode] = (0, _react.useState)(null);
    const [originalData, setOriginalData] = (0, _react.useState)([]);
    const [isAddModalVisible, setIsAddModalVisible] = (0, _react.useState)(false);
    const [editingNode, setEditingNode] = (0, _react.useState)(null);
    const [expandedKeys, setExpandedKeys] = (0, _react.useState)([]);
    const [selectedKeys, setSelectedKeys] = (0, _react.useState)([]);
    const [form] = _antd.Form.useForm();
    const containerRef = (0, _react.useRef)(null);
    const [historyVisible, setHistoryVisible] = (0, _react.useState)(null);
    // 构建树状结构
    const buildTreeStructure = (data)=>{
        const nodeMap = new Map();
        const rootNodes = [];
        // 初始化所有节点
        data.forEach((stakeholder)=>{
            nodeMap.set(stakeholder.id, {
                ...stakeholder,
                children: [],
                level: 0,
                parentId: undefined,
                key: stakeholder.id,
                title: stakeholder.name
            });
        });
        // 构建层级关系
        data.forEach((stakeholder)=>{
            const node = nodeMap.get(stakeholder.id);
            // 根据角色确定层级关系
            if (stakeholder.role === 'decision_maker') {
                node.level = 0;
                rootNodes.push(node);
            } else if (stakeholder.role === 'influencer') {
                node.level = 1;
                // 找到决策者作为父节点
                const decisionMaker = data.find((s)=>s.role === 'decision_maker');
                if (decisionMaker && decisionMaker.id !== stakeholder.id) {
                    node.parentId = decisionMaker.id;
                    const parent = nodeMap.get(decisionMaker.id);
                    if (parent) {
                        parent.children = parent.children || [];
                        parent.children.push(node);
                    }
                } else rootNodes.push(node);
            } else if (stakeholder.role === 'user' || stakeholder.role === 'technical_contact') {
                node.level = 2;
                // 优先找到影响者作为父节点，如果没有则找决策者
                const influencer = data.find((s)=>s.role === 'influencer');
                const parent = influencer || data.find((s)=>s.role === 'decision_maker');
                if (parent && parent.id !== stakeholder.id) {
                    node.parentId = parent.id;
                    const parentNode = nodeMap.get(parent.id);
                    if (parentNode) {
                        parentNode.children = parentNode.children || [];
                        parentNode.children.push(node);
                    }
                } else rootNodes.push(node);
            } else // 其他角色作为根节点
            rootNodes.push(node);
        });
        return rootNodes;
    };
    (0, _react.useEffect)(()=>{
        const treeData = buildTreeStructure(stakeholders);
        setOrgData(treeData);
        setOriginalData(JSON.parse(JSON.stringify(treeData)));
        // 默认展开所有节点
        const allKeys = getAllKeys(treeData);
        setExpandedKeys(allKeys);
    }, [
        stakeholders
    ]);
    // 获取所有节点的key
    const getAllKeys = (nodes)=>{
        const keys = [];
        const collectKeys = (nodeList)=>{
            nodeList.forEach((node)=>{
                keys.push(node.key);
                if (node.children && node.children.length > 0) collectKeys(node.children);
            });
        };
        collectKeys(nodes);
        return keys;
    };
    // Tree 拖拽处理
    const onDrop = (info)=>{
        if (!isEditMode) return;
        const dropKey = info.node.key;
        const dragKey = info.dragNode.key;
        const dropPos = info.node.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
        const loop = (data, key, callback)=>{
            data.forEach((item, index, arr)=>{
                if (item.key === key) {
                    callback(item, index, arr);
                    return;
                }
                if (item.children) loop(item.children, key, callback);
            });
        };
        const data = [
            ...orgData
        ];
        let dragObj = null;
        // 找到拖拽的节点
        loop(data, dragKey, (item, index, arr)=>{
            arr.splice(index, 1);
            dragObj = item;
        });
        if (!dragObj) return;
        if (!info.dropToGap) // 放置到节点内部
        loop(data, dropKey, (item)=>{
            item.children = item.children || [];
            item.children.unshift(dragObj);
        });
        else if ((info.node.props.children || []).length > 0 && info.node.props.expanded && dropPosition === 1) // 放置到展开节点的子节点位置
        loop(data, dropKey, (item)=>{
            item.children = item.children || [];
            item.children.unshift(dragObj);
        });
        else {
            // 放置到节点前后
            let ar = [];
            let i;
            loop(data, dropKey, (_item, index, arr)=>{
                ar = arr;
                i = index;
            });
            if (dropPosition === -1) ar.splice(i, 0, dragObj);
            else ar.splice(i + 1, 0, dragObj);
        }
        setOrgData(data);
    };
    // 保存更改
    const handleSave = ()=>{
        // 这里可以调用API保存层级关系
        _antd.message.success('层级关系已保存');
        setIsEditMode(false);
        setOriginalData(JSON.parse(JSON.stringify(orgData)));
    };
    // 取消编辑
    const handleCancel = ()=>{
        setOrgData(JSON.parse(JSON.stringify(originalData)));
        setIsEditMode(false);
        setDraggedNode(null);
        setDragOverNode(null);
        setIsAddModalVisible(false);
        setEditingNode(null);
        form.resetFields();
    };
    // 新增干系人
    const handleAddStakeholder = ()=>{
        setIsAddModalVisible(true);
        setEditingNode(null);
        form.resetFields();
    };
    // 编辑干系人
    const handleEditStakeholder = (node)=>{
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
    const handleDeleteStakeholder = (nodeId)=>{
        _antd.Modal.confirm({
            title: '确认删除',
            content: '确定要删除这个干系人吗？',
            onOk: ()=>{
                const removeNode = (nodes)=>{
                    return nodes.filter((node)=>node.id !== nodeId).map((node)=>({
                            ...node,
                            children: node.children ? removeNode(node.children) : []
                        }));
                };
                const newTree = removeNode(orgData);
                setOrgData(newTree);
                _antd.message.success('干系人已删除');
            }
        });
    };
    // 处理表单提交
    const handleFormSubmit = (values)=>{
        if (editingNode) {
            // 编辑现有干系人
            const updateNode = (nodes)=>{
                return nodes.map((node)=>{
                    if (node.id === editingNode.id) return {
                        ...node,
                        ...values
                    };
                    return {
                        ...node,
                        children: node.children ? updateNode(node.children) : []
                    };
                });
            };
            const newTree = updateNode(orgData);
            setOrgData(newTree);
            _antd.message.success('干系人信息已更新');
        } else {
            // 新增干系人
            const newStakeholder = {
                id: Date.now().toString(),
                name: values.name,
                position: values.position,
                role: values.role,
                contact: values.contact,
                status: values.status || 'active'
            };
            if (onStakeholderAdd) onStakeholderAdd(newStakeholder);
            // 添加到根节点
            const newTreeNode = {
                ...newStakeholder,
                children: [],
                level: 0,
                parentId: undefined,
                key: newStakeholder.id,
                title: newStakeholder.name
            };
            setOrgData([
                ...orgData,
                newTreeNode
            ]);
            _antd.message.success('干系人已添加');
        }
        setIsAddModalVisible(false);
        setEditingNode(null);
        form.resetFields();
    };
    // 将树数据转换为 Ant Design Tree 格式
    const convertToTreeData = (nodes)=>{
        return nodes.map((node)=>({
                key: node.key,
                title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        width: '100%'
                    },
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                            icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {}, void 0, false, {
                                fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                lineNumber: 315,
                                columnNumber: 25
                            }, void 0),
                            size: "small"
                        }, void 0, false, {
                            fileName: "src/components/handover/StakeholderOrgChart.tsx",
                            lineNumber: 315,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                flex: 1
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        fontWeight: 500,
                                        fontSize: '14px'
                                    },
                                    children: [
                                        node.name,
                                        node.status === 'left' && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                            color: "red",
                                            style: {
                                                marginLeft: 8
                                            },
                                            children: "已离职"
                                        }, void 0, false, {
                                            fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                            lineNumber: 320,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                    lineNumber: 317,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        fontSize: '12px',
                                        color: '#666'
                                    },
                                    children: node.position
                                }, void 0, false, {
                                    fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                    lineNumber: 323,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/handover/StakeholderOrgChart.tsx",
                            lineNumber: 316,
                            columnNumber: 11
                        }, this),
                        isEditMode && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                            size: "small",
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                    type: "text",
                                    size: "small",
                                    onClick: (e)=>{
                                        e.stopPropagation();
                                        setHistoryVisible(node);
                                    },
                                    children: "历史"
                                }, void 0, false, {
                                    fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                    lineNumber: 327,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                    type: "text",
                                    size: "small",
                                    icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.EditOutlined, {}, void 0, false, {
                                        fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                        lineNumber: 340,
                                        columnNumber: 23
                                    }, void 0),
                                    onClick: (e)=>{
                                        e.stopPropagation();
                                        handleEditStakeholder(node);
                                    },
                                    style: {
                                        padding: '2px',
                                        minWidth: 'auto'
                                    }
                                }, void 0, false, {
                                    fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                    lineNumber: 337,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                    type: "text",
                                    size: "small",
                                    icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DeleteOutlined, {}, void 0, false, {
                                        fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                        lineNumber: 350,
                                        columnNumber: 23
                                    }, void 0),
                                    onClick: (e)=>{
                                        e.stopPropagation();
                                        handleDeleteStakeholder(node.id);
                                    },
                                    style: {
                                        padding: '2px',
                                        minWidth: 'auto',
                                        color: '#ff4d4f'
                                    }
                                }, void 0, false, {
                                    fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                    lineNumber: 347,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/handover/StakeholderOrgChart.tsx",
                            lineNumber: 326,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/handover/StakeholderOrgChart.tsx",
                    lineNumber: 314,
                    columnNumber: 9
                }, this),
                children: node.children ? convertToTreeData(node.children) : undefined
            }));
    };
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
        title: "客户干系人架构",
        extra: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
            style: {
                display: 'flex',
                gap: '8px'
            },
            children: isEditMode ? /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_jsxdevruntime.Fragment, {
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                        type: "primary",
                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PlusOutlined, {}, void 0, false, {
                            fileName: "src/components/handover/StakeholderOrgChart.tsx",
                            lineNumber: 393,
                            columnNumber: 23
                        }, void 0),
                        size: "small",
                        onClick: handleAddStakeholder,
                        children: "新增"
                    }, void 0, false, {
                        fileName: "src/components/handover/StakeholderOrgChart.tsx",
                        lineNumber: 391,
                        columnNumber: 15
                    }, void 0),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                        type: "primary",
                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.SaveOutlined, {}, void 0, false, {
                            fileName: "src/components/handover/StakeholderOrgChart.tsx",
                            lineNumber: 401,
                            columnNumber: 23
                        }, void 0),
                        size: "small",
                        onClick: handleSave,
                        children: "保存"
                    }, void 0, false, {
                        fileName: "src/components/handover/StakeholderOrgChart.tsx",
                        lineNumber: 399,
                        columnNumber: 15
                    }, void 0),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.CloseOutlined, {}, void 0, false, {
                            fileName: "src/components/handover/StakeholderOrgChart.tsx",
                            lineNumber: 408,
                            columnNumber: 23
                        }, void 0),
                        size: "small",
                        onClick: handleCancel,
                        children: "取消"
                    }, void 0, false, {
                        fileName: "src/components/handover/StakeholderOrgChart.tsx",
                        lineNumber: 407,
                        columnNumber: 15
                    }, void 0)
                ]
            }, void 0, true) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.EditOutlined, {}, void 0, false, {
                    fileName: "src/components/handover/StakeholderOrgChart.tsx",
                    lineNumber: 417,
                    columnNumber: 21
                }, void 0),
                size: "small",
                onClick: ()=>setIsEditMode(true),
                children: "编辑层级"
            }, void 0, false, {
                fileName: "src/components/handover/StakeholderOrgChart.tsx",
                lineNumber: 416,
                columnNumber: 13
            }, void 0)
        }, void 0, false, {
            fileName: "src/components/handover/StakeholderOrgChart.tsx",
            lineNumber: 388,
            columnNumber: 9
        }, void 0),
        style: {
            borderRadius: '8px'
        },
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                ref: containerRef,
                style: {
                    height: chartHeight || 300,
                    overflow: 'auto'
                },
                children: orgData.length > 0 ? /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tree, {
                    treeData: convertToTreeData(orgData),
                    expandedKeys: expandedKeys,
                    selectedKeys: selectedKeys,
                    onExpand: (keys)=>setExpandedKeys(keys),
                    onSelect: (keys)=>setSelectedKeys(keys),
                    draggable: isEditMode,
                    onDrop: onDrop,
                    showLine: true,
                    showIcon: false,
                    blockNode: true,
                    style: {
                        padding: '16px'
                    }
                }, void 0, false, {
                    fileName: "src/components/handover/StakeholderOrgChart.tsx",
                    lineNumber: 430,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        padding: '40px',
                        textAlign: 'center',
                        color: '#999'
                    },
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("p", {
                        children: "暂无干系人信息"
                    }, void 0, false, {
                        fileName: "src/components/handover/StakeholderOrgChart.tsx",
                        lineNumber: 445,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "src/components/handover/StakeholderOrgChart.tsx",
                    lineNumber: 444,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "src/components/handover/StakeholderOrgChart.tsx",
                lineNumber: 428,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Modal, {
                title: editingNode ? '编辑干系人' : '新增干系人',
                open: isAddModalVisible,
                onCancel: ()=>{
                    setIsAddModalVisible(false);
                    setEditingNode(null);
                    form.resetFields();
                },
                footer: null,
                destroyOnClose: true,
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form, {
                    form: form,
                    layout: "vertical",
                    onFinish: handleFormSubmit,
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            name: "name",
                            label: "姓名",
                            rules: [
                                {
                                    required: true,
                                    message: '请输入姓名'
                                }
                            ],
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {
                                placeholder: "请输入干系人姓名"
                            }, void 0, false, {
                                fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                lineNumber: 472,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/handover/StakeholderOrgChart.tsx",
                            lineNumber: 467,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            name: "position",
                            label: "职位",
                            rules: [
                                {
                                    required: true,
                                    message: '请输入职位'
                                }
                            ],
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {
                                placeholder: "请输入职位"
                            }, void 0, false, {
                                fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                lineNumber: 480,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/handover/StakeholderOrgChart.tsx",
                            lineNumber: 475,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            name: "role",
                            label: "角色",
                            rules: [
                                {
                                    required: true,
                                    message: '请选择角色'
                                }
                            ],
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                placeholder: "请选择角色",
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select.Option, {
                                        value: "decision_maker",
                                        children: "决策者"
                                    }, void 0, false, {
                                        fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                        lineNumber: 489,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select.Option, {
                                        value: "influencer",
                                        children: "影响者"
                                    }, void 0, false, {
                                        fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                        lineNumber: 490,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select.Option, {
                                        value: "user",
                                        children: "使用者"
                                    }, void 0, false, {
                                        fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                        lineNumber: 491,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select.Option, {
                                        value: "technical_contact",
                                        children: "技术联系人"
                                    }, void 0, false, {
                                        fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                        lineNumber: 492,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                lineNumber: 488,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/handover/StakeholderOrgChart.tsx",
                            lineNumber: 483,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            name: "status",
                            label: "状态",
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                placeholder: "请选择状态",
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select.Option, {
                                        value: "active",
                                        children: "在职"
                                    }, void 0, false, {
                                        fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                        lineNumber: 501,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select.Option, {
                                        value: "left",
                                        children: "已离职"
                                    }, void 0, false, {
                                        fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                        lineNumber: 502,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                lineNumber: 500,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/handover/StakeholderOrgChart.tsx",
                            lineNumber: 496,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            name: "contact",
                            label: "联系方式",
                            rules: [
                                {
                                    required: true,
                                    message: '请输入联系方式'
                                }
                            ],
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {
                                placeholder: "请输入邮箱或电话"
                            }, void 0, false, {
                                fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                lineNumber: 511,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/handover/StakeholderOrgChart.tsx",
                            lineNumber: 506,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            style: {
                                marginBottom: 0,
                                textAlign: 'right'
                            },
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        onClick: ()=>{
                                            setIsAddModalVisible(false);
                                            setEditingNode(null);
                                            form.resetFields();
                                        },
                                        children: "取消"
                                    }, void 0, false, {
                                        fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                        lineNumber: 516,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        type: "primary",
                                        htmlType: "submit",
                                        children: editingNode ? '更新' : '添加'
                                    }, void 0, false, {
                                        fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                        lineNumber: 523,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                lineNumber: 515,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/handover/StakeholderOrgChart.tsx",
                            lineNumber: 514,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/handover/StakeholderOrgChart.tsx",
                    lineNumber: 462,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/handover/StakeholderOrgChart.tsx",
                lineNumber: 451,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Modal, {
                title: "干系人历史",
                open: !!historyVisible,
                onCancel: ()=>setHistoryVisible(null),
                footer: null,
                children: (historyVisible === null || historyVisible === void 0 ? void 0 : historyVisible.history) && historyVisible.history.length > 0 ? /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Timeline, {
                    items: historyVisible.history.map((h)=>({
                            children: `${h.startDate}${h.endDate ? ' ~ ' + h.endDate : ''} · ${h.position}${h.note ? ' · ' + h.note : ''}`
                        }))
                }, void 0, false, {
                    fileName: "src/components/handover/StakeholderOrgChart.tsx",
                    lineNumber: 539,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        color: '#999'
                    },
                    children: "暂无历史记录"
                }, void 0, false, {
                    fileName: "src/components/handover/StakeholderOrgChart.tsx",
                    lineNumber: 543,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "src/components/handover/StakeholderOrgChart.tsx",
                lineNumber: 532,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/components/handover/StakeholderOrgChart.tsx",
        lineNumber: 385,
        columnNumber: 5
    }, this);
};
_s(StakeholderOrgChart, "j5Msrl/uIWrXMVwamSmFJBB8gD0=", false, function() {
    return [
        _antd.Form.useForm
    ];
});
_c = StakeholderOrgChart;
var _default = StakeholderOrgChart;
var _c;
$RefreshReg$(_c, "StakeholderOrgChart");
if (prevRefreshReg) self.$RefreshReg$ = prevRefreshReg;
if (prevRefreshSig) self.$RefreshSig$ = prevRefreshSig;
function registerClassComponent(filename, moduleExports) {
    for(const key in moduleExports)try {
        if (key === "__esModule") continue;
        const exportValue = moduleExports[key];
        if (_reactrefresh.isLikelyComponentType(exportValue) && exportValue.prototype && exportValue.prototype.isReactComponent) _reactrefresh.register(exportValue, filename + " " + key);
    } catch (e) {}
}
function $RefreshIsReactComponentLike$(moduleExports) {
    if (_reactrefresh.isLikelyComponentType(moduleExports || moduleExports.default)) return true;
    for(var key in moduleExports)try {
        if (_reactrefresh.isLikelyComponentType(moduleExports[key])) return true;
    } catch (e) {}
    return false;
}
registerClassComponent(module.id, module.exports);
if ($RefreshIsReactComponentLike$(module.exports)) {
    module.meta.hot.accept();
    _reactrefresh.performReactRefresh();
}

},
"src/pages/handover/[id]/index.tsx": function (module, exports, __mako_require__){
"use strict";
__mako_require__.d(exports, "__esModule", {
    value: true
});
__mako_require__.d(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
var _interop_require_default = __mako_require__("@swc/helpers/_/_interop_require_default");
var _interop_require_wildcard = __mako_require__("@swc/helpers/_/_interop_require_wildcard");
var _reactrefresh = /*#__PURE__*/ _interop_require_wildcard._(__mako_require__("node_modules/react-refresh/runtime.js"));
var _jsxdevruntime = __mako_require__("node_modules/react/jsx-dev-runtime.js");
var _react = /*#__PURE__*/ _interop_require_wildcard._(__mako_require__("node_modules/react/index.js"));
var _max = __mako_require__("src/.umi/exports.ts");
var _antd = __mako_require__("node_modules/antd/es/index.js");
var _icons = __mako_require__("node_modules/@ant-design/icons/es/index.js");
var _umi = __mako_require__("src/.umi/exports.ts");
var _handoverData = __mako_require__("src/mock/handoverData.ts");
var _HandoverDetailHeader = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/handover/HandoverDetailHeader.tsx"));
var _StakeholderOrgChart = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/handover/StakeholderOrgChart.tsx"));
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
var _s = $RefreshSig$();
const { Title, Text } = _antd.Typography;
const { TextArea } = _antd.Input;
const { Panel } = _antd.Collapse;
// 页签样式
const tabStyles = {
    tabBar: {
        margin: 0,
        backgroundColor: '#fff',
        borderBottom: '1px solid #f0f0f0',
        padding: '0 24px'
    },
    tab: {
        padding: '16px 32px',
        margin: '0',
        border: 'none',
        background: 'transparent',
        transition: 'all 0.3s ease',
        textAlign: 'center'
    },
    tabActive: {
        background: '#fff',
        borderBottom: '2px solid #1890ff'
    },
    tabBtn: {
        fontSize: '14px',
        fontWeight: 500,
        color: '#666',
        transition: 'color 0.3s ease',
        whiteSpace: 'nowrap'
    },
    tabBtnActive: {
        color: '#1890ff',
        fontWeight: 600
    }
};
const HandoverDetailPage = ()=>{
    var _handoverData_crmData_contractAmount, _handoverData_crmData, _handoverData_crmData1, _handoverData_crmData2, _handoverData_crmData_purchasedProducts, _handoverData_crmData3, _handoverData_crmData4, _handoverData_crmData5, _handoverData_crmData6, _handoverData_crmData7, _handoverData_crmData8, _handoverData_crmData9, _handoverData_crmData10, _handoverData_crmData11, _handoverData_crmData12;
    _s();
    const navigate = (0, _umi.useNavigate)();
    const { id } = (0, _umi.useParams)();
    const location = (0, _umi.useLocation)();
    // 添加自定义样式来强制标签页均匀分布
    (0, _react.useEffect)(()=>{
        const style = document.createElement('style');
        style.textContent = `
      .ant-tabs-nav-list {
        width: 100% !important;
        display: flex !important;
      }
      .ant-tabs-tab {
        min-width: 80px !important;
        max-width: none !important;
        text-align: left !important;
        margin: 0 8px 0 0 !important;
        flex-shrink: 0 !important;
      }
      .ant-tabs-tab-btn {
        width: 100% !important;
        text-align: left !important;
        white-space: nowrap !important;
      }
    `;
        document.head.appendChild(style);
        return ()=>{
            document.head.removeChild(style);
        };
    }, []);
    const [loading, setLoading] = (0, _react.useState)(true);
    const [handoverData, setHandoverData] = (0, _react.useState)(null);
    const [onboardingTasks, setOnboardingTasks] = (0, _react.useState)([]);
    const [internalComments, setInternalComments] = (0, _react.useState)([]);
    const [newComment, setNewComment] = (0, _react.useState)('');
    const [stakeholders, setStakeholders] = (0, _react.useState)([]);
    const [analysisData, setAnalysisData] = (0, _react.useState)({
        painPoints: '',
        successCriteria: '',
        risks: ''
    });
    // 解析 URL 中的默认 tab，并保持与 URL 同步
    const searchParams = new URLSearchParams(location.search);
    const defaultTab = searchParams.get('tab') || 'action-plan';
    const [activeTab, setActiveTab] = (0, _react.useState)(defaultTab);
    (0, _react.useEffect)(()=>{
        const params = new URLSearchParams(location.search);
        const tab = params.get('tab') || 'action-plan';
        setActiveTab(tab);
    }, [
        location.search
    ]);
    (0, _react.useEffect)(()=>{
        const loadData = async ()=>{
            console.log('详情页面加载，ID:', id);
            setLoading(true);
            try {
                await new Promise((resolve)=>setTimeout(resolve, 500));
                const data = _handoverData.mockCustomerHandovers.find((item)=>item.id === id);
                console.log('找到的数据:', data);
                if (data) {
                    setHandoverData(data);
                    setOnboardingTasks(data.onboardingTasks || _handoverData.mockOnboardingTasks);
                    setInternalComments(data.internalComments || _handoverData.mockInternalComments);
                    setStakeholders(data.stakeholders || _handoverData.mockStakeholders);
                    // 设置分析数据
                    setAnalysisData({
                        painPoints: data.corePainPoints || '客户对数据安全要求较高，需要满足行业合规标准。',
                        successCriteria: data.successCriteria || '完成系统部署，用户培训，实现业务流程数字化。',
                        risks: data.riskDetails || '客户技术团队经验不足，可能需要额外的技术支持。'
                    });
                    // 动态设置页面标题
                    const title = `${data.customerName} - 客户交接详情`;
                    document.title = title;
                    // 触发tab标题更新
                    setTimeout(()=>{
                        const event = new CustomEvent('tabTitleUpdate', {
                            detail: {
                                path: location.pathname,
                                title
                            }
                        });
                        window.dispatchEvent(event);
                    }, 100);
                } else {
                    console.log('未找到数据，ID:', id);
                    _antd.message.error('未找到客户交接记录');
                    navigate('/profiles/handover-implementation');
                }
            } catch (error) {
                console.error('加载数据失败:', error);
                _antd.message.error('加载数据失败');
            } finally{
                setLoading(false);
            }
        };
        loadData();
    }, [
        id,
        navigate
    ]);
    // 处理返回
    const handleBack = ()=>{
        // 触发删除当前详情页tab的事件
        const event = new CustomEvent('tabClose', {
            detail: {
                path: location.pathname
            }
        });
        window.dispatchEvent(event);
        // 延迟导航，确保tab删除事件先处理
        setTimeout(()=>{
            navigate('/profiles/handover-implementation');
        }, 50);
    };
    // 处理编辑
    const handleEdit = ()=>{
        _antd.message.info('编辑功能开发中...');
    };
    // 处理查看合同
    const handleViewContract = ()=>{
        _antd.message.info('查看合同功能开发中...');
    };
    // 处理分享
    const handleShare = ()=>{
        _antd.message.info('分享功能开发中...');
    };
    // 处理任务完成状态
    const handleTaskToggle = (taskId)=>{
        const newTasks = onboardingTasks.map((task)=>task.id === taskId ? {
                ...task,
                completed: !task.completed
            } : task);
        setOnboardingTasks(newTasks);
    };
    // 处理添加评论
    const handleAddComment = ()=>{
        if (!newComment.trim()) {
            _antd.message.warning('请输入评论内容');
            return;
        }
        const comment = {
            id: Date.now().toString(),
            content: newComment,
            author: 'CSM-小王',
            createdAt: new Date().toLocaleString('zh-CN')
        };
        setInternalComments([
            comment,
            ...internalComments
        ]);
        setNewComment('');
        _antd.message.success('评论已添加');
    };
    // 处理干系人更新
    const handleStakeholderUpdate = (updatedStakeholder)=>{
        setStakeholders((prev)=>prev.map((s)=>s.id === updatedStakeholder.id ? updatedStakeholder : s));
    };
    // 处理干系人添加
    const handleStakeholderAdd = (newStakeholder)=>{
        setStakeholders((prev)=>[
                ...prev,
                newStakeholder
            ]);
    };
    // 处理干系人删除
    const handleStakeholderDelete = (id)=>{
        setStakeholders((prev)=>prev.filter((s)=>s.id !== id));
    };
    if (loading) return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            padding: '24px',
            textAlign: 'center',
            background: '#f5f5f5',
            minHeight: 'calc(100vh - 120px)',
            paddingBottom: '60px' // 为footer留出底部间距
        },
        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
            children: "加载中..."
        }, void 0, false, {
            fileName: "src/pages/handover/[id]/index.tsx",
            lineNumber: 266,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "src/pages/handover/[id]/index.tsx",
        lineNumber: 259,
        columnNumber: 7
    }, this);
    if (!handoverData) return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            padding: '24px',
            textAlign: 'center',
            background: '#f5f5f5',
            minHeight: 'calc(100vh - 120px)',
            paddingBottom: '60px' // 为footer留出底部间距
        },
        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
            children: "未找到客户交接记录"
        }, void 0, false, {
            fileName: "src/pages/handover/[id]/index.tsx",
            lineNumber: 280,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "src/pages/handover/[id]/index.tsx",
        lineNumber: 273,
        columnNumber: 7
    }, this);
    // 状态标签颜色映射
    const statusColorMap = {
        normal: 'green',
        not_handover: 'orange',
        risk: 'red'
    };
    const statusTextMap = {
        normal: '正常交接',
        not_handover: '未交接',
        risk: '有风险'
    };
    const riskColorMap = {
        high: 'red',
        medium: 'orange',
        low: 'green'
    };
    const riskTextMap = {
        high: '高风险',
        medium: '中风险',
        low: '低风险'
    };
    const ORG_CHART_HEIGHT = 560;
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_jsxdevruntime.Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_max.Helmet, {
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("title", {
                    children: handoverData ? `${handoverData.customerName} - 客户交接详情` : '客户交接详情'
                }, void 0, false, {
                    fileName: "src/pages/handover/[id]/index.tsx",
                    lineNumber: 314,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/pages/handover/[id]/index.tsx",
                lineNumber: 313,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    padding: '24px',
                    background: '#f5f5f5',
                    minHeight: 'calc(100vh - 120px)',
                    paddingBottom: '60px' // 为footer留出底部间距
                },
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        maxWidth: '1200px',
                        margin: '0 auto'
                    },
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                marginBottom: '24px'
                            },
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_HandoverDetailHeader.default, {
                                handoverData: handoverData,
                                onBack: handleBack,
                                onEdit: handleEdit,
                                onViewContract: handleViewContract,
                                onShare: handleShare
                            }, void 0, false, {
                                fileName: "src/pages/handover/[id]/index.tsx",
                                lineNumber: 331,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "src/pages/handover/[id]/index.tsx",
                            lineNumber: 330,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
                            },
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tabs, {
                                activeKey: activeTab,
                                onChange: (key)=>{
                                    setActiveTab(key);
                                    // 同步到 URL（不新增历史记录）
                                    const params = new URLSearchParams(location.search);
                                    params.set('tab', String(key));
                                    navigate(`${location.pathname}?${params.toString()}`, {
                                        replace: true
                                    });
                                },
                                style: {
                                    margin: 0
                                },
                                tabBarStyle: {
                                    margin: 0,
                                    backgroundColor: '#fff',
                                    borderBottom: '1px solid #f0f0f0',
                                    padding: '0 24px'
                                },
                                size: "large",
                                type: "line",
                                items: [
                                    {
                                        key: 'action-plan',
                                        label: '行动计划',
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                padding: '24px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: "Onboarding行动计划",
                                                    style: {
                                                        marginBottom: '16px',
                                                        borderRadius: '8px'
                                                    },
                                                    size: "small",
                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            padding: '8px 0'
                                                        },
                                                        children: onboardingTasks.map((task)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                style: {
                                                                    marginBottom: '12px'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                                                        checked: task.completed,
                                                                        onChange: ()=>handleTaskToggle(task.id),
                                                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                                            style: {
                                                                                textDecoration: task.completed ? 'line-through' : 'none',
                                                                                color: task.completed ? '#999' : '#333',
                                                                                fontSize: '14px'
                                                                            },
                                                                            children: task.title
                                                                        }, void 0, false, {
                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                            lineNumber: 378,
                                                                            columnNumber: 29
                                                                        }, void 0)
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 377,
                                                                        columnNumber: 27
                                                                    }, void 0),
                                                                    task.dueDate && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                        type: "secondary",
                                                                        style: {
                                                                            fontSize: '12px',
                                                                            marginLeft: '8px'
                                                                        },
                                                                        children: task.dueDate
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 383,
                                                                        columnNumber: 29
                                                                    }, void 0)
                                                                ]
                                                            }, task.id, true, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 376,
                                                                columnNumber: 25
                                                            }, void 0))
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 374,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 373,
                                                    columnNumber: 19
                                                }, void 0),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: "近期协作动态",
                                                    style: {
                                                        marginBottom: '16px',
                                                        borderRadius: '8px'
                                                    },
                                                    size: "small",
                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            maxHeight: '240px',
                                                            overflowY: 'auto'
                                                        },
                                                        children: internalComments.slice(0, 5).map((comment)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                style: {
                                                                    padding: '12px 0',
                                                                    borderBottom: '1px solid #f0f0f0'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                        style: {
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            marginBottom: '6px'
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                                                                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {}, void 0, false, {
                                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                                    lineNumber: 398,
                                                                                    columnNumber: 43
                                                                                }, void 0),
                                                                                size: 24,
                                                                                style: {
                                                                                    marginRight: '8px'
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 398,
                                                                                columnNumber: 29
                                                                            }, void 0),
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                                                style: {
                                                                                    fontWeight: 500
                                                                                },
                                                                                children: comment.author
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 399,
                                                                                columnNumber: 29
                                                                            }, void 0),
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                                                style: {
                                                                                    color: '#999',
                                                                                    marginLeft: '8px',
                                                                                    fontSize: '12px'
                                                                                },
                                                                                children: comment.createdAt
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 400,
                                                                                columnNumber: 29
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 397,
                                                                        columnNumber: 27
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                        style: {
                                                                            fontSize: '14px'
                                                                        },
                                                                        children: comment.content
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 402,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                ]
                                                            }, comment.id, true, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 396,
                                                                columnNumber: 25
                                                            }, void 0))
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 394,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 393,
                                                    columnNumber: 19
                                                }, void 0),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    style: {
                                                        marginBottom: '16px',
                                                        borderRadius: '8px'
                                                    },
                                                    size: "small",
                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Collapse, {
                                                        defaultActiveKey: [],
                                                        ghost: true,
                                                        expandIcon: ({ isActive })=>isActive ? /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UpOutlined, {}, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 410,
                                                                columnNumber: 101
                                                            }, void 0) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DownOutlined, {}, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 410,
                                                                columnNumber: 118
                                                            }, void 0),
                                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Panel, {
                                                            header: "内部协作沟通",
                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                style: {
                                                                    padding: '8px 0'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                        style: {
                                                                            marginBottom: '20px'
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                                                                placeholder: "输入评论，支持@功能...",
                                                                                value: newComment,
                                                                                onChange: (e)=>setNewComment(e.target.value),
                                                                                rows: 3,
                                                                                style: {
                                                                                    marginBottom: '8px'
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 414,
                                                                                columnNumber: 29
                                                                            }, void 0),
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                                                type: "primary",
                                                                                size: "small",
                                                                                onClick: handleAddComment,
                                                                                children: "发送评论"
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 415,
                                                                                columnNumber: 29
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 413,
                                                                        columnNumber: 27
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Divider, {
                                                                        style: {
                                                                            margin: '16px 0'
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 419,
                                                                        columnNumber: 27
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                strong: true,
                                                                                style: {
                                                                                    display: 'block',
                                                                                    marginBottom: '12px',
                                                                                    color: '#333'
                                                                                },
                                                                                children: "历史评论"
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 421,
                                                                                columnNumber: 29
                                                                            }, void 0),
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                                style: {
                                                                                    maxHeight: '300px',
                                                                                    overflowY: 'auto'
                                                                                },
                                                                                children: internalComments.map((comment)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                                        style: {
                                                                                            marginBottom: '16px',
                                                                                            padding: '12px',
                                                                                            border: '1px solid #f0f0f0',
                                                                                            borderRadius: '6px',
                                                                                            background: '#fff'
                                                                                        },
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                                                style: {
                                                                                                    display: 'flex',
                                                                                                    alignItems: 'center',
                                                                                                    marginBottom: '8px'
                                                                                                },
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                                                                                                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {}, void 0, false, {
                                                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                            lineNumber: 428,
                                                                                                            columnNumber: 51
                                                                                                        }, void 0),
                                                                                                        style: {
                                                                                                            marginRight: '8px'
                                                                                                        }
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                        lineNumber: 428,
                                                                                                        columnNumber: 37
                                                                                                    }, void 0),
                                                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                                                                        style: {
                                                                                                            fontWeight: 'bold',
                                                                                                            fontSize: '14px'
                                                                                                        },
                                                                                                        children: comment.author
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                        lineNumber: 429,
                                                                                                        columnNumber: 37
                                                                                                    }, void 0),
                                                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                                                                        style: {
                                                                                                            color: '#999',
                                                                                                            marginLeft: '8px',
                                                                                                            fontSize: '12px'
                                                                                                        },
                                                                                                        children: comment.createdAt
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                        lineNumber: 430,
                                                                                                        columnNumber: 37
                                                                                                    }, void 0)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                lineNumber: 427,
                                                                                                columnNumber: 35
                                                                                            }, void 0),
                                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                                                style: {
                                                                                                    fontSize: '14px',
                                                                                                    lineHeight: '1.5'
                                                                                                },
                                                                                                children: [
                                                                                                    comment.content,
                                                                                                    comment.mentions && comment.mentions.length > 0 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                                                        style: {
                                                                                                            marginTop: '4px'
                                                                                                        },
                                                                                                        children: comment.mentions.map((mention)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                                                                color: "blue",
                                                                                                                children: [
                                                                                                                    "@",
                                                                                                                    mention
                                                                                                                ]
                                                                                                            }, mention, true, {
                                                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                                lineNumber: 437,
                                                                                                                columnNumber: 43
                                                                                                            }, void 0))
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                        lineNumber: 435,
                                                                                                        columnNumber: 39
                                                                                                    }, void 0)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                lineNumber: 432,
                                                                                                columnNumber: 35
                                                                                            }, void 0)
                                                                                        ]
                                                                                    }, comment.id, true, {
                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                        lineNumber: 426,
                                                                                        columnNumber: 33
                                                                                    }, void 0))
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 424,
                                                                                columnNumber: 29
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 420,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 412,
                                                                columnNumber: 25
                                                            }, void 0)
                                                        }, "communication", false, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 411,
                                                            columnNumber: 23
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 410,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 409,
                                                    columnNumber: 19
                                                }, void 0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/pages/handover/[id]/index.tsx",
                                            lineNumber: 371,
                                            columnNumber: 17
                                        }, void 0)
                                    },
                                    {
                                        key: 'basic-info',
                                        label: '基础信息',
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                padding: '24px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: "基本信息",
                                                    size: "small",
                                                    style: {
                                                        marginBottom: '16px',
                                                        borderRadius: '8px'
                                                    },
                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions, {
                                                        column: 1,
                                                        size: "small",
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "客户名称",
                                                                children: handoverData.customerName
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 462,
                                                                columnNumber: 23
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "交接状态",
                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                    color: statusColorMap[handoverData.handoverStatus],
                                                                    children: statusTextMap[handoverData.handoverStatus]
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 464,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 463,
                                                                columnNumber: 23
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "风险等级",
                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                    color: riskColorMap[handoverData.riskLevel],
                                                                    children: riskTextMap[handoverData.riskLevel]
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 467,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 466,
                                                                columnNumber: 23
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 461,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 460,
                                                    columnNumber: 19
                                                }, void 0),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: "CRM信息",
                                                    size: "small",
                                                    style: {
                                                        marginBottom: '16px',
                                                        borderRadius: '8px'
                                                    },
                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions, {
                                                        column: 2,
                                                        size: "small",
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "合同金额",
                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                    strong: true,
                                                                    style: {
                                                                        color: '#1890ff'
                                                                    },
                                                                    children: [
                                                                        "¥",
                                                                        ((_handoverData_crmData = handoverData.crmData) === null || _handoverData_crmData === void 0 ? void 0 : (_handoverData_crmData_contractAmount = _handoverData_crmData.contractAmount) === null || _handoverData_crmData_contractAmount === void 0 ? void 0 : _handoverData_crmData_contractAmount.toLocaleString()) || '0'
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 474,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 473,
                                                                columnNumber: 23
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "服务周期",
                                                                children: ((_handoverData_crmData1 = handoverData.crmData) === null || _handoverData_crmData1 === void 0 ? void 0 : _handoverData_crmData1.servicePeriod) || '未知'
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 476,
                                                                columnNumber: 23
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "购买账号数",
                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                    strong: true,
                                                                    style: {
                                                                        color: '#52c41a'
                                                                    },
                                                                    children: [
                                                                        ((_handoverData_crmData2 = handoverData.crmData) === null || _handoverData_crmData2 === void 0 ? void 0 : _handoverData_crmData2.accountCount) || '0',
                                                                        " 个"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 478,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 477,
                                                                columnNumber: 23
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "已购产品",
                                                                span: 2,
                                                                children: ((_handoverData_crmData3 = handoverData.crmData) === null || _handoverData_crmData3 === void 0 ? void 0 : (_handoverData_crmData_purchasedProducts = _handoverData_crmData3.purchasedProducts) === null || _handoverData_crmData_purchasedProducts === void 0 ? void 0 : _handoverData_crmData_purchasedProducts.map((p, i)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                        color: "blue",
                                                                        style: {
                                                                            marginBottom: 4
                                                                        },
                                                                        children: p
                                                                    }, i, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 482,
                                                                        columnNumber: 27
                                                                    }, void 0))) || '暂无产品信息'
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 480,
                                                                columnNumber: 23
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 472,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 471,
                                                    columnNumber: 19
                                                }, void 0),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: "销售来源信息",
                                                    size: "small",
                                                    style: {
                                                        borderRadius: '8px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions, {
                                                            column: 2,
                                                            size: "small",
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                    label: "销售类型",
                                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                        color: ((_handoverData_crmData4 = handoverData.crmData) === null || _handoverData_crmData4 === void 0 ? void 0 : _handoverData_crmData4.salesSource) === 'direct' ? 'blue' : 'green',
                                                                        children: ((_handoverData_crmData5 = handoverData.crmData) === null || _handoverData_crmData5 === void 0 ? void 0 : _handoverData_crmData5.salesSource) === 'direct' ? '直营' : ((_handoverData_crmData6 = handoverData.crmData) === null || _handoverData_crmData6 === void 0 ? void 0 : _handoverData_crmData6.salesSource) === 'channel' ? '渠道' : '直营'
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 490,
                                                                        columnNumber: 25
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 489,
                                                                    columnNumber: 23
                                                                }, void 0),
                                                                ((_handoverData_crmData7 = handoverData.crmData) === null || _handoverData_crmData7 === void 0 ? void 0 : _handoverData_crmData7.salesSource) === 'direct' && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                    label: "销售人员",
                                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                        strong: true,
                                                                        children: ((_handoverData_crmData8 = handoverData.crmData) === null || _handoverData_crmData8 === void 0 ? void 0 : _handoverData_crmData8.salesPerson) || '未知'
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 496,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 495,
                                                                    columnNumber: 25
                                                                }, void 0),
                                                                ((_handoverData_crmData9 = handoverData.crmData) === null || _handoverData_crmData9 === void 0 ? void 0 : _handoverData_crmData9.salesSource) === 'channel' && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                    label: "渠道合作伙伴",
                                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                        strong: true,
                                                                        children: ((_handoverData_crmData10 = handoverData.crmData) === null || _handoverData_crmData10 === void 0 ? void 0 : _handoverData_crmData10.channelPartner) || '未知'
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 501,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 500,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 488,
                                                            columnNumber: 21
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginTop: '16px'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                    strong: true,
                                                                    style: {
                                                                        display: 'block',
                                                                        marginBottom: '8px'
                                                                    },
                                                                    children: "销售备注"
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 506,
                                                                    columnNumber: 23
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        padding: '12px',
                                                                        background: '#f8f9fa',
                                                                        borderRadius: '6px',
                                                                        border: '1px solid #e8e8e8'
                                                                    },
                                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                        children: ((_handoverData_crmData11 = handoverData.crmData) === null || _handoverData_crmData11 === void 0 ? void 0 : _handoverData_crmData11.salesNotes) || '暂无备注'
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 508,
                                                                        columnNumber: 25
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 507,
                                                                    columnNumber: 23
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 505,
                                                            columnNumber: 21
                                                        }, void 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 487,
                                                    columnNumber: 19
                                                }, void 0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/pages/handover/[id]/index.tsx",
                                            lineNumber: 459,
                                            columnNumber: 17
                                        }, void 0)
                                    },
                                    {
                                        key: 'expectation-alignment',
                                        label: '期望对齐',
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                padding: '24px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: "期望对齐状态",
                                                    size: "small",
                                                    style: {
                                                        marginBottom: '16px',
                                                        borderRadius: '8px'
                                                    },
                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '16px'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                        type: "secondary",
                                                                        style: {
                                                                            fontSize: '12px'
                                                                        },
                                                                        children: "对齐状态"
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 523,
                                                                        columnNumber: 25
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                        style: {
                                                                            marginTop: '4px'
                                                                        },
                                                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                            color: handoverData.expectationAlignment === 'aligned' ? 'green' : handoverData.expectationAlignment === 'partially_aligned' ? 'gold' : 'red',
                                                                            style: {
                                                                                fontSize: '14px',
                                                                                padding: '4px 12px'
                                                                            },
                                                                            children: handoverData.expectationAlignment === 'aligned' ? '已对齐' : handoverData.expectationAlignment === 'partially_aligned' ? '部分对齐' : '未对齐'
                                                                        }, void 0, false, {
                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                            lineNumber: 525,
                                                                            columnNumber: 27
                                                                        }, void 0)
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 524,
                                                                        columnNumber: 25
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 522,
                                                                columnNumber: 23
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                        type: "secondary",
                                                                        style: {
                                                                            fontSize: '12px'
                                                                        },
                                                                        children: "档案完整度"
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 531,
                                                                        columnNumber: 25
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                        style: {
                                                                            marginTop: '4px'
                                                                        },
                                                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Progress, {
                                                                            percent: handoverData.expectationAlignment === 'aligned' ? 100 : handoverData.expectationAlignment === 'partially_aligned' ? 60 : 30,
                                                                            size: "small",
                                                                            showInfo: false,
                                                                            strokeColor: handoverData.expectationAlignment === 'aligned' ? '#52c41a' : handoverData.expectationAlignment === 'partially_aligned' ? '#faad14' : '#ff4d4f'
                                                                        }, void 0, false, {
                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                            lineNumber: 533,
                                                                            columnNumber: 27
                                                                        }, void 0)
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 532,
                                                                        columnNumber: 25
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 530,
                                                                columnNumber: 23
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 521,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 520,
                                                    columnNumber: 19
                                                }, void 0),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: "核心痛点与期望",
                                                    style: {
                                                        marginBottom: '16px',
                                                        borderRadius: '8px'
                                                    },
                                                    size: "small",
                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                                        value: analysisData.painPoints,
                                                        onChange: (e)=>setAnalysisData((prev)=>({
                                                                    ...prev,
                                                                    painPoints: e.target.value
                                                                })),
                                                        rows: 3,
                                                        placeholder: "请输入客户的核心痛点和期望..."
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 544,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 543,
                                                    columnNumber: 19
                                                }, void 0),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: "成功标准",
                                                    style: {
                                                        marginBottom: '16px',
                                                        borderRadius: '8px'
                                                    },
                                                    size: "small",
                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                                        value: analysisData.successCriteria,
                                                        onChange: (e)=>setAnalysisData((prev)=>({
                                                                    ...prev,
                                                                    successCriteria: e.target.value
                                                                })),
                                                        rows: 3,
                                                        placeholder: "请输入补充的成功标准..."
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 552,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 551,
                                                    columnNumber: 19
                                                }, void 0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/pages/handover/[id]/index.tsx",
                                            lineNumber: 519,
                                            columnNumber: 17
                                        }, void 0)
                                    },
                                    {
                                        key: 'stakeholders',
                                        label: '干系人',
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                padding: '24px'
                                            },
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                                                gutter: 16,
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                        span: 16,
                                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_StakeholderOrgChart.default, {
                                                            stakeholders: stakeholders,
                                                            onStakeholderUpdate: handleStakeholderUpdate,
                                                            onStakeholderAdd: handleStakeholderAdd,
                                                            onStakeholderDelete: handleStakeholderDelete,
                                                            chartHeight: ORG_CHART_HEIGHT
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 569,
                                                            columnNumber: 23
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 568,
                                                        columnNumber: 21
                                                    }, void 0),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                        span: 8,
                                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                            title: "关键联系人",
                                                            size: "small",
                                                            style: {
                                                                borderRadius: '8px'
                                                            },
                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                style: {
                                                                    height: ORG_CHART_HEIGHT,
                                                                    overflow: 'auto'
                                                                },
                                                                children: ((_handoverData_crmData12 = handoverData.crmData) === null || _handoverData_crmData12 === void 0 ? void 0 : _handoverData_crmData12.keyContacts) && handoverData.crmData.keyContacts.length > 0 ? handoverData.crmData.keyContacts.map((contact, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                        style: {
                                                                            marginBottom: '12px',
                                                                            padding: '12px',
                                                                            background: '#f8f9fa',
                                                                            borderRadius: '6px',
                                                                            border: '1px solid #e8e8e8'
                                                                        },
                                                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                            children: contact
                                                                        }, void 0, false, {
                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                            lineNumber: 583,
                                                                            columnNumber: 33
                                                                        }, void 0)
                                                                    }, index, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 582,
                                                                        columnNumber: 31
                                                                    }, void 0)) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        padding: '20px',
                                                                        textAlign: 'center',
                                                                        color: '#999'
                                                                    },
                                                                    children: "暂无关键联系人信息"
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 587,
                                                                    columnNumber: 29
                                                                }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 579,
                                                                columnNumber: 25
                                                            }, void 0)
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 578,
                                                            columnNumber: 23
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 577,
                                                        columnNumber: 21
                                                    }, void 0)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                lineNumber: 567,
                                                columnNumber: 19
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "src/pages/handover/[id]/index.tsx",
                                            lineNumber: 566,
                                            columnNumber: 17
                                        }, void 0)
                                    },
                                    {
                                        key: 'risks-opportunities',
                                        label: '风险与商机',
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                padding: '24px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: "风险提示",
                                                    size: "small",
                                                    style: {
                                                        marginBottom: '16px',
                                                        borderRadius: '8px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '16px',
                                                                marginBottom: '16px'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                            type: "secondary",
                                                                            style: {
                                                                                fontSize: '12px'
                                                                            },
                                                                            children: "风险等级"
                                                                        }, void 0, false, {
                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                            lineNumber: 606,
                                                                            columnNumber: 25
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                            style: {
                                                                                marginTop: '4px'
                                                                            },
                                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                                color: riskColorMap[handoverData.riskLevel],
                                                                                style: {
                                                                                    fontSize: '14px',
                                                                                    padding: '4px 12px'
                                                                                },
                                                                                children: riskTextMap[handoverData.riskLevel]
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 608,
                                                                                columnNumber: 27
                                                                            }, void 0)
                                                                        }, void 0, false, {
                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                            lineNumber: 607,
                                                                            columnNumber: 25
                                                                        }, void 0)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 605,
                                                                    columnNumber: 23
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                            type: "secondary",
                                                                            style: {
                                                                                fontSize: '12px'
                                                                            },
                                                                            children: "风险评分"
                                                                        }, void 0, false, {
                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                            lineNumber: 614,
                                                                            columnNumber: 25
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                            style: {
                                                                                marginTop: '4px'
                                                                            },
                                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Progress, {
                                                                                percent: handoverData.riskLevel === 'high' ? 90 : handoverData.riskLevel === 'medium' ? 60 : 30,
                                                                                size: "small",
                                                                                showInfo: false,
                                                                                strokeColor: riskColorMap[handoverData.riskLevel]
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 616,
                                                                                columnNumber: 27
                                                                            }, void 0)
                                                                        }, void 0, false, {
                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                            lineNumber: 615,
                                                                            columnNumber: 25
                                                                        }, void 0)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 613,
                                                                    columnNumber: 23
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 604,
                                                            columnNumber: 21
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                    strong: true,
                                                                    style: {
                                                                        display: 'block',
                                                                        marginBottom: '8px'
                                                                    },
                                                                    children: "风险详情"
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 626,
                                                                    columnNumber: 23
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                                                    value: analysisData.risks,
                                                                    onChange: (e)=>setAnalysisData((prev)=>({
                                                                                ...prev,
                                                                                risks: e.target.value
                                                                            })),
                                                                    rows: 3,
                                                                    placeholder: "请输入风险详情..."
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 627,
                                                                    columnNumber: 23
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 625,
                                                            columnNumber: 21
                                                        }, void 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 603,
                                                    columnNumber: 19
                                                }, void 0),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: "商机识别",
                                                    size: "small",
                                                    style: {
                                                        marginBottom: '16px',
                                                        borderRadius: '8px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '16px',
                                                                marginBottom: '16px'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                            type: "secondary",
                                                                            style: {
                                                                                fontSize: '12px'
                                                                            },
                                                                            children: "商机等级"
                                                                        }, void 0, false, {
                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                            lineNumber: 638,
                                                                            columnNumber: 25
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                            style: {
                                                                                marginTop: '4px'
                                                                            },
                                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                                color: "green",
                                                                                style: {
                                                                                    fontSize: '14px',
                                                                                    padding: '4px 12px'
                                                                                },
                                                                                children: "高潜力"
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 640,
                                                                                columnNumber: 27
                                                                            }, void 0)
                                                                        }, void 0, false, {
                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                            lineNumber: 639,
                                                                            columnNumber: 25
                                                                        }, void 0)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 637,
                                                                    columnNumber: 23
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                            type: "secondary",
                                                                            style: {
                                                                                fontSize: '12px'
                                                                            },
                                                                            children: "预估价值"
                                                                        }, void 0, false, {
                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                            lineNumber: 646,
                                                                            columnNumber: 25
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                            style: {
                                                                                marginTop: '4px'
                                                                            },
                                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                strong: true,
                                                                                style: {
                                                                                    color: '#52c41a'
                                                                                },
                                                                                children: "¥50,000"
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 648,
                                                                                columnNumber: 27
                                                                            }, void 0)
                                                                        }, void 0, false, {
                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                            lineNumber: 647,
                                                                            columnNumber: 25
                                                                        }, void 0)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 645,
                                                                    columnNumber: 23
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 636,
                                                            columnNumber: 21
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                    strong: true,
                                                                    style: {
                                                                        display: 'block',
                                                                        marginBottom: '8px'
                                                                    },
                                                                    children: "商机描述"
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 653,
                                                                    columnNumber: 23
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                                                    rows: 3,
                                                                    placeholder: "请输入潜在的商机和扩展机会..."
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 654,
                                                                    columnNumber: 23
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 652,
                                                            columnNumber: 21
                                                        }, void 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 635,
                                                    columnNumber: 19
                                                }, void 0),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: "服务历史",
                                                    size: "small",
                                                    style: {
                                                        borderRadius: '8px'
                                                    },
                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Timeline, {
                                                        mode: "left",
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Timeline.Item, {
                                                                label: handoverData.createdAt,
                                                                children: "创建交接记录"
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 662,
                                                                columnNumber: 23
                                                            }, void 0),
                                                            onboardingTasks.filter((t)=>t.completed).map((t)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Timeline.Item, {
                                                                    color: "green",
                                                                    children: [
                                                                        "完成任务：",
                                                                        t.title
                                                                    ]
                                                                }, t.id, true, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 666,
                                                                    columnNumber: 27
                                                                }, void 0)),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Timeline.Item, {
                                                                label: handoverData.updatedAt,
                                                                color: "blue",
                                                                children: "最近一次更新"
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 668,
                                                                columnNumber: 23
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 661,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 660,
                                                    columnNumber: 19
                                                }, void 0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/pages/handover/[id]/index.tsx",
                                            lineNumber: 602,
                                            columnNumber: 17
                                        }, void 0)
                                    }
                                ]
                            }, void 0, false, {
                                fileName: "src/pages/handover/[id]/index.tsx",
                                lineNumber: 346,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "src/pages/handover/[id]/index.tsx",
                            lineNumber: 340,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/pages/handover/[id]/index.tsx",
                    lineNumber: 324,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/pages/handover/[id]/index.tsx",
                lineNumber: 318,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
};
_s(HandoverDetailPage, "vkTjJ19pe/BZm6NLd/Ds40EKhOI=", false, function() {
    return [
        _umi.useNavigate,
        _umi.useParams,
        _umi.useLocation
    ];
});
_c = HandoverDetailPage;
var _default = HandoverDetailPage;
var _c;
$RefreshReg$(_c, "HandoverDetailPage");
if (prevRefreshReg) self.$RefreshReg$ = prevRefreshReg;
if (prevRefreshSig) self.$RefreshSig$ = prevRefreshSig;
function registerClassComponent(filename, moduleExports) {
    for(const key in moduleExports)try {
        if (key === "__esModule") continue;
        const exportValue = moduleExports[key];
        if (_reactrefresh.isLikelyComponentType(exportValue) && exportValue.prototype && exportValue.prototype.isReactComponent) _reactrefresh.register(exportValue, filename + " " + key);
    } catch (e) {}
}
function $RefreshIsReactComponentLike$(moduleExports) {
    if (_reactrefresh.isLikelyComponentType(moduleExports || moduleExports.default)) return true;
    for(var key in moduleExports)try {
        if (_reactrefresh.isLikelyComponentType(moduleExports[key])) return true;
    } catch (e) {}
    return false;
}
registerClassComponent(module.id, module.exports);
if ($RefreshIsReactComponentLike$(module.exports)) {
    module.meta.hot.accept();
    _reactrefresh.performReactRefresh();
}

},
 }]);
//# sourceMappingURL=p__handover__id__index-async.js.map