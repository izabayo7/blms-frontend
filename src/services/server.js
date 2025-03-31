import axios from 'axios'
export default () => {
    return axios.create({
        // baseURL: `http://161.35.199.197:7070/kurious`,
        baseURL: `http://192.168.8.100:7070/kurious`,
        // baseURL: `http://localhost:7070/kurious`,
    })
}
