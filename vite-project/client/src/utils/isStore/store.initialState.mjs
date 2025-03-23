const storeInitialState = {
    storeId: null,
    storeName: "",
    isSuperStore: false,
    active: true,
    permissions: {
        admin: false,
        superAdmin: false,
        customRoles: [],
    },
    session: {
        sessionId: null,
        lastActive: null,
        userType: "guest", // guest, user, admin, superAdmin
        metadata: {
            deviceType: "",
            deviceId: "",
            ip: "",
        },
    },
    products: [],
    orders: [],
    notifications: [],
    alerts: [],
    storeSettings: {
        currency: "USD",
        theme: "light",
        language: "en",
    },
    storeAnalytics: {
        totalVisitors: 0,
        totalSales: 0,
        popularProducts: [],
    }
};
