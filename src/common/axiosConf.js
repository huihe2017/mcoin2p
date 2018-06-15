import axios from 'axios'
axios.defaults.headers.post['token'] = localStorage.token;

axios.defaults.withCredentials = true
export default axios