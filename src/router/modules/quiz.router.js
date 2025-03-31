// NOTE: prefix of all  paths in this file is  "/live"
// NOTE: make sure you don't start with '/live' on your file path as it may lead to confusion
//          or inconsistency in you routes

const prefix = '/courses'

const routes =  [
    {
        path: '/',
        name: 'Quiz',
        component: () =>
            import( /* webpackPrefetch: true */  /* webpackChunkName: "quiz" */ '@/views/quiz')
    },
    {
        path: '/new',
        name: 'Set Quiz',
        component: () =>
            import( /* webpackPrefetch: true */ /* webpackChunkName: "new-quiz" */ '@/views/quiz/create')
    },
    {
        path: '/edit/:name',
        name: 'Edit Quiz',
        component: () =>
            import( /* webpackPrefetch: true */ /* webpackChunkName: "edit-quiz" */ '@/views/quiz/edit')
    },
    {
        path: '/preview/:name',
        component: () =>
            import( /* webpackPrefetch: true */ /* webpackChunkName: "preview-quiz" */ '@/views/quiz/intermediate')
    },
    {
        path: '/timeout',
        component: () =>
            import( /* webpackPrefetch: true */ /* webpackChunkName: "quiz-timeout" */ '@/views/quiz/pre_submission')
    },
    {
        path: '/submitted',
        component: () =>
            import( /* webpackPrefetch: true */ /* webpackChunkName: "quiz-submitted" */ '@/views/quiz/pre_submission')
    },
    {
        path: '/:name/results',
        component: () =>
            import( /* webpackPrefetch: true */ /* webpackChunkName: "quiz-results" */ '@/views/quiz/results')
    },
    {
        path: '/attempt/:name',
        name: 'TakeQuiz',
        component: () =>
            import( /* webpackPrefetch: true */ /* webpackChunkName: "attempt-quiz" */ '@/views/quiz/attempt')
    },
    {
        path: '/:quiz_name/:user_name',
        name: 'MarkQuiz',
        component: () =>
            import( /* webpackPrefetch: true */ /* webpackChunkName: "mark-quiz" */ '@/views/quiz/mark')
    },
]

routes.forEach(route => route.path = `${prefix}${route.path}`)



export default routes
