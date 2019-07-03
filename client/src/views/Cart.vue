<template>
  <b-container class="bv-example-row">
    <b-row v-if="carts.length > 0">
      <b-col sm="12" md="8">
        <Cart 
          v-for="cart in carts" 
          :key="cart._id" 
          :id="cart._id"
          :productId="cart.product"
          :initialQty="cart.qty" />
      </b-col>
      <b-col sm="12" md="4">
        <p class="mt-5">Total: {{  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(total) }}</p>
        <p>Checkout</p>
      </b-col>
    </b-row>
    <div class="align-center m-5" v-else>
      <h3>No cart</h3>
    </div>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import Cart from '@/components/CardCheckout.vue'
export default {
  created() {
    if (this.products.length === 0) {
      this.$store.dispatch('fetchProduct')
    } 
    if (this.carts.length === 0) {
      this.$store.dispatch('fetchCart')
    }
  },
  computed: {
    ...mapState(["products", "carts"]),
    total() {
      let { carts, products } = this
      return carts.reduce((acc, c) => {
        let product = products.find(p => p._id === c.product)
        return acc + (product.price * c.qty)
      }, 0)
    }
  },
  components: {
    Cart
  }
};
</script>

<style>
</style>
