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
        meta: {
            allowAnonymous: true
        },
    },
    // the login page
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import('@/views/pages/login'),
        meta: {
            allowAnonymous: true
        }
    },
    {
        path: '/reset_password',
        component: () =>
            import('@/views/pages/reset_password'),
        meta: {
            allowAnonymous: true
        }
    },
    {
        path: '/forgot_password',
        component: () =>
            import('@/views/pages/forgot_password'),
        meta: {
            allowAnonymous: true
        }
    },
    // the loader
    {
        path: '/loading',
        component: () =>
            import('@/components/loaders'),
        meta: {
            allowAnonymous: true
        }
    },
    // {
    //     path: '/admin_demo',
    //     component: () =>
    //         import('@/views/dashboard/new'),
    //     meta: {
    //         allowAnonymous: true
    //     }
    // },
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
                        path: '/admin_demo',
                        component: () =>
                            import('@/views/dashboard/new'),
                        meta: {
                            allowAnonymous: true
                        }
                    },
                    {
                        path: '/schedule_live',
                        component: () =>
                            import('@/views/live/schedule'),
                    },
                    {
                        path: '/messages/start-conversation',
                        component: () => import('@/views/chat/StartConversation.vue'),
                    },
                    {
                        path: '/messages/no-conversation',
                        component: () => import('@/views/chat/NoConversation.vue'),
                    },
                    {
                        path: '/messages',
                        component: () => import('@/views/chat/Messages.vue'),
                        children: [
                            { path: '/messages/group/:id', component: () => import('@/views/chat/GroupSetting') },
                            { path: '/messages/group/:id/add-member', component: () => import('@/views/chat/AddMember') },
                            { path: '/messages/:username', component: () => import('@/views/chat/Chat.vue') }
                        ]
                    },
                    //for users
                    {
                        path: '/users',
                        name: "users",
                        component: () => import('@/views/users/index.vue'),
                    },
                    {
                        path: '/users/students',
                        name: "students",
                        component: () => import('@/views/users/students.vue'),
                    },
                    //for faculties
                    {
                        path: '/faculties',
                        name: "faculties",
                        component: () => import('@/views/faculties/index.vue'),
                    },
                    {
                        path: '/faculties/:facultyId',
                        name: "faculty",
                        component: () => import('@/views/faculties/faculty/index.vue'),
                        children: [
                            {
                                path: '/faculties/:facultyId/details',
                                name: "facultyDetails",
                                component: () => import('@/views/faculties/faculty/Faculty.vue'),
                            },
                            {
                                path: '/faculties/:facultyId/groups',
                                name: "facultyGroups",
                                component: () => import('@/views/faculties/faculty/Groups.vue'),
                            },
                            {
                                path: '/faculties/:facultyId/students',
                                name: "facultyStudents",
                                component: () => import('@/views/faculties/faculty/Users.vue'),
                            },
                            {
                                path: '/faculties/:facultyId/courses',
                                name: "facultyCourses",
                                component: () => import('@/views/faculties/faculty/Courses.vue'),
                            },
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
                        path: '/courses/new',
                        name: 'Create course',
                        component: () =>
                            import('@/views/courses/create')
                    },
                    {
                        path: '/courses/:name',
                        component: () => import('@/views/courses/details'),
                        children: [
                            {
                                path: '/courses/:name/chapter/:index/:id',
                                component: () => import('@/views/courses/chapter-details')
                            }
                        ]
                    },
                    // for quiz
                    {
                        path: '/quiz',
                        name: 'Quiz',
                        component: () =>
                            import('@/views/quiz')
                    }, {
                        path: '/quiz/new',
                        name: 'Set Quiz',
                        component: () =>
                            import('@/views/quiz/create')
                    }, {
                        path: '/quiz/edit/:name',
                        name: 'Edit Quiz',
                        component: () =>
                            import('@/views/quiz/edit')
                    },
                    {
                        path: '/quiz/preview/:name',
                        component: () =>
                            import('@/views/quiz/intermediate')
                    },
                    {
                        path: '/quiz/timeout',
                        component: () =>
                            import('@/views/quiz/pre_submission')
                    },
                    {
                        path: '/quiz/submitted',
                        component: () =>
                            import('@/views/quiz/pre_submission')
                    },
                    {
                        path: '/quiz/:name/results',
                        component: () =>
                            import('@/views/quiz/results')
                    },
                    {
                        path: '/quiz/attempt/:name',
                        name: 'TakeQuiz',
                        component: () =>
                            import('@/views/quiz/attempt')
                    }, {
                        path: '/quiz/:quiz_name/:user_name',
                        name: 'MarkQuiz',
                        component: () =>
                            import('@/views/quiz/mark')
                    },
                    // for reports
                    {
                        path: '/reports',
                        component: () =>
                            import('@/views/reports')
                    },
                    {
                        path: '/reports/:target',
                        component: () =>
                            import('@/views/reports/deep')
                    },
                    {
                        path: '/reports/:target/:user_name',
                        component: () =>
                            import('@/views/reports')
                    },
                    {
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
                        path: '/profile/:user_name',
                        component: () =>
                            import('@/components/update_profile.vue')
                    }, {
                        path: '/update/password',
                        component: () =>
                            import('@/components/update_password.vue')
                    },
                    // administration functionalities
                    {
                        path: '/administration',
                        name: 'Administration',
                        component: () =>
                            import('@/views/administration/admin')
                    },
                    {
                        path: '/administration/faculties',
                        name: 'Faculties',
                        component: () =>
                            import('@/views/administration/faculty'),
                        meta: {
                            allowAnonymous: false
                        }
                    },
                    {
                        path: '/administration/studentgroup',
                        name: 'Student Group',
                        component: () =>
                            import('@/views/administration/studentGroup'),
                        meta: {
                            allowAnonymous: false
                        }
                    },
                    // live related
                    {
                        path: '/live',
                        name: 'Live',
                        component: () =>
                            import('@/views/live')
                    },
                    {
                        path: '/live/room/:id',
                        name: 'Live Room',
                        component: () =>
                            import('@/views/live/live-class')
                    },
                ]
            },
            // administration functionalities
            {
                path: '/administration/register/users',
                name: 'Register Users',
                component: () =>
                    import('@/views/administration/users/registration')
            }, {
                path: '/administration/register/users/student',
                name: 'Register Student',
                component: () =>
                    import('@/views/administration/users/registration/register')
            }, {
                path: '/administration/register/users/instructor',
                name: 'Register Instructor',
                component: () =>
                    import('@/views/administration/users/registration/register')
            }, {
                path: '/administration/register/users/admin',
                name: 'Register Admin',
                component: () =>
                    import('@/views/administration/admin/register')
            }, {
                path: '/administration/register/faculty',
                name: 'Register Faculty',
                component: () =>
                    import('@/views/administration/faculty/register')
            }, {
                path: '/administration/register/studentGroup',
                name: 'Register StudentGroup',
                component: () =>
                    import('@/views/administration/studentGroup/register')
            },
            {
                path: '/administration/colleges/:name',
                name: 'CollegeDetails',
                component: () =>
                    import('@/views/administration/college'),
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
            path: `/${store.state.user.user.category.name === 'STUDENT' || store.state.user.user.category.name === 'INSTRUCTOR' ? 'courses' : 'administration'}`,
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
