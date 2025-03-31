// NOTE: prefix of all  paths in this file is  "/live"
// NOTE: make sure you don't start with '/live' on your file path as it may lead to confusion
//          or inconsistency in you routes

const prefix = '/messages'

const routes =  [
    {
        path: '/start-conversation',
        component: () => import( /* webpackPrefetch: true */ '@/views/chat/StartConversation.vue'),
    },
    {
        path: '/no-conversation',
        component: () => import( /* webpackPrefetch: true */ '@/views/chat/NoConversation.vue'),
    },
    {
        path: '',
        component: () => import( /* webpackPrefetch: true */ '@/views/chat/Messages.vue'),
        children: [
            { path: '/group/:id', component: () => import( /* webpackPrefetch: true */ '@/views/chat/GroupSetting') },
            { path: '/group/:id/add-member', component: () => import( /* webpackPrefetch: true */ '@/views/chat/AddMember') },
            { path: '/:username', component: () => import( /* webpackPrefetch: true */ '@/views/chat/Chat.vue') }
        ]
    },
]

routes.forEach(route => route.path = `${prefix}${route.path}`)



export default routes
