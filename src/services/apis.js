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