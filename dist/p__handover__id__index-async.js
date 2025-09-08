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
var _continuousServiceData = __mako_require__("src/mock/continuousServiceData.ts");
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
// 平台图标组件 - 动态显示平台类型
const PlatformIcon = ({ customerId })=>{
    const platformType = (0, _continuousServiceData.getPlatformType)(customerId);
    // 获取平台配置
    const getPlatformConfig = (platform)=>{
        const configs = {
            'dingtalk': {
                text: '钉',
                color: '#1677ff'
            },
            'wechat_work': {
                text: '企',
                color: '#07c160'
            },
            'feishu': {
                text: '飞',
                color: '#00d4aa'
            },
            'lark': {
                text: 'L',
                color: '#00d4aa'
            },
            'dingtalk_global': {
                text: 'D',
                color: '#1677ff'
            },
            'standalone': {
                text: '独',
                color: '#722ed1'
            }
        };
        return configs[platform] || {
            text: '未',
            color: '#d9d9d9'
        };
    };
    const config = getPlatformConfig(platformType);
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            width: 24,
            height: 24,
            backgroundColor: config.color,
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '12px',
            fontWeight: 'bold',
            marginRight: '12px'
        },
        children: config.text
    }, void 0, false, {
        fileName: "src/components/handover/HandoverDetailHeader.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
};
_c = PlatformIcon;
const HandoverDetailHeader = ({ handoverData, onBack, onEdit, onViewContract, onShare, numberLabel = '交接单编号', isFavorite = false, onToggleFavorite })=>{
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
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
            position: 'relative'
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
                                    lineNumber: 114,
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
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(PlatformIcon, {
                                customerId: handoverData.customerId
                            }, void 0, false, {
                                fileName: "src/components/handover/HandoverDetailHeader.tsx",
                                lineNumber: 127,
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
                                lineNumber: 129,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/handover/HandoverDetailHeader.tsx",
                        lineNumber: 111,
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
                                lineNumber: 142,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                size: "middle",
                                children: [
                                    onToggleFavorite && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        type: "text",
                                        icon: isFavorite ? /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.StarFilled, {}, void 0, false, {
                                            fileName: "src/components/handover/HandoverDetailHeader.tsx",
                                            lineNumber: 158,
                                            columnNumber: 36
                                        }, void 0) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.StarOutlined, {}, void 0, false, {
                                            fileName: "src/components/handover/HandoverDetailHeader.tsx",
                                            lineNumber: 158,
                                            columnNumber: 53
                                        }, void 0),
                                        onClick: onToggleFavorite,
                                        style: {
                                            color: isFavorite ? '#faad14' : '#666',
                                            padding: '4px 8px'
                                        },
                                        title: isFavorite ? '取消关注' : '添加关注'
                                    }, void 0, false, {
                                        fileName: "src/components/handover/HandoverDetailHeader.tsx",
                                        lineNumber: 156,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        type: "default",
                                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.EditOutlined, {}, void 0, false, {
                                            fileName: "src/components/handover/HandoverDetailHeader.tsx",
                                            lineNumber: 170,
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
                                        lineNumber: 168,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        type: "text",
                                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.FileTextOutlined, {}, void 0, false, {
                                            fileName: "src/components/handover/HandoverDetailHeader.tsx",
                                            lineNumber: 182,
                                            columnNumber: 21
                                        }, void 0),
                                        onClick: onViewContract,
                                        style: {
                                            color: '#666',
                                            padding: '4px 8px'
                                        },
                                        title: "查看合同",
                                        children: "查看合同"
                                    }, void 0, false, {
                                        fileName: "src/components/handover/HandoverDetailHeader.tsx",
                                        lineNumber: 180,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        type: "text",
                                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ShareAltOutlined, {}, void 0, false, {
                                            fileName: "src/components/handover/HandoverDetailHeader.tsx",
                                            lineNumber: 195,
                                            columnNumber: 21
                                        }, void 0),
                                        onClick: onShare,
                                        style: {
                                            color: '#666',
                                            padding: '4px 8px'
                                        },
                                        title: "分享",
                                        children: "分享"
                                    }, void 0, false, {
                                        fileName: "src/components/handover/HandoverDetailHeader.tsx",
                                        lineNumber: 193,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/handover/HandoverDetailHeader.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/handover/HandoverDetailHeader.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/handover/HandoverDetailHeader.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px 24px 20px 24px',
                    gap: '16px',
                    flexWrap: 'wrap',
                    position: 'relative'
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
                        lineNumber: 219,
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
                        lineNumber: 235,
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
                        lineNumber: 250,
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
                        lineNumber: 265,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            position: 'absolute',
                            right: 24,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#8c8c8c',
                            fontSize: 12
                        },
                        children: [
                            numberLabel,
                            "：",
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                style: {
                                    fontFamily: 'monospace'
                                },
                                children: handoverData.handoverNumber
                            }, void 0, false, {
                                fileName: "src/components/handover/HandoverDetailHeader.tsx",
                                lineNumber: 281,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/handover/HandoverDetailHeader.tsx",
                        lineNumber: 280,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/handover/HandoverDetailHeader.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/components/handover/HandoverDetailHeader.tsx",
        lineNumber: 101,
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
const StakeholderOrgChart = ({ stakeholders, onStakeholderUpdate, onStakeholderAdd, onStakeholderDelete, onStakeholderSelect, chartHeight })=>{
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
                                lineNumber: 317,
                                columnNumber: 25
                            }, void 0),
                            size: "small"
                        }, void 0, false, {
                            fileName: "src/components/handover/StakeholderOrgChart.tsx",
                            lineNumber: 317,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                flex: 1,
                                cursor: 'pointer'
                            },
                            onClick: (e)=>{
                                e.stopPropagation();
                                if (onStakeholderSelect) onStakeholderSelect(node);
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
                                            lineNumber: 330,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                    lineNumber: 327,
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
                                    lineNumber: 333,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/handover/StakeholderOrgChart.tsx",
                            lineNumber: 318,
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
                                    lineNumber: 337,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                    type: "text",
                                    size: "small",
                                    icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.EditOutlined, {}, void 0, false, {
                                        fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                        lineNumber: 350,
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
                                    lineNumber: 347,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                    type: "text",
                                    size: "small",
                                    icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DeleteOutlined, {}, void 0, false, {
                                        fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                        lineNumber: 360,
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
                                    lineNumber: 357,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/handover/StakeholderOrgChart.tsx",
                            lineNumber: 336,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/handover/StakeholderOrgChart.tsx",
                    lineNumber: 316,
                    columnNumber: 9
                }, this),
                children: node.children ? convertToTreeData(node.children) : undefined
            }));
    };
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
        title: "客户干系人架构",
        size: "small",
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
                            lineNumber: 404,
                            columnNumber: 23
                        }, void 0),
                        size: "small",
                        onClick: handleAddStakeholder,
                        children: "新增"
                    }, void 0, false, {
                        fileName: "src/components/handover/StakeholderOrgChart.tsx",
                        lineNumber: 402,
                        columnNumber: 15
                    }, void 0),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                        type: "primary",
                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.SaveOutlined, {}, void 0, false, {
                            fileName: "src/components/handover/StakeholderOrgChart.tsx",
                            lineNumber: 412,
                            columnNumber: 23
                        }, void 0),
                        size: "small",
                        onClick: handleSave,
                        children: "保存"
                    }, void 0, false, {
                        fileName: "src/components/handover/StakeholderOrgChart.tsx",
                        lineNumber: 410,
                        columnNumber: 15
                    }, void 0),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.CloseOutlined, {}, void 0, false, {
                            fileName: "src/components/handover/StakeholderOrgChart.tsx",
                            lineNumber: 419,
                            columnNumber: 23
                        }, void 0),
                        size: "small",
                        onClick: handleCancel,
                        children: "取消"
                    }, void 0, false, {
                        fileName: "src/components/handover/StakeholderOrgChart.tsx",
                        lineNumber: 418,
                        columnNumber: 15
                    }, void 0)
                ]
            }, void 0, true) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.EditOutlined, {}, void 0, false, {
                    fileName: "src/components/handover/StakeholderOrgChart.tsx",
                    lineNumber: 428,
                    columnNumber: 21
                }, void 0),
                size: "small",
                onClick: ()=>setIsEditMode(true),
                children: "编辑层级"
            }, void 0, false, {
                fileName: "src/components/handover/StakeholderOrgChart.tsx",
                lineNumber: 427,
                columnNumber: 13
            }, void 0)
        }, void 0, false, {
            fileName: "src/components/handover/StakeholderOrgChart.tsx",
            lineNumber: 399,
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
                    lineNumber: 441,
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
                        lineNumber: 456,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "src/components/handover/StakeholderOrgChart.tsx",
                    lineNumber: 455,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "src/components/handover/StakeholderOrgChart.tsx",
                lineNumber: 439,
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
                                lineNumber: 483,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/handover/StakeholderOrgChart.tsx",
                            lineNumber: 478,
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
                                lineNumber: 491,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/handover/StakeholderOrgChart.tsx",
                            lineNumber: 486,
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
                                        lineNumber: 500,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select.Option, {
                                        value: "influencer",
                                        children: "影响者"
                                    }, void 0, false, {
                                        fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                        lineNumber: 501,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select.Option, {
                                        value: "user",
                                        children: "使用者"
                                    }, void 0, false, {
                                        fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                        lineNumber: 502,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select.Option, {
                                        value: "technical_contact",
                                        children: "技术联系人"
                                    }, void 0, false, {
                                        fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                        lineNumber: 503,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                lineNumber: 499,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/handover/StakeholderOrgChart.tsx",
                            lineNumber: 494,
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
                                        lineNumber: 512,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select.Option, {
                                        value: "left",
                                        children: "已离职"
                                    }, void 0, false, {
                                        fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                        lineNumber: 513,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                lineNumber: 511,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/handover/StakeholderOrgChart.tsx",
                            lineNumber: 507,
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
                                lineNumber: 522,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/handover/StakeholderOrgChart.tsx",
                            lineNumber: 517,
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
                                        lineNumber: 527,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        type: "primary",
                                        htmlType: "submit",
                                        children: editingNode ? '更新' : '添加'
                                    }, void 0, false, {
                                        fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                        lineNumber: 534,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/handover/StakeholderOrgChart.tsx",
                                lineNumber: 526,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/handover/StakeholderOrgChart.tsx",
                            lineNumber: 525,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/handover/StakeholderOrgChart.tsx",
                    lineNumber: 473,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/handover/StakeholderOrgChart.tsx",
                lineNumber: 462,
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
                    lineNumber: 550,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        color: '#999'
                    },
                    children: "暂无历史记录"
                }, void 0, false, {
                    fileName: "src/components/handover/StakeholderOrgChart.tsx",
                    lineNumber: 554,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "src/components/handover/StakeholderOrgChart.tsx",
                lineNumber: 543,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/components/handover/StakeholderOrgChart.tsx",
        lineNumber: 395,
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
var _continuousServiceData = __mako_require__("src/mock/continuousServiceData.ts");
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
        padding: '8px 24px',
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
    var _handoverData_crmData_contractAmount, _handoverData_crmData, _handoverData_crmData1, _handoverData_crmData2, _handoverData_crmData3, _handoverData_crmData4, _handoverData_crmData5, _handoverData_crmData6, _handoverData_crmData7, _handoverData_crmData8, _handoverData_crmData9, _handoverData_crmData10;
    _s();
    const navigate = (0, _umi.useNavigate)();
    const { id } = (0, _umi.useParams)();
    const location = (0, _umi.useLocation)();
    // 添加自定义样式来强制标签页均匀分布
    // 已删除：该样式会影响 Tabs 的默认布局，造成样式问题
    // useEffect(() => {
    //   const style = document.createElement('style');
    //   style.textContent = `
    //     .ant-tabs-nav-list {
    //       width: 100% !important;
    //       display: flex !important;
    //     }
    //     .ant-tabs-tab {
    //       min-width: 80px !important;
    //       max-width: none !important;
    //       text-align: left !important;
    //       margin: 0 8px 0 0 !important;
    //       flex-shrink: 0 !important;
    //     }
    //     .ant-tabs-tab-btn {
    //       width: 100% !important;
    //       text-align: left !important;
    //       white-space: nowrap !important;
    //     }
    //   `;
    //   document.head.appendChild(style);
    //   return () => {
    //     document.head.removeChild(style);
    //   };
    // }, []);
    const [loading, setLoading] = (0, _react.useState)(true);
    const [handoverData, setHandoverData] = (0, _react.useState)(null);
    const [onboardingTasks, setOnboardingTasks] = (0, _react.useState)([]);
    const [internalComments, setInternalComments] = (0, _react.useState)([]);
    const [newComment, setNewComment] = (0, _react.useState)('');
    const [stakeholders, setStakeholders] = (0, _react.useState)([]);
    const [selectedStakeholder, setSelectedStakeholder] = (0, _react.useState)(null);
    const [analysisData, setAnalysisData] = (0, _react.useState)({
        painPoints: '',
        successCriteria: '',
        risks: '',
        shortTermExpectation: '',
        longTermExpectation: '',
        unacceptableSituations: '',
        customerSuccessCriteria: ''
    });
    // 风险勾选状态
    const [riskChecked, setRiskChecked] = (0, _react.useState)({
        leadership: false,
        unclear_needs: false,
        high_expectations: false,
        tight_schedule: false,
        difficult_contact: false,
        other_risks: false
    });
    // 商机勾选状态
    const [opportunityChecked, setOpportunityChecked] = (0, _react.useState)({
        account_expansion: false,
        version_upgrade: false,
        new_modules: false,
        referrals: false,
        long_term: false,
        other_opportunities: false
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
                        risks: data.riskDetails || '客户技术团队经验不足，可能需要额外的技术支持。',
                        shortTermExpectation: data.shortTermExpectation || '',
                        longTermExpectation: data.longTermExpectation || '',
                        unacceptableSituations: data.unacceptableSituations || '',
                        customerSuccessCriteria: data.customerSuccessCriteria || ''
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
            padding: '32px 40px',
            textAlign: 'center',
            background: '#f5f5f5',
            minHeight: 'calc(100vh - 120px)',
            paddingBottom: '60px' // 为footer留出底部间距
        },
        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
            children: "加载中..."
        }, void 0, false, {
            fileName: "src/pages/handover/[id]/index.tsx",
            lineNumber: 296,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "src/pages/handover/[id]/index.tsx",
        lineNumber: 289,
        columnNumber: 7
    }, this);
    if (!handoverData) return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            padding: '32px 40px',
            textAlign: 'center',
            background: '#f5f5f5',
            minHeight: 'calc(100vh - 120px)',
            paddingBottom: '60px' // 为footer留出底部间距
        },
        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
            children: "未找到客户交接记录"
        }, void 0, false, {
            fileName: "src/pages/handover/[id]/index.tsx",
            lineNumber: 310,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "src/pages/handover/[id]/index.tsx",
        lineNumber: 303,
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
                    lineNumber: 344,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/pages/handover/[id]/index.tsx",
                lineNumber: 343,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    padding: '32px 40px',
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
                                lineNumber: 357,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/pages/handover/[id]/index.tsx",
                            lineNumber: 356,
                            columnNumber: 11
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
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                                                    gutter: 16,
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                            span: 12,
                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                                title: "Onboarding行动计划",
                                                                style: {
                                                                    borderRadius: '8px',
                                                                    height: '260px'
                                                                },
                                                                size: "small",
                                                                extra: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                                    type: "primary",
                                                                    size: "small",
                                                                    disabled: !onboardingTasks.every((task)=>task.completed) || !!(handoverData === null || handoverData === void 0 ? void 0 : handoverData.deliveredAt),
                                                                    onClick: ()=>{
                                                                        const now = new Date().toISOString();
                                                                        setHandoverData((prev)=>prev ? {
                                                                                ...prev,
                                                                                deliveredAt: now,
                                                                                handoverStatus: 'completed'
                                                                            } : null);
                                                                        _antd.message.success('交付完成确认成功！交接记录已标记为已完成');
                                                                    },
                                                                    children: (handoverData === null || handoverData === void 0 ? void 0 : handoverData.deliveredAt) ? '已交付完成' : '确认交付完成'
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 406,
                                                                    columnNumber: 27
                                                                }, void 0),
                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        padding: '8px 0',
                                                                        height: '180px',
                                                                        overflowY: 'auto'
                                                                    },
                                                                    children: [
                                                                        onboardingTasks.map((task)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
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
                                                                                                color: task.completed ? '#999' : '#1890ff',
                                                                                                fontSize: '14px',
                                                                                                fontWeight: '500'
                                                                                            },
                                                                                            children: task.title
                                                                                        }, void 0, false, {
                                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                                            lineNumber: 424,
                                                                                            columnNumber: 33
                                                                                        }, void 0)
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                        lineNumber: 423,
                                                                                        columnNumber: 31
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
                                                                                        lineNumber: 429,
                                                                                        columnNumber: 33
                                                                                    }, void 0)
                                                                                ]
                                                                            }, task.id, true, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 422,
                                                                                columnNumber: 29
                                                                            }, void 0)),
                                                                        (handoverData === null || handoverData === void 0 ? void 0 : handoverData.deliveredAt) && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                            style: {
                                                                                marginTop: '16px',
                                                                                padding: '12px',
                                                                                backgroundColor: '#f6ffed',
                                                                                border: '1px solid #b7eb8f',
                                                                                borderRadius: '6px'
                                                                            },
                                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                                style: {
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    gap: '8px'
                                                                                },
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.CheckCircleOutlined, {
                                                                                        style: {
                                                                                            color: '#52c41a'
                                                                                        }
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                        lineNumber: 445,
                                                                                        columnNumber: 33
                                                                                    }, void 0),
                                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                        style: {
                                                                                            color: '#52c41a',
                                                                                            fontWeight: '500'
                                                                                        },
                                                                                        children: [
                                                                                            "交付完成时间: ",
                                                                                            new Date(handoverData.deliveredAt).toLocaleString()
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                        lineNumber: 446,
                                                                                        columnNumber: 33
                                                                                    }, void 0)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 444,
                                                                                columnNumber: 31
                                                                            }, void 0)
                                                                        }, void 0, false, {
                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                            lineNumber: 437,
                                                                            columnNumber: 29
                                                                        }, void 0)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 420,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 401,
                                                                columnNumber: 23
                                                            }, void 0)
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 399,
                                                            columnNumber: 21
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                            span: 12,
                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                                title: "服务历史",
                                                                style: {
                                                                    borderRadius: '8px',
                                                                    height: '260px'
                                                                },
                                                                size: "small",
                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        height: '180px',
                                                                        overflowY: 'auto',
                                                                        overflowX: 'hidden',
                                                                        paddingTop: '8px'
                                                                    },
                                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Timeline, {
                                                                        mode: "left",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Timeline.Item, {
                                                                                label: handoverData.createdAt,
                                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                                                    style: {
                                                                                        color: '#52c41a',
                                                                                        fontWeight: '500'
                                                                                    },
                                                                                    children: "创建交接记录"
                                                                                }, void 0, false, {
                                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                                    lineNumber: 464,
                                                                                    columnNumber: 75
                                                                                }, void 0)
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 464,
                                                                                columnNumber: 29
                                                                            }, void 0),
                                                                            onboardingTasks.filter((t)=>t.completed).map((t)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Timeline.Item, {
                                                                                    color: "green",
                                                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                                                        style: {
                                                                                            color: '#52c41a',
                                                                                            fontWeight: '500'
                                                                                        },
                                                                                        children: [
                                                                                            "完成任务：",
                                                                                            t.title
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                        lineNumber: 468,
                                                                                        columnNumber: 73
                                                                                    }, void 0)
                                                                                }, t.id, false, {
                                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                                    lineNumber: 468,
                                                                                    columnNumber: 33
                                                                                }, void 0)),
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Timeline.Item, {
                                                                                label: handoverData.updatedAt,
                                                                                color: "blue",
                                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                                                    style: {
                                                                                        color: '#1890ff',
                                                                                        fontWeight: '500'
                                                                                    },
                                                                                    children: "最近一次更新"
                                                                                }, void 0, false, {
                                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                                    lineNumber: 470,
                                                                                    columnNumber: 88
                                                                                }, void 0)
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 470,
                                                                                columnNumber: 29
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 463,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 462,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 457,
                                                                columnNumber: 23
                                                            }, void 0)
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 455,
                                                            columnNumber: 21
                                                        }, void 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 398,
                                                    columnNumber: 19
                                                }, void 0),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                        style: {
                                                            color: '#eb2f96',
                                                            fontWeight: '600'
                                                        },
                                                        children: "近期协作动态"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 478,
                                                        columnNumber: 32
                                                    }, void 0),
                                                    style: {
                                                        marginTop: '24px',
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
                                                                    padding: '6px 0',
                                                                    borderBottom: '1px solid #f0f0f0'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                        style: {
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            marginBottom: '3px'
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                                                                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {}, void 0, false, {
                                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                                    lineNumber: 483,
                                                                                    columnNumber: 43
                                                                                }, void 0),
                                                                                size: 20,
                                                                                style: {
                                                                                    marginRight: '6px'
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 483,
                                                                                columnNumber: 29
                                                                            }, void 0),
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                                                style: {
                                                                                    fontWeight: 500,
                                                                                    fontSize: '13px'
                                                                                },
                                                                                children: comment.author
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 484,
                                                                                columnNumber: 29
                                                                            }, void 0),
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                                                style: {
                                                                                    color: '#999',
                                                                                    marginLeft: '6px',
                                                                                    fontSize: '11px'
                                                                                },
                                                                                children: comment.createdAt
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 485,
                                                                                columnNumber: 29
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 482,
                                                                        columnNumber: 27
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                        style: {
                                                                            fontSize: '13px',
                                                                            lineHeight: '1.4'
                                                                        },
                                                                        children: comment.content
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 487,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                ]
                                                            }, comment.id, true, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 481,
                                                                columnNumber: 25
                                                            }, void 0))
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 479,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 478,
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
                                                                lineNumber: 495,
                                                                columnNumber: 101
                                                            }, void 0) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DownOutlined, {}, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 495,
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
                                                                                lineNumber: 499,
                                                                                columnNumber: 29
                                                                            }, void 0),
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                                                type: "primary",
                                                                                size: "small",
                                                                                onClick: handleAddComment,
                                                                                children: "发送评论"
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 500,
                                                                                columnNumber: 29
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 498,
                                                                        columnNumber: 27
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Divider, {
                                                                        style: {
                                                                            margin: '16px 0'
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 504,
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
                                                                                lineNumber: 506,
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
                                                                                                            lineNumber: 513,
                                                                                                            columnNumber: 51
                                                                                                        }, void 0),
                                                                                                        style: {
                                                                                                            marginRight: '8px'
                                                                                                        }
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                        lineNumber: 513,
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
                                                                                                        lineNumber: 514,
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
                                                                                                        lineNumber: 515,
                                                                                                        columnNumber: 37
                                                                                                    }, void 0)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                lineNumber: 512,
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
                                                                                                                lineNumber: 522,
                                                                                                                columnNumber: 43
                                                                                                            }, void 0))
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                        lineNumber: 520,
                                                                                                        columnNumber: 39
                                                                                                    }, void 0)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                lineNumber: 517,
                                                                                                columnNumber: 35
                                                                                            }, void 0)
                                                                                        ]
                                                                                    }, comment.id, true, {
                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                        lineNumber: 511,
                                                                                        columnNumber: 33
                                                                                    }, void 0))
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 509,
                                                                                columnNumber: 29
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 505,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 497,
                                                                columnNumber: 25
                                                            }, void 0)
                                                        }, "communication", false, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 496,
                                                            columnNumber: 23
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 495,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 494,
                                                    columnNumber: 19
                                                }, void 0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/pages/handover/[id]/index.tsx",
                                            lineNumber: 397,
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
                                                    title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                        style: {
                                                            color: '#1890ff',
                                                            fontWeight: '600'
                                                        },
                                                        children: "基本信息"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 545,
                                                        columnNumber: 32
                                                    }, void 0),
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
                                                                lineNumber: 547,
                                                                columnNumber: 23
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "交接状态",
                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                    color: statusColorMap[handoverData.handoverStatus],
                                                                    children: statusTextMap[handoverData.handoverStatus]
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 549,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 548,
                                                                columnNumber: 23
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "风险等级",
                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                    color: riskColorMap[handoverData.riskLevel],
                                                                    children: riskTextMap[handoverData.riskLevel]
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 552,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 551,
                                                                columnNumber: 23
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 546,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 545,
                                                    columnNumber: 19
                                                }, void 0),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                        style: {
                                                            color: '#52c41a',
                                                            fontWeight: '600'
                                                        },
                                                        children: "CRM信息"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 556,
                                                        columnNumber: 32
                                                    }, void 0),
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
                                                                    lineNumber: 559,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 558,
                                                                columnNumber: 23
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "服务周期",
                                                                children: ((_handoverData_crmData1 = handoverData.crmData) === null || _handoverData_crmData1 === void 0 ? void 0 : _handoverData_crmData1.servicePeriod) || '未知'
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 561,
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
                                                                    lineNumber: 563,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 562,
                                                                columnNumber: 23
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "已购产品",
                                                                span: 2,
                                                                children: (0, _continuousServiceData.getPurchasedProducts)(handoverData.customerId).products.map((p, i)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                        color: "blue",
                                                                        style: {
                                                                            marginBottom: 4
                                                                        },
                                                                        children: p
                                                                    }, i, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 567,
                                                                        columnNumber: 27
                                                                    }, void 0))
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 565,
                                                                columnNumber: 23
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "增值服务",
                                                                span: 2,
                                                                children: (0, _continuousServiceData.getPurchasedProducts)(handoverData.customerId).services.map((s, i)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                        color: "orange",
                                                                        style: {
                                                                            marginBottom: 4
                                                                        },
                                                                        children: s
                                                                    }, i, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 572,
                                                                        columnNumber: 27
                                                                    }, void 0))
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 570,
                                                                columnNumber: 23
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 557,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 556,
                                                    columnNumber: 19
                                                }, void 0),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                        style: {
                                                            color: '#722ed1',
                                                            fontWeight: '600'
                                                        },
                                                        children: "销售来源信息"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 577,
                                                        columnNumber: 32
                                                    }, void 0),
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
                                                                        color: ((_handoverData_crmData3 = handoverData.crmData) === null || _handoverData_crmData3 === void 0 ? void 0 : _handoverData_crmData3.salesSource) === 'direct' ? 'blue' : 'green',
                                                                        children: ((_handoverData_crmData4 = handoverData.crmData) === null || _handoverData_crmData4 === void 0 ? void 0 : _handoverData_crmData4.salesSource) === 'direct' ? '直营' : ((_handoverData_crmData5 = handoverData.crmData) === null || _handoverData_crmData5 === void 0 ? void 0 : _handoverData_crmData5.salesSource) === 'channel' ? '渠道' : '直营'
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 580,
                                                                        columnNumber: 25
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 579,
                                                                    columnNumber: 23
                                                                }, void 0),
                                                                ((_handoverData_crmData6 = handoverData.crmData) === null || _handoverData_crmData6 === void 0 ? void 0 : _handoverData_crmData6.salesSource) === 'direct' && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                    label: "销售人员",
                                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                        strong: true,
                                                                        children: ((_handoverData_crmData7 = handoverData.crmData) === null || _handoverData_crmData7 === void 0 ? void 0 : _handoverData_crmData7.salesPerson) || '未知'
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 586,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 585,
                                                                    columnNumber: 25
                                                                }, void 0),
                                                                ((_handoverData_crmData8 = handoverData.crmData) === null || _handoverData_crmData8 === void 0 ? void 0 : _handoverData_crmData8.salesSource) === 'channel' && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                    label: "渠道合作伙伴",
                                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                        strong: true,
                                                                        children: ((_handoverData_crmData9 = handoverData.crmData) === null || _handoverData_crmData9 === void 0 ? void 0 : _handoverData_crmData9.channelPartner) || '未知'
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 591,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 590,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 578,
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
                                                                    lineNumber: 596,
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
                                                                        children: ((_handoverData_crmData10 = handoverData.crmData) === null || _handoverData_crmData10 === void 0 ? void 0 : _handoverData_crmData10.salesNotes) || '暂无备注'
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 598,
                                                                        columnNumber: 25
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 597,
                                                                    columnNumber: 23
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 595,
                                                            columnNumber: 21
                                                        }, void 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 577,
                                                    columnNumber: 19
                                                }, void 0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/pages/handover/[id]/index.tsx",
                                            lineNumber: 544,
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
                                                            onStakeholderSelect: setSelectedStakeholder,
                                                            chartHeight: ORG_CHART_HEIGHT
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 613,
                                                            columnNumber: 23
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 612,
                                                        columnNumber: 21
                                                    }, void 0),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                        span: 8,
                                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                            title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                                style: {
                                                                    color: '#fa8c16',
                                                                    fontWeight: '600'
                                                                },
                                                                children: "干系人详情"
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 623,
                                                                columnNumber: 36
                                                            }, void 0),
                                                            size: "small",
                                                            style: {
                                                                borderRadius: '8px'
                                                            },
                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                style: {
                                                                    height: ORG_CHART_HEIGHT,
                                                                    overflow: 'auto'
                                                                },
                                                                children: selectedStakeholder ? /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        padding: '16px'
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                            style: {
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                gap: '12px',
                                                                                marginBottom: '16px'
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                                                                                    icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {}, void 0, false, {
                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                        lineNumber: 628,
                                                                                        columnNumber: 47
                                                                                    }, void 0),
                                                                                    size: "large"
                                                                                }, void 0, false, {
                                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                                    lineNumber: 628,
                                                                                    columnNumber: 33
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                                            style: {
                                                                                                fontWeight: 500,
                                                                                                fontSize: '16px',
                                                                                                marginBottom: '4px'
                                                                                            },
                                                                                            children: selectedStakeholder.name
                                                                                        }, void 0, false, {
                                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                                            lineNumber: 630,
                                                                                            columnNumber: 35
                                                                                        }, void 0),
                                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                                            style: {
                                                                                                color: '#666',
                                                                                                fontSize: '14px'
                                                                                            },
                                                                                            children: selectedStakeholder.position
                                                                                        }, void 0, false, {
                                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                                            lineNumber: 633,
                                                                                            columnNumber: 35
                                                                                        }, void 0)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                                    lineNumber: 629,
                                                                                    columnNumber: 33
                                                                                }, void 0)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                            lineNumber: 627,
                                                                            columnNumber: 31
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions, {
                                                                            column: 1,
                                                                            size: "small",
                                                                            style: {
                                                                                marginBottom: '16px'
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                                    label: "重要性",
                                                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                                        color: selectedStakeholder.role === 'decision_maker' ? 'red' : selectedStakeholder.role === 'influencer' ? 'orange' : 'blue',
                                                                                        children: selectedStakeholder.role === 'decision_maker' ? '决策者' : selectedStakeholder.role === 'influencer' ? '影响者' : selectedStakeholder.role === 'user' ? '使用者' : '技术联系人'
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                        lineNumber: 641,
                                                                                        columnNumber: 35
                                                                                    }, void 0)
                                                                                }, void 0, false, {
                                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                                    lineNumber: 640,
                                                                                    columnNumber: 33
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                                    label: "联系方式",
                                                                                    children: selectedStakeholder.contact
                                                                                }, void 0, false, {
                                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                                    lineNumber: 647,
                                                                                    columnNumber: 33
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                                    label: "状态",
                                                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                                        color: selectedStakeholder.status === 'active' ? 'green' : 'red',
                                                                                        children: selectedStakeholder.status === 'active' ? '在职' : '已离职'
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                        lineNumber: 651,
                                                                                        columnNumber: 35
                                                                                    }, void 0)
                                                                                }, void 0, false, {
                                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                                    lineNumber: 650,
                                                                                    columnNumber: 33
                                                                                }, void 0)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                            lineNumber: 639,
                                                                            columnNumber: 31
                                                                        }, void 0),
                                                                        selectedStakeholder.history && selectedStakeholder.history.length > 0 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                                    style: {
                                                                                        fontWeight: 500,
                                                                                        marginBottom: '8px',
                                                                                        fontSize: '14px'
                                                                                    },
                                                                                    children: "上次沟通记录"
                                                                                }, void 0, false, {
                                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                                    lineNumber: 659,
                                                                                    columnNumber: 35
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Timeline, {
                                                                                    children: selectedStakeholder.history.map((record, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Timeline.Item, {
                                                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                                                style: {
                                                                                                    fontSize: '12px'
                                                                                                },
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                                                        children: [
                                                                                                            record.startDate,
                                                                                                            record.endDate ? ` ~ ${record.endDate}` : ''
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                        lineNumber: 664,
                                                                                                        columnNumber: 43
                                                                                                    }, void 0),
                                                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                                                        style: {
                                                                                                            color: '#666'
                                                                                                        },
                                                                                                        children: record.position
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                        lineNumber: 665,
                                                                                                        columnNumber: 43
                                                                                                    }, void 0),
                                                                                                    record.note && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                                                        style: {
                                                                                                            color: '#999',
                                                                                                            marginTop: '4px'
                                                                                                        },
                                                                                                        children: record.note
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                        lineNumber: 666,
                                                                                                        columnNumber: 59
                                                                                                    }, void 0)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                lineNumber: 663,
                                                                                                columnNumber: 41
                                                                                            }, void 0)
                                                                                        }, index, false, {
                                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                                            lineNumber: 662,
                                                                                            columnNumber: 39
                                                                                        }, void 0))
                                                                                }, void 0, false, {
                                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                                    lineNumber: 660,
                                                                                    columnNumber: 35
                                                                                }, void 0)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                            lineNumber: 658,
                                                                            columnNumber: 33
                                                                        }, void 0)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 626,
                                                                    columnNumber: 29
                                                                }, void 0) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        padding: '40px 20px',
                                                                        textAlign: 'center',
                                                                        color: '#999'
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {
                                                                            style: {
                                                                                fontSize: '32px',
                                                                                marginBottom: '12px',
                                                                                display: 'block'
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                            lineNumber: 676,
                                                                            columnNumber: 31
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                            children: "点击左侧干系人姓名查看详细信息"
                                                                        }, void 0, false, {
                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                            lineNumber: 677,
                                                                            columnNumber: 31
                                                                        }, void 0)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 675,
                                                                    columnNumber: 29
                                                                }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 624,
                                                                columnNumber: 25
                                                            }, void 0)
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 623,
                                                            columnNumber: 23
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 622,
                                                        columnNumber: 21
                                                    }, void 0)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                lineNumber: 611,
                                                columnNumber: 19
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "src/pages/handover/[id]/index.tsx",
                                            lineNumber: 610,
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
                                                    title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                        style: {
                                                            color: '#fa8c16'
                                                        },
                                                        children: "风险类型 (可多选+补充说明)"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 693,
                                                        columnNumber: 28
                                                    }, void 0),
                                                    size: "small",
                                                    style: {
                                                        marginBottom: '16px',
                                                        borderRadius: '8px',
                                                        backgroundColor: '#ffffff'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '16px'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                                                    checked: riskChecked.leadership,
                                                                    onChange: (e)=>setRiskChecked((prev)=>({
                                                                                ...prev,
                                                                                leadership: e.target.checked
                                                                            })),
                                                                    children: "关键领导力缺失对接"
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 698,
                                                                    columnNumber: 23
                                                                }, void 0),
                                                                riskChecked.leadership && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        marginLeft: '24px',
                                                                        marginTop: '8px',
                                                                        marginBottom: '16px'
                                                                    },
                                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                                                        placeholder: "若勾选上项，请说明：反对领导姓名/职位、反对原因、当前协调进展，如：王总（运营总监）担心平台操作复杂，已安排1次demo演示",
                                                                        rows: 3
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 706,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 705,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 697,
                                                            columnNumber: 21
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '16px'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                                                    checked: riskChecked.unclear_needs,
                                                                    onChange: (e)=>setRiskChecked((prev)=>({
                                                                                ...prev,
                                                                                unclear_needs: e.target.checked
                                                                            })),
                                                                    children: "客户需求场景不明确"
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 715,
                                                                    columnNumber: 23
                                                                }, void 0),
                                                                riskChecked.unclear_needs && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        marginLeft: '24px',
                                                                        marginTop: '8px',
                                                                        marginBottom: '16px'
                                                                    },
                                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                                                        placeholder: "若勾选上项，请说明：当前未明确的需求点、客户模糊表述，如：客户提到'要做员工培训'，但未明确培训内容/对象/频次",
                                                                        rows: 3
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 723,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 722,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 714,
                                                            columnNumber: 21
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '16px'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                                                    checked: riskChecked.high_expectations,
                                                                    onChange: (e)=>setRiskChecked((prev)=>({
                                                                                ...prev,
                                                                                high_expectations: e.target.checked
                                                                            })),
                                                                    children: "客户对产品功能期待值过高"
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 732,
                                                                    columnNumber: 23
                                                                }, void 0),
                                                                riskChecked.high_expectations && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        marginLeft: '24px',
                                                                        marginTop: '8px',
                                                                        marginBottom: '16px'
                                                                    },
                                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                                                        placeholder: "若勾选上项，请说明：客户期待的未实现功能，已沟通的差异点，如：客户期待平台支持'自动生成培训计划'，已说明需要制定开发",
                                                                        rows: 3
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 740,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 739,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 731,
                                                            columnNumber: 21
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '16px'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                                                    checked: riskChecked.tight_schedule,
                                                                    onChange: (e)=>setRiskChecked((prev)=>({
                                                                                ...prev,
                                                                                tight_schedule: e.target.checked
                                                                            })),
                                                                    children: "客户实施需求多/周期紧"
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 749,
                                                                    columnNumber: 23
                                                                }, void 0),
                                                                riskChecked.tight_schedule && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        marginLeft: '24px',
                                                                        marginTop: '8px',
                                                                        marginBottom: '16px'
                                                                    },
                                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                                                        placeholder: "若勾选上项，请说明：具体实施需求（如定制化配置、数据迁移）、客户要求的完成时间，如：要求1周内完成1000条工数据迁移，已协调技术团队支持",
                                                                        rows: 3
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 757,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 756,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 748,
                                                            columnNumber: 21
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '16px'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                                                    checked: riskChecked.difficult_contact,
                                                                    onChange: (e)=>setRiskChecked((prev)=>({
                                                                                ...prev,
                                                                                difficult_contact: e.target.checked
                                                                            })),
                                                                    children: "对接人性格难接触"
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 766,
                                                                    columnNumber: 23
                                                                }, void 0),
                                                                riskChecked.difficult_contact && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        marginLeft: '24px',
                                                                        marginTop: '8px',
                                                                        marginBottom: '16px'
                                                                    },
                                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                                                        placeholder: "若勾选上项，请说明：对接人性格特点（如苛刻、敏感、他控制）、沟通建议，如：李经理（IT）过重细节，建议点对点线后体验",
                                                                        rows: 3
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 774,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 773,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 765,
                                                            columnNumber: 21
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                                                    checked: riskChecked.other_risks,
                                                                    onChange: (e)=>setRiskChecked((prev)=>({
                                                                                ...prev,
                                                                                other_risks: e.target.checked
                                                                            })),
                                                                    children: "其他风险"
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 783,
                                                                    columnNumber: 23
                                                                }, void 0),
                                                                riskChecked.other_risks && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        marginLeft: '24px',
                                                                        marginTop: '8px'
                                                                    },
                                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                                                        placeholder: "如：客户近期有人员变动，预算可能调整等，行业解决方案合作意向等",
                                                                        rows: 3
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 791,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 790,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 782,
                                                            columnNumber: 21
                                                        }, void 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 692,
                                                    columnNumber: 19
                                                }, void 0),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                        style: {
                                                            color: '#52c41a'
                                                        },
                                                        children: "潜在商机 (可多选+补充说明)"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 801,
                                                        columnNumber: 28
                                                    }, void 0),
                                                    size: "small",
                                                    style: {
                                                        borderRadius: '8px',
                                                        backgroundColor: '#ffffff'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '16px'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                                                    checked: opportunityChecked.account_expansion,
                                                                    onChange: (e)=>setOpportunityChecked((prev)=>({
                                                                                ...prev,
                                                                                account_expansion: e.target.checked
                                                                            })),
                                                                    children: "账号增购可能"
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 806,
                                                                    columnNumber: 23
                                                                }, void 0),
                                                                opportunityChecked.account_expansion && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        marginLeft: '24px',
                                                                        marginTop: '8px',
                                                                        marginBottom: '16px'
                                                                    },
                                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                                                        placeholder: "若勾选上项，请说明：增购数点（如客户扩招、新部门推入）、预计增购数量/时间，如：客户Q3计划招50人，预计需增购50个账号，已同步优化改策",
                                                                        rows: 3
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 814,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 813,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 805,
                                                            columnNumber: 21
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '16px'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                                                    checked: opportunityChecked.version_upgrade,
                                                                    onChange: (e)=>setOpportunityChecked((prev)=>({
                                                                                ...prev,
                                                                                version_upgrade: e.target.checked
                                                                            })),
                                                                    children: "版本升级需求"
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 823,
                                                                    columnNumber: 23
                                                                }, void 0),
                                                                opportunityChecked.version_upgrade && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        marginLeft: '24px',
                                                                        marginTop: '8px',
                                                                        marginBottom: '16px'
                                                                    },
                                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                                                        placeholder: "若勾选上项，请说明：客户需求的高级功能，当前版本不支持，可升级至专业版",
                                                                        rows: 3
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 831,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 830,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 822,
                                                            columnNumber: 21
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '16px'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                                                    checked: opportunityChecked.new_modules,
                                                                    onChange: (e)=>setOpportunityChecked((prev)=>({
                                                                                ...prev,
                                                                                new_modules: e.target.checked
                                                                            })),
                                                                    children: "新增模块采购需求"
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 840,
                                                                    columnNumber: 23
                                                                }, void 0),
                                                                opportunityChecked.new_modules && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        marginLeft: '24px',
                                                                        marginTop: '8px',
                                                                        marginBottom: '16px'
                                                                    },
                                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                                                        placeholder: "若勾选上项，请说明：客户关注的模块、预算范围，如：客户对'直播培训模块'感兴趣，已提供详细介绍，预算在1万以内",
                                                                        rows: 3
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 848,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 847,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 839,
                                                            columnNumber: 21
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '16px'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                                                    checked: opportunityChecked.referrals,
                                                                    onChange: (e)=>setOpportunityChecked((prev)=>({
                                                                                ...prev,
                                                                                referrals: e.target.checked
                                                                            })),
                                                                    children: "转介绍可能性"
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 857,
                                                                    columnNumber: 23
                                                                }, void 0),
                                                                opportunityChecked.referrals && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        marginLeft: '24px',
                                                                        marginTop: '8px',
                                                                        marginBottom: '16px'
                                                                    },
                                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                                                        placeholder: "若勾选上项，请说明：客户转介绍意愿，潜在推荐对象，如：客户负责人提到'同行XX公司也有培训需求'，已请客户协助对接",
                                                                        rows: 3
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 865,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 864,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 856,
                                                            columnNumber: 21
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '16px'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                                                    checked: opportunityChecked.long_term,
                                                                    onChange: (e)=>setOpportunityChecked((prev)=>({
                                                                                ...prev,
                                                                                long_term: e.target.checked
                                                                            })),
                                                                    children: "长期合作（续费）意向"
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 874,
                                                                    columnNumber: 23
                                                                }, void 0),
                                                                opportunityChecked.long_term && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        marginLeft: '24px',
                                                                        marginTop: '8px',
                                                                        marginBottom: '16px'
                                                                    },
                                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                                                        placeholder: "若勾选上项，请说明：客户对当前服务的满意度，续费初步意向，如：客户表示'若合作愉快，明年会继续合作'，需重点关注体验",
                                                                        rows: 3
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 882,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 881,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 873,
                                                            columnNumber: 21
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                                                    checked: opportunityChecked.other_opportunities,
                                                                    onChange: (e)=>setOpportunityChecked((prev)=>({
                                                                                ...prev,
                                                                                other_opportunities: e.target.checked
                                                                            })),
                                                                    children: "其他商机"
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 891,
                                                                    columnNumber: 23
                                                                }, void 0),
                                                                opportunityChecked.other_opportunities && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        marginLeft: '24px',
                                                                        marginTop: '8px'
                                                                    },
                                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                                                        placeholder: "如：客户有定制化开发需求，行业解决方案合作意向等",
                                                                        rows: 3
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 899,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 898,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 890,
                                                            columnNumber: 21
                                                        }, void 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 800,
                                                    columnNumber: 19
                                                }, void 0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/pages/handover/[id]/index.tsx",
                                            lineNumber: 691,
                                            columnNumber: 17
                                        }, void 0)
                                    }
                                ]
                            }, void 0, false, {
                                fileName: "src/pages/handover/[id]/index.tsx",
                                lineNumber: 372,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "src/pages/handover/[id]/index.tsx",
                            lineNumber: 366,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/pages/handover/[id]/index.tsx",
                    lineNumber: 354,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/pages/handover/[id]/index.tsx",
                lineNumber: 348,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
};
_s(HandoverDetailPage, "3D5gCc6HKcjx8Jk+gnAFpyXXFsg=", false, function() {
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