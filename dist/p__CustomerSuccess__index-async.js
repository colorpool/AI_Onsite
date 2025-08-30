((typeof globalThis !== 'undefined' ? globalThis : self)["makoChunk_ant-design-pro"] = (typeof globalThis !== 'undefined' ? globalThis : self)["makoChunk_ant-design-pro"] || []).push([
        ['p__CustomerSuccess__index'],
{ "src/pages/CustomerSuccess/TieringMatrix.tsx": function (module, exports, __mako_require__){
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
// 蓝色饱和度梯度（高->低）
const valueTierRowColor = {
    高价值: '#2f54eb14',
    中价值: '#2f54eb0d',
    低价值: '#2f54eb08'
};
// 生命周期色调（用于边框/强调色）
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
function generateMockCustomers() {
    const names = [
        '阿里巴巴',
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
        '去哪儿'
    ];
    const csms = [
        '王一',
        '李二',
        '张三',
        '赵四',
        '陈五',
        '孙六',
        '周七'
    ];
    const colors = [
        '#1890ff',
        '#fa8c16',
        '#722ed1',
        '#13c2c2',
        '#eb2f96',
        '#52c41a',
        '#2f54eb'
    ];
    const customers = [];
    let id = 1;
    for (const baseName of names){
        const repeats = Math.random() > 0.5 ? 2 : 1;
        for(let i = 0; i < repeats; i++){
            const lifecycle = lifecycleStages[Math.floor(Math.random() * lifecycleStages.length)];
            const valueScore = Math.floor(Math.random() * 61) + 40; // 40-100
            const valueTier = valueScore >= 80 ? '高价值' : valueScore >= 60 ? '中价值' : '低价值';
            const rAndM = Math.floor(Math.random() * 61) + 40;
            const f = Math.floor(Math.random() * 61) + 20;
            const serviceScore = Math.floor(Math.random() * 61) + 20;
            const trend = Math.random() > 0.6 ? 'down' : 'up';
            const arr = Math.round((Math.random() * 400 + 100) * 1000); // 100k - 500k
            customers.push({
                id: String(id++),
                name: `${baseName}${i ? '·子业务' + i : ''}`,
                logoColor: colors[id % colors.length],
                csm: csms[id % csms.length],
                valueScore,
                trend,
                lifecycle,
                valueTier,
                rAndM,
                f,
                serviceScore,
                arr
            });
        }
    }
    return customers;
}
const stageAbbrev = {
    导入期: '导',
    成长期: '成',
    成熟期: '熟',
    衰退期: '衰'
};
// 数据源：默认为本地mock，如有可用接口则自动对接
// 预期接口：GET /api/customer-tiers -> { customers: Customer[] }
// 字段需包含：valueScore, f, serviceScore, valueTier, lifecycle, arr, csm, name
// 注意：若接口失败，会回落到mock数据
//
// 气泡图与桑基图的数据将自动基于 customers 聚合计算
// 初始化为mock数据
// 实时数据将通过useEffect尝试拉取并覆盖
let initialMock = generateMockCustomers();
const TieringMatrix = ()=>{
    _s();
    const [selected, setSelected] = (0, _react.useState)(null);
    const [search, setSearch] = (0, _react.useState)('');
    const [customers, setCustomers] = (0, _react.useState)(initialMock);
    const listRef = (0, _react.useRef)(null);
    const [listHighlight, setListHighlight] = (0, _react.useState)(false);
    const highlightTimerRef = (0, _react.useRef)(null);
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
        for (const c of customers){
            const key = `${c.valueTier}-${c.lifecycle}`;
            const it = agg[key];
            it.count += 1;
            it.avgHealth += c.valueScore;
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
    // 气泡图工具提示
    const [bubbleTip, setBubbleTip] = (0, _react.useState)(null);
    // 桑基图工具提示
    const [sankeyTip, setSankeyTip] = (0, _react.useState)(null);
    // 尝试从接口获取数据
    (0, _react.useEffect)(()=>{
        async function fetchData() {
            try {
                const res = await fetch('/api/customer-tiers', {
                    method: 'GET'
                });
                if (res.ok) {
                    const json = await res.json();
                    if (Array.isArray(json === null || json === void 0 ? void 0 : json.customers)) {
                        setCustomers(json.customers);
                        return;
                    }
                }
            } catch (e) {
            // ignore
            }
            setCustomers(initialMock);
        }
        fetchData();
    }, []);
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
    (0, _react.useEffect)(()=>{
        return ()=>{
            if (highlightTimerRef.current) window.clearTimeout(highlightTimerRef.current);
        };
    }, []);
    const columns = [
        {
            title: '客户名称',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b)=>a.name.localeCompare(b.name),
            render: (_, record)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                            style: {
                                backgroundColor: record.logoColor
                            },
                            children: record.name.charAt(0)
                        }, void 0, false, {
                            fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                            lineNumber: 251,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                            children: record.name
                        }, void 0, false, {
                            fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                            lineNumber: 254,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                    lineNumber: 250,
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
            render: (v, record)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                            strong: true,
                            children: [
                                v,
                                "分"
                            ]
                        }, void 0, true, {
                            fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                            lineNumber: 271,
                            columnNumber: 11
                        }, this),
                        record.trend === 'up' ? /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ArrowUpOutlined, {
                            style: {
                                color: '#52c41a'
                            }
                        }, void 0, false, {
                            fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                            lineNumber: 273,
                            columnNumber: 13
                        }, this) : record.trend === 'down' ? /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ArrowDownOutlined, {
                            style: {
                                color: '#ff4d4f'
                            }
                        }, void 0, false, {
                            fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                            lineNumber: 275,
                            columnNumber: 13
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                    lineNumber: 270,
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
            render: (v)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                    color: lifecycleAccentColor[v],
                    style: {
                        borderColor: `${lifecycleAccentColor[v]}55`
                    },
                    children: v
                }, void 0, false, {
                    fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                    lineNumber: 287,
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
            title: '服务互动价值',
            dataIndex: 'serviceScore',
            key: 'serviceScore',
            sorter: (a, b)=>a.serviceScore - b.serviceScore
        }
    ];
    const headerTitle = selected ? `客户列表 - ${selected.valueTier} & ${selected.stage} (${filteredCustomers.length})` : `客户列表 - 全部客户 (${filteredCustomers.length})`;
    // ---- Charts data helpers ----
    function hashStringToNumber(input) {
        let hash = 0;
        for(let i = 0; i < input.length; i++){
            hash = (hash << 5) - hash + input.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash);
    }
    (0, _react.useMemo)(()=>{
        const key = selected ? `${selected.valueTier}-${selected.stage}` : 'ALL';
        const base = selected ? 70 : 65;
        const variance = selected ? 12 : 10;
        const seed = hashStringToNumber(key);
        const length = 12; // 近12周
        const points = [];
        for(let i = 0; i < length; i++){
            // 简单可重复的伪随机
            const n = Math.sin(seed % 1000 * (i + 1)) * 0.5 + Math.cos(seed % 777 * (i + 2)) * 0.5;
            const value = Math.max(40, Math.min(95, base + n * variance + (i - length / 2) * 0.4));
            points.push(Math.round(value));
        }
        return points;
    }, [
        selected
    ]);
    const tierMigration = (0, _react.useMemo)(()=>{
        // 基于选中人群，构造稳定的“上升/持平/下降”分布
        const key = selected ? `${selected.valueTier}-${selected.stage}` : 'ALL';
        const seed = hashStringToNumber(key);
        const size = filteredCustomers.length || 1;
        const ratioUp = 0.2 + seed % 30 / 100; // 20%-50%
        const ratioDown = 0.1 + seed % 15 / 100; // 10%-25%
        const up = Math.round(size * ratioUp);
        const down = Math.round(size * ratioDown);
        const same = Math.max(0, size - up - down);
        // 拆分路径
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
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            padding: 24,
            background: '#f5f5f5',
            minHeight: 'calc(100vh - 64px)'
        },
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 16
                },
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                                level: 2,
                                style: {
                                    margin: 0,
                                    fontWeight: 600,
                                    color: '#262626'
                                },
                                children: "客户分层矩阵 (2025年Q3)"
                            }, void 0, false, {
                                fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                lineNumber: 379,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                type: "secondary",
                                children: "将客户按“价值等级”与“生命周期”进行矩阵分层，以指导精细化服务策略。"
                            }, void 0, false, {
                                fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                lineNumber: 380,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                        lineNumber: 378,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                        type: "link",
                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.SettingOutlined, {}, void 0, false, {
                            fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                            lineNumber: 382,
                            columnNumber: 35
                        }, void 0),
                        children: "配置评分模型"
                    }, void 0, false, {
                        fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                        lineNumber: 382,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                lineNumber: 377,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                style: {
                    ...cardStyle
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
                                fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                lineNumber: 387,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                strong: true,
                                style: {
                                    marginLeft: 8
                                },
                                children: selectedTitle
                            }, void 0, false, {
                                fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                lineNumber: 388,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                        lineNumber: 386,
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
                                fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                lineNumber: 392,
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
                                                fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                lineNumber: 396,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                style: {
                                                    color: '#262626',
                                                    fontWeight: 500
                                                },
                                                children: stage
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                lineNumber: 397,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                        lineNumber: 395,
                                        columnNumber: 15
                                    }, this)
                                }, stage, false, {
                                    fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                    lineNumber: 394,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                        lineNumber: 390,
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
                                                fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                lineNumber: 406,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tooltip, {
                                                title: valueTierScoreHint[tier],
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.QuestionCircleOutlined, {
                                                    style: {
                                                        color: '#8c8c8c'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                    lineNumber: 408,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                lineNumber: 407,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                        lineNumber: 405,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                    lineNumber: 404,
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
                                    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                        span: 5,
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
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
                                                            fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                            lineNumber: 429,
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
                                                                    fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                                    lineNumber: 431,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Dropdown, {
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
                                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.MoreOutlined, {
                                                                        style: {
                                                                            color: '#8c8c8c'
                                                                        },
                                                                        onClick: (ev)=>ev.stopPropagation()
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                                        lineNumber: 444,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                                    lineNumber: 432,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                            lineNumber: 430,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                    lineNumber: 428,
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
                                                    fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                    lineNumber: 448,
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
                                                    fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                    lineNumber: 449,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                            lineNumber: 422,
                                            columnNumber: 19
                                        }, this)
                                    }, `${tier}-${stage}`, false, {
                                        fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                        lineNumber: 421,
                                        columnNumber: 17
                                    }, this);
                                })
                            ]
                        }, tier, true, {
                            fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                            lineNumber: 403,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                lineNumber: 385,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                gutter: 16,
                style: {
                    marginTop: 16
                },
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        xs: 24,
                        lg: 12,
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            style: {
                                ...cardStyle
                            },
                            title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                style: {
                                    fontWeight: 600
                                },
                                children: "客户分层健康与价值矩阵"
                            }, void 0, false, {
                                fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                lineNumber: 462,
                                columnNumber: 49
                            }, void 0),
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    width: '100%',
                                    height: 260,
                                    position: 'relative'
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
                                            padding: '8px 10px',
                                            fontSize: 12,
                                            pointerEvents: 'none',
                                            zIndex: 2
                                        },
                                        children: bubbleTip.html
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                        lineNumber: 465,
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
                                                fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                lineNumber: 471,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("line", {
                                                x1: "40",
                                                y1: "170",
                                                x2: "400",
                                                y2: "170",
                                                stroke: "#d9d9d9"
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                lineNumber: 472,
                                                columnNumber: 17
                                            }, this),
                                            Array.from({
                                                length: 6
                                            }).map((_, i)=>{
                                                const v = i * 20;
                                                const y = 170 - v / 100 * 150;
                                                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("g", {
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("line", {
                                                            x1: "36",
                                                            y1: y,
                                                            x2: "40",
                                                            y2: y,
                                                            stroke: "#d9d9d9"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                            lineNumber: 479,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("text", {
                                                            x: "10",
                                                            y: y + 4,
                                                            fontSize: "10",
                                                            fill: "#8c8c8c",
                                                            children: v
                                                        }, void 0, false, {
                                                            fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                            lineNumber: 480,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                    lineNumber: 478,
                                                    columnNumber: 21
                                                }, this);
                                            }),
                                            Array.from({
                                                length: 6
                                            }).map((_, i)=>{
                                                const v = i * 20;
                                                const x = 40 + v / 100 * 360;
                                                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("g", {
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("line", {
                                                            x1: x,
                                                            y1: "170",
                                                            x2: x,
                                                            y2: "174",
                                                            stroke: "#d9d9d9"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                            lineNumber: 490,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("text", {
                                                            x: x,
                                                            y: "188",
                                                            fontSize: "10",
                                                            fill: "#8c8c8c",
                                                            textAnchor: "middle",
                                                            children: v
                                                        }, void 0, false, {
                                                            fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                            lineNumber: 491,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                    lineNumber: 489,
                                                    columnNumber: 21
                                                }, this);
                                            }),
                                            Object.values(segmentAgg).map((s)=>{
                                                if (s.count === 0) return null;
                                                const x = 40 + s.avgHealth / 100 * 360;
                                                const y = 170 - s.avgActive / 100 * 150;
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
                                                            fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                            lineNumber: 505,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            children: [
                                                                "客户数：",
                                                                s.count
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                            lineNumber: 506,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            children: [
                                                                "总ARR：¥",
                                                                (s.totalArr / 10000).toFixed(1),
                                                                "万"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                            lineNumber: 507,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            children: [
                                                                "平均健康分：",
                                                                s.avgHealth
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                            lineNumber: 508,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            children: [
                                                                "平均活跃度：",
                                                                s.avgActive
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                            lineNumber: 509,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                    lineNumber: 504,
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
                                                    onClick: ()=>setSelected({
                                                            valueTier: s.valueTier,
                                                            stage: s.stage
                                                        }),
                                                    style: {
                                                        cursor: 'pointer'
                                                    }
                                                }, s.key, false, {
                                                    fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                    lineNumber: 513,
                                                    columnNumber: 23
                                                }, this);
                                            }),
                                            (()=>{
                                                const entries = [
                                                    [
                                                        '导入期',
                                                        lifecycleAccentColor['导入期']
                                                    ],
                                                    [
                                                        '成长期',
                                                        lifecycleAccentColor['成长期']
                                                    ],
                                                    [
                                                        '成熟期',
                                                        lifecycleAccentColor['成熟期']
                                                    ],
                                                    [
                                                        '衰退期',
                                                        lifecycleAccentColor['衰退期']
                                                    ]
                                                ];
                                                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("g", {
                                                    children: entries.map(([label, color], i)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("g", {
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("rect", {
                                                                    x: 44 + i * 90,
                                                                    y: 12,
                                                                    width: 10,
                                                                    height: 10,
                                                                    fill: color,
                                                                    rx: 2,
                                                                    opacity: 0.6
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                                    lineNumber: 548,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("text", {
                                                                    x: 58 + i * 90,
                                                                    y: 21,
                                                                    fontSize: "10",
                                                                    fill: "#8c8c8c",
                                                                    children: label
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                                    lineNumber: 549,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, label, true, {
                                                            fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                            lineNumber: 547,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                    lineNumber: 545,
                                                    columnNumber: 21
                                                }, this);
                                            })(),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("g", {
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("circle", {
                                                        cx: "60",
                                                        cy: "150",
                                                        r: "6",
                                                        fill: "#8c8c8c",
                                                        fillOpacity: "0.15",
                                                        stroke: "#bfbfbf"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                        lineNumber: 557,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("circle", {
                                                        cx: "90",
                                                        cy: "150",
                                                        r: "10",
                                                        fill: "#8c8c8c",
                                                        fillOpacity: "0.15",
                                                        stroke: "#bfbfbf"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                        lineNumber: 558,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("circle", {
                                                        cx: "130",
                                                        cy: "150",
                                                        r: "14",
                                                        fill: "#8c8c8c",
                                                        fillOpacity: "0.15",
                                                        stroke: "#bfbfbf"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                        lineNumber: 559,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("text", {
                                                        x: "160",
                                                        y: "154",
                                                        fontSize: "10",
                                                        fill: "#8c8c8c",
                                                        children: "气泡大小表示总ARR"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                        lineNumber: 560,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                lineNumber: 556,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("text", {
                                                x: "220",
                                                y: "198",
                                                textAnchor: "middle",
                                                fontSize: "12",
                                                fill: "#8c8c8c",
                                                children: "客户健康分 (0-100)"
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                lineNumber: 563,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("text", {
                                                x: "12",
                                                y: "14",
                                                textAnchor: "start",
                                                fontSize: "12",
                                                fill: "#8c8c8c",
                                                children: "客户活跃度 (0-100)"
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                lineNumber: 564,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("text", {
                                                x: "400",
                                                y: "16",
                                                textAnchor: "end",
                                                fontSize: "12",
                                                fill: "#8c8c8c",
                                                children: selected ? selectedTitle : '全部'
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                lineNumber: 566,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                        lineNumber: 469,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                lineNumber: 463,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                            lineNumber: 462,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                        lineNumber: 461,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        xs: 24,
                        lg: 12,
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            style: {
                                ...cardStyle
                            },
                            title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                style: {
                                    fontWeight: 600
                                },
                                children: "客户价值层级流动 (Q2 vs Q3)"
                            }, void 0, false, {
                                fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                lineNumber: 574,
                                columnNumber: 49
                            }, void 0),
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    width: '100%',
                                    height: 260,
                                    position: 'relative'
                                },
                                children: [
                                    (sankeyTip === null || sankeyTip === void 0 ? void 0 : sankeyTip.visible) && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            position: 'absolute',
                                            left: sankeyTip.x,
                                            top: sankeyTip.y,
                                            background: '#fff',
                                            border: '1px solid #f0f0f0',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                            borderRadius: 6,
                                            padding: '8px 10px',
                                            fontSize: 12,
                                            pointerEvents: 'none',
                                            zIndex: 2
                                        },
                                        children: sankeyTip.text
                                    }, void 0, false, {
                                        fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                        lineNumber: 577,
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
                                            (()=>{
                                                const leftX = 70;
                                                const rightX = 350;
                                                const tiers = [
                                                    '高价值',
                                                    '中价值',
                                                    '低价值'
                                                ];
                                                const positions = {};
                                                tiers.forEach((t, i)=>{
                                                    positions[`L-${t}`] = 40 + i * 60;
                                                    positions[`R-${t}`] = 40 + i * 60;
                                                });
                                                // 使用之前的迁移数据构造流
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
                                                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("g", {
                                                    children: [
                                                        tiers.map((t)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("g", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("rect", {
                                                                        x: leftX - 28,
                                                                        y: positions[`L-${t}`] - 10,
                                                                        width: 56,
                                                                        height: 20,
                                                                        rx: 4,
                                                                        fill: "#f5f5f5",
                                                                        stroke: "#d9d9d9"
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                                        lineNumber: 612,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("text", {
                                                                        x: leftX - 32,
                                                                        y: positions[`L-${t}`] + 4,
                                                                        fontSize: "12",
                                                                        textAnchor: "end",
                                                                        fill: "#595959",
                                                                        children: [
                                                                            "上季度-",
                                                                            t
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                                        lineNumber: 613,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, `node-left-${t}`, true, {
                                                                fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                                lineNumber: 611,
                                                                columnNumber: 25
                                                            }, this)),
                                                        tiers.map((t)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("g", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("rect", {
                                                                        x: rightX - 28,
                                                                        y: positions[`R-${t}`] - 10,
                                                                        width: 56,
                                                                        height: 20,
                                                                        rx: 4,
                                                                        fill: "#f5f5f5",
                                                                        stroke: "#d9d9d9"
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                                        lineNumber: 618,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("text", {
                                                                        x: rightX + 32,
                                                                        y: positions[`R-${t}`] + 4,
                                                                        fontSize: "12",
                                                                        textAnchor: "start",
                                                                        fill: "#595959",
                                                                        children: [
                                                                            "本季度-",
                                                                            t
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                                        lineNumber: 619,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, `node-right-${t}`, true, {
                                                                fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                                lineNumber: 617,
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
                                                                fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                                lineNumber: 624,
                                                                columnNumber: 25
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                    lineNumber: 608,
                                                    columnNumber: 21
                                                }, this);
                                            })(),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("text", {
                                                x: "400",
                                                y: "16",
                                                textAnchor: "end",
                                                fontSize: "12",
                                                fill: "#8c8c8c",
                                                children: selected ? selectedTitle : '全部'
                                            }, void 0, false, {
                                                fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                lineNumber: 645,
                                                columnNumber: 17
                                            }, this),
                                            (()=>{
                                                const items = [
                                                    [
                                                        '低→中',
                                                        '#5B8FF9'
                                                    ],
                                                    [
                                                        '中→高',
                                                        '#5AD8A6'
                                                    ],
                                                    [
                                                        '低→低',
                                                        '#B37FEB'
                                                    ],
                                                    [
                                                        '中→中',
                                                        '#FF9D4D'
                                                    ],
                                                    [
                                                        '高→高',
                                                        '#CDDDFD'
                                                    ],
                                                    [
                                                        '高→中',
                                                        '#F4664A'
                                                    ],
                                                    [
                                                        '中→低',
                                                        '#D3F261'
                                                    ]
                                                ];
                                                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("g", {
                                                    children: items.map(([label, color], i)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("g", {
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("rect", {
                                                                    x: 44 + i % 4 * 88,
                                                                    y: 12 + Math.floor(i / 4) * 18,
                                                                    width: 10,
                                                                    height: 10,
                                                                    fill: String(color),
                                                                    rx: 2,
                                                                    opacity: 0.6
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                                    lineNumber: 661,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("text", {
                                                                    x: 58 + i % 4 * 88,
                                                                    y: 21 + Math.floor(i / 4) * 18,
                                                                    fontSize: "10",
                                                                    fill: "#8c8c8c",
                                                                    children: String(label)
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                                    lineNumber: 662,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, String(i), true, {
                                                            fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                            lineNumber: 660,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                                    lineNumber: 658,
                                                    columnNumber: 21
                                                }, this);
                                            })()
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                        lineNumber: 581,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                                lineNumber: 575,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                            lineNumber: 574,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                        lineNumber: 573,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                lineNumber: 459,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                ref: listRef,
                style: {
                    ...cardStyle,
                    marginTop: 16,
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
                            fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                            lineNumber: 688,
                            columnNumber: 11
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
                            fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                            lineNumber: 689,
                            columnNumber: 11
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                    lineNumber: 687,
                    columnNumber: 9
                }, void 0),
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Table, {
                    rowKey: "id",
                    dataSource: filteredCustomers,
                    columns: columns,
                    pagination: {
                        pageSize: 10,
                        showSizeChanger: false
                    }
                }, void 0, false, {
                    fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                    lineNumber: 699,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
                lineNumber: 675,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/pages/CustomerSuccess/TieringMatrix.tsx",
        lineNumber: 375,
        columnNumber: 5
    }, this);
};
_s(TieringMatrix, "3Otkb8+ieq/AnGe94kwYrQQQHLg=");
_c = TieringMatrix;
var _default = TieringMatrix;
var _c;
$RefreshReg$(_c, "TieringMatrix");
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
var _TieringMatrix = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/pages/CustomerSuccess/TieringMatrix.tsx"));
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
        lineNumber: 48,
        columnNumber: 12
    }, this);
    // 客户分层矩阵
    if (location.pathname === '/dashboard/layers') return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_TieringMatrix.default, {}, void 0, false, {
        fileName: "src/pages/CustomerSuccess/index.tsx",
        lineNumber: 52,
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
        lineNumber: 59,
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
                                    lineNumber: 46,
                                    columnNumber: 23
                                }, void 0),
                                valueStyle: {
                                    color: '#3f8600'
                                }
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 41,
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
                                    lineNumber: 56,
                                    columnNumber: 23
                                }, void 0),
                                valueStyle: {
                                    color: '#1890ff'
                                }
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 51,
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
                                    lineNumber: 66,
                                    columnNumber: 23
                                }, void 0),
                                valueStyle: {
                                    color: '#faad14'
                                }
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 62,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 61,
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
                                    lineNumber: 77,
                                    columnNumber: 23
                                }, void 0),
                                valueStyle: {
                                    color: '#52c41a'
                                }
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 73,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/utils/tabContentGenerator.tsx",
                lineNumber: 40,
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
                                lineNumber: 86,
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
                                    lineNumber: 88,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 86,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 85,
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
                                lineNumber: 98,
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
                                                lineNumber: 102,
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
                                                        lineNumber: 106,
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
                                                        lineNumber: 107,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/utils/tabContentGenerator.tsx",
                                                lineNumber: 105,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                color: activity.status === 'success' ? 'green' : activity.status === 'warning' ? 'orange' : 'blue',
                                                children: activity.time
                                            }, void 0, false, {
                                                fileName: "src/utils/tabContentGenerator.tsx",
                                                lineNumber: 109,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, activity.id, true, {
                                        fileName: "src/utils/tabContentGenerator.tsx",
                                        lineNumber: 101,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 99,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 98,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/utils/tabContentGenerator.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/utils/tabContentGenerator.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
};
_c = DashboardContent;
const HandoverImplementationContent = ()=>{
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
                    lineNumber: 181,
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
                    lineNumber: 195,
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
                            lineNumber: 208,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                            type: "link",
                            size: "small",
                            children: "开始交接"
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 209,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/utils/tabContentGenerator.tsx",
                    lineNumber: 207,
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
                            lineNumber: 221,
                            columnNumber: 42
                        }, void 0),
                        children: "新建交接"
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 221,
                        columnNumber: 13
                    }, void 0),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DownloadOutlined, {}, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 224,
                            columnNumber: 27
                        }, void 0),
                        children: "导出数据"
                    }, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 224,
                        columnNumber: 13
                    }, void 0)
                ]
            }, void 0, true, {
                fileName: "src/utils/tabContentGenerator.tsx",
                lineNumber: 220,
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
                                    value: 8,
                                    prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {}, void 0, false, {
                                        fileName: "src/utils/tabContentGenerator.tsx",
                                        lineNumber: 234,
                                        columnNumber: 57
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "src/utils/tabContentGenerator.tsx",
                                    lineNumber: 234,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "src/utils/tabContentGenerator.tsx",
                                lineNumber: 233,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/utils/tabContentGenerator.tsx",
                            lineNumber: 232,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                            span: 6,
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                size: "small",
                                title: "进行中交接",
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                    title: "客户数量",
                                    value: 12,
                                    prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.SyncOutlined, {
                                        spin: true
                                    }, void 0, false, {
                                        fileName: "src/utils/tabContentGenerator.tsx",
                                        lineNumber: 239,
                                        columnNumber: 58
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
                                title: "已完成交接",
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                    title: "客户数量",
                                    value: 45,
                                    prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.CheckCircleOutlined, {}, void 0, false, {
                                        fileName: "src/utils/tabContentGenerator.tsx",
                                        lineNumber: 244,
                                        columnNumber: 58
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
                                title: "实施项目",
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                    title: "项目数量",
                                    value: 15,
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
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/utils/tabContentGenerator.tsx",
                    lineNumber: 231,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Table, {
                    columns: columns,
                    dataSource: handoverData,
                    pagination: false,
                    size: "small"
                }, void 0, false, {
                    fileName: "src/utils/tabContentGenerator.tsx",
                    lineNumber: 255,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/utils/tabContentGenerator.tsx",
            lineNumber: 217,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/utils/tabContentGenerator.tsx",
        lineNumber: 216,
        columnNumber: 5
    }, this);
};
_c1 = HandoverImplementationContent;
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
                    lineNumber: 271,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("p", {
                    children: "此功能正在开发中，敬请期待..."
                }, void 0, false, {
                    fileName: "src/utils/tabContentGenerator.tsx",
                    lineNumber: 272,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                    type: "primary",
                    icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ReloadOutlined, {}, void 0, false, {
                        fileName: "src/utils/tabContentGenerator.tsx",
                        lineNumber: 273,
                        columnNumber: 38
                    }, void 0),
                    children: "刷新页面"
                }, void 0, false, {
                    fileName: "src/utils/tabContentGenerator.tsx",
                    lineNumber: 273,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/utils/tabContentGenerator.tsx",
            lineNumber: 270,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/utils/tabContentGenerator.tsx",
        lineNumber: 269,
        columnNumber: 5
    }, this);
};
_c2 = DefaultContent;
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
                lineNumber: 350,
                columnNumber: 14
            }, this);
        case 'handover-implementation':
            return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(HandoverImplementationContent, {}, void 0, false, {
                fileName: "src/utils/tabContentGenerator.tsx",
                lineNumber: 352,
                columnNumber: 14
            }, this);
        default:
            return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(DefaultContent, {
                tabName: tabName
            }, void 0, false, {
                fileName: "src/utils/tabContentGenerator.tsx",
                lineNumber: 354,
                columnNumber: 14
            }, this);
    }
};
var _c;
var _c1;
var _c2;
$RefreshReg$(_c, "DashboardContent");
$RefreshReg$(_c1, "HandoverImplementationContent");
$RefreshReg$(_c2, "DefaultContent");
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