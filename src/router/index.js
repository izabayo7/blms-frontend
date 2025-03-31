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
    path: '/shotcuts',
    name: 'Shot cut',
    component: () =>
        import('@/views/pages/shotcut')
},
{
    path: '/image',
    name: 'Tip Tap',
    component: () =>
        import('@/views/pages/imageskills')
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
            import('@/components/newCourse.vue')
    }, {
        path: '/courses/:id',
        name: 'CourseDetails',
        component: () =>
            import('@/views/courses/Course-details-new.vue')
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