"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
require("dotenv/config");
// Cliente Axios pre-configurado para hablar con TheCatAPI.
// Centraliza la configuración de la API externa en un solo lugar.
const theCatApiClient = axios_1.default.create({
    baseURL: 'https://api.thecatapi.com/v1',
    headers: {
        'x-api-key': process.env.THE_CAT_API_KEY,
    },
});
exports.default = theCatApiClient;
