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
    <b-card-text>{{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(price) }}</b-card-text>
    <b-card-text>{{ description }}</b-card-text>

    <div v-if="$store.state.loggedUser.isAdmin">
      <router-link :to="{ name: 'product-edit', params: {id: this._id }}">
        <b-button variant="primary">Edit</b-button>
      </router-link>
      <router-link :to="{ name: 'product-delete', params: {id: this._id }}">
        <b-button variant="primary">Delete</b-button>
      </router-link>
    </div>
    <div v-else>
      <b-button @click="addToCheckout" variant="primary">Add to Cart</b-button>
    </div>
  </b-card>
</template>

<script>
import Toastify from "toastify-js";
export default {
  props: ["description", "price", "image", "name", "_id"],
  methods: {
    addToCheckout() {
      Toastify({
        text: "Added to Cart",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true
      }).showToast();
      this.$store.commit("ADD_PRODUCT_TO_CHECKOUT", this._id);
    }
  }
};
</script>
