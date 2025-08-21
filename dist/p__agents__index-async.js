((typeof globalThis !== 'undefined' ? globalThis : self)["makoChunk_ant-design-pro"] = (typeof globalThis !== 'undefined' ? globalThis : self)["makoChunk_ant-design-pro"] || []).push([
        ['p__agents__index'],
{ "src/components/agents/AgentCard.tsx": function (module, exports, __mako_require__){
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
var _AgentStatusBadge = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/agents/AgentStatusBadge.tsx"));
var _umi = __mako_require__("src/.umi/exports.ts");
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
var _s = $RefreshSig$();
const AgentCard = ({ agent })=>{
    _s();
    const navigate = (0, _umi.useNavigate)();
    const getChannelIcon = (channel)=>{
        switch(channel){
            case 'web-chat':
                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.GlobalOutlined, {
                    style: {
                        color: '#1890ff'
                    }
                }, void 0, false, {
                    fileName: "src/components/agents/AgentCard.tsx",
                    lineNumber: 31,
                    columnNumber: 16
                }, this);
            case 'wecom':
                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.WechatOutlined, {
                    style: {
                        color: '#07c160'
                    }
                }, void 0, false, {
                    fileName: "src/components/agents/AgentCard.tsx",
                    lineNumber: 33,
                    columnNumber: 16
                }, this);
            case 'lark':
                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DingtalkOutlined, {
                    style: {
                        color: '#00b96b'
                    }
                }, void 0, false, {
                    fileName: "src/components/agents/AgentCard.tsx",
                    lineNumber: 35,
                    columnNumber: 16
                }, this);
            default:
                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.GlobalOutlined, {}, void 0, false, {
                    fileName: "src/components/agents/AgentCard.tsx",
                    lineNumber: 37,
                    columnNumber: 16
                }, this);
        }
    };
    const handleConfigure = ()=>{
        navigate(`/ai-tools/consultant/${agent.id}/edit`);
    };
    const handleAnalytics = ()=>{
        navigate(`/ai-tools/consultant/${agent.id}/analytics`);
    };
    const handleToggleStatus = ()=>{
        // TODO: 实现状态切换逻辑
        console.log('Toggle status for agent:', agent.id);
    };
    const handleDelete = ()=>{
        // TODO: 实现删除逻辑
        console.log('Delete agent:', agent.id);
    };
    const moreMenuItems = [
        {
            key: 'toggle-status',
            icon: agent.status === 'running' ? /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PauseCircleOutlined, {}, void 0, false, {
                fileName: "src/components/agents/AgentCard.tsx",
                lineNumber: 62,
                columnNumber: 42
            }, this) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PlayCircleOutlined, {}, void 0, false, {
                fileName: "src/components/agents/AgentCard.tsx",
                lineNumber: 62,
                columnNumber: 68
            }, this),
            label: agent.status === 'running' ? '暂停' : '启动',
            onClick: handleToggleStatus
        },
        {
            key: 'delete',
            icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DeleteOutlined, {}, void 0, false, {
                fileName: "src/components/agents/AgentCard.tsx",
                lineNumber: 68,
                columnNumber: 13
            }, this),
            label: '删除',
            danger: true,
            onClick: handleDelete
        }
    ];
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
        hoverable: true,
        style: {
            height: '100%',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #f0f0f0',
            transition: 'all 0.3s ease'
        },
        bodyStyle: {
            padding: '16px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        },
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '12px'
                },
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Avatar, {
                        size: 40,
                        src: agent.avatarUrl,
                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {}, void 0, false, {
                            fileName: "src/components/agents/AgentCard.tsx",
                            lineNumber: 97,
                            columnNumber: 17
                        }, void 0),
                        style: {
                            marginRight: '10px'
                        }
                    }, void 0, false, {
                        fileName: "src/components/agents/AgentCard.tsx",
                        lineNumber: 94,
                        columnNumber: 9
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
                                children: agent.name
                            }, void 0, false, {
                                fileName: "src/components/agents/AgentCard.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    color: '#666',
                                    fontSize: '12px',
                                    marginBottom: '6px'
                                },
                                children: agent.role
                            }, void 0, false, {
                                fileName: "src/components/agents/AgentCard.tsx",
                                lineNumber: 104,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_AgentStatusBadge.default, {
                                status: agent.status
                            }, void 0, false, {
                                fileName: "src/components/agents/AgentCard.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/agents/AgentCard.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/agents/AgentCard.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                gutter: 12,
                style: {
                    marginBottom: '12px'
                },
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        span: 8,
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                            title: "服务客户",
                            value: agent.metrics.servedCustomers,
                            prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {}, void 0, false, {
                                fileName: "src/components/agents/AgentCard.tsx",
                                lineNumber: 117,
                                columnNumber: 21
                            }, void 0),
                            valueStyle: {
                                fontSize: '14px',
                                fontWeight: 'bold'
                            }
                        }, void 0, false, {
                            fileName: "src/components/agents/AgentCard.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/components/agents/AgentCard.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        span: 8,
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                            title: "解决问题",
                            value: agent.metrics.resolvedIssues,
                            prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.CheckCircleOutlined, {}, void 0, false, {
                                fileName: "src/components/agents/AgentCard.tsx",
                                lineNumber: 125,
                                columnNumber: 21
                            }, void 0),
                            valueStyle: {
                                fontSize: '14px',
                                fontWeight: 'bold'
                            }
                        }, void 0, false, {
                            fileName: "src/components/agents/AgentCard.tsx",
                            lineNumber: 122,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/components/agents/AgentCard.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                        span: 8,
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Statistic, {
                            title: "转人工率",
                            value: agent.metrics.escalationRate * 100,
                            suffix: "%",
                            prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ExclamationCircleOutlined, {}, void 0, false, {
                                fileName: "src/components/agents/AgentCard.tsx",
                                lineNumber: 134,
                                columnNumber: 21
                            }, void 0),
                            valueStyle: {
                                fontSize: '14px',
                                fontWeight: 'bold'
                            }
                        }, void 0, false, {
                            fileName: "src/components/agents/AgentCard.tsx",
                            lineNumber: 130,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/components/agents/AgentCard.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/agents/AgentCard.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    marginBottom: '12px'
                },
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            fontSize: '11px',
                            color: '#666',
                            marginBottom: '6px'
                        },
                        children: "部署渠道"
                    }, void 0, false, {
                        fileName: "src/components/agents/AgentCard.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                        children: agent.deployedChannels.length > 0 ? agent.deployedChannels.map((channel)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                title: channel,
                                children: getChannelIcon(channel)
                            }, channel, false, {
                                fileName: "src/components/agents/AgentCard.tsx",
                                lineNumber: 148,
                                columnNumber: 15
                            }, this)) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                            style: {
                                color: '#999',
                                fontSize: '11px'
                            },
                            children: "未部署"
                        }, void 0, false, {
                            fileName: "src/components/agents/AgentCard.tsx",
                            lineNumber: 153,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "src/components/agents/AgentCard.tsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/agents/AgentCard.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'auto',
                    paddingTop: '12px',
                    borderTop: '1px solid #f0f0f0'
                },
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                        size: "small",
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                type: "primary",
                                size: "small",
                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.SettingOutlined, {}, void 0, false, {
                                    fileName: "src/components/agents/AgentCard.tsx",
                                    lineNumber: 171,
                                    columnNumber: 19
                                }, void 0),
                                onClick: handleConfigure,
                                style: {
                                    borderRadius: '4px',
                                    fontWeight: '500',
                                    fontSize: '12px',
                                    height: '28px',
                                    padding: '0 8px'
                                },
                                children: "配置"
                            }, void 0, false, {
                                fileName: "src/components/agents/AgentCard.tsx",
                                lineNumber: 168,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                size: "small",
                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.BarChartOutlined, {}, void 0, false, {
                                    fileName: "src/components/agents/AgentCard.tsx",
                                    lineNumber: 185,
                                    columnNumber: 19
                                }, void 0),
                                onClick: handleAnalytics,
                                style: {
                                    borderRadius: '4px',
                                    fontWeight: '500',
                                    fontSize: '12px',
                                    height: '28px',
                                    padding: '0 8px'
                                },
                                children: "分析"
                            }, void 0, false, {
                                fileName: "src/components/agents/AgentCard.tsx",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/agents/AgentCard.tsx",
                        lineNumber: 167,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Dropdown, {
                        menu: {
                            items: moreMenuItems
                        },
                        placement: "bottomRight",
                        trigger: [
                            'click'
                        ],
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                            type: "text",
                            size: "small",
                            icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.MoreOutlined, {}, void 0, false, {
                                fileName: "src/components/agents/AgentCard.tsx",
                                lineNumber: 207,
                                columnNumber: 19
                            }, void 0),
                            style: {
                                borderRadius: '4px',
                                height: '28px',
                                width: '28px',
                                padding: '0'
                            }
                        }, void 0, false, {
                            fileName: "src/components/agents/AgentCard.tsx",
                            lineNumber: 204,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/components/agents/AgentCard.tsx",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/agents/AgentCard.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/components/agents/AgentCard.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
};
_s(AgentCard, "CzcTeTziyjMsSrAVmHuCCb6+Bfg=", false, function() {
    return [
        _umi.useNavigate
    ];
});
_c = AgentCard;
var _default = AgentCard;
var _c;
$RefreshReg$(_c, "AgentCard");
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
"src/components/agents/AgentCreateForm.tsx": function (module, exports, __mako_require__){
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
const { Step } = _antd.Steps;
const { Title } = _antd.Typography;
const AgentCreateForm = ({ allKnowledgeBases, allAgentSkills, onSubmit, onCancel })=>{
    _s();
    const [currentStep, setCurrentStep] = (0, _react.useState)(1);
    const [form] = _antd.Form.useForm();
    const [formData, setFormData] = (0, _react.useState)({
        name: '',
        role: '',
        personality: 'professional',
        avatarUrl: '',
        knowledgeBases: [],
        skills: [],
        channels: []
    });
    const handleFormChange = (changedValues, allValues)=>{
        setFormData(allValues);
    };
    const handleNext = async ()=>{
        try {
            await form.validateFields();
            if (currentStep < 3) setCurrentStep(currentStep + 1);
        } catch (error) {
            console.log('Validation failed:', error);
        }
    };
    const handlePrev = ()=>{
        setCurrentStep(currentStep - 1);
    };
    const handleSubmit = async ()=>{
        try {
            const values = await form.validateFields();
            onSubmit(values);
        } catch (error) {
            console.log('Submit failed:', error);
        }
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
    const renderStep1 = ()=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
            children: [
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                    level: 4,
                    style: {
                        fontSize: '16px'
                    },
                    children: "身份设定"
                }, void 0, false, {
                    fileName: "src/components/agents/AgentCreateForm.tsx",
                    lineNumber: 100,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
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
                        fileName: "src/components/agents/AgentCreateForm.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "src/components/agents/AgentCreateForm.tsx",
                    lineNumber: 101,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
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
                        fileName: "src/components/agents/AgentCreateForm.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "src/components/agents/AgentCreateForm.tsx",
                    lineNumber: 109,
                    columnNumber: 7
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
                        fileName: "src/components/agents/AgentCreateForm.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "src/components/agents/AgentCreateForm.tsx",
                    lineNumber: 117,
                    columnNumber: 7
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
                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {}, void 0, false, {
                                    fileName: "src/components/agents/AgentCreateForm.tsx",
                                    lineNumber: 130,
                                    columnNumber: 35
                                }, void 0)
                            }, void 0, false, {
                                fileName: "src/components/agents/AgentCreateForm.tsx",
                                lineNumber: 130,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Upload, {
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                    icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UploadOutlined, {}, void 0, false, {
                                        fileName: "src/components/agents/AgentCreateForm.tsx",
                                        lineNumber: 132,
                                        columnNumber: 27
                                    }, void 0),
                                    children: "上传头像"
                                }, void 0, false, {
                                    fileName: "src/components/agents/AgentCreateForm.tsx",
                                    lineNumber: 132,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "src/components/agents/AgentCreateForm.tsx",
                                lineNumber: 131,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/agents/AgentCreateForm.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "src/components/agents/AgentCreateForm.tsx",
                    lineNumber: 125,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/components/agents/AgentCreateForm.tsx",
            lineNumber: 99,
            columnNumber: 5
        }, this);
    const renderStep2 = ()=>{
        var _formData_skills;
        return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
            children: [
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                    level: 4,
                    style: {
                        fontSize: '16px'
                    },
                    children: "知识与技能"
                }, void 0, false, {
                    fileName: "src/components/agents/AgentCreateForm.tsx",
                    lineNumber: 141,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                    name: "knowledgeBases",
                    label: "知识库",
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox.Group, {
                        children: allKnowledgeBases.map((item)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    marginBottom: '8px'
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
                                                fileName: "src/components/agents/AgentCreateForm.tsx",
                                                lineNumber: 152,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    color: '#666',
                                                    fontSize: '12px'
                                                },
                                                children: item.description
                                            }, void 0, false, {
                                                fileName: "src/components/agents/AgentCreateForm.tsx",
                                                lineNumber: 153,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/agents/AgentCreateForm.tsx",
                                        lineNumber: 151,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/agents/AgentCreateForm.tsx",
                                    lineNumber: 150,
                                    columnNumber: 15
                                }, this)
                            }, item.id, false, {
                                fileName: "src/components/agents/AgentCreateForm.tsx",
                                lineNumber: 149,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "src/components/agents/AgentCreateForm.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "src/components/agents/AgentCreateForm.tsx",
                    lineNumber: 143,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                    name: "skills",
                    label: "系统权限",
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox.Group, {
                        children: allAgentSkills.map((item)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    marginBottom: '8px'
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
                                                        fileName: "src/components/agents/AgentCreateForm.tsx",
                                                        lineNumber: 171,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                        style: {
                                                            color: '#666',
                                                            fontSize: '12px'
                                                        },
                                                        children: item.description
                                                    }, void 0, false, {
                                                        fileName: "src/components/agents/AgentCreateForm.tsx",
                                                        lineNumber: 172,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/agents/AgentCreateForm.tsx",
                                                lineNumber: 170,
                                                columnNumber: 19
                                            }, this),
                                            item.isSensitive && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ExclamationCircleOutlined, {
                                                style: {
                                                    color: '#faad14'
                                                }
                                            }, void 0, false, {
                                                fileName: "src/components/agents/AgentCreateForm.tsx",
                                                lineNumber: 175,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/agents/AgentCreateForm.tsx",
                                        lineNumber: 169,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/agents/AgentCreateForm.tsx",
                                    lineNumber: 168,
                                    columnNumber: 15
                                }, this)
                            }, item.id, false, {
                                fileName: "src/components/agents/AgentCreateForm.tsx",
                                lineNumber: 167,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "src/components/agents/AgentCreateForm.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "src/components/agents/AgentCreateForm.tsx",
                    lineNumber: 161,
                    columnNumber: 7
                }, this),
                ((_formData_skills = formData.skills) === null || _formData_skills === void 0 ? void 0 : _formData_skills.some((skillId)=>{
                    var _allAgentSkills_find;
                    return (_allAgentSkills_find = allAgentSkills.find((skill)=>skill.id === skillId)) === null || _allAgentSkills_find === void 0 ? void 0 : _allAgentSkills_find.isSensitive;
                })) && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Alert, {
                    message: "注意",
                    description: "您选择了敏感权限，请确保Agent的使用符合安全规范。",
                    type: "warning",
                    showIcon: true,
                    style: {
                        marginBottom: '16px'
                    }
                }, void 0, false, {
                    fileName: "src/components/agents/AgentCreateForm.tsx",
                    lineNumber: 187,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/components/agents/AgentCreateForm.tsx",
            lineNumber: 140,
            columnNumber: 5
        }, this);
    };
    const renderStep3 = ()=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
            children: [
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                    level: 4,
                    style: {
                        fontSize: '16px'
                    },
                    children: "部署"
                }, void 0, false, {
                    fileName: "src/components/agents/AgentCreateForm.tsx",
                    lineNumber: 200,
                    columnNumber: 7
                }, this),
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
                        fileName: "src/components/agents/AgentCreateForm.tsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "src/components/agents/AgentCreateForm.tsx",
                    lineNumber: 202,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Alert, {
                    message: "创建完成",
                    description: "分身创建后将进入草稿状态，您可以在配置页面进行进一步设置。",
                    type: "info",
                    showIcon: true,
                    style: {
                        marginBottom: '16px'
                    }
                }, void 0, false, {
                    fileName: "src/components/agents/AgentCreateForm.tsx",
                    lineNumber: 210,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/components/agents/AgentCreateForm.tsx",
            lineNumber: 199,
            columnNumber: 5
        }, this);
    const steps = [
        {
            title: '身份设定',
            icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {}, void 0, false, {
                fileName: "src/components/agents/AgentCreateForm.tsx",
                lineNumber: 223,
                columnNumber: 13
            }, this),
            content: renderStep1()
        },
        {
            title: '知识与技能',
            icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.BookOutlined, {}, void 0, false, {
                fileName: "src/components/agents/AgentCreateForm.tsx",
                lineNumber: 228,
                columnNumber: 13
            }, this),
            content: renderStep2()
        },
        {
            title: '部署',
            icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.RocketOutlined, {}, void 0, false, {
                fileName: "src/components/agents/AgentCreateForm.tsx",
                lineNumber: 233,
                columnNumber: 13
            }, this),
            content: renderStep3()
        }
    ];
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            maxWidth: '800px',
            margin: '0 auto'
        },
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Steps, {
                current: currentStep - 1,
                style: {
                    marginBottom: '24px'
                },
                progressDot: true,
                size: "small",
                children: steps.map((step, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Step, {
                        title: step.title,
                        icon: step.icon
                    }, index, false, {
                        fileName: "src/components/agents/AgentCreateForm.tsx",
                        lineNumber: 247,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "src/components/agents/AgentCreateForm.tsx",
                lineNumber: 240,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                style: {
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    border: '1px solid #f0f0f0'
                },
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form, {
                    form: form,
                    layout: "vertical",
                    initialValues: formData,
                    onValuesChange: handleFormChange,
                    children: [
                        steps[currentStep - 1].content,
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                marginTop: '32px',
                                textAlign: 'center',
                                paddingTop: '24px',
                                borderTop: '1px solid #f0f0f0'
                            },
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                size: "large",
                                children: [
                                    currentStep > 1 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        onClick: handlePrev,
                                        size: "large",
                                        style: {
                                            width: '120px'
                                        },
                                        children: "上一步"
                                    }, void 0, false, {
                                        fileName: "src/components/agents/AgentCreateForm.tsx",
                                        lineNumber: 274,
                                        columnNumber: 17
                                    }, this),
                                    currentStep < steps.length ? /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        type: "primary",
                                        onClick: handleNext,
                                        size: "large",
                                        style: {
                                            width: '120px'
                                        },
                                        children: "下一步"
                                    }, void 0, false, {
                                        fileName: "src/components/agents/AgentCreateForm.tsx",
                                        lineNumber: 284,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        type: "primary",
                                        onClick: handleSubmit,
                                        size: "large",
                                        style: {
                                            width: '120px'
                                        },
                                        children: "创建分身"
                                    }, void 0, false, {
                                        fileName: "src/components/agents/AgentCreateForm.tsx",
                                        lineNumber: 293,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        onClick: onCancel,
                                        size: "large",
                                        style: {
                                            width: '120px'
                                        },
                                        children: "取消"
                                    }, void 0, false, {
                                        fileName: "src/components/agents/AgentCreateForm.tsx",
                                        lineNumber: 303,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/agents/AgentCreateForm.tsx",
                                lineNumber: 272,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/agents/AgentCreateForm.tsx",
                            lineNumber: 266,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/agents/AgentCreateForm.tsx",
                    lineNumber: 258,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/agents/AgentCreateForm.tsx",
                lineNumber: 251,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/components/agents/AgentCreateForm.tsx",
        lineNumber: 239,
        columnNumber: 5
    }, this);
};
_s(AgentCreateForm, "wFFrz1y5YQn6kuOZ/zNiyDX2PM4=", false, function() {
    return [
        _antd.Form.useForm
    ];
});
_c = AgentCreateForm;
var _default = AgentCreateForm;
var _c;
$RefreshReg$(_c, "AgentCreateForm");
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
"src/components/agents/AgentStatusBadge.tsx": function (module, exports, __mako_require__){
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
const AgentStatusBadge = ({ status })=>{
    const getStatusConfig = (status)=>{
        switch(status){
            case 'running':
                return {
                    color: 'success',
                    text: '运行中',
                    icon: '🟢'
                };
            case 'paused':
                return {
                    color: 'warning',
                    text: '已暂停',
                    icon: '🟡'
                };
            case 'draft':
                return {
                    color: 'default',
                    text: '草稿',
                    icon: '⚪'
                };
            default:
                return {
                    color: 'default',
                    text: '未知',
                    icon: '❓'
                };
        }
    };
    const config = getStatusConfig(status);
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
        color: config.color,
        style: {
            margin: 0
        },
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                style: {
                    marginRight: 4
                },
                children: config.icon
            }, void 0, false, {
                fileName: "src/components/agents/AgentStatusBadge.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            config.text
        ]
    }, void 0, true, {
        fileName: "src/components/agents/AgentStatusBadge.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
};
_c = AgentStatusBadge;
var _default = AgentStatusBadge;
var _c;
$RefreshReg$(_c, "AgentStatusBadge");
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
"src/mock/agentData.ts": function (module, exports, __mako_require__){
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
    mockAgentSkills: function() {
        return mockAgentSkills;
    },
    mockAgents: function() {
        return mockAgents;
    },
    mockKnowledgeBases: function() {
        return mockKnowledgeBases;
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
const mockAgents = [
    {
        id: 'agent-001',
        name: '数据看板配置助手',
        role: '小智',
        avatarUrl: '/api/avatar/agent-001.png',
        status: 'running',
        metrics: {
            servedCustomers: 156,
            resolvedIssues: 89,
            escalationRate: 0.05
        },
        deployedChannels: [
            'web-chat',
            'wecom'
        ],
        createdAt: '2024-01-15T10:30:00Z'
    },
    {
        id: 'agent-002',
        name: '客户服务专员',
        role: '小美',
        avatarUrl: '/api/avatar/agent-002.png',
        status: 'paused',
        metrics: {
            servedCustomers: 203,
            resolvedIssues: 145,
            escalationRate: 0.08
        },
        deployedChannels: [
            'web-chat',
            'lark'
        ],
        createdAt: '2024-01-10T14:20:00Z'
    },
    {
        id: 'agent-003',
        name: '产品咨询专家',
        role: '小博',
        avatarUrl: '/api/avatar/agent-003.png',
        status: 'draft',
        metrics: {
            servedCustomers: 0,
            resolvedIssues: 0,
            escalationRate: 0
        },
        deployedChannels: [],
        createdAt: '2024-01-20T09:15:00Z'
    },
    {
        id: 'agent-004',
        name: '技术支持工程师',
        role: '小技',
        avatarUrl: '/api/avatar/agent-004.png',
        status: 'running',
        metrics: {
            servedCustomers: 89,
            resolvedIssues: 67,
            escalationRate: 0.12
        },
        deployedChannels: [
            'web-chat'
        ],
        createdAt: '2024-01-18T16:45:00Z'
    },
    {
        id: 'agent-005',
        name: '销售顾问',
        role: '小销',
        avatarUrl: '/api/avatar/agent-005.png',
        status: 'running',
        metrics: {
            servedCustomers: 234,
            resolvedIssues: 198,
            escalationRate: 0.03
        },
        deployedChannels: [
            'wecom',
            'lark'
        ],
        createdAt: '2024-01-12T11:20:00Z'
    }
];
const mockKnowledgeBases = [
    {
        id: 'kb-001',
        name: '产品使用手册',
        description: '包含所有产品功能的详细使用说明和最佳实践'
    },
    {
        id: 'kb-002',
        name: '常见问题解答',
        description: '客户经常遇到的问题和标准答案'
    },
    {
        id: 'kb-003',
        name: '技术文档',
        description: 'API文档、集成指南和技术规格说明'
    },
    {
        id: 'kb-004',
        name: '销售资料',
        description: '产品介绍、价格表和销售话术'
    },
    {
        id: 'kb-005',
        name: '客户案例',
        description: '成功案例和客户使用场景'
    },
    {
        id: 'kb-006',
        name: '培训材料',
        description: '新员工培训和客户培训资料'
    }
];
const mockAgentSkills = [
    {
        id: 'skill-001',
        name: '查看客户信息',
        description: '获取客户基本信息和历史记录'
    },
    {
        id: 'skill-002',
        name: '创建工单',
        description: '为客户创建支持工单'
    },
    {
        id: 'skill-003',
        name: '查询订单状态',
        description: '查看客户订单的当前状态'
    },
    {
        id: 'skill-004',
        name: '修改客户配置',
        description: '更新客户的系统配置',
        isSensitive: true
    },
    {
        id: 'skill-005',
        name: '发送通知',
        description: '向客户发送系统通知和提醒'
    }
];
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
"src/pages/agents/[id]/analytics.tsx": function (module, exports, __mako_require__){
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

},
"src/pages/agents/[id]/edit.tsx": function (module, exports, __mako_require__){
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

},
"src/pages/agents/index.tsx": function (module, exports, __mako_require__){
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
    // 确保所有渲染分支的 Hook 数量一致：
    // 提前计算 filteredAgents，避免在某些分支中少调用 useMemo 导致 Hook 次序不一致
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
                            lineNumber: 74,
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
                            lineNumber: 80,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/pages/agents/index.tsx",
                    lineNumber: 68,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_AgentCreateForm.default, {
                    allKnowledgeBases: _agentData.mockKnowledgeBases,
                    allAgentSkills: _agentData.mockAgentSkills,
                    onSubmit: handleSubmit,
                    onCancel: handleCancel
                }, void 0, false, {
                    fileName: "src/pages/agents/index.tsx",
                    lineNumber: 86,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/pages/agents/index.tsx",
            lineNumber: 63,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "src/pages/agents/index.tsx",
        lineNumber: 58,
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
            lineNumber: 107,
            columnNumber: 14
        }, this);
        // 直接渲染对应的组件，传递必要的参数
        if (isEdit) return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_edit.default, {
            agentId: agentId
        }, void 0, false, {
            fileName: "src/pages/agents/index.tsx",
            lineNumber: 112,
            columnNumber: 14
        }, this);
        else return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_analytics.default, {
            agentId: agentId
        }, void 0, false, {
            fileName: "src/pages/agents/index.tsx",
            lineNumber: 114,
            columnNumber: 14
        }, this);
    }
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
                    lineNumber: 123,
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
                        lineNumber: 127,
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
                            lineNumber: 130,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                            size: "small",
                            onClick: ()=>navigate(`/ai-tools/consultant/${r.id}/analytics`),
                            children: "分析"
                        }, void 0, false, {
                            fileName: "src/pages/agents/index.tsx",
                            lineNumber: 131,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/pages/agents/index.tsx",
                    lineNumber: 129,
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
                                    lineNumber: 160,
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
                                    lineNumber: 168,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/pages/agents/index.tsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                            size: "small",
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                    icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.AppstoreOutlined, {}, void 0, false, {
                                        fileName: "src/pages/agents/index.tsx",
                                        lineNumber: 181,
                                        columnNumber: 21
                                    }, void 0),
                                    type: viewMode === 'card' ? 'primary' : 'default',
                                    size: "middle",
                                    onClick: ()=>setViewMode('card')
                                }, void 0, false, {
                                    fileName: "src/pages/agents/index.tsx",
                                    lineNumber: 180,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                    icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UnorderedListOutlined, {}, void 0, false, {
                                        fileName: "src/pages/agents/index.tsx",
                                        lineNumber: 187,
                                        columnNumber: 21
                                    }, void 0),
                                    type: viewMode === 'list' ? 'primary' : 'default',
                                    size: "middle",
                                    onClick: ()=>setViewMode('list')
                                }, void 0, false, {
                                    fileName: "src/pages/agents/index.tsx",
                                    lineNumber: 186,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                    type: "primary",
                                    icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PlusOutlined, {}, void 0, false, {
                                        fileName: "src/pages/agents/index.tsx",
                                        lineNumber: 194,
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
                                    lineNumber: 192,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/pages/agents/index.tsx",
                            lineNumber: 179,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/pages/agents/index.tsx",
                    lineNumber: 153,
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
                                lineNumber: 206,
                                columnNumber: 17
                            }, this)
                        }, agent.id, false, {
                            fileName: "src/pages/agents/index.tsx",
                            lineNumber: 205,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "src/pages/agents/index.tsx",
                    lineNumber: 203,
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
                    lineNumber: 211,
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
                            lineNumber: 228,
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
                            lineNumber: 229,
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
                            lineNumber: 232,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                            type: "primary",
                            icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PlusOutlined, {}, void 0, false, {
                                fileName: "src/pages/agents/index.tsx",
                                lineNumber: 237,
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
                            lineNumber: 235,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/pages/agents/index.tsx",
                    lineNumber: 223,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/pages/agents/index.tsx",
            lineNumber: 148,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/pages/agents/index.tsx",
        lineNumber: 143,
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

},
 }]);
//# sourceMappingURL=p__agents__index-async.js.map