import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const BASE_URL = process.env.VUE_APP_BASE_URL

export default new Vuex.Store({
  state: {
    loggedUser: {
      fullName: ''
    }
  },
  mutations: {

  },
  actions: {
    async login (context, payload) {
      let { email, password } = payload
      let res = await axios.post(`${BASE_URL}/user/login`, {email, password})
      debugger
    }
  }
})
