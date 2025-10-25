((typeof globalThis !== 'undefined' ? globalThis : self)["makoChunk_ant-design-pro"] = (typeof globalThis !== 'undefined' ? globalThis : self)["makoChunk_ant-design-pro"] || []).push([
        ['common'],
{ "src/components/PlaybookLauncher.tsx": function (module, exports, __mako_require__){
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
var _dayjs = /*#__PURE__*/ _interop_require_default._(__mako_require__("node_modules/dayjs/dayjs.min.js"));
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
var _s = $RefreshSig$();
const { Title, Text, Paragraph } = _antd.Typography;
const { Option } = _antd.Select;
const { TextArea } = _antd.Input;
const { Step } = _antd.Steps;
const PlaybookLauncher = ({ visible, playbook, customer, onCancel, onLaunch, loading = false })=>{
    var _form_getFieldValue;
    _s();
    const [currentStep, setCurrentStep] = (0, _react.useState)(0);
    const [form] = _antd.Form.useForm();
    const [confirmed, setConfirmed] = (0, _react.useState)(false);
    // 重置状态
    const resetState = ()=>{
        setCurrentStep(0);
        setConfirmed(false);
        form.resetFields();
    };
    // 处理取消
    const handleCancel = ()=>{
        resetState();
        onCancel();
    };
    // 下一步
    const handleNext = async ()=>{
        if (currentStep === 0) // 验证基本信息
        try {
            await form.validateFields([
                'customerId',
                'launchReason'
            ]);
            setCurrentStep(1);
        } catch (error) {
        // 验证失败，不进行下一步
        }
        else if (currentStep === 1) // 验证任务分派
        try {
            await form.validateFields([
                'taskAssignments'
            ]);
            setCurrentStep(2);
        } catch (error) {
        // 验证失败，不进行下一步
        }
    };
    // 上一步
    const handlePrev = ()=>{
        setCurrentStep(currentStep - 1);
    };
    // 启动剧本
    const handleLaunch = async ()=>{
        if (!playbook || !confirmed) {
            _antd.message.warning('请确认所有信息无误后再启动');
            return;
        }
        try {
            var _values_expectedEndDate;
            const values = await form.validateFields();
            // 构建执行实例
            const execution = {
                playbookId: playbook.id,
                playbookName: playbook.name,
                customerId: values.customerId,
                customerName: (customer === null || customer === void 0 ? void 0 : customer.name) || '',
                status: 'pending',
                progress: 0,
                launchedBy: 'current_user',
                launchType: 'manual',
                launchReason: values.launchReason,
                startedAt: (0, _dayjs.default)().toISOString(),
                expectedEndAt: ((_values_expectedEndDate = values.expectedEndDate) === null || _values_expectedEndDate === void 0 ? void 0 : _values_expectedEndDate.toISOString()) || (0, _dayjs.default)().add(playbook.estimatedDuration, 'hour').toISOString(),
                notes: values.notes,
                taskExecutions: playbook.tasks.map((task)=>({
                        id: `exec_${task.id}_${Date.now()}`,
                        executionId: '',
                        taskId: task.id,
                        taskTitle: task.title,
                        status: 'pending',
                        assignedTo: values.taskAssignments[task.id] || '',
                        assignedAt: (0, _dayjs.default)().toISOString(),
                        dueDate: (0, _dayjs.default)().add(task.dueOffset, 'day').toISOString(),
                        checkpointResults: task.checkpoints.map((checkpoint)=>({
                                checkpointId: `cp_${checkpoint}_${Date.now()}`,
                                description: checkpoint,
                                completed: false
                            })),
                        createdAt: (0, _dayjs.default)().toISOString(),
                        updatedAt: (0, _dayjs.default)().toISOString()
                    })),
                createdAt: (0, _dayjs.default)().toISOString(),
                updatedAt: (0, _dayjs.default)().toISOString()
            };
            await onLaunch(execution);
            _antd.message.success('剧本启动成功！');
            resetState();
        } catch (error) {
            console.error('启动剧本失败:', error);
            _antd.message.error('启动剧本失败，请重试');
        }
    };
    // 获取默认负责人显示名称
    const getDefaultAssigneeName = (defaultAssignee, customAssignee)=>{
        if (defaultAssignee === 'custom' && customAssignee) return customAssignee;
        const assigneeMap = {
            'csm': 'CSM',
            'csm_manager': 'CSM经理',
            'support': '技术支持',
            'sales': '销售',
            'custom': '自定义'
        };
        return assigneeMap[defaultAssignee] || defaultAssignee;
    };
    if (!playbook) return null;
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Modal, {
        title: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
            style: {
                display: 'flex',
                alignItems: 'center',
                gap: 8
            },
            children: [
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PlayCircleOutlined, {
                    style: {
                        color: '#1890ff'
                    }
                }, void 0, false, {
                    fileName: "src/components/PlaybookLauncher.tsx",
                    lineNumber: 185,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                    children: [
                        "启动剧本：",
                        playbook.name
                    ]
                }, void 0, true, {
                    fileName: "src/components/PlaybookLauncher.tsx",
                    lineNumber: 186,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "src/components/PlaybookLauncher.tsx",
            lineNumber: 184,
            columnNumber: 9
        }, void 0),
        open: visible,
        onCancel: handleCancel,
        width: 900,
        footer: null,
        destroyOnClose: true,
        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Spin, {
            spinning: loading,
            children: [
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Steps, {
                    current: currentStep,
                    style: {
                        marginBottom: 24
                    },
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Step, {
                            title: "基本信息",
                            icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.FileTextOutlined, {}, void 0, false, {
                                fileName: "src/components/PlaybookLauncher.tsx",
                                lineNumber: 197,
                                columnNumber: 36
                            }, void 0)
                        }, void 0, false, {
                            fileName: "src/components/PlaybookLauncher.tsx",
                            lineNumber: 197,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Step, {
                            title: "任务分派",
                            icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {}, void 0, false, {
                                fileName: "src/components/PlaybookLauncher.tsx",
                                lineNumber: 198,
                                columnNumber: 36
                            }, void 0)
                        }, void 0, false, {
                            fileName: "src/components/PlaybookLauncher.tsx",
                            lineNumber: 198,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Step, {
                            title: "确认启动",
                            icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.CheckCircleOutlined, {}, void 0, false, {
                                fileName: "src/components/PlaybookLauncher.tsx",
                                lineNumber: 199,
                                columnNumber: 36
                            }, void 0)
                        }, void 0, false, {
                            fileName: "src/components/PlaybookLauncher.tsx",
                            lineNumber: 199,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/PlaybookLauncher.tsx",
                    lineNumber: 196,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form, {
                    form: form,
                    layout: "vertical",
                    initialValues: {
                        customerId: (customer === null || customer === void 0 ? void 0 : customer.id) || '',
                        taskAssignments: playbook.tasks.reduce((acc, task)=>{
                            acc[task.id] = task.customAssignee || getDefaultAssigneeName(task.defaultAssignee);
                            return acc;
                        }, {})
                    },
                    children: [
                        currentStep === 0 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                    title: "剧本信息",
                                    style: {
                                        marginBottom: 16
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                                            gutter: 16,
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                    span: 12,
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                            strong: true,
                                                            children: "剧本名称："
                                                        }, void 0, false, {
                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                            lineNumber: 219,
                                                            columnNumber: 21
                                                        }, this),
                                                        playbook.name
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                    lineNumber: 218,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                    span: 12,
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                            strong: true,
                                                            children: "分类："
                                                        }, void 0, false, {
                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                            lineNumber: 222,
                                                            columnNumber: 21
                                                        }, this),
                                                        playbook.category
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                    lineNumber: 221,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                    span: 12,
                                                    style: {
                                                        marginTop: 8
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                            strong: true,
                                                            children: "预估耗时："
                                                        }, void 0, false, {
                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                            lineNumber: 225,
                                                            columnNumber: 21
                                                        }, this),
                                                        playbook.estimatedDuration,
                                                        "小时"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                    lineNumber: 224,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                    span: 12,
                                                    style: {
                                                        marginTop: 8
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                            strong: true,
                                                            children: "成功率："
                                                        }, void 0, false, {
                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                            lineNumber: 228,
                                                            columnNumber: 21
                                                        }, this),
                                                        playbook.successRate,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                    lineNumber: 227,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/PlaybookLauncher.tsx",
                                            lineNumber: 217,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Divider, {}, void 0, false, {
                                            fileName: "src/components/PlaybookLauncher.tsx",
                                            lineNumber: 231,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Paragraph, {
                                            children: playbook.description
                                        }, void 0, false, {
                                            fileName: "src/components/PlaybookLauncher.tsx",
                                            lineNumber: 232,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                            strong: true,
                                            children: "目标："
                                        }, void 0, false, {
                                            fileName: "src/components/PlaybookLauncher.tsx",
                                            lineNumber: 233,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Paragraph, {
                                            children: playbook.goal
                                        }, void 0, false, {
                                            fileName: "src/components/PlaybookLauncher.tsx",
                                            lineNumber: 234,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/PlaybookLauncher.tsx",
                                    lineNumber: 216,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                    title: "启动配置",
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                            name: "customerId",
                                            label: "目标客户",
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请选择目标客户'
                                                }
                                            ],
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                                placeholder: "选择客户",
                                                disabled: !!customer,
                                                children: customer && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                    value: customer.id,
                                                    children: customer.name
                                                }, void 0, false, {
                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                    lineNumber: 245,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                lineNumber: 243,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/components/PlaybookLauncher.tsx",
                                            lineNumber: 238,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                            name: "launchReason",
                                            label: "启动原因",
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入启动原因'
                                                }
                                            ],
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                                rows: 3,
                                                placeholder: "请描述启动此剧本的原因和背景"
                                            }, void 0, false, {
                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                lineNumber: 255,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/components/PlaybookLauncher.tsx",
                                            lineNumber: 250,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                            name: "expectedEndDate",
                                            label: "预期完成时间",
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.DatePicker, {
                                                showTime: true,
                                                style: {
                                                    width: '100%'
                                                },
                                                placeholder: "选择预期完成时间",
                                                disabledDate: (current)=>current && current < (0, _dayjs.default)().startOf('day')
                                            }, void 0, false, {
                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                lineNumber: 265,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/components/PlaybookLauncher.tsx",
                                            lineNumber: 261,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/PlaybookLauncher.tsx",
                                    lineNumber: 237,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/PlaybookLauncher.tsx",
                            lineNumber: 215,
                            columnNumber: 13
                        }, this),
                        currentStep === 1 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Alert, {
                                    message: "任务分派",
                                    description: "请为每个任务指定负责人。系统已根据剧本配置预设了默认负责人，您可以根据实际情况进行调整。",
                                    type: "info",
                                    style: {
                                        marginBottom: 16
                                    }
                                }, void 0, false, {
                                    fileName: "src/components/PlaybookLauncher.tsx",
                                    lineNumber: 279,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Timeline, {
                                    children: playbook.tasks.map((task, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Timeline.Item, {
                                            dot: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {
                                                style: {
                                                    fontSize: '16px'
                                                }
                                            }, void 0, false, {
                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                lineNumber: 290,
                                                columnNumber: 26
                                            }, void 0),
                                            color: index === 0 ? 'blue' : 'gray',
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                                size: "small",
                                                style: {
                                                    marginBottom: 16
                                                },
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'flex-start'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                flex: 1
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Title, {
                                                                    level: 5,
                                                                    style: {
                                                                        margin: 0
                                                                    },
                                                                    children: task.title
                                                                }, void 0, false, {
                                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                                    lineNumber: 296,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                    type: "secondary",
                                                                    children: task.description
                                                                }, void 0, false, {
                                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                                    lineNumber: 297,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        marginTop: 8
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                            color: "blue",
                                                                            children: [
                                                                                "阶段: ",
                                                                                task.phase
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                                            lineNumber: 299,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                            color: "green",
                                                                            children: [
                                                                                "耗时: ",
                                                                                task.duration,
                                                                                "h"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                                            lineNumber: 300,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                            color: "orange",
                                                                            children: [
                                                                                "截止: ",
                                                                                task.dueOffset,
                                                                                "天"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                                            lineNumber: 301,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        task.isOptional && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                                            color: "purple",
                                                                            children: "可选"
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                                            lineNumber: 302,
                                                                            columnNumber: 49
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                                    lineNumber: 298,
                                                                    columnNumber: 27
                                                                }, this),
                                                                task.checkpoints.length > 0 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                                    style: {
                                                                        marginTop: 8
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                                            strong: true,
                                                                            children: "检查点："
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                                            lineNumber: 306,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("ul", {
                                                                            style: {
                                                                                margin: '4px 0',
                                                                                paddingLeft: 20
                                                                            },
                                                                            children: task.checkpoints.map((checkpoint, idx)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("li", {
                                                                                    children: checkpoint
                                                                                }, idx, false, {
                                                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                                                    lineNumber: 309,
                                                                                    columnNumber: 35
                                                                                }, this))
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                                            lineNumber: 307,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                                    lineNumber: 305,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                            lineNumber: 295,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                            style: {
                                                                width: 200,
                                                                marginLeft: 16
                                                            },
                                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                                                name: [
                                                                    'taskAssignments',
                                                                    task.id
                                                                ],
                                                                label: "负责人",
                                                                rules: [
                                                                    {
                                                                        required: true,
                                                                        message: '请指定负责人'
                                                                    }
                                                                ],
                                                                style: {
                                                                    margin: 0
                                                                },
                                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {
                                                                    placeholder: "输入负责人姓名"
                                                                }, void 0, false, {
                                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                                    lineNumber: 322,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                                lineNumber: 316,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                            lineNumber: 315,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                    lineNumber: 294,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                lineNumber: 293,
                                                columnNumber: 21
                                            }, this)
                                        }, task.id, false, {
                                            fileName: "src/components/PlaybookLauncher.tsx",
                                            lineNumber: 288,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "src/components/PlaybookLauncher.tsx",
                                    lineNumber: 286,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/PlaybookLauncher.tsx",
                            lineNumber: 278,
                            columnNumber: 13
                        }, this),
                        currentStep === 2 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Alert, {
                                    message: "确认启动",
                                    description: "请仔细检查以下信息，确认无误后点击启动剧本。",
                                    type: "warning",
                                    style: {
                                        marginBottom: 16
                                    }
                                }, void 0, false, {
                                    fileName: "src/components/PlaybookLauncher.tsx",
                                    lineNumber: 336,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                    title: "启动信息确认",
                                    style: {
                                        marginBottom: 16
                                    },
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Row, {
                                        gutter: [
                                            16,
                                            8
                                        ],
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                span: 8,
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                    strong: true,
                                                    children: "剧本名称："
                                                }, void 0, false, {
                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                    lineNumber: 346,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                lineNumber: 345,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                span: 16,
                                                children: playbook.name
                                            }, void 0, false, {
                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                lineNumber: 348,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                span: 8,
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                    strong: true,
                                                    children: "目标客户："
                                                }, void 0, false, {
                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                    lineNumber: 352,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                lineNumber: 351,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                span: 16,
                                                children: (customer === null || customer === void 0 ? void 0 : customer.name) || form.getFieldValue('customerId')
                                            }, void 0, false, {
                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                lineNumber: 354,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                span: 8,
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                    strong: true,
                                                    children: "启动原因："
                                                }, void 0, false, {
                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                    lineNumber: 358,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                lineNumber: 357,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                span: 16,
                                                children: form.getFieldValue('launchReason')
                                            }, void 0, false, {
                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                lineNumber: 360,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                span: 8,
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                    strong: true,
                                                    children: "预期完成："
                                                }, void 0, false, {
                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                    lineNumber: 364,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                lineNumber: 363,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Col, {
                                                span: 16,
                                                children: ((_form_getFieldValue = form.getFieldValue('expectedEndDate')) === null || _form_getFieldValue === void 0 ? void 0 : _form_getFieldValue.format('YYYY-MM-DD HH:mm')) || '系统自动计算'
                                            }, void 0, false, {
                                                fileName: "src/components/PlaybookLauncher.tsx",
                                                lineNumber: 366,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/PlaybookLauncher.tsx",
                                        lineNumber: 344,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/PlaybookLauncher.tsx",
                                    lineNumber: 343,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
                                    title: "任务分派确认",
                                    children: playbook.tasks.map((task)=>{
                                        const assignee = form.getFieldValue([
                                            'taskAssignments',
                                            task.id
                                        ]);
                                        return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                padding: '8px 0',
                                                borderBottom: '1px solid #f0f0f0'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                            strong: true,
                                                            children: task.title
                                                        }, void 0, false, {
                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                            lineNumber: 378,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("br", {}, void 0, false, {
                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                            lineNumber: 379,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                            type: "secondary",
                                                            style: {
                                                                fontSize: '12px'
                                                            },
                                                            children: [
                                                                task.phase,
                                                                " • ",
                                                                task.duration,
                                                                "h • ",
                                                                task.dueOffset,
                                                                "天内完成"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/components/PlaybookLauncher.tsx",
                                                            lineNumber: 380,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                    lineNumber: 377,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        textAlign: 'right'
                                                    },
                                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                        strong: true,
                                                        children: assignee
                                                    }, void 0, false, {
                                                        fileName: "src/components/PlaybookLauncher.tsx",
                                                        lineNumber: 385,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "src/components/PlaybookLauncher.tsx",
                                                    lineNumber: 384,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, task.id, true, {
                                            fileName: "src/components/PlaybookLauncher.tsx",
                                            lineNumber: 376,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "src/components/PlaybookLauncher.tsx",
                                    lineNumber: 372,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                    name: "notes",
                                    label: "备注",
                                    style: {
                                        marginTop: 16
                                    },
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                        rows: 3,
                                        placeholder: "可选：添加执行备注"
                                    }, void 0, false, {
                                        fileName: "src/components/PlaybookLauncher.tsx",
                                        lineNumber: 393,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/PlaybookLauncher.tsx",
                                    lineNumber: 392,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        marginTop: 16
                                    },
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                        checked: confirmed,
                                        onChange: (e)=>setConfirmed(e.target.checked),
                                        children: "我已确认以上信息无误，同意启动此剧本"
                                    }, void 0, false, {
                                        fileName: "src/components/PlaybookLauncher.tsx",
                                        lineNumber: 397,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/PlaybookLauncher.tsx",
                                    lineNumber: 396,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/PlaybookLauncher.tsx",
                            lineNumber: 335,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/PlaybookLauncher.tsx",
                    lineNumber: 202,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        marginTop: 24,
                        textAlign: 'right'
                    },
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                onClick: handleCancel,
                                children: "取消"
                            }, void 0, false, {
                                fileName: "src/components/PlaybookLauncher.tsx",
                                lineNumber: 411,
                                columnNumber: 13
                            }, this),
                            currentStep > 0 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                onClick: handlePrev,
                                children: "上一步"
                            }, void 0, false, {
                                fileName: "src/components/PlaybookLauncher.tsx",
                                lineNumber: 413,
                                columnNumber: 15
                            }, this),
                            currentStep < 2 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                type: "primary",
                                onClick: handleNext,
                                children: "下一步"
                            }, void 0, false, {
                                fileName: "src/components/PlaybookLauncher.tsx",
                                lineNumber: 416,
                                columnNumber: 15
                            }, this),
                            currentStep === 2 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                type: "primary",
                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PlayCircleOutlined, {}, void 0, false, {
                                    fileName: "src/components/PlaybookLauncher.tsx",
                                    lineNumber: 423,
                                    columnNumber: 23
                                }, void 0),
                                onClick: handleLaunch,
                                disabled: !confirmed,
                                loading: loading,
                                children: "启动剧本"
                            }, void 0, false, {
                                fileName: "src/components/PlaybookLauncher.tsx",
                                lineNumber: 421,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/PlaybookLauncher.tsx",
                        lineNumber: 410,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/components/PlaybookLauncher.tsx",
                    lineNumber: 409,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/components/PlaybookLauncher.tsx",
            lineNumber: 195,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/components/PlaybookLauncher.tsx",
        lineNumber: 182,
        columnNumber: 5
    }, this);
};
_s(PlaybookLauncher, "PJskqYzFBNXXIF6K44Z6oducDIk=", false, function() {
    return [
        _antd.Form.useForm
    ];
});
_c = PlaybookLauncher;
var _default = PlaybookLauncher;
var _c;
$RefreshReg$(_c, "PlaybookLauncher");
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
"src/components/common/CustomerJourneyTimeline.tsx": function (module, exports, __mako_require__){
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
var _dayjs = /*#__PURE__*/ _interop_require_default._(__mako_require__("node_modules/dayjs/dayjs.min.js"));
var _icons = __mako_require__("node_modules/@ant-design/icons/es/index.js");
var _mockCustomerJourney = __mako_require__("src/data/mockCustomerJourney.ts");
var _customerJourneyByScale = __mako_require__("src/data/customerJourneyByScale.ts");
var _continuousServiceData = __mako_require__("src/mock/continuousServiceData.ts");
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
var _s = $RefreshSig$();
const { Text, Title } = _antd.Typography;
const CustomerJourneyTimeline = ({ customerId, journeyType, onActionClick, onStageClick, showActions = true, compact = false, style })=>{
    _s();
    const [journey, setJourney] = (0, _react.useState)(null);
    const [modalVisible, setModalVisible] = (0, _react.useState)(false);
    const [selectedAction, setSelectedAction] = (0, _react.useState)(null);
    const [form] = _antd.Form.useForm();
    // 获取客户数据和规模信息
    (0, _react.useEffect)(()=>{
        if (customerId) {
            // 查找客户数据
            const customer = _continuousServiceData.mockCustomers.find((c)=>c.id === customerId);
            if (customer) {
                // 获取客户规模 - 修复映射逻辑
                const customerScale = customer.customerSegment === 'strategic' || customer.customerSegment === 'key' ? 'key_account' : customer.customerSegment === 'medium' ? 'mid_market' : customer.customerSegment === 'general' ? 'smb' : customer.arr >= 500000 ? 'key_account' : customer.arr >= 200000 ? 'mid_market' : 'smb';
                // 根据客户规模获取定制化旅程
                const customizedJourney = (0, _customerJourneyByScale.getCustomerJourneyByScale)(customerId, customer.name, customerScale, journeyType);
                setJourney(customizedJourney);
            } else {
                // 如果找不到客户数据，使用默认旅程
                const defaultJourney = (0, _mockCustomerJourney.getCustomerJourney)(customerId, '客户名称', journeyType);
                setJourney(defaultJourney);
            }
        }
    }, [
        customerId,
        journeyType
    ]);
    if (!journey) return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
        style: style,
        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
            style: {
                textAlign: 'center',
                padding: '40px 0'
            },
            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                type: "secondary",
                children: "暂无客户旅程数据"
            }, void 0, false, {
                fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                lineNumber: 83,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "src/components/common/CustomerJourneyTimeline.tsx",
            lineNumber: 82,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "src/components/common/CustomerJourneyTimeline.tsx",
        lineNumber: 81,
        columnNumber: 7
    }, this);
    // 计算整体进度 - 根据实际完成的行动项计算
    const calculateProgress = ()=>{
        if (!journey.actions || journey.actions.length === 0) return 0;
        const completedActions = journey.actions.filter((action)=>action.status === 'completed').length;
        return Math.round(completedActions / journey.actions.length * 100);
    };
    // 获取状态图标 - 简化为单圈设计
    const getStatusIcon = (status)=>{
        switch(status){
            case 'completed':
                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.CheckCircleOutlined, {
                    style: {
                        color: '#ffffff',
                        fontSize: '10px'
                    }
                }, void 0, false, {
                    fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                    lineNumber: 103,
                    columnNumber: 16
                }, this);
            case 'in_progress':
                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ClockCircleOutlined, {
                    style: {
                        color: '#ffffff',
                        fontSize: '10px'
                    }
                }, void 0, false, {
                    fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                    lineNumber: 105,
                    columnNumber: 16
                }, this);
            case 'overdue':
                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ExclamationCircleOutlined, {
                    style: {
                        color: '#ffffff',
                        fontSize: '10px'
                    }
                }, void 0, false, {
                    fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                    lineNumber: 107,
                    columnNumber: 16
                }, this);
            case 'pending':
                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ClockCircleOutlined, {
                    style: {
                        color: '#ffffff',
                        fontSize: '10px'
                    }
                }, void 0, false, {
                    fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                    lineNumber: 109,
                    columnNumber: 16
                }, this);
            default:
                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.CheckCircleOutlined, {
                    style: {
                        color: '#ffffff',
                        fontSize: '10px'
                    }
                }, void 0, false, {
                    fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                    lineNumber: 111,
                    columnNumber: 16
                }, this);
        }
    };
    // 获取状态颜色
    const getStatusColor = (status)=>{
        switch(status){
            case 'completed':
                return '#52c41a';
            case 'in_progress':
                return '#1890ff';
            case 'overdue':
                return '#ff4d4f';
            case 'pending':
                return '#d9d9d9';
            default:
                return '#52c41a';
        }
    };
    // 获取状态文本
    const getStatusText = (status)=>{
        switch(status){
            case 'completed':
                return '已完成';
            case 'in_progress':
                return '进行中';
            case 'overdue':
                return '已延期';
            case 'pending':
                return '待处理';
            default:
                return '未知';
        }
    };
    // 检查是否延期
    const isOverdue = (action)=>{
        if (action.status === 'overdue') return true;
        if (action.status === 'completed') return false;
        if (!action.dueDate) return false;
        const dueDate = new Date(action.dueDate);
        const now = new Date();
        return now > dueDate;
    };
    // 处理节点点击
    const handleNodeClick = (action)=>{
        setSelectedAction(action);
        setModalVisible(true);
        form.setFieldsValue({
            title: action.title,
            description: action.description,
            status: action.status,
            dueDate: action.dueDate ? (0, _dayjs.default)(action.dueDate) : null,
            assignee: action.assignee
        });
    };
    // 处理节点更新
    const handleNodeUpdate = async (values)=>{
        if (!selectedAction || !journey) return;
        try {
            // 更新节点数据
            const updatedActions = journey.actions.map((action)=>action.id === selectedAction.id ? {
                    ...action,
                    title: values.title,
                    description: values.description,
                    status: values.status,
                    dueDate: values.dueDate ? values.dueDate.format('YYYY-MM-DD') : action.dueDate,
                    assignee: values.assignee
                } : action);
            // 更新旅程数据
            const updatedJourney = {
                ...journey,
                actions: updatedActions
            };
            setJourney(updatedJourney);
            setModalVisible(false);
            form.resetFields();
            _antd.message.success('节点更新成功');
            // 如果有回调函数，调用它
            if (onActionClick) onActionClick(selectedAction);
        } catch (error) {
            _antd.message.error('节点更新失败');
        }
    };
    // 处理节点完成
    const handleCompleteAction = ()=>{
        if (!selectedAction) return;
        form.setFieldsValue({
            ...form.getFieldsValue(),
            status: 'completed'
        });
        handleNodeUpdate({
            ...form.getFieldsValue(),
            status: 'completed'
        });
    };
    // 渲染节点内容卡片
    const renderNodeCard = (action, index)=>{
        const overdue = isOverdue(action);
        const actualStatus = overdue && action.status !== 'completed' ? 'overdue' : action.status;
        return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
            style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                minWidth: '220px',
                maxWidth: '280px'
            },
            children: [
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        width: '24px',
                        height: '24px',
                        backgroundColor: getStatusColor(actualStatus),
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                        marginBottom: '16px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                    },
                    children: getStatusIcon(actualStatus)
                }, void 0, false, {
                    fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                    lineNumber: 243,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        backgroundColor: '#ffffff',
                        borderRadius: '12px',
                        padding: '20px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                        border: '1px solid #f0f0f0',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        width: '100%',
                        position: 'relative'
                    },
                    onClick: ()=>handleNodeClick(action),
                    onMouseEnter: (e)=>{
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.12)';
                    },
                    onMouseLeave: (e)=>{
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                    },
                    children: [
                        overdue && action.status !== 'completed' && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                position: 'absolute',
                                top: '12px',
                                left: '12px',
                                backgroundColor: '#ff4d4f',
                                color: '#ffffff',
                                fontSize: '10px',
                                padding: '2px 6px',
                                borderRadius: '8px',
                                fontWeight: '500'
                            },
                            children: "延期"
                        }, void 0, false, {
                            fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                            lineNumber: 283,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                marginTop: overdue && action.status !== 'completed' ? '24px' : '0',
                                paddingBottom: '50px' // 为底部状态和日期留出空间
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        fontSize: '15px',
                                        fontWeight: '600',
                                        color: '#262626',
                                        lineHeight: '1.4',
                                        marginBottom: '8px',
                                        wordBreak: 'break-word'
                                    },
                                    children: action.title
                                }, void 0, false, {
                                    fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                                    lineNumber: 303,
                                    columnNumber: 13
                                }, this),
                                action.description && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        fontSize: '13px',
                                        color: '#595959',
                                        lineHeight: '1.5',
                                        marginBottom: '12px',
                                        wordBreak: 'break-word'
                                    },
                                    children: action.description
                                }, void 0, false, {
                                    fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                                    lineNumber: 315,
                                    columnNumber: 15
                                }, this),
                                action.assignee && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        fontSize: '12px',
                                        color: '#8c8c8c',
                                        marginBottom: '8px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {}, void 0, false, {
                                            fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                                            lineNumber: 336,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                            children: action.assignee
                                        }, void 0, false, {
                                            fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                                            lineNumber: 337,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                                    lineNumber: 328,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                            lineNumber: 299,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                position: 'absolute',
                                bottom: '12px',
                                right: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                                gap: '4px'
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                    color: getStatusColor(actualStatus),
                                    style: {
                                        fontSize: '11px',
                                        padding: '2px 8px',
                                        borderRadius: '12px',
                                        border: 'none',
                                        color: '#ffffff',
                                        fontWeight: '500',
                                        margin: 0
                                    },
                                    children: getStatusText(actualStatus)
                                }, void 0, false, {
                                    fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                                    lineNumber: 353,
                                    columnNumber: 13
                                }, this),
                                action.dueDate && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        fontSize: '12px',
                                        color: '#8c8c8c'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.CalendarOutlined, {}, void 0, false, {
                                            fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                                            lineNumber: 377,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                            children: new Date(action.dueDate).toLocaleDateString('zh-CN')
                                        }, void 0, false, {
                                            fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                                            lineNumber: 378,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                                    lineNumber: 370,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                            lineNumber: 343,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                    lineNumber: 259,
                    columnNumber: 9
                }, this)
            ]
        }, action.id, true, {
            fileName: "src/components/common/CustomerJourneyTimeline.tsx",
            lineNumber: 231,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_jsxdevruntime.Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Card, {
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
                                        color: '#1890ff',
                                        marginRight: '8px',
                                        fontSize: '18px'
                                    }
                                }, void 0, false, {
                                    fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                                    lineNumber: 393,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                    style: {
                                        fontSize: '16px',
                                        fontWeight: '600'
                                    },
                                    children: "客户旅程"
                                }, void 0, false, {
                                    fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                                    lineNumber: 394,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                            lineNumber: 392,
                            columnNumber: 13
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
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                            type: "secondary",
                                            style: {
                                                fontSize: '14px'
                                            },
                                            children: "整体进度:"
                                        }, void 0, false, {
                                            fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                                            lineNumber: 398,
                                            columnNumber: 17
                                        }, void 0),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Progress, {
                                            percent: calculateProgress(),
                                            size: "small",
                                            style: {
                                                width: '100px'
                                            },
                                            strokeColor: "#1890ff"
                                        }, void 0, false, {
                                            fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                                            lineNumber: 399,
                                            columnNumber: 17
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                                    lineNumber: 397,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                    color: "blue",
                                    children: journey.lifecycle === 'continuous' ? '持续服务' : journey.lifecycle === 'renewal' ? '续约阶段' : '其他阶段'
                                }, void 0, false, {
                                    fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                                    lineNumber: 406,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                            lineNumber: 396,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                    lineNumber: 391,
                    columnNumber: 11
                }, void 0),
                style: {
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                    border: '1px solid #f0f0f0',
                    background: '#ffffff',
                    ...style
                },
                bodyStyle: {
                    padding: compact ? '16px' : '24px'
                },
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        position: 'relative',
                        width: '100%',
                        padding: '20px 0',
                        overflowX: 'auto'
                    },
                    children: [
                        journey.actions && journey.actions.length > 1 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_jsxdevruntime.Fragment, {
                            children: journey.actions.slice(0, -1).map((_, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        position: 'absolute',
                                        top: '32px',
                                        left: `calc(${130 + index * 280}px + 12px)`,
                                        width: `${256}px`,
                                        height: '2px',
                                        backgroundColor: '#e8e8e8',
                                        zIndex: 1
                                    }
                                }, `line-${index}`, false, {
                                    fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                                    lineNumber: 430,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '60px',
                                padding: '0 20px',
                                minWidth: 'fit-content',
                                justifyContent: journey.actions && journey.actions.length <= 3 ? 'center' : 'flex-start'
                            },
                            children: journey.actions && journey.actions.length > 0 ? journey.actions.map((action, index)=>renderNodeCard(action, index)) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    textAlign: 'center',
                                    padding: '40px 0',
                                    width: '100%'
                                },
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                    type: "secondary",
                                    children: "暂无行动项数据"
                                }, void 0, false, {
                                    fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                                    lineNumber: 459,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                                lineNumber: 458,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                            lineNumber: 447,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                    lineNumber: 420,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                lineNumber: 389,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Modal, {
                title: "节点详情",
                open: modalVisible,
                onCancel: ()=>{
                    setModalVisible(false);
                    form.resetFields();
                },
                footer: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                        onClick: ()=>setModalVisible(false),
                        children: "取消"
                    }, "cancel", false, {
                        fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                        lineNumber: 475,
                        columnNumber: 11
                    }, void 0),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                        type: "primary",
                        onClick: handleCompleteAction,
                        disabled: (selectedAction === null || selectedAction === void 0 ? void 0 : selectedAction.status) === 'completed',
                        children: "标记完成"
                    }, "complete", false, {
                        fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                        lineNumber: 478,
                        columnNumber: 11
                    }, void 0),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                        type: "primary",
                        onClick: ()=>form.submit(),
                        children: "保存更新"
                    }, "save", false, {
                        fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                        lineNumber: 486,
                        columnNumber: 11
                    }, void 0)
                ],
                width: 600,
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form, {
                    form: form,
                    layout: "vertical",
                    onFinish: handleNodeUpdate,
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            name: "title",
                            label: "标题",
                            rules: [
                                {
                                    required: true,
                                    message: '请输入标题'
                                }
                            ],
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {
                                placeholder: "请输入节点标题"
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                                lineNumber: 506,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                            lineNumber: 501,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            name: "description",
                            label: "描述",
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input.TextArea, {
                                rows: 3,
                                placeholder: "请输入节点描述"
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                                lineNumber: 513,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                            lineNumber: 509,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            name: "status",
                            label: "状态",
                            rules: [
                                {
                                    required: true,
                                    message: '请选择状态'
                                }
                            ],
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                placeholder: "请选择状态",
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select.Option, {
                                        value: "pending",
                                        children: "待处理"
                                    }, void 0, false, {
                                        fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                                        lineNumber: 525,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select.Option, {
                                        value: "in_progress",
                                        children: "进行中"
                                    }, void 0, false, {
                                        fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                                        lineNumber: 526,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select.Option, {
                                        value: "completed",
                                        children: "已完成"
                                    }, void 0, false, {
                                        fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                                        lineNumber: 527,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select.Option, {
                                        value: "overdue",
                                        children: "已延期"
                                    }, void 0, false, {
                                        fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                                        lineNumber: 528,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                                lineNumber: 524,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                            lineNumber: 519,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            name: "dueDate",
                            label: "截止日期",
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.DatePicker, {
                                style: {
                                    width: '100%'
                                },
                                placeholder: "请选择截止日期"
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                                lineNumber: 536,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                            lineNumber: 532,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            name: "assignee",
                            label: "负责人",
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {
                                placeholder: "请输入负责人"
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                                lineNumber: 546,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                            lineNumber: 542,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                    lineNumber: 496,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/common/CustomerJourneyTimeline.tsx",
                lineNumber: 467,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
};
_s(CustomerJourneyTimeline, "E+3N763s0MoFrGGYgmaUu07i/b0=", false, function() {
    return [
        _antd.Form.useForm
    ];
});
_c = CustomerJourneyTimeline;
var _default = CustomerJourneyTimeline;
var _c;
$RefreshReg$(_c, "CustomerJourneyTimeline");
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
"src/components/common/CustomerProfileTab.tsx": function (module, exports, __mako_require__){
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
var _dayjs = /*#__PURE__*/ _interop_require_default._(__mako_require__("node_modules/dayjs/dayjs.min.js"));
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
var _s = $RefreshSig$();
const { Text } = _antd.Typography;
const { Option } = _antd.Select;
const CustomerProfileTab = ({ customer, lifecycle = 'continuous', onEditContract, onEditContacts })=>{
    var _customer_currentContract, _customer_currentContract1, _customer_currentContract_amount, _customer_currentContract2, _customer_currentContract3, _customer_currentContract4, _customer_currentContract5, _customer_currentContract6, _customer_currentContract7, _customer_currentContract8, _customer_currentContract_serviceCost, _customer_currentContract9;
    _s();
    // 关键联系人本地可编辑数据
    const [keyContacts, setKeyContacts] = (0, _react.useState)((customer === null || customer === void 0 ? void 0 : customer.keyContacts) || []);
    const [contactModalVisible, setContactModalVisible] = (0, _react.useState)(false);
    const [editingContactIndex, setEditingContactIndex] = (0, _react.useState)(null);
    const [contactForm] = _antd.Form.useForm();
    const initialCostDetails = ((customer === null || customer === void 0 ? void 0 : (_customer_currentContract = customer.currentContract) === null || _customer_currentContract === void 0 ? void 0 : _customer_currentContract.serviceCostDetails) || [
        '客户拜访费用: ¥3,000',
        '礼品采购: ¥5,000',
        '培训支持: ¥4,000',
        '技术支持: ¥3,000'
    ]).map((detail)=>{
        if (typeof detail === 'string') {
            const match = detail.match(/^(.*?):\s*¥?([\d,]+)/);
            return {
                description: match ? match[1] : detail.replace(/^•\s*/, '').trim(),
                amount: match ? parseInt(match[2].replace(/,/g, ''), 10) : undefined,
                time: undefined
            };
        }
        // 兼容对象格式 { description, amount, time }
        return {
            description: detail.description || '',
            amount: detail.amount,
            time: detail.time
        };
    });
    const [serviceCostItems, setServiceCostItems] = (0, _react.useState)(initialCostDetails);
    const [addModalVisible, setAddModalVisible] = (0, _react.useState)(false);
    const [editModalVisible, setEditModalVisible] = (0, _react.useState)(false);
    const [editingIndex, setEditingIndex] = (0, _react.useState)(null);
    const [addForm] = _antd.Form.useForm();
    const [editForm] = _antd.Form.useForm();
    const handleEditContact = (index)=>{
        setEditingContactIndex(index);
        const contact = keyContacts[index];
        contactForm.setFieldsValue({
            name: contact.name,
            title: contact.title,
            phone: contact.phone,
            email: contact.email,
            type: contact.type,
            influence: contact.influence,
            attitude: contact.attitude,
            isPrimary: contact.isPrimary || false
        });
        setContactModalVisible(true);
    };
    const handleSaveContact = ()=>{
        contactForm.validateFields().then((values)=>{
            // 如果设置为主要联系人，需要将其他联系人的isPrimary设为false
            if (values.isPrimary) {
                const updatedContacts = keyContacts.map((contact)=>({
                        ...contact,
                        isPrimary: false
                    }));
                setKeyContacts(updatedContacts);
            }
            if (editingContactIndex !== null) {
                // 编辑现有联系人
                const updatedContacts = [
                    ...keyContacts
                ];
                updatedContacts[editingContactIndex] = {
                    ...updatedContacts[editingContactIndex],
                    ...values
                };
                setKeyContacts(updatedContacts);
                _antd.message.success('联系人信息更新成功');
            } else {
                // 新增联系人
                const newContact = {
                    id: Date.now().toString(),
                    ...values
                };
                setKeyContacts([
                    ...keyContacts,
                    newContact
                ]);
                _antd.message.success('联系人添加成功');
            }
            setContactModalVisible(false);
            setEditingContactIndex(null);
        });
    };
    const handleAddCost = ()=>{
        addForm.validateFields().then((values)=>{
            const newItem = {
                description: values.description,
                amount: values.amount,
                time: values.time ? values.time.format('YYYY-MM-DD HH:mm') : undefined
            };
            setServiceCostItems((prev)=>[
                    ...prev,
                    newItem
                ]);
            setAddModalVisible(false);
            addForm.resetFields();
            _antd.message.success('已添加投入');
        });
    };
    const openEditCost = (index)=>{
        setEditingIndex(index);
        const item = serviceCostItems[index];
        editForm.setFieldsValue({
            description: item.description,
            amount: item.amount,
            time: item.time ? (0, _dayjs.default)(item.time) : undefined
        });
        setEditModalVisible(true);
    };
    const handleSaveEditCost = ()=>{
        editForm.validateFields().then((values)=>{
            if (editingIndex === null) return;
            const next = [
                ...serviceCostItems
            ];
            next[editingIndex] = {
                description: values.description,
                amount: values.amount,
                time: values.time ? values.time.format('YYYY-MM-DD HH:mm') : next[editingIndex].time
            };
            setServiceCostItems(next);
            setEditModalVisible(false);
            setEditingIndex(null);
            _antd.message.success('已更新投入');
        });
    };
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            padding: '16px 0'
        },
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    marginBottom: '16px'
                },
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '12px',
                            fontSize: '14px',
                            fontWeight: '500'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DollarOutlined, {
                                style: {
                                    color: '#52c41a',
                                    marginRight: '8px'
                                }
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 185,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                children: "合同与服务"
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 186,
                                columnNumber: 11
                            }, this),
                            onEditContract && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                type: "text",
                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.EditOutlined, {}, void 0, false, {
                                    fileName: "src/components/common/CustomerProfileTab.tsx",
                                    lineNumber: 190,
                                    columnNumber: 21
                                }, void 0),
                                onClick: onEditContract,
                                size: "small",
                                style: {
                                    marginLeft: 'auto'
                                }
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 188,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/common/CustomerProfileTab.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions, {
                        bordered: true,
                        size: "small",
                        column: 2,
                        labelStyle: {
                            width: '180px',
                            minWidth: '180px'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                label: "服务开始时间",
                                span: 1,
                                children: (customer === null || customer === void 0 ? void 0 : (_customer_currentContract1 = customer.currentContract) === null || _customer_currentContract1 === void 0 ? void 0 : _customer_currentContract1.startDate) || '-'
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 203,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                label: "合同金额",
                                span: 1,
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                    style: {
                                        color: '#52c41a',
                                        fontWeight: '600'
                                    },
                                    children: [
                                        "¥",
                                        (customer === null || customer === void 0 ? void 0 : (_customer_currentContract2 = customer.currentContract) === null || _customer_currentContract2 === void 0 ? void 0 : (_customer_currentContract_amount = _customer_currentContract2.amount) === null || _customer_currentContract_amount === void 0 ? void 0 : _customer_currentContract_amount.toLocaleString()) || '0'
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/common/CustomerProfileTab.tsx",
                                    lineNumber: 208,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 207,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                label: "服务到期时间",
                                span: 1,
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                    style: {
                                        color: '#fa541c'
                                    },
                                    children: (customer === null || customer === void 0 ? void 0 : customer.contractEndDate) || '暂无'
                                }, void 0, false, {
                                    fileName: "src/components/common/CustomerProfileTab.tsx",
                                    lineNumber: 214,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 213,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                label: "人数版本",
                                span: 1,
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                    style: {
                                        color: '#52c41a'
                                    },
                                    children: (customer === null || customer === void 0 ? void 0 : (_customer_currentContract3 = customer.currentContract) === null || _customer_currentContract3 === void 0 ? void 0 : _customer_currentContract3.userVersion) || (customer === null || customer === void 0 ? void 0 : customer.scale) || '暂无'
                                }, void 0, false, {
                                    fileName: "src/components/common/CustomerProfileTab.tsx",
                                    lineNumber: 220,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 219,
                                columnNumber: 11
                            }, this),
                            lifecycle !== 'renewal' && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_jsxdevruntime.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                        label: "提单版本",
                                        span: 1,
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                            style: {
                                                color: '#722ed1'
                                            },
                                            children: (customer === null || customer === void 0 ? void 0 : (_customer_currentContract4 = customer.currentContract) === null || _customer_currentContract4 === void 0 ? void 0 : _customer_currentContract4.ticketVersion) || '暂无'
                                        }, void 0, false, {
                                            fileName: "src/components/common/CustomerProfileTab.tsx",
                                            lineNumber: 228,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/components/common/CustomerProfileTab.tsx",
                                        lineNumber: 227,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                        label: "提单到期时间",
                                        span: 1,
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                            style: {
                                                color: '#fa541c'
                                            },
                                            children: (customer === null || customer === void 0 ? void 0 : customer.ticketExpiryDate) || '暂无'
                                        }, void 0, false, {
                                            fileName: "src/components/common/CustomerProfileTab.tsx",
                                            lineNumber: 233,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/components/common/CustomerProfileTab.tsx",
                                        lineNumber: 232,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                        label: "天元订单",
                                        span: 1,
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                            color: (customer === null || customer === void 0 ? void 0 : (_customer_currentContract5 = customer.currentContract) === null || _customer_currentContract5 === void 0 ? void 0 : _customer_currentContract5.tianyuanOrderStatus) === 'active' ? 'green' : 'orange',
                                            children: (customer === null || customer === void 0 ? void 0 : (_customer_currentContract6 = customer.currentContract) === null || _customer_currentContract6 === void 0 ? void 0 : _customer_currentContract6.tianyuanOrderStatus) === 'active' ? '已生效' : '未生效'
                                        }, void 0, false, {
                                            fileName: "src/components/common/CustomerProfileTab.tsx",
                                            lineNumber: 238,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/components/common/CustomerProfileTab.tsx",
                                        lineNumber: 237,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/common/CustomerProfileTab.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/common/CustomerProfileTab.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Divider, {}, void 0, false, {
                fileName: "src/components/common/CustomerProfileTab.tsx",
                lineNumber: 247,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    marginBottom: '16px'
                },
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '12px',
                            fontSize: '14px',
                            fontWeight: '500'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {
                                style: {
                                    color: '#1890ff',
                                    marginRight: '8px'
                                }
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 258,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                children: "基本信息"
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 259,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/common/CustomerProfileTab.tsx",
                        lineNumber: 251,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions, {
                        bordered: true,
                        size: "small",
                        column: 2,
                        labelStyle: {
                            width: '180px',
                            minWidth: '180px'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                label: "公司名称",
                                span: 1,
                                children: (customer === null || customer === void 0 ? void 0 : customer.companyName) || '暂无'
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 267,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                label: "行业",
                                span: 1,
                                children: (customer === null || customer === void 0 ? void 0 : customer.industry) || '暂无'
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 271,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                label: "规模",
                                span: 1,
                                children: (customer === null || customer === void 0 ? void 0 : customer.scale) || '暂无'
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 275,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                label: "客户类型",
                                span: 1,
                                children: (customer === null || customer === void 0 ? void 0 : customer.customerType) || '暂无'
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 279,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                label: "健康分",
                                span: 1,
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                    style: {
                                        color: (customer === null || customer === void 0 ? void 0 : customer.healthScore) >= 80 ? '#52c41a' : (customer === null || customer === void 0 ? void 0 : customer.healthScore) >= 60 ? '#faad14' : '#ff4d4f',
                                        fontWeight: '600'
                                    },
                                    children: (customer === null || customer === void 0 ? void 0 : customer.healthScore) || '暂无'
                                }, void 0, false, {
                                    fileName: "src/components/common/CustomerProfileTab.tsx",
                                    lineNumber: 284,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 283,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                label: "建档数",
                                span: 1,
                                children: (customer === null || customer === void 0 ? void 0 : customer.profileCount) || '0'
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 293,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/common/CustomerProfileTab.tsx",
                        lineNumber: 261,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/common/CustomerProfileTab.tsx",
                lineNumber: 250,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Divider, {}, void 0, false, {
                fileName: "src/components/common/CustomerProfileTab.tsx",
                lineNumber: 299,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    marginBottom: '16px'
                },
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '12px',
                            fontSize: '14px',
                            fontWeight: '500'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.TeamOutlined, {
                                style: {
                                    color: '#722ed1',
                                    marginRight: '8px'
                                }
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 310,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                children: "关键联系人"
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 311,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                type: "text",
                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PlusOutlined, {}, void 0, false, {
                                    fileName: "src/components/common/CustomerProfileTab.tsx",
                                    lineNumber: 314,
                                    columnNumber: 19
                                }, void 0),
                                onClick: ()=>setContactModalVisible(true),
                                size: "small",
                                style: {
                                    marginLeft: 'auto'
                                }
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 312,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/common/CustomerProfileTab.tsx",
                        lineNumber: 303,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px'
                        },
                        children: keyContacts === null || keyContacts === void 0 ? void 0 : keyContacts.map((contact, index)=>{
                            var _contact_phone;
                            return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    position: 'relative'
                                },
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions, {
                                        bordered: true,
                                        size: "small",
                                        column: 2,
                                        style: {
                                            width: '100%'
                                        },
                                        labelStyle: {
                                            width: '180px',
                                            minWidth: '180px'
                                        },
                                        contentStyle: {
                                            minWidth: '200px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                label: "姓名",
                                                span: 1,
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                            children: contact.name
                                                        }, void 0, false, {
                                                            fileName: "src/components/common/CustomerProfileTab.tsx",
                                                            lineNumber: 335,
                                                            columnNumber: 21
                                                        }, this),
                                                        contact.isPrimary && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                            color: "green",
                                                            children: "主要联系人"
                                                        }, void 0, false, {
                                                            fileName: "src/components/common/CustomerProfileTab.tsx",
                                                            lineNumber: 336,
                                                            columnNumber: 43
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/common/CustomerProfileTab.tsx",
                                                    lineNumber: 334,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                                lineNumber: 333,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                label: "职位",
                                                span: 1,
                                                children: contact.title
                                            }, void 0, false, {
                                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                                lineNumber: 340,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                label: "电话",
                                                span: 1,
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                    children: ((_contact_phone = contact.phone) === null || _contact_phone === void 0 ? void 0 : _contact_phone.replace(/\*+/g, '')) || contact.phone
                                                }, void 0, false, {
                                                    fileName: "src/components/common/CustomerProfileTab.tsx",
                                                    lineNumber: 345,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                                lineNumber: 344,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                                label: "邮箱",
                                                span: 1,
                                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                    children: contact.email
                                                }, void 0, false, {
                                                    fileName: "src/components/common/CustomerProfileTab.tsx",
                                                    lineNumber: 349,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                                lineNumber: 348,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/common/CustomerProfileTab.tsx",
                                        lineNumber: 325,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                        type: "text",
                                        size: "small",
                                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.EditOutlined, {}, void 0, false, {
                                            fileName: "src/components/common/CustomerProfileTab.tsx",
                                            lineNumber: 357,
                                            columnNumber: 23
                                        }, void 0),
                                        onClick: ()=>handleEditContact(index),
                                        style: {
                                            position: 'absolute',
                                            top: '8px',
                                            right: '8px',
                                            zIndex: 1
                                        }
                                    }, void 0, false, {
                                        fileName: "src/components/common/CustomerProfileTab.tsx",
                                        lineNumber: 354,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 324,
                                columnNumber: 13
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "src/components/common/CustomerProfileTab.tsx",
                        lineNumber: 322,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/common/CustomerProfileTab.tsx",
                lineNumber: 302,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Divider, {}, void 0, false, {
                fileName: "src/components/common/CustomerProfileTab.tsx",
                lineNumber: 371,
                columnNumber: 7
            }, this),
            (lifecycle === 'renewal' || (customer === null || customer === void 0 ? void 0 : (_customer_currentContract7 = customer.currentContract) === null || _customer_currentContract7 === void 0 ? void 0 : _customer_currentContract7.serviceCost) || (customer === null || customer === void 0 ? void 0 : (_customer_currentContract8 = customer.currentContract) === null || _customer_currentContract8 === void 0 ? void 0 : _customer_currentContract8.serviceCostDetails)) && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    marginTop: '16px'
                },
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '16px'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DollarOutlined, {
                                        style: {
                                            color: '#1890ff',
                                            marginRight: '8px'
                                        }
                                    }, void 0, false, {
                                        fileName: "src/components/common/CustomerProfileTab.tsx",
                                        lineNumber: 378,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                        style: {
                                            fontSize: '14px',
                                            fontWeight: '500'
                                        },
                                        children: "服务成本投入"
                                    }, void 0, false, {
                                        fileName: "src/components/common/CustomerProfileTab.tsx",
                                        lineNumber: 379,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 377,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                type: "text",
                                size: "small",
                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PlusOutlined, {}, void 0, false, {
                                    fileName: "src/components/common/CustomerProfileTab.tsx",
                                    lineNumber: 384,
                                    columnNumber: 21
                                }, void 0),
                                onClick: ()=>setAddModalVisible(true)
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 381,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/common/CustomerProfileTab.tsx",
                        lineNumber: 376,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions, {
                        bordered: true,
                        size: "small",
                        column: 1,
                        labelStyle: {
                            width: '180px',
                            minWidth: '180px'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                label: "总投入",
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                    style: {
                                        color: '#1890ff',
                                        fontWeight: 600
                                    },
                                    children: [
                                        "¥",
                                        (customer === null || customer === void 0 ? void 0 : (_customer_currentContract9 = customer.currentContract) === null || _customer_currentContract9 === void 0 ? void 0 : (_customer_currentContract_serviceCost = _customer_currentContract9.serviceCost) === null || _customer_currentContract_serviceCost === void 0 ? void 0 : _customer_currentContract_serviceCost.toLocaleString()) || '15,000'
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/common/CustomerProfileTab.tsx",
                                    lineNumber: 397,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 396,
                                columnNumber: 13
                            }, this),
                            serviceCostItems.map((item, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                    label: item.description,
                                    style: {
                                        position: 'relative'
                                    },
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                children: item.amount !== undefined ? `¥${item.amount.toLocaleString()}` : '—'
                                            }, void 0, false, {
                                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                                lineNumber: 409,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                        type: "secondary",
                                                        style: {
                                                            marginRight: '8px',
                                                            fontSize: '12px'
                                                        },
                                                        children: item.time || '—'
                                                    }, void 0, false, {
                                                        fileName: "src/components/common/CustomerProfileTab.tsx",
                                                        lineNumber: 413,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                        type: "text",
                                                        size: "small",
                                                        icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.EditOutlined, {}, void 0, false, {
                                                            fileName: "src/components/common/CustomerProfileTab.tsx",
                                                            lineNumber: 419,
                                                            columnNumber: 29
                                                        }, void 0),
                                                        onClick: ()=>openEditCost(index)
                                                    }, void 0, false, {
                                                        fileName: "src/components/common/CustomerProfileTab.tsx",
                                                        lineNumber: 416,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                                lineNumber: 412,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/common/CustomerProfileTab.tsx",
                                        lineNumber: 408,
                                        columnNumber: 17
                                    }, this)
                                }, index, false, {
                                    fileName: "src/components/common/CustomerProfileTab.tsx",
                                    lineNumber: 403,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "src/components/common/CustomerProfileTab.tsx",
                        lineNumber: 390,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/common/CustomerProfileTab.tsx",
                lineNumber: 375,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Modal, {
                title: "添加服务成本投入",
                open: addModalVisible,
                onOk: handleAddCost,
                onCancel: ()=>setAddModalVisible(false),
                width: 400,
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form, {
                    form: addForm,
                    layout: "vertical",
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            label: "投入描述",
                            name: "description",
                            rules: [
                                {
                                    required: true,
                                    message: '请输入投入描述'
                                }
                            ],
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {
                                placeholder: "例如：客户拜访费用"
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 440,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/common/CustomerProfileTab.tsx",
                            lineNumber: 439,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            label: "金额",
                            name: "amount",
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.InputNumber, {
                                style: {
                                    width: '100%'
                                },
                                formatter: (value)=>`¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                                parser: (value)=>value.replace(/¥\s?|(,*)/g, ''),
                                placeholder: "请输入金额"
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 443,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/common/CustomerProfileTab.tsx",
                            lineNumber: 442,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            label: "时间",
                            name: "time",
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.DatePicker, {
                                showTime: true,
                                style: {
                                    width: '100%'
                                }
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 451,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/common/CustomerProfileTab.tsx",
                            lineNumber: 450,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/common/CustomerProfileTab.tsx",
                    lineNumber: 438,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/common/CustomerProfileTab.tsx",
                lineNumber: 431,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Modal, {
                title: "编辑服务成本投入",
                open: editModalVisible,
                onOk: handleSaveEditCost,
                onCancel: ()=>setEditModalVisible(false),
                width: 400,
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form, {
                    form: editForm,
                    layout: "vertical",
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            label: "投入描述",
                            name: "description",
                            rules: [
                                {
                                    required: true,
                                    message: '请输入投入描述'
                                }
                            ],
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {
                                placeholder: "例如：客户拜访费用"
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 466,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/common/CustomerProfileTab.tsx",
                            lineNumber: 465,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            label: "金额",
                            name: "amount",
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.InputNumber, {
                                style: {
                                    width: '100%'
                                },
                                formatter: (value)=>`¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                                parser: (value)=>value.replace(/¥\s?|(,*)/g, ''),
                                placeholder: "请输入金额"
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 469,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/common/CustomerProfileTab.tsx",
                            lineNumber: 468,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            label: "时间",
                            name: "time",
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.DatePicker, {
                                showTime: true,
                                style: {
                                    width: '100%'
                                }
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 477,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/common/CustomerProfileTab.tsx",
                            lineNumber: 476,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/common/CustomerProfileTab.tsx",
                    lineNumber: 464,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/common/CustomerProfileTab.tsx",
                lineNumber: 457,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Modal, {
                title: editingContactIndex !== null ? "编辑联系人" : "添加联系人",
                open: contactModalVisible,
                onOk: handleSaveContact,
                onCancel: ()=>{
                    setContactModalVisible(false);
                    setEditingContactIndex(null);
                },
                width: 500,
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form, {
                    form: contactForm,
                    layout: "vertical",
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            label: "姓名",
                            name: "name",
                            rules: [
                                {
                                    required: true,
                                    message: '请输入姓名'
                                }
                            ],
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {}, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 495,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/common/CustomerProfileTab.tsx",
                            lineNumber: 494,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            label: "职位",
                            name: "title",
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {}, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 498,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/common/CustomerProfileTab.tsx",
                            lineNumber: 497,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                display: 'flex',
                                gap: '16px'
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        flex: 1
                                    },
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                        label: "干系类型",
                                        name: "type",
                                        rules: [
                                            {
                                                required: true,
                                                message: '请选择干系类型'
                                            }
                                        ],
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                    value: "decision_maker",
                                                    children: "决策者"
                                                }, void 0, false, {
                                                    fileName: "src/components/common/CustomerProfileTab.tsx",
                                                    lineNumber: 504,
                                                    columnNumber: 20
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                    value: "influencer",
                                                    children: "影响者"
                                                }, void 0, false, {
                                                    fileName: "src/components/common/CustomerProfileTab.tsx",
                                                    lineNumber: 505,
                                                    columnNumber: 20
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                    value: "user",
                                                    children: "使用者"
                                                }, void 0, false, {
                                                    fileName: "src/components/common/CustomerProfileTab.tsx",
                                                    lineNumber: 506,
                                                    columnNumber: 20
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                    value: "gatekeeper",
                                                    children: "把关者"
                                                }, void 0, false, {
                                                    fileName: "src/components/common/CustomerProfileTab.tsx",
                                                    lineNumber: 507,
                                                    columnNumber: 20
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/common/CustomerProfileTab.tsx",
                                            lineNumber: 503,
                                            columnNumber: 18
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/components/common/CustomerProfileTab.tsx",
                                        lineNumber: 502,
                                        columnNumber: 16
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/common/CustomerProfileTab.tsx",
                                    lineNumber: 501,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        flex: 1
                                    },
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                        label: "影响力",
                                        name: "influence",
                                        rules: [
                                            {
                                                required: true,
                                                message: '请选择影响力'
                                            }
                                        ],
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                    value: "high",
                                                    children: "高"
                                                }, void 0, false, {
                                                    fileName: "src/components/common/CustomerProfileTab.tsx",
                                                    lineNumber: 514,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                    value: "medium",
                                                    children: "中"
                                                }, void 0, false, {
                                                    fileName: "src/components/common/CustomerProfileTab.tsx",
                                                    lineNumber: 515,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                                    value: "low",
                                                    children: "低"
                                                }, void 0, false, {
                                                    fileName: "src/components/common/CustomerProfileTab.tsx",
                                                    lineNumber: 516,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/common/CustomerProfileTab.tsx",
                                            lineNumber: 513,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/components/common/CustomerProfileTab.tsx",
                                        lineNumber: 512,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/common/CustomerProfileTab.tsx",
                                    lineNumber: 511,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/common/CustomerProfileTab.tsx",
                            lineNumber: 500,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            label: "态度",
                            name: "attitude",
                            rules: [
                                {
                                    required: true,
                                    message: '请选择态度'
                                }
                            ],
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "positive",
                                        children: "积极"
                                    }, void 0, false, {
                                        fileName: "src/components/common/CustomerProfileTab.tsx",
                                        lineNumber: 523,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "neutral",
                                        children: "中性"
                                    }, void 0, false, {
                                        fileName: "src/components/common/CustomerProfileTab.tsx",
                                        lineNumber: 524,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "negative",
                                        children: "消极"
                                    }, void 0, false, {
                                        fileName: "src/components/common/CustomerProfileTab.tsx",
                                        lineNumber: 525,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 522,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/common/CustomerProfileTab.tsx",
                            lineNumber: 521,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                display: 'flex',
                                gap: '16px'
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        flex: 1
                                    },
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                        label: "电话",
                                        name: "phone",
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {}, void 0, false, {
                                            fileName: "src/components/common/CustomerProfileTab.tsx",
                                            lineNumber: 531,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/components/common/CustomerProfileTab.tsx",
                                        lineNumber: 530,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/common/CustomerProfileTab.tsx",
                                    lineNumber: 529,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        flex: 1
                                    },
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                                        label: "邮箱",
                                        name: "email",
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {}, void 0, false, {
                                            fileName: "src/components/common/CustomerProfileTab.tsx",
                                            lineNumber: 536,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/components/common/CustomerProfileTab.tsx",
                                        lineNumber: 535,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/common/CustomerProfileTab.tsx",
                                    lineNumber: 534,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/common/CustomerProfileTab.tsx",
                            lineNumber: 528,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            name: "isPrimary",
                            valuePropName: "checked",
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Checkbox, {
                                children: "设为主要联系人"
                            }, void 0, false, {
                                fileName: "src/components/common/CustomerProfileTab.tsx",
                                lineNumber: 541,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/common/CustomerProfileTab.tsx",
                            lineNumber: 540,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/common/CustomerProfileTab.tsx",
                    lineNumber: 493,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/common/CustomerProfileTab.tsx",
                lineNumber: 483,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/components/common/CustomerProfileTab.tsx",
        lineNumber: 175,
        columnNumber: 5
    }, this);
};
_s(CustomerProfileTab, "GzHloFBK1Awdg1zzwP2P9ezlHrs=", false, function() {
    return [
        _antd.Form.useForm,
        _antd.Form.useForm,
        _antd.Form.useForm
    ];
});
_c = CustomerProfileTab;
var _default = CustomerProfileTab;
var _c;
$RefreshReg$(_c, "CustomerProfileTab");
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
"src/components/common/ServiceRecordTab.tsx": function (module, exports, __mako_require__){
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
const { Text } = _antd.Typography;
const { TextArea } = _antd.Input;
const { Option } = _antd.Select;
const { RangePicker } = _antd.DatePicker;
const ServiceRecordTab = ({ serviceRecords = [], onAddRecord, onEditRecord, showAddButton = true, tabTitle = '服务记录', handoverData })=>{
    var _handoverData_crmInfo, _handoverData_crmInfo1, _handoverData_crmInfo2, _handoverData_crmInfo3, _handoverData_risks, _handoverData_opportunities, _handoverData_stakeholders;
    _s();
    const [newRecordModalVisible, setNewRecordModalVisible] = (0, _react.useState)(false);
    const [editRecordModalVisible, setEditRecordModalVisible] = (0, _react.useState)(false);
    const [handoverDetailVisible, setHandoverDetailVisible] = (0, _react.useState)(false);
    const [editingRecord, setEditingRecord] = (0, _react.useState)(null);
    const [form] = _antd.Form.useForm();
    const [editForm] = _antd.Form.useForm();
    // 筛选状态
    const [filterType, setFilterType] = (0, _react.useState)('all');
    const [filterDateRange, setFilterDateRange] = (0, _react.useState)(null);
    // 筛选后的服务记录
    const filteredServiceRecords = (0, _react.useMemo)(()=>{
        return serviceRecords.filter((record)=>{
            // 类型筛选
            if (filterType !== 'all' && record.type !== filterType) return false;
            // 时间筛选
            if (filterDateRange && filterDateRange[0] && filterDateRange[1]) {
                const recordDate = new Date(record.timestamp);
                const startDate = filterDateRange[0].startOf('day');
                const endDate = filterDateRange[1].endOf('day');
                if (recordDate < startDate || recordDate > endDate) return false;
            }
            return true;
        });
    }, [
        serviceRecords,
        filterType,
        filterDateRange
    ]);
    // 获取记录类型配置
    const getRecordConfig = (type)=>{
        const configs = {
            'QBR': {
                color: '#52c41a',
                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.TeamOutlined, {}, void 0, false, {
                    fileName: "src/components/common/ServiceRecordTab.tsx",
                    lineNumber: 109,
                    columnNumber: 40
                }, this)
            },
            '电话回访': {
                color: '#1890ff',
                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PhoneOutlined, {}, void 0, false, {
                    fileName: "src/components/common/ServiceRecordTab.tsx",
                    lineNumber: 110,
                    columnNumber: 41
                }, this)
            },
            '培训': {
                color: '#722ed1',
                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PlayCircleOutlined, {}, void 0, false, {
                    fileName: "src/components/common/ServiceRecordTab.tsx",
                    lineNumber: 111,
                    columnNumber: 39
                }, this)
            },
            '工单解决': {
                color: '#fa8c16',
                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.SettingOutlined, {}, void 0, false, {
                    fileName: "src/components/common/ServiceRecordTab.tsx",
                    lineNumber: 112,
                    columnNumber: 41
                }, this)
            },
            '风险处理': {
                color: '#f5222d',
                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ExclamationCircleOutlined, {}, void 0, false, {
                    fileName: "src/components/common/ServiceRecordTab.tsx",
                    lineNumber: 113,
                    columnNumber: 41
                }, this)
            },
            '产品演示': {
                color: '#13c2c2',
                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PlayCircleOutlined, {}, void 0, false, {
                    fileName: "src/components/common/ServiceRecordTab.tsx",
                    lineNumber: 114,
                    columnNumber: 41
                }, this)
            },
            '技术支持': {
                color: '#eb2f96',
                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.SettingOutlined, {}, void 0, false, {
                    fileName: "src/components/common/ServiceRecordTab.tsx",
                    lineNumber: 115,
                    columnNumber: 41
                }, this)
            },
            '商务沟通': {
                color: '#faad14',
                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DollarOutlined, {}, void 0, false, {
                    fileName: "src/components/common/ServiceRecordTab.tsx",
                    lineNumber: 116,
                    columnNumber: 41
                }, this)
            },
            '其他': {
                color: '#8c8c8c',
                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.ClockCircleOutlined, {}, void 0, false, {
                    fileName: "src/components/common/ServiceRecordTab.tsx",
                    lineNumber: 117,
                    columnNumber: 39
                }, this)
            }
        };
        return configs[type] || configs['其他'];
    };
    // 处理编辑记录
    const handleEditRecord = (record)=>{
        setEditingRecord(record);
        editForm.setFieldsValue({
            type: record.type,
            title: record.title,
            content: record.content,
            tags: record.tags || [],
            attachments: record.attachments || []
        });
        setEditRecordModalVisible(true);
    };
    // 处理保存编辑
    const handleSaveEdit = ()=>{
        editForm.validateFields().then((values)=>{
            if (editingRecord && onEditRecord) {
                const updatedRecord = {
                    ...values,
                    operator: editingRecord.operator,
                    timestamp: editingRecord.timestamp,
                    tags: values.tags || [],
                    attachments: values.attachments || []
                };
                onEditRecord(editingRecord.id, updatedRecord);
                _antd.message.success('服务记录已更新');
                setEditRecordModalVisible(false);
                setEditingRecord(null);
                editForm.resetFields();
            }
        });
    };
    // 处理新增记录
    const handleAddRecord = ()=>{
        form.validateFields().then((values)=>{
            const newRecord = {
                ...values,
                operator: '当前用户',
                timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
                tags: values.tags || [],
                attachments: values.attachments || []
            };
            if (onAddRecord) onAddRecord(newRecord);
            _antd.message.success('服务记录已创建');
            setNewRecordModalVisible(false);
            form.resetFields();
        });
    };
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        style: {
            padding: '8px 0'
        },
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                    padding: '12px',
                    background: '#f8f9fa',
                    borderRadius: '6px',
                    border: '1px solid #e8e8e8'
                },
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.FilterOutlined, {
                                style: {
                                    color: '#666'
                                }
                            }, void 0, false, {
                                fileName: "src/components/common/ServiceRecordTab.tsx",
                                lineNumber: 191,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                value: filterType,
                                onChange: setFilterType,
                                style: {
                                    width: 120
                                },
                                placeholder: "服务类型",
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "all",
                                        children: "全部类型"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 198,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "QBR",
                                        children: "QBR"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 199,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "电话回访",
                                        children: "电话回访"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 200,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "培训",
                                        children: "培训"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 201,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "工单解决",
                                        children: "工单解决"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 202,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "风险处理",
                                        children: "风险处理"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 203,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "产品演示",
                                        children: "产品演示"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 204,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "技术支持",
                                        children: "技术支持"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 205,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "商务沟通",
                                        children: "商务沟通"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 206,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "其他",
                                        children: "其他"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 207,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/common/ServiceRecordTab.tsx",
                                lineNumber: 192,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(RangePicker, {
                                value: filterDateRange,
                                onChange: setFilterDateRange,
                                placeholder: [
                                    '开始时间',
                                    '结束时间'
                                ],
                                style: {
                                    width: 240
                                },
                                allowClear: true
                            }, void 0, false, {
                                fileName: "src/components/common/ServiceRecordTab.tsx",
                                lineNumber: 210,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                onClick: ()=>{
                                    setFilterType('all');
                                    setFilterDateRange(null);
                                },
                                size: "small",
                                children: "重置筛选"
                            }, void 0, false, {
                                fileName: "src/components/common/ServiceRecordTab.tsx",
                                lineNumber: 218,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/common/ServiceRecordTab.tsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                type: "secondary",
                                style: {
                                    fontSize: '14px'
                                },
                                children: [
                                    "共 ",
                                    filteredServiceRecords.length,
                                    " 条记录",
                                    filteredServiceRecords.length !== serviceRecords.length && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                        style: {
                                            color: '#1890ff'
                                        },
                                        children: [
                                            "（已筛选，总共 ",
                                            serviceRecords.length,
                                            " 条）"
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 233,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/common/ServiceRecordTab.tsx",
                                lineNumber: 230,
                                columnNumber: 11
                            }, this),
                            showAddButton && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                type: "primary",
                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.PlusOutlined, {}, void 0, false, {
                                    fileName: "src/components/common/ServiceRecordTab.tsx",
                                    lineNumber: 241,
                                    columnNumber: 21
                                }, void 0),
                                onClick: ()=>setNewRecordModalVisible(true),
                                children: [
                                    "新增",
                                    tabTitle
                                ]
                            }, void 0, true, {
                                fileName: "src/components/common/ServiceRecordTab.tsx",
                                lineNumber: 239,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/common/ServiceRecordTab.tsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/common/ServiceRecordTab.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Timeline, {
                style: {
                    padding: '16px 0'
                },
                items: filteredServiceRecords.map((record)=>{
                    const config = getRecordConfig(record.type);
                    return {
                        color: config.color,
                        dot: config.icon,
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                padding: '16px',
                                background: '#f8f9fa',
                                borderRadius: '8px',
                                border: '1px solid #e8e8e8'
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: '8px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                    color: config.color,
                                                    style: {
                                                        marginRight: '8px'
                                                    },
                                                    children: record.type
                                                }, void 0, false, {
                                                    fileName: "src/components/common/ServiceRecordTab.tsx",
                                                    lineNumber: 267,
                                                    columnNumber: 21
                                                }, void 0),
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                    strong: true,
                                                    style: {
                                                        fontSize: '14px'
                                                    },
                                                    children: record.title
                                                }, void 0, false, {
                                                    fileName: "src/components/common/ServiceRecordTab.tsx",
                                                    lineNumber: 270,
                                                    columnNumber: 21
                                                }, void 0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/common/ServiceRecordTab.tsx",
                                            lineNumber: 266,
                                            columnNumber: 19
                                        }, void 0),
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
                                                        fontSize: '12px'
                                                    },
                                                    children: record.timestamp
                                                }, void 0, false, {
                                                    fileName: "src/components/common/ServiceRecordTab.tsx",
                                                    lineNumber: 275,
                                                    columnNumber: 21
                                                }, void 0),
                                                onEditRecord && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                                    type: "text",
                                                    size: "small",
                                                    icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.EditOutlined, {}, void 0, false, {
                                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                                        lineNumber: 282,
                                                        columnNumber: 31
                                                    }, void 0),
                                                    onClick: ()=>handleEditRecord(record),
                                                    style: {
                                                        marginLeft: '8px'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "src/components/common/ServiceRecordTab.tsx",
                                                    lineNumber: 279,
                                                    columnNumber: 23
                                                }, void 0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/common/ServiceRecordTab.tsx",
                                            lineNumber: 274,
                                            columnNumber: 19
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/common/ServiceRecordTab.tsx",
                                    lineNumber: 265,
                                    columnNumber: 17
                                }, void 0),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        marginBottom: '8px'
                                    },
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                        type: "secondary",
                                        style: {
                                            fontSize: '12px'
                                        },
                                        children: [
                                            "操作人：",
                                            record.operator
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 291,
                                        columnNumber: 19
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "src/components/common/ServiceRecordTab.tsx",
                                    lineNumber: 290,
                                    columnNumber: 17
                                }, void 0),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        marginBottom: '12px'
                                    },
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                        children: record.content
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 297,
                                        columnNumber: 19
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "src/components/common/ServiceRecordTab.tsx",
                                    lineNumber: 296,
                                    columnNumber: 17
                                }, void 0),
                                record.tags && record.tags.length > 0 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        marginBottom: '8px'
                                    },
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                        size: 4,
                                        children: record.tags.map((tag, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                style: {
                                                    fontSize: '11px'
                                                },
                                                children: tag
                                            }, index, false, {
                                                fileName: "src/components/common/ServiceRecordTab.tsx",
                                                lineNumber: 304,
                                                columnNumber: 25
                                            }, void 0))
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 302,
                                        columnNumber: 21
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "src/components/common/ServiceRecordTab.tsx",
                                    lineNumber: 301,
                                    columnNumber: 19
                                }, void 0),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        padding: '8px 12px',
                                        background: '#e6f7ff',
                                        borderRadius: '4px',
                                        border: '1px solid #91d5ff',
                                        marginTop: '8px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                            type: "secondary",
                                            style: {
                                                fontSize: '12px'
                                            },
                                            children: "关联/附件："
                                        }, void 0, false, {
                                            fileName: "src/components/common/ServiceRecordTab.tsx",
                                            lineNumber: 320,
                                            columnNumber: 19
                                        }, void 0),
                                        record.relatedPlaybookId && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                            color: "blue",
                                            style: {
                                                marginLeft: '4px',
                                                fontSize: '11px'
                                            },
                                            children: [
                                                "剧本: ",
                                                record.relatedPlaybookId
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/common/ServiceRecordTab.tsx",
                                            lineNumber: 324,
                                            columnNumber: 21
                                        }, void 0),
                                        record.relatedRiskEventId && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                            color: "red",
                                            style: {
                                                marginLeft: '4px',
                                                fontSize: '11px'
                                            },
                                            children: [
                                                "风险事件: ",
                                                record.relatedRiskEventId
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/common/ServiceRecordTab.tsx",
                                            lineNumber: 329,
                                            columnNumber: 21
                                        }, void 0),
                                        record.attachments && record.attachments.map((attachment, index)=>{
                                            // 检查是否是交接单
                                            if (attachment.includes('交接单')) return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                color: "green",
                                                style: {
                                                    marginLeft: '4px',
                                                    fontSize: '11px',
                                                    cursor: 'pointer'
                                                },
                                                icon: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.FileTextOutlined, {}, void 0, false, {
                                                    fileName: "src/components/common/ServiceRecordTab.tsx",
                                                    lineNumber: 341,
                                                    columnNumber: 33
                                                }, void 0),
                                                onClick: ()=>setHandoverDetailVisible(true),
                                                children: attachment
                                            }, index, false, {
                                                fileName: "src/components/common/ServiceRecordTab.tsx",
                                                lineNumber: 337,
                                                columnNumber: 25
                                            }, void 0);
                                            return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                color: "green",
                                                style: {
                                                    marginLeft: '4px',
                                                    fontSize: '11px'
                                                },
                                                children: attachment
                                            }, index, false, {
                                                fileName: "src/components/common/ServiceRecordTab.tsx",
                                                lineNumber: 349,
                                                columnNumber: 23
                                            }, void 0);
                                        }),
                                        !record.relatedPlaybookId && !record.relatedRiskEventId && (!record.attachments || record.attachments.length === 0) && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                            type: "secondary",
                                            style: {
                                                fontSize: '11px',
                                                marginLeft: '4px'
                                            },
                                            children: "暂无"
                                        }, void 0, false, {
                                            fileName: "src/components/common/ServiceRecordTab.tsx",
                                            lineNumber: 355,
                                            columnNumber: 21
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/common/ServiceRecordTab.tsx",
                                    lineNumber: 313,
                                    columnNumber: 17
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/common/ServiceRecordTab.tsx",
                            lineNumber: 259,
                            columnNumber: 15
                        }, void 0)
                    };
                })
            }, void 0, false, {
                fileName: "src/components/common/ServiceRecordTab.tsx",
                lineNumber: 250,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Modal, {
                title: `新建${tabTitle}`,
                open: newRecordModalVisible,
                onCancel: ()=>{
                    setNewRecordModalVisible(false);
                    form.resetFields();
                },
                onOk: handleAddRecord,
                width: 600,
                destroyOnClose: true,
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form, {
                    form: form,
                    layout: "vertical",
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            name: "type",
                            label: "记录类型",
                            rules: [
                                {
                                    required: true
                                }
                            ],
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                placeholder: "请选择记录类型",
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "QBR",
                                        children: "QBR"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 380,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "电话回访",
                                        children: "电话回访"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 381,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "培训",
                                        children: "培训"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 382,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "工单解决",
                                        children: "工单解决"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 383,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "风险处理",
                                        children: "风险处理"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 384,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "产品演示",
                                        children: "产品演示"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 385,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "技术支持",
                                        children: "技术支持"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 386,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "商务沟通",
                                        children: "商务沟通"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 387,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "其他",
                                        children: "其他"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 388,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/common/ServiceRecordTab.tsx",
                                lineNumber: 379,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/common/ServiceRecordTab.tsx",
                            lineNumber: 378,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            name: "title",
                            label: "记录标题",
                            rules: [
                                {
                                    required: true
                                }
                            ],
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {
                                placeholder: "请输入记录标题"
                            }, void 0, false, {
                                fileName: "src/components/common/ServiceRecordTab.tsx",
                                lineNumber: 392,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/common/ServiceRecordTab.tsx",
                            lineNumber: 391,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            name: "content",
                            label: "详细内容",
                            rules: [
                                {
                                    required: true
                                }
                            ],
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                rows: 4,
                                placeholder: "请输入详细内容"
                            }, void 0, false, {
                                fileName: "src/components/common/ServiceRecordTab.tsx",
                                lineNumber: 395,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/common/ServiceRecordTab.tsx",
                            lineNumber: 394,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            name: "tags",
                            label: "标签",
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                mode: "tags",
                                placeholder: "请输入标签（可多选）",
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "定期回访",
                                        children: "定期回访"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 399,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "问题解决",
                                        children: "问题解决"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 400,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "产品培训",
                                        children: "产品培训"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 401,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "续约沟通",
                                        children: "续约沟通"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 402,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "客户满意",
                                        children: "客户满意"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 403,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "技术支持",
                                        children: "技术支持"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 404,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "商务谈判",
                                        children: "商务谈判"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 405,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/common/ServiceRecordTab.tsx",
                                lineNumber: 398,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/common/ServiceRecordTab.tsx",
                            lineNumber: 397,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            name: "attachments",
                            label: "关联/附件",
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                mode: "tags",
                                placeholder: "请输入关联信息或附件（可多选）",
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "合同文档",
                                        children: "合同文档"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 410,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "技术方案",
                                        children: "技术方案"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 411,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "培训材料",
                                        children: "培训材料"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 412,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "问题记录",
                                        children: "问题记录"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 413,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/common/ServiceRecordTab.tsx",
                                lineNumber: 409,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/common/ServiceRecordTab.tsx",
                            lineNumber: 408,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/common/ServiceRecordTab.tsx",
                    lineNumber: 377,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/common/ServiceRecordTab.tsx",
                lineNumber: 366,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Modal, {
                title: "编辑服务记录",
                open: editRecordModalVisible,
                onCancel: ()=>{
                    setEditRecordModalVisible(false);
                    setEditingRecord(null);
                    editForm.resetFields();
                },
                onOk: handleSaveEdit,
                width: 600,
                destroyOnClose: true,
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form, {
                    form: editForm,
                    layout: "vertical",
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            name: "type",
                            label: "记录类型",
                            rules: [
                                {
                                    required: true
                                }
                            ],
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                placeholder: "请选择记录类型",
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "QBR",
                                        children: "QBR"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 434,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "电话回访",
                                        children: "电话回访"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 435,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "培训",
                                        children: "培训"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 436,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "工单解决",
                                        children: "工单解决"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 437,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "风险处理",
                                        children: "风险处理"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 438,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "产品演示",
                                        children: "产品演示"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 439,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "技术支持",
                                        children: "技术支持"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 440,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "商务沟通",
                                        children: "商务沟通"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 441,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "其他",
                                        children: "其他"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 442,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/common/ServiceRecordTab.tsx",
                                lineNumber: 433,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/common/ServiceRecordTab.tsx",
                            lineNumber: 432,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            name: "title",
                            label: "记录标题",
                            rules: [
                                {
                                    required: true
                                }
                            ],
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Input, {
                                placeholder: "请输入记录标题"
                            }, void 0, false, {
                                fileName: "src/components/common/ServiceRecordTab.tsx",
                                lineNumber: 446,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/common/ServiceRecordTab.tsx",
                            lineNumber: 445,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            name: "content",
                            label: "详细内容",
                            rules: [
                                {
                                    required: true
                                }
                            ],
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(TextArea, {
                                rows: 4,
                                placeholder: "请输入详细内容"
                            }, void 0, false, {
                                fileName: "src/components/common/ServiceRecordTab.tsx",
                                lineNumber: 449,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/common/ServiceRecordTab.tsx",
                            lineNumber: 448,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            name: "tags",
                            label: "标签",
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                mode: "tags",
                                placeholder: "请输入标签（可多选）",
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "定期回访",
                                        children: "定期回访"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 453,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "问题解决",
                                        children: "问题解决"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 454,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "产品培训",
                                        children: "产品培训"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 455,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "续约沟通",
                                        children: "续约沟通"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 456,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "客户满意",
                                        children: "客户满意"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 457,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "技术支持",
                                        children: "技术支持"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 458,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "商务谈判",
                                        children: "商务谈判"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 459,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/common/ServiceRecordTab.tsx",
                                lineNumber: 452,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/common/ServiceRecordTab.tsx",
                            lineNumber: 451,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Form.Item, {
                            name: "attachments",
                            label: "关联/附件",
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Select, {
                                mode: "tags",
                                placeholder: "请输入关联信息或附件（可多选）",
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "合同文档",
                                        children: "合同文档"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 464,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "技术方案",
                                        children: "技术方案"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 465,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "培训材料",
                                        children: "培训材料"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 466,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Option, {
                                        value: "问题记录",
                                        children: "问题记录"
                                    }, void 0, false, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 467,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/common/ServiceRecordTab.tsx",
                                lineNumber: 463,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/common/ServiceRecordTab.tsx",
                            lineNumber: 462,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/common/ServiceRecordTab.tsx",
                    lineNumber: 431,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/common/ServiceRecordTab.tsx",
                lineNumber: 419,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Modal, {
                title: "交接单详情",
                open: handoverDetailVisible,
                onCancel: ()=>setHandoverDetailVisible(false),
                footer: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                        onClick: ()=>setHandoverDetailVisible(false),
                        children: "关闭"
                    }, "close", false, {
                        fileName: "src/components/common/ServiceRecordTab.tsx",
                        lineNumber: 479,
                        columnNumber: 11
                    }, void 0)
                ],
                width: 800,
                children: handoverData ? /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions, {
                            title: "基本信息",
                            bordered: true,
                            column: 2,
                            size: "small",
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                    label: "交接单号",
                                    children: handoverData.id
                                }, void 0, false, {
                                    fileName: "src/components/common/ServiceRecordTab.tsx",
                                    lineNumber: 488,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                    label: "客户名称",
                                    children: handoverData.customerName
                                }, void 0, false, {
                                    fileName: "src/components/common/ServiceRecordTab.tsx",
                                    lineNumber: 489,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                    label: "项目名称",
                                    children: handoverData.projectName
                                }, void 0, false, {
                                    fileName: "src/components/common/ServiceRecordTab.tsx",
                                    lineNumber: 490,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                    label: "交接状态",
                                    children: handoverData.status
                                }, void 0, false, {
                                    fileName: "src/components/common/ServiceRecordTab.tsx",
                                    lineNumber: 491,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                    label: "交接时间",
                                    children: handoverData.deliveredAt
                                }, void 0, false, {
                                    fileName: "src/components/common/ServiceRecordTab.tsx",
                                    lineNumber: 492,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                    label: "负责人",
                                    children: handoverData.handoverPerson
                                }, void 0, false, {
                                    fileName: "src/components/common/ServiceRecordTab.tsx",
                                    lineNumber: 493,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/common/ServiceRecordTab.tsx",
                            lineNumber: 487,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Divider, {}, void 0, false, {
                            fileName: "src/components/common/ServiceRecordTab.tsx",
                            lineNumber: 496,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions, {
                            title: "CRM信息",
                            bordered: true,
                            column: 2,
                            size: "small",
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                    label: "客户经理",
                                    children: (_handoverData_crmInfo = handoverData.crmInfo) === null || _handoverData_crmInfo === void 0 ? void 0 : _handoverData_crmInfo.accountManager
                                }, void 0, false, {
                                    fileName: "src/components/common/ServiceRecordTab.tsx",
                                    lineNumber: 499,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                    label: "销售阶段",
                                    children: (_handoverData_crmInfo1 = handoverData.crmInfo) === null || _handoverData_crmInfo1 === void 0 ? void 0 : _handoverData_crmInfo1.salesStage
                                }, void 0, false, {
                                    fileName: "src/components/common/ServiceRecordTab.tsx",
                                    lineNumber: 500,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                    label: "合同金额",
                                    children: (_handoverData_crmInfo2 = handoverData.crmInfo) === null || _handoverData_crmInfo2 === void 0 ? void 0 : _handoverData_crmInfo2.contractAmount
                                }, void 0, false, {
                                    fileName: "src/components/common/ServiceRecordTab.tsx",
                                    lineNumber: 501,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                    label: "预计收入",
                                    children: (_handoverData_crmInfo3 = handoverData.crmInfo) === null || _handoverData_crmInfo3 === void 0 ? void 0 : _handoverData_crmInfo3.expectedRevenue
                                }, void 0, false, {
                                    fileName: "src/components/common/ServiceRecordTab.tsx",
                                    lineNumber: 502,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/common/ServiceRecordTab.tsx",
                            lineNumber: 498,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Divider, {}, void 0, false, {
                            fileName: "src/components/common/ServiceRecordTab.tsx",
                            lineNumber: 505,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions, {
                            title: "风险与商机",
                            bordered: true,
                            column: 1,
                            size: "small",
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                    label: "风险点",
                                    children: (_handoverData_risks = handoverData.risks) === null || _handoverData_risks === void 0 ? void 0 : _handoverData_risks.map((risk, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                marginBottom: '8px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                    color: "red",
                                                    children: risk.level
                                                }, void 0, false, {
                                                    fileName: "src/components/common/ServiceRecordTab.tsx",
                                                    lineNumber: 511,
                                                    columnNumber: 21
                                                }, this),
                                                risk.description
                                            ]
                                        }, index, true, {
                                            fileName: "src/components/common/ServiceRecordTab.tsx",
                                            lineNumber: 510,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "src/components/common/ServiceRecordTab.tsx",
                                    lineNumber: 508,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                    label: "商机点",
                                    children: (_handoverData_opportunities = handoverData.opportunities) === null || _handoverData_opportunities === void 0 ? void 0 : _handoverData_opportunities.map((opportunity, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                            style: {
                                                marginBottom: '8px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tag, {
                                                    color: "green",
                                                    children: opportunity.type
                                                }, void 0, false, {
                                                    fileName: "src/components/common/ServiceRecordTab.tsx",
                                                    lineNumber: 519,
                                                    columnNumber: 21
                                                }, this),
                                                opportunity.description
                                            ]
                                        }, index, true, {
                                            fileName: "src/components/common/ServiceRecordTab.tsx",
                                            lineNumber: 518,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "src/components/common/ServiceRecordTab.tsx",
                                    lineNumber: 516,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/common/ServiceRecordTab.tsx",
                            lineNumber: 507,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Divider, {}, void 0, false, {
                            fileName: "src/components/common/ServiceRecordTab.tsx",
                            lineNumber: 526,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions, {
                            title: "干系人信息",
                            bordered: true,
                            column: 1,
                            size: "small",
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Descriptions.Item, {
                                label: "关键联系人",
                                children: (_handoverData_stakeholders = handoverData.stakeholders) === null || _handoverData_stakeholders === void 0 ? void 0 : _handoverData_stakeholders.map((stakeholder, index)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            marginBottom: '8px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("strong", {
                                                children: stakeholder.name
                                            }, void 0, false, {
                                                fileName: "src/components/common/ServiceRecordTab.tsx",
                                                lineNumber: 532,
                                                columnNumber: 21
                                            }, this),
                                            " - ",
                                            stakeholder.role,
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("br", {}, void 0, false, {
                                                fileName: "src/components/common/ServiceRecordTab.tsx",
                                                lineNumber: 533,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                                                type: "secondary",
                                                children: [
                                                    "电话: ",
                                                    stakeholder.phone,
                                                    " | 邮箱: ",
                                                    stakeholder.email
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/common/ServiceRecordTab.tsx",
                                                lineNumber: 534,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, index, true, {
                                        fileName: "src/components/common/ServiceRecordTab.tsx",
                                        lineNumber: 531,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "src/components/common/ServiceRecordTab.tsx",
                                lineNumber: 529,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/common/ServiceRecordTab.tsx",
                            lineNumber: 528,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/common/ServiceRecordTab.tsx",
                    lineNumber: 486,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    style: {
                        textAlign: 'center',
                        padding: '40px'
                    },
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(Text, {
                        type: "secondary",
                        children: "暂无交接单详情数据"
                    }, void 0, false, {
                        fileName: "src/components/common/ServiceRecordTab.tsx",
                        lineNumber: 544,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "src/components/common/ServiceRecordTab.tsx",
                    lineNumber: 543,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "src/components/common/ServiceRecordTab.tsx",
                lineNumber: 474,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/components/common/ServiceRecordTab.tsx",
        lineNumber: 178,
        columnNumber: 5
    }, this);
};
_s(ServiceRecordTab, "hmHvGvxiA/8y3v8CVdWgLXjrLYE=", false, function() {
    return [
        _antd.Form.useForm,
        _antd.Form.useForm
    ];
});
_c = ServiceRecordTab;
var _default = ServiceRecordTab;
var _c;
$RefreshReg$(_c, "ServiceRecordTab");
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
"src/data/customerJourneyByScale.ts": function (module, exports, __mako_require__){
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
    continuousServiceActionsByScale: function() {
        return continuousServiceActionsByScale;
    },
    getCustomerJourneyByScale: function() {
        return getCustomerJourneyByScale;
    },
    getScaleDisplayConfig: function() {
        return getScaleDisplayConfig;
    },
    renewalActionsByScale: function() {
        return renewalActionsByScale;
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
const continuousServiceActionsByScale = {
    // 重点客户 (Key Account) 的持续服务旅程
    key_account: [
        {
            id: 'action-2-ka-1',
            stageId: 'stage-2',
            title: '首个项目稳定运营期',
            description: '密切监控客户首批核心培训项目的学员学习数据，与管理员共同复盘项目运营情况，确保平台稳定运行。',
            type: 'check-in',
            priority: 'high',
            status: 'pending',
            triggerCondition: '项目上线后第1个月',
            assignee: '客户成功经理',
            estimatedDuration: '4小时',
            isRequired: true
        },
        {
            id: 'action-2-ka-2',
            stageId: 'stage-2',
            title: '首次季度业务回顾(QBR)',
            description: '与客户决策层共同复盘上线后90天的培训成果，展示数据报告与初步ROI，对齐下阶段的合作目标。',
            type: 'review',
            priority: 'high',
            status: 'pending',
            triggerCondition: '服务开始第3个月',
            assignee: '客户成功经理',
            estimatedDuration: '3小时',
            isRequired: true
        },
        {
            id: 'action-2-ka-3',
            stageId: 'stage-2',
            title: '培训体系拓展期',
            description: '基于客户年度培训计划，主动建议并将平台应用从单个项目扩展至更多培训类型（如合规、产品、领导力等）。',
            type: 'meeting',
            priority: 'high',
            status: 'pending',
            triggerCondition: '服务开始第4个月',
            assignee: '客户成功经理',
            estimatedDuration: '2小时',
            isRequired: true
        },
        {
            id: 'action-2-ka-4',
            stageId: 'stage-2',
            title: '学习效果量化与巩固期',
            description: '协助客户设计训后评估问卷或模型，将培训效果与业务表现进行初步关联，用以巩固平台的核心价值。',
            type: 'training',
            priority: 'medium',
            status: 'pending',
            triggerCondition: '服务开始第5个月',
            assignee: '客户成功经理',
            estimatedDuration: '3小时',
            isRequired: true
        },
        {
            id: 'action-2-ka-5',
            stageId: 'stage-2',
            title: '年度培训规划参与期',
            description: '主动参与到客户下一年度的培训规划讨论中，将平台定位为其实现年度培训目标的战略工具，为续约奠定基础。',
            type: 'meeting',
            priority: 'high',
            status: 'pending',
            triggerCondition: '服务开始第6个月',
            assignee: '客户成功经理',
            estimatedDuration: '4小时',
            isRequired: true
        }
    ],
    // 中端客户 (Mid-Market Customer) 的持续服务旅程
    mid_market: [
        {
            id: 'action-2-mm-1',
            stageId: 'stage-2',
            title: '3个月健康巡检',
            description: '与客户管理员进行线上会议，检查平台健康度（活跃度、功能使用率），解答疑问并分享同行业最佳实践。',
            type: 'check-in',
            priority: 'medium',
            status: 'pending',
            triggerCondition: '服务开始第3个月',
            assignee: '客户成功经理',
            estimatedDuration: '1.5小时',
            isRequired: true
        },
        {
            id: 'action-2-mm-2',
            stageId: 'stage-2',
            title: '半年度线上复盘会',
            description: '邀请客户参加线上复盘会议，分享其使用数据的亮点，并介绍能进一步提升其培训效率的产品功能。',
            type: 'review',
            priority: 'medium',
            status: 'pending',
            triggerCondition: '服务开始第6个月',
            assignee: '客户成功经理',
            estimatedDuration: '2小时',
            isRequired: true
        },
        {
            id: 'action-2-mm-3',
            stageId: 'stage-2',
            title: '功能深化应用',
            description: '邀请客户参加"高阶功能"主题的线上公开课或提供教学视频，鼓励客户使用能显著提升价值的进阶功能。',
            type: 'training',
            priority: 'medium',
            status: 'pending',
            triggerCondition: '服务开始第4个月',
            assignee: '客户成功经理',
            estimatedDuration: '1小时',
            isRequired: false
        },
        {
            id: 'action-2-mm-4',
            stageId: 'stage-2',
            title: '年度满意度调研',
            description: '在进入续约期前，主动与客户接口人电话沟通，或发放NPS问卷，评估客户的整体满意度和续约意向。',
            type: 'review',
            priority: 'medium',
            status: 'pending',
            triggerCondition: '合同到期前60天',
            assignee: '客户成功经理',
            estimatedDuration: '1小时',
            isRequired: true
        }
    ],
    // 小微客户 (SMB Customer) 的持续服务旅程
    smb: [
        {
            id: 'action-2-smb-1',
            stageId: 'stage-2',
            title: '自动化健康分预警',
            description: '系统基于客户活跃度、登录频率等数据自动计算健康分，当分数过低时，自动创建任务提醒CSM进行人工干预。',
            type: 'other',
            priority: 'low',
            status: 'pending',
            triggerCondition: '健康分低于70分时',
            assignee: '系统自动',
            estimatedDuration: '自动化',
            isRequired: true
        },
        {
            id: 'action-2-smb-2',
            stageId: 'stage-2',
            title: '线上公开课邀请',
            description: '通过邮件或产品内消息，定期邀请客户参加介绍产品通用功能或行业趋势的线上公开课，实现规模化赋能。',
            type: 'training',
            priority: 'low',
            status: 'pending',
            triggerCondition: '每月第二周',
            assignee: '市场部',
            estimatedDuration: '1小时',
            isRequired: false
        },
        {
            id: 'action-2-smb-3',
            stageId: 'stage-2',
            title: '新功能价值推送',
            description: '当产品发布新功能时，系统根据客户标签，自动向其推送相关的应用介绍和简短教程，确保客户知晓产品价值更新。',
            type: 'other',
            priority: 'low',
            status: 'pending',
            triggerCondition: '新功能发布时',
            assignee: '产品团队',
            estimatedDuration: '自动化',
            isRequired: false
        },
        {
            id: 'action-2-smb-4',
            stageId: 'stage-2',
            title: '年度NPS调研',
            description: '通过系统在签约后第10个月自动向客户管理员发送NPS调研问卷，规模化收集客户满意度数据。',
            type: 'review',
            priority: 'low',
            status: 'pending',
            triggerCondition: '签约后第10个月',
            assignee: '系统自动',
            estimatedDuration: '自动化',
            isRequired: true
        }
    ]
};
const renewalActionsByScale = {
    // 重点客户续约管理旅程
    key_account: [
        {
            id: 'action-3-ka-1',
            stageId: 'stage-3',
            title: '续约策略沟通会',
            description: '提前90-120天，由客户成功经理与销售总监共同与客户决策层开会，回顾年度价值，并探讨下一周期的合作模式与目标。',
            type: 'meeting',
            priority: 'high',
            status: 'pending',
            triggerCondition: '合同到期前90-120天',
            assignee: '客户成功经理+销售总监',
            estimatedDuration: '3小时',
            isRequired: true
        },
        {
            id: 'action-3-ka-2',
            stageId: 'stage-3',
            title: '商业价值方案提报',
            description: '基于年度合作成果，为客户量身定制一份商业价值方案（包含ROI分析、新周期服务计划、报价方案），并正式提报。',
            type: 'review',
            priority: 'high',
            status: 'pending',
            triggerCondition: '合同到期前60天',
            assignee: '客户成功经理',
            estimatedDuration: '4小时',
            isRequired: true
        },
        {
            id: 'action-3-ka-3',
            stageId: 'stage-3',
            title: '商务谈判与合同敲定',
            description: '由销售主导，客户成功经理辅助，就合同价格、服务条款、SLA等细节进行谈判，扫清续约的所有商务障碍。',
            type: 'meeting',
            priority: 'high',
            status: 'pending',
            triggerCondition: '合同到期前30天',
            assignee: '销售+客户成功经理',
            estimatedDuration: '2小时',
            isRequired: true
        },
        {
            id: 'action-3-ka-4',
            stageId: 'stage-3',
            title: '续约成功与新周期启动',
            description: '在合同签署后，立即发送感谢函，并预约"新周期战略合作启动会"，无缝衔接下一年度的持续服务旅程。',
            type: 'other',
            priority: 'high',
            status: 'pending',
            triggerCondition: '合同签署后',
            assignee: '客户成功经理',
            estimatedDuration: '1小时',
            isRequired: true
        }
    ],
    // 中端客户续约管理旅程
    mid_market: [
        {
            id: 'action-3-mm-1',
            stageId: 'stage-3',
            title: '续约意向确认与报价',
            description: '提前90天，客户成功经理主动与客户联系人沟通续约意向，并发送标准化的续约报价单与服务说明。',
            type: 'meeting',
            priority: 'medium',
            status: 'pending',
            triggerCondition: '合同到期前90天',
            assignee: '客户成功经理',
            estimatedDuration: '1.5小时',
            isRequired: true
        },
        {
            id: 'action-3-mm-2',
            stageId: 'stage-3',
            title: '续约价值回顾',
            description: '为客户提供一份年度使用报告和价值摘要，通过线上会议或邮件方式，重申产品在过去一年中为其带来的核心价值。',
            type: 'review',
            priority: 'medium',
            status: 'pending',
            triggerCondition: '合同到期前60天',
            assignee: '客户成功经理',
            estimatedDuration: '2小时',
            isRequired: true
        },
        {
            id: 'action-3-mm-3',
            stageId: 'stage-3',
            title: '合同签署与付款跟进',
            description: '协助客户完成内部审批流程，提供必要的合同文件，并跟进财务付款进度，确保续约流程顺利完成。',
            type: 'other',
            priority: 'medium',
            status: 'pending',
            triggerCondition: '合同到期前30天',
            assignee: '客户成功经理',
            estimatedDuration: '1小时',
            isRequired: true
        }
    ],
    // 小微客户续约管理旅程
    smb: [
        {
            id: 'action-3-smb-1',
            stageId: 'stage-3',
            title: '自动化续约提醒',
            description: '系统在合同到期前90/60/30天，自动通过邮件和产品内消息向客户发送续约提醒和在线续约链接。',
            type: 'other',
            priority: 'low',
            status: 'pending',
            triggerCondition: '合同到期前90/60/30天',
            assignee: '系统自动',
            estimatedDuration: '自动化',
            isRequired: true
        },
        {
            id: 'action-3-smb-2',
            stageId: 'stage-3',
            title: '在线续约与支付',
            description: '引导客户通过在线支付平台自助完成续约操作，系统自动处理订单、生成新合同并开具发票。',
            type: 'other',
            priority: 'low',
            status: 'pending',
            triggerCondition: '客户点击续约链接时',
            assignee: '系统自动',
            estimatedDuration: '自助服务',
            isRequired: true
        },
        {
            id: 'action-3-smb-3',
            stageId: 'stage-3',
            title: '续约成功通知',
            description: '客户完成支付后，系统自动发送续约成功的确认邮件，并更新其账户的服务有效期。',
            type: 'other',
            priority: 'low',
            status: 'pending',
            triggerCondition: '支付完成后',
            assignee: '系统自动',
            estimatedDuration: '自动化',
            isRequired: true
        }
    ]
};
const getCustomerJourneyByScale = (customerId, customerName, customerScale, lifecycle)=>{
    // 基础旅程模板
    const baseJourney = {
        customerId,
        customerName,
        currentStage: lifecycle === 'continuous' ? 'stage-2' : 'stage-3',
        lifecycle,
        startDate: new Date().toISOString().split('T')[0],
        stages: [
            {
                id: 'stage-1',
                name: '交接实施',
                description: '客户服务交接和实施阶段，建立基础服务框架',
                phase: 'onboarding',
                order: 1,
                duration: '1个月',
                isCompleted: true,
                isActive: false,
                startDate: '2024-01-01',
                completedDate: '2024-01-31'
            },
            {
                id: 'stage-2',
                name: '持续服务',
                description: '服务进入稳定运行期，定期跟进和优化',
                phase: 'continuous',
                order: 2,
                duration: '5个月',
                isCompleted: lifecycle === 'renewal',
                isActive: lifecycle === 'continuous',
                startDate: '2024-02-01',
                ...lifecycle === 'renewal' && {
                    completedDate: '2024-06-30'
                }
            },
            {
                id: 'stage-3',
                name: '续约管理',
                description: '对服务效果进行全面评估，准备续约或调整',
                phase: 'renewal',
                order: 3,
                duration: '1个月',
                isCompleted: false,
                isActive: lifecycle === 'renewal',
                ...lifecycle === 'renewal' && {
                    startDate: '2024-07-01'
                }
            },
            {
                id: 'stage-4',
                name: '召回孵化',
                description: '客户召回和重新孵化阶段，重新激活客户价值',
                phase: 'churn',
                order: 4,
                duration: '2个月',
                isCompleted: false,
                isActive: false
            }
        ],
        actions: [],
        milestones: []
    };
    // 根据生命周期和客户规模选择对应的行动计划
    if (lifecycle === 'continuous') baseJourney.actions = continuousServiceActionsByScale[customerScale];
    else if (lifecycle === 'renewal') baseJourney.actions = renewalActionsByScale[customerScale];
    // 添加里程碑（可以根据需要进一步定制）
    baseJourney.milestones = [
        {
            id: 'milestone-1',
            title: '服务启动',
            description: '客户服务正式启动',
            date: baseJourney.startDate,
            type: 'onboarding_completed',
            isAchieved: true,
            stageId: 'stage-1'
        }
    ];
    return baseJourney;
};
const getScaleDisplayConfig = (scale)=>{
    const configs = {
        key_account: {
            name: '重点客户',
            color: '#722ed1',
            description: '战略级合作伙伴，需要高度定制化服务'
        },
        mid_market: {
            name: '中端客户',
            color: '#1890ff',
            description: '标准化服务为主，适度个性化'
        },
        smb: {
            name: '小微客户',
            color: '#52c41a',
            description: '自动化和规模化服务'
        }
    };
    return configs[scale];
};
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
"src/data/mockCustomerJourney.ts": function (module, exports, __mako_require__){
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
    continuousServiceJourneyTemplate: function() {
        return continuousServiceJourneyTemplate;
    },
    getCustomerJourney: function() {
        return getCustomerJourney;
    },
    getJourneyStats: function() {
        return getJourneyStats;
    },
    renewalJourneyTemplate: function() {
        return renewalJourneyTemplate;
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
const continuousServiceJourneyTemplate = {
    customerId: '',
    customerName: '',
    currentStage: 'stage-2',
    lifecycle: 'continuous',
    startDate: '2024-01-01',
    stages: [
        {
            id: 'stage-1',
            name: '交接实施',
            description: '客户服务交接和实施阶段，建立基础服务框架',
            phase: 'onboarding',
            order: 1,
            duration: '1个月',
            isCompleted: true,
            isActive: false,
            startDate: '2024-01-01',
            completedDate: '2024-01-31'
        },
        {
            id: 'stage-2',
            name: '持续服务',
            description: '服务进入稳定运行期，定期跟进和优化',
            phase: 'continuous',
            order: 2,
            duration: '5个月',
            isCompleted: false,
            isActive: true,
            startDate: '2024-02-01'
        },
        {
            id: 'stage-3',
            name: '续约管理',
            description: '对服务效果进行全面评估，准备续约或调整',
            phase: 'renewal',
            order: 3,
            duration: '1个月',
            isCompleted: false,
            isActive: false
        },
        {
            id: 'stage-4',
            name: '召回孵化',
            description: '客户召回和重新孵化阶段，重新激活客户价值',
            phase: 'churn',
            order: 4,
            duration: '2个月',
            isCompleted: false,
            isActive: false
        }
    ],
    actions: [
        {
            id: 'action-1-1',
            stageId: 'stage-1',
            title: '服务启动会议',
            description: '与客户召开服务启动会议，明确服务目标',
            type: 'meeting',
            priority: 'high',
            status: 'completed',
            triggerCondition: '服务合同签署后3个工作日内',
            dueDate: '2024-01-05',
            completedDate: '2024-01-05',
            assignee: '客户成功经理',
            estimatedDuration: '2小时',
            isRequired: true
        },
        {
            id: 'action-2-1',
            stageId: 'stage-2',
            title: '第6个月汇报会',
            description: '服务第6个月全面汇报和下阶段规划',
            type: 'meeting',
            priority: 'high',
            status: 'pending',
            triggerCondition: '服务开始第6个月',
            dueDate: '2024-07-15',
            assignee: '客户成功经理',
            estimatedDuration: '3小时',
            isRequired: true
        },
        {
            id: 'action-2-2',
            stageId: 'stage-2',
            title: '客户满意度调研',
            description: '进行客户满意度调研和反馈收集',
            type: 'review',
            priority: 'medium',
            status: 'overdue',
            triggerCondition: '服务第5个月末',
            dueDate: '2024-06-30',
            assignee: '客户成功经理',
            estimatedDuration: '2小时',
            isRequired: false
        }
    ],
    milestones: [
        {
            id: 'milestone-1-1',
            title: '服务启动会议',
            description: '与客户召开服务启动会议，明确服务目标和期望',
            date: '2024-01-05',
            type: 'onboarding_completed',
            isAchieved: true,
            stageId: 'stage-1'
        },
        {
            id: 'milestone-2-1',
            title: '第6个月汇报会',
            description: '服务第6个月全面汇报和下阶段规划',
            date: '2024-07-15',
            type: 'other',
            isAchieved: false,
            stageId: 'stage-2'
        }
    ]
};
const renewalJourneyTemplate = {
    customerId: '',
    customerName: '',
    currentStage: 'stage-2',
    lifecycle: 'renewal',
    startDate: '2024-06-01',
    stages: [
        {
            id: 'stage-1',
            name: '交接实施',
            description: '客户服务交接和实施阶段，建立基础服务框架',
            phase: 'onboarding',
            order: 1,
            duration: '1个月',
            isCompleted: true,
            isActive: false,
            startDate: '2024-06-01',
            completedDate: '2024-06-30'
        },
        {
            id: 'stage-2',
            name: '持续服务',
            description: '服务进入稳定运行期，定期跟进和优化',
            phase: 'continuous',
            order: 2,
            duration: '5个月',
            isCompleted: true,
            isActive: false,
            startDate: '2024-07-01',
            completedDate: '2024-11-30'
        },
        {
            id: 'stage-3',
            name: '续约管理',
            description: '与客户进行续约条件谈判和确认',
            phase: 'renewal',
            order: 3,
            duration: '2个月',
            isCompleted: false,
            isActive: true,
            startDate: '2024-12-01'
        },
        {
            id: 'stage-4',
            name: '召回孵化',
            description: '客户召回和重新孵化阶段，重新激活客户价值',
            phase: 'churn',
            order: 4,
            duration: '2个月',
            isCompleted: false,
            isActive: false
        }
    ],
    actions: [
        {
            id: 'action-1-1',
            stageId: 'stage-1',
            title: '客户续约意向确认',
            description: '与客户确认续约意向和基本需求',
            type: 'meeting',
            priority: 'high',
            status: 'completed',
            triggerCondition: '合同到期前90天',
            dueDate: '2024-06-05',
            completedDate: '2024-06-03',
            assignee: '客户成功经理',
            estimatedDuration: '2小时',
            isRequired: true
        },
        {
            id: 'action-2-1',
            stageId: 'stage-2',
            title: '价格谈判',
            description: '与客户进行续约价格和条件谈判',
            type: 'meeting',
            priority: 'high',
            status: 'in_progress',
            triggerCondition: '方案展示后',
            dueDate: '2024-07-05',
            assignee: '商务经理',
            estimatedDuration: '2小时',
            isRequired: true
        },
        {
            id: 'action-3-1',
            stageId: 'stage-3',
            title: '合同签署仪式',
            description: '举行正式的合同签署仪式',
            type: 'meeting',
            priority: 'high',
            status: 'pending',
            triggerCondition: '合同文件准备完成后',
            dueDate: '2024-07-15',
            assignee: '商务经理',
            estimatedDuration: '2小时',
            isRequired: true
        }
    ],
    milestones: [
        {
            id: 'milestone-1-1',
            title: '续约需求调研',
            description: '了解客户续约需求和期望',
            date: '2024-06-07',
            type: 'renewal_started',
            isAchieved: true,
            stageId: 'stage-1'
        },
        {
            id: 'milestone-3-1',
            title: '合同签署',
            description: '完成续约合同正式签署',
            date: '2024-07-15',
            type: 'contract_signed',
            isAchieved: false,
            stageId: 'stage-3'
        }
    ]
};
const getCustomerJourney = (customerId, customerName, lifecycle)=>{
    const template = lifecycle === 'continuous' ? continuousServiceJourneyTemplate : renewalJourneyTemplate;
    return {
        ...template,
        customerId: customerId,
        customerName: customerName
    };
};
const getJourneyStats = (journey)=>{
    const totalStages = journey.stages.length;
    const completedStages = journey.stages.filter((stage)=>stage.isCompleted).length;
    const totalActions = journey.actions.length;
    const completedActions = journey.actions.filter((action)=>action.status === 'completed').length;
    const overdueActions = journey.actions.filter((action)=>action.status === 'overdue').length;
    const pendingActions = journey.actions.filter((action)=>action.status === 'pending').length;
    return {
        stageProgress: Math.round(completedStages / totalStages * 100),
        actionProgress: Math.round(completedActions / totalActions * 100),
        totalStages,
        completedStages,
        totalActions,
        completedActions,
        overdueActions,
        pendingActions
    };
};
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
"src/mock/continuousServiceData.ts": function (module, exports, __mako_require__){
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
    getPlatformType: function() {
        return getPlatformType;
    },
    getPurchasedProducts: function() {
        return getPurchasedProducts;
    },
    healthColors: function() {
        return healthColors;
    },
    lifecycleColors: function() {
        return lifecycleColors;
    },
    mockContacts: function() {
        return mockContacts;
    },
    mockContracts: function() {
        return mockContracts;
    },
    mockCustomerHistory: function() {
        return mockCustomerHistory;
    },
    mockCustomers: function() {
        return mockCustomers;
    },
    mockHandoverRecords: function() {
        return mockHandoverRecords;
    },
    mockKeyActions: function() {
        return mockKeyActions;
    },
    mockQBRMeetings: function() {
        return mockQBRMeetings;
    },
    mockRiskEvents: function() {
        return mockRiskEvents;
    },
    mockServiceOverview: function() {
        return mockServiceOverview;
    },
    mockServicePlaybooks: function() {
        return mockServicePlaybooks;
    },
    mockTodoTasks: function() {
        return mockTodoTasks;
    },
    mockValueBoards: function() {
        return mockValueBoards;
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
const mockContracts = [
    // 北京科技创新有限公司的合同历史
    {
        id: 'contract_001',
        contractNumber: 'CONT-2023-001',
        customerId: 'CUST-0001',
        contractType: 'new',
        amount: 500000,
        startDate: '2023-06-01',
        endDate: '2024-05-31',
        status: 'active',
        servicePeriod: '2023-06-01 至 2024-05-31',
        purchasedProducts: [
            '直营-极简版'
        ],
        accountCount: 50,
        salesSource: 'direct',
        salesPerson: '王销售',
        userVersion: '50人版',
        ticketVersion: 'V2.1',
        ticketTime: '2023-06-15',
        tianyuanOrderStatus: 'active',
        tianyuanOrderId: 'TY-2023-001',
        serviceCost: 15000,
        serviceCostDetails: [
            '客户拜访差旅费: 3000元',
            '节日礼品: 8000元',
            '培训资料: 2000元',
            '技术支持: 2000元'
        ],
        attachments: [
            {
                id: 'att_001_001',
                name: '北京科技创新有限公司-服务合同.pdf',
                type: 'contract',
                url: '/attachments/contracts/CONT-2023-001.pdf',
                size: 2048576,
                uploadDate: '2023-05-15'
            },
            {
                id: 'att_001_002',
                name: '技术服务补充协议.pdf',
                type: 'supplement',
                url: '/attachments/supplements/CONT-2023-001-SUP.pdf',
                size: 1024768,
                uploadDate: '2023-05-20'
            }
        ],
        createdAt: '2023-05-15',
        updatedAt: '2023-06-01'
    },
    // 上海智能制造集团的合同历史
    {
        id: 'contract_002',
        contractNumber: 'CONT-2022-015',
        customerId: 'CUST-0002',
        contractType: 'new',
        amount: 600000,
        startDate: '2022-09-01',
        endDate: '2023-08-31',
        status: 'expired',
        servicePeriod: '2022-09-01 至 2023-08-31',
        purchasedProducts: [
            '企微版'
        ],
        accountCount: 30,
        salesSource: 'channel',
        channelPartner: '上海渠道合作伙伴有限公司',
        userVersion: '30人版',
        ticketVersion: 'V1.8',
        ticketTime: '2022-09-10',
        tianyuanOrderStatus: 'inactive',
        tianyuanOrderId: 'TY-2022-015',
        serviceCost: 12000,
        serviceCostDetails: [
            '渠道返点: 8000元',
            '客户答谢: 4000元'
        ],
        attachments: [
            {
                id: 'att_002_001',
                name: '上海智能制造集团-服务合同.pdf',
                type: 'contract',
                url: '/attachments/contracts/CONT-2022-015.pdf',
                size: 1856432,
                uploadDate: '2022-08-15'
            }
        ],
        createdAt: '2022-08-15',
        updatedAt: '2023-08-31'
    },
    {
        id: 'contract_003',
        contractNumber: 'CONT-2023-045',
        customerId: 'CUST-0002',
        contractType: 'renewal',
        amount: 800000,
        startDate: '2023-09-01',
        endDate: '2024-08-31',
        status: 'active',
        servicePeriod: '2023-09-01 至 2024-08-31',
        purchasedProducts: [
            '企微版'
        ],
        accountCount: 40,
        salesSource: 'direct',
        salesPerson: '李销售',
        userVersion: '40人版',
        ticketVersion: 'V2.0',
        ticketTime: '2023-09-08',
        tianyuanOrderStatus: 'active',
        tianyuanOrderId: 'TY-2023-045',
        serviceCost: 18000,
        serviceCostDetails: [
            '续约庆祝晚宴: 10000元',
            '定制培训: 5000元',
            '技术升级支持: 3000元'
        ],
        attachments: [
            {
                id: 'att_003_001',
                name: '上海智能制造集团-续约合同.pdf',
                type: 'contract',
                url: '/attachments/contracts/CONT-2023-045.pdf',
                size: 2234567,
                uploadDate: '2023-08-10'
            },
            {
                id: 'att_003_002',
                name: '发票-CONT-2023-045.pdf',
                type: 'invoice',
                url: '/attachments/invoices/INV-2023-045.pdf',
                size: 512345,
                uploadDate: '2023-09-01'
            }
        ],
        createdAt: '2023-08-10',
        updatedAt: '2023-09-01'
    },
    // 深圳金融科技有限公司的合同历史
    {
        id: 'contract_004',
        contractNumber: 'CONT-2022-008',
        customerId: 'CUST-0003',
        contractType: 'new',
        amount: 400000,
        startDate: '2022-07-01',
        endDate: '2023-06-30',
        status: 'expired',
        servicePeriod: '2022-07-01 至 2023-06-30',
        purchasedProducts: [
            '飞书版'
        ],
        accountCount: 20,
        salesSource: 'direct',
        salesPerson: '张销售',
        createdAt: '2022-06-15',
        updatedAt: '2023-06-30'
    },
    {
        id: 'contract_005',
        contractNumber: 'CONT-2023-078',
        customerId: 'CUST-0003',
        contractType: 'renewal',
        amount: 300000,
        startDate: '2023-07-01',
        endDate: '2024-06-30',
        status: 'active',
        servicePeriod: '2023-07-01 至 2024-06-30',
        purchasedProducts: [
            '飞书版'
        ],
        accountCount: 15,
        salesSource: 'direct',
        salesPerson: '张销售',
        createdAt: '2023-06-10',
        updatedAt: '2023-07-01'
    },
    // 广州数字化企业的合同历史
    {
        id: 'contract_006',
        contractNumber: 'CONT-2023-120',
        customerId: 'CUST-0004',
        contractType: 'new',
        amount: 1200000,
        startDate: '2023-10-01',
        endDate: '2025-09-30',
        status: 'active',
        servicePeriod: '2023-10-01 至 2025-09-30',
        purchasedProducts: [
            'D-learning'
        ],
        accountCount: 100,
        salesSource: 'direct',
        salesPerson: '陈销售',
        createdAt: '2023-09-15',
        updatedAt: '2023-10-01'
    },
    // 杭州互联网公司的合同历史
    {
        id: 'contract_007',
        contractNumber: 'CONT-2023-089',
        customerId: 'CUST-0005',
        contractType: 'new',
        amount: 450000,
        startDate: '2023-06-01',
        endDate: '2024-05-31',
        status: 'active',
        servicePeriod: '2023-06-01 至 2024-05-31',
        purchasedProducts: [
            'D-learning'
        ],
        accountCount: 35,
        salesSource: 'direct',
        salesPerson: '刘销售',
        createdAt: '2023-05-20',
        updatedAt: '2023-06-01'
    },
    // 成都软件开发公司的合同历史（断约后重签的例子）
    {
        id: 'contract_008',
        contractNumber: 'CONT-2021-045',
        customerId: 'CUST-0006',
        contractType: 'new',
        amount: 350000,
        startDate: '2021-09-01',
        endDate: '2022-08-31',
        status: 'terminated',
        servicePeriod: '2021-09-01 至 2022-08-31',
        purchasedProducts: [
            '独立版'
        ],
        accountCount: 25,
        salesSource: 'channel',
        channelPartner: '成都渠道合作伙伴有限公司',
        createdAt: '2021-08-15',
        updatedAt: '2022-06-15'
    },
    {
        id: 'contract_009',
        contractNumber: 'CONT-2024-010',
        customerId: 'CUST-0006',
        contractType: 'new',
        amount: 200000,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        status: 'active',
        servicePeriod: '2024-01-01 至 2024-12-31',
        purchasedProducts: [
            '独立版'
        ],
        accountCount: 20,
        salesSource: 'direct',
        salesPerson: '赵销售',
        createdAt: '2023-12-15',
        updatedAt: '2024-01-01'
    }
];
const mockHandoverRecords = [
    {
        id: 'handover_001',
        handoverNumber: 'HAND-2023-001',
        customerId: 'CUST-0001',
        contractId: 'contract_001',
        status: 'completed',
        createdAt: '2023-05-20',
        completedAt: '2023-06-15',
        archivedAt: '2023-06-20'
    },
    {
        id: 'handover_002',
        handoverNumber: 'HAND-2022-015',
        customerId: 'CUST-0002',
        contractId: 'contract_002',
        status: 'archived',
        createdAt: '2022-08-20',
        completedAt: '2022-09-15',
        archivedAt: '2022-09-20'
    },
    {
        id: 'handover_003',
        handoverNumber: 'HAND-2023-045',
        customerId: 'CUST-0002',
        contractId: 'contract_003',
        status: 'completed',
        createdAt: '2023-08-15',
        completedAt: '2023-09-10',
        archivedAt: '2023-09-15'
    },
    {
        id: 'handover_004',
        handoverNumber: 'HAND-2022-008',
        customerId: 'CUST-0003',
        contractId: 'contract_004',
        status: 'archived',
        createdAt: '2022-06-20',
        completedAt: '2022-07-15',
        archivedAt: '2022-07-20'
    },
    {
        id: 'handover_005',
        handoverNumber: 'HAND-2023-078',
        customerId: 'CUST-0003',
        contractId: 'contract_005',
        status: 'completed',
        createdAt: '2023-06-15',
        completedAt: '2023-07-10',
        archivedAt: '2023-07-15'
    },
    {
        id: 'handover_006',
        handoverNumber: 'HAND-2023-120',
        customerId: 'CUST-0004',
        contractId: 'contract_006',
        status: 'completed',
        createdAt: '2023-09-20',
        completedAt: '2023-10-15',
        archivedAt: '2023-10-20'
    },
    {
        id: 'handover_007',
        handoverNumber: 'HAND-2023-089',
        customerId: 'CUST-0005',
        contractId: 'contract_007',
        status: 'completed',
        createdAt: '2023-05-25',
        completedAt: '2023-06-10',
        archivedAt: '2023-06-15'
    },
    {
        id: 'handover_008',
        handoverNumber: 'HAND-2021-045',
        customerId: 'CUST-0006',
        contractId: 'contract_008',
        status: 'archived',
        createdAt: '2021-08-20',
        completedAt: '2021-09-15',
        archivedAt: '2021-09-20'
    },
    {
        id: 'handover_009',
        handoverNumber: 'HAND-2024-010',
        customerId: 'CUST-0006',
        contractId: 'contract_009',
        status: 'completed',
        createdAt: '2023-12-20',
        completedAt: '2024-01-15',
        archivedAt: '2024-01-20'
    }
];
const mockTodoTasks = [
    {
        id: 'todo_001',
        title: '客户回访 - 北京科技创新有限公司',
        description: '定期回访，了解系统使用情况和满意度',
        type: 'business-review',
        status: 'pending',
        priority: 'high',
        dueDate: '2024-01-20',
        assignedTo: '张伟',
        customerId: 'CUST-0001',
        customerName: '北京科技创新有限公司',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-15'
    },
    {
        id: 'todo_002',
        title: '续约谈判准备 - 上海智能制造集团',
        description: '准备续约材料，安排续约谈判会议',
        type: 'renewal',
        status: 'in_progress',
        priority: 'high',
        dueDate: '2024-01-25',
        assignedTo: '李明',
        customerId: 'CUST-0002',
        customerName: '上海智能制造集团',
        createdAt: '2024-01-10',
        updatedAt: '2024-01-18'
    },
    {
        id: 'todo_003',
        title: '风险处理 - 深圳创新科技',
        description: '处理客户满意度下降问题，制定改进方案',
        type: 'follow-up',
        status: 'pending',
        priority: 'high',
        dueDate: '2024-01-22',
        assignedTo: '王芳',
        customerId: 'CUST-0003',
        customerName: '深圳金融科技有限公司',
        createdAt: '2024-01-12',
        updatedAt: '2024-01-12'
    },
    {
        id: 'todo_004',
        title: 'QBR会议安排 - 广州数字化企业',
        description: '安排Q1季度业务回顾会议',
        type: 'meeting',
        status: 'pending',
        priority: 'medium',
        dueDate: '2024-01-30',
        assignedTo: '张伟',
        customerId: 'CUST-0004',
        customerName: '广州数字化企业',
        createdAt: '2024-01-16',
        updatedAt: '2024-01-16'
    },
    {
        id: 'todo_005',
        title: '培训安排 - 杭州互联网公司',
        description: '安排新功能培训，提升用户使用率',
        type: 'training',
        status: 'completed',
        priority: 'medium',
        dueDate: '2024-01-15',
        assignedTo: '李明',
        customerId: 'CUST-0005',
        customerName: '杭州互联网公司',
        createdAt: '2024-01-08',
        updatedAt: '2024-01-15',
        completedAt: '2024-01-15'
    },
    {
        id: 'todo_006',
        title: '系统优化跟进 - 成都软件开发',
        description: '跟进系统使用率提升方案的执行情况',
        type: 'follow-up',
        status: 'overdue',
        priority: 'high',
        dueDate: '2024-01-10',
        assignedTo: '王芳',
        customerId: 'CUST-0006',
        customerName: '成都软件开发公司',
        createdAt: '2024-01-05',
        updatedAt: '2024-01-05'
    }
];
const mockCustomerHistory = {
    'CUST-0001': [
        {
            date: '2024-01-28',
            type: '客户拜访',
            description: '进行季度回访，了解系统使用情况',
            icon: 'UserOutlined',
            color: '#1890ff'
        },
        {
            date: '2024-01-20',
            type: '健康分提升',
            description: '客户健康分从80提升到85',
            icon: 'RiseOutlined',
            color: '#52c41a'
        },
        {
            date: '2024-01-15',
            type: '技术支持',
            description: '协助客户完成系统升级',
            icon: 'SettingOutlined',
            color: '#52c41a'
        }
    ],
    'CUST-0002': [
        {
            date: '2024-01-25',
            type: '续约谈判',
            description: '进行续约谈判，讨论新年度合作',
            icon: 'FileTextOutlined',
            color: '#1890ff'
        },
        {
            date: '2024-01-18',
            type: '技术问题解决',
            description: '解决API集成兼容性问题',
            icon: 'SettingOutlined',
            color: '#52c41a'
        }
    ],
    'CUST-0003': [
        {
            date: '2024-02-28',
            type: '续约状态更新',
            description: '续约状态更新为"流失风险"',
            icon: 'ExclamationCircleOutlined',
            color: '#fa541c'
        },
        {
            date: '2024-02-25',
            type: '客户拜访',
            description: '进行客户拜访，了解续约意向',
            icon: 'UserOutlined',
            color: '#1890ff'
        },
        {
            date: '2024-02-20',
            type: '健康分下降',
            description: '客户健康分从75下降到45',
            icon: 'RiseOutlined',
            color: '#fa541c'
        }
    ],
    'CUST-0004': [
        {
            date: '2024-01-30',
            type: 'QBR会议',
            description: '完成Q4季度业务回顾会议',
            icon: 'TeamOutlined',
            color: '#52c41a'
        }
    ],
    'CUST-0005': [
        {
            date: '2024-01-15',
            type: '培训完成',
            description: '完成新功能培训，用户反馈良好',
            icon: 'CheckCircleOutlined',
            color: '#52c41a'
        }
    ],
    'CUST-0006': [
        {
            date: '2024-01-20',
            type: '系统优化',
            description: '完成系统性能优化',
            icon: 'SettingOutlined',
            color: '#52c41a'
        }
    ]
};
const mockContacts = {
    'CUST-0001': [
        {
            id: 'contact_001_001',
            name: '张总',
            title: 'CEO',
            phone: '13812341001',
            email: 'zhang@bjtech.com',
            isPrimary: true,
            stakeholderType: 'decision_maker',
            influence: 'high',
            attitude: 'positive',
            department: '管理层',
            notes: '公司最终决策者，对数字化转型非常支持'
        },
        {
            id: 'contact_001_002',
            name: '李经理',
            title: '技术总监',
            phone: '13912341002',
            email: 'li@bjtech.com',
            isPrimary: false,
            stakeholderType: 'influencer',
            influence: 'high',
            attitude: 'positive',
            department: '技术部',
            notes: '技术实施的关键推动者，具有很强的技术背景'
        }
    ],
    'CUST-0002': [
        {
            id: 'contact_002_001',
            name: '王总',
            title: 'CTO',
            phone: '138****2001',
            email: 'wang@shtech.com',
            isPrimary: true,
            stakeholderType: 'decision_maker',
            influence: 'high',
            attitude: 'neutral',
            department: '技术部',
            notes: '技术决策者，对新技术持谨慎态度，需要充分的技术论证'
        },
        {
            id: 'contact_002_002',
            name: '赵经理',
            title: '产品总监',
            phone: '139****2002',
            email: 'zhao@shtech.com',
            isPrimary: false,
            stakeholderType: 'user',
            influence: 'medium',
            attitude: 'positive',
            department: '产品部',
            notes: '产品线负责人，是系统的主要使用者，对功能需求很了解'
        }
    ],
    'CUST-0003': [
        {
            id: 'contact_003_001',
            name: '刘总',
            title: 'CEO',
            phone: '138****3001',
            email: 'liu@sztech.com',
            isPrimary: true,
            stakeholderType: 'decision_maker',
            influence: 'high',
            attitude: 'negative',
            department: '管理层',
            notes: '对当前系统效果不满意，存在流失风险，需要重点关注'
        },
        {
            id: 'contact_003_002',
            name: '陈经理',
            title: '运营总监',
            phone: '139****3002',
            email: 'chen@sztech.com',
            isPrimary: false,
            stakeholderType: 'influencer',
            influence: 'medium',
            attitude: 'neutral',
            department: '运营部',
            notes: '运营负责人，关注系统对业务效率的提升效果'
        }
    ],
    'CUST-0004': [
        {
            id: 'contact_004_001',
            name: '钱总',
            title: 'CEO',
            phone: '138****4001',
            email: 'qian@gztech.com',
            isPrimary: true,
            stakeholderType: 'decision_maker',
            influence: 'high',
            attitude: 'positive',
            department: '管理层',
            notes: '战略客户决策者，对长期合作很有兴趣，是重要的合作伙伴'
        },
        {
            id: 'contact_004_002',
            name: '孙经理',
            title: '技术总监',
            phone: '139****4002',
            email: 'sun@gztech.com',
            isPrimary: false,
            stakeholderType: 'user',
            influence: 'high',
            attitude: 'positive',
            department: '技术部',
            notes: '技术实施负责人，对系统集成和定制化需求很专业'
        }
    ],
    'CUST-0005': [
        {
            id: 'contact_005_001',
            name: '周总',
            title: 'CTO',
            phone: '138****5001',
            email: 'zhou@hztech.com',
            isPrimary: true,
            stakeholderType: 'decision_maker',
            influence: 'high',
            attitude: 'positive',
            department: '技术部',
            notes: '技术背景深厚的CTO，对产品技术架构很认可'
        },
        {
            id: 'contact_005_002',
            name: '吴经理',
            title: '产品经理',
            phone: '139****5002',
            email: 'wu@hztech.com',
            isPrimary: false,
            stakeholderType: 'user',
            influence: 'medium',
            attitude: 'neutral',
            department: '产品部',
            notes: '产品经理，关注用户体验和功能完善度'
        }
    ],
    'CUST-0006': [
        {
            id: 'contact_006_001',
            name: '郑总',
            title: 'CEO',
            phone: '138****6001',
            email: 'zheng@cdtech.com',
            isPrimary: true,
            stakeholderType: 'decision_maker',
            influence: 'high',
            attitude: 'positive',
            department: '管理层',
            notes: '重新合作的客户，对我们的服务重新建立了信心'
        },
        {
            id: 'contact_006_002',
            name: '王经理',
            title: '技术经理',
            phone: '139****6002',
            email: 'wang@cdtech.com',
            isPrimary: false,
            stakeholderType: 'user',
            influence: 'medium',
            attitude: 'positive',
            department: '技术部',
            notes: '技术实施负责人，对系统稳定性要求很高'
        }
    ]
};
const getPlatformType = (customerId)=>{
    // 固定映射关系，确保每个平台类型都有对应的公司
    const platformMapping = {
        'CUST-0001': 'dingtalk',
        'CUST-0002': 'wechat_work',
        'CUST-0003': 'feishu',
        'CUST-0004': 'lark',
        'CUST-0005': 'dingtalk_global',
        'CUST-0006': 'standalone'
    };
    // 如果有固定映射则使用，否则使用默认逻辑
    if (platformMapping[customerId]) return platformMapping[customerId];
    // 对于其他客户ID，使用原有的随机分配逻辑
    const platformTypes = [
        'dingtalk',
        'wechat_work',
        'feishu',
        'lark',
        'dingtalk_global',
        'standalone'
    ];
    const index = customerId.length % platformTypes.length;
    return platformTypes[index];
};
const getPurchasedProducts = (customerId)=>{
    const platformType = getPlatformType(customerId);
    const productMap = {
        'dingtalk': {
            products: [
                '直营-极简版',
                '直营-网校版',
                '直营-畅学版',
                '直营-标准版',
                '直营-专业版',
                '直营-智学版'
            ],
            services: [
                '智能人事-标准',
                '智能人事-专业版'
            ]
        },
        'wechat_work': {
            products: [
                '企微版'
            ],
            services: [
                '企微增值服务包',
                '企微定制开发'
            ]
        },
        'feishu': {
            products: [
                '飞书版'
            ],
            services: [
                '飞书集成服务',
                '飞书培训服务'
            ]
        },
        'lark': {
            products: [
                'D-learning'
            ],
            services: [
                'Lark技术支持',
                'Lark定制化服务'
            ]
        },
        'dingtalk_global': {
            products: [
                'D-learning'
            ],
            services: [
                'DingTalk集成服务',
                'DingTalk培训包'
            ]
        },
        'standalone': {
            products: [
                '独立版'
            ],
            services: [
                '独立部署实施',
                '独立部署运维'
            ]
        }
    };
    const config = productMap[platformType] || productMap['dingtalk'];
    // 根据客户ID生成固定的随机选择，确保数据一致性
    const seed = customerId.charCodeAt(customerId.length - 1);
    const productCount = seed % 2 + 1; // 1-2个产品
    const serviceCount = seed % 2 + 1; // 1-2个服务
    return {
        products: config.products.slice(0, productCount),
        services: config.services.slice(0, serviceCount)
    };
};
const mockCustomers = [
    {
        id: 'CUST-0001',
        name: '北京科技创新有限公司',
        industry: '信息技术',
        scale: '中型企业',
        csm: '张伟',
        arr: 500000,
        healthScore: 85,
        healthLevel: '健康',
        lifecycleStage: '成熟期',
        customerTier: 'strategic',
        salesPerson: '王销售',
        purchasedProducts: [
            '直营-极简版'
        ],
        connectionLevel: 4,
        keyContacts: mockContacts['CUST-0001'],
        currentContract: mockContracts.find((c)=>c.id === 'contract_001'),
        contracts: mockContracts.filter((c)=>c.customerId === 'CUST-0001'),
        handoverRecords: mockHandoverRecords.filter((h)=>h.customerId === 'CUST-0001'),
        nextRenewalDate: '2024-05-31',
        serviceExpiryDate: '2024-05-31',
        isRenewalRisk: false,
        lastContactDate: '2024-01-15',
        // 新增字段
        ticketExpiryDate: '2024-04-30',
        contractStartDate: '2023-06-01',
        contractEndDate: '2024-05-31',
        customerSegment: 'strategic',
        serviceRecords: [
            {
                id: 'sr001',
                type: 'QBR',
                title: 'Q4季度业务回顾会议',
                content: '回顾了Q4业务指标，客户对系统使用效果满意，计划扩大使用范围',
                operator: '张伟',
                timestamp: '2024-01-10 14:00:00',
                tags: [
                    '季度回顾',
                    '业务增长'
                ],
                createdAt: '2024-01-10 14:30:00',
                updatedAt: '2024-01-10 14:30:00'
            },
            {
                id: 'sr002',
                type: '培训',
                title: '新功能培训会',
                content: '为客户团队进行了新版本功能培训，参与人员20人，反馈良好',
                operator: '张伟',
                timestamp: '2024-01-05 10:00:00',
                tags: [
                    '功能培训',
                    '用户教育'
                ],
                createdAt: '2024-01-05 11:00:00',
                updatedAt: '2024-01-05 11:00:00'
            }
        ],
        todoTasks: mockTodoTasks.filter((t)=>t.customerId === 'CUST-0001'),
        isFavorite: true,
        createdAt: '2023-06-20',
        updatedAt: '2024-01-15'
    },
    {
        id: 'CUST-0002',
        name: '上海智能制造集团',
        industry: '制造业',
        scale: '大型企业',
        csm: '李明',
        arr: 800000,
        healthScore: 65,
        healthLevel: '一般',
        lifecycleStage: '成熟期',
        customerTier: 'large',
        salesPerson: '李销售',
        purchasedProducts: [
            '企微版'
        ],
        connectionLevel: 3,
        keyContacts: mockContacts['CUST-0002'],
        currentContract: mockContracts.find((c)=>c.id === 'contract_003'),
        contracts: mockContracts.filter((c)=>c.customerId === 'CUST-0002'),
        handoverRecords: mockHandoverRecords.filter((h)=>h.customerId === 'CUST-0002'),
        nextRenewalDate: '2024-08-31',
        serviceExpiryDate: '2024-08-31',
        isRenewalRisk: false,
        lastContactDate: '2024-01-12',
        // 新增字段
        ticketExpiryDate: '2024-07-31',
        contractStartDate: '2023-09-01',
        contractEndDate: '2024-08-31',
        customerSegment: 'key',
        serviceRecords: [
            {
                id: 'sr003',
                type: '电话回访',
                title: '续约意向沟通',
                content: '与客户CTO沟通续约事宜，客户表示满意当前服务，有续约意向',
                operator: '李明',
                timestamp: '2024-01-12 15:30:00',
                tags: [
                    '续约沟通',
                    '客户满意'
                ],
                createdAt: '2024-01-12 16:00:00',
                updatedAt: '2024-01-12 16:00:00'
            },
            {
                id: 'sr004',
                type: '技术支持',
                title: 'API集成问题解决',
                content: '协助客户解决企微集成中的API调用问题，已成功解决',
                operator: '李明',
                timestamp: '2024-01-08 09:00:00',
                tags: [
                    '技术支持',
                    '问题解决'
                ],
                createdAt: '2024-01-08 10:30:00',
                updatedAt: '2024-01-08 10:30:00'
            }
        ],
        todoTasks: mockTodoTasks.filter((t)=>t.customerId === 'CUST-0002'),
        isFavorite: false,
        createdAt: '2022-09-20',
        updatedAt: '2024-01-12'
    },
    {
        id: 'CUST-0003',
        name: '深圳金融科技有限公司',
        industry: '软件开发',
        scale: '小型企业',
        csm: '王芳',
        arr: 300000,
        healthScore: 45,
        healthLevel: '风险',
        customerTier: 'medium',
        salesPerson: '张销售',
        lifecycleStage: '衰退期',
        connectionLevel: 2,
        purchasedProducts: [
            '飞书版'
        ],
        keyContacts: mockContacts['CUST-0003'],
        currentContract: mockContracts.find((c)=>c.id === 'contract_005'),
        contracts: mockContracts.filter((c)=>c.customerId === 'CUST-0003'),
        handoverRecords: mockHandoverRecords.filter((h)=>h.customerId === 'CUST-0003'),
        nextRenewalDate: '2024-06-30',
        serviceExpiryDate: '2024-06-30',
        isRenewalRisk: true,
        lastContactDate: '2024-01-08',
        // 新增字段
        ticketExpiryDate: '2024-05-30',
        contractStartDate: '2023-07-01',
        contractEndDate: '2024-06-30',
        customerSegment: 'general',
        serviceRecords: [
            {
                id: 'sr005',
                type: '风险处理',
                title: '客户满意度下降处理',
                content: '客户反馈系统使用体验不佳，已安排产品团队跟进优化',
                operator: '王芳',
                timestamp: '2024-01-08 11:00:00',
                tags: [
                    '风险处理',
                    '满意度'
                ],
                createdAt: '2024-01-08 11:30:00',
                updatedAt: '2024-01-08 11:30:00'
            },
            {
                id: 'sr006',
                type: '商务沟通',
                title: '预算削减风险沟通',
                content: '与客户财务部门沟通，了解预算情况，制定应对方案',
                operator: '王芳',
                timestamp: '2024-01-05 14:00:00',
                tags: [
                    '预算风险',
                    '商务沟通'
                ],
                createdAt: '2024-01-05 14:30:00',
                updatedAt: '2024-01-05 14:30:00'
            }
        ],
        todoTasks: mockTodoTasks.filter((t)=>t.customerId === 'CUST-0003'),
        isFavorite: true,
        createdAt: '2022-07-20',
        updatedAt: '2024-01-08'
    },
    {
        id: 'CUST-0004',
        name: '广州数字化企业',
        industry: '数字化服务',
        scale: '大型企业',
        csm: '张伟',
        arr: 1200000,
        healthScore: 92,
        healthLevel: '健康',
        lifecycleStage: '成熟期',
        customerTier: 'strategic',
        salesPerson: '陈销售',
        purchasedProducts: [
            'D-learning'
        ],
        connectionLevel: 5,
        keyContacts: mockContacts['CUST-0004'],
        currentContract: mockContracts.find((c)=>c.id === 'contract_006'),
        contracts: mockContracts.filter((c)=>c.customerId === 'CUST-0004'),
        handoverRecords: mockHandoverRecords.filter((h)=>h.customerId === 'CUST-0004'),
        nextRenewalDate: '2025-09-30',
        serviceExpiryDate: '2025-09-30',
        isRenewalRisk: false,
        lastContactDate: '2024-01-20',
        // 新增字段
        ticketExpiryDate: '2025-08-30',
        contractStartDate: '2023-10-01',
        contractEndDate: '2025-09-30',
        customerSegment: 'strategic',
        serviceRecords: [
            {
                id: 'sr007',
                type: '产品演示',
                title: '新版本功能演示',
                content: '为客户演示最新版本的学习分析功能，客户对数据可视化很感兴趣',
                operator: '陈强',
                timestamp: '2024-01-20 10:00:00',
                tags: [
                    '产品演示',
                    '功能升级'
                ],
                createdAt: '2024-01-20 11:00:00',
                updatedAt: '2024-01-20 11:00:00'
            },
            {
                id: 'sr008',
                type: '培训',
                title: '管理员权限培训',
                content: '为客户IT团队进行系统管理员权限和配置培训',
                operator: '陈强',
                timestamp: '2024-01-18 14:00:00',
                tags: [
                    '用户培训',
                    '权限管理'
                ],
                createdAt: '2024-01-18 15:00:00',
                updatedAt: '2024-01-18 15:00:00'
            }
        ],
        todoTasks: mockTodoTasks.filter((t)=>t.customerId === 'CUST-0004'),
        isFavorite: false,
        createdAt: '2023-10-20',
        updatedAt: '2024-01-14'
    },
    {
        id: 'CUST-0005',
        name: '杭州互联网公司',
        industry: '互联网',
        scale: '中型企业',
        csm: '李明',
        arr: 450000,
        healthScore: 58,
        healthLevel: '一般',
        lifecycleStage: '成长期',
        customerTier: 'medium',
        salesPerson: '刘销售',
        purchasedProducts: [
            'D-learning'
        ],
        connectionLevel: 3,
        keyContacts: mockContacts['CUST-0005'],
        currentContract: mockContracts.find((c)=>c.id === 'contract_007'),
        contracts: mockContracts.filter((c)=>c.customerId === 'CUST-0005'),
        handoverRecords: mockHandoverRecords.filter((h)=>h.customerId === 'CUST-0005'),
        nextRenewalDate: '2024-05-31',
        serviceExpiryDate: '2024-05-31',
        isRenewalRisk: false,
        lastContactDate: '2024-01-18',
        // 新增字段
        ticketExpiryDate: '2024-04-30',
        contractStartDate: '2023-06-01',
        contractEndDate: '2024-05-31',
        customerSegment: 'key',
        serviceRecords: [
            {
                id: 'sr009',
                type: '其他',
                title: '系统使用情况检查',
                content: '定期检查客户系统使用情况，发现活跃度较高，建议增加高级功能',
                operator: '刘洋',
                timestamp: '2024-01-18 16:00:00',
                tags: [
                    '健康检查',
                    '使用分析'
                ],
                createdAt: '2024-01-18 16:30:00',
                updatedAt: '2024-01-18 16:30:00'
            },
            {
                id: 'sr010',
                type: '商务沟通',
                title: '扩容需求跟进',
                content: '客户提出扩容需求，已转交销售团队跟进',
                operator: '刘洋',
                timestamp: '2024-01-15 13:00:00',
                tags: [
                    '商机跟进',
                    '扩容需求'
                ],
                createdAt: '2024-01-15 13:30:00',
                updatedAt: '2024-01-15 13:30:00'
            }
        ],
        todoTasks: mockTodoTasks.filter((t)=>t.customerId === 'CUST-0005'),
        isFavorite: true,
        createdAt: '2023-06-15',
        updatedAt: '2024-01-10'
    },
    {
        id: 'CUST-0006',
        name: '成都软件开发公司',
        industry: '软件开发',
        scale: '小型企业',
        csm: '王芳',
        arr: 200000,
        healthScore: 38,
        healthLevel: '风险',
        lifecycleStage: '成长期',
        customerTier: 'small',
        salesPerson: '赵销售',
        purchasedProducts: [
            '独立版'
        ],
        connectionLevel: 1,
        keyContacts: mockContacts['CUST-0006'],
        currentContract: mockContracts.find((c)=>c.id === 'contract_009'),
        contracts: mockContracts.filter((c)=>c.customerId === 'CUST-0006'),
        handoverRecords: mockHandoverRecords.filter((h)=>h.customerId === 'CUST-0006'),
        nextRenewalDate: '2024-12-31',
        serviceExpiryDate: '2024-12-31',
        isRenewalRisk: true,
        lastContactDate: '2024-01-22',
        // 新增字段
        ticketExpiryDate: '2024-11-30',
        contractStartDate: '2024-01-01',
        contractEndDate: '2024-12-31',
        customerSegment: 'general',
        serviceRecords: [
            {
                id: 'sr011',
                type: 'QBR',
                title: 'Q1季度业务回顾准备',
                content: '准备Q1季度业务回顾材料，整理客户使用数据和成果展示',
                operator: '赵敏',
                timestamp: '2024-01-22 09:00:00',
                tags: [
                    '季度回顾',
                    '数据分析'
                ],
                createdAt: '2024-01-22 09:30:00',
                updatedAt: '2024-01-22 09:30:00'
            },
            {
                id: 'sr012',
                type: '其他',
                title: '现场服务拜访',
                content: '现场拜访客户，了解使用情况和改进建议，客户反馈良好',
                operator: '赵敏',
                timestamp: '2024-01-20 14:00:00',
                tags: [
                    '客户拜访',
                    '现场服务'
                ],
                createdAt: '2024-01-20 17:00:00',
                updatedAt: '2024-01-20 17:00:00'
            }
        ],
        todoTasks: mockTodoTasks.filter((t)=>t.customerId === 'CUST-0006'),
        isFavorite: false,
        createdAt: '2021-09-20',
        updatedAt: '2024-01-05'
    }
];
const mockValueBoards = [
    {
        id: 'vb001',
        customerId: 'CUST-0001',
        customerName: '北京科技创新有限公司',
        title: 'Q4业务数字化转型价值报告',
        description: '展示客户在数字化转型过程中取得的关键业务成果',
        status: '进行中',
        kpis: [
            {
                id: 'kpi1',
                name: '业务效率提升',
                target: 30,
                current: 25,
                unit: '%',
                trend: 'up'
            },
            {
                id: 'kpi2',
                name: '成本节约',
                target: 500000,
                current: 420000,
                unit: '元',
                trend: 'up'
            },
            {
                id: 'kpi3',
                name: '用户满意度',
                target: 90,
                current: 88,
                unit: '%',
                trend: 'stable'
            }
        ],
        achievements: [
            {
                id: 'ach1',
                title: '完成核心系统部署',
                description: '成功部署客户关系管理系统，覆盖全部业务流程',
                impact: '提升客户响应速度50%',
                date: '2024-01-10'
            },
            {
                id: 'ach2',
                title: '员工培训完成',
                description: '完成200+员工的系统使用培训',
                impact: '用户采用率达到95%',
                date: '2024-01-05'
            }
        ],
        createdBy: '张伟',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-15'
    }
];
const mockQBRMeetings = [
    {
        id: 'qbr001',
        customerId: 'CUST-0001',
        customerName: '北京科技创新有限公司',
        title: '2024 Q1 业务回顾会议',
        scheduledDate: '2024-01-25 14:00',
        status: '待召开',
        agenda: [
            '业务成果回顾',
            '问题与挑战讨论',
            'Q2规划制定'
        ],
        attendees: [
            '张总 - CEO',
            '李经理 - CTO',
            '王主管 - 运营总监',
            '张伟 - CSM'
        ],
        createdBy: '张伟',
        createdAt: '2024-01-10',
        updatedAt: '2024-01-15'
    },
    {
        id: 'qbr002',
        customerId: 'CUST-0002',
        customerName: '上海智能制造集团',
        title: '2023 Q4 业务回顾会议',
        scheduledDate: '2023-12-28 10:00',
        status: '已完成',
        agenda: [
            'Q4业务成果总结',
            '系统优化建议',
            '2024年发展规划'
        ],
        attendees: [
            '赵总 - CEO',
            '钱经理 - 产品总监',
            '李明 - CSM'
        ],
        outcomes: [
            '确认Q4目标达成85%',
            '识别3个关键优化点',
            '制定2024年扩展计划'
        ],
        nextSteps: [
            '1月完成系统优化',
            '2月启动新功能开发',
            '3月进行用户培训'
        ],
        createdBy: '李明',
        createdAt: '2023-12-15',
        updatedAt: '2023-12-28'
    }
];
const mockRiskEvents = [
    {
        id: 're001',
        customerId: 'CUST-0003',
        customerName: '深圳金融科技有限公司',
        riskType: '续费风险',
        description: '客户对当前服务满意度下降，预算可能削减',
        severity: 'high',
        status: '处理中',
        assignedTo: '王芳',
        dueDate: '2024-01-30',
        createdAt: '2024-01-08',
        updatedAt: '2024-01-15'
    },
    {
        id: 're002',
        customerId: 'CUST-0006',
        customerName: '成都软件开发公司',
        riskType: '使用率低',
        description: '系统使用率持续下降，用户活跃度不足',
        severity: 'medium',
        status: '待处理',
        assignedTo: '王芳',
        dueDate: '2024-01-25',
        createdAt: '2024-01-12',
        updatedAt: '2024-01-12'
    },
    {
        id: 're003',
        customerId: 'CUST-0002',
        customerName: '上海智能制造集团',
        riskType: '技术问题',
        description: '系统集成出现兼容性问题，影响业务流程',
        severity: 'medium',
        status: '已解决',
        assignedTo: '李明',
        dueDate: '2024-01-20',
        resolution: '通过API升级解决兼容性问题，系统运行正常',
        createdAt: '2024-01-05',
        updatedAt: '2024-01-18'
    }
];
const mockServicePlaybooks = [
    {
        id: 'pb001',
        name: '成长期客户增购引导剧本',
        description: '针对成长期客户的增购机会识别与转化流程',
        applicableStage: [
            '成长期'
        ],
        category: '增购转化',
        status: '可用',
        goal: '通过系统化的分析和评估流程，识别并转化成长期客户的增购机会',
        scenarioTags: [
            '增购',
            '成长期',
            '系统使用率高'
        ],
        // 触发条件
        triggerConditions: [
            {
                id: 'tc1',
                type: 'custom',
                field: 'usage_rate',
                operator: 'gt',
                value: 80,
                description: '系统使用率超过80%'
            },
            {
                id: 'tc2',
                type: 'custom',
                field: 'lifecycle_stage',
                operator: 'eq',
                value: '成长期',
                description: '客户处于成长期'
            }
        ],
        autoTrigger: true,
        // 成功指标
        successMetrics: [
            {
                id: 'metric1',
                name: '增购转化率',
                description: '成功完成增购的客户比例',
                targetValue: 75,
                unit: '%',
                measurementMethod: '统计启动剧本后30天内完成增购的客户数量占总启动数量的比例'
            },
            {
                id: 'metric2',
                name: '平均增购金额',
                description: '单个客户平均增购金额',
                targetValue: 200000,
                unit: '元',
                measurementMethod: '计算所有成功增购客户的增购金额平均值'
            }
        ],
        // 资源配置
        resources: [
            {
                id: 'res1',
                type: 'document',
                name: '使用数据分析模板',
                description: '客户系统使用情况分析模板',
                tags: [
                    '分析',
                    '模板'
                ]
            },
            {
                id: 'res2',
                type: 'script',
                name: '增购沟通话术',
                description: '与客户沟通增购机会的标准话术',
                tags: [
                    '沟通',
                    '话术'
                ]
            }
        ],
        tasks: [
            {
                id: 'task1',
                title: '客户使用情况分析',
                description: '分析客户当前系统使用深度和广度',
                phase: '诊断分析',
                duration: 2,
                dueOffset: 3,
                defaultAssignee: 'csm',
                requiredResources: [
                    'res1'
                ],
                checkpoints: [
                    '完成使用率分析',
                    '识别扩展需求点'
                ],
                dependencies: [],
                isOptional: false,
                allowSkip: false
            },
            {
                id: 'task2',
                title: '增购机会评估',
                description: '评估客户的增购潜力和预算能力',
                phase: '价值评估',
                duration: 3,
                dueOffset: 7,
                defaultAssignee: 'sales',
                requiredResources: [
                    'res2'
                ],
                checkpoints: [
                    '完成ROI计算',
                    '确认预算范围'
                ],
                dependencies: [
                    'task1'
                ],
                isOptional: false,
                allowSkip: false
            },
            {
                id: 'task3',
                title: '方案设计与提案',
                description: '设计个性化增购方案并进行提案',
                phase: '方案制定',
                duration: 5,
                dueOffset: 14,
                defaultAssignee: 'custom',
                customAssignee: '产品专家',
                requiredResources: [
                    'res1',
                    'res2'
                ],
                checkpoints: [
                    '完成方案设计',
                    '获得初步认可'
                ],
                dependencies: [
                    'task2'
                ],
                isOptional: false,
                allowSkip: false
            }
        ],
        estimatedDuration: 10,
        successRate: 75,
        usage: 25,
        createdBy: '张伟',
        createdAt: '2023-08-15',
        updatedAt: '2024-01-10'
    },
    {
        id: 'pb002',
        name: '风险客户挽回剧本',
        description: '针对有流失风险客户的挽回策略和执行流程',
        applicableStage: [
            '衰退期'
        ],
        category: '风险管理',
        status: '可用',
        goal: '通过系统化的风险识别和挽回措施，降低客户流失率',
        scenarioTags: [
            '流失风险',
            '客户挽回',
            '满意度提升'
        ],
        // 触发条件
        triggerConditions: [
            {
                id: 'tc1',
                type: 'custom',
                field: 'health_score',
                operator: 'lt',
                value: 60,
                description: '客户健康分低于60分'
            },
            {
                id: 'tc2',
                type: 'custom',
                field: 'lifecycle_stage',
                operator: 'eq',
                value: '衰退期',
                description: '客户处于衰退期'
            }
        ],
        autoTrigger: true,
        // 成功指标
        successMetrics: [
            {
                id: 'metric1',
                name: '客户挽回率',
                description: '成功挽回的风险客户比例',
                targetValue: 60,
                unit: '%',
                measurementMethod: '统计启动剧本后60天内成功续约或健康分回升的客户比例'
            },
            {
                id: 'metric2',
                name: '满意度提升',
                description: '客户满意度改善程度',
                targetValue: 20,
                unit: '分',
                measurementMethod: '对比剧本执行前后的客户满意度评分差值'
            }
        ],
        // 资源配置
        resources: [
            {
                id: 'res1',
                type: 'document',
                name: '风险分析模板',
                description: '客户流失风险分析和评估模板',
                tags: [
                    '分析',
                    '风险评估'
                ]
            },
            {
                id: 'res2',
                type: 'script',
                name: '客户挽回沟通指南',
                description: '与风险客户沟通的标准流程和话术',
                tags: [
                    '沟通',
                    '挽回'
                ]
            }
        ],
        tasks: [
            {
                id: 'step1',
                title: '风险根因分析',
                description: '深入分析客户不满的根本原因',
                phase: '分析阶段',
                duration: 4,
                dueOffset: 3,
                defaultAssignee: 'csm',
                requiredResources: [],
                checkpoints: [
                    '完成根因分析',
                    '制定改进计划'
                ],
                dependencies: [],
                isOptional: false,
                allowSkip: false
            },
            {
                id: 'step2',
                title: '紧急响应措施',
                description: '实施紧急措施缓解客户不满',
                phase: '响应阶段',
                duration: 2,
                dueOffset: 5,
                defaultAssignee: 'support',
                requiredResources: [],
                checkpoints: [
                    '实施紧急措施',
                    '获得客户认可'
                ],
                dependencies: [
                    'step1'
                ],
                isOptional: false,
                allowSkip: false
            },
            {
                id: 'step3',
                title: '长期改进方案',
                description: '制定并实施长期的服务改进方案',
                phase: '改进阶段',
                duration: 8,
                dueOffset: 14,
                defaultAssignee: 'custom',
                customAssignee: '产品团队',
                requiredResources: [],
                checkpoints: [
                    '完成方案实施',
                    '客户满意度回升'
                ],
                dependencies: [
                    'step2'
                ],
                isOptional: false,
                allowSkip: false
            }
        ],
        estimatedDuration: 14,
        successRate: 60,
        usage: 18,
        createdBy: '王芳',
        createdAt: '2023-09-20',
        updatedAt: '2024-01-08'
    },
    {
        id: 'pb003',
        name: '成熟期客户深度合作剧本',
        description: '与成熟期客户建立更深层次合作关系的策略',
        applicableStage: [
            '成熟期'
        ],
        category: '合作深化',
        status: '可用',
        goal: '建立长期战略合作关系，实现双方价值最大化',
        scenarioTags: [
            '战略合作',
            '价值提升',
            '长期发展'
        ],
        // 触发条件
        triggerConditions: [
            {
                id: 'tc1',
                type: 'custom',
                field: 'health_score',
                operator: 'gte',
                value: 85,
                description: '客户健康分大于等于85分'
            },
            {
                id: 'tc2',
                type: 'custom',
                field: 'arr',
                operator: 'gte',
                value: 500000,
                description: 'ARR大于等于50万'
            }
        ],
        autoTrigger: false,
        // 成功指标
        successMetrics: [
            {
                id: 'metric1',
                name: '战略合作达成率',
                description: '成功建立战略合作关系的客户比例',
                targetValue: 45,
                unit: '%',
                measurementMethod: '统计启动剧本后90天内签署战略合作协议的客户比例'
            },
            {
                id: 'metric2',
                name: '合作价值增长',
                description: '通过战略合作实现的收入增长',
                targetValue: 300000,
                unit: '元',
                measurementMethod: '计算战略合作带来的新增收入平均值'
            }
        ],
        // 资源配置
        resources: [
            {
                id: 'res1',
                type: 'document',
                name: '战略合作方案模板',
                description: '战略合作提案和协议模板',
                tags: [
                    '合作',
                    '模板'
                ]
            },
            {
                id: 'res2',
                type: 'document',
                name: '价值展示材料',
                description: '展示双方合作价值的演示材料',
                tags: [
                    '展示',
                    '价值'
                ]
            }
        ],
        tasks: [
            {
                id: 'step1',
                title: '合作机会识别',
                description: '识别与客户深度合作的机会点',
                phase: '识别阶段',
                duration: 3,
                dueOffset: 5,
                defaultAssignee: 'csm',
                requiredResources: [],
                checkpoints: [
                    '完成机会分析',
                    '确定合作方向'
                ],
                dependencies: [],
                isOptional: false,
                allowSkip: false
            },
            {
                id: 'step2',
                title: '战略合作提案',
                description: '制定战略合作方案并进行高层提案',
                phase: '提案阶段',
                duration: 6,
                dueOffset: 12,
                defaultAssignee: 'sales',
                requiredResources: [],
                checkpoints: [
                    '完成提案准备',
                    '获得高层支持'
                ],
                dependencies: [
                    'step1'
                ],
                isOptional: false,
                allowSkip: false
            }
        ],
        estimatedDuration: 9,
        successRate: 45,
        usage: 12,
        createdBy: '李明',
        createdAt: '2023-10-10',
        updatedAt: '2024-01-05'
    }
];
const mockKeyActions = [
    {
        id: 'A1',
        title: '价值实现与效果报告',
        description: '创建和管理客户价值看板，展示业务成果',
        icon: 'BarChartOutlined',
        color: '#1890ff',
        enabled: true
    },
    {
        id: 'A2',
        title: '业务复盘会 (QBR)',
        description: '定期组织业务回顾会议，深化客户关系',
        icon: 'TeamOutlined',
        color: '#52c41a',
        enabled: true
    },
    {
        id: 'A3',
        title: '健康度评分',
        description: '监控和管理客户健康度指标',
        icon: 'HeartOutlined',
        color: '#fa8c16',
        route: '/health-center',
        enabled: true
    },
    {
        id: 'A4',
        title: '风险事件处理队列',
        description: '及时识别和处理客户风险事件',
        icon: 'ExclamationCircleOutlined',
        color: '#f5222d',
        enabled: true
    },
    {
        id: 'A5',
        title: '续费续签',
        description: '管理客户续约流程和策略',
        icon: 'FileTextOutlined',
        color: '#722ed1',
        route: '/profiles/renewal',
        enabled: true
    }
];
const mockServiceOverview = {
    totalCustomers: mockCustomers.length,
    avgHealthScore: Math.round(mockCustomers.reduce((sum, c)=>sum + c.healthScore, 0) / mockCustomers.length),
    riskCustomers: mockCustomers.filter((c)=>c.healthLevel === '风险').length,
    healthDistribution: {
        healthy: mockCustomers.filter((c)=>c.healthLevel === '健康').length,
        normal: mockCustomers.filter((c)=>c.healthLevel === '一般').length,
        risky: mockCustomers.filter((c)=>c.healthLevel === '风险').length
    },
    lifecycleDistribution: {
        growth: mockCustomers.filter((c)=>c.lifecycleStage === '成长期').length,
        mature: mockCustomers.filter((c)=>c.lifecycleStage === '成熟期').length,
        decline: mockCustomers.filter((c)=>c.lifecycleStage === '衰退期').length
    }
};
const healthColors = {
    '健康': '#7ED321',
    '一般': '#F5A623',
    '风险': '#FF6B6B'
};
const lifecycleColors = {
    '成长期': '#1890ff',
    '成熟期': '#13c2c2',
    '衰退期': '#eb2f96'
};
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
"src/mock/handoverData.ts": function (module, exports, __mako_require__){
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
    mockCRMSyncData: function() {
        return mockCRMSyncData;
    },
    mockCustomerHandovers: function() {
        return mockCustomerHandovers;
    },
    mockCustomers: function() {
        return mockCustomers;
    },
    mockInternalComments: function() {
        return mockInternalComments;
    },
    mockOnboardingTasks: function() {
        return mockOnboardingTasks;
    },
    mockStakeholders: function() {
        return mockStakeholders;
    }
});
var _interop_require_wildcard = __mako_require__("@swc/helpers/_/_interop_require_wildcard");
var _reactrefresh = /*#__PURE__*/ _interop_require_wildcard._(__mako_require__("node_modules/react-refresh/runtime.js"));
var _continuousServiceData = __mako_require__("src/mock/continuousServiceData.ts");
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
// 根据平台类型获取已购产品
function getPurchasedProductsByPlatform(customerId) {
    const platformType = (0, _continuousServiceData.getPlatformType)(customerId);
    switch(platformType){
        case 'dingtalk':
            return [
                '直营-极简版'
            ];
        case 'dingtalk_hr':
            return [
                '智能人事-标准',
                '智能人事-专业版'
            ];
        case 'wechat_work':
            return [
                '企微版'
            ];
        case 'feishu':
            return [
                '飞书版'
            ];
        case 'lark':
            return [
                'D-learning'
            ];
        case 'dingtalk_global':
            return [
                'D-learning'
            ];
        case 'standalone':
            return [
                '独立版'
            ];
        default:
            return [
                '企业版SaaS平台',
                '数据分析模块',
                'API集成服务'
            ];
    }
}
const mockCRMSyncData = {
    contractAmount: 150000,
    servicePeriod: '2024-01-01 至 2024-12-31',
    purchasedProducts: [
        '企业版SaaS平台',
        '数据分析模块',
        'API集成服务'
    ],
    keyContacts: [
        '张三 - 技术总监',
        '李四 - 项目经理'
    ],
    salesNotes: '客户对数据安全要求较高，需要重点关注合规性配置。客户团队技术能力较强，可以快速上手。',
    accountCount: 50,
    salesSource: 'direct',
    salesPerson: '王销售'
};
const mockStakeholders = [
    {
        id: '1',
        name: '张三',
        position: '技术总监',
        role: 'decision_maker',
        contact: 'zhangsan@company.com',
        status: 'active',
        history: [
            {
                position: '研发经理',
                startDate: '2020-01-01',
                endDate: '2022-06-30'
            },
            {
                position: '技术总监',
                startDate: '2022-07-01'
            }
        ]
    },
    {
        id: '2',
        name: '李四',
        position: '项目经理',
        role: 'user',
        contact: 'lisi@company.com',
        status: 'left',
        history: [
            {
                position: '实施顾问',
                startDate: '2021-03-01',
                endDate: '2022-12-31'
            },
            {
                position: '项目经理',
                startDate: '2023-01-01',
                endDate: '2024-03-31',
                note: '离职'
            }
        ]
    },
    {
        id: '3',
        name: '王五',
        position: '运维工程师',
        role: 'technical_contact',
        contact: 'wangwu@company.com',
        status: 'active',
        history: [
            {
                position: '初级运维',
                startDate: '2022-05-01',
                endDate: '2023-08-01'
            },
            {
                position: '运维工程师',
                startDate: '2023-08-02'
            }
        ]
    }
];
const mockOnboardingTasks = [
    {
        id: '1',
        title: '安排启动会议',
        completed: true,
        dueDate: '2024-01-15'
    },
    {
        id: '2',
        title: '完成账号开通和权限配置',
        completed: true,
        dueDate: '2024-01-16'
    },
    {
        id: '3',
        title: '系统环境配置和数据迁移',
        completed: true,
        dueDate: '2024-01-18'
    },
    {
        id: '4',
        title: '用户培训和操作指导',
        completed: false,
        dueDate: '2024-01-25'
    },
    {
        id: '5',
        title: '业务流程梳理和优化',
        completed: false,
        dueDate: '2024-01-28'
    },
    {
        id: '6',
        title: '系统集成测试和验收',
        completed: false,
        dueDate: '2024-02-01'
    },
    {
        id: '7',
        title: '正式上线和运行监控',
        completed: false,
        dueDate: '2024-02-05'
    }
];
const mockInternalComments = [
    {
        id: '1',
        content: '客户对数据安全要求很高，建议安排安全专家参与启动会 @security_team',
        author: 'CSM-张明',
        createdAt: '2024-01-10 14:30:00',
        mentions: [
            'security_team'
        ]
    },
    {
        id: '2',
        content: '已联系技术团队，确认可以满足客户的合规要求，预计下周完成环境配置',
        author: 'CSM-李华',
        createdAt: '2024-01-11 09:15:00'
    },
    {
        id: '3',
        content: '启动会议进行顺利，客户技术团队配合度很高，已确定培训计划',
        author: 'CSM-张明',
        createdAt: '2024-01-15 16:20:00'
    },
    {
        id: '4',
        content: '账号开通完成，权限配置已按客户需求调整，等待客户确认',
        author: '技术支持-王工',
        createdAt: '2024-01-16 11:45:00'
    },
    {
        id: '5',
        content: '数据迁移测试通过，客户对系统响应速度表示满意',
        author: '实施顾问-刘强',
        createdAt: '2024-01-18 14:30:00'
    },
    {
        id: '6',
        content: '下周安排用户培训，已准备培训材料和演示环境',
        author: 'CSM-张明',
        createdAt: '2024-01-20 10:00:00'
    }
];
const mockCustomers = [
    {
        id: 'CUST-0001',
        name: '北京科技创新有限公司',
        industry: '科技',
        size: 'large',
        csm: '张明',
        region: '华北',
        arr: 1200000,
        healthScore: 92,
        healthLevel: '健康',
        lifecycleStage: '成长期',
        tier: 'S',
        signDate: '2023-03-15',
        tags: [
            '重点客户',
            '技术驱动'
        ],
        collaborationEvents: 15,
        channelType: 'direct',
        isKeyAccount: true,
        isInRenewalWindow: false,
        visits90Days: 12,
        revenue90Days: 300000,
        insights: [
            {
                id: 'insight-001',
                content: '客户对新功能使用率较高，建议加强培训支持',
                date: '2024-01-15',
                type: 'usage'
            }
        ],
        nextAction: {
            content: '准备季度业务回顾会议',
            dueDate: '2024-02-01',
            overdue: false
        }
    },
    {
        id: 'CUST-0002',
        name: '武汉智能制造有限公司',
        industry: '制造业',
        size: 'large',
        csm: '李明',
        region: '华中',
        arr: 800000,
        healthScore: 90,
        healthLevel: '健康',
        lifecycleStage: '成长期',
        tier: 'S',
        signDate: '2024-01-10',
        tags: [
            '制造业',
            '智能化',
            '重点客户'
        ],
        collaborationEvents: 5,
        channelType: 'direct',
        isKeyAccount: true,
        isInRenewalWindow: false,
        visits90Days: 8,
        revenue90Days: 200000,
        insights: [
            {
                id: 'insight_h002_001',
                content: '客户对智能制造解决方案非常感兴趣',
                date: '2024-01-12',
                type: 'positive'
            }
        ],
        nextAction: {
            content: '安排制造业专家进行深度培训',
            dueDate: '2024-01-28',
            overdue: false
        }
    },
    {
        id: 'CUST-0003',
        name: '深圳金融科技有限公司',
        industry: '金融',
        size: 'large',
        csm: '王芳',
        region: '华北',
        arr: 600000,
        healthScore: 80,
        healthLevel: '健康',
        lifecycleStage: '成长期',
        tier: 'A',
        signDate: '2024-01-08',
        tags: [
            '金融科技',
            '重点客户',
            '数字化转型'
        ],
        collaborationEvents: 4,
        channelType: 'partner',
        isKeyAccount: true,
        isInRenewalWindow: false,
        visits90Days: 6,
        revenue90Days: 150000,
        insights: [
            {
                id: 'insight_h003_001',
                content: '金融行业对数据安全和合规性要求极高',
                date: '2024-01-09',
                type: 'requirement'
            }
        ],
        nextAction: {
            content: '制定金融合规和安全方案',
            dueDate: '2024-01-30',
            overdue: false
        }
    },
    {
        id: 'CUST-0010',
        name: '西安航空航天有限公司',
        industry: '航空航天',
        size: 'xlarge',
        csm: '郑涛',
        region: '西北',
        arr: 1100000,
        healthScore: 76,
        healthLevel: '健康',
        lifecycleStage: '成长期',
        tier: 'S',
        signDate: '2024-01-08',
        tags: [
            '航空航天',
            '军工',
            '重点客户'
        ],
        collaborationEvents: 3,
        channelType: 'direct',
        isKeyAccount: true,
        isInRenewalWindow: false,
        visits90Days: 4,
        revenue90Days: 275000,
        insights: [
            {
                id: 'insight_h010_001',
                content: '客户对系统安全性要求极高，需要定制化配置',
                date: '2024-01-10',
                type: 'requirement'
            }
        ],
        nextAction: {
            content: '安排安全合规专家评估',
            dueDate: '2024-02-05',
            overdue: false
        }
    }
];
const mockCustomerHandovers = [
    {
        id: '1',
        handoverNumber: 'HO-2024-001',
        customerId: 'CUST-0001',
        contractId: 'contract_001',
        contractNumber: 'CONT-2024-001',
        customerName: '北京科技创新有限公司',
        handoverStatus: 'implementation_in_progress',
        riskLevel: 'low',
        hasHandoverDocument: true,
        hasRiskAlert: false,
        stakeholderCount: 5,
        expectationAlignment: 'aligned',
        handoverRating: 4.5,
        handoverComment: '服务专业，响应及时',
        createdAt: '2024-01-10 10:00:00',
        updatedAt: '2024-01-15 16:30:00',
        salesCreatedAt: '2024-01-05 14:20:00',
        crmData: {
            ...mockCRMSyncData,
            purchasedProducts: getPurchasedProductsByPlatform('CUST-0001')
        },
        stakeholders: mockStakeholders,
        onboardingTasks: mockOnboardingTasks,
        internalComments: mockInternalComments,
        corePainPoints: '1. 原有培训效率低下，无法满足快速发展需求；2. 缺乏统一的培训管理平台，数据分散；3. 无法有效统计和分析员工学习数据；4. 线下培训成本高，覆盖面有限',
        shortTermExpectation: '1. 员工平台使用率达到80%以上；2. 完成新员工入职培训全覆盖；3. 解决线下培训数据统计难题',
        longTermExpectation: '1. 通过平台赋能30%培训成本；2. 员工技能达标率提升20%；3. 形成企业内部知识库，支持知识沉淀',
        unacceptableSituations: '1. 系统频繁宕机影响业务；2. 数据安全出现重大漏洞；3. 培训效果无法量化评估',
        customerSuccessCriteria: '1. 系统稳定性达到99.9%；2. 用户满意度评分4.5分以上；3. 培训完成率达到95%以上',
        risks: [
            {
                type: 'leadership',
                description: '技术总监张三即将离职，可能影响项目推进'
            },
            {
                type: 'unclear_needs',
                description: '客户对数据分析模块的具体需求还不够明确'
            }
        ],
        opportunities: [
            {
                type: 'account_expansion',
                description: '客户表示有意向增购50个账号'
            },
            {
                type: 'version_upgrade',
                description: '客户对企业版功能很感兴趣，有升级意向'
            },
            {
                type: 'referrals',
                description: '客户愿意推荐给同行业的合作伙伴'
            }
        ]
    },
    {
        id: '2',
        handoverNumber: 'HO-2024-002',
        customerId: 'CUST-0002',
        contractId: 'contract_003',
        contractNumber: 'CONT-2023-045',
        customerName: '上海智能制造集团',
        handoverStatus: 'pending_handover',
        riskLevel: 'medium',
        hasHandoverDocument: false,
        hasRiskAlert: true,
        stakeholderCount: 3,
        expectationAlignment: 'partially_aligned',
        handoverRating: 3.8,
        handoverComment: '需要进一步沟通客户需求',
        createdAt: '2024-01-12 14:20:00',
        updatedAt: '2024-01-14 11:45:00',
        salesCreatedAt: '2024-01-08 09:15:00',
        crmData: {
            ...mockCRMSyncData,
            accountCount: 25,
            salesSource: 'channel',
            channelPartner: '上海渠道合作伙伴有限公司',
            purchasedProducts: getPurchasedProductsByPlatform('CUST-0002')
        },
        stakeholders: [
            {
                id: '4',
                name: '赵六',
                position: '产品经理',
                role: 'decision_maker',
                contact: 'zhaoliu@company.com',
                status: 'active',
                history: [
                    {
                        position: '资深产品',
                        startDate: '2021-07-01',
                        endDate: '2023-06-30'
                    },
                    {
                        position: '产品经理',
                        startDate: '2023-07-01'
                    }
                ]
            },
            {
                id: '5',
                name: '钱七',
                position: '开发工程师',
                role: 'user',
                contact: 'qianqi@company.com',
                status: 'active'
            }
        ],
        onboardingTasks: mockOnboardingTasks,
        internalComments: mockInternalComments,
        corePainPoints: '1. 现有系统老旧，维护成本高；2. 业务流程不规范，效率低下；3. 数据孤岛严重，无法形成有效分析；4. 人工操作繁琐，容易出错',
        shortTermExpectation: '1. 快速完成系统集成；2. 团队熟练掌握基础功能；3. 建立标准化操作流程',
        longTermExpectation: '1. 实现业务流程全面数字化；2. 提升工作效率30%；3. 建立数据驱动的决策体系',
        unacceptableSituations: '1. 系统响应时间超过5秒；2. 数据丢失或错误；3. 用户体验差导致抵触情绪',
        customerSuccessCriteria: '1. 系统正常运行率99%以上；2. 用户培训通过率90%以上；3. 业务指标提升可量化'
    },
    {
        id: '0003',
        handoverNumber: 'HO-2024-003',
        customerId: 'CUST-0003',
        contractId: 'contract_004',
        contractNumber: 'CONT-2022-008',
        customerName: '深圳金融科技有限公司',
        handoverStatus: 'handover_in_progress',
        riskLevel: 'high',
        hasHandoverDocument: true,
        hasRiskAlert: true,
        stakeholderCount: 7,
        expectationAlignment: 'not_aligned',
        handoverRating: 2.5,
        handoverComment: '客户期望与产品功能存在较大差距',
        createdAt: '2024-01-08 09:30:00',
        updatedAt: '2024-01-13 15:20:00',
        salesCreatedAt: '2024-01-03 11:45:00',
        crmData: {
            ...mockCRMSyncData,
            accountCount: 100,
            salesSource: 'direct',
            salesPerson: '李销售',
            purchasedProducts: getPurchasedProductsByPlatform('CUST-0003')
        },
        stakeholders: [
            {
                id: '6',
                name: '孙八',
                position: '技术总监',
                role: 'decision_maker',
                contact: 'sunba@company.com',
                status: 'active'
            },
            {
                id: '7',
                name: '周九',
                position: '项目经理',
                role: 'influencer',
                contact: 'zhoujiu@company.com',
                status: 'active',
                history: [
                    {
                        position: '实施顾问',
                        startDate: '2020-09-01',
                        endDate: '2022-12-31'
                    },
                    {
                        position: '项目经理',
                        startDate: '2023-01-01'
                    }
                ]
            },
            {
                id: '8',
                name: '吴十',
                position: '运维工程师',
                role: 'technical_contact',
                contact: 'wushi@company.com',
                status: 'left',
                history: [
                    {
                        position: '运维工程师',
                        startDate: '2022-01-01',
                        endDate: '2024-05-31',
                        note: '离职'
                    }
                ]
            }
        ],
        onboardingTasks: mockOnboardingTasks,
        internalComments: mockInternalComments,
        corePainPoints: '1. 客户期望与产品功能存在较大差距；2. 技术团队对新系统接受度不高；3. 现有业务流程复杂，改造难度大；4. 预算有限，需要快速见效',
        shortTermExpectation: '1. 解决当前业务痛点；2. 提升团队协作效率；3. 建立规范化管理流程',
        longTermExpectation: '1. 成为行业数字化标杆；2. 实现智能化运营管理；3. 支撑业务快速扩张',
        unacceptableSituations: '1. 影响现有业务正常运行；2. 增加员工工作负担；3. 投资回报率低于预期',
        customerSuccessCriteria: '1. 关键业务指标提升15%以上；2. 员工工作效率提升25%；3. 客户满意度保持在4.0以上',
        risks: [
            {
                type: 'high_expectations',
                description: '客户对产品功能期待值过高，可能导致满意度下降'
            },
            {
                type: 'tight_schedule',
                description: '客户要求快速上线，时间压力较大'
            }
        ],
        opportunities: [
            {
                type: 'version_upgrade',
                description: '客户对高级功能感兴趣，有升级潜力'
            },
            {
                type: 'new_modules',
                description: '客户提到可能需要采购额外的数据分析模块'
            }
        ]
    },
    {
        id: '4',
        handoverNumber: 'HO-2024-004',
        customerId: 'CUST-0005',
        contractId: 'contract_007',
        contractNumber: 'CONT-2023-089',
        customerName: '杭州互联网科技有限公司',
        handoverStatus: 'pending_implementation',
        riskLevel: 'low',
        hasHandoverDocument: true,
        hasRiskAlert: false,
        stakeholderCount: 4,
        expectationAlignment: 'aligned',
        handoverRating: 4.2,
        handoverComment: '客户满意度较高，服务响应及时',
        createdAt: '2024-01-09 16:00:00',
        updatedAt: '2024-01-16 10:30:00',
        salesCreatedAt: '2024-01-04 13:20:00',
        crmData: {
            ...mockCRMSyncData,
            accountCount: 35,
            salesSource: 'direct',
            salesPerson: '张销售',
            purchasedProducts: getPurchasedProductsByPlatform('CUST-0005')
        },
        stakeholders: [
            {
                id: '9',
                name: '郑十一',
                position: '技术总监',
                role: 'decision_maker',
                contact: 'zhengshiyi@company.com',
                status: 'active'
            },
            {
                id: '10',
                name: '王十二',
                position: '产品经理',
                role: 'user',
                contact: 'wangshier@company.com',
                status: 'active'
            }
        ],
        onboardingTasks: mockOnboardingTasks,
        internalComments: mockInternalComments,
        corePainPoints: '1. 客户服务响应速度慢，影响用户体验；2. 数据分析能力不足，无法支撑决策；3. 系统集成度低，操作繁琐；4. 缺乏有效的用户行为分析工具',
        shortTermExpectation: '1. 系统稳定上线运行；2. 核心用户快速上手；3. 基础数据完整迁移',
        longTermExpectation: '1. 全面提升客户服务质量；2. 实现精细化运营管理；3. 支持业务创新发展',
        unacceptableSituations: '1. 系统不稳定影响业务；2. 学习成本过高；3. 无法满足个性化需求',
        customerSuccessCriteria: '1. 系统可用性达到99.5%；2. 用户活跃度达到85%；3. 客户服务效率提升20%',
        risks: [
            {
                type: 'high_expectations',
                description: '系统集成复杂度较高，可能影响上线时间'
            },
            {
                type: 'unclear_needs',
                description: '用户对新系统接受度需要时间培养'
            }
        ],
        opportunities: [
            {
                type: 'version_upgrade',
                description: '客户服务流程优化有很大提升空间'
            },
            {
                type: 'new_modules',
                description: '数据分析能力提升可以带来更多商业价值'
            }
        ]
    },
    {
        id: '5',
        handoverNumber: 'HO-2024-005',
        customerId: 'CUST-0006',
        contractId: 'contract_009',
        contractNumber: 'CONT-2024-010',
        customerName: '成都软件开发有限公司',
        handoverStatus: 'pending_handover',
        riskLevel: 'medium',
        hasHandoverDocument: false,
        hasRiskAlert: true,
        stakeholderCount: 6,
        expectationAlignment: 'partially_aligned',
        handoverRating: 3.6,
        handoverComment: '需要加强技术支持和培训',
        createdAt: '2024-01-11 11:00:00',
        updatedAt: '2024-01-17 14:15:00',
        salesCreatedAt: '2024-01-06 15:30:00',
        crmData: {
            ...mockCRMSyncData,
            accountCount: 45,
            salesSource: 'channel',
            channelPartner: '成都渠道合作伙伴有限公司',
            purchasedProducts: getPurchasedProductsByPlatform('CUST-0006')
        },
        stakeholders: [
            {
                id: '11',
                name: '李十三',
                position: '技术总监',
                role: 'decision_maker',
                contact: 'lishisan@company.com',
                status: 'active'
            },
            {
                id: '12',
                name: '刘十四',
                position: '项目经理',
                role: 'influencer',
                contact: 'liushisi@company.com',
                status: 'active'
            }
        ],
        onboardingTasks: mockOnboardingTasks,
        internalComments: mockInternalComments,
        corePainPoints: '1. 团队技术能力参差不齐，培训需求多样化；2. 现有知识管理混乱，查找困难；3. 缺乏系统化的学习路径；4. 员工学习积极性不高，需要激励机制',
        shortTermExpectation: '1. 完成团队培训；2. 建立使用规范；3. 实现基本功能应用',
        longTermExpectation: '1. 打造学习型组织；2. 实现知识管理体系化；3. 提升企业竞争力',
        unacceptableSituations: '1. 培训效果不达标；2. 系统操作复杂；3. 技术支持响应慢',
        customerSuccessCriteria: '1. 培训覆盖率100%；2. 系统使用满意度4.5分以上；3. 业务流程优化效果明显',
        risks: [
            {
                type: 'tight_schedule',
                description: '团队技术能力参差不齐，培训周期可能延长'
            },
            {
                type: 'unclear_needs',
                description: '学习积极性不高，需要建立有效激励机制'
            }
        ],
        opportunities: [
            {
                type: 'account_expansion',
                description: '培训效果好可以推广到更多部门'
            },
            {
                type: 'long_term',
                description: '建立学习型组织有助于长期合作'
            }
        ]
    },
    {
        id: '6',
        handoverNumber: 'HO-2024-006',
        customerId: 'CUST-0010',
        contractId: 'contract_010',
        contractNumber: 'CONT-2024-015',
        customerName: '西安航空航天有限公司',
        handoverStatus: 'implementation_in_progress',
        riskLevel: 'low',
        hasHandoverDocument: true,
        hasRiskAlert: false,
        stakeholderCount: 6,
        expectationAlignment: 'aligned',
        handoverRating: 4.3,
        handoverComment: '客户技术实力强，配合度高',
        createdAt: '2024-01-08 13:20:00',
        updatedAt: '2024-01-25 12:45:00',
        salesCreatedAt: '2024-01-05 16:30:00',
        crmData: {
            ...mockCRMSyncData,
            contractAmount: 1100000,
            accountCount: 120,
            salesSource: 'direct',
            salesPerson: '郑销售',
            purchasedProducts: getPurchasedProductsByPlatform('CUST-0010')
        },
        stakeholders: [
            {
                id: '16',
                name: '张航空',
                position: '技术总监',
                role: 'decision_maker',
                contact: 'zhanghangkong@xaero.com',
                status: 'active'
            },
            {
                id: '17',
                name: '李航天',
                position: '项目经理',
                role: 'user',
                contact: 'lihangtian@xaero.com',
                status: 'active'
            },
            {
                id: '18',
                name: '王工程',
                position: '系统工程师',
                role: 'technical_contact',
                contact: 'wanggongcheng@xaero.com',
                status: 'active'
            }
        ],
        onboardingTasks: mockOnboardingTasks,
        internalComments: mockInternalComments,
        corePainPoints: '1. 航空航天行业对系统稳定性要求极高；2. 需要满足严格的安全合规要求；3. 技术团队对新系统接受度需要时间；4. 现有流程复杂，需要定制化配置',
        shortTermExpectation: '1. 系统稳定上线运行；2. 满足行业合规要求；3. 核心团队熟练掌握系统操作',
        longTermExpectation: '1. 提升研发效率和质量；2. 建立标准化的项目管理流程；3. 支撑企业数字化转型',
        unacceptableSituations: '1. 系统安全漏洞；2. 影响关键项目进度；3. 不符合行业标准要求',
        customerSuccessCriteria: '1. 系统安全性达到军工级标准；2. 项目管理效率提升25%；3. 用户满意度达到4.5分以上',
        risks: [
            {
                type: 'high_expectations',
                description: '航空航天行业对系统稳定性要求极高'
            },
            {
                type: 'tight_schedule',
                description: '严格的安全合规要求可能影响实施进度'
            }
        ],
        opportunities: [
            {
                type: 'referrals',
                description: '航空航天行业标杆客户，有转介绍潜力'
            },
            {
                type: 'version_upgrade',
                description: '定制化需求可能带来高级版本升级机会'
            }
        ]
    },
    {
        id: '7',
        handoverNumber: 'HO-2024-007',
        customerId: 'CUST-0004',
        contractId: 'contract_006',
        contractNumber: 'CONT-2023-120',
        customerName: '广州数字化企业服务有限公司',
        handoverStatus: 'implementation_in_progress',
        riskLevel: 'low',
        hasHandoverDocument: true,
        hasRiskAlert: false,
        stakeholderCount: 8,
        expectationAlignment: 'aligned',
        handoverRating: 4.8,
        handoverComment: '客户对服务非常满意，续约意愿强烈',
        createdAt: '2024-01-07 13:00:00',
        updatedAt: '2024-01-18 09:45:00',
        salesCreatedAt: '2024-01-02 10:15:00',
        crmData: {
            ...mockCRMSyncData,
            accountCount: 80,
            salesSource: 'direct',
            salesPerson: '陈销售',
            purchasedProducts: getPurchasedProductsByPlatform('CUST-0004')
        },
        stakeholders: [
            {
                id: '13',
                name: '黄十五',
                position: '技术总监',
                role: 'decision_maker',
                contact: 'huangshiwu@company.com',
                status: 'active'
            },
            {
                id: '14',
                name: '赵十六',
                position: '产品经理',
                role: 'user',
                contact: 'zhaoshiliu@company.com',
                status: 'active'
            },
            {
                id: '15',
                name: '孙十七',
                position: '运维工程师',
                role: 'technical_contact',
                contact: 'sunshiqi@company.com',
                status: 'active'
            }
        ],
        onboardingTasks: mockOnboardingTasks,
        internalComments: mockInternalComments,
        corePainPoints: '1. 数字化转型进度缓慢，竞争优势不明显；2. 各部门协作效率低，信息传递不畅；3. 客户需求响应速度慢；4. 缺乏数据驱动的业务优化能力',
        shortTermExpectation: '1. 快速实现投资回报；2. 团队高效协作；3. 客户满意度提升',
        longTermExpectation: '1. 成为数字化转型典范；2. 实现可持续发展；3. 建立行业领先优势',
        unacceptableSituations: '1. 投资回报周期过长；2. 员工适应困难；3. 服务质量下降',
        customerSuccessCriteria: '1. ROI在12个月内实现；2. 员工满意度保持4.8分以上；3. 客户续约率达到95%以上',
        risks: [
            {
                type: 'leadership',
                description: '数字化转型需要高层持续支持和推动'
            },
            {
                type: 'other_risks',
                description: '各部门协作效率提升需要时间磨合'
            }
        ],
        opportunities: [
            {
                type: 'account_expansion',
                description: '数字化转型成功可推广到集团其他公司'
            },
            {
                type: 'long_term',
                description: '客户满意度高，续约意愿强烈'
            }
        ]
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
"src/mock/renewalData.ts": function (module, exports, __mako_require__){
// 续约管理专用mock数据
// 确保与交接实施、持续服务的客户数据不重复
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
    default: function() {
        return _default;
    },
    renewalContracts: function() {
        return renewalContracts;
    },
    renewalCustomers: function() {
        return renewalCustomers;
    },
    renewalRiskAnalysis: function() {
        return renewalRiskAnalysis;
    },
    renewalStats: function() {
        return renewalStats;
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
const renewalCustomers = [
    {
        id: 'CUST-0001',
        name: '深圳创新医疗科技有限公司',
        industry: '医疗健康',
        size: 'large',
        csm: '王芳',
        region: '华南',
        arr: 800000,
        healthScore: 75,
        healthLevel: '一般',
        lifecycleStage: '成熟期',
        tier: 'A',
        contractEndDate: '2024-03-31',
        daysToExpiry: 45,
        renewalProbability: 70,
        renewalStage: '沟通中',
        lastContactDate: '2024-01-15',
        nextActionDate: '2024-01-25',
        riskFactors: [
            '预算压缩',
            '新竞品出现'
        ],
        opportunities: [
            '扩展到子公司',
            '增加培训服务'
        ],
        currentContractValue: 800000,
        proposedRenewalValue: 900000,
        renewalType: '扩容续约',
        keyStakeholders: [
            {
                name: '李总',
                role: 'CEO',
                influence: 'high',
                attitude: 'supporter'
            },
            {
                name: '张经理',
                role: 'IT总监',
                influence: 'high',
                attitude: 'neutral'
            },
            {
                name: '王主管',
                role: '采购主管',
                influence: 'medium',
                attitude: 'detractor'
            }
        ],
        competitorThreat: 'medium',
        renewalNotes: '客户对产品满意，但对价格敏感，需要展示更多ROI价值',
        tags: [
            '重点客户',
            '价格敏感',
            '扩容机会'
        ]
    },
    {
        id: 'CUST-0002',
        name: '上海智能制造集团',
        industry: '制造业',
        size: 'xlarge',
        csm: '李明',
        region: '华东',
        arr: 800000,
        healthScore: 72,
        healthLevel: '一般',
        lifecycleStage: '成熟期',
        tier: 'S',
        contractEndDate: '2024-03-15',
        daysToExpiry: 30,
        renewalProbability: 75,
        renewalStage: '方案制定',
        lastContactDate: '2024-01-18',
        nextActionDate: '2024-01-28',
        riskFactors: [
            '预算压缩'
        ],
        opportunities: [
            '多工厂部署',
            '高级功能模块'
        ],
        currentContractValue: 800000,
        proposedRenewalValue: 900000,
        renewalType: '扩容续约',
        keyStakeholders: [
            {
                name: '陈董事长',
                role: '董事长',
                influence: 'high',
                attitude: 'supporter'
            },
            {
                name: '刘副总',
                role: '副总经理',
                influence: 'high',
                attitude: 'supporter'
            },
            {
                name: '赵总监',
                role: '信息化总监',
                influence: 'medium',
                attitude: 'supporter'
            }
        ],
        competitorThreat: 'low',
        renewalNotes: '制造业标杆客户，满意度较高，有扩容需求但对价格敏感',
        tags: [
            '制造业',
            '扩容机会',
            '价格敏感'
        ]
    },
    {
        id: 'CUST-0003',
        name: '杭州电商科技有限公司',
        industry: '电子商务',
        size: 'medium',
        csm: '张伟',
        region: '华东',
        arr: 450000,
        healthScore: 60,
        healthLevel: '风险',
        lifecycleStage: '衰退期',
        tier: 'B',
        contractEndDate: '2024-02-28',
        daysToExpiry: 15,
        renewalProbability: 40,
        renewalStage: '商务谈判',
        lastContactDate: '2024-01-20',
        nextActionDate: '2024-01-22',
        riskFactors: [
            '使用率下降',
            '关键联系人离职',
            '业务调整'
        ],
        opportunities: [
            '降级续约保留',
            '重新培训激活'
        ],
        currentContractValue: 450000,
        proposedRenewalValue: 300000,
        renewalType: '降级续约',
        keyStakeholders: [
            {
                name: '新任CTO',
                role: 'CTO',
                influence: 'high',
                attitude: 'neutral'
            },
            {
                name: '财务总监',
                role: 'CFO',
                influence: 'high',
                attitude: 'detractor'
            }
        ],
        competitorThreat: 'high',
        renewalNotes: '客户业务调整，预算收紧，需要紧急挽回措施',
        tags: [
            '流失风险',
            '紧急处理',
            '降级续约'
        ]
    },
    {
        id: 'CUST-0004',
        name: '成都金融服务公司',
        industry: '金融服务',
        size: 'large',
        csm: '赵六',
        region: '西南',
        arr: 600000,
        healthScore: 80,
        healthLevel: '健康',
        lifecycleStage: '成熟期',
        tier: 'A',
        contractEndDate: '2024-05-20',
        daysToExpiry: 95,
        renewalProbability: 85,
        renewalStage: '未开始',
        lastContactDate: '2024-01-10',
        nextActionDate: '2024-02-01',
        riskFactors: [],
        opportunities: [
            '合规模块升级',
            '多部门推广'
        ],
        currentContractValue: 600000,
        proposedRenewalValue: 750000,
        renewalType: '扩容续约',
        keyStakeholders: [
            {
                name: '王行长',
                role: '行长',
                influence: 'high',
                attitude: 'supporter'
            },
            {
                name: '李副行长',
                role: '副行长',
                influence: 'high',
                attitude: 'supporter'
            }
        ],
        competitorThreat: 'none',
        renewalNotes: '客户满意度高，有明确的扩容计划',
        tags: [
            '优质客户',
            '扩容潜力',
            '合规需求'
        ]
    },
    {
        id: 'CUST-0005',
        name: '北京教育科技集团',
        industry: '教育培训',
        size: 'large',
        csm: '钱七',
        region: '华北',
        arr: 550000,
        healthScore: 70,
        healthLevel: '一般',
        lifecycleStage: '成熟期',
        tier: 'A',
        contractEndDate: '2024-06-30',
        daysToExpiry: 135,
        renewalProbability: 75,
        renewalStage: '未开始',
        lastContactDate: '2024-01-08',
        nextActionDate: '2024-02-15',
        riskFactors: [
            '行业政策变化'
        ],
        opportunities: [
            '在线教育模块',
            '学员管理系统'
        ],
        currentContractValue: 550000,
        proposedRenewalValue: 650000,
        renewalType: '扩容续约',
        keyStakeholders: [
            {
                name: '校长',
                role: '校长',
                influence: 'high',
                attitude: 'supporter'
            },
            {
                name: '教务主任',
                role: '教务主任',
                influence: 'medium',
                attitude: 'neutral'
            }
        ],
        competitorThreat: 'low',
        renewalNotes: '教育行业客户，对产品依赖度高，续约意愿强',
        tags: [
            '教育行业',
            '政策敏感',
            '扩容机会'
        ]
    }
];
const renewalContracts = [
    {
        id: 'RENEWAL_CONTRACT_001',
        customerId: 'CUST-0001',
        contractNumber: 'RENEW-CONT-2024-001',
        currentValue: 800000,
        proposedValue: 900000,
        startDate: '2023-04-01',
        endDate: '2024-03-31',
        renewalStartDate: '2024-01-01',
        status: 'pending_renewal',
        products: [
            '企微版',
            '高级分析模块'
        ],
        accountCount: 80,
        renewalHistory: [
            {
                year: '2023',
                value: 800000,
                status: 'renewed',
                notes: '首次续约，增加了分析模块'
            },
            {
                year: '2022',
                value: 600000,
                status: 'renewed',
                notes: '标准续约'
            }
        ]
    },
    {
        id: 'RENEWAL_CONTRACT_002',
        customerId: 'CUST-0002',
        contractNumber: 'RENEW-CONT-2024-002',
        currentValue: 1200000,
        proposedValue: 1500000,
        startDate: '2023-04-16',
        endDate: '2024-04-15',
        renewalStartDate: '2024-01-16',
        status: 'pending_renewal',
        products: [
            'D-learning',
            '定制模块',
            '高级支持'
        ],
        accountCount: 150,
        renewalHistory: [
            {
                year: '2023',
                value: 1200000,
                status: 'upgraded',
                notes: '大幅扩容，增加定制功能'
            },
            {
                year: '2022',
                value: 800000,
                status: 'renewed',
                notes: '标准续约'
            }
        ]
    },
    {
        id: 'RENEWAL_CONTRACT_003',
        customerId: 'CUST-0003',
        contractNumber: 'RENEW-CONT-2024-003',
        currentValue: 450000,
        proposedValue: 300000,
        startDate: '2023-03-01',
        endDate: '2024-02-28',
        renewalStartDate: '2023-12-01',
        status: 'pending_renewal',
        products: [
            '直营-极简版'
        ],
        accountCount: 45,
        renewalHistory: [
            {
                year: '2023',
                value: 450000,
                status: 'renewed',
                notes: '标准续约'
            },
            {
                year: '2022',
                value: 400000,
                status: 'renewed',
                notes: '小幅增长'
            }
        ]
    },
    {
        id: 'RENEWAL_CONTRACT_004',
        customerId: 'CUST-0004',
        contractNumber: 'RENEW-CONT-2024-004',
        currentValue: 600000,
        proposedValue: 750000,
        startDate: '2023-05-21',
        endDate: '2024-05-20',
        renewalStartDate: '2024-02-21',
        status: 'active',
        products: [
            '企微版',
            '合规模块'
        ],
        accountCount: 60,
        renewalHistory: [
            {
                year: '2023',
                value: 600000,
                status: 'renewed',
                notes: '增加合规模块'
            },
            {
                year: '2022',
                value: 500000,
                status: 'renewed',
                notes: '标准续约'
            }
        ]
    },
    {
        id: 'RENEWAL_CONTRACT_005',
        customerId: 'CUST-0005',
        contractNumber: 'RENEW-CONT-2024-005',
        currentValue: 550000,
        proposedValue: 650000,
        startDate: '2023-07-01',
        endDate: '2024-06-30',
        renewalStartDate: '2024-04-01',
        status: 'active',
        products: [
            'D-learning',
            '学员管理系统'
        ],
        accountCount: 55,
        renewalHistory: [
            {
                year: '2023',
                value: 550000,
                status: 'renewed',
                notes: '增加学员管理功能'
            },
            {
                year: '2022',
                value: 450000,
                status: 'renewed',
                notes: '标准续约'
            }
        ]
    }
];
const renewalStats = {
    totalCustomers: renewalCustomers.length,
    totalARR: renewalCustomers.reduce((sum, customer)=>sum + customer.arr, 0),
    averageHealthScore: Math.round(renewalCustomers.reduce((sum, customer)=>sum + customer.healthScore, 0) / renewalCustomers.length),
    renewalStageDistribution: {
        '未开始': renewalCustomers.filter((c)=>c.renewalStage === '未开始').length,
        '沟通中': renewalCustomers.filter((c)=>c.renewalStage === '沟通中').length,
        '方案制定': renewalCustomers.filter((c)=>c.renewalStage === '方案制定').length,
        '商务谈判': renewalCustomers.filter((c)=>c.renewalStage === '商务谈判').length,
        '合同签署': renewalCustomers.filter((c)=>c.renewalStage === '合同签署').length,
        '已完成': renewalCustomers.filter((c)=>c.renewalStage === '已完成').length,
        '已流失': renewalCustomers.filter((c)=>c.renewalStage === '已流失').length
    },
    healthDistribution: {
        '健康': renewalCustomers.filter((c)=>c.healthLevel === '健康').length,
        '一般': renewalCustomers.filter((c)=>c.healthLevel === '一般').length,
        '风险': renewalCustomers.filter((c)=>c.healthLevel === '风险').length
    },
    tierDistribution: {
        'S': renewalCustomers.filter((c)=>c.tier === 'S').length,
        'A': renewalCustomers.filter((c)=>c.tier === 'A').length,
        'B': renewalCustomers.filter((c)=>c.tier === 'B').length,
        'C': renewalCustomers.filter((c)=>c.tier === 'C').length
    },
    renewalTypeDistribution: {
        '标准续约': renewalCustomers.filter((c)=>c.renewalType === '标准续约').length,
        '扩容续约': renewalCustomers.filter((c)=>c.renewalType === '扩容续约').length,
        '降级续约': renewalCustomers.filter((c)=>c.renewalType === '降级续约').length
    }
};
const renewalRiskAnalysis = {
    highRiskCustomers: renewalCustomers.filter((c)=>c.renewalProbability < 50),
    mediumRiskCustomers: renewalCustomers.filter((c)=>c.renewalProbability >= 50 && c.renewalProbability < 80),
    lowRiskCustomers: renewalCustomers.filter((c)=>c.renewalProbability >= 80),
    urgentActions: renewalCustomers.filter((c)=>c.daysToExpiry <= 30),
    competitorThreats: renewalCustomers.filter((c)=>c.competitorThreat === 'high' || c.competitorThreat === 'medium')
};
var _default = {
    renewalCustomers,
    renewalContracts,
    renewalStats,
    renewalRiskAnalysis
};
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
"src/types/customerProfile.ts": function (module, exports, __mako_require__){
// 生命周期阶段
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
    CUSTOMER_SCALE_CONFIG: function() {
        return CUSTOMER_SCALE_CONFIG;
    },
    CUSTOMER_TIER_CONFIG: function() {
        return CUSTOMER_TIER_CONFIG;
    },
    HEALTH_LEVEL_CONFIG: function() {
        return HEALTH_LEVEL_CONFIG;
    },
    LIFECYCLE_STAGE_CONFIG: function() {
        return LIFECYCLE_STAGE_CONFIG;
    },
    getCustomerScaleByARR: function() {
        return getCustomerScaleByARR;
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
const LIFECYCLE_STAGE_CONFIG = {
    handover_implementation: {
        text: '交接实施',
        color: 'blue'
    },
    continuous_service: {
        text: '持续服务',
        color: 'green'
    },
    renewal_management: {
        text: '续约管理',
        color: 'orange'
    },
    recall_incubation: {
        text: '召回孵化',
        color: 'purple'
    }
};
const HEALTH_LEVEL_CONFIG = {
    healthy: {
        text: '健康',
        color: 'green'
    },
    warning: {
        text: '一般',
        color: 'orange'
    },
    risk: {
        text: '风险',
        color: 'red'
    }
};
const CUSTOMER_TIER_CONFIG = {
    S: {
        text: 'S级',
        color: 'gold'
    },
    A: {
        text: 'A级',
        color: 'blue'
    },
    B: {
        text: 'B级',
        color: 'green'
    },
    C: {
        text: 'C级',
        color: 'default'
    }
};
const CUSTOMER_SCALE_CONFIG = {
    key_account: {
        text: '重点客户',
        color: 'gold',
        description: '高价值客户'
    },
    mid_market: {
        text: '中端客户',
        color: 'blue',
        description: '中等价值客户'
    },
    smb: {
        text: '小微客户',
        color: 'green',
        description: '小微企业客户'
    }
};
const getCustomerScaleByARR = (arr)=>{
    if (arr >= 500000) return 'key_account';
    else if (arr >= 100000) return 'mid_market';
    else return 'smb';
};
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
//# sourceMappingURL=common-async.js.map