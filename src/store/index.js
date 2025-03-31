import Vue from 'vue'
import Vuex from 'vuex'
import courses from "@/store/modules/courses";
import faculties from "@/store/modules/faculties";
import modal from "@/store/modules/modal";
import quiz from "@/store/modules/quiz";
import quiz_submission from "@/store/modules/quiz_submission";
import chat from "@/store/modules/chat";
import user from "@/store/modules/user";
import sidebar_navbar from "@/store/modules/sidebar_navbar";
import notification from '@/store/modules/notification'
import users from '@/store/modules/users'
import colleges from '@/store/modules/colleges'
import years from '@/store/modules/years'
import live from '@/store/modules/live'
import faculty_college_year from '@/store/modules/faculty_college_year'

Vue.use(Vuex)
export default new Vuex.Store({
    namespaced: true,
    state: {},
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
        sidebar_navbar,
        notification,
        users,
        colleges,
        years,
        live,
        faculty_college_year
    }
})
