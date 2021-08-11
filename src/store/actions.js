import { fetchAccessToken, fetchGoodsList } from "../api/index";
// const baseApiUrl = 'https://api.lastorder.co.kr/v1';
const baseApiUrl = 'api-dev.lastorder.io/v1';

import axios from 'axios'

const queryString = require("query-string");
const clientId = "LrRxKVve7SZ5jiW41cUrnYgr9aFEfBy2IKHZPvSJ";
const clientSecret =
  "k6aX4zw3UkFhMNW9X4TaoHWHmcvrhpW35EJLSpK7fzDZsgfPUDmF6LASEEN2zMXk2nuCSTTLYUgOH3369QcnDv8lUsJ93jeIcBBSu7qg8FTJbJ1y4ybaFPaiInLXadZq";

// const clientId = 'aSNRAXNR10ZiiEfjLhjelA1h4kPMPV2cAwOONA1E';
// const clientSecret =
//     'm5r1d6oQHe5J4AWGfolymgp1NmVxKRKELbFQAtSTqf12cT8kUPyvaZJzsdhvorQkQnYj8z6OrY4s8Mu3FZMGVIpsrw3WtzOeQ3nfFs53Sz3DjRfPoVCS2x4SlazvF1qM';

const scope = 'SHOP';

export default {

     FETCH_ACCESS_TOKEN( {commit}, {id, password} ) {
		commit('SET_ACCESS_TOKEN', '');
		delete axios.defaults.headers.common["Authorization"];
		let formData = {
			'grant_type': 'password',
			'client_id': clientId,
			'client_secret': clientSecret,
			'username': id,
			'password': password,
			'scope': scope
		}
		return axios({				
				method: 'post',
				url: `${baseApiUrl}/auth/token/`,
				data: queryString.stringify(formData),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			})
			.then(response => {	
				commit('SET_ACCESS_TOKEN', response.data.access_token);
				
				return response;
				
			})			
    },    

    // async FETCH_ACCESS_TOKEN({ commit }, { id, password }) {
    // // console.log(id, password);
    //     let formData = queryString.stringify({
    //         'grant_type': 'password',
    //         'client_id': clientId,
    //         'client_secret': clientSecret,
    //         'username': id,
    //         'password': password,
    //         'scope': scope,
    //     })
    //     console.log(formData);
    //     const response = await fetchAccessToken(formData);
    //     commit("SET_ACCESS_TOKEN", response.data.access_token);
    //     return response;
    // },
    
    async FETCH_GOODS_LIST({ commit }){
        const response = await fetchGoodsList();
        commit("SET_GOODS_LIST", response.data);
        console.log(response.data);
        return response;
    }

};
