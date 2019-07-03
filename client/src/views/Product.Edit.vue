<template>
  <div>
    <h2 class="m-5">Edit Product</h2>
    <div class="m-5 d-flex flex-row justify-content-center">
      <b-form @submit="onSubmit">
        <b-form-group label="Name:" label-for="input-1">
          <b-form-input id="input-1" type="text" v-model="form.name" required placeholder="Name"></b-form-input>
        </b-form-group>
        <b-form-group label="Description:" label-for="input-2">
          <b-form-input
            id="input-2"
            type="text"
            v-model="form.description"
            required
            placeholder="Description"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Price:" label-for="input-3">
          <b-form-input
            id="input-3"
            type="number"
            v-model="form.price"
            required
            placeholder="Price"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Stock:" label-for="input-4">
          <b-form-input
            id="input-4"
            type="number"
            v-model="form.stock"
            required
            placeholder="Stock"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Image:" label-for="input-5">
          <input id="input-5" type="file" @change="handleImageChange" required placeholder="File" />
        </b-form-group>

        <b-button type="submit" variant="primary" class="mr-2">
          <b-spinner v-if="submitted" small label="Loading..."></b-spinner>Submit
        </b-button>
        <b-button @click="$router.push({path:'/'})" variant="danger">Cancel</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["name", "stock", "description", "price", "image"],
  computed: mapState(["products"]),
  created() {
    if (!this.products || this.products.length === 0) {
      this.$store.dispatch("fetchProduct").then(e => {
        if (e) {
          this.initForm();
        } else {
          this.$router.push({ path: "/" });
        }
      });
    } else {
      this.initForm();
    }
  },
  data() {
    return {
      form: {
        name: "",
        stock: "",
        description: "",
        price: "",
        image: ""
      },
      submitted: false
    };
  },
  methods: {
    initForm() {
      let product = this.products.find(p => p._id === this.$route.params.id);
      this.form.name = product.name;
      this.form.stock = product.stock;
      this.form.description = product.description;
      this.form.price = product.price;
      this.form.image = product.image;
    },
    handleImageChange(event) {
      let files = event.target.files;
      if (!files.length) return;
      this.form.image = files[0];
    },
    onSubmit() {}
  }
};
</script>

<style>
</style>
