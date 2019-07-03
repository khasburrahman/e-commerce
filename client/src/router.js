import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'
const toastifyHelper = require('./helpers/toastify')

function notAuthorized() {
  toastifyHelper('Not Authorized')
}

const adminRoute = (to, from, next) => {
  store.dispatch('initApp')
  if (store.state.loggedUser.isAdmin) {
    next()
  } else {
    notAuthorized()
    next(false)
  }
}

const customerRoute = (to, from, next) => {
  store.dispatch('initApp')
  if (localStorage.getItem('token') && store.state.loggedUser.isAdmin === false) {
    next()
  } else {
    notAuthorized()
    next('/login')
  }
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    },
    {
      path: '/product',
      name: 'product-input',
      component: () => import(/* webpackChunkName: "productInput" */ './views/Product.Input.vue'),
      beforeEnter: adminRoute
    },
    {
      path: '/product/:id',
      name: 'product-edit',
      component: () => import(/* webpackChunkName: "productEdit" */ './views/Product.Edit.vue'),
      beforeEnter: adminRoute
    },
    {
      path: '/user',
      name: 'user',
      beforeEnter: customerRoute,
      component: () => import(/* webpackChunkName: "user"*/ './views/User.vue'),
      children: [
        {
          path: 'detail',
          name: 'userDetail',
          component: () => import(/* webpackChunkName: "userDetail" */ './views/UserDetail.vue')
        },
        {
          path: 'cart',
          name: 'userCart',
          component: () => import(/* webpackChunkName: "cart" */ './views/Cart.vue'),
        }
      ]
    }
  ]
})
