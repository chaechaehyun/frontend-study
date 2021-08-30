import axios from "axios";
import { setInterceptors } from './interceptors';
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

// 상품 목록 요약
export const getItemSummary = (shopId) => {
  return instanceAuth().get('/v1/store/items/summary/', {
      headers : {
          'shop': shopId.toString()
      },
  });
}

// 상품 목록
export const getItems = (shopId, query) => {
  return instanceAuth().get('/v1/store/items/', {
      headers : {
          'shop': shopId.toString()
      },
      params: query
  });
}

// 상품 판매중 전환
export const activateItems = (shopId, params) => {
  return instanceAuth().post('/v1/store/items/activate/', params, {
      headers : {
          'Content-Type': 'application/json',
          'shop': shopId.toString()
      },
  });
}

// 상품 판매대기/중지 전환
export const inactivateItems = (shopId, params) => {
  return instanceAuth().post('/v1/store/items/inactivate/', params, {
      headers : {
          'Content-Type': 'application/json',
          'shop': shopId.toString()
      },
  });
}

// 상품 수정
export const updateItem = (id, shopId, params) => {
  return instanceAuth().put(`/v1/store/items/${id}/`, params, {
      headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'multipart/form-data',
          'shop': shopId.toString(),
      },
  });
}