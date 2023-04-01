<template>
  <div class="signup">
    <form>
        <label>USERNAME:</label>

        <input type="text" size="50" v-model="postData.userName" required/>

        <label>PASSWORD:</label>

        <input type="password" size="50" v-model="postData.password" required/>
    </form>
    <button @click.prevent="signup">SIGNUP</button>
    <h1>This will be the signup page</h1>
    <h2>A user name and a password will be needed!</h2>
  </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            postData: { userName: '', password: ''},
        };
    },
    methods: {
        signup() {
            axios
                .post("http://localhost:3000/api/auth/signup", this.postData)
                .then((response) => {
                    console.log(response);
                    // using stringify to beautify the output
                    this.res = JSON.stringify(response.data);
                })
                .catch((errors) => {
                    console.log(errors); // Errors
                });
        }
    },
    
};

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

form {
   min-width: 420;
}

label {
    margin: 5px 0;
    display: inline-block;
    font-weight: bold;
}

input {
    display: block;
    margin: 15px 0;
}
</style>
