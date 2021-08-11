// console.log('TNS_ENV', TNS_ENV);

export const config = {
    WEB_SOCKET_ID : 'subscriber',
    WEB_SOCKET_PASSCODE : `ag0s1Tst5K$A'EsD^c5FaqyY`,

    // WEB_SOCKET_HOST: 'stream.lastorder.io',
    WEB_SOCKET_HOST: 'stream-dev.lastorder.io',
    WEB_SOCKET_PORT: 443,

    APP_PACKAGE_ID: 'kr.co.lastorder.store',

    // WEB_SOCKET_STAGE: TNS_ENV == 'production' ? "production" : "dev",
    // FCM_STAGE: TNS_ENV == 'production' ? "prod" : "dev",

    // DEVICE_LOG_URI: TNS_ENV == 'production' ? "https://log.lastorder.io/v1/de/" : "https://log.lastorder.io/dev/de/",
    // DEVICE_LOG_KEY: TNS_ENV == 'production' ? "GrqF1jwLaM4Erw4zwSDTLaNuxBSt4Tn94xNj1fL5" : "JbMH6xTMPHaCz7lvZmoQI3uKrYRifL824sySRZPG",

    // API_SERVER_URI: "https://api.lastorder.io" ,
    API_SERVER_URI: "https://api-dev.lastorder.io",

    ANDROID_UPDATE_URL: 'https://play.google.com/store/apps/details?id=kr.co.lastorder.store',
    IOS_UPDATE_URL: 'https://apps.apple.com/us/app/id1464896299',

    // OAUTH_CLIENT_ID: TNS_ENV == 'production' ? "aSNRAXNR10ZiiEfjLhjelA1h4kPMPV2cAwOONA1E" : "LrRxKVve7SZ5jiW41cUrnYgr9aFEfBy2IKHZPvSJ",
    // OAUTH_CLIENT_SECRET: TNS_ENV == 'production' ? "m5r1d6oQHe5J4AWGfolymgp1NmVxKRKELbFQAtSTqf12cT8kUPyvaZJzsdhvorQkQnYj8z6OrY4s8Mu3FZMGVIpsrw3WtzOeQ3nfFs53Sz3DjRfPoVCS2x4SlazvF1qM" : "k6aX4zw3UkFhMNW9X4TaoHWHmcvrhpW35EJLSpK7fzDZsgfPUDmF6LASEEN2zMXk2nuCSTTLYUgOH3369QcnDv8lUsJ93jeIcBBSu7qg8FTJbJ1y4ybaFPaiInLXadZq",

    NOTIFICATION: {
        NEW: {
            CHANNEL: 'fcm_default_channel',
            SOUND: 'lastorder_v1',
        },
        CANCEL: {
            CHANNEL: 'fcm_cancel_channel',
            SOUND: 'lastorder_v1_201',
        },
        CONFIRM: {
            CHANNEL: 'fcm_confirm_channel',
            SOUND: 'lastorder_v1_203',
        },
    }
}