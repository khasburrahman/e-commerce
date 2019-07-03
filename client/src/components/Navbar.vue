<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <router-link to="/">
        <b-navbar-brand>L U M S</b-navbar-brand>
      </router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->

        <b-navbar-nav class="ml-auto">
          <div v-if="$store.state.loggedUser.isAdmin" class="mr-3">
            <router-link to="/product">
              <b-button variant="light">Add Product</b-button>
            </router-link>
          </div>
          <div v-else-if="$store.state.loggedUser.user !== ''" class="mr-3">
            <router-link to="/user/cart">
              <b-button variant="light">Cart ({{ carts.length }})</b-button>
            </router-link>
          </div>
          <div v-if="$store.state.loggedUser.fullName !== ''">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template slot="button-content">
                <strong>{{ $store.state.loggedUser.fullName }}</strong>
              </template>
              <b-dropdown-item @click="signOut" href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </div>
          <div v-else>
            <router-link to="/login">
              <b-button variant="light">Login</b-button>
            </router-link>
            <router-link to="/register">
              <b-button variant="light" class="m-2">Register</b-button>
            </router-link>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "navbar",
  computed: mapState(['carts']),
  props: [],
  methods: {
    signOut() {
      localStorage.clear();
      this.$store.commit("LOGOUT");
      this.$router.push({ path: "/login" });
    }
  }
};
</script>
