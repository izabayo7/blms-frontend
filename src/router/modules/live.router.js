//prefix of the path is "live"

const prefix = '/live'

const routes =  [
    {
        path:'/course/{id}',
        name:"liveCourse",
        component:() => import("@/views/live/new/index.vue")
    }
]

//changing all routes to have prefix live
// this indicates that all routes from this file will have starting string 'live'
// example of how path could be converted
//      -  path: '/course' => path: '/live/course'      [FINE]
//      - path: 'course' => path: '/livecourse'         [WRONG] (it may result into undesired results)
//      - path: '/course/{id}' => path:'live/course/{id}    [FINE]

routes.forEach(route => route.path = `${prefix}${route.path}`)



export default routes