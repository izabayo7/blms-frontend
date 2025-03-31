// NOTE: prefix of all  paths in this file is  "/live"
// NOTE: make sure you don't start with '/live' on your file path as it may lead to confusion
//          or inconsistency in you routes

const prefix = '/quiz'

const routes =  [
    {
        path: '/',
        name: 'Quiz',
        meta: {
            allowedUsers: ["INSTRUCTOR"]
        },
        component: () =>
            import( /* webpackChunkName: "quiz" */ '@/views/quiz')
    },
    {
        path: '/new',
        name: 'Set Quiz',
        component: () =>
            import( /* webpackChunkName: "new-quiz" */ '@/views/quiz/create'),
        meta: {
            allowedUsers: ["INSTRUCTOR"]
        },
    },
    {
        path: '/edit/:name',
        name: 'Edit Quiz',
        component: () =>
            import( /* webpackChunkName: "edit-quiz" */ '@/views/quiz/edit'),
        meta: {
            allowedUsers: ["INSTRUCTOR"]
        },
    },
    {
        path: '/preview/:name',
        component: () =>
            import( /* webpackChunkName: "preview-quiz" */ '@/views/quiz/intermediate')
    },
    {
        path: '/timeout',
        component: () =>
            import( /* webpackChunkName: "quiz-timeout" */ '@/views/quiz/pre_submission')
    },
    {
        path: '/submitted',
        component: () =>
            import( /* webpackChunkName: "quiz-submitted" */ '@/views/quiz/pre_submission')
    },
    {
        path: '/:name/results',
        component: () =>
            import( /* webpackChunkName: "quiz-results" */ '@/views/quiz/results')
    },
    {
        path: '/attempt/:name',
        name: 'TakeQuiz',
        component: () =>
            import( /* webpackChunkName: "attempt-quiz" */ '@/views/quiz/attempt')
    },
    {
        path: '/:quiz_name/:user_name',
        name: 'MarkQuiz',
        component: () =>
            import( /* webpackChunkName: "mark-quiz" */ '@/views/quiz/mark')
    },
]

routes.forEach(route => route.path = `${prefix}${route.path}`)



export default routes
