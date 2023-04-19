<template>
  <div class="profile">
    <h1>Employee User Profile</h1>

    <h2>If you no longer want to use the forum, you may delete your account!</h2>

    <button class="btn" @click.prevent="profile">DELETE your account</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      postData: { id: '', userName: '' },
    };
  },
  beforeCreate() {
    if (localStorage.getItem("loginData") === null) {
      // Go to login page if user is not logged in
      this.$router.push({ path: '/login' })
    }
  },

  methods: {
    profile() {
      localStorage.getItem('loginData', JSON.parse(response.data))
      //TODO get userID from local storage
      
      //TODO add auth beartoken to authorization header
      axios
        .delete((`http://localhost:3000/api/auth/${userId}`),
            {
                headers: { Authorization: this.user.token },
                params: { userId: this.user.id }
          })
        .then((response) => {
          // using stringify to beautify the output
          // this.res = JSON.stringify(response.data);

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

//TODO show username , user id, and token taken from local storage

//TODO add code the the to delete the user button

//TODO add axios code to do do delete, grab bearer token, clear local storage and redirect to login page

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
  font-size: 3rem;
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
