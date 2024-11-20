import express from 'express';
import connectDB from './connection.js';
import {MONGO_URL, PORT} from './config.js';
import contactRoute from './routes/Day-1/contactRoute.js';
import userRoute from './routes/Day-2/user.route.js';
import day3Routes from './routes/Day-3/day3.routes.js';
import {upload} from './utils/imageUpload.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

//Day-1
app.use('/api/v1/contact', contactRoute);

//Day-2
app.use('/api/v1/user', upload.single('profilePic'), userRoute);

//Day-3
app.use('/api/v1/day3', day3Routes);


connectDB(MONGO_URL).then( () => {
    console.log('Mongo DB Connected');

    app.listen(PORT, () => {
        console.log('Server Started on port : ' + PORT);
    });

}).catch((e) => {
    console.log('Failed to connect to Mongo DB' + e);
});