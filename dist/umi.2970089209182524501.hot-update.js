globalThis.makoModuleHotUpdate('src/.umi/umi.ts?hmr', {
    modules: {
        "src/mock/user.ts": function(module, exports, __mako_require__) {
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
                currentUser: function() {
                    return currentUser;
                },
                login: function() {
                    return login;
                },
                outLogin: function() {
                    return outLogin;
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
                // 生产环境返回Mock数据
                const isProduction = false;
                if (isProduction) return {
                    data: {
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
                    }
                };
                // 开发环境使用真实API
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
    runtime._h = '140998399418168303';
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

//# sourceMappingURL=umi.2970089209182524501.hot-update.js.map