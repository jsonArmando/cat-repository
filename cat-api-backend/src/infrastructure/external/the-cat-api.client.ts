import axios from 'axios';
import 'dotenv/config';

// Cliente Axios pre-configurado para hablar con TheCatAPI.
// Centraliza la configuración de la API externa en un solo lugar.
const theCatApiClient = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  headers: {
    'x-api-key': process.env.THE_CAT_API_KEY,
  },
});

export default theCatApiClient;