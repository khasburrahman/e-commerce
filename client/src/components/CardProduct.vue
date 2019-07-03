<template>
  <b-card
    :title="name"
    :img-src="image"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="m-4"
  >
    <b-card-text>
      {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(price) }}<br/>
      {{ `Stock: ${stock}` }}<br v-if="carts.some(e => e.product === _id)" />
      {{ (carts.some(e => e.product === _id)) ? 'In Cart' : '' }}
    </b-card-text>
    <b-card-text>{{ description }}</b-card-text>

    <div v-if="$store.state.loggedUser.isAdmin">
      <router-link :to="{ name: 'product-edit', params: {id: this._id }}">
        <b-button class="mr-1" variant="primary">Edit</b-button>
      </router-link>
      <b-button @click="triggerDelete" variant="primary">Delete</b-button>
    </div>
    <div v-else>
      <b-button v-if="$store.state.loggedUser.user !== ''" :disabled="stock < 1 || carts.some(e => e.product === _id)" @click="addToCheckout" variant="primary">Add to Cart</b-button>
    </div>
  </b-card>
</template>

<script>
const toastifyHelper = require('../helpers/toastify')
import { mapState } from 'vuex'
export default {

  props: ["description", "price", "image", "name", "stock", "_id"],
  computed: {
    ...mapState(['carts']),
  },
  methods: {
    async addToCheckout() {
      let status = await this.$store.dispatch("addToCart", {
        _id: this._id,
      });
      this.$store.dispatch("fetchCart")
      this.$store.dispatch("fetchProduct")
    },
    triggerDelete() {
      this.$modal.show("dialog", {
        title: "Are you sure?",
        text: `Delete product <b>${this.name}</b>?`,
        buttons: [
          {
            title: "Yes",
            handler: async () => {
              this.$modal.hide('dialog')
              await this.$store.dispatch('deleteProduct', {id: this._id})
              await this.$store.dispatch('fetchProduct')
            }
          },
          {
            title: "No"
          }
        ]
      });
    }
  }
};
</script>
