import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import axios from 'axios'
import jwt from "jsonwebtoken"
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () =>
            import('@/views/pages/home'),
        meta: {
            allowAnonymous: true
        },
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
        // the loader
        {
            path: '/loading',
            component: () =>
                import('@/components/skeleton'),
            meta: {
                allowAnonymous: true
            }
        },
    {
        /**
         * DASHBOARD Parent
         *  This was done so that we can use global event listeners to make the whole
         *  application realtime on whatever page your on
         */
        path: '/app',
        component: () =>
            import('@/views/dashboard/index'),
        meta: {
            allowAnonymous: false
        },
        children: [
            {
                /**
                 * DASHBOARD
                 *  children will share the sidebar and the navbar
                 */
                path: '/dashboard',
                component: () =>
                    import('@/views/dashboard/dashboard'),
                meta: {
                    allowAnonymous: false
                },
                // for chat
                children: [
                    {
                        path: '/messages',
                        component: () => import('@/views/chat/Messages.vue'),
                        children: [
                            { path: '/messages/:username', component: () => import('@/views/chat/Chat.vue') }
                        ]
                    },
                    // for courses
                    {
                        path: '/courses',
                        component: () => import('@/views/courses'),
                    },
                    {
                        path: '/courses/preview/:name',
                        component: () => import('@/views/courses/preview')
                    },
                    {
                        path: '/courses/edit/:name',
                        name: 'Edit Course',
                        component: () =>
                            import('@//views/courses/edit')
                    }, {
                        path: '/courses/new-course',
                        name: 'Create course',
                        component: () =>
                            import('@/views/courses/create')
                    },
                    {
                        path: '/courses/:name',
                        component: () => import('@/views/courses/details')
                    },
                    // for quiz
                    {
                        path: '/quiz',
                        name: 'Quiz',
                        component: () =>
                            import('@/views/quiz')
                    }, {
                        path: '/quiz/new-quiz',
                        name: 'Set Quiz',
                        component: () =>
                            import('@/views/quiz/create')
                    }, {
                        path: '/quiz/edit/:name',
                        name: 'Edit Quiz',
                        component: () =>
                            import('@/views/quiz/edit')
                    }, {
                        path: '/quiz/attempt/:name',
                        name: 'TakeQuiz',
                        component: () =>
                            import('@/views/quiz/attempt')
                    }, {
                        path: '/quiz/:quiz_name/:student_name',
                        name: 'MarkQuiz',
                        component: () =>
                            import('@/views/quiz/mark')
                    },
                    // for reports
                    {
                        path: '/reports',
                        name: 'Reports',
                        component: () =>
                            import('@/views/reports')
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
                    },
                    // administration functionalities
                    {
                        path: '/administration',
                        name: 'Users',
                        component: () =>
                            import('@/components/admin/users.vue')
                    },
                    {
                        path: '/administration/faculties',
                        name: 'Faculties',
                        component: () =>
                            import('@/components/faculty'),
                        meta: {
                            allowAnonymous: false
                        }
                    },
                    {
                        path: '/administration/studentgroup',
                        name: 'Student Group',
                        component: () =>
                            import('@/components/studentGroup'),
                        meta: {
                            allowAnonymous: false
                        }
                    },]
            },
            // administration functionalities
            {
                path: '/administration/register/users',
                name: 'Register Users',
                component: () =>
                    import('@/views/administration/registration/users/panel')
            }, {
                path: '/administration/register/users/student',
                name: 'Register Student',
                component: () =>
                    import('@/views/administration/registration/users')
            }, {
                path: '/administration/register/users/instructor',
                name: 'Register Instructor',
                component: () =>
                    import('@/views/administration/registration/users')
            }, {
                path: '/administration/register/users/admin',
                name: 'Register Admin',
                component: () =>
                    import('@/views/administration/registration/admin/admin')
            }, {
                path: '/administration/register/faculty',
                name: 'Register Faculty',
                component: () =>
                    import('@/views/administration/registration/faculty')
            },
            {
                path: '/administration/colleges/:name',
                name: 'SchoolDetails',
                component: () =>
                    import('@/components/school-details'),
                meta: {
                    allowAnonymous: false
                }
            },
        ],
    },
    // recover password
    {
        path: '/recover-password',
        name: 'Recover-Password',
        component: () =>
            import('@/components/recover-password.vue')
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
    if (Vue.prototype.$session.exists() && !store.state.user.isLoggedIn) {
        // get the token
        const token = Vue.prototype.$session.get(
            "jwt"
        )
        // set the token in axios headers
        axios.defaults.headers.common.Authorization = `${token}`;
        // keep the decoded user in vuex store
        store.dispatch("user/setUser", jwt.decode(token));
    }
    // check if the destination route is protected
    if (!to.meta.allowAnonymous && !store.state.user.isLoggedIn) {
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
    else if ((to.path === '/login' || to.path === '/') && store.state.user.isLoggedIn) {
        next({
            path: `/${store.state.user.category === 'Student' || store.state.user.category === 'Instructor' ? 'courses' : 'administration'}`,
        })
    }
    // go to the requested route
    else {
        console.log(to)
        next()
    }
})
export default router
