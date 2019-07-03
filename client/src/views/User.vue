<template>
  <div>
    <h3 class="align-center">User Page</h3>
    <router-link to="/user/detail" > Detail </router-link>
    <router-link to="/user/cart" > Cart </router-link>
    <hr/>
    <router-view/>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
