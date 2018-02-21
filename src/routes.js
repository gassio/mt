import Vue from 'vue';
import VueRouter from 'vue-router';
import { store } from './store/store'

import DecideHome from './components/Pages/DecideHome.vue'
import Home from './components/Pages/Home.vue'
import Library from './components/Pages/Library.vue'
import Wiki from './components/Pages/Wiki.vue'
import Classes from './components/Pages/Classes.vue'
import Class from './components/Pages/Class.vue'
import Video from './components/Pages/Video.vue'
import Admin from './components/Admin/Admin.vue'
import Professor from './components/Admin/Professor.vue'
import Student from './components/Admin/Student.vue'
import Login from './components/Login/Login.vue'
import AuthService from './services/AuthService'

const requiresAuth = (to, from, next) => {
    AuthService.isAuthenticated()
        .then(() => {
            next()
        })
        .catch(() => {
            next('/login')
        })
}

export const routes = [
    { 
        path: '/', 
        component: DecideHome,
        beforeEnter: requiresAuth
    },
    { 
        name: 'Login', 
        path: '/login', 
        component: Login,
    },
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
    { 
        name: 'Video', 
        path: '/video/:id', 
        component: Video, 
        beforeEnter: requiresAuth
    },
    { 
        name: 'Library', 
        path: '/library', 
        component: Library,
        beforeEnter: requiresAuth
    },
    { 
        name: 'Wiki', 
        path: '/wiki', 
        component: Wiki, 
        beforeEnter: requiresAuth
    }
]