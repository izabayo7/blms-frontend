// NOTE: prefix of all  paths in this file is  "/live"
// NOTE: make sure you don't start with '/live' on your file path as it may lead to confusion
//          or inconsistency in you routes

const prefix = '/messages'

const routes =  [
    {
        path: '/start-conversation',
        component: () => import( /* webpackChunkName: "start-conversation" */ '@/views/chat/StartConversation.vue'),
    },
    {
        path: '/no-conversation',
        component: () => import( /* webpackChunkName: "no-conversation" */ '@/views/chat/NoConversation.vue'),
    },
    {
        path: '/',
        component: () => import( /* webpackChunkName: "messages" */ '@/views/chat/Messages.vue'),
        children: [
            { path: '/group/:id', component: () => import( /* webpackChunkName: "messages-group" */ '@/views/chat/GroupSetting') },
            { path: '/group/:id/add-member', component: () => import( /* webpackChunkName: "messages-add-member" */ '@/views/chat/AddMember') },
            { path: '/:username', component: () => import( /* webpackChunkName: "messages-dm" */ '@/views/chat/Chat.vue') }
        ]
    },
]

routes.forEach(route => route.path = `${prefix}${route.path}`)



export default routes
