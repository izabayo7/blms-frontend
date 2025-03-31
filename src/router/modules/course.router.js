// NOTE: prefix of all  paths in this file is  "/live"
// NOTE: make sure you don't start with '/live' on your file path as it may lead to confusion
//          or inconsistency in you routes

const prefix = '/courses'

const routes =  [
    {
        path: '/',
        component: () => import('@/views/courses'),
    },
    {
        path: '/preview/:name',
        component: () => import('@/views/courses/preview')
    },
    {
        path: '/edit/:name/:type',
        name: 'Edit Course',
        component: () =>
            import('@/views/courses/edit')
    },
    {
        path: '/new',
        name: 'Create course',
        component: () =>
            import('@/views/courses/create')
    },
    {
        path: '/:name',
        component: () => import('@/views/courses/details'),
        children: [
            {
                path: '/courses/:name/chapter/:index/:id',
                component: () => import('@/views/courses/chapter-details')
            }
        ]
    },
]

routes.forEach(route => route.path = `${prefix}${route.path}`)



export default routes
