import {
    loginById,
    getItemSummary,
} from '../api/index'


export default {

    async FETCH_LOGIN({ commit }, formdata) {
        const response = await loginById(formdata);
        commit('SET_USER_INFO', response.data.data);
        // console.log(response.data.data);
        return response;
    },

    async FETCH_ITEM_SUMMARY({commit}, shopId){
        const response = await getItemSummary(shopId);
        commit('SET_ITEM_SUMMARY', response.data.data)
        // console.log(response.data.data);
        return response;
    },
}
