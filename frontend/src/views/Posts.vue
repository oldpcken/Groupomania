<template>
  <div class="post">
    
    <h1>Creat a Post Here</h1>

    <form>
        <label>Posts:</label>

        <textarea type="text" size="3000" v-model="postData.postText" required />
        
    </form>
    <div class="file-upload">
        <input type="file" >
    </div>
    <button class="btn" @click.prevent="post">POST IT</button>
    
    <h2>Scroll through employee posts & click to read</h2>

  </div>
</template>

<script>
import axios from "axios";

    export default {
        data() {
            return {
                postData: { postText: '', postPic: ''},
            };
        },
        methods: {

        }
      }

//TODO use v-if for menu items to show or not


</script>


<style>
@media (min-width: 1024px) {
  .post {
    min-height: 50vh;
    display: flex;
    align-items: center;
  }
}

form {
   min-width: 420;
   margin: 10px 5px;
}

label {
    margin: 5px;
    display: inline-block;
    font-weight: bold;
}

textarea {
    display: block;
    margin: 10px 5px;
    min-height: 20vh;
    min-width: 40vw;
}

.btn {
    display: block;
    height: 1.5rem;
    background-color: aquamarine;
}

</style>
