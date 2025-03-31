import Api from './server'
export default {
    // users login
    login(userType, body) {
        return Api().post(`/${userType}/login`, body)
    },
    // get requests
    get(url) {
        return Api().get(`/${url}`)
    },
    // post requests
    create(category, body, headers) {
        return Api().post(`/${category}`, body, headers)
    },
    // put requests
    update(category, id, body, headers) {
        return Api().put(`/${category}/${id}`, body, headers)
    },
    // delete requests
    delete(category, id) {
        return Api().delete(`/${category}/${id}`)
    },
}