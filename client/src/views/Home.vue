<template>
  <div class="home">
    <b-container class="bv-example-row">
      <b-row v-if="products.length > 0">
        <b-col v-for="(prod) in products" :key="prod._id" sm="12" md="6" lg="4">
          <ProductCart v-bind="prod"/> 
        </b-col>
      </b-row>
      <div class="align-center m-5" v-else>
        <h3> No products </h3>
      </div>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCart from '@/components/CardProduct.vue'
import { mapState } from 'vuex'

export default {
  name: "home",
  computed: mapState([
    'products'
  ]),
  data() {
    return {
      checkoutList: []
    }
  },
  created() {
    this.$store.dispatch('fetchProduct')
  },
  components: {
    ProductCart
  }
};
</script>
