globalThis.makoModuleHotUpdate('src/.umi/umi.ts?hmr', {
    modules: {
        "src/components/TabBar/TabBarWrapper.tsx": function(module, exports, __mako_require__) {
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
            var _max = __mako_require__("src/.umi/exports.ts");
            var _index = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/TabBar/index.tsx"));
            var _TabContext = __mako_require__("src/contexts/TabContext.tsx");
            var _NotificationBar = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/NotificationBar/index.tsx"));
            var prevRefreshReg;
            var prevRefreshSig;
            prevRefreshReg = self.$RefreshReg$;
            prevRefreshSig = self.$RefreshSig$;
            self.$RefreshReg$ = (type, id)=>{
                _reactrefresh.register(type, module.id + id);
            };
            self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
            var _s = $RefreshSig$();
            // 路由到Tab标题的映射
            const routeToTitleMap = {
                '/dashboard/work': '我的工作看板',
                '/dashboard/layers': '客户分层盘点',
                '/dashboard/focus': '近期客户关注重点',
                '/dashboard/competition': '客成部门大比武',
                '/dashboard/coordination': '大服务体系内协同',
                '/profiles/handover': '客户交接',
                '/profiles/implementation': '实施搭建',
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
                '/user/login': '登录',
                '/user/register': '注册',
                '/user/register-result': '注册结果',
                '/404': '404'
            };
            const TabBarWrapper = /*#__PURE__*/ _s(_react.default.memo(_c = _s(()=>{
                _s();
                const location = (0, _max.useLocation)();
                const { tabs, activeKey, addTab, removeTab, setActiveTab } = (0, _TabContext.useTabManager)();
                // 根据当前路径自动添加Tab
                (0, _react.useEffect)(()=>{
                    const currentPath = location.pathname;
                    // 跳过根路径，不创建首页标签
                    if (currentPath === '/') return;
                    // 检查是否是子页面（配置、分析、新建），这些页面不创建新Tab
                    const isSubPage = currentPath.includes('/ai-tools/consultant/') && currentPath !== '/ai-tools/consultant';
                    if (isSubPage) {
                        // 子页面不创建新Tab，直接导航到主页面Tab
                        const mainTab = tabs.find((tab)=>tab.path === '/ai-tools/consultant');
                        if (mainTab && activeKey !== mainTab.key) setActiveTab(mainTab.key);
                        return;
                    }
                    const title = routeToTitleMap[currentPath] || '未知页面';
                    // 如果当前路径没有对应的Tab，则添加一个
                    const existingTab = tabs.find((tab)=>tab.path === currentPath);
                    if (!existingTab) {
                        const newTab = {
                            key: currentPath,
                            label: title,
                            path: currentPath,
                            closable: true
                        };
                        addTab(newTab);
                    } else if (activeKey !== existingTab.key) // 如果Tab已存在且不是当前活跃Tab，设置为活跃Tab
                    setActiveTab(existingTab.key);
                }, [
                    location.pathname,
                    tabs,
                    activeKey,
                    addTab,
                    setActiveTab
                ]);
                // 如果没有Tab，不显示TabBar
                if (tabs.length === 0) return null;
                return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_jsxdevruntime.Fragment, {
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_NotificationBar.default, {}, void 0, false, {
                            fileName: "src/components/TabBar/TabBarWrapper.tsx",
                            lineNumber: 94,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_index.default, {
                            tabs: tabs,
                            activeKey: activeKey,
                            onTabChange: setActiveTab,
                            onTabClose: removeTab
                        }, void 0, false, {
                            fileName: "src/components/TabBar/TabBarWrapper.tsx",
                            lineNumber: 95,
                            columnNumber: 7
                        }, this)
                    ]
                }, void 0, true);
            }, "Yg6jw0k895+5ikWno6ESYJrsLfE=", false, function() {
                return [
                    _max.useLocation,
                    _TabContext.useTabManager
                ];
            })), "Yg6jw0k895+5ikWno6ESYJrsLfE=", false, function() {
                return [
                    _max.useLocation,
                    _TabContext.useTabManager
                ];
            });
            _c1 = TabBarWrapper;
            var _default = TabBarWrapper;
            var _c;
            var _c1;
            $RefreshReg$(_c, "TabBarWrapper$React.memo");
            $RefreshReg$(_c1, "TabBarWrapper");
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
    runtime._h = '14456662502504596316';
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

//# sourceMappingURL=umi.15828144724729303414.hot-update.js.map