globalThis.makoModuleHotUpdate('p__agents__index', {
    modules: {
        "src/pages/agents/index.tsx": function(module, exports, __mako_require__) {
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
            var _umi = __mako_require__("src/.umi/exports.ts");
            var _AgentCard = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/agents/AgentCard.tsx"));
            var _agentData = __mako_require__("src/mock/agentData.ts");
            var _AgentCreateForm = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/agents/AgentCreateForm.tsx"));
            var _edit = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/pages/agents/[id]/edit.tsx"));
            var _analytics = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/pages/agents/[id]/analytics.tsx"));
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
            const AgentsPage = ()=>{
                _s();
                const navigate = (0, _umi.useNavigate)();
                const location = (0, _umi.useLocation)();
                const [viewMode, setViewMode] = (0, _react.useState)('card');
                const [searchText, setSearchText] = (0, _react.useState)('');
                const [channelFilter, setChannelFilter] = (0, _react.useState)(undefined);
                const handleCreateAgent = ()=>{
                    navigate('/ai-tools/consultant/new');
                };
                const handleSubmit = (data)=>{
                    // TODO: 实现创建Agent的API调用
                    console.log('Creating agent with data:', data);
                    // 模拟API调用成功
                    _antd.message.success('分身创建成功！');
                    navigate('/ai-tools/consultant');
                };
                const handleCancel = ()=>{
                    navigate('/ai-tools/consultant');
                };
                // 根据当前路径决定显示什么内容
                const pathname = location.pathname;
                console.log('Current pathname:', pathname);
                // 如果是创建页面
                if (pathname === '/ai-tools/consultant/new') return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
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
                                        onClick: handleCancel,
                                        style: {
                                            border: 'none',
                                            padding: 0
                                        },
                                        children: "返回"
                                    }, void 0, false, {
                                        fileName: "src/pages/agents/index.tsx",
                                        lineNumber: 64,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                                        level: 3,
                                        style: {
                                            margin: 0,
                                            color: '#262626',
                                            fontSize: '18px'
                                        },
                                        children: "创建新分身"
                                    }, void 0, false, {
                                        fileName: "src/pages/agents/index.tsx",
                                        lineNumber: 70,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/agents/index.tsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_AgentCreateForm.default, {
                                allKnowledgeBases: _agentData.mockKnowledgeBases,
                                allAgentSkills: _agentData.mockAgentSkills,
                                onSubmit: handleSubmit,
                                onCancel: handleCancel
                            }, void 0, false, {
                                fileName: "src/pages/agents/index.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/agents/index.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "src/pages/agents/index.tsx",
                    lineNumber: 48,
                    columnNumber: 7
                }, this);
                // 如果是配置或分析页面
                const editMatch = pathname.match(/\/ai-tools\/consultant\/([^\/]+)\/edit/);
                const analyticsMatch = pathname.match(/\/ai-tools\/consultant\/([^\/]+)\/analytics/);
                if (editMatch || analyticsMatch) {
                    const agentId = editMatch ? editMatch[1] : analyticsMatch[1];
                    const isEdit = !!editMatch;
                    const agent = _agentData.mockAgents.find((a)=>a.id === agentId);
                    if (!agent) return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        children: "分身不存在"
                    }, void 0, false, {
                        fileName: "src/pages/agents/index.tsx",
                        lineNumber: 97,
                        columnNumber: 14
                    }, this);
                    // 直接渲染对应的组件，传递必要的参数
                    if (isEdit) return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_edit.default, {
                        agentId: agentId
                    }, void 0, false, {
                        fileName: "src/pages/agents/index.tsx",
                        lineNumber: 102,
                        columnNumber: 14
                    }, this);
                    else return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_analytics.default, {
                        agentId: agentId
                    }, void 0, false, {
                        fileName: "src/pages/agents/index.tsx",
                        lineNumber: 104,
                        columnNumber: 14
                    }, this);
                }
                const filteredAgents = (0, _react.useMemo)(()=>{
                    return _agentData.mockAgents.filter((a)=>{
                        const matchName = a.name.includes(searchText) || a.role.includes(searchText);
                        const matchChannel = channelFilter ? a.deployedChannels.includes(channelFilter) : true;
                        return matchName && matchChannel;
                    });
                }, [
                    searchText,
                    channelFilter
                ]);
                const listColumns = [
                    {
                        title: '名称',
                        dataIndex: 'name',
                        key: 'name'
                    },
                    {
                        title: '角色',
                        dataIndex: 'role',
                        key: 'role'
                    },
                    {
                        title: '状态',
                        dataIndex: 'status',
                        key: 'status',
                        render: (s)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                children: s
                            }, void 0, false, {
                                fileName: "src/pages/agents/index.tsx",
                                lineNumber: 119,
                                columnNumber: 79
                            }, this)
                    },
                    {
                        title: '服务客户',
                        dataIndex: [
                            'metrics',
                            'servedCustomers'
                        ],
                        key: 'servedCustomers'
                    },
                    {
                        title: '已解决',
                        dataIndex: [
                            'metrics',
                            'resolvedIssues'
                        ],
                        key: 'resolvedIssues'
                    },
                    {
                        title: '转人工率',
                        key: 'escalationRate',
                        render: (_, r)=>`${Math.round(r.metrics.escalationRate * 100)}%`
                    },
                    {
                        title: '渠道',
                        key: 'channels',
                        render: (_, r)=>r.deployedChannels.map((c)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                    children: c
                                }, c, false, {
                                    fileName: "src/pages/agents/index.tsx",
                                    lineNumber: 123,
                                    columnNumber: 103
                                }, this))
                    },
                    {
                        title: '操作',
                        key: 'actions',
                        render: (_, r)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                size: "small",
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        size: "small",
                                        onClick: ()=>navigate(`/ai-tools/consultant/${r.id}/edit`),
                                        children: "配置"
                                    }, void 0, false, {
                                        fileName: "src/pages/agents/index.tsx",
                                        lineNumber: 126,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        size: "small",
                                        onClick: ()=>navigate(`/ai-tools/consultant/${r.id}/analytics`),
                                        children: "分析"
                                    }, void 0, false, {
                                        fileName: "src/pages/agents/index.tsx",
                                        lineNumber: 127,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/agents/index.tsx",
                                lineNumber: 125,
                                columnNumber: 9
                            }, this)
                    }
                ];
                const channelOptions = [
                    {
                        label: '全部渠道',
                        value: undefined
                    },
                    {
                        label: 'web-chat',
                        value: 'web-chat'
                    },
                    {
                        label: 'wecom',
                        value: 'wecom'
                    },
                    {
                        label: 'lark',
                        value: 'lark'
                    }
                ];
                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        padding: '24px',
                        background: '#fafafa',
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
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '24px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                        size: "middle",
                                        wrap: true,
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {
                                                allowClear: true,
                                                placeholder: "按名称/角色搜索",
                                                value: searchText,
                                                onChange: (e)=>setSearchText(e.target.value),
                                                style: {
                                                    width: 220
                                                },
                                                size: "middle"
                                            }, void 0, false, {
                                                fileName: "src/pages/agents/index.tsx",
                                                lineNumber: 156,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                                allowClear: true,
                                                placeholder: "按渠道筛选",
                                                value: channelFilter,
                                                onChange: (v)=>setChannelFilter(v),
                                                options: channelOptions,
                                                style: {
                                                    width: 180
                                                },
                                                size: "middle"
                                            }, void 0, false, {
                                                fileName: "src/pages/agents/index.tsx",
                                                lineNumber: 164,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/agents/index.tsx",
                                        lineNumber: 155,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                        size: "small",
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.AppstoreOutlined, {}, void 0, false, {
                                                    fileName: "src/pages/agents/index.tsx",
                                                    lineNumber: 177,
                                                    columnNumber: 21
                                                }, void 0),
                                                type: viewMode === 'card' ? 'primary' : 'default',
                                                size: "middle",
                                                onClick: ()=>setViewMode('card')
                                            }, void 0, false, {
                                                fileName: "src/pages/agents/index.tsx",
                                                lineNumber: 176,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UnorderedListOutlined, {}, void 0, false, {
                                                    fileName: "src/pages/agents/index.tsx",
                                                    lineNumber: 183,
                                                    columnNumber: 21
                                                }, void 0),
                                                type: viewMode === 'list' ? 'primary' : 'default',
                                                size: "middle",
                                                onClick: ()=>setViewMode('list')
                                            }, void 0, false, {
                                                fileName: "src/pages/agents/index.tsx",
                                                lineNumber: 182,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                type: "primary",
                                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PlusOutlined, {}, void 0, false, {
                                                    fileName: "src/pages/agents/index.tsx",
                                                    lineNumber: 190,
                                                    columnNumber: 21
                                                }, void 0),
                                                size: "middle",
                                                onClick: handleCreateAgent,
                                                style: {
                                                    borderRadius: '6px',
                                                    fontWeight: '500'
                                                },
                                                children: "创建新分身"
                                            }, void 0, false, {
                                                fileName: "src/pages/agents/index.tsx",
                                                lineNumber: 188,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/agents/index.tsx",
                                        lineNumber: 175,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/agents/index.tsx",
                                lineNumber: 149,
                                columnNumber: 9
                            }, this),
                            viewMode === 'card' ? /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                                gutter: [
                                    16,
                                    16
                                ],
                                children: filteredAgents.map((agent)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                        xs: 24,
                                        sm: 12,
                                        md: 8,
                                        lg: 6,
                                        xl: 6,
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_AgentCard.default, {
                                            agent: agent
                                        }, void 0, false, {
                                            fileName: "src/pages/agents/index.tsx",
                                            lineNumber: 202,
                                            columnNumber: 17
                                        }, this)
                                    }, agent.id, false, {
                                        fileName: "src/pages/agents/index.tsx",
                                        lineNumber: 201,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "src/pages/agents/index.tsx",
                                lineNumber: 199,
                                columnNumber: 11
                            }, this) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Table, {
                                rowKey: "id",
                                size: "small",
                                pagination: {
                                    pageSize: 8
                                },
                                dataSource: filteredAgents,
                                columns: listColumns,
                                style: {
                                    background: '#fff',
                                    borderRadius: 8
                                }
                            }, void 0, false, {
                                fileName: "src/pages/agents/index.tsx",
                                lineNumber: 207,
                                columnNumber: 11
                            }, this),
                            _agentData.mockAgents.length === 0 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    textAlign: 'center',
                                    padding: '80px 20px',
                                    color: '#999'
                                },
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            fontSize: '64px',
                                            marginBottom: '24px'
                                        },
                                        children: "🤖"
                                    }, void 0, false, {
                                        fileName: "src/pages/agents/index.tsx",
                                        lineNumber: 224,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                                        level: 3,
                                        style: {
                                            color: '#666',
                                            marginBottom: '16px'
                                        },
                                        children: "还没有创建任何分身"
                                    }, void 0, false, {
                                        fileName: "src/pages/agents/index.tsx",
                                        lineNumber: 225,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("p", {
                                        style: {
                                            fontSize: '16px',
                                            color: '#999',
                                            marginBottom: '32px'
                                        },
                                        children: '点击右上角的"创建新分身"按钮开始创建您的第一个AI助手'
                                    }, void 0, false, {
                                        fileName: "src/pages/agents/index.tsx",
                                        lineNumber: 228,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        type: "primary",
                                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PlusOutlined, {}, void 0, false, {
                                            fileName: "src/pages/agents/index.tsx",
                                            lineNumber: 233,
                                            columnNumber: 21
                                        }, void 0),
                                        onClick: handleCreateAgent,
                                        size: "large",
                                        style: {
                                            height: '48px',
                                            borderRadius: '6px',
                                            fontWeight: '500'
                                        },
                                        children: "创建第一个分身"
                                    }, void 0, false, {
                                        fileName: "src/pages/agents/index.tsx",
                                        lineNumber: 231,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/agents/index.tsx",
                                lineNumber: 219,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/agents/index.tsx",
                        lineNumber: 144,
                        columnNumber: 7
                    }, this)
                }, void 0, false, {
                    fileName: "src/pages/agents/index.tsx",
                    lineNumber: 139,
                    columnNumber: 5
                }, this);
            };
            _s(AgentsPage, "hT8CaHaqzsrKZvjQWT1Uum6+pp4=", false, function() {
                return [
                    _umi.useNavigate,
                    _umi.useLocation
                ];
            });
            _c = AgentsPage;
            var _default = AgentsPage;
            var _c;
            $RefreshReg$(_c, "AgentsPage");
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
    runtime._h = '8767809277585889247';
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

//# sourceMappingURL=p__agents__index-async.13852262207978585589.hot-update.js.map