<template>
  <div class="login">
    <form>
        <label>USERNAME</label>     
        <input type="text" size="50" required />
        <label>PASSWORD</label>
        <input type="text" size="50" required />
    </form>
    <button>LOGIN</button>

    <h1>This will be the login page</h1>
    <h2>The user enters their user name and password</h2>
  </div>
</template>

<script>
    //TODO add import/export code
    //TODO add axios post
    //TODO add userid & token to local storage
    //TODO use vue router to go to post.vue

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
