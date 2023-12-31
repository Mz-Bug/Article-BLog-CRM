// Defining Routes
const routes = [

  // Paths For Login Layout
  {
    path: "/",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      { path: "", component: () => import("pages/LoginPage.vue") },
      { path: "/signup", component: () => import("../pages/SignUpPage.vue") },
    ],
  },

  // Paths for Super admin layout
  {
    path: "/admin-dashboard",
    meta: { role: "root" },
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Admin/DashBoard.vue"),
      },
      {
        path: "/user",
        component: () => import("pages/Admin/UserPage.vue"),
      },
      {
        path: "/role",
        component: () => import("pages/Admin/RolePage.vue"),
      },
      {
        path: "/permission",
        component: () => import("pages/Admin/PermissionPage.vue"),
      },
    ],
  },

  // Paths for normal user/ admin
  {
    path: "/user-dashboard",
    meta: { role: "admin" },
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
      { path: "/article", component: () => import("pages/ArticlePage.vue") },
      {
        path: "/create_article",
        component: () => import("../components/CreateArticle.vue"),
      },
      {
        path: "/accounts",
        component: () => import("../components/ProfilePage.vue"),
      },
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
