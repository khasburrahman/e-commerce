import Vue from 'vue'
import Vuex from 'vuex'

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
    ADD_PRODUCT_CART_LOCALY(state, payload) {
      state.carts.push(payload)
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
    FETCH_CART(state, payload) {
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
        return false
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
        return false
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
        let res = await axios.post(`${BASE_URL}/product`, payload, axiosConfig({multiPart: true}))
        toastifyHelper('Data berhasil ditambahkan')
        return res
      } catch (err) {
        errorHandler(err)
        return false
      }
    },
    async updateProduct(context, payload) {
      let {formData, id} = payload
      try {
        let res = await axios.patch(`${BASE_URL}/product/${id}`, formData, axiosConfig({multiPart: true}))
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
        context.commit('FETCH_CART', res.data)
        return res
      } catch (err) {
        errorHandler(err)
        return false
      }
    },
    async addToCart (context, payload) {
      let { carts } = context.state
      let { _id, qty = 1 } = payload
      
      if (carts.findIndex(cart => cart.product === _id) !== -1) {
        return errorHandler({ msg: 'Produk sudah masuk ke cart', userError: true })
      } 
      context.commit('ADD_PRODUCT_CART_LOCALY', {
        product: _id,
        qty
      })

      try {
        let res = await axios.post(`${BASE_URL}/cart`, { product: _id, qty }, axiosConfig())
        toastifyHelper('Added to cart!')
        return res
      } catch (err) {
        errorHandler(err)
        return false
      }
    },
    async updateCart (context, payload) {
      let { id, qty } = payload
      try {
        let res = await axios.patch(`${BASE_URL}/cart/${id}`, { qty }, axiosConfig())
        toastifyHelper('cart updated')
        return res
      } catch (err) {
        errorHandler(err)
        return false
      }
    },
    async deleteCart (context, payload) {
      let { id } = payload
      try {
        let res = await axios.delete(`${BASE_URL}/cart/${id}`, axiosConfig())
        toastifyHelper('cart deleted')
        return res
      } catch (err) {
        errorHandler(err)
        return false
      }
    }
  }
})
