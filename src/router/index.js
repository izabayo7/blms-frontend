import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import axios from 'axios'
import jwt from "jsonwebtoken"

import live from '@/router/modules/live.router'
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
            import( /* webpackPrefetch: true */ '@/views/pages/login'),
        meta: {
            allowAnonymous: true
        }
    },
    {
        path: '/test',
        component: () =>
            import( /* webpackPrefetch: true */ '@/views/live/popup'),
        meta: {
            allowAnonymous: true
        }
    },
    {
        path: '/reset_password',
        component: () =>
            import( /* webpackPrefetch: true */ '@/views/pages/reset_password'),
        meta: {
            allowAnonymous: true
        }
    },
    {
        path: '/forgot_password',
        component: () =>
            import( /* webpackPrefetch: true */ '@/views/pages/forgot_password'),
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
            import( /* webpackPrefetch: true */ '@/views/dashboard/index'),
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
                    import( /* webpackPrefetch: true */ '@/views/dashboard/dashboard'),
                meta: {
                    allowAnonymous: false
                },
                // for chat
                children: [
                    {
                        path: '/welcome',
                        component: () =>
                            import( /* webpackPrefetch: true */ '@/views/dashboard/new'),
                        meta: {
                            allowAnonymous: true
                        }
                    },
                    {
                        path: '/messages/start-conversation',
                        component: () => import( /* webpackPrefetch: true */ '@/views/chat/StartConversation.vue'),
                    },
                    {
                        path: '/messages/no-conversation',
                        component: () => import( /* webpackPrefetch: true */ '@/views/chat/NoConversation.vue'),
                    },
                    {
                        path: '/messages',
                        component: () => import( /* webpackPrefetch: true */ '@/views/chat/Messages.vue'),
                        children: [
                            { path: '/messages/group/:id', component: () => import( /* webpackPrefetch: true */ '@/views/chat/GroupSetting') },
                            { path: '/messages/group/:id/add-member', component: () => import( /* webpackPrefetch: true */ '@/views/chat/AddMember') },
                            { path: '/messages/:username', component: () => import( /* webpackPrefetch: true */ '@/views/chat/Chat.vue') }
                        ]
                    },
                    //for users
                    {
                        path: '/users',
                        name: "users",
                        component: () => import( /* webpackPrefetch: true */ '@/views/users/index.vue'),
                    },
                    {
                        path: '/users/students',
                        name: "students",
                        component: () => import( /* webpackPrefetch: true */ '@/views/users/students.vue'),
                    },
                    {
                        path: '/users/user/:username',
                        name: "students",
                        component: () => import( /* webpackPrefetch: true */ '@/views/users/user/profile.vue'),
                    },
                    //for faculties
                    {
                        path: '/faculties',
                        name: "faculties",
                        component: () => import( /* webpackPrefetch: true */ '@/views/faculties/index.vue'),
                    },
                    {
                        path: '/faculties/:facultyId',
                        name: "faculty",
                        component: () => import( /* webpackPrefetch: true */ '@/views/faculties/faculty/index.vue'),
                        children: [
                            {
                                path: '/faculties/:facultyId/details',
                                name: "facultyDetails",
                                component: () => import( /* webpackPrefetch: true */ '@/views/faculties/faculty/Faculty.vue'),
                            },
                            {
                                path: '/faculties/:facultyId/groups',
                                name: "facultyGroups",
                                component: () => import( /* webpackPrefetch: true */ '@/views/faculties/faculty/Groups.vue'),
                            },
                            {
                                path: '/faculties/:facultyId/students',
                                name: "facultyStudents",
                                component: () => import( /* webpackPrefetch: true */ '@/views/faculties/faculty/Users.vue'),
                            },
                            {
                                path: '/faculties/:facultyId/courses',
                                name: "facultyCourses",
                                component: () => import( /* webpackPrefetch: true */ '@/views/faculties/faculty/Courses.vue'),
                            },
                        ]
                    },


                    // for courses



                    // for quiz
                    {
                        path: '/quiz',
                        name: 'Quiz',
                        component: () =>
                            import( /* webpackPrefetch: true */ '@/views/quiz')
                    },
                    {
                        path: '/quiz/new',
                        name: 'Set Quiz',
                        component: () =>
                            import( /* webpackPrefetch: true */ '@/views/quiz/create')
                    },
                    {
                        path: '/quiz/edit/:name',
                        name: 'Edit Quiz',
                        component: () =>
                            import( /* webpackPrefetch: true */ '@/views/quiz/edit')
                    },
                    {
                        path: '/quiz/preview/:name',
                        component: () =>
                            import( /* webpackPrefetch: true */ '@/views/quiz/intermediate')
                    },
                    {
                        path: '/quiz/timeout',
                        component: () =>
                            import( /* webpackPrefetch: true */ '@/views/quiz/pre_submission')
                    },
                    {
                        path: '/quiz/submitted',
                        component: () =>
                            import( /* webpackPrefetch: true */ '@/views/quiz/pre_submission')
                    },
                    {
                        path: '/quiz/:name/results',
                        component: () =>
                            import( /* webpackPrefetch: true */ '@/views/quiz/results')
                    },
                    {
                        path: '/quiz/attempt/:name',
                        name: 'TakeQuiz',
                        component: () =>
                            import( /* webpackPrefetch: true */ '@/views/quiz/attempt')
                    },
                    {
                        path: '/quiz/:quiz_name/:user_name',
                        name: 'MarkQuiz',
                        component: () =>
                            import( /* webpackPrefetch: true */ '@/views/quiz/mark')
                    },


                    // for reports
                    {
                        path: '/reports',
                        component: () =>
                            import( /* webpackPrefetch: true */ '@/views/reports')
                    },
                    {
                        path: '/reports/:target',
                        component: () =>
                            import( /* webpackPrefetch: true */ '@/views/reports/deep')
                    },
                    {
                        path: '/reports/:target/:user_name',
                        component: () =>
                            import( /* webpackPrefetch: true */ '@/views/reports')
                    },
                    {
                        path: '/library',
                        name: 'Library',
                        component: () =>
                            import( /* webpackPrefetch: true */ '@/components/library.vue')
                    },
                    {
                        path: '/profile/:user_name',
                        component: () =>
                            import( /* webpackPrefetch: true */ '@/components/update_profile.vue')
                    },
                    {
                        path: '/update/password',
                        component: () =>
                            import( /* webpackPrefetch: true */ '@/components/update_password.vue')
                    },



                    // live related
                    // {
                    //     path: '/live',
                    //     name: 'Live',
                    //     component: () =>
                    //         import( /* webpackPrefetch: true */ '@/views/live')
                    // },
                    // {
                    //     path: '/live/room/:id',
                    //     name: 'Live Room',
                    //     component: () =>
                    //         import( /* webpackPrefetch: true */ '@/views/live/live-class')
                    // },


                    // live course
                    ...live,

                    // course
                    ...course
                ]
            },
        ],
    },
    // recover password
    {
        path: '/recover-password',
        name: 'Recover-Password',
        component: () =>
            import( /* webpackPrefetch: true */ '@/components/recover-password.vue')
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
