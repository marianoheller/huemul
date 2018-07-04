import axiosRef from 'axios';

export const axios = axiosRef.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://rugged-virgin-islands-18071.herokuapp.com' : 'http://localhost:3001',
  timeout: 1000,
});


export const A = 1;
