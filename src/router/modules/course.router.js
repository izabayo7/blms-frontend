// NOTE: prefix of all  paths in this file is  "/live"
// NOTE: make sure you don't start with '/live' on your file path as it may lead to confusion
//          or inconsistency in you routes

const prefix = '/courses'

const routes =  [
    {
        path: '/',
        component: () => import( /* webpackPrefetch: true */  /* webpackChunkName: "courses" */ '@/views/courses'),
    },
    {
        path: '/preview/:name',
        component: () => import( /* webpackPrefetch: true */  /* webpackChunkName: "course-preview" */ '@/views/courses/preview')
    },
    {
        path: '/edit/:name/:type',
        name: 'Edit Course',
        component: () =>
            import( /* webpackPrefetch: true */  /* webpackChunkName: "course-edit" */ '@/views/courses/edit')
    },
    {
        path: '/new',
        name: 'Create course',
        component: () =>
            import( /* webpackPrefetch: true */  /* webpackChunkName: "new-course" */ '@/views/courses/create')
    },
    {
        path: '/:name',
        component: () => import( /* webpackPrefetch: true */  /* webpackChunkName: "view-course" */ '@/views/courses/details'),
        children: [
            {
                path: '/courses/:name/chapter/:index/:id',
                component: () => import( /* webpackPrefetch: true */  /* webpackChunkName: "course-chatper" */ '@/views/courses/chapter-details')
            }
        ]
    },
]

routes.forEach(route => route.path = `${prefix}${route.path}`)



export default routes
