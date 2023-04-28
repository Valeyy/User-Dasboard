import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import User from "../interfaces/User";
import UserFormValues from "../interfaces/UserFormValues";
import { store } from "./stores/store";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'https://localhost:5000/api'

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers!.Authorization = `Bearer ${token}`
    return config
})

axios.interceptors.response.use(async response => {
    await sleep(500)

    return response
}, (error: AxiosError) => {
    const {data: dat, status, config} = error.response!;

    //Set data type to any
    const data: any = dat

    //Check for errors
    switch (status) {
        case 400: 
            if (typeof data === 'string') {
                toast.error(data);
            }
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                window.history.pushState(null, '', '/404')
            }
            if (data.errors) { //Validation error
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw modalStateErrors.flat();
            }
            break;
        case 401: 
            toast.error('unauthorized');
            break;
        case 404: 
            window.history.pushState(null, '', '/404')
            break;
        case 500:
            toast.error('server error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody) 
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/regiseter', user)  
}

const Users = {
    list: () => requests.get<User[]>('/users/list')
}

const Roles = {
    list: () => requests.get<string[]>('/roles/list'),
    addToUser: (email: string, role: string) => requests.post(`/roles/add?email=${email}&role=${role}`, {}),
    removeFromUser: (email: string, role: string) => requests.post(`/roles/remove?email=${email}&role=${role}`, {})
}

const agent = {
    Account,
    Users, 
    Roles
}

export default agent