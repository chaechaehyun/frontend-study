import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    // redirect: "/",
    children: [
      {
          path: '/',
          name: 'Main',
          component: () => import(/* webpackPrefetch: true */'@/views/Main.vue'),
      },
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  store,
});

export default router;

// router.push("/login");
