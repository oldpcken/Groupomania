<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Groupomania logo" class="logo" src="@/assets/Groupomania_Logos/icon-left-font.png" />
    <h1>Employee Forum</h1>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/signup">Signup</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/profile">Profile</RouterLink>
        <RouterLink to="/posts">Post</RouterLink>
        <RouterLink to="/onepost">OnePost</RouterLink>
        <!-- TODO add logout button -->
      </nav>
    </div>
   </header>

  <RouterView />
</template>

<script>

export default{
  //TODO add method for logout - use LocalStorage removeitem()
   
}

//TODO add conditional rendering for menu items

//TODO Put menu items at top of page

</script>

<style>
header {
  display: flex;
  flex-direction: column;
  line-height: 1.5;
}

.logo {
  display: block;
  size: 50vw;
  margin: 0 auto;
}

h1 {
  display: block;
  text-align: center;
  margin: -30px 0 0 0;
  font-size: 1rem;
}

nav {
  display: block;
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
  margin: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

/*@media (min-width: 1024px) {*/
  /* header {
    display: flex;
    place-items: center;
    padding: 10px; 
  } */

  .logo {
    margin: -20px 0 0 0;
    width: 100%;
  }

  header .wrapper {
    display: flex;
    place-items: flex;
    flex-wrap: wrap;
  }

  /* nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  } */
/*}*/
</style>