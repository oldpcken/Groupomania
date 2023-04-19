<template>
    <div class="post">

        <h2>Creat a Post Here</h2>

        <form>
            <label>User Name:</label>
            <input type="text" size="50" v-model="postData.userName" required />

            <label>Title:</label>
            <input type="text" size="50" v-model="postData.title" required />

            <label>Posts:</label>
            <textarea type="text" size="3000" v-model="postData.message"></textarea>

            <div class="file-upload">
                <label>Attachment (JPG, PNG, WEBP, WMV, MP4, MP3, )</label>
                <input type="file" @change="media($event)" />
            </div>
            <button class="btn" @click.prevent="submit">POST IT</button>
        </form>

        <h2>Scroll through employee posts & click to read</h2>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            postData: { 
                userName: '', 
                title: '', 
                message: ''}
        };
    },
    beforeCreate() {
        if (localStorage.getItem('loginData') === null) {
            // Go to login page if user is not logged in
            this.$router.push({ path: '/login' })
        }
    },
    methods: {
        media( event ) {
            this.media = event.target.files[0];
        },

        submit() {     
            // localStorage.getItem('loginData', JSON.parse(post.data));

            JSON.parse(localStorage.getItem('loginData'));

            let formData = new FormData();     
            formData.append('post', this.postData);
            formData.append('media', this.media);

            console.log('loginData ', this.loginData); 
            console.log('postData ', this.postData); 
            console.log('this.media ', this.media); 
            console.log('formData ', formData);

            axios
                .post(('http://localhost:3000/api/posts'),
                    formData, {
                        headers: {
                            'Authorization': 'Bearer ' + this.user.token,
                            'Content-Type': 'multipart/form-data'
                        }
                })
                .then(function (response) {
                    this.axiosResponse = response.data;
                    console.log('SUCCESS!!');
                }.bind(this))

                // Navigate to the posts(Home) page after successful posting
                this.$router.push({ path: '/' })

                .catch(function (error) {
                    this.axiosError = error;
                    console.log('FAILURE!!');
                }.bind(this));                

        }
    }
}

</script>

<style>
.post {
    display: flex;
    flex-direction: column;
    align-items: center;
}

form {
    width: 90%;
    margin: 0;
}

label {
    margin: 5px 2px;
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
    background-color: rgb(208, 214, 212);
    margin: 15px;
}

.file-upload {
    color: blue;
}

input {
    display: block;
    margin: 10px 5px;
    height: 2em;
}
</style>
