// NOTE: prefix of all  paths in this file is  "/live"
// NOTE: make sure you don't start with '/live' on your file path as it may lead to confusion
//          or inconsistency in you routes

const prefix = '/assessments/assignments'

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
            import( /* webpackChunkName: "new-quiz" */ '@/views/quiz/create_assignment'),
        meta: {
            allowedUsers: ["INSTRUCTOR"]
        },
    },
    {
        path: '/edit/:id',
        component: () =>
            import( /* webpackChunkName: "edit-quiz" */ '@/views/quiz/edit_assignment'),
        meta: {
            allowedUsers: ["INSTRUCTOR"]
        },
    },
    {
        path: '/:id',
        component: () =>
            import( /* webpackChunkName: "attempt-quiz" */ '@/views/quiz/student_assignment_results'),
        meta: {
            allowedUsers: ["STUDENT","INSTRUCTOR"]
        },
    },
    {
        path: '/:user_name/:id',
        component: () =>
            import( /* webpackChunkName: "mark-quiz" */ '@/views/quiz/student_assignment_results'),
        meta: {
            allowedUsers: ["STUDENT","INSTRUCTOR"]
        },
    },
]

routes.forEach(route => route.path = `${prefix}${route.path}`)



export default routes
