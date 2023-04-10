import { createRouter, createWebHistory } from 'vue-router'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Posts from '../views/Posts.vue'
import OnePost from '../views/onePost.vue'
import Markread from '../views/Markread.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    {
      path: '/read',
      name: 'markread',
      component: Markread
    },
  ]
})

export default router
