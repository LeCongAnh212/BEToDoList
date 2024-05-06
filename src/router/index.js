import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "all-task",
      meta: { layout: "default", requiresAuth: true },
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
    {
      path: "/finished",
      name: "finished",
      meta: { layout: "default", requiresAuth: true },
      components: {
        default: () => import("@/views/home/menu.vue"),
        content: () => import("@/views/finished/finished.vue"),
      },
    },
    {
      path: "/unfinished",
      name: "unfinished",
      meta: { layout: "default", requiresAuth: true },
      components: {
        default: () => import("@/views/home/menu.vue"),
        content: () => import("@/views/unFinished/unFinished.vue"),
      },
    },
    {
      path: "/out-date",
      name: "out-date",
      meta: { layout: "default", requiresAuth: true },
      components: {
        default: () => import("@/views/home/menu.vue"),
        content: () => import("@/views/outDate/outDate.vue"),
      },
    },
    {
      path: "/type/:typeName",
      name: "type-view",
      meta: { layout: "default", requiresAuth: true },
      components: {
        default: () => import("@/views/home/menu.vue"),
        content: () => import("@/views/viewByType/viewByType.vue"),
      },
    },
  ],
});


import checkIsLogin from "@/authorization";

router.beforeEach(async (to, from, next) => {
  const isLoggedIn = await checkIsLogin();
  if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn) {
    console.log("no login");
    next("/login");
  } else if (isLoggedIn) {
    switch (to.name) {
      case "login" || "register":
        next({ path: "/" });
        break;
      case "homepage":
        next({ path: "/" });
        break;
      default:
        next();
        break;
    }
  } else next();
});


export default router;
