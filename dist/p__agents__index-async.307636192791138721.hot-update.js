globalThis.makoModuleHotUpdate('p__agents__index', {
    modules: {
        "src/pages/agents/[id]/edit.tsx": function(module, exports, __mako_require__) {
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
            const { TextArea } = _antd.Input;
            const AgentEditPage = ({ agentId })=>{
                _s();
                const navigate = (0, _umi.useNavigate)();
                const params = (0, _umi.useParams)();
                const [form] = _antd.Form.useForm();
                const [agent, setAgent] = (0, _react.useState)(null);
                const [loading, setLoading] = (0, _react.useState)(false);
                // 优先使用props中的agentId，如果没有则使用params中的id
                const currentAgentId = agentId || params.id;
                (0, _react.useEffect)(()=>{
                    // 模拟从API获取Agent数据
                    const foundAgent = _agentData.mockAgents.find((a)=>a.id === currentAgentId);
                    if (foundAgent) {
                        setAgent(foundAgent);
                        form.setFieldsValue({
                            name: foundAgent.name,
                            role: foundAgent.role,
                            status: foundAgent.status,
                            channels: foundAgent.deployedChannels,
                            // 这里应该从Agent的实际配置中获取
                            knowledgeBases: [],
                            skills: []
                        });
                    } else {
                        _antd.message.error('分身不存在');
                        navigate('/ai-tools/consultant');
                    }
                }, [
                    currentAgentId,
                    form,
                    navigate
                ]);
                const handleSave = async ()=>{
                    try {
                        setLoading(true);
                        const values = await form.validateFields();
                        console.log('保存配置:', values);
                        // 模拟API调用
                        await new Promise((resolve)=>setTimeout(resolve, 1000));
                        _antd.message.success('配置保存成功！');
                        navigate('/ai-tools/consultant');
                    } catch (error) {
                        console.log('保存失败:', error);
                    } finally{
                        setLoading(false);
                    }
                };
                const handleCancel = ()=>{
                    navigate('/ai-tools/consultant');
                };
                const personalityOptions = [
                    {
                        label: '专业严谨',
                        value: 'professional'
                    },
                    {
                        label: '热情活泼',
                        value: 'enthusiastic'
                    },
                    {
                        label: '简洁高效',
                        value: 'concise'
                    }
                ];
                const channelOptions = [
                    {
                        label: '网页聊天',
                        value: 'web-chat'
                    },
                    {
                        label: '企业微信',
                        value: 'wecom'
                    },
                    {
                        label: '飞书',
                        value: 'lark'
                    }
                ];
                const getChannelIcon = (channel)=>{
                    switch(channel){
                        case 'web-chat':
                            return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.GlobalOutlined, {
                                style: {
                                    color: '#1890ff'
                                }
                            }, void 0, false, {
                                fileName: "src/pages/agents/[id]/edit.tsx",
                                lineNumber: 110,
                                columnNumber: 16
                            }, this);
                        case 'wecom':
                            return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.WechatOutlined, {
                                style: {
                                    color: '#07c160'
                                }
                            }, void 0, false, {
                                fileName: "src/pages/agents/[id]/edit.tsx",
                                lineNumber: 112,
                                columnNumber: 16
                            }, this);
                        case 'lark':
                            return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DingtalkOutlined, {
                                style: {
                                    color: '#00b96b'
                                }
                            }, void 0, false, {
                                fileName: "src/pages/agents/[id]/edit.tsx",
                                lineNumber: 114,
                                columnNumber: 16
                            }, this);
                        default:
                            return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.GlobalOutlined, {}, void 0, false, {
                                fileName: "src/pages/agents/[id]/edit.tsx",
                                lineNumber: 116,
                                columnNumber: 16
                            }, this);
                    }
                };
                // 如果没有拿到 agent，也不要显示“加载中”过渡，直接给出轻量提示界面
                if (!agent) return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
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
                                        onClick: ()=>navigate('/ai-tools/consultant'),
                                        style: {
                                            border: 'none',
                                            padding: 0
                                        },
                                        children: "返回"
                                    }, void 0, false, {
                                        fileName: "src/pages/agents/[id]/edit.tsx",
                                        lineNumber: 126,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                                        level: 3,
                                        style: {
                                            margin: 0,
                                            color: '#262626',
                                            fontSize: '18px'
                                        },
                                        children: "配置"
                                    }, void 0, false, {
                                        fileName: "src/pages/agents/[id]/edit.tsx",
                                        lineNumber: 129,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/agents/[id]/edit.tsx",
                                lineNumber: 125,
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
                                    fileName: "src/pages/agents/[id]/edit.tsx",
                                    lineNumber: 134,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "src/pages/agents/[id]/edit.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/agents/[id]/edit.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "src/pages/agents/[id]/edit.tsx",
                    lineNumber: 123,
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
                                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ArrowLeftOutlined, {}, void 0, false, {
                                            fileName: "src/pages/agents/[id]/edit.tsx",
                                            lineNumber: 159,
                                            columnNumber: 19
                                        }, void 0),
                                        onClick: handleCancel,
                                        style: {
                                            border: 'none',
                                            padding: 0
                                        },
                                        children: "返回"
                                    }, void 0, false, {
                                        fileName: "src/pages/agents/[id]/edit.tsx",
                                        lineNumber: 158,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                                        level: 3,
                                        style: {
                                            margin: 0,
                                            color: '#262626',
                                            fontSize: '18px'
                                        },
                                        children: [
                                            "配置分身 - ",
                                            agent.role
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/agents/[id]/edit.tsx",
                                        lineNumber: 165,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/agents/[id]/edit.tsx",
                                lineNumber: 152,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form, {
                                form: form,
                                layout: "vertical",
                                style: {
                                    maxWidth: '800px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                        title: "基本信息",
                                        style: {
                                            marginBottom: '24px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                                                gutter: 24,
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                        span: 12,
                                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                                            name: "name",
                                                            label: "内部名称",
                                                            rules: [
                                                                {
                                                                    required: true,
                                                                    message: '请输入内部名称'
                                                                }
                                                            ],
                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {
                                                                placeholder: "例如：数据看板配置助手"
                                                            }, void 0, false, {
                                                                fileName: "src/pages/agents/[id]/edit.tsx",
                                                                lineNumber: 184,
                                                                columnNumber: 19
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "src/pages/agents/[id]/edit.tsx",
                                                            lineNumber: 179,
                                                            columnNumber: 17
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "src/pages/agents/[id]/edit.tsx",
                                                        lineNumber: 178,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                        span: 12,
                                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                                            name: "role",
                                                            label: "对外角色",
                                                            rules: [
                                                                {
                                                                    required: true,
                                                                    message: '请输入对外角色'
                                                                }
                                                            ],
                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {
                                                                placeholder: "例如：小智"
                                                            }, void 0, false, {
                                                                fileName: "src/pages/agents/[id]/edit.tsx",
                                                                lineNumber: 193,
                                                                columnNumber: 19
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "src/pages/agents/[id]/edit.tsx",
                                                            lineNumber: 188,
                                                            columnNumber: 17
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "src/pages/agents/[id]/edit.tsx",
                                                        lineNumber: 187,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/pages/agents/[id]/edit.tsx",
                                                lineNumber: 177,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                                name: "personality",
                                                label: "AI 性格",
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请选择AI性格'
                                                    }
                                                ],
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Radio.Group, {
                                                    options: personalityOptions
                                                }, void 0, false, {
                                                    fileName: "src/pages/agents/[id]/edit.tsx",
                                                    lineNumber: 203,
                                                    columnNumber: 15
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/pages/agents/[id]/edit.tsx",
                                                lineNumber: 198,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                                name: "avatarUrl",
                                                label: "头像",
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '16px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                                                            size: 64,
                                                            src: agent.avatarUrl,
                                                            icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {}, void 0, false, {
                                                                fileName: "src/pages/agents/[id]/edit.tsx",
                                                                lineNumber: 211,
                                                                columnNumber: 63
                                                            }, void 0)
                                                        }, void 0, false, {
                                                            fileName: "src/pages/agents/[id]/edit.tsx",
                                                            lineNumber: 211,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Upload, {
                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UploadOutlined, {}, void 0, false, {
                                                                    fileName: "src/pages/agents/[id]/edit.tsx",
                                                                    lineNumber: 213,
                                                                    columnNumber: 33
                                                                }, void 0),
                                                                children: "更换头像"
                                                            }, void 0, false, {
                                                                fileName: "src/pages/agents/[id]/edit.tsx",
                                                                lineNumber: 213,
                                                                columnNumber: 19
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "src/pages/agents/[id]/edit.tsx",
                                                            lineNumber: 212,
                                                            columnNumber: 17
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/agents/[id]/edit.tsx",
                                                    lineNumber: 210,
                                                    columnNumber: 15
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/pages/agents/[id]/edit.tsx",
                                                lineNumber: 206,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/agents/[id]/edit.tsx",
                                        lineNumber: 176,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                        title: "状态管理",
                                        style: {
                                            marginBottom: '24px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                                name: "status",
                                                label: "运行状态",
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Radio.Group, {
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Radio.Button, {
                                                            value: "running",
                                                            children: "运行中"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/agents/[id]/edit.tsx",
                                                            lineNumber: 226,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Radio.Button, {
                                                            value: "paused",
                                                            children: "已暂停"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/agents/[id]/edit.tsx",
                                                            lineNumber: 227,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Radio.Button, {
                                                            value: "draft",
                                                            children: "草稿"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/agents/[id]/edit.tsx",
                                                            lineNumber: 228,
                                                            columnNumber: 17
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/agents/[id]/edit.tsx",
                                                    lineNumber: 225,
                                                    columnNumber: 15
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/pages/agents/[id]/edit.tsx",
                                                lineNumber: 221,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    background: '#f6ffed',
                                                    padding: '12px',
                                                    borderRadius: '6px',
                                                    border: '1px solid #b7eb8f'
                                                },
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                    type: "secondary",
                                                    children: "💡 提示：暂停状态的分身将停止响应客户请求，但保留所有配置和数据。"
                                                }, void 0, false, {
                                                    fileName: "src/pages/agents/[id]/edit.tsx",
                                                    lineNumber: 238,
                                                    columnNumber: 15
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/pages/agents/[id]/edit.tsx",
                                                lineNumber: 232,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/agents/[id]/edit.tsx",
                                        lineNumber: 220,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                        title: "知识库配置",
                                        style: {
                                            marginBottom: '24px'
                                        },
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                            name: "knowledgeBases",
                                            label: "选择知识库",
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox.Group, {
                                                children: _agentData.mockKnowledgeBases.map((item)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            marginBottom: '12px'
                                                        },
                                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                                            value: item.id,
                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                        style: {
                                                                            fontWeight: 'bold'
                                                                        },
                                                                        children: item.name
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/agents/[id]/edit.tsx",
                                                                        lineNumber: 255,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                        style: {
                                                                            color: '#666',
                                                                            fontSize: '12px'
                                                                        },
                                                                        children: item.description
                                                                    }, void 0, false, {
                                                                        fileName: "src/pages/agents/[id]/edit.tsx",
                                                                        lineNumber: 256,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/pages/agents/[id]/edit.tsx",
                                                                lineNumber: 254,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "src/pages/agents/[id]/edit.tsx",
                                                            lineNumber: 253,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, item.id, false, {
                                                        fileName: "src/pages/agents/[id]/edit.tsx",
                                                        lineNumber: 252,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "src/pages/agents/[id]/edit.tsx",
                                                lineNumber: 250,
                                                columnNumber: 15
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/pages/agents/[id]/edit.tsx",
                                            lineNumber: 246,
                                            columnNumber: 13
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/pages/agents/[id]/edit.tsx",
                                        lineNumber: 245,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                        title: "权限配置",
                                        style: {
                                            marginBottom: '24px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                                name: "skills",
                                                label: "系统权限",
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox.Group, {
                                                    children: _agentData.mockAgentSkills.map((item)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                marginBottom: '12px'
                                                            },
                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                                                value: item.id,
                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: '8px'
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                                    style: {
                                                                                        fontWeight: 'bold'
                                                                                    },
                                                                                    children: item.name
                                                                                }, void 0, false, {
                                                                                    fileName: "src/pages/agents/[id]/edit.tsx",
                                                                                    lineNumber: 277,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                                    style: {
                                                                                        color: '#666',
                                                                                        fontSize: '12px'
                                                                                    },
                                                                                    children: item.description
                                                                                }, void 0, false, {
                                                                                    fileName: "src/pages/agents/[id]/edit.tsx",
                                                                                    lineNumber: 278,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "src/pages/agents/[id]/edit.tsx",
                                                                            lineNumber: 276,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        item.isSensitive && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ExclamationCircleOutlined, {
                                                                            style: {
                                                                                color: '#faad14'
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "src/pages/agents/[id]/edit.tsx",
                                                                            lineNumber: 281,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/pages/agents/[id]/edit.tsx",
                                                                    lineNumber: 275,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "src/pages/agents/[id]/edit.tsx",
                                                                lineNumber: 274,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, item.id, false, {
                                                            fileName: "src/pages/agents/[id]/edit.tsx",
                                                            lineNumber: 273,
                                                            columnNumber: 19
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "src/pages/agents/[id]/edit.tsx",
                                                    lineNumber: 271,
                                                    columnNumber: 15
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/pages/agents/[id]/edit.tsx",
                                                lineNumber: 267,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    background: '#fff7e6',
                                                    padding: '12px',
                                                    borderRadius: '6px',
                                                    border: '1px solid #ffd591'
                                                },
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                    type: "warning",
                                                    children: "⚠️ 注意：敏感权限可能涉及客户数据操作，请谨慎授权。"
                                                }, void 0, false, {
                                                    fileName: "src/pages/agents/[id]/edit.tsx",
                                                    lineNumber: 296,
                                                    columnNumber: 15
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/pages/agents/[id]/edit.tsx",
                                                lineNumber: 290,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/agents/[id]/edit.tsx",
                                        lineNumber: 266,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                        title: "部署配置",
                                        style: {
                                            marginBottom: '24px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                                name: "channels",
                                                label: "部署渠道",
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请至少选择一个部署渠道'
                                                    }
                                                ],
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox.Group, {
                                                    options: channelOptions
                                                }, void 0, false, {
                                                    fileName: "src/pages/agents/[id]/edit.tsx",
                                                    lineNumber: 309,
                                                    columnNumber: 15
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/pages/agents/[id]/edit.tsx",
                                                lineNumber: 304,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    background: '#e6f7ff',
                                                    padding: '12px',
                                                    borderRadius: '6px',
                                                    border: '1px solid #91d5ff'
                                                },
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                    type: "secondary",
                                                    children: [
                                                        "📱 当前部署渠道：",
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                                            style: {
                                                                marginLeft: '8px'
                                                            },
                                                            children: agent.deployedChannels.map((channel)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                    icon: getChannelIcon(channel),
                                                                    children: channel === 'web-chat' ? '网页聊天' : channel === 'wecom' ? '企业微信' : '飞书'
                                                                }, channel, false, {
                                                                    fileName: "src/pages/agents/[id]/edit.tsx",
                                                                    lineNumber: 322,
                                                                    columnNumber: 21
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "src/pages/agents/[id]/edit.tsx",
                                                            lineNumber: 320,
                                                            columnNumber: 17
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/agents/[id]/edit.tsx",
                                                    lineNumber: 318,
                                                    columnNumber: 15
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/pages/agents/[id]/edit.tsx",
                                                lineNumber: 312,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/agents/[id]/edit.tsx",
                                        lineNumber: 303,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            textAlign: 'center',
                                            paddingTop: '24px',
                                            borderTop: '1px solid #f0f0f0'
                                        },
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                            size: "large",
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                    size: "large",
                                                    onClick: handleCancel,
                                                    style: {
                                                        width: '120px'
                                                    },
                                                    children: "取消"
                                                }, void 0, false, {
                                                    fileName: "src/pages/agents/[id]/edit.tsx",
                                                    lineNumber: 339,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                    type: "primary",
                                                    size: "large",
                                                    icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.SaveOutlined, {}, void 0, false, {
                                                        fileName: "src/pages/agents/[id]/edit.tsx",
                                                        lineNumber: 349,
                                                        columnNumber: 23
                                                    }, void 0),
                                                    onClick: handleSave,
                                                    loading: loading,
                                                    style: {
                                                        width: '120px'
                                                    },
                                                    children: "保存配置"
                                                }, void 0, false, {
                                                    fileName: "src/pages/agents/[id]/edit.tsx",
                                                    lineNumber: 346,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/pages/agents/[id]/edit.tsx",
                                            lineNumber: 338,
                                            columnNumber: 13
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/pages/agents/[id]/edit.tsx",
                                        lineNumber: 333,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/agents/[id]/edit.tsx",
                                lineNumber: 170,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/agents/[id]/edit.tsx",
                        lineNumber: 147,
                        columnNumber: 7
                    }, this)
                }, void 0, false, {
                    fileName: "src/pages/agents/[id]/edit.tsx",
                    lineNumber: 142,
                    columnNumber: 5
                }, this);
            };
            _s(AgentEditPage, "NftSswYZWmL+I/sIalJrVjrSbqE=", false, function() {
                return [
                    _umi.useNavigate,
                    _umi.useParams,
                    _antd.Form.useForm
                ];
            });
            _c = AgentEditPage;
            var _default = AgentEditPage;
            var _c;
            $RefreshReg$(_c, "AgentEditPage");
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
    runtime._h = '13579756080441839066';
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

//# sourceMappingURL=p__agents__index-async.307636192791138721.hot-update.js.map