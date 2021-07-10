import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import List from '../views/List.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/list',
    name: 'List',
    component: List,
    meta: {
      requiresAuth: true
    }
  },
  // {
  //   // path: '/about',
  //   // name: 'About',
  //   // // route level code-splitting
  //   // // this generates a separate chunk (about.[hash].js) for this route
  //   // // which is lazy-loaded when the route is visited.
  //   // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
