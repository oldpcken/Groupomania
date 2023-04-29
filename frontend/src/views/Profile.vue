<template>
  <div class="profile">
    <h1>Employee User Profile</h1>

    <h2>Account for {{ name }}</h2>
    <h2>If you no longer want to use the forum, you may delete your account!</h2>

    <button class="btn" @click.prevent="profile">DELETE your account</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: ''
    };
  },
  beforeCreate() {
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    if (loginData === null) {
      // Go to login page if user is not logged in
      this.$router.push({ path: '/login' })
      .then(() => { this.$router.go() })
    }
  },
  mounted() {
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    this.name = loginData.user;
  },
  methods: {
    profile() {
      // Get local storage data
      let loginData = JSON.parse(localStorage.getItem('loginData')) || [];
      
      console.log(loginData);

      axios
        .delete((`http://localhost:3000/api/auth/${loginData.userId}`),
          {
            headers: {
              'Authorization': 'Bearer ' + loginData.token
            }
          })
        .then((response) => {
          // using stringify to beautify the output
          this.res = JSON.stringify(response.data);
          const name = loginData.user;
          // Clear the user data from local storage 
          localStorage.removeItem('loginData');
          // Navigate to the Signup page after successful account deletion
          this.$router.push({ path: '/signup' })
        })
        .catch((errors) => {
          console.log(postData);
          console.log(errors); // Errors
        });
    }
  },
}

</script>

<style scoped>
.profile {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  padding: 15px;
  font-size: 2rem;
}

h2 {
  padding: 20px;
  text-align: center;
}

btn {
  margin: 20px;
  color: black;
}
</style>