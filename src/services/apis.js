import Api from './server'
// import Vue from "vue";

//get token
const {jwt:token} = JSON.parse(localStorage.getItem('vue-session-key'))


/* interceptors */
Api.interceptors.response.use(function (response) {

    return response
}, function (error){
    console.log(error)
    return new Promise.reject(error)
})


Api.interceptors.request.use((config) => {

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
    // delete requests
    delete(path, id) {
        return Api.delete(`/${path}/${id}`)
    },
}