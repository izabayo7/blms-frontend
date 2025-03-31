import apis from "@/services/apis";

const getDefaultState = () => ({
    live_sessions: {
        data: [],
        loaded: false
    },
    active_participants: [],
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
                if (d.data.status != 200 && d.data.status != 201) {
                    throw d.data
                }
                d.data = d.data.data
                state.live_sessions.data.push(d.data)
            })
        },
        answerAttendance({rootGetters}, {user}) {
            console.log(rootGetters)
            rootGetters['chat/socket'].emit("res/live/checkAttendance",{
                receivers: [user]
            })
        },
        addParticipant({state}, {id}) {
            const index = state.active_participants.indexOf({id})
            if (index == -1)
                state.active_participants.push({id})
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
    getters: {
        participants: state => {
            return state.active_participants;
        },
    }

}
