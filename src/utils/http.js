import axios from 'axios'
import { baseUrl } from '../config/env'
axios.defaults.withCredentials=true

export default class http {
    constructor(store, api) {
        var base_api = baseUrl
        this.baseApi = base_api
        this.api = api //全部接口
        if(store){
            this.store = store
            this.userAuth()
        }
    }
    get(url, data, isNeedBaseUrl) {
        var options = {
            url: !isNeedBaseUrl ? this.baseApi + url : url,
            data: data || {},
            method: 'get',
        }
        this.request(options)
    }
    post(method, data, query) {
        var options = {
            url: query ? this.baseApi + query : this.baseApi,
            data: {method: method, params: data},
            method: 'post',
        }
        return this.request(options)
    }
    all(array) {
        var promiseAll = Promise.all(array)
        return promiseAll
    }
    request(options) {
        var promise = new Promise((resolve) => {
            axios(options)
                .then((result) => {
                    resolve(result.data)
                })
        })
        return promise
    }
    userAuth() { //会员登录认证
        axios.interceptors.response.use(response => {
            return response
        })
    }
}



