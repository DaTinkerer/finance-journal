import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import List from '../views/List.vue'

const routes = [
  {
    path: '/login',
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

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
