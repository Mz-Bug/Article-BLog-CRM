const routes = [
  {
    path: "/",
    component: () => import("layouts/LoginLayout.vue"),
    children: [{ path: "", component: () => import("pages/LoginPage.vue") }],
  },
  {
    path: "/admin-dashboard",
    meta: { role: "admin" },
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/DashBoard.vue"),
      },
    ],
  },
  {
    path: "/user-dashboard",
    meta: { role: "user" },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/DashBoard.vue"),
      },
      {
        path: "/profile",
        component: () => import("../components/ProfilePage.vue"),
      },
      { path: "/chat", component: () => import("../components/ChatBox.vue") },
      { path: "/dashboard", component: () => import("pages/DashBoard.vue") },
      { path: "/article", component: () => import("pages/IndexPage.vue") },
      {
        path: "/create_article",
        component: () => import("../components/CreateArticle.vue"),
      },
      { path: "/settings", component: () => import("pages/SettingPage.vue") },
      {
        path: "/accounts",
        component: () => import("../components/ProfilePage.vue"),
      },
      { path: "/helps", component: () => import("pages/HelpsPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
