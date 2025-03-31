import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/pages/home'

Vue.use(VueRouter)

const routes = [
    // the landing page
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    // the login page
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
            import('@/views/dashboard'),

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
            path: '/admin',
            name: 'Admin',
            component: () =>
                import('@/components/admin/index.vue')
        },
        ]
    }, {
        path: '/register/users',
        name: 'Register Users',
        component: () =>
            import('@/components/registration/users/panel.vue')
    }, {
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
    }, {
        path: '/school-details',
        name: 'SchoolDetails',
        component: () =>
            import('@/components/school-details'),
    }, {
        path: '/edit-school-info',
        name: 'EditSchoolDetails',
        component: () =>
            import('@/components/edit-school'),
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

export default router