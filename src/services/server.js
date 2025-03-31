import axios from 'axios'
export default  axios.create({baseURL: `${process.env.VUE_APP_api_service_url}/api`,})


