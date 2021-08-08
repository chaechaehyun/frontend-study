// console.log('TNS_ENV', TNS_ENV);

export const config = {
    WEB_SOCKET_URI: "wss://relay.lastorder.io/v1/",

    WEB_SOCKET_ID : 'subscriber',
    WEB_SOCKET_PASSCODE : `ag0s1Tst5K$A'EsD^c5FaqyY`,

    WEB_SOCKET_HOST: 'stream-dev.lastorder.io',
    WEB_SOCKET_PORT: 443,

    // WEB_SOCKET_STAGE: TNS_ENV == 'production' ? "production" : "dev",
    WEB_SOCKET_STAGE: "dev",

    API_SERVER_URI:"https://api-dev.lastorder.co.kr/v1",

    // ANDROID_UPDATE_URL: 'https://play.google.com/store/apps/details?id=kr.co.lastorder.store',
    // IOS_UPDATE_URL: 'https://apps.apple.com/us/app/id1464896299',

    OAUTH_CLIENT_ID: "LrRxKVve7SZ5jiW41cUrnYgr9aFEfBy2IKHZPvSJ",
    OAUTH_CLIENT_SECRET:"m5r1d6oQHe5J4AWGfolymgp1NmVxKRKELbFQAtSTqf12cT8kUPyvaZJzsdhvorQkQnYj8z6OrY4s8Mu3FZMGVIpsrw3WtzOeQ3nfFs53Sz3DjRfPoVCS2x4SlazvF1qM", 
    

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