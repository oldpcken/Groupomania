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
import axios from 'axios';

export default {
    data() {
        return {
            postData: { userName: '', password: '' },
        };
    },
    methods: {
        login() {
            axios
                .post('http://localhost:3000/api/auth/login', this.postData)
                .then((response) => {
                    console.log(response);
                    localStorage.setItem('loginData', JSON.stringify(response.data))

                    // Navigate to the Posts page (Home page) after successful login
                    this.$router.push({ path: '/' })
                })
                .catch((errors) => {
                    console.log(errors);
                });
        }
    }
};

</script>

<style scoped>
.login {
    width: 100%;
    max-width: 512px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(249, 218, 218);
}

form {
    max-width: 600px;
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
    height: 2rem;
    width: 95%;
}

.btn {
    display: inline-block;
    height: 2rem;
    color: black;
    background-color: rgb(247, 104, 133);
}
</style>