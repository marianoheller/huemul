import axiosRef from 'axios';

export const axios = axiosRef.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://some-domain.com/' : 'http://localhost:3000',
  timeout: 1000,
});


export const EVENT_TYPES = [
  'Inicializacion',
  'EmisionConducida',
  'EmisionRadiada',
  'InmunidadConducida',
  'InmunidadRadiada',
  'TipoInicializacion',
];
