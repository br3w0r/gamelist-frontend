import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: "AllGames",
    component: () => import(/* webpackChunkName: "allgames" */ '../views/AllGames.vue'),
    props: { myGames: false }
  },
  {
    path: '/my',
    name: "MyGames",
    component: () => import(/* webpackChunkName: "allgames" */ '../views/AllGames.vue'),
    props: { myGames: true }
  },
  {
    path: '/game-details/:id',
    name: "GameDetails",
    component: () => import(/* webpackChunkName: "allgames" */ '../views/GameDetails.vue')
  },
  {
    path: '/about',
    name: "About",
    component: () => import(/* webpackChunkName: "allgames" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: "Login",
    component: () => import(/* webpackChunkName: "allgames" */ '../views/Login.vue')
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
