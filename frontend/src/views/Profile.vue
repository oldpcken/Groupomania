<template>
  <div class="profile">
    <h1>Employee User Profile</h1>
    
    <h2>If you no longer want to use the forum, you may delete your account!</h2>
    
    <button class="btn" @click.prevent="profile">DELETE your account</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {    
    return {
      postData: { id: '', userName: ''},         
    };    
  },  
  methods: {
    profile() {
      //TODO get userID from local storage
      const userId = 1
      axios
        .delete(`http://localhost:3000/api/auth/${ userId }`)
        .then((response) => {
            // using stringify to beautify the output
            this.res = JSON.stringify(response.data);
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


<style>
@media (min-width: 1024px) {
  .profile {
    min-height: 75vh;
    display: flex;
    align-items: center;
  }
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
  /* margin: 5px auto; */
}
</style>
