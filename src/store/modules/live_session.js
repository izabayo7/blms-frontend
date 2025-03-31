import apis from "@/services/apis";

const getDefaultState = () => ({
    live_sessions: {
        data: [],
        loaded: false
    },
})

export default{
    state: getDefaultState,
    actions:{
        getLiveSessions({ state }) {
            if (!state.live_sessions.loaded) {
                apis.get(`live_session`).then(d => {
                    d.data = d.data.data
                    state.live_sessions.data = d.data
                    state.live_sessions.loaded = true
                })
            }
        },
    }
}