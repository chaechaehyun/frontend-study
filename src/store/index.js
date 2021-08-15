import { createStore } from "vuex";
import actions from "./actions";
import mutations from "./mutations";

export default createStore({
  state: {
    user: {
      token_type: undefined,
      access_token : undefined,
      expires_in: 0,
      scope: undefined,
      member: {
          id: undefined,
          mobile: undefined,
          name: undefined,
          shop_id: undefined,
      }
    },
    itemSummary: {
      activate: 0,
      inactivate: 0,
      end: 0,
    },
    goodsList: [],
  },
  mutations,
  actions,
  getters: {
    getTokenType: state => state.user.token_type,
    getAccessToken: state => state.user.access_token,
    getUserInfo: state => state.user.member,
    getproductSummary: state => state.itemSummary,

  },
  modules: {},
});
