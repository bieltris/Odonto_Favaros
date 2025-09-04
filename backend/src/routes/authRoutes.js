import express from 'express';
const routes = express.Router();
import { login, cadastrarUser } from '../controllers/authControllers.js';

routes.post('/login', login);

routes.post('/sign-up', cadastrarUser);

export default routes;