import Axios from 'axios';
import config from '../config';

const API = Axios.create({
  baseURL: config.API.baseUrl,
});

export default API;
