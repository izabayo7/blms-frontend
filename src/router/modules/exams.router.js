// NOTE: prefix of all  paths in this file is  "/live"
// NOTE: make sure you don't start with '/live' on your file path as it may lead to confusion
//          or inconsistency in you routes

const prefix = '/assessments/exams'

const routes = [
    {
        path: '/',
        meta: {
            allowedUsers: ["INSTRUCTOR"]
        },
        component: () =>
            import( /* webpackChunkName: "quiz" */ '@/views/quiz')
    },
    {
        path: '/new',
        component: () =>
            import( /* webpackChunkName: "new-exam" */ '@/views/quiz/create'),
        meta: {
            allowedUsers: ["INSTRUCTOR"]
        },
    },
    {
        path: '/edit/:id',
        component: () =>
            import( /* webpackChunkName: "edit-exam" */ '@/views/quiz/edit'),
        meta: {
            allowedUsers: ["INSTRUCTOR"]
        },
    },
    {
        path: '/instructions',
        component: () => import( /* webpackChunkName: "exams" */ '@/views/quiz/exam_intermediate.vue'),
        meta: {
            allowedUsers: ["STUDENT","INSTRUCTOR"]
        },
    },
    {
        path: '/attempt/:id',
        name:"attempt-exam",
        meta: {
            allowedUsers: ["STUDENT", "INSTRUCTOR"]
        },
        component: () =>
            import( /* webpackChunkName: "attempt-exam" */ '@/views/quiz/attempt_exam')
    },
    {
        path: '/:id/:user_name',
        component: () =>
            import( /* webpackChunkName: "mark-exam" */ '@/views/quiz/mark')
    },
]

routes.forEach(route => route.path = `${prefix}${route.path}`)


export default routes
