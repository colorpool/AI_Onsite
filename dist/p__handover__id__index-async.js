((typeof globalThis !== 'undefined' ? globalThis : self)["makoChunk_ant-design-pro"] = (typeof globalThis !== 'undefined' ? globalThis : self)["makoChunk_ant-design-pro"] || []).push([
        ['p__handover__id__index'],
{ "src/pages/handover/[id]/index.tsx": function (module, exports, __mako_require__){
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
var _Footer = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/Footer/index.tsx"));
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
const HandoverDetailPage = ()=>{
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
                    navigate('/profiles/handover');
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
            navigate('/profiles/handover');
        }, 50);
    };
    // 处理新建议
    const handleNewSuggestion = ()=>{
        _antd.message.success('已创建“新建议”草稿');
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
            minHeight: 'calc(100vh - 120px)'
        },
        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
            children: "加载中..."
        }, void 0, false, {
            fileName: "src/pages/handover/[id]/index.tsx",
            lineNumber: 156,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "src/pages/handover/[id]/index.tsx",
        lineNumber: 150,
        columnNumber: 7
    }, this);
    if (!handoverData) return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            padding: '24px',
            textAlign: 'center',
            background: '#f5f5f5',
            minHeight: 'calc(100vh - 120px)'
        },
        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
            children: "未找到客户交接记录"
        }, void 0, false, {
            fileName: "src/pages/handover/[id]/index.tsx",
            lineNumber: 169,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "src/pages/handover/[id]/index.tsx",
        lineNumber: 163,
        columnNumber: 7
    }, this);
    // 状态标签颜色映射
    const statusColorMap = {
        pending: 'orange',
        processing: 'blue',
        aligned: 'green',
        partially_aligned: 'gold'
    };
    const statusTextMap = {
        pending: '待处理',
        processing: '处理中',
        aligned: '已对齐',
        partially_aligned: '部分对齐'
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
                    lineNumber: 204,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/pages/handover/[id]/index.tsx",
                lineNumber: 203,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    padding: '24px',
                    background: '#f5f5f5',
                    minHeight: 'calc(100vh - 120px)'
                },
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            maxWidth: '800px',
                            margin: '0 auto'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '16px',
                                    background: '#fff',
                                    padding: '24px',
                                    borderRadius: '8px',
                                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            flex: 1
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    marginBottom: '16px',
                                                    gap: '12px'
                                                },
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                    onClick: handleBack,
                                                    icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ArrowLeftOutlined, {}, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 239,
                                                        columnNumber: 23
                                                    }, void 0),
                                                    style: {
                                                        border: 'none',
                                                        padding: 0,
                                                        color: '#666'
                                                    },
                                                    children: "返回"
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 15
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                lineNumber: 231,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                                                level: 2,
                                                style: {
                                                    margin: 0,
                                                    marginBottom: '16px',
                                                    fontSize: '24px',
                                                    fontWeight: 600
                                                },
                                                children: handoverData.customerName
                                            }, void 0, false, {
                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                lineNumber: 246,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                size: "middle",
                                                wrap: true,
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                        color: statusColorMap[handoverData.handoverStatus],
                                                        children: statusTextMap[handoverData.handoverStatus]
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 251,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                        color: handoverData.hasRiskAlert ? 'orange' : 'default',
                                                        children: [
                                                            "风险提示: ",
                                                            handoverData.hasRiskAlert ? '有' : '无'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 254,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                        color: handoverData.expectationAlignment === 'aligned' ? 'green' : 'orange',
                                                        children: [
                                                            "期望对齐: ",
                                                            handoverData.expectationAlignment === 'aligned' ? '已对齐' : '部分对齐'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 257,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                lineNumber: 250,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/handover/[id]/index.tsx",
                                        lineNumber: 230,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            display: 'flex',
                                            gap: '12px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.EditOutlined, {}, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 265,
                                                    columnNumber: 27
                                                }, void 0),
                                                children: "编辑"
                                            }, void 0, false, {
                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                lineNumber: 265,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                type: "primary",
                                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.CheckCircleOutlined, {}, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 268,
                                                    columnNumber: 42
                                                }, void 0),
                                                onClick: handleNewSuggestion,
                                                children: "新建议"
                                            }, void 0, false, {
                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                lineNumber: 268,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/handover/[id]/index.tsx",
                                        lineNumber: 264,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/handover/[id]/index.tsx",
                                lineNumber: 219,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tabs, {
                                defaultActiveKey: "overview",
                                items: [
                                    {
                                        key: 'overview',
                                        label: '交接概览',
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
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
                                                                            lineNumber: 288,
                                                                            columnNumber: 29
                                                                        }, void 0)
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 287,
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
                                                                        lineNumber: 293,
                                                                        columnNumber: 29
                                                                    }, void 0)
                                                                ]
                                                            }, task.id, true, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 286,
                                                                columnNumber: 25
                                                            }, void 0))
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 284,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 283,
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
                                                        lineNumber: 304,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 303,
                                                    columnNumber: 19
                                                }, void 0),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: "附加成功标准",
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
                                                        lineNumber: 314,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 313,
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
                                                                                    lineNumber: 328,
                                                                                    columnNumber: 43
                                                                                }, void 0),
                                                                                size: 24,
                                                                                style: {
                                                                                    marginRight: '8px'
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 328,
                                                                                columnNumber: 29
                                                                            }, void 0),
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                                                style: {
                                                                                    fontWeight: 500
                                                                                },
                                                                                children: comment.author
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 329,
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
                                                                                lineNumber: 330,
                                                                                columnNumber: 29
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 327,
                                                                        columnNumber: 27
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                        style: {
                                                                            fontSize: '14px'
                                                                        },
                                                                        children: comment.content
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 332,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                ]
                                                            }, comment.id, true, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 326,
                                                                columnNumber: 25
                                                            }, void 0))
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 324,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 323,
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
                                                                lineNumber: 340,
                                                                columnNumber: 101
                                                            }, void 0) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DownOutlined, {}, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 340,
                                                                columnNumber: 118
                                                            }, void 0),
                                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Panel, {
                                                            header: "CRM同步信息",
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
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                strong: true,
                                                                                style: {
                                                                                    display: 'block',
                                                                                    marginBottom: '12px',
                                                                                    color: '#333'
                                                                                },
                                                                                children: "合同信息"
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 344,
                                                                                columnNumber: 29
                                                                            }, void 0),
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                                                                                gutter: [
                                                                                    16,
                                                                                    8
                                                                                ],
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                                                        span: 12,
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                                type: "secondary",
                                                                                                children: "合同金额:"
                                                                                            }, void 0, false, {
                                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                lineNumber: 349,
                                                                                                columnNumber: 33
                                                                                            }, void 0),
                                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                                style: {
                                                                                                    marginLeft: '8px'
                                                                                                },
                                                                                                children: [
                                                                                                    "¥",
                                                                                                    _handoverData.mockCRMSyncData.contractAmount
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                lineNumber: 350,
                                                                                                columnNumber: 33
                                                                                            }, void 0)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                        lineNumber: 348,
                                                                                        columnNumber: 31
                                                                                    }, void 0),
                                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                                                        span: 12,
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                                type: "secondary",
                                                                                                children: "服务周期:"
                                                                                            }, void 0, false, {
                                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                lineNumber: 353,
                                                                                                columnNumber: 33
                                                                                            }, void 0),
                                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                                style: {
                                                                                                    marginLeft: '8px'
                                                                                                },
                                                                                                children: _handoverData.mockCRMSyncData.servicePeriod
                                                                                            }, void 0, false, {
                                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                lineNumber: 354,
                                                                                                columnNumber: 33
                                                                                            }, void 0)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                        lineNumber: 352,
                                                                                        columnNumber: 31
                                                                                    }, void 0)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 347,
                                                                                columnNumber: 29
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 343,
                                                                        columnNumber: 27
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                        style: {
                                                                            marginBottom: '20px'
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                strong: true,
                                                                                style: {
                                                                                    display: 'block',
                                                                                    marginBottom: '12px',
                                                                                    color: '#333'
                                                                                },
                                                                                children: "产品信息"
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 360,
                                                                                columnNumber: 29
                                                                            }, void 0),
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                        type: "secondary",
                                                                                        children: "已购产品:"
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                        lineNumber: 364,
                                                                                        columnNumber: 31
                                                                                    }, void 0),
                                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                                        style: {
                                                                                            marginTop: '8px'
                                                                                        },
                                                                                        children: _handoverData.mockCRMSyncData.purchasedProducts.map((product, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                                                color: "blue",
                                                                                                style: {
                                                                                                    marginBottom: '4px'
                                                                                                },
                                                                                                children: product
                                                                                            }, index, false, {
                                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                lineNumber: 367,
                                                                                                columnNumber: 35
                                                                                            }, void 0))
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                        lineNumber: 365,
                                                                                        columnNumber: 31
                                                                                    }, void 0)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 363,
                                                                                columnNumber: 29
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 359,
                                                                        columnNumber: 27
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                        style: {
                                                                            marginBottom: '20px'
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                strong: true,
                                                                                style: {
                                                                                    display: 'block',
                                                                                    marginBottom: '12px',
                                                                                    color: '#333'
                                                                                },
                                                                                children: "联系人信息"
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 376,
                                                                                columnNumber: 29
                                                                            }, void 0),
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                        type: "secondary",
                                                                                        children: "关键联系人:"
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                        lineNumber: 380,
                                                                                        columnNumber: 31
                                                                                    }, void 0),
                                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                                        style: {
                                                                                            marginTop: '8px'
                                                                                        },
                                                                                        children: _handoverData.mockCRMSyncData.keyContacts.map((contact, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                                                style: {
                                                                                                    marginBottom: '8px',
                                                                                                    padding: '8px',
                                                                                                    background: '#f8f9fa',
                                                                                                    borderRadius: '4px'
                                                                                                },
                                                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                                    children: contact
                                                                                                }, void 0, false, {
                                                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                    lineNumber: 384,
                                                                                                    columnNumber: 37
                                                                                                }, void 0)
                                                                                            }, index, false, {
                                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                lineNumber: 383,
                                                                                                columnNumber: 35
                                                                                            }, void 0))
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                        lineNumber: 381,
                                                                                        columnNumber: 31
                                                                                    }, void 0)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 379,
                                                                                columnNumber: 29
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 375,
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
                                                                                children: "销售备注"
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 392,
                                                                                columnNumber: 29
                                                                            }, void 0),
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                                style: {
                                                                                    padding: '12px',
                                                                                    background: '#f8f9fa',
                                                                                    borderRadius: '4px'
                                                                                },
                                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                    children: _handoverData.mockCRMSyncData.salesNotes
                                                                                }, void 0, false, {
                                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                                    lineNumber: 396,
                                                                                    columnNumber: 31
                                                                                }, void 0)
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 395,
                                                                                columnNumber: 29
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 391,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 342,
                                                                columnNumber: 25
                                                            }, void 0)
                                                        }, "crm", false, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 341,
                                                            columnNumber: 23
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 340,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 339,
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
                                                                lineNumber: 406,
                                                                columnNumber: 101
                                                            }, void 0) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DownOutlined, {}, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 406,
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
                                                                                lineNumber: 410,
                                                                                columnNumber: 29
                                                                            }, void 0),
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                                                type: "primary",
                                                                                size: "small",
                                                                                onClick: handleAddComment,
                                                                                children: "发送评论"
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 411,
                                                                                columnNumber: 29
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 409,
                                                                        columnNumber: 27
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Divider, {
                                                                        style: {
                                                                            margin: '16px 0'
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 415,
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
                                                                                lineNumber: 417,
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
                                                                                                            lineNumber: 424,
                                                                                                            columnNumber: 51
                                                                                                        }, void 0),
                                                                                                        style: {
                                                                                                            marginRight: '8px'
                                                                                                        }
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                        lineNumber: 424,
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
                                                                                                        lineNumber: 425,
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
                                                                                                        lineNumber: 426,
                                                                                                        columnNumber: 37
                                                                                                    }, void 0)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                lineNumber: 423,
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
                                                                                                                lineNumber: 433,
                                                                                                                columnNumber: 43
                                                                                                            }, void 0))
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                        lineNumber: 431,
                                                                                                        columnNumber: 39
                                                                                                    }, void 0)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                                lineNumber: 428,
                                                                                                columnNumber: 35
                                                                                            }, void 0)
                                                                                        ]
                                                                                    }, comment.id, true, {
                                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                                        lineNumber: 422,
                                                                                        columnNumber: 33
                                                                                    }, void 0))
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                                lineNumber: 420,
                                                                                columnNumber: 29
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 416,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 408,
                                                                columnNumber: 25
                                                            }, void 0)
                                                        }, "communication", false, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 407,
                                                            columnNumber: 23
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 406,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 405,
                                                    columnNumber: 19
                                                }, void 0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/pages/handover/[id]/index.tsx",
                                            lineNumber: 281,
                                            columnNumber: 17
                                        }, void 0)
                                    },
                                    {
                                        key: 'health',
                                        label: '健康度监控',
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: "健康分趋势",
                                                    style: {
                                                        marginBottom: '16px',
                                                        borderRadius: '8px'
                                                    },
                                                    size: "small",
                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            height: 180,
                                                            background: 'linear-gradient(180deg, #e6f7ff, #fff)',
                                                            border: '1px dashed #91d5ff',
                                                            borderRadius: 8,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            color: '#1890ff'
                                                        },
                                                        children: "折线图占位（健康分趋势）"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 457,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 456,
                                                    columnNumber: 19
                                                }, void 0),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: "活跃度分析",
                                                    style: {
                                                        marginBottom: '16px',
                                                        borderRadius: '8px'
                                                    },
                                                    size: "small",
                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                                                        gutter: 16,
                                                        children: [
                                                            {
                                                                label: '登录',
                                                                value: 76
                                                            },
                                                            {
                                                                label: '访问页面',
                                                                value: 58
                                                            },
                                                            {
                                                                label: '功能使用',
                                                                value: 42
                                                            },
                                                            {
                                                                label: 'API调用',
                                                                value: 30
                                                            }
                                                        ].map((m)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                                xs: 24,
                                                                sm: 12,
                                                                style: {
                                                                    marginBottom: 12
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                        style: {
                                                                            marginBottom: 6
                                                                        },
                                                                        children: m.label
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 470,
                                                                        columnNumber: 27
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Progress, {
                                                                        percent: m.value,
                                                                        showInfo: true
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 471,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                ]
                                                            }, m.label, true, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 469,
                                                                columnNumber: 25
                                                            }, void 0))
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 462,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 461,
                                                    columnNumber: 19
                                                }, void 0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/pages/handover/[id]/index.tsx",
                                            lineNumber: 455,
                                            columnNumber: 17
                                        }, void 0)
                                    },
                                    {
                                        key: 'history',
                                        label: '服务历史',
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
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
                                                        lineNumber: 485,
                                                        columnNumber: 21
                                                    }, void 0),
                                                    onboardingTasks.filter((t)=>t.completed).map((t)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Timeline.Item, {
                                                            color: "green",
                                                            children: [
                                                                "完成任务：",
                                                                t.title
                                                            ]
                                                        }, t.id, true, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 489,
                                                            columnNumber: 25
                                                        }, void 0)),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Timeline.Item, {
                                                        label: handoverData.updatedAt,
                                                        color: "blue",
                                                        children: "最近一次更新"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 491,
                                                        columnNumber: 21
                                                    }, void 0)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                lineNumber: 484,
                                                columnNumber: 19
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "src/pages/handover/[id]/index.tsx",
                                            lineNumber: 483,
                                            columnNumber: 17
                                        }, void 0)
                                    },
                                    {
                                        key: 'info',
                                        label: '客户信息',
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
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
                                                                lineNumber: 503,
                                                                columnNumber: 23
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "交接状态",
                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                    color: statusColorMap[handoverData.handoverStatus],
                                                                    children: statusTextMap[handoverData.handoverStatus]
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                                    lineNumber: 505,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 504,
                                                                columnNumber: 23
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "风险等级",
                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                    color: riskColorMap[handoverData.riskLevel],
                                                                    children: riskTextMap[handoverData.riskLevel]
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
                                                        lineNumber: 502,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 501,
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
                                                                children: [
                                                                    "¥",
                                                                    _handoverData.mockCRMSyncData.contractAmount
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 514,
                                                                columnNumber: 23
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "服务周期",
                                                                children: _handoverData.mockCRMSyncData.servicePeriod
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 515,
                                                                columnNumber: 23
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "已购产品",
                                                                span: 2,
                                                                children: _handoverData.mockCRMSyncData.purchasedProducts.map((p, i)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                        color: "blue",
                                                                        style: {
                                                                            marginBottom: 4
                                                                        },
                                                                        children: p
                                                                    }, i, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 518,
                                                                        columnNumber: 27
                                                                    }, void 0))
                                                            }, void 0, false, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 516,
                                                                columnNumber: 23
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                        lineNumber: 513,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 512,
                                                    columnNumber: 19
                                                }, void 0),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: "干系人信息",
                                                    size: "small",
                                                    style: {
                                                        borderRadius: '8px'
                                                    },
                                                    children: (handoverData.stakeholders || []).map((s)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                padding: '8px 0',
                                                                borderBottom: '1px solid #f0f0f0'
                                                            },
                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                                                                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {}, void 0, false, {
                                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                                            lineNumber: 527,
                                                                            columnNumber: 41
                                                                        }, void 0)
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 527,
                                                                        columnNumber: 27
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                                        children: s.name
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 528,
                                                                        columnNumber: 27
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                        children: s.position
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 529,
                                                                        columnNumber: 27
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                        color: "purple",
                                                                        children: s.role
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 530,
                                                                        columnNumber: 27
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                                        style: {
                                                                            color: '#999'
                                                                        },
                                                                        children: s.contact
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/handover/[id]/index.tsx",
                                                                        lineNumber: 531,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/handover/[id]/index.tsx",
                                                                lineNumber: 526,
                                                                columnNumber: 25
                                                            }, void 0)
                                                        }, s.id, false, {
                                                            fileName: "src/pages/handover/[id]/index.tsx",
                                                            lineNumber: 525,
                                                            columnNumber: 23
                                                        }, void 0))
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/[id]/index.tsx",
                                                    lineNumber: 523,
                                                    columnNumber: 19
                                                }, void 0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/pages/handover/[id]/index.tsx",
                                            lineNumber: 500,
                                            columnNumber: 17
                                        }, void 0)
                                    }
                                ]
                            }, void 0, false, {
                                fileName: "src/pages/handover/[id]/index.tsx",
                                lineNumber: 274,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/handover/[id]/index.tsx",
                        lineNumber: 213,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_Footer.default, {}, void 0, false, {
                        fileName: "src/pages/handover/[id]/index.tsx",
                        lineNumber: 544,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/pages/handover/[id]/index.tsx",
                lineNumber: 208,
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