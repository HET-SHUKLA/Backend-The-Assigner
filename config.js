import dotenv from 'dotenv';
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

export {
    MONGO_URL,
    PORT,
    EMAIL,
    PASSWORD
}