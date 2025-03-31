import Vue from 'vue'
import Vuex from 'vuex'
import courses from "@/store/modules/courses";
import faculties from "@/store/modules/faculties";
import modal from "@/store/modules/modal";
import quiz from "@/store/modules/quiz";
import quiz_submission from "@/store/modules/quiz_submission";
import chat from "@/store/modules/chat";
import user from "@/store/modules/user";
import notification from '@/store/modules/notification'

Vue.use(Vuex)
export default new Vuex.Store({
    namespaced: true,
    state: {
        sidebar: {
            visible: false,
            minivariant: false
        },
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        courses,
        faculties,
        modal,
        quiz,
        quiz_submission,
        chat,
        user,
        notification
    }
})
