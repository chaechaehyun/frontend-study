import {
    loginById,
    // getItems
} from '../api/index'


export default {

    async FETCH_LOGIN({ commit }, formdata) {
        const response = await loginById(formdata);
        commit('SET_USER_INFO', response.data.data);
        return response;
    }


}
