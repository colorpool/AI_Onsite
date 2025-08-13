globalThis.makoModuleHotUpdate('src/.umi/umi.ts?hmr', {
    modules: {
        "src/.umi/core/route.tsx": function(module, exports, __mako_require__) {
            "use strict";
            var interop = __mako_require__("@swc/helpers/_/_interop_require_wildcard")._;
            __mako_require__.d(exports, "__esModule", {
                value: true
            });
            __mako_require__.d(exports, "getRoutes", {
                enumerable: true,
                get: function() {
                    return getRoutes;
                }
            });
            var _interop_require_default = __mako_require__("@swc/helpers/_/_interop_require_default");
            var _interop_require_wildcard = __mako_require__("@swc/helpers/_/_interop_require_wildcard");
            var _reactrefresh = /*#__PURE__*/ _interop_require_wildcard._(__mako_require__("node_modules/react-refresh/runtime.js"));
            var _react = /*#__PURE__*/ _interop_require_default._(__mako_require__("node_modules/react/index.js"));
            var prevRefreshReg;
            var prevRefreshSig;
            prevRefreshReg = self.$RefreshReg$;
            prevRefreshSig = self.$RefreshSig$;
            self.$RefreshReg$ = (type, id)=>{
                _reactrefresh.register(type, module.id + id);
            };
            self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
            async function getRoutes() {
                const routes = {
                    "1": {
                        "path": "/user",
                        "layout": false,
                        "id": "1"
                    },
                    "2": {
                        "name": "login",
                        "path": "/user/login",
                        "parentId": "1",
                        "id": "2"
                    },
                    "3": {
                        "path": "/dashboard",
                        "name": "驻场智能看板",
                        "icon": "dashboard",
                        "parentId": "ant-design-pro-layout",
                        "id": "3"
                    },
                    "4": {
                        "path": "/dashboard",
                        "redirect": "/dashboard/work",
                        "parentId": "3",
                        "id": "4"
                    },
                    "5": {
                        "path": "/dashboard/work",
                        "name": "我的工作看板",
                        "icon": "bell",
                        "parentId": "3",
                        "id": "5"
                    },
                    "6": {
                        "path": "/dashboard/layers",
                        "name": "客户分层盘点",
                        "icon": "group",
                        "parentId": "3",
                        "id": "6"
                    },
                    "7": {
                        "path": "/dashboard/focus",
                        "name": "近期客户关注重点",
                        "icon": "trophy",
                        "parentId": "3",
                        "id": "7"
                    },
                    "8": {
                        "path": "/dashboard/competition",
                        "name": "客成部门大比武",
                        "icon": "trophy",
                        "parentId": "3",
                        "id": "8"
                    },
                    "9": {
                        "path": "/dashboard/coordination",
                        "name": "大服务体系内协同",
                        "icon": "team",
                        "parentId": "3",
                        "id": "9"
                    },
                    "10": {
                        "path": "/profiles",
                        "name": "动态客户档案",
                        "icon": "user",
                        "parentId": "ant-design-pro-layout",
                        "id": "10"
                    },
                    "11": {
                        "path": "/profiles",
                        "redirect": "/profiles/handover",
                        "parentId": "10",
                        "id": "11"
                    },
                    "12": {
                        "path": "/profiles/handover",
                        "name": "客户交接",
                        "icon": "userAdd",
                        "parentId": "10",
                        "id": "12"
                    },
                    "13": {
                        "path": "/profiles/implementation",
                        "name": "实施搭建",
                        "icon": "tool",
                        "parentId": "10",
                        "id": "13"
                    },
                    "14": {
                        "path": "/profiles/service",
                        "name": "持续服务",
                        "icon": "customerService",
                        "parentId": "10",
                        "id": "14"
                    },
                    "15": {
                        "path": "/profiles/renewal",
                        "name": "续约管理",
                        "icon": "fileText",
                        "parentId": "10",
                        "id": "15"
                    },
                    "16": {
                        "path": "/profiles/recall",
                        "name": "召回孵化",
                        "icon": "experiment",
                        "parentId": "10",
                        "id": "16"
                    },
                    "17": {
                        "path": "/profiles/churn",
                        "name": "流失归因",
                        "icon": "lineChart",
                        "parentId": "10",
                        "id": "17"
                    },
                    "18": {
                        "path": "/revenue",
                        "name": "增收服务推进",
                        "icon": "message",
                        "parentId": "ant-design-pro-layout",
                        "id": "18"
                    },
                    "19": {
                        "path": "/revenue",
                        "redirect": "/revenue/consultation",
                        "parentId": "18",
                        "id": "19"
                    },
                    "20": {
                        "path": "/revenue/consultation",
                        "name": "咨询应答",
                        "icon": "comment",
                        "parentId": "18",
                        "id": "20"
                    },
                    "21": {
                        "path": "/revenue/upgrade",
                        "name": "定制升舱建议",
                        "icon": "arrowUp",
                        "parentId": "18",
                        "id": "21"
                    },
                    "22": {
                        "path": "/revenue/learning",
                        "name": "学习项目推荐",
                        "icon": "book",
                        "parentId": "18",
                        "id": "22"
                    },
                    "23": {
                        "path": "/revenue/purchase",
                        "name": "课程采购活动",
                        "icon": "shoppingCart",
                        "parentId": "18",
                        "id": "23"
                    },
                    "24": {
                        "path": "/revenue/alliance",
                        "name": "战略活动结盟",
                        "icon": "userAdd",
                        "parentId": "18",
                        "id": "24"
                    },
                    "25": {
                        "path": "/revenue/message",
                        "name": "消息推送管理",
                        "icon": "bell",
                        "parentId": "18",
                        "id": "25"
                    },
                    "26": {
                        "path": "/resources",
                        "name": "共享方案资料包",
                        "icon": "shareAlt",
                        "parentId": "ant-design-pro-layout",
                        "id": "26"
                    },
                    "27": {
                        "path": "/resources",
                        "redirect": "/resources/deployment",
                        "parentId": "26",
                        "id": "27"
                    },
                    "28": {
                        "path": "/resources/deployment",
                        "name": "实施部署套件",
                        "icon": "setting",
                        "parentId": "26",
                        "id": "28"
                    },
                    "29": {
                        "path": "/resources/support",
                        "name": "年度服务支撑",
                        "icon": "barChart",
                        "parentId": "26",
                        "id": "29"
                    },
                    "30": {
                        "path": "/resources/equipment",
                        "name": "续约升级装备",
                        "icon": "arrowUp",
                        "parentId": "26",
                        "id": "30"
                    },
                    "31": {
                        "path": "/resources/knowledge",
                        "name": "团队能力建设",
                        "icon": "database",
                        "parentId": "26",
                        "id": "31"
                    },
                    "32": {
                        "path": "/ai-tools",
                        "name": "AI智能工具箱",
                        "icon": "robot",
                        "parentId": "ant-design-pro-layout",
                        "id": "32"
                    },
                    "33": {
                        "path": "/ai-tools",
                        "redirect": "/ai-tools/consultant",
                        "parentId": "32",
                        "id": "33"
                    },
                    "34": {
                        "path": "/ai-tools/consultant",
                        "name": "实施顾问分身",
                        "icon": "userSwitch",
                        "parentId": "32",
                        "id": "34"
                    },
                    "35": {
                        "path": "/ai-tools/consultant/new",
                        "hideInMenu": true,
                        "parentId": "34",
                        "id": "35"
                    },
                    "36": {
                        "path": "/ai-tools/consultant/:id/edit",
                        "hideInMenu": true,
                        "parentId": "34",
                        "id": "36"
                    },
                    "37": {
                        "path": "/ai-tools/consultant/:id/analytics",
                        "hideInMenu": true,
                        "parentId": "34",
                        "id": "37"
                    },
                    "38": {
                        "path": "/ai-tools/simulator",
                        "name": "续费模拟器",
                        "icon": "eye",
                        "parentId": "32",
                        "id": "38"
                    },
                    "39": {
                        "path": "/ai-tools/communication",
                        "name": "干系人沟通话术",
                        "icon": "comment",
                        "parentId": "32",
                        "id": "39"
                    },
                    "40": {
                        "path": "/ai-tools/travel",
                        "name": "面客差旅行程表",
                        "icon": "car",
                        "parentId": "32",
                        "id": "40"
                    },
                    "41": {
                        "path": "/ai-tools/prediction",
                        "name": "预测水晶球",
                        "icon": "trophy",
                        "parentId": "32",
                        "id": "41"
                    },
                    "42": {
                        "path": "/ai-tools/avatar",
                        "name": "我的虚拟分身",
                        "icon": "user",
                        "parentId": "32",
                        "id": "42"
                    },
                    "43": {
                        "path": "/ai-tools/tags",
                        "name": "智能标签在干活",
                        "icon": "tags",
                        "parentId": "32",
                        "id": "43"
                    },
                    "44": {
                        "path": "/",
                        "redirect": "/dashboard/work",
                        "parentId": "ant-design-pro-layout",
                        "id": "44"
                    },
                    "45": {
                        "path": "*",
                        "layout": false,
                        "id": "45"
                    },
                    "ant-design-pro-layout": {
                        "id": "ant-design-pro-layout",
                        "path": "/",
                        "isLayout": true
                    },
                    "umi/plugin/openapi": {
                        "path": "/umi/plugin/openapi",
                        "id": "umi/plugin/openapi"
                    }
                };
                return {
                    routes,
                    routeComponents: {
                        '1': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/.umi/core/EmptyRoute.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/.umi/core/EmptyRoute.tsx")))),
                        '2': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/user/login/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/user/login/index.tsx")))),
                        '3': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/.umi/core/EmptyRoute.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/.umi/core/EmptyRoute.tsx")))),
                        '4': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/.umi/core/EmptyRoute.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/.umi/core/EmptyRoute.tsx")))),
                        '5': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/CustomerSuccess/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/CustomerSuccess/index.tsx")))),
                        '6': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/CustomerSuccess/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/CustomerSuccess/index.tsx")))),
                        '7': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/CustomerSuccess/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/CustomerSuccess/index.tsx")))),
                        '8': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/CustomerSuccess/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/CustomerSuccess/index.tsx")))),
                        '9': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/CustomerSuccess/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/CustomerSuccess/index.tsx")))),
                        '10': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/.umi/core/EmptyRoute.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/.umi/core/EmptyRoute.tsx")))),
                        '11': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/.umi/core/EmptyRoute.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/.umi/core/EmptyRoute.tsx")))),
                        '12': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/CustomerSuccess/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/CustomerSuccess/index.tsx")))),
                        '13': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/CustomerSuccess/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/CustomerSuccess/index.tsx")))),
                        '14': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/CustomerSuccess/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/CustomerSuccess/index.tsx")))),
                        '15': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/CustomerSuccess/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/CustomerSuccess/index.tsx")))),
                        '16': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/CustomerSuccess/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/CustomerSuccess/index.tsx")))),
                        '17': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/CustomerSuccess/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/CustomerSuccess/index.tsx")))),
                        '18': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/.umi/core/EmptyRoute.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/.umi/core/EmptyRoute.tsx")))),
                        '19': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/.umi/core/EmptyRoute.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/.umi/core/EmptyRoute.tsx")))),
                        '20': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/CustomerSuccess/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/CustomerSuccess/index.tsx")))),
                        '21': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/CustomerSuccess/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/CustomerSuccess/index.tsx")))),
                        '22': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/CustomerSuccess/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/CustomerSuccess/index.tsx")))),
                        '23': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/CustomerSuccess/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/CustomerSuccess/index.tsx")))),
                        '24': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/CustomerSuccess/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/CustomerSuccess/index.tsx")))),
                        '25': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/CustomerSuccess/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/CustomerSuccess/index.tsx")))),
                        '26': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/.umi/core/EmptyRoute.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/.umi/core/EmptyRoute.tsx")))),
                        '27': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/.umi/core/EmptyRoute.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/.umi/core/EmptyRoute.tsx")))),
                        '28': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/CustomerSuccess/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/CustomerSuccess/index.tsx")))),
                        '29': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/CustomerSuccess/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/CustomerSuccess/index.tsx")))),
                        '30': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/CustomerSuccess/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/CustomerSuccess/index.tsx")))),
                        '31': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/CustomerSuccess/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/CustomerSuccess/index.tsx")))),
                        '32': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/.umi/core/EmptyRoute.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/.umi/core/EmptyRoute.tsx")))),
                        '33': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/.umi/core/EmptyRoute.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/.umi/core/EmptyRoute.tsx")))),
                        '34': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/agents/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/agents/index.tsx")))),
                        '35': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/agents/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/agents/index.tsx")))),
                        '36': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/agents/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/agents/index.tsx")))),
                        '37': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/agents/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/agents/index.tsx")))),
                        '38': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/CustomerSuccess/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/CustomerSuccess/index.tsx")))),
                        '39': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/CustomerSuccess/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/CustomerSuccess/index.tsx")))),
                        '40': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/CustomerSuccess/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/CustomerSuccess/index.tsx")))),
                        '41': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/CustomerSuccess/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/CustomerSuccess/index.tsx")))),
                        '42': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/CustomerSuccess/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/CustomerSuccess/index.tsx")))),
                        '43': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/CustomerSuccess/index.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/CustomerSuccess/index.tsx")))),
                        '44': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/.umi/core/EmptyRoute.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/.umi/core/EmptyRoute.tsx")))),
                        '45': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/pages/404.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/pages/404.tsx")))),
                        'ant-design-pro-layout': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/.umi/plugin-layout/Layout.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/.umi/plugin-layout/Layout.tsx")))),
                        'umi/plugin/openapi': /*#__PURE__*/ _react.default.lazy(()=>__mako_require__.ensure2("src/.umi/plugin-openapi/openapi.tsx").then(__mako_require__.dr(interop, __mako_require__.bind(__mako_require__, "src/.umi/plugin-openapi/openapi.tsx"))))
                    }
                };
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
    runtime._h = '5501369032567173296';
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

//# sourceMappingURL=umi.17730223215672386658.hot-update.js.map