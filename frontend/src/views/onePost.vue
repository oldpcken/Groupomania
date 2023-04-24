<template>
  <div class="onepost">
    <h1>{{ this.post.title }}</h1>

    <p>
      {{ this.post.message }}
    </p>
    <img v-if="['png','jpeg','webp'].includes(this.post.media)"
        :src="post.mediaUrl" width='400' alt="picture"
    >   
    <audio v-if="['mp3'].includes(this.post.media)" controls         
       :src="this.mediaUrl" type="audio/mpeg" alt="MP3 Player">        
        Your browser does not support the audio element.
    </audio>
    
    <!--I think I tried this way -->
    <!-- <audio v-if="'mime-type' = 'wav'" controls>  -->
    <!--I think I tried this way too-->
    <audio v-if="'type' = 'audio/wav'" controls>    
        <source :src="this.post.mediaUrl" type="audio/wav" alt="WAV Audio Player">
        Your browser does not support the audio element.
    </audio>

    <video v-if="['wmv'].includes(this.post.media)" width="400" controls
        :src="this.post.mediaUrl" type="video/x-ms-wmv" alt="WMV Player">
        Your browser does not support the video element.
    </video>
    <video v-if="['mp4'].includes(this.post.media)" width="400" controls 
        :src="this.post.mediaUrl" type="video/mp4" alt="MP4 Player">        
        Your browser does not support the video element.
    </video>
    
    <button class=btn @click.prevent="postsPage">Back to Posts</button>
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
    postsPage() {
    // Navigate back to the Posts Post page after viewing post
    this.$router.push({ path: '/' })  
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

p {
  font-size: 1.5rem;
}

</style>
