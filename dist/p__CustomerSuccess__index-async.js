((typeof globalThis !== 'undefined' ? globalThis : self)["makoChunk_ant-design-pro"] = (typeof globalThis !== 'undefined' ? globalThis : self)["makoChunk_ant-design-pro"] || []).push([
        ['p__CustomerSuccess__index'],
{ "src/components/CustomerSuccess/ChannelEcosystemTab.tsx": function (module, exports, __mako_require__){
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
const { Option } = _antd.Select;
const { Title, Text } = _antd.Typography;
const ChannelEcosystemTab = ({ customers, onCustomerClick, onExport })=>{
    _s();
    const [period, setPeriod] = (0, _react.useState)('current');
    const [channelType, setChannelType] = (0, _react.useState)('all');
    const [riskMetric, setRiskMetric] = (0, _react.useState)('ratio');
    const [selectedTags, setSelectedTags] = (0, _react.useState)([]);
    const [tagLogic, setTagLogic] = (0, _react.useState)('OR');
    const [drawerVisible, setDrawerVisible] = (0, _react.useState)(false);
    const [selectedCell, setSelectedCell] = (0, _react.useState)(null);
    const [loading, setLoading] = (0, _react.useState)(false);
    // 生成矩阵数据
    const generateMatrixData = ()=>{
        const industries = [
            '制造业',
            '金融',
            '零售',
            '医疗',
            '教育',
            '政府'
        ];
        const sizes = [
            'small',
            'medium',
            'large',
            'xlarge'
        ];
        const sizeLabels = {
            small: '小型',
            medium: '中型',
            large: '大型',
            xlarge: '超大型'
        };
        const matrix = [];
        industries.forEach((industry)=>{
            sizes.forEach((size)=>{
                const cellCustomers = customers.filter((c)=>c.industry === industry && c.size === size);
                const channelCustomers = cellCustomers.filter((c)=>c.isChannelCustomer);
                const riskCustomers = cellCustomers.filter((c)=>c.riskLevel === 'risk');
                const totalARR = cellCustomers.reduce((sum, c)=>sum + c.arr, 0);
                const channelARR = channelCustomers.reduce((sum, c)=>sum + c.arr, 0);
                let ratio = 0;
                if (riskMetric === 'ratio') ratio = cellCustomers.length > 0 ? channelCustomers.length / cellCustomers.length * 100 : 0;
                else if (riskMetric === 'arr_ratio') ratio = totalARR > 0 ? channelARR / totalARR * 100 : 0;
                else ratio = cellCustomers.length > 0 ? riskCustomers.length / cellCustomers.length * 100 : 0;
                matrix.push({
                    industry,
                    size: sizeLabels[size],
                    channelRatio: ratio,
                    totalCustomers: cellCustomers.length,
                    channelCustomers: channelCustomers.length,
                    totalARR,
                    channelARR,
                    riskCustomers: riskCustomers.length
                });
            });
        });
        return matrix;
    };
    // 生成生态标签数据
    const generateEcosystemTags = ()=>{
        const tagMap = new Map();
        customers.forEach((customer)=>{
            customer.tags.forEach((tag)=>{
                if (!tagMap.has(tag)) tagMap.set(tag, {
                    customers: [],
                    arr: 0,
                    events: 0
                });
                const tagData = tagMap.get(tag);
                tagData.customers.push(customer);
                tagData.arr += customer.arr;
                tagData.events += customer.collaborationEvents;
            });
        });
        const colors = [
            '#1890ff',
            '#52c41a',
            '#faad14',
            '#f5222d',
            '#722ed1',
            '#13c2c2',
            '#eb2f96',
            '#fa8c16'
        ];
        return Array.from(tagMap.entries()).map(([name, data], index)=>({
                name,
                count: data.customers.length,
                arr: data.arr,
                events: data.events,
                color: colors[index % colors.length]
            }));
    };
    // 获取热力图颜色
    const getHeatmapColor = (ratio)=>{
        if (ratio === 0) return '#f5f5f5';
        if (ratio <= 20) return '#fff7e6';
        if (ratio <= 40) return '#ffd591';
        if (ratio <= 60) return '#ffb347';
        if (ratio <= 80) return '#ff8c00';
        return '#ff4500';
    };
    // 筛选客户列表
    const getFilteredCustomers = ()=>{
        let filtered = customers;
        if (selectedTags.length > 0) filtered = customers.filter((customer)=>{
            if (tagLogic === 'AND') return selectedTags.every((tag)=>customer.tags.includes(tag));
            else return selectedTags.some((tag)=>customer.tags.includes(tag));
        });
        return filtered;
    };
    const matrixData = generateMatrixData();
    const ecosystemTags = generateEcosystemTags();
    const filteredCustomers = getFilteredCustomers();
    // 表格列配置
    const columns = [
        {
            title: '客户名称',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            width: 200,
            render: (text, record)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                cursor: 'pointer',
                                color: '#1890ff'
                            },
                            onClick: ()=>onCustomerClick === null || onCustomerClick === void 0 ? void 0 : onCustomerClick(record),
                            children: text
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                            lineNumber: 192,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                fontSize: 12,
                                color: '#8c8c8c'
                            },
                            children: record.isChannelCustomer && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                color: "blue",
                                children: "渠道"
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                lineNumber: 199,
                                columnNumber: 42
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                            lineNumber: 198,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                    lineNumber: 191,
                    columnNumber: 9
                }, this)
        },
        {
            title: '行业',
            dataIndex: 'industry',
            key: 'industry',
            width: 100
        },
        {
            title: 'ARR',
            dataIndex: 'arr',
            key: 'arr',
            width: 120,
            render: (value)=>`¥${(value / 10000).toFixed(1)}万`,
            sorter: (a, b)=>a.arr - b.arr
        },
        {
            title: '负责人CSM',
            dataIndex: 'csm',
            key: 'csm',
            width: 120
        },
        {
            title: '近90天协作事件数',
            dataIndex: 'collaborationEvents',
            key: 'collaborationEvents',
            width: 150,
            render: (value)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                    style: {
                        color: value > 10 ? '#52c41a' : value > 5 ? '#faad14' : '#8c8c8c'
                    },
                    children: value
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                    lineNumber: 230,
                    columnNumber: 9
                }, this),
            sorter: (a, b)=>a.collaborationEvents - b.collaborationEvents
        },
        {
            title: '标签',
            dataIndex: 'tags',
            key: 'tags',
            width: 200,
            render: (tags)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    children: [
                        tags.slice(0, 3).map((tag)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                style: {
                                    marginBottom: 2
                                },
                                children: tag
                            }, tag, false, {
                                fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                lineNumber: 244,
                                columnNumber: 13
                            }, this)),
                        tags.length > 3 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                            children: [
                                "+",
                                tags.length - 3
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                            lineNumber: 249,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                    lineNumber: 242,
                    columnNumber: 9
                }, this)
        }
    ];
    // 处理矩阵单元格点击
    const handleCellClick = (cell)=>{
        setSelectedCell(cell);
        setDrawerVisible(true);
    };
    // 处理标签点击
    const handleTagClick = (tagName)=>{
        setSelectedTags((prev)=>{
            if (prev.includes(tagName)) return prev.filter((t)=>t !== tagName);
            else return [
                ...prev,
                tagName
            ];
        });
    };
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            padding: '0 24px'
        },
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                title: "渠道客户风险矩阵",
                style: {
                    marginBottom: 24
                },
                extra: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                            value: period,
                            onChange: setPeriod,
                            style: {
                                width: 120
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                    value: "current",
                                    children: "本季"
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                    lineNumber: 282,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                    value: "previous",
                                    children: "上季"
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                    lineNumber: 283,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                    value: "yoy",
                                    children: "同比"
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                    lineNumber: 284,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                            lineNumber: 281,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                            value: channelType,
                            onChange: setChannelType,
                            style: {
                                width: 120
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                    value: "all",
                                    children: "全部"
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                    lineNumber: 287,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                    value: "direct",
                                    children: "直销"
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                    lineNumber: 288,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                    value: "partner",
                                    children: "代理"
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                    lineNumber: 289,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                    value: "reseller",
                                    children: "联合"
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                    lineNumber: 290,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                            lineNumber: 286,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                            value: riskMetric,
                            onChange: setRiskMetric,
                            style: {
                                width: 140
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                    value: "ratio",
                                    children: "渠道占比"
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                    lineNumber: 293,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                    value: "arr_ratio",
                                    children: "ARR占比"
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                    lineNumber: 294,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                    value: "risk_ratio",
                                    children: "风险客户占比"
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                    lineNumber: 295,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                            lineNumber: 292,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                    lineNumber: 280,
                    columnNumber: 11
                }, void 0),
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        overflowX: 'auto'
                    },
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("table", {
                        style: {
                            width: '100%',
                            borderCollapse: 'collapse'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("thead", {
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("th", {
                                            style: {
                                                padding: '8px',
                                                border: '1px solid #f0f0f0',
                                                background: '#fafafa'
                                            },
                                            children: "行业\\规模"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                            lineNumber: 304,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("th", {
                                            style: {
                                                padding: '8px',
                                                border: '1px solid #f0f0f0',
                                                background: '#fafafa'
                                            },
                                            children: "小型"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                            lineNumber: 305,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("th", {
                                            style: {
                                                padding: '8px',
                                                border: '1px solid #f0f0f0',
                                                background: '#fafafa'
                                            },
                                            children: "中型"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                            lineNumber: 306,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("th", {
                                            style: {
                                                padding: '8px',
                                                border: '1px solid #f0f0f0',
                                                background: '#fafafa'
                                            },
                                            children: "大型"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                            lineNumber: 307,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("th", {
                                            style: {
                                                padding: '8px',
                                                border: '1px solid #f0f0f0',
                                                background: '#fafafa'
                                            },
                                            children: "超大型"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                            lineNumber: 308,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                    lineNumber: 303,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                lineNumber: 302,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("tbody", {
                                children: [
                                    '制造业',
                                    '金融',
                                    '零售',
                                    '医疗',
                                    '教育',
                                    '政府'
                                ].map((industry)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("td", {
                                                style: {
                                                    padding: '8px',
                                                    border: '1px solid #f0f0f0',
                                                    background: '#fafafa',
                                                    fontWeight: 500
                                                },
                                                children: industry
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                lineNumber: 314,
                                                columnNumber: 19
                                            }, this),
                                            [
                                                '小型',
                                                '中型',
                                                '大型',
                                                '超大型'
                                            ].map((size)=>{
                                                const cell = matrixData.find((c)=>c.industry === industry && c.size === size);
                                                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("td", {
                                                    style: {
                                                        padding: '8px',
                                                        border: '1px solid #f0f0f0',
                                                        background: cell ? getHeatmapColor(cell.channelRatio) : '#f5f5f5',
                                                        cursor: 'pointer',
                                                        textAlign: 'center',
                                                        minWidth: 80
                                                    },
                                                    onClick: ()=>cell && handleCellClick(cell),
                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                                        title: cell ? /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    children: [
                                                                        "总客户数: ",
                                                                        cell.totalCustomers
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                                    lineNumber: 336,
                                                                    columnNumber: 33
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    children: [
                                                                        "渠道客户数: ",
                                                                        cell.channelCustomers
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                                    lineNumber: 337,
                                                                    columnNumber: 33
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    children: [
                                                                        "占比: ",
                                                                        cell.channelRatio.toFixed(1),
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                                    lineNumber: 338,
                                                                    columnNumber: 33
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    children: [
                                                                        "总ARR: ¥",
                                                                        (cell.totalARR / 10000).toFixed(1),
                                                                        "万"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                                    lineNumber: 339,
                                                                    columnNumber: 33
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                            lineNumber: 335,
                                                            columnNumber: 31
                                                        }, void 0) : '暂无数据',
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                style: {
                                                                    fontSize: 14,
                                                                    fontWeight: 500
                                                                },
                                                                children: cell ? `${cell.channelRatio.toFixed(1)}%` : '-'
                                                            }, void 0, false, {
                                                                fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                                lineNumber: 344,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                style: {
                                                                    fontSize: 12,
                                                                    color: '#666'
                                                                },
                                                                children: cell ? `${cell.totalCustomers}客户` : ''
                                                            }, void 0, false, {
                                                                fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                                lineNumber: 347,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                        lineNumber: 332,
                                                        columnNumber: 25
                                                    }, this)
                                                }, size, false, {
                                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                    lineNumber: 320,
                                                    columnNumber: 23
                                                }, this);
                                            })
                                        ]
                                    }, industry, true, {
                                        fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                        lineNumber: 313,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                lineNumber: 311,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                        lineNumber: 301,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                    lineNumber: 300,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                lineNumber: 276,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                title: "客户生态标签",
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                    gutter: 24,
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            span: 10,
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        marginBottom: 16
                                    },
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                strong: true,
                                                children: "逻辑关系:"
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                lineNumber: 367,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Radio.Group, {
                                                value: tagLogic,
                                                onChange: (e)=>setTagLogic(e.target.value),
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Radio.Button, {
                                                        value: "AND",
                                                        children: "AND"
                                                    }, void 0, false, {
                                                        fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                        lineNumber: 369,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Radio.Button, {
                                                        value: "OR",
                                                        children: "OR"
                                                    }, void 0, false, {
                                                        fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                        lineNumber: 370,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                lineNumber: 368,
                                                columnNumber: 17
                                            }, this),
                                            selectedTags.length > 0 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                size: "small",
                                                onClick: ()=>setSelectedTags([]),
                                                children: "清空选择"
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                lineNumber: 373,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                        lineNumber: 366,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                    lineNumber: 365,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        minHeight: 400,
                                        maxHeight: 500,
                                        overflowY: 'auto'
                                    },
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 8
                                        },
                                        children: ecosystemTags.map((tag)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                color: selectedTags.includes(tag.name) ? tag.color : 'default',
                                                style: {
                                                    cursor: 'pointer',
                                                    padding: '4px 8px',
                                                    fontSize: 13,
                                                    border: selectedTags.includes(tag.name) ? `2px solid ${tag.color}` : '1px solid #d9d9d9'
                                                },
                                                onClick: ()=>handleTagClick(tag.name),
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                                    title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                children: [
                                                                    "客户数: ",
                                                                    tag.count
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                                lineNumber: 397,
                                                                columnNumber: 27
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                children: [
                                                                    "ARR: ¥",
                                                                    (tag.arr / 10000).toFixed(1),
                                                                    "万"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                                lineNumber: 398,
                                                                columnNumber: 27
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                children: [
                                                                    "近90天事件数: ",
                                                                    tag.events
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                                lineNumber: 399,
                                                                columnNumber: 27
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                        lineNumber: 396,
                                                        columnNumber: 25
                                                    }, void 0),
                                                    children: [
                                                        tag.name,
                                                        " (",
                                                        tag.count,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                    lineNumber: 394,
                                                    columnNumber: 21
                                                }, this)
                                            }, tag.name, false, {
                                                fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                lineNumber: 383,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                        lineNumber: 381,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                    lineNumber: 380,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                            lineNumber: 364,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            span: 14,
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        marginBottom: 16
                                    },
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                strong: true,
                                                children: [
                                                    "客户列表 (",
                                                    filteredCustomers.length,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                lineNumber: 414,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ExportOutlined, {}, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                    lineNumber: 416,
                                                    columnNumber: 25
                                                }, void 0),
                                                size: "small",
                                                onClick: ()=>onExport === null || onExport === void 0 ? void 0 : onExport(filteredCustomers),
                                                children: "导出"
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                lineNumber: 415,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                        lineNumber: 413,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                    lineNumber: 412,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Table, {
                                    columns: columns,
                                    dataSource: filteredCustomers,
                                    rowKey: "id",
                                    size: "small",
                                    scroll: {
                                        x: 800,
                                        y: 400
                                    },
                                    pagination: {
                                        pageSize: 10,
                                        showSizeChanger: true,
                                        showQuickJumper: true,
                                        showTotal: (total)=>`共 ${total} 条`
                                    }
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                    lineNumber: 425,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                            lineNumber: 411,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                    lineNumber: 363,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                lineNumber: 362,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Drawer, {
                title: selectedCell ? `${selectedCell.industry} - ${selectedCell.size}` : '',
                placement: "right",
                width: 600,
                open: drawerVisible,
                onClose: ()=>setDrawerVisible(false),
                children: selectedCell && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                            gutter: 16,
                            style: {
                                marginBottom: 24
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                    span: 12,
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                        size: "small",
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                textAlign: 'center'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        fontSize: 24,
                                                        fontWeight: 'bold',
                                                        color: '#1890ff'
                                                    },
                                                    children: selectedCell.totalCustomers
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                    lineNumber: 456,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        color: '#8c8c8c'
                                                    },
                                                    children: "总客户数"
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                    lineNumber: 459,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                            lineNumber: 455,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                        lineNumber: 454,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                    lineNumber: 453,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                    span: 12,
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                        size: "small",
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                textAlign: 'center'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        fontSize: 24,
                                                        fontWeight: 'bold',
                                                        color: '#52c41a'
                                                    },
                                                    children: [
                                                        selectedCell.channelRatio.toFixed(1),
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                    lineNumber: 466,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        color: '#8c8c8c'
                                                    },
                                                    children: "渠道占比"
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                    lineNumber: 469,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                            lineNumber: 465,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                        lineNumber: 464,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                    lineNumber: 463,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                            lineNumber: 452,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                            gutter: 16,
                            style: {
                                marginBottom: 24
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                    span: 12,
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                        size: "small",
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                textAlign: 'center'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        fontSize: 20,
                                                        fontWeight: 'bold'
                                                    },
                                                    children: [
                                                        "¥",
                                                        (selectedCell.totalARR / 10000).toFixed(1),
                                                        "万"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                    lineNumber: 479,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        color: '#8c8c8c'
                                                    },
                                                    children: "总ARR"
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                    lineNumber: 482,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                            lineNumber: 478,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                        lineNumber: 477,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                    lineNumber: 476,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                    span: 12,
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                        size: "small",
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                textAlign: 'center'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        fontSize: 20,
                                                        fontWeight: 'bold',
                                                        color: '#f5222d'
                                                    },
                                                    children: selectedCell.riskCustomers
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                    lineNumber: 489,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        color: '#8c8c8c'
                                                    },
                                                    children: "风险客户"
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                    lineNumber: 492,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                            lineNumber: 488,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                        lineNumber: 487,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                    lineNumber: 486,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                            lineNumber: 475,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                            type: "primary",
                            block: true,
                            icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ExportOutlined, {}, void 0, false, {
                                fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                lineNumber: 501,
                                columnNumber: 21
                            }, void 0),
                            onClick: ()=>{
                                const cellCustomers = customers.filter((c)=>c.industry === selectedCell.industry && c.size === (selectedCell.size === '小型' ? 'small' : selectedCell.size === '中型' ? 'medium' : selectedCell.size === '大型' ? 'large' : 'xlarge'));
                                onExport === null || onExport === void 0 || onExport(cellCustomers);
                            },
                            children: "导出该分组客户"
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                            lineNumber: 498,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                    lineNumber: 451,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                lineNumber: 443,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
        lineNumber: 274,
        columnNumber: 5
    }, this);
};
_s(ChannelEcosystemTab, "Pkgk4nyllXd/BKjOrwSNuBPKYGk=");
_c = ChannelEcosystemTab;
var _default = ChannelEcosystemTab;
var _c;
$RefreshReg$(_c, "ChannelEcosystemTab");
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
"src/components/CustomerSuccess/CustomerDetailModal.tsx": function (module, exports, __mako_require__){
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
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
const { Text, Title } = _antd.Typography;
const CustomerDetailDrawer = ({ visible, customer, onClose })=>{
    if (!customer) return null;
    const getHealthColor = (score)=>{
        if (!score) return '#d9d9d9';
        if (score >= 80) return '#52c41a';
        if (score >= 60) return '#faad14';
        return '#ff4d4f';
    };
    const getRiskColor = (level)=>{
        switch(level){
            case 'safe':
                return 'green';
            case 'attention':
                return 'orange';
            case 'risk':
                return 'red';
            default:
                return 'default';
        }
    };
    const getLifecycleColor = (lifecycle)=>{
        switch(lifecycle){
            case '导入期':
                return 'blue';
            case '成长期':
                return 'green';
            case '成熟期':
                return 'gold';
            case '衰退期':
                return 'red';
            default:
                return 'default';
        }
    };
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Drawer, {
        title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
            style: {
                display: 'flex',
                alignItems: 'center'
            },
            children: [
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                    style: {
                        backgroundColor: customer.logoColor || '#1890ff',
                        marginRight: 12
                    },
                    size: 40,
                    children: customer.name.charAt(0)
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                    lineNumber: 64,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                            level: 4,
                            style: {
                                margin: 0
                            },
                            children: customer.name
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                            lineNumber: 71,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                            type: "secondary",
                            children: customer.industry || '未知行业'
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                            lineNumber: 72,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                    lineNumber: 70,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
            lineNumber: 63,
            columnNumber: 9
        }, void 0),
        open: visible,
        onClose: onClose,
        width: 600,
        placement: "right",
        styles: {
            body: {
                padding: '24px'
            }
        },
        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
            children: [
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                    gutter: [
                        12,
                        12
                    ],
                    style: {
                        marginBottom: 24
                    },
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            span: 12,
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                size: "small",
                                style: {
                                    textAlign: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                            color: '#1890ff'
                                        },
                                        children: customer.healthScore || 0
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                                        lineNumber: 89,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            color: '#8c8c8c',
                                            fontSize: 12
                                        },
                                        children: "健康分"
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                                        lineNumber: 92,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            span: 12,
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                size: "small",
                                style: {
                                    textAlign: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                            color: '#52c41a'
                                        },
                                        children: [
                                            "¥",
                                            customer.arr ? (customer.arr / 10000).toFixed(1) : 0,
                                            "万"
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                                        lineNumber: 97,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            color: '#8c8c8c',
                                            fontSize: 12
                                        },
                                        children: "ARR"
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                                        lineNumber: 100,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                                lineNumber: 96,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            span: 12,
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                size: "small",
                                style: {
                                    textAlign: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                            color: '#fa8c16'
                                        },
                                        children: [
                                            customer.activationRate || 0,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                                        lineNumber: 105,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            color: '#8c8c8c',
                                            fontSize: 12
                                        },
                                        children: "激活率"
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                                        lineNumber: 108,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                                lineNumber: 104,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            span: 12,
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                size: "small",
                                style: {
                                    textAlign: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                            color: '#722ed1'
                                        },
                                        children: customer.valueScore || 0
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                                        lineNumber: 113,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            color: '#8c8c8c',
                                            fontSize: 12
                                        },
                                        children: "价值分"
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                                        lineNumber: 116,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                                lineNumber: 112,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                            lineNumber: 111,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                    title: "基本信息",
                    size: "small",
                    style: {
                        marginBottom: 16
                    },
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions, {
                        column: 1,
                        size: "small",
                        labelStyle: {
                            width: '80px'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                label: "客户名称",
                                children: customer.name
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                                lineNumber: 124,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                label: "负责CSM",
                                children: customer.csm
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                                lineNumber: 125,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                label: "所属行业",
                                children: customer.industry || '-'
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                                lineNumber: 126,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                label: "客户规模",
                                children: customer.customerScale ? customer.customerScale.toLocaleString() : '-'
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                                lineNumber: 127,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                label: "客单价",
                                children: customer.unitPrice ? `¥${(customer.unitPrice / 10000).toFixed(1)}万` : '-'
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                                lineNumber: 130,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                label: "签约日期",
                                children: customer.signDate || '-'
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                                lineNumber: 133,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                        lineNumber: 123,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                    lineNumber: 122,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                    title: "状态信息",
                    size: "small",
                    style: {
                        marginBottom: 16
                    },
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                        wrap: true,
                        children: [
                            customer.quadrant && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                color: "blue",
                                children: customer.quadrant
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                                lineNumber: 141,
                                columnNumber: 15
                            }, this),
                            customer.lifecycle && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                color: getLifecycleColor(customer.lifecycle),
                                children: customer.lifecycle
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                                lineNumber: 144,
                                columnNumber: 15
                            }, this),
                            customer.riskLevel && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                color: getRiskColor(customer.riskLevel),
                                children: customer.riskLevel === 'safe' ? '安全' : customer.riskLevel === 'attention' ? '关注' : '风险'
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                                lineNumber: 147,
                                columnNumber: 15
                            }, this),
                            customer.healthScore && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Badge, {
                                color: getHealthColor(customer.healthScore),
                                text: `健康分: ${customer.healthScore}`
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                                lineNumber: 153,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                        lineNumber: 139,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                    lineNumber: 138,
                    columnNumber: 9
                }, this),
                customer.tags && customer.tags.length > 0 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                    title: "业务标签",
                    size: "small",
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                        wrap: true,
                        children: customer.tags.map((tag, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                color: "processing",
                                children: tag
                            }, index, false, {
                                fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                                lineNumber: 166,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                        lineNumber: 164,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
                    lineNumber: 163,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
            lineNumber: 84,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/components/CustomerSuccess/CustomerDetailModal.tsx",
        lineNumber: 61,
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
"src/components/CustomerSuccess/CustomerTieringCenter.module.css?asmodule": function (module, exports, __mako_require__){
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
"";
var _default = {
    "ant-tabs-tab-btn": `ant-tabs-tab-btn-vwAfPne7`,
    "ant-tabs-nav": `ant-tabs-nav-W7FMt22J`,
    "ant-tabs-content-holder": `ant-tabs-content-holder-n4MBdg5G`,
    "ant-tabs-content": `ant-tabs-content-0rfa1cY7`,
    "customTabsWithPadding": `customTabsWithPadding-2v_J7ajq`,
    "ant-tabs-tabpane": `ant-tabs-tabpane-CN45D5pi`
};

},
"src/components/CustomerSuccess/CustomerTieringCenter.tsx": function (module, exports, __mako_require__){
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
var _reactrefresh = _interop_require_wildcard._(__mako_require__("node_modules/react-refresh/runtime.js"));
var _jsxdevruntime = __mako_require__("node_modules/react/jsx-dev-runtime.js");
var _react = _interop_require_wildcard._(__mako_require__("node_modules/react/index.js"));
var _antd = __mako_require__("node_modules/antd/es/index.js");
var _GlobalFilters = _interop_require_default._(__mako_require__("src/components/CustomerSuccess/GlobalFilters.tsx"));
var _KPISummary = _interop_require_default._(__mako_require__("src/components/CustomerSuccess/KPISummary.tsx"));
var _ValueLifecycleTab = _interop_require_default._(__mako_require__("src/components/CustomerSuccess/ValueLifecycleTab.tsx"));
var _NewCustomerTieringTab = _interop_require_default._(__mako_require__("src/components/CustomerSuccess/NewCustomerTieringTab.tsx"));
var _HighValueCustomerTab = _interop_require_default._(__mako_require__("src/components/CustomerSuccess/HighValueCustomerTab.tsx"));
var _ChannelEcosystemTab = _interop_require_default._(__mako_require__("src/components/CustomerSuccess/ChannelEcosystemTab.tsx"));
var _CustomerDetailModal = _interop_require_default._(__mako_require__("src/components/CustomerSuccess/CustomerDetailModal.tsx"));
var _CustomerTieringCentermodulecssasmodule = _interop_require_default._(__mako_require__("src/components/CustomerSuccess/CustomerTieringCenter.module.css?asmodule"));
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
var _s = $RefreshSig$();
const { Content } = _antd.Layout;
const { Title, Text } = _antd.Typography;
const { TabPane } = _antd.Tabs;
const CustomerTieringCenter = ()=>{
    _s();
    const [activeTab, setActiveTab] = (0, _react.useState)('value-lifecycle');
    const [globalFilters, setGlobalFilters] = (0, _react.useState)({
        timeRange: 'current',
        industries: [],
        customerSizes: [],
        csmOwners: [],
        regions: [],
        searchText: ''
    });
    const [customers, setCustomers] = (0, _react.useState)([]);
    const [loading, setLoading] = (0, _react.useState)(false);
    const generateMockData = ()=>{
        const industries = [
            '制造业',
            '金融',
            '零售',
            '医疗',
            '教育',
            '政府'
        ];
        const sizes = [
            'small',
            'medium',
            'large',
            'xlarge'
        ];
        const lifecycles = [
            'import',
            'growth',
            'mature',
            'decline'
        ];
        const regions = [
            '华北',
            '华东',
            '华南',
            '华中',
            '西南',
            '西北',
            '东北'
        ];
        const csms = [
            '张三',
            '李四',
            '王五',
            '赵六',
            '钱七',
            '孙八'
        ];
        const riskLevels = [
            'safe',
            'attention',
            'risk'
        ];
        const channelTypes = [
            'direct',
            'partner',
            'reseller'
        ];
        const tags = [
            '医院生态',
            '零售生态',
            'ISV合作伙伴',
            '系统集成商',
            '代理商',
            '战略客户',
            '标杆客户',
            '创新试点',
            '数字化转型',
            '云原生'
        ];
        const mockCustomers = [];
        for(let i = 1; i <= 500; i++){
            const industry = industries[Math.floor(Math.random() * industries.length)];
            const size = sizes[Math.floor(Math.random() * sizes.length)];
            const lifecycle = lifecycles[Math.floor(Math.random() * lifecycles.length)];
            const region = regions[Math.floor(Math.random() * regions.length)];
            const csm = csms[Math.floor(Math.random() * csms.length)];
            const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];
            const channelType = channelTypes[Math.floor(Math.random() * channelTypes.length)];
            const isChannelCustomer = Math.random() > 0.6;
            const isKeyAccount = Math.random() > 0.8;
            const isInRenewalWindow = Math.random() > 0.7;
            const customerTags = [];
            const tagCount = Math.floor(Math.random() * 4) + 1;
            for(let j = 0; j < tagCount; j++){
                const tag = tags[Math.floor(Math.random() * tags.length)];
                if (!customerTags.includes(tag)) customerTags.push(tag);
            }
            const arr = Math.floor(Math.random() * 1000000) + 50000;
            const valueScore = Math.floor(Math.random() * 100) + 1;
            const healthScore = Math.floor(Math.random() * 100) + 1;
            const rScore = Math.floor(Math.random() * 100) + 1;
            const fScore = Math.floor(Math.random() * 100) + 1;
            const mScore = Math.floor(Math.random() * 100) + 1;
            const signDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0];
            const visits90Days = Math.floor(Math.random() * 20);
            const revenue90Days = Math.floor(Math.random() * 100000);
            const collaborationEvents = Math.floor(Math.random() * 30);
            const insights = [];
            const insightCount = Math.floor(Math.random() * 5);
            for(let k = 0; k < insightCount; k++)insights.push({
                id: `insight-${i}-${k}`,
                content: `客户洞察内容 ${k + 1}`,
                date: new Date(Date.now() - Math.random() * 7776000000).toISOString().split('T')[0],
                type: [
                    '会议',
                    '邮件',
                    '电话',
                    '现场拜访'
                ][Math.floor(Math.random() * 4)]
            });
            const nextAction = Math.random() > 0.5 ? {
                content: [
                    '跟进续约',
                    '产品演示',
                    '商务谈判',
                    '技术支持'
                ][Math.floor(Math.random() * 4)],
                dueDate: new Date(Date.now() + Math.random() * 2592000000).toISOString().split('T')[0],
                overdue: Math.random() > 0.8
            } : undefined;
            mockCustomers.push({
                id: `customer-${i}`,
                name: `客户${i}`,
                industry,
                size: size,
                csm,
                region,
                isChannelCustomer,
                arr,
                valueScore,
                lifecycle: lifecycle,
                healthScore,
                rScore,
                fScore,
                mScore,
                riskLevel: riskLevel,
                signDate,
                tags: customerTags,
                collaborationEvents,
                channelType: channelType,
                isKeyAccount,
                isInRenewalWindow,
                visits90Days,
                revenue90Days,
                insights,
                nextAction
            });
        }
        return mockCustomers;
    };
    const filteredCustomers = (0, _react.useMemo)(()=>{
        let filtered = customers;
        if (globalFilters.industries.length > 0) filtered = filtered.filter((customer)=>globalFilters.industries.includes(customer.industry));
        if (globalFilters.customerSizes.length > 0) filtered = filtered.filter((customer)=>globalFilters.customerSizes.includes(customer.size));
        if (globalFilters.csmOwners.length > 0) filtered = filtered.filter((customer)=>globalFilters.csmOwners.includes(customer.csm));
        if (globalFilters.regions.length > 0) filtered = filtered.filter((customer)=>globalFilters.regions.includes(customer.region));
        if (globalFilters.isChannelCustomer !== undefined) filtered = filtered.filter((customer)=>customer.isChannelCustomer === globalFilters.isChannelCustomer);
        if (globalFilters.searchText) {
            const searchLower = globalFilters.searchText.toLowerCase();
            filtered = filtered.filter((customer)=>customer.name.toLowerCase().includes(searchLower) || customer.id.toLowerCase().includes(searchLower));
        }
        return filtered;
    }, [
        customers,
        globalFilters
    ]);
    const kpiData = (0, _react.useMemo)(()=>{
        const totalCustomers = filteredCustomers.length;
        const highValueCustomers = filteredCustomers.filter((c)=>c.valueScore >= 80).length;
        const newCustomers = filteredCustomers.filter((c)=>{
            if (!c.signDate) return false;
            const signDate = new Date(c.signDate);
            const threeMonthsAgo = new Date();
            threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
            return signDate >= threeMonthsAgo;
        }).length;
        const riskCustomers = filteredCustomers.filter((c)=>c.riskLevel === 'risk').length;
        const currentARR = filteredCustomers.reduce((sum, c)=>sum + c.arr, 0);
        const generateCustomerChange = ()=>Math.floor((Math.random() - 0.5) * 20);
        const generatePercentageChange = ()=>(Math.random() - 0.5) * 20;
        const getChangeType = (change)=>{
            if (change > 2) return 'increase';
            if (change < -2) return 'decrease';
            return 'stable';
        };
        const totalChange = generateCustomerChange();
        const highValueChange = generateCustomerChange();
        const newSignupsChange = generateCustomerChange();
        const riskChange = generateCustomerChange();
        const arrChange = generatePercentageChange();
        const grrChange = generatePercentageChange();
        const nrrChange = generatePercentageChange();
        return {
            totalCustomers: {
                value: totalCustomers,
                change: totalChange,
                changeType: getChangeType(totalChange)
            },
            highValueCustomers: {
                value: highValueCustomers,
                change: highValueChange,
                changeType: getChangeType(highValueChange)
            },
            newSignups: {
                value: newCustomers,
                change: newSignupsChange,
                changeType: getChangeType(newSignupsChange)
            },
            highRiskCustomers: {
                value: riskCustomers,
                change: riskChange,
                changeType: getChangeType(riskChange)
            },
            currentARR: {
                value: currentARR,
                change: arrChange,
                changeType: getChangeType(arrChange)
            },
            retentionRates: {
                grr: 95.2,
                nrr: 108.5,
                grrChange,
                nrrChange
            }
        };
    }, [
        filteredCustomers
    ]);
    (0, _react.useEffect)(()=>{
        setLoading(true);
        setTimeout(()=>{
            setCustomers(generateMockData());
            setLoading(false);
        }, 1000);
    }, []);
    const handleFiltersChange = (filters)=>{
        setGlobalFilters((prev)=>({
                ...prev,
                ...filters
            }));
    };
    const handleSaveView = ()=>{
        _antd.message.success('视图保存成功');
    };
    const handleExport = (data)=>{
        _antd.message.success(`导出 ${data.length} 条数据`);
    };
    const [customerDetailVisible, setCustomerDetailVisible] = (0, _react.useState)(false);
    const [selectedCustomer, setSelectedCustomer] = (0, _react.useState)(null);
    const handleCustomerClick = (customer)=>{
        setSelectedCustomer(customer);
        setCustomerDetailVisible(true);
    };
    const tabItems = [
        {
            key: 'value-lifecycle',
            label: '价值 × 生命周期',
            children: (0, _jsxdevruntime.jsxDEV)(_ValueLifecycleTab.default, {
                customers: filteredCustomers.map((c)=>({
                        ...c,
                        logoColor: '#1890ff',
                        trend: 'up',
                        valueTier: c.valueScore >= 80 ? '高价值' : c.valueScore >= 50 ? '中价值' : '低价值',
                        rAndM: c.rScore + c.mScore,
                        f: c.fScore,
                        serviceScore: Math.floor(Math.random() * 100),
                        riskEvents: Math.floor(Math.random() * 10),
                        upsellAmount: Math.floor(Math.random() * 100000),
                        lifecycle: c.lifecycle === 'import' ? '导入期' : c.lifecycle === 'growth' ? '成长期' : c.lifecycle === 'mature' ? '成熟期' : '衰退期'
                    })),
                onCustomerSelect: handleCustomerClick
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                lineNumber: 379,
                columnNumber: 9
            }, this)
        },
        {
            key: 'new-customer-tiering',
            label: '新签客户分层',
            children: (0, _jsxdevruntime.jsxDEV)(_NewCustomerTieringTab.default, {
                customers: filteredCustomers.filter((c)=>c.signDate).map((c)=>({
                        id: c.id || `customer-${Math.random()}`,
                        name: c.name || '未知客户',
                        logoColor: '#52c41a',
                        csm: c.csm || '未分配',
                        industry: c.industry || '其他',
                        customerScale: Math.floor(Math.random() * 1000) + 50,
                        unitPrice: Math.floor((c.arr || 0) / 12),
                        signDate: c.signDate,
                        activationRate: Math.floor(Math.random() * 100),
                        quadrant: '领先者',
                        arr: c.arr || 0,
                        tags: c.tags || [],
                        healthScore: c.healthScore || 0,
                        riskLevel: c.riskLevel || 'safe',
                        lifecycle: c.lifecycle === 'import' ? '导入期' : c.lifecycle === 'growth' ? '成长期' : c.lifecycle === 'mature' ? '成熟期' : '衰退期',
                        valueScore: c.valueScore || 0
                    })),
                onCustomerSelect: handleCustomerClick
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                lineNumber: 402,
                columnNumber: 9
            }, this)
        },
        {
            key: 'high-value-customer',
            label: '高价值客户洞察',
            children: (0, _jsxdevruntime.jsxDEV)(_HighValueCustomerTab.default, {
                customers: filteredCustomers.filter((c)=>c.valueScore >= 60).map((c)=>{
                    var _c_nextAction, _c_nextAction1, _c_nextAction2;
                    return {
                        id: c.id,
                        name: c.name,
                        logoColor: '#faad14',
                        csm: c.csm,
                        rScore: c.rScore,
                        fScore: c.fScore,
                        mScore: c.mScore,
                        contractAmount: c.arr,
                        visits90Days: c.visits90Days,
                        lastVisitDate: new Date(Date.now() - Math.random() * 2592000000).toISOString().split('T')[0],
                        lastVisitType: '现场拜访',
                        lastVisitor: c.csm,
                        valueAdded90Days: c.revenue90Days,
                        insights90Days: c.insights.length,
                        insightsSummary: '近期客户活跃度良好，续约意向积极',
                        ecoTags: c.tags,
                        riskStatus: c.riskLevel === 'safe' ? '安全' : c.riskLevel === 'attention' ? '关注' : '风险',
                        healthScore: c.healthScore,
                        nextAction: ((_c_nextAction = c.nextAction) === null || _c_nextAction === void 0 ? void 0 : _c_nextAction.content) || '跟进续约',
                        actionDueDate: ((_c_nextAction1 = c.nextAction) === null || _c_nextAction1 === void 0 ? void 0 : _c_nextAction1.dueDate) || new Date(Date.now() + 604800000).toISOString().split('T')[0],
                        actionStatus: ((_c_nextAction2 = c.nextAction) === null || _c_nextAction2 === void 0 ? void 0 : _c_nextAction2.overdue) ? '逾期' : '进行中',
                        isKeyAccount: c.isKeyAccount,
                        isChannelCustomer: c.isChannelCustomer,
                        isInRenewalWindow: c.isInRenewalWindow,
                        milestones: [
                            {
                                date: '2024-01-15',
                                event: '合同签署',
                                status: 'completed'
                            },
                            {
                                date: '2024-06-01',
                                event: '中期评估',
                                status: 'pending'
                            }
                        ],
                        activityTrend: Array.from({
                            length: 12
                        }, ()=>Math.floor(Math.random() * 100)),
                        stakeholders: [
                            {
                                name: '张总',
                                role: 'CEO',
                                influence: 'high'
                            },
                            {
                                name: '李经理',
                                role: 'IT总监',
                                influence: 'medium'
                            }
                        ]
                    };
                }),
                onCustomerSelect: handleCustomerClick
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                lineNumber: 431,
                columnNumber: 9
            }, this)
        },
        {
            key: 'channel-ecosystem',
            label: '渠道与生态分析',
            children: (0, _jsxdevruntime.jsxDEV)(_ChannelEcosystemTab.default, {
                customers: filteredCustomers,
                onCustomerClick: handleCustomerClick,
                onExport: handleExport
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                lineNumber: 475,
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
                children: (0, _jsxdevruntime.jsxDEV)("div", {
                    children: [
                        (0, _jsxdevruntime.jsxDEV)(Title, {
                            level: 2,
                            style: {
                                margin: 0,
                                color: '#262626'
                            },
                            children: "客户分层盘点"
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                            lineNumber: 498,
                            columnNumber: 11
                        }, this),
                        (0, _jsxdevruntime.jsxDEV)(Text, {
                            type: "secondary",
                            children: "基于价值与生命周期的客户精细化分层管理"
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                            lineNumber: 499,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                    lineNumber: 497,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                lineNumber: 491,
                columnNumber: 7
            }, this),
            (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    borderRadius: '14px',
                    marginBottom: '16px'
                },
                children: (0, _jsxdevruntime.jsxDEV)(_GlobalFilters.default, {
                    filters: globalFilters,
                    onFiltersChange: handleFiltersChange,
                    onSaveView: handleSaveView,
                    onExport: ()=>handleExport(filteredCustomers)
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                    lineNumber: 508,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                lineNumber: 504,
                columnNumber: 7
            }, this),
            (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    marginBottom: '16px'
                },
                children: (0, _jsxdevruntime.jsxDEV)(_KPISummary.default, {
                    data: kpiData,
                    loading: loading
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                    lineNumber: 520,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                lineNumber: 517,
                columnNumber: 7
            }, this),
            (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                    border: '1px solid #f0f0f0',
                    background: '#ffffff',
                    overflow: 'hidden'
                },
                children: (0, _jsxdevruntime.jsxDEV)(_antd.Tabs, {
                    activeKey: activeTab,
                    onChange: setActiveTab,
                    items: tabItems,
                    size: "large",
                    tabBarStyle: {
                        margin: '0 24px',
                        borderBottom: '1px solid #f0f0f0'
                    },
                    className: _CustomerTieringCentermodulecssasmodule.default.customTabsWithPadding
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                    lineNumber: 531,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                lineNumber: 524,
                columnNumber: 7
            }, this),
            (0, _jsxdevruntime.jsxDEV)(_CustomerDetailModal.default, {
                visible: customerDetailVisible,
                customer: selectedCustomer,
                onClose: ()=>{
                    setCustomerDetailVisible(false);
                    setSelectedCustomer(null);
                }
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                lineNumber: 545,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
        lineNumber: 485,
        columnNumber: 5
    }, this);
};
_s(CustomerTieringCenter, "IINxZXUYMOmPjlInv4NNiahQ/Yc=");
_c = CustomerTieringCenter;
var _default = CustomerTieringCenter;
var _c;
$RefreshReg$(_c, "CustomerTieringCenter");
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
"src/components/CustomerSuccess/GlobalFilters.tsx": function (module, exports, __mako_require__){
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
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
var _s = $RefreshSig$();
const { RangePicker } = _antd.DatePicker;
const { Option } = _antd.Select;
const GlobalFilters = ({ filters, onFiltersChange, onSaveView, onExport })=>{
    _s();
    const [isExpanded, setIsExpanded] = (0, _react.useState)(false);
    const industries = [
        '互联网科技',
        '金融服务',
        '制造业',
        '零售电商',
        '医疗健康',
        '教育培训',
        '房地产',
        '物流运输',
        '能源化工',
        '政府机构'
    ];
    const customerSizes = [
        '小微企业(1-50人)',
        '中小企业(51-200人)',
        '中型企业(201-1000人)',
        '大型企业(1000+人)'
    ];
    const csmOwners = [
        '王一',
        '李二',
        '张三',
        '赵四',
        '陈五',
        '孙六',
        '周七',
        '吴八',
        '郑九',
        '刘十'
    ];
    const regions = [
        '华北',
        '华东',
        '华南',
        '华中',
        '西南',
        '西北',
        '东北'
    ];
    const timeRangeOptions = [
        {
            label: '本季度',
            value: 'current'
        },
        {
            label: '上季度',
            value: 'previous'
        },
        {
            label: '自定义',
            value: 'custom'
        }
    ];
    const handleFilterChange = (key, value)=>{
        onFiltersChange({
            ...filters,
            [key]: value
        });
    };
    return (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e8e8e8',
            marginBottom: '16px',
            overflow: 'hidden'
        },
        children: [
            (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    padding: '12px 16px',
                    background: '#fafafa',
                    borderBottom: '1px solid #e8e8e8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                },
                onClick: ()=>setIsExpanded(!isExpanded),
                children: [
                    (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                        children: [
                            (0, _jsxdevruntime.jsxDEV)(_icons.FilterOutlined, {
                                style: {
                                    color: '#1890ff',
                                    fontSize: '14px'
                                }
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this),
                            (0, _jsxdevruntime.jsxDEV)("span", {
                                style: {
                                    fontWeight: 600,
                                    color: '#262626',
                                    fontSize: '14px'
                                },
                                children: "全局筛选"
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                        type: "text",
                        size: "small",
                        icon: isExpanded ? (0, _jsxdevruntime.jsxDEV)(_icons.UpOutlined, {}, void 0, false, {
                            fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                            lineNumber: 90,
                            columnNumber: 30
                        }, void 0) : (0, _jsxdevruntime.jsxDEV)(_icons.DownOutlined, {}, void 0, false, {
                            fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                            lineNumber: 90,
                            columnNumber: 47
                        }, void 0),
                        style: {
                            color: '#666'
                        }
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            isExpanded && (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    padding: '16px'
                },
                children: (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                    gutter: [
                        12,
                        12
                    ],
                    align: "middle",
                    children: [
                        (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            children: (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                direction: "vertical",
                                size: 4,
                                children: [
                                    (0, _jsxdevruntime.jsxDEV)("span", {
                                        style: {
                                            fontSize: '12px',
                                            color: '#8c8c8c'
                                        },
                                        children: "时间维度"
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                        lineNumber: 103,
                                        columnNumber: 13
                                    }, this),
                                    (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                        value: filters.timeRange,
                                        onChange: (value)=>handleFilterChange('timeRange', value),
                                        style: {
                                            width: 120
                                        },
                                        size: "small",
                                        children: timeRangeOptions.map((option)=>(0, _jsxdevruntime.jsxDEV)(Option, {
                                                value: option.value,
                                                children: option.label
                                            }, option.value, false, {
                                                fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                                lineNumber: 111,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                        lineNumber: 104,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                            lineNumber: 101,
                            columnNumber: 9
                        }, this),
                        filters.timeRange === 'custom' && (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            children: (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                direction: "vertical",
                                size: 4,
                                children: [
                                    (0, _jsxdevruntime.jsxDEV)("span", {
                                        style: {
                                            fontSize: '12px',
                                            color: '#8c8c8c'
                                        },
                                        children: "自定义时间"
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                        lineNumber: 123,
                                        columnNumber: 15
                                    }, this),
                                    (0, _jsxdevruntime.jsxDEV)(RangePicker, {
                                        value: filters.customDateRange,
                                        onChange: (dates)=>handleFilterChange('customDateRange', dates),
                                        size: "small",
                                        style: {
                                            width: 200
                                        }
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                        lineNumber: 124,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this),
                        (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            children: (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                direction: "vertical",
                                size: 4,
                                children: [
                                    (0, _jsxdevruntime.jsxDEV)("span", {
                                        style: {
                                            fontSize: '12px',
                                            color: '#8c8c8c'
                                        },
                                        children: "行业"
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                        lineNumber: 137,
                                        columnNumber: 13
                                    }, this),
                                    (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                        mode: "multiple",
                                        value: filters.industries,
                                        onChange: (value)=>handleFilterChange('industries', value),
                                        placeholder: "选择行业",
                                        style: {
                                            width: 160
                                        },
                                        size: "small",
                                        maxTagCount: 1,
                                        children: industries.map((industry)=>(0, _jsxdevruntime.jsxDEV)(Option, {
                                                value: industry,
                                                children: industry
                                            }, industry, false, {
                                                fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                                lineNumber: 148,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                        lineNumber: 138,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                            lineNumber: 135,
                            columnNumber: 9
                        }, this),
                        (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            children: (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                direction: "vertical",
                                size: 4,
                                children: [
                                    (0, _jsxdevruntime.jsxDEV)("span", {
                                        style: {
                                            fontSize: '12px',
                                            color: '#8c8c8c'
                                        },
                                        children: "客户规模"
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                        lineNumber: 159,
                                        columnNumber: 13
                                    }, this),
                                    (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                        mode: "multiple",
                                        value: filters.customerSizes,
                                        onChange: (value)=>handleFilterChange('customerSizes', value),
                                        placeholder: "选择规模",
                                        style: {
                                            width: 160
                                        },
                                        size: "small",
                                        maxTagCount: 1,
                                        children: customerSizes.map((size)=>(0, _jsxdevruntime.jsxDEV)(Option, {
                                                value: size,
                                                children: size
                                            }, size, false, {
                                                fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                                lineNumber: 170,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                        lineNumber: 160,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                            lineNumber: 157,
                            columnNumber: 9
                        }, this),
                        (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            children: (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                direction: "vertical",
                                size: 4,
                                children: [
                                    (0, _jsxdevruntime.jsxDEV)("span", {
                                        style: {
                                            fontSize: '12px',
                                            color: '#8c8c8c'
                                        },
                                        children: "CSM负责人"
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                        lineNumber: 181,
                                        columnNumber: 13
                                    }, this),
                                    (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                        mode: "multiple",
                                        value: filters.csmOwners,
                                        onChange: (value)=>handleFilterChange('csmOwners', value),
                                        placeholder: "选择CSM",
                                        style: {
                                            width: 140
                                        },
                                        size: "small",
                                        maxTagCount: 1,
                                        children: csmOwners.map((csm)=>(0, _jsxdevruntime.jsxDEV)(Option, {
                                                value: csm,
                                                children: csm
                                            }, csm, false, {
                                                fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                                lineNumber: 192,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                        lineNumber: 182,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                            lineNumber: 179,
                            columnNumber: 9
                        }, this),
                        (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            children: (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                direction: "vertical",
                                size: 4,
                                children: [
                                    (0, _jsxdevruntime.jsxDEV)("span", {
                                        style: {
                                            fontSize: '12px',
                                            color: '#8c8c8c'
                                        },
                                        children: "地区"
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                        lineNumber: 203,
                                        columnNumber: 13
                                    }, this),
                                    (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                        mode: "multiple",
                                        value: filters.regions,
                                        onChange: (value)=>handleFilterChange('regions', value),
                                        placeholder: "选择地区",
                                        style: {
                                            width: 120
                                        },
                                        size: "small",
                                        maxTagCount: 1,
                                        children: regions.map((region)=>(0, _jsxdevruntime.jsxDEV)(Option, {
                                                value: region,
                                                children: region
                                            }, region, false, {
                                                fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                                lineNumber: 214,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                        lineNumber: 204,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                lineNumber: 202,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                            lineNumber: 201,
                            columnNumber: 9
                        }, this),
                        (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            children: (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                direction: "vertical",
                                size: 4,
                                children: [
                                    (0, _jsxdevruntime.jsxDEV)("span", {
                                        style: {
                                            fontSize: '12px',
                                            color: '#8c8c8c'
                                        },
                                        children: "渠道客户"
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                        lineNumber: 225,
                                        columnNumber: 13
                                    }, this),
                                    (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                        value: filters.isChannelCustomer,
                                        onChange: (value)=>handleFilterChange('isChannelCustomer', value),
                                        placeholder: "全部",
                                        style: {
                                            width: 100
                                        },
                                        size: "small",
                                        allowClear: true,
                                        children: [
                                            (0, _jsxdevruntime.jsxDEV)(Option, {
                                                value: true,
                                                children: "是"
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                                lineNumber: 234,
                                                columnNumber: 15
                                            }, this),
                                            (0, _jsxdevruntime.jsxDEV)(Option, {
                                                value: false,
                                                children: "否"
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                                lineNumber: 235,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                        lineNumber: 226,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                lineNumber: 224,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                            lineNumber: 223,
                            columnNumber: 9
                        }, this),
                        (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            flex: "auto",
                            children: (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                direction: "vertical",
                                size: 4,
                                style: {
                                    width: '100%'
                                },
                                children: [
                                    (0, _jsxdevruntime.jsxDEV)("span", {
                                        style: {
                                            fontSize: '12px',
                                            color: '#8c8c8c'
                                        },
                                        children: "搜索"
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                        lineNumber: 243,
                                        columnNumber: 13
                                    }, this),
                                    (0, _jsxdevruntime.jsxDEV)(_antd.Input, {
                                        value: filters.searchText,
                                        onChange: (e)=>handleFilterChange('searchText', e.target.value),
                                        placeholder: "客户名称/ID",
                                        prefix: (0, _jsxdevruntime.jsxDEV)(_icons.SearchOutlined, {}, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                            lineNumber: 248,
                                            columnNumber: 23
                                        }, void 0),
                                        size: "small",
                                        style: {
                                            minWidth: 200
                                        }
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                        lineNumber: 244,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                lineNumber: 242,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                            lineNumber: 241,
                            columnNumber: 9
                        }, this),
                        (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            children: (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                children: [
                                    (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                        title: "保存当前筛选条件为视图",
                                        children: (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                            type: "text",
                                            icon: (0, _jsxdevruntime.jsxDEV)(_icons.SaveOutlined, {}, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                                lineNumber: 261,
                                                columnNumber: 27
                                            }, void 0),
                                            onClick: onSaveView,
                                            size: "small",
                                            children: "保存视图"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                            lineNumber: 259,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                        lineNumber: 258,
                                        columnNumber: 17
                                    }, this),
                                    (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                        title: "导出当前筛选结果",
                                        children: (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                            type: "text",
                                            icon: (0, _jsxdevruntime.jsxDEV)(_icons.ExportOutlined, {}, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                                lineNumber: 271,
                                                columnNumber: 27
                                            }, void 0),
                                            onClick: onExport,
                                            size: "small",
                                            children: "导出"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                            lineNumber: 269,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                        lineNumber: 268,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                lineNumber: 257,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                            lineNumber: 256,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                    lineNumber: 98,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                lineNumber: 97,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
};
_s(GlobalFilters, "FPNvbbHVlWWR4LKxxNntSxiIS38=");
_c = GlobalFilters;
var _default = GlobalFilters;
var _c;
$RefreshReg$(_c, "GlobalFilters");
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
"src/components/CustomerSuccess/HighValueCustomerTab.tsx": function (module, exports, __mako_require__){
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
const { Title, Text } = _antd.Typography;
const { Panel } = _antd.Collapse;
const HighValueCustomerTab = ({ customers, onCustomerSelect })=>{
    _s();
    const [rRange, setRRange] = (0, _react.useState)([
        0,
        100
    ]);
    const [fRange, setFRange] = (0, _react.useState)([
        0,
        100
    ]);
    const [mRange, setMRange] = (0, _react.useState)([
        0,
        100
    ]);
    const [onlyKeyAccount, setOnlyKeyAccount] = (0, _react.useState)(false);
    const [onlyChannelCustomer, setOnlyChannelCustomer] = (0, _react.useState)(false);
    const [onlyInRenewalWindow, setOnlyInRenewalWindow] = (0, _react.useState)(false);
    const [selectedEcoTags, setSelectedEcoTags] = (0, _react.useState)([]);
    const [search, setSearch] = (0, _react.useState)('');
    const [expandedRows, setExpandedRows] = (0, _react.useState)([]);
    const [insightModalVisible, setInsightModalVisible] = (0, _react.useState)(false);
    const [selectedCustomer, setSelectedCustomer] = (0, _react.useState)(null);
    const [columnSettings, setColumnSettings] = (0, _react.useState)({
        rScore: true,
        fScore: true,
        mScore: true,
        contractAmount: true,
        visits90Days: true,
        valueAdded90Days: true,
        insights90Days: true,
        ecoTags: true,
        riskStatus: true,
        nextAction: true
    });
    const cardStyle = {
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        border: '1px solid #f0f0f0',
        background: '#ffffff'
    };
    const riskStatusColors = {
        安全: '#52c41a',
        关注: '#fa8c16',
        风险: '#ff4d4f'
    };
    // 获取所有生态标签
    const allEcoTags = (0, _react.useMemo)(()=>{
        const tags = new Set();
        customers.forEach((c)=>c.ecoTags.forEach((tag)=>tags.add(tag)));
        return Array.from(tags).sort();
    }, [
        customers
    ]);
    // 筛选后的客户列表
    const filteredCustomers = (0, _react.useMemo)(()=>{
        let list = customers;
        // RFM筛选
        list = list.filter((c)=>c.rScore >= rRange[0] && c.rScore <= rRange[1] && c.fScore >= fRange[0] && c.fScore <= fRange[1] && c.mScore >= mRange[0] && c.mScore <= mRange[1]);
        // 特殊筛选
        if (onlyKeyAccount) list = list.filter((c)=>c.isKeyAccount);
        if (onlyChannelCustomer) list = list.filter((c)=>c.isChannelCustomer);
        if (onlyInRenewalWindow) list = list.filter((c)=>c.isInRenewalWindow);
        // 生态标签筛选
        if (selectedEcoTags.length > 0) list = list.filter((c)=>selectedEcoTags.some((tag)=>c.ecoTags.includes(tag)));
        // 搜索筛选
        if (search.trim()) {
            const k = search.trim().toLowerCase();
            list = list.filter((c)=>c.name.toLowerCase().includes(k) || c.csm.toLowerCase().includes(k) || c.ecoTags.some((tag)=>tag.toLowerCase().includes(k)));
        }
        return list;
    }, [
        customers,
        rRange,
        fRange,
        mRange,
        onlyKeyAccount,
        onlyChannelCustomer,
        onlyInRenewalWindow,
        selectedEcoTags,
        search
    ]);
    // 快速筛选方案
    const applyQuickFilter = (type)=>{
        const sortedByTotal = [
            ...customers
        ].sort((a, b)=>b.rScore + b.fScore + b.mScore - (a.rScore + a.fScore + a.mScore));
        if (type === 'top10') {
            const threshold = Math.ceil(customers.length * 0.1);
            const minScore = sortedByTotal[threshold - 1];
            const totalScore = minScore.rScore + minScore.fScore + minScore.mScore;
            const avgScore = Math.floor(totalScore / 3);
            setRRange([
                avgScore,
                100
            ]);
            setFRange([
                avgScore,
                100
            ]);
            setMRange([
                avgScore,
                100
            ]);
        } else if (type === 'top25') {
            const threshold = Math.ceil(customers.length * 0.25);
            const minScore = sortedByTotal[threshold - 1];
            const totalScore = minScore.rScore + minScore.fScore + minScore.mScore;
            const avgScore = Math.floor(totalScore / 3);
            setRRange([
                avgScore,
                100
            ]);
            setFRange([
                avgScore,
                100
            ]);
            setMRange([
                avgScore,
                100
            ]);
        } else {
            setRRange([
                0,
                40
            ]);
            setFRange([
                0,
                40
            ]);
            setMRange([
                0,
                40
            ]);
        }
    };
    // 展开行内容
    const expandedRowRender = (record)=>{
        return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
            style: {
                padding: '16px 0'
            },
            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                gutter: 24,
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        span: 8,
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            size: "small",
                            title: "里程碑进展",
                            style: {
                                height: 200
                            },
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    maxHeight: 140,
                                    overflowY: 'auto'
                                },
                                children: record.milestones.map((milestone, idx)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            marginBottom: 8,
                                            display: 'flex',
                                            alignItems: 'center'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Badge, {
                                                status: milestone.status === 'completed' ? 'success' : 'processing',
                                                style: {
                                                    marginRight: 8
                                                }
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                lineNumber: 175,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                        style: {
                                                            fontSize: 12
                                                        },
                                                        children: milestone.date
                                                    }, void 0, false, {
                                                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                        lineNumber: 180,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            fontSize: 11,
                                                            color: '#8c8c8c'
                                                        },
                                                        children: milestone.event
                                                    }, void 0, false, {
                                                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                        lineNumber: 181,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                lineNumber: 179,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, idx, true, {
                                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                        lineNumber: 174,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                lineNumber: 172,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                            lineNumber: 171,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 170,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        span: 8,
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            size: "small",
                            title: "活跃度趋势",
                            style: {
                                height: 200
                            },
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'end',
                                    height: 120,
                                    gap: 4
                                },
                                children: record.activityTrend.map((value, idx)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            flex: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    width: '100%',
                                                    height: `${value / 100 * 80}px`,
                                                    backgroundColor: '#1890ff',
                                                    borderRadius: 2,
                                                    minHeight: 2
                                                }
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                lineNumber: 193,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                style: {
                                                    fontSize: 10,
                                                    marginTop: 4
                                                },
                                                children: [
                                                    idx + 1,
                                                    "月"
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                lineNumber: 202,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, idx, true, {
                                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                        lineNumber: 192,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                lineNumber: 190,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                            lineNumber: 189,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 188,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        span: 8,
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            size: "small",
                            title: "关键干系人",
                            style: {
                                height: 200
                            },
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    maxHeight: 140,
                                    overflowY: 'auto'
                                },
                                children: record.stakeholders.map((stakeholder, idx)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            marginBottom: 8,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                        style: {
                                                            fontSize: 12,
                                                            fontWeight: 500
                                                        },
                                                        children: stakeholder.name
                                                    }, void 0, false, {
                                                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                        lineNumber: 214,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            fontSize: 11,
                                                            color: '#8c8c8c'
                                                        },
                                                        children: stakeholder.role
                                                    }, void 0, false, {
                                                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                        lineNumber: 215,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                lineNumber: 213,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                color: stakeholder.influence === 'high' ? 'red' : stakeholder.influence === 'medium' ? 'orange' : 'default',
                                                children: stakeholder.influence === 'high' ? '高影响' : stakeholder.influence === 'medium' ? '中影响' : '低影响'
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                lineNumber: 217,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, idx, true, {
                                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                        lineNumber: 212,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                lineNumber: 210,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                            lineNumber: 209,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 208,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 169,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
            lineNumber: 168,
            columnNumber: 7
        }, this);
    };
    const columns = [
        {
            title: '客户名称',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            width: 200,
            sorter: (a, b)=>a.name.localeCompare(b.name),
            render: (_, record)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                            style: {
                                backgroundColor: record.logoColor
                            },
                            children: record.name.charAt(0)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                            lineNumber: 242,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    children: record.name
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                    lineNumber: 246,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        fontSize: 11,
                                        color: '#8c8c8c'
                                    },
                                    children: [
                                        record.isKeyAccount && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                            color: "gold",
                                            children: "KA"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                            lineNumber: 248,
                                            columnNumber: 39
                                        }, this),
                                        record.isChannelCustomer && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                            color: "blue",
                                            children: "渠道"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                            lineNumber: 249,
                                            columnNumber: 44
                                        }, this),
                                        record.isInRenewalWindow && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                            color: "orange",
                                            children: "续约期"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                            lineNumber: 250,
                                            columnNumber: 44
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                    lineNumber: 247,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                            lineNumber: 245,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                    lineNumber: 241,
                    columnNumber: 9
                }, this)
        }
    ];
    // 动态添加可配置的列
    if (columnSettings.rScore) columns.push({
        title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
            title: "财务价值分：基于合同金额、付费历史、增购潜力等计算",
            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                children: [
                    "R分 ",
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.QuestionCircleOutlined, {}, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 263,
                        columnNumber: 20
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 263,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
            lineNumber: 262,
            columnNumber: 9
        }, this),
        dataIndex: 'rScore',
        key: 'rScore',
        width: 80,
        sorter: (a, b)=>a.rScore - b.rScore,
        render: (score)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    textAlign: 'center'
                },
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            fontWeight: 600,
                            color: score >= 80 ? '#52c41a' : score >= 60 ? '#fa8c16' : '#ff4d4f'
                        },
                        children: score
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 272,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Progress, {
                        percent: score,
                        size: "small",
                        showInfo: false,
                        strokeColor: score >= 80 ? '#52c41a' : score >= 60 ? '#fa8c16' : '#ff4d4f'
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 275,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 271,
                columnNumber: 9
            }, this)
    });
    if (columnSettings.fScore) columns.push({
        title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
            title: "活跃度分：基于登录频次、功能使用深度、互动频率等计算",
            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                children: [
                    "F分 ",
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.QuestionCircleOutlined, {}, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 290,
                        columnNumber: 20
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 290,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
            lineNumber: 289,
            columnNumber: 9
        }, this),
        dataIndex: 'fScore',
        key: 'fScore',
        width: 80,
        sorter: (a, b)=>a.fScore - b.fScore,
        render: (score)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    textAlign: 'center'
                },
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            fontWeight: 600,
                            color: score >= 80 ? '#52c41a' : score >= 60 ? '#fa8c16' : '#ff4d4f'
                        },
                        children: score
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 299,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Progress, {
                        percent: score,
                        size: "small",
                        showInfo: false,
                        strokeColor: score >= 80 ? '#52c41a' : score >= 60 ? '#fa8c16' : '#ff4d4f'
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 302,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 298,
                columnNumber: 9
            }, this)
    });
    if (columnSettings.mScore) columns.push({
        title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
            title: "货币价值分：基于客单价、付费意愿、价格敏感度等计算",
            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                children: [
                    "M分 ",
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.QuestionCircleOutlined, {}, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 317,
                        columnNumber: 20
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 317,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
            lineNumber: 316,
            columnNumber: 9
        }, this),
        dataIndex: 'mScore',
        key: 'mScore',
        width: 80,
        sorter: (a, b)=>a.mScore - b.mScore,
        render: (score)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    textAlign: 'center'
                },
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            fontWeight: 600,
                            color: score >= 80 ? '#52c41a' : score >= 60 ? '#fa8c16' : '#ff4d4f'
                        },
                        children: score
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 326,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Progress, {
                        percent: score,
                        size: "small",
                        showInfo: false,
                        strokeColor: score >= 80 ? '#52c41a' : score >= 60 ? '#fa8c16' : '#ff4d4f'
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 329,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 325,
                columnNumber: 9
            }, this)
    });
    if (columnSettings.contractAmount) columns.push({
        title: '合同总金额',
        dataIndex: 'contractAmount',
        key: 'contractAmount',
        width: 120,
        sorter: (a, b)=>a.contractAmount - b.contractAmount,
        render: (amount)=>`¥${(amount / 10000).toFixed(1)}万`
    });
    if (columnSettings.visits90Days) columns.push({
        title: '过去90天拜访',
        dataIndex: 'visits90Days',
        key: 'visits90Days',
        width: 120,
        sorter: (a, b)=>a.visits90Days - b.visits90Days,
        render: (_, record)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                title: `最近拜访：${record.lastVisitor} | ${record.lastVisitDate} | ${record.lastVisitType}`,
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {}, void 0, false, {
                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                            lineNumber: 361,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                            children: record.visits90Days
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                            lineNumber: 362,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                    lineNumber: 360,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 359,
                columnNumber: 9
            }, this)
    });
    if (columnSettings.valueAdded90Days) columns.push({
        title: '过去90天增值',
        dataIndex: 'valueAdded90Days',
        key: 'valueAdded90Days',
        width: 120,
        sorter: (a, b)=>a.valueAdded90Days - b.valueAdded90Days,
        render: (amount)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                style: {
                    color: amount > 0 ? '#52c41a' : '#8c8c8c'
                },
                children: amount > 0 ? `¥${(amount / 10000).toFixed(1)}万` : '-'
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 377,
                columnNumber: 9
            }, this)
    });
    if (columnSettings.insights90Days) columns.push({
        title: '客户洞察',
        dataIndex: 'insights90Days',
        key: 'insights90Days',
        width: 100,
        sorter: (a, b)=>a.insights90Days - b.insights90Days,
        render: (_, record)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.FileTextOutlined, {}, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 393,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                        style: {
                            cursor: 'pointer',
                            color: '#1890ff'
                        },
                        onClick: (e)=>{
                            e.stopPropagation();
                            setSelectedCustomer(record);
                            setInsightModalVisible(true);
                        },
                        children: record.insights90Days
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 394,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 392,
                columnNumber: 9
            }, this)
    });
    if (columnSettings.ecoTags) columns.push({
        title: '生态标签',
        dataIndex: 'ecoTags',
        key: 'ecoTags',
        width: 150,
        render: (tags)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                wrap: true,
                children: [
                    tags.slice(0, 2).map((tag)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                            style: {
                                cursor: 'pointer'
                            },
                            onClick: ()=>{
                                if (!selectedEcoTags.includes(tag)) setSelectedEcoTags([
                                    ...selectedEcoTags,
                                    tag
                                ]);
                            },
                            children: tag
                        }, tag, false, {
                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                            lineNumber: 418,
                            columnNumber: 13
                        }, this)),
                    tags.length > 2 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                        type: "secondary",
                        children: [
                            "+",
                            tags.length - 2
                        ]
                    }, void 0, true, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 426,
                        columnNumber: 31
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 416,
                columnNumber: 9
            }, this)
    });
    if (columnSettings.riskStatus) columns.push({
        title: '风险状态',
        dataIndex: 'riskStatus',
        key: 'riskStatus',
        width: 100,
        filters: Object.keys(riskStatusColors).map((status)=>({
                text: status,
                value: status
            })),
        onFilter: (value, record)=>record.riskStatus === value,
        render: (status)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                color: riskStatusColors[status],
                children: status
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 441,
                columnNumber: 9
            }, this)
    });
    if (columnSettings.nextAction) columns.push({
        title: '下一步动作/到期日',
        dataIndex: 'nextAction',
        key: 'nextAction',
        width: 180,
        render: (_, record)=>{
            const isOverdue = new Date(record.actionDueDate) < new Date();
            return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            fontSize: 12,
                            marginBottom: 4
                        },
                        children: record.nextAction
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 456,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                        color: record.actionStatus === '已完成' ? 'success' : isOverdue ? 'error' : 'processing',
                        style: {
                            fontSize: 11
                        },
                        children: [
                            record.actionDueDate,
                            " | ",
                            record.actionStatus
                        ]
                    }, void 0, true, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 457,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 455,
                columnNumber: 11
            }, this);
        }
    });
    // 操作列
    columns.push({
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: 120,
        render: (_, record)=>{
            const menuItems = [
                {
                    key: 'insight',
                    label: '添加洞察',
                    icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PlusOutlined, {}, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 477,
                        columnNumber: 48
                    }, this)
                },
                {
                    key: 'task',
                    label: '创建任务',
                    icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.EditOutlined, {}, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 478,
                        columnNumber: 45
                    }, this)
                },
                {
                    key: 'ka',
                    label: record.isKeyAccount ? '取消关键账户' : '标记关键账户',
                    icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.SettingOutlined, {}, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 479,
                        columnNumber: 78
                    }, this)
                }
            ];
            return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Dropdown, {
                menu: {
                    items: menuItems,
                    onClick: ({ key })=>{
                        console.log(`${key} action for customer ${record.name}`);
                    }
                },
                trigger: [
                    'click'
                ],
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                    size: "small",
                    icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.MoreOutlined, {}, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 492,
                        columnNumber: 38
                    }, void 0)
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                    lineNumber: 492,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 483,
                columnNumber: 9
            }, this);
        }
    });
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                style: {
                    ...cardStyle,
                    marginBottom: 16
                },
                bodyStyle: {
                    padding: 16
                },
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                    gutter: 24,
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            span: 18,
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                                gutter: 16,
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                        span: 8,
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    marginBottom: 8
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                        strong: true,
                                                        children: "R分 (财务价值)"
                                                    }, void 0, false, {
                                                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                        lineNumber: 507,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                        type: "secondary",
                                                        style: {
                                                            marginLeft: 8
                                                        },
                                                        children: [
                                                            "当前: ",
                                                            rRange[0],
                                                            " - ",
                                                            rRange[1]
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                        lineNumber: 508,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                lineNumber: 506,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Slider, {
                                                range: true,
                                                min: 0,
                                                max: 100,
                                                value: rRange,
                                                onChange: (value)=>setRRange(value),
                                                tooltip: {
                                                    formatter: (v)=>`${v}分`
                                                }
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                lineNumber: 510,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                        lineNumber: 505,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                        span: 8,
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    marginBottom: 8
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                        strong: true,
                                                        children: "F分 (活跃度)"
                                                    }, void 0, false, {
                                                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                        lineNumber: 521,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                        type: "secondary",
                                                        style: {
                                                            marginLeft: 8
                                                        },
                                                        children: [
                                                            "当前: ",
                                                            fRange[0],
                                                            " - ",
                                                            fRange[1]
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                        lineNumber: 522,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                lineNumber: 520,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Slider, {
                                                range: true,
                                                min: 0,
                                                max: 100,
                                                value: fRange,
                                                onChange: (value)=>setFRange(value),
                                                tooltip: {
                                                    formatter: (v)=>`${v}分`
                                                }
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                lineNumber: 524,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                        lineNumber: 519,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                        span: 8,
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    marginBottom: 8
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                        strong: true,
                                                        children: "M分 (货币价值)"
                                                    }, void 0, false, {
                                                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                        lineNumber: 535,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                        type: "secondary",
                                                        style: {
                                                            marginLeft: 8
                                                        },
                                                        children: [
                                                            "当前: ",
                                                            mRange[0],
                                                            " - ",
                                                            mRange[1]
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                        lineNumber: 536,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                lineNumber: 534,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Slider, {
                                                range: true,
                                                min: 0,
                                                max: 100,
                                                value: mRange,
                                                onChange: (value)=>setMRange(value),
                                                tooltip: {
                                                    formatter: (v)=>`${v}分`
                                                }
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                lineNumber: 538,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                        lineNumber: 533,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                lineNumber: 504,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                            lineNumber: 503,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            span: 6,
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        marginBottom: 8
                                    },
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                        strong: true,
                                        children: "一键方案"
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                        lineNumber: 551,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                    lineNumber: 550,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                    wrap: true,
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                            size: "small",
                                            onClick: ()=>applyQuickFilter('top10'),
                                            children: "Top 10%"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                            lineNumber: 554,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                            size: "small",
                                            onClick: ()=>applyQuickFilter('top25'),
                                            children: "Top 25%"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                            lineNumber: 555,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                            size: "small",
                                            onClick: ()=>applyQuickFilter('bottom'),
                                            children: "底盘筛选"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                            lineNumber: 556,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                    lineNumber: 553,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        marginTop: 12
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                            checked: onlyKeyAccount,
                                            onChange: (e)=>setOnlyKeyAccount(e.target.checked),
                                            children: "仅看关键账户(KA)"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                            lineNumber: 559,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("br", {}, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                            lineNumber: 562,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                            checked: onlyChannelCustomer,
                                            onChange: (e)=>setOnlyChannelCustomer(e.target.checked),
                                            children: "仅看渠道客户"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                            lineNumber: 563,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("br", {}, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                            lineNumber: 566,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                            checked: onlyInRenewalWindow,
                                            onChange: (e)=>setOnlyInRenewalWindow(e.target.checked),
                                            children: "仅看续约窗口"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                            lineNumber: 567,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                    lineNumber: 558,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                            lineNumber: 549,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                    lineNumber: 502,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 501,
                columnNumber: 7
            }, this),
            allEcoTags.length > 0 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                style: {
                    ...cardStyle,
                    marginBottom: 16
                },
                bodyStyle: {
                    padding: 16
                },
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            marginBottom: 12
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                strong: true,
                                children: "生态标签筛选"
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                lineNumber: 579,
                                columnNumber: 13
                            }, this),
                            selectedEcoTags.length > 0 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                size: "small",
                                style: {
                                    marginLeft: 12
                                },
                                onClick: ()=>setSelectedEcoTags([]),
                                children: "清除选择"
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                lineNumber: 581,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 578,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                        wrap: true,
                        children: allEcoTags.map((tag)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                style: {
                                    cursor: 'pointer',
                                    marginBottom: 8
                                },
                                color: selectedEcoTags.includes(tag) ? 'blue' : undefined,
                                onClick: ()=>{
                                    if (selectedEcoTags.includes(tag)) setSelectedEcoTags(selectedEcoTags.filter((t)=>t !== tag));
                                    else setSelectedEcoTags([
                                        ...selectedEcoTags,
                                        tag
                                    ]);
                                },
                                children: tag
                            }, tag, false, {
                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                lineNumber: 588,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 586,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 577,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                style: {
                    ...cardStyle
                },
                title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%'
                    },
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                            style: {
                                fontSize: 16,
                                fontWeight: 600
                            },
                            children: [
                                "高价值客户洞察 (",
                                filteredCustomers.length,
                                ")"
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                            lineNumber: 612,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Dropdown, {
                                    menu: {
                                        items: Object.entries(columnSettings).map(([key, visible])=>({
                                                key,
                                                label: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                                    checked: visible,
                                                    onChange: (e)=>setColumnSettings((prev)=>({
                                                                ...prev,
                                                                [key]: e.target.checked
                                                            })),
                                                    children: key === 'rScore' ? 'R分' : key === 'fScore' ? 'F分' : key === 'mScore' ? 'M分' : key === 'contractAmount' ? '合同金额' : key === 'visits90Days' ? '拜访记录' : key === 'valueAdded90Days' ? '增值金额' : key === 'insights90Days' ? '客户洞察' : key === 'ecoTags' ? '生态标签' : key === 'riskStatus' ? '风险状态' : key === 'nextAction' ? '下一步动作' : key
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                    lineNumber: 619,
                                                    columnNumber: 23
                                                }, void 0)
                                            }))
                                    },
                                    trigger: [
                                        'click'
                                    ],
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.SettingOutlined, {}, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                            lineNumber: 639,
                                            columnNumber: 31
                                        }, void 0),
                                        children: "列设置"
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                        lineNumber: 639,
                                        columnNumber: 17
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                    lineNumber: 614,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input.Search, {
                                    allowClear: true,
                                    placeholder: "搜索客户/CSM/标签...",
                                    style: {
                                        width: 280
                                    },
                                    onSearch: setSearch,
                                    onChange: (e)=>setSearch(e.target.value)
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                    lineNumber: 641,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                            lineNumber: 613,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                    lineNumber: 611,
                    columnNumber: 11
                }, void 0),
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Table, {
                    rowKey: "id",
                    dataSource: filteredCustomers,
                    columns: columns,
                    pagination: {
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true
                    },
                    scroll: {
                        x: 1400
                    },
                    expandable: {
                        expandedRowKeys: expandedRows,
                        onExpandedRowsChange: (keys)=>setExpandedRows(keys),
                        expandedRowRender,
                        rowExpandable: ()=>true
                    },
                    onRow: (record)=>({
                            onClick: ()=>onCustomerSelect === null || onCustomerSelect === void 0 ? void 0 : onCustomerSelect(record),
                            style: {
                                cursor: 'pointer'
                            },
                            onContextMenu: (e)=>{
                                e.preventDefault();
                            // 右键菜单逻辑
                            }
                        })
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                    lineNumber: 652,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 608,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Modal, {
                title: `客户洞察 - ${selectedCustomer === null || selectedCustomer === void 0 ? void 0 : selectedCustomer.name}`,
                open: insightModalVisible,
                onCancel: ()=>setInsightModalVisible(false),
                footer: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                        onClick: ()=>setInsightModalVisible(false),
                        children: "关闭"
                    }, "close", false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 681,
                        columnNumber: 11
                    }, void 0),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                        type: "primary",
                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PlusOutlined, {}, void 0, false, {
                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                            lineNumber: 684,
                            columnNumber: 50
                        }, void 0),
                        children: "添加洞察"
                    }, "add", false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 684,
                        columnNumber: 11
                    }, void 0)
                ],
                width: 600,
                children: selectedCustomer && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                marginBottom: 16
                            },
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                strong: true,
                                children: "近90天洞察摘要："
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                lineNumber: 693,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                            lineNumber: 692,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                background: '#fafafa',
                                padding: 16,
                                borderRadius: 8,
                                marginBottom: 16,
                                minHeight: 100
                            },
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                children: selectedCustomer.insightsSummary || '暂无洞察摘要'
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                lineNumber: 702,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                            lineNumber: 695,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                    strong: true,
                                    children: "洞察数量："
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                    lineNumber: 705,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Badge, {
                                    count: selectedCustomer.insights90Days,
                                    style: {
                                        marginLeft: 8
                                    }
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                    lineNumber: 706,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                            lineNumber: 704,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                    lineNumber: 691,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 676,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
        lineNumber: 499,
        columnNumber: 5
    }, this);
};
_s(HighValueCustomerTab, "kDZiK+QtMIazaGm3XlHyH+fk6TE=");
_c = HighValueCustomerTab;
var _default = HighValueCustomerTab;
var _c;
$RefreshReg$(_c, "HighValueCustomerTab");
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
"src/components/CustomerSuccess/KPISummary.tsx": function (module, exports, __mako_require__){
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
var _reactrefresh = _interop_require_wildcard._(__mako_require__("node_modules/react-refresh/runtime.js"));
var _jsxdevruntime = __mako_require__("node_modules/react/jsx-dev-runtime.js");
var _react = _interop_require_default._(__mako_require__("node_modules/react/index.js"));
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
const { Text } = _antd.Typography;
const KPISummary = ({ data, loading = false })=>{
    const formatCustomerCount = (num)=>{
        if (num >= 10000) return `${Math.floor(num / 10000)}万`;
        return num.toString();
    };
    const formatCurrency = (num)=>{
        if (num >= 100000000) return `¥${(num / 100000000).toFixed(1)}亿`;
        if (num >= 10000) return `¥${(num / 10000).toFixed(1)}万`;
        return `¥${num.toLocaleString()}`;
    };
    const getChangeIcon = (changeType)=>{
        if (changeType === 'increase') return (0, _jsxdevruntime.jsxDEV)(_icons.ArrowUpOutlined, {
            style: {
                color: '#ff4d4f'
            }
        }, void 0, false, {
            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
            lineNumber: 84,
            columnNumber: 14
        }, this);
        if (changeType === 'decrease') return (0, _jsxdevruntime.jsxDEV)(_icons.ArrowDownOutlined, {
            style: {
                color: '#52c41a'
            }
        }, void 0, false, {
            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
            lineNumber: 87,
            columnNumber: 14
        }, this);
        return null;
    };
    const getChangeColor = (changeType)=>{
        if (changeType === 'increase') return '#ff4d4f';
        if (changeType === 'decrease') return '#52c41a';
        return '#8c8c8c';
    };
    const cardStyle = {
        borderRadius: '8px',
        border: '1px solid #e8e8e8',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        background: '#fff',
        height: '140px'
    };
    const bodyStyle = {
        padding: '16px 12px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    };
    return (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            background: '#fff',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e8e8e8',
            marginBottom: '16px'
        },
        children: [
            (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    marginBottom: '12px',
                    paddingBottom: '8px',
                    borderBottom: '1px solid #f0f0f0'
                },
                children: (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center'
                    },
                    children: [
                        (0, _jsxdevruntime.jsxDEV)(_icons.DashboardOutlined, {
                            style: {
                                fontSize: '16px',
                                color: '#1890ff',
                                marginRight: '8px'
                            }
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, this),
                        (0, _jsxdevruntime.jsxDEV)(Text, {
                            style: {
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#262626'
                            },
                            children: "关键指标概览"
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                            lineNumber: 126,
                            columnNumber: 11
                        }, this),
                        (0, _jsxdevruntime.jsxDEV)(Text, {
                            type: "secondary",
                            style: {
                                marginLeft: '8px',
                                fontSize: '12px'
                            },
                            children: "数据随筛选条件实时更新"
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                            lineNumber: 129,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                    lineNumber: 124,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                gutter: [
                    16,
                    16
                ],
                children: [
                    (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        xs: 12,
                        sm: 8,
                        lg: 4,
                        children: (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            size: "small",
                            style: cardStyle,
                            bodyStyle: bodyStyle,
                            children: [
                                (0, _jsxdevruntime.jsxDEV)("div", {
                                    children: [
                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: '8px'
                                            },
                                            children: [
                                                (0, _jsxdevruntime.jsxDEV)(_icons.TeamOutlined, {
                                                    style: {
                                                        fontSize: '16px',
                                                        color: '#1890ff',
                                                        marginRight: '8px'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 17
                                                }, this),
                                                (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                    children: [
                                                        (0, _jsxdevruntime.jsxDEV)("span", {
                                                            style: {
                                                                fontSize: '12px',
                                                                color: '#8c8c8c'
                                                            },
                                                            children: "客户总数"
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                            lineNumber: 143,
                                                            columnNumber: 19
                                                        }, this),
                                                        (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                                            title: "当前筛选条件下的客户总数量",
                                                            children: (0, _jsxdevruntime.jsxDEV)(_icons.InfoCircleOutlined, {
                                                                style: {
                                                                    color: '#8c8c8c',
                                                                    fontSize: '12px'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                                lineNumber: 145,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                            lineNumber: 144,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                    lineNumber: 142,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                            lineNumber: 140,
                                            columnNumber: 15
                                        }, this),
                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                fontSize: '24px',
                                                fontWeight: 'bold',
                                                color: '#262626'
                                            },
                                            children: loading ? '-' : formatCustomerCount(data.totalCustomers.value)
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                            lineNumber: 149,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                    lineNumber: 139,
                                    columnNumber: 13
                                }, this),
                                (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center'
                                    },
                                    children: [
                                        getChangeIcon(data.totalCustomers.changeType),
                                        (0, _jsxdevruntime.jsxDEV)(Text, {
                                            style: {
                                                marginLeft: '4px',
                                                fontSize: '12px',
                                                color: getChangeColor(data.totalCustomers.changeType)
                                            },
                                            children: Math.abs(Math.floor(data.totalCustomers.change))
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                            lineNumber: 155,
                                            columnNumber: 15
                                        }, this),
                                        (0, _jsxdevruntime.jsxDEV)(Text, {
                                            type: "secondary",
                                            style: {
                                                marginLeft: '4px',
                                                fontSize: '12px'
                                            },
                                            children: "vs上期"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                            lineNumber: 164,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                    lineNumber: 153,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        xs: 12,
                        sm: 8,
                        lg: 4,
                        children: (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            size: "small",
                            style: cardStyle,
                            bodyStyle: bodyStyle,
                            children: [
                                (0, _jsxdevruntime.jsxDEV)("div", {
                                    children: [
                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: '8px'
                                            },
                                            children: [
                                                (0, _jsxdevruntime.jsxDEV)(_icons.CrownOutlined, {
                                                    style: {
                                                        fontSize: '16px',
                                                        color: '#faad14',
                                                        marginRight: '8px'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 17
                                                }, this),
                                                (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                    children: [
                                                        (0, _jsxdevruntime.jsxDEV)("span", {
                                                            style: {
                                                                fontSize: '12px',
                                                                color: '#8c8c8c'
                                                            },
                                                            children: "高价值客户"
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                            lineNumber: 178,
                                                            columnNumber: 19
                                                        }, this),
                                                        (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                                            title: "价值评分≥80分的客户数量",
                                                            children: (0, _jsxdevruntime.jsxDEV)(_icons.InfoCircleOutlined, {
                                                                style: {
                                                                    color: '#8c8c8c',
                                                                    fontSize: '12px'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                                lineNumber: 180,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                            lineNumber: 179,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                    lineNumber: 177,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                            lineNumber: 175,
                                            columnNumber: 15
                                        }, this),
                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                fontSize: '24px',
                                                fontWeight: 'bold',
                                                color: '#262626'
                                            },
                                            children: loading ? '-' : formatCustomerCount(data.highValueCustomers.value)
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                            lineNumber: 184,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                    lineNumber: 174,
                                    columnNumber: 13
                                }, this),
                                (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center'
                                    },
                                    children: [
                                        getChangeIcon(data.highValueCustomers.changeType),
                                        (0, _jsxdevruntime.jsxDEV)(Text, {
                                            style: {
                                                marginLeft: '4px',
                                                fontSize: '12px',
                                                color: getChangeColor(data.highValueCustomers.changeType)
                                            },
                                            children: Math.abs(Math.floor(data.highValueCustomers.change))
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                            lineNumber: 190,
                                            columnNumber: 15
                                        }, this),
                                        (0, _jsxdevruntime.jsxDEV)(Text, {
                                            type: "secondary",
                                            style: {
                                                marginLeft: '4px',
                                                fontSize: '12px'
                                            },
                                            children: "vs上期"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                            lineNumber: 199,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                    lineNumber: 188,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                            lineNumber: 173,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this),
                    (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        xs: 12,
                        sm: 8,
                        lg: 4,
                        children: (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            size: "small",
                            style: cardStyle,
                            bodyStyle: bodyStyle,
                            children: [
                                (0, _jsxdevruntime.jsxDEV)("div", {
                                    children: [
                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: '8px'
                                            },
                                            children: [
                                                (0, _jsxdevruntime.jsxDEV)(_icons.UserAddOutlined, {
                                                    style: {
                                                        fontSize: '16px',
                                                        color: '#52c41a',
                                                        marginRight: '8px'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                    lineNumber: 211,
                                                    columnNumber: 17
                                                }, this),
                                                (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                    children: [
                                                        (0, _jsxdevruntime.jsxDEV)("span", {
                                                            style: {
                                                                fontSize: '12px',
                                                                color: '#8c8c8c'
                                                            },
                                                            children: "新签客户"
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                            lineNumber: 213,
                                                            columnNumber: 19
                                                        }, this),
                                                        (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                                            title: "本期新签约的客户数量",
                                                            children: (0, _jsxdevruntime.jsxDEV)(_icons.InfoCircleOutlined, {
                                                                style: {
                                                                    color: '#8c8c8c',
                                                                    fontSize: '12px'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                                lineNumber: 215,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                            lineNumber: 214,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                    lineNumber: 212,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                            lineNumber: 210,
                                            columnNumber: 15
                                        }, this),
                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                fontSize: '24px',
                                                fontWeight: 'bold',
                                                color: '#262626'
                                            },
                                            children: loading ? '-' : formatCustomerCount(data.newSignups.value)
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                            lineNumber: 219,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                    lineNumber: 209,
                                    columnNumber: 13
                                }, this),
                                (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center'
                                    },
                                    children: [
                                        getChangeIcon(data.newSignups.changeType),
                                        (0, _jsxdevruntime.jsxDEV)(Text, {
                                            style: {
                                                marginLeft: '4px',
                                                fontSize: '12px',
                                                color: getChangeColor(data.newSignups.changeType)
                                            },
                                            children: Math.abs(Math.floor(data.newSignups.change))
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                            lineNumber: 225,
                                            columnNumber: 15
                                        }, this),
                                        (0, _jsxdevruntime.jsxDEV)(Text, {
                                            type: "secondary",
                                            style: {
                                                marginLeft: '4px',
                                                fontSize: '12px'
                                            },
                                            children: "vs上期"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                            lineNumber: 234,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                    lineNumber: 223,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                            lineNumber: 208,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this),
                    (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        xs: 12,
                        sm: 8,
                        lg: 4,
                        children: (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            size: "small",
                            style: cardStyle,
                            bodyStyle: bodyStyle,
                            children: [
                                (0, _jsxdevruntime.jsxDEV)("div", {
                                    children: [
                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: '8px'
                                            },
                                            children: [
                                                (0, _jsxdevruntime.jsxDEV)(_icons.ExclamationCircleOutlined, {
                                                    style: {
                                                        fontSize: '16px',
                                                        color: '#ff4d4f',
                                                        marginRight: '8px'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                    lineNumber: 246,
                                                    columnNumber: 17
                                                }, this),
                                                (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                    children: [
                                                        (0, _jsxdevruntime.jsxDEV)("span", {
                                                            style: {
                                                                fontSize: '12px',
                                                                color: '#8c8c8c'
                                                            },
                                                            children: "高风险客户"
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                            lineNumber: 248,
                                                            columnNumber: 19
                                                        }, this),
                                                        (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                                            title: "健康度评分<60分或有流失风险的客户",
                                                            children: (0, _jsxdevruntime.jsxDEV)(_icons.InfoCircleOutlined, {
                                                                style: {
                                                                    color: '#8c8c8c',
                                                                    fontSize: '12px'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                                lineNumber: 250,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                            lineNumber: 249,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                    lineNumber: 247,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                            lineNumber: 245,
                                            columnNumber: 15
                                        }, this),
                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                fontSize: '24px',
                                                fontWeight: 'bold',
                                                color: '#262626'
                                            },
                                            children: loading ? '-' : formatCustomerCount(data.highRiskCustomers.value)
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                            lineNumber: 254,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                    lineNumber: 244,
                                    columnNumber: 13
                                }, this),
                                (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center'
                                    },
                                    children: [
                                        getChangeIcon(data.highRiskCustomers.changeType),
                                        (0, _jsxdevruntime.jsxDEV)(Text, {
                                            style: {
                                                marginLeft: '4px',
                                                fontSize: '12px',
                                                color: getChangeColor(data.highRiskCustomers.changeType)
                                            },
                                            children: Math.abs(Math.floor(data.highRiskCustomers.change))
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                            lineNumber: 260,
                                            columnNumber: 15
                                        }, this),
                                        (0, _jsxdevruntime.jsxDEV)(Text, {
                                            type: "secondary",
                                            style: {
                                                marginLeft: '4px',
                                                fontSize: '12px'
                                            },
                                            children: "vs上期"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                            lineNumber: 269,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                    lineNumber: 258,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                            lineNumber: 243,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                        lineNumber: 242,
                        columnNumber: 9
                    }, this),
                    (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        xs: 12,
                        sm: 8,
                        lg: 4,
                        children: (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            size: "small",
                            style: cardStyle,
                            bodyStyle: bodyStyle,
                            children: [
                                (0, _jsxdevruntime.jsxDEV)("div", {
                                    children: [
                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: '8px'
                                            },
                                            children: [
                                                (0, _jsxdevruntime.jsxDEV)(_icons.DollarCircleOutlined, {
                                                    style: {
                                                        fontSize: '16px',
                                                        color: '#722ed1',
                                                        marginRight: '8px'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                    lineNumber: 281,
                                                    columnNumber: 17
                                                }, this),
                                                (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                    children: [
                                                        (0, _jsxdevruntime.jsxDEV)("span", {
                                                            style: {
                                                                fontSize: '12px',
                                                                color: '#8c8c8c'
                                                            },
                                                            children: "本期ARR"
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                            lineNumber: 283,
                                                            columnNumber: 19
                                                        }, this),
                                                        (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                                            title: "Annual Recurring Revenue - 年度经常性收入",
                                                            children: (0, _jsxdevruntime.jsxDEV)(_icons.InfoCircleOutlined, {
                                                                style: {
                                                                    color: '#8c8c8c',
                                                                    fontSize: '12px'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                                lineNumber: 285,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                            lineNumber: 284,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                    lineNumber: 282,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                            lineNumber: 280,
                                            columnNumber: 15
                                        }, this),
                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                fontSize: '24px',
                                                fontWeight: 'bold',
                                                color: '#262626'
                                            },
                                            children: loading ? '-' : formatCurrency(data.currentARR.value)
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                            lineNumber: 289,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                    lineNumber: 279,
                                    columnNumber: 13
                                }, this),
                                (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center'
                                    },
                                    children: [
                                        getChangeIcon(data.currentARR.changeType),
                                        (0, _jsxdevruntime.jsxDEV)(Text, {
                                            style: {
                                                marginLeft: '4px',
                                                fontSize: '12px',
                                                color: getChangeColor(data.currentARR.changeType)
                                            },
                                            children: formatCurrency(Math.abs(data.currentARR.change))
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                            lineNumber: 295,
                                            columnNumber: 15
                                        }, this),
                                        (0, _jsxdevruntime.jsxDEV)(Text, {
                                            type: "secondary",
                                            style: {
                                                marginLeft: '4px',
                                                fontSize: '12px'
                                            },
                                            children: "vs上期"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                            lineNumber: 304,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                    lineNumber: 293,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                            lineNumber: 278,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                        lineNumber: 277,
                        columnNumber: 9
                    }, this),
                    (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        xs: 12,
                        sm: 8,
                        lg: 4,
                        children: (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            size: "small",
                            style: cardStyle,
                            bodyStyle: bodyStyle,
                            children: [
                                (0, _jsxdevruntime.jsxDEV)("div", {
                                    children: [
                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: '8px'
                                            },
                                            children: [
                                                (0, _jsxdevruntime.jsxDEV)(_icons.PercentageOutlined, {
                                                    style: {
                                                        fontSize: '16px',
                                                        color: '#13c2c2',
                                                        marginRight: '8px'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                    lineNumber: 316,
                                                    columnNumber: 17
                                                }, this),
                                                (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                    children: [
                                                        (0, _jsxdevruntime.jsxDEV)("span", {
                                                            style: {
                                                                fontSize: '12px',
                                                                color: '#8c8c8c'
                                                            },
                                                            children: "留存率"
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                            lineNumber: 318,
                                                            columnNumber: 19
                                                        }, this),
                                                        (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                                            title: "客户留存和收入留存指标",
                                                            children: (0, _jsxdevruntime.jsxDEV)(_icons.InfoCircleOutlined, {
                                                                style: {
                                                                    color: '#8c8c8c',
                                                                    fontSize: '12px'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                                lineNumber: 320,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                            lineNumber: 319,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                    lineNumber: 317,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                            lineNumber: 315,
                                            columnNumber: 15
                                        }, this),
                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                fontSize: '20px',
                                                fontWeight: 'bold',
                                                color: '#262626'
                                            },
                                            children: [
                                                "GRR: ",
                                                loading ? '-' : `${data.retentionRates.grr}%`
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                            lineNumber: 324,
                                            columnNumber: 15
                                        }, this),
                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                fontSize: '16px',
                                                fontWeight: 'bold',
                                                color: '#262626',
                                                marginTop: '4px'
                                            },
                                            children: [
                                                "NRR: ",
                                                loading ? '-' : `${data.retentionRates.nrr}%`
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                            lineNumber: 327,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                    lineNumber: 314,
                                    columnNumber: 13
                                }, this),
                                (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    },
                                    children: [
                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center'
                                            },
                                            children: [
                                                getChangeIcon(data.retentionRates.grrChange > 0 ? 'increase' : data.retentionRates.grrChange < 0 ? 'decrease' : 'stable'),
                                                (0, _jsxdevruntime.jsxDEV)(Text, {
                                                    style: {
                                                        marginLeft: '4px',
                                                        fontSize: '10px',
                                                        color: getChangeColor(data.retentionRates.grrChange > 0 ? 'increase' : data.retentionRates.grrChange < 0 ? 'decrease' : 'stable')
                                                    },
                                                    children: [
                                                        Math.abs(data.retentionRates.grrChange),
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                    lineNumber: 334,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                            lineNumber: 332,
                                            columnNumber: 15
                                        }, this),
                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center'
                                            },
                                            children: [
                                                getChangeIcon(data.retentionRates.nrrChange > 0 ? 'increase' : data.retentionRates.nrrChange < 0 ? 'decrease' : 'stable'),
                                                (0, _jsxdevruntime.jsxDEV)(Text, {
                                                    style: {
                                                        marginLeft: '4px',
                                                        fontSize: '10px',
                                                        color: getChangeColor(data.retentionRates.nrrChange > 0 ? 'increase' : data.retentionRates.nrrChange < 0 ? 'decrease' : 'stable')
                                                    },
                                                    children: [
                                                        Math.abs(data.retentionRates.nrrChange),
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                                    lineNumber: 346,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                            lineNumber: 344,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                    lineNumber: 331,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                            lineNumber: 313,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                        lineNumber: 312,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/components/CustomerSuccess/KPISummary.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
};
_c = KPISummary;
var _default = KPISummary;
var _c;
$RefreshReg$(_c, "KPISummary");
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
"src/components/CustomerSuccess/NewCustomerTieringTab.tsx": function (module, exports, __mako_require__){
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
var _reactrefresh = _interop_require_wildcard._(__mako_require__("node_modules/react-refresh/runtime.js"));
var _jsxdevruntime = __mako_require__("node_modules/react/jsx-dev-runtime.js");
var _react = _interop_require_wildcard._(__mako_require__("node_modules/react/index.js"));
var _antd = __mako_require__("node_modules/antd/es/index.js");
var _CustomerDetailModal = _interop_require_default._(__mako_require__("src/components/CustomerSuccess/CustomerDetailModal.tsx"));
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
const NewCustomerTieringTab = ({ customers, onCustomerSelect })=>{
    _s();
    const [scaleMetric, setScaleMetric] = (0, _react.useState)('人数');
    const [scaleThreshold, setScaleThreshold] = (0, _react.useState)(100);
    const [priceThreshold, setPriceThreshold] = (0, _react.useState)(()=>{
        if (customers.length === 0) return 50000;
        const prices = customers.map((c)=>c.unitPrice).filter((p)=>p > 0);
        if (prices.length === 0) return 50000;
        const avgPrice = prices.reduce((sum, p)=>sum + p, 0) / prices.length;
        return Math.round(avgPrice / 1000) * 1000;
    });
    const [selectedIndustries, setSelectedIndustries] = (0, _react.useState)([]);
    const [search, setSearch] = (0, _react.useState)('');
    const [bubbleTip, setBubbleTip] = (0, _react.useState)(null);
    const [customerDetailVisible, setCustomerDetailVisible] = (0, _react.useState)(false);
    const [selectedCustomer, setSelectedCustomer] = (0, _react.useState)(null);
    const chartRef = (0, _react.useRef)(null);
    const cardStyle = {
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        border: '1px solid #f0f0f0',
        background: '#ffffff'
    };
    const industries = [
        '制造业',
        '金融',
        '零售',
        '医疗',
        '教育',
        '科技',
        '房地产',
        '物流'
    ];
    const industryColors = {
        制造业: '#1890ff',
        金融: '#52c41a',
        零售: '#fa8c16',
        医疗: '#eb2f96',
        教育: '#722ed1',
        科技: '#13c2c2',
        房地产: '#faad14',
        物流: '#f5222d'
    };
    const quadrantColors = {
        领先者: '#52c41a',
        精品标杆: '#1890ff',
        规模潜力: '#fa8c16',
        追赶者: '#bfbfbf'
    };
    const quadrantLabels = {
        领先者: {
            name: '领先者',
            desc: '大规模×高客单'
        },
        精品标杆: {
            name: '精品标杆',
            desc: '小规模×高客单'
        },
        规模潜力: {
            name: '规模潜力',
            desc: '大规模×低客单'
        },
        追赶者: {
            name: '追赶者',
            desc: '小规模×低客单'
        }
    };
    function getQuadrant(scale, price) {
        if (scale >= scaleThreshold && price >= priceThreshold) return '领先者';
        if (scale < scaleThreshold && price >= priceThreshold) return '精品标杆';
        if (scale >= scaleThreshold && price < priceThreshold) return '规模潜力';
        return '追赶者';
    }
    const industryBubbles = (0, _react.useMemo)(()=>{
        const bubbles = {};
        for (const industry of industries)bubbles[industry] = {
            industry,
            newCustomerCount: 0,
            avgUnitPrice: 0,
            avgScale: 0,
            totalArr: 0,
            topCustomers: [],
            quadrant: '追赶者'
        };
        const industryCustomers = {};
        for (const industry of industries)industryCustomers[industry] = [];
        for (const customer of customers)if (customer.industry && industryCustomers[customer.industry]) industryCustomers[customer.industry].push(customer);
        for (const industry of industries){
            const industryList = industryCustomers[industry];
            if (industryList.length === 0) continue;
            const bubble = bubbles[industry];
            bubble.newCustomerCount = industryList.length;
            bubble.avgUnitPrice = Math.round(industryList.reduce((sum, c)=>sum + c.unitPrice, 0) / industryList.length);
            bubble.avgScale = Math.round(industryList.reduce((sum, c)=>sum + c.customerScale, 0) / industryList.length);
            bubble.totalArr = industryList.reduce((sum, c)=>sum + c.arr, 0);
            bubble.topCustomers = industryList.sort((a, b)=>b.arr - a.arr).slice(0, 3).map((c)=>c.name);
            bubble.quadrant = getQuadrant(bubble.avgScale, bubble.avgUnitPrice);
        }
        return Object.values(bubbles).filter((b)=>b.newCustomerCount > 0);
    }, [
        customers,
        scaleThreshold,
        priceThreshold
    ]);
    const filteredCustomers = (0, _react.useMemo)(()=>{
        let list = customers;
        if (selectedIndustries.length > 0) list = list.filter((c)=>selectedIndustries.includes(c.industry));
        if (search.trim()) {
            const k = search.trim().toLowerCase();
            list = list.filter((c)=>c.name.toLowerCase().includes(k) || c.csm.toLowerCase().includes(k) || c.industry.includes(k));
        }
        return list.map((c)=>({
                ...c,
                quadrant: getQuadrant(c.customerScale, c.unitPrice)
            }));
    }, [
        customers,
        selectedIndustries,
        search,
        scaleThreshold,
        priceThreshold
    ]);
    const priceRange = (0, _react.useMemo)(()=>{
        if (customers.length === 0) return {
            min: 10000,
            max: 200000
        };
        const prices = customers.map((c)=>c.unitPrice).filter((p)=>p > 0);
        if (prices.length === 0) return {
            min: 10000,
            max: 200000
        };
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const buffer = (maxPrice - minPrice) * 0.2;
        const adjustedMin = Math.max(1000, Math.floor((minPrice - buffer) / 1000) * 1000);
        const adjustedMax = Math.ceil((maxPrice + buffer) / 1000) * 1000;
        return {
            min: adjustedMin,
            max: adjustedMax
        };
    }, [
        customers
    ]);
    const chartWidth = 500;
    const chartHeight = 300;
    const padding = 60;
    const plotWidth = chartWidth - padding * 2;
    const plotHeight = chartHeight - padding * 2;
    const maxScale = Math.max(1, ...industryBubbles.map((b)=>b.avgScale));
    const maxPrice = Math.max(1, ...industryBubbles.map((b)=>b.avgUnitPrice));
    const maxBubbleCount = Math.max(1, ...industryBubbles.map((b)=>b.newCustomerCount));
    const columns = [
        {
            title: '客户名称',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            width: 200,
            sorter: (a, b)=>a.name.localeCompare(b.name),
            render: (_, record)=>(0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                    children: [
                        (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                            style: {
                                backgroundColor: record.logoColor
                            },
                            children: record.name.charAt(0)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                            lineNumber: 213,
                            columnNumber: 11
                        }, this),
                        (0, _jsxdevruntime.jsxDEV)("span", {
                            children: record.name
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                            lineNumber: 216,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                    lineNumber: 212,
                    columnNumber: 9
                }, this)
        },
        {
            title: '负责人CSM',
            dataIndex: 'csm',
            key: 'csm',
            width: 120,
            sorter: (a, b)=>a.csm.localeCompare(b.csm)
        },
        {
            title: '所属象限',
            dataIndex: 'quadrant',
            key: 'quadrant',
            width: 120,
            filters: Object.keys(quadrantLabels).map((q)=>({
                    text: q,
                    value: q
                })),
            onFilter: (value, record)=>record.quadrant === value,
            render: (quadrant)=>(0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                    color: quadrantColors[quadrant],
                    children: quadrant
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                    lineNumber: 235,
                    columnNumber: 9
                }, this)
        },
        {
            title: '行业',
            dataIndex: 'industry',
            key: 'industry',
            width: 100,
            filters: industries.map((i)=>({
                    text: i,
                    value: i
                })),
            onFilter: (value, record)=>record.industry === value,
            render: (industry)=>(0, _jsxdevruntime.jsxDEV)(_antd.Badge, {
                    color: industryColors[industry],
                    text: industry
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                    lineNumber: 248,
                    columnNumber: 9
                }, this)
        },
        {
            title: `客户规模 (${scaleMetric})`,
            dataIndex: 'customerScale',
            key: 'customerScale',
            width: 120,
            sorter: (a, b)=>a.customerScale - b.customerScale,
            render: (scale)=>scale.toLocaleString()
        },
        {
            title: '客单价 (¥)',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
            width: 120,
            sorter: (a, b)=>a.unitPrice - b.unitPrice,
            render: (price)=>`¥${(price / 10000).toFixed(1)}万`
        },
        {
            title: '签约日期',
            dataIndex: 'signDate',
            key: 'signDate',
            width: 120,
            sorter: (a, b)=>new Date(a.signDate).getTime() - new Date(b.signDate).getTime(),
            defaultSortOrder: 'descend'
        },
        {
            title: '首90天激活率',
            dataIndex: 'activationRate',
            key: 'activationRate',
            width: 130,
            sorter: (a, b)=>a.activationRate - b.activationRate,
            render: (rate)=>(0, _jsxdevruntime.jsxDEV)(Text, {
                    style: {
                        color: rate >= 80 ? '#52c41a' : rate >= 60 ? '#fa8c16' : '#ff4d4f'
                    },
                    children: [
                        rate,
                        "%"
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                    lineNumber: 282,
                    columnNumber: 9
                }, this)
        }
    ];
    return (0, _jsxdevruntime.jsxDEV)("div", {
        children: [
            (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                style: {
                    ...cardStyle,
                    marginBottom: 16
                },
                bodyStyle: {
                    padding: 16
                },
                children: (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                    gutter: 16,
                    align: "middle",
                    children: [
                        (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            children: (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                children: [
                                    (0, _jsxdevruntime.jsxDEV)(Text, {
                                        children: "规模口径："
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                        lineNumber: 296,
                                        columnNumber: 15
                                    }, this),
                                    (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                        value: scaleMetric,
                                        onChange: setScaleMetric,
                                        style: {
                                            width: 100
                                        },
                                        children: [
                                            (0, _jsxdevruntime.jsxDEV)(Option, {
                                                value: "人数",
                                                children: "人数"
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                lineNumber: 298,
                                                columnNumber: 17
                                            }, this),
                                            (0, _jsxdevruntime.jsxDEV)(Option, {
                                                value: "席位",
                                                children: "席位"
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                lineNumber: 299,
                                                columnNumber: 17
                                            }, this),
                                            (0, _jsxdevruntime.jsxDEV)(Option, {
                                                value: "门店数",
                                                children: "门店数"
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                lineNumber: 300,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                        lineNumber: 297,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                lineNumber: 295,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                            lineNumber: 294,
                            columnNumber: 11
                        }, this),
                        (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            children: (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                children: [
                                    (0, _jsxdevruntime.jsxDEV)(Text, {
                                        children: "规模阈值："
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                        lineNumber: 306,
                                        columnNumber: 15
                                    }, this),
                                    (0, _jsxdevruntime.jsxDEV)(_antd.Slider, {
                                        style: {
                                            width: 120
                                        },
                                        min: 50,
                                        max: 500,
                                        value: scaleThreshold,
                                        onChange: setScaleThreshold,
                                        tooltip: {
                                            formatter: (v)=>`${v}${scaleMetric === '人数' ? '人' : scaleMetric === '席位' ? '席' : '家'}`
                                        }
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                        lineNumber: 307,
                                        columnNumber: 15
                                    }, this),
                                    (0, _jsxdevruntime.jsxDEV)(Text, {
                                        type: "secondary",
                                        children: scaleThreshold
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                        lineNumber: 315,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                lineNumber: 305,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                            lineNumber: 304,
                            columnNumber: 11
                        }, this),
                        (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            children: (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                children: [
                                    (0, _jsxdevruntime.jsxDEV)(Text, {
                                        children: "客单价阈值："
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                        lineNumber: 320,
                                        columnNumber: 15
                                    }, this),
                                    (0, _jsxdevruntime.jsxDEV)(_antd.Slider, {
                                        style: {
                                            width: 120
                                        },
                                        min: priceRange.min,
                                        max: priceRange.max,
                                        step: Math.max(1000, Math.round((priceRange.max - priceRange.min) / 40)),
                                        value: priceThreshold,
                                        onChange: setPriceThreshold,
                                        tooltip: {
                                            formatter: (v)=>`¥${(v / 10000).toFixed(1)}万`
                                        }
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                        lineNumber: 321,
                                        columnNumber: 15
                                    }, this),
                                    (0, _jsxdevruntime.jsxDEV)(Text, {
                                        type: "secondary",
                                        children: [
                                            "¥",
                                            (priceThreshold / 10000).toFixed(1),
                                            "万"
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                        lineNumber: 330,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                lineNumber: 319,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                            lineNumber: 318,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                    lineNumber: 293,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                lineNumber: 292,
                columnNumber: 7
            }, this),
            (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                style: {
                    ...cardStyle,
                    marginBottom: 16
                },
                title: (0, _jsxdevruntime.jsxDEV)("span", {
                    style: {
                        fontWeight: 600
                    },
                    children: "新签客户分层 - 四象限气泡图"
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                    lineNumber: 339,
                    columnNumber: 16
                }, void 0),
                extra: (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                    children: [
                        (0, _jsxdevruntime.jsxDEV)(Text, {
                            type: "secondary",
                            children: "气泡大小 = 新签客户数"
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                            lineNumber: 342,
                            columnNumber: 13
                        }, void 0),
                        (0, _jsxdevruntime.jsxDEV)(Text, {
                            type: "secondary",
                            children: "颜色 = 行业类目"
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                            lineNumber: 343,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                    lineNumber: 341,
                    columnNumber: 11
                }, void 0),
                children: (0, _jsxdevruntime.jsxDEV)("div", {
                    ref: chartRef,
                    style: {
                        width: '100%',
                        height: 360,
                        position: 'relative',
                        overflow: 'hidden'
                    },
                    children: [
                        (bubbleTip === null || bubbleTip === void 0 ? void 0 : bubbleTip.visible) && (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                position: 'absolute',
                                left: bubbleTip.x,
                                top: bubbleTip.y,
                                background: '#fff',
                                border: '1px solid #f0f0f0',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                borderRadius: 6,
                                padding: '12px 16px',
                                fontSize: 12,
                                pointerEvents: 'none',
                                zIndex: 10,
                                minWidth: 200
                            },
                            children: bubbleTip.html
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                            lineNumber: 353,
                            columnNumber: 13
                        }, this),
                        (0, _jsxdevruntime.jsxDEV)("svg", {
                            viewBox: `0 0 ${chartWidth} ${chartHeight}`,
                            style: {
                                width: '100%',
                                height: '100%'
                            },
                            children: [
                                (0, _jsxdevruntime.jsxDEV)("rect", {
                                    x: padding,
                                    y: padding,
                                    width: plotWidth / 2,
                                    height: plotHeight / 2,
                                    fill: "#f6ffed",
                                    fillOpacity: 0.3
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 376,
                                    columnNumber: 13
                                }, this),
                                (0, _jsxdevruntime.jsxDEV)("rect", {
                                    x: padding + plotWidth / 2,
                                    y: padding,
                                    width: plotWidth / 2,
                                    height: plotHeight / 2,
                                    fill: "#e6f7ff",
                                    fillOpacity: 0.3
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 377,
                                    columnNumber: 13
                                }, this),
                                (0, _jsxdevruntime.jsxDEV)("rect", {
                                    x: padding,
                                    y: padding + plotHeight / 2,
                                    width: plotWidth / 2,
                                    height: plotHeight / 2,
                                    fill: "#fff7e6",
                                    fillOpacity: 0.3
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 378,
                                    columnNumber: 13
                                }, this),
                                (0, _jsxdevruntime.jsxDEV)("rect", {
                                    x: padding + plotWidth / 2,
                                    y: padding + plotHeight / 2,
                                    width: plotWidth / 2,
                                    height: plotHeight / 2,
                                    fill: "#f5f5f5",
                                    fillOpacity: 0.3
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 379,
                                    columnNumber: 13
                                }, this),
                                (0, _jsxdevruntime.jsxDEV)("text", {
                                    x: padding + plotWidth / 4,
                                    y: padding + 20,
                                    textAnchor: "middle",
                                    fontSize: "14",
                                    fontWeight: "600",
                                    fill: "#52c41a",
                                    children: "精品标杆"
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 382,
                                    columnNumber: 13
                                }, this),
                                (0, _jsxdevruntime.jsxDEV)("text", {
                                    x: padding + plotWidth * 3 / 4,
                                    y: padding + 20,
                                    textAnchor: "middle",
                                    fontSize: "14",
                                    fontWeight: "600",
                                    fill: "#1890ff",
                                    children: "领先者"
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 383,
                                    columnNumber: 13
                                }, this),
                                (0, _jsxdevruntime.jsxDEV)("text", {
                                    x: padding + plotWidth / 4,
                                    y: padding + plotHeight - 10,
                                    textAnchor: "middle",
                                    fontSize: "14",
                                    fontWeight: "600",
                                    fill: "#bfbfbf",
                                    children: "追赶者"
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 384,
                                    columnNumber: 13
                                }, this),
                                (0, _jsxdevruntime.jsxDEV)("text", {
                                    x: padding + plotWidth * 3 / 4,
                                    y: padding + plotHeight - 10,
                                    textAnchor: "middle",
                                    fontSize: "14",
                                    fontWeight: "600",
                                    fill: "#fa8c16",
                                    children: "规模潜力"
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 385,
                                    columnNumber: 13
                                }, this),
                                (0, _jsxdevruntime.jsxDEV)("line", {
                                    x1: padding,
                                    y1: padding,
                                    x2: padding,
                                    y2: padding + plotHeight,
                                    stroke: "#d9d9d9",
                                    strokeWidth: 2
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 388,
                                    columnNumber: 13
                                }, this),
                                (0, _jsxdevruntime.jsxDEV)("line", {
                                    x1: padding,
                                    y1: padding + plotHeight,
                                    x2: padding + plotWidth,
                                    y2: padding + plotHeight,
                                    stroke: "#d9d9d9",
                                    strokeWidth: 2
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 389,
                                    columnNumber: 13
                                }, this),
                                (0, _jsxdevruntime.jsxDEV)("line", {
                                    x1: padding + scaleThreshold / maxScale * plotWidth,
                                    y1: padding,
                                    x2: padding + scaleThreshold / maxScale * plotWidth,
                                    y2: padding + plotHeight,
                                    stroke: "#1890ff",
                                    strokeWidth: 2,
                                    strokeDasharray: "5,5"
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 392,
                                    columnNumber: 13
                                }, this),
                                (0, _jsxdevruntime.jsxDEV)("line", {
                                    x1: padding,
                                    y1: padding + plotHeight - priceThreshold / maxPrice * plotHeight,
                                    x2: padding + plotWidth,
                                    y2: padding + plotHeight - priceThreshold / maxPrice * plotHeight,
                                    stroke: "#1890ff",
                                    strokeWidth: 2,
                                    strokeDasharray: "5,5"
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 401,
                                    columnNumber: 13
                                }, this),
                                Array.from({
                                    length: 6
                                }).map((_, i)=>{
                                    const value = maxScale / 5 * i;
                                    const x = padding + value / maxScale * plotWidth;
                                    return (0, _jsxdevruntime.jsxDEV)("g", {
                                        children: [
                                            (0, _jsxdevruntime.jsxDEV)("line", {
                                                x1: x,
                                                y1: padding + plotHeight,
                                                x2: x,
                                                y2: padding + plotHeight + 5,
                                                stroke: "#d9d9d9"
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                lineNumber: 417,
                                                columnNumber: 19
                                            }, this),
                                            (0, _jsxdevruntime.jsxDEV)("text", {
                                                x: x,
                                                y: padding + plotHeight + 20,
                                                textAnchor: "middle",
                                                fontSize: "10",
                                                fill: "#8c8c8c",
                                                children: Math.round(value)
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                lineNumber: 418,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                        lineNumber: 416,
                                        columnNumber: 17
                                    }, this);
                                }),
                                Array.from({
                                    length: 6
                                }).map((_, i)=>{
                                    const value = maxPrice / 5 * i;
                                    const y = padding + plotHeight - value / maxPrice * plotHeight;
                                    return (0, _jsxdevruntime.jsxDEV)("g", {
                                        children: [
                                            (0, _jsxdevruntime.jsxDEV)("line", {
                                                x1: padding - 5,
                                                y1: y,
                                                x2: padding,
                                                y2: y,
                                                stroke: "#d9d9d9"
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                lineNumber: 431,
                                                columnNumber: 19
                                            }, this),
                                            (0, _jsxdevruntime.jsxDEV)("text", {
                                                x: padding - 10,
                                                y: y + 4,
                                                textAnchor: "end",
                                                fontSize: "10",
                                                fill: "#8c8c8c",
                                                children: [
                                                    (value / 10000).toFixed(0),
                                                    "万"
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                lineNumber: 432,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                        lineNumber: 430,
                                        columnNumber: 17
                                    }, this);
                                }),
                                industryBubbles.map((bubble)=>{
                                    const x = padding + bubble.avgScale / maxScale * plotWidth;
                                    const y = padding + plotHeight - bubble.avgUnitPrice / maxPrice * plotHeight;
                                    const r = 8 + bubble.newCustomerCount / maxBubbleCount * 20;
                                    const color = industryColors[bubble.industry];
                                    const tooltipContent = (0, _jsxdevruntime.jsxDEV)("div", {
                                        children: [
                                            (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    fontWeight: 600,
                                                    marginBottom: 8,
                                                    color: color
                                                },
                                                children: bubble.industry
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                lineNumber: 448,
                                                columnNumber: 19
                                            }, this),
                                            (0, _jsxdevruntime.jsxDEV)("div", {
                                                children: [
                                                    "新签客户数：",
                                                    bubble.newCustomerCount
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                lineNumber: 449,
                                                columnNumber: 19
                                            }, this),
                                            (0, _jsxdevruntime.jsxDEV)("div", {
                                                children: [
                                                    "平均客单价：¥",
                                                    (bubble.avgUnitPrice / 10000).toFixed(1),
                                                    "万"
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                lineNumber: 450,
                                                columnNumber: 19
                                            }, this),
                                            (0, _jsxdevruntime.jsxDEV)("div", {
                                                children: [
                                                    "平均规模：",
                                                    bubble.avgScale,
                                                    scaleMetric === '人数' ? '人' : scaleMetric === '席位' ? '席' : '家'
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                lineNumber: 451,
                                                columnNumber: 19
                                            }, this),
                                            (0, _jsxdevruntime.jsxDEV)("div", {
                                                children: [
                                                    "总ARR：¥",
                                                    (bubble.totalArr / 10000).toFixed(1),
                                                    "万"
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                lineNumber: 452,
                                                columnNumber: 19
                                            }, this),
                                            (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    marginTop: 8
                                                },
                                                children: "Top3客户："
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                lineNumber: 453,
                                                columnNumber: 19
                                            }, this),
                                            bubble.topCustomers.map((name, idx)=>(0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        marginLeft: 8,
                                                        fontSize: 11
                                                    },
                                                    children: [
                                                        "• ",
                                                        name
                                                    ]
                                                }, idx, true, {
                                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                    lineNumber: 455,
                                                    columnNumber: 21
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                        lineNumber: 447,
                                        columnNumber: 17
                                    }, this);
                                    return (0, _jsxdevruntime.jsxDEV)("circle", {
                                        cx: x,
                                        cy: y,
                                        r: r,
                                        fill: color,
                                        fillOpacity: 0.6,
                                        stroke: color,
                                        strokeWidth: 2,
                                        style: {
                                            cursor: 'pointer'
                                        },
                                        onMouseEnter: (e)=>{
                                            try {
                                                var _chartRef_current;
                                                const rect = (_chartRef_current = chartRef.current) === null || _chartRef_current === void 0 ? void 0 : _chartRef_current.getBoundingClientRect();
                                                if (rect && e.clientX !== undefined && e.clientY !== undefined) setBubbleTip({
                                                    visible: true,
                                                    x: e.clientX - rect.left + 12,
                                                    y: e.clientY - rect.top + 12,
                                                    html: tooltipContent
                                                });
                                            } catch (error) {
                                                console.warn('Error in bubble tooltip:', error);
                                                setBubbleTip(null);
                                            }
                                        },
                                        onMouseMove: (e)=>{
                                            try {
                                                var _chartRef_current;
                                                const rect = (_chartRef_current = chartRef.current) === null || _chartRef_current === void 0 ? void 0 : _chartRef_current.getBoundingClientRect();
                                                if (rect && bubbleTip && e.clientX !== undefined && e.clientY !== undefined) setBubbleTip((prev)=>prev ? {
                                                        ...prev,
                                                        x: e.clientX - rect.left + 12,
                                                        y: e.clientY - rect.top + 12
                                                    } : prev);
                                            } catch (error) {
                                                console.warn('Error in bubble tooltip move:', error);
                                                setBubbleTip(null);
                                            }
                                        },
                                        onMouseLeave: ()=>setBubbleTip(null),
                                        onClick: ()=>{
                                            setSelectedIndustries([
                                                bubble.industry
                                            ]);
                                        }
                                    }, bubble.industry, false, {
                                        fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                        lineNumber: 461,
                                        columnNumber: 17
                                    }, this);
                                }),
                                (0, _jsxdevruntime.jsxDEV)("text", {
                                    x: padding + plotWidth / 2,
                                    y: chartHeight - 10,
                                    textAnchor: "middle",
                                    fontSize: "12",
                                    fill: "#8c8c8c",
                                    children: [
                                        "客户规模 (",
                                        scaleMetric,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 511,
                                    columnNumber: 13
                                }, this),
                                (0, _jsxdevruntime.jsxDEV)("text", {
                                    x: 20,
                                    y: padding + plotHeight / 2,
                                    textAnchor: "middle",
                                    fontSize: "12",
                                    fill: "#8c8c8c",
                                    transform: `rotate(-90, 20, ${padding + plotHeight / 2})`,
                                    children: "客单价 (万元)"
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 514,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                            lineNumber: 371,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                    lineNumber: 348,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                lineNumber: 337,
                columnNumber: 7
            }, this),
            (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                style: {
                    ...cardStyle
                },
                title: (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%'
                    },
                    children: [
                        (0, _jsxdevruntime.jsxDEV)("span", {
                            style: {
                                fontSize: 16,
                                fontWeight: 600
                            },
                            children: [
                                "新签客户清单 (",
                                filteredCustomers.length,
                                ")"
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                            lineNumber: 526,
                            columnNumber: 13
                        }, void 0),
                        (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                            children: [
                                selectedIndustries.length > 0 && (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                    children: [
                                        (0, _jsxdevruntime.jsxDEV)(Text, {
                                            type: "secondary",
                                            children: "已选行业："
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                            lineNumber: 530,
                                            columnNumber: 19
                                        }, void 0),
                                        selectedIndustries.map((industry)=>(0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                color: industryColors[industry],
                                                closable: true,
                                                onClose: ()=>setSelectedIndustries((prev)=>prev.filter((i)=>i !== industry)),
                                                children: industry
                                            }, industry, false, {
                                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                lineNumber: 532,
                                                columnNumber: 21
                                            }, void 0)),
                                        (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                            size: "small",
                                            onClick: ()=>setSelectedIndustries([]),
                                            children: "清除筛选"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                            lineNumber: 541,
                                            columnNumber: 19
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 529,
                                    columnNumber: 17
                                }, void 0),
                                (0, _jsxdevruntime.jsxDEV)(_antd.Input.Search, {
                                    allowClear: true,
                                    placeholder: "搜索客户/CSM/行业...",
                                    style: {
                                        width: 280
                                    },
                                    onSearch: setSearch,
                                    onChange: (e)=>setSearch(e.target.value)
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 546,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                            lineNumber: 527,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                    lineNumber: 525,
                    columnNumber: 11
                }, void 0),
                children: (0, _jsxdevruntime.jsxDEV)(_antd.Table, {
                    rowKey: "id",
                    dataSource: filteredCustomers,
                    columns: columns,
                    pagination: {
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true
                    },
                    scroll: {
                        x: 1200
                    },
                    onRow: (record)=>({
                            onClick: ()=>{
                                setSelectedCustomer(record);
                                setCustomerDetailVisible(true);
                                onCustomerSelect === null || onCustomerSelect === void 0 || onCustomerSelect(record);
                            },
                            style: {
                                cursor: 'pointer'
                            }
                        })
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                    lineNumber: 557,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                lineNumber: 522,
                columnNumber: 7
            }, this),
            (0, _jsxdevruntime.jsxDEV)(_CustomerDetailModal.default, {
                visible: customerDetailVisible,
                customer: selectedCustomer,
                onClose: ()=>{
                    setCustomerDetailVisible(false);
                    setSelectedCustomer(null);
                }
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                lineNumber: 575,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
        lineNumber: 290,
        columnNumber: 5
    }, this);
};
_s(NewCustomerTieringTab, "zPBwz83teqkPsA9eQjN8nCQXVA4=");
_c = NewCustomerTieringTab;
var _default = NewCustomerTieringTab;
var _c;
$RefreshReg$(_c, "NewCustomerTieringTab");
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
"src/components/CustomerSuccess/ValueLifecycleTab.tsx": function (module, exports, __mako_require__){
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
const ValueLifecycleTab = ({ customers, onCustomerSelect })=>{
    _s();
    const [selected, setSelected] = (0, _react.useState)(null);
    const [search, setSearch] = (0, _react.useState)('');
    const listRef = (0, _react.useRef)(null);
    const [listHighlight, setListHighlight] = (0, _react.useState)(false);
    const highlightTimerRef = (0, _react.useRef)(null);
    const [bubbleTip, setBubbleTip] = (0, _react.useState)(null);
    const [sankeyTip, setSankeyTip] = (0, _react.useState)(null);
    const [xAxisRange, setXAxisRange] = (0, _react.useState)({
        min: 0,
        max: 100
    });
    const [yAxisRange, setYAxisRange] = (0, _react.useState)({
        min: 0,
        max: 100
    });
    const [isDragging, setIsDragging] = (0, _react.useState)(false);
    const [dragStart, setDragStart] = (0, _react.useState)({
        x: 0,
        y: 0
    });
    const [panOffset, setPanOffset] = (0, _react.useState)({
        x: 0,
        y: 0
    });
    const cardStyle = {
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        border: '1px solid #f0f0f0',
        background: '#ffffff'
    };
    const valueTiers = [
        '高价值',
        '中价值',
        '低价值'
    ];
    const lifecycleStages = [
        '导入期',
        '成长期',
        '成熟期',
        '衰退期'
    ];
    const valueTierScoreHint = {
        高价值: '评分区间: 80 - 100',
        中价值: '评分区间: 60 - 79',
        低价值: '评分区间: 0 - 59'
    };
    const valueTierRowColor = {
        高价值: '#2f54eb14',
        中价值: '#2f54eb0d',
        低价值: '#2f54eb08'
    };
    const lifecycleAccentColor = {
        导入期: '#40a9ff',
        成长期: '#fa8c16',
        成熟期: '#52c41a',
        衰退期: '#bfbfbf'
    };
    function getCellStyle(valueTier, stage, selected) {
        return {
            background: valueTierRowColor[valueTier],
            border: `1px solid ${selected ? lifecycleAccentColor[stage] : '#f0f0f0'}`,
            borderRadius: 10,
            padding: 16,
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: selected ? `0 0 0 3px ${lifecycleAccentColor[stage]}22` : 'none'
        };
    }
    const handleZoomIn = ()=>{
        const xCenter = (xAxisRange.min + xAxisRange.max) / 2;
        const yCenter = (yAxisRange.min + yAxisRange.max) / 2;
        const xRange = (xAxisRange.max - xAxisRange.min) * 0.7;
        const yRange = (yAxisRange.max - yAxisRange.min) * 0.7;
        setXAxisRange({
            min: Math.max(0, xCenter - xRange / 2),
            max: Math.min(100, xCenter + xRange / 2)
        });
        setYAxisRange({
            min: Math.max(0, yCenter - yRange / 2),
            max: Math.min(100, yCenter + yRange / 2)
        });
    };
    const handleZoomOut = ()=>{
        const xCenter = (xAxisRange.min + xAxisRange.max) / 2;
        const yCenter = (yAxisRange.min + yAxisRange.max) / 2;
        const xRange = (xAxisRange.max - xAxisRange.min) * 1.4;
        const yRange = (yAxisRange.max - yAxisRange.min) * 1.4;
        setXAxisRange({
            min: Math.max(0, xCenter - xRange / 2),
            max: Math.min(100, xCenter + xRange / 2)
        });
        setYAxisRange({
            min: Math.max(0, yCenter - yRange / 2),
            max: Math.min(100, yCenter + yRange / 2)
        });
    };
    const handleResetZoom = ()=>{
        setXAxisRange({
            min: 0,
            max: 100
        });
        setYAxisRange({
            min: 0,
            max: 100
        });
        setPanOffset({
            x: 0,
            y: 0
        });
    };
    const handleMouseDown = (e)=>{
        const isZoomed = xAxisRange.min > 0 || xAxisRange.max < 100 || yAxisRange.min > 0 || yAxisRange.max < 100;
        if (isZoomed) {
            setIsDragging(true);
            setDragStart({
                x: e.clientX,
                y: e.clientY
            });
        }
    };
    const handleMouseMove = (e)=>{
        if (isDragging) {
            const deltaX = (e.clientX - dragStart.x) * 0.1;
            const deltaY = (e.clientY - dragStart.y) * 0.1;
            const xRange = xAxisRange.max - xAxisRange.min;
            const yRange = yAxisRange.max - yAxisRange.min;
            let newXMin = xAxisRange.min - deltaX;
            let newXMax = xAxisRange.max - deltaX;
            let newYMin = yAxisRange.min + deltaY;
            let newYMax = yAxisRange.max + deltaY;
            if (newXMin < 0) {
                newXMin = 0;
                newXMax = xRange;
            }
            if (newXMax > 100) {
                newXMax = 100;
                newXMin = 100 - xRange;
            }
            if (newYMin < 0) {
                newYMin = 0;
                newYMax = yRange;
            }
            if (newYMax > 100) {
                newYMax = 100;
                newYMin = 100 - yRange;
            }
            setXAxisRange({
                min: newXMin,
                max: newXMax
            });
            setYAxisRange({
                min: newYMin,
                max: newYMax
            });
            setDragStart({
                x: e.clientX,
                y: e.clientY
            });
        }
    };
    const handleMouseUp = ()=>{
        setIsDragging(false);
    };
    const matrixCounts = (0, _react.useMemo)(()=>{
        const counts = {
            高价值: {
                导入期: 0,
                成长期: 0,
                成熟期: 0,
                衰退期: 0
            },
            中价值: {
                导入期: 0,
                成长期: 0,
                成熟期: 0,
                衰退期: 0
            },
            低价值: {
                导入期: 0,
                成长期: 0,
                成熟期: 0,
                衰退期: 0
            }
        };
        for (const c of customers)counts[c.valueTier][c.lifecycle] += 1;
        return counts;
    }, [
        customers
    ]);
    const filteredCustomers = (0, _react.useMemo)(()=>{
        let list = customers;
        if (selected) list = list.filter((c)=>c.valueTier === selected.valueTier && c.lifecycle === selected.stage);
        if (search.trim()) {
            const k = search.trim();
            list = list.filter((c)=>c.name.includes(k) || c.csm.includes(k) || c.valueTier.includes(k) || c.lifecycle.includes(k));
        }
        return list;
    }, [
        selected,
        search,
        customers
    ]);
    const selectedTitle = selected ? `${selected.valueTier} · ${selected.stage}` : '全部客户';
    const segmentAgg = (0, _react.useMemo)(()=>{
        const agg = {};
        for (const vt of valueTiers)for (const st of lifecycleStages){
            const key = `${vt}-${st}`;
            agg[key] = {
                key,
                valueTier: vt,
                stage: st,
                count: 0,
                avgHealth: 0,
                avgActive: 0,
                totalArr: 0
            };
        }
        for (const c of customers){
            const key = `${c.valueTier}-${c.lifecycle}`;
            const it = agg[key];
            it.count += 1;
            it.avgHealth += c.healthScore;
            it.avgActive += c.f;
            it.totalArr += c.arr;
        }
        for (const k of Object.keys(agg)){
            const it = agg[k];
            if (it.count > 0) {
                it.avgHealth = Math.round(it.avgHealth / it.count);
                it.avgActive = Math.round(it.avgActive / it.count);
            }
        }
        return agg;
    }, [
        customers
    ]);
    const maxSegmentArr = (0, _react.useMemo)(()=>{
        return Math.max(1, ...Object.values(segmentAgg).map((s)=>s.totalArr));
    }, [
        segmentAgg
    ]);
    function hashStringToNumber(input) {
        let hash = 0;
        for(let i = 0; i < input.length; i++){
            hash = (hash << 5) - hash + input.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash);
    }
    const tierMigration = (0, _react.useMemo)(()=>{
        const key = selected ? `${selected.valueTier}-${selected.stage}` : 'ALL';
        const seed = hashStringToNumber(key);
        const size = filteredCustomers.length || 1;
        const ratioUp = 0.2 + seed % 30 / 100;
        const ratioDown = 0.1 + seed % 15 / 100;
        const up = Math.round(size * ratioUp);
        const down = Math.round(size * ratioDown);
        const same = Math.max(0, size - up - down);
        const up_l2m = Math.round(up * 0.45);
        const up_m2h = Math.max(0, up - up_l2m);
        const down_h2m = Math.round(down * 0.6);
        const down_m2l = Math.max(0, down - down_h2m);
        const same_m = Math.round(same * 0.5);
        const same_l = Math.round((same - same_m) * 0.4);
        const same_h = Math.max(0, same - same_m - same_l);
        return {
            up_l2m,
            up_m2h,
            same_l,
            same_m,
            same_h,
            down_h2m,
            down_m2l
        };
    }, [
        filteredCustomers.length,
        selected
    ]);
    function scrollToListAndHighlight() {
        var _listRef_current;
        (_listRef_current = listRef.current) === null || _listRef_current === void 0 || _listRef_current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        setListHighlight(true);
        if (highlightTimerRef.current) window.clearTimeout(highlightTimerRef.current);
        highlightTimerRef.current = window.setTimeout(()=>setListHighlight(false), 1600);
    }
    const columns = [
        {
            title: '客户名称',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b)=>a.name.localeCompare(b.name),
            render: (_, record)=>(0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                    children: [
                        (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                            style: {
                                backgroundColor: record.logoColor
                            },
                            children: record.name.charAt(0)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                            lineNumber: 318,
                            columnNumber: 11
                        }, this),
                        (0, _jsxdevruntime.jsxDEV)("span", {
                            children: record.name
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                            lineNumber: 321,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                    lineNumber: 317,
                    columnNumber: 9
                }, this)
        },
        {
            title: '负责人CSM',
            dataIndex: 'csm',
            key: 'csm',
            sorter: (a, b)=>a.csm.localeCompare(b.csm)
        },
        {
            title: '价值总分',
            dataIndex: 'valueScore',
            key: 'valueScore',
            sorter: (a, b)=>a.valueScore - b.valueScore,
            render: (v, record)=>(0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                    children: [
                        (0, _jsxdevruntime.jsxDEV)(Text, {
                            strong: true,
                            children: [
                                v,
                                "分"
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                            lineNumber: 338,
                            columnNumber: 11
                        }, this),
                        record.trend === 'up' ? (0, _jsxdevruntime.jsxDEV)(_icons.ArrowUpOutlined, {
                            style: {
                                color: '#52c41a'
                            }
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                            lineNumber: 340,
                            columnNumber: 13
                        }, this) : record.trend === 'down' ? (0, _jsxdevruntime.jsxDEV)(_icons.ArrowDownOutlined, {
                            style: {
                                color: '#ff4d4f'
                            }
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                            lineNumber: 342,
                            columnNumber: 13
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                    lineNumber: 337,
                    columnNumber: 9
                }, this)
        },
        {
            title: '生命周期',
            dataIndex: 'lifecycle',
            key: 'lifecycle',
            filters: lifecycleStages.map((s)=>({
                    text: s,
                    value: s
                })),
            onFilter: (value, record)=>record.lifecycle === value,
            render: (v)=>(0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                    color: lifecycleAccentColor[v],
                    style: {
                        borderColor: `${lifecycleAccentColor[v]}55`
                    },
                    children: v
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                    lineNumber: 354,
                    columnNumber: 9
                }, this)
        },
        {
            title: '财务价值 (R&M)',
            dataIndex: 'rAndM',
            key: 'rAndM',
            sorter: (a, b)=>a.rAndM - b.rAndM
        },
        {
            title: '活跃度价值 (F)',
            dataIndex: 'f',
            key: 'f',
            sorter: (a, b)=>a.f - b.f
        },
        {
            title: '服务交互值',
            dataIndex: 'serviceScore',
            key: 'serviceScore',
            sorter: (a, b)=>a.serviceScore - b.serviceScore
        },
        {
            title: '近90天风险事件数',
            dataIndex: 'riskEvents',
            key: 'riskEvents',
            sorter: (a, b)=>a.riskEvents - b.riskEvents,
            render: (v)=>(0, _jsxdevruntime.jsxDEV)(Text, {
                    style: {
                        color: v > 0 ? '#ff4d4f' : '#52c41a'
                    },
                    children: v
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                    lineNumber: 383,
                    columnNumber: 9
                }, this)
        },
        {
            title: '近90天增购额',
            dataIndex: 'upsellAmount',
            key: 'upsellAmount',
            sorter: (a, b)=>a.upsellAmount - b.upsellAmount,
            render: (v)=>(0, _jsxdevruntime.jsxDEV)(Text, {
                    children: v > 0 ? `¥${(v / 10000).toFixed(1)}万` : '-'
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                    lineNumber: 392,
                    columnNumber: 9
                }, this)
        },
        {
            title: '标签',
            dataIndex: 'tags',
            key: 'tags',
            render: (tags)=>(0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                    wrap: true,
                    children: [
                        tags.slice(0, 2).map((tag)=>(0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                children: tag
                            }, tag, false, {
                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                lineNumber: 402,
                                columnNumber: 13
                            }, this)),
                        tags.length > 2 && (0, _jsxdevruntime.jsxDEV)(Text, {
                            type: "secondary",
                            children: [
                                "+",
                                tags.length - 2
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                            lineNumber: 404,
                            columnNumber: 31
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                    lineNumber: 400,
                    columnNumber: 9
                }, this)
        }
    ];
    const headerTitle = selected ? `客户列表 - ${selected.valueTier} & ${selected.stage} (${filteredCustomers.length})` : `客户列表 - 全部客户 (${filteredCustomers.length})`;
    return (0, _jsxdevruntime.jsxDEV)("div", {
        children: [
            (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                style: {
                    ...cardStyle,
                    marginBottom: 16
                },
                bodyStyle: {
                    padding: 16
                },
                children: [
                    (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            marginBottom: 8,
                            display: 'flex',
                            alignItems: 'center'
                        },
                        children: [
                            (0, _jsxdevruntime.jsxDEV)(Text, {
                                type: "secondary",
                                children: "当前筛选："
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                lineNumber: 419,
                                columnNumber: 11
                            }, this),
                            (0, _jsxdevruntime.jsxDEV)(Text, {
                                strong: true,
                                style: {
                                    marginLeft: 8
                                },
                                children: selectedTitle
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                lineNumber: 420,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                        lineNumber: 418,
                        columnNumber: 9
                    }, this),
                    (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                        gutter: [
                            12,
                            12
                        ],
                        children: [
                            (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                span: 4
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                lineNumber: 424,
                                columnNumber: 11
                            }, this),
                            lifecycleStages.map((stage)=>(0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                    span: 5,
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center'
                                    },
                                    children: (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                        children: [
                                            (0, _jsxdevruntime.jsxDEV)(_antd.Badge, {
                                                color: lifecycleAccentColor[stage]
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                lineNumber: 428,
                                                columnNumber: 17
                                            }, this),
                                            (0, _jsxdevruntime.jsxDEV)(Text, {
                                                style: {
                                                    color: '#262626',
                                                    fontWeight: 500
                                                },
                                                children: stage
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                lineNumber: 429,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                        lineNumber: 427,
                                        columnNumber: 15
                                    }, this)
                                }, stage, false, {
                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                    lineNumber: 426,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                        lineNumber: 422,
                        columnNumber: 9
                    }, this),
                    valueTiers.map((tier)=>(0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                            gutter: [
                                12,
                                10
                            ],
                            align: "middle",
                            style: {
                                marginTop: 2
                            },
                            children: [
                                (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                    span: 4,
                                    children: (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                        children: [
                                            (0, _jsxdevruntime.jsxDEV)(Text, {
                                                style: {
                                                    fontWeight: 600,
                                                    color: '#1f1f1f'
                                                },
                                                children: tier
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                lineNumber: 438,
                                                columnNumber: 17
                                            }, this),
                                            (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                                title: valueTierScoreHint[tier],
                                                children: (0, _jsxdevruntime.jsxDEV)(_icons.QuestionCircleOutlined, {
                                                    style: {
                                                        color: '#8c8c8c'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                    lineNumber: 440,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                lineNumber: 439,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                        lineNumber: 437,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                    lineNumber: 436,
                                    columnNumber: 13
                                }, this),
                                lifecycleStages.map((stage)=>{
                                    const isSelected = !!selected && selected.valueTier === tier && selected.stage === stage;
                                    const count = matrixCounts[tier][stage];
                                    const menuItems = [
                                        {
                                            key: 'list',
                                            label: '查看客户列表'
                                        },
                                        {
                                            key: 'report',
                                            label: '生成群体报告'
                                        },
                                        {
                                            key: 'playbook',
                                            label: '应用服务剧本'
                                        }
                                    ];
                                    return (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                        span: 5,
                                        children: (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                ...getCellStyle(tier, stage, isSelected),
                                                position: 'relative'
                                            },
                                            onClick: ()=>setSelected({
                                                    valueTier: tier,
                                                    stage
                                                }),
                                            onMouseEnter: (e)=>e.currentTarget.style.boxShadow = `0 4px 12px rgba(0,0,0,0.08), 0 0 0 3px ${lifecycleAccentColor[stage]}11`,
                                            onMouseLeave: (e)=>e.currentTarget.style.boxShadow = isSelected ? `0 0 0 3px ${lifecycleAccentColor[stage]}22` : 'none',
                                            children: [
                                                (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between'
                                                    },
                                                    children: [
                                                        (0, _jsxdevruntime.jsxDEV)(Text, {
                                                            type: "secondary",
                                                            style: {
                                                                fontSize: 12
                                                            },
                                                            children: [
                                                                tier,
                                                                " · ",
                                                                stage
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                            lineNumber: 461,
                                                            columnNumber: 23
                                                        }, this),
                                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 8
                                                            },
                                                            children: [
                                                                (0, _jsxdevruntime.jsxDEV)(_antd.Badge, {
                                                                    color: lifecycleAccentColor[stage]
                                                                }, void 0, false, {
                                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                                    lineNumber: 463,
                                                                    columnNumber: 25
                                                                }, this),
                                                                (0, _jsxdevruntime.jsxDEV)(_antd.Dropdown, {
                                                                    trigger: [
                                                                        'click'
                                                                    ],
                                                                    menu: {
                                                                        items: menuItems,
                                                                        onClick: ({ key })=>{
                                                                            setSelected({
                                                                                valueTier: tier,
                                                                                stage
                                                                            });
                                                                            if (key === 'list') scrollToListAndHighlight();
                                                                        }
                                                                    },
                                                                    children: (0, _jsxdevruntime.jsxDEV)(_icons.MoreOutlined, {
                                                                        style: {
                                                                            color: '#8c8c8c'
                                                                        },
                                                                        onClick: (ev)=>ev.stopPropagation()
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                                        lineNumber: 476,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                                    lineNumber: 464,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                            lineNumber: 462,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                    lineNumber: 460,
                                                    columnNumber: 21
                                                }, this),
                                                (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        marginTop: 6,
                                                        fontSize: 24,
                                                        fontWeight: 700,
                                                        color: '#2f54eb'
                                                    },
                                                    children: count
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                    lineNumber: 480,
                                                    columnNumber: 21
                                                }, this),
                                                (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        marginTop: 2,
                                                        fontSize: 12,
                                                        color: '#8c8c8c'
                                                    },
                                                    children: "客户数"
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                    lineNumber: 481,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                            lineNumber: 454,
                                            columnNumber: 19
                                        }, this)
                                    }, `${tier}-${stage}`, false, {
                                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                        lineNumber: 453,
                                        columnNumber: 17
                                    }, this);
                                })
                            ]
                        }, tier, true, {
                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                            lineNumber: 435,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                lineNumber: 417,
                columnNumber: 7
            }, this),
            (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                gutter: 16,
                style: {
                    marginBottom: 16
                },
                children: [
                    (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        xs: 24,
                        lg: 12,
                        children: (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            style: {
                                ...cardStyle
                            },
                            title: (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                },
                                children: [
                                    (0, _jsxdevruntime.jsxDEV)("span", {
                                        style: {
                                            fontWeight: 600
                                        },
                                        children: "分层散点/气泡图"
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                        lineNumber: 498,
                                        columnNumber: 17
                                    }, void 0),
                                    (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                        children: [
                                            (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                type: "text",
                                                size: "small",
                                                icon: (0, _jsxdevruntime.jsxDEV)(_icons.ZoomInOutlined, {}, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                    lineNumber: 503,
                                                    columnNumber: 27
                                                }, void 0),
                                                onClick: handleZoomIn,
                                                disabled: xAxisRange.max - xAxisRange.min <= 10 || yAxisRange.max - yAxisRange.min <= 10
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                lineNumber: 500,
                                                columnNumber: 19
                                            }, void 0),
                                            (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                type: "text",
                                                size: "small",
                                                icon: (0, _jsxdevruntime.jsxDEV)(_icons.ZoomOutOutlined, {}, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                    lineNumber: 510,
                                                    columnNumber: 27
                                                }, void 0),
                                                onClick: handleZoomOut,
                                                disabled: xAxisRange.min === 0 && xAxisRange.max === 100 && yAxisRange.min === 0 && yAxisRange.max === 100
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                lineNumber: 507,
                                                columnNumber: 19
                                            }, void 0),
                                            (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                type: "text",
                                                size: "small",
                                                icon: (0, _jsxdevruntime.jsxDEV)(_icons.UndoOutlined, {}, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                    lineNumber: 517,
                                                    columnNumber: 27
                                                }, void 0),
                                                onClick: handleResetZoom,
                                                disabled: xAxisRange.min === 0 && xAxisRange.max === 100 && yAxisRange.min === 0 && yAxisRange.max === 100
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                lineNumber: 514,
                                                columnNumber: 19
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                        lineNumber: 499,
                                        columnNumber: 17
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                lineNumber: 497,
                                columnNumber: 15
                            }, void 0),
                            children: (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    width: '100%',
                                    height: 260,
                                    position: 'relative',
                                    overflow: 'hidden',
                                    cursor: xAxisRange.min > 0 || xAxisRange.max < 100 || yAxisRange.min > 0 || yAxisRange.max < 100 ? isDragging ? 'grabbing' : 'grab' : 'default'
                                },
                                onMouseDown: handleMouseDown,
                                onMouseMove: handleMouseMove,
                                onMouseUp: handleMouseUp,
                                onMouseLeave: handleMouseUp,
                                children: [
                                    (bubbleTip === null || bubbleTip === void 0 ? void 0 : bubbleTip.visible) && (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            position: 'absolute',
                                            left: bubbleTip.x,
                                            top: bubbleTip.y,
                                            background: '#fff',
                                            border: '1px solid #f0f0f0',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                            borderRadius: 6,
                                            padding: '8px 10px',
                                            fontSize: 12,
                                            pointerEvents: 'none',
                                            zIndex: 2
                                        },
                                        children: bubbleTip.html
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                        lineNumber: 539,
                                        columnNumber: 17
                                    }, this),
                                    (0, _jsxdevruntime.jsxDEV)("svg", {
                                        viewBox: "0 0 420 200",
                                        preserveAspectRatio: "none",
                                        style: {
                                            width: '100%',
                                            height: '100%'
                                        },
                                        children: [
                                            (0, _jsxdevruntime.jsxDEV)("line", {
                                                x1: "40",
                                                y1: "10",
                                                x2: "40",
                                                y2: "170",
                                                stroke: "#d9d9d9"
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                lineNumber: 552,
                                                columnNumber: 17
                                            }, this),
                                            (0, _jsxdevruntime.jsxDEV)("line", {
                                                x1: "40",
                                                y1: "170",
                                                x2: "400",
                                                y2: "170",
                                                stroke: "#d9d9d9"
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                lineNumber: 553,
                                                columnNumber: 17
                                            }, this),
                                            Array.from({
                                                length: 6
                                            }).map((_, i)=>{
                                                const v = yAxisRange.min + i * (yAxisRange.max - yAxisRange.min) / 5;
                                                const y = 170 - i / 5 * 150;
                                                return (0, _jsxdevruntime.jsxDEV)("g", {
                                                    children: [
                                                        (0, _jsxdevruntime.jsxDEV)("line", {
                                                            x1: "36",
                                                            y1: y,
                                                            x2: "40",
                                                            y2: y,
                                                            stroke: "#d9d9d9"
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                            lineNumber: 560,
                                                            columnNumber: 23
                                                        }, this),
                                                        (0, _jsxdevruntime.jsxDEV)("text", {
                                                            x: "10",
                                                            y: y + 4,
                                                            fontSize: "10",
                                                            fill: "#8c8c8c",
                                                            children: Math.round(v)
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                            lineNumber: 561,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                    lineNumber: 559,
                                                    columnNumber: 21
                                                }, this);
                                            }),
                                            Array.from({
                                                length: 6
                                            }).map((_, i)=>{
                                                const v = xAxisRange.min + i * (xAxisRange.max - xAxisRange.min) / 5;
                                                const x = 40 + i / 5 * 360;
                                                return (0, _jsxdevruntime.jsxDEV)("g", {
                                                    children: [
                                                        (0, _jsxdevruntime.jsxDEV)("line", {
                                                            x1: x,
                                                            y1: "170",
                                                            x2: x,
                                                            y2: "174",
                                                            stroke: "#d9d9d9"
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                            lineNumber: 571,
                                                            columnNumber: 23
                                                        }, this),
                                                        (0, _jsxdevruntime.jsxDEV)("text", {
                                                            x: x,
                                                            y: "188",
                                                            fontSize: "10",
                                                            fill: "#8c8c8c",
                                                            textAnchor: "middle",
                                                            children: Math.round(v)
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                            lineNumber: 572,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                    lineNumber: 570,
                                                    columnNumber: 21
                                                }, this);
                                            }),
                                            Object.values(segmentAgg).map((s)=>{
                                                if (s.count === 0) return null;
                                                if (s.avgHealth < xAxisRange.min || s.avgHealth > xAxisRange.max || s.avgActive < yAxisRange.min || s.avgActive > yAxisRange.max) return null;
                                                const x = 40 + (s.avgHealth - xAxisRange.min) / (xAxisRange.max - xAxisRange.min) * 360;
                                                const y = 170 - (s.avgActive - yAxisRange.min) / (yAxisRange.max - yAxisRange.min) * 150;
                                                const r = 6 + s.totalArr / maxSegmentArr * 16;
                                                const color = lifecycleAccentColor[s.stage];
                                                const html = (0, _jsxdevruntime.jsxDEV)("div", {
                                                    children: [
                                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                fontWeight: 600,
                                                                marginBottom: 4
                                                            },
                                                            children: `${s.valueTier} - ${s.stage}`
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                            lineNumber: 593,
                                                            columnNumber: 25
                                                        }, this),
                                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                                            children: [
                                                                "客户数：",
                                                                s.count
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                            lineNumber: 594,
                                                            columnNumber: 25
                                                        }, this),
                                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                                            children: [
                                                                "总ARR：¥",
                                                                (s.totalArr / 10000).toFixed(1),
                                                                "万"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                            lineNumber: 595,
                                                            columnNumber: 25
                                                        }, this),
                                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                                            children: [
                                                                "平均健康分：",
                                                                s.avgHealth
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                            lineNumber: 596,
                                                            columnNumber: 25
                                                        }, this),
                                                        (0, _jsxdevruntime.jsxDEV)("div", {
                                                            children: [
                                                                "平均活跃度：",
                                                                s.avgActive
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                            lineNumber: 597,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                    lineNumber: 592,
                                                    columnNumber: 23
                                                }, this);
                                                return (0, _jsxdevruntime.jsxDEV)("circle", {
                                                    cx: x,
                                                    cy: y,
                                                    r: r,
                                                    fill: color,
                                                    fillOpacity: 0.35,
                                                    stroke: color,
                                                    onMouseEnter: (e)=>{
                                                        const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
                                                        setBubbleTip({
                                                            visible: true,
                                                            x: e.clientX - rect.left + 12,
                                                            y: e.clientY - rect.top + 12,
                                                            html
                                                        });
                                                    },
                                                    onMouseMove: (e)=>{
                                                        const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
                                                        setBubbleTip((prev)=>prev ? {
                                                                ...prev,
                                                                x: e.clientX - rect.left + 12,
                                                                y: e.clientY - rect.top + 12
                                                            } : prev);
                                                    },
                                                    onMouseLeave: ()=>setBubbleTip(null),
                                                    onClick: ()=>setSelected({
                                                            valueTier: s.valueTier,
                                                            stage: s.stage
                                                        }),
                                                    style: {
                                                        cursor: 'pointer'
                                                    }
                                                }, s.key, false, {
                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                    lineNumber: 601,
                                                    columnNumber: 23
                                                }, this);
                                            }),
                                            (0, _jsxdevruntime.jsxDEV)("text", {
                                                x: "220",
                                                y: "198",
                                                textAnchor: "middle",
                                                fontSize: "12",
                                                fill: "#8c8c8c",
                                                children: [
                                                    "客户健康度 (",
                                                    Math.round(xAxisRange.min),
                                                    "-",
                                                    Math.round(xAxisRange.max),
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                lineNumber: 625,
                                                columnNumber: 17
                                            }, this),
                                            (0, _jsxdevruntime.jsxDEV)("text", {
                                                x: "12",
                                                y: "14",
                                                textAnchor: "start",
                                                fontSize: "12",
                                                fill: "#8c8c8c",
                                                children: [
                                                    "价值分 (",
                                                    Math.round(yAxisRange.min),
                                                    "-",
                                                    Math.round(yAxisRange.max),
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                lineNumber: 626,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                        lineNumber: 543,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                lineNumber: 525,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                            lineNumber: 494,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                        lineNumber: 493,
                        columnNumber: 9
                    }, this),
                    (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        xs: 24,
                        lg: 12,
                        children: (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            style: {
                                ...cardStyle
                            },
                            title: (0, _jsxdevruntime.jsxDEV)("span", {
                                style: {
                                    fontWeight: 600
                                },
                                children: "迁移流向图 (上季→本季)"
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                lineNumber: 634,
                                columnNumber: 49
                            }, void 0),
                            children: (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    width: '100%',
                                    height: 320,
                                    position: 'relative'
                                },
                                children: [
                                    (sankeyTip === null || sankeyTip === void 0 ? void 0 : sankeyTip.visible) && (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            position: 'absolute',
                                            left: sankeyTip.x,
                                            top: sankeyTip.y,
                                            background: '#fff',
                                            border: '1px solid #d9d9d9',
                                            borderRadius: 4,
                                            padding: '6px 8px',
                                            fontSize: 12,
                                            pointerEvents: 'none',
                                            zIndex: 10
                                        },
                                        children: sankeyTip.text
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                        lineNumber: 637,
                                        columnNumber: 17
                                    }, this),
                                    (0, _jsxdevruntime.jsxDEV)("svg", {
                                        viewBox: "-20 0 460 260",
                                        preserveAspectRatio: "xMidYMid meet",
                                        style: {
                                            width: '100%',
                                            height: '100%'
                                        },
                                        children: (()=>{
                                            const leftX = 70;
                                            const rightX = 350;
                                            const tiers = [
                                                '高价值',
                                                '中价值',
                                                '低价值'
                                            ];
                                            const positions = {};
                                            tiers.forEach((t, i)=>{
                                                positions[`L-${t}`] = 60 + i * 80;
                                                positions[`R-${t}`] = 60 + i * 80;
                                            });
                                            const flows = [
                                                {
                                                    from: '低价值',
                                                    to: '中价值',
                                                    value: tierMigration.up_l2m,
                                                    color: '#5B8FF9'
                                                },
                                                {
                                                    from: '中价值',
                                                    to: '高价值',
                                                    value: tierMigration.up_m2h,
                                                    color: '#5AD8A6'
                                                },
                                                {
                                                    from: '低价值',
                                                    to: '低价值',
                                                    value: tierMigration.same_l,
                                                    color: '#B37FEB'
                                                },
                                                {
                                                    from: '中价值',
                                                    to: '中价值',
                                                    value: tierMigration.same_m,
                                                    color: '#FF9D4D'
                                                },
                                                {
                                                    from: '高价值',
                                                    to: '高价值',
                                                    value: tierMigration.same_h,
                                                    color: '#CDDDFD'
                                                },
                                                {
                                                    from: '高价值',
                                                    to: '中价值',
                                                    value: tierMigration.down_h2m,
                                                    color: '#F4664A'
                                                },
                                                {
                                                    from: '中价值',
                                                    to: '低价值',
                                                    value: tierMigration.down_m2l,
                                                    color: '#D3F261'
                                                }
                                            ];
                                            const maxFlow = Math.max(1, ...flows.map((f)=>f.value));
                                            const strokeScale = (v)=>2 + v / maxFlow * 14;
                                            function pathD(y1, y2) {
                                                const cx1 = 160;
                                                const cx2 = 260;
                                                return `M ${leftX} ${y1} C ${cx1} ${y1}, ${cx2} ${y2}, ${rightX} ${y2}`;
                                            }
                                            return (0, _jsxdevruntime.jsxDEV)("g", {
                                                children: [
                                                    tiers.map((t)=>(0, _jsxdevruntime.jsxDEV)("g", {
                                                            children: [
                                                                (0, _jsxdevruntime.jsxDEV)("rect", {
                                                                    x: leftX - 32,
                                                                    y: positions[`L-${t}`] - 18,
                                                                    width: 64,
                                                                    height: 36,
                                                                    rx: 6,
                                                                    fill: "#f5f5f5",
                                                                    stroke: "#d9d9d9"
                                                                }, void 0, false, {
                                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                                    lineNumber: 672,
                                                                    columnNumber: 27
                                                                }, this),
                                                                (0, _jsxdevruntime.jsxDEV)("text", {
                                                                    x: leftX - 36,
                                                                    y: positions[`L-${t}`] - 2,
                                                                    fontSize: "12",
                                                                    textAnchor: "end",
                                                                    fill: "#595959",
                                                                    children: "上季度"
                                                                }, void 0, false, {
                                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                                    lineNumber: 673,
                                                                    columnNumber: 27
                                                                }, this),
                                                                (0, _jsxdevruntime.jsxDEV)("text", {
                                                                    x: leftX - 36,
                                                                    y: positions[`L-${t}`] + 12,
                                                                    fontSize: "12",
                                                                    textAnchor: "end",
                                                                    fill: "#595959",
                                                                    children: t
                                                                }, void 0, false, {
                                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                                    lineNumber: 674,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, `node-left-${t}`, true, {
                                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                            lineNumber: 671,
                                                            columnNumber: 25
                                                        }, this)),
                                                    tiers.map((t)=>(0, _jsxdevruntime.jsxDEV)("g", {
                                                            children: [
                                                                (0, _jsxdevruntime.jsxDEV)("rect", {
                                                                    x: rightX - 32,
                                                                    y: positions[`R-${t}`] - 18,
                                                                    width: 64,
                                                                    height: 36,
                                                                    rx: 6,
                                                                    fill: "#f5f5f5",
                                                                    stroke: "#d9d9d9"
                                                                }, void 0, false, {
                                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                                    lineNumber: 679,
                                                                    columnNumber: 27
                                                                }, this),
                                                                (0, _jsxdevruntime.jsxDEV)("text", {
                                                                    x: rightX + 36,
                                                                    y: positions[`R-${t}`] - 2,
                                                                    fontSize: "12",
                                                                    textAnchor: "start",
                                                                    fill: "#595959",
                                                                    children: "本季度"
                                                                }, void 0, false, {
                                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                                    lineNumber: 680,
                                                                    columnNumber: 27
                                                                }, this),
                                                                (0, _jsxdevruntime.jsxDEV)("text", {
                                                                    x: rightX + 36,
                                                                    y: positions[`R-${t}`] + 12,
                                                                    fontSize: "12",
                                                                    textAnchor: "start",
                                                                    fill: "#595959",
                                                                    children: t
                                                                }, void 0, false, {
                                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                                    lineNumber: 681,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, `node-right-${t}`, true, {
                                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                            lineNumber: 678,
                                                            columnNumber: 25
                                                        }, this)),
                                                    flows.map((f, idx)=>(0, _jsxdevruntime.jsxDEV)("path", {
                                                            d: pathD(positions[`L-${f.from}`], positions[`R-${f.to}`]),
                                                            stroke: f.color,
                                                            strokeOpacity: 0.5,
                                                            strokeWidth: strokeScale(f.value),
                                                            fill: "none",
                                                            onMouseEnter: (e)=>{
                                                                const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
                                                                setSankeyTip({
                                                                    visible: true,
                                                                    x: e.clientX - rect.left + 12,
                                                                    y: e.clientY - rect.top + 12,
                                                                    text: `${f.from} -> ${f.to}：${f.value}个客户`
                                                                });
                                                            },
                                                            onMouseMove: (e)=>{
                                                                const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
                                                                setSankeyTip((prev)=>prev ? {
                                                                        ...prev,
                                                                        x: e.clientX - rect.left + 12,
                                                                        y: e.clientY - rect.top + 12
                                                                    } : prev);
                                                            },
                                                            onMouseLeave: ()=>setSankeyTip(null)
                                                        }, idx, false, {
                                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                            lineNumber: 686,
                                                            columnNumber: 25
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                lineNumber: 668,
                                                columnNumber: 21
                                            }, this);
                                        })()
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                        lineNumber: 641,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                lineNumber: 635,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                            lineNumber: 634,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                        lineNumber: 633,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                lineNumber: 491,
                columnNumber: 7
            }, this),
            (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                ref: listRef,
                style: {
                    ...cardStyle,
                    boxShadow: listHighlight ? '0 0 0 3px #1890ff33, 0 6px 20px rgba(0,0,0,0.08)' : cardStyle.boxShadow,
                    border: listHighlight ? '1px solid #91caff' : cardStyle.border,
                    transition: 'box-shadow 0.3s ease, border-color 0.3s ease'
                },
                title: (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%'
                    },
                    children: [
                        (0, _jsxdevruntime.jsxDEV)("span", {
                            style: {
                                fontSize: 16,
                                fontWeight: 600
                            },
                            children: headerTitle
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                            lineNumber: 726,
                            columnNumber: 13
                        }, void 0),
                        (0, _jsxdevruntime.jsxDEV)(_antd.Input.Search, {
                            allowClear: true,
                            placeholder: "搜索客户/CSM/标签...",
                            style: {
                                width: 320
                            },
                            onSearch: (v)=>setSearch(v),
                            onChange: (e)=>setSearch(e.target.value)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                            lineNumber: 727,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                    lineNumber: 725,
                    columnNumber: 11
                }, void 0),
                children: (0, _jsxdevruntime.jsxDEV)(_antd.Table, {
                    rowKey: "id",
                    dataSource: filteredCustomers,
                    columns: columns,
                    pagination: {
                        pageSize: 10,
                        showSizeChanger: false
                    },
                    onRow: (record)=>({
                            onClick: ()=>onCustomerSelect === null || onCustomerSelect === void 0 ? void 0 : onCustomerSelect(record),
                            style: {
                                cursor: 'pointer'
                            }
                        })
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                    lineNumber: 737,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                lineNumber: 714,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
        lineNumber: 415,
        columnNumber: 5
    }, this);
};
_s(ValueLifecycleTab, "5QqN7z+7Xu5I2Wzls5iq1w6fSQY=");
_c = ValueLifecycleTab;
var _default = ValueLifecycleTab;
var _c;
$RefreshReg$(_c, "ValueLifecycleTab");
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
"src/pages/CustomerSuccess/WorkbenchDashboard.tsx": function (module, exports, __mako_require__){
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
    WorkbenchDashboard: function() {
        return WorkbenchDashboard;
    },
    default: function() {
        return _default;
    }
});
var _interop_require_wildcard = __mako_require__("@swc/helpers/_/_interop_require_wildcard");
var _reactrefresh = /*#__PURE__*/ _interop_require_wildcard._(__mako_require__("node_modules/react-refresh/runtime.js"));
var _jsxdevruntime = __mako_require__("node_modules/react/jsx-dev-runtime.js");
var _react = /*#__PURE__*/ _interop_require_wildcard._(__mako_require__("node_modules/react/index.js"));
var _antd = __mako_require__("node_modules/antd/es/index.js");
var _icons = __mako_require__("node_modules/@ant-design/icons/es/index.js");
var _max = __mako_require__("src/.umi/exports.ts");
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
var _s1 = $RefreshSig$();
var _s2 = $RefreshSig$();
var _s3 = $RefreshSig$();
var _s4 = $RefreshSig$();
const { Title, Text } = _antd.Typography;
const { TabPane } = _antd.Tabs;
// 统一的卡片样式 - 参考图片的现代风格
const cardStyle = {
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    border: '1px solid #f0f0f0',
    background: '#ffffff',
    marginBottom: '16px'
};
// 问候语生成函数
const generateGreeting = (userName = '用户')=>{
    const now = new Date();
    const hour = now.getHours();
    let timeGreeting = '';
    let encouragements = [];
    if (hour >= 5 && hour < 12) {
        timeGreeting = '早安';
        encouragements = [
            '祝你开心每一天！',
            '新的一天充满希望！',
            '愿你今天收获满满！',
            '今天也要加油哦！',
            '美好的一天开始了！'
        ];
    } else if (hour >= 12 && hour < 14) {
        timeGreeting = '中午好';
        encouragements = [
            '午休愉快！',
            '下午继续加油！',
            '享受美好的午间时光！',
            '休息是为了更好的工作！',
            '中午记得好好休息！'
        ];
    } else if (hour >= 14 && hour < 18) {
        timeGreeting = '下午好';
        encouragements = [
            '下午工作顺利！',
            '继续努力，加油！',
            '下午也要保持好心情！',
            '工作再忙也要注意休息！',
            '下午时光很美好！'
        ];
    } else if (hour >= 18 && hour < 22) {
        timeGreeting = '晚上好';
        encouragements = [
            '晚上也要保持好心情！',
            '今天辛苦了！',
            '晚上记得放松一下！',
            '今天的工作很棒！',
            '晚上时光很温馨！'
        ];
    } else {
        timeGreeting = '夜深了';
        encouragements = [
            '早点休息，明天见！',
            '夜深了，注意身体！',
            '今天辛苦了，晚安！',
            '休息是为了更好的明天！',
            '夜深人静，好好休息！'
        ];
    }
    // 随机选择一条鼓励话语
    const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
    return `${timeGreeting}，${userName}，${randomEncouragement}`;
};
// 顶部区域：个性化欢迎语 + 快捷链接
const HeaderSection = ({ userName, greeting })=>{
    _s();
    const [quickLinks, setQuickLinks] = (0, _react.useState)([
        {
            id: 1,
            name: 'CRM',
            icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {}, void 0, false, {
                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                lineNumber: 146,
                columnNumber: 33
            }, this),
            url: '#',
            color: '#1890ff'
        },
        {
            id: 2,
            name: '禅道',
            icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.SettingOutlined, {}, void 0, false, {
                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                lineNumber: 147,
                columnNumber: 32
            }, this),
            url: '#',
            color: '#52c41a'
        },
        {
            id: 3,
            name: '多维表',
            icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.TableOutlined, {}, void 0, false, {
                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                lineNumber: 148,
                columnNumber: 33
            }, this),
            url: '#',
            color: '#722ed1'
        }
    ]);
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
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
                            color: '#262626',
                            fontWeight: '600'
                        },
                        children: greeting
                    }, void 0, false, {
                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                        type: "secondary",
                        style: {
                            fontSize: '14px',
                            color: '#666'
                        },
                        children: "客户成功经理 · 数据洞察与任务管理"
                    }, void 0, false, {
                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                lineNumber: 159,
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
                                icon: link.icon,
                                style: {
                                    width: '44px',
                                    height: '44px',
                                    background: `${link.color}15`,
                                    border: `1px solid ${link.color}30`,
                                    color: link.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                },
                                onClick: ()=>window.open(link.url, '_blank')
                            }, void 0, false, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 172,
                                columnNumber: 13
                            }, this)
                        }, link.id, false, {
                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                        title: "添加快捷链接",
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                            type: "dashed",
                            shape: "circle",
                            size: "large",
                            icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PlusOutlined, {}, void 0, false, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 198,
                                columnNumber: 19
                            }, void 0),
                            style: {
                                width: '44px',
                                height: '44px',
                                borderColor: '#d9d9d9',
                                color: '#666'
                            }
                        }, void 0, false, {
                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                            lineNumber: 194,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                        lineNumber: 193,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
        lineNumber: 152,
        columnNumber: 5
    }, this);
};
_s(HeaderSection, "3L6Rm4AxpmPtCayO7mNhPMHZlHM=");
_c = HeaderSection;
// 公司业绩指标横幅
const CompanyKPIBanner = ()=>{
    _s1();
    const [timePeriod, setTimePeriod] = (0, _react.useState)('年度');
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
        style: {
            ...cardStyle,
            marginBottom: '24px'
        },
        title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
            style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            },
            children: [
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center'
                    },
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.BarChartOutlined, {
                            style: {
                                color: '#1890ff',
                                marginRight: '8px'
                            }
                        }, void 0, false, {
                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                            lineNumber: 225,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                            style: {
                                fontSize: '16px',
                                fontWeight: '600'
                            },
                            children: "公司业绩指标"
                        }, void 0, false, {
                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                            lineNumber: 226,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                    lineNumber: 224,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                    },
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            },
                            children: [
                                '年度',
                                '季度',
                                '月度'
                            ].map((period)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                    type: timePeriod === period ? 'primary' : 'text',
                                    size: "small",
                                    style: {
                                        padding: '4px 12px',
                                        height: '28px',
                                        borderRadius: '6px',
                                        fontSize: '12px'
                                    },
                                    onClick: ()=>setTimePeriod(period),
                                    children: period
                                }, period, false, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 232,
                                    columnNumber: 17
                                }, void 0))
                        }, void 0, false, {
                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                            lineNumber: 230,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                padding: '4px 12px',
                                border: '1px solid #d9d9d9',
                                borderRadius: '6px',
                                background: '#fff',
                                fontSize: '12px',
                                color: '#666'
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                    children: "2025-01-01"
                                }, void 0, false, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 260,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ArrowRightOutlined, {
                                    style: {
                                        margin: '0 8px',
                                        fontSize: '10px'
                                    }
                                }, void 0, false, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 261,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                    children: "2025-12-31"
                                }, void 0, false, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 262,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.CalendarOutlined, {
                                    style: {
                                        marginLeft: '8px',
                                        fontSize: '12px'
                                    }
                                }, void 0, false, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 263,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                            lineNumber: 250,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                    lineNumber: 228,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
            lineNumber: 223,
            columnNumber: 9
        }, void 0),
        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
            gutter: [
                24,
                16
            ],
            children: [
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                    span: 6,
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            textAlign: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    fontSize: '32px',
                                    fontWeight: '700',
                                    color: '#1890ff',
                                    marginBottom: '8px'
                                },
                                children: "92.5%"
                            }, void 0, false, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 272,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                type: "secondary",
                                style: {
                                    fontSize: '14px'
                                },
                                children: "续费率"
                            }, void 0, false, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 275,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: '8px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ArrowUpOutlined, {
                                        style: {
                                            color: '#52c41a',
                                            fontSize: '12px',
                                            marginRight: '4px'
                                        }
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 277,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                        style: {
                                            color: '#52c41a',
                                            fontSize: '12px'
                                        },
                                        children: "+3.2%"
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 278,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 276,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                        lineNumber: 271,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                    lineNumber: 270,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                    span: 6,
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            textAlign: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    fontSize: '32px',
                                    fontWeight: '700',
                                    color: '#52c41a',
                                    marginBottom: '8px'
                                },
                                children: "87.8%"
                            }, void 0, false, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 285,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                type: "secondary",
                                style: {
                                    fontSize: '14px'
                                },
                                children: "续约率"
                            }, void 0, false, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 288,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: '8px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ArrowUpOutlined, {
                                        style: {
                                            color: '#52c41a',
                                            fontSize: '12px',
                                            marginRight: '4px'
                                        }
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 290,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                        style: {
                                            color: '#52c41a',
                                            fontSize: '12px'
                                        },
                                        children: "+1.8%"
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 291,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 289,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                        lineNumber: 284,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                    lineNumber: 283,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                    span: 6,
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            textAlign: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    fontSize: '32px',
                                    fontWeight: '700',
                                    color: '#722ed1',
                                    marginBottom: '8px'
                                },
                                children: "¥1,250万"
                            }, void 0, false, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 298,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                type: "secondary",
                                style: {
                                    fontSize: '14px'
                                },
                                children: "增值业绩"
                            }, void 0, false, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 301,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: '8px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ArrowUpOutlined, {
                                        style: {
                                            color: '#52c41a',
                                            fontSize: '12px',
                                            marginRight: '4px'
                                        }
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 303,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                        style: {
                                            color: '#52c41a',
                                            fontSize: '12px'
                                        },
                                        children: "+15.6%"
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 304,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 302,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                        lineNumber: 297,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                    lineNumber: 296,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                    span: 6,
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            textAlign: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    fontSize: '32px',
                                    fontWeight: '700',
                                    color: '#fa8c16',
                                    marginBottom: '8px'
                                },
                                children: "78.5%"
                            }, void 0, false, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 311,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                type: "secondary",
                                style: {
                                    fontSize: '14px'
                                },
                                children: "客户档案完整度"
                            }, void 0, false, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 314,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: '8px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ArrowDownOutlined, {
                                        style: {
                                            color: '#ff4d4f',
                                            fontSize: '12px',
                                            marginRight: '4px'
                                        }
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 316,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                        style: {
                                            color: '#ff4d4f',
                                            fontSize: '12px'
                                        },
                                        children: "-0.5%"
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 317,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 315,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                        lineNumber: 310,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                    lineNumber: 309,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
            lineNumber: 269,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
        lineNumber: 217,
        columnNumber: 5
    }, this);
};
_s1(CompanyKPIBanner, "PuBGlDXNqW4kyfo2r81M60nQ59s=");
_c1 = CompanyKPIBanner;
// 左侧行动区组件
const ActionSection = ()=>{
    _s2();
    const [viewMode, setViewMode] = (0, _react.useState)('list');
    const [selectedDate, setSelectedDate] = (0, _react.useState)('');
    const [handoverDrawerOpen, setHandoverDrawerOpen] = (0, _react.useState)(false);
    const [selectedHandover, setSelectedHandover] = (0, _react.useState)(null);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = (0, _react.useState)(false);
    const [editingContext, setEditingContext] = (0, _react.useState)(null);
    const [form] = _antd.Form.useForm();
    const [hoveredItem, setHoveredItem] = (0, _react.useState)(null);
    // 智能提醒与任务队列数据
    const intelligentTasks = {
        newImplementation: [
            {
                id: 1,
                customer: '阿里巴巴集团',
                sales: '张销售',
                amount: '¥500,000',
                priority: 'high',
                dueDate: '2024-01-15'
            },
            {
                id: 2,
                customer: '腾讯科技',
                sales: '李销售',
                amount: '¥300,000',
                priority: 'medium',
                dueDate: '2024-01-16'
            },
            {
                id: 3,
                customer: '字节跳动',
                sales: '王销售',
                amount: '¥800,000',
                priority: 'high',
                dueDate: '2024-01-18'
            }
        ],
        pendingRenewal: [
            {
                id: 4,
                customer: '美团点评',
                contractEnd: '2024-02-28',
                amount: '¥450,000',
                probability: 85
            },
            {
                id: 5,
                customer: '滴滴出行',
                contractEnd: '2024-03-15',
                amount: '¥320,000',
                probability: 75
            },
            {
                id: 6,
                customer: '小米科技',
                contractEnd: '2024-03-30',
                amount: '¥280,000',
                probability: 90
            }
        ],
        inactiveCustomers: [
            {
                id: 7,
                customer: '百度公司',
                lastActivity: '30天前',
                healthScore: 45,
                risk: 'high'
            },
            {
                id: 8,
                customer: '网易公司',
                lastActivity: '15天前',
                healthScore: 62,
                risk: 'medium'
            },
            {
                id: 9,
                customer: '搜狐公司',
                lastActivity: '45天前',
                healthScore: 38,
                risk: 'critical'
            }
        ],
        activeOpportunities: [
            {
                id: 10,
                customer: '京东集团',
                opportunity: '产品升级',
                potential: '¥200,000',
                stage: '需求评估'
            },
            {
                id: 11,
                customer: '拼多多',
                opportunity: '功能扩展',
                potential: '¥350,000',
                stage: '方案制定'
            },
            {
                id: 12,
                customer: '新浪微博',
                opportunity: '增值服务',
                potential: '¥150,000',
                stage: '商务谈判'
            }
        ]
    };
    // 任务类型文本映射函数
    const getTaskTypeText = (type)=>{
        const texts = {
            'business-review': '业务回顾',
            'renewal': '续约',
            'training': '培训',
            'report': '报告',
            'survey': '调研',
            'meeting': '会议',
            'demo': '演示',
            'contract': '合同'
        };
        return texts[type] || '其他';
    };
    // 我的日程与待办数据（使用状态管理以支持新增/编辑/删除）
    const [scheduleData, setScheduleData] = (0, _react.useState)({
        today: [
            {
                id: 1,
                task: '客户回访 - 阿里巴巴',
                customer: '阿里巴巴集团',
                time: '14:00',
                type: 'business-review',
                completed: false
            },
            {
                id: 2,
                task: '续约谈判准备',
                customer: '腾讯科技',
                time: '16:00',
                type: 'renewal',
                completed: false
            },
            {
                id: 3,
                task: '客户培训安排',
                customer: '字节跳动',
                time: '18:00',
                type: 'training',
                completed: true
            }
        ],
        thisWeek: [
            {
                id: 4,
                task: '月度报告整理',
                customer: '美团点评',
                time: '明天 10:00',
                type: 'report',
                completed: false
            },
            {
                id: 5,
                task: '客户满意度调研',
                customer: '滴滴出行',
                time: '周三 15:00',
                type: 'survey',
                completed: false
            },
            {
                id: 6,
                task: '产品演示准备',
                customer: '百度公司',
                time: '周四 14:00',
                type: 'demo',
                completed: false
            }
        ],
        future: [
            {
                id: 7,
                task: '年度客户会议',
                customer: '小米科技',
                time: '下周一 09:00',
                type: 'meeting',
                completed: false
            },
            {
                id: 8,
                task: '季度业务回顾',
                customer: '京东集团',
                time: '下周三 14:00',
                type: 'business-review',
                completed: false
            },
            {
                id: 9,
                task: '合同续签仪式',
                customer: '拼多多',
                time: '下周五 16:00',
                type: 'contract',
                completed: false
            }
        ]
    });
    const allIds = (0, _react.useMemo)(()=>{
        return new Set([
            ...scheduleData.today.map((i)=>i.id),
            ...scheduleData.thisWeek.map((i)=>i.id),
            ...scheduleData.future.map((i)=>i.id)
        ]);
    }, [
        scheduleData
    ]);
    const getNextId = ()=>{
        let next = 1;
        while(allIds.has(next))next += 1;
        return next;
    };
    const openAddModal = ()=>{
        setEditingContext({
            section: 'today'
        });
        form.resetFields();
        setIsScheduleModalOpen(true);
    };
    const openEditModal = (section, id)=>{
        const record = scheduleData[section].find((i)=>i.id === id);
        if (record) {
            setEditingContext({
                section,
                id
            });
            form.setFieldsValue({
                section,
                task: record.task,
                customer: record.customer,
                time: record.time,
                type: record.type,
                completed: record.completed
            });
            setIsScheduleModalOpen(true);
        }
    };
    const handleDelete = (section, id)=>{
        setScheduleData((prev)=>({
                ...prev,
                [section]: prev[section].filter((i)=>i.id !== id)
            }));
    };
    const handleToggleCompleted = (section, id, checked)=>{
        setScheduleData((prev)=>({
                ...prev,
                [section]: prev[section].map((i)=>i.id === id ? {
                        ...i,
                        completed: checked
                    } : i)
            }));
    };
    const handleModalOk = async ()=>{
        const values = await form.validateFields();
        const { section, task, customer, time, type } = values;
        const completed = Boolean(values.completed);
        setScheduleData((prev)=>{
            if (editingContext && editingContext.id != null) {
                // 编辑
                const originalSection = editingContext.section;
                // 如果切换了分组，需要从原分组删除，添加到新分组
                const updatedOriginal = prev[originalSection].filter((i)=>i.id !== editingContext.id);
                const updatedTarget = [
                    ...prev[section].filter((i)=>i.id !== editingContext.id),
                    {
                        id: editingContext.id,
                        task,
                        customer,
                        time,
                        type,
                        completed
                    }
                ];
                return {
                    ...prev,
                    [originalSection]: updatedOriginal,
                    [section]: updatedTarget
                };
            }
            // 新增
            const newItem = {
                id: getNextId(),
                task,
                customer,
                time,
                type,
                completed
            };
            return {
                ...prev,
                [section]: [
                    ...prev[section],
                    newItem
                ]
            };
        });
        setIsScheduleModalOpen(false);
        setEditingContext(null);
    };
    const handleModalCancel = ()=>{
        setIsScheduleModalOpen(false);
        setEditingContext(null);
    };
    // 日历视图：悬停与隐藏的本地状态
    const [hoveredCalendarIdx, setHoveredCalendarIdx] = (0, _react.useState)(null);
    const [hiddenCalendarItems, setHiddenCalendarItems] = (0, _react.useState)({});
    const inferSectionByDate = (dateStr)=>{
        try {
            const today = new Date();
            const target = new Date(dateStr);
            const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const startOfTarget = new Date(target.getFullYear(), target.getMonth(), target.getDate());
            const diffMs = startOfTarget.getTime() - startOfToday.getTime();
            const diffDays = Math.round(diffMs / 86400000);
            if (diffDays === 0) return 'today';
            if (diffDays > 0 && diffDays <= 7) return 'thisWeek';
            return 'future';
        } catch  {
            return 'future';
        }
    };
    const openEditFromCalendar = (dateStr, item)=>{
        const section = inferSectionByDate(dateStr);
        setEditingContext({
            section
        });
        form.setFieldsValue({
            section,
            task: item.task,
            customer: item.customer,
            time: item.time,
            type: item.type,
            completed: false
        });
        setIsScheduleModalOpen(true);
    };
    const deleteFromCalendarView = (dateStr, index)=>{
        setHiddenCalendarItems((prev)=>{
            const existed = prev[dateStr] || [];
            if (existed.includes(index)) return prev;
            return {
                ...prev,
                [dateStr]: [
                    ...existed,
                    index
                ]
            };
        });
    };
    // 日历事件数据
    const calendarEvents = (()=>{
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;
        const monthStr = currentMonth.toString().padStart(2, '0');
        const events = {
            // 使用当前月份的日期
            [`${currentYear}-${monthStr}-15`]: [
                {
                    task: '客户回访 - 阿里巴巴',
                    customer: '阿里巴巴集团',
                    time: '14:00',
                    type: 'business-review'
                },
                {
                    task: '续约谈判准备',
                    customer: '腾讯科技',
                    time: '16:00',
                    type: 'renewal'
                }
            ],
            [`${currentYear}-${monthStr}-16`]: [
                {
                    task: '客户培训安排',
                    customer: '字节跳动',
                    time: '18:00',
                    type: 'training'
                }
            ],
            [`${currentYear}-${monthStr}-20`]: [
                {
                    task: '月度报告整理',
                    customer: '美团点评',
                    time: '10:00',
                    type: 'report'
                }
            ],
            [`${currentYear}-${monthStr}-22`]: [
                {
                    task: '客户满意度调研',
                    customer: '滴滴出行',
                    time: '15:00',
                    type: 'survey'
                }
            ],
            [`${currentYear}-${monthStr}-23`]: [
                {
                    task: '产品演示准备',
                    customer: '百度公司',
                    time: '14:00',
                    type: 'demo'
                }
            ],
            [`${currentYear}-${monthStr}-08`]: [
                {
                    task: '客户会议',
                    customer: '小米科技',
                    time: '09:00',
                    type: 'meeting'
                }
            ],
            [`${currentYear}-${monthStr}-10`]: [
                {
                    task: '合同签署',
                    customer: '京东集团',
                    time: '16:00',
                    type: 'contract'
                }
            ],
            [`${currentYear}-${monthStr}-12`]: [
                {
                    task: '产品培训',
                    customer: '拼多多',
                    time: '14:00',
                    type: 'training'
                },
                {
                    task: '业务回顾',
                    customer: '新浪微博',
                    time: '16:00',
                    type: 'business-review'
                }
            ],
            [`${currentYear}-${monthStr}-18`]: [
                {
                    task: '续约谈判',
                    customer: '网易公司',
                    time: '10:00',
                    type: 'renewal'
                }
            ],
            [`${currentYear}-${monthStr}-25`]: [
                {
                    task: '客户回访',
                    customer: '搜狐公司',
                    time: '15:00',
                    type: 'business-review'
                }
            ],
            [`${currentYear}-${monthStr}-28`]: [
                {
                    task: '月度总结',
                    customer: '百度公司',
                    time: '14:00',
                    type: 'report'
                }
            ]
        };
        // 注意：不再生成随机事件，保持稳定
        return events;
    })();
    const getTaskTypeColor = (type)=>{
        const colors = {
            'business-review': '#52c41a',
            'renewal': '#1890ff',
            'training': '#722ed1',
            'report': '#fa8c16',
            'survey': '#13c2c2',
            'meeting': '#eb2f96',
            'demo': '#fa541c',
            'contract': '#2f54eb'
        };
        return colors[type] || '#666';
    };
    const getRiskColor = (risk)=>{
        const colors = {
            'critical': '#ff4d4f',
            'high': '#fa8c16',
            'medium': '#faad14',
            'low': '#52c41a'
        };
        return colors[risk] || '#666';
    };
    const getPriorityColor = (priority)=>{
        const colors = {
            'high': '#ff4d4f',
            'medium': '#fa8c16',
            'low': '#52c41a'
        };
        return colors[priority] || '#666';
    };
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
        span: 16,
        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
            gutter: [
                0,
                16
            ],
            children: [
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                    span: 24,
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                        style: cardStyle,
                        title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center'
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.BellOutlined, {
                                    style: {
                                        color: '#1890ff',
                                        marginRight: '8px'
                                    }
                                }, void 0, false, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 625,
                                    columnNumber: 17
                                }, void 0),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                    style: {
                                        fontSize: '16px',
                                        fontWeight: '600'
                                    },
                                    children: "智能提醒与任务队列"
                                }, void 0, false, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 626,
                                    columnNumber: 17
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                            lineNumber: 624,
                            columnNumber: 15
                        }, void 0),
                        bodyStyle: {
                            padding: '16px'
                        },
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tabs, {
                            defaultActiveKey: "handover",
                            size: "small",
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TabPane, {
                                    tab: "交接实施",
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List, {
                                            dataSource: _handoverData.mockCustomerHandovers,
                                            renderItem: (item)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List.Item, {
                                                    actions: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                            size: "small",
                                                            style: {
                                                                borderRadius: '6px'
                                                            },
                                                            onClick: ()=>{
                                                                setSelectedHandover(item);
                                                                setHandoverDrawerOpen(true);
                                                            },
                                                            children: "查看详情"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                            lineNumber: 638,
                                                            columnNumber: 25
                                                        }, void 0)
                                                    ],
                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List.Item.Meta, {
                                                        avatar: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                                                            style: {
                                                                backgroundColor: '#1890ff'
                                                            },
                                                            children: item.customerName.charAt(0)
                                                        }, void 0, false, {
                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                            lineNumber: 642,
                                                            columnNumber: 33
                                                        }, void 0),
                                                        title: item.customerName,
                                                        description: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                            size: "small",
                                                            wrap: true,
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                    color: item.expectationAlignment === 'aligned' ? 'green' : item.expectationAlignment === 'partially_aligned' ? 'gold' : 'orange',
                                                                    children: item.expectationAlignment === 'aligned' ? '已对齐' : item.expectationAlignment === 'partially_aligned' ? '部分对齐' : '未对齐'
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                    lineNumber: 646,
                                                                    columnNumber: 29
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                    color: item.hasRiskAlert ? 'orange' : 'default',
                                                                    children: [
                                                                        "风险提示: ",
                                                                        item.hasRiskAlert ? '有' : '无'
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                    lineNumber: 649,
                                                                    columnNumber: 29
                                                                }, void 0),
                                                                typeof item.stakeholderCount === 'number' && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                    color: "purple",
                                                                    children: [
                                                                        "干系人: ",
                                                                        item.stakeholderCount
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                    lineNumber: 653,
                                                                    columnNumber: 31
                                                                }, void 0),
                                                                typeof item.handoverRating === 'number' && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                    color: "gold",
                                                                    children: [
                                                                        "评分: ",
                                                                        item.handoverRating
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                    lineNumber: 656,
                                                                    columnNumber: 31
                                                                }, void 0),
                                                                item.updatedAt && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                    type: "secondary",
                                                                    children: [
                                                                        "更新时间: ",
                                                                        item.updatedAt
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                    lineNumber: 659,
                                                                    columnNumber: 31
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                            lineNumber: 645,
                                                            columnNumber: 27
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 641,
                                                        columnNumber: 23
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 636,
                                                    columnNumber: 21
                                                }, void 0)
                                        }, void 0, false, {
                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                            lineNumber: 633,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Drawer, {
                                            title: (selectedHandover === null || selectedHandover === void 0 ? void 0 : selectedHandover.customerName) || '客户交接详情',
                                            open: handoverDrawerOpen,
                                            onClose: ()=>setHandoverDrawerOpen(false),
                                            width: 720,
                                            children: selectedHandover && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                        size: "small",
                                                        wrap: true,
                                                        style: {
                                                            marginBottom: 12
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                color: selectedHandover.expectationAlignment === 'aligned' ? 'green' : selectedHandover.expectationAlignment === 'partially_aligned' ? 'gold' : 'orange',
                                                                children: selectedHandover.expectationAlignment === 'aligned' ? '已对齐' : selectedHandover.expectationAlignment === 'partially_aligned' ? '部分对齐' : '未对齐'
                                                            }, void 0, false, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 676,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                color: selectedHandover.hasRiskAlert ? 'orange' : 'default',
                                                                children: [
                                                                    "风险提示: ",
                                                                    selectedHandover.hasRiskAlert ? '有' : '无'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 679,
                                                                columnNumber: 25
                                                            }, this),
                                                            typeof selectedHandover.handoverRating === 'number' && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                color: "gold",
                                                                children: [
                                                                    "评分: ",
                                                                    selectedHandover.handoverRating
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 680,
                                                                columnNumber: 81
                                                            }, this),
                                                            typeof selectedHandover.stakeholderCount === 'number' && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                color: "purple",
                                                                children: [
                                                                    "干系人: ",
                                                                    selectedHandover.stakeholderCount
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 681,
                                                                columnNumber: 83
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 675,
                                                        columnNumber: 23
                                                    }, this),
                                                    selectedHandover.crmData && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            marginBottom: 16
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                                                                level: 5,
                                                                style: {
                                                                    marginBottom: 8
                                                                },
                                                                children: "CRM 同步信息"
                                                            }, void 0, false, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 686,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                                                                gutter: 16,
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                                        span: 12,
                                                                        children: [
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                type: "secondary",
                                                                                children: "合同金额："
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                                lineNumber: 688,
                                                                                columnNumber: 44
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                style: {
                                                                                    marginLeft: 8
                                                                                },
                                                                                children: [
                                                                                    "¥",
                                                                                    selectedHandover.crmData.contractAmount
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                                lineNumber: 688,
                                                                                columnNumber: 79
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 688,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                                        span: 12,
                                                                        children: [
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                type: "secondary",
                                                                                children: "服务周期："
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                                lineNumber: 689,
                                                                                columnNumber: 44
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                style: {
                                                                                    marginLeft: 8
                                                                                },
                                                                                children: selectedHandover.crmData.servicePeriod
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                                lineNumber: 689,
                                                                                columnNumber: 79
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 689,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 687,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                style: {
                                                                    marginTop: 8
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                        type: "secondary",
                                                                        children: "已购产品："
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 692,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                                        wrap: true,
                                                                        style: {
                                                                            marginTop: 6
                                                                        },
                                                                        children: selectedHandover.crmData.purchasedProducts.map((p, i)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                                color: "blue",
                                                                                children: p
                                                                            }, i, false, {
                                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                                lineNumber: 694,
                                                                                columnNumber: 90
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 693,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 691,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                style: {
                                                                    marginTop: 8
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                        type: "secondary",
                                                                        children: "关键联系人："
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 698,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                        style: {
                                                                            marginTop: 6
                                                                        },
                                                                        children: selectedHandover.crmData.keyContacts.map((c, i)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                                style: {
                                                                                    marginBottom: 4
                                                                                },
                                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                    children: c
                                                                                }, void 0, false, {
                                                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                                    lineNumber: 700,
                                                                                    columnNumber: 125
                                                                                }, this)
                                                                            }, i, false, {
                                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                                lineNumber: 700,
                                                                                columnNumber: 84
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 699,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 697,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 685,
                                                        columnNumber: 25
                                                    }, this),
                                                    selectedHandover.onboardingTasks && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            marginBottom: 16
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                                                                level: 5,
                                                                style: {
                                                                    marginBottom: 8
                                                                },
                                                                children: "Onboarding 行动计划"
                                                            }, void 0, false, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 708,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List, {
                                                                size: "small",
                                                                dataSource: selectedHandover.onboardingTasks,
                                                                renderItem: (t)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List.Item, {
                                                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                                                                    checked: t.completed
                                                                                }, void 0, false, {
                                                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                                    lineNumber: 715,
                                                                                    columnNumber: 35
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                    style: {
                                                                                        textDecoration: t.completed ? 'line-through' : 'none'
                                                                                    },
                                                                                    children: t.title
                                                                                }, void 0, false, {
                                                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                                    lineNumber: 716,
                                                                                    columnNumber: 35
                                                                                }, void 0),
                                                                                t.dueDate && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                    type: "secondary",
                                                                                    children: [
                                                                                        "截止: ",
                                                                                        t.dueDate
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                                    lineNumber: 717,
                                                                                    columnNumber: 49
                                                                                }, void 0)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                            lineNumber: 714,
                                                                            columnNumber: 33
                                                                        }, void 0)
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 713,
                                                                        columnNumber: 31
                                                                    }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 709,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 707,
                                                        columnNumber: 25
                                                    }, this),
                                                    selectedHandover.internalComments && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                                                                level: 5,
                                                                style: {
                                                                    marginBottom: 8
                                                                },
                                                                children: "内部协作沟通"
                                                            }, void 0, false, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 727,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List, {
                                                                size: "small",
                                                                dataSource: selectedHandover.internalComments,
                                                                renderItem: (c)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List.Item, {
                                                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                                    style: {
                                                                                        marginBottom: 4
                                                                                    },
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                            strong: true,
                                                                                            children: c.author
                                                                                        }, void 0, false, {
                                                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                                            lineNumber: 734,
                                                                                            columnNumber: 68
                                                                                        }, void 0),
                                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                            type: "secondary",
                                                                                            style: {
                                                                                                marginLeft: 8
                                                                                            },
                                                                                            children: c.createdAt
                                                                                        }, void 0, false, {
                                                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                                            lineNumber: 734,
                                                                                            columnNumber: 98
                                                                                        }, void 0)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                                    lineNumber: 734,
                                                                                    columnNumber: 35
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                    children: c.content
                                                                                }, void 0, false, {
                                                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                                    lineNumber: 735,
                                                                                    columnNumber: 35
                                                                                }, void 0)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                            lineNumber: 733,
                                                                            columnNumber: 33
                                                                        }, void 0)
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 732,
                                                                        columnNumber: 31
                                                                    }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 728,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 726,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 674,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                            lineNumber: 667,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, "handover", true, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 632,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TabPane, {
                                    tab: "新签实施",
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List, {
                                        dataSource: intelligentTasks.newImplementation,
                                        renderItem: (item)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List.Item, {
                                                actions: [
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                        type: "primary",
                                                        size: "small",
                                                        style: {
                                                            borderRadius: '6px'
                                                        },
                                                        children: "开始实施"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 752,
                                                        columnNumber: 25
                                                    }, void 0)
                                                ],
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List.Item.Meta, {
                                                    avatar: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                                                        style: {
                                                            backgroundColor: '#1890ff'
                                                        },
                                                        children: item.customer.charAt(0)
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 758,
                                                        columnNumber: 33
                                                    }, void 0),
                                                    title: item.customer,
                                                    description: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                type: "secondary",
                                                                children: [
                                                                    "来源销售: ",
                                                                    item.sales
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 762,
                                                                columnNumber: 29
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                type: "secondary",
                                                                children: [
                                                                    "合同金额: ",
                                                                    item.amount
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 763,
                                                                columnNumber: 29
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                type: "secondary",
                                                                children: [
                                                                    "交付期限: ",
                                                                    item.dueDate
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 764,
                                                                columnNumber: 29
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                color: getPriorityColor(item.priority),
                                                                children: item.priority === 'high' ? '高优先级' : '中优先级'
                                                            }, void 0, false, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 765,
                                                                columnNumber: 29
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 761,
                                                        columnNumber: 27
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 757,
                                                    columnNumber: 23
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 750,
                                                columnNumber: 21
                                            }, void 0)
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 747,
                                        columnNumber: 17
                                    }, this)
                                }, "1", false, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 746,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TabPane, {
                                    tab: "待续费",
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List, {
                                        dataSource: intelligentTasks.pendingRenewal,
                                        renderItem: (item)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List.Item, {
                                                actions: [
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                        size: "small",
                                                        style: {
                                                            borderRadius: '6px'
                                                        },
                                                        children: "跟进续费"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 782,
                                                        columnNumber: 25
                                                    }, void 0)
                                                ],
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List.Item.Meta, {
                                                    avatar: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                                                        style: {
                                                            backgroundColor: '#52c41a'
                                                        },
                                                        children: item.customer.charAt(0)
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 786,
                                                        columnNumber: 33
                                                    }, void 0),
                                                    title: item.customer,
                                                    description: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                type: "secondary",
                                                                children: [
                                                                    "合同到期: ",
                                                                    item.contractEnd
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 790,
                                                                columnNumber: 29
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                type: "secondary",
                                                                children: [
                                                                    "续费金额: ",
                                                                    item.amount
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 791,
                                                                columnNumber: 29
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                color: "green",
                                                                children: [
                                                                    "续费概率: ",
                                                                    item.probability,
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 792,
                                                                columnNumber: 29
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 789,
                                                        columnNumber: 27
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 785,
                                                    columnNumber: 23
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 780,
                                                columnNumber: 21
                                            }, void 0)
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 777,
                                        columnNumber: 17
                                    }, this)
                                }, "2", false, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 776,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TabPane, {
                                    tab: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                        children: [
                                            "不活跃客户",
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Badge, {
                                                count: 3,
                                                size: "small",
                                                style: {
                                                    marginLeft: '4px'
                                                }
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 805,
                                                columnNumber: 21
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 803,
                                        columnNumber: 19
                                    }, void 0),
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List, {
                                        dataSource: intelligentTasks.inactiveCustomers,
                                        renderItem: (item)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List.Item, {
                                                actions: [
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                        size: "small",
                                                        style: {
                                                            borderRadius: '6px'
                                                        },
                                                        children: "立即联系"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 815,
                                                        columnNumber: 25
                                                    }, void 0)
                                                ],
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List.Item.Meta, {
                                                    avatar: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                                                        style: {
                                                            backgroundColor: getRiskColor(item.risk)
                                                        },
                                                        children: item.customer.charAt(0)
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 819,
                                                        columnNumber: 33
                                                    }, void 0),
                                                    title: item.customer,
                                                    description: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                type: "secondary",
                                                                children: [
                                                                    "最后活跃: ",
                                                                    item.lastActivity
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 823,
                                                                columnNumber: 29
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                type: "secondary",
                                                                children: [
                                                                    "健康分: ",
                                                                    item.healthScore
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 824,
                                                                columnNumber: 29
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                color: getRiskColor(item.risk),
                                                                children: item.risk === 'critical' ? '严重风险' : item.risk === 'high' ? '高风险' : '中风险'
                                                            }, void 0, false, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 825,
                                                                columnNumber: 29
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 822,
                                                        columnNumber: 27
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 818,
                                                    columnNumber: 23
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 813,
                                                columnNumber: 21
                                            }, void 0)
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 810,
                                        columnNumber: 17
                                    }, this)
                                }, "3", false, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 801,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TabPane, {
                                    tab: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                        children: [
                                            "高活跃客户",
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.FireOutlined, {
                                                style: {
                                                    color: '#fa8c16',
                                                    marginLeft: '4px'
                                                }
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 840,
                                                columnNumber: 21
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 838,
                                        columnNumber: 19
                                    }, void 0),
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List, {
                                        dataSource: intelligentTasks.activeOpportunities,
                                        renderItem: (item)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List.Item, {
                                                actions: [
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                        type: "primary",
                                                        size: "small",
                                                        style: {
                                                            borderRadius: '6px'
                                                        },
                                                        children: "抓住商机"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 850,
                                                        columnNumber: 25
                                                    }, void 0)
                                                ],
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List.Item.Meta, {
                                                    avatar: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                                                        style: {
                                                            backgroundColor: '#fa8c16'
                                                        },
                                                        children: item.customer.charAt(0)
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 854,
                                                        columnNumber: 33
                                                    }, void 0),
                                                    title: item.customer,
                                                    description: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                type: "secondary",
                                                                children: item.opportunity
                                                            }, void 0, false, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 858,
                                                                columnNumber: 29
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                type: "secondary",
                                                                children: [
                                                                    "潜在价值: ",
                                                                    item.potential
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 859,
                                                                columnNumber: 29
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                color: "orange",
                                                                children: item.stage
                                                            }, void 0, false, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 860,
                                                                columnNumber: 29
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 857,
                                                        columnNumber: 27
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 853,
                                                    columnNumber: 23
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 848,
                                                columnNumber: 21
                                            }, void 0)
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 845,
                                        columnNumber: 17
                                    }, this)
                                }, "4", false, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 836,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                            lineNumber: 631,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                        lineNumber: 621,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                    lineNumber: 620,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                    span: 24,
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            style: cardStyle,
                            title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                },
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.CalendarOutlined, {
                                                style: {
                                                    color: '#52c41a',
                                                    marginRight: '8px'
                                                }
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 879,
                                                columnNumber: 17
                                            }, void 0),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                style: {
                                                    fontSize: '16px',
                                                    fontWeight: '600'
                                                },
                                                children: "我的日程与待办"
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 880,
                                                columnNumber: 19
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 878,
                                        columnNumber: 15
                                    }, void 0),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            display: 'flex',
                                            gap: '8px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                type: "primary",
                                                size: "small",
                                                shape: "circle",
                                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PlusOutlined, {}, void 0, false, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 887,
                                                    columnNumber: 27
                                                }, void 0),
                                                onClick: openAddModal
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 883,
                                                columnNumber: 19
                                            }, void 0),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                type: viewMode === 'list' ? 'primary' : 'text',
                                                size: "small",
                                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UnorderedListOutlined, {}, void 0, false, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 893,
                                                    columnNumber: 27
                                                }, void 0),
                                                onClick: ()=>setViewMode('list'),
                                                style: {
                                                    borderRadius: '6px'
                                                }
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 890,
                                                columnNumber: 19
                                            }, void 0),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                type: viewMode === 'calendar' ? 'primary' : 'text',
                                                size: "small",
                                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.CalendarOutlined, {}, void 0, false, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 900,
                                                    columnNumber: 27
                                                }, void 0),
                                                onClick: ()=>setViewMode('calendar'),
                                                style: {
                                                    borderRadius: '6px'
                                                }
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 897,
                                                columnNumber: 19
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 882,
                                        columnNumber: 17
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 877,
                                columnNumber: 15
                            }, void 0),
                            bodyStyle: {
                                padding: '16px'
                            },
                            children: viewMode === 'list' ? /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_jsxdevruntime.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            marginBottom: '20px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                                                level: 5,
                                                style: {
                                                    marginBottom: '12px',
                                                    color: '#262626'
                                                },
                                                children: "今天"
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 913,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List, {
                                                dataSource: scheduleData.today,
                                                renderItem: (item)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List.Item, {
                                                        style: {
                                                            padding: '8px 0'
                                                        },
                                                        onMouseEnter: ()=>setHoveredItem({
                                                                section: 'today',
                                                                id: item.id
                                                            }),
                                                        onMouseLeave: ()=>setHoveredItem(null),
                                                        actions: hoveredItem && hoveredItem.section === 'today' && hoveredItem.id === item.id ? [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                                size: "small",
                                                                type: "text",
                                                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.EditOutlined, {}, void 0, false, {
                                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                    lineNumber: 924,
                                                                    columnNumber: 79
                                                                }, void 0),
                                                                onClick: ()=>openEditModal('today', item.id)
                                                            }, "edit", false, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 924,
                                                                columnNumber: 29
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Popconfirm, {
                                                                title: "确认删除该日程？",
                                                                onConfirm: ()=>handleDelete('today', item.id),
                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                                    size: "small",
                                                                    type: "text",
                                                                    danger: true,
                                                                    icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DeleteOutlined, {}, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 926,
                                                                        columnNumber: 77
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                    lineNumber: 926,
                                                                    columnNumber: 31
                                                                }, void 0)
                                                            }, "delete", false, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 925,
                                                                columnNumber: 29
                                                            }, void 0)
                                                        ] : [],
                                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List.Item.Meta, {
                                                            avatar: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                                                checked: item.completed,
                                                                onChange: (e)=>handleToggleCompleted('today', item.id, e.target.checked)
                                                            }, void 0, false, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 933,
                                                                columnNumber: 35
                                                            }, void 0),
                                                            title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'flex-start',
                                                                    gap: '8px'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                        color: getTaskTypeColor(item.type),
                                                                        style: {
                                                                            background: `${getTaskTypeColor(item.type)}15`,
                                                                            border: `1px solid ${getTaskTypeColor(item.type)}30`,
                                                                            color: getTaskTypeColor(item.type)
                                                                        },
                                                                        children: getTaskTypeText(item.type)
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 936,
                                                                        columnNumber: 27
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                                        style: {
                                                                            textDecoration: item.completed ? 'line-through' : 'none',
                                                                            opacity: item.completed ? 0.6 : 1
                                                                        },
                                                                        children: item.task
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 946,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 935,
                                                                columnNumber: 25
                                                            }, void 0),
                                                            description: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                        type: "secondary",
                                                                        children: item.customer
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 953,
                                                                        columnNumber: 27
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                        type: "secondary",
                                                                        children: [
                                                                            "时间: ",
                                                                            item.time
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 954,
                                                                        columnNumber: 31
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 952,
                                                                columnNumber: 25
                                                            }, void 0)
                                                        }, void 0, false, {
                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                            lineNumber: 932,
                                                            columnNumber: 21
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 917,
                                                        columnNumber: 19
                                                    }, void 0)
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 914,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 912,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            marginBottom: '20px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                                                level: 5,
                                                style: {
                                                    marginBottom: '12px',
                                                    color: '#262626'
                                                },
                                                children: "本周"
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 965,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List, {
                                                dataSource: scheduleData.thisWeek,
                                                renderItem: (item)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List.Item, {
                                                        style: {
                                                            padding: '8px 0'
                                                        },
                                                        onMouseEnter: ()=>setHoveredItem({
                                                                section: 'thisWeek',
                                                                id: item.id
                                                            }),
                                                        onMouseLeave: ()=>setHoveredItem(null),
                                                        actions: hoveredItem && hoveredItem.section === 'thisWeek' && hoveredItem.id === item.id ? [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                                size: "small",
                                                                type: "text",
                                                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.EditOutlined, {}, void 0, false, {
                                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                    lineNumber: 976,
                                                                    columnNumber: 79
                                                                }, void 0),
                                                                onClick: ()=>openEditModal('thisWeek', item.id)
                                                            }, "edit", false, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 976,
                                                                columnNumber: 29
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Popconfirm, {
                                                                title: "确认删除该日程？",
                                                                onConfirm: ()=>handleDelete('thisWeek', item.id),
                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                                    size: "small",
                                                                    type: "text",
                                                                    danger: true,
                                                                    icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DeleteOutlined, {}, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 978,
                                                                        columnNumber: 77
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                    lineNumber: 978,
                                                                    columnNumber: 31
                                                                }, void 0)
                                                            }, "delete", false, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 977,
                                                                columnNumber: 29
                                                            }, void 0)
                                                        ] : [],
                                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List.Item.Meta, {
                                                            avatar: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                                                checked: item.completed,
                                                                onChange: (e)=>handleToggleCompleted('thisWeek', item.id, e.target.checked)
                                                            }, void 0, false, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 985,
                                                                columnNumber: 35
                                                            }, void 0),
                                                            title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'flex-start',
                                                                    gap: '8px'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                        color: getTaskTypeColor(item.type),
                                                                        style: {
                                                                            background: `${getTaskTypeColor(item.type)}15`,
                                                                            border: `1px solid ${getTaskTypeColor(item.type)}30`,
                                                                            color: getTaskTypeColor(item.type)
                                                                        },
                                                                        children: getTaskTypeText(item.type)
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 988,
                                                                        columnNumber: 27
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                                        style: {
                                                                            textDecoration: item.completed ? 'line-through' : 'none',
                                                                            opacity: item.completed ? 0.6 : 1
                                                                        },
                                                                        children: item.task
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 998,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 987,
                                                                columnNumber: 25
                                                            }, void 0),
                                                            description: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                        type: "secondary",
                                                                        children: item.customer
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 1005,
                                                                        columnNumber: 27
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                        type: "secondary",
                                                                        children: [
                                                                            "时间: ",
                                                                            item.time
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 1006,
                                                                        columnNumber: 31
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 1004,
                                                                columnNumber: 25
                                                            }, void 0)
                                                        }, void 0, false, {
                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                            lineNumber: 984,
                                                            columnNumber: 21
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 969,
                                                        columnNumber: 19
                                                    }, void 0)
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 966,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 964,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                                                level: 5,
                                                style: {
                                                    marginBottom: '12px',
                                                    color: '#262626'
                                                },
                                                children: "未来"
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 1017,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List, {
                                                dataSource: scheduleData.future,
                                                renderItem: (item)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List.Item, {
                                                        style: {
                                                            padding: '8px 0'
                                                        },
                                                        onMouseEnter: ()=>setHoveredItem({
                                                                section: 'future',
                                                                id: item.id
                                                            }),
                                                        onMouseLeave: ()=>setHoveredItem(null),
                                                        actions: hoveredItem && hoveredItem.section === 'future' && hoveredItem.id === item.id ? [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                                size: "small",
                                                                type: "text",
                                                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.EditOutlined, {}, void 0, false, {
                                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                    lineNumber: 1028,
                                                                    columnNumber: 83
                                                                }, void 0),
                                                                onClick: ()=>openEditModal('future', item.id)
                                                            }, "edit", false, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 1028,
                                                                columnNumber: 33
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Popconfirm, {
                                                                title: "确认删除该日程？",
                                                                onConfirm: ()=>handleDelete('future', item.id),
                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                                    size: "small",
                                                                    type: "text",
                                                                    danger: true,
                                                                    icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DeleteOutlined, {}, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 1030,
                                                                        columnNumber: 81
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                    lineNumber: 1030,
                                                                    columnNumber: 35
                                                                }, void 0)
                                                            }, "delete", false, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 1029,
                                                                columnNumber: 33
                                                            }, void 0)
                                                        ] : [],
                                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List.Item.Meta, {
                                                            avatar: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                                                checked: item.completed,
                                                                onChange: (e)=>handleToggleCompleted('future', item.id, e.target.checked)
                                                            }, void 0, false, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 1037,
                                                                columnNumber: 35
                                                            }, void 0),
                                                            title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'flex-start',
                                                                    gap: '8px'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                        color: getTaskTypeColor(item.type),
                                                                        style: {
                                                                            background: `${getTaskTypeColor(item.type)}15`,
                                                                            border: `1px solid ${getTaskTypeColor(item.type)}30`,
                                                                            color: getTaskTypeColor(item.type)
                                                                        },
                                                                        children: getTaskTypeText(item.type)
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 1040,
                                                                        columnNumber: 31
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                                        style: {
                                                                            textDecoration: item.completed ? 'line-through' : 'none',
                                                                            opacity: item.completed ? 0.6 : 1
                                                                        },
                                                                        children: item.task
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 1050,
                                                                        columnNumber: 31
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 1039,
                                                                columnNumber: 29
                                                            }, void 0),
                                                            description: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                        type: "secondary",
                                                                        children: item.customer
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 1057,
                                                                        columnNumber: 31
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                        type: "secondary",
                                                                        children: [
                                                                            "时间: ",
                                                                            item.time
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 1058,
                                                                        columnNumber: 31
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 1056,
                                                                columnNumber: 29
                                                            }, void 0)
                                                        }, void 0, false, {
                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                            lineNumber: 1036,
                                                            columnNumber: 25
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 1021,
                                                        columnNumber: 23
                                                    }, void 0)
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 1018,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 1016,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true) : /* 日历视图 */ /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    padding: '8px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Calendar, {
                                        fullscreen: false,
                                        style: {
                                            border: 'none'
                                        },
                                        onSelect: (date)=>{
                                            const dateStr = date.format('YYYY-MM-DD');
                                            setSelectedDate(selectedDate === dateStr ? '' : dateStr);
                                        },
                                        dateCellRender: (value)=>{
                                            const dateStr = value.format('YYYY-MM-DD');
                                            const events = calendarEvents[dateStr] || [];
                                            if (events.length === 0) return null;
                                            return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    display: 'flex',
                                                    gap: '2px',
                                                    flexWrap: 'wrap',
                                                    marginTop: '2px',
                                                    justifyContent: 'center'
                                                },
                                                children: [
                                                    events.slice(0, 3).map((event, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                width: '6px',
                                                                height: '6px',
                                                                borderRadius: '50%',
                                                                backgroundColor: getTaskTypeColor(event.type),
                                                                border: '1px solid #fff',
                                                                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                                            }
                                                        }, index, false, {
                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                            lineNumber: 1094,
                                                            columnNumber: 27
                                                        }, void 0)),
                                                    events.length > 3 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            width: '6px',
                                                            height: '6px',
                                                            borderRadius: '50%',
                                                            backgroundColor: '#999',
                                                            fontSize: '8px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            color: '#fff',
                                                            fontWeight: 'bold'
                                                        },
                                                        children: "+"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 1107,
                                                        columnNumber: 27
                                                    }, void 0)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 1086,
                                                columnNumber: 23
                                            }, void 0);
                                        }
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 1070,
                                        columnNumber: 17
                                    }, this),
                                    selectedDate && calendarEvents[selectedDate] && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            marginTop: '16px',
                                            padding: '12px',
                                            background: '#f8f9fa',
                                            borderRadius: '8px',
                                            border: '1px solid #e9ecef'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    marginBottom: '12px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                        style: {
                                                            fontWeight: '600',
                                                            color: '#262626'
                                                        },
                                                        children: [
                                                            selectedDate,
                                                            " 的待办事项"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 1142,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                        type: "text",
                                                        size: "small",
                                                        onClick: ()=>setSelectedDate(''),
                                                        style: {
                                                            padding: '0',
                                                            minWidth: 'auto'
                                                        },
                                                        children: "✕"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 1145,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 1136,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List, {
                                                size: "small",
                                                dataSource: (calendarEvents[selectedDate] || []).filter((_, idx)=>!(hiddenCalendarItems[selectedDate] || []).includes(idx)),
                                                renderItem: (item, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List.Item, {
                                                        style: {
                                                            padding: '8px 0'
                                                        },
                                                        onMouseEnter: ()=>setHoveredCalendarIdx(index),
                                                        onMouseLeave: ()=>setHoveredCalendarIdx(null),
                                                        actions: hoveredCalendarIdx === index ? [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                                size: "small",
                                                                type: "text",
                                                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.EditOutlined, {}, void 0, false, {
                                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                    lineNumber: 1165,
                                                                    columnNumber: 79
                                                                }, void 0),
                                                                onClick: ()=>openEditFromCalendar(selectedDate, item)
                                                            }, "edit", false, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 1165,
                                                                columnNumber: 29
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Popconfirm, {
                                                                title: "确认删除该日程？",
                                                                onConfirm: ()=>deleteFromCalendarView(selectedDate, index),
                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                                    size: "small",
                                                                    type: "text",
                                                                    danger: true,
                                                                    icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DeleteOutlined, {}, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 1167,
                                                                        columnNumber: 77
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                    lineNumber: 1167,
                                                                    columnNumber: 31
                                                                }, void 0)
                                                            }, "delete", false, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 1166,
                                                                columnNumber: 29
                                                            }, void 0)
                                                        ] : [],
                                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List.Item.Meta, {
                                                            avatar: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {}, void 0, false, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 1174,
                                                                columnNumber: 31
                                                            }, void 0),
                                                            title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'flex-start',
                                                                    gap: '8px'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                        color: getTaskTypeColor(item.type),
                                                                        style: {
                                                                            background: `${getTaskTypeColor(item.type)}15`,
                                                                            border: `1px solid ${getTaskTypeColor(item.type)}30`,
                                                                            color: getTaskTypeColor(item.type)
                                                                        },
                                                                        children: getTaskTypeText(item.type)
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 1177,
                                                                        columnNumber: 27
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                                        children: item.task
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 1187,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 1176,
                                                                columnNumber: 25
                                                            }, void 0),
                                                            description: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                        type: "secondary",
                                                                        children: item.customer
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 1192,
                                                                        columnNumber: 27
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                        type: "secondary",
                                                                        children: [
                                                                            "时间: ",
                                                                            item.time
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 1193,
                                                                        columnNumber: 33
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 1191,
                                                                columnNumber: 25
                                                            }, void 0)
                                                        }, void 0, false, {
                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                            lineNumber: 1173,
                                                            columnNumber: 21
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 1158,
                                                        columnNumber: 19
                                                    }, void 0)
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 1154,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 1129,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 1069,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                            lineNumber: 874,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Modal, {
                            title: editingContext && editingContext.id != null ? '编辑日程' : '新增日程',
                            open: isScheduleModalOpen,
                            onOk: handleModalOk,
                            onCancel: handleModalCancel,
                            okText: "保存",
                            cancelText: "取消",
                            destroyOnClose: true,
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form, {
                                form: form,
                                layout: "vertical",
                                initialValues: {
                                    section: (editingContext === null || editingContext === void 0 ? void 0 : editingContext.section) ?? 'today',
                                    completed: false
                                },
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                        name: "section",
                                        label: "分组",
                                        rules: [
                                            {
                                                required: true,
                                                message: '请选择分组'
                                            }
                                        ],
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                            options: [
                                                {
                                                    label: '今天',
                                                    value: 'today'
                                                },
                                                {
                                                    label: '本周',
                                                    value: 'thisWeek'
                                                },
                                                {
                                                    label: '未来',
                                                    value: 'future'
                                                }
                                            ]
                                        }, void 0, false, {
                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                            lineNumber: 1216,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 1215,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                        name: "task",
                                        label: "事项",
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入事项'
                                            }
                                        ],
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {
                                            placeholder: "例如：客户回访 - 阿里巴巴"
                                        }, void 0, false, {
                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                            lineNumber: 1225,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 1224,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                        name: "customer",
                                        label: "客户",
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入客户名称'
                                            }
                                        ],
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {
                                            placeholder: "例如：阿里巴巴集团"
                                        }, void 0, false, {
                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                            lineNumber: 1228,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 1227,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                        name: "time",
                                        label: "时间",
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入时间'
                                            }
                                        ],
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {
                                            placeholder: "例如：14:00 或 周三 15:00"
                                        }, void 0, false, {
                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                            lineNumber: 1231,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 1230,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                        name: "type",
                                        label: "类型",
                                        rules: [
                                            {
                                                required: true,
                                                message: '请选择类型'
                                            }
                                        ],
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                            options: [
                                                {
                                                    label: getTaskTypeText('business-review'),
                                                    value: 'business-review'
                                                },
                                                {
                                                    label: getTaskTypeText('renewal'),
                                                    value: 'renewal'
                                                },
                                                {
                                                    label: getTaskTypeText('training'),
                                                    value: 'training'
                                                },
                                                {
                                                    label: getTaskTypeText('report'),
                                                    value: 'report'
                                                },
                                                {
                                                    label: getTaskTypeText('survey'),
                                                    value: 'survey'
                                                },
                                                {
                                                    label: getTaskTypeText('demo'),
                                                    value: 'demo'
                                                },
                                                {
                                                    label: getTaskTypeText('meeting'),
                                                    value: 'meeting'
                                                },
                                                {
                                                    label: getTaskTypeText('contract'),
                                                    value: 'contract'
                                                }
                                            ]
                                        }, void 0, false, {
                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                            lineNumber: 1234,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 1233,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                        name: "completed",
                                        valuePropName: "checked",
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                            children: "标记为已完成"
                                        }, void 0, false, {
                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                            lineNumber: 1248,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 1247,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 1214,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                            lineNumber: 1205,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                    lineNumber: 873,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
            lineNumber: 618,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
        lineNumber: 617,
        columnNumber: 5
    }, this);
};
_s2(ActionSection, "N02Sg+cOMmk2DKhJhMPSbGeUpsc=", false, function() {
    return [
        _antd.Form.useForm
    ];
});
_c2 = ActionSection;
// 右侧洞察区组件
const InsightSection = ()=>{
    _s3();
    const [dataPeriod, setDataPeriod] = (0, _react.useState)('年度');
    // 行业分析数据
    const industryData = [
        {
            industry: '互联网科技',
            count: 38,
            percentage: 29.7
        },
        {
            industry: '金融服务',
            count: 25,
            percentage: 19.5
        },
        {
            industry: '制造业',
            count: 22,
            percentage: 17.2
        },
        {
            industry: '教育培训',
            count: 18,
            percentage: 14.1
        },
        {
            industry: '医疗健康',
            count: 15,
            percentage: 11.7
        }
    ];
    // 业务数据矩阵
    const businessMatrixData = [
        {
            type: '直营',
            total: 85,
            active: 72,
            inactive: 13,
            healthScore: 88.5
        },
        {
            type: '渠道',
            total: 43,
            active: 17,
            inactive: 26,
            healthScore: 65.2
        }
    ];
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
        span: 8,
        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
            gutter: [
                0,
                16
            ],
            children: [
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                    span: 24,
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                        style: cardStyle,
                        title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.BarChartOutlined, {
                                            style: {
                                                color: '#1890ff',
                                                marginRight: '8px'
                                            }
                                        }, void 0, false, {
                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                            lineNumber: 1287,
                                            columnNumber: 19
                                        }, void 0),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                            style: {
                                                fontSize: '16px',
                                                fontWeight: '600'
                                            },
                                            children: "我的业务数据"
                                        }, void 0, false, {
                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                            lineNumber: 1288,
                                            columnNumber: 19
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 1286,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    },
                                    children: [
                                        '年度',
                                        '季度',
                                        '月度'
                                    ].map((period)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                            type: dataPeriod === period ? 'primary' : 'text',
                                            size: "small",
                                            style: {
                                                padding: '4px 12px',
                                                height: '28px',
                                                borderRadius: '6px',
                                                fontSize: '12px'
                                            },
                                            onClick: ()=>setDataPeriod(period),
                                            children: period
                                        }, period, false, {
                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                            lineNumber: 1292,
                                            columnNumber: 21
                                        }, void 0))
                                }, void 0, false, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 1290,
                                    columnNumber: 17
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                            lineNumber: 1285,
                            columnNumber: 15
                        }, void 0),
                        bodyStyle: {
                            padding: '16px'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                                gutter: [
                                    16,
                                    16
                                ],
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                        span: 8,
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                textAlign: 'center',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        fontSize: '28px',
                                                        fontWeight: '700',
                                                        color: '#1890ff',
                                                        marginBottom: '4px'
                                                    },
                                                    children: "128"
                                                }, void 0, false, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 1315,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                    type: "secondary",
                                                    style: {
                                                        fontSize: '12px'
                                                    },
                                                    children: "我的总客户数"
                                                }, void 0, false, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 1318,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        marginTop: '4px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ArrowUpOutlined, {
                                                            style: {
                                                                color: '#52c41a',
                                                                fontSize: '10px',
                                                                marginRight: '2px'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                            lineNumber: 1320,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                            style: {
                                                                color: '#52c41a',
                                                                fontSize: '10px'
                                                            },
                                                            children: "+5"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                            lineNumber: 1321,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 1319,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                            lineNumber: 1314,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 1313,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                        span: 8,
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                textAlign: 'center',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        fontSize: '28px',
                                                        fontWeight: '700',
                                                        color: '#52c41a',
                                                        marginBottom: '4px'
                                                    },
                                                    children: "89"
                                                }, void 0, false, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 1328,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                    type: "secondary",
                                                    style: {
                                                        fontSize: '12px'
                                                    },
                                                    children: "活跃客户数"
                                                }, void 0, false, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 1331,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        marginTop: '4px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ArrowUpOutlined, {
                                                            style: {
                                                                color: '#52c41a',
                                                                fontSize: '10px',
                                                                marginRight: '2px'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                            lineNumber: 1333,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                            style: {
                                                                color: '#52c41a',
                                                                fontSize: '10px'
                                                            },
                                                            children: "+12"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                            lineNumber: 1334,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 1332,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                            lineNumber: 1327,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 1326,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                        span: 8,
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                textAlign: 'center',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        fontSize: '28px',
                                                        fontWeight: '700',
                                                        color: '#722ed1',
                                                        marginBottom: '4px'
                                                    },
                                                    children: "85.2"
                                                }, void 0, false, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 1341,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                    type: "secondary",
                                                    style: {
                                                        fontSize: '12px'
                                                    },
                                                    children: "客户健康分均值"
                                                }, void 0, false, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 1344,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        marginTop: '4px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ArrowUpOutlined, {
                                                            style: {
                                                                color: '#52c41a',
                                                                fontSize: '10px',
                                                                marginRight: '2px'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                            lineNumber: 1346,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                            style: {
                                                                color: '#52c41a',
                                                                fontSize: '10px'
                                                            },
                                                            children: "+2.3"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                            lineNumber: 1347,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 1345,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                            lineNumber: 1340,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 1339,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 1312,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    marginTop: '20px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                        style: {
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            color: '#262626',
                                            marginBottom: '12px',
                                            display: 'block'
                                        },
                                        children: "客户分布矩阵"
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 1355,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            border: '1px solid #f0f0f0',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            background: '#fff'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    display: 'grid',
                                                    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                                                    background: '#fafafa',
                                                    borderBottom: '1px solid #f0f0f0'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            padding: '12px 8px',
                                                            fontSize: '12px',
                                                            fontWeight: '600',
                                                            color: '#262626',
                                                            textAlign: 'center'
                                                        },
                                                        children: "类型"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 1371,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            padding: '12px 8px',
                                                            fontSize: '12px',
                                                            fontWeight: '600',
                                                            color: '#262626',
                                                            textAlign: 'center'
                                                        },
                                                        children: "总客户数"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 1374,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            padding: '12px 8px',
                                                            fontSize: '12px',
                                                            fontWeight: '600',
                                                            color: '#262626',
                                                            textAlign: 'center'
                                                        },
                                                        children: "活跃客户"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 1377,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            padding: '12px 8px',
                                                            fontSize: '12px',
                                                            fontWeight: '600',
                                                            color: '#262626',
                                                            textAlign: 'center'
                                                        },
                                                        children: "不活跃客户"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 1380,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            padding: '12px 8px',
                                                            fontSize: '12px',
                                                            fontWeight: '600',
                                                            color: '#262626',
                                                            textAlign: 'center'
                                                        },
                                                        children: "健康分"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 1383,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 1365,
                                                columnNumber: 17
                                            }, this),
                                            businessMatrixData.map((row, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        display: 'grid',
                                                        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                                                        borderBottom: index < businessMatrixData.length - 1 ? '1px solid #f0f0f0' : 'none'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                padding: '12px 8px',
                                                                fontSize: '12px',
                                                                color: '#262626',
                                                                textAlign: 'center',
                                                                fontWeight: '500'
                                                            },
                                                            children: row.type
                                                        }, void 0, false, {
                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                            lineNumber: 1395,
                                                            columnNumber: 15
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                padding: '12px 8px',
                                                                fontSize: '12px',
                                                                color: '#1890ff',
                                                                textAlign: 'center',
                                                                fontWeight: '600'
                                                            },
                                                            children: row.total
                                                        }, void 0, false, {
                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                            lineNumber: 1404,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                padding: '12px 8px',
                                                                fontSize: '12px',
                                                                color: '#52c41a',
                                                                textAlign: 'center',
                                                                fontWeight: '600'
                                                            },
                                                            children: row.active
                                                        }, void 0, false, {
                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                            lineNumber: 1413,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                padding: '12px 8px',
                                                                fontSize: '12px',
                                                                color: '#fa8c16',
                                                                textAlign: 'center',
                                                                fontWeight: '600'
                                                            },
                                                            children: row.inactive
                                                        }, void 0, false, {
                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                            lineNumber: 1422,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                padding: '12px 8px',
                                                                fontSize: '12px',
                                                                color: '#722ed1',
                                                                textAlign: 'center',
                                                                fontWeight: '600'
                                                            },
                                                            children: row.healthScore
                                                        }, void 0, false, {
                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                            lineNumber: 1431,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, index, true, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 1390,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 1358,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 1354,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                        lineNumber: 1282,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                    lineNumber: 1281,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                    span: 24,
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                        style: cardStyle,
                        title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center'
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PieChartOutlined, {
                                    style: {
                                        color: '#fa8c16',
                                        marginRight: '8px'
                                    }
                                }, void 0, false, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 1453,
                                    columnNumber: 17
                                }, void 0),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                    style: {
                                        fontSize: '16px',
                                        fontWeight: '600'
                                    },
                                    children: "我的客户行业分析"
                                }, void 0, false, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 1454,
                                    columnNumber: 17
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                            lineNumber: 1452,
                            columnNumber: 15
                        }, void 0),
                        bodyStyle: {
                            padding: '16px'
                        },
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                    type: "secondary",
                                    style: {
                                        fontSize: '12px',
                                        marginBottom: '16px',
                                        display: 'block'
                                    },
                                    children: "客户数量 TOP 5 行业分布"
                                }, void 0, false, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 1460,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '12px'
                                    },
                                    children: industryData.map((item, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        width: '60px',
                                                        fontSize: '12px',
                                                        color: '#666',
                                                        textAlign: 'right',
                                                        flexShrink: 0
                                                    },
                                                    children: item.industry
                                                }, void 0, false, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 1468,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        flex: 1,
                                                        height: '20px',
                                                        background: '#f5f5f5',
                                                        borderRadius: '4px',
                                                        position: 'relative',
                                                        overflow: 'hidden'
                                                    },
                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            height: '100%',
                                                            width: `${item.percentage * 3}%`,
                                                            background: `linear-gradient(90deg, ${[
                                                                '#1890ff',
                                                                '#52c41a',
                                                                '#722ed1',
                                                                '#fa8c16',
                                                                '#13c2c2'
                                                            ][index]}, ${[
                                                                '#40a9ff',
                                                                '#73d13d',
                                                                '#9254de',
                                                                '#ffc53d',
                                                                '#36cfc9'
                                                            ][index]})`,
                                                            borderRadius: '4px',
                                                            transition: 'width 0.3s ease'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 1486,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 1478,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        width: '40px',
                                                        fontSize: '12px',
                                                        color: '#262626',
                                                        fontWeight: '500',
                                                        textAlign: 'center',
                                                        flexShrink: 0
                                                    },
                                                    children: item.count
                                                }, void 0, false, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 1495,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                            lineNumber: 1467,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 1465,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        marginTop: '20px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                            style: {
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                color: '#262626',
                                                marginBottom: '12px',
                                                display: 'block'
                                            },
                                            children: "行业分布饼图"
                                        }, void 0, false, {
                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                            lineNumber: 1511,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: '120px',
                                                background: '#fafafa',
                                                borderRadius: '8px',
                                                border: '1px solid #f0f0f0'
                                            },
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    width: '80px',
                                                    height: '80px',
                                                    borderRadius: '50%',
                                                    background: `conic-gradient(
                      #1890ff 0deg ${industryData[0].percentage * 3.6}deg,
                      #52c41a ${industryData[0].percentage * 3.6}deg ${(industryData[0].percentage + industryData[1].percentage) * 3.6}deg,
                      #722ed1 ${(industryData[0].percentage + industryData[1].percentage) * 3.6}deg ${(industryData[0].percentage + industryData[1].percentage + industryData[2].percentage) * 3.6}deg,
                      #fa8c16 ${(industryData[0].percentage + industryData[1].percentage + industryData[2].percentage) * 3.6}deg ${(industryData[0].percentage + industryData[1].percentage + industryData[2].percentage + industryData[3].percentage) * 3.6}deg,
                      #13c2c2 ${(industryData[0].percentage + industryData[1].percentage + industryData[2].percentage + industryData[3].percentage) * 3.6}deg 360deg
                    )`,
                                                    position: 'relative'
                                                },
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        position: 'absolute',
                                                        top: '50%',
                                                        left: '50%',
                                                        transform: 'translate(-50%, -50%)',
                                                        width: '40px',
                                                        height: '40px',
                                                        borderRadius: '50%',
                                                        background: '#fff',
                                                        border: '2px solid #f0f0f0'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 1536,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 1523,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                            lineNumber: 1514,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                display: 'grid',
                                                gridTemplateColumns: '1fr 1fr',
                                                gap: '8px',
                                                marginTop: '12px'
                                            },
                                            children: industryData.map((item, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '6px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                width: '12px',
                                                                height: '12px',
                                                                borderRadius: '2px',
                                                                background: [
                                                                    '#1890ff',
                                                                    '#52c41a',
                                                                    '#722ed1',
                                                                    '#fa8c16',
                                                                    '#13c2c2'
                                                                ][index]
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                            lineNumber: 1559,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                            style: {
                                                                fontSize: '11px',
                                                                color: '#666'
                                                            },
                                                            children: [
                                                                item.industry,
                                                                " (",
                                                                item.count,
                                                                ")"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                            lineNumber: 1565,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, index, true, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 1558,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                            lineNumber: 1551,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 1510,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        marginTop: '12px',
                                        padding: '8px 0',
                                        borderTop: '1px solid #f0f0f0',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                            type: "secondary",
                                            style: {
                                                fontSize: '11px'
                                            },
                                            children: [
                                                "其他行业: ",
                                                128 - industryData.reduce((sum, item)=>sum + item.count, 0),
                                                " 家"
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                            lineNumber: 1581,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                            type: "secondary",
                                            style: {
                                                fontSize: '11px'
                                            },
                                            children: "总计: 128 家客户"
                                        }, void 0, false, {
                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                            lineNumber: 1584,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 1573,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                            lineNumber: 1459,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                        lineNumber: 1449,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                    lineNumber: 1448,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
            lineNumber: 1279,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
        lineNumber: 1278,
        columnNumber: 7
    }, this);
};
_s3(InsightSection, "qiFJl98uFxsEbo29EzNbYAu2aNg=");
_c3 = InsightSection;
const WorkbenchDashboard = ()=>{
    var _initialState_currentUser;
    _s4();
    const { initialState } = (0, _max.useModel)('@@initialState');
    const userName = (initialState === null || initialState === void 0 ? void 0 : (_initialState_currentUser = initialState.currentUser) === null || _initialState_currentUser === void 0 ? void 0 : _initialState_currentUser.name) || 'Serati Ma';
    const greeting = generateGreeting(userName);
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            padding: '32px 40px',
            background: '#f5f5f5',
            minHeight: 'calc(100vh - 64px)'
        },
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(HeaderSection, {
                userName: userName,
                greeting: greeting
            }, void 0, false, {
                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                lineNumber: 1609,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(CompanyKPIBanner, {}, void 0, false, {
                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                lineNumber: 1612,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                gutter: 24,
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(ActionSection, {}, void 0, false, {
                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                        lineNumber: 1617,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(InsightSection, {}, void 0, false, {
                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                        lineNumber: 1620,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                lineNumber: 1615,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
        lineNumber: 1603,
        columnNumber: 5
    }, this);
};
_s4(WorkbenchDashboard, "5mtXJ3qWOimX20WagWjCR+f3GVk=", false, function() {
    return [
        _max.useModel
    ];
});
_c4 = WorkbenchDashboard;
var _default = WorkbenchDashboard;
var _c;
var _c1;
var _c2;
var _c3;
var _c4;
$RefreshReg$(_c, "HeaderSection");
$RefreshReg$(_c1, "CompanyKPIBanner");
$RefreshReg$(_c2, "ActionSection");
$RefreshReg$(_c3, "InsightSection");
$RefreshReg$(_c4, "WorkbenchDashboard");
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
"src/pages/CustomerSuccess/index.tsx": function (module, exports, __mako_require__){
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
var _WorkbenchDashboard = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/pages/CustomerSuccess/WorkbenchDashboard.tsx"));
var _CustomerTieringCenter = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/CustomerSuccess/CustomerTieringCenter.tsx"));
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
    '/profiles/handover-implementation': '交接实施',
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
    // 如果是工作台页面，显示新的工作台界面
    if (location.pathname === '/dashboard/work') return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_WorkbenchDashboard.default, {}, void 0, false, {
        fileName: "src/pages/CustomerSuccess/index.tsx",
        lineNumber: 49,
        columnNumber: 12
    }, this);
    // 客户分层中心
    if (location.pathname === '/dashboard/layers') return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_CustomerTieringCenter.default, {}, void 0, false, {
        fileName: "src/pages/CustomerSuccess/index.tsx",
        lineNumber: 53,
        columnNumber: 12
    }, this);
    // 根据页面标题生成内容
    const content = (0, _tabContentGenerator.generateTabContent)(pageTitle);
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            padding: '24px',
            background: '#fafafa',
            minHeight: 'calc(100vh - 120px)',
            paddingBottom: '60px' // 为footer留出底部间距
        },
        children: content
    }, void 0, false, {
        fileName: "src/pages/CustomerSuccess/index.tsx",
        lineNumber: 60,
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
    ContinuousServiceContent: function() {
        return ContinuousServiceContent;
    },
    DashboardContent: function() {
        return DashboardContent;
    },
    DefaultContent: function() {
        return DefaultContent;
    },
    HandoverImplementationContent: function() {
        return HandoverImplementationContent;
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
var _handoverData = __mako_require__("src/mock/handoverData.ts");
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
                                    lineNumber: 47,
                                    columnNumber: 23
                                }, void 0),
                                valueStyle: {
                                    color: '#3f8600'
                                }
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 44,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 42,
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
                                    lineNumber: 57,
                                    columnNumber: 23
                                }, void 0),
                                valueStyle: {
                                    color: '#1890ff'
                                }
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 52,
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
                                    lineNumber: 67,
                                    columnNumber: 23
                                }, void 0),
                                valueStyle: {
                                    color: '#faad14'
                                }
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 64,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 62,
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
                                    lineNumber: 78,
                                    columnNumber: 23
                                }, void 0),
                                valueStyle: {
                                    color: '#52c41a'
                                }
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/utils/tabContentGenerator.tsx",
                lineNumber: 41,
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
                                lineNumber: 87,
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
                                    lineNumber: 89,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 86,
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
                                lineNumber: 99,
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
                                                lineNumber: 103,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    flex: 1
                                                },
                                                children: [
                                                    "11111111",
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        children: activity.customer
                                                    }, void 0, false, {
                                                        fileName: "src/utils/tabContentGenerator.tsx",
                                                        lineNumber: 107,
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
                                                        lineNumber: 108,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/utils/tabContentGenerator.tsx",
                                                lineNumber: 106,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                color: activity.status === 'success' ? 'green' : activity.status === 'warning' ? 'orange' : 'blue',
                                                children: activity.time
                                            }, void 0, false, {
                                                fileName: "src/utils/tabContentGenerator.tsx",
                                                lineNumber: 110,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, activity.id, true, {
                                        fileName: "src/utils/tabContentGenerator.tsx",
                                        lineNumber: 102,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 99,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/utils/tabContentGenerator.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/utils/tabContentGenerator.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
};
_c = DashboardContent;
const HandoverImplementationContent = ()=>{
    // 使用mockCustomerHandovers数据，转换为表格所需格式
    const handoverData = _handoverData.mockCustomerHandovers.slice(0, 3).map((item, index)=>{
        // 将状态映射到表格需要的状态
        let status = 'pending';
        if (item.handoverStatus === 'normal') status = 'in_progress';
        else if (item.expectationAlignment === 'aligned') status = 'completed';
        // 将风险等级映射到优先级
        let priority = 'medium';
        if (item.riskLevel === 'high') priority = 'high';
        else if (item.riskLevel === 'low') priority = 'low';
        return {
            key: item.id,
            customer: item.customerName,
            contact: item.stakeholders && item.stakeholders.length > 0 ? item.stakeholders[0].name : '-',
            phone: item.stakeholders && item.stakeholders.length > 0 ? item.stakeholders[0].contact : '-',
            status,
            priority,
            createTime: new Date(item.createdAt).toLocaleDateString()
        };
    });
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
                    lineNumber: 182,
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
                    lineNumber: 196,
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
                            lineNumber: 209,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                            type: "link",
                            size: "small",
                            children: "开始交接"
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 210,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/utils/tabContentGenerator.tsx",
                    lineNumber: 208,
                    columnNumber: 9
                }, this)
        }
    ];
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
            title: "交接实施管理",
            extra: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                        type: "primary",
                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PlusOutlined, {}, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 222,
                            columnNumber: 42
                        }, void 0),
                        children: "新建交接"
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 222,
                        columnNumber: 13
                    }, void 0),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DownloadOutlined, {}, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 225,
                            columnNumber: 27
                        }, void 0),
                        children: "导出数据"
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 225,
                        columnNumber: 13
                    }, void 0)
                ]
            }, void 0, true, {
                fileName: "src/utils/tabContentGenerator.tsx",
                lineNumber: 221,
                columnNumber: 11
            }, void 0),
            children: [
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                    gutter: [
                        16,
                        16
                    ],
                    style: {
                        marginBottom: 16
                    },
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            span: 6,
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                size: "small",
                                title: "待交接客户",
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                    title: "客户数量",
                                    value: _handoverData.mockCustomerHandovers.length,
                                    prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {}, void 0, false, {
                                        fileName: "src/utils/tabContentGenerator.tsx",
                                        lineNumber: 235,
                                        columnNumber: 84
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "src/utils/tabContentGenerator.tsx",
                                    lineNumber: 235,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 234,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 233,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            span: 6,
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                size: "small",
                                title: "进行中交接",
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                    title: "客户数量",
                                    value: _handoverData.mockCustomerHandovers.filter((item)=>item.handoverStatus === 'normal').length,
                                    prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.SyncOutlined, {
                                        spin: true
                                    }, void 0, false, {
                                        fileName: "src/utils/tabContentGenerator.tsx",
                                        lineNumber: 240,
                                        columnNumber: 133
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "src/utils/tabContentGenerator.tsx",
                                    lineNumber: 240,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 239,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 238,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            span: 6,
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                size: "small",
                                title: "已完成交接",
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                    title: "客户数量",
                                    value: _handoverData.mockCustomerHandovers.filter((item)=>item.expectationAlignment === 'aligned').length,
                                    prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.CheckCircleOutlined, {}, void 0, false, {
                                        fileName: "src/utils/tabContentGenerator.tsx",
                                        lineNumber: 245,
                                        columnNumber: 140
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "src/utils/tabContentGenerator.tsx",
                                    lineNumber: 245,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 244,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 243,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            span: 6,
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                size: "small",
                                title: "实施项目",
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                    title: "项目数量",
                                    value: _handoverData.mockCustomerHandovers.filter((item)=>item.hasHandoverDocument).length,
                                    prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.TrophyOutlined, {}, void 0, false, {
                                        fileName: "src/utils/tabContentGenerator.tsx",
                                        lineNumber: 250,
                                        columnNumber: 125
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "src/utils/tabContentGenerator.tsx",
                                    lineNumber: 250,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 249,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 248,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/utils/tabContentGenerator.tsx",
                    lineNumber: 232,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Table, {
                    columns: columns,
                    dataSource: handoverData,
                    pagination: false,
                    size: "small"
                }, void 0, false, {
                    fileName: "src/utils/tabContentGenerator.tsx",
                    lineNumber: 256,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/utils/tabContentGenerator.tsx",
            lineNumber: 218,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/utils/tabContentGenerator.tsx",
        lineNumber: 217,
        columnNumber: 5
    }, this);
};
_c1 = HandoverImplementationContent;
const ContinuousServiceContent = ()=>{
    // 健康度分布数据
    const healthDistribution = [
        {
            level: '健康',
            count: 85,
            color: '#52c41a',
            percentage: 68
        },
        {
            level: '一般',
            count: 25,
            color: '#faad14',
            percentage: 20
        },
        {
            level: '风险',
            count: 15,
            color: '#ff4d4f',
            percentage: 12
        }
    ];
    // 异动情况数据
    const changeData = [
        {
            id: 1,
            company: '北京科技有限公司',
            type: '健康',
            change: '85',
            time: '2025-01-05'
        },
        {
            id: 2,
            company: '上海智能科技有限公司',
            type: '一般',
            change: '65',
            time: '2025-01-08'
        },
        {
            id: 3,
            company: '深圳创新科技',
            type: '风险',
            change: '35',
            time: '2025-01-12'
        }
    ];
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
            gutter: [
                16,
                16
            ],
            children: [
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                    span: 12,
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                        title: "健康度分布",
                        style: {
                            height: '200px',
                            minHeight: '200px',
                            maxHeight: '200px',
                            overflow: 'hidden'
                        },
                        bodyStyle: {
                            padding: '16px',
                            height: '144px',
                            minHeight: '144px',
                            maxHeight: '144px',
                            overflow: 'hidden'
                        },
                        size: "small",
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                                height: '100%'
                            },
                            children: healthDistribution.map((item, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                                            size: 14,
                                            style: {
                                                backgroundColor: item.color,
                                                minWidth: '14px'
                                            }
                                        }, void 0, false, {
                                            fileName: "src/utils/tabContentGenerator.tsx",
                                            lineNumber: 308,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                            style: {
                                                fontSize: '12px',
                                                minWidth: '30px'
                                            },
                                            children: item.level
                                        }, void 0, false, {
                                            fileName: "src/utils/tabContentGenerator.tsx",
                                            lineNumber: 312,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                flex: 1,
                                                height: '12px',
                                                backgroundColor: '#f0f0f0',
                                                borderRadius: '6px',
                                                overflow: 'hidden'
                                            },
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    height: '100%',
                                                    backgroundColor: item.color,
                                                    width: `${item.percentage}%`,
                                                    borderRadius: '6px'
                                                }
                                            }, void 0, false, {
                                                fileName: "src/utils/tabContentGenerator.tsx",
                                                lineNumber: 314,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/utils/tabContentGenerator.tsx",
                                            lineNumber: 313,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                            style: {
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                minWidth: '20px'
                                            },
                                            children: item.count
                                        }, void 0, false, {
                                            fileName: "src/utils/tabContentGenerator.tsx",
                                            lineNumber: 323,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "src/utils/tabContentGenerator.tsx",
                                    lineNumber: 307,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 305,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 288,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/utils/tabContentGenerator.tsx",
                    lineNumber: 287,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                    span: 12,
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                        title: "异动情况",
                        style: {
                            height: '200px',
                            minHeight: '200px',
                            maxHeight: '200px',
                            overflow: 'hidden'
                        },
                        bodyStyle: {
                            padding: '16px',
                            height: '144px',
                            minHeight: '144px',
                            maxHeight: '144px',
                            overflow: 'hidden'
                        },
                        size: "small",
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                height: '100%',
                                overflowY: 'auto'
                            },
                            children: changeData.map((item)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        marginBottom: '8px',
                                        padding: '4px 0'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                                            size: 14,
                                            style: {
                                                backgroundColor: '#1890ff',
                                                minWidth: '14px'
                                            },
                                            children: item.company.charAt(0)
                                        }, void 0, false, {
                                            fileName: "src/utils/tabContentGenerator.tsx",
                                            lineNumber: 352,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                flex: 1,
                                                overflow: 'hidden'
                                            },
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    fontSize: '11px',
                                                    fontWeight: '500',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                },
                                                children: item.company
                                            }, void 0, false, {
                                                fileName: "src/utils/tabContentGenerator.tsx",
                                                lineNumber: 356,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/utils/tabContentGenerator.tsx",
                                            lineNumber: 355,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                            color: item.type === '健康' ? 'green' : item.type === '一般' ? 'orange' : 'red',
                                            style: {
                                                borderRadius: 2,
                                                fontSize: '10px',
                                                padding: '0 3px',
                                                lineHeight: '16px',
                                                height: '16px',
                                                margin: 0
                                            },
                                            children: item.type
                                        }, void 0, false, {
                                            fileName: "src/utils/tabContentGenerator.tsx",
                                            lineNumber: 360,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, item.id, true, {
                                    fileName: "src/utils/tabContentGenerator.tsx",
                                    lineNumber: 351,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 349,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 332,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/utils/tabContentGenerator.tsx",
                    lineNumber: 331,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/utils/tabContentGenerator.tsx",
            lineNumber: 285,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/utils/tabContentGenerator.tsx",
        lineNumber: 284,
        columnNumber: 5
    }, this);
};
_c2 = ContinuousServiceContent;
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
                    lineNumber: 388,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("p", {
                    children: "此功能正在开发中，敬请期待..."
                }, void 0, false, {
                    fileName: "src/utils/tabContentGenerator.tsx",
                    lineNumber: 389,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                    type: "primary",
                    icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ReloadOutlined, {}, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 390,
                        columnNumber: 38
                    }, void 0),
                    children: "刷新页面"
                }, void 0, false, {
                    fileName: "src/utils/tabContentGenerator.tsx",
                    lineNumber: 390,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/utils/tabContentGenerator.tsx",
            lineNumber: 387,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/utils/tabContentGenerator.tsx",
        lineNumber: 386,
        columnNumber: 5
    }, this);
};
_c3 = DefaultContent;
// 路径到内容标题的映射
const pathToTitleMap = {
    '/dashboard/work': '我的工作看板',
    '/dashboard/layers': '客户分层盘点',
    '/dashboard/focus': '近期客户关注重点',
    '/dashboard/competition': '客成部门大比武',
    '/dashboard/coordination': '大服务体系内协同',
    '/profiles/handover-implementation': '交接实施',
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
const generateTabContent = (tabName)=>{
    // 创建中文label到英文key的映射表
    const labelToKeyMap = {
        '我的工作看板': 'work-dashboard',
        '交接实施': 'handover-implementation',
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
                lineNumber: 467,
                columnNumber: 14
            }, this);
        case 'handover-implementation':
            return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(HandoverImplementationContent, {}, void 0, false, {
                fileName: "src/utils/tabContentGenerator.tsx",
                lineNumber: 469,
                columnNumber: 14
            }, this);
        case 'continuous-service':
            return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(ContinuousServiceContent, {}, void 0, false, {
                fileName: "src/utils/tabContentGenerator.tsx",
                lineNumber: 471,
                columnNumber: 14
            }, this);
        default:
            return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(DefaultContent, {
                tabName: tabName
            }, void 0, false, {
                fileName: "src/utils/tabContentGenerator.tsx",
                lineNumber: 473,
                columnNumber: 14
            }, this);
    }
};
var _c;
var _c1;
var _c2;
var _c3;
$RefreshReg$(_c, "DashboardContent");
$RefreshReg$(_c1, "HandoverImplementationContent");
$RefreshReg$(_c2, "ContinuousServiceContent");
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