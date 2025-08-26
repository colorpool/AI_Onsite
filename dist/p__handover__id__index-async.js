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
        margin: '0 16px 0 0',
        border: 'none',
        background: 'transparent',
        transition: 'all 0.3s ease',
        minWidth: '120px',
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
    const [loading, setLoading] = (0, _react.useState)(true);
    const [handoverData, setHandoverData] = (0, _react.useState)(null);
    const [onboardingTasks, setOnboardingTasks] = (0, _react.useState)([]);
    const [internalComments, setInternalComments] = (0, _react.useState)([]);
    const [newComment, setNewComment] = (0, _react.useState)('');
    const [analysisData, setAnalysisData] = (0, _react.useState)({
        painPoints: '',
        successCriteria: '',
        risks: ''
    });
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
            lineNumber: 207,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "src/pages/handover/[id]/index.tsx",
        lineNumber: 200,
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
            lineNumber: 221,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "src/pages/handover/[id]/index.tsx",
        lineNumber: 214,
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
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_jsxdevruntime.Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_max.Helmet, {
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("title", {
                    children: handoverData ? `${handoverData.customerName} - 客户交接详情` : '客户交接详情'
                }, void 0, false, {
                    fileName: "src/pages/handover/[id]/index.tsx",
                    lineNumber: 254,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/pages/handover/[id]/index.tsx",
                lineNumber: 253,
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
                                lineNumber: 271,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "src/pages/handover/[id]/index.tsx",
                            lineNumber: 270,
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
                                defaultActiveKey: "action-plan",
                                style: {
                                    margin: 0
                                },
                                tabBarStyle: tabStyles.tabBar,
                                tabBarGutter: 24,
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
                                                                            lineNumber: 307,
                                                                            columnNumber: 29
                                                                        }, void 0)
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 306,
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
                                                                        lineNumber: 312,
                                                                        columnNumber: 29
                                                                    }, void 0)
                                                                ]
                                                            }, task.id, true, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 305,
                                                                columnNumber: 25
                                                            }, void 0))
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 303,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 302,
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
                                                                                    lineNumber: 327,
                                                                                    columnNumber: 43
                                                                                }, void 0),
                                                                                size: 24,
                                                                                style: {
                                                                                    marginRight: '8px'
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 327,
                                                                                columnNumber: 29
                                                                            }, void 0),
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                                                style: {
                                                                                    fontWeight: 500
                                                                                },
                                                                                children: comment.author
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 328,
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
                                                                                lineNumber: 329,
                                                                                columnNumber: 29
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 326,
                                                                        columnNumber: 27
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                        style: {
                                                                            fontSize: '14px'
                                                                        },
                                                                        children: comment.content
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 331,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                ]
                                                            }, comment.id, true, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 325,
                                                                columnNumber: 25
                                                            }, void 0))
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 323,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 322,
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
                                                                lineNumber: 339,
                                                                columnNumber: 101
                                                            }, void 0) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DownOutlined, {}, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 339,
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
                                                                                lineNumber: 343,
                                                                                columnNumber: 29
                                                                            }, void 0),
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                                                type: "primary",
                                                                                size: "small",
                                                                                onClick: handleAddComment,
                                                                                children: "发送评论"
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 344,
                                                                                columnNumber: 29
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 342,
                                                                        columnNumber: 27
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Divider, {
                                                                        style: {
                                                                            margin: '16px 0'
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 348,
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
                                                                                lineNumber: 350,
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
                                                                                                            lineNumber: 357,
                                                                                                            columnNumber: 51
                                                                                                        }, void 0),
                                                                                                        style: {
                                                                                                            marginRight: '8px'
                                                                                                        }
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                        lineNumber: 357,
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
                                                                                                        lineNumber: 358,
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
                                                                                                        lineNumber: 359,
                                                                                                        columnNumber: 37
                                                                                                    }, void 0)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                lineNumber: 356,
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
                                                                                                                lineNumber: 366,
                                                                                                                columnNumber: 43
                                                                                                            }, void 0))
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                        lineNumber: 364,
                                                                                                        columnNumber: 39
                                                                                                    }, void 0)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                lineNumber: 361,
                                                                                                columnNumber: 35
                                                                                            }, void 0)
                                                                                        ]
                                                                                    }, comment.id, true, {
                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                        lineNumber: 355,
                                                                                        columnNumber: 33
                                                                                    }, void 0))
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 353,
                                                                                columnNumber: 29
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 349,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 341,
                                                                columnNumber: 25
                                                            }, void 0)
                                                        }, "communication", false, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 340,
                                                            columnNumber: 23
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 339,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 338,
                                                    columnNumber: 19
                                                }, void 0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/pages/handover/[id]/index.tsx",
                                            lineNumber: 300,
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
                                                                lineNumber: 391,
                                                                columnNumber: 23
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "交接状态",
                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                    color: statusColorMap[handoverData.handoverStatus],
                                                                    children: statusTextMap[handoverData.handoverStatus]
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 393,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 392,
                                                                columnNumber: 23
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "风险等级",
                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                    color: riskColorMap[handoverData.riskLevel],
                                                                    children: riskTextMap[handoverData.riskLevel]
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 396,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 395,
                                                                columnNumber: 23
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 390,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 389,
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
                                                                    lineNumber: 403,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 402,
                                                                columnNumber: 23
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "服务周期",
                                                                children: ((_handoverData_crmData1 = handoverData.crmData) === null || _handoverData_crmData1 === void 0 ? void 0 : _handoverData_crmData1.servicePeriod) || '未知'
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 405,
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
                                                                    lineNumber: 407,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 406,
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
                                                                        lineNumber: 411,
                                                                        columnNumber: 27
                                                                    }, void 0))) || '暂无产品信息'
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 409,
                                                                columnNumber: 23
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 401,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 400,
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
                                                                        lineNumber: 419,
                                                                        columnNumber: 25
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 418,
                                                                    columnNumber: 23
                                                                }, void 0),
                                                                ((_handoverData_crmData7 = handoverData.crmData) === null || _handoverData_crmData7 === void 0 ? void 0 : _handoverData_crmData7.salesSource) === 'direct' && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                    label: "销售人员",
                                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                        strong: true,
                                                                        children: ((_handoverData_crmData8 = handoverData.crmData) === null || _handoverData_crmData8 === void 0 ? void 0 : _handoverData_crmData8.salesPerson) || '未知'
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 425,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 424,
                                                                    columnNumber: 25
                                                                }, void 0),
                                                                ((_handoverData_crmData9 = handoverData.crmData) === null || _handoverData_crmData9 === void 0 ? void 0 : _handoverData_crmData9.salesSource) === 'channel' && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                    label: "渠道合作伙伴",
                                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                        strong: true,
                                                                        children: ((_handoverData_crmData10 = handoverData.crmData) === null || _handoverData_crmData10 === void 0 ? void 0 : _handoverData_crmData10.channelPartner) || '未知'
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 430,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 429,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 417,
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
                                                                    lineNumber: 435,
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
                                                                        lineNumber: 437,
                                                                        columnNumber: 25
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 436,
                                                                    columnNumber: 23
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 434,
                                                            columnNumber: 21
                                                        }, void 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 416,
                                                    columnNumber: 19
                                                }, void 0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/pages/handover/[id]/index.tsx",
                                            lineNumber: 388,
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
                                                                        lineNumber: 452,
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
                                                                            lineNumber: 454,
                                                                            columnNumber: 27
                                                                        }, void 0)
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 453,
                                                                        columnNumber: 25
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 451,
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
                                                                        lineNumber: 460,
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
                                                                            lineNumber: 462,
                                                                            columnNumber: 27
                                                                        }, void 0)
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 461,
                                                                        columnNumber: 25
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 459,
                                                                columnNumber: 23
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 450,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 449,
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
                                                        lineNumber: 473,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 472,
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
                                                        lineNumber: 481,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 480,
                                                    columnNumber: 19
                                                }, void 0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/pages/handover/[id]/index.tsx",
                                            lineNumber: 448,
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
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: "干系人信息",
                                                    size: "small",
                                                    style: {
                                                        marginBottom: '16px',
                                                        borderRadius: '8px'
                                                    },
                                                    children: (handoverData.stakeholders || []).length > 0 ? (handoverData.stakeholders || []).map((s)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                padding: '12px 0',
                                                                borderBottom: '1px solid #f0f0f0'
                                                            },
                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'space-between'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                        style: {
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            gap: '8px'
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                                                                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {}, void 0, false, {
                                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                                    lineNumber: 502,
                                                                                    columnNumber: 45
                                                                                }, void 0)
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 502,
                                                                                columnNumber: 31
                                                                            }, void 0),
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                                                style: {
                                                                                    fontWeight: 500,
                                                                                    minWidth: '60px'
                                                                                },
                                                                                children: s.name
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 503,
                                                                                columnNumber: 31
                                                                            }, void 0),
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                                color: "blue",
                                                                                children: s.position
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 504,
                                                                                columnNumber: 31
                                                                            }, void 0),
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                                color: "purple",
                                                                                children: s.role
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 505,
                                                                                columnNumber: 31
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 501,
                                                                        columnNumber: 29
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                                        style: {
                                                                            color: '#666',
                                                                            fontSize: '12px'
                                                                        },
                                                                        children: s.contact
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 507,
                                                                        columnNumber: 29
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 500,
                                                                columnNumber: 27
                                                            }, void 0)
                                                        }, s.id, false, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 499,
                                                            columnNumber: 25
                                                        }, void 0)) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            padding: '20px',
                                                            textAlign: 'center',
                                                            color: '#999'
                                                        },
                                                        children: "暂无干系人信息"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 512,
                                                        columnNumber: 23
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 496,
                                                    columnNumber: 19
                                                }, void 0),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: "关键联系人",
                                                    size: "small",
                                                    style: {
                                                        borderRadius: '8px'
                                                    },
                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
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
                                                                    lineNumber: 522,
                                                                    columnNumber: 29
                                                                }, void 0)
                                                            }, index, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 521,
                                                                columnNumber: 27
                                                            }, void 0)) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                padding: '20px',
                                                                textAlign: 'center',
                                                                color: '#999'
                                                            },
                                                            children: "暂无关键联系人信息"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 526,
                                                            columnNumber: 25
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 518,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 517,
                                                    columnNumber: 19
                                                }, void 0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/pages/handover/[id]/index.tsx",
                                            lineNumber: 495,
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
                                                                            lineNumber: 543,
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
                                                                                lineNumber: 545,
                                                                                columnNumber: 27
                                                                            }, void 0)
                                                                        }, void 0, false, {
                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                            lineNumber: 544,
                                                                            columnNumber: 25
                                                                        }, void 0)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 542,
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
                                                                            lineNumber: 551,
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
                                                                                lineNumber: 553,
                                                                                columnNumber: 27
                                                                            }, void 0)
                                                                        }, void 0, false, {
                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                            lineNumber: 552,
                                                                            columnNumber: 25
                                                                        }, void 0)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 550,
                                                                    columnNumber: 23
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 541,
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
                                                                    lineNumber: 563,
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
                                                                    lineNumber: 564,
                                                                    columnNumber: 23
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 562,
                                                            columnNumber: 21
                                                        }, void 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 540,
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
                                                                            lineNumber: 575,
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
                                                                                lineNumber: 577,
                                                                                columnNumber: 27
                                                                            }, void 0)
                                                                        }, void 0, false, {
                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                            lineNumber: 576,
                                                                            columnNumber: 25
                                                                        }, void 0)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 574,
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
                                                                            lineNumber: 583,
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
                                                                                lineNumber: 585,
                                                                                columnNumber: 27
                                                                            }, void 0)
                                                                        }, void 0, false, {
                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                            lineNumber: 584,
                                                                            columnNumber: 25
                                                                        }, void 0)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 582,
                                                                    columnNumber: 23
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 573,
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
                                                                    lineNumber: 590,
                                                                    columnNumber: 23
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                                                    rows: 3,
                                                                    placeholder: "请输入潜在的商机和扩展机会..."
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 591,
                                                                    columnNumber: 23
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 589,
                                                            columnNumber: 21
                                                        }, void 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 572,
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
                                                                lineNumber: 599,
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
                                                                    lineNumber: 603,
                                                                    columnNumber: 27
                                                                }, void 0)),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Timeline.Item, {
                                                                label: handoverData.updatedAt,
                                                                color: "blue",
                                                                children: "最近一次更新"
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 605,
                                                                columnNumber: 23
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 598,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 597,
                                                    columnNumber: 19
                                                }, void 0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/pages/handover/[id]/index.tsx",
                                            lineNumber: 539,
                                            columnNumber: 17
                                        }, void 0)
                                    }
                                ]
                            }, void 0, false, {
                                fileName: "src/pages/handover/[id]/index.tsx",
                                lineNumber: 286,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "src/pages/handover/[id]/index.tsx",
                            lineNumber: 280,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/pages/handover/[id]/index.tsx",
                    lineNumber: 264,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/pages/handover/[id]/index.tsx",
                lineNumber: 258,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
};
_s(HandoverDetailPage, "5Xmy4tIMU2gYfDGoGiO8wlAc0f4=", false, function() {
    return [
        _umi.useNavigate,
        _umi.useParams
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