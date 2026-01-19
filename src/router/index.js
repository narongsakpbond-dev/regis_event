import { createRouter, createWebHistory } from "vue-router";

import UserView from "../views/UserView.vue";
import AdminView from "../views/AdminView.vue";
import AdminLoginView from "../views/AdminLoginView.vue";

const routes = [
  { path: "/", name: "home", component: UserView },
  { path: "/admin/login", name: "admin-login", component: AdminLoginView },
  { path: "/admin", name: "admin", component: AdminView, meta: { requiresAdminKey: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (!to.matched.some((r) => r.meta?.requiresAdminKey)) return true;

  const key = localStorage.getItem("adminKey");
  if (key) return true;

  return {
    name: "admin-login",
    query: { redirect: to.fullPath },
  };
});

export default router;
