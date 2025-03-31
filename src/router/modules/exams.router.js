// NOTE: prefix of all  paths in this file is  "/live"
// NOTE: make sure you don't start with '/live' on your file path as it may lead to confusion
//          or inconsistency in you routes

const prefix = '/assessments/exams'

const routes =  [
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
            import( /* webpackChunkName: "new-quiz" */ '@/views/quiz/create'),
        meta: {
            allowedUsers: ["INSTRUCTOR"]
        },
    },
    {
        path: '/edit/:id',
        component: () =>
            import( /* webpackChunkName: "edit-quiz" */ '@/views/quiz/edit'),
        meta: {
            allowedUsers: ["INSTRUCTOR"]
        },
    },
    {
        path: '/preview/:id',
        component: () =>
            import( /* webpackChunkName: "preview-quiz" */ '@/views/quiz/intermediate')
    },
    {
        path: '/attempt/:id',
        component: () =>
            import( /* webpackChunkName: "attempt-quiz" */ '@/views/quiz/attempt')
    },
    {
        path: '/:exam_id/:user_name',
        component: () =>
            import( /* webpackChunkName: "mark-quiz" */ '@/views/quiz/mark')
    },
]

routes.forEach(route => route.path = `${prefix}${route.path}`)



export default routes
