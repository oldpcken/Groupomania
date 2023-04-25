<template>
    <div class="post">

        <h2>Please Create Your Post Here</h2>

        <form>
            <label>User Name:</label>
            <input type="text" size="40" required />

            <label>Title:</label>
            <input type="text" size="40" v-model="postData.title" required />

            <label>Post:</label>
            <textarea type="text" cols="40" rows="10" v-model="postData.message"></textarea>

            <div class="file-upload">

                <label>File Attachment (JPG, PNG, WEBP, WMV, MP4, MP3, WAV)</label>
                <input type="file" ref="media" @change="onMediaChange" />

                <button class="btn" @click.prevent="submit">POST IT</button>
            </div>

        </form>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            postData: {
                userId: '',
                title: '',
                message: ''
            },
            media: null
        };
    },
    beforeCreate() {
        if (localStorage.getItem('loginData') === null) {
            // Go to login page if user is not logged in
            this.$router.push({ path: '/login' })
        }
    },
    methods: {
        onMediaChange() {
            this.media = this.$refs.media.files[0]; 
                   
        },   
        submit() {  
            console.log('Submit entered');
            let loginData = JSON.parse(localStorage.getItem('loginData')) || [];
            this.postData.userId = loginData.userId;           
            
            console.log('This is this.postData.userId ', this.postData.userId);          
            
            if (!this.media) {
                console.log('No media path taken');
               
                console.log(this.postData);
                axios
                    .post('http://localhost:3000/api/posts', 
                            JSON.stringify(this.postData),                        
                        { 
                            headers: { 'Authorization': 'Bearer ' + loginData.token,
                                        'Content-Type':  'application/json'
                            }                         
                        })
                    .then(function (response) {
                        
                        this.postData = response.data;
                        console.log('SUCCESS!!');
                    }.bind(this))

                    // Navigate to the posts(Home) page after successful posting
                    // this.$router
                    //     .push({ path: '/' })
                    //     .then(() => { this.$router.go() })

                    .catch(function (error) {
                        this.axiosError = error;
                        console.log('FAILURE!!');
                    }.bind(this));
                
            } else {
                
                console.log('Else path taken');
                let formData = new FormData();
                formData.append('post', JSON.stringify(this.postData));
                formData.append('media', this.media);

                axios
                    .post('http://localhost:3000/api/posts',
                        formData, {
                        headers: {
                            'Authorization': 'Bearer ' + loginData.token,
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(function (response) {
                        
                        this.postData = response.data;
                        console.log('SUCCESS!!');
                    }.bind(this))

                    // Navigate to the posts(Home) page after successful posting
                    // this.$router
                    //     .push({ path: '/' })
                    //     .then(() => { this.$router.go() })

                    .catch(function (error) {
                        this.axiosError = error;
                        console.log('FAILURE!!');
                    }.bind(this));
            } 
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
}

.btn {
    display: block;
    height: 2rem;
    background-color: rgb(249, 218, 218);
    margin: 15px;
    color: red;
}

.file-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: red;
    width: 100%;
    margin-top: 20px;
}

input {
    display: block;
    margin: 10px 5px;
    height: 2em;
}
</style>
