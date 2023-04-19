<template>
  <main>
    <h2>Please click on a post to read</h2>
    <hr>
    <textarea v-model="allPosts"></textarea>

    <button @click.prevent="createPost" >Create a Post</button>
  </main>
</template>

<script>
import axios from 'axios';

export default {
    beforeCreate() {
        if (localStorage.getItem("loginData") === null) {
            // Go to login page if user is not logged in
            this.$router.push({ path: '/login' })
        }
    },
    // data() {
    //     return {
    //         // postdata: {
    //         //     any: any
    //         // }
    //     }
    // },
    methods: { 
      allPosts() {
          localStorage.getItem('loginData', JSON.parse(response.data))
          axios
            .get("http://localhost:3000/api/auth/posts", 
                {
                    headers: { Authorization: this.user.token },
                    params: { userId: this.user.id }
            })
            .then((response) => {
                console.log(response);
                
                // using stringify to beautify the output
                this.res = JSON.stringify(response.data);
                
            })
            .catch((errors) => {
              console.log(errors);
            });
      },
      createPost() {
        // Navigate to the Create Post page after selecting button
        this.$router.push({ path: '/posts' })
      }
    }  
}

</script>

<style scoped>
h2 {
  color: purple;
}

textarea {
  width: 100%;
  background-color: light rgb(245, 240, 240)
}

</style>
