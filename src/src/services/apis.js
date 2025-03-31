import Api from './server'
export default {
    login(userType, body) {
        return Api().post(`/${userType}/login`, body)
    },
    get(url) {
        return Api().get(`/${url}`)
    },
    update(category, id, body) {
        return Api().put(`/${category}/${id}`, body)
    },
    delete(category, id) {
        return Api().delete(`/${category}/${id}`)
    },
}