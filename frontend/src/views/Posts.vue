<template>
  <div class="post">
    
    <h2>Creat a Post Here</h2>

    <form>
        <label>User Name:</label>

        <input type="text" size="50" v-model="postData.userName" required />

        <label>Title:</label>

        <input type="text" size="50" v-model="postData.title" required />

        <label>Posts:</label>

        <textarea type="text" size="3000" v-model="postData.postText" required />
        
    </form>
    <div class="file-upload">
        <label>Attachment (JPG, PNG, WEBP, WMV, MP4, MP3, )</label>
        <input type="file" ref="file" @change="media" >
    </div>
    <button class="btn" @click.prevent="post">POST IT</button>
    
    <h2>Scroll through employee posts & click to read</h2>

  </div>
</template>

<script>
import axios from "axios"

    export default {
        data() {
            return {
                postData: { userName: '', title: '', postText: '', media: ''},
            };
        },
        methods: {
             post() {
                //TODO add bearer token to post request 
                axios
                    .post("http://localhost:3000/api/posts", this.postdata )
                    .then((response) => {
                        console.log(response);
                        // using stringify to beautify the output
                        this.res = JSON.stringify(response.data);
                        
                        // Navigate to the Posts page after successful login
                        // this.$router.push({ path: '/posts' })
                    })
                    .catch((errors) => {
                        console.log(errors);
                    });
             } 
        }
      }

//TODO use v-if for menu items to show or not


</script>


<style>
/*@media (min-width: 1024px) {*/
  .post {
    /* min-height: 50vh; */
    display: flex;
    flex-direction: column;
    align-items: center;
  }
/*}*/

form {
   width: 90%;
   margin: 0;
}

label {
    margin: 5px;
    display: inline-block;
    font-weight: bold;
}

textarea {
    display: block;
    margin: 10px 5px;
    height: 100px;
    width: 90%;
}

.btn {
    display: block;
    height: 2rem;
    background-color: aquamarine;
    margin: 15px;
}

.file-upload {
    color:blue;
}

input {
    display: block;
    margin: 10px 5px;
    height: 2em;
}
</style>
