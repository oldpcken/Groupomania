<template>
  <div class="onepost">
    <h1>The forum post you clicked on</h1>

    <p>
      {{ post.message }}
    </p> 
    <!--TODO add v-if to media types-->
    <!-- <audio controls>
        <source src="" type="audio/mpeg">
        <source src="" type="audio/wav">
        Your browser does not support the audio element.
    </audio> -->
    <!-- <video width="5000" height="240" controls>
        <source src="" type="video/mp4">
        <source :src="this.post.mediaUrl" type="video/x-ms-wmv">
        Your browser does not support the video tag.
    </video> -->
    <img :src="this.post.mediaUrl" width="500">
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
      return {
        post: {}
      }
  },
  beforeCreate() {
    if (localStorage.getItem('loginData') === null) {
      // Go to login page if user is not logged in
      this.$router.push({ path: '/login' })
    }
  },
  mounted() {
      this.getOnePost() 
  },
  methods: {
    getOnePost() {
          console.log('geting one post');
          let loginData = JSON.parse(localStorage.getItem('loginData')) || [];
          
          axios
            .get(`http://localhost:3000/api/posts/${this.$route.params.id}`, 
                {
                    headers: { 
                      'Authorization': 'Bearer ' + loginData.token
                    }                    
            })
            .then((response) => {
                // this.formatPostData(response.data);
                console.log(response);
                
                // using stringify to beautify the output
                this.post = response.data; 
            })
            .catch((errors) => {
              console.log(errors);
            });
      },

  }
}
</script>


<style>
.onepost {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
