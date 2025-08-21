globalThis.makoModuleHotUpdate('src/.umi/umi.ts?hmr', {
    modules: {
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
                // 检查运行时环境（浏览器中）
                if (typeof window !== 'undefined') {
                    const hostname = window.location.hostname;
                    if (hostname.includes('vercel.app') || hostname.includes('vercel.com')) return true;
                }
                return false;
            };
            const isDevelopment = ()=>{
                return !isProduction();
            };
            const getEnvironmentInfo = ()=>{
                const info = {
                    NODE_ENV: "development",
                    REACT_APP_ENV: "dev",
                    hostname: typeof window !== 'undefined' ? window.location.hostname : 'SSR',
                    isProduction: isProduction(),
                    isDevelopment: isDevelopment(),
                    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'SSR'
                };
                console.log('Environment detection:', info);
                return info;
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
        }
    }
}, function(runtime) {
    runtime._h = '16762675363996011393';
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

//# sourceMappingURL=umi.9513600724269578577.hot-update.js.map