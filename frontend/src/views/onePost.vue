<template>
  <div class="onepost">
    <h1>{{ this.post.title }}</h1>

    <p>
      {{ this.post.message }}
    </p>
        
    <video v-if="getExtension(post) === 'wmv'" width="400" controls >
        <source :src="this.post.mediaUrl" type="video/x-ms-wmv" alt="WMV Player"/>
        Your browser does not support the video element.
    </video>


    <video v-else-if="getExtension(post) === 'mp4'" width="400" controls >
        <source :src="this.post.mediaUrl" type="video/mp4" alt="MP4 Player"/>
        Your browser does not support the video element.
    </video>


    <audio v-else-if="getExtension(post) === 'mp3'" controls >
        <source :src="this.post.mediaUrl" type="audio/mpeg" alt="MP3 Player"/>
        Your browser does not support the audio element.
    </audio>
    <audio v-else-if="getExtension(post) === 'wav'" controls >
        <source :src="this.post.mediaUrl" type="audio/wav" alt="WAV Audio Player"/>        
        Your browser does not support the audio element.
    </audio>
    <img v-else-if="['jpg', 'png', 'webp', 'jfif'].includes(getExtension(post))" 
        :src="this.post.mediaUrl" width='400' alt="picture">
    <p v-else="getExtension(post) === null">
      <hr>
    </p>
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
      return url && url.slice(url.lastIndexOf('.') + 1);
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

          this.readIt();
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
    postsPage() {
      // Navigate back to the Posts Post page after viewing post
      this.$router.push({ path: '/' })
    },
    readIt() {
      console.log('Marking as read');
      let loginData = JSON.parse(localStorage.getItem('loginData')) || [];
      axios
        .put(`http://localhost:3000/api/posts/${this.$route.params.id}/read`,
          {
            userId: loginData.userId
          },
          {
            headers: {
              'Authorization': 'Bearer ' + loginData.token
            }
          })
        .then((response) => {
          console.log(response);          
          })        
        .catch((errors) => {
          console.log(errors);
        });
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
