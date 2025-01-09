import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import ResetPassword from '@/components/Auth/ResetPassword.vue'
import CompleteLogin from '@/components/Auth/CompleteLogin.vue'
import SignUp from '@/components/Auth/SignUp.vue'
import EditBio from '@/components/Auth/EditBio.vue'
import Interest from '@/components/Auth/Interest.vue'
import Login from '@/components/Auth/Login.vue'
import index from '@/components/Home/index.vue'
import Profile from '@/components/Profile/index.vue'
import Notification from '@/views/Notification/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'signup',
    component: SignUp
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/reset',
    name:'reset',
    component: ResetPassword
  },
  {
    path:'/completeLogin',
    name:'completeLogin',
    component:CompleteLogin
  },
  {
    path:'/editBio',
    name:'editBio',
    component:EditBio
  },
  {
    path:'/interest',
    name:'interest',
    component:Interest
  },
  {
    path:'/home',
    name:'home',
    component:index
  },
  {
    path:'/profile',
    name:'profile',
    component:Profile
  },
  {
    path:'/notifications',
    name:'notifications',
    component:Notification
  }
 
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
