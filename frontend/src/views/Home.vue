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
        <tr v-for="(post,i) in postData" :key="post.id">
          <td>{{ i + 1 }}</td>
          
          <a :href="'/onepost/'+ (i + 1)" @click="readIt">
              {{ post.title }}          
          </a>
          <span class="didYou">{{this.readStatus}}</span>          
                  
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
  mounted() {
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
  //TODO show add read indicator
  readIt() {
    const readStatus="Unread";
    this.$router.push({ path: `/onepost/${post.id}` })  
  }
}

</script>

<style scoped>
h2 {
  color: rgb(247, 66, 102);
}

a {
  color: black;
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

.didYou {
  display: inline;
  justify-items: right;
  align-items: right;
  margin-left: 10px;
}

th {
  font-size: 1.5rem;
  padding: 2px;
  margin: 50px 50px;
}

tr {
  font-size: 1.5rem;
  padding: 2px;
  margin: 5px 5px;
}

span {
  padding: 0 2px;
  background-color: rgb(250, 167, 184);
}
</style>
