import axios from "axios"

const request = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 2000
})

request.interceptors.response.use(response => {
    console.log(response);
    if (response.status === 200) {
        return response.data;
    }
    return Promise.reject(response);
}, err => Promise.reject(err))

export default request;