import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const Login = () => import("@/pages/login/Login")
const Student = () => import("@/pages/student/Student")
const Teacher = () => import("@/pages/teacher/Teacher")

const routes = [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    {
        path: "/student",
        component: Student,
        beforeEnter(to, from, next) {
            // console.log(store.getters.getLoginStatu);
            if (store.getters.getLoginStatu && store.getters.getRole === 'Student') {
                next();
            }
            else next('/login');
        }
    },
    {
        path: "/teacher",
        component: Teacher,
        beforeEnter(to, from, next) {
            // console.log(store.getters.getLoginStatu);
            if (store.getters.getLoginStatu && store.getters.getRole === 'Teacher') {
                next();
            }
            else next('/login');
        }
    },
]

export default new VueRouter({
    routes
})