import { fetchAccessToken } from "../api/index";

const queryString = require("query-string");
const clientId = "LrRxKVve7SZ5jiW41cUrnYgr9aFEfBy2IKHZPvSJ";
const clientSecret =
  "k6aX4zw3UkFhMNW9X4TaoHWHmcvrhpW35EJLSpK7fzDZsgfPUDmF6LASEEN2zMXk2nuCSTTLYUgOH3369QcnDv8lUsJ93jeIcBBSu7qg8FTJbJ1y4ybaFPaiInLXadZq";
// const clientId = 'aSNRAXNR10ZiiEfjLhjelA1h4kPMPV2cAwOONA1E';
// const clientSecret = 'm5r1d6oQHe5J4AWGfolymgp1NmVxKRKELbFQAtSTqf12cT8kUPyvaZJzsdhvorQkQnYj8z6OrY4s8Mu3FZMGVIpsrw3WtzOeQ3nfFs53Sz3DjRfPoVCS2x4SlazvF1qM';

export default {
  async FETCH_ACCESS_TOKEN({ commit }, { id, password }) {
    // console.log(id, password);
    let accessInfo = queryString.stringify({
      grant_type: "password",
      client_id: clientId,
      client_secret: clientSecret,
      username: id,
      password: password,
      scope: "SHOP",
    });
    console.log(accessInfo);
    const response = await fetchAccessToken(accessInfo);
    commit("SET_ACCESS_TOKEN", response.data.access_token);
    return response;
  },
};
