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
        Sisa stock: {{ product.stock }}
        <br />
      </p>
    </div>
    <div class="d-flex flex-column justify-content-center">
      <form>
        <select @change="update" name id="input" class="form-control" v-model="qty">
          <option v-for="n in generateArray1toN(5)" :key="`${n}-input-select`" :value="n">{{n}}</option>
        </select>
        <b-button @click="triggerDelete" variant="danger">Delete</b-button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CardCheckout from "@/components/CardCheckout.vue";
export default {
  props: ["productId", 'initialQty', 'id'],
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
    },
    async update (e) {
      let qty = e.target.value
      let id = this.id
      let res = await this.$store.dispatch('updateCart', { id, qty })
      this.$store.dispatch('fetchProduct')
      this.$store.dispatch('fetchCart')
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
              // await this.$store.dispatch('deleteProduct', {id: this._id})
              // await this.$store.dispatch('fetchProduct')
            }
          },
          {
            title: "No"
          }
        ]
      })
    }
  }
};
</script>

<style>
</style>
