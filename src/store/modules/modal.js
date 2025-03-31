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
        closable: false,
        // request status
        status: 200,
        // set user feedback on confirmations
        confirmed: false,
        // set current confirmation action
        confirmation_action: '',
        // set current modal template (information view, confirmation view, ...)
        modal_template: '',

    },
    mutations: {
        // show or hide the modal
        toogle_visibility(state) {
            state.visible = !state.visible
        },
        // update the progress
        update_progress(state, value) {
            state.progress = value
        },
        // reset the progress
        reset_progress(state) {
            state.progress = 0
        },
        // update the message
        update_message(state, value) {
            state.message = value
        },
        // reset the message
        reset_message(state) {
            state.message = ''
        },
        // update the title
        update_title(state, value) {
            state.title = value
        },
        // reset the title
        reset_title(state) {
            state.title = ''
        },
        // update the cloasability
        update_closability(state, value) {
            state.closable = value
        },
        // update the status
        update_status(state, value) {
            state.status = value
        },
        // update the confirmation
        update_confirmation(state, value) {
            state.confirmed = value
        },
        // update the confirmation action
        update_confirmation_action(state, value) {
            state.confirmation_action = value
        },
        // reset the status
        reset_status(state) {
            state.message = 200
        },
        // update modal template
        update_modal_template(state, value){
            state.modal_template = value
        }
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
        //get confirmations
        confirmed: state => {
            return state.confirmed
        },
        //get current confirmation action
        confirmation_action: state => {
            return state.confirmation_action
        },
        //get current modal template
        modal_template: state => {
            return state.modal_template
        },
    },
}