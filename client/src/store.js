import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs';

const errorHandler = require('./helpers/errorHandler')
const toastifyHelper = require('./helpers/toastify')

Vue.use(Vuex)
const BASE_URL = process.env.VUE_APP_BASE_URL
const axios = require('axios')
const jsonwebtoken = require('jsonwebtoken')

function axiosConfig({multiPart} = {}) {
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
      toastifyHelper('Logged Out!')
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
    },
    DELETE_LOCAL_PRODUCT(state, payload) {
      let idx = state.products.findIndex(product => product._id === payload.id)
      if (idx !== -1) {
        state.products.splice(idx, 1)
      }
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
        return true
      } else {
        return false
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
          toastifyHelper('Login Success!')
          return res
        } else {
          toastifyHelper('Login Failed! <No Token Provided>')
          console.error('No token provided from the API', res)
          return false
        }
      } catch (err) {
        toastifyHelper('Login Failed!')
        errorHandler(err)
        return err
      }
    },
    async register (context, payload) {
      let { email, password, fullName } = payload
      try {
        let res = await axios.post(`${BASE_URL}/user/register`, { email, password, fullName })
        toastifyHelper('Register Succesful!')
        return res
      } catch (err) {
        errorHandler(err)
        return err
      }
    },
    async fetchProduct(context) {
      try {
        let res = await axios.get(`${BASE_URL}/product`)
        context.commit('FETCH_PRODUCTS', res.data)
        return res
      } catch (err) {
        errorHandler(err)
        return false
      }
    },
    async postProduct(context, payload) {
      try {
        let res = axios.post(`${BASE_URL}/product`, payload, axiosConfig({multiPart: true}))
        toastifyHelper('Data berhasil ditambahkan')
        return res
      } catch (err) {
        errorHandler(err)
        return false
      }
    },
    async deleteProduct(context, payload) {
      try {
        context.commit('DELETE_LOCAL_PRODUCT', payload)
        let res = await axios.delete(`${BASE_URL}/product/${payload.id}`, axiosConfig())
        toastifyHelper('Data berhasil dihapus')
        return res
      } catch (err) {
        errorHandler(err)
        return false
      }
    },
    async fetchCart(context) {
      try {
        let res = await axios.get(`${BASE_URL}/cart`, axiosConfig())
        context('FETCH_CART', res.data)
        return res
      } catch (err) {
        errorHandler(err)
        return false
      }
    }
  }
})
