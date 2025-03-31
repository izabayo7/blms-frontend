import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import axios from 'axios'
import jwt from "jsonwebtoken"

import live from '@/router/modules/live.router'
import quiz from '@/router/modules/quiz.router'
import chat from '@/router/modules/chat.router'
import course from '@/router/modules/course.router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            allowAnonymous: true
        },
    },
    // the login page
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import( /* webpackPrefetch: true */ /* webpackChunkName: "login" */ '@/views/pages/login'),
        meta: {
            allowAnonymous: true
        }
    },
    {
        path: '/test',
        component: () =>
            import( /* webpackChunkName: "test" */ '@/views/live/popup'),
        meta: {
            allowAnonymous: true
        }
    },
    {
        path: '/reset_password',
        component: () =>
            import( /* webpackChunkName: "reset-password" */ '@/views/pages/reset_password'),
        meta: {
            allowAnonymous: true
        }
    },
    {
        path: '/forgot_password',
        component: () =>
            import( /* webpackChunkName: "forgot-password" */ '@/views/pages/forgot_password'),
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
            import( '@/views/dashboard/index'),
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
                    import( /* webpackChunkName: "dashboard" */ '@/views/dashboard/dashboard'),
                meta: {
                    allowAnonymous: false
                },
                // for chat
                children: [
                    {
                        path: '/welcome',
                        component: () =>
                            import( /* webpackPrefetch: true */ /* webpackChunkName: "welcome" */ '@/views/dashboard/new'),
                        meta: {
                            allowAnonymous: true
                        }
                    },

                    //for users
                    {
                        path: '/users',
                        name: "users",
                        component: () => import( /* webpackChunkName: "users" */ '@/views/users/index.vue'),
                    },
                    {
                        path: '/users/students',
                        name: "students",
                        component: () => import( /* webpackChunkName: "users-students" */ '@/views/users/students.vue'),
                    },
                    {
                        path: '/users/user/:username',
                        name: "students",
                        component: () => import( /* webpackChunkName: "user-by-name" */ '@/views/users/user/profile.vue'),
                    },
                    //for faculties
                    {
                        path: '/faculties',
                        name: "faculties",
                        component: () => import( /* webpackChunkName: "faculties" */ '@/views/faculties/index.vue'),
                    },
                    {
                        path: '/faculties/:facultyId',
                        name: "faculty",
                        component: () => import( /* webpackChunkName: "faculty-by-id" */ '@/views/faculties/faculty/index.vue'),
                        children: [
                            {
                                path: '/faculties/:facultyId/details',
                                name: "facultyDetails",
                                component: () => import( /* webpackChunkName: "faculty-by-id" */ '@/views/faculties/faculty/Faculty.vue'),
                            },
                            {
                                path: '/faculties/:facultyId/groups',
                                name: "facultyGroups",
                                component: () => import( /* webpackChunkName: "faculty-by-id" */ '@/views/faculties/faculty/Groups.vue'),
                            },
                            {
                                path: '/faculties/:facultyId/students',
                                name: "facultyStudents",
                                component: () => import( /* webpackChunkName: "faculty-by-id" */ '@/views/faculties/faculty/Users.vue'),
                            },
                            {
                                path: '/faculties/:facultyId/courses',
                                name: "facultyCourses",
                                component: () => import( /* webpackChunkName: "faculty-by-id" */ '@/views/faculties/faculty/Courses.vue'),
                            },
                        ]
                    },

                    // for reports
                    {
                        path: '/reports',
                        component: () =>
                            import( /* webpackChunkName: "reports" */ '@/views/reports')
                    },
                    {
                        path: '/reports/:target',
                        component: () =>
                            import( /* webpackChunkName: "reports-by-target" */ '@/views/reports/deep')
                    },
                    {
                        path: '/reports/:target/:user_name',
                        component: () =>
                            import( /* webpackChunkName: "user-reports" */ '@/views/reports')
                    },
                    {
                        path: '/profile/:user_name',
                        component: () =>
                            import( /* webpackChunkName: "user-profile" */ '@/components/update_profile.vue')
                    },
                    {
                        path: '/update/password',
                        component: () =>
                            import( /* webpackChunkName: "change-password" */ '@/components/update_password.vue')
                    },

                    // course routes
                    ...course,

                    // quiz routes
                    ...quiz,

                    // chat routes
                    ...chat,

                    // live routes
                    ...live,
                ]
            },
        ],
    },
    // recover password
    {
        path: '/recover-password',
        name: 'Recover-Password',
        component: () =>
            import( /* webpackChunkName: "recover-password" */ '@/components/recover-password.vue')
    },
    {
        // catch all 404 - define at the very end
        path: "*",
        component: () => import( /* webpackChunkName: "error" */"@/views/pages/notFound.vue")
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
    if (Vue.prototype.$session.exists() && (!store.state.user.isLoggedIn || !axios.defaults.headers.common.Authorization)) {
        // get the token
        const token = Vue.prototype.$session.get(
            "jwt"
        )
        // set the token in axios headers
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        // keep the decoded user in vuex store
        store.dispatch("user/setUser", jwt.decode(token));
    }
    if (to.path === '/') {
        next({
            path: '/login'
        })
    }
    // check if the destination route is protected
    if (!to.meta.allowAnonymous && !store.state.user.isLoggedIn) {
        // go to login
        next({
            path: '/login',
            // after logging in redirect to the requested route
            query: {
                redirect: to.fullPath
            }
        })
    }

    else if ((to.path === '/login' || to.path === '/') && store.state.user.isLoggedIn) {
        next({
            path: `/${store.state.user.user.category.name === 'STUDENT' || store.state.user.user.category.name === 'INSTRUCTOR' ? 'courses' : 'welcome'}`,
        })
    }

    // go to the requested route
    // else {
    //     next()
    // }

    //avoiding errors
    to;
    from;
    next()
})
export default router
