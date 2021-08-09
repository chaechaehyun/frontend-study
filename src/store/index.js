import { createStore } from "vuex";
import actions from "./actions";
import mutations from "./mutations";

export default createStore({
  state: {
    accessToken: "",
    goodsList: [],
  },
  mutations,
  actions,
  modules: {},
});
