<template>
  <main>
    <h2>Scroll Through the Employee Posts/Click to Read</h2>
    <hr>
    <table>
      <thead>
        <td>
          <th>Id</th>
          <th>Title</th>          
        </td>
      </thead>      
      <tbody>
        <tr v-for="post in postData" :key="post.id">
          <td>{{ post.id }}</td>
          
          <a :href="'/onepost/'+ post.id" @click="readIt">
              {{ post.title }}          
          </a>
          <button class="didYou">Unread</button>          
                  
        </tr>
      </tbody>
    </table>

    <button @click.prevent="createPost">Create a Post</button>

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
  data() {
    return {
      postData: ''
    }
  },
  //TODO add indication that a post was read
  mounted() {
    console.log('text');
    this.allPosts();
  },
  methods: {
    allPosts() {
      let loginData = JSON.parse(localStorage.getItem('loginData')) || [];

      axios
        .get("http://localhost:3000/api/posts",
          {
            headers: {
              'Authorization': 'Bearer ' + loginData.token
            }
          })
        .then((response) => {
          this.formatPostData(response.data);
          console.log(response);

          // using stringify to beautify the output
          this.res = JSON.stringify(response.data);

          //TODO show title on home page with link, add read indicator
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
    formatPostData(post) {
      this.postData = [];
      for (let key in post) {
        this.postData.push({ ...post[key], id: key });
      }
    },
    createPost() {
      // Navigate to the Create Post page after selecting button
      this.$router.push({ path: '/posts' })
    }
  },
  readIt(id) {
    this.$router.push({ path: `/onepost/${post.id}` })  
  }
}

</script>

<style scoped>
h2 {
  color: rgb(247, 66, 102);
}

tbody {
justify-content: space-between;

}

textarea {
  width: 100%;
  height: 60%;
  background-color: light rgb(245, 240, 240)
}

button {
  background-color: rgb(247, 66, 102);
  text-align: center;
  margin: 1px auto;
  color: black;
}

.didYou {
  display: inline;
  justify-items: right;
  align-items: right;
  margin-left: 10px;
}
</style>
