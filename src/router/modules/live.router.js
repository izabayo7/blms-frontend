//prefix of the path is "live"

const prefix = '/live'

const routes =  [
    {
        path:'/course/{id}',
        name:"liveCourse",
        component:() => import("@/views/live/new/index.vue")
    }
]


routes.forEach(route => route.path = `${prefix}${route.path}`)



export default routes