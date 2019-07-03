<template>
  <div>
    <p>Full Name: {{ loggedUser.fullName }}</p>
    <p>Email: {{ loggedUser.email }}</p>
    <p>User Id: {{ loggedUser.user }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(['loggedUser'])
}
</script>

<style>

</style>
