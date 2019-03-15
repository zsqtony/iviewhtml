export default [
  {
    path: "/login",
    name: "login",
    component: () => import("_v/login/index.vue")
  },
  {
    path: "/home",
    name: "home",
    component: () => import("_v/home/index.vue")
  },
  {
    path: "/404",
    component: () => import("_v/404"),
    hidden: true
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true
  }
];
