import {
    loginById
} from '../api/index'


export const actions = {

    async FETCH_LOGIN({ commit }, formdata) {
        const response = await loginById(formdata);
        commit('SET_LOGIN', response.data);
        return response;
    }
}
