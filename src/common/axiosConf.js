import axios from 'axios'


// axios.interceptors.request.use(
//     config => {
//         // 这里写死一个token，你需要在这里取到你设置好的token的值
//         const token = 'this is a token';
//         if (token) {
//             // 这里将token设置到headers中，header的key是Authorization，这个key值根据你的需要进行修改即可
//             config.headers.token = token;
//         }
//         return config
//     },
//     error => {
//         return Promise.reject(error)
//     });

 axios.defaults.headers.common['token'] = localStorage.token;
axios.defaults.headers['Content-type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers:{
//     'Content-type': 'application/x-www-form-urlencoded'
// }

// axios.defaults.withCredentials = true
export default axios