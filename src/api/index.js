import axios from "axios";
import { config } from '../config/lastorder.config'

export const instance = ()=> {
	return axios.create({
		baseURL: config.API_SERVER_URI,
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	});
}

// 액시오스 초기화 함수
export const instanceAuth = ()=> {
	const instance = axios.create({
		baseURL: config.API_SERVER_URI,
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	});
	return setInterceptors(instance);
}

// 로그인 (아이디, 패스워드)
export const loginById = (params) => {
  return instance().post('/v1/store/login/password/', params);
}

