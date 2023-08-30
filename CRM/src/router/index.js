import { route } from "quasar/wrappers";
import { useCounterStore } from "../stores/example-store";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });
  // Router.beforeEach((to, from, next) => {
  //   const token = localStorage.getItem("token");

  //   if (to.matched.some((record) => record.meta.requiresAuth)) {
  //     // This route requires auth, check if the token exists
  //     if (!token) {
  //       // If not logged in, redirect to login page with redirect query
  //       next({
  //         path: "/",
  //         // query: { redirect: to.fullPath },
  //       });
  //     } else {
  //       // If logged in, proceed to the destination
  //       if(to.matched.some((record) => record.meta.AdminrequiresAuth))
  //       next({
  //        path: "/"
  //       });
  //     }
  //   } else {
  //     // If no authentication is required, proceed to the destination
  //     next();
  //   }
  // });
  Router.beforeEach((to, from, next) => {
    // const token = localStorage.getItem("token");
    const store = useCounterStore(); // Assuming this gets your store instance
    const requiresAuth = to.matched.some((record) => record.meta.role);

    if (requiresAuth) {
      if (store.userRole === "user") {
        if (to.meta.role === "user") {
          next();
        } else {
          next("/user-dashboard");
        }
      } else if (store.userRole === "admin") {
        if (to.meta.role === "admin") {
          next();
        } else {
          next("/admin-dashboard");
        }
      } else {
        next("/"); // Redirect to login or appropriate route
      }
    } else {
      next();
    }
  });
  return Router;
});
