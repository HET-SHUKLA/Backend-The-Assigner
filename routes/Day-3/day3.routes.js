import { Router } from "express";
import {
    handleEmailVerification,
    handleOtp,
    handleVerifyOtp,
    handleLogin,
} from '../../controller/Day-3/handleUserAuth.controller.js';

const routes = Router();

// /api/v1/day3

routes.post('/register', handleEmailVerification);
routes.get('/otp', handleOtp);
routes.get('/otp/:otp', handleVerifyOtp);

//Login
routes.post('/login', handleLogin);

export default routes;