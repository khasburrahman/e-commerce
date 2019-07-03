<template>
  <div>
    <b-alert v-model="showError" variant="danger" dismissible show>
      Error: {{loginError}}
    </b-alert>
    <h2 class="m-5">Register</h2>
    <div class="m-5 d-flex flex-row justify-content-center">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
          <b-form-input
            id="input-2"
            type="password"
            v-model="form.password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Your Full Name:" label-for="input-3">
          <b-form-input
            id="input-3"
            type="text"
            v-model="form.fullName"
            required
            placeholder="Full Name"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
  const Toastify = require('toastify-js')

  export default {
    data() {
      return {
        form: {
          email: '',
          password: '',
          fullName: '',
        },
        showError: false,
        loginError: '',
        show: true
      }
    },
    methods: {
      async onSubmit(evt) {
        evt.preventDefault()
        let res = await this.$store.dispatch('register', {
          email: this.form.email,
          password: this.form.password,
          fullName: this.form.fullName
        })
        if (res.isAxiosError) {
          Toastify({
            text: "Register Failed",
            duration: 3000,
            close: true,
            gravity: "top", 
            position: 'left', 
            stopOnFocus: true 
          }).showToast();
        } else {
          Toastify({
            text: "Register Success",
            duration: 3000,
            close: true,
            gravity: "top", 
            position: 'left', 
            stopOnFocus: true 
          }).showToast();
          this.$router.push({ path: '/login' })
        }
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.password = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>