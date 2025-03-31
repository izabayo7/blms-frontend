export default {
    namespaced: true,
    state: {
        // the visibility
        visible: false,
        // request progress
        progress: 0,
        // the title
        title: '',
        // the text to display
        message: '',
        // ability to close the modal
        closable: true,
        // request status
        status: 200
    },
    mutations: {
        // show or hide the modal
        update_visibility(state, value) {
            state.visible = value
        },
        // update the progress
        update_progress(state, value) {
            console.log(value)
            state.progress = value
        },
        // reset the progress
        reset_progress(state) {
            state.progress = 0
        },
        // update the message
        update_message(state, value) {
            state.progress = value
        },
        // reset the message
        reset_message(state) {
            state.message = ''
        },
        // update the title
        update_title(state, value) {
            state.progress = value
        },
        // reset the title
        reset_title(state) {
            state.message = ''
        },
        // update the cloasability
        update_closability(state, value) {
            state.closable = value
        },
        // update the status
        update_status(state, value) {
            state.status = value
        },
        // reset the status
        reset_status(state) {
            state.message = 200
        },
    },
    actions: {
    },
    getters: {
        //get visiblity
        visible: state => {
            return state.visible
        },
        //get request progress
        progress: state => {
            return state.progress
        },
        //get message
        message: state => {
            return state.message
        },
        //get title
        title: state => {
            return state.title
        },
        //get closability
        closable: state => {
            return state.closable
        },
        //get status
        status: state => {
            return state.status
        },
    },
}