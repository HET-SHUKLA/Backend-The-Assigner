import { Router } from "express";
import {
    handleAddUser,
    handleGetUser,
    handleGetIndividualUser
} from '../../controller/Day-2/user.controller.js';

const routes = Router();

// route : /api/v1/user

routes.post('/add', handleAddUser);

//For admin
routes.get('/all', handleGetUser);
//Get user from email, phone or any other attribute from schema
routes.get('/:attr/:id', handleGetIndividualUser);


export default routes;