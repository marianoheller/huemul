import axiosRef from 'axios';
import { homepage } from '../package.json';

export const axios = axiosRef.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://rugged-virgin-islands-18071.herokuapp.com' : 'http://localhost:3001',
  timeout: 1000,
});


export const basename = process.env.NODE_ENV === 'production' ? `/${homepage.split('/').slice(3).join('/')}` : '';
