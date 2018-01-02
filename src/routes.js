import Admin from './components/Admin/AdminPage.vue'
import Home from './components/Pages/Home.vue'
import Library from './components/Pages/Library.vue'
import Wiki from './components/Pages/Wiki.vue'
import Classes from './components/Pages/Classes.vue'
import Class from './components/Pages/Class.vue'
import Video from './components/Pages/Video.vue'
import VideoEdit from './components/Pages/VideoEdit.vue'

export const routes = [
    { path: '/', component: Home },
    { path: '/library', component: Library },
    { path: '/wiki', component: Wiki },
    { path: '/classes', component: Classes },
    { path: '/classes/:id', component: Class },
    { path: '/video/:id', component: Video, children: [
        { path: 'edit', component: VideoEdit }
    ] },
    { path: '/admin', component: Admin },
]