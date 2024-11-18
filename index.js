import express from 'express';
import connectDB from './connection.js';
import {MONGO_URL, PORT} from './config.js';
import contactRoute from './routes/contactRoute.js';

const app = express();

app.use(express.urlencoded({extended: false}));

app.use('/api/v1/contact', contactRoute);

connectDB(MONGO_URL).then( () => {
    console.log('Mongo DB Connected');

    app.listen(PORT, () => {
        console.log('Server Started on port : ' + PORT);
    });

}).catch((e) => {
    console.log('Failed to connect to Mongo DB' + e);
});