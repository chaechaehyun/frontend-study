import axios from "axios";
// import store from '../store/store'

const config = {
  baseUrl: 'https://api-dev.lastorder.io/v1'
  // baseUrl: 'https://api.lastorder.co.kr/v1'
};

// function fetchAccessToken() {
//   return axios.post(`${config.baseUrl}/auth/token/`);
// }
// function fetchAccessToken(formData) {
//   return axios.post(`${config.baseUrl}/auth/token/${formData}`);
// }

function fetchGoodsList() {
  return axios.get(`${config.baseUrl}/shop/items`)
}
export {
  // fetchAccessToken,
  fetchGoodsList,
};
