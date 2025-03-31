import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/pages/home'

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
            import ('@/components/login')
    }, {
        path: '/admin-registration',
        name: 'AdminRegistration',
        component: () =>
            import ('@/components/AdminRegistration')
    },
    {
        path: '/test',
        name: 'dash',
        component: () =>
            import ('@/components/dashboard')
    },
    {
        path: '/kurious',
        component: () =>
            import ('@/views/dashboard/index'),

        children: [{
                path: '/courses',
                name: 'Courses',
                component: () =>
                    import ('@/components/courses.vue')
            }, {
                path: '/set-quiz',
                name: 'SetQuiz',
                component: () =>
                    import ('@/components/set-quiz.vue')
            }, {
                path: '/take-quiz',
                name: 'TakeQuiz',
                component: () =>
                    import ('@/components/take-quiz.vue')
            }, {
                path: '/classes/new-course',
                name: 'NewClass',
                component: () =>
                    import ('@/components/newCourse.vue')
            }, {
                path: '/messages',
                component: () =>
                    import ('@/components/chat.vue')
            }, {
                path: '/reports',
                name: 'Reports',
                component: () =>
                    import ('@/components/reports.vue')
            }, {
                path: '/library',
                name: 'Library',
                component: () =>
                    import ('@/components/library.vue')
            }, {
                path: '/live-class',
                name: 'liveClass',
                component: () =>
                    import ('@/components/live-class.vue')
            }, {
                path: '/profile',
                name: 'profile',
                component: () =>
                    import ('@/components/profile.vue')
            }, {
                path: '/accounts/currentUser',
                name: 'User Profile',
                component: () =>
                    import ('@/components/profile.vue')
            },
            {
                path: '/courses/anyCourse',
                name: 'CourseDetails',
                component: () =>
                    import ('@/components/course-details.vue')
            }, {
                path: '/admin-dashboard',
                name: 'AdminDashboard',
                component: () =>
                    import ('@/components/AdminDashboard'),
            }
        ]
    },{
        path: '/student-registration',
        name: 'StudentRegistration',
        component: () =>
            import ('@/components/student-registration'),
    },{
        path: '/teacher-registration',
        name: 'TeacherRegistration',
        component: () =>
            import ('@/components/teacher-registration'),
    },{
        path: '/user-registration',
        name: 'UserRegistration',
        component: () =>
            import ('@/components/user-registration'),
    }
    // ,{
    //     path: '/card',
    //     name: 'card',
    //     component: () =>
    //         import ('@/components/card.vue')
    // }
]

const router = new VueRouter({
    mode: 'history',
    hash: false,
    base: process.env.BASE_URL,
    routes
})

export default router