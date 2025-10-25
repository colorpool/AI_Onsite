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
            title: '客户成功',
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
            padding: '0 24px',
            marginTop: 16
        },
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        textAlign: 'left'
                    },
                    children: "渠道客户风险矩阵"
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                    lineNumber: 277,
                    columnNumber: 16
                }, void 0),
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
                                                background: '#fafafa',
                                                textAlign: 'center'
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
                                                background: '#fafafa',
                                                textAlign: 'center'
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
                                                background: '#fafafa',
                                                textAlign: 'center'
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
                                                background: '#fafafa',
                                                textAlign: 'center'
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
                                                background: '#fafafa',
                                                textAlign: 'center'
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
                                                    fontWeight: 500,
                                                    textAlign: 'center'
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
                title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        textAlign: 'left'
                    },
                    children: "客户生态标签"
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                    lineNumber: 362,
                    columnNumber: 20
                }, void 0),
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            marginBottom: 24
                        },
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
                                            lineNumber: 366,
                                            columnNumber: 15
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
                                                    lineNumber: 368,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Radio.Button, {
                                                    value: "OR",
                                                    children: "OR"
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                    lineNumber: 369,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                            lineNumber: 367,
                                            columnNumber: 15
                                        }, this),
                                        selectedTags.length > 0 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                            size: "small",
                                            onClick: ()=>setSelectedTags([]),
                                            children: "清空选择"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                            lineNumber: 372,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                    lineNumber: 365,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                lineNumber: 364,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    minHeight: 200,
                                    maxHeight: 300,
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
                                                            lineNumber: 396,
                                                            columnNumber: 25
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            children: [
                                                                "ARR: ¥",
                                                                (tag.arr / 10000).toFixed(1),
                                                                "万"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                            lineNumber: 397,
                                                            columnNumber: 25
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            children: [
                                                                "近90天事件数: ",
                                                                tag.events
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                            lineNumber: 398,
                                                            columnNumber: 25
                                                        }, void 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                    lineNumber: 395,
                                                    columnNumber: 23
                                                }, void 0),
                                                children: [
                                                    tag.name,
                                                    " (",
                                                    tag.count,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                lineNumber: 393,
                                                columnNumber: 19
                                            }, this)
                                        }, tag.name, false, {
                                            fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                            lineNumber: 382,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                    lineNumber: 380,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                lineNumber: 379,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                        lineNumber: 363,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            marginTop: 8
                        },
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
                                            lineNumber: 413,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                            icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ExportOutlined, {}, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                                lineNumber: 415,
                                                columnNumber: 23
                                            }, void 0),
                                            size: "small",
                                            onClick: ()=>onExport === null || onExport === void 0 ? void 0 : onExport(filteredCustomers),
                                            children: "导出"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                            lineNumber: 414,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                    lineNumber: 412,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                lineNumber: 411,
                                columnNumber: 11
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
                                    showTotal: (total, range)=>`共 ${total} 条记录，当前显示 ${range[0]}-${range[1]} 条`,
                                    pageSizeOptions: [
                                        '10',
                                        '20',
                                        '50',
                                        '100'
                                    ],
                                    showLessItems: true
                                }
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                                lineNumber: 424,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/CustomerSuccess/ChannelEcosystemTab.tsx",
                        lineNumber: 410,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
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
                                label: "客户成功",
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
                        children: customer.tags.map((tag)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                color: "processing",
                                children: tag
                            }, tag, false, {
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
var _reactrefresh = /*#__PURE__*/ _interop_require_wildcard._(__mako_require__("node_modules/react-refresh/runtime.js"));
var _jsxdevruntime = __mako_require__("node_modules/react/jsx-dev-runtime.js");
var _react = /*#__PURE__*/ _interop_require_wildcard._(__mako_require__("node_modules/react/index.js"));
var _antd = __mako_require__("node_modules/antd/es/index.js");
var _customerData = __mako_require__("src/mock/customerData.ts");
var _GlobalFilters = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/CustomerSuccess/GlobalFilters.tsx"));
var _KPISummary = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/CustomerSuccess/KPISummary.tsx"));
var _ValueLifecycleTab = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/CustomerSuccess/ValueLifecycleTab.tsx"));
var _NewCustomerTieringTab = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/CustomerSuccess/NewCustomerTieringTab.tsx"));
var _HighValueCustomerTab = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/CustomerSuccess/HighValueCustomerTab.tsx"));
var _ChannelEcosystemTab = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/CustomerSuccess/ChannelEcosystemTab.tsx"));
var _CustomerDetailModal = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/CustomerSuccess/CustomerDetailModal.tsx"));
var _CustomerTieringCentermodulecssasmodule = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/CustomerSuccess/CustomerTieringCenter.module.css?asmodule"));
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
    const [selectedMatrix, setSelectedMatrix] = (0, _react.useState)(null);
    // 转换统一客户数据为BaseCustomer格式
    const convertUnifiedToBaseCustomer = (unifiedCustomers)=>{
        return unifiedCustomers.map((customer)=>({
                id: customer.id,
                name: customer.name,
                industry: customer.industry,
                size: customer.size,
                csm: customer.csm,
                region: customer.region,
                isChannelCustomer: customer.isChannelCustomer,
                arr: customer.arr,
                valueScore: customer.valueScore,
                lifecycle: customer.lifecycle,
                healthScore: customer.healthScore,
                rScore: customer.rScore,
                fScore: customer.fScore,
                mScore: customer.mScore,
                riskLevel: customer.riskLevel,
                signDate: customer.signDate,
                tags: customer.tags,
                collaborationEvents: customer.collaborationEvents,
                channelType: customer.channelType,
                isKeyAccount: customer.isKeyAccount,
                isInRenewalWindow: customer.isInRenewalWindow,
                visits90Days: customer.visits90Days,
                revenue90Days: customer.revenue90Days,
                insights: customer.insights,
                nextAction: customer.nextAction
            }));
    };
    // 根据全局筛选条件过滤客户数据
    const filteredCustomers = (0, _react.useMemo)(()=>{
        let filtered = customers;
        // 行业筛选
        if (globalFilters.industries.length > 0) filtered = filtered.filter((customer)=>globalFilters.industries.includes(customer.industry));
        // 客户规模筛选
        if (globalFilters.customerSizes.length > 0) filtered = filtered.filter((customer)=>globalFilters.customerSizes.includes(customer.size));
        // CSM筛选
        if (globalFilters.csmOwners.length > 0) filtered = filtered.filter((customer)=>globalFilters.csmOwners.includes(customer.csm));
        // 地区筛选
        if (globalFilters.regions.length > 0) filtered = filtered.filter((customer)=>globalFilters.regions.includes(customer.region));
        // 渠道客户筛选
        if (globalFilters.isChannelCustomer !== undefined) filtered = filtered.filter((customer)=>customer.isChannelCustomer === globalFilters.isChannelCustomer);
        // 搜索筛选
        if (globalFilters.searchText) {
            const searchLower = globalFilters.searchText.toLowerCase();
            filtered = filtered.filter((customer)=>customer.name.toLowerCase().includes(searchLower) || customer.id.toLowerCase().includes(searchLower));
        }
        return filtered;
    }, [
        customers,
        globalFilters
    ]);
    // 计算KPI数据
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
        // 基于数据特征计算固定的环比变化
        const getChangeType = (change)=>{
            if (change > 2) return 'increase';
            if (change < -2) return 'decrease';
            return 'stable';
        };
        // 基于客户数据计算固定的变化值
        const totalChange = Math.floor(filteredCustomers.length % 20 - 10); // -10 到 +9
        const highValueChange = Math.floor(highValueCustomers % 15 - 7); // -7 到 +7
        const newSignupsChange = Math.floor(newCustomers % 12 - 6); // -6 到 +5
        const riskChange = Math.floor(riskCustomers % 8 - 4); // -4 到 +3
        const arrChange = (currentARR % 100 - 50) / 10; // -5% 到 +4.9%
        const grrChange = (totalCustomers % 20 - 10) / 10; // -1% 到 +0.9%
        const nrrChange = (highValueCustomers % 30 - 15) / 10; // -1.5% 到 +1.4%
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
    // 初始化数据
    (0, _react.useEffect)(()=>{
        setLoading(true);
        // 模拟异步加载
        setTimeout(()=>{
            setCustomers(convertUnifiedToBaseCustomer(_customerData.unifiedCustomerData));
            setLoading(false);
        }, 1000);
    }, []);
    // 处理全局筛选变化
    const handleFiltersChange = (filters)=>{
        setGlobalFilters((prev)=>({
                ...prev,
                ...filters
            }));
    };
    // 处理保存视图
    const handleSaveView = ()=>{
        // 这里可以实现保存视图的逻辑
        _antd.message.success('视图保存成功');
    };
    // 处理导出
    const handleExport = (data)=>{
        // 这里可以实现导出逻辑
        _antd.message.success(`导出 ${data.length} 条数据`);
    };
    // 客户详情弹窗状态
    const [customerDetailVisible, setCustomerDetailVisible] = (0, _react.useState)(false);
    const [selectedCustomer, setSelectedCustomer] = (0, _react.useState)(null);
    // 处理客户点击
    const handleCustomerClick = (customer)=>{
        setSelectedCustomer(customer);
        setCustomerDetailVisible(true);
    };
    const tabItems = [
        {
            key: 'value-lifecycle',
            label: '价值 × 生命周期',
            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_ValueLifecycleTab.default, {
                customers: filteredCustomers.map((c)=>{
                    // 从统一数据源获取对应的完整客户数据
                    const unifiedCustomer = _customerData.unifiedCustomerData.find((uc)=>uc.id === c.id);
                    return {
                        ...c,
                        logoColor: '#1890ff',
                        trend: (unifiedCustomer === null || unifiedCustomer === void 0 ? void 0 : unifiedCustomer.trend) || (c.valueScore > 75 ? 'up' : c.valueScore < 40 ? 'down' : 'flat'),
                        valueTier: c.valueScore >= 80 ? '高价值' : c.valueScore >= 50 ? '中价值' : '低价值',
                        rAndM: c.rScore + c.mScore,
                        f: c.fScore,
                        serviceScore: (unifiedCustomer === null || unifiedCustomer === void 0 ? void 0 : unifiedCustomer.serviceScore) || Math.round(c.collaborationEvents / 30 * 100),
                        riskEvents: (unifiedCustomer === null || unifiedCustomer === void 0 ? void 0 : unifiedCustomer.riskEvents) || (c.riskLevel === 'risk' ? 3 : c.riskLevel === 'attention' ? 1 : 0),
                        upsellAmount: (unifiedCustomer === null || unifiedCustomer === void 0 ? void 0 : unifiedCustomer.upsellAmount) || c.revenue90Days,
                        lifecycle: c.lifecycle === 'import' ? '导入期' : c.lifecycle === 'growth' ? '成长期' : c.lifecycle === 'mature' ? '成熟期' : '衰退期'
                    };
                }),
                onCustomerSelect: handleCustomerClick,
                selectedMatrix: selectedMatrix,
                onMatrixSelect: setSelectedMatrix
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                lineNumber: 311,
                columnNumber: 9
            }, this)
        },
        {
            key: 'new-customer-tiering',
            label: '新签客户分层',
            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_NewCustomerTieringTab.default, {
                customers: filteredCustomers.filter((c)=>c.signDate).map((c)=>{
                    var _c_id;
                    return {
                        id: c.id || `customer-${((_c_id = c.id) === null || _c_id === void 0 ? void 0 : _c_id.slice(-4)) || '0000'}`,
                        name: c.name || '未知客户',
                        logoColor: '#52c41a',
                        csm: c.csm || '未分配',
                        industry: c.industry || '其他',
                        customerScale: Math.floor(c.valueScore * 10 + 50),
                        unitPrice: Math.floor((c.arr || 0) / 12),
                        signDate: c.signDate,
                        activationRate: Math.min(95, Math.max(20, c.healthScore + c.valueScore % 30)),
                        quadrant: '领先者',
                        arr: c.arr || 0,
                        tags: c.tags || [],
                        healthScore: c.healthScore || 0,
                        riskLevel: c.riskLevel || 'safe',
                        lifecycle: c.lifecycle === 'import' ? '导入期' : c.lifecycle === 'growth' ? '成长期' : c.lifecycle === 'mature' ? '成熟期' : '衰退期',
                        valueScore: c.valueScore || 0
                    };
                }),
                onCustomerSelect: handleCustomerClick
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                lineNumber: 340,
                columnNumber: 9
            }, this)
        },
        {
            key: 'high-value-customer',
            label: '高价值客户洞察',
            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_HighValueCustomerTab.default, {
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
                        lastVisitDate: new Date(Date.now() - c.visits90Days % 30 * 86400000).toISOString().split('T')[0],
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
                        }, (_, i)=>Math.floor((c.healthScore + c.valueScore % 50 + i * 5) % 100)),
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
                lineNumber: 369,
                columnNumber: 9
            }, this)
        },
        {
            key: 'channel-ecosystem',
            label: '渠道与生态分析',
            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_ChannelEcosystemTab.default, {
                customers: filteredCustomers,
                onCustomerClick: handleCustomerClick,
                onExport: handleExport
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                lineNumber: 413,
                columnNumber: 9
            }, this)
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
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                            level: 2,
                            style: {
                                margin: 0,
                                color: '#262626'
                            },
                            children: "客户分层盘点"
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                            lineNumber: 436,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                            type: "secondary",
                            children: "基于价值与生命周期的客户精细化分层管理"
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                            lineNumber: 437,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                    lineNumber: 435,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                lineNumber: 429,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    borderRadius: '14px',
                    marginBottom: '16px'
                },
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_GlobalFilters.default, {
                    filters: globalFilters,
                    onFiltersChange: handleFiltersChange,
                    onSaveView: handleSaveView,
                    onExport: ()=>handleExport(filteredCustomers)
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                    lineNumber: 446,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                lineNumber: 442,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    marginBottom: '16px'
                },
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_KPISummary.default, {
                    data: kpiData,
                    loading: loading
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                    lineNumber: 458,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                lineNumber: 455,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                    border: '1px solid #f0f0f0',
                    background: '#ffffff',
                    overflow: 'hidden'
                },
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tabs, {
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
                    lineNumber: 469,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                lineNumber: 462,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_CustomerDetailModal.default, {
                visible: customerDetailVisible,
                customer: selectedCustomer,
                onClose: ()=>{
                    setCustomerDetailVisible(false);
                    setSelectedCustomer(null);
                }
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
                lineNumber: 483,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/components/CustomerSuccess/CustomerTieringCenter.tsx",
        lineNumber: 423,
        columnNumber: 5
    }, this);
};
_s(CustomerTieringCenter, "hB2GEf2k44o9ufpNxqw1KBeCS90=");
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
const { RangePicker } = _antd.DatePicker;
const { Option } = _antd.Select;
const GlobalFilters = ({ filters, onFiltersChange, // onSaveView, // 暂时未使用
onExport })=>{
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
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e8e8e8',
            marginBottom: '16px',
            overflow: 'hidden'
        },
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
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
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.FilterOutlined, {
                                style: {
                                    color: '#1890ff',
                                    fontSize: '14px'
                                }
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
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
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                        type: "text",
                        size: "small",
                        icon: isExpanded ? /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UpOutlined, {}, void 0, false, {
                            fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                            lineNumber: 90,
                            columnNumber: 30
                        }, void 0) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DownOutlined, {}, void 0, false, {
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
            isExpanded && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    padding: '16px'
                },
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                    gutter: [
                        12,
                        12
                    ],
                    align: "middle",
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                direction: "vertical",
                                size: 4,
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
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
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                        value: filters.timeRange,
                                        onChange: (value)=>handleFilterChange('timeRange', value),
                                        style: {
                                            width: 120
                                        },
                                        size: "small",
                                        children: timeRangeOptions.map((option)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
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
                        filters.timeRange === 'custom' && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                direction: "vertical",
                                size: 4,
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
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
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(RangePicker, {
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
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                direction: "vertical",
                                size: 4,
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
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
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                        mode: "multiple",
                                        value: filters.industries,
                                        onChange: (value)=>handleFilterChange('industries', value),
                                        placeholder: "选择行业",
                                        style: {
                                            width: 160
                                        },
                                        size: "small",
                                        maxTagCount: 1,
                                        children: industries.map((industry)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
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
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                direction: "vertical",
                                size: 4,
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
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
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                        mode: "multiple",
                                        value: filters.customerSizes,
                                        onChange: (value)=>handleFilterChange('customerSizes', value),
                                        placeholder: "选择规模",
                                        style: {
                                            width: 160
                                        },
                                        size: "small",
                                        maxTagCount: 1,
                                        children: customerSizes.map((size)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
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
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                direction: "vertical",
                                size: 4,
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                        style: {
                                            fontSize: '12px',
                                            color: '#8c8c8c'
                                        },
                                        children: "客户成功"
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                        lineNumber: 181,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                        mode: "multiple",
                                        value: filters.csmOwners,
                                        onChange: (value)=>handleFilterChange('csmOwners', value),
                                        placeholder: "选择CSM",
                                        style: {
                                            width: 140
                                        },
                                        size: "small",
                                        maxTagCount: 1,
                                        children: csmOwners.map((csm)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
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
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                direction: "vertical",
                                size: 4,
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
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
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                        mode: "multiple",
                                        value: filters.regions,
                                        onChange: (value)=>handleFilterChange('regions', value),
                                        placeholder: "选择地区",
                                        style: {
                                            width: 120
                                        },
                                        size: "small",
                                        maxTagCount: 1,
                                        children: regions.map((region)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
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
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                direction: "vertical",
                                size: 4,
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
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
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                        value: filters.isChannelCustomer,
                                        onChange: (value)=>handleFilterChange('isChannelCustomer', value),
                                        placeholder: "全部",
                                        style: {
                                            width: 100
                                        },
                                        size: "small",
                                        allowClear: true,
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                value: true,
                                                children: "是"
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                                lineNumber: 234,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
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
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            flex: "auto",
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                direction: "vertical",
                                size: 4,
                                style: {
                                    width: '100%'
                                },
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
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
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {
                                        value: filters.searchText,
                                        onChange: (e)=>handleFilterChange('searchText', e.target.value),
                                        placeholder: "客户名称/ID",
                                        prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.SearchOutlined, {}, void 0, false, {
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
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                    title: "导出当前筛选结果",
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        type: "text",
                                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ExportOutlined, {}, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                            lineNumber: 261,
                                            columnNumber: 27
                                        }, void 0),
                                        onClick: onExport,
                                        size: "small",
                                        children: "导出"
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                        lineNumber: 259,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/GlobalFilters.tsx",
                                    lineNumber: 258,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
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
                                                lineNumber: 174,
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
                                                        lineNumber: 179,
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
                                                        lineNumber: 180,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                lineNumber: 178,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, idx, true, {
                                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                        lineNumber: 173,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                lineNumber: 171,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                            lineNumber: 170,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 169,
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
                                                lineNumber: 192,
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
                                                lineNumber: 201,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, idx, true, {
                                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                        lineNumber: 191,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                lineNumber: 189,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                            lineNumber: 188,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 187,
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
                                                        lineNumber: 213,
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
                                                        lineNumber: 214,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                lineNumber: 212,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                color: stakeholder.influence === 'high' ? 'red' : stakeholder.influence === 'medium' ? 'orange' : 'default',
                                                children: stakeholder.influence === 'high' ? '高影响' : stakeholder.influence === 'medium' ? '中影响' : '低影响'
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                lineNumber: 216,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, idx, true, {
                                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                        lineNumber: 211,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                lineNumber: 209,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                            lineNumber: 208,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 207,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 168,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
            lineNumber: 167,
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
            render: (_, record)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            children: record.name
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                            lineNumber: 241,
                            columnNumber: 11
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
                                    lineNumber: 243,
                                    columnNumber: 37
                                }, this),
                                record.isChannelCustomer && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                    color: "blue",
                                    children: "渠道"
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                    lineNumber: 244,
                                    columnNumber: 42
                                }, this),
                                record.isInRenewalWindow && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                    color: "orange",
                                    children: "续约期"
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                    lineNumber: 245,
                                    columnNumber: 42
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                            lineNumber: 242,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                    lineNumber: 240,
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
                        lineNumber: 257,
                        columnNumber: 20
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 257,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
            lineNumber: 256,
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
                        lineNumber: 266,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Progress, {
                        percent: score,
                        size: "small",
                        showInfo: false,
                        strokeColor: score >= 80 ? '#52c41a' : score >= 60 ? '#fa8c16' : '#ff4d4f'
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 269,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 265,
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
                        lineNumber: 284,
                        columnNumber: 20
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 284,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
            lineNumber: 283,
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
                        lineNumber: 293,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Progress, {
                        percent: score,
                        size: "small",
                        showInfo: false,
                        strokeColor: score >= 80 ? '#52c41a' : score >= 60 ? '#fa8c16' : '#ff4d4f'
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 296,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 292,
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
                        lineNumber: 311,
                        columnNumber: 20
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 311,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
            lineNumber: 310,
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
                        lineNumber: 320,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Progress, {
                        percent: score,
                        size: "small",
                        showInfo: false,
                        strokeColor: score >= 80 ? '#52c41a' : score >= 60 ? '#fa8c16' : '#ff4d4f'
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 323,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 319,
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
                            lineNumber: 355,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                            children: record.visits90Days
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                            lineNumber: 356,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                    lineNumber: 354,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 353,
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
                lineNumber: 371,
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
                        lineNumber: 387,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                        style: {
                            cursor: 'pointer',
                            color: '#1890ff'
                        },
                        onClick: (e)=>{
                            e.stopPropagation();
                        },
                        children: record.insights90Days
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 388,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 386,
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
                            lineNumber: 410,
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
                        lineNumber: 418,
                        columnNumber: 31
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 408,
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
                lineNumber: 433,
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
                        lineNumber: 448,
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
                        lineNumber: 449,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 447,
                columnNumber: 11
            }, this);
        }
    });
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                style: {
                    ...cardStyle,
                    marginTop: 16,
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
                                                        lineNumber: 472,
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
                                                        lineNumber: 473,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                lineNumber: 471,
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
                                                lineNumber: 475,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                        lineNumber: 470,
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
                                                        lineNumber: 486,
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
                                                        lineNumber: 487,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                lineNumber: 485,
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
                                                lineNumber: 489,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                        lineNumber: 484,
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
                                                        lineNumber: 500,
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
                                                        lineNumber: 501,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                                lineNumber: 499,
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
                                                lineNumber: 503,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                        lineNumber: 498,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                lineNumber: 469,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                            lineNumber: 468,
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
                                        lineNumber: 516,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                    lineNumber: 515,
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
                                            lineNumber: 519,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                            size: "small",
                                            onClick: ()=>applyQuickFilter('top25'),
                                            children: "Top 25%"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                            lineNumber: 520,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                            size: "small",
                                            onClick: ()=>applyQuickFilter('bottom'),
                                            children: "底盘筛选"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                            lineNumber: 521,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                    lineNumber: 518,
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
                                            lineNumber: 524,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("br", {}, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                            lineNumber: 527,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                            checked: onlyChannelCustomer,
                                            onChange: (e)=>setOnlyChannelCustomer(e.target.checked),
                                            children: "仅看渠道客户"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                            lineNumber: 528,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("br", {}, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                            lineNumber: 531,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                            checked: onlyInRenewalWindow,
                                            onChange: (e)=>setOnlyInRenewalWindow(e.target.checked),
                                            children: "仅看续约窗口"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                            lineNumber: 532,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                    lineNumber: 523,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                            lineNumber: 514,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                    lineNumber: 467,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 466,
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
                                lineNumber: 544,
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
                                lineNumber: 546,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 543,
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
                                lineNumber: 553,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                        lineNumber: 551,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 542,
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
                            lineNumber: 577,
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
                                                    lineNumber: 584,
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
                                            lineNumber: 604,
                                            columnNumber: 31
                                        }, void 0),
                                        children: "列设置"
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                        lineNumber: 604,
                                        columnNumber: 17
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                                    lineNumber: 579,
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
                                    lineNumber: 606,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                            lineNumber: 578,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                    lineNumber: 576,
                    columnNumber: 11
                }, void 0),
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Table, {
                    rowKey: "id",
                    dataSource: filteredCustomers,
                    columns: columns,
                    pagination: {
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range)=>`共 ${total} 条记录，当前显示 ${range[0]}-${range[1]} 条`,
                        pageSizeOptions: [
                            '10',
                            '20',
                            '50',
                            '100'
                        ],
                        showLessItems: true
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
                    lineNumber: 617,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
                lineNumber: 573,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/components/CustomerSuccess/HighValueCustomerTab.tsx",
        lineNumber: 464,
        columnNumber: 5
    }, this);
};
_s(HighValueCustomerTab, "VFPMjYhiP8S5xgeBMyrRiSZjTqg=");
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
        if (changeType === 'increase') return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ArrowUpOutlined, {
            style: {
                color: '#ff4d4f'
            }
        }, void 0, false, {
            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
            lineNumber: 84,
            columnNumber: 14
        }, this);
        if (changeType === 'decrease') return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ArrowDownOutlined, {
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
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            background: '#fff',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e8e8e8',
            marginBottom: '16px'
        },
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    marginBottom: '12px',
                    paddingBottom: '8px',
                    borderBottom: '1px solid #f0f0f0'
                },
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center'
                    },
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DashboardOutlined, {
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
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
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
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
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
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                gutter: [
                    16,
                    16
                ],
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        xs: 12,
                        sm: 8,
                        lg: 4,
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            size: "small",
                            style: cardStyle,
                            bodyStyle: bodyStyle,
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: '8px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.TeamOutlined, {
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
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
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
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                                            title: "当前筛选条件下的客户总数量",
                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.InfoCircleOutlined, {
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
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
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
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center'
                                    },
                                    children: [
                                        getChangeIcon(data.totalCustomers.changeType),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
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
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
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
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        xs: 12,
                        sm: 8,
                        lg: 4,
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            size: "small",
                            style: cardStyle,
                            bodyStyle: bodyStyle,
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: '8px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.CrownOutlined, {
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
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
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
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                                            title: "价值评分≥80分的客户数量",
                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.InfoCircleOutlined, {
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
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
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
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center'
                                    },
                                    children: [
                                        getChangeIcon(data.highValueCustomers.changeType),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
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
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
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
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        xs: 12,
                        sm: 8,
                        lg: 4,
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            size: "small",
                            style: cardStyle,
                            bodyStyle: bodyStyle,
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: '8px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserAddOutlined, {
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
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
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
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                                            title: "本期新签约的客户数量",
                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.InfoCircleOutlined, {
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
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
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
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center'
                                    },
                                    children: [
                                        getChangeIcon(data.newSignups.changeType),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
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
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
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
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        xs: 12,
                        sm: 8,
                        lg: 4,
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            size: "small",
                            style: cardStyle,
                            bodyStyle: bodyStyle,
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: '8px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ExclamationCircleOutlined, {
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
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
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
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                                            title: "健康度评分<60分或有流失风险的客户",
                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.InfoCircleOutlined, {
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
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
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
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center'
                                    },
                                    children: [
                                        getChangeIcon(data.highRiskCustomers.changeType),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
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
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
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
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        xs: 12,
                        sm: 8,
                        lg: 4,
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            size: "small",
                            style: cardStyle,
                            bodyStyle: bodyStyle,
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: '8px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DollarCircleOutlined, {
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
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
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
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                                            title: "Annual Recurring Revenue - 年度经常性收入",
                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.InfoCircleOutlined, {
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
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
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
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center'
                                    },
                                    children: [
                                        getChangeIcon(data.currentARR.changeType),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
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
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
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
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        xs: 12,
                        sm: 8,
                        lg: 4,
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            size: "small",
                            style: cardStyle,
                            bodyStyle: bodyStyle,
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: '8px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PercentageOutlined, {
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
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
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
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                                            title: "客户留存和收入留存指标",
                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.InfoCircleOutlined, {
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
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                fontSize: '20px',
                                                fontWeight: 'bold',
                                                color: '#262626'
                                            },
                                            children: [
                                                "GRR: ",
                                                loading ? '-' : `${data.retentionRates.grr.toFixed(2)}%`
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerSuccess/KPISummary.tsx",
                                            lineNumber: 324,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                fontSize: '16px',
                                                fontWeight: 'bold',
                                                color: '#262626',
                                                marginTop: '4px'
                                            },
                                            children: [
                                                "NRR: ",
                                                loading ? '-' : `${data.retentionRates.nrr.toFixed(2)}%`
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
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
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
                                                getChangeIcon(data.retentionRates.grrChange > 0 ? 'increase' : data.retentionRates.grrChange < 0 ? 'decrease' : 'stable'),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                    style: {
                                                        marginLeft: '4px',
                                                        fontSize: '10px',
                                                        color: getChangeColor(data.retentionRates.grrChange > 0 ? 'increase' : data.retentionRates.grrChange < 0 ? 'decrease' : 'stable')
                                                    },
                                                    children: [
                                                        Math.abs(data.retentionRates.grrChange).toFixed(2),
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
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center'
                                            },
                                            children: [
                                                getChangeIcon(data.retentionRates.nrrChange > 0 ? 'increase' : data.retentionRates.nrrChange < 0 ? 'decrease' : 'stable'),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                    style: {
                                                        marginLeft: '4px',
                                                        fontSize: '10px',
                                                        color: getChangeColor(data.retentionRates.nrrChange > 0 ? 'increase' : data.retentionRates.nrrChange < 0 ? 'decrease' : 'stable')
                                                    },
                                                    children: [
                                                        Math.abs(data.retentionRates.nrrChange).toFixed(2),
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
var _reactrefresh = /*#__PURE__*/ _interop_require_wildcard._(__mako_require__("node_modules/react-refresh/runtime.js"));
var _jsxdevruntime = __mako_require__("node_modules/react/jsx-dev-runtime.js");
var _react = /*#__PURE__*/ _interop_require_wildcard._(__mako_require__("node_modules/react/index.js"));
var _antd = __mako_require__("node_modules/antd/es/index.js");
var _CustomerDetailModal = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/CustomerSuccess/CustomerDetailModal.tsx"));
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
    const [scaleThreshold, setScaleThreshold] = (0, _react.useState)(100); // 规模分割线
    const [priceThreshold, setPriceThreshold] = (0, _react.useState)(()=>{
        // 动态计算初始客单价阈值，确保在合理范围内
        if (customers.length === 0) return 50000;
        const prices = customers.map((c)=>c.unitPrice).filter((p)=>p > 0);
        if (prices.length === 0) return 50000;
        const avgPrice = prices.reduce((sum, p)=>sum + p, 0) / prices.length;
        return Math.round(avgPrice / 1000) * 1000; // 四舍五入到千位
    }); // 客单价分割线
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
    // 计算象限
    function getQuadrant(scale, price) {
        if (scale >= scaleThreshold && price >= priceThreshold) return '领先者';
        if (scale < scaleThreshold && price >= priceThreshold) return '精品标杆';
        if (scale >= scaleThreshold && price < priceThreshold) return '规模潜力';
        return '追赶者';
    }
    // 按行业聚合气泡数据
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
        for (const customer of customers)// 安全检查：确保客户行业存在且在预定义列表中
        if (customer.industry && industryCustomers[customer.industry]) industryCustomers[customer.industry].push(customer);
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
    // 筛选后的客户列表
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
    // 计算客单价范围
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
        // 添加一些缓冲区间，确保滑块范围合理
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
    // 图表尺寸和比例
    const chartWidth = 500;
    const chartHeight = 300;
    const padding = 60;
    const plotWidth = chartWidth - padding * 2;
    const plotHeight = chartHeight - padding * 2;
    const maxScale = Math.max(1, ...industryBubbles.map((b)=>b.avgScale));
    [
        ...industryBubbles.map((b)=>b.avgUnitPrice)
    ];
    const maxBubbleCount = Math.max(1, ...industryBubbles.map((b)=>b.newCustomerCount));
    const columns = [
        {
            title: '客户名称',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            width: 200,
            sorter: (a, b)=>a.name.localeCompare(b.name),
            render: (_, record)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                    children: record.name
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                    lineNumber: 212,
                    columnNumber: 9
                }, this)
        },
        {
            title: '客户成功',
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
            render: (quadrant)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                    color: quadrantColors[quadrant],
                    children: quadrant
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                    lineNumber: 230,
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
            render: (industry)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Badge, {
                    color: industryColors[industry],
                    text: industry
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                    lineNumber: 243,
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
            render: (rate)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                    style: {
                        color: rate >= 80 ? '#52c41a' : rate >= 60 ? '#fa8c16' : '#ff4d4f'
                    },
                    children: [
                        rate,
                        "%"
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                    lineNumber: 277,
                    columnNumber: 9
                }, this)
        }
    ];
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                style: {
                    ...cardStyle,
                    marginTop: 16,
                    marginBottom: 16
                },
                bodyStyle: {
                    padding: 16
                },
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                    gutter: 16,
                    align: "middle",
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                        children: "规模口径："
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                        lineNumber: 291,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                        value: scaleMetric,
                                        onChange: setScaleMetric,
                                        style: {
                                            width: 100
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                value: "人数",
                                                children: "人数"
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                lineNumber: 293,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                value: "席位",
                                                children: "席位"
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                lineNumber: 294,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                value: "门店数",
                                                children: "门店数"
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                lineNumber: 295,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                        lineNumber: 292,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                lineNumber: 290,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                            lineNumber: 289,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                        children: "规模阈值："
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                        lineNumber: 301,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Slider, {
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
                                        lineNumber: 302,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                        type: "secondary",
                                        children: scaleThreshold
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                        lineNumber: 310,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                lineNumber: 300,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                            lineNumber: 299,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                        children: "客单价阈值："
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                        lineNumber: 315,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Slider, {
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
                                        lineNumber: 316,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                        type: "secondary",
                                        children: [
                                            "¥",
                                            (priceThreshold / 10000).toFixed(1),
                                            "万"
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                        lineNumber: 325,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                lineNumber: 314,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                            lineNumber: 313,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                    lineNumber: 288,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                lineNumber: 287,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                style: {
                    ...cardStyle,
                    marginBottom: 16
                },
                title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                    style: {
                        fontWeight: 600
                    },
                    children: "新签客户分层 - 四象限气泡图"
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                    lineNumber: 334,
                    columnNumber: 16
                }, void 0),
                extra: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                            type: "secondary",
                            children: "气泡大小 = 新签客户数"
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                            lineNumber: 337,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                            type: "secondary",
                            children: "颜色 = 行业类目"
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                            lineNumber: 338,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                    lineNumber: 336,
                    columnNumber: 11
                }, void 0),
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    ref: chartRef,
                    style: {
                        width: '100%',
                        height: 360,
                        position: 'relative',
                        overflow: 'hidden'
                    },
                    children: [
                        (bubbleTip === null || bubbleTip === void 0 ? void 0 : bubbleTip.visible) && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
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
                            lineNumber: 348,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("svg", {
                            viewBox: `0 0 ${chartWidth} ${chartHeight}`,
                            style: {
                                width: '100%',
                                height: '100%'
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("rect", {
                                    x: padding,
                                    y: padding,
                                    width: plotWidth / 2,
                                    height: plotHeight / 2,
                                    fill: "#f6ffed",
                                    fillOpacity: 0.3
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 371,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("rect", {
                                    x: padding + plotWidth / 2,
                                    y: padding,
                                    width: plotWidth / 2,
                                    height: plotHeight / 2,
                                    fill: "#e6f7ff",
                                    fillOpacity: 0.3
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 372,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("rect", {
                                    x: padding,
                                    y: padding + plotHeight / 2,
                                    width: plotWidth / 2,
                                    height: plotHeight / 2,
                                    fill: "#fff7e6",
                                    fillOpacity: 0.3
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 373,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("rect", {
                                    x: padding + plotWidth / 2,
                                    y: padding + plotHeight / 2,
                                    width: plotWidth / 2,
                                    height: plotHeight / 2,
                                    fill: "#f5f5f5",
                                    fillOpacity: 0.3
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 374,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("text", {
                                    x: padding + plotWidth / 4,
                                    y: padding + 20,
                                    textAnchor: "middle",
                                    fontSize: "14",
                                    fontWeight: "600",
                                    fill: "#52c41a",
                                    children: "精品标杆"
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 377,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("text", {
                                    x: padding + plotWidth * 3 / 4,
                                    y: padding + 20,
                                    textAnchor: "middle",
                                    fontSize: "14",
                                    fontWeight: "600",
                                    fill: "#1890ff",
                                    children: "领先者"
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 378,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("text", {
                                    x: padding + plotWidth / 4,
                                    y: padding + plotHeight - 10,
                                    textAnchor: "middle",
                                    fontSize: "14",
                                    fontWeight: "600",
                                    fill: "#bfbfbf",
                                    children: "追赶者"
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 379,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("text", {
                                    x: padding + plotWidth * 3 / 4,
                                    y: padding + plotHeight - 10,
                                    textAnchor: "middle",
                                    fontSize: "14",
                                    fontWeight: "600",
                                    fill: "#fa8c16",
                                    children: "规模潜力"
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 380,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("line", {
                                    x1: padding,
                                    y1: padding,
                                    x2: padding,
                                    y2: padding + plotHeight,
                                    stroke: "#d9d9d9",
                                    strokeWidth: 2
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 383,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("line", {
                                    x1: padding,
                                    y1: padding + plotHeight,
                                    x2: padding + plotWidth,
                                    y2: padding + plotHeight,
                                    stroke: "#d9d9d9",
                                    strokeWidth: 2
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 384,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("line", {
                                    x1: padding + scaleThreshold / maxScale * plotWidth,
                                    y1: padding,
                                    x2: padding + scaleThreshold / maxScale * plotWidth,
                                    y2: padding + plotHeight,
                                    stroke: "#1890ff",
                                    strokeWidth: 2,
                                    strokeDasharray: "5,5"
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 387,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("line", {
                                    x1: padding,
                                    y1: padding + plotHeight - priceThreshold / priceRange.max * plotHeight,
                                    x2: padding + plotWidth,
                                    y2: padding + plotHeight - priceThreshold / priceRange.max * plotHeight,
                                    stroke: "#1890ff",
                                    strokeWidth: 2,
                                    strokeDasharray: "5,5"
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 396,
                                    columnNumber: 13
                                }, this),
                                Array.from({
                                    length: 6
                                }).map((_, i)=>{
                                    const value = maxScale / 5 * i;
                                    const x = padding + value / maxScale * plotWidth;
                                    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("g", {
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("line", {
                                                x1: x,
                                                y1: padding + plotHeight,
                                                x2: x,
                                                y2: padding + plotHeight + 5,
                                                stroke: "#d9d9d9"
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                lineNumber: 412,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("text", {
                                                x: x,
                                                y: padding + plotHeight + 20,
                                                textAnchor: "middle",
                                                fontSize: "10",
                                                fill: "#8c8c8c",
                                                children: Math.round(value)
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                lineNumber: 413,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                        lineNumber: 411,
                                        columnNumber: 17
                                    }, this);
                                }),
                                Array.from({
                                    length: 6
                                }).map((_, i)=>{
                                    const value = priceRange.max / 5 * i;
                                    const y = padding + plotHeight - value / priceRange.max * plotHeight;
                                    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("g", {
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("line", {
                                                x1: padding - 5,
                                                y1: y,
                                                x2: padding,
                                                y2: y,
                                                stroke: "#d9d9d9"
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                lineNumber: 426,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("text", {
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
                                                lineNumber: 427,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                        lineNumber: 425,
                                        columnNumber: 17
                                    }, this);
                                }),
                                industryBubbles.map((bubble)=>{
                                    const x = padding + bubble.avgScale / maxScale * plotWidth;
                                    const y = padding + plotHeight - bubble.avgUnitPrice / priceRange.max * plotHeight;
                                    const r = 8 + bubble.newCustomerCount / maxBubbleCount * 20;
                                    const color = industryColors[bubble.industry];
                                    const tooltipContent = /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    fontWeight: 600,
                                                    marginBottom: 8,
                                                    color: color
                                                },
                                                children: bubble.industry
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                lineNumber: 443,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                children: [
                                                    "新签客户数：",
                                                    bubble.newCustomerCount
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                lineNumber: 444,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                children: [
                                                    "平均客单价：¥",
                                                    (bubble.avgUnitPrice / 10000).toFixed(1),
                                                    "万"
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                lineNumber: 445,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                children: [
                                                    "平均规模：",
                                                    bubble.avgScale,
                                                    scaleMetric === '人数' ? '人' : scaleMetric === '席位' ? '席' : '家'
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                lineNumber: 446,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                children: [
                                                    "总ARR：¥",
                                                    (bubble.totalArr / 10000).toFixed(1),
                                                    "万"
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                lineNumber: 447,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    marginTop: 8
                                                },
                                                children: "Top3客户："
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                lineNumber: 448,
                                                columnNumber: 19
                                            }, this),
                                            bubble.topCustomers.map((name, idx)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
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
                                                    lineNumber: 450,
                                                    columnNumber: 21
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                        lineNumber: 442,
                                        columnNumber: 17
                                    }, this);
                                    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("circle", {
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
                                        lineNumber: 456,
                                        columnNumber: 17
                                    }, this);
                                }),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("text", {
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
                                    lineNumber: 506,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("text", {
                                    x: 20,
                                    y: padding + plotHeight / 2,
                                    textAnchor: "middle",
                                    fontSize: "12",
                                    fill: "#8c8c8c",
                                    transform: `rotate(-90, 20, ${padding + plotHeight / 2})`,
                                    children: "客单价 (万元)"
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 509,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                            lineNumber: 366,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                    lineNumber: 343,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                lineNumber: 332,
                columnNumber: 7
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
                                "新签客户清单 (",
                                filteredCustomers.length,
                                ")"
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                            lineNumber: 521,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                            children: [
                                selectedIndustries.length > 0 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                            type: "secondary",
                                            children: "已选行业："
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                            lineNumber: 525,
                                            columnNumber: 19
                                        }, void 0),
                                        selectedIndustries.map((industry)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                color: industryColors[industry],
                                                closable: true,
                                                onClose: ()=>setSelectedIndustries((prev)=>prev.filter((i)=>i !== industry)),
                                                children: industry
                                            }, industry, false, {
                                                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                                lineNumber: 527,
                                                columnNumber: 21
                                            }, void 0)),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                            size: "small",
                                            onClick: ()=>setSelectedIndustries([]),
                                            children: "清除筛选"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                            lineNumber: 536,
                                            columnNumber: 19
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 524,
                                    columnNumber: 17
                                }, void 0),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input.Search, {
                                    allowClear: true,
                                    placeholder: "搜索客户/CSM/行业...",
                                    style: {
                                        width: 280
                                    },
                                    onSearch: setSearch,
                                    onChange: (e)=>setSearch(e.target.value)
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                                    lineNumber: 541,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                            lineNumber: 522,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                    lineNumber: 520,
                    columnNumber: 11
                }, void 0),
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Table, {
                    rowKey: "id",
                    dataSource: filteredCustomers,
                    columns: columns,
                    pagination: {
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range)=>`共 ${total} 条记录，当前显示 ${range[0]}-${range[1]} 条`,
                        pageSizeOptions: [
                            '10',
                            '20',
                            '50',
                            '100'
                        ],
                        showLessItems: true
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
                    lineNumber: 552,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                lineNumber: 517,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_CustomerDetailModal.default, {
                visible: customerDetailVisible,
                customer: selectedCustomer,
                onClose: ()=>{
                    setCustomerDetailVisible(false);
                    setSelectedCustomer(null);
                }
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
                lineNumber: 577,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/components/CustomerSuccess/NewCustomerTieringTab.tsx",
        lineNumber: 285,
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
"src/components/CustomerSuccess/RecallIncubationWorkbench.tsx": function (module, exports, __mako_require__){
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
var _reactdnd = __mako_require__("node_modules/react-dnd/dist/index.js");
var _reactdndhtml5backend = __mako_require__("node_modules/react-dnd-html5-backend/dist/index.js");
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
const { Title, Text } = _antd.Typography;
const { Option } = _antd.Select;
const { TextArea } = _antd.Input;
// 常量定义
const SWIM_LANES = [
    {
        key: 'pool',
        title: '流失客户池',
        color: '#8c8c8c',
        bgColor: '#f5f5f5'
    },
    {
        key: 'pending',
        title: '待召回',
        color: '#fa8c16',
        bgColor: '#fff7e6'
    },
    {
        key: 'incubating',
        title: '孵化中',
        color: '#1890ff',
        bgColor: '#e6f7ff'
    },
    {
        key: 'negotiating',
        title: '商务谈判',
        color: '#722ed1',
        bgColor: '#f9f0ff'
    },
    {
        key: 'recalled',
        title: '已召回',
        color: '#52c41a',
        bgColor: '#f6ffed'
    },
    {
        key: 'lost',
        title: '永久流失',
        color: '#ff4d4f',
        bgColor: '#fff2f0'
    }
];
const CHURN_REASONS = [
    {
        value: 'feature',
        label: '功能不满足',
        color: '#ff4d4f'
    },
    {
        value: 'price',
        label: '价格因素',
        color: '#fa8c16'
    },
    {
        value: 'service',
        label: '服务问题',
        color: '#722ed1'
    },
    {
        value: 'competitor',
        label: '竞品替代',
        color: '#1890ff'
    },
    {
        value: 'business',
        label: '业务调整',
        color: '#52c41a'
    },
    {
        value: 'other',
        label: '其他原因',
        color: '#8c8c8c'
    }
];
// 当前CSM信息
const CURRENT_CSM = {
    name: '张三',
    id: 'csm001'
};
// 智能推荐数据
const SMART_RECOMMENDATIONS = [
    {
        id: '1',
        customer: '阿里巴巴集团',
        reason: '高价值客户，请优先评估',
        priority: 'high'
    },
    {
        id: '2',
        customer: '字节跳动',
        reason: '关键功能已上线，建议联系',
        priority: 'medium'
    },
    {
        id: '3',
        customer: '美团',
        reason: '商务谈判进展良好',
        priority: 'medium'
    },
    {
        id: '4',
        customer: '腾讯科技',
        reason: '续约意向积极，可加快推进',
        priority: 'medium'
    }
];
// 行动剧本模板
const PLAYBOOK_TEMPLATES = {
    feature: [
        {
            id: '1',
            title: '功能演示剧本',
            type: '产品演示'
        },
        {
            id: '2',
            title: '定制化方案剧本',
            type: '解决方案'
        }
    ],
    price: [
        {
            id: '3',
            title: '价格谈判剧本',
            type: '商务谈判'
        },
        {
            id: '4',
            title: 'ROI价值证明剧本',
            type: '价值证明'
        }
    ],
    service: [
        {
            id: '5',
            title: '服务升级剧本',
            type: '服务改进'
        },
        {
            id: '6',
            title: '客户关怀剧本',
            type: '关系维护'
        }
    ],
    competitor: [
        {
            id: '7',
            title: '竞品对比剧本',
            type: '竞争分析'
        },
        {
            id: '8',
            title: '差异化价值剧本',
            type: '价值定位'
        }
    ],
    business: [
        {
            id: '9',
            title: '业务对接剧本',
            type: '业务沟通'
        }
    ],
    other: [
        {
            id: '10',
            title: '通用召回剧本',
            type: '通用模板'
        }
    ]
};
// 模拟数据 - 只显示张三负责的客户
const MOCK_CUSTOMERS = [
    {
        id: '1',
        name: '阿里巴巴集团',
        churnReason: 'feature',
        churnReasonColor: '#ff4d4f',
        preChurnARR: 500000,
        churnedDays: 45,
        stage: 'pool',
        industry: '电商',
        csm: '张三',
        riskLevel: 'high',
        contacts: [
            {
                name: '李经理',
                role: '技术负责人',
                phone: '13800138001',
                email: 'li@alibaba.com'
            }
        ],
        churnAnalysis: {
            primaryReason: '功能不满足业务需求',
            secondaryReasons: [
                '价格偏高',
                '竞品功能更全'
            ],
            customerFeedback: '希望能够支持更多定制化功能'
        },
        recallPlan: [
            {
                id: '1',
                task: '联系客户了解具体需求',
                completed: false,
                dueDate: '2024-02-01'
            },
            {
                id: '2',
                task: '准备产品功能演示',
                completed: false,
                dueDate: '2024-02-05'
            }
        ]
    },
    {
        id: '2',
        name: '腾讯科技',
        churnReason: 'price',
        churnReasonColor: '#fa8c16',
        preChurnARR: 800000,
        churnedDays: 120,
        stage: 'pending',
        industry: '互联网',
        csm: '张三',
        riskLevel: 'medium',
        contacts: [
            {
                name: '王总监',
                role: '采购负责人',
                phone: '13800138002',
                email: 'wang@tencent.com'
            }
        ],
        churnAnalysis: {
            primaryReason: '预算压缩',
            secondaryReasons: [
                'ROI不明显'
            ],
            customerFeedback: '希望能够提供更优惠的价格方案'
        },
        recallPlan: [
            {
                id: '3',
                task: '准备ROI分析报告',
                completed: true,
                dueDate: '2024-01-15'
            },
            {
                id: '4',
                task: '制定优惠方案',
                completed: false,
                dueDate: '2024-02-10'
            }
        ]
    },
    {
        id: '3',
        name: '字节跳动',
        churnReason: 'competitor',
        churnReasonColor: '#1890ff',
        preChurnARR: 1200000,
        churnedDays: 80,
        stage: 'incubating',
        industry: '互联网',
        csm: '张三',
        riskLevel: 'high',
        contacts: [
            {
                name: '赵主管',
                role: '项目经理',
                phone: '13800138003',
                email: 'zhao@bytedance.com'
            }
        ],
        churnAnalysis: {
            primaryReason: '选择了竞品方案',
            secondaryReasons: [
                '竞品价格更低',
                '实施周期更短'
            ],
            competitorInfo: '选择了某竞品公司的解决方案',
            customerFeedback: '希望我们能提供更快的实施服务'
        },
        recallPlan: [
            {
                id: '5',
                task: '分析竞品优劣势',
                completed: true,
                dueDate: '2024-01-20'
            },
            {
                id: '6',
                task: '制定差异化方案',
                completed: false,
                dueDate: '2024-02-15'
            }
        ]
    },
    {
        id: '4',
        name: '美团',
        churnReason: 'service',
        churnReasonColor: '#722ed1',
        preChurnARR: 300000,
        churnedDays: 200,
        stage: 'negotiating',
        industry: '生活服务',
        csm: '张三',
        riskLevel: 'medium',
        contacts: [
            {
                name: '孙经理',
                role: '业务负责人',
                phone: '13800138004',
                email: 'sun@meituan.com'
            }
        ],
        churnAnalysis: {
            primaryReason: '服务响应不及时',
            secondaryReasons: [
                '技术支持不够专业'
            ],
            customerFeedback: '希望能够提供7x24小时技术支持'
        },
        recallPlan: [
            {
                id: '7',
                task: '升级服务等级',
                completed: true,
                dueDate: '2024-01-25'
            },
            {
                id: '8',
                task: '安排专属客户成功经理',
                completed: true,
                dueDate: '2024-01-30'
            },
            {
                id: '9',
                task: '商务谈判',
                completed: false,
                dueDate: '2024-02-20'
            }
        ]
    },
    {
        id: '5',
        name: '滴滴出行',
        churnReason: 'business',
        churnReasonColor: '#52c41a',
        preChurnARR: 600000,
        churnedDays: 30,
        stage: 'recalled',
        industry: '交通出行',
        csm: '张三',
        riskLevel: 'low',
        contacts: [
            {
                name: '周总',
                role: 'CTO',
                phone: '13800138005',
                email: 'zhou@didi.com'
            }
        ],
        churnAnalysis: {
            primaryReason: '业务方向调整',
            secondaryReasons: [],
            customerFeedback: '重新评估后决定继续合作'
        },
        recallPlan: [
            {
                id: '10',
                task: '重新签署合同',
                completed: true,
                dueDate: '2024-01-28'
            }
        ]
    },
    {
        id: '6',
        name: '京东集团',
        churnReason: 'other',
        churnReasonColor: '#8c8c8c',
        preChurnARR: 150000,
        churnedDays: 365,
        stage: 'lost',
        industry: '电商',
        csm: '张三',
        riskLevel: 'high',
        contacts: [
            {
                name: '吴主任',
                role: '采购主任',
                phone: '13800138006',
                email: 'wu@jd.com'
            }
        ],
        churnAnalysis: {
            primaryReason: '公司战略调整',
            secondaryReasons: [
                '内部自研替代'
            ],
            customerFeedback: '暂时不考虑外部解决方案'
        },
        recallPlan: [
            {
                id: '11',
                task: '保持定期联系',
                completed: false,
                dueDate: '2024-06-01'
            }
        ]
    }
];
const CustomerCard = ({ customer, onCardClick, onMoveCustomer })=>{
    _s();
    const [{ isDragging }, drag] = (0, _reactdnd.useDrag)({
        type: 'customer',
        item: {
            id: customer.id,
            currentStage: customer.stage
        },
        collect: (monitor)=>({
                isDragging: monitor.isDragging()
            })
    });
    const churnReasonConfig = CHURN_REASONS.find((reason)=>reason.value === customer.churnReason);
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        ref: drag,
        style: {
            opacity: isDragging ? 0.5 : 1,
            cursor: 'move',
            marginBottom: '8px'
        },
        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
            size: "small",
            hoverable: true,
            onClick: ()=>onCardClick(customer),
            style: {
                borderLeft: `4px solid ${customer.churnReasonColor}`,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                height: '60px'
            },
            bodyStyle: {
                padding: '8px 12px',
                height: '100%'
            },
            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '100%'
                },
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '100%'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    fontWeight: 'bold',
                                    fontSize: '14px'
                                },
                                children: customer.name
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                lineNumber: 347,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '12px',
                                    color: '#666'
                                },
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                        children: [
                                            "ARR: ¥",
                                            customer.preChurnARR.toLocaleString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                        lineNumber: 349,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                        children: [
                                            "流失: ",
                                            customer.churnedDays,
                                            "天"
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                        lineNumber: 350,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                lineNumber: 348,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                        lineNumber: 346,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                        color: churnReasonConfig === null || churnReasonConfig === void 0 ? void 0 : churnReasonConfig.color,
                        style: {
                            margin: 0
                        },
                        children: churnReasonConfig === null || churnReasonConfig === void 0 ? void 0 : churnReasonConfig.label
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                        lineNumber: 353,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                lineNumber: 340,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
            lineNumber: 329,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
        lineNumber: 321,
        columnNumber: 5
    }, this);
};
_s(CustomerCard, "wuumsFp4qAni9XRJfRhQAZjuD/k=", false, function() {
    return [
        _reactdnd.useDrag
    ];
});
_c = CustomerCard;
const AnimatedCountTag = ({ color, count })=>{
    _s1();
    const [displayCount, setDisplayCount] = (0, _react.useState)(count);
    const [isAnimating, setIsAnimating] = (0, _react.useState)(false);
    (0, _react.useEffect)(()=>{
        if (displayCount !== count) {
            setIsAnimating(true);
            const duration = 800; // 动画持续时间
            const steps = 20; // 动画步数
            const increment = (count - displayCount) / steps;
            let currentStep = 0;
            const timer = setInterval(()=>{
                currentStep++;
                if (currentStep >= steps) {
                    setDisplayCount(count);
                    setIsAnimating(false);
                    clearInterval(timer);
                } else setDisplayCount((prev)=>{
                    const newValue = prev + increment;
                    return increment > 0 ? Math.min(Math.round(newValue), count) : Math.max(Math.round(newValue), count);
                });
            }, duration / steps);
            return ()=>clearInterval(timer);
        }
        return undefined;
    }, [
        count,
        displayCount
    ]);
    // 创建动态样式
    const pulseKeyframes = `
    @keyframes pulse-${color.replace('#', '')} {
      0% { 
        transform: scale(1); 
        box-shadow: 0 0 0 0 ${color}66;
      }
      50% { 
        transform: scale(1.15); 
        box-shadow: 0 0 0 8px ${color}33;
      }
      100% { 
        transform: scale(1); 
        box-shadow: 0 0 0 0 ${color}00;
      }
    }
  `;
    (0, _react.useEffect)(()=>{
        if (isAnimating) {
            // 动态插入CSS动画
            const styleElement = document.createElement('style');
            styleElement.textContent = pulseKeyframes;
            document.head.appendChild(styleElement);
            return ()=>{
                document.head.removeChild(styleElement);
            };
        }
        return undefined;
    }, [
        isAnimating,
        pulseKeyframes
    ]);
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
        color: color,
        style: {
            animation: isAnimating ? `pulse-${color.replace('#', '')} 0.8s ease-in-out` : 'none',
            transition: 'all 0.3s ease',
            fontWeight: 'bold',
            fontSize: '12px',
            minWidth: '24px',
            textAlign: 'center'
        },
        children: displayCount
    }, void 0, false, {
        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
        lineNumber: 433,
        columnNumber: 5
    }, this);
};
_s1(AnimatedCountTag, "v+0agIw6keTzsmyWKcR+Ik+X8ms=");
_c1 = AnimatedCountTag;
const SwimLane = ({ lane, customers, onCardClick, onMoveCustomer, visibleCount, onLoadMore })=>{
    _s2();
    const [{ isOver }, drop] = (0, _reactdnd.useDrop)({
        accept: 'customer',
        drop: (item)=>{
            if (item.currentStage !== lane.key) onMoveCustomer(item.id, lane.key);
        },
        collect: (monitor)=>({
                isOver: monitor.isOver()
            })
    });
    const visibleCustomers = customers.slice(0, visibleCount);
    const hasMore = customers.length > visibleCount;
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        ref: drop,
        style: {
            backgroundColor: isOver ? '#e6f7ff' : lane.bgColor,
            borderRadius: '8px',
            padding: '16px',
            height: '500px',
            border: isOver ? '2px dashed #1890ff' : '1px solid #d9d9d9',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column'
        },
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px',
                    flexShrink: 0
                },
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                        level: 4,
                        style: {
                            margin: 0,
                            color: lane.color
                        },
                        children: lane.title
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                        lineNumber: 495,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(AnimatedCountTag, {
                        color: lane.color,
                        count: customers.length
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                        lineNumber: 498,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                lineNumber: 488,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    flex: 1,
                    overflowY: 'auto',
                    paddingRight: '4px'
                },
                children: [
                    visibleCustomers.map((customer)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(CustomerCard, {
                            customer: customer,
                            onCardClick: onCardClick,
                            onMoveCustomer: onMoveCustomer
                        }, customer.id, false, {
                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                            lineNumber: 508,
                            columnNumber: 11
                        }, this)),
                    hasMore && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                        type: "link",
                        size: "small",
                        onClick: onLoadMore,
                        style: {
                            padding: 0,
                            height: 'auto',
                            marginTop: '8px'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ArrowDownOutlined, {}, void 0, false, {
                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                lineNumber: 523,
                                columnNumber: 13
                            }, this),
                            " 加载更多 (",
                            customers.length - visibleCount,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                        lineNumber: 517,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                lineNumber: 502,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
        lineNumber: 475,
        columnNumber: 5
    }, this);
};
_s2(SwimLane, "9166pYLrZ/JzF75YDim8ZjfICTM=", false, function() {
    return [
        _reactdnd.useDrop
    ];
});
_c2 = SwimLane;
// 主组件
const RecallIncubationWorkbench = ()=>{
    var _PLAYBOOK_TEMPLATES_selectedCustomer_churnReason;
    _s3();
    const [customers, setCustomers] = (0, _react.useState)(MOCK_CUSTOMERS);
    const [selectedCustomer, setSelectedCustomer] = (0, _react.useState)(null);
    const [drawerVisible, setDrawerVisible] = (0, _react.useState)(false);
    const [filterReason, setFilterReason] = (0, _react.useState)('all');
    const [filterARR, setFilterARR] = (0, _react.useState)('all');
    const [searchKeyword, setSearchKeyword] = (0, _react.useState)('');
    const [viewMode, setViewMode] = (0, _react.useState)('board');
    const [visibleCounts, setVisibleCounts] = (0, _react.useState)({});
    // 只显示当前CSM负责的客户
    const filteredCustomers = customers.filter((customer)=>{
        if (customer.csm !== CURRENT_CSM.name) return false;
        if (filterReason !== 'all' && customer.churnReason !== filterReason) return false;
        if (filterARR !== 'all') {
            if (filterARR === 'high' && customer.preChurnARR < 500000) return false;
            if (filterARR === 'medium' && (customer.preChurnARR < 100000 || customer.preChurnARR >= 500000)) return false;
            if (filterARR === 'low' && customer.preChurnARR >= 100000) return false;
        }
        if (searchKeyword && !customer.name.toLowerCase().includes(searchKeyword.toLowerCase())) return false;
        return true;
    });
    // 加载更多客户函数
    const loadMoreCustomers = (0, _react.useCallback)((laneKey)=>{
        setVisibleCounts((prev)=>({
                ...prev,
                [laneKey]: (prev[laneKey] || 5) + 5
            }));
    }, []);
    // 点击客户卡片
    const handleCardClick = (0, _react.useCallback)((customer)=>{
        setSelectedCustomer(customer);
        setDrawerVisible(true);
    }, []);
    // 移动客户到不同阶段
    const handleMoveCustomer = (0, _react.useCallback)((customerId, targetStage)=>{
        setCustomers((prev)=>prev.map((customer)=>customer.id === customerId ? {
                    ...customer,
                    stage: targetStage
                } : customer));
        _antd.message.success('客户状态已更新');
    }, []);
    // 列表视图的列定义
    const listColumns = [
        {
            title: '客户名称',
            dataIndex: 'name',
            key: 'name',
            render: (text, record)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                    type: "link",
                    onClick: ()=>handleCardClick(record),
                    children: text
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                    lineNumber: 589,
                    columnNumber: 9
                }, this)
        },
        {
            title: '流失原因',
            dataIndex: 'churnReason',
            key: 'churnReason',
            render: (reason)=>{
                const config = CHURN_REASONS.find((r)=>r.value === reason);
                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                    color: config === null || config === void 0 ? void 0 : config.color,
                    children: config === null || config === void 0 ? void 0 : config.label
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                    lineNumber: 600,
                    columnNumber: 16
                }, this);
            }
        },
        {
            title: '流失前ARR',
            dataIndex: 'preChurnARR',
            key: 'preChurnARR',
            sorter: (a, b)=>a.preChurnARR - b.preChurnARR,
            render: (arr)=>`¥${arr.toLocaleString()}`
        },
        {
            title: '流失天数',
            dataIndex: 'churnedDays',
            key: 'churnedDays',
            sorter: (a, b)=>a.churnedDays - b.churnedDays
        },
        {
            title: '当前阶段',
            dataIndex: 'stage',
            key: 'stage',
            render: (stage)=>{
                const lane = SWIM_LANES.find((l)=>l.key === stage);
                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                    color: lane === null || lane === void 0 ? void 0 : lane.color,
                    children: lane === null || lane === void 0 ? void 0 : lane.title
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                    lineNumber: 622,
                    columnNumber: 16
                }, this);
            }
        }
    ];
    // 初始化可见数量
    _react.default.useEffect(()=>{
        const initialCounts = {};
        SWIM_LANES.forEach((lane)=>{
            initialCounts[lane.key] = 5;
        });
        setVisibleCounts(initialCounts);
    }, []);
    // 按阶段分组客户
    const customersByStage = SWIM_LANES.reduce((acc, lane)=>{
        acc[lane.key] = filteredCustomers.filter((customer)=>customer.stage === lane.key);
        return acc;
    }, {});
    // 计算个人业绩
    const personalMetrics = _react.default.useMemo(()=>{
        const pendingAmount = filteredCustomers.filter((c)=>[
                'pool',
                'pending',
                'incubating',
                'negotiating'
            ].includes(c.stage)).reduce((sum, c)=>sum + c.preChurnARR, 0);
        const recalledAmount = filteredCustomers.filter((c)=>c.stage === 'recalled').reduce((sum, c)=>sum + c.preChurnARR, 0);
        const totalAttempted = filteredCustomers.filter((c)=>c.stage !== 'pool').length;
        const successfulRecalls = filteredCustomers.filter((c)=>c.stage === 'recalled').length;
        const successRate = totalAttempted > 0 ? (successfulRecalls / totalAttempted * 100).toFixed(1) : '0';
        return {
            pendingAmount,
            recalledAmount,
            successRate
        };
    }, [
        filteredCustomers
    ]);
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_reactdnd.DndProvider, {
        backend: _reactdndhtml5backend.HTML5Backend,
        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
            style: {
                padding: '32px 40px',
                backgroundColor: '#f5f5f5',
                minHeight: '100vh'
            },
            children: [
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        marginBottom: '24px'
                    },
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                            level: 2,
                            style: {
                                margin: 0,
                                color: '#262626',
                                fontWeight: '600'
                            },
                            children: "召回孵化"
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                            lineNumber: 664,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                            type: "secondary",
                            style: {
                                fontSize: '14px',
                                color: '#666'
                            },
                            children: "以数据驱动的流失客户召回与价值重建"
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                            lineNumber: 667,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                    lineNumber: 663,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                    title: "我的召回业绩 (本季度)",
                    style: {
                        marginBottom: '24px'
                    },
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                        gutter: 24,
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                span: 8,
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        textAlign: 'center'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                fontSize: '24px',
                                                fontWeight: 'bold',
                                                color: '#fa8c16'
                                            },
                                            children: [
                                                "¥",
                                                personalMetrics.pendingAmount.toLocaleString()
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                            lineNumber: 678,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                color: '#666'
                                            },
                                            children: "待召回总金额"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                            lineNumber: 681,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                    lineNumber: 677,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                lineNumber: 676,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                span: 8,
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        textAlign: 'center'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                fontSize: '24px',
                                                fontWeight: 'bold',
                                                color: '#52c41a'
                                            },
                                            children: [
                                                "¥",
                                                personalMetrics.recalledAmount.toLocaleString()
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                            lineNumber: 686,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                color: '#666'
                                            },
                                            children: "已召回金额"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                            lineNumber: 689,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                    lineNumber: 685,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                lineNumber: 684,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                span: 8,
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        textAlign: 'center'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                fontSize: '24px',
                                                fontWeight: 'bold',
                                                color: '#1890ff'
                                            },
                                            children: [
                                                personalMetrics.successRate,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                            lineNumber: 694,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                color: '#666'
                                            },
                                            children: "召回成功率"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                            lineNumber: 697,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                    lineNumber: 693,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                lineNumber: 692,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                        lineNumber: 675,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                    lineNumber: 671,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                    title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.BulbOutlined, {
                                style: {
                                    color: '#faad14'
                                }
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                lineNumber: 705,
                                columnNumber: 24
                            }, void 0),
                            " 智能推荐 - 今日优先关注"
                        ]
                    }, void 0, true, {
                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                        lineNumber: 705,
                        columnNumber: 18
                    }, void 0),
                    style: {
                        marginBottom: '24px'
                    },
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'center'
                        },
                        children: SMART_RECOMMENDATIONS.filter((rec)=>rec.customer !== '阿里巴巴集团').map((rec)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '12px 16px',
                                    border: '1px solid #d9d9d9',
                                    borderRadius: '8px',
                                    backgroundColor: '#fafafa',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    flex: 1
                                },
                                onMouseEnter: (e)=>{
                                    e.currentTarget.style.backgroundColor = '#f0f0f0';
                                    e.currentTarget.style.borderColor = '#1890ff';
                                },
                                onMouseLeave: (e)=>{
                                    e.currentTarget.style.backgroundColor = '#fafafa';
                                    e.currentTarget.style.borderColor = '#d9d9d9';
                                },
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                                        size: 32,
                                        style: {
                                            backgroundColor: '#1890ff',
                                            marginRight: '12px'
                                        },
                                        children: rec.customer.charAt(0)
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                        lineNumber: 734,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            flex: 1
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    fontWeight: 'bold',
                                                    fontSize: '14px',
                                                    marginBottom: '2px'
                                                },
                                                children: rec.customer
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                lineNumber: 738,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                type: "secondary",
                                                style: {
                                                    fontSize: '12px'
                                                },
                                                children: rec.reason
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                lineNumber: 739,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                        lineNumber: 737,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, rec.id, true, {
                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                lineNumber: 712,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                        lineNumber: 710,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                    lineNumber: 704,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                    style: {
                        marginBottom: '24px'
                    },
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                        gutter: 16,
                        align: "middle",
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.FilterOutlined, {}, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                            lineNumber: 751,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                            value: filterReason,
                                            onChange: setFilterReason,
                                            style: {
                                                width: 120
                                            },
                                            placeholder: "流失原因",
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                    value: "all",
                                                    children: "全部原因"
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                    lineNumber: 758,
                                                    columnNumber: 19
                                                }, this),
                                                CHURN_REASONS.map((reason)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                        value: reason.value,
                                                        children: reason.label
                                                    }, reason.value, false, {
                                                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                        lineNumber: 760,
                                                        columnNumber: 21
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                            lineNumber: 752,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                            value: filterARR,
                                            onChange: setFilterARR,
                                            style: {
                                                width: 160
                                            },
                                            placeholder: "合同金额",
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                    value: "all",
                                                    children: "全部金额"
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                    lineNumber: 769,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                    value: "high",
                                                    children: "高价值(≥50万)"
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                    lineNumber: 770,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                    value: "medium",
                                                    children: "中价值(10-50万)"
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                    lineNumber: 771,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                    value: "low",
                                                    children: "低价值(<10万)"
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                    lineNumber: 772,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                            lineNumber: 763,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {
                                            prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.SearchOutlined, {}, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                lineNumber: 775,
                                                columnNumber: 27
                                            }, void 0),
                                            placeholder: "搜索客户名称",
                                            value: searchKeyword,
                                            onChange: (e)=>setSearchKeyword(e.target.value),
                                            style: {
                                                width: 200
                                            }
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                            lineNumber: 774,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                    lineNumber: 750,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                lineNumber: 749,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                flex: "auto"
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                lineNumber: 783,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button.Group, {
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                            type: viewMode === 'board' ? 'primary' : 'default',
                                            icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.AppstoreOutlined, {}, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                lineNumber: 788,
                                                columnNumber: 25
                                            }, void 0),
                                            onClick: ()=>setViewMode('board'),
                                            children: "看板视图"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                            lineNumber: 786,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                            type: viewMode === 'list' ? 'primary' : 'default',
                                            icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UnorderedListOutlined, {}, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                lineNumber: 795,
                                                columnNumber: 25
                                            }, void 0),
                                            onClick: ()=>setViewMode('list'),
                                            children: "列表视图"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                            lineNumber: 793,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                    lineNumber: 785,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                lineNumber: 784,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                        lineNumber: 748,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                    lineNumber: 747,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                    gutter: 24,
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        span: 24,
                        children: viewMode === 'board' ? /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                                    gutter: 16,
                                    style: {
                                        marginBottom: 24
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                            span: 8,
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(SwimLane, {
                                                lane: SWIM_LANES[0],
                                                customers: customersByStage[SWIM_LANES[0].key] || [],
                                                onCardClick: handleCardClick,
                                                onMoveCustomer: handleMoveCustomer,
                                                visibleCount: visibleCounts[SWIM_LANES[0].key] || 5,
                                                onLoadMore: ()=>loadMoreCustomers(SWIM_LANES[0].key)
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                lineNumber: 813,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                            lineNumber: 812,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                            span: 8,
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(SwimLane, {
                                                lane: SWIM_LANES[1],
                                                customers: customersByStage[SWIM_LANES[1].key] || [],
                                                onCardClick: handleCardClick,
                                                onMoveCustomer: handleMoveCustomer,
                                                visibleCount: visibleCounts[SWIM_LANES[1].key] || 5,
                                                onLoadMore: ()=>loadMoreCustomers(SWIM_LANES[1].key)
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                lineNumber: 823,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                            lineNumber: 822,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                            span: 8,
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(SwimLane, {
                                                lane: SWIM_LANES[2],
                                                customers: customersByStage[SWIM_LANES[2].key] || [],
                                                onCardClick: handleCardClick,
                                                onMoveCustomer: handleMoveCustomer,
                                                visibleCount: visibleCounts[SWIM_LANES[2].key] || 5,
                                                onLoadMore: ()=>loadMoreCustomers(SWIM_LANES[2].key)
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                lineNumber: 833,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                            lineNumber: 832,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                    lineNumber: 811,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        textAlign: 'center',
                                        marginBottom: 24
                                    },
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ArrowDownOutlined, {
                                        style: {
                                            fontSize: 24,
                                            color: '#1890ff'
                                        }
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                        lineNumber: 846,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                    lineNumber: 845,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                                    gutter: 16,
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                            span: 8,
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(SwimLane, {
                                                lane: SWIM_LANES[3],
                                                customers: customersByStage[SWIM_LANES[3].key] || [],
                                                onCardClick: handleCardClick,
                                                onMoveCustomer: handleMoveCustomer,
                                                visibleCount: visibleCounts[SWIM_LANES[3].key] || 5,
                                                onLoadMore: ()=>loadMoreCustomers(SWIM_LANES[3].key)
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                lineNumber: 852,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                            lineNumber: 851,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                            span: 8,
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(SwimLane, {
                                                lane: SWIM_LANES[4],
                                                customers: customersByStage[SWIM_LANES[4].key] || [],
                                                onCardClick: handleCardClick,
                                                onMoveCustomer: handleMoveCustomer,
                                                visibleCount: visibleCounts[SWIM_LANES[4].key] || 5,
                                                onLoadMore: ()=>loadMoreCustomers(SWIM_LANES[4].key)
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                lineNumber: 862,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                            lineNumber: 861,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                            span: 8,
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(SwimLane, {
                                                lane: SWIM_LANES[5],
                                                customers: customersByStage[SWIM_LANES[5].key] || [],
                                                onCardClick: handleCardClick,
                                                onMoveCustomer: handleMoveCustomer,
                                                visibleCount: visibleCounts[SWIM_LANES[5].key] || 5,
                                                onLoadMore: ()=>loadMoreCustomers(SWIM_LANES[5].key)
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                lineNumber: 872,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                            lineNumber: 871,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                    lineNumber: 850,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                            lineNumber: 809,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            title: "客户列表",
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Table, {
                                columns: listColumns,
                                dataSource: filteredCustomers,
                                rowKey: "id",
                                pagination: {
                                    pageSize: 10
                                }
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                lineNumber: 885,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                            lineNumber: 884,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                        lineNumber: 807,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                    lineNumber: 805,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Drawer, {
                    title: selectedCustomer === null || selectedCustomer === void 0 ? void 0 : selectedCustomer.name,
                    placement: "right",
                    width: 600,
                    onClose: ()=>setDrawerVisible(false),
                    open: drawerVisible,
                    children: selectedCustomer && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                title: "基本信息",
                                size: "small",
                                style: {
                                    marginBottom: '16px'
                                },
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                                    gutter: 16,
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                            span: 12,
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("strong", {
                                                            children: "行业:"
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                            lineNumber: 912,
                                                            columnNumber: 26
                                                        }, this),
                                                        " ",
                                                        selectedCustomer.industry
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                    lineNumber: 912,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("strong", {
                                                            children: "风险等级:"
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                            lineNumber: 913,
                                                            columnNumber: 26
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                            color: selectedCustomer.riskLevel === 'high' ? 'red' : selectedCustomer.riskLevel === 'medium' ? 'orange' : 'green',
                                                            children: selectedCustomer.riskLevel === 'high' ? '高风险' : selectedCustomer.riskLevel === 'medium' ? '中风险' : '低风险'
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                            lineNumber: 914,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                    lineNumber: 913,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                            lineNumber: 911,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                            span: 12,
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("strong", {
                                                            children: "流失前ARR:"
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                            lineNumber: 920,
                                                            columnNumber: 26
                                                        }, this),
                                                        " ¥",
                                                        selectedCustomer.preChurnARR.toLocaleString()
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                    lineNumber: 920,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("strong", {
                                                            children: "流失天数:"
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                            lineNumber: 921,
                                                            columnNumber: 26
                                                        }, this),
                                                        " ",
                                                        selectedCustomer.churnedDays,
                                                        "天"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                    lineNumber: 921,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                            lineNumber: 919,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                    lineNumber: 910,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                lineNumber: 909,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                title: "联系人",
                                size: "small",
                                style: {
                                    marginBottom: '16px'
                                },
                                children: selectedCustomer.contacts.map((contact, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            marginBottom: '8px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("strong", {
                                                        children: contact.name
                                                    }, void 0, false, {
                                                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                        lineNumber: 930,
                                                        columnNumber: 26
                                                    }, this),
                                                    " - ",
                                                    contact.role
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                lineNumber: 930,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    fontSize: '12px',
                                                    color: '#666'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PhoneOutlined, {}, void 0, false, {
                                                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                        lineNumber: 932,
                                                        columnNumber: 23
                                                    }, this),
                                                    " ",
                                                    contact.phone,
                                                    " | ",
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.MailOutlined, {}, void 0, false, {
                                                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                        lineNumber: 932,
                                                        columnNumber: 59
                                                    }, this),
                                                    " ",
                                                    contact.email
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                lineNumber: 931,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, index, true, {
                                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                        lineNumber: 929,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                lineNumber: 927,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                title: "流失分析",
                                size: "small",
                                style: {
                                    marginBottom: '16px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("strong", {
                                                children: "主要原因:"
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                lineNumber: 940,
                                                columnNumber: 22
                                            }, this),
                                            " ",
                                            selectedCustomer.churnAnalysis.primaryReason
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                        lineNumber: 940,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("strong", {
                                                children: "次要原因:"
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                lineNumber: 941,
                                                columnNumber: 22
                                            }, this),
                                            " ",
                                            selectedCustomer.churnAnalysis.secondaryReasons.join(', ')
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                        lineNumber: 941,
                                        columnNumber: 17
                                    }, this),
                                    selectedCustomer.churnAnalysis.competitorInfo && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("strong", {
                                                children: "竞品信息:"
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                lineNumber: 943,
                                                columnNumber: 24
                                            }, this),
                                            " ",
                                            selectedCustomer.churnAnalysis.competitorInfo
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                        lineNumber: 943,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("strong", {
                                                children: "客户反馈:"
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                lineNumber: 945,
                                                columnNumber: 22
                                            }, this),
                                            " ",
                                            selectedCustomer.churnAnalysis.customerFeedback
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                        lineNumber: 945,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                lineNumber: 939,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                title: "召回行动计划",
                                size: "small",
                                style: {
                                    marginBottom: '16px'
                                },
                                children: selectedCustomer.recallPlan.map((plan)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '8px 0',
                                            borderBottom: '1px solid #f0f0f0'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    flex: 1
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            textDecoration: plan.completed ? 'line-through' : 'none',
                                                            color: plan.completed ? '#999' : '#000'
                                                        },
                                                        children: plan.task
                                                    }, void 0, false, {
                                                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                        lineNumber: 959,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            fontSize: '12px',
                                                            color: '#666'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.CalendarOutlined, {}, void 0, false, {
                                                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                                lineNumber: 966,
                                                                columnNumber: 25
                                                            }, this),
                                                            " ",
                                                            plan.dueDate
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                        lineNumber: 965,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                lineNumber: 958,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                color: plan.completed ? 'green' : 'orange',
                                                children: plan.completed ? '已完成' : '进行中'
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                lineNumber: 969,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, plan.id, true, {
                                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                        lineNumber: 951,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                lineNumber: 949,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                title: "行动剧本 (Playbook)",
                                size: "small",
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                marginBottom: '12px',
                                                fontWeight: 'bold'
                                            },
                                            children: [
                                                "针对 ",
                                                selectedCustomer.name,
                                                " 的推荐剧本:"
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                            lineNumber: 979,
                                            columnNumber: 19
                                        }, this),
                                        ((_PLAYBOOK_TEMPLATES_selectedCustomer_churnReason = PLAYBOOK_TEMPLATES[selectedCustomer.churnReason]) === null || _PLAYBOOK_TEMPLATES_selectedCustomer_churnReason === void 0 ? void 0 : _PLAYBOOK_TEMPLATES_selectedCustomer_churnReason.map((template)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    marginBottom: '8px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                        type: "link",
                                                        size: "small",
                                                        style: {
                                                            padding: 0,
                                                            height: 'auto'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.FileTextOutlined, {}, void 0, false, {
                                                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                                lineNumber: 985,
                                                                columnNumber: 25
                                                            }, this),
                                                            " ",
                                                            template.title
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                        lineNumber: 984,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            fontSize: '12px',
                                                            color: '#666',
                                                            marginLeft: '16px'
                                                        },
                                                        children: template.type
                                                    }, void 0, false, {
                                                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                        lineNumber: 987,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, template.id, true, {
                                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                                lineNumber: 983,
                                                columnNumber: 21
                                            }, this))) || /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                            type: "secondary",
                                            children: "暂无相关剧本"
                                        }, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                            lineNumber: 992,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                    lineNumber: 978,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                                lineNumber: 977,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                        lineNumber: 907,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
                    lineNumber: 899,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
            lineNumber: 661,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/components/CustomerSuccess/RecallIncubationWorkbench.tsx",
        lineNumber: 660,
        columnNumber: 5
    }, this);
};
_s3(RecallIncubationWorkbench, "iZqrQYflpAaSs7OZ4kKtmu1kFcY=");
_c3 = RecallIncubationWorkbench;
var _default = RecallIncubationWorkbench;
var _c;
var _c1;
var _c2;
var _c3;
$RefreshReg$(_c, "CustomerCard");
$RefreshReg$(_c1, "AnimatedCountTag");
$RefreshReg$(_c2, "SwimLane");
$RefreshReg$(_c3, "RecallIncubationWorkbench");
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
const ValueLifecycleTab = ({ customers, onCustomerSelect, selectedMatrix, onMatrixSelect })=>{
    _s();
    const [selected, setSelected] = (0, _react.useState)(null);
    const [search, setSearch] = (0, _react.useState)('');
    const listRef = (0, _react.useRef)(null);
    const [listHighlight, setListHighlight] = (0, _react.useState)(false);
    const [flowFilter, setFlowFilter] = (0, _react.useState)('all');
    const highlightTimerRef = (0, _react.useRef)(null);
    const [bubbleTip, setBubbleTip] = (0, _react.useState)(null);
    const [sankeyTip, setSankeyTip] = (0, _react.useState)(null);
    // 字段显示控制状态
    const [visibleColumns, setVisibleColumns] = (0, _react.useState)({
        name: true,
        csm: true,
        valueScore: true,
        lifecycle: true,
        rAndM: true,
        f: true,
        serviceScore: true,
        riskEvents: true,
        upsellAmount: true,
        tags: true
    });
    // 坐标轴缩放相关状态
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
    // 坐标轴缩放控制函数
    const handleZoomIn = ()=>{
        const xCenter = (xAxisRange.min + xAxisRange.max) / 2;
        const yCenter = (yAxisRange.min + yAxisRange.max) / 2;
        const xRange = (xAxisRange.max - xAxisRange.min) * 0.7; // 缩小范围
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
        const xRange = (xAxisRange.max - xAxisRange.min) * 1.4; // 扩大范围
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
    // 坐标轴拖拽处理函数
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
            const deltaX = (e.clientX - dragStart.x) * 0.1; // 调整灵敏度
            const deltaY = (e.clientY - dragStart.y) * 0.1;
            const xRange = xAxisRange.max - xAxisRange.min;
            const yRange = yAxisRange.max - yAxisRange.min;
            let newXMin = xAxisRange.min - deltaX;
            let newXMax = xAxisRange.max - deltaX;
            let newYMin = yAxisRange.min + deltaY; // Y轴方向相反
            let newYMax = yAxisRange.max + deltaY;
            // 边界检查
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
        // 优先使用外部传入的selectedMatrix，如果没有则使用内部的selected
        const activeSelection = selectedMatrix || selected;
        if (activeSelection) list = list.filter((c)=>c.valueTier === activeSelection.valueTier && c.lifecycle === activeSelection.stage);
        if (search.trim()) {
            const k = search.trim();
            list = list.filter((c)=>c.name.includes(k) || c.csm.includes(k) || c.valueTier.includes(k) || c.lifecycle.includes(k));
        }
        return list;
    }, [
        selectedMatrix,
        selected,
        search,
        customers
    ]);
    const activeSelection = selectedMatrix || selected;
    const selectedTitle = activeSelection ? `${activeSelection.valueTier} · ${activeSelection.stage}` : '全部客户';
    // 聚合每个矩阵分群的数据：计数、均值与总ARR
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
        // 使用过滤后的客户数据进行聚合
        const activeSelection = selectedMatrix || selected;
        let dataSource = customers;
        if (activeSelection) dataSource = customers.filter((c)=>c.valueTier === activeSelection.valueTier && c.lifecycle === activeSelection.stage);
        for (const c of dataSource){
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
        selectedMatrix,
        selected,
        customers
    ]);
    const maxSegmentArr = (0, _react.useMemo)(()=>{
        return Math.max(1, ...Object.values(segmentAgg).map((s)=>s.totalArr));
    }, [
        segmentAgg
    ]);
    // 生成迁移数据
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
    const allColumns = [
        {
            title: '客户名称',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            width: 180,
            sorter: (a, b)=>a.name.localeCompare(b.name),
            render: (_, record)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                    children: record.name
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                    lineNumber: 345,
                    columnNumber: 9
                }, this)
        },
        {
            title: '客户成功',
            dataIndex: 'csm',
            key: 'csm',
            width: 120,
            align: 'center',
            sorter: (a, b)=>a.csm.localeCompare(b.csm)
        },
        {
            title: '价值总分',
            dataIndex: 'valueScore',
            key: 'valueScore',
            width: 140,
            align: 'center',
            sorter: (a, b)=>a.valueScore - b.valueScore,
            render: (v, record)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                            strong: true,
                            children: [
                                v,
                                "分"
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                            lineNumber: 365,
                            columnNumber: 11
                        }, this),
                        record.trend === 'up' ? /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ArrowUpOutlined, {
                            style: {
                                color: '#ff4d4f'
                            }
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                            lineNumber: 367,
                            columnNumber: 13
                        }, this) : record.trend === 'down' ? /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ArrowDownOutlined, {
                            style: {
                                color: '#1890ff'
                            }
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                            lineNumber: 369,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                            style: {
                                color: '#8c8c8c',
                                fontSize: '12px'
                            },
                            children: "—"
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                            lineNumber: 371,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                    lineNumber: 364,
                    columnNumber: 9
                }, this)
        },
        {
            title: '生命周期',
            dataIndex: 'lifecycle',
            key: 'lifecycle',
            width: 120,
            align: 'center',
            filters: lifecycleStages.map((s)=>({
                    text: s,
                    value: s
                })),
            onFilter: (value, record)=>record.lifecycle === value,
            render: (v)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                    color: lifecycleAccentColor[v],
                    style: {
                        borderColor: `${lifecycleAccentColor[v]}55`
                    },
                    children: v
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                    lineNumber: 385,
                    columnNumber: 9
                }, this)
        },
        {
            title: '财务价值 (R&M)',
            dataIndex: 'rAndM',
            key: 'rAndM',
            width: 150,
            align: 'center',
            sorter: (a, b)=>a.rAndM - b.rAndM
        },
        {
            title: '活跃度价值 (F)',
            dataIndex: 'f',
            key: 'f',
            width: 140,
            align: 'center',
            sorter: (a, b)=>a.f - b.f
        },
        {
            title: '服务交互值',
            dataIndex: 'serviceScore',
            key: 'serviceScore',
            width: 120,
            align: 'center',
            sorter: (a, b)=>a.serviceScore - b.serviceScore
        },
        {
            title: '近90天风险事件数',
            dataIndex: 'riskEvents',
            key: 'riskEvents',
            width: 160,
            align: 'center',
            sorter: (a, b)=>a.riskEvents - b.riskEvents,
            render: (v)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                    style: {
                        color: v > 0 ? '#ff4d4f' : '#52c41a'
                    },
                    children: v
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                    lineNumber: 422,
                    columnNumber: 9
                }, this)
        },
        {
            title: '近90天增购额',
            dataIndex: 'upsellAmount',
            key: 'upsellAmount',
            width: 140,
            align: 'center',
            sorter: (a, b)=>a.upsellAmount - b.upsellAmount,
            render: (v)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                    children: v > 0 ? `¥${(v / 10000).toFixed(1)}万` : '-'
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                    lineNumber: 433,
                    columnNumber: 9
                }, this)
        },
        {
            title: '标签',
            dataIndex: 'tags',
            key: 'tags',
            width: 200,
            align: 'center',
            render: (tags)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                    wrap: true,
                    children: [
                        tags.slice(0, 2).map((tag)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                children: tag
                            }, tag, false, {
                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                lineNumber: 445,
                                columnNumber: 13
                            }, this)),
                        tags.length > 2 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                            type: "secondary",
                            children: [
                                "+",
                                tags.length - 2
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                            lineNumber: 447,
                            columnNumber: 31
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                    lineNumber: 443,
                    columnNumber: 9
                }, this)
        }
    ];
    // 根据visibleColumns过滤显示的列
    const columns = allColumns.filter((col)=>visibleColumns[col.key]);
    // 字段设置菜单项
    const columnSettingsItems = allColumns.map((col)=>({
            key: col.key,
            label: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                checked: visibleColumns[col.key],
                onChange: (e)=>{
                    setVisibleColumns((prev)=>({
                            ...prev,
                            [col.key]: e.target.checked
                        }));
                },
                children: col.title
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                lineNumber: 460,
                columnNumber: 7
            }, this)
        }));
    const headerTitle = selected ? `客户列表 - ${selected.valueTier} & ${selected.stage} (${filteredCustomers.length})` : `客户列表 - 全部客户 (${filteredCustomers.length})`;
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                style: {
                    ...cardStyle,
                    marginTop: 16,
                    marginBottom: 16
                },
                bodyStyle: {
                    padding: 16
                },
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            marginBottom: 8,
                            display: 'flex',
                            alignItems: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                type: "secondary",
                                children: "当前筛选："
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                lineNumber: 483,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                strong: true,
                                style: {
                                    marginLeft: 8
                                },
                                children: selectedTitle
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                lineNumber: 484,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                        lineNumber: 482,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                        gutter: [
                            12,
                            12
                        ],
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                span: 4
                            }, void 0, false, {
                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                lineNumber: 488,
                                columnNumber: 11
                            }, this),
                            lifecycleStages.map((stage)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                    span: 5,
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center'
                                    },
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Badge, {
                                                color: lifecycleAccentColor[stage]
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                lineNumber: 492,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                style: {
                                                    color: '#262626',
                                                    fontWeight: 500
                                                },
                                                children: stage
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                lineNumber: 493,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                        lineNumber: 491,
                                        columnNumber: 15
                                    }, this)
                                }, stage, false, {
                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                    lineNumber: 490,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                        lineNumber: 486,
                        columnNumber: 9
                    }, this),
                    valueTiers.map((tier)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                            gutter: [
                                12,
                                10
                            ],
                            align: "middle",
                            style: {
                                marginTop: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                    span: 4,
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                style: {
                                                    fontWeight: 600,
                                                    color: '#1f1f1f'
                                                },
                                                children: tier
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                lineNumber: 502,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                                title: valueTierScoreHint[tier],
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.QuestionCircleOutlined, {
                                                    style: {
                                                        color: '#8c8c8c'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                    lineNumber: 504,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                lineNumber: 503,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                        lineNumber: 501,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                    lineNumber: 500,
                                    columnNumber: 13
                                }, this),
                                lifecycleStages.map((stage)=>{
                                    const activeSelection = selectedMatrix || selected;
                                    const isSelected = !!activeSelection && activeSelection.valueTier === tier && activeSelection.stage === stage;
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
                                    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                        span: 5,
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                ...getCellStyle(tier, stage, isSelected),
                                                position: 'relative'
                                            },
                                            onClick: ()=>{
                                                const selection = {
                                                    valueTier: tier,
                                                    stage
                                                };
                                                setSelected(selection);
                                                onMatrixSelect === null || onMatrixSelect === void 0 || onMatrixSelect(selection);
                                            },
                                            onMouseEnter: (e)=>e.currentTarget.style.boxShadow = `0 4px 12px rgba(0,0,0,0.08), 0 0 0 3px ${lifecycleAccentColor[stage]}11`,
                                            onMouseLeave: (e)=>e.currentTarget.style.boxShadow = isSelected ? `0 0 0 3px ${lifecycleAccentColor[stage]}22` : 'none',
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
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
                                                            lineNumber: 530,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 8
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Badge, {
                                                                    color: lifecycleAccentColor[stage]
                                                                }, void 0, false, {
                                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                                    lineNumber: 532,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Dropdown, {
                                                                    trigger: [
                                                                        'click'
                                                                    ],
                                                                    menu: {
                                                                        items: menuItems,
                                                                        onClick: ({ key })=>{
                                                                            const selection = {
                                                                                valueTier: tier,
                                                                                stage
                                                                            };
                                                                            setSelected(selection);
                                                                            onMatrixSelect === null || onMatrixSelect === void 0 || onMatrixSelect(selection);
                                                                            if (key === 'list') scrollToListAndHighlight();
                                                                        }
                                                                    },
                                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.MoreOutlined, {
                                                                        style: {
                                                                            color: '#8c8c8c'
                                                                        },
                                                                        onClick: (ev)=>ev.stopPropagation()
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                                        lineNumber: 547,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                                    lineNumber: 533,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                            lineNumber: 531,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                    lineNumber: 529,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        marginTop: 6,
                                                        fontSize: 24,
                                                        fontWeight: 700,
                                                        color: '#2f54eb'
                                                    },
                                                    children: count
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                    lineNumber: 551,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        marginTop: 2,
                                                        fontSize: 12,
                                                        color: '#8c8c8c'
                                                    },
                                                    children: "客户数"
                                                }, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                    lineNumber: 552,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                            lineNumber: 519,
                                            columnNumber: 19
                                        }, this)
                                    }, `${tier}-${stage}`, false, {
                                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                        lineNumber: 518,
                                        columnNumber: 17
                                    }, this);
                                })
                            ]
                        }, tier, true, {
                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                            lineNumber: 499,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                lineNumber: 481,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                gutter: 16,
                style: {
                    marginBottom: 16
                },
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        xs: 24,
                        lg: 12,
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            style: {
                                ...cardStyle
                            },
                            title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                        style: {
                                            fontWeight: 600
                                        },
                                        children: "分层散点/气泡图"
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                        lineNumber: 569,
                                        columnNumber: 17
                                    }, void 0),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                type: "text",
                                                size: "small",
                                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ZoomInOutlined, {}, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                    lineNumber: 574,
                                                    columnNumber: 27
                                                }, void 0),
                                                onClick: handleZoomIn,
                                                disabled: xAxisRange.max - xAxisRange.min <= 10 || yAxisRange.max - yAxisRange.min <= 10
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                lineNumber: 571,
                                                columnNumber: 19
                                            }, void 0),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                type: "text",
                                                size: "small",
                                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ZoomOutOutlined, {}, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                    lineNumber: 581,
                                                    columnNumber: 27
                                                }, void 0),
                                                onClick: handleZoomOut,
                                                disabled: xAxisRange.min === 0 && xAxisRange.max === 100 && yAxisRange.min === 0 && yAxisRange.max === 100
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                lineNumber: 578,
                                                columnNumber: 19
                                            }, void 0),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                type: "text",
                                                size: "small",
                                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UndoOutlined, {}, void 0, false, {
                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                    lineNumber: 588,
                                                    columnNumber: 27
                                                }, void 0),
                                                onClick: handleResetZoom,
                                                disabled: xAxisRange.min === 0 && xAxisRange.max === 100 && yAxisRange.min === 0 && yAxisRange.max === 100
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                lineNumber: 585,
                                                columnNumber: 19
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                        lineNumber: 570,
                                        columnNumber: 17
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                lineNumber: 568,
                                columnNumber: 15
                            }, void 0),
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    width: '100%',
                                    height: 280,
                                    position: 'relative',
                                    overflow: 'hidden',
                                    cursor: xAxisRange.min > 0 || xAxisRange.max < 100 || yAxisRange.min > 0 || yAxisRange.max < 100 ? isDragging ? 'grabbing' : 'grab' : 'default'
                                },
                                onMouseDown: handleMouseDown,
                                onMouseMove: handleMouseMove,
                                onMouseUp: handleMouseUp,
                                onMouseLeave: handleMouseUp,
                                children: [
                                    (bubbleTip === null || bubbleTip === void 0 ? void 0 : bubbleTip.visible) && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
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
                                        lineNumber: 610,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("svg", {
                                        viewBox: "0 0 420 200",
                                        preserveAspectRatio: "none",
                                        style: {
                                            width: '100%',
                                            height: '100%'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("line", {
                                                x1: "40",
                                                y1: "10",
                                                x2: "40",
                                                y2: "170",
                                                stroke: "#d9d9d9"
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                lineNumber: 623,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("line", {
                                                x1: "40",
                                                y1: "170",
                                                x2: "400",
                                                y2: "170",
                                                stroke: "#d9d9d9"
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                lineNumber: 624,
                                                columnNumber: 17
                                            }, this),
                                            Array.from({
                                                length: 6
                                            }).map((_, i)=>{
                                                const v = yAxisRange.min + i * (yAxisRange.max - yAxisRange.min) / 5;
                                                const y = 170 - i / 5 * 150;
                                                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("g", {
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("line", {
                                                            x1: "36",
                                                            y1: y,
                                                            x2: "40",
                                                            y2: y,
                                                            stroke: "#d9d9d9"
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                            lineNumber: 631,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("text", {
                                                            x: "10",
                                                            y: y + 4,
                                                            fontSize: "10",
                                                            fill: "#8c8c8c",
                                                            children: Math.round(v)
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                            lineNumber: 632,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                    lineNumber: 630,
                                                    columnNumber: 21
                                                }, this);
                                            }),
                                            Array.from({
                                                length: 6
                                            }).map((_, i)=>{
                                                const v = xAxisRange.min + i * (xAxisRange.max - xAxisRange.min) / 5;
                                                const x = 40 + i / 5 * 360;
                                                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("g", {
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("line", {
                                                            x1: x,
                                                            y1: "170",
                                                            x2: x,
                                                            y2: "174",
                                                            stroke: "#d9d9d9"
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                            lineNumber: 642,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("text", {
                                                            x: x,
                                                            y: "188",
                                                            fontSize: "10",
                                                            fill: "#8c8c8c",
                                                            textAnchor: "middle",
                                                            children: Math.round(v)
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                            lineNumber: 643,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                    lineNumber: 641,
                                                    columnNumber: 21
                                                }, this);
                                            }),
                                            Object.values(segmentAgg).map((s)=>{
                                                if (s.count === 0) return null;
                                                // 检查气泡是否在当前视图范围内
                                                if (s.avgHealth < xAxisRange.min || s.avgHealth > xAxisRange.max || s.avgActive < yAxisRange.min || s.avgActive > yAxisRange.max) return null;
                                                const x = 40 + (s.avgHealth - xAxisRange.min) / (xAxisRange.max - xAxisRange.min) * 360;
                                                const y = 170 - (s.avgActive - yAxisRange.min) / (yAxisRange.max - yAxisRange.min) * 150;
                                                const r = 6 + s.totalArr / maxSegmentArr * 16;
                                                const color = lifecycleAccentColor[s.stage];
                                                const html = /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                fontWeight: 600,
                                                                marginBottom: 4
                                                            },
                                                            children: `${s.valueTier} - ${s.stage}`
                                                        }, void 0, false, {
                                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                            lineNumber: 664,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            children: [
                                                                "客户数：",
                                                                s.count
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                            lineNumber: 665,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            children: [
                                                                "总ARR：¥",
                                                                (s.totalArr / 10000).toFixed(1),
                                                                "万"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                            lineNumber: 666,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            children: [
                                                                "平均健康分：",
                                                                s.avgHealth
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                            lineNumber: 667,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            children: [
                                                                "平均活跃度：",
                                                                s.avgActive
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                            lineNumber: 668,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                    lineNumber: 663,
                                                    columnNumber: 23
                                                }, this);
                                                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("circle", {
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
                                                    onClick: ()=>{
                                                        const selection = {
                                                            valueTier: s.valueTier,
                                                            stage: s.stage
                                                        };
                                                        setSelected(selection);
                                                        onMatrixSelect === null || onMatrixSelect === void 0 || onMatrixSelect(selection);
                                                    },
                                                    style: {
                                                        cursor: 'pointer'
                                                    }
                                                }, s.key, false, {
                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                    lineNumber: 672,
                                                    columnNumber: 23
                                                }, this);
                                            }),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("text", {
                                                x: "220",
                                                y: "210",
                                                textAnchor: "middle",
                                                fontSize: "12",
                                                fill: "#595959",
                                                children: [
                                                    "客户健康度 (",
                                                    Math.round(xAxisRange.min),
                                                    "-",
                                                    Math.round(xAxisRange.max),
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                lineNumber: 700,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("text", {
                                                x: "8",
                                                y: "12",
                                                textAnchor: "start",
                                                fontSize: "12",
                                                fill: "#595959",
                                                children: [
                                                    "价值分 (",
                                                    Math.round(yAxisRange.min),
                                                    "-",
                                                    Math.round(yAxisRange.max),
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                lineNumber: 701,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                        lineNumber: 614,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                lineNumber: 596,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                            lineNumber: 565,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                        lineNumber: 564,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        xs: 24,
                        lg: 12,
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            style: {
                                ...cardStyle
                            },
                            title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                        style: {
                                            fontWeight: 600
                                        },
                                        children: "迁移流向图 (上季→本季)"
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                        lineNumber: 711,
                                        columnNumber: 15
                                    }, void 0),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                        size: "small",
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                size: "small",
                                                type: flowFilter === 'all' ? 'primary' : 'default',
                                                onClick: ()=>setFlowFilter('all'),
                                                children: "全部"
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                lineNumber: 713,
                                                columnNumber: 17
                                            }, void 0),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                size: "small",
                                                type: flowFilter === 'inflow' ? 'primary' : 'default',
                                                onClick: ()=>setFlowFilter('inflow'),
                                                children: "流入"
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                lineNumber: 720,
                                                columnNumber: 17
                                            }, void 0),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                size: "small",
                                                type: flowFilter === 'outflow' ? 'primary' : 'default',
                                                onClick: ()=>setFlowFilter('outflow'),
                                                children: "流出"
                                            }, void 0, false, {
                                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                lineNumber: 727,
                                                columnNumber: 17
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                        lineNumber: 712,
                                        columnNumber: 15
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                lineNumber: 710,
                                columnNumber: 13
                            }, void 0),
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    width: '100%',
                                    height: 280,
                                    position: 'relative'
                                },
                                children: [
                                    (sankeyTip === null || sankeyTip === void 0 ? void 0 : sankeyTip.visible) && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
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
                                        lineNumber: 739,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("svg", {
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
                                            // 使用之前的迁移数据构造流
                                            const allFlows = [
                                                {
                                                    from: '低价值',
                                                    to: '中价值',
                                                    value: tierMigration.up_l2m,
                                                    color: '#5B8FF9',
                                                    type: 'inflow'
                                                },
                                                {
                                                    from: '中价值',
                                                    to: '高价值',
                                                    value: tierMigration.up_m2h,
                                                    color: '#5AD8A6',
                                                    type: 'inflow'
                                                },
                                                {
                                                    from: '低价值',
                                                    to: '低价值',
                                                    value: tierMigration.same_l,
                                                    color: '#B37FEB',
                                                    type: 'same'
                                                },
                                                {
                                                    from: '中价值',
                                                    to: '中价值',
                                                    value: tierMigration.same_m,
                                                    color: '#FF9D4D',
                                                    type: 'same'
                                                },
                                                {
                                                    from: '高价值',
                                                    to: '高价值',
                                                    value: tierMigration.same_h,
                                                    color: '#CDDDFD',
                                                    type: 'same'
                                                },
                                                {
                                                    from: '高价值',
                                                    to: '中价值',
                                                    value: tierMigration.down_h2m,
                                                    color: '#F4664A',
                                                    type: 'outflow'
                                                },
                                                {
                                                    from: '中价值',
                                                    to: '低价值',
                                                    value: tierMigration.down_m2l,
                                                    color: '#D3F261',
                                                    type: 'outflow'
                                                }
                                            ];
                                            // 根据过滤条件筛选流向
                                            const flows = allFlows.filter((flow)=>{
                                                if (flowFilter === 'all') return true;
                                                if (flowFilter === 'inflow') return flow.type === 'inflow';
                                                if (flowFilter === 'outflow') return flow.type === 'outflow';
                                                return true;
                                            });
                                            const maxFlow = Math.max(1, ...flows.map((f)=>f.value));
                                            const strokeScale = (v)=>2 + v / maxFlow * 14;
                                            function pathD(y1, y2) {
                                                const cx1 = 160;
                                                const cx2 = 260;
                                                return `M ${leftX} ${y1} C ${cx1} ${y1}, ${cx2} ${y2}, ${rightX} ${y2}`;
                                            }
                                            return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("g", {
                                                children: [
                                                    tiers.map((t)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("g", {
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("rect", {
                                                                    x: leftX - 32,
                                                                    y: positions[`L-${t}`] - 18,
                                                                    width: 64,
                                                                    height: 36,
                                                                    rx: 6,
                                                                    fill: "#f5f5f5",
                                                                    stroke: "#d9d9d9"
                                                                }, void 0, false, {
                                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                                    lineNumber: 782,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("text", {
                                                                    x: leftX - 36,
                                                                    y: positions[`L-${t}`] - 2,
                                                                    fontSize: "12",
                                                                    textAnchor: "end",
                                                                    fill: "#595959",
                                                                    children: "上季度"
                                                                }, void 0, false, {
                                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                                    lineNumber: 783,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("text", {
                                                                    x: leftX - 36,
                                                                    y: positions[`L-${t}`] + 12,
                                                                    fontSize: "12",
                                                                    textAnchor: "end",
                                                                    fill: "#595959",
                                                                    children: t
                                                                }, void 0, false, {
                                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                                    lineNumber: 784,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, `node-left-${t}`, true, {
                                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                            lineNumber: 781,
                                                            columnNumber: 25
                                                        }, this)),
                                                    tiers.map((t)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("g", {
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("rect", {
                                                                    x: rightX - 32,
                                                                    y: positions[`R-${t}`] - 18,
                                                                    width: 64,
                                                                    height: 36,
                                                                    rx: 6,
                                                                    fill: "#f5f5f5",
                                                                    stroke: "#d9d9d9"
                                                                }, void 0, false, {
                                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                                    lineNumber: 789,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("text", {
                                                                    x: rightX + 36,
                                                                    y: positions[`R-${t}`] - 2,
                                                                    fontSize: "12",
                                                                    textAnchor: "start",
                                                                    fill: "#595959",
                                                                    children: "本季度"
                                                                }, void 0, false, {
                                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                                    lineNumber: 790,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("text", {
                                                                    x: rightX + 36,
                                                                    y: positions[`R-${t}`] + 12,
                                                                    fontSize: "12",
                                                                    textAnchor: "start",
                                                                    fill: "#595959",
                                                                    children: t
                                                                }, void 0, false, {
                                                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                                    lineNumber: 791,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, `node-right-${t}`, true, {
                                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                            lineNumber: 788,
                                                            columnNumber: 25
                                                        }, this)),
                                                    flows.map((f, idx)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("path", {
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
                                                            lineNumber: 796,
                                                            columnNumber: 25
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                                lineNumber: 778,
                                                columnNumber: 21
                                            }, this);
                                        })()
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                        lineNumber: 743,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                lineNumber: 737,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                            lineNumber: 709,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                        lineNumber: 708,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                lineNumber: 562,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                ref: listRef,
                style: {
                    ...cardStyle,
                    boxShadow: listHighlight ? '0 0 0 3px #1890ff33, 0 6px 20px rgba(0,0,0,0.08)' : cardStyle.boxShadow,
                    border: listHighlight ? '1px solid #91caff' : cardStyle.border,
                    transition: 'box-shadow 0.3s ease, border-color 0.3s ease'
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
                            children: headerTitle
                        }, void 0, false, {
                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                            lineNumber: 836,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Dropdown, {
                                    menu: {
                                        items: columnSettingsItems
                                    },
                                    trigger: [
                                        'click'
                                    ],
                                    placement: "bottomRight",
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.SettingOutlined, {}, void 0, false, {
                                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                            lineNumber: 843,
                                            columnNumber: 31
                                        }, void 0),
                                        type: "text",
                                        children: "字段设置"
                                    }, void 0, false, {
                                        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                        lineNumber: 843,
                                        columnNumber: 17
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                    lineNumber: 838,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input.Search, {
                                    allowClear: true,
                                    placeholder: "搜索客户/CSM/标签...",
                                    style: {
                                        width: 320
                                    },
                                    onSearch: (v)=>setSearch(v),
                                    onChange: (e)=>setSearch(e.target.value)
                                }, void 0, false, {
                                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                                    lineNumber: 847,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                            lineNumber: 837,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                    lineNumber: 835,
                    columnNumber: 11
                }, void 0),
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Table, {
                    rowKey: "id",
                    dataSource: filteredCustomers,
                    columns: columns,
                    pagination: {
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range)=>`共 ${total} 条记录，当前显示 ${range[0]}-${range[1]} 条`,
                        pageSizeOptions: [
                            '10',
                            '20',
                            '50',
                            '100'
                        ],
                        showLessItems: true
                    },
                    scroll: {
                        x: 1500
                    },
                    onRow: (record)=>({
                            onClick: ()=>onCustomerSelect === null || onCustomerSelect === void 0 ? void 0 : onCustomerSelect(record),
                            style: {
                                cursor: 'pointer'
                            }
                        })
                }, void 0, false, {
                    fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                    lineNumber: 858,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
                lineNumber: 824,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/components/CustomerSuccess/ValueLifecycleTab.tsx",
        lineNumber: 479,
        columnNumber: 5
    }, this);
};
_s(ValueLifecycleTab, "+n9rdq/7Jmr5F3aingrOzc8g1XM=");
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
"src/mock/customerData.ts": function (module, exports, __mako_require__){
// 统一的客户mock数据源
// 包含不同生命周期的完整客户档案
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
    generateUnifiedCustomerData: function() {
        return generateUnifiedCustomerData;
    },
    unifiedCustomerData: function() {
        return unifiedCustomerData;
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
const generateUnifiedCustomerData = ()=>{
    const industries = [
        '制造业',
        '金融',
        '零售',
        '医疗',
        '教育',
        '政府',
        '科技',
        '房地产',
        '物流',
        '能源'
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
        '孙八',
        '周九',
        '吴十'
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
        '云原生',
        '高增长',
        '稳定客户',
        '重点关注',
        '续约风险',
        '扩展机会'
    ];
    const companyNames = [
        '阿里巴巴集团',
        '腾讯科技',
        '字节跳动',
        '美团点评',
        '滴滴出行',
        '小米科技',
        '百度集团',
        '网易公司',
        '京东科技',
        '拼多多',
        '哔哩哔哩',
        '快手科技',
        '携程旅行',
        '小红书',
        '华为云',
        'OPPO',
        'vivo',
        '海尔智家',
        '隆基绿能',
        '比亚迪',
        '蔚来汽车',
        '理想汽车',
        '小鹏汽车',
        '同程旅行',
        '去哪儿',
        '中国平安',
        '招商银行',
        '工商银行',
        '建设银行',
        '中国银行',
        '农业银行',
        '交通银行',
        '浦发银行',
        '万科集团',
        '恒大集团',
        '碧桂园',
        '保利发展',
        '中海地产',
        '华润置地',
        '龙湖集团',
        '融创中国',
        '顺丰控股',
        '圆通速递',
        '申通快递',
        '韵达股份',
        '中通快递',
        '德邦物流',
        '京东物流',
        '菜鸟网络',
        '中石油',
        '中石化',
        '中海油',
        '国家电网',
        '南方电网',
        '华能集团',
        '大唐集团',
        '华电集团'
    ];
    const mockCustomers = [];
    // 确保每个生命周期都有足够的客户
    const customersPerLifecycle = Math.floor(500 / lifecycles.length);
    for(let lifecycleIndex = 0; lifecycleIndex < lifecycles.length; lifecycleIndex++){
        const lifecycle = lifecycles[lifecycleIndex];
        const startIndex = lifecycleIndex * customersPerLifecycle;
        const endIndex = lifecycleIndex === lifecycles.length - 1 ? 500 : (lifecycleIndex + 1) * customersPerLifecycle;
        for(let i = startIndex; i < endIndex; i++){
            const industry = industries[Math.floor(Math.random() * industries.length)];
            const size = sizes[Math.floor(Math.random() * sizes.length)];
            const region = regions[Math.floor(Math.random() * regions.length)];
            const csm = csms[Math.floor(Math.random() * csms.length)];
            const channelType = channelTypes[Math.floor(Math.random() * channelTypes.length)];
            const isChannelCustomer = Math.random() > 0.6;
            const isKeyAccount = Math.random() > 0.8;
            const isInRenewalWindow = Math.random() > 0.7;
            // 根据生命周期调整各项指标的分布
            let valueScore;
            let healthScore;
            let riskLevel;
            let arr;
            switch(lifecycle){
                case 'import':
                    valueScore = Math.floor(Math.random() * 40) + 30; // 30-70
                    healthScore = Math.floor(Math.random() * 30) + 40; // 40-70
                    riskLevel = Math.random() > 0.7 ? 'attention' : Math.random() > 0.9 ? 'risk' : 'safe';
                    arr = Math.floor(Math.random() * 300000) + 50000; // 5万-35万
                    break;
                case 'growth':
                    valueScore = Math.floor(Math.random() * 40) + 50; // 50-90
                    healthScore = Math.floor(Math.random() * 30) + 60; // 60-90
                    riskLevel = Math.random() > 0.8 ? 'attention' : Math.random() > 0.95 ? 'risk' : 'safe';
                    arr = Math.floor(Math.random() * 500000) + 100000; // 10万-60万
                    break;
                case 'mature':
                    valueScore = Math.floor(Math.random() * 30) + 60; // 60-90
                    healthScore = Math.floor(Math.random() * 40) + 50; // 50-90
                    riskLevel = Math.random() > 0.85 ? 'attention' : Math.random() > 0.97 ? 'risk' : 'safe';
                    arr = Math.floor(Math.random() * 800000) + 200000; // 20万-100万
                    break;
                case 'decline':
                    valueScore = Math.floor(Math.random() * 50) + 20; // 20-70
                    healthScore = Math.floor(Math.random() * 50) + 20; // 20-70
                    riskLevel = Math.random() > 0.4 ? 'risk' : Math.random() > 0.7 ? 'attention' : 'safe';
                    arr = Math.floor(Math.random() * 400000) + 30000; // 3万-43万
                    break;
                default:
                    valueScore = Math.floor(Math.random() * 100) + 1;
                    healthScore = Math.floor(Math.random() * 100) + 1;
                    riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];
                    arr = Math.floor(Math.random() * 1000000) + 50000;
            }
            const rScore = Math.floor(Math.random() * 100) + 1;
            const fScore = Math.floor(Math.random() * 100) + 1;
            const mScore = Math.floor(Math.random() * 100) + 1;
            // 生成客户标签
            const customerTags = [];
            const tagCount = Math.floor(Math.random() * 4) + 1;
            for(let j = 0; j < tagCount; j++){
                const tag = tags[Math.floor(Math.random() * tags.length)];
                if (!customerTags.includes(tag)) customerTags.push(tag);
            }
            const signDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0];
            const visits90Days = Math.floor(Math.random() * 20);
            const revenue90Days = Math.floor(Math.random() * 100000);
            const collaborationEvents = Math.floor(Math.random() * 30);
            // 生成洞察数据
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
            // 价值×生命周期专用字段
            const logoColor = '#1890ff';
            const trend = valueScore > 75 ? 'up' : valueScore < 40 ? 'down' : 'flat';
            const valueTier = valueScore >= 80 ? '高价值' : valueScore >= 50 ? '中价值' : '低价值';
            const rAndM = rScore + mScore;
            const f = fScore;
            const serviceScore = Math.round(collaborationEvents / 30 * 100);
            const riskEvents = riskLevel === 'risk' ? Math.floor(Math.random() * 8) + 3 : riskLevel === 'attention' ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 2);
            const upsellAmount = revenue90Days;
            mockCustomers.push({
                id: `customer-${i + 1}`,
                name: companyNames[i % companyNames.length],
                industry,
                size,
                csm,
                region,
                isChannelCustomer,
                arr,
                valueScore,
                lifecycle,
                healthScore,
                rScore,
                fScore,
                mScore,
                riskLevel,
                signDate,
                tags: customerTags,
                collaborationEvents,
                channelType,
                isKeyAccount,
                isInRenewalWindow,
                visits90Days,
                revenue90Days,
                insights,
                nextAction,
                // 价值×生命周期专用字段
                logoColor,
                trend,
                valueTier,
                rAndM,
                f,
                serviceScore,
                riskEvents,
                upsellAmount
            });
        }
    }
    return mockCustomers;
};
// 导出统一的客户数据 - 使用固定种子确保数据一致性
let cachedCustomerData = null;
const unifiedCustomerData = (()=>{
    if (cachedCustomerData) return cachedCustomerData;
    // 使用固定种子生成一致的数据
    const originalRandom = Math.random;
    let seed = 12345; // 固定种子
    Math.random = ()=>{
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };
    cachedCustomerData = generateUnifiedCustomerData();
    // 恢复原始随机函数
    Math.random = originalRandom;
    return cachedCustomerData;
})();
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
    // 基于时间和用户名选择固定的鼓励话语
    const encouragementIndex = (new Date().getDate() + userName.length) % encouragements.length;
    const randomEncouragement = encouragements[encouragementIndex];
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
                lineNumber: 147,
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
                lineNumber: 148,
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
                lineNumber: 149,
                columnNumber: 33
            }, this),
            url: '#',
            color: '#722ed1'
        },
        {
            id: 4,
            name: '对客物料',
            icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.FileTextOutlined, {}, void 0, false, {
                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                lineNumber: 150,
                columnNumber: 34
            }, this),
            url: '#',
            color: '#fa8c16'
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
                        lineNumber: 162,
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
                        lineNumber: 165,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                lineNumber: 161,
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
                                lineNumber: 174,
                                columnNumber: 13
                            }, this)
                        }, link.id, false, {
                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                            lineNumber: 173,
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
                                lineNumber: 200,
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
                            lineNumber: 196,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                        lineNumber: 195,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
        lineNumber: 154,
        columnNumber: 5
    }, this);
};
_s(HeaderSection, "WCcLgd9U5s2/mVXVSzwakaclabM=");
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
                            lineNumber: 227,
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
                            lineNumber: 228,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                    lineNumber: 226,
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
                                    lineNumber: 234,
                                    columnNumber: 17
                                }, void 0))
                        }, void 0, false, {
                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                            lineNumber: 232,
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
                                    lineNumber: 262,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ArrowRightOutlined, {
                                    style: {
                                        margin: '0 8px',
                                        fontSize: '10px'
                                    }
                                }, void 0, false, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 263,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                    children: "2025-12-31"
                                }, void 0, false, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 264,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.CalendarOutlined, {
                                    style: {
                                        marginLeft: '8px',
                                        fontSize: '12px'
                                    }
                                }, void 0, false, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 265,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                            lineNumber: 252,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                    lineNumber: 230,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
            lineNumber: 225,
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
                                lineNumber: 274,
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
                                lineNumber: 277,
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
                                        lineNumber: 279,
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
                                        lineNumber: 280,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 278,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                        lineNumber: 273,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                    lineNumber: 272,
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
                                lineNumber: 287,
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
                                lineNumber: 290,
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
                                        lineNumber: 292,
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
                                        lineNumber: 293,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 291,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                        lineNumber: 286,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                    lineNumber: 285,
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
                                    color: '#fa8c16',
                                    marginBottom: '8px'
                                },
                                children: "¥2,850万"
                            }, void 0, false, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 300,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                type: "secondary",
                                style: {
                                    fontSize: '14px'
                                },
                                children: "业绩额"
                            }, void 0, false, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 303,
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
                                        lineNumber: 305,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                        style: {
                                            color: '#52c41a',
                                            fontSize: '12px'
                                        },
                                        children: "+12.3%"
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 306,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 304,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                        lineNumber: 299,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                    lineNumber: 298,
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
                                    color: '#722ed1',
                                    marginBottom: '8px'
                                },
                                children: "¥1,250万"
                            }, void 0, false, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 313,
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
                                lineNumber: 316,
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
                                        lineNumber: 318,
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
                                        lineNumber: 319,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 317,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                        lineNumber: 312,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                    lineNumber: 311,
                    columnNumber: 9
                }, this),
                false
            ]
        }, void 0, true, {
            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
            lineNumber: 271,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
        lineNumber: 219,
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
                contractSignDate: '2023-02-28',
                tianyuanSubmitDate: '2023-03-05',
                saasAmount: '¥350,000',
                valueAddedAmount: '¥100,000'
            },
            {
                id: 5,
                customer: '滴滴出行',
                contractSignDate: '2023-03-15',
                tianyuanSubmitDate: '2023-03-20',
                saasAmount: '¥250,000',
                valueAddedAmount: '¥70,000'
            },
            {
                id: 6,
                customer: '小米科技',
                contractSignDate: '2023-03-30',
                tianyuanSubmitDate: '2023-04-02',
                saasAmount: '¥200,000',
                valueAddedAmount: '¥80,000'
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
        ],
        customerVisits: [
            {
                id: 13,
                customer: '腾讯科技',
                visitDate: '2024-01-15',
                visitType: '季度回顾',
                status: 'scheduled',
                priority: 'high'
            },
            {
                id: 14,
                customer: '阿里巴巴',
                visitDate: '2024-01-18',
                visitType: '产品演示',
                status: 'confirmed',
                priority: 'medium'
            },
            {
                id: 15,
                customer: '华为技术',
                visitDate: '2024-01-22',
                visitType: '需求调研',
                status: 'pending',
                priority: 'high'
            },
            {
                id: 16,
                customer: '字节跳动',
                visitDate: '2024-01-25',
                visitType: '合作洽谈',
                status: 'scheduled',
                priority: 'medium'
            }
        ]
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
    (0, _react.useMemo)(()=>{
        return new Set([
            ...scheduleData.today.map((i)=>i.id),
            ...scheduleData.thisWeek.map((i)=>i.id),
            ...scheduleData.future.map((i)=>i.id)
        ]);
    }, [
        scheduleData
    ]);
    // 日历视图：悬停与隐藏的本地状态
    const [hoveredCalendarIdx, setHoveredCalendarIdx] = (0, _react.useState)(null);
    const [hiddenCalendarItems, setHiddenCalendarItems] = (0, _react.useState)({});
    // 日历事件数据
    (()=>{
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
                                    lineNumber: 649,
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
                                    lineNumber: 650,
                                    columnNumber: 17
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                            lineNumber: 648,
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
                                                            lineNumber: 662,
                                                            columnNumber: 25
                                                        }, void 0)
                                                    ],
                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List.Item.Meta, {
                                                        avatar: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                                                            size: 40,
                                                            style: {
                                                                backgroundColor: item.deliveredAt ? '#52c41a' : '#fa8c16',
                                                                color: '#fff',
                                                                fontSize: '12px',
                                                                fontWeight: '500',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center'
                                                            },
                                                            children: item.deliveredAt ? '已实施' : '实施中'
                                                        }, void 0, false, {
                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                            lineNumber: 667,
                                                            columnNumber: 27
                                                        }, void 0),
                                                        title: item.customerName,
                                                        description: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                            size: "small",
                                                            wrap: true,
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                    color: item.expectationAlignment === 'aligned' ? 'green' : item.expectationAlignment === 'partially_aligned' ? 'gold' : 'orange',
                                                                    children: [
                                                                        "客户期望：",
                                                                        item.expectationAlignment === 'aligned' ? '已对齐' : item.expectationAlignment === 'partially_aligned' ? '部分对齐' : '未对齐'
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                    lineNumber: 685,
                                                                    columnNumber: 29
                                                                }, void 0),
                                                                false,
                                                                typeof item.stakeholderCount === 'number' && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                    color: "purple",
                                                                    children: [
                                                                        "干系人: ",
                                                                        item.stakeholderCount
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                    lineNumber: 695,
                                                                    columnNumber: 31
                                                                }, void 0),
                                                                false,
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                    color: "blue",
                                                                    children: Math.random() > 0.5 ? '有要求' : '无要求'
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                    lineNumber: 702,
                                                                    columnNumber: 29
                                                                }, void 0),
                                                                item.updatedAt && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                    type: "secondary",
                                                                    children: [
                                                                        "更新时间: ",
                                                                        item.updatedAt
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                    lineNumber: 706,
                                                                    columnNumber: 31
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                            lineNumber: 684,
                                                            columnNumber: 27
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 665,
                                                        columnNumber: 23
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 660,
                                                    columnNumber: 21
                                                }, void 0)
                                        }, void 0, false, {
                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                            lineNumber: 657,
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
                                                                color: (selectedHandover === null || selectedHandover === void 0 ? void 0 : selectedHandover.expectationAlignment) === 'aligned' ? 'green' : (selectedHandover === null || selectedHandover === void 0 ? void 0 : selectedHandover.expectationAlignment) === 'partially_aligned' ? 'gold' : 'orange',
                                                                children: [
                                                                    "客户期望：",
                                                                    (selectedHandover === null || selectedHandover === void 0 ? void 0 : selectedHandover.expectationAlignment) === 'aligned' ? '已对齐' : (selectedHandover === null || selectedHandover === void 0 ? void 0 : selectedHandover.expectationAlignment) === 'partially_aligned' ? '部分对齐' : '未对齐'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 723,
                                                                columnNumber: 25
                                                            }, this),
                                                            false,
                                                            false,
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                color: "blue",
                                                                children: Math.random() > 0.5 ? '有要求' : '无要求'
                                                            }, void 0, false, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 733,
                                                                columnNumber: 25
                                                            }, this),
                                                            typeof (selectedHandover === null || selectedHandover === void 0 ? void 0 : selectedHandover.stakeholderCount) === 'number' && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                color: "purple",
                                                                children: [
                                                                    "干系人: ",
                                                                    selectedHandover === null || selectedHandover === void 0 ? void 0 : selectedHandover.stakeholderCount
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 736,
                                                                columnNumber: 84
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 722,
                                                        columnNumber: 23
                                                    }, this),
                                                    (selectedHandover === null || selectedHandover === void 0 ? void 0 : selectedHandover.crmData) && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
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
                                                                lineNumber: 741,
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
                                                                                lineNumber: 743,
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
                                                                                lineNumber: 743,
                                                                                columnNumber: 79
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 743,
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
                                                                                lineNumber: 744,
                                                                                columnNumber: 44
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                style: {
                                                                                    marginLeft: 8
                                                                                },
                                                                                children: selectedHandover.crmData.servicePeriod
                                                                            }, void 0, false, {
                                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                                lineNumber: 744,
                                                                                columnNumber: 79
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 744,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 742,
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
                                                                        lineNumber: 747,
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
                                                                                lineNumber: 749,
                                                                                columnNumber: 90
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 748,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 746,
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
                                                                        lineNumber: 753,
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
                                                                                    lineNumber: 755,
                                                                                    columnNumber: 125
                                                                                }, this)
                                                                            }, i, false, {
                                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                                lineNumber: 755,
                                                                                columnNumber: 84
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 754,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 752,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 740,
                                                        columnNumber: 25
                                                    }, this),
                                                    (selectedHandover === null || selectedHandover === void 0 ? void 0 : selectedHandover.onboardingTasks) && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
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
                                                                lineNumber: 763,
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
                                                                                    lineNumber: 770,
                                                                                    columnNumber: 35
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                    style: {
                                                                                        textDecoration: t.completed ? 'line-through' : 'none'
                                                                                    },
                                                                                    children: t.title
                                                                                }, void 0, false, {
                                                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                                    lineNumber: 771,
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
                                                                                    lineNumber: 772,
                                                                                    columnNumber: 49
                                                                                }, void 0)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                            lineNumber: 769,
                                                                            columnNumber: 33
                                                                        }, void 0)
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 768,
                                                                        columnNumber: 31
                                                                    }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 764,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 762,
                                                        columnNumber: 25
                                                    }, this),
                                                    (selectedHandover === null || selectedHandover === void 0 ? void 0 : selectedHandover.internalComments) && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                                                                level: 5,
                                                                style: {
                                                                    marginBottom: 8
                                                                },
                                                                children: "内部协作沟通"
                                                            }, void 0, false, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 782,
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
                                                                                            lineNumber: 789,
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
                                                                                            lineNumber: 789,
                                                                                            columnNumber: 98
                                                                                        }, void 0)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                                    lineNumber: 789,
                                                                                    columnNumber: 35
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                                    children: c.content
                                                                                }, void 0, false, {
                                                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                                    lineNumber: 790,
                                                                                    columnNumber: 35
                                                                                }, void 0)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                            lineNumber: 788,
                                                                            columnNumber: 33
                                                                        }, void 0)
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 787,
                                                                        columnNumber: 31
                                                                    }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 783,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 781,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 721,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                            lineNumber: 714,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, "handover", true, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 656,
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
                                                        lineNumber: 809,
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
                                                        lineNumber: 813,
                                                        columnNumber: 33
                                                    }, void 0),
                                                    title: item.customer,
                                                    description: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: '8px'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    gap: '40px'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                        type: "secondary",
                                                                        style: {
                                                                            minWidth: '140px'
                                                                        },
                                                                        children: [
                                                                            "签署合同时间: ",
                                                                            item.contractSignDate
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 818,
                                                                        columnNumber: 31
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                        type: "secondary",
                                                                        style: {
                                                                            minWidth: '140px'
                                                                        },
                                                                        children: [
                                                                            "天元提单时间: ",
                                                                            item.tianyuanSubmitDate
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 819,
                                                                        columnNumber: 31
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 817,
                                                                columnNumber: 29
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    gap: '40px'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                        type: "secondary",
                                                                        style: {
                                                                            minWidth: '140px'
                                                                        },
                                                                        children: [
                                                                            "SaaS续约金额: ",
                                                                            item.saasAmount
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 822,
                                                                        columnNumber: 31
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                        type: "secondary",
                                                                        style: {
                                                                            minWidth: '140px'
                                                                        },
                                                                        children: [
                                                                            "增值续费额: ",
                                                                            item.valueAddedAmount
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 823,
                                                                        columnNumber: 31
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 821,
                                                                columnNumber: 29
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 816,
                                                        columnNumber: 27
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 812,
                                                    columnNumber: 23
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 807,
                                                columnNumber: 21
                                            }, void 0)
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 804,
                                        columnNumber: 17
                                    }, this)
                                }, "2", false, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 803,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TabPane, {
                                    tab: "客户拜访提醒",
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List, {
                                        dataSource: intelligentTasks.customerVisits,
                                        renderItem: (item)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List.Item, {
                                                actions: [
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                        size: "small",
                                                        type: "primary",
                                                        style: {
                                                            borderRadius: '6px',
                                                            marginRight: '8px'
                                                        },
                                                        children: "保持提醒"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 839,
                                                        columnNumber: 25
                                                    }, void 0),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                        size: "small",
                                                        style: {
                                                            borderRadius: '6px'
                                                        },
                                                        children: "关闭提醒"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 840,
                                                        columnNumber: 25
                                                    }, void 0)
                                                ],
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.List.Item.Meta, {
                                                    avatar: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                                                        style: {
                                                            backgroundColor: '#722ed1'
                                                        },
                                                        children: item.customer.charAt(0)
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 844,
                                                        columnNumber: 33
                                                    }, void 0),
                                                    title: item.customer,
                                                    description: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                        direction: "vertical",
                                                        size: "small",
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                                size: "middle",
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                        type: "secondary",
                                                                        children: [
                                                                            "拜访日期: ",
                                                                            item.visitDate
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 849,
                                                                        columnNumber: 31
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                        type: "secondary",
                                                                        children: [
                                                                            "拜访类型: ",
                                                                            item.visitType
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 850,
                                                                        columnNumber: 31
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 848,
                                                                columnNumber: 29
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                                size: "small",
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                        color: item.status === 'confirmed' ? 'green' : item.status === 'scheduled' ? 'blue' : 'orange',
                                                                        children: item.status === 'confirmed' ? '已确认' : item.status === 'scheduled' ? '已安排' : '待确认'
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 853,
                                                                        columnNumber: 31
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                        color: item.priority === 'high' ? 'red' : 'default',
                                                                        children: item.priority === 'high' ? '高优先级' : '普通'
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                        lineNumber: 856,
                                                                        columnNumber: 31
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                                lineNumber: 852,
                                                                columnNumber: 29
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 847,
                                                        columnNumber: 27
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 843,
                                                    columnNumber: 23
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 837,
                                                columnNumber: 21
                                            }, void 0)
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 834,
                                        columnNumber: 17
                                    }, this)
                                }, "customerVisits", false, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 833,
                                    columnNumber: 15
                                }, this),
                                false,
                                false
                            ]
                        }, void 0, true, {
                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                            lineNumber: 655,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                        lineNumber: 645,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                    lineNumber: 644,
                    columnNumber: 9
                }, this),
                false
            ]
        }, void 0, true, {
            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
            lineNumber: 642,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
        lineNumber: 641,
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
                                            lineNumber: 1362,
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
                                            lineNumber: 1363,
                                            columnNumber: 19
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 1361,
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
                                            lineNumber: 1367,
                                            columnNumber: 21
                                        }, void 0))
                                }, void 0, false, {
                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                    lineNumber: 1365,
                                    columnNumber: 17
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                            lineNumber: 1360,
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
                                                    lineNumber: 1390,
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
                                                    lineNumber: 1393,
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
                                                            lineNumber: 1395,
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
                                                            lineNumber: 1396,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 1394,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                            lineNumber: 1389,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 1388,
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
                                                    lineNumber: 1403,
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
                                                    lineNumber: 1406,
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
                                                            lineNumber: 1408,
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
                                                            lineNumber: 1409,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 1407,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                            lineNumber: 1402,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 1401,
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
                                                        color: '#fa8c16',
                                                        marginBottom: '4px'
                                                    },
                                                    children: "39"
                                                }, void 0, false, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 1416,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                    type: "secondary",
                                                    style: {
                                                        fontSize: '12px'
                                                    },
                                                    children: "不活跃客户数"
                                                }, void 0, false, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 1419,
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
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ArrowDownOutlined, {
                                                            style: {
                                                                color: '#ff4d4f',
                                                                fontSize: '10px',
                                                                marginRight: '2px'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                            lineNumber: 1421,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                            style: {
                                                                color: '#ff4d4f',
                                                                fontSize: '10px'
                                                            },
                                                            children: "-3"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                            lineNumber: 1422,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 1420,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                            lineNumber: 1415,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 1414,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 1387,
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
                                        lineNumber: 1430,
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
                                                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
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
                                                        children: "销售来源"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 1446,
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
                                                        lineNumber: 1449,
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
                                                        lineNumber: 1452,
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
                                                        lineNumber: 1455,
                                                        columnNumber: 19
                                                    }, this),
                                                    false
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 1440,
                                                columnNumber: 17
                                            }, this),
                                            businessMatrixData.map((row, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        display: 'grid',
                                                        gridTemplateColumns: '1fr 1fr 1fr 1fr',
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
                                                            lineNumber: 1473,
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
                                                            lineNumber: 1482,
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
                                                            lineNumber: 1491,
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
                                                            lineNumber: 1500,
                                                            columnNumber: 21
                                                        }, this),
                                                        false
                                                    ]
                                                }, index, true, {
                                                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                    lineNumber: 1468,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 1433,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 1429,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    marginTop: '24px'
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
                                        children: "客户类型统计"
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 1528,
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
                                                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
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
                                                        children: "客户类型"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 1544,
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
                                                        lineNumber: 1547,
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
                                                        lineNumber: 1550,
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
                                                        lineNumber: 1553,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 1538,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    display: 'grid',
                                                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                                                    borderBottom: '1px solid #f0f0f0'
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
                                                        children: "新客"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 1564,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            padding: '12px 8px',
                                                            fontSize: '12px',
                                                            color: '#1890ff',
                                                            textAlign: 'center',
                                                            fontWeight: '600'
                                                        },
                                                        children: "45"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 1573,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            padding: '12px 8px',
                                                            fontSize: '12px',
                                                            color: '#52c41a',
                                                            textAlign: 'center',
                                                            fontWeight: '600'
                                                        },
                                                        children: "32"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 1582,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            padding: '12px 8px',
                                                            fontSize: '12px',
                                                            color: '#fa8c16',
                                                            textAlign: 'center',
                                                            fontWeight: '600'
                                                        },
                                                        children: "13"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 1591,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 1559,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    display: 'grid',
                                                    gridTemplateColumns: '1fr 1fr 1fr 1fr'
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
                                                        children: "老客"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 1606,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            padding: '12px 8px',
                                                            fontSize: '12px',
                                                            color: '#1890ff',
                                                            textAlign: 'center',
                                                            fontWeight: '600'
                                                        },
                                                        children: "78"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 1615,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            padding: '12px 8px',
                                                            fontSize: '12px',
                                                            color: '#52c41a',
                                                            textAlign: 'center',
                                                            fontWeight: '600'
                                                        },
                                                        children: "52"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 1624,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            padding: '12px 8px',
                                                            fontSize: '12px',
                                                            color: '#fa8c16',
                                                            textAlign: 'center',
                                                            fontWeight: '600'
                                                        },
                                                        children: "26"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                        lineNumber: 1633,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                                lineNumber: 1602,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                        lineNumber: 1531,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                                lineNumber: 1527,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                        lineNumber: 1357,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                    lineNumber: 1356,
                    columnNumber: 9
                }, this),
                false
            ]
        }, void 0, true, {
            fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
            lineNumber: 1354,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
        lineNumber: 1353,
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
                lineNumber: 1812,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(CompanyKPIBanner, {}, void 0, false, {
                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                lineNumber: 1815,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                gutter: 24,
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(ActionSection, {}, void 0, false, {
                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                        lineNumber: 1820,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(InsightSection, {}, void 0, false, {
                        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                        lineNumber: 1823,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
                lineNumber: 1818,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/pages/CustomerSuccess/WorkbenchDashboard.tsx",
        lineNumber: 1806,
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
var _RecallIncubationWorkbench = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/CustomerSuccess/RecallIncubationWorkbench.tsx"));
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
    '/ai-tools/tags': '智能标签在干活',
    '/teaching-ai/dashboard': '运营看板',
    '/teaching-ai/user-interaction': '用户互动管理',
    '/teaching-ai/community': '学习社区运营',
    '/teaching-ai/growth-strategy': '用户增长策略'
};
const CustomerSuccess = ()=>{
    _s();
    const location = (0, _max.useLocation)();
    // 根据当前路径获取页面标题
    const pageTitle = pathToTitleMap[location.pathname] || '客户成功系统';
    // 如果是工作台页面，显示新的工作台界面
    if (location.pathname === '/dashboard/work') return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_WorkbenchDashboard.default, {}, void 0, false, {
        fileName: "src/pages/CustomerSuccess/index.tsx",
        lineNumber: 54,
        columnNumber: 12
    }, this);
    // 客户分层中心
    if (location.pathname === '/dashboard/layers') return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_CustomerTieringCenter.default, {}, void 0, false, {
        fileName: "src/pages/CustomerSuccess/index.tsx",
        lineNumber: 58,
        columnNumber: 12
    }, this);
    if (location.pathname === '/profiles/recall') return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_RecallIncubationWorkbench.default, {}, void 0, false, {
        fileName: "src/pages/CustomerSuccess/index.tsx",
        lineNumber: 62,
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
        lineNumber: 69,
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
var _customerData = __mako_require__("src/mock/customerData.ts");
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
                                    lineNumber: 48,
                                    columnNumber: 23
                                }, void 0),
                                valueStyle: {
                                    color: '#3f8600'
                                }
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 43,
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
                                    lineNumber: 58,
                                    columnNumber: 23
                                }, void 0),
                                valueStyle: {
                                    color: '#1890ff'
                                }
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 55,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 53,
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
                                    lineNumber: 68,
                                    columnNumber: 23
                                }, void 0),
                                valueStyle: {
                                    color: '#faad14'
                                }
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 65,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 63,
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
                                    lineNumber: 79,
                                    columnNumber: 23
                                }, void 0),
                                valueStyle: {
                                    color: '#52c41a'
                                }
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/utils/tabContentGenerator.tsx",
                lineNumber: 42,
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
                                lineNumber: 88,
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
                                    lineNumber: 90,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 88,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 87,
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
                                lineNumber: 100,
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
                                                lineNumber: 104,
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
                                                        lineNumber: 108,
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
                                                        lineNumber: 109,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/utils/tabContentGenerator.tsx",
                                                lineNumber: 107,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                color: activity.status === 'success' ? 'green' : activity.status === 'warning' ? 'orange' : 'blue',
                                                children: activity.time
                                            }, void 0, false, {
                                                fileName: "src/utils/tabContentGenerator.tsx",
                                                lineNumber: 111,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, activity.id, true, {
                                        fileName: "src/utils/tabContentGenerator.tsx",
                                        lineNumber: 103,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/utils/tabContentGenerator.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/utils/tabContentGenerator.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
};
_c = DashboardContent;
const HandoverImplementationContent = ()=>{
    // 使用统一的客户数据源，确保与客户分层盘点数据一致
    const unifiedCustomers = (0, _customerData.generateUnifiedCustomerData)();
    const handoverData = unifiedCustomers.slice(0, 3).map((customer, index)=>{
        // 基于客户数据生成交接状态
        const statusSeed = customer.name.charCodeAt(0) + customer.id.charCodeAt(customer.id.length - 1);
        let status = 'pending';
        if (statusSeed % 3 === 0) status = 'completed';
        else if (statusSeed % 3 === 1) status = 'in_progress';
        // 基于客户数据生成优先级
        const prioritySeed = customer.industry.charCodeAt(0) + customer.arr;
        let priority = 'medium';
        if (prioritySeed % 3 === 0) priority = 'high';
        else if (prioritySeed % 3 === 2) priority = 'low';
        return {
            key: customer.id,
            customer: customer.name,
            contact: customer.csm || '-',
            phone: `138${String(customer.id.charCodeAt(0) + customer.name.charCodeAt(0)).padStart(4, '0')}${String(Math.abs(customer.arr % 10000)).padStart(4, '0')}`,
            status,
            priority,
            createTime: new Date(Date.now() - Math.random() * 2592000000).toLocaleDateString()
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
                    lineNumber: 186,
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
                    lineNumber: 200,
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
                            lineNumber: 213,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                            type: "link",
                            size: "small",
                            children: "开始交接"
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 214,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/utils/tabContentGenerator.tsx",
                    lineNumber: 212,
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
                            lineNumber: 226,
                            columnNumber: 42
                        }, void 0),
                        children: "新建交接"
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 226,
                        columnNumber: 13
                    }, void 0),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DownloadOutlined, {}, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 229,
                            columnNumber: 27
                        }, void 0),
                        children: "导出数据"
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 229,
                        columnNumber: 13
                    }, void 0)
                ]
            }, void 0, true, {
                fileName: "src/utils/tabContentGenerator.tsx",
                lineNumber: 225,
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
                                        lineNumber: 239,
                                        columnNumber: 84
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "src/utils/tabContentGenerator.tsx",
                                    lineNumber: 239,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 238,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 237,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            span: 6,
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                size: "small",
                                title: "进行中交接",
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                    title: "客户数量",
                                    value: _handoverData.mockCustomerHandovers.filter((item)=>item.handoverStatus === 'handover_in_progress').length,
                                    prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.SyncOutlined, {
                                        spin: true
                                    }, void 0, false, {
                                        fileName: "src/utils/tabContentGenerator.tsx",
                                        lineNumber: 244,
                                        columnNumber: 147
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "src/utils/tabContentGenerator.tsx",
                                    lineNumber: 244,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 243,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 242,
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
                                        lineNumber: 249,
                                        columnNumber: 140
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
                            span: 6,
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                size: "small",
                                title: "实施项目",
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                    title: "项目数量",
                                    value: _handoverData.mockCustomerHandovers.filter((item)=>item.hasHandoverDocument).length,
                                    prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.TrophyOutlined, {}, void 0, false, {
                                        fileName: "src/utils/tabContentGenerator.tsx",
                                        lineNumber: 254,
                                        columnNumber: 125
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
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/utils/tabContentGenerator.tsx",
                    lineNumber: 236,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Table, {
                    columns: columns,
                    dataSource: handoverData,
                    pagination: false,
                    size: "small"
                }, void 0, false, {
                    fileName: "src/utils/tabContentGenerator.tsx",
                    lineNumber: 260,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/utils/tabContentGenerator.tsx",
            lineNumber: 222,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/utils/tabContentGenerator.tsx",
        lineNumber: 221,
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
            company: '北京科技创新有限公司',
            type: '健康',
            change: '85',
            time: '2025-01-05'
        },
        {
            id: 2,
            company: '上海智能制造集团',
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
                            children: healthDistribution.map((item)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
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
                                            lineNumber: 312,
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
                                            lineNumber: 316,
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
                                                lineNumber: 318,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/utils/tabContentGenerator.tsx",
                                            lineNumber: 317,
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
                                            lineNumber: 327,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, item.level, true, {
                                    fileName: "src/utils/tabContentGenerator.tsx",
                                    lineNumber: 311,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 309,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 292,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/utils/tabContentGenerator.tsx",
                    lineNumber: 291,
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
                            padding: '12px 16px',
                            height: '148px',
                            minHeight: '148px',
                            maxHeight: '148px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column'
                        },
                        size: "small",
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                flex: 1,
                                overflowY: 'auto',
                                minHeight: 0,
                                paddingRight: '4px'
                            },
                            children: changeData.map((item, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        marginBottom: index === changeData.length - 1 ? '0' : '10px',
                                        padding: '6px 0',
                                        minHeight: '26px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                                            size: 14,
                                            style: {
                                                backgroundColor: '#1890ff',
                                                minWidth: '14px',
                                                flexShrink: 0
                                            },
                                            children: item.company.charAt(0)
                                        }, void 0, false, {
                                            fileName: "src/utils/tabContentGenerator.tsx",
                                            lineNumber: 370,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                flex: 1,
                                                overflow: 'hidden',
                                                minWidth: 0
                                            },
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    fontSize: '11px',
                                                    fontWeight: '500',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    lineHeight: '14px'
                                                },
                                                children: item.company
                                            }, void 0, false, {
                                                fileName: "src/utils/tabContentGenerator.tsx",
                                                lineNumber: 374,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/utils/tabContentGenerator.tsx",
                                            lineNumber: 373,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                            color: item.type === '健康' ? 'green' : item.type === '一般' ? 'orange' : 'red',
                                            style: {
                                                borderRadius: 2,
                                                fontSize: '10px',
                                                padding: '0 4px',
                                                lineHeight: '16px',
                                                height: '16px',
                                                margin: 0,
                                                flexShrink: 0
                                            },
                                            children: item.type
                                        }, void 0, false, {
                                            fileName: "src/utils/tabContentGenerator.tsx",
                                            lineNumber: 385,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, item.id, true, {
                                    fileName: "src/utils/tabContentGenerator.tsx",
                                    lineNumber: 362,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 355,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 336,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/utils/tabContentGenerator.tsx",
                    lineNumber: 335,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/utils/tabContentGenerator.tsx",
            lineNumber: 289,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/utils/tabContentGenerator.tsx",
        lineNumber: 288,
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
                    lineNumber: 414,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("p", {
                    children: "此功能正在开发中，敬请期待..."
                }, void 0, false, {
                    fileName: "src/utils/tabContentGenerator.tsx",
                    lineNumber: 415,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                    type: "primary",
                    icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ReloadOutlined, {}, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 416,
                        columnNumber: 38
                    }, void 0),
                    children: "刷新页面"
                }, void 0, false, {
                    fileName: "src/utils/tabContentGenerator.tsx",
                    lineNumber: 416,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/utils/tabContentGenerator.tsx",
            lineNumber: 413,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/utils/tabContentGenerator.tsx",
        lineNumber: 412,
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
        '智能标签在干活': 'smart-tags',
        '运营看板': 'teaching-ai-dashboard',
        '用户互动管理': 'user-interaction-management',
        '学习社区运营': 'community-operation',
        '用户增长策略': 'user-growth-strategy'
    };
    // 如果传入的是中文label，转换为英文key，否则直接使用
    const key = labelToKeyMap[tabName] || tabName;
    switch(key){
        case 'work-dashboard':
            return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(DashboardContent, {}, void 0, false, {
                fileName: "src/utils/tabContentGenerator.tsx",
                lineNumber: 497,
                columnNumber: 14
            }, this);
        case 'handover-implementation':
            return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(HandoverImplementationContent, {}, void 0, false, {
                fileName: "src/utils/tabContentGenerator.tsx",
                lineNumber: 499,
                columnNumber: 14
            }, this);
        case 'continuous-service':
            return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(ContinuousServiceContent, {}, void 0, false, {
                fileName: "src/utils/tabContentGenerator.tsx",
                lineNumber: 501,
                columnNumber: 14
            }, this);
        default:
            return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(DefaultContent, {
                tabName: tabName
            }, void 0, false, {
                fileName: "src/utils/tabContentGenerator.tsx",
                lineNumber: 503,
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