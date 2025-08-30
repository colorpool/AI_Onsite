((typeof globalThis !== 'undefined' ? globalThis : self)["makoChunk_ant-design-pro"] = (typeof globalThis !== 'undefined' ? globalThis : self)["makoChunk_ant-design-pro"] || []).push([
        ['common'],
{ "src/mock/handoverData.ts": function (module, exports, __mako_require__){
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
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
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
        title: '安排启动会',
        completed: true,
        dueDate: '2024-01-15'
    },
    {
        id: '2',
        title: '完成账号开通',
        completed: true,
        dueDate: '2024-01-16'
    },
    {
        id: '3',
        title: '配置数据权限',
        completed: false,
        dueDate: '2024-01-20'
    },
    {
        id: '4',
        title: '培训用户使用',
        completed: false,
        dueDate: '2024-01-25'
    }
];
const mockInternalComments = [
    {
        id: '1',
        content: '客户对数据安全要求很高，建议安排安全专家参与启动会 @security_team',
        author: 'CSM-小王',
        createdAt: '2024-01-10 14:30:00',
        mentions: [
            'security_team'
        ]
    },
    {
        id: '2',
        content: '已联系技术团队，确认可以满足客户的合规要求',
        author: 'CSM-小李',
        createdAt: '2024-01-11 09:15:00'
    }
];
const mockCustomerHandovers = [
    {
        id: '1',
        customerName: '北京科技有限公司',
        handoverStatus: 'normal',
        riskLevel: 'low',
        hasHandoverDocument: true,
        hasRiskAlert: false,
        stakeholderCount: 5,
        expectationAlignment: 'aligned',
        handoverRating: 4.5,
        handoverComment: '服务专业，响应及时',
        createdAt: '2024-01-10 10:00:00',
        updatedAt: '2024-01-15 16:30:00',
        crmData: mockCRMSyncData,
        stakeholders: mockStakeholders,
        onboardingTasks: mockOnboardingTasks,
        internalComments: mockInternalComments
    },
    {
        id: '2',
        customerName: '上海智能科技有限公司',
        handoverStatus: 'not_handover',
        riskLevel: 'medium',
        hasHandoverDocument: false,
        hasRiskAlert: true,
        stakeholderCount: 3,
        expectationAlignment: 'partially_aligned',
        handoverRating: 3.8,
        handoverComment: '需要进一步沟通客户需求',
        createdAt: '2024-01-12 14:20:00',
        updatedAt: '2024-01-14 11:45:00',
        crmData: {
            ...mockCRMSyncData,
            accountCount: 25,
            salesSource: 'channel',
            channelPartner: '上海渠道合作伙伴有限公司'
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
        internalComments: mockInternalComments
    },
    {
        id: '3',
        customerName: '深圳创新科技有限公司',
        handoverStatus: 'risk',
        riskLevel: 'high',
        hasHandoverDocument: true,
        hasRiskAlert: true,
        stakeholderCount: 7,
        expectationAlignment: 'not_aligned',
        handoverRating: 2.5,
        handoverComment: '客户期望与产品功能存在较大差距',
        createdAt: '2024-01-08 09:30:00',
        updatedAt: '2024-01-13 15:20:00',
        crmData: {
            ...mockCRMSyncData,
            accountCount: 100,
            salesSource: 'direct',
            salesPerson: '李销售'
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
        internalComments: mockInternalComments
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
 }]);
//# sourceMappingURL=common-async.js.map