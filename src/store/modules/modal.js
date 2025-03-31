const getDefaultState = () => ({
    // the visibility
    visible: false,
    // request progress
    progress: 0,
    // the title
    title: '',
    link: '',
    // the text to display
    message: '',
    // the text to display
    code: '',
    // ability to close the modal
    closable: false,
    // request status
    status: 200,
    // set user feedback on confirmations
    confirmed: false,
    // set action to be called if the user confirms and it's arguements
    confirmation_method: {action: '', parameters: {}},
    // set current modal template (information view, confirmation view, ...)
    modal_template: '',

})

export default {
    namespaced: true,
    state: getDefaultState,
    mutations: {
        // show or hide the modal
        toogle_visibility(state) {
            state.visible = !state.visible
        },
        // update the progress
        update_progress(state, value) {
            state.progress = value
        },
        // update the message
        update_message(state, value) {
            state.message = value
        },
        // update the title
        update_title(state, value) {
            state.title = value
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
        // update the confirmation method
        update_confirmation_method(state, value) {
            state.confirmation_method = value
        },
        // update the code
        update_code(state, value) {
            state.code = value
        },
        update_link(state, value) {
            state.link = value
        },
        // update modal template
        update_modal_template(state, value) {
            state.modal_template = value
        },
        RESET_STATE(state) {
            Object.assign(state, getDefaultState())
        }
    },
    actions: {
        // set up the dialog
        set_modal({state, commit}, {template, method, title, message, link, closable = false, code}) {
            commit('update_modal_template', template)
            commit('update_confirmation_method', method)
            commit('update_title', title)
            commit('update_message', message);
            commit('update_closability', closable)
            commit('update_confirmation', false)
            commit('update_code', code)
            commit('update_link', link)
            if (!state.visible) {
                commit('toogle_visibility');
            }

        },
        // set up the dialog
        reset_modal({commit}) {
            commit('update_modal_template', '')
            commit('update_confirmation_method', {})
            commit('update_title', '')
            commit('update_message', '');
            commit('toogle_visibility');
            commit('update_progress', 0)
            commit('update_link', '')
            commit('update_code', '')
            commit('update_closability', false)
        },
        // set the progress
        set_progress({getters, dispatch, commit}, value) {
            commit('update_progress', value)
            // if the progress is full reset the modal
            if (value === 100) {
                setTimeout(() => {
                    if (getters.progress === 100) {
                        dispatch('reset_modal', null)
                    }
                }, 1000);
            }
        }
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
        //get codde
        code: state => {
            return state.code
        },
        //get title
        title: state => {
            return state.title
        },
        link: state => {
            return state.link
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
        //get current confirmation method
        confirmation_method: state => {
            return state.confirmation_method
        },
        //get current modal template
        modal_template: state => {
            return state.modal_template
        },
    },
}