import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard'
    },
    path: '/admin',
    name: 'home',
    component: Home
  },
  {
    meta: {
      title: 'Пользователи'
    },
    path: '/admin/users',
    name: 'users',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tables" */ '../views/Users.vue')
  },
  {
    meta: {
      title: 'Интересы'
    },
    path: '/admin/interests',
    name: 'interests',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tables" */ '../views/Interest.vue')
  },
  {
    meta: {
      title: 'Отзывы'
    },
    path: '/admin/reports',
    name: 'reports',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tables" */ '../views/Reports.vue')
  },
  {
    meta: {
      title: 'Тарифы'
    },
    path: '/admin/tariffs',
    name: 'tariffs',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tables" */ '../views/Tariffs.vue')
  },
  {
    meta: {
      title: 'Profile'
    },
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
  },
  {
    meta: {
      title: 'Добавить интерес'
    },
    path: '/admin/interest/new',
    name: 'interest.new',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/InterestNew.vue')
  },
  {
    meta: {
      title: 'Добавить тариф'
    },
    path: '/admin/tariff/new',
    name: 'tariff.new',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/TariffNew.vue')
  },
  {
    meta: {
      title: 'Edit Client'
    },
    path: '/admin/client/:id',
    name: 'client.edit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/ClientForm.vue'),
    props: true
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
