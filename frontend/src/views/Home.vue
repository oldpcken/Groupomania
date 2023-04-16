<template>
  <main>
    <h2>Please click on a post to read</h2>
    <hr>
    <!-- <p v-model="postData">
        
    </p> -->
  </main>
</template>

<script>
import axios from 'axios'

// export default {
//     data() {
//         return {
//           postdata
//         } 
//         allPosts() {
//                 axios
//                     .get("http://localhost:3000/api/auth/posts", this.postData)
//                     .then((response) => {
//                         console.log(response);
//                         // using stringify to beautify the output
//                         this.res = JSON.stringify(response.data);
                        
//                         // Navigate to the Create Post page after selecting button
//                         this.$router.push({ path: '/posts' })
//                     })
//                     .catch((errors) => {
//                         console.log(errors);
//                     });
//     }


// }


</script>

<style scoped>
h2 {
  color: purple;
}


</style>
