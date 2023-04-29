<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Groupomania logo" class="logo" src="@/assets/Groupomania_Logos/icon-left-font.png" />
    <h1>Employee Forum</h1>
    <div class="wrapper">
      <nav>
        <RouterLink to="/" v-if="!['login', 'signup'].includes($route.name)">
            Home
        </RouterLink>

        <RouterLink to="/signup" v-if="!['home', 'profile', 'createPost', 'onePost'].includes($route.name)" >
            Signup
        </RouterLink>

        <RouterLink to="/login" v-if="!['home', 'profile', 'createPost', 'onePost'].includes($route.name)" >
            Login
        </RouterLink>

        <RouterLink to="/posts" v-if="!['login', 'signup'].includes($route.name)">
            Create Post
        </RouterLink>

        <RouterLink to="/profile" v-if="!['login', 'signup'].includes($route.name)">
            Profile
        </RouterLink>

        <button @click.prevent="logout" v-if="!['login', 'signup'].includes($route.name)">
            Logout
        </button>        
      </nav>
    </div>
   </header>

  <RouterView />
</template>

<script>

export default {
    data() {
      return {  
      // data here
      }
    },
    methods: {
        logout() {
          localStorage.removeItem('loginData');
          // Navigate to the Login page after successful localStorage removal
          this.$router.push({ path: '/login' })
        }      
    }        
}

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
  margin: -10px 0 0 0; 
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
  border-right: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.logo {
  margin: -10px 0 0 0;
  width: 100%;
}

header .wrapper {
  display: flex;
  place-items: flex;
  flex-wrap: wrap;
}

button {
  font-size: 1.2rem;
  background-color: white;
  border-color: white;
  color: rgb(247, 104, 133);
}

</style>