import Api from './server'
import axios from 'axios'
const a = axios;

/* interceptors */
a.interceptors.response.use((response) => {
    return response
}, (error) => {
    return new Promise.reject(error)
})
a.interceptors.request.use((config) => {
    console.log('in request fullfilled', config)
    return config
}, error => {
    console.log('in request error', (error))
    return new Promise.reject(error)
})

export default {
    // users login
    login(body) {
        return Api().post(`/user/login`, body)
    },
    // get requests
    get(url) {
        return Api().get(`/${url}`)
    },
    // post requests
    create(path, body, config) {
        return Api().post(`/${path}`, body, config)
    },
    // put requests
    update(path, id, body, config) {
        return Api().put(`/${path}/${id}`, body, config)
    },
    update_user(body) {
        return Api().put(`/user`, body)
    },
    update_user_password(body) {
        return Api().put(`/user/password`, body)
    },
    update_user_profile(body, config) {
        return Api().put(`/user/profile`, body, config)
    },
    remove_user_profile(file_name) {
        return Api().delete(`/user/profile/${file_name}`)
    },
    // delete requests
    delete(path, id) {
        return Api().delete(`/${path}/${id}`)
    },
}