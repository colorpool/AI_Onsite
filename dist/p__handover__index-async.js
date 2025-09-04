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
var _reactrefresh = _interop_require_wildcard._(__mako_require__("node_modules/react-refresh/runtime.js"));
var _jsxdevruntime = __mako_require__("node_modules/react/jsx-dev-runtime.js");
var _react = _interop_require_wildcard._(__mako_require__("node_modules/react/index.js"));
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
const { Title, Text } = _antd.Typography;
const { Option } = _antd.Select;
const cardStyle = {
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    border: '1px solid #f0f0f0',
    background: '#ffffff',
    marginBottom: '16px'
};
const HandoverListPage = ()=>{
    _s();
    const navigate = (0, _umi.useNavigate)();
    const location = (0, _umi.useLocation)();
    const [currentPage, setCurrentPage] = (0, _react.useState)(1);
    const pageSize = 5;
    const [searchText, setSearchText] = (0, _react.useState)('');
    const [searchedColumn, setSearchedColumn] = (0, _react.useState)('');
    (0, _react.useRef)(null);
    const [searchParams, setSearchParams] = (0, _react.useState)({
        customerName: '',
        status: undefined,
        riskLevel: undefined
    });
    const handleViewDetail = (record, tabKey)=>{
        const url = tabKey ? `/profiles/handover/${record.id}?tab=${tabKey}` : `/profiles/handover/${record.id}`;
        navigate(url);
    };
    const pathname = location.pathname;
    if (pathname === '/profiles/handover/new') return (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            padding: '24px',
            background: '#fafafa',
            minHeight: 'calc(100vh - 120px)',
            paddingBottom: '60px'
        },
        children: (0, _jsxdevruntime.jsxDEV)("div", {
            style: {
                maxWidth: '1000px',
                margin: '0 auto'
            },
            children: [
                (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '24px',
                        gap: '16px'
                    },
                    children: [
                        (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                            onClick: ()=>navigate('/profiles/handover-implementation'),
                            style: {
                                border: 'none',
                                padding: 0
                            },
                            children: "返回"
                        }, void 0, false, {
                            fileName: "src/pages/handover/index.tsx",
                            lineNumber: 193,
                            columnNumber: 13
                        }, this),
                        (0, _jsxdevruntime.jsxDEV)(Title, {
                            level: 3,
                            style: {
                                margin: 0,
                                color: '#262626',
                                fontSize: '18px'
                            },
                            children: "创建新客户交接"
                        }, void 0, false, {
                            fileName: "src/pages/handover/index.tsx",
                            lineNumber: 199,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 187,
                    columnNumber: 11
                }, this),
                (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        background: '#fff',
                        borderRadius: '8px',
                        padding: '24px'
                    },
                    children: (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            textAlign: 'center',
                            padding: '40px'
                        },
                        children: [
                            (0, _jsxdevruntime.jsxDEV)(Title, {
                                level: 4,
                                style: {
                                    color: '#666'
                                },
                                children: "创建客户交接表单"
                            }, void 0, false, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 211,
                                columnNumber: 15
                            }, this),
                            (0, _jsxdevruntime.jsxDEV)("p", {
                                style: {
                                    color: '#999'
                                },
                                children: "这里将显示创建客户交接的表单内容"
                            }, void 0, false, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 214,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/handover/index.tsx",
                        lineNumber: 210,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 205,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/pages/handover/index.tsx",
            lineNumber: 182,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "src/pages/handover/index.tsx",
        lineNumber: 176,
        columnNumber: 7
    }, this);
    if (pathname.match(/^\/profiles\/handover\/\d+$/) || pathname === '/profiles/handover/history') return null;
    const filteredData = (0, _react.useMemo)(()=>{
        return _handoverData.mockCustomerHandovers.filter((item)=>{
            var _item_customerName, _item_handoverNumber;
            const text = (searchText || '').trim().toLowerCase();
            const matchText = !text || ((_item_customerName = item.customerName) === null || _item_customerName === void 0 ? void 0 : _item_customerName.toLowerCase().includes(text)) || ((_item_handoverNumber = item.handoverNumber) === null || _item_handoverNumber === void 0 ? void 0 : _item_handoverNumber.toLowerCase().includes(text));
            const matchName = !searchParams.customerName || item.customerName.includes(searchParams.customerName);
            const matchStatus = !searchParams.status || item.handoverStatus === searchParams.status;
            const matchRisk = !searchParams.riskLevel || item.riskLevel === searchParams.riskLevel;
            return matchText && matchName && matchStatus && matchRisk;
        });
    }, [
        searchParams,
        searchText
    ]);
    const paginatedData = (0, _react.useMemo)(()=>{
        const startIndex = (currentPage - 1) * pageSize;
        return filteredData.slice(startIndex, startIndex + pageSize);
    }, [
        filteredData,
        currentPage
    ]);
    const kpi = (0, _react.useMemo)(()=>{
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
        const toDate = (s)=>new Date(s.replace(/-/g, '/'));
        const pendingCount = _handoverData.mockCustomerHandovers.filter((item)=>item.handoverStatus === 'not_handover').length;
        const completedThisMonth = _handoverData.mockCustomerHandovers.filter((item)=>{
            if (item.expectationAlignment !== 'aligned') return false;
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
    const columns = [
        {
            title: '交接单编号',
            dataIndex: 'handoverNumber',
            key: 'handoverNumber',
            width: 120,
            render: (num, record)=>(0, _jsxdevruntime.jsxDEV)("span", {
                    style: {
                        fontFamily: 'monospace'
                    },
                    children: num
                }, void 0, false, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 307,
                    columnNumber: 9
                }, this)
        },
        {
            title: '客户名称',
            dataIndex: 'customerName',
            key: 'customerName',
            width: 220,
            sorter: (a, b)=>a.customerName.localeCompare(b.customerName),
            render: (name, record)=>(0, _jsxdevruntime.jsxDEV)("a", {
                    onClick: ()=>handleViewDetail(record, 'basic-info'),
                    children: name
                }, void 0, false, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 317,
                    columnNumber: 9
                }, this)
        },
        {
            title: '交接单',
            dataIndex: 'hasHandoverDocument',
            key: 'hasHandoverDocument',
            width: 80,
            sorter: (a, b)=>Number(a.hasHandoverDocument) - Number(b.hasHandoverDocument),
            render: (hasDocument, record)=>hasDocument ? (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                    color: "blue",
                    style: {
                        cursor: 'pointer'
                    },
                    onClick: ()=>handleViewDetail(record, 'action-plan'),
                    children: "有"
                }, void 0, false, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 328,
                    columnNumber: 11
                }, this) : (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                    children: "无"
                }, void 0, false, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 330,
                    columnNumber: 11
                }, this)
        },
        {
            title: '风险提示',
            dataIndex: 'hasRiskAlert',
            key: 'hasRiskAlert',
            width: 100,
            sorter: (a, b)=>Number(a.hasRiskAlert) - Number(b.hasRiskAlert),
            render: (hasRisk, record)=>{
                if (!hasRisk) return (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                    children: "无风险"
                }, void 0, false, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 341,
                    columnNumber: 30
                }, this);
                const level = record.riskLevel;
                const color = riskColorMap[level] || 'orange';
                const text = riskTextMap[level] || '有风险';
                return (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                    color: color,
                    style: {
                        cursor: 'pointer'
                    },
                    onClick: ()=>handleViewDetail(record, 'risks-opportunities'),
                    children: text
                }, void 0, false, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 346,
                    columnNumber: 11
                }, this);
            }
        },
        {
            title: '干系人',
            dataIndex: 'stakeholderCount',
            key: 'stakeholderCount',
            width: 100,
            sorter: (a, b)=>(a.stakeholderCount || 0) - (b.stakeholderCount || 0),
            render: (count, record)=>(0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                    color: "purple",
                    style: {
                        cursor: 'pointer'
                    },
                    onClick: ()=>handleViewDetail(record, 'stakeholders'),
                    children: [
                        count,
                        " 人"
                    ]
                }, void 0, true, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 359,
                    columnNumber: 9
                }, this)
        },
        {
            title: '客户期望对齐',
            dataIndex: 'expectationAlignment',
            key: 'expectationAlignment',
            width: 120,
            sorter: (a, b)=>a.expectationAlignment.localeCompare(b.expectationAlignment),
            render: (alignment, record)=>{
                const colorMap = {
                    aligned: 'green',
                    partially_aligned: 'gold',
                    not_aligned: 'red'
                };
                const textMap = {
                    aligned: '已对齐',
                    partially_aligned: '部分对齐',
                    not_aligned: '未对齐'
                };
                return (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                    color: colorMap[alignment],
                    style: {
                        cursor: 'pointer'
                    },
                    onClick: ()=>handleViewDetail(record, 'expectation-alignment'),
                    children: textMap[alignment]
                }, void 0, false, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 382,
                    columnNumber: 11
                }, this);
            }
        },
        {
            title: '销售创建时间',
            dataIndex: 'salesCreatedAt',
            key: 'salesCreatedAt',
            width: 120,
            sorter: (a, b)=>new Date(a.salesCreatedAt || '').getTime() - new Date(b.salesCreatedAt || '').getTime(),
            render: (date)=>date ? new Date(date).toLocaleDateString() : '-'
        },
        {
            title: '客户满意度',
            dataIndex: 'handoverRating',
            key: 'handoverRating',
            width: 150,
            sorter: (a, b)=>(a.handoverRating || 0) - (b.handoverRating || 0),
            render: (rating, record)=>(0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    },
                    children: [
                        (0, _jsxdevruntime.jsxDEV)(_antd.Rate, {
                            disabled: true,
                            value: rating,
                            style: {
                                fontSize: '16px'
                            }
                        }, void 0, false, {
                            fileName: "src/pages/handover/index.tsx",
                            lineNumber: 404,
                            columnNumber: 11
                        }, this),
                        (0, _jsxdevruntime.jsxDEV)("span", {
                            style: {
                                color: '#1890ff',
                                fontWeight: '500'
                            },
                            children: rating
                        }, void 0, false, {
                            fileName: "src/pages/handover/index.tsx",
                            lineNumber: 409,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 403,
                    columnNumber: 9
                }, this)
        }
    ];
    return (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            padding: '32px 40px',
            background: '#f5f5f5',
            minHeight: 'calc(100vh - 64px)'
        },
        children: [
            (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px'
                },
                children: [
                    (0, _jsxdevruntime.jsxDEV)("div", {
                        children: [
                            (0, _jsxdevruntime.jsxDEV)(Title, {
                                level: 2,
                                style: {
                                    margin: 0,
                                    color: '#262626'
                                },
                                children: "交接实施"
                            }, void 0, false, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 431,
                                columnNumber: 15
                            }, this),
                            (0, _jsxdevruntime.jsxDEV)(Text, {
                                type: "secondary",
                                children: "确保从销售到服务的丝滑交接与价值对齐"
                            }, void 0, false, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 432,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/handover/index.tsx",
                        lineNumber: 430,
                        columnNumber: 13
                    }, this),
                    (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        },
                        children: (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                            title: "历史交接查询",
                            children: (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                type: "text",
                                shape: "circle",
                                size: "large",
                                icon: (0, _jsxdevruntime.jsxDEV)(_icons.HistoryOutlined, {}, void 0, false, {
                                    fileName: "src/pages/handover/index.tsx",
                                    lineNumber: 442,
                                    columnNumber: 25
                                }, void 0),
                                style: {
                                    width: '44px',
                                    height: '44px',
                                    background: '#1890ff15',
                                    border: '1px solid #1890ff30',
                                    color: '#1890ff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                },
                                onClick: ()=>navigate('/profiles/handover/history')
                            }, void 0, false, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 438,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "src/pages/handover/index.tsx",
                            lineNumber: 437,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "src/pages/handover/index.tsx",
                        lineNumber: 436,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/pages/handover/index.tsx",
                lineNumber: 424,
                columnNumber: 11
            }, this),
            (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    marginBottom: '24px'
                },
                children: (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                    gutter: 16,
                    children: [
                        (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            xs: 24,
                            sm: 8,
                            children: (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                style: {
                                    ...cardStyle,
                                    marginBottom: 0
                                },
                                children: (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                    title: (0, _jsxdevruntime.jsxDEV)("span", {
                                        children: [
                                            "待处理交接",
                                            (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                                title: (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        maxWidth: '300px'
                                                    },
                                                    children: [
                                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                fontWeight: 'bold',
                                                                marginBottom: '8px'
                                                            },
                                                            children: "待处理交接"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 471,
                                                            columnNumber: 29
                                                        }, void 0),
                                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '6px'
                                                            },
                                                            children: "含义：当前需要处理的客户交接任务数量"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 472,
                                                            columnNumber: 29
                                                        }, void 0),
                                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '6px'
                                                            },
                                                            children: "来源：CRM系统中的交接任务状态"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 473,
                                                            columnNumber: 29
                                                        }, void 0),
                                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '6px'
                                                            },
                                                            children: '计算方式：状态为"待处理"的交接记录总数'
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 474,
                                                            columnNumber: 29
                                                        }, void 0),
                                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                color: '#ffa940'
                                                            },
                                                            children: "提示：建议优先处理高优先级客户"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 475,
                                                            columnNumber: 29
                                                        }, void 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/handover/index.tsx",
                                                    lineNumber: 470,
                                                    columnNumber: 27
                                                }, void 0),
                                                placement: "top",
                                                overlayStyle: {
                                                    maxWidth: '320px',
                                                    fontSize: '12px'
                                                },
                                                children: (0, _jsxdevruntime.jsxDEV)(_icons.QuestionCircleOutlined, {
                                                    style: {
                                                        marginLeft: '8px',
                                                        color: '#8c8c8c',
                                                        fontSize: '14px',
                                                        cursor: 'pointer'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/index.tsx",
                                                    lineNumber: 484,
                                                    columnNumber: 25
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "src/pages/handover/index.tsx",
                                                lineNumber: 468,
                                                columnNumber: 23
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/handover/index.tsx",
                                        lineNumber: 466,
                                        columnNumber: 21
                                    }, void 0),
                                    value: kpi.pendingCount,
                                    valueStyle: {
                                        fontWeight: 700
                                    }
                                }, void 0, false, {
                                    fileName: "src/pages/handover/index.tsx",
                                    lineNumber: 464,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 463,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "src/pages/handover/index.tsx",
                            lineNumber: 462,
                            columnNumber: 13
                        }, this),
                        (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            xs: 24,
                            sm: 8,
                            children: (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                style: {
                                    ...cardStyle,
                                    marginBottom: 0
                                },
                                children: (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                    title: (0, _jsxdevruntime.jsxDEV)("span", {
                                        children: [
                                            "本月已完成",
                                            (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                                title: (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        maxWidth: '300px'
                                                    },
                                                    children: [
                                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                fontWeight: 'bold',
                                                                marginBottom: '8px'
                                                            },
                                                            children: "本月已完成"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 509,
                                                            columnNumber: 29
                                                        }, void 0),
                                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '6px'
                                                            },
                                                            children: "含义：本月成功完成的客户交接数量"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 510,
                                                            columnNumber: 29
                                                        }, void 0),
                                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '6px'
                                                            },
                                                            children: "来源：交接完成时间在本月内的记录"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 511,
                                                            columnNumber: 29
                                                        }, void 0),
                                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '6px'
                                                            },
                                                            children: '计算方式：状态为"已完成"且完成时间在本月'
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 512,
                                                            columnNumber: 29
                                                        }, void 0),
                                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                color: '#52c41a'
                                                            },
                                                            children: "提示：反映团队本月工作效率"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 513,
                                                            columnNumber: 29
                                                        }, void 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/handover/index.tsx",
                                                    lineNumber: 508,
                                                    columnNumber: 27
                                                }, void 0),
                                                placement: "top",
                                                overlayStyle: {
                                                    maxWidth: '320px',
                                                    fontSize: '12px'
                                                },
                                                children: (0, _jsxdevruntime.jsxDEV)(_icons.QuestionCircleOutlined, {
                                                    style: {
                                                        marginLeft: '8px',
                                                        color: '#8c8c8c',
                                                        fontSize: '14px',
                                                        cursor: 'pointer'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/index.tsx",
                                                    lineNumber: 522,
                                                    columnNumber: 25
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "src/pages/handover/index.tsx",
                                                lineNumber: 506,
                                                columnNumber: 23
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/handover/index.tsx",
                                        lineNumber: 504,
                                        columnNumber: 21
                                    }, void 0),
                                    value: kpi.completedThisMonth,
                                    valueStyle: {
                                        fontWeight: 700
                                    }
                                }, void 0, false, {
                                    fileName: "src/pages/handover/index.tsx",
                                    lineNumber: 502,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 501,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "src/pages/handover/index.tsx",
                            lineNumber: 500,
                            columnNumber: 13
                        }, this),
                        (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            xs: 24,
                            sm: 8,
                            children: (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                style: {
                                    ...cardStyle,
                                    marginBottom: 0
                                },
                                children: (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                    title: (0, _jsxdevruntime.jsxDEV)("span", {
                                        children: [
                                            "存在风险交接",
                                            (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                                title: (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        maxWidth: '300px'
                                                    },
                                                    children: [
                                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                fontWeight: 'bold',
                                                                marginBottom: '8px'
                                                            },
                                                            children: "存在风险交接"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 547,
                                                            columnNumber: 29
                                                        }, void 0),
                                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '6px'
                                                            },
                                                            children: "含义：需要特别关注的潜在风险交接"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 548,
                                                            columnNumber: 29
                                                        }, void 0),
                                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '6px'
                                                            },
                                                            children: "来源：风险评估系统自动识别"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 549,
                                                            columnNumber: 29
                                                        }, void 0),
                                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '6px'
                                                            },
                                                            children: '计算方式：风险等级为"中"或"高"的交接'
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 550,
                                                            columnNumber: 29
                                                        }, void 0),
                                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                color: '#ff4d4f'
                                                            },
                                                            children: "提示：建议优先处理，避免客户流失"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 551,
                                                            columnNumber: 29
                                                        }, void 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/handover/index.tsx",
                                                    lineNumber: 546,
                                                    columnNumber: 27
                                                }, void 0),
                                                placement: "top",
                                                overlayStyle: {
                                                    maxWidth: '320px',
                                                    fontSize: '12px'
                                                },
                                                children: (0, _jsxdevruntime.jsxDEV)(_icons.QuestionCircleOutlined, {
                                                    style: {
                                                        marginLeft: '8px',
                                                        color: '#8c8c8c',
                                                        fontSize: '14px',
                                                        cursor: 'pointer'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/index.tsx",
                                                    lineNumber: 560,
                                                    columnNumber: 25
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "src/pages/handover/index.tsx",
                                                lineNumber: 544,
                                                columnNumber: 23
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/handover/index.tsx",
                                        lineNumber: 542,
                                        columnNumber: 21
                                    }, void 0),
                                    value: kpi.riskyCount,
                                    valueStyle: {
                                        fontWeight: 700
                                    }
                                }, void 0, false, {
                                    fileName: "src/pages/handover/index.tsx",
                                    lineNumber: 540,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 539,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "src/pages/handover/index.tsx",
                            lineNumber: 538,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 461,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "src/pages/handover/index.tsx",
                lineNumber: 460,
                columnNumber: 9
            }, this),
            (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    ...cardStyle,
                    padding: '24px'
                },
                children: [
                    (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '16px'
                        },
                        children: [
                            (0, _jsxdevruntime.jsxDEV)(_antd.Input, {
                                placeholder: "搜索客户名称或交接单编号",
                                prefix: (0, _jsxdevruntime.jsxDEV)(_icons.SearchOutlined, {}, void 0, false, {
                                    fileName: "src/pages/handover/index.tsx",
                                    lineNumber: 592,
                                    columnNumber: 23
                                }, void 0),
                                value: searchText,
                                onChange: (e)=>setSearchText(e.target.value),
                                allowClear: true,
                                style: {
                                    width: 300,
                                    borderRadius: '6px'
                                }
                            }, void 0, false, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 590,
                                columnNumber: 13
                            }, this),
                            (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                size: "small",
                                children: [
                                    (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        icon: (0, _jsxdevruntime.jsxDEV)(_icons.ReloadOutlined, {}, void 0, false, {
                                            fileName: "src/pages/handover/index.tsx",
                                            lineNumber: 601,
                                            columnNumber: 23
                                        }, void 0),
                                        onClick: ()=>{
                                            setSearchText('');
                                            setSearchedColumn('');
                                            setSearchParams({
                                                customerName: '',
                                                status: undefined,
                                                riskLevel: undefined
                                            });
                                            setCurrentPage(1);
                                            _antd.message.success('已重置所有筛选条件');
                                        },
                                        title: "重置所有筛选条件"
                                    }, void 0, false, {
                                        fileName: "src/pages/handover/index.tsx",
                                        lineNumber: 600,
                                        columnNumber: 15
                                    }, this),
                                    (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        icon: (0, _jsxdevruntime.jsxDEV)(_icons.DownloadOutlined, {}, void 0, false, {
                                            fileName: "src/pages/handover/index.tsx",
                                            lineNumber: 616,
                                            columnNumber: 29
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "src/pages/handover/index.tsx",
                                        lineNumber: 616,
                                        columnNumber: 15
                                    }, this),
                                    (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        icon: (0, _jsxdevruntime.jsxDEV)(_icons.SettingOutlined, {}, void 0, false, {
                                            fileName: "src/pages/handover/index.tsx",
                                            lineNumber: 617,
                                            columnNumber: 29
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "src/pages/handover/index.tsx",
                                        lineNumber: 617,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 599,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/handover/index.tsx",
                        lineNumber: 584,
                        columnNumber: 11
                    }, this),
                    (0, _jsxdevruntime.jsxDEV)(_antd.Table, {
                        columns: columns,
                        dataSource: paginatedData,
                        rowKey: "id",
                        pagination: false,
                        size: "small",
                        scroll: {
                            x: 900
                        },
                        style: {
                            background: '#fff'
                        }
                    }, void 0, false, {
                        fileName: "src/pages/handover/index.tsx",
                        lineNumber: 622,
                        columnNumber: 11
                    }, this),
                    (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '16px'
                        },
                        children: [
                            (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    color: '#666',
                                    fontSize: '14px'
                                },
                                children: [
                                    "共 ",
                                    filteredData.length,
                                    " 条记录"
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 639,
                                columnNumber: 13
                            }, this),
                            (0, _jsxdevruntime.jsxDEV)(_antd.Pagination, {
                                current: currentPage,
                                total: filteredData.length,
                                pageSize: pageSize,
                                onChange: setCurrentPage,
                                showSizeChanger: false,
                                showQuickJumper: true,
                                showTotal: (total, range)=>`第 ${range[0]}-${range[1]} 条/共 ${total} 条`
                            }, void 0, false, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 642,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/handover/index.tsx",
                        lineNumber: 633,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/pages/handover/index.tsx",
                lineNumber: 580,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/pages/handover/index.tsx",
        lineNumber: 418,
        columnNumber: 5
    }, this);
};
_s(HandoverListPage, "NpiywVuqEzd+emI7ROUx/HB+hxU=", false, function() {
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