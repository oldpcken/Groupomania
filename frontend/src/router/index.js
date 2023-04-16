import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Posts from '../views/Posts.vue'
import OnePost from '../views/onePost.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'home',
      component: Home   
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup   
    },
        {
      path: '/login',
      name: 'login',
      component: Login     
    },
    {
      path: '/posts',
      name: 'post',
      component: Posts     
    },
    {
      path: '/onepost',
      name: 'onePost',
      component: OnePost   
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile    
    },    
  ]
})

export default router
