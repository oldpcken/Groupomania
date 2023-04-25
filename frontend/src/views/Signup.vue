<template>
    <div class="signup">
        <form>
            <label>USERNAME:</label>

            <input type="text" size="50" v-model="postData.userName" required />

            <label>PASSWORD:</label>

            <input type="password" size="50" v-model="postData.password" required />
        </form>
        <button class="btn" @click.prevent="signup">SIGNUP</button>
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
        signup() {
            axios
                .post('http://localhost:3000/api/auth/signup', this.postData)
                .then((response) => {
                    console.log(response);
                    // using stringify to beautify the output
                    this.res = JSON.stringify(response.data);
                    // Navigate to the Login page after successful signup
                    this.$router.push({ path: '/login' })
                })
                .catch((errors) => {
                    console.log(errors); // Errors
                });
        }
    },
};

</script>

<style scoped>
.signup {
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