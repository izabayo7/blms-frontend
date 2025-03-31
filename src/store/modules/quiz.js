import apis from "@/services/apis";
import router from '@/router'

const getDefaultState = () => ({
    // storage for all quiz
    quiz: {
        data: [],
        loaded: false
    },
    assignments: {
        data: [],
        loaded: false
    },
    exams: {
        data: [],
        loaded: false
    },
    // keep the selected quiz
    selected_quiz: ''
})

export default {
    namespaced: true,
    state: getDefaultState,
    mutations: {
        // update quiz target
        update_quiz_target(state, {id, target}) {
            for (const i in state.quiz.data) {
                if (state.quiz.data[i]._id === id) {
                    state.quiz.data[i].target = target
                }
                // if (state.quiz.data[i].target == target && state.quiz.data[i]._id !== id) {
                //     state.quiz.data[i].target = undefined
                // }
            }
        },
        // update the selected_quiz
        set_selected_quiz(state, id) {
            state.selected_quiz = id
        },
        addAssignment(state, assignment) {
            state.assignments.data.unshift(assignment)
        },
        addExam(state, exam) {
            state.exams.data.unshift(exam)
        },
        editAssignment(state, {assignment, id}) {
            for (const i in state.assignments.data) {
                if (state.assignments.data[i]._id === id) {
                    state.assignments.data[i] = assignment
                    break
                }
            }
        },
        editExam(state, {exam, id}) {
            for (const i in state.exams.data) {
                if (state.exams.data[i]._id === id) {
                    state.exams.data[i] = exam
                    break
                }
            }
        },
        RESET_STATE(state) {
            Object.assign(state, getDefaultState())
        }
    },
    actions: {
        //get quiz from backend
        getQuizes({state}, {user_name}) {
            // when quiz is not loaded fetch quizes
            if (!state.quiz.loaded) {
                apis.get(`quiz/user/${user_name}`).then(d => {
                    d.data = d.data.data
                    state.quiz.data = d.data
                    //announce that data have been loaded
                    state.quiz.loaded = true
                })
            }
        },
        getAssignments({state}) {
            // when quiz is not loaded fetch quizes
            if (!state.quiz.loaded) {
                apis.get(`assignments`).then(d => {
                    d.data = d.data.data
                    state.assignments.data = d.data
                    //announce that data have been loaded
                    state.assignments.loaded = true
                })
            }
        },
        getExams({state}) {
            // when quiz is not loaded fetch quizes
            if (!state.quiz.loaded) {
                apis.get(`exams`).then(d => {
                    d.data = d.data.data
                    state.exams.data = d.data
                    //announce that data have been loaded
                    state.exams.loaded = true
                })
            }
        },
        async getAssignment({state}, {id}) {
            // when quiz is not loaded fetch quizes
            if (!state.assignments.loaded) {
                const d = await apis.get(`assignments/${id}`)
                return d.data.data
            } else {
                const res = state.assignments.data.filter(x => x._id === id)
                return res[0]
            }
        },
        // eslint-disable-next-line no-empty-pattern
        async getExam({}, {id}) {
            const d = await apis.get(`exams/${id}`)
            return {exam: d.data.data, msg: d.data.message}
        },
        //create a quiz
        create_quiz({state, dispatch}, {quiz, pictures}) {

            return apis.create('quiz', quiz).then(d => {
                if (d.data.status != 200 && d.data.status != 201) {
                    throw d.data
                }

                d.data = d.data.data
                d.data.usage = 0
                if (pictures.length > 0) {
                    let index = 0
                    let pictureFound = false
                    const formData = new FormData()
                    for (const i in pictures) {
                        for (const k in pictures[i]) {
                            if (pictures[i][k] !== []) {
                                pictureFound = true
                                formData.append("files[" + index + "]", pictures[i][k]);
                                index++
                            }
                        }
                    }
                    if (pictureFound) {
                        // set the dialog
                        dispatch('modal/set_modal', {
                            template: 'display_information',
                            title: 'Creating quiz',
                            message: 'uploading pictures'
                        }, {root: true})

                        apis.create(`quiz/${d.data._id}/attachment`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
                            onUploadProgress: (progressEvent) => {
                                dispatch('modal/set_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)), {root: true})
                            }
                        }).then((response) => {
                            state.quiz.data.push(response.data)
                        })
                    } else {
                        state.quiz.data.push(d.data)
                    }
                }
            })

        },
        release_marks({dispatch, rootGetters}, {id, quizName, user_group}) {
            apis.update('quiz/release_marks', id).then((res) => {
                if (res.data.status === 403) {
                    dispatch("app_notification/SET_NOTIFICATION", {
                        message: res.data.message,
                        status: "danger",
                        uptime: 5000,
                    }, {root: true});
                } else {
                    rootGetters['chat/socket'].emit('marksReleased', {
                        route: `/quiz/attempt/${quizName}`,
                        user_group,
                        content: `released marks for quiz ${quizName}`
                    })
                    dispatch("app_notification/SET_NOTIFICATION", {
                        message: "Marks released",
                        status: "success",
                        uptime: 5000,
                    }, {root: true});
                }
            })
        },
        //update a quiz
        update_quiz({state, dispatch}, {quiz, pictures}) {
            return apis.update('quiz', state.selected_quiz, quiz).then(d => {
                if (d.data.status != 200 && d.data.status != 201) {
                    throw d.data
                }
                d.data = d.data.data
                let quizIndex
                for (const i in state.quiz.data) {
                    if (state.quiz.data[i]._id === state.selected_quiz) {
                        quizIndex = i
                        break
                    }
                }
                if (pictures.length > 0) {
                    let index = 0
                    let pictureFound = false
                    const formData = new FormData()
                    for (const i in pictures) {
                        for (const k in pictures[i]) {
                            if (pictures[i][k] !== []) {
                                pictureFound = true
                                formData.append("files[" + index + "]", pictures[i][k]);
                                index++
                            }
                        }
                    }
                    if (pictureFound) {
                        dispatch('modal/set_modal', {
                            template: 'display_information',
                            title: 'Updating quiz',
                            message: 'uploading pictures'
                        }, {root: true})

                        apis.create(`quiz/${d.data._id}/attachment`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
                            onUploadProgress: (progressEvent) => {
                                dispatch('modal/set_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)), {root: true})
                            }
                        }).then((response) => {
                            state.quiz.data[quizIndex] = response.data.data
                        })
                    } else {
                        state.quiz.data[quizIndex] = d.data
                    }
                }
            })

        },

        //find a quiz by name
        findQuizByName({state, commit}, {user_name, quizName}) {
            let quizFound = false
            if (state.quiz.loaded) {
                let quiz = state.quiz.data.filter(quiz => quiz.name == quizName)
                if (quiz.length > 0) {
                    quizFound = true
                    commit('set_selected_quiz', quiz[0]._id)
                    return quiz[0]
                }
            }
            if (!quizFound) {
                return apis.get(`quiz/user/${user_name}/${quizName}`).then(d => {
                    d.data = d.data.data
                    if (state.quiz.loaded) {
                        state.quiz.data.push(d.data)
                    } else {
                        state.quiz.data = [d.data]
                    }
                    commit('set_selected_quiz', d.data._id)
                    return d.data
                })
            }
        },
        //delete a quiz
        delete_quiz({state}, {id}) {
            apis.delete('quiz', id).then(() => {
                for (const i in state.quiz.data) {
                    if (state.quiz.data[i]._id == id) {
                        state.quiz.data.splice(i, 1)
                        break
                    }
                }
            })
        },
        delete_assignment({state}, {id}) {
            apis.delete('assignments', id).then(() => {
                for (const i in state.quiz.data) {
                    if (state.assignments.data[i]._id === id) {
                        state.assignments.data.splice(i, 1)
                        break
                    }
                }
            })
        },
        // eslint-disable-next-line no-empty-pattern
        async delete_assignment_submission({}, {id}) {
            await apis.delete('assignment_submission', id)
            router.push('/assignments')
        },
        change_assignment_status({state, rootGetters, dispatch}, {id, status, user_group, name}) {
            apis.update('assignments/changeStatus', id + '/' + status).then((res) => {
                if (res.data.status === 403) {
                    dispatch("app_notification/SET_NOTIFICATION", {
                        message: res.data.message,
                        status: "danger",
                        uptime: 5000,
                    }, {root: true});
                } else {
                    if (status === 'RELEASED' || status === 'PUBLISHED')
                        rootGetters['chat/socket'].emit('marksReleased', {
                            route: `/assignments/${id}`,
                            user_group,
                            content: `${status === 'RELEASED' ? 'released marks for' : 'published a new '} assignment ${name}`
                        })
                    if (status === 'RELEASED') {
                        dispatch("app_notification/SET_NOTIFICATION", {
                            message: "Marks released",
                            status: "success",
                            uptime: 5000,
                        }, {root: true});
                    }
                    for (const i in state.quiz.data) {
                        if (state.assignments.data[i]._id === id) {
                            state.assignments.data[i].status = status
                            break
                        }
                    }
                }
            })
        },
        change_exam_status({state, rootGetters, dispatch}, {id, status, user_group, name}) {
            apis.update('exams/changeStatus', id + '/' + status).then((res) => {
                if (res.data.status === 403) {
                    dispatch("app_notification/SET_NOTIFICATION", {
                        message: res.data.message,
                        status: "danger",
                        uptime: 5000,
                    }, {root: true});
                } else {
                    if (status === 'RELEASED' || status === 'PUBLISHED')
                        rootGetters['chat/socket'].emit('marksReleased', {
                            route: `/assignments/${id}`,
                            user_group,
                            content: `${status === 'RELEASED' ? 'released marks for' : 'published a new '} exam ${name}`
                        })
                    if (status === 'RELEASED') {
                        dispatch("app_notification/SET_NOTIFICATION", {
                            message: "Marks released",
                            status: "success",
                            uptime: 5000,
                        }, {root: true});
                    }
                    for (const i in state.quiz.data) {
                        if (state.exams.data[i]._id === id) {
                            state.exams.data[i].status = status
                            break
                        }
                    }
                }
            })
        },
    },
    getters: {
        //get a specified quiz
        loaded: state => {
            return state.quiz.loaded
        },
        assignments_loaded: state => {
            return state.assignments.loaded
        },
        //get the selected_quiz
        selected_quiz: state => {
            return state.quiz.data.filter(quiz => quiz._id == state.selected_quiz)[0]
        },
        //get a specified quiz by name
        all_quiz: state => {
            return state.quiz.data
        },
        assignments: state => {
            return state.assignments.data
        },
        exams: state => {
            return state.exams.data
        },
    },
}