import express from 'express';
const routes = express.Router();
import { login } from '../controllers/authControllers.js';

routes.post('/login', login)

export default routes;