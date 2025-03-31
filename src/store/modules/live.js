const getDefaultState = () => ({
    room: {
        id: 'DEFAULT',
        participants: []
    }
})

export default {
    namespaced: true,
    state: getDefaultState,
    mutations: {
        ADD_PARTICIPANT(state, participant) {
            state.room.participants.push(participant)
        },
        REMOVE_PARTICIPANT(state, index) {
            state.room.participants.splice(index, 1)
        },
        RESET_STATE(state) {
            Object.assign(state, getDefaultState())
        }
    },
    actions: {
    },
    getters: {
        //get default room
        room: state => {
            return state.room
        },
    },
}
