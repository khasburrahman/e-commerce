<template>
  <div class="d-flex flex-row justify-content-center mt-5">
    <img :src="product.image" style="width:200px" class="m-5s" />
    <div class="d-flex flex-column justify-content-center m-5">
      <p>
        <strong>{{ product.name }}</strong>
        <br />
        Price @: {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(product.price) }}
        <br />
        {{ product.description }}
        <br />
      </p>
    </div>
    <div class="d-flex flex-column justify-content-center">
      <form>
        <select name id="input" class="form-control" v-model="qty">
          <option v-for="n in generateArray1toN(5)" :key="`${n}-input-select`" :value="n">{{n}}</option>
        </select>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CardCheckout from "@/components/CardCheckout.vue";
export default {
  props: ["productId", 'initialQty'],
  data() {
    return {
      qty: this.initialQty
    }
  },
  computed: {
    ...mapState(["products"]),
    product() {
      return this.products.find(p => p._id === this.productId);
    }
  },
  methods: {
    generateArray1toN(n) {
      return [...Array(n).keys()].map(x => x + 1)
    }
  }
};
</script>

<style>
</style>
