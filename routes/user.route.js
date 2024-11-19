import { Router } from "express";
import {
    handleAddUser,
} from '../controller/user.controller.js';

const routes = Router();

// route : /api/v1/user

routes.post('/add', handleAddUser);

//For admin
//routes.get('/', handleGetUser);


export default routes;