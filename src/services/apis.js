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
    create(category, body, config) {
        return Api().post(`/${category}`, body, config)
    },
    // put requests
    update(category, id, body, config) {
        return Api().put(`/${category}/${id}`, body, config)
    },
    // delete requests
    delete(category, id) {
        return Api().delete(`/${category}/${id}`)
    },
}