import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as Utils from "../src/utils/utils"

// createApp(App).use(store).use(router).mount("#app");
const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");

// app.provide('$utils', utils);
app.config.globalProperties.$utils = Utils;