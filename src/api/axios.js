import axios from 'axios';
const BASE_URL = 'http://support.tyam.co:3017/api/user/login';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});