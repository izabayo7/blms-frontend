//prefix of the path is "live"



const routes =  [
    {
        path:'/live/course/{id}',
        name:"liveCourse",
        component:() => import("@/views/live/new/index.vue")
    }
]





export default routes