import Vue from 'vue';
import VueRouter from 'vue-router';
import { store } from './store/store'

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

// store.state.isAuthenticated = true
console.log('routes.js: ', store.state.isAuthenticated)

const requiresAuth = (to, from, next) => {
    if (store.state.isAuthenticated) {
        next()
        return
    }
    next('/login')
}

const noAuthNeeded = (to, from, next) => {
    if (!store.state.isAuthenticated) {
      next()
      return
    }
    next('/')
}  

export const routes = [
    { 
        path: '/', 
        component: Login,
        beforeEnter: noAuthNeeded
    },
    { 
        name: 'Login', 
        path: '/login', 
        component: Login,
        beforeEnter: noAuthNeeded
    },
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
        beforeEnter: requiresAuth
    },
    { 
        name: 'Professor', 
        path: '/professor', 
        component: Professor, 
        beforeEnter: requiresAuth 
    },
    { 
        name: 'Student', 
        path: '/student', 
        component: Student, 
        beforeEnter: requiresAuth 
    },
]


// const router = new VueRouter({routes,mode:'history'})  

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth) {
//     const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
//     if (!authUser || !authUser.token) {
//       next({name:'login'})
//     }
//     else if(to.meta.adminAuth) {
//       const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
//       if(authUser.data.role_id === 'ADMIN') {
//         next()
//       }
//     } 
//   }
//   else {
//     next()
//   }
// })