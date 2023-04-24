<template>
  <div class="onepost">
    <h1>{{ this.post.title }}</h1>

    <p>
      {{ this.post.message }}
    </p>

    <audio v-if="getExtension(post) === 'mp3'" controls 
        :src="this.post.mediaUrl" type="audio/mpeg" alt="MP3 Player">
         Your browser does not support the audio element.
    </audio>
    <audio v-else-if="getExtension(post) === 'wav'" controls 
        :src="this.post.mediaUrl" type="audio/wav" alt="WAV Audio Player">
        Your browser does not support the audio element.
    </audio>
    <video v-else-if="getExtension(post) === 'wmv'" width="400" controls 
        :src="this.post.mediaUrl" type="video/x-ms-wmv" alt="WMV Player">
      Your browser does not support the video element.
    </video>
    <video v-else-if="getExtension(post) === 'mp4'" width="400" controls 
        :src="this.post.mediaUrl" type="video/mp4" alt="MP4 Player">
        Your browser does not support the video element.
    </video>
    <img v-else="getExtension(post) === 'jpg' || 'webp' || 'png' || 'jfif'"                  
        :src="this.post.mediaUrl" width='400' alt="picture">

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
    getExtension(post) {
      const url = post.mediaUrl;
      console.log('this is url: ', url);
      return url && url.slice(url.lastIndexOf('.') + 1 );
    },
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
    }
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
