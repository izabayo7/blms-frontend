import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import axios from 'axios'
import jwt from "jsonwebtoken"

Vue.use(VueRouter)


const routes = [{
    path: '/',
    name: 'Home',
    component: Home
},
{
    path: '/login',
    name: 'Login',
    component: () =>
        import('@/components/login')
},
{
    path: '/test',
    name: 'dash',
    component: () =>
        import('@/components/dashboard')
},
{
    path: '/kurious',
    component: () =>
        import('@/views/dashboard/Index-new'),

    children: [{
        path: '/courses',
        name: 'Courses',
        component: () =>
            import('@/components/courses.vue')
    }, {
        path: '/courses/new-course',
        name: 'New Course',
        component: () =>
            import('@/views/pages/home'),
        meta: {
            allowAnonymous: true
        }
    },
    // the login page
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import('@/components/login'),
        meta: {
            allowAnonymous: true
        }
    },
    // the dashboard
    {
        path: '/app',
        component: () =>
            import('@/views/dashboard'),
        meta: {
            allowAnonymous: false
        },
        /**
         * DASHBOARD CHILDREN
         *  components that will share the sidebar and the navbar
         *  they are also protected since their parent is protected
         */
        children: [{
            path: '/courses',
            name: 'Courses',
            component: () =>
                import('@/components/courses.vue')
        }, {
            path: '/courses/new-course',
            name: 'New Course',
            component: () =>
                import('@/components/newCourse.vue')
        }, {
            path: '/courses/edit/:id',
            name: 'Edit Course',
            component: () =>
                import('@/components/editCourse.vue')
        }, {
            path: '/courses/:id',
            name: 'CourseDetails',
            component: () =>
                import('@/components/course-details.vue')
        }, {
            path: '/quiz/new-quiz',
            name: 'Set Quiz',
            component: () =>
                import('@/components/set-quiz.vue')
        }, {
            path: '/quiz/attempt/:id',
            name: 'TakeQuiz',
            component: () =>
                import('@/components/take-quiz.vue')
        }, {
            path: '/reports/submission/:id',
            name: 'MarkQuiz',
            component: () =>
                import('@/components/mark-quiz.vue')
        }, {
            path: '/messages',
            component: () =>
                import('@/components/chat.vue')
        }, {
            path: '/reports',
            name: 'Reports',
            component: () =>
                import('@/components/reports.vue')
        }, {
            path: '/library',
            name: 'Library',
            component: () =>
                import('@/components/library.vue')
        }, {
            path: '/live-class',
            name: 'liveClass',
            component: () =>
                import('@/components/live-class.vue')
        }, {
            path: '/profile',
            name: 'profile',
            component: () =>
                import('@/components/profile.vue')
        }, {
            path: '/accounts/currentUser',
            name: 'User Profile',
            component: () =>
                import('@/components/profile.vue')
        }, {
            path: '/quiz',
            name: 'Quiz',
            component: () =>
                import('@/components/quiz/index.vue')
        }, {
            path: '/users',
            name: 'Users',
            component: () =>
                import('@/components/admin/users.vue')
        },]
    }, {
        path: '/register/users',
        name: 'Register Users',
        component: () =>
            import('@/components/registration/users/panel.vue')
    }, {
        path: '/messages',
        component: () => import('@/views/Messages.vue'),
        children:[
            {path:'/messages/:username', component: () => import('@/views/Chat.vue')}
        ]
        path: '/register/users/student',
        name: 'Register Student',
        component: () =>
            import('@/components/registration/users/index.vue')
    }, {
        path: '/register/users/instructor',
        name: 'Register Instructor',
        component: () =>
            import('@/components/registration/users/index.vue')
    }, {
        path: '/recover-password',
        name: 'Recover-Password',
        component: () =>
            import('@/components/recover-password.vue')
    },
    {
        path: '/register/users/admin',
        name: 'Register Admin',
        component: () =>
            import('@/components/registration/admin/admin.vue')
    }, {
        path: '/register/faculty',
        name: 'Register Faculty',
        component: () =>
            import('@/components/registration/faculty/index.vue')
    },
    {
        path: '/classes',
        name: 'Faculities',
        component: () =>
            import('@/components/faculty'),
        meta: {
            allowAnonymous: false
        }
    }, {
        path: '/school-details',
        name: 'SchoolDetails',
        component: () =>
            import('@/components/school-details'),
        meta: {
            allowAnonymous: false
        }
    }, {
        path: '/edit-school-info',
        name: 'EditSchoolDetails',
        component: () =>
            import('@/components/edit-school'),
        meta: {
            allowAnonymous: false
        }
    },
    {
        // catch all 404 - define at the very end
        path: "*",
        component: () => import("@/views/pages/notFound.vue")
    }
]

const router = new VueRouter({
    mode: 'history',
    hash: false,
    base: process.env.BASE_URL,
    routes
})


// before navigating to any route
router.beforeEach((to, from, next) => {

    // if the session exist and the vuex store is not set
    if (Vue.prototype.$session.exists() && !store.state.isLoggedIn) {
        // get the token
        const token = Vue.prototype.$session.get(
            "jwt"
        )
        // set the token in axios headers
        axios.defaults.headers.common.Authorization = `${token}`;
        // keep the decoded user in vuex store
        store.dispatch("setUser", jwt.decode(token));
    }

    // check if the destination route is protected
    if (!to.meta.allowAnonymous && !store.state.isLoggedIn) {
        // go to login
        next({
            path: '/login',
            // after loging in redirect to the requested route
            query: {
                redirect: to.fullPath
            }
        })
    }
    // protect login page if user is logged in
    else if (to.path === '/login' && store.state.isLoggedIn) {
        next({
            path: `/${store.state.user.category === 'Student' || store.state.user.category === 'Instructor' ? 'courses' : 'users'}`,
        })
    }
    // go to the requested route
    else {
        next()
    }
})

export default router