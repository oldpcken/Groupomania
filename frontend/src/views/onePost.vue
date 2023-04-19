<template>
  <div class="onepost">
    <h1>This will be the one Post page</h1>

    <h2>You will see the full post that was clicked on</h2>
  </div>
</template>

<script>
export default {
  data() {

  },
  //TODO add indication that a post was read

  beforeCreate() {
    if (localStorage.getItem('loginData') === null) {
      // Go to login page if user is not logged in
      this.$router.push({ path: '/login' })
    }
  },
  methods: {


  }
}

</script>


<style>
.onepost {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
