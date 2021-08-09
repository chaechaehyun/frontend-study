import axios from "axios";
// import store from '../store/store'

const config = {
  baseUrl: 'https://api.lastorder.co.kr/v1'
  // baseApiUrl: 'http://127.0.0.1:8000/v1'
  // baseApiUrl: 'http://13.124.153.201/v1'
  // baseApiUrl: 'http://52.79.208.191/v1'
};

// function fetchAccessToken() {
//   return axios.post(`${config.baseUrl}/auth/token/`);
// }
function fetchAccessToken(data) {
  return axios.post(`${config.baseUrl}/auth/token/${data}`);
}
export { fetchAccessToken };
