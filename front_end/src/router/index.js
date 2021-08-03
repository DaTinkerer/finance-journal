import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import List from '../views/List.vue'
import Register from '../views/Register.vue'
import ResetPass from '../views/ResetPass.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import ChangePass from '../views/ChangePass.vue'




const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/list',
    name: 'List',
    component: List,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/password-reset-confirm/:uid/:token',
    name: 'ResetPass',
    component: ResetPass,
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
  },
  {
    path: '/change-password',
    name: 'ChangePass',
    component: ChangePass,
    meta: {
      requiresAuth: true
    }
  },
  
]



const router = createRouter({
  history: createWebHashHistory(),
  routes
  
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
      next({
        path: '/',
        
      })
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})

export default router
