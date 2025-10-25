((typeof globalThis !== 'undefined' ? globalThis : self)["makoChunk_ant-design-pro"] = (typeof globalThis !== 'undefined' ? globalThis : self)["makoChunk_ant-design-pro"] || []).push([
        ['p__user__login__index'],
{ "src/pages/user/login/index.tsx": function (module, exports, __mako_require__){
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
var _icons = __mako_require__("node_modules/@ant-design/icons/es/index.js");
var _procomponents = __mako_require__("node_modules/@ant-design/pro-components/es/index.js");
var _max = __mako_require__("src/.umi/exports.ts");
var _antd = __mako_require__("node_modules/antd/es/index.js");
var _antdstyle = __mako_require__("node_modules/antd-style/es/index.js");
var _react = /*#__PURE__*/ _interop_require_wildcard._(__mako_require__("node_modules/react/index.js"));
var _reactdom = __mako_require__("node_modules/react-dom/index.js");
var _components = __mako_require__("src/components/index.ts");
var _api = __mako_require__("src/services/ant-design-pro/api.ts");
var _login = __mako_require__("src/services/ant-design-pro/login.ts");
var _defaultSettings = /*#__PURE__*/ _interop_require_default._(__mako_require__("config/defaultSettings.ts"));
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
var _s = $RefreshSig$();
const useStyles = (0, _antdstyle.createStyles)(({ token })=>{
    return {
        container: {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'auto',
            backgroundImage: "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
            backgroundSize: '100% 100%'
        }
    };
});
// 删除其他登录方式图标组件
// 删除语言切换组件
const LoginMessage = ({ content })=>{
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Alert, {
        style: {
            marginBottom: 24
        },
        message: content,
        type: "error",
        showIcon: true
    }, void 0, false, {
        fileName: "src/pages/user/login/index.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
};
_c = LoginMessage;
const Login = ()=>{
    _s();
    const [userLoginState, setUserLoginState] = (0, _react.useState)({});
    const [type, setType] = (0, _react.useState)('dingtalk');
    const [qrCodeValue, setQrCodeValue] = (0, _react.useState)('');
    const [scanStatus, setScanStatus] = (0, _react.useState)('waiting');
    const { initialState, setInitialState } = (0, _max.useModel)('@@initialState');
    const { styles } = useStyles();
    const { message } = _antd.App.useApp();
    const intl = (0, _max.useIntl)();
    // 生成钉钉扫码登录二维码
    (0, _react.useEffect)(()=>{
        if (type === 'dingtalk') {
            // 生成二维码内容
            setQrCodeValue(`dingtalk://login?token=${Date.now()}`);
            setScanStatus('waiting');
        }
    }, [
        type
    ]);
    const handleDingTalkLogin = async ()=>{
        try {
            // 模拟钉钉登录成功
            message.success('钉钉扫码登录成功！');
            // 设置用户信息
            const mockUser = {
                name: '钉钉用户',
                avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
                userid: 'dingtalk_user_001',
                email: 'user@dingtalk.com'
            };
            (0, _reactdom.flushSync)(()=>{
                setInitialState((s)=>({
                        ...s,
                        currentUser: mockUser
                    }));
            });
            // 跳转到主页面
            const urlParams = new URLSearchParams(_max.history.location.search);
            _max.history.push(urlParams.get('redirect') || '/dashboard/work');
        } catch (error) {
            message.error('钉钉登录失败，请重试！');
        }
    };
    const fetchUserInfo = async ()=>{
        var _initialState_fetchUserInfo;
        const userInfo = await (initialState === null || initialState === void 0 ? void 0 : (_initialState_fetchUserInfo = initialState.fetchUserInfo) === null || _initialState_fetchUserInfo === void 0 ? void 0 : _initialState_fetchUserInfo.call(initialState));
        if (userInfo) (0, _reactdom.flushSync)(()=>{
            setInitialState((s)=>({
                    ...s,
                    currentUser: userInfo
                }));
        });
    };
    const handleSubmit = async (values)=>{
        try {
            // 登录
            const msg = await (0, _api.login)({
                ...values,
                type
            });
            if (msg.status === 'ok') {
                const defaultLoginSuccessMessage = intl.formatMessage({
                    id: 'pages.login.success',
                    defaultMessage: '登录成功！'
                });
                message.success(defaultLoginSuccessMessage);
                await fetchUserInfo();
                const urlParams = new URLSearchParams(_max.history.location.search);
                _max.history.push(urlParams.get('redirect') || '/dashboard/work');
                return;
            }
            console.log(msg);
            // 如果失败去设置用户错误信息
            setUserLoginState(msg);
        } catch (error) {
            const defaultLoginFailureMessage = intl.formatMessage({
                id: 'pages.login.failure',
                defaultMessage: '登录失败，请重试！'
            });
            console.log(error);
            message.error(defaultLoginFailureMessage);
        }
    };
    const { status, type: loginType } = userLoginState;
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        className: styles.container,
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_max.Helmet, {
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("title", {
                    children: [
                        intl.formatMessage({
                            id: 'menu.login',
                            defaultMessage: '登录页'
                        }),
                        _defaultSettings.default.title && ` - ${_defaultSettings.default.title}`
                    ]
                }, void 0, true, {
                    fileName: "src/pages/user/login/index.tsx",
                    lineNumber: 154,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/pages/user/login/index.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                style: {
                    flex: '1',
                    padding: '32px 0'
                },
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_procomponents.LoginForm, {
                    contentStyle: {
                        minWidth: 280,
                        maxWidth: '75vw'
                    },
                    logo: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("img", {
                        alt: "logo",
                        src: typeof window !== 'undefined' && window.publicPath ? `${window.publicPath}soke.svg` : './soke.svg'
                    }, void 0, false, {
                        fileName: "src/pages/user/login/index.tsx",
                        lineNumber: 174,
                        columnNumber: 17
                    }, void 0),
                    title: "智能驻场",
                    subTitle: intl.formatMessage({
                        id: 'pages.layouts.userLayout.title'
                    }),
                    initialValues: {
                        autoLogin: true
                    },
                    actions: [],
                    onFinish: async (values)=>{
                        await handleSubmit(values);
                    },
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Tabs, {
                            activeKey: type,
                            onChange: setType,
                            centered: true,
                            items: [
                                {
                                    key: 'dingtalk',
                                    label: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DingdingOutlined, {}, void 0, false, {
                                                fileName: "src/pages/user/login/index.tsx",
                                                lineNumber: 196,
                                                columnNumber: 21
                                            }, void 0),
                                            "钉钉扫码登录"
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/user/login/index.tsx",
                                        lineNumber: 195,
                                        columnNumber: 19
                                    }, void 0)
                                },
                                {
                                    key: 'account',
                                    label: intl.formatMessage({
                                        id: 'pages.login.accountLogin.tab',
                                        defaultMessage: '账户密码登录'
                                    })
                                },
                                {
                                    key: 'mobile',
                                    label: intl.formatMessage({
                                        id: 'pages.login.phoneLogin.tab',
                                        defaultMessage: '手机号登录'
                                    })
                                }
                            ]
                        }, void 0, false, {
                            fileName: "src/pages/user/login/index.tsx",
                            lineNumber: 187,
                            columnNumber: 11
                        }, this),
                        type === 'dingtalk' && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                textAlign: 'center',
                                padding: '20px 0'
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        marginBottom: 16,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    },
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.QRCode, {
                                        value: qrCodeValue,
                                        size: 200,
                                        status: scanStatus === 'waiting' ? 'active' : scanStatus === 'scanned' ? 'loading' : 'expired'
                                    }, void 0, false, {
                                        fileName: "src/pages/user/login/index.tsx",
                                        lineNumber: 227,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/pages/user/login/index.tsx",
                                    lineNumber: 221,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        color: '#666',
                                        fontSize: 14,
                                        marginBottom: 20
                                    },
                                    children: [
                                        scanStatus === 'waiting' && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_jsxdevruntime.Fragment, {
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.QrcodeOutlined, {
                                                    style: {
                                                        marginRight: 8
                                                    }
                                                }, void 0, false, {
                                                    fileName: "src/pages/user/login/index.tsx",
                                                    lineNumber: 236,
                                                    columnNumber: 21
                                                }, this),
                                                "请使用钉钉扫描二维码登录"
                                            ]
                                        }, void 0, true),
                                        scanStatus === 'scanned' && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_jsxdevruntime.Fragment, {
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DingdingOutlined, {
                                                    style: {
                                                        marginRight: 8,
                                                        color: '#1890ff'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "src/pages/user/login/index.tsx",
                                                    lineNumber: 242,
                                                    columnNumber: 21
                                                }, this),
                                                "扫描成功，请在手机上确认登录"
                                            ]
                                        }, void 0, true),
                                        scanStatus === 'confirmed' && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_jsxdevruntime.Fragment, {
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.DingdingOutlined, {
                                                    style: {
                                                        marginRight: 8,
                                                        color: '#52c41a'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "src/pages/user/login/index.tsx",
                                                    lineNumber: 248,
                                                    columnNumber: 21
                                                }, this),
                                                "登录确认中..."
                                            ]
                                        }, void 0, true)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/pages/user/login/index.tsx",
                                    lineNumber: 233,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Space, {
                                    direction: "vertical",
                                    size: "middle",
                                    style: {
                                        width: '100%'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                            type: "primary",
                                            size: "large",
                                            block: true,
                                            onClick: handleDingTalkLogin,
                                            style: {
                                                borderRadius: '6px'
                                            },
                                            children: "钉钉登录"
                                        }, void 0, false, {
                                            fileName: "src/pages/user/login/index.tsx",
                                            lineNumber: 256,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Divider, {
                                            children: "或"
                                        }, void 0, false, {
                                            fileName: "src/pages/user/login/index.tsx",
                                            lineNumber: 266,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_antd.Button, {
                                            type: "link",
                                            onClick: ()=>setType('account'),
                                            style: {
                                                color: '#1890ff'
                                            },
                                            children: "使用账号密码登录"
                                        }, void 0, false, {
                                            fileName: "src/pages/user/login/index.tsx",
                                            lineNumber: 268,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/pages/user/login/index.tsx",
                                    lineNumber: 255,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/pages/user/login/index.tsx",
                            lineNumber: 220,
                            columnNumber: 13
                        }, this),
                        status === 'error' && loginType === 'account' && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(LoginMessage, {
                            content: intl.formatMessage({
                                id: 'pages.login.accountLogin.errorMessage',
                                defaultMessage: '账户或密码错误(admin/ant.design)'
                            })
                        }, void 0, false, {
                            fileName: "src/pages/user/login/index.tsx",
                            lineNumber: 280,
                            columnNumber: 13
                        }, this),
                        type === 'account' && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_jsxdevruntime.Fragment, {
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_procomponents.ProFormText, {
                                    name: "username",
                                    fieldProps: {
                                        size: 'large',
                                        prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.UserOutlined, {}, void 0, false, {
                                            fileName: "src/pages/user/login/index.tsx",
                                            lineNumber: 293,
                                            columnNumber: 27
                                        }, void 0)
                                    },
                                    placeholder: intl.formatMessage({
                                        id: 'pages.login.username.placeholder',
                                        defaultMessage: '用户名: admin or user'
                                    }),
                                    rules: [
                                        {
                                            required: true,
                                            message: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_max.FormattedMessage, {
                                                id: "pages.login.username.required",
                                                defaultMessage: "请输入用户名!"
                                            }, void 0, false, {
                                                fileName: "src/pages/user/login/index.tsx",
                                                lineNumber: 303,
                                                columnNumber: 23
                                            }, void 0)
                                        }
                                    ]
                                }, void 0, false, {
                                    fileName: "src/pages/user/login/index.tsx",
                                    lineNumber: 289,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_procomponents.ProFormText.Password, {
                                    name: "password",
                                    fieldProps: {
                                        size: 'large',
                                        prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.LockOutlined, {}, void 0, false, {
                                            fileName: "src/pages/user/login/index.tsx",
                                            lineNumber: 315,
                                            columnNumber: 27
                                        }, void 0)
                                    },
                                    placeholder: intl.formatMessage({
                                        id: 'pages.login.password.placeholder',
                                        defaultMessage: '密码: ant.design'
                                    }),
                                    rules: [
                                        {
                                            required: true,
                                            message: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_max.FormattedMessage, {
                                                id: "pages.login.password.required",
                                                defaultMessage: "请输入密码！"
                                            }, void 0, false, {
                                                fileName: "src/pages/user/login/index.tsx",
                                                lineNumber: 325,
                                                columnNumber: 23
                                            }, void 0)
                                        }
                                    ]
                                }, void 0, false, {
                                    fileName: "src/pages/user/login/index.tsx",
                                    lineNumber: 311,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true),
                        status === 'error' && loginType === 'mobile' && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(LoginMessage, {
                            content: "验证码错误"
                        }, void 0, false, {
                            fileName: "src/pages/user/login/index.tsx",
                            lineNumber: 337,
                            columnNumber: 13
                        }, this),
                        type === 'mobile' && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_jsxdevruntime.Fragment, {
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_procomponents.ProFormText, {
                                    fieldProps: {
                                        size: 'large',
                                        prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.MobileOutlined, {}, void 0, false, {
                                            fileName: "src/pages/user/login/index.tsx",
                                            lineNumber: 344,
                                            columnNumber: 27
                                        }, void 0)
                                    },
                                    name: "mobile",
                                    placeholder: intl.formatMessage({
                                        id: 'pages.login.phoneNumber.placeholder',
                                        defaultMessage: '手机号'
                                    }),
                                    rules: [
                                        {
                                            required: true,
                                            message: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_max.FormattedMessage, {
                                                id: "pages.login.phoneNumber.required",
                                                defaultMessage: "请输入手机号！"
                                            }, void 0, false, {
                                                fileName: "src/pages/user/login/index.tsx",
                                                lineNumber: 355,
                                                columnNumber: 23
                                            }, void 0)
                                        },
                                        {
                                            pattern: /^1\d{10}$/,
                                            message: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_max.FormattedMessage, {
                                                id: "pages.login.phoneNumber.invalid",
                                                defaultMessage: "手机号格式错误！"
                                            }, void 0, false, {
                                                fileName: "src/pages/user/login/index.tsx",
                                                lineNumber: 364,
                                                columnNumber: 23
                                            }, void 0)
                                        }
                                    ]
                                }, void 0, false, {
                                    fileName: "src/pages/user/login/index.tsx",
                                    lineNumber: 341,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_procomponents.ProFormCaptcha, {
                                    fieldProps: {
                                        size: 'large',
                                        prefix: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_icons.LockOutlined, {}, void 0, false, {
                                            fileName: "src/pages/user/login/index.tsx",
                                            lineNumber: 375,
                                            columnNumber: 27
                                        }, void 0)
                                    },
                                    captchaProps: {
                                        size: 'large'
                                    },
                                    placeholder: intl.formatMessage({
                                        id: 'pages.login.captcha.placeholder',
                                        defaultMessage: '请输入验证码'
                                    }),
                                    captchaTextRender: (timing, count)=>{
                                        if (timing) return `${count} ${intl.formatMessage({
                                            id: 'pages.getCaptchaSecondText',
                                            defaultMessage: '获取验证码'
                                        })}`;
                                        return intl.formatMessage({
                                            id: 'pages.login.phoneLogin.getVerificationCode',
                                            defaultMessage: '获取验证码'
                                        });
                                    },
                                    name: "captcha",
                                    rules: [
                                        {
                                            required: true,
                                            message: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_max.FormattedMessage, {
                                                id: "pages.login.captcha.required",
                                                defaultMessage: "请输入验证码！"
                                            }, void 0, false, {
                                                fileName: "src/pages/user/login/index.tsx",
                                                lineNumber: 401,
                                                columnNumber: 23
                                            }, void 0)
                                        }
                                    ],
                                    onGetCaptcha: async (phone)=>{
                                        const result = await (0, _login.getFakeCaptcha)({
                                            phone
                                        });
                                        if (!result) return;
                                        message.success('获取验证码成功！验证码为：1234');
                                    }
                                }, void 0, false, {
                                    fileName: "src/pages/user/login/index.tsx",
                                    lineNumber: 372,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                marginBottom: 24
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_procomponents.ProFormCheckbox, {
                                    noStyle: true,
                                    name: "autoLogin",
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_max.FormattedMessage, {
                                        id: "pages.login.rememberMe",
                                        defaultMessage: "自动登录"
                                    }, void 0, false, {
                                        fileName: "src/pages/user/login/index.tsx",
                                        lineNumber: 426,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/pages/user/login/index.tsx",
                                    lineNumber: 425,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("a", {
                                    style: {
                                        float: 'right'
                                    },
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_max.FormattedMessage, {
                                        id: "pages.login.forgotPassword",
                                        defaultMessage: "忘记密码"
                                    }, void 0, false, {
                                        fileName: "src/pages/user/login/index.tsx",
                                        lineNumber: 436,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/pages/user/login/index.tsx",
                                    lineNumber: 431,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/pages/user/login/index.tsx",
                            lineNumber: 420,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/pages/user/login/index.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/pages/user/login/index.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_components.Footer, {}, void 0, false, {
                fileName: "src/pages/user/login/index.tsx",
                lineNumber: 444,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/pages/user/login/index.tsx",
        lineNumber: 152,
        columnNumber: 5
    }, this);
};
_s(Login, "39fwRPVYcNT2S5kWUDJPFxK54d4=", false, function() {
    return [
        _max.useModel,
        useStyles,
        _antd.App.useApp,
        _max.useIntl
    ];
});
_c1 = Login;
var _default = Login;
var _c;
var _c1;
$RefreshReg$(_c, "LoginMessage");
$RefreshReg$(_c1, "Login");
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
"src/services/ant-design-pro/login.ts": function (module, exports, __mako_require__){
// @ts-ignore
/* eslint-disable */ "use strict";
__mako_require__.d(exports, "__esModule", {
    value: true
});
__mako_require__.d(exports, "getFakeCaptcha", {
    enumerable: true,
    get: function() {
        return getFakeCaptcha;
    }
});
var _interop_require_wildcard = __mako_require__("@swc/helpers/_/_interop_require_wildcard");
var _reactrefresh = /*#__PURE__*/ _interop_require_wildcard._(__mako_require__("node_modules/react-refresh/runtime.js"));
var _max = __mako_require__("src/.umi/exports.ts");
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
async function getFakeCaptcha(params, options) {
    return (0, _max.request)('/api/login/captcha', {
        method: 'GET',
        params: {
            ...params
        },
        ...options || {}
    });
}
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
//# sourceMappingURL=p__user__login__index-async.js.map