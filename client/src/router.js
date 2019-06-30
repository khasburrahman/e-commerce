import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Toastify from 'toastify-js'

function notAuthorized() {
  Toastify({
    text: "Not Authorized",
    duration: 3000,
    close: true,
    gravity: "top",
    position: 'left',
    stopOnFocus: true
  }).showToast();
}

const adminRoute = (to, from, next) => {
  if (this.$store.state.loggedUser.isAdmin) {
    next()
  } else {
    notAuthorized()
    next(false)
  }
}

const customerRoute = (to, from, next) => {
  if (this.$store.state.loggedUser.isAdmin === false) {
    next()
  } else {
    notAuthorized()
    next(false)
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
      component: () => import(/* webpackChunkName: "about" */ './views/Register.vue')
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
      path: '/delete/product/:id',
      name: 'product-delete',
      component: () => import(/* webpackChunkName: "productDelete" */ './views/Product.Delete.vue'),
      beforeEnter: adminRoute
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import(/* webpackChunkName: "checkout" */ './views/Checkout.vue'),
      beforeEnter: customerRoute
    }
  ]
})
