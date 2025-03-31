import apis from "@/services/apis";
export default {
    namespaced: true,
    state: {
        // storage for all quiz_submissions 
        quiz_submission: {
            data: [],
            loaded: false
        },
        // keep the selected quiz_submission
        selected_quiz_submission: ''
    },
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
        // update the selected_quiz_submission
        set_selected_quiz_submission(state, id) {
            state.selected_quiz_submission = id
        },
    },
    actions: {
        //get quiz_submissions  from backend
        getQuizSubmissions({ state }, { userCategory, userId }) {
            // if submission not loaded fetch them
            if (!state.quiz_submission.loaded) {
                apis.get(`quiz-submission/${userCategory}/${userId}`).then(d => {
                    state.quiz_submission.data = d.data
                    //announce that data have been loaded
                    state.quiz_submission.loaded = true
                })
            }
        },

        //create a quiz_submission
        create_quiz_submission({ state, commit, dispatch }, { submission, attachments }) {
            let submissionObject = {}
            return apis.create('quiz-submission', submission).then(d => {
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
                        submissionObject = response.data
                        dispatch('modal/reset_modal', null, { root: true })
                    })
                }
                state.quiz_submission.data.push(submissionObject)

            })

        },

        //create a quiz_submission
        update_quiz_submission({ state }, { submission }) {
            submission.totalMarks = undefined
            return apis.update('quiz-submission', state.selected_quiz_submission, submission).then(d => {
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

        //find a quiz_submission by student name and submission name
        findQuizSubmissionByStudentAndQuizNames({ state, commit }, { studentName, quizName }) {
            let submissionFound = false
            if (state.quiz_submission.loaded) {
                let quiz_submission = state.quiz_submission.data.filter(quiz_submission => `${quiz_submission.student.surName}_${quiz_submission.student.otherNames}` == studentName && quiz_submission.quiz.name == quizName)

                if (quiz_submission.length > 0) {
                    submissionFound = true
                    commit('set_selected_quiz_submission', quiz_submission[0]._id)
                    return quiz_submission[0]
                }
            }
            if (!submissionFound) {
                return apis.get(`quiz-submission/student/${studentName}/${quizName}`).then(d => {
                    if (state.quiz_submission.loaded) {
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
            return state.quiz_submission.data
        },
    },
}