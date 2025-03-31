import Api from './server'
import Vue from 'vue'
import {logout} from "./global_functions";


/* interceptors */
Api.interceptors.response.use(function (response) {

    const {data: {status, message}} = response

    if (status === 401) {
        if (message.toLowerCase() === 'invalid token')
            logout()
    }

    return response
}, function (error) {
    return new Promise.reject(error)
})


Api.interceptors.request.use((config) => {
    try {
        if (Vue.prototype.$session.exists()) {
            //get token
            const {jwt: token} = JSON.parse(localStorage.getItem('vue-session-key'))

            //add token to headers
            config.headers = {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            }
        }
        return config

    } catch (e) {
        Vue.prototype.$store.dispatch("app_notification/SET_NOTIFICATION", {
            message: e,
            status: "danger",
            uptime: 2000,
        })
    }
})


export default {
    // users login
    login(body) {
        return Api.post(`/user/login`, body)
    },
    // get requests
    get(url) {
        return Api.get(`/${url}`)
    },
    // generalised put for update
    put(url, body, config) {
        return Api.put(`/${url}`, body, config)
    },
    // post requests
    create(path, body, config) {

        return Api.post(`/${path}`, body, config)
    },
    // put requests
    update(path, id, body, config) {
        return Api.put(`/${path}/${id}`, body, config)
    },
    update_user(body) {
        return Api.put(`/user`, body)
    },
    update_user_password(body) {
        return Api.put(`/user/password`, body)
    },
    update_user_profile(body, config) {
        return Api.put(`/user/profile`, body, config)
    },
    remove_user_profile(file_name) {
        return Api.delete(`/user/profile/${file_name}`)
    },
    // delete requests
    delete(path, id) {
        return Api.delete(id ? `/${path}/${id}` : `/${path}`)
    },
}