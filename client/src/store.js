import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const BASE_URL = process.env.VUE_APP_BASE_URL
const axios = require('axios')
const jsonwebtoken = require('jsonwebtoken')

export default new Vuex.Store({
  state: {
    loggedUser: {
      fullName: '',
      email: '',
      user: '',
      isAdmin: false
    }
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.loggedUser = payload
    },
    INIT_APP (state, payload) {
      state.loggedUser = payload
    },
    LOGOUT (state) {
      state.loggedUser.fullName = ''
      state.loggedUser.email = ''
      state.loggedUser.user = ''
      state.loggedUser.isAdmin = false
    }
  },
  actions: {
    initApp (context) {
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
    async login (context, payload) {
      let { email, password } = payload
      try {
        let res = await axios.post(`${BASE_URL}/user/login`, {email, password})
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
    }
  }
})
