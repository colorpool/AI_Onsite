((typeof globalThis !== 'undefined' ? globalThis : self)["makoChunk_ant-design-pro"] = (typeof globalThis !== 'undefined' ? globalThis : self)["makoChunk_ant-design-pro"] || []).push([
        ['p__handover__index'],
{ "src/pages/handover/index.tsx": function (module, exports, __mako_require__){
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
var _umi = __mako_require__("src/.umi/exports.ts");
var _handoverData = __mako_require__("src/mock/handoverData.ts");
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
var _s = $RefreshSig$();
const { Title } = _antd.Typography;
const { Option } = _antd.Select;
const HandoverListPage = ()=>{
    _s();
    const navigate = (0, _umi.useNavigate)();
    const location = (0, _umi.useLocation)();
    // 搜索筛选状态
    const [searchParams, setSearchParams] = (0, _react.useState)({
        customerName: '',
        status: undefined,
        riskLevel: undefined
    });
    // 分页状态
    const [currentPage, setCurrentPage] = (0, _react.useState)(1);
    const pageSize = 10;
    // 处理搜索
    const handleSearch = ()=>{
        setCurrentPage(1);
        _antd.message.success('搜索完成');
    };
    // 处理重置
    const handleReset = ()=>{
        setSearchParams({
            customerName: '',
            status: undefined,
            riskLevel: undefined
        });
        setCurrentPage(1);
        _antd.message.success('已重置筛选条件');
    };
    // 处理新增交接
    const handleAddHandover = ()=>{
        navigate('/profiles/handover/new');
    };
    // 处理查看详情
    const handleViewDetail = (record)=>{
        console.log('点击查看详情:', record);
        const url = `/profiles/handover/${record.id}`;
        console.log('跳转URL:', url);
        navigate(url);
    };
    // 根据当前路径决定显示什么内容
    const pathname = location.pathname;
    // 如果是创建页面
    if (pathname === '/profiles/handover/new') return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            padding: '24px',
            background: '#fafafa',
            minHeight: 'calc(100vh - 120px)'
        },
        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
            style: {
                maxWidth: '1000px',
                margin: '0 auto'
            },
            children: [
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '24px',
                        gap: '16px'
                    },
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                            onClick: ()=>navigate('/profiles/handover'),
                            style: {
                                border: 'none',
                                padding: 0
                            },
                            children: "返回"
                        }, void 0, false, {
                            fileName: "src/pages/handover/index.tsx",
                            lineNumber: 106,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                            level: 3,
                            style: {
                                margin: 0,
                                color: '#262626',
                                fontSize: '18px'
                            },
                            children: "创建新客户交接"
                        }, void 0, false, {
                            fileName: "src/pages/handover/index.tsx",
                            lineNumber: 112,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 100,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        background: '#fff',
                        borderRadius: '8px',
                        padding: '24px'
                    },
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            textAlign: 'center',
                            padding: '40px'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                                level: 4,
                                style: {
                                    color: '#666'
                                },
                                children: "创建客户交接表单"
                            }, void 0, false, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 124,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("p", {
                                style: {
                                    color: '#999'
                                },
                                children: "这里将显示创建客户交接的表单内容"
                            }, void 0, false, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 127,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/handover/index.tsx",
                        lineNumber: 123,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 118,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/pages/handover/index.tsx",
            lineNumber: 95,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "src/pages/handover/index.tsx",
        lineNumber: 90,
        columnNumber: 7
    }, this);
    // 如果是详情页面，不显示列表页内容
    if (pathname.match(/^\/profiles\/handover\/\d+$/)) return null;
    // 过滤数据
    const filteredData = (0, _react.useMemo)(()=>{
        return _handoverData.mockCustomerHandovers.filter((item)=>{
            const matchName = !searchParams.customerName || item.customerName.includes(searchParams.customerName);
            const matchStatus = !searchParams.status || item.handoverStatus === searchParams.status;
            const matchRisk = !searchParams.riskLevel || item.riskLevel === searchParams.riskLevel;
            return matchName && matchStatus && matchRisk;
        });
    }, [
        searchParams
    ]);
    // 分页数据
    const paginatedData = (0, _react.useMemo)(()=>{
        const startIndex = (currentPage - 1) * pageSize;
        return filteredData.slice(startIndex, startIndex + pageSize);
    }, [
        filteredData,
        currentPage
    ]);
    // 顶部数据看板统计
    const kpi = (0, _react.useMemo)(()=>{
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
        const toDate = (s)=>new Date(s.replace(/-/g, '/'));
        const pendingCount = _handoverData.mockCustomerHandovers.filter((item)=>item.handoverStatus === 'pending').length;
        const completedThisMonth = _handoverData.mockCustomerHandovers.filter((item)=>{
            if (item.handoverStatus !== 'aligned') return false;
            const updated = toDate(item.updatedAt);
            return updated.getFullYear() === currentYear && updated.getMonth() === currentMonth;
        }).length;
        const riskyCount = _handoverData.mockCustomerHandovers.filter((item)=>item.hasRiskAlert).length;
        return {
            pendingCount,
            completedThisMonth,
            riskyCount
        };
    }, []);
    // 表格列定义
    const columns = [
        {
            title: '客户名称',
            dataIndex: 'customerName',
            key: 'customerName',
            width: 200
        },
        {
            title: '交接单',
            dataIndex: 'hasHandoverDocument',
            key: 'hasHandoverDocument',
            width: 100,
            render: (hasDocument, record)=>hasDocument ? /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("a", {
                    onClick: ()=>handleViewDetail(record),
                    style: {
                        color: '#1890ff'
                    },
                    children: "有"
                }, void 0, false, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 225,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                    style: {
                        color: '#999'
                    },
                    children: "无"
                }, void 0, false, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 229,
                    columnNumber: 11
                }, this)
        },
        {
            title: '风险提示',
            dataIndex: 'hasRiskAlert',
            key: 'hasRiskAlert',
            width: 100,
            render: (hasRisk)=>hasRisk ? /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                    color: "orange",
                    children: "有"
                }, void 0, false, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 240,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                    style: {
                        color: '#999'
                    },
                    children: "无"
                }, void 0, false, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 242,
                    columnNumber: 11
                }, this)
        },
        {
            title: '干系人信息',
            dataIndex: 'stakeholderCount',
            key: 'stakeholderCount',
            width: 120,
            render: (count)=>`${count}人`
        },
        {
            title: '客户期望对齐',
            dataIndex: 'expectationAlignment',
            key: 'expectationAlignment',
            width: 150,
            render: (alignment)=>{
                const colorMap = {
                    aligned: 'green',
                    partially_aligned: 'orange',
                    not_aligned: 'red'
                };
                const textMap = {
                    aligned: '已对齐',
                    partially_aligned: '部分对齐',
                    not_aligned: '未对齐'
                };
                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                    color: colorMap[alignment],
                    children: textMap[alignment]
                }, void 0, false, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 270,
                    columnNumber: 11
                }, this);
            }
        },
        {
            title: '交接评价',
            dataIndex: 'handoverRating',
            key: 'handoverRating',
            width: 150,
            render: (rating, record)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                    children: [
                        rating,
                        "分 - ",
                        record.handoverComment
                    ]
                }, void 0, true, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 282,
                    columnNumber: 9
                }, this)
        }
    ];
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            padding: '24px',
            background: '#f5f5f5',
            minHeight: 'calc(100vh - 120px)'
        },
        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
            style: {
                maxWidth: '1400px',
                margin: '0 auto'
            },
            children: [
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        marginBottom: '24px'
                    },
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                        gutter: 16,
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                xs: 24,
                                sm: 8,
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                    style: {
                                        borderRadius: '8px'
                                    },
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                        title: "待处理交接",
                                        value: kpi.pendingCount,
                                        valueStyle: {
                                            fontWeight: 700
                                        }
                                    }, void 0, false, {
                                        fileName: "src/pages/handover/index.tsx",
                                        lineNumber: 303,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/pages/handover/index.tsx",
                                    lineNumber: 302,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 301,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                xs: 24,
                                sm: 8,
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                    style: {
                                        borderRadius: '8px'
                                    },
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                        title: "本月已完成",
                                        value: kpi.completedThisMonth,
                                        valueStyle: {
                                            fontWeight: 700
                                        }
                                    }, void 0, false, {
                                        fileName: "src/pages/handover/index.tsx",
                                        lineNumber: 308,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/pages/handover/index.tsx",
                                    lineNumber: 307,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 306,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                xs: 24,
                                sm: 8,
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                    style: {
                                        borderRadius: '8px'
                                    },
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                        title: "存在风险交接",
                                        value: kpi.riskyCount,
                                        valueStyle: {
                                            fontWeight: 700
                                        }
                                    }, void 0, false, {
                                        fileName: "src/pages/handover/index.tsx",
                                        lineNumber: 313,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/pages/handover/index.tsx",
                                    lineNumber: 312,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 311,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/handover/index.tsx",
                        lineNumber: 300,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 299,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        background: '#fff',
                        borderRadius: '8px',
                        padding: '24px',
                        marginBottom: '24px',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
                    },
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                size: "middle",
                                wrap: true,
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {
                                        allowClear: true,
                                        placeholder: "客户名称: 请输入",
                                        value: searchParams.customerName,
                                        onChange: (e)=>setSearchParams((prev)=>({
                                                    ...prev,
                                                    customerName: e.target.value
                                                })),
                                        style: {
                                            width: 220
                                        },
                                        size: "middle"
                                    }, void 0, false, {
                                        fileName: "src/pages/handover/index.tsx",
                                        lineNumber: 335,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                        allowClear: true,
                                        placeholder: "交接状态: 请选择",
                                        value: searchParams.status,
                                        onChange: (value)=>setSearchParams((prev)=>({
                                                    ...prev,
                                                    status: value
                                                })),
                                        style: {
                                            width: 180
                                        },
                                        size: "middle",
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                value: "pending",
                                                children: "待处理"
                                            }, void 0, false, {
                                                fileName: "src/pages/handover/index.tsx",
                                                lineNumber: 351,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                value: "processing",
                                                children: "处理中"
                                            }, void 0, false, {
                                                fileName: "src/pages/handover/index.tsx",
                                                lineNumber: 352,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                value: "aligned",
                                                children: "已对齐"
                                            }, void 0, false, {
                                                fileName: "src/pages/handover/index.tsx",
                                                lineNumber: 353,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                value: "partially_aligned",
                                                children: "部分对齐"
                                            }, void 0, false, {
                                                fileName: "src/pages/handover/index.tsx",
                                                lineNumber: 354,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/handover/index.tsx",
                                        lineNumber: 343,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                        allowClear: true,
                                        placeholder: "风险等级: 请选择",
                                        value: searchParams.riskLevel,
                                        onChange: (value)=>setSearchParams((prev)=>({
                                                    ...prev,
                                                    riskLevel: value
                                                })),
                                        style: {
                                            width: 180
                                        },
                                        size: "middle",
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                value: "high",
                                                children: "高风险"
                                            }, void 0, false, {
                                                fileName: "src/pages/handover/index.tsx",
                                                lineNumber: 364,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                value: "medium",
                                                children: "中风险"
                                            }, void 0, false, {
                                                fileName: "src/pages/handover/index.tsx",
                                                lineNumber: 365,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                value: "low",
                                                children: "低风险"
                                            }, void 0, false, {
                                                fileName: "src/pages/handover/index.tsx",
                                                lineNumber: 366,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/handover/index.tsx",
                                        lineNumber: 356,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 334,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                size: "small",
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        onClick: handleReset,
                                        children: "重置"
                                    }, void 0, false, {
                                        fileName: "src/pages/handover/index.tsx",
                                        lineNumber: 371,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        type: "primary",
                                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.SearchOutlined, {}, void 0, false, {
                                            fileName: "src/pages/handover/index.tsx",
                                            lineNumber: 376,
                                            columnNumber: 23
                                        }, void 0),
                                        onClick: handleSearch,
                                        children: "查询"
                                    }, void 0, false, {
                                        fileName: "src/pages/handover/index.tsx",
                                        lineNumber: 374,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                        style: {
                                            color: '#1890ff',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        },
                                        children: [
                                            "展开",
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DownOutlined, {
                                                style: {
                                                    fontSize: '12px'
                                                }
                                            }, void 0, false, {
                                                fileName: "src/pages/handover/index.tsx",
                                                lineNumber: 391,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/handover/index.tsx",
                                        lineNumber: 381,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 370,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/handover/index.tsx",
                        lineNumber: 329,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 321,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        background: '#fff',
                        borderRadius: '8px',
                        padding: '24px',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
                    },
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                marginBottom: '16px'
                            },
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                size: "small",
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        type: "primary",
                                        onClick: handleAddHandover,
                                        style: {
                                            borderRadius: '6px',
                                            fontWeight: '500'
                                        },
                                        children: "+ 新建"
                                    }, void 0, false, {
                                        fileName: "src/pages/handover/index.tsx",
                                        lineNumber: 412,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ReloadOutlined, {}, void 0, false, {
                                            fileName: "src/pages/handover/index.tsx",
                                            lineNumber: 419,
                                            columnNumber: 29
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "src/pages/handover/index.tsx",
                                        lineNumber: 419,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DownloadOutlined, {}, void 0, false, {
                                            fileName: "src/pages/handover/index.tsx",
                                            lineNumber: 420,
                                            columnNumber: 29
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "src/pages/handover/index.tsx",
                                        lineNumber: 420,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.SettingOutlined, {}, void 0, false, {
                                            fileName: "src/pages/handover/index.tsx",
                                            lineNumber: 421,
                                            columnNumber: 29
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "src/pages/handover/index.tsx",
                                        lineNumber: 421,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 411,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/pages/handover/index.tsx",
                            lineNumber: 404,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Table, {
                            columns: columns,
                            dataSource: paginatedData,
                            rowKey: "id",
                            pagination: false,
                            size: "small",
                            scroll: {
                                x: 1000
                            },
                            style: {
                                background: '#fff'
                            }
                        }, void 0, false, {
                            fileName: "src/pages/handover/index.tsx",
                            lineNumber: 426,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                textAlign: 'right',
                                marginTop: '16px'
                            },
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Pagination, {
                                current: currentPage,
                                total: filteredData.length,
                                pageSize: pageSize,
                                onChange: setCurrentPage,
                                showSizeChanger: false,
                                showQuickJumper: true,
                                showTotal: (total, range)=>`第 ${range[0]}-${range[1]} 条/共 ${total} 条`
                            }, void 0, false, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 438,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/pages/handover/index.tsx",
                            lineNumber: 437,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 398,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/pages/handover/index.tsx",
            lineNumber: 293,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/pages/handover/index.tsx",
        lineNumber: 288,
        columnNumber: 5
    }, this);
};
_s(HandoverListPage, "FaXQRE/hrEyh3Q3tROmwbIReaKw=", false, function() {
    return [
        _umi.useNavigate,
        _umi.useLocation
    ];
});
_c = HandoverListPage;
var _default = HandoverListPage;
var _c;
$RefreshReg$(_c, "HandoverListPage");
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
//# sourceMappingURL=p__handover__index-async.js.map