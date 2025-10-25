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
const { Title, Text } = _antd.Typography;
const { Option } = _antd.Select;
// 统一的卡片样式 - 参考工作看板的现代风格
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
    const [selectedRowKeys, setSelectedRowKeys] = (0, _react.useState)([]);
    const pageSize = 5; // 一页显示5个数据
    // 搜索筛选状态
    const [searchText, setSearchText] = (0, _react.useState)('');
    const [searchedColumn, setSearchedColumn] = (0, _react.useState)('');
    (0, _react.useRef)(null);
    const [searchParams, setSearchParams] = (0, _react.useState)({
        customerName: '',
        status: undefined,
        riskLevel: undefined
    });
    // 快链相关状态
    const [quickLinks, setQuickLinks] = (0, _react.useState)([
        {
            id: 1,
            name: '实施资料',
            url: 'https://docs.example.com/implementation'
        },
        {
            id: 2,
            name: '用户手册',
            url: 'https://docs.example.com/user-manual'
        }
    ]);
    const [addLinkModalVisible, setAddLinkModalVisible] = (0, _react.useState)(false);
    const [form] = _antd.Form.useForm();
    // 处理分享
    const handleShare = ()=>{
        if (selectedRowKeys.length === 0) {
            _antd.message.warning('请先选择要分享的交接单');
            return;
        }
        _antd.message.success(`已选择 ${selectedRowKeys.length} 个交接单进行分享`);
    };
    // 快链相关处理函数
    const handleQuickLinkClick = (url)=>{
        window.open(url, '_blank');
    };
    const handleAddQuickLink = ()=>{
        setAddLinkModalVisible(true);
    };
    const handleAddLinkSubmit = async ()=>{
        try {
            const values = await form.validateFields();
            const newLink = {
                id: Date.now(),
                name: values.name,
                url: values.url
            };
            setQuickLinks([
                ...quickLinks,
                newLink
            ]);
            setAddLinkModalVisible(false);
            form.resetFields();
            _antd.message.success('快链添加成功');
        } catch (error) {
            console.error('表单验证失败:', error);
        }
    };
    const handleAddLinkCancel = ()=>{
        setAddLinkModalVisible(false);
        form.resetFields();
    };
    // 多选配置
    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys)=>{
            setSelectedRowKeys(newSelectedRowKeys);
        },
        onSelectAll: (selected, selectedRows, changeRows)=>{
            console.log(selected, selectedRows, changeRows);
        }
    };
    // 处理查看详情（可指定默认标签页）
    const handleViewDetail = (record, tabKey)=>{
        const url = tabKey ? `/profiles/handover/${record.id}?tab=${tabKey}` : `/profiles/handover/${record.id}`;
        navigate(url);
    };
    // 根据当前路径决定显示什么内容
    const pathname = location.pathname;
    // 如果是创建页面
    if (pathname === '/profiles/handover/new') return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            padding: '24px',
            background: '#fafafa',
            minHeight: 'calc(100vh - 120px)',
            paddingBottom: '60px' // 为footer留出底部间距
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
                            onClick: ()=>navigate('/profiles/handover-implementation'),
                            style: {
                                border: 'none',
                                padding: 0
                            },
                            children: "返回"
                        }, void 0, false, {
                            fileName: "src/pages/handover/index.tsx",
                            lineNumber: 254,
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
                            lineNumber: 260,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 248,
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
                                lineNumber: 272,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("p", {
                                style: {
                                    color: '#999'
                                },
                                children: "这里将显示创建客户交接的表单内容"
                            }, void 0, false, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 275,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/handover/index.tsx",
                        lineNumber: 271,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 266,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/pages/handover/index.tsx",
            lineNumber: 243,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "src/pages/handover/index.tsx",
        lineNumber: 237,
        columnNumber: 7
    }, this);
    // 如果是详情页面或历史查询页面，不显示列表页内容
    if (pathname.match(/^\/profiles\/handover\/\d+$/) || pathname === '/profiles/handover/history') return null;
    // 过滤数据
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
        const pendingCount = _handoverData.mockCustomerHandovers.length;
        const completedThisMonth = _handoverData.mockCustomerHandovers.filter((item)=>{
            if (item.expectationAlignment !== 'aligned') return false;
            const updated = toDate(item.updatedAt);
            return updated.getFullYear() === currentYear && updated.getMonth() === currentMonth;
        }).length;
        const riskyCount = _handoverData.mockCustomerHandovers.filter((item)=>item.hasRiskAlert).length;
        // 计算本月交接平均满意度（使用handoverRating字段）
        const thisMonthHandovers = _handoverData.mockCustomerHandovers.filter((item)=>{
            const updated = toDate(item.updatedAt);
            return updated.getFullYear() === currentYear && updated.getMonth() === currentMonth;
        });
        const avgSatisfaction = thisMonthHandovers.length > 0 ? (thisMonthHandovers.reduce((sum, item)=>sum + (item.handoverRating || 0), 0) / thisMonthHandovers.length).toFixed(1) : '0.0';
        return {
            pendingCount,
            completedThisMonth,
            riskyCount,
            avgSatisfaction
        };
    }, []);
    // 表格列定义
    const columns = [
        {
            title: '交接单编号',
            dataIndex: 'handoverNumber',
            key: 'handoverNumber',
            width: 120,
            fixed: 'left',
            render: (num, record)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                    style: {
                        fontFamily: 'monospace'
                    },
                    children: num
                }, void 0, false, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 378,
                    columnNumber: 9
                }, this)
        },
        {
            title: '客户名称',
            dataIndex: 'customerName',
            key: 'customerName',
            width: 160,
            fixed: 'left',
            sorter: (a, b)=>a.customerName.localeCompare(b.customerName),
            render: (name, record)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("a", {
                    onClick: ()=>handleViewDetail(record, 'action-plan'),
                    children: name
                }, void 0, false, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 389,
                    columnNumber: 9
                }, this)
        },
        {
            title: '交接状态',
            dataIndex: 'handoverStatus',
            key: 'handoverStatus',
            width: 120,
            sorter: (a, b)=>a.handoverStatus.localeCompare(b.handoverStatus),
            render: (status, record)=>{
                const statusMap = {
                    pending_handover: {
                        text: '待交接',
                        color: 'orange'
                    },
                    handover_in_progress: {
                        text: '交接中',
                        color: 'blue'
                    },
                    pending_implementation: {
                        text: '待实施',
                        color: 'purple'
                    },
                    implementation_in_progress: {
                        text: '实施中',
                        color: 'green'
                    }
                };
                const config = statusMap[status] || {
                    text: status,
                    color: 'default'
                };
                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                    color: config.color,
                    style: {
                        cursor: 'pointer'
                    },
                    onClick: ()=>handleViewDetail(record, 'action-plan'),
                    children: config.text
                }, void 0, false, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 407,
                    columnNumber: 11
                }, this);
            }
        },
        // 隐藏风险提示列
        // {
        //   title: '风险提示',
        //   dataIndex: 'hasRiskAlert',
        //   key: 'hasRiskAlert',
        //   width: 100,
        //   sorter: (a: CustomerHandover, b: CustomerHandover) => Number(a.hasRiskAlert) - Number(b.hasRiskAlert),
        //   render: (hasRisk: boolean, record: CustomerHandover) => {
        //     if (!hasRisk) return <Tag>无风险</Tag>;
        //     const level = record.riskLevel;
        //     const color = riskColorMap[level as keyof typeof riskColorMap] || 'orange';
        //     const text = riskTextMap[level as keyof typeof riskTextMap] || '有风险';
        //     return (
        //       <Tag color={color} style={{ cursor: 'pointer' }} onClick={() => handleViewDetail(record, 'risks-opportunities')}>
        //         {text}
        //       </Tag>
        //     );
        //   },
        // },
        {
            title: '干系人',
            dataIndex: 'stakeholderCount',
            key: 'stakeholderCount',
            width: 80,
            sorter: (a, b)=>(a.stakeholderCount || 0) - (b.stakeholderCount || 0),
            render: (count, record)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
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
                    lineNumber: 439,
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
                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                    color: colorMap[alignment],
                    style: {
                        cursor: 'pointer'
                    },
                    onClick: ()=>handleViewDetail(record, 'expectation-alignment'),
                    children: textMap[alignment]
                }, void 0, false, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 462,
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
        }
    ];
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            padding: '32px 40px',
            background: '#f5f5f5',
            minHeight: 'calc(100vh - 64px)'
        },
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px'
                },
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                                level: 2,
                                style: {
                                    margin: 0,
                                    color: '#262626'
                                },
                                children: "交接实施"
                            }, void 0, false, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 511,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                type: "secondary",
                                children: "确保从销售到服务的丝滑交接与价值对齐"
                            }, void 0, false, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 512,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/handover/index.tsx",
                        lineNumber: 510,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        },
                        children: [
                            quickLinks.map((link)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                    title: link.name,
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        type: "text",
                                        shape: "circle",
                                        size: "large",
                                        icon: link.name === '实施资料' ? /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.FileTextOutlined, {}, void 0, false, {
                                            fileName: "src/pages/handover/index.tsx",
                                            lineNumber: 523,
                                            columnNumber: 50
                                        }, void 0) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.BookOutlined, {}, void 0, false, {
                                            fileName: "src/pages/handover/index.tsx",
                                            lineNumber: 523,
                                            columnNumber: 73
                                        }, void 0),
                                        style: {
                                            width: '44px',
                                            height: '44px',
                                            background: link.name === '实施资料' ? '#1890ff15' : '#52c41a15',
                                            border: `1px solid ${link.name === '实施资料' ? '#1890ff30' : '#52c41a30'}`,
                                            color: link.name === '实施资料' ? '#1890ff' : '#52c41a',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        },
                                        onClick: ()=>handleQuickLinkClick(link.url)
                                    }, void 0, false, {
                                        fileName: "src/pages/handover/index.tsx",
                                        lineNumber: 519,
                                        columnNumber: 19
                                    }, this)
                                }, link.id, false, {
                                    fileName: "src/pages/handover/index.tsx",
                                    lineNumber: 518,
                                    columnNumber: 17
                                }, this)),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                title: "添加快捷链接",
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                    type: "dashed",
                                    shape: "circle",
                                    size: "large",
                                    icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PlusOutlined, {}, void 0, false, {
                                        fileName: "src/pages/handover/index.tsx",
                                        lineNumber: 545,
                                        columnNumber: 25
                                    }, void 0),
                                    style: {
                                        width: '44px',
                                        height: '44px',
                                        borderColor: '#d9d9d9',
                                        color: '#666'
                                    },
                                    onClick: handleAddQuickLink
                                }, void 0, false, {
                                    fileName: "src/pages/handover/index.tsx",
                                    lineNumber: 541,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 540,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/handover/index.tsx",
                        lineNumber: 516,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/pages/handover/index.tsx",
                lineNumber: 504,
                columnNumber: 11
            }, this),
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
                                    ...cardStyle,
                                    marginBottom: 0
                                },
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                    title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                        children: [
                                            "待处理交接",
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                                title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        maxWidth: '300px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                fontWeight: 'bold',
                                                                marginBottom: '8px'
                                                            },
                                                            children: "待处理交接"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 570,
                                                            columnNumber: 29
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '6px'
                                                            },
                                                            children: "含义：当前需要处理的客户交接任务数量"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 571,
                                                            columnNumber: 29
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '6px'
                                                            },
                                                            children: "来源：CRM系统中的交接任务状态"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 572,
                                                            columnNumber: 29
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '6px'
                                                            },
                                                            children: '计算方式：状态为"待处理"的交接记录总数'
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 573,
                                                            columnNumber: 29
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                color: '#ffa940'
                                                            },
                                                            children: "提示：建议优先处理高优先级客户"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 574,
                                                            columnNumber: 29
                                                        }, void 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/handover/index.tsx",
                                                    lineNumber: 569,
                                                    columnNumber: 27
                                                }, void 0),
                                                placement: "top",
                                                overlayStyle: {
                                                    maxWidth: '320px',
                                                    fontSize: '12px'
                                                },
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.QuestionCircleOutlined, {
                                                    style: {
                                                        marginLeft: '8px',
                                                        color: '#8c8c8c',
                                                        fontSize: '14px',
                                                        cursor: 'pointer'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/index.tsx",
                                                    lineNumber: 583,
                                                    columnNumber: 25
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "src/pages/handover/index.tsx",
                                                lineNumber: 567,
                                                columnNumber: 23
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/handover/index.tsx",
                                        lineNumber: 565,
                                        columnNumber: 21
                                    }, void 0),
                                    value: kpi.pendingCount,
                                    valueStyle: {
                                        fontWeight: 700
                                    }
                                }, void 0, false, {
                                    fileName: "src/pages/handover/index.tsx",
                                    lineNumber: 563,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 562,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "src/pages/handover/index.tsx",
                            lineNumber: 561,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            xs: 24,
                            sm: 8,
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                style: {
                                    ...cardStyle,
                                    marginBottom: 0
                                },
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                    title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                        children: [
                                            "本月已完成",
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                                title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        maxWidth: '300px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                fontWeight: 'bold',
                                                                marginBottom: '8px'
                                                            },
                                                            children: "本月已完成"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 608,
                                                            columnNumber: 29
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '6px'
                                                            },
                                                            children: "含义：本月成功完成的客户交接数量"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 609,
                                                            columnNumber: 29
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '6px'
                                                            },
                                                            children: "来源：交接完成时间在本月内的记录"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 610,
                                                            columnNumber: 29
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '6px'
                                                            },
                                                            children: '计算方式：状态为"已完成"且完成时间在本月'
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 611,
                                                            columnNumber: 29
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                color: '#52c41a'
                                                            },
                                                            children: "提示：反映团队本月工作效率"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 612,
                                                            columnNumber: 29
                                                        }, void 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/handover/index.tsx",
                                                    lineNumber: 607,
                                                    columnNumber: 27
                                                }, void 0),
                                                placement: "top",
                                                overlayStyle: {
                                                    maxWidth: '320px',
                                                    fontSize: '12px'
                                                },
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.QuestionCircleOutlined, {
                                                    style: {
                                                        marginLeft: '8px',
                                                        color: '#8c8c8c',
                                                        fontSize: '14px',
                                                        cursor: 'pointer'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/index.tsx",
                                                    lineNumber: 621,
                                                    columnNumber: 25
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "src/pages/handover/index.tsx",
                                                lineNumber: 605,
                                                columnNumber: 23
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/handover/index.tsx",
                                        lineNumber: 603,
                                        columnNumber: 21
                                    }, void 0),
                                    value: kpi.completedThisMonth,
                                    valueStyle: {
                                        fontWeight: 700
                                    }
                                }, void 0, false, {
                                    fileName: "src/pages/handover/index.tsx",
                                    lineNumber: 601,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 600,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "src/pages/handover/index.tsx",
                            lineNumber: 599,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            xs: 24,
                            sm: 8,
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                style: {
                                    ...cardStyle,
                                    marginBottom: 0
                                },
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                    title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                        children: [
                                            "本月交接平均满意度",
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                                title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        maxWidth: '300px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                fontWeight: 'bold',
                                                                marginBottom: '8px'
                                                            },
                                                            children: "本月交接平均满意度"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 684,
                                                            columnNumber: 29
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '6px'
                                                            },
                                                            children: "含义：本月完成交接的客户满意度平均分"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 685,
                                                            columnNumber: 29
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '6px'
                                                            },
                                                            children: "来源：客户交接满意度评分"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 686,
                                                            columnNumber: 29
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '6px'
                                                            },
                                                            children: "计算方式：本月所有交接满意度评分的平均值"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 687,
                                                            columnNumber: 29
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                color: '#1890ff'
                                                            },
                                                            children: "提示：反映交接服务质量水平"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/index.tsx",
                                                            lineNumber: 688,
                                                            columnNumber: 29
                                                        }, void 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/handover/index.tsx",
                                                    lineNumber: 683,
                                                    columnNumber: 27
                                                }, void 0),
                                                placement: "top",
                                                overlayStyle: {
                                                    maxWidth: '320px',
                                                    fontSize: '12px'
                                                },
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.QuestionCircleOutlined, {
                                                    style: {
                                                        marginLeft: '8px',
                                                        color: '#8c8c8c',
                                                        fontSize: '14px',
                                                        cursor: 'pointer'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/index.tsx",
                                                    lineNumber: 697,
                                                    columnNumber: 25
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "src/pages/handover/index.tsx",
                                                lineNumber: 681,
                                                columnNumber: 23
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/handover/index.tsx",
                                        lineNumber: 679,
                                        columnNumber: 21
                                    }, void 0),
                                    value: kpi.avgSatisfaction,
                                    valueStyle: {
                                        fontWeight: 700
                                    }
                                }, void 0, false, {
                                    fileName: "src/pages/handover/index.tsx",
                                    lineNumber: 677,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 676,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "src/pages/handover/index.tsx",
                            lineNumber: 675,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 560,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "src/pages/handover/index.tsx",
                lineNumber: 559,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    ...cardStyle,
                    padding: '24px'
                },
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '16px'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {
                                placeholder: "搜索客户名称或交接单编号",
                                prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.SearchOutlined, {}, void 0, false, {
                                    fileName: "src/pages/handover/index.tsx",
                                    lineNumber: 729,
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
                                lineNumber: 727,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        type: "primary",
                                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ShareAltOutlined, {}, void 0, false, {
                                            fileName: "src/pages/handover/index.tsx",
                                            lineNumber: 739,
                                            columnNumber: 23
                                        }, void 0),
                                        onClick: handleShare,
                                        children: [
                                            "分享",
                                            selectedRowKeys.length > 0 ? ` (${selectedRowKeys.length})` : ''
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/handover/index.tsx",
                                        lineNumber: 737,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        type: "primary",
                                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.HistoryOutlined, {}, void 0, false, {
                                            fileName: "src/pages/handover/index.tsx",
                                            lineNumber: 746,
                                            columnNumber: 23
                                        }, void 0),
                                        onClick: ()=>navigate('/profiles/handover/history'),
                                        children: "历史交接单"
                                    }, void 0, false, {
                                        fileName: "src/pages/handover/index.tsx",
                                        lineNumber: 744,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 736,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/handover/index.tsx",
                        lineNumber: 721,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Table, {
                        columns: columns,
                        dataSource: paginatedData,
                        rowKey: "id",
                        rowSelection: rowSelection,
                        pagination: false,
                        size: "small",
                        scroll: {
                            x: 1200
                        },
                        style: {
                            background: '#fff'
                        }
                    }, void 0, false, {
                        fileName: "src/pages/handover/index.tsx",
                        lineNumber: 755,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '16px'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
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
                                lineNumber: 773,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Pagination, {
                                current: currentPage,
                                total: filteredData.length,
                                pageSize: pageSize,
                                onChange: setCurrentPage,
                                showSizeChanger: false,
                                showQuickJumper: true,
                                showTotal: (total, range)=>`第 ${range[0]}-${range[1]} 条/共 ${total} 条`
                            }, void 0, false, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 776,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/handover/index.tsx",
                        lineNumber: 767,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/pages/handover/index.tsx",
                lineNumber: 717,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Modal, {
                title: "添加快链",
                open: addLinkModalVisible,
                onOk: handleAddLinkSubmit,
                onCancel: handleAddLinkCancel,
                okText: "确定",
                cancelText: "取消",
                width: 500,
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form, {
                    form: form,
                    layout: "vertical",
                    style: {
                        marginTop: '20px'
                    },
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            name: "name",
                            label: "快链名称",
                            rules: [
                                {
                                    required: true,
                                    message: '请输入快链名称'
                                },
                                {
                                    max: 20,
                                    message: '快链名称不能超过20个字符'
                                }
                            ],
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {
                                placeholder: "请输入快链名称"
                            }, void 0, false, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 813,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/pages/handover/index.tsx",
                            lineNumber: 805,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            name: "url",
                            label: "链接地址",
                            rules: [
                                {
                                    required: true,
                                    message: '请输入链接地址'
                                },
                                {
                                    type: 'url',
                                    message: '请输入有效的URL地址'
                                }
                            ],
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {
                                placeholder: "请输入链接地址，如：https://example.com"
                            }, void 0, false, {
                                fileName: "src/pages/handover/index.tsx",
                                lineNumber: 824,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/pages/handover/index.tsx",
                            lineNumber: 816,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/pages/handover/index.tsx",
                    lineNumber: 800,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/pages/handover/index.tsx",
                lineNumber: 791,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/pages/handover/index.tsx",
        lineNumber: 498,
        columnNumber: 5
    }, this);
};
_s(HandoverListPage, "xg7/xvhXCCxVGyTkyQlVmwrOYxY=", false, function() {
    return [
        _umi.useNavigate,
        _umi.useLocation,
        _antd.Form.useForm
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