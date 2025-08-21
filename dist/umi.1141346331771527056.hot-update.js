globalThis.makoModuleHotUpdate('src/.umi/umi.ts?hmr', {
    modules: {
        "src/app.tsx": function(module, exports, __mako_require__) {
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
                getInitialState: function() {
                    return getInitialState;
                },
                layout: function() {
                    return layout;
                },
                request: function() {
                    return request;
                }
            });
            var _interop_require_default = __mako_require__("@swc/helpers/_/_interop_require_default");
            var _interop_require_wildcard = __mako_require__("@swc/helpers/_/_interop_require_wildcard");
            var _reactrefresh = /*#__PURE__*/ _interop_require_wildcard._(__mako_require__("node_modules/react-refresh/runtime.js"));
            var _jsxdevruntime = __mako_require__("node_modules/react/jsx-dev-runtime.js");
            var _max = __mako_require__("src/.umi/exports.ts");
            var _react = /*#__PURE__*/ _interop_require_default._(__mako_require__("node_modules/react/index.js"));
            var _components = __mako_require__("src/components/index.ts");
            var _api = __mako_require__("src/services/ant-design-pro/api.ts");
            var _defaultSettings = /*#__PURE__*/ _interop_require_default._(__mako_require__("config/defaultSettings.ts"));
            var _requestErrorConfig = __mako_require__("src/requestErrorConfig.ts");
            var _TabContext = __mako_require__("src/contexts/TabContext.tsx");
            var _TabBarWrapper = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/TabBar/TabBarWrapper.tsx"));
            var _env = __mako_require__("src/utils/env.ts");
            __mako_require__("node_modules/@ant-design/v5-patch-for-react-19/es/index.js");
            var prevRefreshReg;
            var prevRefreshSig;
            prevRefreshReg = self.$RefreshReg$;
            prevRefreshSig = self.$RefreshSig$;
            self.$RefreshReg$ = (type, id)=>{
                _reactrefresh.register(type, module.id + id);
            };
            self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
            const isDev = true;
            const loginPath = '/user/login';
            async function getInitialState() {
                const fetchUserInfo = async ()=>{
                    try {
                        const msg = await (0, _api.currentUser)({
                            skipErrorHandler: true
                        });
                        return msg.data;
                    } catch (_error) {
                        // 生产环境不跳转登录页面，直接返回Mock用户
                        if (_env.isProduction) return {
                            name: '管理员',
                            avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
                            userid: '00000001',
                            email: 'admin@example.com',
                            signature: '海纳百川，有容乃大',
                            title: '交互专家',
                            group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
                            tags: [
                                {
                                    key: '0',
                                    label: '很有想法的'
                                },
                                {
                                    key: '1',
                                    label: '专注设计'
                                },
                                {
                                    key: '2',
                                    label: '辣~'
                                },
                                {
                                    key: '3',
                                    label: '大长腿'
                                },
                                {
                                    key: '4',
                                    label: '川妹子'
                                },
                                {
                                    key: '5',
                                    label: '海纳百川'
                                }
                            ],
                            notifyCount: 12,
                            unreadCount: 11,
                            country: 'China',
                            access: 'admin',
                            geographic: {
                                province: {
                                    label: '浙江省',
                                    key: '330000'
                                },
                                city: {
                                    label: '杭州市',
                                    key: '330100'
                                }
                            },
                            address: '西湖区工专路 77 号',
                            phone: '0752-268888888'
                        };
                        _max.history.push(loginPath);
                    }
                    return undefined;
                };
                // 生产环境直接返回用户信息，不检查路径
                if (_env.isProduction) {
                    const currentUser = await fetchUserInfo();
                    return {
                        fetchUserInfo,
                        currentUser,
                        settings: _defaultSettings.default
                    };
                }
                // 开发环境保持原有逻辑
                const { location } = _max.history;
                if (![
                    loginPath,
                    '/user/register',
                    '/user/register-result'
                ].includes(location.pathname)) {
                    const currentUser = await fetchUserInfo();
                    return {
                        fetchUserInfo,
                        currentUser,
                        settings: _defaultSettings.default
                    };
                }
                return {
                    fetchUserInfo,
                    settings: _defaultSettings.default
                };
            }
            const layout = ({ initialState, setInitialState })=>{
                var _initialState_currentUser;
                return {
                    // 移除actionsRender，不再在顶部显示
                    // actionsRender: () => [
                    //   <Question key="doc" />,
                    //   <SelectLang key="SelectLang" />,
                    // ],
                    // 移除avatarProps，避免重复显示用户头像
                    // avatarProps: {
                    //   src: initialState?.currentUser?.avatar,
                    //   title: <AvatarName />,
                    //   render: (_, avatarChildren) => {
                    //     return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
                    //   },
                    // },
                    waterMarkProps: {
                        content: initialState === null || initialState === void 0 ? void 0 : (_initialState_currentUser = initialState.currentUser) === null || _initialState_currentUser === void 0 ? void 0 : _initialState_currentUser.name
                    },
                    footerRender: ()=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_components.Footer, {}, void 0, false, {
                            fileName: "src/app.tsx",
                            lineNumber: 153,
                            columnNumber: 25
                        }, this),
                    onPageChange: ()=>{
                        const { location } = _max.history;
                        // 生产环境跳过登录检查
                        if (_env.isProduction) return;
                        // 如果没有登录，重定向到 login
                        if (!(initialState === null || initialState === void 0 ? void 0 : initialState.currentUser) && location.pathname !== loginPath) _max.history.push(loginPath);
                    },
                    bgLayoutImgList: [
                        {
                            src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
                            left: 85,
                            bottom: 100,
                            height: '303px'
                        },
                        {
                            src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
                            bottom: -68,
                            right: -45,
                            height: '303px'
                        },
                        {
                            src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
                            bottom: 0,
                            left: 0,
                            width: '331px'
                        }
                    ],
                    links: [],
                    menuHeaderRender: undefined,
                    // 自定义 403 页面
                    // unAccessible: <div>unAccessible</div>,
                    // 增加一个 loading 的状态
                    childrenRender: (children)=>{
                        // if (initialState?.loading) return <PageLoading />;
                        return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_TabContext.TabProvider, {
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100vh'
                                },
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            position: 'sticky',
                                            top: 0,
                                            zIndex: 1000,
                                            background: '#fff'
                                        },
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_TabBarWrapper.default, {}, void 0, false, {
                                            fileName: "src/app.tsx",
                                            lineNumber: 196,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/app.tsx",
                                        lineNumber: 195,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        style: {
                                            flex: 1,
                                            padding: 0
                                        },
                                        children: children
                                    }, void 0, false, {
                                        fileName: "src/app.tsx",
                                        lineNumber: 198,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/app.tsx",
                                lineNumber: 194,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "src/app.tsx",
                            lineNumber: 193,
                            columnNumber: 9
                        }, this);
                    },
                    // 自定义侧边栏底部内容，包含用户头像和语言切换
                    siderMenuType: 'sub',
                    // 配置菜单属性，实现点击菜单时自动关闭其他菜单
                    menuProps: {
                        mode: 'inline',
                        onClick: (info)=>{
                            // 这里可以添加自定义的点击处理逻辑
                            console.log('菜单点击:', info);
                        }
                    },
                    // 添加侧边栏底部自定义渲染
                    menuFooterRender: ()=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            style: {
                                padding: '16px',
                                borderTop: '1px solid #f0f0f0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            },
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_components.AvatarDropdown, {
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        cursor: 'pointer',
                                        padding: '4px 8px',
                                        borderRadius: '6px',
                                        transition: 'background-color 0.2s'
                                    },
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_components.AvatarName, {}, void 0, false, {
                                        fileName: "src/app.tsx",
                                        lineNumber: 235,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/app.tsx",
                                    lineNumber: 226,
                                    columnNumber: 11
                                }, this)
                            }, void 0, false, {
                                fileName: "src/app.tsx",
                                lineNumber: 225,
                                columnNumber: 9
                            }, this)
                        }, void 0, false, {
                            fileName: "src/app.tsx",
                            lineNumber: 218,
                            columnNumber: 7
                        }, this),
                    ...initialState === null || initialState === void 0 ? void 0 : initialState.settings
                };
            };
            const request = {
                baseURL: 'https://proapi.azurewebsites.net',
                ..._requestErrorConfig.errorConfig
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
        "src/utils/env.ts": function(module, exports, __mako_require__) {
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
                getEnvironmentInfo: function() {
                    return getEnvironmentInfo;
                },
                isDevelopment: function() {
                    return isDevelopment;
                },
                isProduction: function() {
                    return isProduction;
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
            const isProduction = ()=>{
                // 在Vercel环境中，NODE_ENV 会被设置为 'production'
                // 同时我们也检查 REACT_APP_ENV 环境变量
                return window.location.hostname.includes('vercel.app');
            };
            const isDevelopment = ()=>{
                return true;
            };
            const getEnvironmentInfo = ()=>{
                return {
                    NODE_ENV: "development",
                    REACT_APP_ENV: "dev",
                    hostname: typeof window !== 'undefined' ? window.location.hostname : 'unknown',
                    isProduction: isProduction(),
                    isDevelopment: isDevelopment()
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
        "src/services/ant-design-pro/api.ts": function(module, exports, __mako_require__) {
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
                addRule: function() {
                    return addRule;
                },
                currentUser: function() {
                    return currentUser;
                },
                getNotices: function() {
                    return getNotices;
                },
                login: function() {
                    return login;
                },
                outLogin: function() {
                    return outLogin;
                },
                removeRule: function() {
                    return removeRule;
                },
                rule: function() {
                    return rule;
                },
                updateRule: function() {
                    return updateRule;
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
            async function currentUser(options) {
                return (0, _max.request)('/api/currentUser', {
                    method: 'GET',
                    ...options || {}
                });
            }
            async function outLogin(options) {
                return (0, _max.request)('/api/login/outLogin', {
                    method: 'POST',
                    ...options || {}
                });
            }
            async function login(body, options) {
                return (0, _max.request)('/api/login/account', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: body,
                    ...options || {}
                });
            }
            async function getNotices(options) {
                return (0, _max.request)('/api/notices', {
                    method: 'GET',
                    ...options || {}
                });
            }
            async function rule(params, options) {
                return (0, _max.request)('/api/rule', {
                    method: 'GET',
                    params: {
                        ...params
                    },
                    ...options || {}
                });
            }
            async function updateRule(options) {
                return (0, _max.request)('/api/rule', {
                    method: 'POST',
                    data: {
                        method: 'update',
                        ...options || {}
                    }
                });
            }
            async function addRule(options) {
                return (0, _max.request)('/api/rule', {
                    method: 'POST',
                    data: {
                        method: 'post',
                        ...options || {}
                    }
                });
            }
            async function removeRule(options) {
                return (0, _max.request)('/api/rule', {
                    method: 'POST',
                    data: {
                        method: 'delete',
                        ...options || {}
                    }
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
        }
    }
}, function(runtime) {
    runtime._h = '8401292661101862102';
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
            "common",
            "p__CustomerSuccess__index"
        ],
        "src/pages/agents/index.tsx": [
            "p__agents__index"
        ],
        "src/pages/handover/[id]/index.tsx": [
            "common",
            "p__handover__id__index"
        ],
        "src/pages/handover/index.tsx": [
            "common",
            "p__handover__index"
        ],
        "src/pages/handover/new/index.tsx": [
            "p__handover__new__index"
        ],
        "src/pages/user/login/index.tsx": [
            "p__user__login__index"
        ]
    });
    ;
});

//# sourceMappingURL=umi.1141346331771527056.hot-update.js.map