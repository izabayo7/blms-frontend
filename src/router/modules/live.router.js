// NOTE: prefix of all  paths in this file is  "/live"
// NOTE: make sure you don't start with '/live' on your file path as it may lead to confusion
//          or inconsistency in you routes

const prefix = '/live'

const routes =  [
    {
        path:'/course/',
        name:"liveCourse",
        component:() => import( /* webpackPrefetch: true */  /* webpackChunkName: "live" */ "@/views/live/new/index.vue")
    },
    {
        path: '/schedule',
        component: () =>
            import(/* webpackPrefetch: true */  /* webpackChunkName: "schedule-live" */'@/views/live/schedule'),
    },
    {
        path:'/test/:courseId',
        name:"liveClassCourseTest",
        component:() => import( /* webpackPrefetch: true */  /* webpackChunkName: "live-test" */ "@/views/live/new/liveClass_test.vue")
    },
    {
        path:'/:liveSessionId',
        name:"liveClassCourse",
        component:() => import( /* webpackPrefetch: true */  /* webpackChunkName: "new-live" */ "@/views/live/new/liveClass.vue")
    },
]

//changing all routes to have prefix live
// this indicates that all routes from this file will have starting string 'live'
// example of how path could be converted
//      -  path: '/course' => path: '/live/course'      [FINE]
//      - path: 'course' => path: '/livecourse'         [WRONG] (it may result into undesired results)
//      - path: '/course/{id}' => path:'live/course/{id}    [FINE]

routes.forEach(route => route.path = `${prefix}${route.path}`)



export default routes
