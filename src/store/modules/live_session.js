import apis from "@/services/apis";

const getDefaultState = () => ({
    live_sessions: {
        data: [],
        active_participants: [],
        loaded: false
    },
})

export default {
    namespaced: true,
    state: getDefaultState,
    actions: {
        getLiveSessions({state}) {
            if (!state.live_sessions.loaded) {
                apis.get(`live_session`).then(d => {
                    d.data = d.data.data
                    state.live_sessions.data = d.data
                    state.live_sessions.loaded = true
                })
            }
        },
        createLiveSession({state}, {session}) {
            return apis.create('live_session', session).then(d => {
                d.data = d.data.data
                state.live_sessions.data.push(d.data)
            })
        },
        addParticipant({state}, {id}) {
            if (!state.active_participants.includes(id))
                state.active_participants.push(id)
        },
        deleteLiveSession({state}, {id}) {
            return apis.delete('live_session', id).then(() => {
                for (const i in state.live_sessions.data) {
                    if (state.live_sessions.data[i]._id == id) {
                        state.live_sessions.data.splice(i, 1)
                        break
                    }
                }
            })
        }
    },
}