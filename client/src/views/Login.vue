<template>
  <div>
    <b-alert v-model="showError" variant="danger" dismissible show>
      Error: {{loginError}}
    </b-alert>
    <h2 class="m-5">Login</h2>
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

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
        showError: false,
        loginError: '',
        show: true
      }
    },
    methods: {
      async onSubmit(evt) {
        evt.preventDefault()
        let res = await this.$store.dispatch('login', {
          email: this.form.email,
          password: this.form.password
        })
        if (res.isAxiosError) {
          this.showError = true
          this.loginError = res.message
          alert(res.message)
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