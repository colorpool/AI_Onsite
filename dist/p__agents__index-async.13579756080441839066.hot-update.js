globalThis.makoModuleHotUpdate('p__agents__index', {
    modules: {
        "src/pages/agents/[id]/analytics.tsx": function(module, exports, __mako_require__) {
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
            var _agentData = __mako_require__("src/mock/agentData.ts");
            var prevRefreshReg;
            var prevRefreshSig;
            prevRefreshReg = self.$RefreshReg$;
            prevRefreshSig = self.$RefreshSig$;
            self.$RefreshReg$ = (type, id)=>{
                _reactrefresh.register(type, module.id + id);
            };
            self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
            var _s = $RefreshSig$();
            'use client';
            const { Title, Text } = _antd.Typography;
            const { RangePicker } = _antd.DatePicker;
            const AgentAnalyticsPage = ({ agentId })=>{
                _s();
                const navigate = (0, _umi.useNavigate)();
                const params = (0, _umi.useParams)();
                const [agent, setAgent] = (0, _react.useState)(null);
                const [timeRange, setTimeRange] = (0, _react.useState)('7d');
                const [dateRange, setDateRange] = (0, _react.useState)(null);
                // 优先使用props中的agentId，如果没有则使用params中的id
                const currentAgentId = agentId || params.id;
                (0, _react.useEffect)(()=>{
                    // 模拟从API获取Agent数据
                    const foundAgent = _agentData.mockAgents.find((a)=>a.id === currentAgentId);
                    if (foundAgent) setAgent(foundAgent);
                    else navigate('/ai-tools/consultant');
                }, [
                    currentAgentId,
                    navigate
                ]);
                // 模拟分析数据
                const analyticsData = {
                    totalConversations: 1247,
                    avgResponseTime: 2.3,
                    satisfactionScore: 4.6,
                    resolutionRate: 0.89,
                    escalationRate: 0.05,
                    activeHours: 18.5,
                    peakHours: [
                        '09:00-11:00',
                        '14:00-16:00'
                    ],
                    topIssues: [
                        {
                            issue: '数据看板配置',
                            count: 156,
                            percentage: 25
                        },
                        {
                            issue: '权限设置',
                            count: 89,
                            percentage: 14
                        },
                        {
                            issue: '报表生成',
                            count: 67,
                            percentage: 11
                        },
                        {
                            issue: '数据导入',
                            count: 45,
                            percentage: 7
                        },
                        {
                            issue: '系统集成',
                            count: 34,
                            percentage: 5
                        }
                    ],
                    channelStats: [
                        {
                            channel: '网页聊天',
                            conversations: 789,
                            satisfaction: 4.7
                        },
                        {
                            channel: '企业微信',
                            conversations: 458,
                            satisfaction: 4.5
                        }
                    ],
                    dailyStats: [
                        {
                            date: '2024-01-15',
                            conversations: 45,
                            resolved: 42,
                            escalated: 3
                        },
                        {
                            date: '2024-01-16',
                            conversations: 52,
                            resolved: 48,
                            escalated: 4
                        },
                        {
                            date: '2024-01-17',
                            conversations: 38,
                            resolved: 35,
                            escalated: 3
                        },
                        {
                            date: '2024-01-18',
                            conversations: 61,
                            resolved: 57,
                            escalated: 4
                        },
                        {
                            date: '2024-01-19',
                            conversations: 49,
                            resolved: 46,
                            escalated: 3
                        },
                        {
                            date: '2024-01-20',
                            conversations: 55,
                            resolved: 52,
                            escalated: 3
                        },
                        {
                            date: '2024-01-21',
                            conversations: 42,
                            resolved: 40,
                            escalated: 2
                        }
                    ]
                };
                const handleCancel = ()=>{
                    navigate('/ai-tools/consultant');
                };
                const columns = [
                    {
                        title: '日期',
                        dataIndex: 'date',
                        key: 'date'
                    },
                    {
                        title: '对话数',
                        dataIndex: 'conversations',
                        key: 'conversations',
                        sorter: (a, b)=>a.conversations - b.conversations
                    },
                    {
                        title: '已解决',
                        dataIndex: 'resolved',
                        key: 'resolved',
                        render: (text, record)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                style: {
                                    color: '#52c41a'
                                },
                                children: text
                            }, void 0, false, {
                                fileName: "src/pages/agents/[id]/analytics.tsx",
                                lineNumber: 115,
                                columnNumber: 9
                            }, this)
                    },
                    {
                        title: '转人工',
                        dataIndex: 'escalated',
                        key: 'escalated',
                        render: (text, record)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                style: {
                                    color: '#faad14'
                                },
                                children: text
                            }, void 0, false, {
                                fileName: "src/pages/agents/[id]/analytics.tsx",
                                lineNumber: 123,
                                columnNumber: 9
                            }, this)
                    },
                    {
                        title: '解决率',
                        key: 'resolutionRate',
                        render: (_, record)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Progress, {
                                percent: Math.round(record.resolved / record.conversations * 100),
                                size: "small",
                                status: "active"
                            }, void 0, false, {
                                fileName: "src/pages/agents/[id]/analytics.tsx",
                                lineNumber: 130,
                                columnNumber: 9
                            }, this)
                    }
                ];
                // 无过渡加载页，直接展示轻量提示
                if (!agent) return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        padding: '24px',
                        background: '#fafafa',
                        minHeight: 'calc(100vh - 120px)'
                    },
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            maxWidth: '1200px',
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
                                        onClick: ()=>navigate('/ai-tools/consultant'),
                                        style: {
                                            border: 'none',
                                            padding: 0
                                        },
                                        children: "返回"
                                    }, void 0, false, {
                                        fileName: "src/pages/agents/[id]/analytics.tsx",
                                        lineNumber: 145,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                                        level: 3,
                                        style: {
                                            margin: 0,
                                            color: '#262626',
                                            fontSize: '18px'
                                        },
                                        children: "分析"
                                    }, void 0, false, {
                                        fileName: "src/pages/agents/[id]/analytics.tsx",
                                        lineNumber: 148,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/agents/[id]/analytics.tsx",
                                lineNumber: 144,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                style: {
                                    borderRadius: '8px',
                                    border: '1px solid #f0f0f0'
                                },
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        color: '#999'
                                    },
                                    children: "未找到分身数据，请返回列表重试。"
                                }, void 0, false, {
                                    fileName: "src/pages/agents/[id]/analytics.tsx",
                                    lineNumber: 153,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "src/pages/agents/[id]/analytics.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/agents/[id]/analytics.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "src/pages/agents/[id]/analytics.tsx",
                    lineNumber: 142,
                    columnNumber: 7
                }, this);
                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        padding: '24px',
                        background: '#fafafa',
                        minHeight: 'calc(100vh - 120px)'
                    },
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            maxWidth: '1200px',
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
                                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ArrowLeftOutlined, {}, void 0, false, {
                                            fileName: "src/pages/agents/[id]/analytics.tsx",
                                            lineNumber: 178,
                                            columnNumber: 19
                                        }, void 0),
                                        onClick: handleCancel,
                                        style: {
                                            border: 'none',
                                            padding: 0
                                        },
                                        children: "返回"
                                    }, void 0, false, {
                                        fileName: "src/pages/agents/[id]/analytics.tsx",
                                        lineNumber: 177,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            flex: 1
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                                                level: 3,
                                                style: {
                                                    margin: 0,
                                                    color: '#262626',
                                                    fontSize: '18px'
                                                },
                                                children: [
                                                    "分身分析 - ",
                                                    agent.role
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/pages/agents/[id]/analytics.tsx",
                                                lineNumber: 185,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                type: "secondary",
                                                style: {
                                                    fontSize: '13px'
                                                },
                                                children: "深入了解分身的表现和客户互动情况"
                                            }, void 0, false, {
                                                fileName: "src/pages/agents/[id]/analytics.tsx",
                                                lineNumber: 188,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/agents/[id]/analytics.tsx",
                                        lineNumber: 184,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                                value: timeRange,
                                                onChange: setTimeRange,
                                                style: {
                                                    width: 120
                                                },
                                                options: [
                                                    {
                                                        label: '最近7天',
                                                        value: '7d'
                                                    },
                                                    {
                                                        label: '最近30天',
                                                        value: '30d'
                                                    },
                                                    {
                                                        label: '最近90天',
                                                        value: '90d'
                                                    }
                                                ]
                                            }, void 0, false, {
                                                fileName: "src/pages/agents/[id]/analytics.tsx",
                                                lineNumber: 191,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(RangePicker, {
                                                value: dateRange,
                                                onChange: (dates)=>setDateRange(dates)
                                            }, void 0, false, {
                                                fileName: "src/pages/agents/[id]/analytics.tsx",
                                                lineNumber: 201,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/agents/[id]/analytics.tsx",
                                        lineNumber: 190,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/agents/[id]/analytics.tsx",
                                lineNumber: 171,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                                gutter: [
                                    24,
                                    24
                                ],
                                style: {
                                    marginBottom: '32px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                        xs: 24,
                                        sm: 12,
                                        lg: 6,
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                                title: "总对话数",
                                                value: analyticsData.totalConversations,
                                                prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.MessageOutlined, {}, void 0, false, {
                                                    fileName: "src/pages/agents/[id]/analytics.tsx",
                                                    lineNumber: 215,
                                                    columnNumber: 25
                                                }, void 0),
                                                valueStyle: {
                                                    color: '#1890ff'
                                                }
                                            }, void 0, false, {
                                                fileName: "src/pages/agents/[id]/analytics.tsx",
                                                lineNumber: 212,
                                                columnNumber: 15
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/pages/agents/[id]/analytics.tsx",
                                            lineNumber: 211,
                                            columnNumber: 13
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/pages/agents/[id]/analytics.tsx",
                                        lineNumber: 210,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                        xs: 24,
                                        sm: 12,
                                        lg: 6,
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                                title: "平均响应时间",
                                                value: analyticsData.avgResponseTime,
                                                suffix: "秒",
                                                prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ClockCircleOutlined, {}, void 0, false, {
                                                    fileName: "src/pages/agents/[id]/analytics.tsx",
                                                    lineNumber: 226,
                                                    columnNumber: 25
                                                }, void 0),
                                                valueStyle: {
                                                    color: '#52c41a'
                                                }
                                            }, void 0, false, {
                                                fileName: "src/pages/agents/[id]/analytics.tsx",
                                                lineNumber: 222,
                                                columnNumber: 15
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/pages/agents/[id]/analytics.tsx",
                                            lineNumber: 221,
                                            columnNumber: 13
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/pages/agents/[id]/analytics.tsx",
                                        lineNumber: 220,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                        xs: 24,
                                        sm: 12,
                                        lg: 6,
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                                title: "满意度评分",
                                                value: analyticsData.satisfactionScore,
                                                suffix: "/5",
                                                prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.TrophyOutlined, {}, void 0, false, {
                                                    fileName: "src/pages/agents/[id]/analytics.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 25
                                                }, void 0),
                                                valueStyle: {
                                                    color: '#faad14'
                                                }
                                            }, void 0, false, {
                                                fileName: "src/pages/agents/[id]/analytics.tsx",
                                                lineNumber: 233,
                                                columnNumber: 15
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/pages/agents/[id]/analytics.tsx",
                                            lineNumber: 232,
                                            columnNumber: 13
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/pages/agents/[id]/analytics.tsx",
                                        lineNumber: 231,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                        xs: 24,
                                        sm: 12,
                                        lg: 6,
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                                                title: "问题解决率",
                                                value: analyticsData.resolutionRate * 100,
                                                suffix: "%",
                                                prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.CheckCircleOutlined, {}, void 0, false, {
                                                    fileName: "src/pages/agents/[id]/analytics.tsx",
                                                    lineNumber: 248,
                                                    columnNumber: 25
                                                }, void 0),
                                                valueStyle: {
                                                    color: '#52c41a'
                                                }
                                            }, void 0, false, {
                                                fileName: "src/pages/agents/[id]/analytics.tsx",
                                                lineNumber: 244,
                                                columnNumber: 15
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/pages/agents/[id]/analytics.tsx",
                                            lineNumber: 243,
                                            columnNumber: 13
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/pages/agents/[id]/analytics.tsx",
                                        lineNumber: 242,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/agents/[id]/analytics.tsx",
                                lineNumber: 209,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                                gutter: [
                                    24,
                                    24
                                ],
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                        xs: 24,
                                        lg: 12,
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                            title: "渠道表现",
                                            style: {
                                                height: '100%'
                                            },
                                            children: analyticsData.channelStats.map((stat, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        padding: '12px 0',
                                                        borderBottom: index < analyticsData.channelStats.length - 1 ? '1px solid #f0f0f0' : 'none'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        fontWeight: 'bold'
                                                                    },
                                                                    children: stat.channel
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/agents/[id]/analytics.tsx",
                                                                    lineNumber: 269,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        color: '#666',
                                                                        fontSize: '12px'
                                                                    },
                                                                    children: [
                                                                        stat.conversations,
                                                                        " 次对话"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/pages/agents/[id]/analytics.tsx",
                                                                    lineNumber: 270,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/agents/[id]/analytics.tsx",
                                                            lineNumber: 268,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                textAlign: 'right'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        fontWeight: 'bold',
                                                                        color: '#faad14'
                                                                    },
                                                                    children: [
                                                                        stat.satisfaction,
                                                                        "/5"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/pages/agents/[id]/analytics.tsx",
                                                                    lineNumber: 275,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        color: '#666',
                                                                        fontSize: '12px'
                                                                    },
                                                                    children: "满意度"
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/agents/[id]/analytics.tsx",
                                                                    lineNumber: 278,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/agents/[id]/analytics.tsx",
                                                            lineNumber: 274,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, index, true, {
                                                    fileName: "src/pages/agents/[id]/analytics.tsx",
                                                    lineNumber: 261,
                                                    columnNumber: 17
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "src/pages/agents/[id]/analytics.tsx",
                                            lineNumber: 259,
                                            columnNumber: 13
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/pages/agents/[id]/analytics.tsx",
                                        lineNumber: 258,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                        xs: 24,
                                        lg: 12,
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                            title: "热门问题类型",
                                            style: {
                                                height: '100%'
                                            },
                                            children: analyticsData.topIssues.map((issue, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        padding: '12px 0',
                                                        borderBottom: index < analyticsData.topIssues.length - 1 ? '1px solid #f0f0f0' : 'none'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                flex: 1
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        fontWeight: 'bold'
                                                                    },
                                                                    children: issue.issue
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/agents/[id]/analytics.tsx",
                                                                    lineNumber: 297,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        color: '#666',
                                                                        fontSize: '12px'
                                                                    },
                                                                    children: [
                                                                        issue.count,
                                                                        " 次咨询"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/pages/agents/[id]/analytics.tsx",
                                                                    lineNumber: 298,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/agents/[id]/analytics.tsx",
                                                            lineNumber: 296,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                width: '100px',
                                                                marginLeft: '16px'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Progress, {
                                                                    percent: issue.percentage,
                                                                    size: "small",
                                                                    showInfo: false
                                                                }, void 0, false, {
                                                                    fileName: "src/pages/agents/[id]/analytics.tsx",
                                                                    lineNumber: 303,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        textAlign: 'center',
                                                                        fontSize: '12px',
                                                                        color: '#666'
                                                                    },
                                                                    children: [
                                                                        issue.percentage,
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/pages/agents/[id]/analytics.tsx",
                                                                    lineNumber: 308,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/pages/agents/[id]/analytics.tsx",
                                                            lineNumber: 302,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, index, true, {
                                                    fileName: "src/pages/agents/[id]/analytics.tsx",
                                                    lineNumber: 289,
                                                    columnNumber: 17
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "src/pages/agents/[id]/analytics.tsx",
                                            lineNumber: 287,
                                            columnNumber: 13
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/pages/agents/[id]/analytics.tsx",
                                        lineNumber: 286,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/agents/[id]/analytics.tsx",
                                lineNumber: 256,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                title: "每日详细统计",
                                style: {
                                    marginTop: '24px'
                                },
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Table, {
                                    columns: columns,
                                    dataSource: analyticsData.dailyStats,
                                    pagination: false,
                                    size: "small",
                                    rowKey: "date"
                                }, void 0, false, {
                                    fileName: "src/pages/agents/[id]/analytics.tsx",
                                    lineNumber: 320,
                                    columnNumber: 11
                                }, this)
                            }, void 0, false, {
                                fileName: "src/pages/agents/[id]/analytics.tsx",
                                lineNumber: 319,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                title: "性能洞察",
                                style: {
                                    marginTop: '24px'
                                },
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                                    gutter: [
                                        24,
                                        16
                                    ],
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                            xs: 24,
                                            md: 8,
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    background: '#f6ffed',
                                                    padding: '16px',
                                                    borderRadius: '6px',
                                                    border: '1px solid #b7eb8f'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            marginBottom: '8px'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.RiseOutlined, {
                                                                style: {
                                                                    color: '#52c41a',
                                                                    marginRight: '8px'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "src/pages/agents/[id]/analytics.tsx",
                                                                lineNumber: 340,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                strong: true,
                                                                children: "表现优秀"
                                                            }, void 0, false, {
                                                                fileName: "src/pages/agents/[id]/analytics.tsx",
                                                                lineNumber: 341,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/agents/[id]/analytics.tsx",
                                                        lineNumber: 339,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                        type: "secondary",
                                                        children: "响应时间保持在2.3秒以内，客户满意度达到4.6分"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/agents/[id]/analytics.tsx",
                                                        lineNumber: 343,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/pages/agents/[id]/analytics.tsx",
                                                lineNumber: 333,
                                                columnNumber: 15
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/pages/agents/[id]/analytics.tsx",
                                            lineNumber: 332,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                            xs: 24,
                                            md: 8,
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    background: '#fff7e6',
                                                    padding: '16px',
                                                    borderRadius: '6px',
                                                    border: '1px solid #ffd591'
                                                },
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
                                                                    color: '#faad14',
                                                                    marginRight: '8px'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "src/pages/agents/[id]/analytics.tsx",
                                                                lineNumber: 356,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                strong: true,
                                                                children: "需要关注"
                                                            }, void 0, false, {
                                                                fileName: "src/pages/agents/[id]/analytics.tsx",
                                                                lineNumber: 357,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/agents/[id]/analytics.tsx",
                                                        lineNumber: 355,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                        type: "secondary",
                                                        children: "转人工率为5%，建议优化知识库覆盖范围"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/agents/[id]/analytics.tsx",
                                                        lineNumber: 359,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/pages/agents/[id]/analytics.tsx",
                                                lineNumber: 349,
                                                columnNumber: 15
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/pages/agents/[id]/analytics.tsx",
                                            lineNumber: 348,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                            xs: 24,
                                            md: 8,
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    background: '#e6f7ff',
                                                    padding: '16px',
                                                    borderRadius: '6px',
                                                    border: '1px solid #91d5ff'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            marginBottom: '8px'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ClockCircleOutlined, {
                                                                style: {
                                                                    color: '#1890ff',
                                                                    marginRight: '8px'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "src/pages/agents/[id]/analytics.tsx",
                                                                lineNumber: 372,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                strong: true,
                                                                children: "活跃时段"
                                                            }, void 0, false, {
                                                                fileName: "src/pages/agents/[id]/analytics.tsx",
                                                                lineNumber: 373,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/pages/agents/[id]/analytics.tsx",
                                                        lineNumber: 371,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                        type: "secondary",
                                                        children: "工作日9-11点和14-16点为咨询高峰期"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/agents/[id]/analytics.tsx",
                                                        lineNumber: 375,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/pages/agents/[id]/analytics.tsx",
                                                lineNumber: 365,
                                                columnNumber: 15
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/pages/agents/[id]/analytics.tsx",
                                            lineNumber: 364,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/pages/agents/[id]/analytics.tsx",
                                    lineNumber: 331,
                                    columnNumber: 11
                                }, this)
                            }, void 0, false, {
                                fileName: "src/pages/agents/[id]/analytics.tsx",
                                lineNumber: 330,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/agents/[id]/analytics.tsx",
                        lineNumber: 166,
                        columnNumber: 7
                    }, this)
                }, void 0, false, {
                    fileName: "src/pages/agents/[id]/analytics.tsx",
                    lineNumber: 161,
                    columnNumber: 5
                }, this);
            };
            _s(AgentAnalyticsPage, "6owYYLBi/qIV/OLD+HQycvxqxIM=", false, function() {
                return [
                    _umi.useNavigate,
                    _umi.useParams
                ];
            });
            _c = AgentAnalyticsPage;
            var _default = AgentAnalyticsPage;
            var _c;
            $RefreshReg$(_c, "AgentAnalyticsPage");
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
        }
    }
}, function(runtime) {
    runtime._h = '13852262207978585589';
    runtime.updateEnsure2Map({
        "src/.umi/core/EmptyRoute.tsx": [
            "src/.umi/core/EmptyRoute.tsx"
        ],
        "src/.umi/plugin-layout/Layout.tsx": [
            "vendors",
            "src/.umi/plugin-layout/Layout.tsx"
        ],
        "src/.umi/plugin-openapi/openapi.tsx": [
            "vendors",
            "src/.umi/plugin-openapi/openapi.tsx"
        ],
        "src/pages/404.tsx": [
            "p__404"
        ],
        "src/pages/CustomerSuccess/index.tsx": [
            "p__CustomerSuccess__index"
        ],
        "src/pages/agents/index.tsx": [
            "p__agents__index"
        ],
        "src/pages/user/login/index.tsx": [
            "p__user__login__index"
        ]
    });
    ;
});

//# sourceMappingURL=p__agents__index-async.13579756080441839066.hot-update.js.map