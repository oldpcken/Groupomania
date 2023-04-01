import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Posts from '../views/Posts.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
      path: '/profile',
      name: 'profile',
      component: Profile    
    }
  ]
})

export default router
