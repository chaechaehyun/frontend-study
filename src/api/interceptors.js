import store from '@/store/index';

export function setInterceptors(instance) {
    instance.interceptors.request.use(
        async config => {
            // config.headers.Authorization = store.state.token;
            // console.log(` ${store.getters.getAccessToken}`);
            if (store.getters.getAccessToken != '') {
                config.headers.Authorization = `${store.getters.getTokenType} ${store.getters.getAccessToken}`;

            }

            return config;
        },
        function(error) {
            return Promise.reject(error);
        },
    );

    // Add a response interceptor
    instance.interceptors.response.use(
        function(response) {
            // logout 처리
            if(response.status == 401 || response.status == 403) {
                store.commit('LOGOUT');
            }
            return response;
        },
        function(error) {
            return Promise.reject(error);
        },
    );
    return instance;
}
