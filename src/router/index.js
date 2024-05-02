import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "all-task",
      meta: { layout: "default" },
      components: {
        default: () => import("@/views/home/menu.vue"),
        content: () => import("@/views/all-task/all-task.vue"),
      },
    },
    {
      path: "/login",
      name: "login",
      meta: { layout: "empty" },
      component: () => import("@/views/account/login.vue"),
    },
    {
      path: "/register",
      name: "register",
      meta: { layout: "empty" },
      component: () => import("@/views/account/register.vue"),
    },
  ],
});

export default router;
