// NOTE: prefix of all  paths in this file is  "/live"
// NOTE: make sure you don't start with '/live' on your file path as it may lead to confusion
//          or inconsistency in you routes

const prefix = '/courses'

const routes =  [
    {
        path: '/',
        component: () => import(  /* webpackChunkName: "courses" */ '@/views/courses'),
    },
    {
        path: '/preview/:name',
        component: () => import( /* webpackChunkName: "course-preview" */ '@/views/courses/preview')
    },
    {
        path: '/edit/:name/:type',
        name: 'Edit Course',
        component: () =>
            import(  /* webpackChunkName: "course-edit" */ '@/views/courses/edit')
    },
    {
        path: '/new',
        name: 'Create course',
        component: () =>
            import( /* webpackChunkName: "new-course" */ '@/views/courses/create')
    },
    {
        path: '/:name',
        component: () => import( /* webpackChunkName: "view-course" */ '@/views/courses/details'),
        children: [
            {
                path: '/courses/:name/chapter/:index/:id',
                component: () => import(  /* webpackChunkName: "course-chatper" */ '@/views/courses/chapter-details')
            }
        ]
    },
]

routes.forEach(route => route.path = `${prefix}${route.path}`)



export default routes
