import apis from "@/services/apis";
const getDefaultState = () => ({
    // storage for all quiz
    quiz: {
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
        update_quiz_target(state, { id, target }) {
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
        RESET_STATE(state) {
            Object.assign(state, getDefaultState())
        }
    },
    actions: {
        //get quiz from backend
        getQuizes({ state }, { user_name }) {
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
        //create a quiz
        create_quiz({ state, dispatch }, { quiz, pictures }) {

            return apis.create('quiz', quiz).then(d => {
                if(d.data.status != 200 && d.data.status != 201){
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
                        dispatch('modal/set_modal', { template: 'display_information', title: 'Creating quiz', message: 'uploading pictures' }, { root: true })

                        apis.create(`quiz/${d.data._id}/attachment`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
                            onUploadProgress: (progressEvent) => {
                                dispatch('modal/set_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)), { root: true })
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
        //update a quiz
        update_quiz({ state, dispatch }, { quiz, pictures }) {
            return apis.update('quiz', state.selected_quiz, quiz).then(d => {
                if(d.data.status != 200 && d.data.status != 201){
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
                        dispatch('modal/set_modal', { template: 'display_information', title: 'Updating quiz', message: 'uploading pictures' }, { root: true })

                        apis.create(`quiz/${d.data._id}/attachment`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
                            onUploadProgress: (progressEvent) => {
                                dispatch('modal/set_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)), { root: true })
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
        findQuizByName({ state, commit }, { user_name, quizName }) {
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
        delete_quiz({ state }, { id }) {
            apis.delete('quiz', id).then(() => {
                for (const i in state.quiz.data) {
                    if (state.quiz.data[i]._id == id) {
                        state.quiz.data.splice(i, 1)
                        break
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
        //get the selected_quiz
        selected_quiz: state => {
            return state.quiz.data.filter(quiz => quiz._id == state.selected_quiz)[0]
        },
        //get a specified quiz by name
        all_quiz: state => {
            return state.quiz.data
        },
    },
}