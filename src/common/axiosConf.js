import axios from 'axios'
 axios.defaults.headers.common['token'] = localStorage.token;

// axios.defaults.withCredentials = true
export default axios