import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: "AllGames",
    component: () => import(/* webpackChunkName: "allgames" */ '../views/AllGames.vue')
  },
  {
    path: '/about',
    name: "About",
    component: () => import(/* webpackChunkName: "allgames" */ '../views/About.vue')
  },
  {
    path: '*',
    name: "NotFound",
    component: () => import(/* webpackChunkName: "allgames" */ '../views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
