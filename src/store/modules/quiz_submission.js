import apis from "@/services/apis";
const getDefaultState = () => ({
    // storage for all quiz_submissions 
    quiz_submission: {
        data: [],
        loaded: false
    },
    // keep the selected quiz_submission
    selected_quiz_submission: ''
})

export default {
    namespaced: true,
    state: getDefaultState,
    mutations: {
        // add quiz_submission marks
        add_quiz_target(state, { id, target }) {
            for (const i in state.quiz_submission.data) {
                if (state.quiz_submission.data[i]._id === id) {
                    state.quiz_submission.data[i].target = target
                }
                if (state.quiz_submission.data[i].target == target) {
                    state.quiz_submission.data[i].target = undefined
                }
            }
        },
        // add feedback to answer
        add_answer_feedback(state, { answer_id, feedback }) {
            for (const i in state.quiz_submission.data) {
                if (state.quiz_submission.data[i]._id === state.selected_quiz_submission) {
                    for (const k in state.quiz_submission.data[i].answers) {
                        if (state.quiz_submission.data[i].answers[k]._id == answer_id) {
                            state.quiz_submission.data[i].answers[k].feedback = feedback
                        }
                    }
                }
            }
        },
        // remove feedback from answer
        remove_answer_feedback(state, { answer_id }) {
            for (const i in state.quiz_submission.data) {
                if (state.quiz_submission.data[i]._id === state.selected_quiz_submission) {
                    for (const k in state.quiz_submission.data[i].answers) {
                        if (state.quiz_submission.data[i].answers[k]._id == answer_id) {
                            state.quiz_submission.data[i].answers[k].feedback = undefined
                        }
                    }
                }
            }
        },
        // update the selected_quiz_submission
        set_selected_quiz_submission(state, id) {
            state.selected_quiz_submission = id
        },
        RESET_STATE(state) {
            Object.assign(state, getDefaultState())
        }
    },
    actions: {
        //get quiz_submissions  from backend
        getQuizSubmissions({ state }, { user_name }) {
            // if submission not loaded fetch them
            if (!state.quiz_submission.loaded) {
                apis.get(`quiz_submission/user/${user_name}`).then(d => {
                    d.data = d.data.data
                    state.quiz_submission.data = d.data
                    for (const k in d.data) {
                        state.quiz_submission.data.push(d.data[k])
                    }
                    //announce that data have been loaded
                    state.quiz_submission.loaded = true
                })
            }
        },

        //create a quiz_submission
        create_quiz_submission({ state, commit, dispatch }, { submission, attachments }) {
            let submissionObject = {}
            return apis.create('quiz_submission', submission).then(d => {
                d.data = d.data.data
                submissionObject = d.data
                if (attachments.length > 0) {
                    const formData = new FormData()
                    for (const i in attachments) {
                        formData.append("files[" + i + "]", attachments[i]);
                    }

                    // set the dialog
                    dispatch('modal/set_modal', { template: 'display_information', title: 'Creating submission', message: 'Uploading attachments' }, { root: true })

                    apis.create(`file/submissionAttachedFiles/${d.data._id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: (progressEvent) => {
                            commit('modal/update_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)), { root: true })
                        }
                    }).then((response) => {
                        submissionObject = response.data.data
                        dispatch('modal/reset_modal', null, { root: true })
                    })
                }
                state.quiz_submission.data.push(submissionObject)

            })

        },

        //create a quiz_submission
        update_quiz_submission({ state }, { submission }) {
            submission.totalMarks = undefined
            return apis.update('quiz_submission', state.selected_quiz_submission, submission).then(d => {
                d.data = d.data.data
                for (const i in state.quiz_submission.data) {
                    if (state.quiz_submission.data[i]._id == state.selected_quiz_submission) {
                        state.quiz_submission.data[i].answers = d.data.answers
                        state.quiz_submission.data[i].totalMarks = d.data.totalMarks
                        state.quiz_submission.data[i].updatedAt = d.data.updatedAt
                        state.quiz_submission.data[i].marked = d.data.marked
                    }
                }

            })

        },

        //find a quiz_submission by user name and submission name
        findQuizSubmissionByUserAndQuizNames({ state, commit }, { userName, quizName }) {
            let submissionFound = false
            if (state.quiz_submission.loaded) {
                let quiz_submission = state.quiz_submission.data.filter(quiz_submission => quiz_submission.user.user_name == userName && quiz_submission.quiz.name == quizName)
                if (quiz_submission.length > 0) {
                    submissionFound = true
                    commit('set_selected_quiz_submission', quiz_submission[0]._id)
                    return quiz_submission[0]
                }
            }
            if (!submissionFound) {
                return apis.get(`quiz_submission/user/${userName}/${quizName}`).then(d => {
                    d.data = d.data.data
                    if (!d.data)
                        return d.data

                    if (state.quiz_submission.loaded) {
                        // const found = state.quiz_submission.data.filter(e=>e._id == d._id)
                        state.quiz_submission.data.push(d.data)
                    } else {
                        state.quiz_submission.data = [d.data]
                    }
                    commit('set_selected_quiz_submission', d.data._id)
                    return d.data
                })
            }
        },
    },
    getters: {
        //get a specified quiz_submission
        loaded: state => {
            return state.quiz_submission.loaded
        },
        //get the selected_quiz_submission
        selected_quiz_submission: state => {
            return state.quiz_submission.data.filter(quiz_submission => quiz_submission._id == state.selected_quiz_submission)[0]
        },
        //get all quiz submissions
        quiz_submissions: state => {
            return state.quiz_submission.data.reverse()
        },
    },
}