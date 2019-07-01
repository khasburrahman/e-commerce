<template>
  <div>
    <h2 class="m-5">Add Product</h2>
    <div class="m-5 d-flex flex-row justify-content-center">
      <b-form @submit="onSubmit">
        <b-form-group label="Name:" label-for="input-1">
          <b-form-input
            id="input-1"
            type="text"
            v-model="form.name"
            required
            placeholder="Name"
          ></b-form-input>
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
            placeholder="Name"
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
          <input
            id="input-5"
            type="file"
            @change="handleImageChange"
            required
            placeholder="File"
          />
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
  const Toastify = require('toastify-js')
  
  export default {
    props: ['registerSuccess'],
    data() {
      return {
        form: {
          name: '',
          stock: '',
          description: '',
          price: '',
          image: ''
        },
      }
    },
    methods: {
      handleImageChange (event) {
        let files = event.target.files
        if (!files.length) return
        this.form.image = files[0]
      },
      async onSubmit(evt) {
        evt.preventDefault()
        let formData = new FormData()
        formData.append('name', this.form.name),
        formData.append('price', this.form.price)
        formData.append('image', this.form.image)
        formData.append('stock', this.form.stock)
        formData.append('description', this.form.description)

        let res = await this.$store.dispatch('postProduct', formData)
        if (res.isAxiosError) {
          Toastify({
            text: "Error: "+res.data,
            duration: 3000,
            close: true,
            gravity: "top", 
            position: 'left', 
            stopOnFocus: true 
          }).showToast();
        } else {
          Toastify({
            text: "berhasil tambah produk",
            duration: 3000,
            close: true,
            gravity: "top", 
            position: 'left', 
            stopOnFocus: true 
          }).showToast();
          this.$router.push({ path: '/' })
        }
      },
    }
  }
</script>