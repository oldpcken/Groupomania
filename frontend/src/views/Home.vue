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

          <a :href="'/onepost/' + post.id" @click="readIt">
            {{ post.title }}
          </a>
          <span v-if="!isRead(post)">unread</span>
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
      postData: '',
      userId: null
    }
  },
  mounted() {
    this.allPosts();    
  },
  methods: {
    allPosts() {
      // Retrieving local storage data
      let loginData = JSON.parse(localStorage.getItem('loginData')) || [];
      this.userId = loginData.userId;
      axios
        .get('http://localhost:3000/api/posts',
          {
            headers: {
              'Authorization': 'Bearer ' + loginData.token
            }
          })
        .then((response) => {          
          this.postData = response.data;
          console.log(response);          
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
    isRead(post) {
      // See if the post has been read by the user
      return post.usersRead && post.usersRead.includes(this.userId);
    },    
    createPost() {
      // Navigate to the Create Post page
      this.$router.push({ path: '/posts' })
    }
  }    
}
</script>

<style scoped>
h2 {
  color: rgb(247, 66, 102);
}

a {
  color: black;
  margin-left: 10px;
}

table {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

button {
  background-color: rgb(247, 104, 133);
  text-align: center;
  margin: 1px auto;
  color: black;
}

th {
  font-size: 1.5rem;
  padding: 4px;  
}

tr {
  font-size: 1.5rem;
  padding: 5px;
  margin: 5px 5px;
}

span {
  padding: 0 4px;
  margin-left: 10px;
  background-color: rgb(250, 167, 184);
}
</style>