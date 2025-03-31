import apis from "@/services/apis";
export default {
    namespaced: true,
    state: {
        // storage for all quiz
        quiz: {
            data: [],
            loaded: false
        },
    },
    mutations: {
    },
    actions: {
        //get quiz from backend
        getQuizes({ state }, collegeId ) {
            apis.get(`faculty-college-year/college/${collegeId}`).then(d => {
                state.quiz.data = d.data
                //announce that data have been loaded
                state.quiz.loaded = true
            })
        },
    },
    getters: {
        //get a specified quiz
        loaded: state => {
            return state.quiz.loaded
        },
        //get a specified quiz by name
        quiz: state => (name) => {
            return state.quiz.data.filter(quiz => quiz.name == name)[0]
        },
        //get a specified quiz by name
        quizNames: state => {
            let quizNames = []
            for (const element of state.quiz.data) {
                quizNames.push(element.name)
            }
            return quizNames
        },
    },
}