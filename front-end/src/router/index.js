import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/Login.vue";
import Expenses from "../views/Expenses.vue";
import Register from "../views/Register.vue";
import ResetPass from "../views/ResetPass.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import ChangePass from "../views/ChangePass.vue";
import Home from "../views/Home.vue";


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/expenses",
    name: "Expenses",
    component: Expenses,
    meta: {
      requiresAuth: true,
    },
  },
  
  {
    path: "/password-reset-confirm/:uid/:token",
    name: "ResetPass",
    component: ResetPass,
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/change-password",
    name: "ChangePass",
    component: ChangePass,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.path == "/")) {
    if (localStorage.getItem("token") != null) {
      next({
        path: "/expenses",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("token") == null) {
      next({
        path: "/",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
