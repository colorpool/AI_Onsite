((typeof globalThis !== 'undefined' ? globalThis : self)["makoChunk_ant-design-pro"] = (typeof globalThis !== 'undefined' ? globalThis : self)["makoChunk_ant-design-pro"] || []).push([
        ['p__handover__new__index'],
{ "src/pages/handover/new/index.tsx": function (module, exports, __mako_require__){
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
const { TextArea } = _antd.Input;
const { Option } = _antd.Select;
const HandoverCreatePage = ()=>{
    _s();
    const navigate = (0, _umi.useNavigate)();
    const [form] = _antd.Form.useForm();
    const [loading, setLoading] = (0, _react.useState)(false);
    // 处理返回
    const handleBack = ()=>{
        navigate('/profiles/handover-implementation');
    };
    // 处理保存
    const handleSave = async ()=>{
        try {
            setLoading(true);
            const values = await form.validateFields();
            console.log('创建客户交接:', values);
            // 模拟API调用
            await new Promise((resolve)=>setTimeout(resolve, 1000));
            _antd.message.success('客户交接创建成功！');
            navigate('/profiles/handover-implementation');
        } catch (error) {
            console.log('创建失败:', error);
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            padding: '24px',
            background: '#f5f5f5',
            minHeight: 'calc(100vh - 120px)',
            paddingBottom: '60px' // 为footer留出底部间距
        },
        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
            style: {
                maxWidth: '1000px',
                margin: '0 auto'
            },
            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    background: '#fff',
                    borderRadius: '8px',
                    padding: '24px'
                },
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form, {
                    form: form,
                    layout: "vertical",
                    initialValues: {
                        handoverStatus: 'pending',
                        riskLevel: 'low',
                        expectationAlignment: 'not_aligned'
                    },
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                            gutter: 24,
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                    span: 12,
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                        title: "基本信息",
                                        size: "small",
                                        style: {
                                            marginBottom: '24px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                                name: "customerName",
                                                label: "客户名称",
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请输入客户名称'
                                                    }
                                                ],
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {
                                                    placeholder: "请输入客户名称"
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/new/index.tsx",
                                                    lineNumber: 92,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/pages/handover/new/index.tsx",
                                                lineNumber: 87,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                                name: "handoverStatus",
                                                label: "交接状态",
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请选择交接状态'
                                                    }
                                                ],
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                                    placeholder: "请选择交接状态",
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                            value: "pending",
                                                            children: "待处理"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/new/index.tsx",
                                                            lineNumber: 101,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                            value: "processing",
                                                            children: "处理中"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/new/index.tsx",
                                                            lineNumber: 102,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                            value: "aligned",
                                                            children: "已对齐"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/new/index.tsx",
                                                            lineNumber: 103,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                            value: "partially_aligned",
                                                            children: "部分对齐"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/new/index.tsx",
                                                            lineNumber: 104,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/handover/new/index.tsx",
                                                    lineNumber: 100,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/pages/handover/new/index.tsx",
                                                lineNumber: 95,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                                name: "riskLevel",
                                                label: "风险等级",
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请选择风险等级'
                                                    }
                                                ],
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                                    placeholder: "请选择风险等级",
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                            value: "high",
                                                            children: "高风险"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/new/index.tsx",
                                                            lineNumber: 114,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                            value: "medium",
                                                            children: "中风险"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/new/index.tsx",
                                                            lineNumber: 115,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                            value: "low",
                                                            children: "低风险"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/new/index.tsx",
                                                            lineNumber: 116,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/handover/new/index.tsx",
                                                    lineNumber: 113,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/pages/handover/new/index.tsx",
                                                lineNumber: 108,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/handover/new/index.tsx",
                                        lineNumber: 86,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/pages/handover/new/index.tsx",
                                    lineNumber: 85,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                    span: 12,
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                        title: "客户期望",
                                        size: "small",
                                        style: {
                                            marginBottom: '24px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                                name: "expectationAlignment",
                                                label: "期望对齐状态",
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请选择期望对齐状态'
                                                    }
                                                ],
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                                    placeholder: "请选择期望对齐状态",
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                            value: "aligned",
                                                            children: "已对齐"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/new/index.tsx",
                                                            lineNumber: 131,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                            value: "partially_aligned",
                                                            children: "部分对齐"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/new/index.tsx",
                                                            lineNumber: 132,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                            value: "not_aligned",
                                                            children: "未对齐"
                                                        }, void 0, false, {
                                                            fileName: "src/pages/handover/new/index.tsx",
                                                            lineNumber: 133,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/pages/handover/new/index.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/pages/handover/new/index.tsx",
                                                lineNumber: 125,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                                name: "corePainPoints",
                                                label: "核心痛点",
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                                    placeholder: "请描述客户的核心痛点...",
                                                    rows: 3
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/new/index.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/pages/handover/new/index.tsx",
                                                lineNumber: 137,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                                name: "successCriteria",
                                                label: "成功标准",
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                                    placeholder: "请定义客户成功的标准...",
                                                    rows: 3
                                                }, void 0, false, {
                                                    fileName: "src/pages/handover/new/index.tsx",
                                                    lineNumber: 151,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/pages/handover/new/index.tsx",
                                                lineNumber: 147,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/handover/new/index.tsx",
                                        lineNumber: 124,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/pages/handover/new/index.tsx",
                                    lineNumber: 123,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/pages/handover/new/index.tsx",
                            lineNumber: 83,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            title: "风险信息",
                            size: "small",
                            style: {
                                marginBottom: '24px'
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                    name: "hasRiskAlert",
                                    label: "是否有风险提示",
                                    valuePropName: "checked",
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                        placeholder: "请选择",
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                value: true,
                                                children: "有"
                                            }, void 0, false, {
                                                fileName: "src/pages/handover/new/index.tsx",
                                                lineNumber: 168,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                value: false,
                                                children: "无"
                                            }, void 0, false, {
                                                fileName: "src/pages/handover/new/index.tsx",
                                                lineNumber: 169,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/handover/new/index.tsx",
                                        lineNumber: 167,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/pages/handover/new/index.tsx",
                                    lineNumber: 162,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                    name: "riskDetails",
                                    label: "风险详情",
                                    dependencies: [
                                        'hasRiskAlert'
                                    ],
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                        placeholder: "请详细描述风险情况...",
                                        rows: 4
                                    }, void 0, false, {
                                        fileName: "src/pages/handover/new/index.tsx",
                                        lineNumber: 178,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/pages/handover/new/index.tsx",
                                    lineNumber: 173,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/pages/handover/new/index.tsx",
                            lineNumber: 161,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                            title: "干系人信息",
                            size: "small",
                            style: {
                                marginBottom: '24px'
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                    name: "stakeholderCount",
                                    label: "干系人数量",
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入干系人数量'
                                        }
                                    ],
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {
                                        type: "number",
                                        placeholder: "请输入干系人数量",
                                        min: 1
                                    }, void 0, false, {
                                        fileName: "src/pages/handover/new/index.tsx",
                                        lineNumber: 192,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/pages/handover/new/index.tsx",
                                    lineNumber: 187,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                    name: "keyStakeholders",
                                    label: "关键干系人",
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                        placeholder: "请描述关键干系人信息...",
                                        rows: 3
                                    }, void 0, false, {
                                        fileName: "src/pages/handover/new/index.tsx",
                                        lineNumber: 203,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/pages/handover/new/index.tsx",
                                    lineNumber: 199,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/pages/handover/new/index.tsx",
                            lineNumber: 186,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '12px',
                                marginTop: '24px',
                                paddingTop: '24px',
                                borderTop: '1px solid #f0f0f0'
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                    onClick: handleBack,
                                    children: "取消"
                                }, void 0, false, {
                                    fileName: "src/pages/handover/new/index.tsx",
                                    lineNumber: 219,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                    type: "primary",
                                    icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.SaveOutlined, {}, void 0, false, {
                                        fileName: "src/pages/handover/new/index.tsx",
                                        lineNumber: 224,
                                        columnNumber: 23
                                    }, void 0),
                                    onClick: handleSave,
                                    loading: loading,
                                    style: {
                                        borderRadius: '6px',
                                        fontWeight: '500'
                                    },
                                    children: "创建交接"
                                }, void 0, false, {
                                    fileName: "src/pages/handover/new/index.tsx",
                                    lineNumber: 222,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/pages/handover/new/index.tsx",
                            lineNumber: 211,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/pages/handover/new/index.tsx",
                    lineNumber: 74,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "src/pages/handover/new/index.tsx",
                lineNumber: 69,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "src/pages/handover/new/index.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/pages/handover/new/index.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
};
_s(HandoverCreatePage, "5WySIf5f8mC8ILhE7he/R1PA7bA=", false, function() {
    return [
        _umi.useNavigate,
        _antd.Form.useForm
    ];
});
_c = HandoverCreatePage;
var _default = HandoverCreatePage;
var _c;
$RefreshReg$(_c, "HandoverCreatePage");
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
//# sourceMappingURL=p__handover__new__index-async.js.map