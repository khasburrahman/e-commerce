<template>
  <div class="home">
    <b-container class="bv-example-row">
      <b-row>
        <b-col v-for="(prod) in $store.state.products" :key="prod._id" sm="12" md="6" lg="4">
          <ProductCart v-bind="prod"/> 
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCart from '@/components/CardProduct.vue'
export default {
  name: "home",
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
