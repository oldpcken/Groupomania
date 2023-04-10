<template>
  <div class="login">
    <form>
        <label>USERNAME:</label>

        <input type="text" size="50" v-model="postData.userName" required />

        <label>PASSWORD:</label>

        <input type="password" size="50" v-model="postData.password" required />
    </form>
    <button class="btn" @click.prevent="login">LOGIN</button>
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
            login() {
                axios
                    .post("http://localhost:3000/api/auth/login", this.postData)
                    .then((response) => {
                        console.log(response);
                        // using stringify to beautify the output
                        this.res = JSON.stringify(response.data);
                        // Navigate to the Posts page after successful login
                        this.$router.push({ path: '/posts' })
                    })
                    .catch((errors) => {
                        console.log(errors);
                    });
                    // Get user data to put into local storage
                    // .get("http://localhost:3000/api/auth/login", this.postData)
                    // .then((response) => {
                    //     console.log(response);
                    //     let result = axios.get(`https://reqres.in/api/users?email=${this.email}&password=${this.password}&delay=1`)
                    //     if (result.status == 200 /*&& result.data.length > 0*/) {
                    //         localStorage.setItem('userInfo', JSON.stringify(result.data))
                    //         //this.$router.push('/firstPage')
                    //         this.status = 'Success'
                    //     } else {
                    //         this.status = 'Failure'
                    //     }
                    //     //TODO add userid & token to local storage
                    //     // using stringify to beautify the output
                    //     this.res = JSON.stringify(response.data);

                    // })
                    // .catch((errors) => {
                    //     console.log(errors); // Errors
                    // })
            }
        }
    };
        
</script>

<style scoped>
/* @media (min-width: 996px) {
  .login {
    min-height: 50vh;
    display: flex;
    align-items: center;
    background-color: lightyellow;
  }
} */

form {
   min-width: 420;
   margin: 10px 5px;
}

label {
    margin: 5px;
    display: inline-block;
    font-weight: bold;
}

input {
    display: block;
    margin: 10px 5px;
    height: 2em;
}

.btn {
    display: inline-block;
    height: 1.5rem;
    background-color: aquamarine;
}
</style>
