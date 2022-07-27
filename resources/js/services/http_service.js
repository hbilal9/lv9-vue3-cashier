import axios from 'axios';

export function http() {
    return axios.create({
        baseURL: '/api'
    });
}