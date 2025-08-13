((typeof globalThis !== 'undefined' ? globalThis : self)["makoChunk_ant-design-pro"] = (typeof globalThis !== 'undefined' ? globalThis : self)["makoChunk_ant-design-pro"] || []).push([
        ['p__CustomerSuccess__index'],
{ "src/pages/CustomerSuccess/index.tsx": function (module, exports, __mako_require__){
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
var _max = __mako_require__("src/.umi/exports.ts");
var _tabContentGenerator = __mako_require__("src/utils/tabContentGenerator.tsx");
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
var _s = $RefreshSig$();
// 路径到内容标题的映射
const pathToTitleMap = {
    '/dashboard/work': '我的工作看板',
    '/dashboard/layers': '客户分层盘点',
    '/dashboard/focus': '近期客户关注重点',
    '/dashboard/competition': '客成部门大比武',
    '/dashboard/coordination': '大服务体系内协同',
    '/profiles/handover': '客户交接',
    '/profiles/implementation': '实施搭建',
    '/profiles/service': '持续服务',
    '/profiles/renewal': '续约管理',
    '/profiles/recall': '召回孵化',
    '/profiles/churn': '流失归因',
    '/revenue/consultation': '咨询应答',
    '/revenue/upgrade': '定制升舱建议',
    '/revenue/learning': '学习项目推荐',
    '/revenue/purchase': '课程采购活动',
    '/revenue/alliance': '战略活动结盟',
    '/revenue/message': '消息推送管理',
    '/resources/deployment': '实施部署套件',
    '/resources/support': '年度服务支撑',
    '/resources/equipment': '续约升级装备',
    '/resources/knowledge': '团队能力建设',
    '/ai-tools/consultant': '实施顾问分身',
    '/ai-tools/simulator': '续费模拟器',
    '/ai-tools/communication': '干系人沟通话术',
    '/ai-tools/travel': '面客差旅行程表',
    '/ai-tools/prediction': '预测水晶球',
    '/ai-tools/avatar': '我的虚拟分身',
    '/ai-tools/tags': '智能标签在干活'
};
const CustomerSuccess = ()=>{
    _s();
    const location = (0, _max.useLocation)();
    // 根据当前路径获取页面标题
    const pageTitle = pathToTitleMap[location.pathname] || '客户成功系统';
    // 根据页面标题生成内容
    const content = (0, _tabContentGenerator.generateTabContent)(pageTitle);
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            padding: '24px',
            background: '#fafafa',
            minHeight: 'calc(100vh - 64px)'
        },
        children: content
    }, void 0, false, {
        fileName: "src/pages/CustomerSuccess/index.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
};
_s(CustomerSuccess, "pkHmaVRPskBaU4tMJuJJpV42k1I=", false, function() {
    return [
        _max.useLocation
    ];
});
_c = CustomerSuccess;
var _default = CustomerSuccess;
var _c;
$RefreshReg$(_c, "CustomerSuccess");
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
"src/utils/tabContentGenerator.tsx": function (module, exports, __mako_require__){
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
    CustomerHandoverContent: function() {
        return CustomerHandoverContent;
    },
    DashboardContent: function() {
        return DashboardContent;
    },
    DefaultContent: function() {
        return DefaultContent;
    },
    ImplementationContent: function() {
        return ImplementationContent;
    },
    generateTabContent: function() {
        return generateTabContent;
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
const DashboardContent = ()=>{
    const metrics = {
        totalCustomers: 1250,
        activeCustomers: 1180,
        pendingHandovers: 15,
        renewalRate: 85.6,
        satisfactionScore: 92.3
    };
    const recentActivities = [
        {
            id: 1,
            customer: '阿里巴巴',
            action: '续约成功',
            time: '2小时前',
            status: 'success'
        },
        {
            id: 2,
            customer: '腾讯科技',
            action: '新客户接入',
            time: '4小时前',
            status: 'info'
        },
        {
            id: 3,
            customer: '字节跳动',
            action: '服务升级',
            time: '6小时前',
            status: 'warning'
        },
        {
            id: 4,
            customer: '美团点评',
            action: '问题解决',
            time: '8小时前',
            status: 'success'
        }
    ];
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                gutter: [
                    16,
                    16
                ],
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        span: 6,
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                title: "总客户数",
                                value: metrics.totalCustomers,
                                prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {}, void 0, false, {
                                    fileName: "src/utils/tabContentGenerator.tsx",
                                    lineNumber: 44,
                                    columnNumber: 23
                                }, void 0),
                                valueStyle: {
                                    color: '#3f8600'
                                }
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 41,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        span: 6,
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                title: "活跃客户",
                                value: metrics.activeCustomers,
                                prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.TeamOutlined, {}, void 0, false, {
                                    fileName: "src/utils/tabContentGenerator.tsx",
                                    lineNumber: 54,
                                    columnNumber: 23
                                }, void 0),
                                valueStyle: {
                                    color: '#1890ff'
                                }
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 51,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        span: 6,
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                title: "待交接客户",
                                value: metrics.pendingHandovers,
                                prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ClockCircleOutlined, {}, void 0, false, {
                                    fileName: "src/utils/tabContentGenerator.tsx",
                                    lineNumber: 64,
                                    columnNumber: 23
                                }, void 0),
                                valueStyle: {
                                    color: '#faad14'
                                }
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 61,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        span: 6,
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                title: "续约率",
                                value: metrics.renewalRate,
                                suffix: "%",
                                prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.RiseOutlined, {}, void 0, false, {
                                    fileName: "src/utils/tabContentGenerator.tsx",
                                    lineNumber: 75,
                                    columnNumber: 23
                                }, void 0),
                                valueStyle: {
                                    color: '#52c41a'
                                }
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/utils/tabContentGenerator.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                gutter: [
                    16,
                    16
                ],
                style: {
                    marginTop: 16
                },
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        span: 12,
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            title: "客户满意度",
                            extra: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                type: "link",
                                children: "查看详情"
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 84,
                                columnNumber: 38
                            }, void 0),
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    textAlign: 'center'
                                },
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Progress, {
                                    type: "circle",
                                    percent: metrics.satisfactionScore,
                                    format: (percent)=>`${percent}分`,
                                    strokeColor: "#52c41a"
                                }, void 0, false, {
                                    fileName: "src/utils/tabContentGenerator.tsx",
                                    lineNumber: 86,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        span: 12,
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            title: "最近活动",
                            extra: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                type: "link",
                                children: "查看全部"
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 96,
                                columnNumber: 37
                            }, void 0),
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                children: recentActivities.map((activity)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            marginBottom: 12,
                                            display: 'flex',
                                            alignItems: 'center'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                                                size: "small",
                                                style: {
                                                    marginRight: 8
                                                },
                                                children: activity.customer.charAt(0)
                                            }, void 0, false, {
                                                fileName: "src/utils/tabContentGenerator.tsx",
                                                lineNumber: 100,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    flex: 1
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        children: activity.customer
                                                    }, void 0, false, {
                                                        fileName: "src/utils/tabContentGenerator.tsx",
                                                        lineNumber: 104,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            fontSize: 12,
                                                            color: '#666'
                                                        },
                                                        children: activity.action
                                                    }, void 0, false, {
                                                        fileName: "src/utils/tabContentGenerator.tsx",
                                                        lineNumber: 105,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/utils/tabContentGenerator.tsx",
                                                lineNumber: 103,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                color: activity.status === 'success' ? 'green' : activity.status === 'warning' ? 'orange' : 'blue',
                                                children: activity.time
                                            }, void 0, false, {
                                                fileName: "src/utils/tabContentGenerator.tsx",
                                                lineNumber: 107,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, activity.id, true, {
                                        fileName: "src/utils/tabContentGenerator.tsx",
                                        lineNumber: 99,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/utils/tabContentGenerator.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/utils/tabContentGenerator.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
};
_c = DashboardContent;
const CustomerHandoverContent = ()=>{
    const handoverData = [
        {
            key: '1',
            customer: '阿里巴巴',
            contact: '张三',
            phone: '13800138000',
            status: 'pending',
            priority: 'high',
            createTime: '2024-01-15'
        },
        {
            key: '2',
            customer: '腾讯科技',
            contact: '李四',
            phone: '13900139000',
            status: 'in_progress',
            priority: 'medium',
            createTime: '2024-01-14'
        },
        {
            key: '3',
            customer: '字节跳动',
            contact: '王五',
            phone: '13700137000',
            status: 'completed',
            priority: 'low',
            createTime: '2024-01-13'
        }
    ];
    const columns = [
        {
            title: '客户名称',
            dataIndex: 'customer',
            key: 'customer'
        },
        {
            title: '联系人',
            dataIndex: 'contact',
            key: 'contact'
        },
        {
            title: '联系电话',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status)=>{
                const statusMap = {
                    pending: {
                        text: '待处理',
                        color: 'orange'
                    },
                    in_progress: {
                        text: '进行中',
                        color: 'blue'
                    },
                    completed: {
                        text: '已完成',
                        color: 'green'
                    }
                };
                const { text, color } = statusMap[status];
                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                    color: color,
                    children: text
                }, void 0, false, {
                    fileName: "src/utils/tabContentGenerator.tsx",
                    lineNumber: 179,
                    columnNumber: 16
                }, this);
            }
        },
        {
            title: '优先级',
            dataIndex: 'priority',
            key: 'priority',
            render: (priority)=>{
                const priorityMap = {
                    high: {
                        text: '高',
                        color: 'red'
                    },
                    medium: {
                        text: '中',
                        color: 'orange'
                    },
                    low: {
                        text: '低',
                        color: 'green'
                    }
                };
                const { text, color } = priorityMap[priority];
                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                    color: color,
                    children: text
                }, void 0, false, {
                    fileName: "src/utils/tabContentGenerator.tsx",
                    lineNumber: 193,
                    columnNumber: 16
                }, this);
            }
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime'
        },
        {
            title: '操作',
            key: 'action',
            render: ()=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                    size: "middle",
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                            type: "link",
                            size: "small",
                            children: "查看详情"
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 206,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                            type: "link",
                            size: "small",
                            children: "开始交接"
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 207,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/utils/tabContentGenerator.tsx",
                    lineNumber: 205,
                    columnNumber: 9
                }, this)
        }
    ];
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
            title: "客户交接管理",
            extra: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.SearchOutlined, {}, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 219,
                            columnNumber: 27
                        }, void 0),
                        children: "搜索"
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 219,
                        columnNumber: 13
                    }, void 0),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.FilterOutlined, {}, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 220,
                            columnNumber: 27
                        }, void 0),
                        children: "筛选"
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 220,
                        columnNumber: 13
                    }, void 0),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                        type: "primary",
                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PlusOutlined, {}, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 221,
                            columnNumber: 42
                        }, void 0),
                        children: "新建交接"
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 221,
                        columnNumber: 13
                    }, void 0)
                ]
            }, void 0, true, {
                fileName: "src/utils/tabContentGenerator.tsx",
                lineNumber: 218,
                columnNumber: 11
            }, void 0),
            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Table, {
                columns: columns,
                dataSource: handoverData,
                pagination: {
                    total: 50,
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range)=>`第 ${range[0]}-${range[1]} 条/共 ${total} 条`
                }
            }, void 0, false, {
                fileName: "src/utils/tabContentGenerator.tsx",
                lineNumber: 225,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "src/utils/tabContentGenerator.tsx",
            lineNumber: 215,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/utils/tabContentGenerator.tsx",
        lineNumber: 214,
        columnNumber: 5
    }, this);
};
_c1 = CustomerHandoverContent;
const ImplementationContent = ()=>{
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
            title: "实施搭建管理",
            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                gutter: [
                    16,
                    16
                ],
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        span: 8,
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            size: "small",
                            title: "进行中的项目",
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                title: "项目数量",
                                value: 12,
                                prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.TrophyOutlined, {}, void 0, false, {
                                    fileName: "src/utils/tabContentGenerator.tsx",
                                    lineNumber: 249,
                                    columnNumber: 58
                                }, void 0)
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 249,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 248,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 247,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        span: 8,
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            size: "small",
                            title: "已完成项目",
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                title: "项目数量",
                                value: 45,
                                prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.CheckCircleOutlined, {}, void 0, false, {
                                    fileName: "src/utils/tabContentGenerator.tsx",
                                    lineNumber: 254,
                                    columnNumber: 58
                                }, void 0)
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 254,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 253,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 252,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        span: 8,
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            size: "small",
                            title: "延期项目",
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                title: "项目数量",
                                value: 3,
                                prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ExclamationCircleOutlined, {}, void 0, false, {
                                    fileName: "src/utils/tabContentGenerator.tsx",
                                    lineNumber: 259,
                                    columnNumber: 57
                                }, void 0)
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 259,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 258,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 257,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/utils/tabContentGenerator.tsx",
                lineNumber: 246,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "src/utils/tabContentGenerator.tsx",
            lineNumber: 245,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/utils/tabContentGenerator.tsx",
        lineNumber: 244,
        columnNumber: 5
    }, this);
};
_c2 = ImplementationContent;
const DefaultContent = ({ tabName })=>{
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            padding: '24px',
            textAlign: 'center'
        },
        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
            children: [
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("h2", {
                    children: tabName
                }, void 0, false, {
                    fileName: "src/utils/tabContentGenerator.tsx",
                    lineNumber: 273,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("p", {
                    children: "此功能正在开发中，敬请期待..."
                }, void 0, false, {
                    fileName: "src/utils/tabContentGenerator.tsx",
                    lineNumber: 274,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                    type: "primary",
                    icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ReloadOutlined, {}, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 275,
                        columnNumber: 38
                    }, void 0),
                    children: "刷新页面"
                }, void 0, false, {
                    fileName: "src/utils/tabContentGenerator.tsx",
                    lineNumber: 275,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/utils/tabContentGenerator.tsx",
            lineNumber: 272,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/utils/tabContentGenerator.tsx",
        lineNumber: 271,
        columnNumber: 5
    }, this);
};
_c3 = DefaultContent;
const generateTabContent = (tabName)=>{
    // 创建中文label到英文key的映射表
    const labelToKeyMap = {
        '我的工作看板': 'work-dashboard',
        '客户交接': 'customer-handover',
        '实施搭建': 'implementation',
        '客户分层盘点': 'customer-layers',
        '近期客户关注重点': 'customer-focus',
        '客成部门大比武': 'department-competition',
        '大服务体系内协同': 'service-coordination',
        '持续服务': 'continuous-service',
        '续约管理': 'renewal-management',
        '召回孵化': 'recall-incubation',
        '流失归因': 'churn-analysis',
        '咨询应答': 'consultation',
        '定制升舱建议': 'upgrade-suggestions',
        '学习项目推荐': 'learning-projects',
        '课程采购活动': 'course-purchase',
        '战略活动结盟': 'strategic-alliance',
        '消息推送管理': 'message-push',
        '实施部署套件': 'deployment-kit',
        '年度服务支撑': 'operation-support',
        '续约升级装备': 'renewal-equipment',
        '团队能力建设': 'knowledge-base',
        '实施顾问分身': 'implementation-consultant',
        '续费模拟器': 'renewal-simulator',
        '干系人沟通话术': 'stakeholder-communication',
        '面客差旅行程表': 'travel-schedule',
        '预测水晶球': 'prediction-crystal',
        '我的虚拟分身': 'virtual-avatar',
        '智能标签在干活': 'smart-tags'
    };
    // 如果传入的是中文label，转换为英文key，否则直接使用
    const key = labelToKeyMap[tabName] || tabName;
    switch(key){
        case 'work-dashboard':
            return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(DashboardContent, {}, void 0, false, {
                fileName: "src/utils/tabContentGenerator.tsx",
                lineNumber: 322,
                columnNumber: 14
            }, this);
        case 'customer-handover':
            return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(CustomerHandoverContent, {}, void 0, false, {
                fileName: "src/utils/tabContentGenerator.tsx",
                lineNumber: 324,
                columnNumber: 14
            }, this);
        case 'implementation':
            return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(ImplementationContent, {}, void 0, false, {
                fileName: "src/utils/tabContentGenerator.tsx",
                lineNumber: 326,
                columnNumber: 14
            }, this);
        default:
            return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(DefaultContent, {
                tabName: tabName
            }, void 0, false, {
                fileName: "src/utils/tabContentGenerator.tsx",
                lineNumber: 328,
                columnNumber: 14
            }, this);
    }
};
var _c;
var _c1;
var _c2;
var _c3;
$RefreshReg$(_c, "DashboardContent");
$RefreshReg$(_c1, "CustomerHandoverContent");
$RefreshReg$(_c2, "ImplementationContent");
$RefreshReg$(_c3, "DefaultContent");
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
//# sourceMappingURL=p__CustomerSuccess__index-async.js.map