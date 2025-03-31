import Api from './server'
import { logout } from "./global_functions";



/* interceptors */
Api.interceptors.response.use(function (response) {

    const { data: { status, message } } = response

    if (status === 401) {
        if (message.toLowerCase() === 'invalid token')
            logout()
    }

    return response
}, function (error) {
    console.log(error)
    return new Promise.reject(error)
})


Api.interceptors.request.use((config) => {

    //get token
    const { jwt: token } = JSON.parse(localStorage.getItem('vue-session-key'))

    //add token to headers
    config.headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
    }

    return config
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
        console.log(body)
        return Api.put(`/user/profile`, body, config)
    },
    remove_user_profile(file_name) {
        return Api.delete(`/user/profile/${file_name}`)
    },
    // delete requests
    delete(path, id) {
        return Api.delete(`/${path}/${id}`)
    },
}