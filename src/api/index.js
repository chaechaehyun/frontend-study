import axios from "axios";
// import store from '../store/store'
// import { config } from '../../lastorder.store.config'

const config = {
  // baseUrl: 'https://api-lastorder.co.kr/v1'
  baseUrl: "https://api-dev.lastorder.co.kr/v1",
};

function fetchAccessToken() {
  return axios.get(`${config.baseUrl}/auth/token/`);
}
export { fetchAccessToken };
