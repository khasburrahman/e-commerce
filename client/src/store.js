import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs';

Vue.use(Vuex)
const BASE_URL = process.env.VUE_APP_BASE_URL
const axios = require('axios')
const jsonwebtoken = require('jsonwebtoken')

function axiosConfig({multiPart}) {
  return {
    headers: {
      token: localStorage.getItem('token'),
    },
    'Content-Type': (multiPart) ? 'multipart/form-data' : 'application/json'
  }
}


export default new Vuex.Store({
  state: {
    loggedUser: {
      fullName: '',
      email: '',
      user: '',
      isAdmin: false
    },
    products: [],
    carts: [],
    checkoutList: [],
  },
  mutations: {
    ADD_PRODUCT_TO_CHECKOUT(state, payload) {
      if (!state.checkoutList.includes(payload)) {
        state.checkoutList.push(payload)
      }
    },
    REMOVE_PRODUCT_TO_CHECKOUT(state, payload) {
      let index = state.checkoutList.indexOf(payload)
      if (index !== -1) {
        state.checkoutList.splice(index, 1)
      }
    },
    SET_LOGIN(state, payload) {
      state.loggedUser = payload
    },
    INIT_APP(state, payload) {
      state.loggedUser = payload
    },
    LOGOUT(state) {
      state.loggedUser.fullName = ''
      state.loggedUser.email = ''
      state.loggedUser.user = ''
      state.loggedUser.isAdmin = false
    },
    FETCH_PRODUCTS(state, payload) {
      state.products = payload
    },
    FETCH_CARD(state, payload) {
      state.carts = payload
    }
  },
  actions: {
    initApp(context) {
      let token = localStorage.getItem('token')
      if (token) {
        let decodedPayload = jsonwebtoken.decode(token)
        if (Date.now() >= decodedPayload.exp * 1000) {
          localStorage.clear()
          return
        }
        let { email, fullName, isAdmin, user } = decodedPayload
        context.commit('INIT_APP', { email, fullName, isAdmin, user })
      }
    },
    async login(context, payload) {
      let { email, password } = payload
      try {
        let res = await axios.post(`${BASE_URL}/user/login`, { email, password })
        let token = res.data.access_token
        if (token) {
          localStorage.setItem('token', token)
          let decodedPayload = jsonwebtoken.decode(token)
          let { email, fullName, isAdmin, user } = decodedPayload
          context.commit('SET_LOGIN', { email, fullName, isAdmin, user })
          return {}
        }
      } catch (err) {
        return err
      }
    },
    async register (context, payload) {
      let { email, password, fullName } = payload
      try {
        await axios.post(`${BASE_URL}/user/register`, { email, password, fullName })
        return {}
      } catch (err) {
        return err
      }
    },
    async fetchProduct(context) {
      try {
        let res = await axios.get(`${BASE_URL}/product`)
        context('FETCH_PRODUCTS', res.data)
        return {}
      } catch (err) {
        return err
      }
    },
    async postProduct(context, payload) {
      try {
        await axios.post(`${BASE_URL}/product`, payload, axiosConfig({multiPart: true}))
        return {}
      } catch (err) {
        return err
      }
    },
    async fetchCart(context) {
      try {
        let res = await axios.get(`${BASE_URL}/cart`, axiosConfig())
        context('FETCH_CART', res.data)
        return {}
      } catch (err) {
        return err
      }
    }
  }
})
