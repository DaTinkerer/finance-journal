import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/LoginView.vue";
import Expenses from "../views/ExpensesView.vue";
import Register from "../views/RegisterView.vue";
import ResetPass from "../views/ResetPassView.vue";
import ForgotPassword from "../views/ForgotPasswordView.vue";
import ChangePass from "../views/ChangePassView.vue";
// import Home from "../views/HomeView.vue";

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  // },
  {
    path: "/",
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
    name: "Reset Password",
    component: ResetPass,
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    component: ForgotPassword,
  },
  {
    path: "/change-password",
    name: "Change Password",
    component: ChangePass,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

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
router.beforeEach((to, from, next) => {
  document.title = `${process.env.VUE_APP_TITLE} | ${to.name}`;
  next();
});

export default router;
