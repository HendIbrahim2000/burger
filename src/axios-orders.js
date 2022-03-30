import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-7b0c7-default-rtdb.firebaseio.com/'
});

export default instance;