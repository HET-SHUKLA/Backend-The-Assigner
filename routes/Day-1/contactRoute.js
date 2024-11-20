import { Router } from "express";
import {
    handleContactUs, 
    handleAllMessages,
    handleMailMessage
} from '../controller/handleContactUs.js';

const route = Router();

//Send data
route.post('/', handleContactUs);

//Getting data
route.get('/all', handleAllMessages);
route.get('/email/:mail', handleMailMessage);

export default route;