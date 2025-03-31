import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import axios from 'axios'
import jwt from "jsonwebtoken"

import live from '@/router/modules/live.router'
import quiz from '@/router/modules/quiz.router'
import exams from '@/router/modules/exams.router'
import assignments from '@/router/modules/assignments.router'
import chat from '@/router/modules/chat.router'
import course from '@/router/modules/course.router'

let assessmentRoutes = quiz.concat(exams)
assessmentRoutes = assessmentRoutes.concat(assignments)

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            allowAnonymous: true
        },
    },
    {
        path: '/test',
        name: 'TEST',
        component: () =>
            import( /* webpackPrefetch: true */ /* webpackChunkName: "test" */ '@/views/pages/test'),
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
        path: '/unauthorized',
        component: () =>
            import( /* webpackChunkName: "error" */ '@/components/dashboard/error'),
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
                            import( /* webpackPrefetch: true */ /* webpackChunkName: "dashboard" */ '@/views/dashboard/new/main'),
                        meta: {
                            allowAnonymous: false,
                            allowedUsers: ["INSTRUCTOR", "ADMIN"]
                        }
                    },

                    {
                        path: '/assignments',
                        name: "assignments",
                        component: () => import( /* webpackChunkName: "assignments" */ '@/views/quiz/student_assignments.vue'),
                        meta: {
                            allowedUsers: ["STUDENT"]
                        },
                    },
                    {
                        path: '/exam/instructions',
                        component: () => import( /* webpackChunkName: "exams" */ '@/views/quiz/exam_intermediate.vue'),
                        meta: {
                            allowedUsers: ["STUDENT","INSTRUCTOR"]
                        },
                    },

                    {
                        path: '/assignments/:user_name/:id',
                        name: "user_assignments",
                        component: () => import( /* webpackChunkName: "assignments" */ '@/views/quiz/student_assignment_results.vue'),
                        meta: {
                            allowedUsers: ["STUDENT","INSTRUCTOR"]
                        },
                    },

                    {
                        path: '/assignments/:id',
                        name: "assignment",
                        component: () => import( /* webpackChunkName: "assignments" */ '@/views/quiz/student_assignment_results.vue'),
                        meta: {
                            allowedUsers: ["STUDENT","INSTRUCTOR"]
                        },
                    },

                    //for users
                    {
                        path: '/users',
                        name: "users",
                        component: () => import( /* webpackChunkName: "users" */ '@/views/users/index.vue'),
                        meta: {
                            allowedUsers: ["ADMIN"]
                        },
                    },
                    {
                        path: '/students',
                        component: () => import( /* webpackChunkName: "users-students" */ '@/views/users/students.vue'),
                        meta: {
                            allowedUsers: ["INSTRUCTOR"]
                        },
                    },
                    {
                        path: '/users/:username',
                        name: "student",
                        component: () => import( /* webpackChunkName: "user-by-name" */ '@/views/users/user/profile.vue'),
                    },

                    //for faculties
                    {
                        path: '/faculties',
                        name: "faculties",
                        component: () => import( /* webpackChunkName: "faculties" */ '@/views/faculties/index.vue'),
                        meta: {
                            allowedUsers: ["ADMIN"]
                        },
                    },
                    {
                        path: '/faculties/:facultyId',
                        name: "faculty",
                        component: () => import( /* webpackChunkName: "faculty-by-id" */ '@/views/faculties/faculty/index.vue'),
                        meta: {
                            allowedUsers: ["ADMIN"]
                        },
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
                                path: '/faculties/:facultyId/groups/:groupId',
                                name: "facultyStudentGroups",
                                component: () => import( /* webpackChunkName: "faculty-by-id" */ '@/views/faculties/faculty/EditStudentGroup.vue'),
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

                    {
                        path: '/announcements',
                        name: "announcements",
                        component: () => import( /* webpackChunkName: "announcements" */ '@/views/announcement/index.vue'),
                        meta: {
                            allowedUsers: ["INSTRUCTOR", "ADMIN",]
                        },
                    },
                    {
                        path: '/announcements/new',
                        component: () => import( /* webpackChunkName: "announcements" */ '@/views/announcement/new.vue'),
                        meta: {
                            allowedUsers: ["INSTRUCTOR", "ADMIN"]
                        },
                    },
                    {
                        path: '/announcements/view/:id',
                        component: () => import( /* webpackChunkName: "announcements" */ '@/views/announcement/view.vue'),
                    },
                    {
                        path: '/announcements/edit/:id',
                        component: () => import( /* webpackChunkName: "announcements" */ '@/views/announcement/edit.vue'),
                        meta: {
                            allowedUsers: ["INSTRUCTOR", "ADMIN"]
                        },
                    },

                    // for reports
                    {
                        path: '/reports',
                        component: () =>
                            import( /* webpackChunkName: "reports" */ '@/views/reports'),
                        meta: {
                            allowedUsers: ["INSTRUCTOR", "STUDENT"]
                        },
                    },
                    {
                        path: '/reports/:target',
                        component: () =>
                            import( /* webpackChunkName: "reports-by-target" */ '@/views/reports/deep'),
                        meta: {
                            allowedUsers: ["INSTRUCTOR", "STUDENT"]
                        },
                    },
                    {
                        path: '/reports/:target/assignments',
                        component: () =>
                            import( /* webpackChunkName: "reports-by-target" */ '@/views/reports/deep'),
                        meta: {
                            allowedUsers: ["STUDENT","INSTRUCTOR"]
                        },
                    },
                    {
                        path: '/reports/:target/:user_name',
                        component: () =>
                            import( /* webpackChunkName: "user-reports" */ '@/views/reports'),
                        meta: {
                            allowedUsers: ["INSTRUCTOR", "STUDENT"]
                        },
                    },
                    {
                        path: '/settings',
                        component: () =>
                            import( /* webpackChunkName: "settings" */ '@/views/settings'),
                        children: [
                            {
                                path: '/',
                                name: "personalSettings",
                                component: () => import( /* webpackChunkName: "settings" */ '@/views/settings/personal'),
                            },
                            {
                                path: '/settings/institution',
                                name: "institutionSettings",
                                meta: {
                                    allowedUsers: ["ADMIN"]
                                },
                                component: () => import( /* webpackChunkName: "settings" */ '@/views/settings/institution'),
                            },
                            {
                                path: '/settings/payments',
                                name: "paymentSettings",
                                component: () => import( /* webpackChunkName: "settings" */ '@/views/settings/payments'),
                            },
                        ]
                    },

                    // course routes
                    ...course,

                    ...assessmentRoutes,

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
    if (to.path !== from.path || to.path === "/") {
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
        } else if ((to.path === '/login' || to.path === '/') && store.state.user.isLoggedIn) {
            next({
                path: `/${store.state.user.user.category.name === 'STUDENT' ? 'courses' : 'welcome'}`,
            })
        }
        if (to.meta.allowedUsers && !to.meta.allowedUsers.includes(store.state.user.user.category.name))
            next({path: '/unauthorized'})
        next()
    }
})
export default router
