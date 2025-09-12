((typeof globalThis !== 'undefined' ? globalThis : self)["makoChunk_ant-design-pro"] = (typeof globalThis !== 'undefined' ? globalThis : self)["makoChunk_ant-design-pro"] || []).push([
        ['common'],
{ "src/components/CustomerDetailWithPlaybooks.tsx": function (module, exports, __mako_require__){
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
var _antd = __mako_require__("node_modules/antd/es/index.js");
var _icons = __mako_require__("node_modules/@ant-design/icons/es/index.js");
var _dayjs = /*#__PURE__*/ _interop_require_default._(__mako_require__("node_modules/dayjs/dayjs.min.js"));
var _continuousServiceData = __mako_require__("src/mock/continuousServiceData.ts");
var _PlaybookLauncher = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/PlaybookLauncher.tsx"));
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
var _s = $RefreshSig$();
const { Title, Text, Paragraph } = _antd.Typography;
const { TabPane } = _antd.Tabs;
// 平台类型显示名称映射
const getPlatformDisplayName = (platformType)=>{
    const displayNames = {
        'dingtalk': '钉钉',
        'wechat_work': '企业微信',
        'feishu': '飞书',
        'lark': 'Lark',
        'dingtalk_global': '钉钉海外版',
        'standalone': '独立部署'
    };
    return displayNames[platformType] || '未知';
};
const CustomerDetailWithPlaybooks = ({ visible, customer, recommendations, executions, playbooks, onClose, onAction, onLaunchPlaybook, onUpdateRecommendation, loading = false })=>{
    var _customer_name, _customer_arr;
    _s();
    const [activeTab, setActiveTab] = (0, _react.useState)('overview');
    const [launcherVisible, setLauncherVisible] = (0, _react.useState)(false);
    const [selectedPlaybook, setSelectedPlaybook] = (0, _react.useState)(null);
    if (!customer) return null;
    // 获取客户相关的推荐
    const customerRecommendations = (recommendations || []).filter((r)=>r.customerId === customer.id);
    // 获取客户相关的执行记录
    const customerExecutions = (executions || []).filter((e)=>e.customerId === customer.id);
    // 获取客户历史记录
    const customerHistory = _continuousServiceData.mockCustomerHistory[customer.id] || [];
    // 获取联系人信息
    const contacts = _continuousServiceData.mockContacts[customer.id] || [];
    // 使用统一的数据源函数
    const getHealthColor = (score)=>{
        if (score >= 80) return '#52c41a';
        if (score >= 60) return '#faad14';
        return '#fa541c';
    };
    const getStatusColor = (status)=>{
        switch(status){
            case 'pending':
                return 'orange';
            case 'accepted':
            case 'completed':
                return 'green';
            case 'rejected':
            case 'cancelled':
                return 'red';
            case 'in_progress':
                return 'blue';
            default:
                return 'default';
        }
    };
    // 处理推荐操作
    const handleRecommendationAction = async (id, action)=>{
        try {
            await onUpdateRecommendation(id, {
                status: action === 'accept' ? 'accepted' : 'rejected',
                handledAt: new Date().toISOString(),
                handledBy: '当前用户' // 这里应该从用户上下文获取
            });
            if (action === 'accept') {
                const recommendation = customerRecommendations.find((r)=>r.id === id);
                if (recommendation) {
                    const playbook = playbooks.find((p)=>p.id === recommendation.playbookId);
                    if (playbook) {
                        setSelectedPlaybook(playbook);
                        setLauncherVisible(true);
                    }
                }
            }
            _antd.message.success(action === 'accept' ? '已接受推荐' : '已拒绝推荐');
        } catch (error) {
            _antd.message.error('操作失败，请重试');
        }
    };
    // 启动剧本适配器函数
    const handleLaunchPlaybook = async (execution)=>{
        if (!customer || !execution.playbookId) return;
        try {
            await onLaunchPlaybook(execution.playbookId, customer.id);
            setLauncherVisible(false);
            _antd.message.success('剧本启动成功');
        } catch (error) {
            _antd.message.error('启动剧本失败');
        }
    };
    // 推荐表格列
    const recommendationColumns = [
        {
            title: '推荐剧本',
            dataIndex: 'playbookName',
            key: 'playbookName',
            render: (text, record)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                            strong: true,
                            children: text
                        }, void 0, false, {
                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                            lineNumber: 205,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("br", {}, void 0, false, {
                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                            lineNumber: 206,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                            type: "secondary",
                            style: {
                                fontSize: '12px'
                            },
                            children: [
                                "置信度: ",
                                Math.round(record.confidence * 100),
                                "%"
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                            lineNumber: 207,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                    lineNumber: 204,
                    columnNumber: 9
                }, this)
        },
        {
            title: '推荐原因',
            dataIndex: 'reason',
            key: 'reason',
            ellipsis: true
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                    color: getStatusColor(status),
                    children: status === 'pending' ? '待处理' : status === 'accepted' ? '已接受' : status === 'rejected' ? '已拒绝' : '已过期'
                }, void 0, false, {
                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                    lineNumber: 224,
                    columnNumber: 9
                }, this)
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date)=>(0, _dayjs.default)(date).format('MM-DD HH:mm')
        },
        {
            title: '操作',
            key: 'actions',
            render: (_, record)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                    size: "small",
                    children: record.status === 'pending' && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_jsxdevruntime.Fragment, {
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                type: "primary",
                                size: "small",
                                onClick: ()=>handleRecommendationAction(record.id, 'accept'),
                                children: "接受"
                            }, void 0, false, {
                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                lineNumber: 244,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                size: "small",
                                onClick: ()=>handleRecommendationAction(record.id, 'reject'),
                                children: "拒绝"
                            }, void 0, false, {
                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                lineNumber: 251,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                }, void 0, false, {
                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                    lineNumber: 241,
                    columnNumber: 9
                }, this)
        }
    ];
    // 执行记录表格列
    const executionColumns = [
        {
            title: '剧本名称',
            dataIndex: 'playbookName',
            key: 'playbookName'
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                    color: getStatusColor(status),
                    children: status === 'pending' ? '待开始' : status === 'in_progress' ? '进行中' : status === 'completed' ? '已完成' : status === 'paused' ? '已暂停' : '已取消'
                }, void 0, false, {
                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                    lineNumber: 276,
                    columnNumber: 9
                }, this)
        },
        {
            title: '进度',
            dataIndex: 'progress',
            key: 'progress',
            render: (progress)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Progress, {
                    percent: progress,
                    size: "small"
                }, void 0, false, {
                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                    lineNumber: 289,
                    columnNumber: 9
                }, this)
        },
        {
            title: '启动时间',
            dataIndex: 'startedAt',
            key: 'startedAt',
            render: (date)=>(0, _dayjs.default)(date).format('MM-DD HH:mm')
        },
        {
            title: '预期完成',
            dataIndex: 'expectedEndAt',
            key: 'expectedEndAt',
            render: (date)=>(0, _dayjs.default)(date).format('MM-DD HH:mm')
        }
    ];
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_jsxdevruntime.Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Drawer, {
                title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12
                    },
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                            size: "large",
                            style: {
                                backgroundColor: '#1890ff'
                            },
                            children: (_customer_name = customer.name) === null || _customer_name === void 0 ? void 0 : _customer_name.charAt(0)
                        }, void 0, false, {
                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                            lineNumber: 311,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                                            level: 4,
                                            style: {
                                                margin: 0
                                            },
                                            children: customer.name
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                            lineNumber: 316,
                                            columnNumber: 17
                                        }, void 0),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                            color: "blue",
                                            children: getPlatformDisplayName((0, _continuousServiceData.getPlatformType)(customer.id))
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                            lineNumber: 317,
                                            columnNumber: 17
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                    lineNumber: 315,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                    type: "secondary",
                                    children: "客户详情"
                                }, void 0, false, {
                                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                    lineNumber: 319,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                            lineNumber: 314,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                    lineNumber: 310,
                    columnNumber: 11
                }, void 0),
                open: visible,
                onClose: onClose,
                width: 800,
                placement: "right",
                styles: {
                    body: {
                        padding: '24px'
                    }
                },
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tabs, {
                    activeKey: activeTab,
                    onChange: setActiveTab,
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TabPane, {
                            tab: "基本信息",
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                                gutter: 24,
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                        span: 12,
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                            direction: "vertical",
                                            style: {
                                                width: '100%'
                                            },
                                            size: 16,
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: "基本信息",
                                                    size: "small",
                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions, {
                                                        column: 1,
                                                        size: "small",
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "客户名称",
                                                                children: customer.name
                                                            }, void 0, false, {
                                                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                lineNumber: 341,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "行业",
                                                                children: customer.industry
                                                            }, void 0, false, {
                                                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                lineNumber: 342,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "企业规模",
                                                                children: customer.scale
                                                            }, void 0, false, {
                                                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                lineNumber: 343,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "客户成功经理",
                                                                children: customer.csm
                                                            }, void 0, false, {
                                                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                lineNumber: 344,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "ARR",
                                                                children: [
                                                                    "¥",
                                                                    (_customer_arr = customer.arr) === null || _customer_arr === void 0 ? void 0 : _customer_arr.toLocaleString()
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                lineNumber: 345,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "生命周期阶段",
                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                    color: "blue",
                                                                    children: customer.lifecycleStage
                                                                }, void 0, false, {
                                                                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                    lineNumber: 347,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                lineNumber: 346,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "客户定级",
                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                    color: "purple",
                                                                    children: customer.customerTier
                                                                }, void 0, false, {
                                                                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                    lineNumber: 350,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                lineNumber: 349,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                        lineNumber: 340,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                    lineNumber: 339,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: "CRM信息",
                                                    size: "small",
                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions, {
                                                        column: 1,
                                                        size: "small",
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "平台类型",
                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                    color: "blue",
                                                                    children: getPlatformDisplayName((0, _continuousServiceData.getPlatformType)(customer.id))
                                                                }, void 0, false, {
                                                                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                    lineNumber: 359,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                lineNumber: 358,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "已购产品",
                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    children: (0, _continuousServiceData.getPurchasedProducts)(customer.id).products.map((product, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                            color: "green",
                                                                            style: {
                                                                                marginBottom: 4
                                                                            },
                                                                            children: product
                                                                        }, index, false, {
                                                                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                            lineNumber: 364,
                                                                            columnNumber: 29
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                    lineNumber: 362,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                lineNumber: 361,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "增值服务",
                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    children: (0, _continuousServiceData.getPurchasedProducts)(customer.id).services.map((service, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                            color: "orange",
                                                                            style: {
                                                                                marginBottom: 4
                                                                            },
                                                                            children: service
                                                                        }, index, false, {
                                                                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                            lineNumber: 373,
                                                                            columnNumber: 29
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                    lineNumber: 371,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                lineNumber: 370,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                        lineNumber: 357,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                    lineNumber: 356,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: "健康度分析",
                                                    size: "small",
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                textAlign: 'center',
                                                                marginBottom: '16px'
                                                            },
                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Progress, {
                                                                type: "circle",
                                                                percent: customer.healthScore,
                                                                strokeColor: getHealthColor(customer.healthScore),
                                                                format: (percent)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                                style: {
                                                                                    fontSize: '24px',
                                                                                    fontWeight: 'bold',
                                                                                    color: getHealthColor(customer.healthScore)
                                                                                },
                                                                                children: percent
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                                lineNumber: 391,
                                                                                columnNumber: 29
                                                                            }, void 0),
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                                style: {
                                                                                    fontSize: '12px',
                                                                                    color: '#8c8c8c'
                                                                                },
                                                                                children: "健康分"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                                lineNumber: 394,
                                                                                columnNumber: 29
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                        lineNumber: 390,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                lineNumber: 385,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                            lineNumber: 384,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                textAlign: 'center'
                                                            },
                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                color: customer.healthLevel === '健康' ? 'green' : customer.healthLevel === '风险' ? 'red' : 'orange',
                                                                children: customer.healthLevel
                                                            }, void 0, false, {
                                                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                lineNumber: 400,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                            lineNumber: 399,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                    lineNumber: 383,
                                                    columnNumber: 19
                                                }, this),
                                                customer.nextRenewalDate && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: "续约信息",
                                                    size: "small",
                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions, {
                                                        column: 1,
                                                        size: "small",
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "下次续约日期",
                                                                children: (0, _dayjs.default)(customer.nextRenewalDate).format('YYYY-MM-DD')
                                                            }, void 0, false, {
                                                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                lineNumber: 413,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                                label: "续约风险",
                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                    color: customer.isRenewalRisk ? 'red' : 'green',
                                                                    children: customer.isRenewalRisk ? '有风险' : '无风险'
                                                                }, void 0, false, {
                                                                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                    lineNumber: 417,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                lineNumber: 416,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                        lineNumber: 412,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                    lineNumber: 411,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: "主要联系人",
                                                    size: "small",
                                                    children: contacts.map((contact, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                padding: '12px',
                                                                border: '1px solid #f0f0f0',
                                                                borderRadius: '6px',
                                                                marginBottom: '8px',
                                                                background: contact.isPrimary ? '#f6ffed' : '#fff'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: 8,
                                                                        marginBottom: '4px'
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                                                                            size: "small",
                                                                            icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {}, void 0, false, {
                                                                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                                lineNumber: 436,
                                                                                columnNumber: 54
                                                                            }, void 0)
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                            lineNumber: 436,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                            strong: true,
                                                                            children: contact.name
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                            lineNumber: 437,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        contact.isPrimary && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Badge, {
                                                                            status: "success",
                                                                            text: "主要"
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                            lineNumber: 438,
                                                                            columnNumber: 49
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                    lineNumber: 435,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        fontSize: '12px',
                                                                        color: '#8c8c8c',
                                                                        marginBottom: '4px'
                                                                    },
                                                                    children: contact.title
                                                                }, void 0, false, {
                                                                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                    lineNumber: 440,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        fontSize: '12px',
                                                                        color: '#8c8c8c'
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PhoneOutlined, {}, void 0, false, {
                                                                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                            lineNumber: 444,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        " ",
                                                                        contact.phone,
                                                                        " | ",
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.MailOutlined, {}, void 0, false, {
                                                                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                            lineNumber: 444,
                                                                            columnNumber: 63
                                                                        }, this),
                                                                        " ",
                                                                        contact.email
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                    lineNumber: 443,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, index, true, {
                                                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                            lineNumber: 428,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                    lineNumber: 426,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                            lineNumber: 337,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                        lineNumber: 336,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                        span: 12,
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                            direction: "vertical",
                                            style: {
                                                width: '100%'
                                            },
                                            size: 16,
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: "客户历史记录",
                                                    size: "small",
                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Timeline, {
                                                        items: customerHistory.map((item, index)=>{
                                                            // 根据icon字符串渲染对应的图标组件
                                                            const getIconComponent = (iconName)=>{
                                                                switch(iconName){
                                                                    case 'UserOutlined':
                                                                        return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {}, void 0, false, {
                                                                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                            lineNumber: 462,
                                                                            columnNumber: 57
                                                                        }, void 0);
                                                                    case 'ExclamationCircleOutlined':
                                                                        return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ExclamationCircleOutlined, {}, void 0, false, {
                                                                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                            lineNumber: 463,
                                                                            columnNumber: 70
                                                                        }, void 0);
                                                                    case 'RiseOutlined':
                                                                        return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.RiseOutlined, {}, void 0, false, {
                                                                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                            lineNumber: 464,
                                                                            columnNumber: 57
                                                                        }, void 0);
                                                                    case 'MailOutlined':
                                                                        return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.MailOutlined, {}, void 0, false, {
                                                                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                            lineNumber: 465,
                                                                            columnNumber: 57
                                                                        }, void 0);
                                                                    case 'SettingOutlined':
                                                                        return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.SettingOutlined, {}, void 0, false, {
                                                                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                            lineNumber: 466,
                                                                            columnNumber: 60
                                                                        }, void 0);
                                                                    case 'FileTextOutlined':
                                                                        return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.FileTextOutlined, {}, void 0, false, {
                                                                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                            lineNumber: 467,
                                                                            columnNumber: 61
                                                                        }, void 0);
                                                                    case 'TeamOutlined':
                                                                        return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.TeamOutlined, {}, void 0, false, {
                                                                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                            lineNumber: 468,
                                                                            columnNumber: 57
                                                                        }, void 0);
                                                                    case 'CheckCircleOutlined':
                                                                        return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.CheckCircleOutlined, {}, void 0, false, {
                                                                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                            lineNumber: 469,
                                                                            columnNumber: 64
                                                                        }, void 0);
                                                                    default:
                                                                        return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {}, void 0, false, {
                                                                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                            lineNumber: 470,
                                                                            columnNumber: 45
                                                                        }, void 0);
                                                                }
                                                            };
                                                            return {
                                                                color: item.color,
                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                            style: {
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                gap: '8px',
                                                                                marginBottom: '4px'
                                                                            },
                                                                            children: [
                                                                                getIconComponent(item.icon),
                                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                    strong: true,
                                                                                    children: item.type
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                                    lineNumber: 480,
                                                                                    columnNumber: 33
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                    type: "secondary",
                                                                                    style: {
                                                                                        fontSize: '12px'
                                                                                    },
                                                                                    children: item.date
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                                    lineNumber: 481,
                                                                                    columnNumber: 33
                                                                                }, void 0)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                            lineNumber: 478,
                                                                            columnNumber: 31
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                            type: "secondary",
                                                                            children: item.description
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                            lineNumber: 483,
                                                                            columnNumber: 31
                                                                        }, void 0)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                    lineNumber: 477,
                                                                    columnNumber: 29
                                                                }, void 0)
                                                            };
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                        lineNumber: 457,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                    lineNumber: 456,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                    title: "快速操作",
                                                    size: "small",
                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                        wrap: true,
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PhoneOutlined, {}, void 0, false, {
                                                                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                    lineNumber: 495,
                                                                    columnNumber: 31
                                                                }, void 0),
                                                                onClick: ()=>onAction('call', customer.id),
                                                                children: "拨打电话"
                                                            }, void 0, false, {
                                                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                lineNumber: 494,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.MailOutlined, {}, void 0, false, {
                                                                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                    lineNumber: 501,
                                                                    columnNumber: 31
                                                                }, void 0),
                                                                onClick: ()=>onAction('email', customer.id),
                                                                children: "发送邮件"
                                                            }, void 0, false, {
                                                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                lineNumber: 500,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.CalendarOutlined, {}, void 0, false, {
                                                                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                    lineNumber: 507,
                                                                    columnNumber: 31
                                                                }, void 0),
                                                                onClick: ()=>onAction('schedule', customer.id),
                                                                children: "安排会议"
                                                            }, void 0, false, {
                                                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                lineNumber: 506,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.FileTextOutlined, {}, void 0, false, {
                                                                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                    lineNumber: 513,
                                                                    columnNumber: 31
                                                                }, void 0),
                                                                onClick: ()=>onAction('quote', customer.id),
                                                                children: "发送报价"
                                                            }, void 0, false, {
                                                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                lineNumber: 512,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.TeamOutlined, {}, void 0, false, {
                                                                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                    lineNumber: 519,
                                                                    columnNumber: 31
                                                                }, void 0),
                                                                onClick: ()=>onAction('escalate', customer.id),
                                                                children: "升级处理"
                                                            }, void 0, false, {
                                                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                                lineNumber: 518,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                        lineNumber: 493,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                                    lineNumber: 492,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                            lineNumber: 454,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                        lineNumber: 453,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                lineNumber: 334,
                                columnNumber: 13
                            }, this)
                        }, "overview", false, {
                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                            lineNumber: 333,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TabPane, {
                            tab: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.RobotOutlined, {}, void 0, false, {
                                        fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                        lineNumber: 535,
                                        columnNumber: 17
                                    }, void 0),
                                    "剧本推荐",
                                    customerRecommendations.filter((r)=>r.status === 'pending').length > 0 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Badge, {
                                        count: customerRecommendations.filter((r)=>r.status === 'pending').length,
                                        style: {
                                            marginLeft: 8
                                        }
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                        lineNumber: 538,
                                        columnNumber: 19
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                lineNumber: 534,
                                columnNumber: 15
                            }, void 0),
                            children: customerRecommendations.length > 0 ? /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Table, {
                                columns: recommendationColumns,
                                dataSource: customerRecommendations,
                                rowKey: "id",
                                pagination: false,
                                size: "small"
                            }, void 0, false, {
                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                lineNumber: 545,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Empty, {
                                description: "暂无剧本推荐"
                            }, void 0, false, {
                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                lineNumber: 553,
                                columnNumber: 15
                            }, this)
                        }, "recommendations", false, {
                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                            lineNumber: 532,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TabPane, {
                            tab: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.HistoryOutlined, {}, void 0, false, {
                                        fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                        lineNumber: 561,
                                        columnNumber: 17
                                    }, void 0),
                                    "执行记录"
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                lineNumber: 560,
                                columnNumber: 15
                            }, void 0),
                            children: customerExecutions.length > 0 ? /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Table, {
                                columns: executionColumns,
                                dataSource: customerExecutions,
                                rowKey: "id",
                                pagination: false,
                                size: "small"
                            }, void 0, false, {
                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                lineNumber: 568,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Empty, {
                                description: "暂无执行记录"
                            }, void 0, false, {
                                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                                lineNumber: 576,
                                columnNumber: 15
                            }, this)
                        }, "executions", false, {
                            fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                            lineNumber: 558,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                    lineNumber: 331,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                lineNumber: 308,
                columnNumber: 7
            }, this),
            selectedPlaybook && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_PlaybookLauncher.default, {
                visible: launcherVisible,
                playbook: selectedPlaybook,
                customer: customer,
                onCancel: ()=>{
                    setLauncherVisible(false);
                    setSelectedPlaybook(null);
                },
                onLaunch: handleLaunchPlaybook
            }, void 0, false, {
                fileName: "src/components/CustomerDetailWithPlaybooks.tsx",
                lineNumber: 584,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
};
_s(CustomerDetailWithPlaybooks, "xeH3ZQ4dSyqFVXbVc/a2UzhAzJI=");
_c = CustomerDetailWithPlaybooks;
var _default = CustomerDetailWithPlaybooks;
var _c;
$RefreshReg$(_c, "CustomerDetailWithPlaybooks");
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
"src/components/PlaybookLauncher.tsx": function (module, exports, __mako_require__){
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
var _antd = __mako_require__("node_modules/antd/es/index.js");
var _icons = __mako_require__("node_modules/@ant-design/icons/es/index.js");
var _dayjs = /*#__PURE__*/ _interop_require_default._(__mako_require__("node_modules/dayjs/dayjs.min.js"));
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
var _s = $RefreshSig$();
const { Title, Text, Paragraph } = _antd.Typography;
const { Option } = _antd.Select;
const { TextArea } = _antd.Input;
const { Step } = _antd.Steps;
const PlaybookLauncher = ({ visible, playbook, customer, onCancel, onLaunch, loading = false })=>{
    var _form_getFieldValue;
    _s();
    const [currentStep, setCurrentStep] = (0, _react.useState)(0);
    const [form] = _antd.Form.useForm();
    const [confirmed, setConfirmed] = (0, _react.useState)(false);
    // 重置状态
    const resetState = ()=>{
        setCurrentStep(0);
        setConfirmed(false);
        form.resetFields();
    };
    // 处理取消
    const handleCancel = ()=>{
        resetState();
        onCancel();
    };
    // 下一步
    const handleNext = async ()=>{
        if (currentStep === 0) // 验证基本信息
        try {
            await form.validateFields([
                'customerId',
                'launchReason'
            ]);
            setCurrentStep(1);
        } catch (error) {
        // 验证失败，不进行下一步
        }
        else if (currentStep === 1) // 验证任务分派
        try {
            await form.validateFields([
                'taskAssignments'
            ]);
            setCurrentStep(2);
        } catch (error) {
        // 验证失败，不进行下一步
        }
    };
    // 上一步
    const handlePrev = ()=>{
        setCurrentStep(currentStep - 1);
    };
    // 启动剧本
    const handleLaunch = async ()=>{
        if (!playbook || !confirmed) {
            _antd.message.warning('请确认所有信息无误后再启动');
            return;
        }
        try {
            var _values_expectedEndDate;
            const values = await form.validateFields();
            // 构建执行实例
            const execution = {
                playbookId: playbook.id,
                playbookName: playbook.name,
                customerId: values.customerId,
                customerName: (customer === null || customer === void 0 ? void 0 : customer.name) || '',
                status: 'pending',
                progress: 0,
                launchedBy: 'current_user',
                launchType: 'manual',
                launchReason: values.launchReason,
                startedAt: (0, _dayjs.default)().toISOString(),
                expectedEndAt: ((_values_expectedEndDate = values.expectedEndDate) === null || _values_expectedEndDate === void 0 ? void 0 : _values_expectedEndDate.toISOString()) || (0, _dayjs.default)().add(playbook.estimatedDuration, 'hour').toISOString(),
                notes: values.notes,
                taskExecutions: playbook.tasks.map((task)=>({
                        id: `exec_${task.id}_${Date.now()}`,
                        executionId: '',
                        taskId: task.id,
                        taskTitle: task.title,
                        status: 'pending',
                        assignedTo: values.taskAssignments[task.id] || '',
                        assignedAt: (0, _dayjs.default)().toISOString(),
                        dueDate: (0, _dayjs.default)().add(task.dueOffset, 'day').toISOString(),
                        checkpointResults: task.checkpoints.map((checkpoint)=>({
                                checkpointId: `cp_${checkpoint}_${Date.now()}`,
                                description: checkpoint,
                                completed: false
                            })),
                        createdAt: (0, _dayjs.default)().toISOString(),
                        updatedAt: (0, _dayjs.default)().toISOString()
                    })),
                createdAt: (0, _dayjs.default)().toISOString(),
                updatedAt: (0, _dayjs.default)().toISOString()
            };
            await onLaunch(execution);
            _antd.message.success('剧本启动成功！');
            resetState();
        } catch (error) {
            console.error('启动剧本失败:', error);
            _antd.message.error('启动剧本失败，请重试');
        }
    };
    // 获取默认负责人显示名称
    const getDefaultAssigneeName = (defaultAssignee, customAssignee)=>{
        if (defaultAssignee === 'custom' && customAssignee) return customAssignee;
        const assigneeMap = {
            'csm': 'CSM',
            'csm_manager': 'CSM经理',
            'support': '技术支持',
            'sales': '销售',
            'custom': '自定义'
        };
        return assigneeMap[defaultAssignee] || defaultAssignee;
    };
    if (!playbook) return null;
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Modal, {
        title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
            style: {
                display: 'flex',
                alignItems: 'center',
                gap: 8
            },
            children: [
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PlayCircleOutlined, {
                    style: {
                        color: '#1890ff'
                    }
                }, void 0, false, {
                    fileName: "src/components/PlaybookLauncher.tsx",
                    lineNumber: 185,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                    children: [
                        "启动剧本：",
                        playbook.name
                    ]
                }, void 0, true, {
                    fileName: "src/components/PlaybookLauncher.tsx",
                    lineNumber: 186,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "src/components/PlaybookLauncher.tsx",
            lineNumber: 184,
            columnNumber: 9
        }, void 0),
        open: visible,
        onCancel: handleCancel,
        width: 900,
        footer: null,
        destroyOnClose: true,
        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Spin, {
            spinning: loading,
            children: [
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Steps, {
                    current: currentStep,
                    style: {
                        marginBottom: 24
                    },
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Step, {
                            title: "基本信息",
                            icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.FileTextOutlined, {}, void 0, false, {
                                fileName: "src/components/PlaybookLauncher.tsx",
                                lineNumber: 197,
                                columnNumber: 36
                            }, void 0)
                        }, void 0, false, {
                            fileName: "src/components/PlaybookLauncher.tsx",
                            lineNumber: 197,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Step, {
                            title: "任务分派",
                            icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {}, void 0, false, {
                                fileName: "src/components/PlaybookLauncher.tsx",
                                lineNumber: 198,
                                columnNumber: 36
                            }, void 0)
                        }, void 0, false, {
                            fileName: "src/components/PlaybookLauncher.tsx",
                            lineNumber: 198,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Step, {
                            title: "确认启动",
                            icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.CheckCircleOutlined, {}, void 0, false, {
                                fileName: "src/components/PlaybookLauncher.tsx",
                                lineNumber: 199,
                                columnNumber: 36
                            }, void 0)
                        }, void 0, false, {
                            fileName: "src/components/PlaybookLauncher.tsx",
                            lineNumber: 199,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/PlaybookLauncher.tsx",
                    lineNumber: 196,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form, {
                    form: form,
                    layout: "vertical",
                    initialValues: {
                        customerId: (customer === null || customer === void 0 ? void 0 : customer.id) || '',
                        taskAssignments: playbook.tasks.reduce((acc, task)=>{
                            acc[task.id] = task.customAssignee || getDefaultAssigneeName(task.defaultAssignee);
                            return acc;
                        }, {})
                    },
                    children: [
                        currentStep === 0 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                    title: "剧本信息",
                                    style: {
                                        marginBottom: 16
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                                            gutter: 16,
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                    span: 12,
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                            strong: true,
                                                            children: "剧本名称："
                                                        }, void 0, false, {
                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                            lineNumber: 219,
                                                            columnNumber: 21
                                                        }, this),
                                                        playbook.name
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                    lineNumber: 218,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                    span: 12,
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                            strong: true,
                                                            children: "分类："
                                                        }, void 0, false, {
                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                            lineNumber: 222,
                                                            columnNumber: 21
                                                        }, this),
                                                        playbook.category
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                    lineNumber: 221,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                    span: 12,
                                                    style: {
                                                        marginTop: 8
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                            strong: true,
                                                            children: "预估耗时："
                                                        }, void 0, false, {
                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                            lineNumber: 225,
                                                            columnNumber: 21
                                                        }, this),
                                                        playbook.estimatedDuration,
                                                        "小时"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                    lineNumber: 224,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                    span: 12,
                                                    style: {
                                                        marginTop: 8
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                            strong: true,
                                                            children: "成功率："
                                                        }, void 0, false, {
                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                            lineNumber: 228,
                                                            columnNumber: 21
                                                        }, this),
                                                        playbook.successRate,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                    lineNumber: 227,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/PlaybookLauncher.tsx",
                                            lineNumber: 217,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Divider, {}, void 0, false, {
                                            fileName: "src/components/PlaybookLauncher.tsx",
                                            lineNumber: 231,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Paragraph, {
                                            children: playbook.description
                                        }, void 0, false, {
                                            fileName: "src/components/PlaybookLauncher.tsx",
                                            lineNumber: 232,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                            strong: true,
                                            children: "目标："
                                        }, void 0, false, {
                                            fileName: "src/components/PlaybookLauncher.tsx",
                                            lineNumber: 233,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Paragraph, {
                                            children: playbook.goal
                                        }, void 0, false, {
                                            fileName: "src/components/PlaybookLauncher.tsx",
                                            lineNumber: 234,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/PlaybookLauncher.tsx",
                                    lineNumber: 216,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                    title: "启动配置",
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                            name: "customerId",
                                            label: "目标客户",
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请选择目标客户'
                                                }
                                            ],
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                                placeholder: "选择客户",
                                                disabled: !!customer,
                                                children: customer && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                    value: customer.id,
                                                    children: customer.name
                                                }, void 0, false, {
                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                    lineNumber: 245,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                lineNumber: 243,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/components/PlaybookLauncher.tsx",
                                            lineNumber: 238,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                            name: "launchReason",
                                            label: "启动原因",
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入启动原因'
                                                }
                                            ],
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                                rows: 3,
                                                placeholder: "请描述启动此剧本的原因和背景"
                                            }, void 0, false, {
                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                lineNumber: 255,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/components/PlaybookLauncher.tsx",
                                            lineNumber: 250,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                            name: "expectedEndDate",
                                            label: "预期完成时间",
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.DatePicker, {
                                                showTime: true,
                                                style: {
                                                    width: '100%'
                                                },
                                                placeholder: "选择预期完成时间",
                                                disabledDate: (current)=>current && current < (0, _dayjs.default)().startOf('day')
                                            }, void 0, false, {
                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                lineNumber: 265,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/components/PlaybookLauncher.tsx",
                                            lineNumber: 261,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/PlaybookLauncher.tsx",
                                    lineNumber: 237,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/PlaybookLauncher.tsx",
                            lineNumber: 215,
                            columnNumber: 13
                        }, this),
                        currentStep === 1 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Alert, {
                                    message: "任务分派",
                                    description: "请为每个任务指定负责人。系统已根据剧本配置预设了默认负责人，您可以根据实际情况进行调整。",
                                    type: "info",
                                    style: {
                                        marginBottom: 16
                                    }
                                }, void 0, false, {
                                    fileName: "src/components/PlaybookLauncher.tsx",
                                    lineNumber: 279,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Timeline, {
                                    children: playbook.tasks.map((task, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Timeline.Item, {
                                            dot: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {
                                                style: {
                                                    fontSize: '16px'
                                                }
                                            }, void 0, false, {
                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                lineNumber: 290,
                                                columnNumber: 26
                                            }, void 0),
                                            color: index === 0 ? 'blue' : 'gray',
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                size: "small",
                                                style: {
                                                    marginBottom: 16
                                                },
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'flex-start'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                flex: 1
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                                                                    level: 5,
                                                                    style: {
                                                                        margin: 0
                                                                    },
                                                                    children: task.title
                                                                }, void 0, false, {
                                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                                    lineNumber: 296,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                    type: "secondary",
                                                                    children: task.description
                                                                }, void 0, false, {
                                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                                    lineNumber: 297,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        marginTop: 8
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                            color: "blue",
                                                                            children: [
                                                                                "阶段: ",
                                                                                task.phase
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                                            lineNumber: 299,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                            color: "green",
                                                                            children: [
                                                                                "耗时: ",
                                                                                task.duration,
                                                                                "h"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                                            lineNumber: 300,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                            color: "orange",
                                                                            children: [
                                                                                "截止: ",
                                                                                task.dueOffset,
                                                                                "天"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                                            lineNumber: 301,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        task.isOptional && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                            color: "purple",
                                                                            children: "可选"
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                                            lineNumber: 302,
                                                                            columnNumber: 49
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                                    lineNumber: 298,
                                                                    columnNumber: 27
                                                                }, this),
                                                                task.checkpoints.length > 0 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        marginTop: 8
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                            strong: true,
                                                                            children: "检查点："
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                                            lineNumber: 306,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("ul", {
                                                                            style: {
                                                                                margin: '4px 0',
                                                                                paddingLeft: 20
                                                                            },
                                                                            children: task.checkpoints.map((checkpoint, idx)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("li", {
                                                                                    children: checkpoint
                                                                                }, idx, false, {
                                                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                                                    lineNumber: 309,
                                                                                    columnNumber: 35
                                                                                }, this))
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                                            lineNumber: 307,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                                    lineNumber: 305,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                            lineNumber: 295,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                width: 200,
                                                                marginLeft: 16
                                                            },
                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                                                name: [
                                                                    'taskAssignments',
                                                                    task.id
                                                                ],
                                                                label: "负责人",
                                                                rules: [
                                                                    {
                                                                        required: true,
                                                                        message: '请指定负责人'
                                                                    }
                                                                ],
                                                                style: {
                                                                    margin: 0
                                                                },
                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {
                                                                    placeholder: "输入负责人姓名"
                                                                }, void 0, false, {
                                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                                    lineNumber: 322,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                                lineNumber: 316,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                            lineNumber: 315,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                    lineNumber: 294,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                lineNumber: 293,
                                                columnNumber: 21
                                            }, this)
                                        }, task.id, false, {
                                            fileName: "src/components/PlaybookLauncher.tsx",
                                            lineNumber: 288,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "src/components/PlaybookLauncher.tsx",
                                    lineNumber: 286,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/PlaybookLauncher.tsx",
                            lineNumber: 278,
                            columnNumber: 13
                        }, this),
                        currentStep === 2 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Alert, {
                                    message: "确认启动",
                                    description: "请仔细检查以下信息，确认无误后点击启动剧本。",
                                    type: "warning",
                                    style: {
                                        marginBottom: 16
                                    }
                                }, void 0, false, {
                                    fileName: "src/components/PlaybookLauncher.tsx",
                                    lineNumber: 336,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                    title: "启动信息确认",
                                    style: {
                                        marginBottom: 16
                                    },
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                                        gutter: [
                                            16,
                                            8
                                        ],
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                span: 8,
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                    strong: true,
                                                    children: "剧本名称："
                                                }, void 0, false, {
                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                    lineNumber: 346,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                lineNumber: 345,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                span: 16,
                                                children: playbook.name
                                            }, void 0, false, {
                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                lineNumber: 348,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                span: 8,
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                    strong: true,
                                                    children: "目标客户："
                                                }, void 0, false, {
                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                    lineNumber: 352,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                lineNumber: 351,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                span: 16,
                                                children: (customer === null || customer === void 0 ? void 0 : customer.name) || form.getFieldValue('customerId')
                                            }, void 0, false, {
                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                lineNumber: 354,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                span: 8,
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                    strong: true,
                                                    children: "启动原因："
                                                }, void 0, false, {
                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                    lineNumber: 358,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                lineNumber: 357,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                span: 16,
                                                children: form.getFieldValue('launchReason')
                                            }, void 0, false, {
                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                lineNumber: 360,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                span: 8,
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                    strong: true,
                                                    children: "预期完成："
                                                }, void 0, false, {
                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                    lineNumber: 364,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                lineNumber: 363,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                span: 16,
                                                children: ((_form_getFieldValue = form.getFieldValue('expectedEndDate')) === null || _form_getFieldValue === void 0 ? void 0 : _form_getFieldValue.format('YYYY-MM-DD HH:mm')) || '系统自动计算'
                                            }, void 0, false, {
                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                lineNumber: 366,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/PlaybookLauncher.tsx",
                                        lineNumber: 344,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/PlaybookLauncher.tsx",
                                    lineNumber: 343,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                    title: "任务分派确认",
                                    children: playbook.tasks.map((task)=>{
                                        const assignee = form.getFieldValue([
                                            'taskAssignments',
                                            task.id
                                        ]);
                                        return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                padding: '8px 0',
                                                borderBottom: '1px solid #f0f0f0'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                            strong: true,
                                                            children: task.title
                                                        }, void 0, false, {
                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                            lineNumber: 378,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("br", {}, void 0, false, {
                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                            lineNumber: 379,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                            type: "secondary",
                                                            style: {
                                                                fontSize: '12px'
                                                            },
                                                            children: [
                                                                task.phase,
                                                                " • ",
                                                                task.duration,
                                                                "h • ",
                                                                task.dueOffset,
                                                                "天内完成"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                            lineNumber: 380,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                    lineNumber: 377,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        textAlign: 'right'
                                                    },
                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                        strong: true,
                                                        children: assignee
                                                    }, void 0, false, {
                                                        fileName: "src/components/PlaybookLauncher.tsx",
                                                        lineNumber: 385,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                    lineNumber: 384,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, task.id, true, {
                                            fileName: "src/components/PlaybookLauncher.tsx",
                                            lineNumber: 376,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "src/components/PlaybookLauncher.tsx",
                                    lineNumber: 372,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                    name: "notes",
                                    label: "备注",
                                    style: {
                                        marginTop: 16
                                    },
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                        rows: 3,
                                        placeholder: "可选：添加执行备注"
                                    }, void 0, false, {
                                        fileName: "src/components/PlaybookLauncher.tsx",
                                        lineNumber: 393,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/PlaybookLauncher.tsx",
                                    lineNumber: 392,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        marginTop: 16
                                    },
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                        checked: confirmed,
                                        onChange: (e)=>setConfirmed(e.target.checked),
                                        children: "我已确认以上信息无误，同意启动此剧本"
                                    }, void 0, false, {
                                        fileName: "src/components/PlaybookLauncher.tsx",
                                        lineNumber: 397,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/PlaybookLauncher.tsx",
                                    lineNumber: 396,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/PlaybookLauncher.tsx",
                            lineNumber: 335,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/PlaybookLauncher.tsx",
                    lineNumber: 202,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        marginTop: 24,
                        textAlign: 'right'
                    },
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                onClick: handleCancel,
                                children: "取消"
                            }, void 0, false, {
                                fileName: "src/components/PlaybookLauncher.tsx",
                                lineNumber: 411,
                                columnNumber: 13
                            }, this),
                            currentStep > 0 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                onClick: handlePrev,
                                children: "上一步"
                            }, void 0, false, {
                                fileName: "src/components/PlaybookLauncher.tsx",
                                lineNumber: 413,
                                columnNumber: 15
                            }, this),
                            currentStep < 2 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                type: "primary",
                                onClick: handleNext,
                                children: "下一步"
                            }, void 0, false, {
                                fileName: "src/components/PlaybookLauncher.tsx",
                                lineNumber: 416,
                                columnNumber: 15
                            }, this),
                            currentStep === 2 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                type: "primary",
                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PlayCircleOutlined, {}, void 0, false, {
                                    fileName: "src/components/PlaybookLauncher.tsx",
                                    lineNumber: 423,
                                    columnNumber: 23
                                }, void 0),
                                onClick: handleLaunch,
                                disabled: !confirmed,
                                loading: loading,
                                children: "启动剧本"
                            }, void 0, false, {
                                fileName: "src/components/PlaybookLauncher.tsx",
                                lineNumber: 421,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/PlaybookLauncher.tsx",
                        lineNumber: 410,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/components/PlaybookLauncher.tsx",
                    lineNumber: 409,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/components/PlaybookLauncher.tsx",
            lineNumber: 195,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/components/PlaybookLauncher.tsx",
        lineNumber: 182,
        columnNumber: 5
    }, this);
};
_s(PlaybookLauncher, "PJskqYzFBNXXIF6K44Z6oducDIk=", false, function() {
    return [
        _antd.Form.useForm
    ];
});
_c = PlaybookLauncher;
var _default = PlaybookLauncher;
var _c;
$RefreshReg$(_c, "PlaybookLauncher");
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
"src/components/common/CustomerInfoCell.tsx": function (module, exports, __mako_require__){
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
const PlatformTag = ({ customerId })=>{
    const platformType = (0, _continuousServiceData.getPlatformType)(customerId);
    // 获取平台配置
    const getPlatformConfig = (platform)=>{
        const configs = {
            'dingtalk': {
                text: '钉钉',
                color: '#1677ff'
            },
            'wechat_work': {
                text: '企微',
                color: '#07c160'
            },
            'feishu': {
                text: '飞书',
                color: '#00d4aa'
            },
            'lark': {
                text: 'Lark',
                color: '#00d4aa'
            },
            'dingtalk_global': {
                text: 'DingTalk',
                color: '#1677ff'
            },
            'standalone': {
                text: '独立部署',
                color: '#722ed1'
            }
        };
        return configs[platform] || {
            text: '未知平台',
            color: '#d9d9d9'
        };
    };
    const config = getPlatformConfig(platformType);
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
        style: {
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: '#f0f0f0',
            color: '#666',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: '500',
            marginRight: '8px'
        },
        children: config.text
    }, void 0, false, {
        fileName: "src/components/common/CustomerInfoCell.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
};
_c = PlatformTag;
const CustomerInfoCell = ({ customerId, customerName, contractNumber, showContract = true })=>{
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            position: 'relative'
        },
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center'
                },
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(PlatformTag, {
                        customerId: customerId
                    }, void 0, false, {
                        fileName: "src/components/common/CustomerInfoCell.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                        style: {
                            fontWeight: '500',
                            color: '#262626'
                        },
                        children: customerName
                    }, void 0, false, {
                        fileName: "src/components/common/CustomerInfoCell.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/common/CustomerInfoCell.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            showContract && contractNumber && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    position: 'absolute',
                    right: 24,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#8c8c8c',
                    fontSize: 12
                },
                children: [
                    "合同编号：",
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                        style: {
                            fontFamily: 'monospace'
                        },
                        children: contractNumber
                    }, void 0, false, {
                        fileName: "src/components/common/CustomerInfoCell.tsx",
                        lineNumber: 71,
                        columnNumber: 16
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/common/CustomerInfoCell.tsx",
                lineNumber: 63,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/components/common/CustomerInfoCell.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
};
_c1 = CustomerInfoCell;
var _default = CustomerInfoCell;
var _c;
var _c1;
$RefreshReg$(_c, "PlatformTag");
$RefreshReg$(_c1, "CustomerInfoCell");
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
"src/mock/continuousServiceData.ts": function (module, exports, __mako_require__){
"use strict";
__mako_require__.d(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
__mako_require__.e(exports, {
    getPlatformType: function() {
        return getPlatformType;
    },
    getPurchasedProducts: function() {
        return getPurchasedProducts;
    },
    healthColors: function() {
        return healthColors;
    },
    lifecycleColors: function() {
        return lifecycleColors;
    },
    mockContacts: function() {
        return mockContacts;
    },
    mockContracts: function() {
        return mockContracts;
    },
    mockCustomerHistory: function() {
        return mockCustomerHistory;
    },
    mockCustomers: function() {
        return mockCustomers;
    },
    mockHandoverRecords: function() {
        return mockHandoverRecords;
    },
    mockKeyActions: function() {
        return mockKeyActions;
    },
    mockQBRMeetings: function() {
        return mockQBRMeetings;
    },
    mockRiskEvents: function() {
        return mockRiskEvents;
    },
    mockServiceOverview: function() {
        return mockServiceOverview;
    },
    mockServicePlaybooks: function() {
        return mockServicePlaybooks;
    },
    mockTodoTasks: function() {
        return mockTodoTasks;
    },
    mockValueBoards: function() {
        return mockValueBoards;
    }
});
var _interop_require_wildcard = __mako_require__("@swc/helpers/_/_interop_require_wildcard");
var _reactrefresh = /*#__PURE__*/ _interop_require_wildcard._(__mako_require__("node_modules/react-refresh/runtime.js"));
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
const mockContracts = [
    // 北京科技有限公司的合同历史
    {
        id: 'contract_001',
        contractNumber: 'CONT-2023-001',
        customerId: 'CUST-0001',
        contractType: 'new',
        amount: 500000,
        startDate: '2023-06-01',
        endDate: '2024-05-31',
        status: 'active',
        servicePeriod: '2023-06-01 至 2024-05-31',
        purchasedProducts: [
            '直营-极简版'
        ],
        accountCount: 50,
        salesSource: 'direct',
        salesPerson: '王销售',
        userVersion: '50人版',
        ticketVersion: 'V2.1',
        ticketTime: '2023-06-15',
        tianyuanOrderStatus: 'active',
        tianyuanOrderId: 'TY-2023-001',
        serviceCost: 15000,
        serviceCostDetails: [
            '客户拜访差旅费: 3000元',
            '节日礼品: 8000元',
            '培训资料: 2000元',
            '技术支持: 2000元'
        ],
        attachments: [
            {
                id: 'att_001_001',
                name: '北京科技有限公司-服务合同.pdf',
                type: 'contract',
                url: '/attachments/contracts/CONT-2023-001.pdf',
                size: 2048576,
                uploadDate: '2023-05-15'
            },
            {
                id: 'att_001_002',
                name: '技术服务补充协议.pdf',
                type: 'supplement',
                url: '/attachments/supplements/CONT-2023-001-SUP.pdf',
                size: 1024768,
                uploadDate: '2023-05-20'
            }
        ],
        createdAt: '2023-05-15',
        updatedAt: '2023-06-01'
    },
    // 上海智能科技有限公司的合同历史
    {
        id: 'contract_002',
        contractNumber: 'CONT-2022-015',
        customerId: 'CUST-0002',
        contractType: 'new',
        amount: 600000,
        startDate: '2022-09-01',
        endDate: '2023-08-31',
        status: 'expired',
        servicePeriod: '2022-09-01 至 2023-08-31',
        purchasedProducts: [
            '企微版'
        ],
        accountCount: 30,
        salesSource: 'channel',
        channelPartner: '上海渠道合作伙伴有限公司',
        userVersion: '30人版',
        ticketVersion: 'V1.8',
        ticketTime: '2022-09-10',
        tianyuanOrderStatus: 'inactive',
        tianyuanOrderId: 'TY-2022-015',
        serviceCost: 12000,
        serviceCostDetails: [
            '渠道返点: 8000元',
            '客户答谢: 4000元'
        ],
        attachments: [
            {
                id: 'att_002_001',
                name: '上海智能科技-服务合同.pdf',
                type: 'contract',
                url: '/attachments/contracts/CONT-2022-015.pdf',
                size: 1856432,
                uploadDate: '2022-08-15'
            }
        ],
        createdAt: '2022-08-15',
        updatedAt: '2023-08-31'
    },
    {
        id: 'contract_003',
        contractNumber: 'CONT-2023-045',
        customerId: 'CUST-0002',
        contractType: 'renewal',
        amount: 800000,
        startDate: '2023-09-01',
        endDate: '2024-08-31',
        status: 'active',
        servicePeriod: '2023-09-01 至 2024-08-31',
        purchasedProducts: [
            '企微版'
        ],
        accountCount: 40,
        salesSource: 'direct',
        salesPerson: '李销售',
        userVersion: '40人版',
        ticketVersion: 'V2.0',
        ticketTime: '2023-09-08',
        tianyuanOrderStatus: 'active',
        tianyuanOrderId: 'TY-2023-045',
        serviceCost: 18000,
        serviceCostDetails: [
            '续约庆祝晚宴: 10000元',
            '定制培训: 5000元',
            '技术升级支持: 3000元'
        ],
        attachments: [
            {
                id: 'att_003_001',
                name: '上海智能科技-续约合同.pdf',
                type: 'contract',
                url: '/attachments/contracts/CONT-2023-045.pdf',
                size: 2234567,
                uploadDate: '2023-08-10'
            },
            {
                id: 'att_003_002',
                name: '发票-CONT-2023-045.pdf',
                type: 'invoice',
                url: '/attachments/invoices/INV-2023-045.pdf',
                size: 512345,
                uploadDate: '2023-09-01'
            }
        ],
        createdAt: '2023-08-10',
        updatedAt: '2023-09-01'
    },
    // 深圳创新科技有限公司的合同历史
    {
        id: 'contract_004',
        contractNumber: 'CONT-2022-008',
        customerId: 'CUST-0003',
        contractType: 'new',
        amount: 400000,
        startDate: '2022-07-01',
        endDate: '2023-06-30',
        status: 'expired',
        servicePeriod: '2022-07-01 至 2023-06-30',
        purchasedProducts: [
            '飞书版'
        ],
        accountCount: 20,
        salesSource: 'direct',
        salesPerson: '张销售',
        createdAt: '2022-06-15',
        updatedAt: '2023-06-30'
    },
    {
        id: 'contract_005',
        contractNumber: 'CONT-2023-078',
        customerId: 'CUST-0003',
        contractType: 'renewal',
        amount: 300000,
        startDate: '2023-07-01',
        endDate: '2024-06-30',
        status: 'active',
        servicePeriod: '2023-07-01 至 2024-06-30',
        purchasedProducts: [
            '飞书版'
        ],
        accountCount: 15,
        salesSource: 'direct',
        salesPerson: '张销售',
        createdAt: '2023-06-10',
        updatedAt: '2023-07-01'
    },
    // 广州数字化企业的合同历史
    {
        id: 'contract_006',
        contractNumber: 'CONT-2023-120',
        customerId: 'CUST-0004',
        contractType: 'new',
        amount: 1200000,
        startDate: '2023-10-01',
        endDate: '2025-09-30',
        status: 'active',
        servicePeriod: '2023-10-01 至 2025-09-30',
        purchasedProducts: [
            'D-learning'
        ],
        accountCount: 100,
        salesSource: 'direct',
        salesPerson: '陈销售',
        createdAt: '2023-09-15',
        updatedAt: '2023-10-01'
    },
    // 杭州互联网公司的合同历史
    {
        id: 'contract_007',
        contractNumber: 'CONT-2023-089',
        customerId: 'CUST-0005',
        contractType: 'new',
        amount: 450000,
        startDate: '2023-06-01',
        endDate: '2024-05-31',
        status: 'active',
        servicePeriod: '2023-06-01 至 2024-05-31',
        purchasedProducts: [
            'D-learning'
        ],
        accountCount: 35,
        salesSource: 'direct',
        salesPerson: '刘销售',
        createdAt: '2023-05-20',
        updatedAt: '2023-06-01'
    },
    // 成都软件开发公司的合同历史（断约后重签的例子）
    {
        id: 'contract_008',
        contractNumber: 'CONT-2021-045',
        customerId: 'CUST-0006',
        contractType: 'new',
        amount: 350000,
        startDate: '2021-09-01',
        endDate: '2022-08-31',
        status: 'terminated',
        servicePeriod: '2021-09-01 至 2022-08-31',
        purchasedProducts: [
            '独立版'
        ],
        accountCount: 25,
        salesSource: 'channel',
        channelPartner: '成都渠道合作伙伴有限公司',
        createdAt: '2021-08-15',
        updatedAt: '2022-06-15'
    },
    {
        id: 'contract_009',
        contractNumber: 'CONT-2024-010',
        customerId: 'CUST-0006',
        contractType: 'new',
        amount: 200000,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        status: 'active',
        servicePeriod: '2024-01-01 至 2024-12-31',
        purchasedProducts: [
            '独立版'
        ],
        accountCount: 20,
        salesSource: 'direct',
        salesPerson: '赵销售',
        createdAt: '2023-12-15',
        updatedAt: '2024-01-01'
    }
];
const mockHandoverRecords = [
    {
        id: 'handover_001',
        handoverNumber: 'HAND-2023-001',
        customerId: 'CUST-0001',
        contractId: 'contract_001',
        status: 'completed',
        createdAt: '2023-05-20',
        completedAt: '2023-06-15',
        archivedAt: '2023-06-20'
    },
    {
        id: 'handover_002',
        handoverNumber: 'HAND-2022-015',
        customerId: 'CUST-0002',
        contractId: 'contract_002',
        status: 'archived',
        createdAt: '2022-08-20',
        completedAt: '2022-09-15',
        archivedAt: '2022-09-20'
    },
    {
        id: 'handover_003',
        handoverNumber: 'HAND-2023-045',
        customerId: 'CUST-0002',
        contractId: 'contract_003',
        status: 'completed',
        createdAt: '2023-08-15',
        completedAt: '2023-09-10',
        archivedAt: '2023-09-15'
    },
    {
        id: 'handover_004',
        handoverNumber: 'HAND-2022-008',
        customerId: 'CUST-0003',
        contractId: 'contract_004',
        status: 'archived',
        createdAt: '2022-06-20',
        completedAt: '2022-07-15',
        archivedAt: '2022-07-20'
    },
    {
        id: 'handover_005',
        handoverNumber: 'HAND-2023-078',
        customerId: 'CUST-0003',
        contractId: 'contract_005',
        status: 'completed',
        createdAt: '2023-06-15',
        completedAt: '2023-07-10',
        archivedAt: '2023-07-15'
    },
    {
        id: 'handover_006',
        handoverNumber: 'HAND-2023-120',
        customerId: 'CUST-0004',
        contractId: 'contract_006',
        status: 'completed',
        createdAt: '2023-09-20',
        completedAt: '2023-10-15',
        archivedAt: '2023-10-20'
    },
    {
        id: 'handover_007',
        handoverNumber: 'HAND-2023-089',
        customerId: 'CUST-0005',
        contractId: 'contract_007',
        status: 'completed',
        createdAt: '2023-05-25',
        completedAt: '2023-06-10',
        archivedAt: '2023-06-15'
    },
    {
        id: 'handover_008',
        handoverNumber: 'HAND-2021-045',
        customerId: 'CUST-0006',
        contractId: 'contract_008',
        status: 'archived',
        createdAt: '2021-08-20',
        completedAt: '2021-09-15',
        archivedAt: '2021-09-20'
    },
    {
        id: 'handover_009',
        handoverNumber: 'HAND-2024-010',
        customerId: 'CUST-0006',
        contractId: 'contract_009',
        status: 'completed',
        createdAt: '2023-12-20',
        completedAt: '2024-01-15',
        archivedAt: '2024-01-20'
    }
];
const mockTodoTasks = [
    {
        id: 'todo_001',
        title: '客户回访 - 北京科技有限公司',
        description: '定期回访，了解系统使用情况和满意度',
        type: 'business-review',
        status: 'pending',
        priority: 'high',
        dueDate: '2024-01-20',
        assignedTo: '张伟',
        customerId: 'CUST-0001',
        customerName: '北京科技有限公司',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-15'
    },
    {
        id: 'todo_002',
        title: '续约谈判准备 - 上海智能科技',
        description: '准备续约材料，安排续约谈判会议',
        type: 'renewal',
        status: 'in_progress',
        priority: 'high',
        dueDate: '2024-01-25',
        assignedTo: '李明',
        customerId: 'CUST-0002',
        customerName: '上海智能科技有限公司',
        createdAt: '2024-01-10',
        updatedAt: '2024-01-18'
    },
    {
        id: 'todo_003',
        title: '风险处理 - 深圳创新科技',
        description: '处理客户满意度下降问题，制定改进方案',
        type: 'follow-up',
        status: 'pending',
        priority: 'high',
        dueDate: '2024-01-22',
        assignedTo: '王芳',
        customerId: 'CUST-0003',
        customerName: '深圳创新科技有限公司',
        createdAt: '2024-01-12',
        updatedAt: '2024-01-12'
    },
    {
        id: 'todo_004',
        title: 'QBR会议安排 - 广州数字化企业',
        description: '安排Q1季度业务回顾会议',
        type: 'meeting',
        status: 'pending',
        priority: 'medium',
        dueDate: '2024-01-30',
        assignedTo: '张伟',
        customerId: 'CUST-0004',
        customerName: '广州数字化企业',
        createdAt: '2024-01-16',
        updatedAt: '2024-01-16'
    },
    {
        id: 'todo_005',
        title: '培训安排 - 杭州互联网公司',
        description: '安排新功能培训，提升用户使用率',
        type: 'training',
        status: 'completed',
        priority: 'medium',
        dueDate: '2024-01-15',
        assignedTo: '李明',
        customerId: 'CUST-0005',
        customerName: '杭州互联网公司',
        createdAt: '2024-01-08',
        updatedAt: '2024-01-15',
        completedAt: '2024-01-15'
    },
    {
        id: 'todo_006',
        title: '系统优化跟进 - 成都软件开发',
        description: '跟进系统使用率提升方案的执行情况',
        type: 'follow-up',
        status: 'overdue',
        priority: 'high',
        dueDate: '2024-01-10',
        assignedTo: '王芳',
        customerId: 'CUST-0006',
        customerName: '成都软件开发公司',
        createdAt: '2024-01-05',
        updatedAt: '2024-01-05'
    }
];
const mockCustomerHistory = {
    'CUST-0001': [
        {
            date: '2024-01-28',
            type: '客户拜访',
            description: '进行季度回访，了解系统使用情况',
            icon: 'UserOutlined',
            color: '#1890ff'
        },
        {
            date: '2024-01-20',
            type: '健康分提升',
            description: '客户健康分从80提升到85',
            icon: 'RiseOutlined',
            color: '#52c41a'
        },
        {
            date: '2024-01-15',
            type: '技术支持',
            description: '协助客户完成系统升级',
            icon: 'SettingOutlined',
            color: '#52c41a'
        }
    ],
    'CUST-0002': [
        {
            date: '2024-01-25',
            type: '续约谈判',
            description: '进行续约谈判，讨论新年度合作',
            icon: 'FileTextOutlined',
            color: '#1890ff'
        },
        {
            date: '2024-01-18',
            type: '技术问题解决',
            description: '解决API集成兼容性问题',
            icon: 'SettingOutlined',
            color: '#52c41a'
        }
    ],
    'CUST-0003': [
        {
            date: '2024-02-28',
            type: '续约状态更新',
            description: '续约状态更新为"流失风险"',
            icon: 'ExclamationCircleOutlined',
            color: '#fa541c'
        },
        {
            date: '2024-02-25',
            type: '客户拜访',
            description: '进行客户拜访，了解续约意向',
            icon: 'UserOutlined',
            color: '#1890ff'
        },
        {
            date: '2024-02-20',
            type: '健康分下降',
            description: '客户健康分从75下降到45',
            icon: 'RiseOutlined',
            color: '#fa541c'
        }
    ],
    'CUST-0004': [
        {
            date: '2024-01-30',
            type: 'QBR会议',
            description: '完成Q4季度业务回顾会议',
            icon: 'TeamOutlined',
            color: '#52c41a'
        }
    ],
    'CUST-0005': [
        {
            date: '2024-01-15',
            type: '培训完成',
            description: '完成新功能培训，用户反馈良好',
            icon: 'CheckCircleOutlined',
            color: '#52c41a'
        }
    ],
    'CUST-0006': [
        {
            date: '2024-01-20',
            type: '系统优化',
            description: '完成系统性能优化',
            icon: 'SettingOutlined',
            color: '#52c41a'
        }
    ]
};
const mockContacts = {
    'CUST-0001': [
        {
            id: 'contact_001_001',
            name: '张总',
            title: 'CEO',
            phone: '138****1001',
            email: 'zhang@bjtech.com',
            isPrimary: true,
            stakeholderType: 'decision_maker',
            influence: 'high',
            attitude: 'positive',
            department: '管理层',
            notes: '公司最终决策者，对数字化转型非常支持'
        },
        {
            id: 'contact_001_002',
            name: '李经理',
            title: '技术总监',
            phone: '139****1002',
            email: 'li@bjtech.com',
            isPrimary: false,
            stakeholderType: 'influencer',
            influence: 'high',
            attitude: 'positive',
            department: '技术部',
            notes: '技术实施的关键推动者，具有很强的技术背景'
        }
    ],
    'CUST-0002': [
        {
            id: 'contact_002_001',
            name: '王总',
            title: 'CTO',
            phone: '138****2001',
            email: 'wang@shtech.com',
            isPrimary: true,
            stakeholderType: 'decision_maker',
            influence: 'high',
            attitude: 'neutral',
            department: '技术部',
            notes: '技术决策者，对新技术持谨慎态度，需要充分的技术论证'
        },
        {
            id: 'contact_002_002',
            name: '赵经理',
            title: '产品总监',
            phone: '139****2002',
            email: 'zhao@shtech.com',
            isPrimary: false,
            stakeholderType: 'user',
            influence: 'medium',
            attitude: 'positive',
            department: '产品部',
            notes: '产品线负责人，是系统的主要使用者，对功能需求很了解'
        }
    ],
    'CUST-0003': [
        {
            id: 'contact_003_001',
            name: '刘总',
            title: 'CEO',
            phone: '138****3001',
            email: 'liu@sztech.com',
            isPrimary: true,
            stakeholderType: 'decision_maker',
            influence: 'high',
            attitude: 'negative',
            department: '管理层',
            notes: '对当前系统效果不满意，存在流失风险，需要重点关注'
        },
        {
            id: 'contact_003_002',
            name: '陈经理',
            title: '运营总监',
            phone: '139****3002',
            email: 'chen@sztech.com',
            isPrimary: false,
            stakeholderType: 'influencer',
            influence: 'medium',
            attitude: 'neutral',
            department: '运营部',
            notes: '运营负责人，关注系统对业务效率的提升效果'
        }
    ],
    'CUST-0004': [
        {
            id: 'contact_004_001',
            name: '钱总',
            title: 'CEO',
            phone: '138****4001',
            email: 'qian@gztech.com',
            isPrimary: true,
            stakeholderType: 'decision_maker',
            influence: 'high',
            attitude: 'positive',
            department: '管理层',
            notes: '战略客户决策者，对长期合作很有兴趣，是重要的合作伙伴'
        },
        {
            id: 'contact_004_002',
            name: '孙经理',
            title: '技术总监',
            phone: '139****4002',
            email: 'sun@gztech.com',
            isPrimary: false,
            stakeholderType: 'user',
            influence: 'high',
            attitude: 'positive',
            department: '技术部',
            notes: '技术实施负责人，对系统集成和定制化需求很专业'
        }
    ],
    'CUST-0005': [
        {
            id: 'contact_005_001',
            name: '周总',
            title: 'CTO',
            phone: '138****5001',
            email: 'zhou@hztech.com',
            isPrimary: true,
            stakeholderType: 'decision_maker',
            influence: 'high',
            attitude: 'positive',
            department: '技术部',
            notes: '技术背景深厚的CTO，对产品技术架构很认可'
        },
        {
            id: 'contact_005_002',
            name: '吴经理',
            title: '产品经理',
            phone: '139****5002',
            email: 'wu@hztech.com',
            isPrimary: false,
            stakeholderType: 'user',
            influence: 'medium',
            attitude: 'neutral',
            department: '产品部',
            notes: '产品经理，关注用户体验和功能完善度'
        }
    ],
    'CUST-0006': [
        {
            id: 'contact_006_001',
            name: '郑总',
            title: 'CEO',
            phone: '138****6001',
            email: 'zheng@cdtech.com',
            isPrimary: true,
            stakeholderType: 'decision_maker',
            influence: 'high',
            attitude: 'positive',
            department: '管理层',
            notes: '重新合作的客户，对我们的服务重新建立了信心'
        },
        {
            id: 'contact_006_002',
            name: '王经理',
            title: '技术经理',
            phone: '139****6002',
            email: 'wang@cdtech.com',
            isPrimary: false,
            stakeholderType: 'user',
            influence: 'medium',
            attitude: 'positive',
            department: '技术部',
            notes: '技术实施负责人，对系统稳定性要求很高'
        }
    ]
};
const getPlatformType = (customerId)=>{
    // 固定映射关系，确保每个平台类型都有对应的公司
    const platformMapping = {
        'CUST-0001': 'dingtalk',
        'CUST-0002': 'wechat_work',
        'CUST-0003': 'feishu',
        'CUST-0004': 'lark',
        'CUST-0005': 'dingtalk_global',
        'CUST-0006': 'standalone'
    };
    // 如果有固定映射则使用，否则使用默认逻辑
    if (platformMapping[customerId]) return platformMapping[customerId];
    // 对于其他客户ID，使用原有的随机分配逻辑
    const platformTypes = [
        'dingtalk',
        'wechat_work',
        'feishu',
        'lark',
        'dingtalk_global',
        'standalone'
    ];
    const index = customerId.length % platformTypes.length;
    return platformTypes[index];
};
const getPurchasedProducts = (customerId)=>{
    const platformType = getPlatformType(customerId);
    const productMap = {
        'dingtalk': {
            products: [
                '直营-极简版',
                '直营-网校版',
                '直营-畅学版',
                '直营-标准版',
                '直营-专业版',
                '直营-智学版'
            ],
            services: [
                '智能人事-标准',
                '智能人事-专业版'
            ]
        },
        'wechat_work': {
            products: [
                '企微版'
            ],
            services: [
                '企微增值服务包',
                '企微定制开发'
            ]
        },
        'feishu': {
            products: [
                '飞书版'
            ],
            services: [
                '飞书集成服务',
                '飞书培训服务'
            ]
        },
        'lark': {
            products: [
                'D-learning'
            ],
            services: [
                'Lark技术支持',
                'Lark定制化服务'
            ]
        },
        'dingtalk_global': {
            products: [
                'D-learning'
            ],
            services: [
                'DingTalk集成服务',
                'DingTalk培训包'
            ]
        },
        'standalone': {
            products: [
                '独立版'
            ],
            services: [
                '独立部署实施',
                '独立部署运维'
            ]
        }
    };
    const config = productMap[platformType] || productMap['dingtalk'];
    // 根据客户ID生成固定的随机选择，确保数据一致性
    const seed = customerId.charCodeAt(customerId.length - 1);
    const productCount = seed % 2 + 1; // 1-2个产品
    const serviceCount = seed % 2 + 1; // 1-2个服务
    return {
        products: config.products.slice(0, productCount),
        services: config.services.slice(0, serviceCount)
    };
};
const mockCustomers = [
    {
        id: 'CUST-0001',
        name: '北京科技有限公司',
        industry: '信息技术',
        scale: '中型企业',
        csm: '张伟',
        arr: 500000,
        healthScore: 85,
        healthLevel: '健康',
        lifecycleStage: '成长期',
        customerTier: 'strategic',
        salesPerson: '王销售',
        purchasedProducts: [
            '直营-极简版'
        ],
        connectionLevel: 4,
        keyContacts: mockContacts['CUST-0001'],
        currentContract: mockContracts.find((c)=>c.id === 'contract_001'),
        contracts: mockContracts.filter((c)=>c.customerId === 'CUST-0001'),
        handoverRecords: mockHandoverRecords.filter((h)=>h.customerId === 'CUST-0001'),
        nextRenewalDate: '2024-05-31',
        serviceExpiryDate: '2024-05-31',
        isRenewalRisk: false,
        lastContactDate: '2024-01-15',
        // 新增字段
        ticketExpiryDate: '2024-04-30',
        contractStartDate: '2023-06-01',
        contractEndDate: '2024-05-31',
        customerSegment: 'strategic',
        serviceRecords: [
            {
                id: 'sr001',
                type: 'QBR',
                title: 'Q4季度业务回顾会议',
                content: '回顾了Q4业务指标，客户对系统使用效果满意，计划扩大使用范围',
                operator: '张伟',
                timestamp: '2024-01-10 14:00:00',
                tags: [
                    '季度回顾',
                    '业务增长'
                ],
                createdAt: '2024-01-10 14:30:00',
                updatedAt: '2024-01-10 14:30:00'
            },
            {
                id: 'sr002',
                type: '培训',
                title: '新功能培训会',
                content: '为客户团队进行了新版本功能培训，参与人员20人，反馈良好',
                operator: '张伟',
                timestamp: '2024-01-05 10:00:00',
                tags: [
                    '功能培训',
                    '用户教育'
                ],
                createdAt: '2024-01-05 11:00:00',
                updatedAt: '2024-01-05 11:00:00'
            }
        ],
        todoTasks: mockTodoTasks.filter((t)=>t.customerId === 'CUST-0001'),
        isFavorite: true,
        createdAt: '2023-06-20',
        updatedAt: '2024-01-15'
    },
    {
        id: 'CUST-0002',
        name: '上海智能科技有限公司',
        industry: '人工智能',
        scale: '大型企业',
        csm: '李明',
        arr: 800000,
        healthScore: 65,
        healthLevel: '一般',
        lifecycleStage: '成熟期',
        customerTier: 'large',
        salesPerson: '李销售',
        purchasedProducts: [
            '企微版'
        ],
        connectionLevel: 3,
        keyContacts: mockContacts['CUST-0002'],
        currentContract: mockContracts.find((c)=>c.id === 'contract_003'),
        contracts: mockContracts.filter((c)=>c.customerId === 'CUST-0002'),
        handoverRecords: mockHandoverRecords.filter((h)=>h.customerId === 'CUST-0002'),
        nextRenewalDate: '2024-08-31',
        serviceExpiryDate: '2024-08-31',
        isRenewalRisk: false,
        lastContactDate: '2024-01-12',
        // 新增字段
        ticketExpiryDate: '2024-07-31',
        contractStartDate: '2023-09-01',
        contractEndDate: '2024-08-31',
        customerSegment: 'key',
        serviceRecords: [
            {
                id: 'sr003',
                type: '电话回访',
                title: '续约意向沟通',
                content: '与客户CTO沟通续约事宜，客户表示满意当前服务，有续约意向',
                operator: '李明',
                timestamp: '2024-01-12 15:30:00',
                tags: [
                    '续约沟通',
                    '客户满意'
                ],
                createdAt: '2024-01-12 16:00:00',
                updatedAt: '2024-01-12 16:00:00'
            },
            {
                id: 'sr004',
                type: '技术支持',
                title: 'API集成问题解决',
                content: '协助客户解决企微集成中的API调用问题，已成功解决',
                operator: '李明',
                timestamp: '2024-01-08 09:00:00',
                tags: [
                    '技术支持',
                    '问题解决'
                ],
                createdAt: '2024-01-08 10:30:00',
                updatedAt: '2024-01-08 10:30:00'
            }
        ],
        todoTasks: mockTodoTasks.filter((t)=>t.customerId === 'CUST-0002'),
        isFavorite: false,
        createdAt: '2022-09-20',
        updatedAt: '2024-01-12'
    },
    {
        id: 'CUST-0003',
        name: '深圳创新科技有限公司',
        industry: '软件开发',
        scale: '小型企业',
        csm: '王芳',
        arr: 300000,
        healthScore: 45,
        healthLevel: '风险',
        customerTier: 'medium',
        salesPerson: '张销售',
        lifecycleStage: '衰退期',
        connectionLevel: 2,
        purchasedProducts: [
            '飞书版'
        ],
        keyContacts: mockContacts['CUST-0003'],
        currentContract: mockContracts.find((c)=>c.id === 'contract_005'),
        contracts: mockContracts.filter((c)=>c.customerId === 'CUST-0003'),
        handoverRecords: mockHandoverRecords.filter((h)=>h.customerId === 'CUST-0003'),
        nextRenewalDate: '2024-06-30',
        serviceExpiryDate: '2024-06-30',
        isRenewalRisk: true,
        lastContactDate: '2024-01-08',
        // 新增字段
        ticketExpiryDate: '2024-05-30',
        contractStartDate: '2023-07-01',
        contractEndDate: '2024-06-30',
        customerSegment: 'general',
        serviceRecords: [
            {
                id: 'sr005',
                type: '风险处理',
                title: '客户满意度下降处理',
                content: '客户反馈系统使用体验不佳，已安排产品团队跟进优化',
                operator: '王芳',
                timestamp: '2024-01-08 11:00:00',
                tags: [
                    '风险处理',
                    '满意度'
                ],
                createdAt: '2024-01-08 11:30:00',
                updatedAt: '2024-01-08 11:30:00'
            },
            {
                id: 'sr006',
                type: '商务沟通',
                title: '预算削减风险沟通',
                content: '与客户财务部门沟通，了解预算情况，制定应对方案',
                operator: '王芳',
                timestamp: '2024-01-05 14:00:00',
                tags: [
                    '预算风险',
                    '商务沟通'
                ],
                createdAt: '2024-01-05 14:30:00',
                updatedAt: '2024-01-05 14:30:00'
            }
        ],
        todoTasks: mockTodoTasks.filter((t)=>t.customerId === 'CUST-0003'),
        isFavorite: true,
        createdAt: '2022-07-20',
        updatedAt: '2024-01-08'
    },
    {
        id: 'CUST-0004',
        name: '广州数字化企业',
        industry: '数字化服务',
        scale: '大型企业',
        csm: '张伟',
        arr: 1200000,
        healthScore: 92,
        healthLevel: '健康',
        lifecycleStage: '成长期',
        customerTier: 'strategic',
        salesPerson: '陈销售',
        purchasedProducts: [
            'D-learning'
        ],
        connectionLevel: 5,
        keyContacts: mockContacts['CUST-0004'],
        currentContract: mockContracts.find((c)=>c.id === 'contract_006'),
        contracts: mockContracts.filter((c)=>c.customerId === 'CUST-0004'),
        handoverRecords: mockHandoverRecords.filter((h)=>h.customerId === 'CUST-0004'),
        nextRenewalDate: '2025-09-30',
        serviceExpiryDate: '2025-09-30',
        isRenewalRisk: false,
        lastContactDate: '2024-01-20',
        // 新增字段
        ticketExpiryDate: '2025-08-30',
        contractStartDate: '2023-10-01',
        contractEndDate: '2025-09-30',
        customerSegment: 'strategic',
        serviceRecords: [
            {
                id: 'sr007',
                type: '产品演示',
                title: '新版本功能演示',
                content: '为客户演示最新版本的学习分析功能，客户对数据可视化很感兴趣',
                operator: '陈强',
                timestamp: '2024-01-20 10:00:00',
                tags: [
                    '产品演示',
                    '功能升级'
                ],
                createdAt: '2024-01-20 11:00:00',
                updatedAt: '2024-01-20 11:00:00'
            },
            {
                id: 'sr008',
                type: '培训',
                title: '管理员权限培训',
                content: '为客户IT团队进行系统管理员权限和配置培训',
                operator: '陈强',
                timestamp: '2024-01-18 14:00:00',
                tags: [
                    '用户培训',
                    '权限管理'
                ],
                createdAt: '2024-01-18 15:00:00',
                updatedAt: '2024-01-18 15:00:00'
            }
        ],
        todoTasks: mockTodoTasks.filter((t)=>t.customerId === 'CUST-0004'),
        isFavorite: false,
        createdAt: '2023-10-20',
        updatedAt: '2024-01-14'
    },
    {
        id: 'CUST-0005',
        name: '杭州互联网公司',
        industry: '互联网',
        scale: '中型企业',
        csm: '李明',
        arr: 450000,
        healthScore: 58,
        healthLevel: '一般',
        lifecycleStage: '成熟期',
        customerTier: 'medium',
        salesPerson: '刘销售',
        purchasedProducts: [
            'D-learning'
        ],
        connectionLevel: 3,
        keyContacts: mockContacts['CUST-0005'],
        currentContract: mockContracts.find((c)=>c.id === 'contract_007'),
        contracts: mockContracts.filter((c)=>c.customerId === 'CUST-0005'),
        handoverRecords: mockHandoverRecords.filter((h)=>h.customerId === 'CUST-0005'),
        nextRenewalDate: '2024-05-31',
        serviceExpiryDate: '2024-05-31',
        isRenewalRisk: false,
        lastContactDate: '2024-01-18',
        // 新增字段
        ticketExpiryDate: '2024-04-30',
        contractStartDate: '2023-06-01',
        contractEndDate: '2024-05-31',
        customerSegment: 'key',
        serviceRecords: [
            {
                id: 'sr009',
                type: '其他',
                title: '系统使用情况检查',
                content: '定期检查客户系统使用情况，发现活跃度较高，建议增加高级功能',
                operator: '刘洋',
                timestamp: '2024-01-18 16:00:00',
                tags: [
                    '健康检查',
                    '使用分析'
                ],
                createdAt: '2024-01-18 16:30:00',
                updatedAt: '2024-01-18 16:30:00'
            },
            {
                id: 'sr010',
                type: '商务沟通',
                title: '扩容需求跟进',
                content: '客户提出扩容需求，已转交销售团队跟进',
                operator: '刘洋',
                timestamp: '2024-01-15 13:00:00',
                tags: [
                    '商机跟进',
                    '扩容需求'
                ],
                createdAt: '2024-01-15 13:30:00',
                updatedAt: '2024-01-15 13:30:00'
            }
        ],
        todoTasks: mockTodoTasks.filter((t)=>t.customerId === 'CUST-0005'),
        isFavorite: true,
        createdAt: '2023-06-15',
        updatedAt: '2024-01-10'
    },
    {
        id: 'CUST-0006',
        name: '成都软件开发公司',
        industry: '软件开发',
        scale: '小型企业',
        csm: '王芳',
        arr: 200000,
        healthScore: 38,
        healthLevel: '风险',
        lifecycleStage: '衰退期',
        customerTier: 'small',
        salesPerson: '赵销售',
        purchasedProducts: [
            '独立版'
        ],
        connectionLevel: 1,
        keyContacts: mockContacts['CUST-0006'],
        currentContract: mockContracts.find((c)=>c.id === 'contract_009'),
        contracts: mockContracts.filter((c)=>c.customerId === 'CUST-0006'),
        handoverRecords: mockHandoverRecords.filter((h)=>h.customerId === 'CUST-0006'),
        nextRenewalDate: '2024-12-31',
        serviceExpiryDate: '2024-12-31',
        isRenewalRisk: true,
        lastContactDate: '2024-01-22',
        // 新增字段
        ticketExpiryDate: '2024-11-30',
        contractStartDate: '2024-01-01',
        contractEndDate: '2024-12-31',
        customerSegment: 'general',
        serviceRecords: [
            {
                id: 'sr011',
                type: 'QBR',
                title: 'Q1季度业务回顾准备',
                content: '准备Q1季度业务回顾材料，整理客户使用数据和成果展示',
                operator: '赵敏',
                timestamp: '2024-01-22 09:00:00',
                tags: [
                    '季度回顾',
                    '数据分析'
                ],
                createdAt: '2024-01-22 09:30:00',
                updatedAt: '2024-01-22 09:30:00'
            },
            {
                id: 'sr012',
                type: '其他',
                title: '现场服务拜访',
                content: '现场拜访客户，了解使用情况和改进建议，客户反馈良好',
                operator: '赵敏',
                timestamp: '2024-01-20 14:00:00',
                tags: [
                    '客户拜访',
                    '现场服务'
                ],
                createdAt: '2024-01-20 17:00:00',
                updatedAt: '2024-01-20 17:00:00'
            }
        ],
        todoTasks: mockTodoTasks.filter((t)=>t.customerId === 'CUST-0006'),
        isFavorite: false,
        createdAt: '2021-09-20',
        updatedAt: '2024-01-05'
    }
];
const mockValueBoards = [
    {
        id: 'vb001',
        customerId: 'CUST-0001',
        customerName: '北京科技有限公司',
        title: 'Q4业务数字化转型价值报告',
        description: '展示客户在数字化转型过程中取得的关键业务成果',
        status: '进行中',
        kpis: [
            {
                id: 'kpi1',
                name: '业务效率提升',
                target: 30,
                current: 25,
                unit: '%',
                trend: 'up'
            },
            {
                id: 'kpi2',
                name: '成本节约',
                target: 500000,
                current: 420000,
                unit: '元',
                trend: 'up'
            },
            {
                id: 'kpi3',
                name: '用户满意度',
                target: 90,
                current: 88,
                unit: '%',
                trend: 'stable'
            }
        ],
        achievements: [
            {
                id: 'ach1',
                title: '完成核心系统部署',
                description: '成功部署客户关系管理系统，覆盖全部业务流程',
                impact: '提升客户响应速度50%',
                date: '2024-01-10'
            },
            {
                id: 'ach2',
                title: '员工培训完成',
                description: '完成200+员工的系统使用培训',
                impact: '用户采用率达到95%',
                date: '2024-01-05'
            }
        ],
        createdBy: '张伟',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-15'
    }
];
const mockQBRMeetings = [
    {
        id: 'qbr001',
        customerId: 'CUST-0001',
        customerName: '北京科技有限公司',
        title: '2024 Q1 业务回顾会议',
        scheduledDate: '2024-01-25 14:00',
        status: '待召开',
        agenda: [
            '业务成果回顾',
            '问题与挑战讨论',
            'Q2规划制定'
        ],
        attendees: [
            '张总 - CEO',
            '李经理 - CTO',
            '王主管 - 运营总监',
            '张伟 - CSM'
        ],
        createdBy: '张伟',
        createdAt: '2024-01-10',
        updatedAt: '2024-01-15'
    },
    {
        id: 'qbr002',
        customerId: 'CUST-0002',
        customerName: '上海智能科技有限公司',
        title: '2023 Q4 业务回顾会议',
        scheduledDate: '2023-12-28 10:00',
        status: '已完成',
        agenda: [
            'Q4业务成果总结',
            '系统优化建议',
            '2024年发展规划'
        ],
        attendees: [
            '赵总 - CEO',
            '钱经理 - 产品总监',
            '李明 - CSM'
        ],
        outcomes: [
            '确认Q4目标达成85%',
            '识别3个关键优化点',
            '制定2024年扩展计划'
        ],
        nextSteps: [
            '1月完成系统优化',
            '2月启动新功能开发',
            '3月进行用户培训'
        ],
        createdBy: '李明',
        createdAt: '2023-12-15',
        updatedAt: '2023-12-28'
    }
];
const mockRiskEvents = [
    {
        id: 're001',
        customerId: 'CUST-0003',
        customerName: '深圳创新科技有限公司',
        riskType: '续费风险',
        description: '客户对当前服务满意度下降，预算可能削减',
        severity: 'high',
        status: '处理中',
        assignedTo: '王芳',
        dueDate: '2024-01-30',
        createdAt: '2024-01-08',
        updatedAt: '2024-01-15'
    },
    {
        id: 're002',
        customerId: 'CUST-0006',
        customerName: '成都软件开发公司',
        riskType: '使用率低',
        description: '系统使用率持续下降，用户活跃度不足',
        severity: 'medium',
        status: '待处理',
        assignedTo: '王芳',
        dueDate: '2024-01-25',
        createdAt: '2024-01-12',
        updatedAt: '2024-01-12'
    },
    {
        id: 're003',
        customerId: 'CUST-0002',
        customerName: '上海智能科技有限公司',
        riskType: '技术问题',
        description: '系统集成出现兼容性问题，影响业务流程',
        severity: 'medium',
        status: '已解决',
        assignedTo: '李明',
        dueDate: '2024-01-20',
        resolution: '通过API升级解决兼容性问题，系统运行正常',
        createdAt: '2024-01-05',
        updatedAt: '2024-01-18'
    }
];
const mockServicePlaybooks = [
    {
        id: 'pb001',
        name: '成长期客户增购引导剧本',
        description: '针对成长期客户的增购机会识别与转化流程',
        applicableStage: [
            '成长期'
        ],
        category: '增购转化',
        status: '可用',
        goal: '通过系统化的分析和评估流程，识别并转化成长期客户的增购机会',
        scenarioTags: [
            '增购',
            '成长期',
            '系统使用率高'
        ],
        // 触发条件
        triggerConditions: [
            {
                id: 'tc1',
                type: 'custom',
                field: 'usage_rate',
                operator: 'gt',
                value: 80,
                description: '系统使用率超过80%'
            },
            {
                id: 'tc2',
                type: 'custom',
                field: 'lifecycle_stage',
                operator: 'eq',
                value: '成长期',
                description: '客户处于成长期'
            }
        ],
        autoTrigger: true,
        // 成功指标
        successMetrics: [
            {
                id: 'metric1',
                name: '增购转化率',
                description: '成功完成增购的客户比例',
                targetValue: 75,
                unit: '%',
                measurementMethod: '统计启动剧本后30天内完成增购的客户数量占总启动数量的比例'
            },
            {
                id: 'metric2',
                name: '平均增购金额',
                description: '单个客户平均增购金额',
                targetValue: 200000,
                unit: '元',
                measurementMethod: '计算所有成功增购客户的增购金额平均值'
            }
        ],
        // 资源配置
        resources: [
            {
                id: 'res1',
                type: 'document',
                name: '使用数据分析模板',
                description: '客户系统使用情况分析模板',
                tags: [
                    '分析',
                    '模板'
                ]
            },
            {
                id: 'res2',
                type: 'script',
                name: '增购沟通话术',
                description: '与客户沟通增购机会的标准话术',
                tags: [
                    '沟通',
                    '话术'
                ]
            }
        ],
        tasks: [
            {
                id: 'task1',
                title: '客户使用情况分析',
                description: '分析客户当前系统使用深度和广度',
                phase: '诊断分析',
                duration: 2,
                dueOffset: 3,
                defaultAssignee: 'csm',
                requiredResources: [
                    'res1'
                ],
                checkpoints: [
                    '完成使用率分析',
                    '识别扩展需求点'
                ],
                dependencies: [],
                isOptional: false,
                allowSkip: false
            },
            {
                id: 'task2',
                title: '增购机会评估',
                description: '评估客户的增购潜力和预算能力',
                phase: '价值评估',
                duration: 3,
                dueOffset: 7,
                defaultAssignee: 'sales',
                requiredResources: [
                    'res2'
                ],
                checkpoints: [
                    '完成ROI计算',
                    '确认预算范围'
                ],
                dependencies: [
                    'task1'
                ],
                isOptional: false,
                allowSkip: false
            },
            {
                id: 'task3',
                title: '方案设计与提案',
                description: '设计个性化增购方案并进行提案',
                phase: '方案制定',
                duration: 5,
                dueOffset: 14,
                defaultAssignee: 'custom',
                customAssignee: '产品专家',
                requiredResources: [
                    'res1',
                    'res2'
                ],
                checkpoints: [
                    '完成方案设计',
                    '获得初步认可'
                ],
                dependencies: [
                    'task2'
                ],
                isOptional: false,
                allowSkip: false
            }
        ],
        estimatedDuration: 10,
        successRate: 75,
        usage: 25,
        createdBy: '张伟',
        createdAt: '2023-08-15',
        updatedAt: '2024-01-10'
    },
    {
        id: 'pb002',
        name: '风险客户挽回剧本',
        description: '针对有流失风险客户的挽回策略和执行流程',
        applicableStage: [
            '衰退期'
        ],
        category: '风险管理',
        status: '可用',
        goal: '通过系统化的风险识别和挽回措施，降低客户流失率',
        scenarioTags: [
            '流失风险',
            '客户挽回',
            '满意度提升'
        ],
        // 触发条件
        triggerConditions: [
            {
                id: 'tc1',
                type: 'custom',
                field: 'health_score',
                operator: 'lt',
                value: 60,
                description: '客户健康分低于60分'
            },
            {
                id: 'tc2',
                type: 'custom',
                field: 'lifecycle_stage',
                operator: 'eq',
                value: '衰退期',
                description: '客户处于衰退期'
            }
        ],
        autoTrigger: true,
        // 成功指标
        successMetrics: [
            {
                id: 'metric1',
                name: '客户挽回率',
                description: '成功挽回的风险客户比例',
                targetValue: 60,
                unit: '%',
                measurementMethod: '统计启动剧本后60天内成功续约或健康分回升的客户比例'
            },
            {
                id: 'metric2',
                name: '满意度提升',
                description: '客户满意度改善程度',
                targetValue: 20,
                unit: '分',
                measurementMethod: '对比剧本执行前后的客户满意度评分差值'
            }
        ],
        // 资源配置
        resources: [
            {
                id: 'res1',
                type: 'document',
                name: '风险分析模板',
                description: '客户流失风险分析和评估模板',
                tags: [
                    '分析',
                    '风险评估'
                ]
            },
            {
                id: 'res2',
                type: 'script',
                name: '客户挽回沟通指南',
                description: '与风险客户沟通的标准流程和话术',
                tags: [
                    '沟通',
                    '挽回'
                ]
            }
        ],
        tasks: [
            {
                id: 'step1',
                title: '风险根因分析',
                description: '深入分析客户不满的根本原因',
                phase: '分析阶段',
                duration: 4,
                dueOffset: 3,
                defaultAssignee: 'csm',
                requiredResources: [],
                checkpoints: [
                    '完成根因分析',
                    '制定改进计划'
                ],
                dependencies: [],
                isOptional: false,
                allowSkip: false
            },
            {
                id: 'step2',
                title: '紧急响应措施',
                description: '实施紧急措施缓解客户不满',
                phase: '响应阶段',
                duration: 2,
                dueOffset: 5,
                defaultAssignee: 'support',
                requiredResources: [],
                checkpoints: [
                    '实施紧急措施',
                    '获得客户认可'
                ],
                dependencies: [
                    'step1'
                ],
                isOptional: false,
                allowSkip: false
            },
            {
                id: 'step3',
                title: '长期改进方案',
                description: '制定并实施长期的服务改进方案',
                phase: '改进阶段',
                duration: 8,
                dueOffset: 14,
                defaultAssignee: 'custom',
                customAssignee: '产品团队',
                requiredResources: [],
                checkpoints: [
                    '完成方案实施',
                    '客户满意度回升'
                ],
                dependencies: [
                    'step2'
                ],
                isOptional: false,
                allowSkip: false
            }
        ],
        estimatedDuration: 14,
        successRate: 60,
        usage: 18,
        createdBy: '王芳',
        createdAt: '2023-09-20',
        updatedAt: '2024-01-08'
    },
    {
        id: 'pb003',
        name: '成熟期客户深度合作剧本',
        description: '与成熟期客户建立更深层次合作关系的策略',
        applicableStage: [
            '成熟期'
        ],
        category: '合作深化',
        status: '可用',
        goal: '建立长期战略合作关系，实现双方价值最大化',
        scenarioTags: [
            '战略合作',
            '价值提升',
            '长期发展'
        ],
        // 触发条件
        triggerConditions: [
            {
                id: 'tc1',
                type: 'custom',
                field: 'health_score',
                operator: 'gte',
                value: 85,
                description: '客户健康分大于等于85分'
            },
            {
                id: 'tc2',
                type: 'custom',
                field: 'arr',
                operator: 'gte',
                value: 500000,
                description: 'ARR大于等于50万'
            }
        ],
        autoTrigger: false,
        // 成功指标
        successMetrics: [
            {
                id: 'metric1',
                name: '战略合作达成率',
                description: '成功建立战略合作关系的客户比例',
                targetValue: 45,
                unit: '%',
                measurementMethod: '统计启动剧本后90天内签署战略合作协议的客户比例'
            },
            {
                id: 'metric2',
                name: '合作价值增长',
                description: '通过战略合作实现的收入增长',
                targetValue: 300000,
                unit: '元',
                measurementMethod: '计算战略合作带来的新增收入平均值'
            }
        ],
        // 资源配置
        resources: [
            {
                id: 'res1',
                type: 'document',
                name: '战略合作方案模板',
                description: '战略合作提案和协议模板',
                tags: [
                    '合作',
                    '模板'
                ]
            },
            {
                id: 'res2',
                type: 'document',
                name: '价值展示材料',
                description: '展示双方合作价值的演示材料',
                tags: [
                    '展示',
                    '价值'
                ]
            }
        ],
        tasks: [
            {
                id: 'step1',
                title: '合作机会识别',
                description: '识别与客户深度合作的机会点',
                phase: '识别阶段',
                duration: 3,
                dueOffset: 5,
                defaultAssignee: 'csm',
                requiredResources: [],
                checkpoints: [
                    '完成机会分析',
                    '确定合作方向'
                ],
                dependencies: [],
                isOptional: false,
                allowSkip: false
            },
            {
                id: 'step2',
                title: '战略合作提案',
                description: '制定战略合作方案并进行高层提案',
                phase: '提案阶段',
                duration: 6,
                dueOffset: 12,
                defaultAssignee: 'sales',
                requiredResources: [],
                checkpoints: [
                    '完成提案准备',
                    '获得高层支持'
                ],
                dependencies: [
                    'step1'
                ],
                isOptional: false,
                allowSkip: false
            }
        ],
        estimatedDuration: 9,
        successRate: 45,
        usage: 12,
        createdBy: '李明',
        createdAt: '2023-10-10',
        updatedAt: '2024-01-05'
    }
];
const mockKeyActions = [
    {
        id: 'A1',
        title: '价值实现与效果报告',
        description: '创建和管理客户价值看板，展示业务成果',
        icon: 'BarChartOutlined',
        color: '#1890ff',
        enabled: true
    },
    {
        id: 'A2',
        title: '业务复盘会 (QBR)',
        description: '定期组织业务回顾会议，深化客户关系',
        icon: 'TeamOutlined',
        color: '#52c41a',
        enabled: true
    },
    {
        id: 'A3',
        title: '健康度评分',
        description: '监控和管理客户健康度指标',
        icon: 'HeartOutlined',
        color: '#fa8c16',
        route: '/health-center',
        enabled: true
    },
    {
        id: 'A4',
        title: '风险事件处理队列',
        description: '及时识别和处理客户风险事件',
        icon: 'ExclamationCircleOutlined',
        color: '#f5222d',
        enabled: true
    },
    {
        id: 'A5',
        title: '续费续签',
        description: '管理客户续约流程和策略',
        icon: 'FileTextOutlined',
        color: '#722ed1',
        route: '/profiles/renewal',
        enabled: true
    }
];
const mockServiceOverview = {
    totalCustomers: mockCustomers.length,
    avgHealthScore: Math.round(mockCustomers.reduce((sum, c)=>sum + c.healthScore, 0) / mockCustomers.length),
    riskCustomers: mockCustomers.filter((c)=>c.healthLevel === '风险').length,
    healthDistribution: {
        healthy: mockCustomers.filter((c)=>c.healthLevel === '健康').length,
        normal: mockCustomers.filter((c)=>c.healthLevel === '一般').length,
        risky: mockCustomers.filter((c)=>c.healthLevel === '风险').length
    },
    lifecycleDistribution: {
        growth: mockCustomers.filter((c)=>c.lifecycleStage === '成长期').length,
        mature: mockCustomers.filter((c)=>c.lifecycleStage === '成熟期').length,
        decline: mockCustomers.filter((c)=>c.lifecycleStage === '衰退期').length
    }
};
const healthColors = {
    '健康': '#7ED321',
    '一般': '#F5A623',
    '风险': '#FF6B6B'
};
const lifecycleColors = {
    '成长期': '#1890ff',
    '成熟期': '#13c2c2',
    '衰退期': '#eb2f96'
};
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
"src/mock/handoverData.ts": function (module, exports, __mako_require__){
"use strict";
__mako_require__.d(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
__mako_require__.e(exports, {
    mockCRMSyncData: function() {
        return mockCRMSyncData;
    },
    mockCustomerHandovers: function() {
        return mockCustomerHandovers;
    },
    mockInternalComments: function() {
        return mockInternalComments;
    },
    mockOnboardingTasks: function() {
        return mockOnboardingTasks;
    },
    mockStakeholders: function() {
        return mockStakeholders;
    }
});
var _interop_require_wildcard = __mako_require__("@swc/helpers/_/_interop_require_wildcard");
var _reactrefresh = /*#__PURE__*/ _interop_require_wildcard._(__mako_require__("node_modules/react-refresh/runtime.js"));
var _continuousServiceData = __mako_require__("src/mock/continuousServiceData.ts");
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
// 根据平台类型获取已购产品
function getPurchasedProductsByPlatform(customerId) {
    const platformType = (0, _continuousServiceData.getPlatformType)(customerId);
    switch(platformType){
        case 'dingtalk':
            return [
                '直营-极简版'
            ];
        case 'dingtalk_hr':
            return [
                '智能人事-标准',
                '智能人事-专业版'
            ];
        case 'wechat_work':
            return [
                '企微版'
            ];
        case 'feishu':
            return [
                '飞书版'
            ];
        case 'lark':
            return [
                'D-learning'
            ];
        case 'dingtalk_global':
            return [
                'D-learning'
            ];
        case 'standalone':
            return [
                '独立版'
            ];
        default:
            return [
                '企业版SaaS平台',
                '数据分析模块',
                'API集成服务'
            ];
    }
}
const mockCRMSyncData = {
    contractAmount: 150000,
    servicePeriod: '2024-01-01 至 2024-12-31',
    purchasedProducts: [
        '企业版SaaS平台',
        '数据分析模块',
        'API集成服务'
    ],
    keyContacts: [
        '张三 - 技术总监',
        '李四 - 项目经理'
    ],
    salesNotes: '客户对数据安全要求较高，需要重点关注合规性配置。客户团队技术能力较强，可以快速上手。',
    accountCount: 50,
    salesSource: 'direct',
    salesPerson: '王销售'
};
const mockStakeholders = [
    {
        id: '1',
        name: '张三',
        position: '技术总监',
        role: 'decision_maker',
        contact: 'zhangsan@company.com',
        status: 'active',
        history: [
            {
                position: '研发经理',
                startDate: '2020-01-01',
                endDate: '2022-06-30'
            },
            {
                position: '技术总监',
                startDate: '2022-07-01'
            }
        ]
    },
    {
        id: '2',
        name: '李四',
        position: '项目经理',
        role: 'user',
        contact: 'lisi@company.com',
        status: 'left',
        history: [
            {
                position: '实施顾问',
                startDate: '2021-03-01',
                endDate: '2022-12-31'
            },
            {
                position: '项目经理',
                startDate: '2023-01-01',
                endDate: '2024-03-31',
                note: '离职'
            }
        ]
    },
    {
        id: '3',
        name: '王五',
        position: '运维工程师',
        role: 'technical_contact',
        contact: 'wangwu@company.com',
        status: 'active',
        history: [
            {
                position: '初级运维',
                startDate: '2022-05-01',
                endDate: '2023-08-01'
            },
            {
                position: '运维工程师',
                startDate: '2023-08-02'
            }
        ]
    }
];
const mockOnboardingTasks = [
    {
        id: '1',
        title: '安排启动会',
        completed: true,
        dueDate: '2024-01-15'
    },
    {
        id: '2',
        title: '完成账号开通',
        completed: true,
        dueDate: '2024-01-16'
    },
    {
        id: '3',
        title: '配置数据权限',
        completed: false,
        dueDate: '2024-01-20'
    },
    {
        id: '4',
        title: '培训用户使用',
        completed: false,
        dueDate: '2024-01-25'
    }
];
const mockInternalComments = [
    {
        id: '1',
        content: '客户对数据安全要求很高，建议安排安全专家参与启动会 @security_team',
        author: 'CSM-小王',
        createdAt: '2024-01-10 14:30:00',
        mentions: [
            'security_team'
        ]
    },
    {
        id: '2',
        content: '已联系技术团队，确认可以满足客户的合规要求',
        author: 'CSM-小李',
        createdAt: '2024-01-11 09:15:00'
    }
];
const mockCustomerHandovers = [
    {
        id: '1',
        handoverNumber: 'HO-2024-001',
        customerId: 'CUST-0001',
        contractId: 'contract_001',
        contractNumber: 'CONT-2024-001',
        customerName: '北京科技有限公司',
        handoverStatus: 'normal',
        riskLevel: 'low',
        hasHandoverDocument: true,
        hasRiskAlert: false,
        stakeholderCount: 5,
        expectationAlignment: 'aligned',
        handoverRating: 4.5,
        handoverComment: '服务专业，响应及时',
        createdAt: '2024-01-10 10:00:00',
        updatedAt: '2024-01-15 16:30:00',
        salesCreatedAt: '2024-01-05 14:20:00',
        crmData: {
            ...mockCRMSyncData,
            purchasedProducts: getPurchasedProductsByPlatform('CUST-0001')
        },
        stakeholders: mockStakeholders,
        onboardingTasks: mockOnboardingTasks,
        internalComments: mockInternalComments,
        corePainPoints: '1. 原有培训效率低下，无法满足快速发展需求；2. 缺乏统一的培训管理平台，数据分散；3. 无法有效统计和分析员工学习数据；4. 线下培训成本高，覆盖面有限',
        shortTermExpectation: '1. 员工平台使用率达到80%以上；2. 完成新员工入职培训全覆盖；3. 解决线下培训数据统计难题',
        longTermExpectation: '1. 通过平台赋能30%培训成本；2. 员工技能达标率提升20%；3. 形成企业内部知识库，支持知识沉淀',
        unacceptableSituations: '1. 系统频繁宕机影响业务；2. 数据安全出现重大漏洞；3. 培训效果无法量化评估',
        customerSuccessCriteria: '1. 系统稳定性达到99.9%；2. 用户满意度评分4.5分以上；3. 培训完成率达到95%以上'
    },
    {
        id: '2',
        handoverNumber: 'HO-2024-002',
        customerId: 'CUST-0002',
        contractId: 'contract_003',
        contractNumber: 'CONT-2023-045',
        customerName: '上海智能科技有限公司',
        handoverStatus: 'not_handover',
        riskLevel: 'medium',
        hasHandoverDocument: false,
        hasRiskAlert: true,
        stakeholderCount: 3,
        expectationAlignment: 'partially_aligned',
        handoverRating: 3.8,
        handoverComment: '需要进一步沟通客户需求',
        createdAt: '2024-01-12 14:20:00',
        updatedAt: '2024-01-14 11:45:00',
        salesCreatedAt: '2024-01-08 09:15:00',
        crmData: {
            ...mockCRMSyncData,
            accountCount: 25,
            salesSource: 'channel',
            channelPartner: '上海渠道合作伙伴有限公司',
            purchasedProducts: getPurchasedProductsByPlatform('CUST-0002')
        },
        stakeholders: [
            {
                id: '4',
                name: '赵六',
                position: '产品经理',
                role: 'decision_maker',
                contact: 'zhaoliu@company.com',
                status: 'active',
                history: [
                    {
                        position: '资深产品',
                        startDate: '2021-07-01',
                        endDate: '2023-06-30'
                    },
                    {
                        position: '产品经理',
                        startDate: '2023-07-01'
                    }
                ]
            },
            {
                id: '5',
                name: '钱七',
                position: '开发工程师',
                role: 'user',
                contact: 'qianqi@company.com',
                status: 'active'
            }
        ],
        onboardingTasks: mockOnboardingTasks,
        internalComments: mockInternalComments,
        corePainPoints: '1. 现有系统老旧，维护成本高；2. 业务流程不规范，效率低下；3. 数据孤岛严重，无法形成有效分析；4. 人工操作繁琐，容易出错',
        shortTermExpectation: '1. 快速完成系统集成；2. 团队熟练掌握基础功能；3. 建立标准化操作流程',
        longTermExpectation: '1. 实现业务流程全面数字化；2. 提升工作效率30%；3. 建立数据驱动的决策体系',
        unacceptableSituations: '1. 系统响应时间超过5秒；2. 数据丢失或错误；3. 用户体验差导致抵触情绪',
        customerSuccessCriteria: '1. 系统正常运行率99%以上；2. 用户培训通过率90%以上；3. 业务指标提升可量化'
    },
    {
        id: '3',
        handoverNumber: 'HO-2024-003',
        customerId: 'CUST-0003',
        contractId: 'contract_004',
        contractNumber: 'CONT-2022-008',
        customerName: '深圳创新科技有限公司',
        handoverStatus: 'risk',
        riskLevel: 'high',
        hasHandoverDocument: true,
        hasRiskAlert: true,
        stakeholderCount: 7,
        expectationAlignment: 'not_aligned',
        handoverRating: 2.5,
        handoverComment: '客户期望与产品功能存在较大差距',
        createdAt: '2024-01-08 09:30:00',
        updatedAt: '2024-01-13 15:20:00',
        salesCreatedAt: '2024-01-03 11:45:00',
        crmData: {
            ...mockCRMSyncData,
            accountCount: 100,
            salesSource: 'direct',
            salesPerson: '李销售',
            purchasedProducts: getPurchasedProductsByPlatform('CUST-0003')
        },
        stakeholders: [
            {
                id: '6',
                name: '孙八',
                position: '技术总监',
                role: 'decision_maker',
                contact: 'sunba@company.com',
                status: 'active'
            },
            {
                id: '7',
                name: '周九',
                position: '项目经理',
                role: 'influencer',
                contact: 'zhoujiu@company.com',
                status: 'active',
                history: [
                    {
                        position: '实施顾问',
                        startDate: '2020-09-01',
                        endDate: '2022-12-31'
                    },
                    {
                        position: '项目经理',
                        startDate: '2023-01-01'
                    }
                ]
            },
            {
                id: '8',
                name: '吴十',
                position: '运维工程师',
                role: 'technical_contact',
                contact: 'wushi@company.com',
                status: 'left',
                history: [
                    {
                        position: '运维工程师',
                        startDate: '2022-01-01',
                        endDate: '2024-05-31',
                        note: '离职'
                    }
                ]
            }
        ],
        onboardingTasks: mockOnboardingTasks,
        internalComments: mockInternalComments,
        corePainPoints: '1. 客户期望与产品功能存在较大差距；2. 技术团队对新系统接受度不高；3. 现有业务流程复杂，改造难度大；4. 预算有限，需要快速见效',
        shortTermExpectation: '1. 解决当前业务痛点；2. 提升团队协作效率；3. 建立规范化管理流程',
        longTermExpectation: '1. 成为行业数字化标杆；2. 实现智能化运营管理；3. 支撑业务快速扩张',
        unacceptableSituations: '1. 影响现有业务正常运行；2. 增加员工工作负担；3. 投资回报率低于预期',
        customerSuccessCriteria: '1. 关键业务指标提升15%以上；2. 员工工作效率提升25%；3. 客户满意度保持在4.0以上'
    },
    {
        id: '4',
        handoverNumber: 'HO-2024-004',
        customerId: 'CUST-0005',
        contractId: 'contract_007',
        contractNumber: 'CONT-2023-089',
        customerName: '杭州互联网科技有限公司',
        handoverStatus: 'normal',
        riskLevel: 'low',
        hasHandoverDocument: true,
        hasRiskAlert: false,
        stakeholderCount: 4,
        expectationAlignment: 'aligned',
        handoverRating: 4.2,
        handoverComment: '客户满意度较高，服务响应及时',
        createdAt: '2024-01-09 16:00:00',
        updatedAt: '2024-01-16 10:30:00',
        salesCreatedAt: '2024-01-04 13:20:00',
        crmData: {
            ...mockCRMSyncData,
            accountCount: 35,
            salesSource: 'direct',
            salesPerson: '张销售',
            purchasedProducts: getPurchasedProductsByPlatform('CUST-0005')
        },
        stakeholders: [
            {
                id: '9',
                name: '郑十一',
                position: '技术总监',
                role: 'decision_maker',
                contact: 'zhengshiyi@company.com',
                status: 'active'
            },
            {
                id: '10',
                name: '王十二',
                position: '产品经理',
                role: 'user',
                contact: 'wangshier@company.com',
                status: 'active'
            }
        ],
        onboardingTasks: mockOnboardingTasks,
        internalComments: mockInternalComments,
        corePainPoints: '1. 客户服务响应速度慢，影响用户体验；2. 数据分析能力不足，无法支撑决策；3. 系统集成度低，操作繁琐；4. 缺乏有效的用户行为分析工具',
        shortTermExpectation: '1. 系统稳定上线运行；2. 核心用户快速上手；3. 基础数据完整迁移',
        longTermExpectation: '1. 全面提升客户服务质量；2. 实现精细化运营管理；3. 支持业务创新发展',
        unacceptableSituations: '1. 系统不稳定影响业务；2. 学习成本过高；3. 无法满足个性化需求',
        customerSuccessCriteria: '1. 系统可用性达到99.5%；2. 用户活跃度达到85%；3. 客户服务效率提升20%'
    },
    {
        id: '5',
        handoverNumber: 'HO-2024-005',
        customerId: 'CUST-0006',
        contractId: 'contract_009',
        contractNumber: 'CONT-2024-010',
        customerName: '成都软件开发有限公司',
        handoverStatus: 'not_handover',
        riskLevel: 'medium',
        hasHandoverDocument: false,
        hasRiskAlert: true,
        stakeholderCount: 6,
        expectationAlignment: 'partially_aligned',
        handoverRating: 3.6,
        handoverComment: '需要加强技术支持和培训',
        createdAt: '2024-01-11 11:00:00',
        updatedAt: '2024-01-17 14:15:00',
        salesCreatedAt: '2024-01-06 15:30:00',
        crmData: {
            ...mockCRMSyncData,
            accountCount: 45,
            salesSource: 'channel',
            channelPartner: '成都渠道合作伙伴有限公司',
            purchasedProducts: getPurchasedProductsByPlatform('CUST-0006')
        },
        stakeholders: [
            {
                id: '11',
                name: '李十三',
                position: '技术总监',
                role: 'decision_maker',
                contact: 'lishisan@company.com',
                status: 'active'
            },
            {
                id: '12',
                name: '刘十四',
                position: '项目经理',
                role: 'influencer',
                contact: 'liushisi@company.com',
                status: 'active'
            }
        ],
        onboardingTasks: mockOnboardingTasks,
        internalComments: mockInternalComments,
        corePainPoints: '1. 团队技术能力参差不齐，培训需求多样化；2. 现有知识管理混乱，查找困难；3. 缺乏系统化的学习路径；4. 员工学习积极性不高，需要激励机制',
        shortTermExpectation: '1. 完成团队培训；2. 建立使用规范；3. 实现基本功能应用',
        longTermExpectation: '1. 打造学习型组织；2. 实现知识管理体系化；3. 提升企业竞争力',
        unacceptableSituations: '1. 培训效果不达标；2. 系统操作复杂；3. 技术支持响应慢',
        customerSuccessCriteria: '1. 培训覆盖率100%；2. 系统使用满意度4.5分以上；3. 业务流程优化效果明显'
    },
    {
        id: '6',
        handoverNumber: 'HO-2024-006',
        customerId: 'CUST-0004',
        contractId: 'contract_006',
        contractNumber: 'CONT-2023-120',
        customerName: '广州数字化企业服务有限公司',
        handoverStatus: 'normal',
        riskLevel: 'low',
        hasHandoverDocument: true,
        hasRiskAlert: false,
        stakeholderCount: 8,
        expectationAlignment: 'aligned',
        handoverRating: 4.8,
        handoverComment: '客户对服务非常满意，续约意愿强烈',
        createdAt: '2024-01-07 13:00:00',
        updatedAt: '2024-01-18 09:45:00',
        salesCreatedAt: '2024-01-02 10:15:00',
        crmData: {
            ...mockCRMSyncData,
            accountCount: 80,
            salesSource: 'direct',
            salesPerson: '陈销售',
            purchasedProducts: getPurchasedProductsByPlatform('CUST-0004')
        },
        stakeholders: [
            {
                id: '13',
                name: '黄十五',
                position: '技术总监',
                role: 'decision_maker',
                contact: 'huangshiwu@company.com',
                status: 'active'
            },
            {
                id: '14',
                name: '赵十六',
                position: '产品经理',
                role: 'user',
                contact: 'zhaoshiliu@company.com',
                status: 'active'
            },
            {
                id: '15',
                name: '孙十七',
                position: '运维工程师',
                role: 'technical_contact',
                contact: 'sunshiqi@company.com',
                status: 'active'
            }
        ],
        onboardingTasks: mockOnboardingTasks,
        internalComments: mockInternalComments,
        corePainPoints: '1. 数字化转型进度缓慢，竞争优势不明显；2. 各部门协作效率低，信息传递不畅；3. 客户需求响应速度慢；4. 缺乏数据驱动的业务优化能力',
        shortTermExpectation: '1. 快速实现投资回报；2. 团队高效协作；3. 客户满意度提升',
        longTermExpectation: '1. 成为数字化转型典范；2. 实现可持续发展；3. 建立行业领先优势',
        unacceptableSituations: '1. 投资回报周期过长；2. 员工适应困难；3. 服务质量下降',
        customerSuccessCriteria: '1. ROI在12个月内实现；2. 员工满意度保持4.8分以上；3. 客户续约率达到95%以上'
    }
];
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
"src/pages/profiles/service/customer-detail-modal.tsx": function (module, exports, __mako_require__){
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
var _CustomerDetailWithPlaybooks = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/CustomerDetailWithPlaybooks.tsx"));
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
const CustomerDetailDrawer = ({ visible, customer, onClose, onAction })=>{
    const handleLaunchPlaybook = async (playbookId, customerId)=>{
        console.log('启动剧本:', {
            playbookId,
            customerId
        });
    // 这里可以调用实际的剧本启动API
    };
    // 将 RenewalCustomer 转换为 Customer 对象
    const convertToCustomer = (renewalCustomer)=>{
        return {
            id: renewalCustomer.id,
            name: renewalCustomer.customerName,
            industry: '互联网',
            scale: '大型企业',
            csm: renewalCustomer.owner,
            arr: renewalCustomer.renewalAmount,
            healthScore: renewalCustomer.healthScore,
            healthLevel: renewalCustomer.healthLevel,
            lifecycleStage: '成熟期',
            customerTier: 'large',
            purchasedProducts: [
                '产品A',
                '产品B'
            ],
            keyContacts: [
                {
                    id: 'contact-1',
                    name: '联系人',
                    title: '技术负责人',
                    phone: '138****8888',
                    email: 'contact@company.com',
                    isPrimary: true
                }
            ],
            contracts: [],
            handoverRecords: [],
            nextRenewalDate: renewalCustomer.contractExpiryDate,
            serviceExpiryDate: renewalCustomer.contractExpiryDate,
            isRenewalRisk: renewalCustomer.status === '流失风险',
            lastContactDate: renewalCustomer.lastInteraction,
            serviceRecords: [],
            todoTasks: [],
            isFavorite: false,
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: new Date().toISOString()
        };
    };
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_CustomerDetailWithPlaybooks.default, {
        visible: visible,
        customer: convertToCustomer(customer),
        recommendations: [],
        executions: [],
        playbooks: [],
        onClose: onClose,
        onAction: onAction,
        onLaunchPlaybook: handleLaunchPlaybook,
        onUpdateRecommendation: async ()=>{}
    }, void 0, false, {
        fileName: "src/pages/profiles/service/customer-detail-modal.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
};
_c = CustomerDetailDrawer;
var _default = CustomerDetailDrawer;
var _c;
$RefreshReg$(_c, "CustomerDetailDrawer");
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
//# sourceMappingURL=common-async.js.map