import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Pages/Home.vue'
import Library from './components/Pages/Library.vue'
import Wiki from './components/Pages/Wiki.vue'
import Classes from './components/Pages/Classes.vue'
import Class from './components/Pages/Class.vue'
import Video from './components/Pages/Video.vue'
import VideoEdit from './components/Pages/VideoEdit.vue'
import Admin from './components/Admin/Admin.vue'
import Professor from './components/Admin/Professor.vue'
import Student from './components/Admin/Student.vue'
import Login from './components/Login/Login.vue'

export const routes = [
    { name: 'Default', path: '/', component: Login },
    { name: 'Login', path: '/login', component: Login },
    { name: 'Home', path: '/home', component: Home },
    { name: 'Library', path: '/library', component: Library },
    { name: 'Wiki', path: '/wiki', component: Wiki },
    { name: 'Classes', path: '/classes', component: Classes },
    { name: 'Class', path: '/classes/:id', component: Class },
    { name: 'Video', path: '/video/:id', component: Video, children: [
        { name: 'VideoEdit', path: 'edit', component: VideoEdit }
    ]},
    { 
        name: 'Admin', 
        path: '/admin', 
        component: Admin, 
        meta: { requiresAuth: true } 
    },
    { 
        name: 'Professor', 
        path: '/professor', 
        component: Professor, 
        meta: { requiresAuth: true } 
    },
    { 
        name: 'Student', 
        path: '/student', 
        component: Student, 
        meta: { requiresAuth: true } 
    },
]


const router = new VueRouter({routes,mode:'history'})  

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
    if (!authUser || !authUser.token) {
      next({name:'login'})
    }
    else if(to.meta.adminAuth) {
      const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
      if(authUser.data.role_id === 'ADMIN') {
        next()
      }
    } 
  }
  else {
    next()
  }
})