import { Router } from "express";
import {handleContactUs} from '../controller/handleContactUs.js';

const route = Router();

route.post('/', handleContactUs);

export default route;